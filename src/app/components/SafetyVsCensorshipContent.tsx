// Shared safety-vs-censorship page body, driven by a per-locale dictionary.
// Both the English root (src/app/safety-vs-censorship/page.tsx) and the
// localized routes (src/app/[locale]/safety-vs-censorship/page.tsx) render
// this with their own dictionary — one content component, two thin entry
// points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>, <strong>, HTML entities) are
// stored as HTML in the dictionary and injected with dangerouslySetInnerHTML.
// The content is authored and machine-translated by us (never user input), so
// this is safe; translators are instructed to preserve the tags.

"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function SafetyVsCensorshipContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;

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
          <section className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t.safetyVsCensorship.heroEyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {t.safetyVsCensorship.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t.safetyVsCensorship.heroPara}
            </p>
          </section>

          {/* The failure mode */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {t.safetyVsCensorship.failureModeHeading}
            </h2>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-4">
              {t.safetyVsCensorship.failureModeP1}
            </p>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              {t.safetyVsCensorship.failureModeP2}
            </p>
          </section>

          {/* The maxim */}
          <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.safetyVsCensorship.maximHeading}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={h(t.safetyVsCensorship.maximParaHtml)} />
          </section>

          {/* What this means in practice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {t.safetyVsCensorship.practiceHeading}
            </h2>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-4" dangerouslySetInnerHTML={h(t.safetyVsCensorship.practiceP1Html)} />
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={h(t.safetyVsCensorship.practiceP2Html)} />
          </section>

          {/* Where this can still fail */}
          <section className="mb-12 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.safetyVsCensorship.stillWrongHeading}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={h(t.safetyVsCensorship.stillWrongParaHtml)} />
          </section>

          {/* Closing */}
          <section>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-6">
              {t.safetyVsCensorship.closingPara}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/safety"
                className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t.safetyVsCensorship.ctaSafety}
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {t.safetyVsCensorship.ctaFederation}
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {t.safetyVsCensorship.ctaFsd}
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
