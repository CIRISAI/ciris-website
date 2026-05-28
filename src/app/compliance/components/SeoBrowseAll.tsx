// Server component — emits a fully cross-linked browse surface for search
// engines and users without JS. Renders into the static HTML on every
// /compliance and /compliance/[id] page.

import Link from "next/link";
import {
  CHAPTERS_BY_BATCH,
  RESPONSE_BLOB,
  AGENT_BLOB,
  complianceDocPath,
  type Seed,
  type AccordPrinciple,
  type Dimension,
  type BatchId,
} from "../lib/shared";

const ACCORD_LABEL: Record<AccordPrinciple, string> = {
  beneficence: "Beneficence",
  non_maleficence: "Non-maleficence",
  integrity: "Integrity",
  fidelity: "Fidelity",
  autonomy: "Autonomy",
  justice: "Justice",
};

function chapterQueryHref(batch: BatchId, chapter: string): string {
  const p = new URLSearchParams({
    mode: "regulatory",
    batch,
    chapter,
  });
  return `/compliance?${p.toString()}`;
}

function batchQueryHref(batch: BatchId): string {
  const p = new URLSearchParams({ mode: "regulatory", batch });
  return `/compliance?${p.toString()}`;
}

function DimensionLink({ d }: { d: Dimension }) {
  return (
    <Link
      href={`/compliance/${d.id}`}
      className="block rounded-md border border-slate-200 bg-white p-3 transition hover:border-brand-primary hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
      title={d.gloss}
    >
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            d.tier === "STRONG-4"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          }`}
        >
          {d.tier}
        </span>
        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 dark:bg-gray-800 dark:text-slate-300">
          {ACCORD_LABEL[d.accord_principle]}
        </span>
      </div>
      <p className="break-all font-mono text-sm font-semibold text-brand-primary">
        {d.prefix}
      </p>
      <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
        {d.gloss}
      </p>
    </Link>
  );
}

export default function SeoBrowseAll({ seed }: { seed: Seed }) {
  // Group dimensions by Accord principle
  const byPrinciple: { principle: AccordPrinciple; dims: Dimension[] }[] = (
    [
      "beneficence",
      "non_maleficence",
      "integrity",
      "fidelity",
      "autonomy",
      "justice",
    ] as AccordPrinciple[]
  ).map((p) => ({
    principle: p,
    dims: seed.dimensions.filter((d) => d.accord_principle === p),
  }));

  return (
    <section
      id="browse-all"
      className="mt-10 space-y-10 border-t border-slate-200 pt-10 dark:border-gray-800"
    >
      <header>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Browse the full surface
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Every dimension, every regulatory work and chapter, every
          cross-source conflict, every v1.5+ proposal — fully linked. Use
          this as a sitemap if you prefer to read without the interactive
          workspace.
        </p>
      </header>

      {/* All dimensions, grouped by Accord principle */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          27 CIRIS dimensions, by Accord principle
        </h3>
        <div className="space-y-6">
          {byPrinciple.map(({ principle, dims }) => (
            <div key={principle}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                {ACCORD_LABEL[principle]} ({dims.length})
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dims.map((d) => (
                  <DimensionLink key={d.id} d={d} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All batches + chapters */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          Four regulatory works, by chapter
        </h3>
        <div className="space-y-5">
          {seed.batches.map((b) => {
            const chapters = CHAPTERS_BY_BATCH[b.id] ?? [];
            const dimsAttested = seed.dimensions.filter((d) =>
              d.regulatory_attestations.some((a) => a.batch_id === b.id),
            );
            return (
              <div
                key={b.id}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-2 flex flex-wrap items-baseline gap-2">
                  <Link
                    href={batchQueryHref(b.id)}
                    className="font-mono text-base font-bold text-brand-primary hover:underline"
                  >
                    {b.short}
                  </Link>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {b.title}
                  </h4>
                </div>
                <p className="mb-3 text-xs text-slate-600 dark:text-slate-300">
                  {b.authority} · {b.publication_date} ·{" "}
                  {b.atomic_units_mapped} atomic units mapped ·{" "}
                  {dimsAttested.length} CIRIS dimensions attested
                </p>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Chapters
                </p>
                <ul className="mb-3 grid gap-1 text-sm sm:grid-cols-2">
                  {chapters.map((ch) => (
                    <li key={ch.file}>
                      <Link
                        href={chapterQueryHref(b.id, ch.file)}
                        className="text-brand-primary hover:underline"
                      >
                        {ch.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Dimensions attested
                </p>
                <ul className="flex flex-wrap gap-1.5 text-xs">
                  {dimsAttested.map((d) => (
                    <li key={d.id}>
                      <Link
                        href={`/compliance/${d.id}`}
                        className="break-all rounded-md border border-slate-300 px-1.5 py-0.5 font-mono text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                        title={d.gloss}
                      >
                        {d.prefix}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross-source conflicts */}
      {seed.aggregate_indices.conflicts_surfaced.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Cross-source conflicts (
            {seed.aggregate_indices.conflicts_surfaced.length})
          </h3>
          <ul className="space-y-3">
            {seed.aggregate_indices.conflicts_surfaced.map((c) => {
              const dims = c.dimensions
                .map((id) => seed.dimensions.find((d) => d.id === id))
                .filter((d): d is Dimension => Boolean(d));
              return (
                <li
                  key={c.id}
                  className="rounded-lg border-l-4 border-red-400 bg-white p-3 dark:bg-gray-900"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-red-700 dark:text-red-300">
                      {c.id}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-gray-800 dark:text-slate-300">
                      {c.type}
                    </span>
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      {c.severity}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {c.claim}
                  </p>
                  {c.disposition && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      <strong>Disposition:</strong> {c.disposition}
                    </p>
                  )}
                  {dims.length > 0 && (
                    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">
                        Affects:
                      </span>
                      {dims.map((d) => (
                        <Link
                          key={d.id}
                          href={`/compliance/${d.id}`}
                          className="break-all rounded-md border border-slate-300 px-1.5 py-0.5 font-mono text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                          title={d.gloss}
                        >
                          {d.prefix}
                        </Link>
                      ))}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* T-3 candidates */}
      {seed.aggregate_indices.t3_candidates_v1_5.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
            v1.5+ wire-format proposals (
            {seed.aggregate_indices.t3_candidates_v1_5.length})
          </h3>
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
            Workshop proposals at{" "}
            <a
              href="https://github.com/CIRISAI/CIRISRegistry/issues/20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              CIRISRegistry#20
            </a>
            . Not adopted.
          </p>
          <ul className="grid gap-2 md:grid-cols-2">
            {seed.aggregate_indices.t3_candidates_v1_5.map((t) => {
              const affects = t.affects_dimension
                ? seed.dimensions.find((d) => d.id === t.affects_dimension)
                : null;
              return (
                <li
                  key={t.id}
                  className="rounded-lg border-l-4 border-amber-400 bg-white p-3 dark:bg-gray-900"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                      {t.id}
                    </span>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      {t.priority}
                    </span>
                  </div>
                  <p className="break-all font-mono text-sm text-slate-800 dark:text-slate-200">
                    {t.proposed_prefix}
                  </p>
                  {affects && (
                    <p className="mt-1 text-[11px]">
                      Affects:{" "}
                      <Link
                        href={`/compliance/${affects.id}`}
                        className="break-all font-mono text-brand-primary hover:underline"
                        title={affects.gloss}
                      >
                        {affects.prefix}
                      </Link>
                    </p>
                  )}
                  {t.resolution_preferred && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      <strong>Preferred resolution:</strong>{" "}
                      {t.resolution_preferred}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Reference docs */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          Reference documents
        </h3>
        <div className="grid gap-2 text-sm md:grid-cols-2">
          <a
            href={`${RESPONSE_BLOB}/SEED_DIMENSIONS.yaml`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            SEED_DIMENSIONS.yaml →
          </a>
          <a
            href={`${RESPONSE_BLOB}/WEBSITE_INTEGRATION.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            WEBSITE_INTEGRATION.md →
          </a>
          <a
            href={`${RESPONSE_BLOB}/FOUR_BATCH_OVERLAP_ANALYSIS.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Four-batch overlap analysis →
          </a>
          <a
            href={`${RESPONSE_BLOB}/ANNEX_K.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Accord Annex K (principle → dimension) →
          </a>
          <a
            href={`${RESPONSE_BLOB}/TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Translation quality audit →
          </a>
          <a
            href={`${RESPONSE_BLOB}/DIMENSIONS_GUIDE.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Dimensions guide →
          </a>
          <a
            href={`${AGENT_BLOB}/compliance/README.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            CIRISAgent/compliance README →
          </a>
          <a
            href={`${AGENT_BLOB}/compliance/MEASUREMENT_METHODOLOGY.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Measurement methodology →
          </a>
        </div>
      </section>
    </section>
  );
}

// Server-rendered detail body for /compliance/[id]. Inlined into the page
// HTML alongside the workspace so search engines see the full content.
export function SeoDimensionDetail({
  seed,
  dimension,
}: {
  seed: Seed;
  dimension: Dimension;
}) {
  const batchById = new Map(seed.batches.map((b) => [b.id, b]));
  const siblings = (
    seed.aggregate_indices.by_accord_principle[dimension.accord_principle] ?? []
  )
    .map((id) => seed.dimensions.find((d) => d.id === id))
    .filter((d): d is Dimension => Boolean(d) && d?.id !== dimension.id);
  const conflicts = seed.aggregate_indices.conflicts_surfaced.filter((c) =>
    c.dimensions.includes(dimension.id),
  );
  const t3s = seed.aggregate_indices.t3_candidates_v1_5.filter(
    (t) => t.affects_dimension === dimension.id,
  );
  const controlPath = complianceDocPath(dimension.id);

  return (
    <section
      id="dimension-detail"
      className="mt-10 space-y-8 border-t border-slate-200 pt-10 dark:border-gray-800"
    >
      <header>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          About this dimension
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Server-rendered summary, fully cross-linked. The interactive
          workspace above lets you browse; the content here is permanent.
        </p>
      </header>

      {/* Regulatory attestations */}
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          Compliance standards
        </h3>
        <div className="grid gap-3">
          {dimension.regulatory_attestations.map((a) => {
            const batch = batchById.get(a.batch_id);
            return (
              <div
                key={a.batch_id}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={batchQueryHref(a.batch_id)}
                    className="rounded-md bg-brand-primary/10 px-1.5 py-0.5 font-mono text-xs font-bold text-brand-primary hover:bg-brand-primary/20"
                  >
                    {batch?.short ?? a.batch_id}
                  </Link>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {a.citation}
                  </span>
                </div>
                {batch && (
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {batch.title} · {batch.authority} ·{" "}
                    {batch.publication_date}
                  </p>
                )}
                <blockquote className="mt-2 border-l-4 border-brand-primary/30 pl-3 text-sm italic leading-6 text-slate-700 dark:text-slate-300">
                  &ldquo;{a.language}&rdquo;
                </blockquote>
                <p className="mt-2 break-all rounded bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
                  {a.wire_form}
                </p>
              </div>
            );
          })}
          {(dimension.absent_batch ?? []).map((a) => {
            const batch = batchById.get(a.batch_id);
            return (
              <div
                key={a.batch_id}
                className="rounded-lg border border-dashed border-amber-300 bg-amber-50/40 p-3 dark:border-amber-700/40 dark:bg-amber-950/20"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                  Absent from {batch?.short ?? a.batch_id}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {a.absence_note}
                </p>
                {a.functional_analogue && (
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    <strong>Functional analogue:</strong>{" "}
                    {a.functional_analogue}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CIRIS translation */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          CIRIS translation
        </h3>
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Wire primitives
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {dimension.wire_primitives.map((wp) => (
              <code
                key={wp}
                className="break-all rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-800 dark:bg-gray-800 dark:text-slate-200"
              >
                {wp}
              </code>
            ))}
          </div>
        </div>
        {dimension.convergence_note && (
          <div className="rounded-lg border-l-4 border-brand-primary bg-brand-primary/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
              Convergence
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {dimension.convergence_note}
            </p>
          </div>
        )}
        {conflicts.length > 0 && (
          <div className="rounded-lg border-l-4 border-red-400 bg-red-50/40 p-3 dark:bg-red-950/20">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
              Cross-source conflicts
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              {conflicts.map((c) => (
                <li key={c.id} className="leading-6">
                  <strong className="font-mono text-red-700 dark:text-red-300">
                    {c.id}
                  </strong>{" "}
                  <span className="text-[11px] uppercase text-slate-600 dark:text-slate-400">
                    {c.severity}
                  </span>
                  : {c.claim}
                  {c.disposition && (
                    <span className="mt-0.5 block text-xs text-slate-600 dark:text-slate-400">
                      {c.disposition}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {t3s.length > 0 && (
          <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/40 p-3 dark:bg-amber-950/20">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
              v1.5+ proposals
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {t3s.map((t) => (
                <li key={t.id} className="leading-6">
                  <strong className="font-mono text-amber-700 dark:text-amber-300">
                    {t.id}
                  </strong>{" "}
                  <span className="text-[11px] uppercase text-slate-600 dark:text-slate-400">
                    {t.priority}
                  </span>{" "}
                  ·{" "}
                  <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800 dark:bg-gray-800 dark:text-slate-200">
                    {t.proposed_prefix}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CIRIS control */}
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
          CIRIS control
        </h3>
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            CIRIS implementation is maintained at{" "}
            <a
              href={`${AGENT_BLOB}/${controlPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-mono text-brand-primary hover:underline"
            >
              {controlPath}
            </a>{" "}
            in the CIRISAgent repo. Open the workspace above to view the
            primary content inline.
          </p>
        </div>
      </div>

      {/* Sibling dimensions */}
      {siblings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Other dimensions under {ACCORD_LABEL[dimension.accord_principle]}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sd) => (
              <DimensionLink key={sd.id} d={sd} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
