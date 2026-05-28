"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  IconLayoutSidebarLeftExpand,
  IconX,
  IconChevronRight,
  IconChevronDown,
  IconList,
  IconFileText,
  IconNetwork,
} from "@tabler/icons-react";
import type {
  Seed,
  Dimension,
  Batch,
  BatchId,
  AccordPrinciple,
} from "../lib/shared";
import DimensionDoc from "./DimensionDoc";
import SemanticsGraph from "./SemanticsGraph";

type Mode = "dimension" | "regulatory" | "semantics";

interface Selection {
  mode: Mode;
  // dimension mode: D## id
  dimensionId?: string;
  // regulatory mode: batch id, optional attestation index
  batchId?: BatchId;
  attestationDimensionId?: string;
  // semantics mode: graph node id (D##, principle:foo, primitive:foo)
  semanticsNodeId?: string;
}

const ACCORD_LABEL: Record<AccordPrinciple, string> = {
  beneficence: "Beneficence",
  non_maleficence: "Non-maleficence",
  integrity: "Integrity",
  fidelity: "Fidelity",
  autonomy: "Autonomy",
  justice: "Justice",
};

const ACCORD_DOT: Record<AccordPrinciple, string> = {
  beneficence: "bg-emerald-500",
  non_maleficence: "bg-red-500",
  integrity: "bg-blue-500",
  fidelity: "bg-purple-500",
  autonomy: "bg-amber-500",
  justice: "bg-pink-500",
};

const SEVERITY_STYLE: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  MEDIUM: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  LOW_MEDIUM:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

function decodeSelection(
  params: URLSearchParams,
  fallbackDimensionId: string | null,
): Selection {
  const modeParam = params.get("mode");
  const mode: Mode =
    modeParam === "regulatory" || modeParam === "semantics"
      ? modeParam
      : "dimension";
  const sel: Selection = { mode };
  if (mode === "dimension") {
    sel.dimensionId = params.get("id") ?? fallbackDimensionId ?? undefined;
  } else if (mode === "regulatory") {
    sel.batchId = (params.get("batch") as BatchId | null) ?? undefined;
    sel.attestationDimensionId = params.get("attest") ?? undefined;
  } else {
    sel.semanticsNodeId = params.get("node") ?? undefined;
  }
  return sel;
}

function encodeSelection(sel: Selection): string {
  const p = new URLSearchParams();
  p.set("mode", sel.mode);
  if (sel.mode === "dimension" && sel.dimensionId) p.set("id", sel.dimensionId);
  if (sel.mode === "regulatory") {
    if (sel.batchId) p.set("batch", sel.batchId);
    if (sel.attestationDimensionId) p.set("attest", sel.attestationDimensionId);
  }
  if (sel.mode === "semantics" && sel.semanticsNodeId)
    p.set("node", sel.semanticsNodeId);
  return p.toString();
}

function hasRightContent(sel: Selection): boolean {
  if (sel.mode === "dimension") return Boolean(sel.dimensionId);
  if (sel.mode === "regulatory")
    return Boolean(sel.batchId && sel.attestationDimensionId);
  return Boolean(sel.semanticsNodeId);
}

// ──────────────────────────── ModeSelector ─────────────────────────────

function ModeSelector({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  const opts: { id: Mode; label: string; sub: string; icon: React.ReactNode }[] =
    [
      {
        id: "dimension",
        label: "Dimensions",
        sub: "D01–D27",
        icon: <IconList className="h-4 w-4" />,
      },
      {
        id: "regulatory",
        label: "Regulatory work",
        sub: "4 batches",
        icon: <IconFileText className="h-4 w-4" />,
      },
      {
        id: "semantics",
        label: "CIRIS semantics",
        sub: "interactive graph",
        icon: <IconNetwork className="h-4 w-4" />,
      },
    ];
  return (
    <div className="space-y-1.5">
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition ${
            mode === o.id
              ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
              : "border-slate-200 bg-white text-slate-700 hover:border-brand-primary/40 hover:bg-slate-50 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-gray-800"
          }`}
        >
          <span className="shrink-0">{o.icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{o.label}</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
              {o.sub}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────── DimensionTree ─────────────────────────────

function DimensionTree({
  seed,
  selectedId,
  onSelect,
}: {
  seed: Seed;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const tiers: [string, Dimension[]][] = [
    ["STRONG-4", seed.dimensions.filter((d) => d.tier === "STRONG-4")],
    ["STRONG-3", seed.dimensions.filter((d) => d.tier === "STRONG-3")],
  ];
  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({
    "STRONG-4": true,
    "STRONG-3": true,
  });

  return (
    <div className="space-y-3">
      {tiers.map(([tierName, dims]) => (
        <div key={tierName}>
          <button
            onClick={() =>
              setOpenTiers((o) => ({ ...o, [tierName]: !o[tierName] }))
            }
            className="flex w-full items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-brand-primary dark:text-slate-300"
          >
            {openTiers[tierName] ? (
              <IconChevronDown className="h-3 w-3" />
            ) : (
              <IconChevronRight className="h-3 w-3" />
            )}
            {tierName} ({dims.length})
          </button>
          {openTiers[tierName] && (
            <ul className="mt-1.5 space-y-0.5">
              {dims.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => onSelect(d.id)}
                    className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-left text-sm transition ${
                      selectedId === d.id
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ACCORD_DOT[d.accord_principle]}`}
                      title={ACCORD_LABEL[d.accord_principle]}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="font-mono text-xs font-semibold">
                        {d.id}
                      </span>{" "}
                      <span className="text-xs">{d.prefix}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────── RegulatoryTree ─────────────────────────────

function RegulatoryTree({
  seed,
  selectedBatchId,
  selectedDimensionId,
  onSelectBatch,
  onSelectAttestation,
}: {
  seed: Seed;
  selectedBatchId: BatchId | null;
  selectedDimensionId: string | null;
  onSelectBatch: (b: BatchId) => void;
  onSelectAttestation: (b: BatchId, d: string) => void;
}) {
  const [open, setOpen] = useState<Record<BatchId, boolean>>(
    () =>
      Object.fromEntries(seed.batches.map((b) => [b.id, false])) as Record<
        BatchId,
        boolean
      >,
  );

  // When a batch becomes selected, auto-expand it.
  useEffect(() => {
    if (selectedBatchId) {
      setOpen((o) => ({ ...o, [selectedBatchId]: true }));
    }
  }, [selectedBatchId]);

  function dimensionsAttestedBy(b: BatchId) {
    return seed.dimensions.filter((d) =>
      d.regulatory_attestations.some((a) => a.batch_id === b),
    );
  }

  return (
    <div className="space-y-2">
      {seed.batches.map((b) => {
        const dims = dimensionsAttestedBy(b.id);
        return (
          <div key={b.id}>
            <div className="flex items-stretch">
              <button
                onClick={() => setOpen((o) => ({ ...o, [b.id]: !o[b.id] }))}
                className="flex shrink-0 items-center px-1 text-slate-500 hover:text-brand-primary"
                aria-label={open[b.id] ? "Collapse" : "Expand"}
              >
                {open[b.id] ? (
                  <IconChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <IconChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                onClick={() => onSelectBatch(b.id)}
                className={`flex-1 rounded px-2 py-1.5 text-left text-sm transition ${
                  selectedBatchId === b.id && !selectedDimensionId
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="block font-semibold">{b.short}</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {dims.length} dimensions
                </span>
              </button>
            </div>
            {open[b.id] && (
              <ul className="ml-5 mt-1 space-y-0.5 border-l border-slate-200 pl-2 dark:border-gray-700">
                {dims.map((d) => {
                  const att = d.regulatory_attestations.find(
                    (a) => a.batch_id === b.id,
                  );
                  return (
                    <li key={d.id}>
                      <button
                        onClick={() => onSelectAttestation(b.id, d.id)}
                        className={`flex w-full items-start gap-1.5 rounded px-1.5 py-1 text-left text-xs transition ${
                          selectedBatchId === b.id &&
                          selectedDimensionId === d.id
                            ? "bg-brand-primary/10 text-brand-primary"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="font-mono shrink-0">{d.id}</span>
                        {att && (
                          <span className="truncate text-slate-500 dark:text-slate-400">
                            {att.citation}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ──────────────────────────── Center: Dimension overview ──────────────────

function DimensionOverview({
  d,
  seed,
  onJumpToDimension,
}: {
  d: Dimension;
  seed: Seed;
  onJumpToDimension: (id: string) => void;
}) {
  const cells = [
    { short: "MH", count: d.attestations.MH ?? 0 },
    { short: "EU", count: d.attestations.EU ?? 0 },
    { short: "IEEE", count: d.attestations.IEEE ?? 0 },
    { short: "ASEAN", count: d.attestations.ASEAN ?? 0 },
  ];
  const max = Math.max(...cells.map((c) => c.count), 1);
  const conflicts = seed.aggregate_indices.conflicts_surfaced.filter((c) =>
    c.dimensions.includes(d.id),
  );
  const t3s = seed.aggregate_indices.t3_candidates_v1_5.filter(
    (t) => t.affects_dimension === d.id,
  );
  const siblings = (
    seed.aggregate_indices.by_accord_principle[d.accord_principle] ?? []
  ).filter((id) => id !== d.id);
  const batchById = new Map(seed.batches.map((b) => [b.id, b]));

  return (
    <div className="space-y-5">
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-lg font-bold text-brand-primary">
            {d.id}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
              d.tier === "STRONG-4"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            }`}
          >
            {d.tier}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-gray-800 dark:text-slate-300">
            {ACCORD_LABEL[d.accord_principle]}
          </span>
        </div>
        <h2 className="font-mono text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
          {d.prefix}
        </h2>
        <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
          {d.gloss}
        </p>
      </header>

      {/* Attestation bars */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Attestation density
        </p>
        <div className="space-y-1">
          {cells.map((c) => (
            <div key={c.short} className="flex items-center gap-2 text-xs">
              <span className="w-12 font-mono text-slate-500 dark:text-slate-400">
                {c.short}
              </span>
              <div className="h-3 flex-1 rounded bg-slate-100 dark:bg-gray-800">
                <div
                  className="h-3 rounded bg-brand-primary"
                  style={{ width: `${(c.count / max) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right font-mono text-slate-700 dark:text-slate-300">
                {c.count}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="w-12 font-mono font-semibold text-slate-700 dark:text-slate-300">
              total
            </span>
            <span className="flex-1" />
            <span className="w-10 text-right font-mono font-semibold text-brand-primary">
              {d.attestations.total}
            </span>
          </div>
        </div>
      </section>

      {/* Source quotes */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Regulatory attestations
        </p>
        <div className="space-y-3">
          {d.regulatory_attestations.map((a) => {
            const batch = batchById.get(a.batch_id);
            return (
              <div
                key={a.batch_id}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-brand-primary/10 px-1.5 py-0.5 text-[11px] font-bold text-brand-primary">
                    {batch?.short ?? a.batch_id}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {a.citation}
                  </span>
                </div>
                <blockquote className="mt-2 border-l-4 border-brand-primary/30 pl-3 text-sm italic leading-6 text-slate-700 dark:text-slate-300">
                  &ldquo;{a.language}&rdquo;
                </blockquote>
                <p className="mt-2 break-all rounded bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
                  {a.wire_form}
                </p>
              </div>
            );
          })}
          {(d.absent_batch ?? []).map((a) => {
            const batch = batchById.get(a.batch_id);
            return (
              <div
                key={a.batch_id}
                className="rounded-lg border border-dashed border-amber-300 bg-amber-50/40 p-3 dark:border-amber-700/40 dark:bg-amber-950/20"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-200 px-1.5 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    {batch?.short ?? a.batch_id}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                    absent
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {a.absence_note}
                </p>
                {a.functional_analogue && (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <strong>Functional analogue:</strong>{" "}
                    {a.functional_analogue}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Convergence / conflicts / T-3 */}
      {(d.convergence_note || conflicts.length > 0 || t3s.length > 0) && (
        <section className="space-y-3">
          {d.convergence_note && (
            <div className="rounded-lg border-l-4 border-brand-primary bg-brand-primary/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
                Convergence
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {d.convergence_note}
              </p>
            </div>
          )}
          {conflicts.length > 0 && (
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50/40 p-3 dark:bg-red-950/20">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
                Cross-source conflicts ({conflicts.length})
              </p>
              <div className="mt-2 space-y-2">
                {conflicts.map((c) => (
                  <div key={c.id} className="text-sm">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-red-700 dark:text-red-300">
                        {c.id}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          SEVERITY_STYLE[c.severity] ??
                          "bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-slate-300"
                        }`}
                      >
                        {c.severity}
                      </span>
                    </div>
                    <p className="mt-1 leading-6 text-slate-700 dark:text-slate-200">
                      {c.claim}
                    </p>
                    {c.disposition && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        <strong>Disposition:</strong> {c.disposition}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {t3s.length > 0 && (
            <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/40 p-3 dark:bg-amber-950/20">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                v1.5+ proposals ({t3s.length})
              </p>
              <div className="mt-2 space-y-2">
                {t3s.map((t) => (
                  <div key={t.id} className="text-sm">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        {t.id}
                      </span>
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        {t.priority}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs leading-6 text-slate-700 dark:text-slate-200">
                      {t.proposed_prefix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Siblings under same Accord principle */}
      {siblings.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Other dimensions under {ACCORD_LABEL[d.accord_principle]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {siblings.map((sid) => (
              <button
                key={sid}
                onClick={() => onJumpToDimension(sid)}
                className="rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                {sid}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ──────────────────────────── Center: Regulatory overview ──────────────────

function RegulatoryOverview({
  batch,
  seed,
  onSelectAttestation,
}: {
  batch: Batch;
  seed: Seed;
  onSelectAttestation: (d: string) => void;
}) {
  const attestations = seed.dimensions
    .map((d) => {
      const a = d.regulatory_attestations.find((x) => x.batch_id === batch.id);
      return a ? { dimension: d, attestation: a } : null;
    })
    .filter((x): x is { dimension: Dimension; attestation: typeof seed.dimensions[number]["regulatory_attestations"][number] } => x !== null);

  return (
    <div className="space-y-5">
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-lg font-bold text-brand-primary">
            {batch.short}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-gray-800 dark:text-slate-300">
            {batch.institutional_shape.replace(/_/g, " ")}
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
          {batch.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {batch.authority} · {batch.publication_date} ·{" "}
          {batch.geographic_scope.replace(/_/g, " ")} ·{" "}
          {batch.atomic_units_mapped} atomic units mapped ·{" "}
          {attestations.length} dimensions attested
        </p>
      </header>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Dimensions attested by this batch
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          {attestations.map(({ dimension, attestation }) => (
            <li key={dimension.id}>
              <button
                onClick={() => onSelectAttestation(dimension.id)}
                className="flex w-full flex-col items-start gap-1 rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-brand-primary hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex w-full items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-primary">
                    {dimension.id}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {attestation.citation}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs italic text-slate-600 dark:text-slate-300">
                  &ldquo;{attestation.language}&rdquo;
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// ──────────────────────────── Center: Empty states ─────────────────────────

function CenterEmpty({ mode }: { mode: Mode }) {
  if (mode === "dimension") {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
        Pick a dimension from the left to load its three-layer view.
      </div>
    );
  }
  if (mode === "regulatory") {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
        Pick a batch from the left (MH / EU / IEEE / ASEAN) to see what it
        attests, then drill into a citation.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
      Click a node in the graph to focus its neighborhood.
    </div>
  );
}

// ──────────────────────────── Right: regulatory detail ─────────────────────

function RegulatoryDetail({
  batch,
  dimension,
  onClose,
  onJumpToDimension,
}: {
  batch: Batch;
  dimension: Dimension;
  onClose: () => void;
  onJumpToDimension: (id: string) => void;
}) {
  const att = dimension.regulatory_attestations.find(
    (a) => a.batch_id === batch.id,
  );
  if (!att) return null;
  return (
    <div className="space-y-3">
      <RightHeader onClose={onClose} title={`${batch.short} · ${att.citation}`} />
      <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
        {batch.title} · {batch.authority}
      </p>
      <blockquote className="border-l-4 border-brand-primary/40 bg-brand-primary/5 px-3 py-2 italic">
        &ldquo;{att.language}&rdquo;
      </blockquote>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          CIRIS wire form
        </p>
        <p className="mt-1 break-all rounded bg-slate-50 px-2 py-1 font-mono text-xs text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
          {att.wire_form}
        </p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Attests dimension
        </p>
        <button
          onClick={() => onJumpToDimension(dimension.id)}
          className="mt-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-mono hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
        >
          {dimension.id} · {dimension.prefix}
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────── Right: semantics detail ──────────────────────

function SemanticsDetail({
  nodeId,
  seed,
  onClose,
  onJumpToDimension,
  onSelectNode,
}: {
  nodeId: string;
  seed: Seed;
  onClose: () => void;
  onJumpToDimension: (id: string) => void;
  onSelectNode: (id: string) => void;
}) {
  // dimension node
  if (/^D\d{2}$/.test(nodeId)) {
    const d = seed.dimensions.find((x) => x.id === nodeId);
    if (!d) return null;
    return (
      <div className="space-y-3">
        <RightHeader onClose={onClose} title={`${d.id} · ${d.prefix}`} />
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          {d.gloss}
        </p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Accord principle
          </p>
          <button
            onClick={() => onSelectNode(`principle:${d.accord_principle}`)}
            className="mt-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
          >
            {ACCORD_LABEL[d.accord_principle]}
          </button>
        </div>
        <button
          onClick={() => onJumpToDimension(d.id)}
          className="rounded-md border-2 border-brand-primary px-3 py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10"
        >
          Open full dimension view →
        </button>
      </div>
    );
  }
  // principle node
  if (nodeId.startsWith("principle:")) {
    const p = nodeId.slice("principle:".length) as AccordPrinciple;
    const dims = seed.aggregate_indices.by_accord_principle[p] ?? [];
    return (
      <div className="space-y-3">
        <RightHeader onClose={onClose} title={`Accord: ${ACCORD_LABEL[p]}`} />
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          One of the six CIRIS Accord principles. The dimensions below
          operationalize it.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dims.map((sid) => (
            <button
              key={sid}
              onClick={() => onSelectNode(sid)}
              className="rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
            >
              {sid}
            </button>
          ))}
        </div>
      </div>
    );
  }
  // primitive node
  if (nodeId.startsWith("primitive:")) {
    const prefix = nodeId.slice("primitive:".length);
    const dims = seed.dimensions.filter((d) =>
      d.wire_primitives.some((wp) =>
        wp
          .replace(/\s*\([^)]*\)\s*/g, "")
          .trim()
          .startsWith(prefix.replace(/:\*$/, "")),
      ),
    );
    return (
      <div className="space-y-3">
        <RightHeader onClose={onClose} title="Wire primitive" />
        <p className="break-all rounded bg-slate-50 px-2 py-1 font-mono text-sm text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
          {prefix}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Used by
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dims.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectNode(d.id)}
              className="rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
            >
              {d.id}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function RightHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 pb-2">
      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
        {title}
      </h3>
      <button
        onClick={onClose}
        className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-300 lg:hidden"
        aria-label="Close detail"
      >
        <IconX className="h-4 w-4" />
      </button>
    </div>
  );
}

// ──────────────────────────── Top-level Workspace ─────────────────────────

export default function Workspace({
  seed,
  initialDimensionId,
}: {
  seed: Seed;
  initialDimensionId: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [sel, setSel] = useState<Selection>(() =>
    decodeSelection(new URLSearchParams(params.toString()), initialDimensionId),
  );
  const [leftOpenMobile, setLeftOpenMobile] = useState(false);
  const [rightOpenMobile, setRightOpenMobile] = useState(false);

  // Sync URL when selection changes (without reload)
  const lastQuery = useRef<string>("");
  useEffect(() => {
    const q = encodeSelection(sel);
    if (q === lastQuery.current) return;
    lastQuery.current = q;
    // On the static /compliance route we use search params; on /compliance/D04
    // we leave the path alone and just push the params.
    router.replace(`${pathname}?${q}`, { scroll: false });
  }, [sel, pathname, router]);

  // When selection becomes "right-pane content", open the mobile overlay.
  useEffect(() => {
    if (hasRightContent(sel)) {
      setRightOpenMobile(true);
    }
  }, [sel]);

  const setMode = useCallback((mode: Mode) => {
    setSel((s) => ({ ...s, mode }));
  }, []);

  const selectDimension = useCallback((id: string) => {
    setSel({ mode: "dimension", dimensionId: id });
    setLeftOpenMobile(false);
  }, []);

  const selectBatch = useCallback((b: BatchId) => {
    setSel({ mode: "regulatory", batchId: b });
    setLeftOpenMobile(false);
  }, []);

  const selectAttestation = useCallback((b: BatchId, d: string) => {
    setSel({
      mode: "regulatory",
      batchId: b,
      attestationDimensionId: d,
    });
    setLeftOpenMobile(false);
  }, []);

  const selectSemanticsNode = useCallback((id: string | null) => {
    setSel((s) => ({
      mode: "semantics",
      semanticsNodeId: id ?? undefined,
    }));
  }, []);

  const closeRight = useCallback(() => {
    setRightOpenMobile(false);
    setSel((s) => {
      if (s.mode === "dimension") return { mode: "dimension" };
      if (s.mode === "regulatory") return { mode: "regulatory", batchId: s.batchId };
      return { mode: "semantics" };
    });
  }, []);

  const currentDimension: Dimension | null =
    sel.mode === "dimension" && sel.dimensionId
      ? (seed.dimensions.find((d) => d.id === sel.dimensionId) ?? null)
      : null;

  const currentBatch: Batch | null =
    sel.mode === "regulatory" && sel.batchId
      ? (seed.batches.find((b) => b.id === sel.batchId) ?? null)
      : null;

  const currentRegulatoryDimension: Dimension | null =
    sel.mode === "regulatory" && sel.attestationDimensionId
      ? (seed.dimensions.find((d) => d.id === sel.attestationDimensionId) ?? null)
      : null;

  return (
    <div className="relative">
      {/* Mobile top bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-3 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 lg:hidden">
        <button
          onClick={() => setLeftOpenMobile(true)}
          className="flex items-center gap-2 rounded-md border-2 border-brand-primary bg-brand-primary/5 px-3 py-2 text-sm font-semibold text-brand-primary"
        >
          <IconLayoutSidebarLeftExpand className="h-4 w-4" />
          Navigate
        </button>
        <span className="truncate text-xs text-slate-500 dark:text-slate-400">
          {sel.mode === "dimension"
            ? sel.dimensionId
              ? `Dimension · ${sel.dimensionId}`
              : "Dimensions"
            : sel.mode === "regulatory"
              ? sel.batchId
                ? `Regulatory · ${sel.batchId.split("_")[0].toUpperCase()}`
                : "Regulatory"
              : "CIRIS semantics"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* LEFT PANE (drawer on mobile) */}
        <aside
          className={`${
            leftOpenMobile
              ? "fixed inset-0 z-40 overflow-y-auto bg-white p-4 dark:bg-gray-950"
              : "hidden"
          } lg:sticky lg:top-24 lg:z-0 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:p-4 lg:dark:border-gray-800 lg:dark:bg-gray-900`}
        >
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Navigate
            </h2>
            <button
              onClick={() => setLeftOpenMobile(false)}
              className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-300"
              aria-label="Close navigation"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
          <ModeSelector mode={sel.mode} onChange={setMode} />
          <hr className="my-3 border-slate-200 dark:border-gray-700" />
          {sel.mode === "dimension" && (
            <DimensionTree
              seed={seed}
              selectedId={sel.dimensionId ?? null}
              onSelect={selectDimension}
            />
          )}
          {sel.mode === "regulatory" && (
            <RegulatoryTree
              seed={seed}
              selectedBatchId={sel.batchId ?? null}
              selectedDimensionId={sel.attestationDimensionId ?? null}
              onSelectBatch={selectBatch}
              onSelectAttestation={selectAttestation}
            />
          )}
          {sel.mode === "semantics" && (
            <div className="text-xs leading-6 text-slate-600 dark:text-slate-400">
              The graph in the center is the navigation surface. Click any
              node to focus its neighborhood; the right pane fills with its
              context.
            </div>
          )}
        </aside>

        {/* CENTER PANE (workspace) */}
        <section className="min-w-0 space-y-4">
          {sel.mode === "dimension" &&
            (currentDimension ? (
              <DimensionOverview
                d={currentDimension}
                seed={seed}
                onJumpToDimension={selectDimension}
              />
            ) : (
              <CenterEmpty mode="dimension" />
            ))}
          {sel.mode === "regulatory" &&
            (currentBatch ? (
              <RegulatoryOverview
                batch={currentBatch}
                seed={seed}
                onSelectAttestation={(d) =>
                  selectAttestation(currentBatch.id, d)
                }
              />
            ) : (
              <CenterEmpty mode="regulatory" />
            ))}
          {sel.mode === "semantics" && (
            <SemanticsGraph
              seed={seed}
              selectedId={sel.semanticsNodeId ?? null}
              onSelect={selectSemanticsNode}
            />
          )}
        </section>

        {/* RIGHT PANE (overlay on mobile) */}
        {hasRightContent(sel) && (
          <aside
            className={`${
              rightOpenMobile
                ? "fixed inset-0 z-40 overflow-y-auto bg-white p-4 dark:bg-gray-950"
                : "hidden"
            } xl:sticky xl:top-24 xl:z-0 xl:block xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:rounded-2xl xl:border xl:border-slate-200 xl:bg-white xl:p-4 xl:dark:border-gray-800 xl:dark:bg-gray-900`}
          >
            {/* Mobile dismiss bar */}
            <div className="mb-3 flex items-center justify-between xl:hidden">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Detail
              </h2>
              <button
                onClick={() => setRightOpenMobile(false)}
                className="rounded-md border border-slate-300 p-1.5 text-slate-600 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-300"
                aria-label="Close detail"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            {sel.mode === "dimension" && currentDimension && (
              <DimensionDoc dimensionId={currentDimension.id} />
            )}
            {sel.mode === "regulatory" &&
              currentBatch &&
              currentRegulatoryDimension && (
                <RegulatoryDetail
                  batch={currentBatch}
                  dimension={currentRegulatoryDimension}
                  onClose={closeRight}
                  onJumpToDimension={(id) => {
                    setSel({ mode: "dimension", dimensionId: id });
                    setRightOpenMobile(true);
                  }}
                />
              )}
            {sel.mode === "semantics" && sel.semanticsNodeId && (
              <SemanticsDetail
                nodeId={sel.semanticsNodeId}
                seed={seed}
                onClose={closeRight}
                onJumpToDimension={(id) => {
                  setSel({ mode: "dimension", dimensionId: id });
                  setRightOpenMobile(true);
                }}
                onSelectNode={(id) =>
                  setSel({ mode: "semantics", semanticsNodeId: id })
                }
              />
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
