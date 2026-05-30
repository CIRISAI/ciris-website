"use client";

import { useMemo, useState } from "react";
import GlobeScene, { type CewpMode } from "./components/GlobeScene";
import HowItWorks from "./components/HowItWorks";
import {
  cohortFromLocality,
  cohortPublishable,
  feasible,
  fmtBytes,
  fmtCount,
  GB,
  KB,
  MB,
  PRESETS,
  rollup,
  TB,
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
      "Almost every byte you produce or consume passes through one of about ten thousand hyperscale facilities. Five companies run most of them. Watch the yellow particles funnel toward the orange chokepoints.",
  },
  cewp: {
    title: "CEWP: home-server class, peer to peer",
    body:
      "CEWP runs on hardware you already own, about one server per ten humans, distributed where the humans already live. Bytes admit at the recipient's trust gate and propagate along the trust graph. Same submarine cables underneath. No datacenters in the middle.",
  },
  both: {
    title: "Same workload. Two topologies. Pick your future.",
    body:
      "The fiber is the same. The submarine cables are the same. What changes is who holds the bytes in the middle.",
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

  const fed = useMemo(() => rollup(scenario), [scenario]);
  const srv = fed.per_tier.server;
  const srvFeas = useMemo(() => feasible(srv), [srv]);

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
            label="Users"
            value={scenario.n_users}
            min={1_000}
            max={5_000_000_000}
            log
            format={(v) => fmtCount(v)}
            onChange={(v) => setScenarioField("n_users", v)}
          />
          <Slider
            label="Daily bytes per user"
            value={scenario.daily_bytes}
            min={1 * KB}
            max={2 * GB}
            log
            format={(v) => fmtBytes(v)}
            onChange={(v) => setScenarioField("daily_bytes", v)}
          />
          <Slider
            label="Daily fetch bytes per user"
            value={scenario.daily_fetch_bytes}
            min={100 * KB}
            max={5 * GB}
            log
            format={(v) => fmtBytes(v)}
            onChange={(v) => setScenarioField("daily_fetch_bytes", v)}
          />
          <Slider
            label="Trust radius (direct R)"
            value={scenario.trust_radius}
            min={10}
            max={1000}
            log
            format={(v) => Math.round(v).toString()}
            onChange={(v) => setScenarioField("trust_radius", Math.round(v))}
          />
          <Slider
            label="Trust depth (server)"
            value={scenario.trust_depth_avg}
            min={0}
            max={3}
            step={0.1}
            format={(v) => v.toFixed(1)}
            onChange={(v) => setScenarioField("trust_depth_avg", v)}
          />
          <Slider
            label="Cache hit rate"
            value={scenario.cache_hit_rate}
            min={0.2}
            max={0.95}
            step={0.01}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={(v) => setScenarioField("cache_hit_rate", v)}
          />
          <Slider
            label="Cohort locality"
            value={locality}
            min={0}
            max={1}
            step={0.01}
            format={(v) =>
              v < 0.33 ? "local-heavy" : v < 0.66 ? "default" : "global-heavy"
            }
            onChange={(v) => setLocalityVal(v)}
          />
          <Slider
            label="Server-tier disk budget"
            value={scenario.disk_budget_server}
            min={64 * GB}
            max={32 * TB}
            log
            format={(v) => fmtBytes(v)}
            onChange={(v) => setScenarioField("disk_budget_server", v)}
          />
        </div>

        {/* Live numbers. */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat
            label="Per-server held"
            value={fmtBytes(srv.storage_total)}
            sub={`${(srv.storage_utilization * 100).toFixed(0)}% of disk`}
            ok={srvFeas.disk}
          />
          <Stat
            label="Per-server bandwidth"
            value={fmtBytes(srv.bandwidth_in_per_day + srv.bandwidth_out_per_day)}
            sub="per day (in + out)"
            ok={srvFeas.bandwidth}
          />
          <Stat
            label="Per-server CPU"
            value={`${((srv.cpu_seconds_per_day / 86400) * 100).toFixed(1)}%`}
            sub="of 1 full-util core"
            ok={srvFeas.cpu}
          />
          <Stat
            label="Effective retention"
            value={`${srv.effective_retention_days.toFixed(1)} d`}
            sub="admitted-trust pool"
          />
          <Stat
            label="Federation storage"
            value={fmtBytes(fed.total_storage_bytes)}
            sub="all tiers"
          />
          <Stat
            label="Federation bandwidth"
            value={fmtBytes(fed.total_bandwidth_in_bytes_per_day)}
            sub="per day"
          />
          <Stat
            label="Verify ops / day"
            value={fmtCount(fed.total_verify_ops_per_day)}
            sub={`${fmtCount(fed.total_sign_ops_per_day)} sign`}
          />
          <Stat
            label="Aggregate CPU"
            value={fmtCount(fed.aggregate_cpu_cores_full_util)}
            sub="full-util cores"
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

function Stat({
  label,
  value,
  sub,
  ok,
}: {
  label: string;
  value: string;
  sub?: string;
  ok?: boolean;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-gray-800 dark:bg-gray-950">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-[15px] font-semibold ${
          ok === false
            ? "text-red-600 dark:text-red-400"
            : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {value}
        {ok === false ? " ⚠" : ok === true ? " ✓" : ""}
      </p>
      {sub ? (
        <p className="mt-0.5 text-[11px] text-slate-500">{sub}</p>
      ) : null}
    </div>
  );
}
