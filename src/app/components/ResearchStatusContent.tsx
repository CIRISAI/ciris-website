// Shared research-status page body, driven by a per-locale dictionary. Both
// the English root (src/app/research-status/page.tsx) and the localized routes
// (src/app/[locale]/research-status/page.tsx) render this with their own
// dictionary — one content component, two thin entry points, no duplicated
// markup.
//
// Strings that carry typographic emphasis (<strong>, <em>, inline <a>) are
// stored as HTML in the dictionary and injected with dangerouslySetInnerHTML.
// The content is authored and machine-translated by us (never user input), so
// this is safe; translators are instructed to preserve the tags.

"use client";

import Image from "next/image";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function ResearchStatusContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;

  const rs = t.researchStatus;

  const agentSummaries = [
    {
      name: rs.allyName,
      paths: rs.allyPaths,
      breakdown: rs.allyBreakdown,
      summary: rs.allySummary,
    },
    {
      name: rs.scoutName,
      paths: rs.scoutPaths,
      breakdown: rs.scoutBreakdown,
      summary: rs.scoutSummary,
    },
    {
      name: rs.datumName,
      paths: rs.datumPaths,
      breakdown: rs.datumBreakdown,
      summary: rs.datumSummary,
    },
  ];

  const loopSteps = [
    rs.loopStep1,
    rs.loopStep2,
    rs.loopStep3,
    rs.loopStep4,
  ];

  const schemaHighlights = [
    rs.schemaHighlight1,
    rs.schemaHighlight2,
    rs.schemaHighlight3,
  ];

  const papers = [
    {
      href: "https://zenodo.org/records/18217688",
      title: rs.paper1Title,
      meta: rs.paper1Meta,
      blurb: rs.paper1Blurb,
    },
    {
      href: "https://zenodo.org/records/18137161",
      title: rs.paper2Title,
      meta: rs.paper2Meta,
      blurb: rs.paper2Blurb,
    },
    {
      href: "https://zenodo.org/records/19839280",
      title: rs.paper3Title,
      meta: rs.paper3Meta,
      blurb: rs.paper3Blurb,
    },
  ];

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
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-36">
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-12">
              <div>
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {rs.heroLabel}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {rs.heroUpdated}
                  </span>
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {rs.heroEyebrow}
                </p>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                  {rs.heroH1}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {rs.heroPara}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/ciris-scoring"
                    className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {rs.heroCtaTrace}
                  </a>
                  <a
                    href="https://github.com/CIRISAI/CIRISLens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                  >
                    {rs.heroCtaLens}
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {rs.corpusLabel}
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{rs.corpusItem1}</li>
                  <li>{rs.corpusItem2}</li>
                  <li>{rs.corpusItem3}</li>
                  <li>{rs.corpusItem4}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Flagship synthesis paper */}
          <section className="mb-8">
            <a
              href="https://zenodo.org/records/20300773"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border-2 border-brand-primary bg-gradient-to-br from-brand-primary/5 to-transparent p-8 shadow-sm transition-colors hover:from-brand-primary/10 dark:border-brand-primary dark:from-brand-primary/10"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  {rs.flagshipBadge}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {rs.flagshipMeta}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                {rs.flagshipTitle}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                {rs.flagshipSubtitle}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {rs.flagshipBody}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                {rs.flagshipCta}
              </span>
            </a>
          </section>

          {/* Engineering-tier papers */}
          <section className="mb-8">
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.engineeringEyebrow}
            </p>
            <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {rs.engineeringIntro}{" "}
              <a href="/papers" className="font-semibold text-brand-primary hover:underline">
                {rs.engineeringAllPapers}
              </a>
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {papers.map((paper) => (
                <a
                  key={paper.href}
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {paper.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {paper.meta}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {paper.blurb}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Open dataset + org link */}
          <section className="mb-14 grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <a
              href="https://huggingface.co/datasets/CIRISAI/reasoning-traces"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {rs.datasetEyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {rs.datasetTitle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {rs.datasetBody}
              </p>
            </a>
            <a
              href="https://huggingface.co/CIRISAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-950"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {rs.hfOrgTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {rs.hfOrgBody}
              </p>
            </a>
          </section>

          <div
            className="mb-14 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600 dark:border-gray-800 dark:bg-gray-950 dark:text-slate-300"
            dangerouslySetInnerHTML={h(rs.sourceRepoNote)}
          />

          <section id="alignment-manifold" className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.mathEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {rs.mathH2}
            </h2>
            <p
              className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(rs.mathBody)}
            />
            <p
              className="mt-4 text-sm text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(rs.mathNote)}
            />
          </section>

          <section className="mb-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {rs.whyTracesTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {rs.whyTracesBody}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {rs.whySchemaTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {rs.whySchemaBody}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {rs.whyCompendiumTitle}
              </h2>
              <p
                className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                dangerouslySetInnerHTML={h(rs.whyCompendiumBody)}
              />
            </div>
          </section>

          <section className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {rs.privacyEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {rs.privacyH2}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {rs.privacyBody}
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {schemaHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {rs.researchQLabel}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {rs.researchQH2}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {rs.researchQBody}
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {rs.publicFramingTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {rs.publicFramingBody}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {rs.corpusSectionEyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {rs.corpusSectionH2}
                </h2>
              </div>
              <a href="/ciris-scoring" className="text-sm font-semibold text-brand-primary hover:underline">
                {rs.corpusSectionDashLink}
              </a>
            </div>
            <p className="max-w-4xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.corpusSectionBody}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-gray-800 dark:bg-gray-950">
              <Image
                src="/research-status/trace-attractor-comparison.png"
                alt={rs.imageAltOverlays}
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {rs.imageCaption}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {agentSummaries.map((agent) => (
                <div
                  key={agent.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {agent.name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-primary">
                      {agent.paths} {rs.agentPathsSuffix}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {agent.breakdown}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {agent.summary}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/30">
              <p className="text-sm font-semibold text-orange-900 dark:text-orange-300">
                {rs.scoutBoxTitle}
              </p>
              <p
                className="mt-2 text-sm leading-6 text-orange-800 dark:text-orange-200"
                dangerouslySetInnerHTML={h(rs.scoutBoxBody)}
              />
            </div>
          </section>

          <section className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {rs.flywheelEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {rs.flywheelH2}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {rs.flywheelBody}
              </p>
              <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {loopSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Image
                src="/research-status/crowdsourced-alignment-loop.png"
                alt={rs.flywheelImageAlt}
                width={1600}
                height={1200}
                className="h-auto w-full rounded-2xl"
              />
              <p className="mt-4 px-2 text-sm text-slate-500 dark:text-slate-400">
                {rs.flywheelImageCaption}
              </p>
            </div>
          </section>

          <section id="idma" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.idmaEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {rs.idmaH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.idmaBody}
            </p>
            <p
              className="mt-3 text-sm text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(rs.idmaNote)}
            />
          </section>

          <section id="benchmarks" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.benchmarksEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {rs.benchmarksH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.benchmarksBody}
            </p>
          </section>

          <section id="falsification" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.falsificationEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {rs.falsificationH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.falsificationBody}
            </p>
          </section>

          <section id="limitations" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {rs.limitationsEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {rs.limitationsH2}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.limitationsPara1}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {rs.limitationsPara2}
            </p>
            <p
              className="mt-6 text-sm text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(rs.limitationsNote)}
            />
          </section>
        </div>
      </main>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
