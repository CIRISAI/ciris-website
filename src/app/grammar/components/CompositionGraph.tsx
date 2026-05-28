"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type {
  RegistrySource,
  FamilyId,
  ComponentId,
} from "../lib/shared";
import { FAMILY_COLOR, FAMILY_LABEL, COMPONENT_ORDER } from "../lib/shared";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      Loading graph…
    </div>
  ),
});

type GraphNode = {
  id: string;
  label: string;
  group: "primitive" | "family" | "component" | "prefix";
  family?: FamilyId;
  component?: ComponentId;
  size: number;
  x?: number;
  y?: number;
};

type GraphLink = { source: string; target: string; kind: string };

const PRIMITIVE_NODES: GraphNode[] = [
  { id: "prim:scores", label: "scores", group: "primitive", size: 12 },
  {
    id: "prim:delegates_to",
    label: "delegates_to",
    group: "primitive",
    size: 8,
  },
  { id: "prim:supersedes", label: "supersedes", group: "primitive", size: 8 },
  { id: "prim:withdraws", label: "withdraws", group: "primitive", size: 8 },
  { id: "prim:recants", label: "recants", group: "primitive", size: 8 },
];

const FAMILIES: FamilyId[] = [
  "STANDING",
  "ACTION",
  "DETECTION",
  "CONSENSUS",
  "CORRECTION",
];

function buildGraph(source: RegistrySource) {
  const nodes: GraphNode[] = [...PRIMITIVE_NODES];
  const links: GraphLink[] = [];

  // The four structural composers all operate on prior `scores` attestations
  // (delegates_to authorizes a signer on scores claims; supersedes /
  // withdraws / recants replace, retract, or admit-falsity on prior scores
  // attestations). Wire them in so they aren't orphaned at the edge of the
  // canvas.
  for (const composer of [
    "prim:delegates_to",
    "prim:supersedes",
    "prim:withdraws",
    "prim:recants",
  ]) {
    links.push({ source: composer, target: "prim:scores", kind: "operates_on" });
  }

  for (const f of FAMILIES) {
    nodes.push({ id: `family:${f}`, label: f, group: "family", size: 10, family: f });
    // Each family stems from `scores` (the workhorse) by composition
    links.push({ source: "prim:scores", target: `family:${f}`, kind: "composes" });
  }
  for (const c of COMPONENT_ORDER) {
    nodes.push({
      id: `comp:${c}`,
      label: c,
      group: "component",
      size: 8,
      component: c,
    });
  }
  for (const ns of source.namespace) {
    for (const sub of ns.subsections) {
      for (const row of sub.rows) {
        const nid = `prefix:${row.prefix}`;
        // Dedupe (some prefixes might repeat across sub-sections, though rare)
        if (!nodes.find((n) => n.id === nid)) {
          nodes.push({
            id: nid,
            label: row.prefix,
            group: "prefix",
            size: 3,
            family: row.family ?? undefined,
            component: row.component,
          });
        }
        if (row.family) {
          links.push({
            source: `family:${row.family}`,
            target: nid,
            kind: "belongs_to",
          });
        }
        links.push({
          source: `comp:${row.component}`,
          target: nid,
          kind: "owned_by",
        });
      }
    }
  }
  return { nodes, links };
}

function colorFor(node: GraphNode, dim: boolean): string {
  const alpha = dim ? "55" : "ff";
  if (node.group === "primitive") {
    return `#0f172a${alpha}`;
  }
  if (node.group === "family" && node.family) {
    return `${FAMILY_COLOR[node.family]}${alpha}`;
  }
  if (node.group === "component") {
    return `#64748b${alpha}`;
  }
  if (node.group === "prefix" && node.family) {
    return `${FAMILY_COLOR[node.family]}${alpha}`;
  }
  return `#94a3b8${alpha}`;
}

export default function CompositionGraph({
  source,
}: {
  source: RegistrySource;
}) {
  const graphData = useMemo(() => buildGraph(source), [source]);
  const fgRef = useRef<{
    pauseAnimation?: () => void;
    resumeAnimation?: () => void;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrapperRef.current) return;
        const w = wrapperRef.current.clientWidth;
        const h = wrapperRef.current.clientHeight;
        setDims((prev) =>
          prev.width === w && prev.height === h ? prev : { width: w, height: h },
        );
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) fgRef.current?.pauseAnimation?.();
      else fgRef.current?.resumeAnimation?.();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      fgRef.current?.pauseAnimation?.();
    };
  }, []);

  const highlight = useMemo<Set<string> | null>(() => {
    if (!selected) return null;
    const set = new Set([selected]);
    for (const l of graphData.links) {
      const s =
        typeof l.source === "object" ? (l.source as GraphNode).id : l.source;
      const t =
        typeof l.target === "object" ? (l.target as GraphNode).id : l.target;
      if (s === selected) set.add(t);
      if (t === selected) set.add(s);
    }
    return set;
  }, [selected, graphData.links]);

  const selectedNode = selected
    ? graphData.nodes.find((n) => n.id === selected)
    : null;

  return (
    <section id="graph" className="space-y-4">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Composition graph
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          The five structural primitives at the center, the five families
          around them, the {COMPONENT_ORDER.length} owning components in the
          outer ring, and {source.totalPrefixes} prefix families as leaf
          nodes. Click any node to focus its neighborhood.
        </p>
      </header>

      <div
        ref={wrapperRef}
        className="relative h-[60vh] min-h-[460px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      >
        {dims.width > 0 && (
          <ForceGraph2D
            ref={fgRef as never}
            width={dims.width}
            height={dims.height}
            graphData={graphData}
            nodeRelSize={4}
            nodeId="id"
            linkColor={() => "rgba(100,116,139,0.18)"}
            linkWidth={0.6}
            cooldownTicks={150}
            warmupTicks={60}
            enableNodeDrag={false}
            onNodeClick={(node: unknown) => {
              const n = node as GraphNode;
              setSelected((cur) => (cur === n.id ? null : n.id));
            }}
            nodeCanvasObject={(node: unknown, ctx, globalScale) => {
              const n = node as GraphNode;
              const dim = highlight ? !highlight.has(n.id) : false;
              const color = colorFor(n, dim);
              ctx.beginPath();
              ctx.arc(n.x ?? 0, n.y ?? 0, n.size, 0, 2 * Math.PI, false);
              ctx.fillStyle = color;
              ctx.fill();
              if (selected === n.id) {
                ctx.lineWidth = 2 / globalScale;
                ctx.strokeStyle = "#0ea5e9";
                ctx.stroke();
              }
              const fontSize =
                n.group === "primitive" ? 12 : n.group === "family" ? 11 : n.group === "component" ? 10 : 7;
              ctx.font = `${fontSize / globalScale}px ui-monospace, monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              const labelColor = dim
                ? "rgba(100,116,139,0.4)"
                : "rgba(15,23,42,0.95)";
              ctx.fillStyle = labelColor;
              const label =
                n.group === "prefix" && globalScale < 1.5 ? "" : n.label;
              if (label) {
                ctx.fillText(
                  label,
                  n.x ?? 0,
                  (n.y ?? 0) + n.size + fontSize / globalScale,
                );
              }
            }}
            nodePointerAreaPaint={(node: unknown, color, ctx) => {
              const n = node as GraphNode;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(n.x ?? 0, n.y ?? 0, n.size + 3, 0, 2 * Math.PI);
              ctx.fill();
            }}
          />
        )}

        {/* Floating legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-slate-200 bg-white/90 p-2 text-[10px] backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
          <div className="mb-1 font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            Legend
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
              primitive
            </span>
            {FAMILIES.map((f) => (
              <span key={f} className="flex items-center gap-1">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: FAMILY_COLOR[f] }}
                />
                {FAMILY_LABEL[f]}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
              component
            </span>
          </div>
        </div>

        {/* Selection info */}
        {selectedNode && (
          <div className="pointer-events-none absolute right-3 top-3 max-w-xs rounded-md border border-brand-primary/30 bg-white/95 p-3 text-xs shadow-lg backdrop-blur dark:border-brand-primary/40 dark:bg-gray-900/95">
            <p className="font-mono text-sm font-semibold text-brand-primary">
              {selectedNode.label}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {selectedNode.group}
              {selectedNode.family ? ` · ${FAMILY_LABEL[selectedNode.family]}` : ""}
              {selectedNode.component ? ` · ${selectedNode.component}` : ""}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
