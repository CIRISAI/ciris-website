// Shared "Epistemic Web" concept hub, driven by a per-locale dictionary. The
// front door to the two realizations: CEG the language (/grammar) and CEWP the
// network (/cewp). Both the English root (src/app/epistemic-web/page.tsx) and
// the localized routes (src/app/[locale]/epistemic-web/page.tsx) render this.

"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import MeshReel from "@/app/components/mesh/MeshReel";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizedPath } from "@/i18n/config";

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

export default function EpistemicWebContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const e = t.epistemicWeb;
  const grammarHref = localizedPath("/grammar", locale);
  const cewpHref = localizedPath("/cewp", locale);

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
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-40 md:px-6 md:pt-44">
          {/* Hero — the concept */}
          <header className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              {e.eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {e.headline}
            </h1>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              {e.intro}
            </p>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              {e.p2}
            </p>
          </header>

          {/* The ALM story, animated — the live "Mesh, In Motion" reel */}
          <section className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              {e.reel.watchLabel}
            </p>
            <MeshReel t={e.reel} />
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {e.reel.caption}
            </p>
          </section>

          {/* The reframe: this is a complete internet replacement, not just AI */}
          <section className="mt-8 rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 p-5 dark:bg-brand-primary/10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {e.biggerTitle}
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-700 dark:text-slate-200">
              {e.biggerBody}
            </p>
          </section>

          {/* How CIRIS makes it real — the two realizations */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {e.howTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {e.howLede}
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {/* The language → /grammar */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  {e.grammarCardEyebrow}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {e.grammarCardTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {e.grammarCardBody}
                </p>
                <Link
                  href={grammarHref}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-secondary"
                >
                  {e.grammarCardCta}
                </Link>
              </div>

              {/* The network → /cewp */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  {e.cewpCardEyebrow}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {e.cewpCardTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {e.cewpCardBody}
                </p>
                <Link
                  href={cewpHref}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-secondary"
                >
                  {e.cewpCardCta}
                </Link>
              </div>
            </div>
          </section>

          {/* It's shipping — app CTA */}
          <section className="mt-10 rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 p-5 dark:bg-brand-primary/10">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {e.appTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {e.appBody}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span aria-hidden>📱</span>
                {e.ctaAppStore}
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-primary hover:bg-brand-primary hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-brand-primary"
              >
                <span aria-hidden>🤖</span>
                {e.ctaGooglePlay}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
