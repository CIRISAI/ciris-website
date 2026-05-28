// Server component — five families with analogies + counts per family.

import type { FamilyId, RegistrySource } from "../lib/shared";
import {
  FAMILY_LABEL,
  FAMILY_ONE_LINER,
  FAMILY_ANALOGY,
  FAMILY_COLOR,
  ANCHORS,
} from "../lib/shared";

const ORDER: FamilyId[] = [
  "STANDING",
  "ACTION",
  "DETECTION",
  "CONSENSUS",
  "CORRECTION",
];

function countByFamily(source: RegistrySource): Record<FamilyId, number> {
  const out: Record<FamilyId, number> = {
    STANDING: 0,
    ACTION: 0,
    DETECTION: 0,
    CONSENSUS: 0,
    CORRECTION: 0,
  };
  for (const ns of source.namespace) {
    for (const sub of ns.subsections) {
      const f = sub.family;
      if (f) out[f] += sub.rows.length;
    }
  }
  return out;
}

export default function FamiliesPanel({
  source,
}: {
  source: RegistrySource;
}) {
  const counts = countByFamily(source);
  return (
    <section id="families" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Five families organize the ~{source.totalPrefixes} prefix families
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Every claim in the federation sits in one of five families. The
          analogy on each card is load-bearing pedagogy — read it before
          touching a prefix.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ORDER.map((f) => (
          <article
            key={f}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ background: FAMILY_COLOR[f] }}
              />
              <h3 className="text-base font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                {FAMILY_LABEL[f]}
              </h3>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                {counts[f]} prefixes
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
              {FAMILY_ONE_LINER[f]}
            </p>
            <p className="mt-2 text-xs italic leading-5 text-slate-600 dark:text-slate-400">
              {FAMILY_ANALOGY[f]}
            </p>
            <p className="mt-3 text-[11px]">
              <a
                href={`#${ANCHORS.namespace}`}
                className="text-brand-primary hover:underline"
              >
                Jump to {FAMILY_LABEL[f]} prefixes ↓
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
