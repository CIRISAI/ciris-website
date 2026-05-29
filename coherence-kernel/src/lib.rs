// CIRIS Coherence kernel — Phase 1.
//
// Per the FSD at CIRISAgent#835. Phase 1 scope:
// - Load a CEG namespace (nodes + edges + per-node component / family / role)
// - Place every node on a Poincaré disk within its assigned scale band
// - Expose the layout to JS as a typed-array of [x, y, z, ...] positions, one
//   GPU upload per frame on the @react-three/fiber side
// - Carry the seven scale tower (biosphere as ground plane + 6 bands)
// - Compute a basic corridor metric: per-component k and an estimated rho
//
// Determinism is preserved by avoiding any randomized layout: every input
// gets a deterministic output. Q16.16 fixed-point is a hardening pass; Phase
// 1 ships f32 and audits later.
//
// License: AGPL-3.0-or-later.

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// Scale tower
//
// Per CEG §1.2 and the synthesis paper: biosphere is the ground plane, not a
// 7th equal-weight band. Six discrete scale bands sit above it. The ground
// plane is what every node renders against; the bands carry the wire-format
// scopes a node can be claimed at.

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[repr(u8)]
pub enum Band {
    Key = 0,
    Occurrence = 1,
    Agent = 2,
    Fleet = 3,
    Cell = 4,
    Federation = 5,
}

impl Band {
    pub fn from_index(i: u8) -> Self {
        match i {
            0 => Band::Key,
            1 => Band::Occurrence,
            2 => Band::Agent,
            3 => Band::Fleet,
            4 => Band::Cell,
            _ => Band::Federation,
        }
    }
    pub fn z(self) -> f32 {
        // Ground plane is z=0.0. Bands stack above. Federation is the highest
        // signed band; biosphere remains the floor everything draws against.
        match self {
            Band::Key => 0.20,
            Band::Occurrence => 0.36,
            Band::Agent => 0.52,
            Band::Fleet => 0.68,
            Band::Cell => 0.84,
            Band::Federation => 1.00,
        }
    }
    pub fn label(self) -> &'static str {
        match self {
            Band::Key => "key",
            Band::Occurrence => "occurrence",
            Band::Agent => "agent",
            Band::Fleet => "fleet",
            Band::Cell => "cell",
            Band::Federation => "federation",
        }
    }
}

// Node + Edge input shapes

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Node {
    pub id: String,
    pub label: String,
    /// "primitive" | "family" | "component" | "prefix" | "attester" | "claim"
    pub group: String,
    /// Component name or None for primitives / families
    pub component: Option<String>,
    /// Family name (STANDING / ACTION / DETECTION / CONSENSUS / CORRECTION) or None
    pub family: Option<String>,
    /// Which scale band the node primarily lives at when scale-pinned.
    pub band: u8,
    /// True when the node represents a fractal-self concept — primitives,
    /// family anchors, accord principles. These render at every band the
    /// kernel emits, sharing one logical id but multiple positions. Per
    /// CEG §1.2 Ubuntu commitment: the same self at every scale.
    #[serde(default)]
    pub multi_scale: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Edge {
    pub source: String,
    pub target: String,
    /// "composes" | "belongs_to" | "owned_by" | "operates_on"
    pub kind: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GraphInput {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
}

// Layout output shape: a flat Float32Array of node positions, indexed by the
// nodes array supplied to set_graph. Three floats per node: x, y, z.

// Poincare disk embedding
//
// For Phase 1 we use a simple sector-and-radius placement. Each component
// (CIRISAgent, CIRISVerify, ...) gets an angular sector around the disk;
// within the sector, nodes spread radially. Primitives sit at the disk centre
// (canonical fractal-self anchor); families at low hyperbolic radius;
// components at mid radius; prefix leaves at outer radius.
//
// Hyperbolic distance from disk centre is tanh(r), so Euclidean radius
// approaches 1 asymptotically. The metric encodes the
// "exponentially more room as you move outward" property that makes scale
// recursion legible (Nickel and Kiela 2017; Lamping and Rao 1995).

const TAU: f32 = std::f32::consts::TAU;

fn hyperbolic_r(depth: f32) -> f32 {
    // depth = 0 -> centre; depth = 1 -> near boundary.
    // Map to Euclidean radius on the disk via tanh.
    let h = depth * 3.0; // 3.0 chosen for legible separation in Phase 1
    h.tanh() * 0.95 // 0.95 to leave headroom at the disk boundary
}

struct LayoutCtx {
    families: Vec<String>,
    components: Vec<String>,
    /// For each node (by node array index), its order within its component's prefix list.
    prefix_intra_component_idx: Vec<usize>,
    component_prefix_count: std::collections::HashMap<String, usize>,
}

fn build_layout_ctx(input: &GraphInput) -> LayoutCtx {
    let mut families: Vec<String> = Vec::new();
    let mut components: Vec<String> = Vec::new();
    for n in &input.nodes {
        if let Some(f) = &n.family {
            if !families.contains(f) {
                families.push(f.clone());
            }
        }
        if let Some(c) = &n.component {
            if !components.contains(c) {
                components.push(c.clone());
            }
        }
    }
    families.sort();
    components.sort();

    // Index each prefix node within its component's prefix list
    let mut per_component_count: std::collections::HashMap<String, usize> =
        std::collections::HashMap::new();
    let mut intra: Vec<usize> = vec![0; input.nodes.len()];
    for (i, n) in input.nodes.iter().enumerate() {
        if n.group == "prefix" {
            if let Some(c) = &n.component {
                let entry = per_component_count.entry(c.clone()).or_insert(0);
                intra[i] = *entry;
                *entry += 1;
            }
        }
    }

    LayoutCtx {
        families,
        components,
        prefix_intra_component_idx: intra,
        component_prefix_count: per_component_count,
    }
}

fn place_node(node_idx: usize, node: &Node, layout_ctx: &LayoutCtx) -> (f32, f32, f32) {
    let z = Band::from_index(node.band).z();

    // Primitives -> disk centre at their band
    if node.group == "primitive" {
        return (0.0, 0.0, z);
    }

    // Families -> small ring around centre (depth 0.20)
    if node.group == "family" {
        let f_idx = layout_ctx
            .families
            .iter()
            .position(|f| Some(f) == node.family.as_ref())
            .unwrap_or(0);
        let theta = (f_idx as f32 / layout_ctx.families.len().max(1) as f32) * TAU;
        let r = hyperbolic_r(0.20);
        return (r * theta.cos(), r * theta.sin(), z);
    }

    // Components -> ring at depth 0.40
    if node.group == "component" {
        let c_idx = layout_ctx
            .components
            .iter()
            .position(|c| Some(c) == node.component.as_ref())
            .unwrap_or(0);
        let theta = (c_idx as f32 / layout_ctx.components.len().max(1) as f32) * TAU;
        let r = hyperbolic_r(0.40);
        return (r * theta.cos(), r * theta.sin(), z);
    }

    // Prefix leaves -> cluster within their owning component's angular sector
    let comp_idx = node
        .component
        .as_ref()
        .and_then(|c| layout_ctx.components.iter().position(|x| x == c))
        .unwrap_or(0);
    let n_components = layout_ctx.components.len().max(1) as f32;
    let sector_centre = (comp_idx as f32 / n_components) * TAU;
    let sector_width = TAU / n_components;

    // Within the sector, spread by within-component index
    let intra_idx = layout_ctx
        .prefix_intra_component_idx
        .get(node_idx)
        .copied()
        .unwrap_or(0);
    let intra_count = layout_ctx
        .component_prefix_count
        .get(node.component.as_deref().unwrap_or(""))
        .copied()
        .unwrap_or(1)
        .max(1) as f32;

    // Spread within the sector, leaving margins on each side
    let local_theta = (intra_idx as f32 + 0.5) / intra_count;
    let theta = sector_centre - sector_width * 0.40 + sector_width * 0.80 * local_theta;

    // Vary radial depth slightly so prefixes don't all sit on one circle
    let depth_jitter = 0.62 + 0.18 * ((intra_idx as f32 * 0.7321).fract());
    let r = hyperbolic_r(depth_jitter);

    (r * theta.cos(), r * theta.sin(), z)
}

// Corridor metric (Phase 1 sketch)
//
// Per the synthesis paper: k_eff = k / (1 + rho * (k - 1)).
//
// For Phase 1 we surface a per-component estimate. The full graph-wide
// k_eff calculation against composition policy data lands in Phase 2 once
// the kernel is dynamic. This is enough to drive the persistence sidebar.

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct CorridorMetric {
    pub k: u32,
    pub rho_estimate: f32,
    pub k_eff: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Verdict {
    pub dimension: String,
    pub composed_score: f32,
    pub composed_confidence: f32,
    pub supporting_count: u32,
}

/// Pure-Rust core of Policy A. Composable from outside the wasm-bindgen
/// surface so the unit tests can exercise the logic without a JS host.
pub fn policy_a_pure(graph: &GraphInput, pinned: &[String], dimension: &str) -> Verdict {
    let pinned_set: std::collections::HashSet<&str> =
        pinned.iter().map(|s| s.as_str()).collect();
    let mut weighted_sum = 0.0f32;
    let mut total_w = 0.0f32;
    let mut count = 0u32;
    for n in &graph.nodes {
        if n.group != "claim" {
            continue;
        }
        // Claim label encodes: "<attester>|<dimension>|<score>|<confidence>"
        let parts: Vec<&str> = n.label.split('|').collect();
        if parts.len() < 3 {
            continue;
        }
        let attester = parts[0];
        let dim = parts[1];
        let score: f32 = parts[2].parse().unwrap_or(0.0);
        let confidence: f32 = parts.get(3).and_then(|s| s.parse().ok()).unwrap_or(0.8);
        if dim != dimension {
            continue;
        }
        if !pinned_set.contains(attester) {
            continue;
        }
        weighted_sum += score * confidence;
        total_w += confidence;
        count += 1;
    }
    let composed = if total_w > 0.0 { weighted_sum / total_w } else { 0.0 };
    let conf = if count > 0 { total_w / count as f32 } else { 0.0 };
    Verdict {
        dimension: dimension.to_string(),
        composed_score: composed,
        composed_confidence: conf,
        supporting_count: count,
    }
}

fn estimate_corridor(input: &GraphInput) -> CorridorMetric {
    // Phase 1 heuristic: k = number of distinct families touched; rho is a
    // crude estimate from the fraction of edges that stay within one family.
    let mut families = std::collections::HashSet::new();
    for n in &input.nodes {
        if let Some(f) = &n.family {
            families.insert(f.clone());
        }
    }
    let k = families.len() as u32;

    let node_family: std::collections::HashMap<&str, &str> = input
        .nodes
        .iter()
        .filter_map(|n| n.family.as_deref().map(|f| (n.id.as_str(), f)))
        .collect();

    let mut intra = 0u32;
    let mut total = 0u32;
    for e in &input.edges {
        let s = node_family.get(e.source.as_str());
        let t = node_family.get(e.target.as_str());
        if let (Some(s), Some(t)) = (s, t) {
            total += 1;
            if s == t {
                intra += 1;
            }
        }
    }
    let rho = if total > 0 {
        intra as f32 / total as f32
    } else {
        0.0
    };
    let k_eff = if k > 0 {
        k as f32 / (1.0 + rho * (k as f32 - 1.0))
    } else {
        0.0
    };
    CorridorMetric {
        k,
        rho_estimate: rho,
        k_eff,
    }
}

// Public kernel API

/// One placement of a logical node at one band. Multi-scale nodes emit one
/// instance per band; scale-pinned nodes emit one instance at their own band.
#[derive(Debug, Clone)]
struct Instance {
    node_idx: usize,
    band: u8,
}

fn bands_for(node: &Node) -> Vec<u8> {
    if node.multi_scale {
        vec![0, 1, 2, 3, 4, 5]
    } else {
        vec![node.band]
    }
}

/// ρ → curvature mapping for paired forward/backward TSVF arcs. High
/// correlation → tightly bundled arcs; low correlation → near-straight.
/// Phase 2 keeps it simple; later we'll let per-edge ρ override the
/// graph-wide estimate.
fn rho_to_curvature(rho: f32, kind: &str) -> f32 {
    // Composition policies and family-membership edges bundle more tightly
    // than ownership and operations-on edges (they're more structural).
    let base = match kind {
        "composes" | "belongs_to" => 0.45,
        "operates_on" => 0.55,
        "owned_by" => 0.25,
        "asserts" | "votes_on" | "delegates" => 0.40,
        _ => 0.30,
    };
    base + (rho * 0.30)
}

#[wasm_bindgen]
pub struct CoherenceKernel {
    graph: GraphInput,
    ctx: LayoutCtx,
}

impl CoherenceKernel {
    fn expand_instances(&self) -> Vec<Instance> {
        let mut out: Vec<Instance> = Vec::new();
        for (i, n) in self.graph.nodes.iter().enumerate() {
            for b in bands_for(n) {
                out.push(Instance {
                    node_idx: i,
                    band: b,
                });
            }
        }
        out
    }
}

#[wasm_bindgen]
impl CoherenceKernel {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            graph: GraphInput {
                nodes: Vec::new(),
                edges: Vec::new(),
            },
            ctx: LayoutCtx {
                families: Vec::new(),
                components: Vec::new(),
                prefix_intra_component_idx: Vec::new(),
                component_prefix_count: std::collections::HashMap::new(),
            },
        }
    }

    /// Load a graph from a JSON-serialized GraphInput.
    #[wasm_bindgen]
    pub fn set_graph(&mut self, json: &str) -> Result<(), JsValue> {
        let graph: GraphInput = serde_json::from_str(json)
            .map_err(|e| JsValue::from_str(&format!("parse error: {e}")))?;
        self.ctx = build_layout_ctx(&graph);
        self.graph = graph;
        Ok(())
    }

    /// Return the laid-out positions as a typed array the JS side can map
    /// straight into a Float32Array view of WASM linear memory. Three floats
    /// per node-instance. Multi-scale nodes contribute one instance per
    /// band; scale-pinned nodes contribute one instance at their band. The
    /// JS side reads the matching instance_meta() to know which input node
    /// each instance belongs to.
    #[wasm_bindgen]
    pub fn layout(&self) -> Vec<f32> {
        let instances = self.expand_instances();
        let mut out = Vec::with_capacity(instances.len() * 3);
        for inst in &instances {
            let node = &self.graph.nodes[inst.node_idx];
            // Place at the instance band by overriding the node's own band.
            let mut tmp = node.clone();
            tmp.band = inst.band;
            let (x, y, z) = place_node(inst.node_idx, &tmp, &self.ctx);
            out.push(x);
            out.push(y);
            out.push(z);
        }
        out
    }

    /// Return per-instance metadata as JSON: [{node_idx, band, node_id}, ...].
    /// The JS side uses this to map hover events back to logical nodes
    /// (multi-scale nodes share one logical id across bands).
    #[wasm_bindgen]
    pub fn instance_meta(&self) -> Result<JsValue, JsValue> {
        #[derive(Serialize)]
        struct Meta {
            node_idx: u32,
            band: u8,
            node_id: String,
        }
        let instances = self.expand_instances();
        let metas: Vec<Meta> = instances
            .into_iter()
            .map(|inst| Meta {
                node_idx: inst.node_idx as u32,
                band: inst.band,
                node_id: self.graph.nodes[inst.node_idx].id.clone(),
            })
            .collect();
        serde_wasm_bindgen::to_value(&metas).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    /// Total instance count (multi-scale nodes contribute multiple instances).
    #[wasm_bindgen(getter)]
    pub fn instance_count(&self) -> u32 {
        self.expand_instances().len() as u32
    }

    /// Number of input nodes in the loaded graph.
    #[wasm_bindgen(getter)]
    pub fn node_count(&self) -> u32 {
        self.graph.nodes.len() as u32
    }

    // ─── Mutable-graph API (Phase 2) ───────────────────────────────────
    //
    // The visitor can add attesters, claims, and inter-attester votes; the
    // kernel keeps the graph consistent and recomputes layout + corridor
    // metrics on demand.

    /// Add or replace a node. Returns the input-array index.
    #[wasm_bindgen]
    pub fn upsert_node(&mut self, json: &str) -> Result<u32, JsValue> {
        let node: Node = serde_json::from_str(json)
            .map_err(|e| JsValue::from_str(&format!("parse error: {e}")))?;
        let id = node.id.clone();
        let existing = self.graph.nodes.iter().position(|n| n.id == id);
        let idx = if let Some(idx) = existing {
            self.graph.nodes[idx] = node;
            idx
        } else {
            self.graph.nodes.push(node);
            self.graph.nodes.len() - 1
        };
        self.ctx = build_layout_ctx(&self.graph);
        Ok(idx as u32)
    }

    /// Add an edge. Idempotent.
    #[wasm_bindgen]
    pub fn add_edge(&mut self, source: &str, target: &str, kind: &str) {
        // Skip dup
        let dup = self
            .graph
            .edges
            .iter()
            .any(|e| e.source == source && e.target == target && e.kind == kind);
        if dup {
            return;
        }
        self.graph.edges.push(Edge {
            source: source.to_string(),
            target: target.to_string(),
            kind: kind.to_string(),
        });
    }

    /// Remove an edge.
    #[wasm_bindgen]
    pub fn remove_edge(&mut self, source: &str, target: &str, kind: &str) {
        self.graph
            .edges
            .retain(|e| !(e.source == source && e.target == target && e.kind == kind));
    }

    /// Clear all attester/claim/vote nodes and edges. Keeps the CEG
    /// namespace anchors.
    #[wasm_bindgen]
    pub fn clear_runtime(&mut self) {
        self.graph
            .nodes
            .retain(|n| n.group != "attester" && n.group != "claim" && n.group != "vote");
        self.graph
            .edges
            .retain(|e| e.kind != "asserts" && e.kind != "votes_on" && e.kind != "delegates");
        self.ctx = build_layout_ctx(&self.graph);
    }

    /// Edge geometry export: for each edge, emit the source and target
    /// instance indices PLUS the curvature parameter the renderer should
    /// use for the paired forward/backward TSVF arc. Curvature binds to
    /// the per-edge ρ proxy: tightly-coupled edges (high ρ) draw tightly
    /// curved; weakly coupled edges (low ρ) draw straight.
    #[wasm_bindgen]
    pub fn edge_geometry(&self) -> Result<JsValue, JsValue> {
        #[derive(Serialize)]
        struct EdgeGeom {
            source_instance: u32,
            target_instance: u32,
            curvature: f32,
            kind: String,
        }
        let instances = self.expand_instances();
        // Build instance lookup: (node_idx, band) -> instance index
        let mut inst_lookup: std::collections::HashMap<(usize, u8), usize> =
            std::collections::HashMap::new();
        for (i, inst) in instances.iter().enumerate() {
            inst_lookup.insert((inst.node_idx, inst.band), i);
        }
        // Build node id -> node idx
        let id_to_idx: std::collections::HashMap<&str, usize> = self
            .graph
            .nodes
            .iter()
            .enumerate()
            .map(|(i, n)| (n.id.as_str(), i))
            .collect();

        let corridor = estimate_corridor(&self.graph);
        let mut out: Vec<EdgeGeom> = Vec::new();
        for e in &self.graph.edges {
            let Some(&si) = id_to_idx.get(e.source.as_str()) else {
                continue;
            };
            let Some(&ti) = id_to_idx.get(e.target.as_str()) else {
                continue;
            };
            let src = &self.graph.nodes[si];
            let tgt = &self.graph.nodes[ti];
            // For multi-scale↔multi-scale edges, draw at every band where both endpoints live.
            // For scale-pinned endpoints, just one band.
            let src_bands = bands_for(src);
            let tgt_bands = bands_for(tgt);
            for &sb in &src_bands {
                for &tb in &tgt_bands {
                    // If both endpoints are multi-scale, draw only the same-band copy
                    // to avoid edge explosion. Cross-scale connections happen via the
                    // vertical spine, not via every-pair edges.
                    if src.multi_scale && tgt.multi_scale && sb != tb {
                        continue;
                    }
                    let Some(&s_inst) = inst_lookup.get(&(si, sb)) else {
                        continue;
                    };
                    let Some(&t_inst) = inst_lookup.get(&(ti, tb)) else {
                        continue;
                    };
                    out.push(EdgeGeom {
                        source_instance: s_inst as u32,
                        target_instance: t_inst as u32,
                        curvature: rho_to_curvature(corridor.rho_estimate, &e.kind),
                        kind: e.kind.clone(),
                    });
                }
            }
        }
        serde_wasm_bindgen::to_value(&out).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    /// Composition Policy A — Direct Trust.
    /// Given a set of pinned attester ids, compute the composed verdict on
    /// a dimension: weighted mean of (score × confidence) over claims by
    /// pinned attesters, ignoring others.
    #[wasm_bindgen]
    pub fn policy_a(&self, pinned_attester_ids_json: &str, dimension: &str) -> Result<JsValue, JsValue> {
        let pinned: Vec<String> = serde_json::from_str(pinned_attester_ids_json)
            .map_err(|e| JsValue::from_str(&format!("parse error: {e}")))?;
        let v = policy_a_pure(&self.graph, &pinned, dimension);
        serde_wasm_bindgen::to_value(&v).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    /// Z height of a band by its 0..5 ordinal.
    #[wasm_bindgen]
    pub fn band_z(band: u8) -> f32 {
        Band::from_index(band).z()
    }

    /// Per-graph corridor metric: { k, rho_estimate, k_eff }.
    /// Phase 1 heuristic; Phase 2 makes it precise.
    #[wasm_bindgen]
    pub fn corridor(&self) -> Result<JsValue, JsValue> {
        let m = estimate_corridor(&self.graph);
        serde_wasm_bindgen::to_value(&m).map_err(|e| JsValue::from_str(&e.to_string()))
    }
}

impl Default for CoherenceKernel {
    fn default() -> Self {
        Self::new()
    }
}

extern crate serde_json;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_graph_layout_is_empty() {
        let k = CoherenceKernel::new();
        assert_eq!(k.node_count(), 0);
        assert_eq!(k.layout().len(), 0);
    }

    #[test]
    fn band_z_values_increase() {
        assert!(Band::from_index(0).z() < Band::from_index(3).z());
        assert!(Band::from_index(3).z() < Band::from_index(5).z());
    }

    #[test]
    fn small_graph_lays_out() {
        let json = r#"{
            "nodes": [
                {"id":"s","label":"scores","group":"primitive","component":null,"family":null,"band":4,"multi_scale":false},
                {"id":"d","label":"delegates_to","group":"primitive","component":null,"family":null,"band":4,"multi_scale":false},
                {"id":"famS","label":"STANDING","group":"family","component":null,"family":"STANDING","band":4,"multi_scale":false},
                {"id":"compA","label":"CIRISAgent","group":"component","component":"CIRISAgent","family":null,"band":4,"multi_scale":false},
                {"id":"prefA","label":"beneficence:*","group":"prefix","component":"CIRISAgent","family":"STANDING","band":4,"multi_scale":false}
            ],
            "edges": [
                {"source":"d","target":"s","kind":"operates_on"},
                {"source":"s","target":"famS","kind":"composes"},
                {"source":"famS","target":"prefA","kind":"belongs_to"},
                {"source":"compA","target":"prefA","kind":"owned_by"}
            ]
        }"#;
        let mut k = CoherenceKernel::new();
        k.set_graph(json).unwrap();
        assert_eq!(k.node_count(), 5);
        let layout = k.layout();
        assert_eq!(layout.len(), 15);
        // Primitives at disk centre
        assert!(layout[0].abs() < 0.001);
        assert!(layout[1].abs() < 0.001);
    }

    #[test]
    fn multi_scale_node_emits_six_instances() {
        let json = r#"{
            "nodes": [
                {"id":"s","label":"scores","group":"primitive","component":null,"family":null,"band":4,"multi_scale":true}
            ],
            "edges": []
        }"#;
        let mut k = CoherenceKernel::new();
        k.set_graph(json).unwrap();
        assert_eq!(k.node_count(), 1);
        assert_eq!(k.instance_count(), 6);
        let layout = k.layout();
        assert_eq!(layout.len(), 18);
        // First instance at band 0 (Key)
        assert!((layout[2] - Band::Key.z()).abs() < 0.001);
        // Last instance at band 5 (Federation)
        assert!((layout[17] - Band::Federation.z()).abs() < 0.001);
    }

    #[test]
    fn policy_a_pure_weighted_mean() {
        let graph = GraphInput {
            nodes: vec![
                Node {
                    id: "alice".into(),
                    label: "Alice".into(),
                    group: "attester".into(),
                    component: None,
                    family: None,
                    band: 4,
                    multi_scale: false,
                },
                Node {
                    id: "c1".into(),
                    label: "alice|integrity:transparency|0.8|0.9".into(),
                    group: "claim".into(),
                    component: None,
                    family: None,
                    band: 4,
                    multi_scale: false,
                },
                Node {
                    id: "c2".into(),
                    label: "bob|integrity:transparency|0.6|0.8".into(),
                    group: "claim".into(),
                    component: None,
                    family: None,
                    band: 4,
                    multi_scale: false,
                },
            ],
            edges: vec![],
        };
        let v = policy_a_pure(
            &graph,
            &["alice".into(), "bob".into()],
            "integrity:transparency",
        );
        // (0.8 * 0.9 + 0.6 * 0.8) / (0.9 + 0.8) = (0.72 + 0.48) / 1.7 ≈ 0.7058
        assert!((v.composed_score - 0.7058).abs() < 0.01);
        assert_eq!(v.supporting_count, 2);
    }
}
