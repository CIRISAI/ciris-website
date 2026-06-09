// Shared MDD-page body, driven by a per-locale dictionary. Both the English
// root (src/app/mdd/page.tsx) and the localized routes
// (src/app/[locale]/mdd/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<strong>, <em>, inline <a>) are
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

/** Shape of the mdd namespace (mirrors _src/mdd.json). */
interface MddNS {
  heroBadgeMethodology: string;
  heroBadgeActive: string;
  heroEyebrow: string;
  h1: string;
  heroPara: string;
  fourEyebrow: string;
  fourH2: string;
  fourPara: string;
  leg1Label: string;
  leg1H3: string;
  leg1Desc: string;
  leg2Label: string;
  leg2H3: string;
  leg2Desc: string;
  leg3Label: string;
  leg3H3: string;
  leg3Desc: string;
  seatLabel: string;
  seatH3: string;
  seatDesc: string;
  alignEyebrow: string;
  alignH2: string;
  alignParaHtml: string;
  reqEyebrow: string;
  reqH2: string;
  req1H3: string;
  req1Li1: string;
  req1Li2: string;
  req1Li3: string;
  req1Li4: string;
  req2H3: string;
  req2Li1: string;
  req2Li2: string;
  req2Li3: string;
  req2Li4: string;
  req3H3: string;
  req3Li1: string;
  req3Li2: string;
  req3Li3: string;
  req3Li4: string;
  implEyebrow: string;
  implH2: string;
  implSvcH3: string;
  implSvcFlow: string;
  implSvcLi1Html: string;
  implSvcLi2Html: string;
  implSvcLi3Html: string;
  implSchH3: string;
  implSchFlow: string;
  implSchLi1Html: string;
  implSchLi2Html: string;
  implSchLi3Html: string;
  implProtoH3: string;
  implProtoFlow: string;
  implProtoLi1Html: string;
  implProtoLi2Html: string;
  implProtoLi3Html: string;
  sustEyebrow: string;
  sustH2: string;
  sust1H3: string;
  sust1Li1: string;
  sust1Li2: string;
  sust1Li3: string;
  sust2H3: string;
  sust2Li1: string;
  sust2Li2: string;
  sust2Li3: string;
  sust3H3: string;
  sust3Li1: string;
  sust3Li2: string;
  sust3Li3: string;
  gateEyebrow: string;
  gateH2: string;
  gate1H3: string;
  gate1Li1: string;
  gate1Li2: string;
  gate1Li3: string;
  gate2H3: string;
  gate2Li1: string;
  gate2Li2: string;
  gate2Li3: string;
  gate2Li4: string;
  gate3H3: string;
  gate3Li1: string;
  gate3Li2: string;
  gate3Li3: string;
  failEyebrow: string;
  failH2: string;
  fail1H3: string;
  fail1Body: string;
  fail2H3: string;
  fail2Body: string;
  fail3H3: string;
  fail3Body: string;
  fail4H3: string;
  fail4Body: string;
  caseEyebrow: string;
  caseH2: string;
  caseParaHtml: string;
  caseArchH3: string;
  caseArchLi1: string;
  caseArchLi2: string;
  caseArchLi3: string;
  caseArchLi4Html: string;
  caseArchLi5Html: string;
  caseArchLi6: string;
  caseSuccessH3: string;
  caseSuccessLi1: string;
  caseSuccessLi2Html: string;
  caseSuccessLi3: string;
  caseSuccessLi4: string;
  adoptEyebrow: string;
  adoptH2: string;
  adoptNewH3: string;
  adoptNewLi1: string;
  adoptNewLi2: string;
  adoptNewLi3: string;
  adoptNewLi4: string;
  adoptExistH3: string;
  adoptExistLi1: string;
  adoptExistLi2: string;
  adoptExistLi3: string;
  adoptExistLi4: string;
  adoptTeamH3: string;
  adoptTeamLi1: string;
  adoptTeamLi2: string;
  adoptTeamLi3: string;
  adoptTeamLi4: string;
  closeEyebrow: string;
  closeH2: string;
  closePara1: string;
  closePara2: string;
  closeLink1: string;
  closeLink2: string;
  closeLink3: string;
  closeLink4: string;
}

/** Extended dictionary that includes the mdd namespace. */
type DictionaryWithMdd = Dictionary & { mdd: MddNS };

export default function MddContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;

  const m = (t as DictionaryWithMdd).mdd;

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
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {m.heroBadgeMethodology}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {m.heroBadgeActive}
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.heroEyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              {m.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {m.heroPara}
            </p>
          </section>

          {/* Four-component model */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.fourEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.fourH2}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {m.fourPara}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {m.leg1Label}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {m.leg1H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {m.leg1Desc}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {m.leg2Label}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {m.leg2H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {m.leg2Desc}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {m.leg3Label}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {m.leg3H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {m.leg3Desc}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-brand-primary bg-brand-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {m.seatLabel}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {m.seatH3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {m.seatDesc}
                </p>
              </div>
            </div>
          </section>

          {/* Constant alignment */}
          <section className="mb-14 rounded-3xl border-l-4 border-brand-primary bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.alignEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.alignH2}
            </h2>
            <p
              className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(m.alignParaHtml)}
            />
          </section>

          {/* Mission framework requirements */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.reqEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.reqH2}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.req1H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.req1Li1}</li>
                  <li>{m.req1Li2}</li>
                  <li>{m.req1Li3}</li>
                  <li>{m.req1Li4}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.req2H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.req2Li1}</li>
                  <li>{m.req2Li2}</li>
                  <li>{m.req2Li3}</li>
                  <li>{m.req2Li4}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.req3H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.req3Li1}</li>
                  <li>{m.req3Li2}</li>
                  <li>{m.req3Li3}</li>
                  <li>{m.req3Li4}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Implementation patterns */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.implEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.implH2}
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {m.implSvcH3}
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  {m.implSvcFlow}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li dangerouslySetInnerHTML={h(m.implSvcLi1Html)} />
                  <li dangerouslySetInnerHTML={h(m.implSvcLi2Html)} />
                  <li dangerouslySetInnerHTML={h(m.implSvcLi3Html)} />
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {m.implSchH3}
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  {m.implSchFlow}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li dangerouslySetInnerHTML={h(m.implSchLi1Html)} />
                  <li dangerouslySetInnerHTML={h(m.implSchLi2Html)} />
                  <li dangerouslySetInnerHTML={h(m.implSchLi3Html)} />
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {m.implProtoH3}
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  {m.implProtoFlow}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li dangerouslySetInnerHTML={h(m.implProtoLi1Html)} />
                  <li dangerouslySetInnerHTML={h(m.implProtoLi2Html)} />
                  <li dangerouslySetInnerHTML={h(m.implProtoLi3Html)} />
                </ul>
              </div>
            </div>
          </section>

          {/* Sustainable development */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.sustEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.sustH2}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.sust1H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.sust1Li1}</li>
                  <li>{m.sust1Li2}</li>
                  <li>{m.sust1Li3}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.sust2H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.sust2Li1}</li>
                  <li>{m.sust2Li2}</li>
                  <li>{m.sust2Li3}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.sust3H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.sust3Li1}</li>
                  <li>{m.sust3Li2}</li>
                  <li>{m.sust3Li3}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quality gates */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.gateEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.gateH2}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.gate1H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.gate1Li1}</li>
                  <li>{m.gate1Li2}</li>
                  <li>{m.gate1Li3}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.gate2H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.gate2Li1}</li>
                  <li>{m.gate2Li2}</li>
                  <li>{m.gate2Li3}</li>
                  <li>{m.gate2Li4}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.gate3H3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.gate3Li1}</li>
                  <li>{m.gate3Li2}</li>
                  <li>{m.gate3Li3}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Failure modes */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.failEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.failH2}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  {m.fail1H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {m.fail1Body}
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  {m.fail2H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {m.fail2Body}
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  {m.fail3H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {m.fail3Body}
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  {m.fail4H3}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {m.fail4Body}
                </p>
              </div>
            </div>
          </section>

          {/* Case study: CIRIS */}
          <section className="mb-14 rounded-3xl border-2 border-brand-primary bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.caseEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.caseH2}
            </h2>
            <p
              className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={h(m.caseParaHtml)}
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.caseArchH3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.caseArchLi1}</li>
                  <li>{m.caseArchLi2}</li>
                  <li>{m.caseArchLi3}</li>
                  <li dangerouslySetInnerHTML={h(m.caseArchLi4Html)} />
                  <li dangerouslySetInnerHTML={h(m.caseArchLi5Html)} />
                  <li>{m.caseArchLi6}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.caseSuccessH3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.caseSuccessLi1}</li>
                  <li dangerouslySetInnerHTML={h(m.caseSuccessLi2Html)} />
                  <li>{m.caseSuccessLi3}</li>
                  <li>{m.caseSuccessLi4}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Adoption guidelines */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.adoptEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.adoptH2}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.adoptNewH3}
                </h3>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.adoptNewLi1}</li>
                  <li>{m.adoptNewLi2}</li>
                  <li>{m.adoptNewLi3}</li>
                  <li>{m.adoptNewLi4}</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.adoptExistH3}
                </h3>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.adoptExistLi1}</li>
                  <li>{m.adoptExistLi2}</li>
                  <li>{m.adoptExistLi3}</li>
                  <li>{m.adoptExistLi4}</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {m.adoptTeamH3}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>{m.adoptTeamLi1}</li>
                  <li>{m.adoptTeamLi2}</li>
                  <li>{m.adoptTeamLi3}</li>
                  <li>{m.adoptTeamLi4}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {m.closeEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {m.closeH2}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {m.closePara1}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {m.closePara2}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/MISSION_DRIVEN_DEVELOPMENT.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {m.closeLink1}
              </a>
              <a
                href="/vision"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {m.closeLink2}
              </a>
              <a
                href="/sections/main"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {m.closeLink3}
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                {m.closeLink4}
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
