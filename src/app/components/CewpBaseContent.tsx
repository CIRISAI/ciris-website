// Shared CEWP landing body, driven by a per-locale dictionary. Both the English
// root (src/app/cewp/page.tsx) and the localized routes
// (src/app/[locale]/cewp/page.tsx) render this with their own dictionary.
//
// Strings that carry emphasis (<b>) are stored as HTML in the dictionary and
// injected with dangerouslySetInnerHTML. Content is authored and machine-
// translated by us (never user input), so this is safe.

"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

const h = (html: string) => ({ __html: html });

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

export default function CewpBaseContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const c = t.cewp;

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
          {/* Hero — soup bowl + acronym + headline */}
          <header className="space-y-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span aria-hidden className="text-4xl md:text-5xl">
                🍲
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                {c.eyebrow}
              </p>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {c.headline}
            </h1>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              {c.intro1}
            </p>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              {c.intro2}
            </p>
          </header>

          {/* The video explainer */}
          <section className="mt-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              {c.watchLabel}
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm dark:border-gray-800">
              <iframe
                src="https://www.youtube-nocookie.com/embed/sScyz82zfpY?rel=0"
                title="Dismantling the Hyperscaler — The Systems Architecture of CEWP"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-2 text-[12px] text-slate-500">{c.videoCaption}</p>
          </section>

          {/* CTAs */}
          <section className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span aria-hidden>📱</span>
                {c.ctaAppStore}
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-primary hover:bg-brand-primary hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-brand-primary"
              >
                <span aria-hidden>🤖</span>
                {c.ctaGooglePlay}
              </a>
            </div>
            <p
              className="rounded-md border-l-4 border-brand-primary bg-brand-primary/5 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-brand-primary/10 dark:text-slate-200"
              dangerouslySetInnerHTML={h(c.shippingNote)}
            />
          </section>

          {/* The "click here for more" — the deep tech */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {c.deepTechTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {c.deepTechBody}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* /cewp/details is English-only; link there directly. */}
              <Link
                href="/cewp/details"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                {c.ctaDetails}
              </Link>
              <a
                href="https://github.com/CIRISAI/CEWP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
                {c.ctaRepo}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
