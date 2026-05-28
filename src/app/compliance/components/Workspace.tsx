"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
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
  RegulatoryAttestation,
} from "../lib/shared";
import { CHAPTERS_BY_BATCH } from "../lib/shared";
import DimensionDoc from "./DimensionDoc";
import SemanticsGraph from "./SemanticsGraph";
import SourceChapterView from "./SourceChapterView";
import ParagraphDetail from "./ParagraphDetail";

type Mode = "dimension" | "regulatory" | "semantics";

interface Selection {
  mode: Mode;
  // dimension mode
  dimensionId?: string;
  // regulatory mode
  batchId?: BatchId;
  chapterFile?: string;
  citation?: string;
  // semantics mode
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
  MEDIUM:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
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
    sel.chapterFile = params.get("chapter") ?? undefined;
    sel.citation = params.get("citation") ?? undefined;
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
    if (sel.chapterFile) p.set("chapter", sel.chapterFile);
    if (sel.citation) p.set("citation", sel.citation);
  }
  if (sel.mode === "semantics" && sel.semanticsNodeId)
    p.set("node", sel.semanticsNodeId);
  return p.toString();
}

function hasRightContent(sel: Selection): boolean {
  if (sel.mode === "dimension") return Boolean(sel.dimensionId);
  if (sel.mode === "regulatory") return Boolean(sel.citation);
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
        sub: "the CIRIS spine",
        icon: <IconList className="h-4 w-4" />,
      },
      {
        id: "regulatory",
        label: "Regulatory work",
        sub: "4 batches · chapters",
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
                    className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-left transition ${
                      selectedId === d.id
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    }`}
                    title={d.gloss}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ACCORD_DOT[d.accord_principle]}`}
                      title={ACCORD_LABEL[d.accord_principle]}
                    />
                    <span className="min-w-0 flex-1 break-all font-mono text-xs">
                      {d.prefix}
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

// ──────────────────────────── RegulatoryTree (chapters) ────────────────────

function RegulatoryTree({
  seed,
  selectedBatchId,
  selectedChapter,
  onSelectBatch,
  onSelectChapter,
}: {
  seed: Seed;
  selectedBatchId: BatchId | null;
  selectedChapter: string | null;
  onSelectBatch: (b: BatchId) => void;
  onSelectChapter: (b: BatchId, file: string) => void;
}) {
  const [open, setOpen] = useState<Record<BatchId, boolean>>(
    () =>
      Object.fromEntries(seed.batches.map((b) => [b.id, false])) as Record<
        BatchId,
        boolean
      >,
  );

  // Auto-expand the selected batch.
  useEffect(() => {
    if (selectedBatchId) {
      setOpen((o) => ({ ...o, [selectedBatchId]: true }));
    }
  }, [selectedBatchId]);

  return (
    <div className="space-y-2">
      {seed.batches.map((b) => {
        const chapters = CHAPTERS_BY_BATCH[b.id] ?? [];
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
                  selectedBatchId === b.id && !selectedChapter
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="block font-semibold">{b.short}</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {chapters.length} chapters
                </span>
              </button>
            </div>
            {open[b.id] && (
              <ul className="ml-5 mt-1 space-y-0.5 border-l border-slate-200 pl-2 dark:border-gray-700">
                {chapters.map((ch) => (
                  <li key={ch.file}>
                    <button
                      onClick={() => onSelectChapter(b.id, ch.file)}
                      className={`block w-full rounded px-1.5 py-1 text-left text-xs transition ${
                        selectedBatchId === b.id &&
                        selectedChapter === ch.file
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      {ch.label}
                    </button>
                  </li>
                ))}
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
  const siblingDimensions = siblings
    .map((id) => seed.dimensions.find((x) => x.id === id))
    .filter((x): x is Dimension => Boolean(x));

  return (
    <div className="space-y-5">
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
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
        <h2 className="break-all font-mono text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
          {d.prefix}
        </h2>
        <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
          {d.gloss}
        </p>
      </header>

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

      {siblingDimensions.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Other dimensions under {ACCORD_LABEL[d.accord_principle]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {siblingDimensions.map((sd) => (
              <button
                key={sd.id}
                onClick={() => onJumpToDimension(sd.id)}
                className="break-all rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                title={sd.gloss}
              >
                {sd.prefix}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ──────────────────────────── Center: Batch overview ───────────────────────

function BatchOverview({
  batch,
  seed,
  onSelectChapter,
}: {
  batch: Batch;
  seed: Seed;
  onSelectChapter: (file: string) => void;
}) {
  const chapters = CHAPTERS_BY_BATCH[batch.id] ?? [];
  const attestationCount = seed.dimensions.filter((d) =>
    d.regulatory_attestations.some((a) => a.batch_id === batch.id),
  ).length;

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
          {batch.geographic_scope.replace(/_/g, " ")}
          <br />
          {batch.atomic_units_mapped} atomic units mapped ·{" "}
          {attestationCount} CIRIS dimensions attested
        </p>
      </header>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Pick a chapter to start reading
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          {chapters.map((ch) => (
            <li key={ch.file}>
              <button
                onClick={() => onSelectChapter(ch.file)}
                className="block w-full rounded-lg border border-slate-200 bg-white p-3 text-left text-sm transition hover:border-brand-primary hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {ch.label}
                </span>
                <span className="mt-0.5 block truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {ch.file}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Inside a chapter, headings with a matching CIRIS dimension show a{" "}
          <span className="rounded-full border border-brand-primary/40 bg-brand-primary/5 px-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
            cross-references
          </span>{" "}
          button. Click it to see the dimension(s) attested, other batches&apos;
          attestations, and the CIRIS control.
        </p>
      </section>
    </div>
  );
}

// ──────────────────────────── Center: Empty ────────────────────────────────

function CenterEmpty({ mode }: { mode: Mode }) {
  if (mode === "dimension") {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
        Pick a CIRIS dimension from the left.
      </div>
    );
  }
  if (mode === "regulatory") {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
        Pick a regulatory work from the left (MH / EU / IEEE / ASEAN), then a
        chapter inside it.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
      Click a node in the graph to focus its neighborhood.
    </div>
  );
}

// ──────────────────────────── Right: citation cross-refs ──────────────────

function findCrossReferences(
  seed: Seed,
  batchId: BatchId,
  citationToken: string,
): { dimension: Dimension; attestation: RegulatoryAttestation }[] {
  const normalized = citationToken.toLowerCase().replace(/\s+/g, " ").trim();
  const hits: { dimension: Dimension; attestation: RegulatoryAttestation }[] =
    [];
  for (const d of seed.dimensions) {
    for (const a of d.regulatory_attestations) {
      if (a.batch_id !== batchId) continue;
      const cit = a.citation.toLowerCase().replace(/\s+/g, " ").trim();
      if (
        cit === normalized ||
        cit.startsWith(normalized) ||
        normalized.startsWith(cit) ||
        cit.includes(normalized)
      ) {
        hits.push({ dimension: d, attestation: a });
        break;
      }
    }
  }
  return hits;
}

function CitationCrossRef({
  seed,
  batch,
  citation,
  onClose,
  onJumpToDimension,
}: {
  seed: Seed;
  batch: Batch;
  citation: string;
  onClose: () => void;
  onJumpToDimension: (id: string) => void;
}) {
  const hits = useMemo(
    () => findCrossReferences(seed, batch.id, citation),
    [seed, batch.id, citation],
  );
  const batchById = new Map(seed.batches.map((b) => [b.id, b]));
  const agentBlob = "https://github.com/CIRISAI/CIRISAgent/blob/main";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Citation
        </p>
        <p className="mt-0.5 break-all font-mono text-sm font-semibold text-slate-900 dark:text-white">
          {batch.short} · {citation}
        </p>
      </div>

      {hits.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No seed-anchored CIRIS dimension matches this citation. The seed
          flags canonical anchor citations, not every paragraph in the
          source. You can still see CIRIS&apos;s full coverage by opening any
          dimension from the left.
        </p>
      ) : (
        <>
          <p className="text-xs leading-6 text-slate-600 dark:text-slate-300">
            This paragraph is the seed anchor for{" "}
            <strong>{hits.length}</strong> CIRIS dimension
            {hits.length === 1 ? "" : "s"}. For each one, you can see how the
            other three governance frameworks approached the same subject and
            how CIRIS itself implements it.
          </p>
          {hits.map(({ dimension, attestation }) => {
            const others = dimension.regulatory_attestations.filter(
              (a) => a.batch_id !== batch.id,
            );
            const controlPath = `compliance/${dimension.id}_${dimension.prefix
              .replace(/:\*$/, "")
              .replace(/[^a-zA-Z0-9]+/g, "_")
              .toLowerCase()}.md`;
            return (
              <div
                key={dimension.id}
                className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                {/* CIRIS dimension header */}
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      CIRIS dimension
                    </span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        dimension.tier === "STRONG-4"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {dimension.tier}
                    </span>
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                      {ACCORD_LABEL[dimension.accord_principle]}
                    </span>
                  </div>
                  <button
                    onClick={() => onJumpToDimension(dimension.id)}
                    className="break-all text-left font-mono text-base font-semibold text-brand-primary hover:underline"
                    title={dimension.gloss}
                  >
                    {dimension.prefix}
                  </button>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {dimension.gloss}
                  </p>
                </div>

                {/* How CIRIS addresses it */}
                <div className="rounded-md border-l-4 border-emerald-400 bg-emerald-50/40 p-3 dark:bg-emerald-950/20">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                    How CIRIS addresses it
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                    CIRIS wire form:
                  </p>
                  <p className="mt-1 break-all rounded bg-white px-2 py-1 font-mono text-[11px] text-slate-800 dark:bg-gray-900/60 dark:text-slate-200">
                    {attestation.wire_form}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onJumpToDimension(dimension.id)}
                      className="rounded-md border-2 border-brand-primary bg-brand-primary/5 px-2.5 py-1 text-[11px] font-semibold text-brand-primary hover:bg-brand-primary/10"
                    >
                      Open CIRIS dimension →
                    </button>
                    <a
                      href={`${agentBlob}/${controlPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                    >
                      Control on GitHub →
                    </a>
                  </div>
                </div>

                {/* How other materials approached the same subject */}
                {others.length > 0 && (
                  <div className="rounded-md border-l-4 border-blue-400 bg-blue-50/40 p-3 dark:bg-blue-950/20">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                      How other materials approached the same subject (
                      {others.length})
                    </p>
                    <div className="mt-2 space-y-2">
                      {others.map((a) => {
                        const otherBatch = batchById.get(a.batch_id);
                        return (
                          <div
                            key={a.batch_id}
                            className="rounded border border-slate-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900/60"
                          >
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="rounded bg-brand-primary/10 px-1 py-0.5 text-[10px] font-bold text-brand-primary">
                                {otherBatch?.short ?? a.batch_id}
                              </span>
                              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                                {a.citation}
                              </span>
                            </div>
                            <blockquote className="mt-1 border-l-2 border-brand-primary/30 pl-2 text-xs italic leading-5 text-slate-700 dark:text-slate-300">
                              &ldquo;{a.language}&rdquo;
                            </blockquote>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Absent batches, if any */}
                {(dimension.absent_batch ?? []).length > 0 && (
                  <div className="rounded-md border-l-4 border-amber-400 bg-amber-50/40 p-3 dark:bg-amber-950/20">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                      Absent from
                    </p>
                    <div className="mt-1 space-y-1.5 text-xs leading-5 text-slate-700 dark:text-slate-300">
                      {(dimension.absent_batch ?? []).map((a) => {
                        const ob = batchById.get(a.batch_id);
                        return (
                          <p key={a.batch_id}>
                            <strong>{ob?.short ?? a.batch_id}:</strong>{" "}
                            {a.absence_note}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      <button
        onClick={onClose}
        className="text-xs text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
      >
        Close detail
      </button>
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
  if (/^D\d{2}$/.test(nodeId)) {
    const d = seed.dimensions.find((x) => x.id === nodeId);
    if (!d) return null;
    return (
      <div className="space-y-3">
        <RightHeader title={d.prefix} onClose={onClose} />
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
  if (nodeId.startsWith("principle:")) {
    const p = nodeId.slice("principle:".length) as AccordPrinciple;
    const dims = seed.aggregate_indices.by_accord_principle[p] ?? [];
    return (
      <div className="space-y-3">
        <RightHeader title={`Accord: ${ACCORD_LABEL[p]}`} onClose={onClose} />
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          One of the six CIRIS Accord principles. The dimensions below
          operationalize it.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dims.map((sid) => {
            const sd = seed.dimensions.find((x) => x.id === sid);
            return (
              <button
                key={sid}
                onClick={() => onSelectNode(sid)}
                className="break-all rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
                title={sd?.gloss}
              >
                {sd?.prefix ?? sid}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
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
        <RightHeader title="Wire primitive" onClose={onClose} />
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
              className="break-all rounded-md border border-slate-300 px-2 py-0.5 font-mono text-xs hover:border-brand-primary hover:text-brand-primary dark:border-gray-700"
              title={d.gloss}
            >
              {d.prefix}
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
    <div className="flex items-start justify-between gap-2 pb-2">
      <h3 className="break-all text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
        {title}
      </h3>
      <button
        onClick={onClose}
        className="shrink-0 rounded-md border border-slate-300 p-1.5 text-slate-600 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-300 xl:hidden"
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
  // Single open/close state for the right pane at every breakpoint.
  const [rightOpen, setRightOpen] = useState(true);

  const lastQuery = useRef<string>("");
  useEffect(() => {
    const q = encodeSelection(sel);
    if (q === lastQuery.current) return;
    lastQuery.current = q;
    router.replace(`${pathname}?${q}`, { scroll: false });
  }, [sel, pathname, router]);

  // Auto-open the right pane whenever the user picks something new.
  useEffect(() => {
    if (hasRightContent(sel)) {
      setRightOpen(true);
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

  const selectChapter = useCallback((b: BatchId, file: string) => {
    setSel({ mode: "regulatory", batchId: b, chapterFile: file });
    setLeftOpenMobile(false);
  }, []);

  const pickCitation = useCallback(
    (citation: string) => {
      setSel((s) =>
        s.mode === "regulatory" && s.batchId
          ? { ...s, citation }
          : s,
      );
    },
    [],
  );

  const selectSemanticsNode = useCallback((id: string | null) => {
    setSel({
      mode: "semantics",
      semanticsNodeId: id ?? undefined,
    });
  }, []);

  const closeRight = useCallback(() => {
    setRightOpen(false);
  }, []);

  const currentDimension: Dimension | null =
    sel.mode === "dimension" && sel.dimensionId
      ? (seed.dimensions.find((d) => d.id === sel.dimensionId) ?? null)
      : null;

  const currentBatch: Batch | null =
    sel.mode === "regulatory" && sel.batchId
      ? (seed.batches.find((b) => b.id === sel.batchId) ?? null)
      : null;

  const currentChapter = useMemo(() => {
    if (sel.mode !== "regulatory" || !sel.batchId || !sel.chapterFile)
      return null;
    return (
      CHAPTERS_BY_BATCH[sel.batchId].find((c) => c.file === sel.chapterFile) ??
      null
    );
  }, [sel.mode, sel.batchId, sel.chapterFile]);

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
            ? currentDimension?.prefix ?? "Dimensions"
            : sel.mode === "regulatory"
              ? currentChapter
                ? `${currentBatch?.short} · ${currentChapter.label}`
                : currentBatch?.short ?? "Regulatory work"
              : "CIRIS semantics"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* LEFT PANE */}
        <aside
          className={`${
            leftOpenMobile
              ? "fixed inset-y-0 right-auto left-0 top-24 z-40 w-[calc(100%-3rem)] max-w-sm overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
              : "hidden"
          } lg:sticky lg:inset-auto lg:top-24 lg:z-0 lg:block lg:w-auto lg:max-w-none lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:p-4 lg:shadow-none lg:dark:border-gray-800 lg:dark:bg-gray-900`}
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
              selectedChapter={sel.chapterFile ?? null}
              onSelectBatch={selectBatch}
              onSelectChapter={selectChapter}
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

        {/* CENTER (workspace) */}
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
              currentChapter ? (
                <SourceChapterView
                  batch={currentBatch}
                  chapter={currentChapter}
                  seed={seed}
                  onPickCitation={pickCitation}
                  onPickParagraph={pickCitation}
                />
              ) : (
                <BatchOverview
                  batch={currentBatch}
                  seed={seed}
                  onSelectChapter={(file) =>
                    selectChapter(currentBatch.id, file)
                  }
                />
              )
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

        {/* RIGHT PANE
            Slides in from the right at all breakpoints; below the floating
            top nav (top-24 ≈ 6rem). On mobile/tablet, ~2/3 width so the left
            edge of the workspace stays visible. On xl+, a fixed wider sheet. */}
        {hasRightContent(sel) && rightOpen && (
          <aside className="fixed right-0 top-24 bottom-0 z-30 w-[calc(100%-3rem)] max-w-3xl overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:w-2/3 xl:w-[40rem]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
                Detail
              </h2>
              <button
                onClick={closeRight}
                className="flex items-center gap-1.5 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-300"
              >
                <IconX className="h-3.5 w-3.5" />
                Hide
              </button>
            </div>
            {sel.mode === "dimension" && currentDimension && (
              <DimensionDoc dimensionId={currentDimension.id} />
            )}
            {sel.mode === "regulatory" &&
              currentBatch &&
              currentChapter &&
              sel.citation && (
                <ParagraphDetail
                  batch={currentBatch}
                  chapter={currentChapter}
                  citation={sel.citation}
                  seed={seed}
                  onJumpToDimension={(id) => {
                    setSel({ mode: "dimension", dimensionId: id });
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
                }}
                onSelectNode={(id) =>
                  setSel({ mode: "semantics", semanticsNodeId: id })
                }
              />
            )}
          </aside>
        )}

        {/* Floating "Show detail" handle. Always visible when there is
            something to show; positioned at the right edge below the nav so
            it can't be confused with the floating top bar. */}
        {hasRightContent(sel) && !rightOpen && (
          <button
            onClick={() => setRightOpen(true)}
            className="fixed right-0 top-32 z-30 flex items-center gap-2 rounded-l-full border-2 border-r-0 border-brand-primary bg-brand-primary px-3 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-primary/90"
            aria-label="Show detail panel"
          >
            <IconLayoutSidebarRightExpand className="h-4 w-4" />
            Detail
          </button>
        )}
      </div>
    </div>
  );
}
