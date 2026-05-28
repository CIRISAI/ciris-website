import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import {
  getSeed,
  RESPONSE_BLOB,
  AGENT_BLOB,
  type Dimension,
  type AccordPrinciple,
} from "./lib/seed";

const ACCORD_LABEL: Record<AccordPrinciple, string> = {
  beneficence: "Beneficence",
  non_maleficence: "Non-maleficence",
  integrity: "Integrity",
  fidelity: "Fidelity",
  autonomy: "Autonomy",
  justice: "Justice",
};

function attestationCells(d: Dimension) {
  const a = d.attestations;
  return [
    { short: "MH", count: a.MH ?? 0 },
    { short: "EU", count: a.EU ?? 0 },
    { short: "IEEE", count: a.IEEE ?? 0 },
    { short: "ASEAN", count: a.ASEAN ?? 0 },
  ];
}

function DimensionCard({ d }: { d: Dimension }) {
  const cells = attestationCells(d);
  return (
    <Link
      href={`/compliance/${d.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-primary hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-sm font-bold text-brand-primary">
            {d.id}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              d.tier === "STRONG-4"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            }`}
          >
            {d.tier}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {ACCORD_LABEL[d.accord_principle]}
        </span>
      </div>
      <p className="font-mono text-sm font-semibold text-slate-900 group-hover:text-brand-primary dark:text-white">
        {d.prefix}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {d.gloss}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
        {cells.map((c) => (
          <span
            key={c.short}
            className={`rounded px-1.5 py-0.5 ${
              c.count === 0
                ? "bg-slate-100 text-slate-400 dark:bg-gray-800 dark:text-slate-500"
                : "bg-slate-100 dark:bg-gray-800"
            }`}
            title={`${c.short}: ${c.count} attestations`}
          >
            {c.short} {c.count}
          </span>
        ))}
        <span className="rounded bg-brand-primary/10 px-1.5 py-0.5 font-semibold text-brand-primary">
          Σ {d.attestations.total}
        </span>
      </div>
    </Link>
  );
}

export default async function CompliancePage() {
  const seed = await getSeed();
  const strong4 = seed.dimensions.filter((d) => d.tier === "STRONG-4");
  const strong3 = seed.dimensions.filter((d) => d.tier === "STRONG-3");

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-36">
          {/* Hero */}
          <section className="mb-10">
            <div className="mb-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Seed v{seed.metadata.seed_version} · {seed.metadata.seed_date}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {seed.metadata.totals.dimensions} dimensions
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {seed.metadata.totals.total_attestations} attestations across{" "}
                {seed.metadata.totals.batches_in_corpus} batches
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Compliance
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Three layers. The compliance standards (four governance
              frameworks). The CIRIS translation (27 structural dimensions).
              The controls (the implementation surface inside CIRISAgent).
              Pick a dimension below to walk all three.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
              All content is fetched from{" "}
              <a
                href={RESPONSE_BLOB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                ciris-response-magnifica-humanitas
              </a>{" "}
              and{" "}
              <a
                href={`${AGENT_BLOB}/compliance`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAgent/compliance
              </a>
              . Nothing is duplicated here. The GitHub repos are the source of
              truth.
            </p>
          </section>

          {/* Three-layer explanation */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              How the three layers fit
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    1
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Compliance standards
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  The four source frameworks: Magnifica Humanitas (Catholic),
                  EU HLEG (European Union), IEEE Ethically Aligned Design
                  (technical society), ASEAN AI Governance Guide (multilateral
                  political). Each dimension cites the exact citation, the
                  ≤2-sentence anchor, and the wire-form.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    2
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    CIRIS translation
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  The 27 structural-evidence dimensions — D01 through D27,
                  stable IDs forever. Each is a wire-format prefix family with
                  an Accord principle, a tier (STRONG-4 attested by all four,
                  or STRONG-3 by three), convergence and conflict notes.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    3
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Controls
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  The implementation surface inside CIRISAgent — code
                  references, observability hooks, known gaps. One markdown
                  doc per dimension at{" "}
                  <code>CIRISAgent/compliance/D##_*.md</code>, with an
                  auto-rendered top half (from the seed) and a human-authored
                  bottom half (from the maintainers).
                </p>
              </div>
            </div>
          </section>

          {/* Calibration discipline callout */}
          <section className="mb-10 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Calibration discipline
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <p>
                Convergent attestation across four governance frameworks is
                structural evidence, not propositional agreement. The four
                sources are not commenting on CIRIS. CIRIS was mapped onto
                them. A Phase 4 translation-quality audit found five
                systematic translation losses; every dimension page surfaces
                its convergence note, conflicts, absent batches, and any
                softness erosion alongside the wire-form attestations.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Read the full audit:{" "}
                <a
                  href={`${RESPONSE_BLOB}/TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md
                </a>
                . T-3 candidates listed on dimension pages are workshop
                proposals filed at{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISRegistry/issues/20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  CIRISRegistry#20
                </a>
                , not adopted.
              </p>
            </div>
          </section>

          {/* STRONG-4 dimensions */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                STRONG-4 dimensions ({strong4.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attested by all four batches
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {strong4.map((d) => (
                <DimensionCard key={d.id} d={d} />
              ))}
            </div>
          </section>

          {/* STRONG-3 dimensions */}
          <section className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                STRONG-3 dimensions ({strong3.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attested by three of four batches; the absent one carries a
                reason
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {strong3.map((d) => (
                <DimensionCard key={d.id} d={d} />
              ))}
            </div>
          </section>

          {/* Reference links */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              How the mapping is specified
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href={`${RESPONSE_BLOB}/SEED_DIMENSIONS.yaml`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                SEED_DIMENSIONS.yaml →
              </a>
              <a
                href={`${RESPONSE_BLOB}/WEBSITE_INTEGRATION.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                WEBSITE_INTEGRATION.md →
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
                href={`${RESPONSE_BLOB}/ANNEX_K.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Accord Annex K (principle → dimension traversal) →
              </a>
              <a
                href={`${AGENT_BLOB}/compliance/README.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                CIRISAgent/compliance README →
              </a>
              <a
                href={`${AGENT_BLOB}/compliance/MEASUREMENT_METHODOLOGY.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Measurement methodology →
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
