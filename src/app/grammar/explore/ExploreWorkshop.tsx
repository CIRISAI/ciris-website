"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RegistrySource } from "../lib/shared";
import type {
  KernelGraph,
  KernelNode,
  KernelEdge,
  CorridorMetric,
  InstanceMeta,
  EdgeGeom,
} from "../components/AlephView";
import AlephScene, { nudgeZoom } from "../components/AlephScene";
import { perf, isBenchEnabled, type BenchSample } from "./lib/perf";
import { ALL_STORIES } from "../lib/stories-generated";
import {
  buildEncyclopediaGraph,
  buildGameGraph,
  buildDemoGraph,
  DEMO_TIME_MAX,
  summariseGraph,
  type CorpusMode,
} from "../lib/corpus-graph";
import {
  RRH_TAGLINE,
  rrhVoiceById,
} from "../lib/red-riding-hood";
import { CHARACTERS } from "../lib/characters-generated";
import { ALL_PUBLICATIONS } from "@/app/game/lib/publications";
import { CASES } from "@/app/game/lib/cases-generated";

const CHARS_BY_ID = new Map(CHARACTERS.map((c) => [c.id, c]));
const PUBS_BY_ID = new Map(ALL_PUBLICATIONS.map((p) => [p.id, p]));
const CASES_BY_ID = new Map(CASES.map((c) => [c.id, c]));
const STORIES_BY_ID = new Map(ALL_STORIES.map((s) => [s.id, s]));

// Hook-side mount gate. Avoids the dynamic({ssr:false}) chunk-boundary that
// was hanging on Vercel's static export. Three.js and R3F live in the same
// bundle as the workshop now; client-only behaviour is enforced by
// rendering the Canvas only after the first effect tick on the client.
function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

type Attester = {
  id: string;
  name: string;
  hue: string;
};

// One synthetic attester per story-generation agent. Built from the
// kindfuture corpus — these are the real federation voices the workshop
// composes verdicts over.
const STORY_AGENT_HUES: Record<string, string> = {
  agent_1: "#2dd4bf",
  agent_2: "#a78bfa",
  agent_3: "#fbbf24",
  agent_4: "#f472b6",
  agent_5: "#22d3ee",
  agent_6: "#84cc16",
  agent_7: "#fb923c",
  agent_8: "#c084fc",
  agent_9: "#34d399",
};
function storyAgentHue(srcAgent: string): string {
  return STORY_AGENT_HUES[srcAgent] ?? "#94a3b8";
}

// Distinct source-agent ids in corpus order. Cached at module init so the
// roster is stable across renders.
const STORY_AGENTS: Attester[] = (() => {
  const seen = new Set<string>();
  const list: Attester[] = [];
  for (const s of ALL_STORIES) {
    if (seen.has(s.sourceAgent)) continue;
    seen.add(s.sourceAgent);
    list.push({
      id: `story_${s.sourceAgent}`,
      name: `${s.sourceAgent.replace("_", " ")} (kindfuture corpus)`,
      hue: storyAgentHue(s.sourceAgent),
    });
  }
  return list;
})();

// What the UI calls the available roster. Aliased to story-agents so the
// rest of the workshop reads naturally.
const ATTESTER_ROSTER: Attester[] = STORY_AGENTS;

// Deterministic pseudo-score from story id. We need a score per seeded
// claim but the corpus doesn't carry one; this gives a stable spread in
// [0.4, 0.95] from the id hash so the viz has something to render.
function seedScore(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return 0.4 + (Math.abs(h) % 56) / 100;
}
function seedConfidence(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) | 0;
  return 0.6 + (Math.abs(h) % 36) / 100;
}

type Claim = {
  id: string;
  attester: string;
  dimension: string;
  score: number;
  confidence: number;
};

type Policy = "A" | "B" | "C";

type Verdict = {
  dimension: string;
  composed_score: number;
  composed_confidence: number;
  supporting_count: number;
};

function buildWorkshopGraph(
  pinned: Set<string>,
  claims: Claim[],
  vouches: Set<string>,
  seedCount: number,
): KernelGraph {
  const nodes: KernelNode[] = [];
  const edges: KernelEdge[] = [];

  // Structural primitives (multi-scale)
  ["scores", "delegates_to", "supersedes", "withdraws", "recants"].forEach(
    (p) => {
      nodes.push({
        id: `prim:${p}`,
        label: p,
        group: "primitive",
        component: null,
        family: null,
        band: 4,
        multi_scale: true,
      });
    },
  );

  // All roster attesters are present as nodes. Pinning is a trust signal
  // (Policy A/B input), not a presence signal — non-pinned attesters can
  // still post claims and can still be vouched-for under Policy B.
  // Assign a family to each attester deterministically so the kernel's
  // attester placement spreads them around the disk.
  const FAMILIES = ["STANDING", "ACTION", "DETECTION", "CONSENSUS", "CORRECTION"];
  ATTESTER_ROSTER.forEach((a, i) => {
    nodes.push({
      id: a.id,
      label: a.name,
      group: "attester",
      component: null,
      family: FAMILIES[i % FAMILIES.length],
      band: 4,
      multi_scale: false,
    });
  });

  // Vouches: encoded as `vouches_for` edges between attester nodes. The
  // kernel's policy_b_pure() reads these to compute one-hop trust closure.
  for (const v of vouches) {
    const [from, to] = v.split(":");
    if (!from || !to) continue;
    edges.push({ source: from, target: to, kind: "vouches_for" });
  }

  // Claims (band Cell). Label encodes the kernel's policy_a input shape.
  for (const c of claims) {
    nodes.push({
      id: c.id,
      label: `${c.attester}|${c.dimension}|${c.score}|${c.confidence}`,
      group: "claim",
      component: null,
      family: null,
      band: 4,
      multi_scale: false,
    });
    edges.push({
      source: c.attester,
      target: c.id,
      kind: "asserts",
    });
    // Connect the claim into the scores primitive so the workshop graph
    // is visibly anchored to the workhorse.
    edges.push({
      source: c.id,
      target: "prim:scores",
      kind: "asserts",
    });
  }
  // Seed corpus: synthesise N story-attestations from the kindfuture
  // corpus. Each story becomes a claim on its primary dimension from
  // its source-agent attester. The attester nodes themselves come from
  // ATTESTER_ROSTER above; the seed loop emits only claims.
  if (seedCount > 0) {
    const N = Math.min(seedCount, ALL_STORIES.length);
    for (let i = 0; i < N; i++) {
      const story = ALL_STORIES[i];
      const dim = story.dimensions[0] ?? story.primitives[0];
      if (!dim) continue;
      const attesterId = `story_${story.sourceAgent}`;
      const claimId = `seed:${story.id}`;
      const score = seedScore(story.id);
      const conf = seedConfidence(story.id);
      nodes.push({
        id: claimId,
        label: `${attesterId}|${dim}|${score}|${conf}`,
        group: "claim",
        component: null,
        family: story.family ?? null,
        band: 4,
        multi_scale: false,
      });
      edges.push({ source: attesterId, target: claimId, kind: "asserts" });
      edges.push({ source: claimId, target: "prim:scores", kind: "asserts" });
    }
  }
  // Suppress unused warning for `pinned` — kept in the signature because
  // it's part of the workshop's conceptual surface and may influence
  // graph shape in later phases.
  void pinned;

  return { nodes, edges };
}

// Most-frequent dimensions across the corpus. Lets the dimension picker
// default to something the seeded claims actually score on.
const STARTER_DIMENSIONS: string[] = (() => {
  const counts = new Map<string, number>();
  for (const s of ALL_STORIES) {
    for (const d of s.dimensions) counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([d]) => d);
})();

export default function ExploreWorkshop({
  source: _source,
}: {
  // Source is plumbed through for Phase 3 where the workshop pulls real
  // dimensions from the namespace. Currently unused.
  source: RegistrySource;
}) {
  // Workshop state. Default-pin the first two story agents so the
  // verdict has something to compose against on first paint; vouches
  // wire one pinned agent to one non-pinned one so Policy B starts with
  // motion.
  const firstAgentId = ATTESTER_ROSTER[0]?.id;
  const secondAgentId = ATTESTER_ROSTER[1]?.id;
  const thirdAgentId = ATTESTER_ROSTER[2]?.id;
  const [pinned, setPinned] = useState<Set<string>>(
    new Set(
      [firstAgentId, secondAgentId].filter((s): s is string => !!s),
    ),
  );
  const [claims, setClaims] = useState<Claim[]>([]);
  const [policy, setPolicy] = useState<Policy>("A");
  const [currentDimension, setCurrentDimension] = useState<string>(
    STARTER_DIMENSIONS[0] ?? "integrity:transparency",
  );

  // Vouches: each entry is "<from>:<to>" where from vouches for to.
  const [vouches, setVouches] = useState<Set<string>>(
    firstAgentId && thirdAgentId
      ? new Set([`${firstAgentId}:${thirdAgentId}`])
      : new Set(),
  );

  // Corpus seed size — number of stories from the kindfuture corpus to
  // materialise as claim nodes. Defaults to 40 so the first paint shows a
  // populated graph instead of the 5-node minimal viz.
  const [seedCount, setSeedCount] = useState<number>(40);

  // Corpus mode — selects which graph is rendered:
  //   workshop:     the small interactive verdict workshop (legacy)
  //   game:         100 characters + 12 publications + 5 case-goals
  //                 at Federation band + 240 story-holding claims
  //   encyclopedia: the namespace prefixes + The Cascadia Encyclopedia
  //                 attesting on definitional dimensions
  //
  // Default = "encyclopedia" because it is the lightest of the three
  // (154 nodes vs the game's 450) and still showcases the full CEG
  // namespace. Mobile GPUs choked on game mode by default with 2k+
  // edge geometries at first paint.
  const [corpusMode, setCorpusMode] = useState<"workshop" | CorpusMode>(
    "encyclopedia",
  );
  // Demo time slider — only meaningful when corpusMode === "demo".
  // Voices and attestations enter the graph as time advances. At t=0
  // only the Wolf is testifying; at t=10 the Village Crier has
  // superseded his lies.
  const [demoTime, setDemoTime] = useState<number>(DEMO_TIME_MAX);

  // Kernel state. The kernel type is opaque from JS-side (it's a wasm-bindgen
  // class); we cast at call boundaries.
  type KernelInstance = {
    set_graph: (json: string) => void;
    layout: () => Float32Array;
    instance_meta: () => InstanceMeta[];
    edge_geometry: () => EdgeGeom[];
    corridor: () => CorridorMetric;
    policy_a: (pinned: string, dim: string) => Verdict;
    policy_b: (pinned: string, dim: string) => Verdict;
  };
  const kernelRef = useRef<KernelInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  // Topology filter state — runtime knobs that hide groups or focus a
  // single CEG concern area without changing the kernel graph. Hiding a
  // group also drops any edges where the hidden node is either end, so
  // the scene declutters cleanly.
  const [hideGroups, setHideGroups] = useState<Set<string>>(
    new Set(["primitive"]),
  );
  const [focusFamily, setFocusFamily] = useState<string | null>(null);

  // Wire the perf harness early so the first kernel.set_graph capture
  // happens after enabling. SceneFrame separately installs the per-frame
  // tick once the canvas mounts.
  useEffect(() => {
    perf.setEnabled(isBenchEnabled());
  }, []);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [instanceMeta, setInstanceMeta] = useState<InstanceMeta[] | null>(
    null,
  );
  const [edgeGeoms, setEdgeGeoms] = useState<EdgeGeom[] | null>(null);
  const [corridor, setCorridor] = useState<CorridorMetric | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [corridorHistory, setCorridorHistory] = useState<CorridorMetric[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hasMounted = useHasMounted();

  // Init kernel once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import("coherence-kernel");
        const instance = new mod.CoherenceKernel();
        if (cancelled) return;
        kernelRef.current = instance as unknown as KernelInstance;
        setReady(true);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Recompute graph + corridor + verdict whenever state changes
  const graph = useMemo(() => {
    if (corpusMode === "game") return buildGameGraph();
    if (corpusMode === "encyclopedia") return buildEncyclopediaGraph(_source);
    if (corpusMode === "demo") return buildDemoGraph(demoTime);
    return buildWorkshopGraph(pinned, claims, vouches, seedCount);
  }, [corpusMode, demoTime, pinned, claims, vouches, seedCount, _source]);
  const graphSummary = useMemo(() => summariseGraph(graph), [graph]);
  // Compute the set of hidden node ids from the filters. Hidden nodes
  // still exist in the kernel (positions, verdict, corridor all still
  // compute against the full graph), but the scene skips drawing
  // them and any edge touching them.
  const hiddenNodeIds = useMemo(() => {
    const set = new Set<string>();
    for (const n of graph.nodes) {
      if (hideGroups.has(n.group)) {
        set.add(n.id);
        continue;
      }
      if (focusFamily && n.family && n.family !== focusFamily) {
        // Don't hide structural primitives / spine when focusing — they
        // anchor the geometry. Only hide attesters/claims of other
        // families.
        if (n.group === "attester" || n.group === "claim") {
          set.add(n.id);
        }
      }
    }
    return set;
  }, [graph, hideGroups, focusFamily]);

  useEffect(() => {
    if (!ready || !kernelRef.current) return;
    try {
      const buildStart = performance.now();
      kernelRef.current.set_graph(JSON.stringify(graph));
      const buildMs = performance.now() - buildStart;
      const layoutStart = performance.now();
      const positionsCopy = new Float32Array(kernelRef.current.layout());
      const layoutMs = performance.now() - layoutStart;
      const meta = kernelRef.current.instance_meta() as InstanceMeta[];
      const eg = kernelRef.current.edge_geometry() as EdgeGeom[];
      const c = kernelRef.current.corridor() as CorridorMetric;
      setPositions(positionsCopy);
      setInstanceMeta(meta);
      setEdgeGeoms(eg);
      setCorridor(c);
      setCorridorHistory((h) => [...h, c].slice(-30));
      perf.markKernelPhase("build", buildMs);
      perf.markKernelPhase("layout", layoutMs);
      perf.markGraph(graph.nodes.length, graph.edges.length, eg.length);

      const pinnedArr = JSON.stringify(Array.from(pinned));
      let v: Verdict;
      if (policy === "B") {
        v = kernelRef.current.policy_b(pinnedArr, currentDimension);
      } else {
        // Policy A (default). Policy C lands in 2.5.
        v = kernelRef.current.policy_a(pinnedArr, currentDimension);
      }
      setVerdict(v);
    } catch (e) {
      setError(String(e));
    }
  }, [graph, ready, policy, pinned, currentDimension]);

  // Workshop actions
  function togglePin(id: string) {
    setPinned((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }
  function addClaim(attester: string, score: number, confidence: number) {
    const id = `claim-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setClaims((cs) => [
      ...cs,
      {
        id,
        attester,
        dimension: currentDimension,
        score,
        confidence,
      },
    ]);
  }
  function removeClaim(id: string) {
    setClaims((cs) => cs.filter((c) => c.id !== id));
  }
  function clearClaims() {
    setClaims([]);
    setCorridorHistory([]);
  }
  function toggleVouch(from: string, to: string) {
    const key = `${from}:${to}`;
    setVouches((vs) => {
      const n = new Set(vs);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-300">
        Workshop failed to initialise: {error}
      </div>
    );
  }
  if (!ready || !positions || !instanceMeta || !edgeGeoms) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-500 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-400">
        Loading kernel…
      </div>
    );
  }

  // Canvas-first progressive disclosure:
  //   1. The graph IS the page. Top of the column, full width.
  //   2. The node detail panel is the second-most-semantic surface.
  //      It opens directly under the graph when a sphere is selected.
  //   3. Everything else — mode notes, palette, verdict, corridor,
  //      workshop controls, diagnostics — collapses into a column of
  //      named <details> sections below.
  //   4. The mode toggle stays as three chips at the very top because
  //      it's a navigation control, not a panel.
  //
  // Visual register: one ink colour, one accent, hairline borders, no
  // decorative gradients. Tufte / Vignelli / single-pane editorial.
  return (
    <div className="space-y-4">
      {/* Mode chips — four buttons, compact, one row */}
      <CorpusModeStrip
        mode={corpusMode}
        onChange={setCorpusMode}
        summary={graphSummary}
      />

      {/* Demo time slider — only when Red Riding Hood mode is active. */}
      {corpusMode === "demo" && (
        <DemoTimeSlider value={demoTime} onChange={setDemoTime} />
      )}

      {/* Topology filters — CEG-powered sliders/toggles that hide
          groups or focus a single concern area. */}
      <TopologyFilters
        hideGroups={hideGroups}
        onToggleGroup={(g) =>
          setHideGroups((prev) => {
            const next = new Set(prev);
            if (next.has(g)) next.delete(g);
            else next.add(g);
            return next;
          })
        }
        focusFamily={focusFamily}
        onFocusFamily={setFocusFamily}
        summary={graphSummary}
      />

      {/* Canvas — the page */}
      <SceneFrame
        mounted={hasMounted}
        graph={graph}
        positions={positions}
        instanceMeta={instanceMeta}
        edgeGeoms={edgeGeoms}
        selectedNodeId={selectedNodeId}
        hiddenNodeIds={hiddenNodeIds}
        onPickNode={setSelectedNodeId}
      />

      {/* Detail — what you clicked on */}
      {selectedNodeId ? (
        <NodeDetailPanel
          graph={graph}
          nodeId={selectedNodeId}
          source={_source}
          onPick={setSelectedNodeId}
          onClose={() => setSelectedNodeId(null)}
        />
      ) : (
        <p className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-center text-xs text-slate-500 dark:border-gray-700">
          Tap a sphere in the graph to read what it is.
        </p>
      )}

      {/* Progressive-disclosure column: everything else */}
      <DisclosureSection title="What you are looking at" defaultOpen>
        <CorpusModeNotes mode={corpusMode} summary={graphSummary} />
      </DisclosureSection>

      {(verdict || corridor) && (
        <DisclosureSection title="Numbers from the trusted voices">
          <div className="grid gap-3 md:grid-cols-2">
            {verdict && (
              <div className="rounded-md border border-slate-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  What the trusted voices think (Policy {policy})
                </p>
                <p className="mt-1 break-all font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  on: {verdict.dimension}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {verdict.composed_score >= 0 ? "+" : ""}
                  {verdict.composed_score.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  blended score · how sure they are:{" "}
                  {Math.round(verdict.composed_confidence * 100)}% · backed
                  by {verdict.supporting_count}{" "}
                  {verdict.supporting_count === 1 ? "voice" : "voices"}
                </p>
              </div>
            )}
            {corridor && (
              <div className="rounded-md border border-slate-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  How well-rounded the conversation is
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div title="How many CEG concern areas the conversation touches.">
                    <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                      {corridor.k}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Concern areas
                    </p>
                  </div>
                  <div title="0 = perfectly spread; 1 = everyone is on the same thing.">
                    <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                      {Math.round(corridor.rho_estimate * 100)}%
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Echo rate
                    </p>
                  </div>
                  <div title="Independent voices once you account for the echo.">
                    <p className="font-mono text-xl font-bold text-brand-primary">
                      {corridor.k_eff.toFixed(1)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Independent voices
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[10px] italic text-slate-500 dark:text-slate-400">
                  In the synthesis paper this is k, ρ, k_eff.
                </p>
                {corridorHistory.length > 3 && (
                  <KEffSparkline history={corridorHistory} />
                )}
              </div>
            )}
          </div>
        </DisclosureSection>
      )}

      {corpusMode === "workshop" && (
        <DisclosureSection title="Workshop controls">
          <div className="space-y-4">
        {/* Attester picker */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            1. Pin attesters
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Voices you trust. Policy A only weighs claims from pinned
            attesters.
          </p>
          <ul className="mt-3 space-y-1.5">
            {ATTESTER_ROSTER.map((a) => (
              <li key={a.id}>
                <label className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5 text-xs hover:border-brand-primary dark:border-gray-700">
                  <input
                    type="checkbox"
                    checked={pinned.has(a.id)}
                    onChange={() => togglePin(a.id)}
                    className="accent-brand-primary"
                  />
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: a.hue }}
                  />
                  <span className="text-slate-700 dark:text-slate-200">
                    {a.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Dimension picker */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            2. Pick a dimension
          </p>
          <select
            value={currentDimension}
            onChange={(e) => setCurrentDimension(e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-800 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100"
          >
            {STARTER_DIMENSIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </section>

        {/* Add claim */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            3. Add a claim
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Any attester can post a claim. Whether it counts is up to the
            composition policy.
          </p>
          <div className="mt-3 space-y-2">
            {ATTESTER_ROSTER.map((a) => (
              <AddClaimRow
                key={a.id}
                attester={a}
                pinned={pinned.has(a.id)}
                onAdd={(score, confidence) =>
                  addClaim(a.id, score, confidence)
                }
              />
            ))}
          </div>
        </section>

        {/* Vouches — Policy B input */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            4. Vouches
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Pinned attester vouches let non-pinned voices count at 0.5
            weight under Policy B.
          </p>
          <div className="mt-3 space-y-2">
            {ATTESTER_ROSTER.filter((a) => pinned.has(a.id)).map((from) => {
              const targets = ATTESTER_ROSTER.filter(
                (t) => t.id !== from.id && !pinned.has(t.id),
              );
              if (targets.length === 0) return null;
              return (
                <div
                  key={from.id}
                  className="flex flex-wrap items-center gap-1.5 text-[11px]"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: from.hue }}
                  />
                  <span className="font-mono text-slate-600 dark:text-slate-300">
                    {from.id} vouches:
                  </span>
                  {targets.map((to) => {
                    const active = vouches.has(`${from.id}:${to.id}`);
                    return (
                      <button
                        key={to.id}
                        onClick={() => toggleVouch(from.id, to.id)}
                        className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                          active
                            ? "border-brand-primary bg-brand-primary text-white"
                            : "border-slate-300 text-slate-600 hover:border-brand-primary dark:border-gray-700 dark:text-slate-300"
                        }`}
                      >
                        {to.id}
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {ATTESTER_ROSTER.filter((a) => pinned.has(a.id)).length === 0 && (
              <p className="text-[11px] italic text-slate-500 dark:text-slate-400">
                Pin at least one attester above to issue vouches.
              </p>
            )}
          </div>
        </section>

        {/* Policy picker */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            5. Composition policy
          </p>
          <div className="mt-2 flex gap-1.5">
            {(["A", "B", "C"] as Policy[]).map((p) => (
              <button
                key={p}
                onClick={() => setPolicy(p)}
                className={`flex-1 rounded-md border px-2 py-1 text-xs font-semibold ${
                  policy === p
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-slate-300 text-slate-700 dark:border-gray-700 dark:text-slate-200"
                } ${p === "C" ? "opacity-50" : ""}`}
                disabled={p === "C"}
                title={
                  p === "A"
                    ? "Direct Trust — weighted mean over pinned attesters only"
                    : p === "B"
                      ? "One-hop Transitive Trust — vouched-for attesters at 0.5 weight"
                      : "Weighted-graph EigenTrust — lands in Phase 2.5"
                }
              >
                {p}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            A = Direct Trust. B = One-hop Transitive Trust (uses vouches).
            C = Weighted-graph EigenTrust (Phase 2.5).
          </p>
        </section>

        {/* Corpus seed */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            6. Seed corpus
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Materialise N stories from the kindfuture corpus as claim
            nodes. Each story attributes to one of nine synthetic story
            agents. Up to {ALL_STORIES.length} available.
          </p>
          <label className="mt-2 flex items-center gap-2 text-xs">
            <input
              type="range"
              min={0}
              max={Math.min(240, ALL_STORIES.length)}
              step={5}
              value={seedCount}
              onChange={(e) => setSeedCount(parseInt(e.target.value, 10))}
              className="flex-1 accent-brand-primary"
            />
            <span className="w-12 text-right font-mono text-slate-700 dark:text-slate-300">
              {seedCount}
            </span>
          </label>
        </section>

        {/* Claim list */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              7. Claims on the chain
            </p>
            {claims.length > 0 && (
              <button
                onClick={clearClaims}
                className="text-[11px] text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
              >
                clear
              </button>
            )}
          </div>
          <ul className="mt-2 space-y-1">
            {claims.length === 0 && (
              <li className="text-xs italic text-slate-500 dark:text-slate-400">
                No claims yet. Add some above.
              </li>
            )}
            {claims.map((c) => {
              const a = ATTESTER_ROSTER.find((x) => x.id === c.attester);
              return (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-2 rounded border border-slate-200 px-2 py-1 text-xs dark:border-gray-700"
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: a?.hue ?? "#94a3b8" }}
                    />
                    <span className="font-mono">
                      {c.attester} · {c.score.toFixed(2)} ·{" "}
                      {c.confidence.toFixed(2)}
                    </span>
                  </span>
                  <button
                    onClick={() => removeClaim(c.id)}
                    className="text-[11px] text-slate-500 underline-offset-2 hover:underline"
                  >
                    drop
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
          </div>
        </DisclosureSection>
      )}

      <DisclosureSection title="Diagnostics">
        <DiagnosticStrip
          ready={ready}
          mounted={hasMounted}
          graph={graph}
          positions={positions}
          instanceMeta={instanceMeta}
          edgeGeoms={edgeGeoms}
        />
      </DisclosureSection>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        One scene, three views. The five composition primitives, the
        five concern areas, the well-roundedness numbers — same kernel.
        The voices and claims change with the mode.
      </p>
    </div>
  );
}

// SceneFrame — gates the canvas mount on (a) client-only hasMounted and
// (b) WebGL2 capability. Mobile and older browsers that can't run the
// scene get a polite fallback instead of a black box.
function SceneFrame({
  mounted,
  graph,
  positions,
  instanceMeta,
  edgeGeoms,
  selectedNodeId,
  hiddenNodeIds,
  onPickNode,
}: {
  mounted: boolean;
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
  selectedNodeId?: string | null;
  hiddenNodeIds?: Set<string>;
  onPickNode?: (id: string) => void;
}) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (!mounted) return;
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") ?? c.getContext("webgl");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, [mounted]);
  // Earlier versions polled a global flag to detect "the canvas mounted
  // but Three.js never painted". That was racing with the Canvas's own
  // onCreated and sticking the failure overlay on across reloads. If
  // WebGL is available, just trust the renderer to paint. The webglOk
  // probe above handles the actual "no WebGL" case.

  // Wire the perf harness's per-frame tick into a global the scene
  // PerfReporter can call without prop-drilling through Canvas. The
  // enabled flag itself is set earlier in the workshop so kernel
  // timings are captured from first render.
  useEffect(() => {
    if (!isBenchEnabled()) return;
    type GlInfo = { render: { calls: number; triangles: number; lines: number; points: number } };
    type Global = typeof globalThis & {
      __perfTick?: (now: number, info: GlInfo) => void;
    };
    (globalThis as Global).__perfTick = (now: number, info: GlInfo) => {
      perf.recordFrame(now);
      perf.recordRendererInfo(info);
    };
    return () => {
      (globalThis as Global).__perfTick = undefined;
    };
  }, []);
  return (
    <div
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-gray-800 dark:from-gray-950 dark:to-black"
      style={{ touchAction: "none" }}
    >
      {!mounted ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          Booting scene…
        </div>
      ) : webglOk === false ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm">
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            This device cannot run the 3D scene.
          </p>
          <p className="max-w-sm text-slate-600 dark:text-slate-300">
            The Aleph view needs WebGL. Most desktops and recent phones
            have it. If you are on an older browser, please try Chrome
            or Firefox.
          </p>
          <a
            href="/game"
            className="mt-2 text-brand-primary underline-offset-2 hover:underline"
          >
            Or go play the mystery game instead →
          </a>
        </div>
      ) : webglOk === null ? null : (
        <>
          <AlephScene
            graph={graph}
            positions={positions}
            instanceMeta={instanceMeta}
            edgeGeoms={edgeGeoms}
            selectedNodeId={selectedNodeId}
            hiddenNodeIds={hiddenNodeIds}
            onPickNode={onPickNode}
          />
          <SceneOverlay />
        </>
      )}
    </div>
  );
}

// SceneOverlay — touch-friendly zoom buttons + a "tap a sphere" hint.
// The zoom buttons drive OrbitControls via the module-scope nudgeZoom
// function set up by ZoomTracker inside the canvas.
function SceneOverlay() {
  const [hintVisible, setHintVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 4500);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 select-none"
        aria-hidden="true"
      >
        {hintVisible && (
          <div className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
            tap a sphere · drag to rotate · pinch to zoom
          </div>
        )}
      </div>
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          aria-label="zoom in"
          onClick={() => nudgeZoom(-0.18)}
          className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-1.5 text-lg font-bold leading-none text-slate-800 shadow hover:border-brand-primary dark:border-gray-700 dark:bg-gray-900/90 dark:text-slate-100"
        >
          +
        </button>
        <button
          type="button"
          aria-label="zoom out"
          onClick={() => nudgeZoom(0.18)}
          className="rounded-lg border-2 border-slate-300 bg-white/90 px-3 py-1.5 text-lg font-bold leading-none text-slate-800 shadow hover:border-brand-primary dark:border-gray-700 dark:bg-gray-900/90 dark:text-slate-100"
        >
          −
        </button>
      </div>
      <BenchOverlay />
    </>
  );
}

// BenchOverlay — visible only when ?bench=1 is in the URL.
// Subscribes to the perf harness and shows fps / draws / verts.
function BenchOverlay() {
  const [bench, setBench] = useState<BenchSample | null>(null);
  useEffect(() => {
    if (!isBenchEnabled()) return;
    const id = setInterval(() => setBench(perf.flush()), 500);
    return () => clearInterval(id);
  }, []);
  if (!bench) return null;
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 select-none rounded-md border border-emerald-400 bg-black/70 px-2 py-1 font-mono text-[10px] leading-4 text-emerald-200">
      <div>
        fps {bench.fpsAvg.toFixed(0)} (p1 {bench.fps_p1.toFixed(0)})
      </div>
      <div>
        frame {bench.frameAvg.toFixed(1)}ms p99 {bench.frame_p99.toFixed(1)}ms
      </div>
      <div>
        draws {bench.drawCalls} tris {bench.triangles}
      </div>
      <div>
        lines {bench.lines} pts {bench.points}
      </div>
      <div>
        nodes {bench.graphNodes} edges {bench.graphEdges} geom {bench.graphEdgeGeoms}
      </div>
      <div>
        kernel build{" "}
        {bench.kernelBuildMs === null
          ? "—"
          : `${bench.kernelBuildMs.toFixed(1)}ms`}
      </div>
      <div>
        kernel layout{" "}
        {bench.kernelLayoutMs === null
          ? "—"
          : `${bench.kernelLayoutMs.toFixed(1)}ms`}
      </div>
    </div>
  );
}

// ─── Node detail panel ───────────────────────────────────────────
//
// Click any sphere in the scene → this panel opens with the node's
// label, group, family, component, band, plus a list of every edge
// pointing in or out. Each edge row names the other end and is
// clickable; tapping it pivots the panel + the scene highlight to that
// node. You can walk the federation graph by clicking through it.

function NodeDetailPanel({
  graph,
  nodeId,
  source,
  onPick,
  onClose,
}: {
  graph: KernelGraph;
  nodeId: string;
  source: RegistrySource;
  onPick: (id: string | null) => void;
  onClose: () => void;
}) {
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
        Node{" "}
        <span className="font-mono">{nodeId}</span> not found in the current
        graph.{" "}
        <button onClick={onClose} className="underline">
          close
        </button>
      </div>
    );
  }
  const outgoing = graph.edges.filter((e) => e.source === nodeId);
  const incoming = graph.edges.filter((e) => e.target === nodeId);
  const labelOf = (id: string) => {
    const n = graph.nodes.find((x) => x.id === id);
    return n ? n.label : id;
  };
  return (
    <section
      className="rounded-xl border-2 border-brand-primary bg-white p-3 shadow-md dark:border-brand-primary dark:bg-gray-900"
      aria-label={`node detail: ${node.label}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Selected node
          </p>
          <h3 className="break-all font-mono text-sm font-bold text-slate-900 dark:text-white">
            {node.label}
          </h3>
          <p className="break-all font-mono text-[10px] text-slate-500 dark:text-slate-400">
            id: {node.id}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:border-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          close
        </button>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
        <span className="font-mono text-slate-500">group</span>
        <span className="font-mono">{node.group}</span>
        {node.family && (
          <>
            <span className="font-mono text-slate-500">family</span>
            <span className="font-mono">{node.family}</span>
          </>
        )}
        {node.component && (
          <>
            <span className="font-mono text-slate-500">component</span>
            <span className="break-all font-mono">{node.component}</span>
          </>
        )}
        <span className="font-mono text-slate-500">band</span>
        <span className="font-mono">{node.band}</span>
        {node.multi_scale && (
          <>
            <span className="font-mono text-slate-500">multi-scale</span>
            <span className="font-mono">yes</span>
          </>
        )}
      </div>

      <NodeContent
        node={node}
        nodeId={nodeId}
        source={source}
        onPick={onPick}
      />

      <EdgeList
        title={`out (${outgoing.length})`}
        edges={outgoing}
        otherId={(e) => e.target}
        otherLabel={(e) => labelOf(e.target)}
        onPick={onPick}
      />
      <EdgeList
        title={`in (${incoming.length})`}
        edges={incoming}
        otherId={(e) => e.source}
        otherLabel={(e) => labelOf(e.source)}
        onPick={onPick}
      />
      <p className="mt-3 text-[10px] italic text-slate-500 dark:text-slate-400">
        Tap any edge to walk the graph. The selected node glows in the scene.
      </p>
    </section>
  );
}

// NodeContent — looks up the rich data behind a node id and renders
// whatever's useful: the registry prefix description, a character's
// bio + memberships, a story scenario, a publication's drift and
// editorial note, a case framing, or a witness attestation. Pattern-
// matches by node id prefix and node group.
function NodeContent({
  node,
  nodeId,
  source,
  onPick,
}: {
  node: KernelNode;
  nodeId: string;
  source: RegistrySource;
  onPick: (id: string | null) => void;
}) {
  // ── Encyclopedia mode: prefix leaves carry the registry description.
  if (node.group === "prefix" || nodeId.startsWith("prefix:")) {
    const prefix = nodeId.replace(/^prefix:/, "");
    let row: { description: string; section: string; sectionTitle: string; component: string; citation?: string; polarity?: string } | undefined;
    for (const ns of source.namespace) {
      for (const sub of ns.subsections) {
        const r = sub.rows.find((x) => x.prefix === prefix);
        if (r) {
          row = {
            description: r.description,
            section: r.section,
            sectionTitle: r.sectionTitle,
            component: r.component,
            citation: r.citation,
            polarity: r.polarity,
          };
          break;
        }
      }
      if (row) break;
    }
    if (!row) {
      return (
        <Section title="Prefix">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Encyclopedia entry for{" "}
            <span className="font-mono">{prefix}</span> not found in the
            registry.
          </p>
        </Section>
      );
    }
    return (
      <Section title="Encyclopedia entry">
        <p className="text-[11px] text-slate-500">
          §{row.section} {row.sectionTitle} · component {row.component}
          {row.polarity ? ` · polarity ${row.polarity}` : ""}
        </p>
        <p className="mt-2 text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          {row.description}
        </p>
        {row.citation && (
          <p className="mt-2 break-all font-mono text-[10px] text-slate-500">
            cite: {row.citation}
          </p>
        )}
      </Section>
    );
  }

  // ── Game mode: meta-group anchors (one per CEG family).
  if (nodeId.startsWith("meta:")) {
    const f = nodeId.replace(/^meta:/, "");
    const META_BLURBS: Record<string, string> = {
      STANDING:
        "The standing cluster. Kids and adults who carry stories about who-someone-IS — identity, beneficence, fidelity. Their attestations land here.",
      ACTION:
        "The action cluster. Voices who attest about what was done — delegation, supersession, withdrawal. Often the comms-relay kids, the gardens crew, the council apprentices.",
      DETECTION:
        "The detection cluster. The ones who notice. Tally the assignments tracker, the archive helpers, the year-6 systems-watchers. Their attestations spot drift.",
      CONSENSUS:
        "The consensus cluster. Where the community's shared-record voices sit: every newspaper, every club newsletter, every class announcement, plus the encyclopedia maintainers.",
      CORRECTION:
        "The correction cluster. The mediators, the recanters, the supersession-keepers. Aurora the day-companion AI lives here when she walks something back kindly.",
    };
    return (
      <Section title="Concern-area cluster">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          {META_BLURBS[f] ?? `Meta-group for the ${f} concern area.`}
        </p>
        <p className="mt-2 text-[11px] italic text-slate-500">
          All voices whose primary concern area is {f} gravitate to this
          point on the disk. The five clusters together form a 5-petal
          rosette around the spine.
        </p>
      </Section>
    );
  }

  // ── Encyclopedia mode: components own prefix leaves.
  if (node.group === "component" && !nodeId.startsWith("case-")) {
    const comp = node.component ?? node.label;
    const sections = source.namespace.filter((n) => n.component === comp);
    if (sections.length === 0) return null;
    return (
      <Section title="Component">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          The <span className="font-mono">{comp}</span> component owns its
          prefix leaves below. Open the namespace view on /grammar for
          the full table.
        </p>
        <ul className="mt-2 list-disc pl-4 text-[11px] text-slate-700 dark:text-slate-300">
          {sections.map((s) => (
            <li key={s.section} className="break-all">
              §{s.section} {s.title}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  // ── Encyclopedia mode: families.
  if (node.group === "family" || nodeId.startsWith("family:")) {
    const FAMILY_BLURBS: Record<string, string> = {
      STANDING:
        "Standing — who you are in the federation. Identity, beneficence, integrity, fidelity, autonomy, justice, prohibited categories, provenance, transparency log, certificate validity, hardware custody.",
      ACTION:
        "Action — what you do. Delegation, supersession, withdrawal, recantation. The verbs CEG runs on.",
      DETECTION:
        "Detection — what changed. Anomaly detection across attestations, drift detection in chains, hash chain integrity, mutation, cross-agent divergence.",
      CONSENSUS:
        "Consensus — what we agree on. Composition policies, quorum, witness diversity, multilateral participation, encyclopedia ratification.",
      CORRECTION:
        "Correction — how we make it right. Recantation, rollback detection, supersession, conscience overrides, gentle redirect.",
    };
    const f = (node.family ?? nodeId.replace(/^family:/, "")) as string;
    const blurb = FAMILY_BLURBS[f];
    return (
      <Section title="Concern area">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          {blurb ?? `Family ${f}.`}
        </p>
      </Section>
    );
  }

  // ── Encyclopedia + game: structural primitives.
  if (node.group === "primitive" || nodeId.startsWith("prim:")) {
    const PRIM_BLURBS: Record<string, string> = {
      scores:
        "The workhorse primitive. Every other primitive is composed against scores: an attestation puts a number and a confidence on a dimension.",
      delegates_to:
        "I am not the right voice on this; please carry this to the next person in the trust chain.",
      supersedes:
        "An earlier attestation is replaced by this one. The earlier one stays in the log, but no longer composes.",
      withdraws:
        "I take back what I said. No correction, just removal from the active composition.",
      recants:
        "I take back what I said AND say why. Recants compose against the original to mark it as known-wrong.",
    };
    const key = nodeId.replace(/^prim:/, "") as keyof typeof PRIM_BLURBS;
    const blurb = PRIM_BLURBS[key];
    if (!blurb) return null;
    return (
      <Section title="Composition primitive">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          {blurb}
        </p>
      </Section>
    );
  }

  // ── Game mode: characters (story-agent attesters).
  const char = CHARS_BY_ID.get(nodeId);
  if (char) {
    return (
      <Section title="Voice">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          <b>{char.name}</b> · {char.role}
          {char.yearBand ? ` · ${char.yearBand}` : ""} ·{" "}
          {char.pronouns}
        </p>
        <p className="mt-1 text-[12px] leading-5 text-slate-700 dark:text-slate-300">
          {char.bio}
        </p>
        <p className="mt-2 text-[11px] text-slate-500">
          Cares most about CEG concern area{" "}
          <span className="font-mono">{char.ceg_family}</span>. Sharing
          posture: {char.sharing_posture.replace(/_/g, " ")}.
        </p>
        {char.default_goals.length > 0 && (
          <p className="mt-1 text-[11px] text-slate-500">
            Default goals: {char.default_goals.join("; ")}.
          </p>
        )}
        {char.storyHoldings.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Holds {char.storyHoldings.length}{" "}
              {char.storyHoldings.length === 1 ? "story" : "stories"}
            </summary>
            <ul className="mt-1 space-y-1">
              {char.storyHoldings.map((h, i) => {
                const story = STORIES_BY_ID.get(h.storyId);
                return (
                  <li
                    key={i}
                    className="rounded border border-slate-200 p-2 text-[11px] dark:border-gray-700"
                  >
                    <p className="font-semibold">
                      {story?.title ?? h.storyId}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      via {h.provenance.replace(/_/g, " ")}
                      {h.note ? ` · ${h.note}` : ""}
                    </p>
                    {story && (
                      <p className="mt-1 text-[11px] leading-5 text-slate-700 dark:text-slate-300">
                        {story.scenario}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </details>
        )}
      </Section>
    );
  }

  // ── Game mode: publications (institutional attesters).
  const pub = PUBS_BY_ID.get(nodeId);
  if (pub) {
    return (
      <Section title="Published source">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          <b>{pub.name}</b>
        </p>
        <p className="text-[11px] italic text-slate-600 dark:text-slate-300">
          {pub.tagline}
        </p>
        <p className="mt-2 text-[11px] text-slate-500">
          Drift rate {Math.round(pub.drift_rate * 100)}% · focus on{" "}
          {pub.focus_domains.join(", ")}
        </p>
        {pub.editorial_note && (
          <p className="mt-1 text-[11px] text-slate-700 dark:text-slate-300">
            {pub.editorial_note}
          </p>
        )}
      </Section>
    );
  }

  // ── Game mode: cases as goals.
  const caseFile = CASES_BY_ID.get(nodeId);
  if (caseFile) {
    return (
      <Section title="Case (community goal)">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          <b>
            {caseFile.codename} · {caseFile.subtitle}
          </b>
        </p>
        <p className="mt-1 text-[12px] leading-5 text-slate-700 dark:text-slate-300">
          {caseFile.framing_short}
        </p>
        <p className="mt-2 text-[11px] text-slate-500">
          Witnesses: {caseFile.witnesses.length} · Articles:{" "}
          {caseFile.articles.length}. Open the full case at{" "}
          <a
            href="/game"
            className="text-brand-primary underline-offset-2 hover:underline"
          >
            /game
          </a>
          .
        </p>
      </Section>
    );
  }

  // ── Game mode: holding claims (claim:character:story).
  if (nodeId.startsWith("holding:")) {
    const parts = nodeId.split(":");
    const storyId = parts.slice(2).join(":");
    const story = STORIES_BY_ID.get(storyId);
    const charId = parts[1];
    if (story) {
      return (
        <Section title="Story held by this voice">
          <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
            <b>{story.title}</b>
          </p>
          <p className="mt-1 text-[12px] leading-5 text-slate-700 dark:text-slate-300">
            {story.scenario}
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Carries on dimension{" "}
            <span className="font-mono">
              {story.dimensions[0] ?? "—"}
            </span>{" "}
            · concern area {story.family}
          </p>
          <button
            type="button"
            onClick={() => onPick(charId)}
            className="mt-2 rounded border border-slate-200 px-2 py-0.5 text-[11px] hover:border-brand-primary dark:border-gray-700"
          >
            walk to the holder →
          </button>
        </Section>
      );
    }
  }

  // ── Game mode: witness claims (case:caseId:wit:characterId).
  if (nodeId.startsWith("case:") && nodeId.includes(":wit:")) {
    const [, caseId, , charId] = nodeId.split(":");
    const c = CASES_BY_ID.get(caseId);
    const w = c?.witnesses.find((x) => x.character_id === charId);
    if (w && c) {
      return (
        <Section title="Witness in this case">
          <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
            &ldquo;{w.attestation}&rdquo;
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Attention domain: {w.domain_present}
          </p>
          {w.drift_hint && (
            <p className="mt-1 rounded bg-amber-50 px-2 py-1 text-[11px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              <span className="font-semibold">drift hint:</span>{" "}
              {w.drift_hint}
            </p>
          )}
          <p className="mt-2 text-[11px] text-slate-500">
            From {c.codename}: {c.subtitle}
          </p>
        </Section>
      );
    }
  }

  // ── Game mode: article claims.
  if (nodeId.startsWith("art-case-")) {
    for (const c of CASES) {
      const a = c.articles.find((x) => x.id === nodeId);
      if (a) {
        const publication = PUBS_BY_ID.get(a.source_id);
        return (
          <Section title="Article in this case">
            <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
              <b>{a.headline}</b>
            </p>
            {a.byline && (
              <p className="text-[11px] text-slate-500">{a.byline}</p>
            )}
            <p className="mt-1 text-[12px] leading-5 text-slate-700 dark:text-slate-300">
              {a.body}
            </p>
            <p className="mt-2 rounded bg-amber-50 px-2 py-1 text-[11px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              <span className="font-semibold">what drifted:</span>{" "}
              {a.drift_notes}
            </p>
            {publication && (
              <p className="mt-2 text-[11px] text-slate-500">
                Source: {publication.name} (drift rate{" "}
                {Math.round(publication.drift_rate * 100)}%)
              </p>
            )}
          </Section>
        );
      }
    }
  }

  // ── Demo mode: Red Riding Hood voices.
  const rrhVoice = rrhVoiceById(nodeId);
  if (rrhVoice) {
    return (
      <Section title={`${rrhVoice.glyph} ${rrhVoice.name}`}>
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          <b>{rrhVoice.role}</b> · concern area{" "}
          <span className="font-mono">{rrhVoice.family}</span>
        </p>
        <p className="mt-1 text-[12px] leading-5 text-slate-700 dark:text-slate-300">
          {rrhVoice.bio}
        </p>
      </Section>
    );
  }

  // ── Encyclopedia attester (pub-encyclopedia).
  if (nodeId === "pub-encyclopedia") {
    return (
      <Section title="The Cascadia Encyclopedia">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          The cross-component synthesis voice. It assembles the
          component voices into one shared reference, the way an
          encyclopedia entry rolls up many sources. It has a drift
          rate; the community maintains it; entries can be
          edit-warred.
        </p>
      </Section>
    );
  }

  // ── Encyclopedia attester (the Accord).
  if (nodeId === "att-accord") {
    return (
      <Section title="The Accord">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          The constitutional voice. The Accord ratifies each CEG
          concern area at the highest standing weight, with confidence
          near 1. It is the &ldquo;floor under everything else&rdquo; — when
          two component voices disagree, the Accord is the
          tie-breaker.
        </p>
      </Section>
    );
  }

  // ── Encyclopedia attester (component voice att-comp:<NAME>).
  if (nodeId.startsWith("att-comp:")) {
    const comp = nodeId.replace(/^att-comp:/, "");
    const ns = source.namespace.find((n) => n.component === comp);
    return (
      <Section title="Component voice">
        <p className="text-[13px] leading-6 text-slate-800 dark:text-slate-200">
          <b>{comp}</b> speaking authoritatively about the prefixes it
          owns. Each registry component is its own voice in the
          federation.
        </p>
        {ns && (
          <p className="mt-1 text-[11px] text-slate-500">
            §{ns.section} {ns.title}
          </p>
        )}
      </Section>
    );
  }

  // ── Generic claim (no rich source found).
  if (node.group === "claim") {
    return (
      <Section title="Claim">
        <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
          {node.label}
        </p>
        <p className="mt-2 text-[11px] italic text-slate-500">
          Claim labels encode attester | dimension | score | confidence.
        </p>
      </Section>
    );
  }

  return null;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-gray-700 dark:bg-gray-800">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
        {title}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function EdgeList({
  title,
  edges,
  otherId,
  otherLabel,
  onPick,
}: {
  title: string;
  edges: KernelEdge[];
  otherId: (e: KernelEdge) => string;
  otherLabel: (e: KernelEdge) => string;
  onPick: (id: string) => void;
}) {
  if (edges.length === 0) {
    return (
      <p className="mb-2 text-[11px] italic text-slate-500 dark:text-slate-400">
        {title}: none
      </p>
    );
  }
  return (
    <div className="mb-2">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <ul className="space-y-1 text-[11px]">
        {edges.slice(0, 24).map((e, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onPick(otherId(e))}
              className="flex w-full items-center justify-between gap-2 rounded border border-slate-200 px-2 py-1 text-left hover:border-brand-primary hover:bg-brand-primary/5 dark:border-gray-700"
            >
              <span className="break-all font-mono">{otherLabel(e)}</span>
              <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-gray-800 dark:text-slate-400">
                {e.kind}
              </span>
            </button>
          </li>
        ))}
        {edges.length > 24 && (
          <li className="px-1 text-[10px] text-slate-500">
            + {edges.length - 24} more
          </li>
        )}
      </ul>
    </div>
  );
}

// DemoTimeSlider — scrubs the Red Riding Hood timeline 0..10. Each
// voice arrives at a specific time; the slider determines which
// attestations are in the graph at this moment.
function DemoTimeSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const EVENTS: Array<{ t: number; label: string }> = [
    { t: 0, label: "🐺 Wolf publishes" },
    { t: 1, label: "👩 Mother delegates" },
    { t: 2, label: "👩 Mother vouches for 🧒" },
    { t: 3, label: "🏹 Hunter testifies" },
    { t: 4, label: "🧒 Red testifies" },
    { t: 5, label: "🧒 Red withdraws" },
    { t: 6, label: "👵 Grandmother recants" },
    { t: 7, label: "🐿️ Squirrel testifies" },
    { t: 8, label: "🪓 Woodsman arrives" },
    { t: 9, label: "📜 Crier publishes" },
    { t: 10, label: "♻️ Crier supersedes" },
  ];
  const here = EVENTS.find((e) => e.t === value);
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          Time {value} / 10 {here ? `· ${here.label}` : ""}
        </p>
        <p className="text-[11px] italic text-slate-500">
          {RRH_TAGLINE}
        </p>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full accent-brand-primary"
        aria-label="story time"
      />
      <div className="mt-1 flex justify-between text-[9px] text-slate-500">
        {EVENTS.map((e) => (
          <button
            key={e.t}
            type="button"
            onClick={() => onChange(e.t)}
            className={`px-0.5 ${
              value >= e.t ? "text-brand-primary" : "text-slate-400"
            }`}
            title={e.label}
          >
            t{e.t}
          </button>
        ))}
      </div>
    </div>
  );
}

// TopologyFilters — runtime CEG-powered knobs that change what's drawn
// without recomputing the kernel graph. The kernel still runs over the
// full data (verdict + corridor stay honest); the scene just omits
// hidden groups and any edge touching a hidden node.
function TopologyFilters({
  hideGroups,
  onToggleGroup,
  focusFamily,
  onFocusFamily,
  summary,
}: {
  hideGroups: Set<string>;
  onToggleGroup: (g: string) => void;
  focusFamily: string | null;
  onFocusFamily: (f: string | null) => void;
  summary: Record<string, number>;
}) {
  // Group toggles. "Hide" reads more naturally to users than "show".
  const GROUP_OPTS: Array<{ id: string; label: string }> = [
    { id: "primitive", label: "spine (scores etc.)" },
    { id: "family", label: "concern-area nodes" },
    { id: "component", label: "components" },
    { id: "prefix", label: "prefix leaves" },
    { id: "claim", label: "claims" },
  ];
  const FAMILIES = ["STANDING", "ACTION", "DETECTION", "CONSENSUS", "CORRECTION"];
  return (
    <details className="rounded-md border border-slate-200 dark:border-gray-800">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        <span>Topology filters</span>
        <span className="text-[11px] font-normal text-slate-500">
          {hideGroups.size > 0 || focusFamily
            ? `active: ${hideGroups.size + (focusFamily ? 1 : 0)}`
            : "none"}
        </span>
      </summary>
      <div className="border-t border-slate-200 p-3 dark:border-gray-800">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Hide groups
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {GROUP_OPTS.map((g) => {
            const off = hideGroups.has(g.id);
            const count = summary[g.id] ?? 0;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onToggleGroup(g.id)}
                className={`rounded-full border px-2 py-0.5 text-[11px] ${
                  off
                    ? "border-slate-300 bg-slate-100 text-slate-400 line-through dark:border-gray-700 dark:bg-gray-800"
                    : "border-brand-primary bg-brand-primary/10 text-brand-primary"
                }`}
                title={off ? "hidden — tap to show" : "visible — tap to hide"}
              >
                {g.label} ({count})
              </button>
            );
          })}
        </div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Focus concern area
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onFocusFamily(null)}
            className={`rounded-full border px-2 py-0.5 text-[11px] ${
              focusFamily === null
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-slate-300 text-slate-600 dark:border-gray-700 dark:text-slate-300"
            }`}
          >
            all
          </button>
          {FAMILIES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFocusFamily(focusFamily === f ? null : f)}
              className={`rounded-full border px-2 py-0.5 text-[11px] ${
                focusFamily === f
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-slate-300 text-slate-600 dark:border-gray-700 dark:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[10px] italic text-slate-500">
          Filters change WHAT IS DRAWN. The kernel still composes verdicts and
          corridor metrics over the full conversation.
        </p>
      </div>
    </details>
  );
}

// CorpusModeStrip — three chips at the top of the page. Replaces the
// chunkier CorpusModeBar to lower the visual weight: the graph below is
// the page, not this control.
function CorpusModeStrip({
  mode,
  onChange,
  summary,
}: {
  mode: "workshop" | CorpusMode;
  onChange: (m: "workshop" | CorpusMode) => void;
  summary: Record<string, number>;
}) {
  const opts: Array<{ id: "workshop" | CorpusMode; label: string }> = [
    { id: "encyclopedia", label: "Encyclopedia" },
    { id: "game", label: "Mystery game" },
    { id: "demo", label: "Red Riding Hood" },
    { id: "workshop", label: "Workshop" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 dark:border-gray-800">
      <div className="flex flex-wrap gap-1">
        {opts.map((o) => {
          const on = mode === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                on
                  ? "bg-brand-primary text-white"
                  : "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
              }`}
              aria-pressed={on}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
        {summary.nodes ?? 0} nodes · {summary.edges ?? 0} edges
      </div>
    </div>
  );
}

// DisclosureSection — uniform <details>/<summary> wrapper. One ink colour,
// hairline border, no decorative gradients. The arrow rotates on open.
function DisclosureSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-md border border-slate-200 dark:border-gray-800"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        <span>{title}</span>
        <span
          className="text-slate-400 transition-transform group-open:rotate-90"
          aria-hidden="true"
        >
          ▸
        </span>
      </summary>
      <div className="border-t border-slate-200 p-3 dark:border-gray-800">
        {children}
      </div>
    </details>
  );
}

// ─── Corpus mode controls (legacy CorpusModeBar kept for reference) ───────

function CorpusModeBar({
  mode,
  onChange,
  summary,
}: {
  mode: "workshop" | CorpusMode;
  onChange: (m: "workshop" | CorpusMode) => void;
  summary: Record<string, number>;
}) {
  const buttons: Array<{
    id: "workshop" | CorpusMode;
    label: string;
    sub: string;
  }> = [
    {
      id: "encyclopedia",
      label: "ENCYCLOPEDIA",
      sub: "CEG, formally",
    },
    {
      id: "game",
      label: "MYSTERY GAME",
      sub: "CEG in practice",
    },
    {
      id: "workshop",
      label: "WORKSHOP",
      sub: "Interactive verdict bench",
    },
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Viewing mode
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Same kernel, three views.
          </p>
        </div>
        <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {summary.nodes ?? 0} nodes · {summary.edges ?? 0} edges
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {buttons.map((b) => {
          const on = mode === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onChange(b.id)}
              className={`rounded-md border-2 px-3 py-2 text-left transition ${
                on
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              }`}
              aria-pressed={on}
            >
              <div className="text-[11px] font-semibold tracking-[0.15em]">
                {b.label}
              </div>
              <div
                className={`text-[10px] ${
                  on ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {b.sub}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CorpusModeNotes({
  mode,
  summary,
}: {
  mode: "workshop" | CorpusMode;
  summary: Record<string, number>;
}) {
  if (mode === "demo") {
    return (
      <aside className="space-y-3">
        <section className="rounded-2xl border-l-4 border-rose-400 bg-white p-4 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-rose-700 dark:text-rose-300">
            🐺 Red Riding Hood
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Same fairy tale, eight voices, one liar. The Wolf publishes
            first at t=0, alone in the graph. As witnesses arrive — the
            Hunter, Red, Grandmother (who recants opening the door),
            the Squirrel, the Woodsman, and finally the Village Crier
            who supersedes the Wolf&rsquo;s self-serving statement — the
            verdict converges on the truth.
          </p>
          <p className="mt-2 text-xs italic text-slate-500">
            Drag the time slider above. The Woodsman&rsquo;s arrival at
            t=8 is the inflection: the deception isolates and witness
            diversity wins.
          </p>
        </section>
        <ScenePalette summary={summary} />
      </aside>
    );
  }
  if (mode === "encyclopedia") {
    return (
      <aside className="space-y-3">
        <section className="rounded-2xl border-l-4 border-purple-400 bg-white p-4 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple-700 dark:text-purple-300">
            Encyclopedia mode
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            The formal CEG grammar in use. Every prefix in the registry
            appears as a leaf, owned by its component, attached to its
            family. The Cascadia Encyclopedia attests across the whole
            namespace as a single high-volume institutional voice.
          </p>
          <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
            What you are looking at: the spec itself, as a federation
            graph.
          </p>
        </section>
        <ScenePalette summary={summary} />
      </aside>
    );
  }
  if (mode === "game") {
    return (
      <aside className="space-y-3">
        <section className="rounded-2xl border-l-4 border-amber-400 bg-white p-4 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-700 dark:text-amber-300">
            Mystery game mode
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            CEG alive in a community. 100 named characters as attesters,
            12 institutional publications as their own voices, 5 case
            goals at the federation band, and the witness attestations
            from each case arcing up toward those goals.
          </p>
          <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
            The cases sit above the cell band because they are not
            things in the namespace; they are convergence points the
            community is aiming at. That is what a goal IS in CEG.
          </p>
        </section>
        <ScenePalette summary={summary} />
      </aside>
    );
  }
  return null;
}

function ScenePalette({ summary }: { summary: Record<string, number> }) {
  const rows: Array<[string, string, string]> = [
    ["primitive", "Primitives", "bg-slate-900"],
    ["family", "Families", "bg-emerald-500"],
    ["component", "Components", "bg-slate-400"],
    ["attester", "Attesters / goals", "bg-amber-400"],
    ["prefix", "Prefix leaves", "bg-purple-400"],
    ["claim", "Claims", "bg-teal-400"],
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
        What is on screen
      </p>
      <ul className="mt-2 space-y-1">
        {rows.map(([k, label, swatch]) => (
          <li
            key={k}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 rounded-sm ${swatch}`}
              />
              <span className="text-slate-700 dark:text-slate-300">
                {label}
              </span>
            </span>
            <span className="font-mono text-slate-500 dark:text-slate-400">
              {summary[k] ?? 0}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DiagnosticStrip({
  ready,
  mounted,
  graph,
  positions,
  instanceMeta,
  edgeGeoms,
}: {
  ready: boolean;
  mounted: boolean;
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
}) {
  const [webgl, setWebgl] = useState<string>("?");
  const [threeVer, setThreeVer] = useState<string>("?");
  useEffect(() => {
    if (!mounted) return;
    try {
      const c = document.createElement("canvas");
      const gl2 = c.getContext("webgl2");
      const gl1 = gl2 ? null : c.getContext("webgl");
      setWebgl(gl2 ? "WebGL2" : gl1 ? "WebGL1" : "none");
    } catch {
      setWebgl("error");
    }
    import("three")
      .then((m) => setThreeVer((m as { REVISION?: string }).REVISION ?? "?"))
      .catch(() => setThreeVer("err"));
  }, [mounted]);
  // Length sanity. positions has 3 floats per instance.
  const posInstances = positions.length / 3;
  const metaCount = instanceMeta.length;
  const ok = posInstances === metaCount;
  const text =
    `kernel=${ready ? "ready" : "loading"} ` +
    `mount=${mounted ? "yes" : "no"} ` +
    `nodes=${graph.nodes.length} edges=${graph.edges.length} ` +
    `inst=${metaCount} pos=${posInstances}${ok ? "" : " MISMATCH"} ` +
    `edgeGeoms=${edgeGeoms.length} gl=${webgl} three=${threeVer}`;
  return (
    <pre
      data-testid="diag"
      className={`whitespace-pre-wrap rounded-lg border px-3 py-2 font-mono text-sm leading-6 ${
        ok
          ? "border-slate-200 bg-slate-50 text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-300"
          : "border-red-300 bg-red-50 text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-300"
      }`}
    >
      {text}
    </pre>
  );
}

function AddClaimRow({
  attester,
  pinned,
  onAdd,
}: {
  attester: Attester;
  pinned: boolean;
  onAdd: (score: number, confidence: number) => void;
}) {
  const [score, setScore] = useState(0.5);
  const [confidence, setConfidence] = useState(0.8);
  return (
    <div
      className={`flex items-center gap-2 rounded border px-2 py-1.5 text-xs ${
        pinned
          ? "border-slate-200 dark:border-gray-700"
          : "border-dashed border-slate-200 opacity-70 dark:border-gray-700"
      }`}
      title={
        pinned
          ? "Pinned — claims count at full weight under Policy A and B."
          : "Not pinned — claims count only under Policy B if vouched-for."
      }
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: attester.hue }}
        title={attester.name}
      />
      <div className="flex flex-1 flex-col gap-1">
        <label className="flex items-center gap-1.5">
          <span className="w-12 text-slate-500 dark:text-slate-400">
            score
          </span>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={score}
            onChange={(e) => setScore(parseFloat(e.target.value))}
            className="flex-1 accent-brand-primary"
          />
          <span className="w-10 text-right font-mono">{score.toFixed(2)}</span>
        </label>
        <label className="flex items-center gap-1.5">
          <span className="w-12 text-slate-500 dark:text-slate-400">conf</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            className="flex-1 accent-brand-primary"
          />
          <span className="w-10 text-right font-mono">
            {confidence.toFixed(2)}
          </span>
        </label>
      </div>
      <button
        onClick={() => onAdd(score, confidence)}
        className="rounded-md border-2 border-brand-primary bg-brand-primary/5 px-2 py-1 text-[10px] font-semibold text-brand-primary hover:bg-brand-primary/10"
      >
        sign
      </button>
    </div>
  );
}

function KEffSparkline({ history }: { history: CorridorMetric[] }) {
  // Tiny inline sparkline of k_eff over time. SVG, no library.
  if (history.length < 2) return null;
  const w = 240;
  const h = 28;
  const ys = history.map((c) => c.k_eff);
  const min = Math.min(...ys, 0);
  const max = Math.max(...ys, 7);
  const range = max - min || 1;
  const points = ys
    .map((y, i) => {
      const x = (i / (history.length - 1)) * w;
      const py = h - ((y - min) / range) * h;
      return `${x.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
  // Corridor band: N_eff ≈ 7.1 from Constrained Reasoning Chains
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-2 w-full"
      preserveAspectRatio="none"
      aria-label="k_eff history"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#0d9488"
        strokeWidth={1.4}
      />
    </svg>
  );
}
