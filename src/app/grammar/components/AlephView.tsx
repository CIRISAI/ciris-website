"use client";

// AlephView, Phase 1 of the Coherence game scale tower.
//
// Renders the CEG namespace through the Rust kernel (coherence-kernel,
// wasm-bindgen) into a Three.js scene via @react-three/fiber. The seven-scale
// tower draws as the biosphere ground plane plus six bands above it;
// primitives, families, components, and prefix-family leaves all live in
// their assigned bands.
//
// Phase 1 ambition is geometric correctness, not feature completeness. The
// Aleph hover-synchronisation, the corridor sidebar, and the dynamic
// composition-policy animation come in Phase 2.

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { RegistrySource, ComponentId, FamilyId } from "../lib/shared";
import { FAMILY_COLOR } from "../lib/shared";

// R3F is client-only; defer all of it behind a dynamic import so the static
// export doesn't try to SSR Three.js.
const SceneInner = dynamic(() => import("./AlephScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      Loading kernel…
    </div>
  ),
});

export type KernelNode = {
  id: string;
  label: string;
  group:
    | "primitive"
    | "family"
    | "component"
    | "prefix"
    | "attester"
    | "claim";
  component: string | null;
  family: string | null;
  band: number;
  multi_scale?: boolean;
};

export type KernelEdge = {
  source: string;
  target: string;
  kind: string;
};

export type KernelGraph = {
  nodes: KernelNode[];
  edges: KernelEdge[];
};

export type CorridorMetric = {
  k: number;
  rho_estimate: number;
  k_eff: number;
};

export type InstanceMeta = {
  node_idx: number;
  band: number;
  node_id: string;
};

export type EdgeGeom = {
  source_instance: number;
  target_instance: number;
  curvature: number;
  kind: string;
};

// Build the kernel input from the parsed CEG namespace + the structural
// primitives + the five families.
function buildKernelGraph(source: RegistrySource): KernelGraph {
  const nodes: KernelNode[] = [];
  const edges: KernelEdge[] = [];

  // Phase 1 default: every CEG-namespace node lives at the Cell band (4).
  // Future phases will use the multi-scale embedding.
  const DEFAULT_BAND = 4;

  // 1 + 4 structural primitives, multi-scale (appear at every band)
  const primitives = [
    "scores",
    "delegates_to",
    "supersedes",
    "withdraws",
    "recants",
  ];
  primitives.forEach((p) => {
    nodes.push({
      id: `prim:${p}`,
      label: p,
      group: "primitive",
      component: null,
      family: null,
      band: DEFAULT_BAND,
      multi_scale: true,
    });
  });
  // composer → scores
  ["delegates_to", "supersedes", "withdraws", "recants"].forEach((p) => {
    edges.push({
      source: `prim:${p}`,
      target: "prim:scores",
      kind: "operates_on",
    });
  });

  // Five families
  const families: FamilyId[] = [
    "STANDING",
    "ACTION",
    "DETECTION",
    "CONSENSUS",
    "CORRECTION",
  ];
  families.forEach((f) => {
    nodes.push({
      id: `family:${f}`,
      label: f,
      group: "family",
      component: null,
      family: f,
      band: DEFAULT_BAND,
      multi_scale: true,
    });
    edges.push({
      source: "prim:scores",
      target: `family:${f}`,
      kind: "composes",
    });
  });

  // Components (every component that owns a prefix)
  const componentsSeen = new Set<ComponentId>();
  for (const ns of source.namespace) {
    componentsSeen.add(ns.component);
  }
  Array.from(componentsSeen).forEach((c) => {
    nodes.push({
      id: `comp:${c}`,
      label: c,
      group: "component",
      component: c,
      family: null,
      band: DEFAULT_BAND,
      multi_scale: false,
    });
  });

  // Prefix-family leaves
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
          band: DEFAULT_BAND,
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

  return { nodes, edges };
}

// Per-node colour: anchors use brand-neutral grey; family-anchored prefixes
// take their family colour; components take a neutral.
export function nodeColor(node: KernelNode): string {
  if (node.group === "primitive") return "#0f172a";
  if (node.group === "family" && node.family) {
    return FAMILY_COLOR[node.family as FamilyId] ?? "#64748b";
  }
  if (node.group === "component") return "#64748b";
  if (node.group === "prefix" && node.family) {
    return FAMILY_COLOR[node.family as FamilyId] ?? "#94a3b8";
  }
  return "#94a3b8";
}

export default function AlephView({ source }: { source: RegistrySource }) {
  const graph = useMemo(() => buildKernelGraph(source), [source]);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [instanceMeta, setInstanceMeta] = useState<InstanceMeta[] | null>(null);
  const [edgeGeoms, setEdgeGeoms] = useState<EdgeGeom[] | null>(null);
  const [corridor, setCorridor] = useState<CorridorMetric | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import("coherence-kernel");
        const kernel = new mod.CoherenceKernel();
        kernel.set_graph(JSON.stringify(graph));
        const layout = kernel.layout();
        const positionsCopy = new Float32Array(layout);
        const meta = kernel.instance_meta() as InstanceMeta[];
        const edges = kernel.edge_geometry() as EdgeGeom[];
        const corridorMetric = kernel.corridor() as CorridorMetric;
        if (!cancelled) {
          setPositions(positionsCopy);
          setInstanceMeta(meta);
          setEdgeGeoms(edges);
          setCorridor(corridorMetric);
        }
      } catch (e) {
        if (!cancelled) {
          setError(String(e));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [graph]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-300">
        Failed to load Coherence kernel: {error}
      </div>
    );
  }
  if (!positions || !instanceMeta || !edgeGeoms) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-500 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-400">
        Loading kernel and computing layout…
      </div>
    );
  }

  return (
    <section
      className="relative space-y-4"
      aria-label="Coherence Aleph view, seven-scale CEG namespace"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Aleph · Phase 1
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            The seven-scale tower
          </h2>
        </div>
        {corridor && (
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-gray-800 dark:bg-gray-900">
            <span className="text-slate-500 dark:text-slate-400">
              corridor:
            </span>{" "}
            <span className="font-mono">k = {corridor.k}</span> ·{" "}
            <span className="font-mono">
              ρ ≈ {corridor.rho_estimate.toFixed(2)}
            </span>{" "}
            ·{" "}
            <span className="font-mono">
              k_eff = {corridor.k_eff.toFixed(2)}
            </span>
          </div>
        )}
      </header>
      <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        Biosphere is the ground plane every node draws against, not a 7th
        top floor. Six bands stack above: key, occurrence, agent, fleet,
        cell, federation. Phase 1 places the CEG namespace at the cell band.
        Phase 2 animates nodes between bands as you traverse the federation.
        The corridor readout shows the Phase 1 heuristic of k_eff from
        family-membership; the real composition-policy run lands in Phase 2.
      </p>

      <div className="h-[60vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-gray-800 dark:from-gray-950 dark:to-black">
        <SceneInner
          graph={graph}
          positions={positions}
          instanceMeta={instanceMeta}
          edgeGeoms={edgeGeoms}
          onHoverChange={setHoverId}
        />
      </div>
      {hoverId && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Hovering{" "}
          <span className="font-mono font-semibold text-brand-primary">
            {hoverId.replace(/^prim:|^family:|^comp:|^prefix:/, "")}
          </span>,{" "}
          multi-scale nodes glow at every band where they appear.
        </p>
      )}

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Powered by the{" "}
        <span className="font-mono">coherence-kernel</span> Rust crate
        compiled to WASM via wasm-bindgen, rendered through{" "}
        <span className="font-mono">@react-three/fiber</span>. The same
        kernel will ship into CIRISAgent (PyO3) and the mobile app (UniFFI).
        See <a
          href="https://github.com/CIRISAI/CIRISAgent/issues/835"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:underline"
        >
          CIRISAgent#835
        </a>{" "}
        for the design intent.
      </p>
    </section>
  );
}
