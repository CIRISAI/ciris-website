// Shared CEG landing body, driven by a per-locale dictionary. Both the English
// root (src/app/grammar/page.tsx) and the localized routes
// (src/app/[locale]/grammar/page.tsx) render this with their own dictionary.
// The live spec figures (version, release date, prefix count, PDF URLs) are
// fetched server-side and passed in as props, since this is a client component.
//
// The /grammar/details spec reader and /grammar/explore workshop are English-
// only, so those links point at the un-localized routes.

"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

const h = (html: string) => ({ __html: html });

type Props = {
  t: Dictionary;
  specVersion: string;
  releasedDate: string;
  totalPrefixes: number;
  readerPdf: string;
  fullPdf: string;
};

export default function GrammarBaseContent({
  t,
  specVersion,
  releasedDate,
  totalPrefixes,
  readerPdf,
  fullPdf,
}: Props) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const g = t.grammar;

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
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 md:px-6">
          {/* Hero */}
          <header className="space-y-5">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {specVersion} · {g.releasedLabel} {releasedDate}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {totalPrefixes} {g.prefixFamilies}
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              {g.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {g.headline}
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              {g.intro}
            </p>

            {/* PDF editions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={readerPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                <span aria-hidden>📖</span>
                {g.pdfReader}
              </a>
              <a
                href={fullPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                {g.pdfFull}
              </a>
              <span className="text-xs text-slate-500">
                {specVersion}, {g.pdfNoteSuffix}
              </span>
            </div>
          </header>

          {/* What this is, why we made it, what's comparable */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  {g.whatIsTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {g.whatIsBody}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  {g.whyTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {g.whyBody}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  {g.comparableTitle}
                </p>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {g.comparable.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={h(item)} />
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Three things a reader can actually do here */}
          <section className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                {g.doTitle1}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {g.doBody1}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                {g.doTitle2}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {g.doBody2}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                {g.doTitle3}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {g.doBody3}
              </p>
            </div>
          </section>

          {/* Deep tech CTA — the full spec reader + the workshop (English-only) */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {g.deepTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {g.deepBody}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/grammar/details"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                {g.ctaSpecReader}
              </Link>
              <Link
                href="/grammar/explore"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                {g.ctaExplore}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
