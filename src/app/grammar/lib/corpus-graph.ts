// Build kernel graphs from the rich corpus (characters, stories,
// publications, cases) — two modes:
//
//   ENCYCLOPEDIA: the formal CEG grammar in use. Shows the namespace
//   prefixes, the 27 compliance doctrines that ground every claim's
//   standing, and the colony encyclopedia as a single high-volume
//   attester. This is "what CEG IS, formally."
//
//   GAME: the same CEG primitives but populated with a living community.
//   100 named characters as attesters, 43 publications as institutional
//   attesters, 5 cases as cluster anchors, the witness attestations from
//   those cases as claims. This is "CEG IN PRACTICE, alive."
//
// Both modes produce a graph the WASM kernel can lay out and run policy
// verdicts on. The structural primitives (scores / delegates_to /
// supersedes / withdraws / recants) and the 5 families (STANDING /
// ACTION / DETECTION / CONSENSUS / CORRECTION) are identical across
// modes — only the attesters and claims change.

import type {
  KernelGraph,
  KernelNode,
  KernelEdge,
} from "../components/AlephView";
import type { RegistrySource } from "./shared";
import { CHARACTERS } from "./characters-generated";
import { ALL_STORIES } from "./stories-generated";
import {
  ALL_PUBLICATIONS,
  NEWSPAPERS,
} from "@/app/game/lib/publications";
import { CASES } from "@/app/game/lib/cases-generated";

export type CorpusMode = "encyclopedia" | "game";

const STRUCTURAL_PRIMITIVES = [
  "scores",
  "delegates_to",
  "supersedes",
  "withdraws",
  "recants",
];
const FAMILIES = [
  "STANDING",
  "ACTION",
  "DETECTION",
  "CONSENSUS",
  "CORRECTION",
];

// Deterministic pseudo-score from a string id. Maps to [0.4, 0.95]. We
// don't have real scores for the corpus; this gives a stable spread so
// the kernel's verdict has something to compose against.
function pseudoScore(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return 0.4 + (Math.abs(h) % 56) / 100;
}
function pseudoConfidence(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) | 0;
  return 0.6 + (Math.abs(h) % 36) / 100;
}

function pushPrimitivesAndFamilies(nodes: KernelNode[], edges: KernelEdge[]): void {
  // 1+4 multi-scale primitives at the disk centre.
  for (const p of STRUCTURAL_PRIMITIVES) {
    nodes.push({
      id: `prim:${p}`,
      label: p,
      group: "primitive",
      component: null,
      family: null,
      band: 4,
      multi_scale: true,
    });
  }
  // Composer primitives operate_on scores.
  for (const p of ["delegates_to", "supersedes", "withdraws", "recants"]) {
    edges.push({
      source: `prim:${p}`,
      target: "prim:scores",
      kind: "operates_on",
    });
  }
  // 5 families.
  for (const f of FAMILIES) {
    nodes.push({
      id: `family:${f}`,
      label: f,
      group: "family",
      component: null,
      family: f,
      band: 4,
      multi_scale: true,
    });
    edges.push({
      source: "prim:scores",
      target: `family:${f}`,
      kind: "composes",
    });
  }
}

// ── ENCYCLOPEDIA mode ────────────────────────────────────────────────

export function buildEncyclopediaGraph(
  source: RegistrySource,
  seedClaimsPerComponent = 4,
): KernelGraph {
  const nodes: KernelNode[] = [];
  const edges: KernelEdge[] = [];
  pushPrimitivesAndFamilies(nodes, edges);

  // Tens of attester voices, not one. Each registry component is its
  // OWN authoritative voice over the prefixes it owns. The Encyclopedia
  // is the cross-component synthesis voice. The Accord is the
  // constitutional voice. The corridor metric reads correctly because
  // each component has its own concern area.
  //
  // Per-component family assignment: rotates through the five families
  // so the disk gets a 5-petal rosette of components instead of a
  // single dense ring.
  const COMPONENT_FAMILIES = [
    "STANDING",
    "ACTION",
    "DETECTION",
    "CONSENSUS",
    "CORRECTION",
  ];
  nodes.push({
    id: "att-accord",
    label: "The Accord",
    group: "attester",
    component: null,
    family: "STANDING",
    band: 4,
    multi_scale: false,
  });
  nodes.push({
    id: "pub-encyclopedia",
    label: "The Cascadia Encyclopedia",
    group: "attester",
    component: null,
    family: "CONSENSUS",
    band: 4,
    multi_scale: false,
  });

  // Each registry component becomes a NAMED attester voice. Stored as
  // group "attester" so the kernel places it on the cell band with the
  // id-hash spread; the prefix leaves it "owns" pull toward it via the
  // owned_by edges below.
  const componentsSeen = new Set<string>();
  let componentIdx = 0;
  for (const ns of source.namespace) {
    if (componentsSeen.has(ns.component)) continue;
    componentsSeen.add(ns.component);
    const fam = COMPONENT_FAMILIES[componentIdx % COMPONENT_FAMILIES.length];
    componentIdx++;
    nodes.push({
      id: `att-comp:${ns.component}`,
      label: ns.component,
      group: "attester",
      component: ns.component,
      family: fam,
      band: 4,
      multi_scale: false,
    });
    // Also keep the structural component node for layout (it's a
    // different concept from the attester voice — component is the
    // owner of prefixes; the att-comp voice is "the team behind the
    // component speaking authoritatively").
    nodes.push({
      id: `comp:${ns.component}`,
      label: ns.component,
      group: "component",
      component: ns.component,
      family: null,
      band: 4,
      multi_scale: false,
    });
    // Voice asserts on its own component anchor.
    edges.push({
      source: `att-comp:${ns.component}`,
      target: `comp:${ns.component}`,
      kind: "asserts",
    });
  }

  // Prefix-family leaves from the registry — the formal CEG grammar.
  for (const ns of source.namespace) {
    for (const sub of ns.subsections) {
      for (const row of sub.rows) {
        const id = `prefix:${row.prefix}`;
        if (nodes.find((n) => n.id === id)) continue;
        nodes.push({
          id,
          label: row.prefix,
          group: "prefix",
          component: ns.component,
          family: row.family ?? null,
          band: 4,
          multi_scale: false,
        });
        edges.push({
          source: `comp:${ns.component}`,
          target: id,
          kind: "owned_by",
        });
        if (row.family) {
          edges.push({
            source: `family:${row.family}`,
            target: id,
            kind: "belongs_to",
          });
        }
      }
    }
  }

  // Per-component attestations. Each component-voice asserts on its
  // OWN prefixes, plus the Encyclopedia provides cross-component
  // synthesis attestations. This gives every component a visible
  // local presence on the disk, not one mega-voice swallowing
  // everything.
  let claimIdx = 0;
  for (const comp of componentsSeen) {
    const prefixes = nodes
      .filter((n) => n.group === "prefix" && n.component === comp)
      .slice(0, seedClaimsPerComponent);
    for (const pref of prefixes) {
      const dim = pref.label;
      // Component voice attests on its own prefix.
      const compClaimId = `enc-claim:${claimIdx++}`;
      const cScore = pseudoScore(compClaimId);
      const cConf = pseudoConfidence(compClaimId);
      nodes.push({
        id: compClaimId,
        label: `att-comp:${comp}|${dim}|${cScore}|${cConf}`,
        group: "claim",
        component: null,
        family: pref.family ?? null,
        band: 4,
        multi_scale: false,
      });
      edges.push({
        source: `att-comp:${comp}`,
        target: compClaimId,
        kind: "asserts",
      });
      edges.push({
        source: compClaimId,
        target: "prim:scores",
        kind: "asserts",
      });
    }
    // Encyclopedia synthesis claim — one per component, sampled.
    const synthPrefix = nodes.find(
      (n) => n.group === "prefix" && n.component === comp,
    );
    if (synthPrefix) {
      const synClaimId = `enc-claim:${claimIdx++}`;
      const sScore = pseudoScore(synClaimId);
      const sConf = pseudoConfidence(synClaimId);
      nodes.push({
        id: synClaimId,
        label: `pub-encyclopedia|${synthPrefix.label}|${sScore}|${sConf}`,
        group: "claim",
        component: null,
        family: synthPrefix.family ?? null,
        band: 4,
        multi_scale: false,
      });
      edges.push({
        source: "pub-encyclopedia",
        target: synClaimId,
        kind: "asserts",
      });
      edges.push({
        source: synClaimId,
        target: "prim:scores",
        kind: "asserts",
      });
    }
  }

  // Accord ratifies each family — making the constitutional voice
  // visible in the rosette.
  for (const f of FAMILIES) {
    const accClaimId = `enc-claim:accord-${f}`;
    nodes.push({
      id: accClaimId,
      label: `att-accord|${f}|0.95|0.9`,
      group: "claim",
      component: null,
      family: f,
      band: 4,
      multi_scale: false,
    });
    edges.push({
      source: "att-accord",
      target: accClaimId,
      kind: "asserts",
    });
    edges.push({
      source: accClaimId,
      target: "prim:scores",
      kind: "asserts",
    });
  }

  return { nodes, edges };
}

// ── GAME mode ────────────────────────────────────────────────────────

export function buildGameGraph(
  characterCount = 100,
  publicationCount = 12,
  caseCount = CASES.length,
): KernelGraph {
  const nodes: KernelNode[] = [];
  const edges: KernelEdge[] = [];
  pushPrimitivesAndFamilies(nodes, edges);

  // Meta-group anchors: one per CEG family. These are NOT structural
  // primitives; they're cluster centroids that attesters of the same
  // family gravitate to. Tagged as "component" because the kernel
  // currently places components in a mid-radius ring; that wedge
  // becomes the gravitational center for its family's voices.
  //
  // Per the synthesis paper: more concern areas covered + lower echo
  // rate = more independent voices (k_eff). This is that geometry
  // made visible. A character in the STANDING family clusters near the
  // STANDING anchor, separating cleanly from CONSENSUS publications
  // and ACTION editors.
  for (const f of FAMILIES) {
    nodes.push({
      id: `meta:${f}`,
      label: `${f} cluster`,
      group: "component",
      component: `meta-${f}`,
      family: f,
      band: 4,
      multi_scale: false,
    });
    // Each meta-anchor belongs_to its family.
    edges.push({
      source: `family:${f}`,
      target: `meta:${f}`,
      kind: "belongs_to",
    });
  }

  // Characters as attesters; each belongs_to its family's meta-anchor.
  // This is the "X said Y" pivot: attesters become the primary
  // structural anchor, and they cluster organically into family-named
  // meta-groups.
  const chars = CHARACTERS.slice(0, characterCount);
  for (const c of chars) {
    nodes.push({
      id: c.id,
      label: c.name,
      group: "attester",
      component: `meta-${c.ceg_family}`,
      family: c.ceg_family,
      band: 4,
      multi_scale: false,
    });
    edges.push({
      source: c.id,
      target: `meta:${c.ceg_family}`,
      kind: "belongs_to",
    });
  }

  // Publications as institutional attesters. They cluster under the
  // CONSENSUS meta-anchor because publications are the community's
  // shared-record voices. Newspapers may have idiosyncratic editorial
  // bias but their structural role is consensus-making.
  const pubs = ALL_PUBLICATIONS.slice(0, publicationCount);
  for (const p of pubs) {
    nodes.push({
      id: p.id,
      label: p.name,
      group: "attester",
      component: "meta-CONSENSUS",
      family: "CONSENSUS",
      band: 4,
      multi_scale: false,
    });
    edges.push({
      source: p.id,
      target: "meta:CONSENSUS",
      kind: "belongs_to",
    });
  }

  // Cases as GOALS, not components.
  //
  // A case isn't a "thing in the namespace" — it's a question the
  // community is aiming at: "what really happened?" That makes it a
  // GOAL in the CEG sense, a convergence point that witnesses' claims
  // aim toward.
  //
  // Scale-tower placement: case goals live at the Federation band
  // (band 5, top of the tower) because they're community-scale goals.
  // Character default_goals are personal-scale (Cell band). The same
  // grammar applies to both; only the scope differs.
  //
  // Goal nodes are placed by the kernel using the "attester" branch in
  // place_node (id-hash spread on the disk) — but we use a distinct
  // label prefix and family hint so the renderer can colour them
  // differently. Witnesses' belongs_to edges visibly pull toward each
  // goal.
  const cases = CASES.slice(0, caseCount);
  for (const c of cases) {
    nodes.push({
      id: c.id,
      label: `goal:${c.codename}`,
      // Tagged as attester so the kernel's attester-placement gives it
      // a deterministic location; the renderer can then specialise by
      // label prefix "goal:".
      group: "attester",
      component: null,
      // Community-scale CONSENSUS goal, distinct from individual
      // attesters' families.
      family: "CONSENSUS",
      // Federation band — community scope.
      band: 5,
      multi_scale: false,
    });
  }

  // Witness attestations per case — claims from characters anchored to
  // a case via the kernel's "asserts" relation and to scores via the
  // standard asserts edge.
  for (const c of cases) {
    for (const w of c.witnesses) {
      const claimId = `case:${c.id}:wit:${w.character_id}`;
      const dim = `case:${c.id}:${w.domain_present}`;
      const score = pseudoScore(claimId);
      const conf = pseudoConfidence(claimId);
      nodes.push({
        id: claimId,
        label: `${w.character_id}|${dim}|${score}|${conf}`,
        group: "claim",
        component: c.id,
        family: null,
        band: 4,
        multi_scale: false,
      });
      edges.push({
        source: w.character_id,
        target: claimId,
        kind: "asserts",
      });
      edges.push({
        source: claimId,
        target: "prim:scores",
        kind: "asserts",
      });
      // Edge from claim into the case-anchor so cases visually
      // cluster their witnesses.
      edges.push({
        source: claimId,
        target: c.id,
        kind: "belongs_to",
      });
    }
    // Article attestations from publications.
    for (const a of c.articles) {
      const claimId = a.id;
      const dim = `case:${c.id}:article`;
      const score = pseudoScore(claimId);
      const conf = pseudoConfidence(claimId);
      nodes.push({
        id: claimId,
        label: `${a.source_id}|${dim}|${score}|${conf}`,
        group: "claim",
        component: c.id,
        family: null,
        band: 4,
        multi_scale: false,
      });
      edges.push({
        source: a.source_id,
        target: claimId,
        kind: "asserts",
      });
      edges.push({
        source: claimId,
        target: "prim:scores",
        kind: "asserts",
      });
      edges.push({
        source: claimId,
        target: c.id,
        kind: "belongs_to",
      });
    }
  }

  // Story-holding attestations — every character's held stories become
  // a smaller-volume claim layer in the background. Use the story's
  // first dimension as the claim's dimension.
  for (const c of chars) {
    for (const h of c.storyHoldings) {
      const story = ALL_STORIES.find((s) => s.id === h.storyId);
      if (!story) continue;
      const dim = story.dimensions[0] ?? story.primitives[0];
      if (!dim) continue;
      const claimId = `holding:${c.id}:${h.storyId}`;
      const score = pseudoScore(claimId);
      const conf = pseudoConfidence(claimId);
      nodes.push({
        id: claimId,
        label: `${c.id}|${dim}|${score}|${conf}`,
        group: "claim",
        component: null,
        family: story.family ?? null,
        band: 4,
        multi_scale: false,
      });
      edges.push({
        source: c.id,
        target: claimId,
        kind: "asserts",
      });
      edges.push({
        source: claimId,
        target: "prim:scores",
        kind: "asserts",
      });
    }
  }

  return { nodes, edges };
}

// Helper for diagnostic strip — counts by group.
export function summariseGraph(g: KernelGraph): Record<string, number> {
  const out: Record<string, number> = {};
  for (const n of g.nodes) {
    out[n.group] = (out[n.group] ?? 0) + 1;
  }
  out.edges = g.edges.length;
  out.nodes = g.nodes.length;
  return out;
}
