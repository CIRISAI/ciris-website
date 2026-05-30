"use client";

import { useState } from "react";
import GlobeScene, { type CewpMode } from "./components/GlobeScene";

const MODES: Array<{ id: CewpMode; label: string }> = [
  { id: "internet", label: "Today's internet" },
  { id: "cewp", label: "CEWP" },
  { id: "both", label: "Side by side" },
];

type Beat = {
  id: CewpMode;
  title: string;
  body: string;
};

const BEATS: Record<CewpMode, Beat> = {
  internet: {
    id: "internet",
    title: "Today: ten thousand datacenters, five companies",
    body:
      "Almost every byte you produce or consume passes through one of about ten thousand hyperscale facilities. Five companies run most of them. The orange dots are those facilities. The orange arcs are the flows. Watch how every metro on Earth funnels into the same handful of choke points.",
  },
  cewp: {
    id: "cewp",
    title: "CEWP: home-server class, peer to peer",
    body:
      "CEWP runs on the hardware you already own. About one server for every ten humans, distributed where the humans already live. Bytes admit at the recipient's trust gate and propagate along the trust graph. Sixty-five percent of typical activity never leaves its metro. Same submarine cables underneath. No datacenters in the middle.",
  },
  both: {
    id: "both",
    title: "Same workload. Two topologies. Pick your future.",
    body:
      "The fiber is the same. The submarine cables are the same. What changes is who holds the bytes in the middle. Centralized: five companies hold every conversation, every file, every AI call. Federated: you do, on your hardware, with cryptographic accountability for every load-bearing claim.",
  },
};

const NUMBERS = [
  {
    label: "Substrate ownership",
    today: "5 hyperscalers",
    cewp: "500 M L1 + 2.75 B L0 nodes (~1 per 10 humans)",
  },
  {
    label: "Datacenters required",
    today: "~10 K hyperscale + edge",
    cewp: "None",
  },
  {
    label: "AI training and inference",
    today: "Centralized in 5 labs",
    cewp: "Edge-deployable; alignment distributed",
  },
  {
    label: "Per-user disk owned",
    today: "~0 (their servers)",
    cewp: "Yours, on your hardware",
  },
  {
    label: "Switching cost",
    today: "Network-effects lock-in",
    cewp: "Near zero (federation key portable)",
  },
];

export default function CewpView() {
  const [mode, setMode] = useState<CewpMode>("internet");
  const beat = BEATS[mode];

  return (
    <div className="space-y-4">
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

      <div className="relative h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-gray-800 md:h-[560px]">
        <GlobeScene mode={mode} />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end text-[11px] text-slate-300">
          <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">
            drag to rotate
          </span>
        </div>
      </div>

      <article className="rounded-md border-l-4 border-rose-400 bg-white p-4 dark:bg-gray-900">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {beat.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {beat.body}
        </p>
      </article>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          At full internet scale (5 B users, 50 MB / user / day)
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3">Dimension</th>
                <th className="py-2 pr-3">Today</th>
                <th className="py-2 pr-3">CEWP</th>
              </tr>
            </thead>
            <tbody>
              {NUMBERS.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-slate-200 dark:border-gray-800"
                >
                  <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">
                    {row.label}
                  </td>
                  <td className="py-2 pr-3 text-orange-700 dark:text-orange-300">
                    {row.today}
                  </td>
                  <td className="py-2 pr-3 text-teal-700 dark:text-teal-300">
                    {row.cewp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] italic text-slate-500">
          Numbers from the federation scaling model. The simulation engine
          renders them at 1:1 over the real internet topology — real metros,
          real submarine cables, real peering points.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          Where to go next
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          <li>
            <a
              className="text-brand-primary underline-offset-2 hover:underline"
              href="https://github.com/CIRISAI/CEWP"
              target="_blank"
              rel="noreferrer"
            >
              CEWP repo
            </a>{" "}
            — the platform identity and the simulation engine spec.
          </li>
          <li>
            <a
              className="text-brand-primary underline-offset-2 hover:underline"
              href="https://github.com/CIRISAI/CEWP/blob/main/FSD/SIMULATION_ENGINE.md"
              target="_blank"
              rel="noreferrer"
            >
              Simulation engine FSD
            </a>{" "}
            — modular Rust engine that scales from 1 K agents (browser) to
            5 B agents at 1:1 (GPU cluster).
          </li>
          <li>
            <a
              className="text-brand-primary underline-offset-2 hover:underline"
              href="https://github.com/CIRISAI/CIRISNodeCore/blob/main/FSD/FEDERATION_SCALING_MODEL.md"
              target="_blank"
              rel="noreferrer"
            >
              Federation scaling model
            </a>{" "}
            — the analytic numbers the simulation engine reproduces.
          </li>
          <li>
            <a
              className="text-brand-primary underline-offset-2 hover:underline"
              href="/research-status"
            >
              Research status
            </a>{" "}
            — the empirical bet.
          </li>
        </ul>
      </section>
    </div>
  );
}
