"use client";

import { useMemo, useState } from "react";
import GlobeScene, { type CewpMode } from "./components/GlobeScene";
import HowItWorks from "./components/HowItWorks";
import {
  cewpFootprint,
  cohortFromLocality,
  EXTRACTION_OVERHEAD,
  estimateLatency,
  feasible,
  fmtBytes,
  fmtCount,
  GB,
  HOME_SERVER_W,
  HYPERSCALE_DC_AVG_MW,
  internetFootprint,
  KB,
  MB,
  PRESETS,
  rollup,
  TB,
  type GateResult,
  type Scenario,
} from "./lib/model";

const MODES: Array<{ id: CewpMode; label: string }> = [
  { id: "internet", label: "Today's internet" },
  { id: "cewp", label: "CEWP" },
  { id: "both", label: "Side by side" },
];

const BEATS: Record<CewpMode, { title: string; body: string }> = {
  internet: {
    title: "Today: ten thousand datacenters, five companies",
    body:
      "Almost everything you post, watch, or send passes through one of about ten thousand giant computer warehouses. Five companies run most of them. Watch the yellow dots funnel into the orange spots — those are the warehouses.",
  },
  cewp: {
    title: "CEWP: small boxes near the people",
    body:
      "CEWP runs on the kind of hardware you already own. About one small box for every ten people, sitting where the people already are. Each box only accepts posts from people it trusts. Most of what you do never leaves your city. Same cables under the ocean. No warehouses in the middle.",
  },
  both: {
    title: "Same posts. Same cables. Different middle.",
    body:
      "The wires are the same. The cables under the ocean are the same. What changes is who holds your stuff while it's on the move.",
  },
};

const PRESETS_UI: Array<{ id: keyof typeof PRESETS; label: string }> = [
  { id: "bootstrap", label: "Bootstrap (10 K users)" },
  { id: "dunbar", label: "Dunbar steady (1 M)" },
  { id: "full_internet", label: "Full internet (5 B, 50 MB/d)" },
  { id: "full_internet_with_video", label: "Full internet w/ video (5 B, 1.7 GB/d)" },
];

// log-scale helpers — most knobs span many orders of magnitude.
function logSlider(min: number, max: number, t: number): number {
  const a = Math.log(min);
  const b = Math.log(max);
  return Math.exp(a + (b - a) * t);
}
function invLog(min: number, max: number, v: number): number {
  const a = Math.log(min);
  const b = Math.log(max);
  return (Math.log(v) - a) / (b - a);
}

export default function CewpView() {
  const [mode, setMode] = useState<CewpMode>("internet");
  const [presetId, setPresetId] = useState<keyof typeof PRESETS>("full_internet");

  // Slider state — initialized from the preset; user overrides as
  // they drag. Picking a new preset resets the sliders.
  const [scenario, setScenario] = useState<Scenario>(() => PRESETS.full_internet());
  const [locality, setLocality] = useState<number>(0.5); // 0=local, 0.5=default, 1=global

  function applyPreset(id: keyof typeof PRESETS) {
    setPresetId(id);
    setScenario(PRESETS[id]());
    setLocality(0.5);
  }

  function setScenarioField<K extends keyof Scenario>(k: K, v: Scenario[K]) {
    setScenario((s) => ({ ...s, [k]: v }));
  }

  function setLocalityVal(t: number) {
    setLocality(t);
    setScenario((s) => ({ ...s, cohort: cohortFromLocality(t) }));
  }

  // Server share is parameterized as "humans per L1 server" because
  // that's the framing a person actually has an intuition about.
  // 10 humans per server is the README's headline number. We rebalance
  // the client / proxy mix proportionally so the three shares still
  // sum to 1.
  function setHumansPerServer(hps: number) {
    setScenario((s) => {
      const serverShare = 1 / hps;
      const restShare = 1 - serverShare;
      const prevRest = Math.max(0.0001, s.tier_mix.client + s.tier_mix.proxy);
      const clientShare = restShare * (s.tier_mix.client / prevRest);
      const proxyShare = restShare * (s.tier_mix.proxy / prevRest);
      return {
        ...s,
        tier_mix: {
          client: clientShare,
          proxy: proxyShare,
          server: serverShare,
        },
      };
    });
  }
  const humansPerServer = 1 / Math.max(1e-6, scenario.tier_mix.server);

  const fed = useMemo(() => rollup(scenario), [scenario]);
  const srv = fed.per_tier.server;
  const srvFeas = useMemo(() => feasible(srv), [srv]);
  const latency = useMemo(() => estimateLatency(scenario), [scenario]);
  const footIn = useMemo(() => internetFootprint(scenario), [scenario]);
  const footCwp = useMemo(() => cewpFootprint(scenario), [scenario]);
  const anyFail =
    !srvFeas.disk.ok ||
    !srvFeas.bandwidth.ok ||
    !srvFeas.cpu.ok ||
    !srvFeas.retention.ok;

  // Map model output to animation intensity. The toy's per-server
  // bandwidth is the load-bearing number. Saturate around 10.8 TB/day
  // (the 1 Gbps gate).
  const intensity = useMemo(() => {
    const srvBw = srv.bandwidth_in_per_day + srv.bandwidth_out_per_day;
    const cap = 10.8 * TB;
    const cewpVal = Math.max(0.15, Math.min(1, srvBw / cap));
    const internetVal = Math.max(
      0.25,
      Math.min(1, scenario.daily_fetch_bytes / GB),
    );
    return { internet: internetVal, cewp: cewpVal };
  }, [srv, scenario.daily_fetch_bytes]);

  const beat = BEATS[mode];

  return (
    <div className="space-y-4">
      {/* Mode strip. */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              mode === m.id
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300 dark:hover:bg-gray-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Globe. */}
      <div className="relative h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-gray-800 md:h-[560px]">
        <GlobeScene mode={mode} intensity={intensity} />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end text-[11px] text-slate-300">
          <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">
            drag to rotate
          </span>
        </div>
      </div>

      {/* Story beat. */}
      <article className="rounded-md border-l-4 border-rose-400 bg-white p-4 dark:bg-gray-900">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {beat.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {beat.body}
        </p>
      </article>

      {/* Sliders + live model output. */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Move the assumptions
          </h3>
          <div className="flex flex-wrap gap-1">
            {PRESETS_UI.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={`rounded-full border px-2 py-1 text-[11px] transition ${
                  presetId === p.id
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-400"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Slider
            label="How many people"
            value={scenario.n_users}
            min={1_000}
            max={10_000_000_000}
            log
            format={(v) => fmtCount(v)}
            onChange={(v) => setScenarioField("n_users", v)}
          />
          <Slider
            label="How much each person posts per day"
            value={scenario.daily_bytes}
            min={1 * KB}
            max={2 * GB}
            log
            format={(v) => fmtBytes(v)}
            onChange={(v) => setScenarioField("daily_bytes", v)}
          />
          <Slider
            label="How much each person reads or watches per day"
            value={scenario.daily_fetch_bytes}
            min={100 * KB}
            max={5 * GB}
            log
            format={(v) => fmtBytes(v)}
            onChange={(v) => setScenarioField("daily_fetch_bytes", v)}
          />
          <Slider
            label="How many friend-of-friend hops a server accepts"
            value={scenario.trust_depth_avg}
            min={0}
            max={3}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => setScenarioField("trust_depth_avg", v)}
          />
          <Slider
            label="How often a copy is nearby (cache hit rate)"
            value={scenario.cache_hit_rate}
            min={0.2}
            max={0.95}
            step={0.01}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={(v) => setScenarioField("cache_hit_rate", v)}
          />
          <Slider
            label="Mostly local vs. mostly global traffic"
            value={locality}
            min={0}
            max={1}
            step={0.01}
            format={(v) =>
              v < 0.33 ? "mostly local" : v < 0.66 ? "balanced" : "mostly global"
            }
            onChange={(v) => setLocalityVal(v)}
          />
          <Slider
            label="Humans per home server"
            value={humansPerServer}
            min={5}
            max={100}
            log
            format={(v) => `1 per ${Math.round(v)}`}
            onChange={(v) => setHumansPerServer(v)}
          />
        </div>
        <p className="mt-2 text-[12px] text-slate-500">
          A &ldquo;home server&rdquo; here is one Xbox-class box, or a midrange
          laptop you already own: roughly 50 W continuous, 1 TB SSD, ARM
          SoC. About what you&rsquo;d find on a hobbyist shelf today.
          {humansPerServer >= 7 && humansPerServer <= 12 ? (
            <>
              {" "}At 1 per 10 humans (the headline), that&rsquo;s ~
              {fmtCount(scenario.n_users * scenario.tier_mix.server)} boxes
              worldwide.
            </>
          ) : (
            <>
              {" "}At 1 per {Math.round(humansPerServer)}, that&rsquo;s ~
              {fmtCount(scenario.n_users * scenario.tier_mix.server)} boxes
              worldwide.
            </>
          )}
        </p>

        {/* Failure banner — shouts when any gate is exceeded so the
            reader can't miss it. */}
        {anyFail && (
          <div className="mt-5 flex items-start gap-2 rounded-md border-l-4 border-red-500 bg-red-50 p-3 dark:bg-red-950/30">
            <span aria-hidden className="mt-0.5 text-lg">⚠</span>
            <div className="text-sm leading-6">
              <p className="font-semibold text-red-700 dark:text-red-300">
                This setting does not fit on home-server hardware.
              </p>
              <p className="mt-1 text-red-700/90 dark:text-red-200/80">
                {[
                  !srvFeas.disk.ok &&
                    `disk needs ${srvFeas.disk.ratio.toFixed(1)}x the 1 TB budget`,
                  !srvFeas.bandwidth.ok &&
                    `bandwidth needs ${srvFeas.bandwidth.ratio.toFixed(1)}x the 1 Gbps budget`,
                  !srvFeas.cpu.ok &&
                    `CPU needs ${srvFeas.cpu.ratio.toFixed(1)}x one full core`,
                  !srvFeas.retention.ok &&
                    `content churns too fast (under ${srv.effective_retention_days.toFixed(1)} days before eviction)`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
                . Try smaller trust depth, a tighter trust circle, or more local
                cohort.
              </p>
            </div>
          </div>
        )}

        {/* Compare cards. Two rows of three; first row pits CEWP
            against today on the comparison-worthy metrics; second
            row shows the home-server feasibility gates with RAG.
            Card backgrounds shift green / amber / red as the
            sliders move so the failure modes are unmissable. */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <CompareCard
            label="Typical latency"
            cewp={`${latency.cewp_p50_ms.toFixed(0)} ms`}
            today={`${latency.internet_p50_ms.toFixed(0)} ms`}
            rag={ragLowerIsBetter(latency.cewp_p50_ms, latency.internet_p50_ms)}
            sub={
              latency.cewp_p50_ms < latency.internet_p50_ms
                ? `CEWP is ${(latency.internet_p50_ms / latency.cewp_p50_ms).toFixed(1)}x faster`
                : `CEWP is ${(latency.cewp_p50_ms / latency.internet_p50_ms).toFixed(1)}x slower`
            }
          />
          <CompareCard
            label="CO2 per year"
            cewp={`${footCwp.co2_Mt_per_year.toFixed(1)} Mt`}
            today={`${footIn.co2_Mt_per_year.toFixed(1)} Mt`}
            rag={ragLowerIsBetter(footCwp.co2_Mt_per_year, footIn.co2_Mt_per_year)}
            sub={`Today uses ~40% of compute on extraction`}
          />
          <CompareCard
            label="Hyperscale datacenters"
            cewp="0"
            today={fmtCount(footIn.datacenters)}
            rag="green"
            sub="zero datacenters required"
          />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <GateCard
            label="Per-server bandwidth"
            value={fmtBytes(srv.bandwidth_in_per_day + srv.bandwidth_out_per_day)}
            gate={srvFeas.bandwidth}
            sub="of 1 Gbps home link"
          />
          <GateCard
            label="Per-server CPU"
            value={`${((srv.cpu_seconds_per_day / 86400) * 100).toFixed(1)}%`}
            gate={srvFeas.cpu}
            sub="of 1 full-util core"
          />
          <GateCard
            label="How long content sticks"
            value={`${srv.effective_retention_days.toFixed(1)} d`}
            gate={srvFeas.retention}
            sub="before eviction"
          />
        </div>

        <p className="mt-4 text-[12px] italic text-slate-500">
          Formulas ported from{" "}
          <a
            className="underline-offset-2 hover:underline"
            href="https://github.com/CIRISAI/CIRISNodeCore/blob/main/examples/scale_model.rs"
            target="_blank"
            rel="noreferrer"
          >
            CIRISNodeCore / examples / scale_model.rs
          </a>{" "}
          v0.3 (single-pool, CEG-organic). Per-op costs from CIRISVerify
          v2.8.0 + CIRISEdge v0.10.0 + CIRISPersist v3.3.0 benchmarks.
          Feasibility gates: 1 TB / 1 Gbps / 1 core per server.
        </p>
      </section>

      {/* Footprint comparison: hardware, power, CO2. The point of the
          page in one table. */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <header className="mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Hardware, power, and what it&rsquo;s actually doing
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            The bet is not just that CEWP runs on less hardware. It is
            that CEWP makes far better use of the hardware that already
            exists in the world by removing the layer that eats most of
            today&rsquo;s compute: ad targeting, recommender training,
            surveillance, A/B test platforms. Same people, same posts,
            same cables. Different middle.
          </p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3"></th>
                <th className="py-2 pr-3 text-orange-700 dark:text-orange-300">
                  Today&rsquo;s internet
                </th>
                <th className="py-2 pr-3 text-teal-700 dark:text-teal-300">
                  CEWP
                </th>
              </tr>
            </thead>
            <tbody>
              <Row
                label="Hyperscale datacenters"
                today={fmtCount(footIn.datacenters)}
                cewp={"0"}
              />
              <Row
                label="Continuous power"
                today={`${footIn.power_MW.toFixed(0)} MW`}
                cewp={`${footCwp.power_MW.toFixed(0)} MW`}
              />
              <Row
                label="Electricity"
                today={`${footIn.electricity_TWh_per_year.toFixed(1)} TWh / yr`}
                cewp={`${footCwp.electricity_TWh_per_year.toFixed(1)} TWh / yr`}
              />
              <Row
                label="CO2 (grid avg)"
                today={`${footIn.co2_Mt_per_year.toFixed(1)} Mt / yr`}
                cewp={`${footCwp.co2_Mt_per_year.toFixed(1)} Mt / yr`}
              />
              <Row
                label="Net-new hardware buildout"
                today={`${footIn.new_buildout_power_MW.toFixed(0)} MW`}
                cewp={`${footCwp.new_buildout_power_MW.toFixed(0)} MW (home servers)`}
                emphasize
              />
              <Row
                label="Power on the user's actual task"
                today={`${footIn.useful_power_MW.toFixed(0)} MW (${((1 - EXTRACTION_OVERHEAD) * 100).toFixed(0)}%)`}
                cewp={`${footCwp.useful_power_MW.toFixed(0)} MW (100%)`}
                emphasize
              />
            </tbody>
          </table>
        </div>
        <details className="mt-3 text-[12px] text-slate-500">
          <summary className="cursor-pointer underline-offset-2 hover:underline">
            Show the math
          </summary>
          <div className="mt-2 space-y-1 leading-5">
            <p>
              <b>Internet column.</b> Today there are about 10,000
              hyperscale datacenters serving ~5 billion users
              (SemiAnalysis 2024 + UN). Scaled linearly with the user
              slider, floored at 100. Each averages 30 MW continuous
              (Uptime Institute 2024). Grid CO2 is the IEA global
              average of 0.4 kg per kWh; regions vary from 0.05 (Iceland)
              to 0.9 (coal-heavy).
            </p>
            <p>
              <b>CEWP column.</b> {(scenario.tier_mix.server * 100).toFixed(0)}% of
              users run an L1 home server (about {HOME_SERVER_W} W
              continuous; ARM SoC + 1 TB SSD). {(scenario.tier_mix.proxy * 100).toFixed(0)}% run an L0
              proxy on a device they already own (laptop, phone, set-top
              box). We count only the marginal 4 W per L0 because most
              of that device&rsquo;s power goes to what the human is
              doing anyway.
            </p>
            <p>
              <b>Useful-vs-extraction split.</b> A rough{" "}
              {(EXTRACTION_OVERHEAD * 100).toFixed(0)}% of today&rsquo;s
              substrate compute goes to recommender training, ad
              targeting, surveillance pipelines, A/B testing. The 30-70%
              range across platforms is wide; 50% is a midpoint. CEWP has
              no value-extraction layer architecturally, so every watt
              goes to the user&rsquo;s task.
            </p>
            <p className="italic">
              These are estimates with wide error bars. The page shows
              the math so you can disagree with the inputs.
            </p>
          </div>
        </details>
      </section>

      <HowItWorks />
    </div>
  );
}

// Slider — labeled range with a live value readout. Supports log
// scaling for knobs that span many orders of magnitude.
function Slider({
  label,
  value,
  min,
  max,
  step,
  log = false,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  log?: boolean;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const t = log ? invLog(min, max, value) : (value - min) / (max - min);
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <span className="font-mono text-[12px] text-slate-900 dark:text-slate-100">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={step ? step / (max - min) : 0.001}
        value={t}
        onChange={(e) => {
          const tt = parseFloat(e.target.value);
          const v = log ? logSlider(min, max, tt) : min + (max - min) * tt;
          onChange(v);
        }}
        className="mt-1 w-full accent-brand-primary"
      />
    </label>
  );
}

type Rag = "green" | "amber" | "red";

// CompareCard — CEWP value next to today's value with a RAG dot for
// the winner. Used for the metrics where the two topologies can be
// scored against each other directly (latency, CO2, DC count).
function CompareCard({
  label,
  cewp,
  today,
  rag,
  sub,
}: {
  label: string;
  cewp: string;
  today: string;
  rag: Rag;
  sub?: string;
}) {
  const tone = RAG_TONE[rag];
  return (
    <div
      className={`rounded-md border p-3 transition ${tone.card}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className={`text-[10px] font-semibold uppercase tracking-wide ${tone.label}`}>
          {label}
        </p>
        <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-full ${tone.dot}`} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-teal-700 dark:text-teal-300">CEWP</p>
          <p className={`font-mono text-[15px] font-semibold ${tone.value}`}>{cewp}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-orange-700 dark:text-orange-300">Today</p>
          <p className="font-mono text-[15px] font-semibold text-slate-700 dark:text-slate-300">{today}</p>
        </div>
      </div>
      {sub ? <p className="mt-2 text-[11px] text-slate-500">{sub}</p> : null}
    </div>
  );
}

// GateCard — single CEWP per-server number against a feasibility
// gate. RAG comes straight from the ratio.
function GateCard({
  label,
  value,
  gate,
  sub,
}: {
  label: string;
  value: string;
  gate: GateResult;
  sub?: string;
}) {
  const rag: Rag = !gate.ok ? "red" : gate.ratio > 0.7 ? "amber" : "green";
  const tone = RAG_TONE[rag];
  return (
    <div className={`rounded-md border p-3 transition ${tone.card}`}>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-[10px] font-semibold uppercase tracking-wide ${tone.label}`}>
          {label}
        </p>
        <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-full ${tone.dot}`} />
      </div>
      <p className={`mt-1 font-mono text-[18px] font-semibold ${tone.value}`}>
        {value}
        {rag === "red" ? " ⚠" : ""}
      </p>
      <p className={`mt-0.5 text-[11px] ${rag === "red" ? "font-semibold " + tone.label : "text-slate-500"}`}>
        {rag === "red" ? `${gate.ratio.toFixed(1)}x over budget` : sub}
      </p>
    </div>
  );
}

const RAG_TONE: Record<Rag, {
  card: string;
  label: string;
  value: string;
  dot: string;
}> = {
  green: {
    card: "border-teal-300 bg-teal-50/70 dark:border-teal-800 dark:bg-teal-950/30",
    label: "text-teal-700 dark:text-teal-300",
    value: "text-slate-900 dark:text-slate-100",
    dot: "bg-teal-500",
  },
  amber: {
    card: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    label: "text-amber-700 dark:text-amber-300",
    value: "text-amber-800 dark:text-amber-200",
    dot: "bg-amber-500",
  },
  red: {
    card: "border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-950/40",
    label: "text-red-700 dark:text-red-300",
    value: "text-red-700 dark:text-red-300",
    dot: "bg-red-500",
  },
};

// For comparison metrics: green if CEWP is materially better, amber
// if comparable, red if worse.
function ragLowerIsBetter(cewp: number, today: number): Rag {
  if (cewp <= today * 0.7) return "green";
  if (cewp <= today * 1.1) return "amber";
  return "red";
}

function Row({
  label,
  today,
  cewp,
  emphasize,
}: {
  label: string;
  today: string;
  cewp: string;
  emphasize?: boolean;
}) {
  return (
    <tr className="border-t border-slate-200 dark:border-gray-800">
      <td
        className={`py-2 pr-3 font-medium ${
          emphasize
            ? "text-slate-900 dark:text-slate-100"
            : "text-slate-700 dark:text-slate-300"
        }`}
      >
        {label}
      </td>
      <td className="py-2 pr-3 font-mono text-orange-700 dark:text-orange-300">
        {today}
      </td>
      <td className="py-2 pr-3 font-mono text-teal-700 dark:text-teal-300">
        {cewp}
      </td>
    </tr>
  );
}
