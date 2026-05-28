import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import ResourceRow from "../ResourceRow";
import {
  getSeed,
  getDimension,
  complianceDocPath,
  RESPONSE_BLOB,
  AGENT_BLOB,
  type AccordPrinciple,
  type BatchId,
  type Dimension,
  type Seed,
} from "../lib/seed";

export const dynamicParams = false;

export async function generateStaticParams() {
  const seed = await getSeed();
  return seed.dimensions.map((d) => ({ id: d.id }));
}

const ACCORD_LABEL: Record<AccordPrinciple, string> = {
  beneficence: "Beneficence",
  non_maleficence: "Non-maleficence",
  integrity: "Integrity",
  fidelity: "Fidelity",
  autonomy: "Autonomy",
  justice: "Justice",
};

const BATCH_ORDER: BatchId[] = [
  "magnifica_humanitas_v1",
  "eu_hleg_v1",
  "ieee_ead_v1",
  "asean_guide_v1",
];

const SEVERITY_STYLE: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  MEDIUM: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  LOW_MEDIUM:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const PRIORITY_STYLE: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  MEDIUM_HIGH:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  MEDIUM: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  MEDIUM_LOW:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

function attestationTotal(d: Dimension) {
  return d.attestations.total;
}

function AttestationBar({ d }: { d: Dimension }) {
  const cells: { short: string; count: number }[] = [
    { short: "MH", count: d.attestations.MH ?? 0 },
    { short: "EU", count: d.attestations.EU ?? 0 },
    { short: "IEEE", count: d.attestations.IEEE ?? 0 },
    { short: "ASEAN", count: d.attestations.ASEAN ?? 0 },
  ];
  const max = Math.max(...cells.map((c) => c.count), 1);
  return (
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
          {attestationTotal(d)}
        </span>
      </div>
    </div>
  );
}

function SourceCard({
  batchShort,
  batchTitle,
  batchAuthority,
  batchDate,
  attestation,
  count,
}: {
  batchShort: string;
  batchTitle: string;
  batchAuthority: string;
  batchDate: string;
  attestation: { citation: string; language: string; wire_form: string };
  count: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-xs font-bold text-brand-primary">
              {batchShort}
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {attestation.citation}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
            {batchTitle}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {batchAuthority} · {batchDate}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:bg-gray-800 dark:text-slate-300">
          {count} attestations
        </span>
      </div>
      <blockquote className="mt-3 border-l-4 border-brand-primary/40 pl-3 text-sm italic leading-6 text-slate-700 dark:text-slate-300">
        &ldquo;{attestation.language}&rdquo;
      </blockquote>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Wire form
      </p>
      <p className="mt-0.5 break-all rounded bg-slate-50 px-2 py-1 font-mono text-xs text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
        {attestation.wire_form}
      </p>
    </div>
  );
}

function AbsentBatchCard({
  batchShort,
  batchTitle,
  absenceNote,
  functionalAnalogue,
}: {
  batchShort: string;
  batchTitle: string;
  absenceNote: string;
  functionalAnalogue?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50/40 p-4 dark:border-amber-700/40 dark:bg-amber-950/20">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
          {batchShort}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          absent from this batch
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        {batchTitle}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {absenceNote}
      </p>
      {functionalAnalogue && (
        <>
          <p className="mt-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Functional analogue
          </p>
          <p className="mt-0.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {functionalAnalogue}
          </p>
        </>
      )}
    </div>
  );
}

function findConflicts(seed: Seed, id: string) {
  return seed.aggregate_indices.conflicts_surfaced.filter((c) =>
    c.dimensions.includes(id),
  );
}

function findT3(seed: Seed, id: string) {
  return seed.aggregate_indices.t3_candidates_v1_5.filter(
    (t) => t.affects_dimension === id,
  );
}

function findAccordSiblings(seed: Seed, id: string, principle: AccordPrinciple) {
  return (seed.aggregate_indices.by_accord_principle[principle] ?? []).filter(
    (d) => d !== id,
  );
}

export default async function DimensionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seed = await getSeed();
  const d = await getDimension(id);
  if (!d) notFound();

  const conflicts = findConflicts(seed, id);
  const t3s = findT3(seed, id);
  const accordSiblings = findAccordSiblings(seed, id, d.accord_principle);
  const controlPath = complianceDocPath(id);
  const batchByShort = new Map(seed.batches.map((b) => [b.short, b]));
  const batchById = new Map(seed.batches.map((b) => [b.id, b]));
  const absent = d.absent_batch ?? [];

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">
          {/* Breadcrumb */}
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="/compliance"
              className="hover:text-brand-primary"
            >
              ← All 27 dimensions
            </Link>
          </p>

          {/* Hero */}
          <section className="mb-10">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-brand-primary/10 px-3 py-1 text-lg font-bold text-brand-primary">
                {d.id}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  d.tier === "STRONG-4"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                }`}
              >
                {d.tier}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                Accord principle:{" "}
                <strong>{ACCORD_LABEL[d.accord_principle]}</strong>
              </span>
            </div>
            <h1 className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {d.prefix}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
              {d.gloss}
            </p>
          </section>

          {/* Attestation density */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              Attestation density
            </p>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              How many distinct attestations each batch contributes. Density
              tracks each source&apos;s genre, not propositional weight.
            </p>
            <AttestationBar d={d} />
          </section>

          {/* ─────────────── LAYER 1: COMPLIANCE STANDARDS ─────────────── */}
          <section className="mb-12">
            <div className="mb-1 flex items-center gap-3">
              <span className="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Layer 1
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Compliance standards
              </h2>
            </div>
            <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
              The four governance frameworks that attest this dimension. Each
              card carries the citation, the ≤2-sentence anchor (fair use),
              and the wire-form CIRIS translates it into. For full source
              documents, follow the GitHub link to each batch&apos;s manifest;
              the authoritative URLs are there.
            </p>
            <div className="grid gap-4">
              {d.regulatory_attestations.map((a) => {
                const batch = batchById.get(a.batch_id);
                if (!batch) return null;
                const count =
                  (d.attestations[batch.short] as number | undefined) ?? 0;
                return (
                  <SourceCard
                    key={a.batch_id}
                    batchShort={batch.short}
                    batchTitle={batch.title}
                    batchAuthority={batch.authority}
                    batchDate={batch.publication_date}
                    attestation={a}
                    count={count}
                  />
                );
              })}
              {absent.map((a) => {
                const batch = batchById.get(a.batch_id);
                if (!batch) return null;
                return (
                  <AbsentBatchCard
                    key={a.batch_id}
                    batchShort={batch.short}
                    batchTitle={batch.title}
                    absenceNote={a.absence_note}
                    functionalAnalogue={a.functional_analogue}
                  />
                );
              })}
            </div>

            {/* Source paragraph file links */}
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              For the full wire-envelope context per source paragraph, see
              the per-batch CONTRIBUTION_OBJECTS files in{" "}
              <a
                href={RESPONSE_BLOB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                ciris-response-magnifica-humanitas
              </a>
              . Authoritative source URLs live in each batch&apos;s
              <code> source_material/governance/{"{batch_id}"}/manifest.yaml</code>.
            </p>
          </section>

          {/* ─────────────── LAYER 2: CIRIS TRANSLATION ─────────────── */}
          <section className="mb-12">
            <div className="mb-1 flex items-center gap-3">
              <span className="rounded-md bg-purple-100 px-2.5 py-1 text-sm font-bold text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Layer 2
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                CIRIS translation
              </h2>
            </div>
            <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
              The structural-evidence dimension. Wire-format prefixes, Accord
              alignment, convergence and conflict notes from the
              four-batch overlap analysis.
            </p>

            {/* Wire primitives */}
            <div className="mb-5 rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Wire primitives
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {d.wire_primitives.map((wp) => (
                  <code
                    key={wp}
                    className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-800 dark:bg-gray-800 dark:text-slate-200"
                  >
                    {wp}
                  </code>
                ))}
              </div>
            </div>

            {/* Accord principle */}
            <div className="mb-5 rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Accord principle
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                Operationalises <strong>{ACCORD_LABEL[d.accord_principle]}</strong>{" "}
                in the six-principle Accord. Other dimensions under the same
                principle:{" "}
                {accordSiblings.length === 0 ? (
                  <span className="text-slate-500 dark:text-slate-400">
                    none — this is the sole dimension under this principle
                  </span>
                ) : (
                  accordSiblings.map((sid, i) => (
                    <span key={sid}>
                      <Link
                        href={`/compliance/${sid}`}
                        className="font-mono text-brand-primary hover:underline"
                      >
                        {sid}
                      </Link>
                      {i < accordSiblings.length - 1 ? ", " : ""}
                    </span>
                  ))
                )}
                .
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                The full principle → dimension traversal is rendered in{" "}
                <a
                  href={`${RESPONSE_BLOB}/ANNEX_K.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  Accord Annex K
                </a>
                .
              </p>
            </div>

            {/* Convergence note */}
            {d.convergence_note && (
              <div className="mb-5 rounded-lg border-l-4 border-brand-primary bg-brand-primary/5 p-4 dark:bg-brand-primary/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                  Convergence note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {d.convergence_note}
                </p>
              </div>
            )}

            {/* Conflicts */}
            {conflicts.length > 0 && (
              <div className="mb-5 rounded-lg border-l-4 border-red-400 bg-red-50/40 p-4 dark:bg-red-950/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
                  Cross-source conflicts ({conflicts.length})
                </p>
                <div className="mt-3 space-y-3">
                  {conflicts.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-md border border-red-200 bg-white p-3 dark:border-red-800/40 dark:bg-gray-900"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-red-700 dark:text-red-300">
                          {c.id}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-gray-800 dark:text-slate-300">
                          {c.type}
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
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {c.claim}
                      </p>
                      {c.disposition && (
                        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                          <strong>Disposition:</strong> {c.disposition}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* T-3 candidates */}
            {t3s.length > 0 && (
              <div className="mb-5 rounded-lg border-l-4 border-amber-400 bg-amber-50/40 p-4 dark:bg-amber-950/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                  v1.5+ proposals affecting this dimension ({t3s.length})
                </p>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
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
                <div className="mt-3 space-y-3">
                  {t3s.map((t) => (
                    <div
                      key={t.id}
                      className="rounded-md border border-amber-200 bg-white p-3 dark:border-amber-800/40 dark:bg-gray-900"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                          {t.id}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            PRIORITY_STYLE[t.priority] ??
                            "bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-slate-300"
                          }`}
                        >
                          {t.priority}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          from{" "}
                          {t.source
                            .map((s) => batchByShort.get(s as never) ?? null)
                            .map((b, i) => (
                              <span key={i}>
                                {b ? b.short : t.source[i]}
                                {i < t.source.length - 1 ? ", " : ""}
                              </span>
                            ))}
                        </span>
                      </div>
                      <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
                        {t.proposed_prefix}
                      </p>
                      {t.resolution_preferred && (
                        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                          <strong>Preferred resolution:</strong>{" "}
                          {t.resolution_preferred}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              All of the above is rendered from{" "}
              <a
                href={`${RESPONSE_BLOB}/SEED_DIMENSIONS.yaml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                SEED_DIMENSIONS.yaml
              </a>{" "}
              (seed v{seed.metadata.seed_version}, {seed.metadata.seed_date}).
              The Phase 4 audit explains what gets lost in translation:{" "}
              <a
                href={`${RESPONSE_BLOB}/TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md
              </a>
              .
            </p>
          </section>

          {/* ─────────────── LAYER 3: CONTROLS ─────────────── */}
          <section className="mb-12">
            <div className="mb-1 flex items-center gap-3">
              <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm font-bold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                Layer 3
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Controls
              </h2>
            </div>
            <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
              The implementation surface inside CIRISAgent. The doc below has
              an auto-rendered top (regulatory attestations, regenerated from
              the seed) and a human-authored bottom (code references,
              observability hooks, known gaps) maintained by the CIRISAgent
              team.{" "}
              {d.ciris_compliance?.proposed_pointer && (
                <>
                  Proposed pointer from seed:{" "}
                  <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800 dark:bg-gray-800 dark:text-slate-200">
                    {d.ciris_compliance.proposed_pointer}
                  </code>
                  .
                </>
              )}
            </p>
            <ResourceRow
              label={`${d.id} compliance doc`}
              filePath={controlPath}
              dimensionId={d.id}
              resourceName={`${d.id} compliance doc`}
              kind="markdown"
              repo="agent"
              caption="Click View inline to expand the full markdown doc here, or use GitHub / Raw."
            />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <a
                href={`${AGENT_BLOB}/compliance/README.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                CIRISAgent/compliance README →
              </a>
              <a
                href={`${AGENT_BLOB}/compliance/MEASUREMENT_METHODOLOGY.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Measurement methodology →
              </a>
            </div>
          </section>

          {/* Footer nav */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              Keep walking the graph
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href="/compliance"
                className="rounded-md border-2 border-brand-primary px-3 py-1.5 font-semibold text-brand-primary hover:bg-brand-primary/10"
              >
                ← All 27 dimensions
              </Link>
              <a
                href={`${RESPONSE_BLOB}/SEED_DIMENSIONS.yaml`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Seed →
              </a>
              <a
                href={`${RESPONSE_BLOB}/FOUR_BATCH_OVERLAP_ANALYSIS.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Four-batch overlap analysis →
              </a>
              <a
                href={`${RESPONSE_BLOB}/DIMENSIONS_GUIDE.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Dimensions guide →
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
