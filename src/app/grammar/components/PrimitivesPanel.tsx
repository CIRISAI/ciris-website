// Server component — renders the 1+4 structural primitives panel.

import { PRIMITIVES } from "../lib/content";
import { REGISTRY_BLOB, CEG_CHAPTER } from "../lib/shared";

export default function PrimitivesPanel() {
  const fsdLink = `${REGISTRY_BLOB}/${CEG_CHAPTER.primitives}`;
  return (
    <section id="primitives" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          One workhorse + four structural composers
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          The entire wire format is one scalar attestation primitive plus four
          structural composers. Everything else is open vocabulary on top.
          This is the most load-bearing fact about CEG.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {PRIMITIVES.map((p, i) => (
          <article
            key={p.name}
            className={`rounded-2xl border bg-white p-5 shadow-sm dark:bg-gray-900 ${
              i === 0
                ? "border-brand-primary lg:col-span-2"
                : "border-slate-200 dark:border-gray-800"
            }`}
          >
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-mono text-lg font-bold text-brand-primary">
                {p.name}
              </h3>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  i === 0
                    ? "bg-brand-primary text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-slate-300"
                }`}
              >
                {i === 0 ? "Workhorse" : `Composer ${i}/4`}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
              {p.oneLiner}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
              <strong>When to use:</strong> {p.whenToUse}
            </p>
            <details className="mt-3 rounded-md border border-slate-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900/40">
              <summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-brand-primary dark:text-slate-300">
                Show wire shape
              </summary>
              <pre className="overflow-x-auto px-3 pb-3 pt-1 text-[11px] leading-5 text-slate-800 dark:text-slate-200">
                {p.exampleYaml}
              </pre>
            </details>
            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              <a
                href={`${fsdLink}${p.fsdAnchor}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                {p.fsdLabel} →
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
