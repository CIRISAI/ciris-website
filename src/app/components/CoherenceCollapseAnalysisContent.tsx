// Shared coherence-collapse-analysis body, driven by a per-locale dictionary.
// Both the English root (src/app/coherence-collapse-analysis/page.tsx) and the
// localized routes (src/app/[locale]/coherence-collapse-analysis/page.tsx)
// render this with their own dictionary — one content component, two thin entry
// points, no duplicated markup.
//
// Strings that carry typographic emphasis (<strong>, <a>) are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.
//
// Math notation and the formula display string stay literal; only surrounding
// prose is translated.

"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

/** Shape of the coherenceCollapseAnalysis namespace (mirrors _src/coherenceCollapseAnalysis.json). */
interface CoherenceCollapseAnalysisNS {
  badge1: string;
  badge2: string;
  eyebrow: string;
  h1: string;
  heroPara: string;
  ctaPaper: string;
  ctaProofs: string;
  ideaEyebrow: string;
  ideaH2: string;
  ideaPara1: string;
  ideaPara2: string;
  formulaEyebrow: string;
  formulaH2: string;
  formulaPara1: string;
  formulaDisplay: string;
  formulaPara2: string;
  formulaLi1: string;
  formulaLi2: string;
  corridorEyebrow: string;
  corridorH2: string;
  corridorPara1: string;
  corridorPara2: string;
  measuredEyebrow: string;
  measuredH2: string;
  measuredPara: string;
  ceilingEyebrow: string;
  ceilingH2: string;
  ceilingPara1: string;
  ceilingPara2: string;
  closingEyebrow: string;
  closingH2: string;
  closingPara: string;
  closingCta1: string;
  closingCta2: string;
  closingCta3: string;
}

/** Extended dictionary that includes the coherenceCollapseAnalysis namespace. */
type DictionaryWithCCA = Dictionary & {
  coherenceCollapseAnalysis: CoherenceCollapseAnalysisNS;
};

export default function CoherenceCollapseAnalysisContent({
  t,
}: {
  t: Dictionary;
}) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;

  const c = (t as DictionaryWithCCA).coherenceCollapseAnalysis;

  return (
    <>
      <FloatingNav navItems={navItems} locale={locale} />
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {c.badge1}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {c.badge2}
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {c.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {c.heroPara}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {c.ctaPaper}
              </a>
              <a
                href="https://github.com/CIRISAI/RATCHET"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {c.ctaProofs}
              </a>
            </div>
          </section>

          {/* The idea */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.ideaEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.ideaH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.ideaPara1}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.ideaPara2}
            </p>
          </section>

          {/* The one formula */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.formulaEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.formulaH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.formulaPara1}
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center font-mono text-lg dark:border-gray-800 dark:bg-gray-950 dark:text-slate-100">
              {c.formulaDisplay}
            </div>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.formulaPara2}
            </p>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li dangerouslySetInnerHTML={h(c.formulaLi1)} />
              <li dangerouslySetInnerHTML={h(c.formulaLi2)} />
            </ul>
          </section>

          {/* The corridor */}
          <section className="mb-12 rounded-3xl border-l-4 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.corridorEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.corridorH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.corridorPara1}
            </p>
            <p
              className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(c.corridorPara2)}
            />
          </section>

          {/* What we measured */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.measuredEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.measuredH2}
            </h2>
            <p
              className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(c.measuredPara)}
            />
          </section>

          {/* The honest ceiling */}
          <section className="mb-12 rounded-3xl border-l-4 border-amber-400 bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {c.ceilingEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.ceilingH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.ceilingPara1}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.ceilingPara2}
            </p>
          </section>

          {/* Closing */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {c.closingEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {c.closingH2}
            </h2>
            <p
              className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(c.closingPara)}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/coherence-ratchet"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {c.closingCta1}
              </a>
              <a
                href="/research-status"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {c.closingCta2}
              </a>
              <a
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {c.closingCta3}
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
