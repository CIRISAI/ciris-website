"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Seed } from "../lib/shared";

// react-force-graph-2d touches `window` on import; disable SSR.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      Loading graph…
    </div>
  ),
});

type GraphNode = {
  id: string;
  label: string;
  group: "principle" | "dimension" | "primitive";
  tier?: string;
  // Force-graph fills these in:
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
};

type GraphLink = { source: string; target: string; kind: string };

const ACCORD_COLOR: Record<string, string> = {
  beneficence: "#10b981",
  non_maleficence: "#ef4444",
  integrity: "#3b82f6",
  fidelity: "#8b5cf6",
  autonomy: "#f59e0b",
  justice: "#ec4899",
};

function principleNodeId(p: string) {
  return `principle:${p}`;
}

function primitiveNodeId(prefix: string) {
  return `primitive:${normalizePrimitive(prefix)}`;
}

function normalizePrimitive(s: string): string {
  // Strip trailing ":*" / leading parens / annotations like "(soft scalar)"
  return s
    .replace(/\s*\([^)]*\)\s*/g, "")
    .trim()
    .replace(/:\*$/, ":*");
}

function buildGraph(seed: Seed): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const seenPrimitive = new Set<string>();

  // Principle hub nodes
  for (const p of Object.keys(seed.aggregate_indices.by_accord_principle)) {
    nodes.push({
      id: principleNodeId(p),
      label: p,
      group: "principle",
    });
  }

  // Dimension nodes + edges to principle + primitives
  for (const d of seed.dimensions) {
    nodes.push({
      id: d.id,
      label: d.id,
      group: "dimension",
      tier: d.tier,
    });
    links.push({
      source: principleNodeId(d.accord_principle),
      target: d.id,
      kind: "serves",
    });
    for (const wp of d.wire_primitives) {
      const nid = primitiveNodeId(wp);
      if (!seenPrimitive.has(nid)) {
        seenPrimitive.add(nid);
        nodes.push({
          id: nid,
          label: normalizePrimitive(wp),
          group: "primitive",
        });
      }
      links.push({ source: d.id, target: nid, kind: "carried_by" });
    }
  }

  return { nodes, links };
}

function colorForNode(
  node: GraphNode,
  seed: Seed,
  highlight: Set<string> | null,
): string {
  const dim = highlight && !highlight.has(node.id);
  const alpha = dim ? "55" : "ff";
  if (node.group === "principle") {
    return `${ACCORD_COLOR[node.label] ?? "#64748b"}${alpha}`;
  }
  if (node.group === "dimension") {
    const dimensionRecord = seed.dimensions.find((d) => d.id === node.id);
    const principle = dimensionRecord?.accord_principle ?? "";
    const base = ACCORD_COLOR[principle] ?? "#64748b";
    return `${base}${alpha}`;
  }
  // primitive
  return `#0f172a${alpha}`;
}

function sizeForNode(node: GraphNode): number {
  if (node.group === "principle") return 9;
  if (node.group === "dimension") return 6;
  return 4;
}

export default function SemanticsGraph({
  seed,
  selectedId,
  onSelect,
}: {
  seed: Seed;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const graphData = useMemo(() => buildGraph(seed), [seed]);
  const fgRef = useRef<{
    pauseAnimation?: () => void;
    resumeAnimation?: () => void;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Throttled resize observer
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrapperRef.current) return;
        const nw = wrapperRef.current.clientWidth;
        const nh = wrapperRef.current.clientHeight;
        setDims((prev) =>
          prev.width === nw && prev.height === nh ? prev : { width: nw, height: nh },
        );
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Stop the force-graph animation loop on unmount + when tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        fgRef.current?.pauseAnimation?.();
      } else {
        fgRef.current?.resumeAnimation?.();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      fgRef.current?.pauseAnimation?.();
    };
  }, []);

  // Highlight: selected node + its 1-hop neighborhood
  const highlight = useMemo<Set<string> | null>(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const l of graphData.links) {
      const s = typeof l.source === "object" ? (l.source as GraphNode).id : l.source;
      const t = typeof l.target === "object" ? (l.target as GraphNode).id : l.target;
      if (s === selectedId) set.add(t);
      if (t === selectedId) set.add(s);
    }
    return set;
  }, [selectedId, graphData.links]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      {dims.width > 0 && (
        <ForceGraph2D
          ref={fgRef as never}
          width={dims.width}
          height={dims.height}
          graphData={graphData}
          nodeRelSize={5}
          nodeId="id"
          linkColor={() => "rgba(100,116,139,0.25)"}
          linkWidth={0.8}
          cooldownTicks={120}
          warmupTicks={40}
          enableNodeDrag={false}
          onNodeClick={(node: unknown) => {
            const n = node as GraphNode;
            onSelect(n.id === selectedId ? null : n.id);
          }}
          nodeCanvasObject={(node: unknown, ctx, globalScale) => {
            const n = node as GraphNode;
            const r = sizeForNode(n);
            const color = colorForNode(n, seed, highlight);
            ctx.beginPath();
            ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            if (selectedId === n.id) {
              ctx.lineWidth = 2 / globalScale;
              ctx.strokeStyle = "#0ea5e9";
              ctx.stroke();
            }
            const label =
              n.group === "principle"
                ? n.label.replace(/_/g, " ")
                : n.group === "dimension"
                  ? n.id
                  : n.label;
            const fontSize =
              n.group === "principle" ? 12 : n.group === "dimension" ? 10 : 8;
            ctx.font = `${fontSize / globalScale}px ui-sans-serif, system-ui`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const labelColor =
              highlight && !highlight.has(n.id)
                ? "rgba(100,116,139,0.4)"
                : "rgba(15,23,42,0.95)";
            ctx.fillStyle = labelColor;
            ctx.fillText(label, n.x ?? 0, (n.y ?? 0) + r + fontSize / globalScale);
          }}
          nodePointerAreaPaint={(node: unknown, color, ctx) => {
            const n = node as GraphNode;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(n.x ?? 0, n.y ?? 0, sizeForNode(n) + 2, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
      )}
      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-slate-200 bg-white/90 p-2 text-[10px] backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
        <div className="mb-1 font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Legend
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-700 dark:text-slate-300">
          {Object.entries(ACCORD_COLOR).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: v }}
              />
              {k.replace(/_/g, " ")}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-slate-100" />
            wire primitive
          </span>
        </div>
      </div>
    </div>
  );
}
