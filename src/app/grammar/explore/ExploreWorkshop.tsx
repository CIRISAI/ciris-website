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
import AlephScene from "../components/AlephScene";
import { ALL_STORIES } from "../lib/stories-generated";
import {
  buildEncyclopediaGraph,
  buildGameGraph,
  summariseGraph,
  type CorpusMode,
} from "../lib/corpus-graph";

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
    return buildWorkshopGraph(pinned, claims, vouches, seedCount);
  }, [corpusMode, pinned, claims, vouches, seedCount, _source]);
  const graphSummary = useMemo(() => summariseGraph(graph), [graph]);

  useEffect(() => {
    if (!ready || !kernelRef.current) return;
    try {
      kernelRef.current.set_graph(JSON.stringify(graph));
      const positionsCopy = new Float32Array(kernelRef.current.layout());
      const meta = kernelRef.current.instance_meta() as InstanceMeta[];
      const eg = kernelRef.current.edge_geometry() as EdgeGeom[];
      const c = kernelRef.current.corridor() as CorridorMetric;
      setPositions(positionsCopy);
      setInstanceMeta(meta);
      setEdgeGeoms(eg);
      setCorridor(c);
      setCorridorHistory((h) => [...h, c].slice(-30));

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

  return (
    <div className="space-y-4">
      <CorpusModeBar
        mode={corpusMode}
        onChange={setCorpusMode}
        summary={graphSummary}
      />
      <div
        className={`grid gap-4 ${
          corpusMode === "workshop"
            ? "lg:grid-cols-[320px_minmax(0,1fr)]"
            : "lg:grid-cols-[260px_minmax(0,1fr)]"
        }`}
      >
        {/* Left controls / mode notes */}
        {corpusMode === "workshop" ? (
          <aside className="space-y-4">
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
      </aside>
        ) : (
          <CorpusModeNotes mode={corpusMode} summary={graphSummary} />
        )}

      {/* Center: scene + readouts */}
      <section className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Verdict */}
          {verdict && (
            <div className="rounded-xl border-l-4 border-brand-primary bg-white p-3 dark:bg-gray-900">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
                Policy {policy} verdict
              </p>
              <p className="mt-1 break-all font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {verdict.dimension}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {verdict.composed_score >= 0 ? "+" : ""}
                {verdict.composed_score.toFixed(3)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                composed score · confidence{" "}
                {verdict.composed_confidence.toFixed(2)} · supporting{" "}
                {verdict.supporting_count}{" "}
                {verdict.supporting_count === 1 ? "claim" : "claims"}
              </p>
            </div>
          )}

          {/* Corridor */}
          {corridor && (
            <div className="rounded-xl border-l-4 border-purple-400 bg-white p-3 dark:bg-gray-900">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                Corridor (synthesis paper §4)
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                    {corridor.k}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    k
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                    {corridor.rho_estimate.toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    ρ
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-brand-primary">
                    {corridor.k_eff.toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    k_eff
                  </p>
                </div>
              </div>
              {corridorHistory.length > 3 && (
                <KEffSparkline history={corridorHistory} />
              )}
            </div>
          )}
        </div>

        <SceneFrame
          mounted={hasMounted}
          graph={graph}
          positions={positions}
          instanceMeta={instanceMeta}
          edgeGeoms={edgeGeoms}
        />

        <DiagnosticStrip
          ready={ready}
          mounted={hasMounted}
          graph={graph}
          positions={positions}
          instanceMeta={instanceMeta}
          edgeGeoms={edgeGeoms}
        />

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          One scene, two epistemic lenses. The structural primitives, the
          five families, the corridor metric — all the same kernel. The
          attesters and claims change with the mode.
        </p>
      </section>
      </div>
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
}: {
  mounted: boolean;
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
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
  return (
    <div className="h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-gray-800 dark:from-gray-950 dark:to-black">
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
        <AlephScene
          graph={graph}
          positions={positions}
          instanceMeta={instanceMeta}
          edgeGeoms={edgeGeoms}
        />
      )}
    </div>
  );
}

// ─── Corpus mode controls ─────────────────────────────────────────

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
