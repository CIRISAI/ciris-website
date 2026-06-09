// Shared how-it-works body, driven by a per-locale dictionary. Both the English
// root (src/app/how-it-works/page.tsx) and the localized routes
// (src/app/[locale]/how-it-works/page.tsx) render this with their own
// dictionary — one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>/<b>/<code>) are stored as HTML
// in the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.

"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import navItems from "@/app/components/navitems";
import TraceExplorer from "@/app/components/TraceExplorer";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function HowItWorksContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const hiw = t.howItWorks;

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
      <HomeHeader
        headline={hiw.header.headline}
        subheadline={hiw.header.subheadline}
        description={hiw.header.description}
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText={hiw.header.buttonText}
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText={hiw.header.linkText}
        linkHref="/coherence-ratchet"
      />

      <div className="container max-w-6xl py-16">
        {/* What is CIRIS */}
        <section className="mb-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {hiw.whatIsCiris.heading}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={h(hiw.whatIsCiris.body)} />
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">{hiw.whatIsCiris.stat1Value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hiw.whatIsCiris.stat1Label}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">{hiw.whatIsCiris.stat2Value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hiw.whatIsCiris.stat2Label}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">{hiw.whatIsCiris.stat3Value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hiw.whatIsCiris.stat3Label}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4" dangerouslySetInnerHTML={h(hiw.whatIsCiris.useCasesBody)} />
          <div className="flex flex-wrap gap-3">
            <a href="/coherence-ratchet" className="text-sm font-semibold text-brand-primary hover:underline">
              {hiw.whatIsCiris.link1}
            </a>
            <a href="/sections/main" className="text-sm font-semibold text-brand-primary hover:underline">
              {hiw.whatIsCiris.link2}
            </a>
            <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-primary hover:underline">
              {hiw.whatIsCiris.link3}
            </a>
          </div>
        </section>

        {/* The Three Rules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.threeRules.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.threeRules.lead}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.threeRules.rule1Title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(hiw.threeRules.rule1Body)} />
            </div>
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.threeRules.rule2Title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hiw.threeRules.rule2Body}</p>
            </div>
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.threeRules.rule3Title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hiw.threeRules.rule3Body}</p>
            </div>
          </div>
        </section>

        {/* H3ERE Pipeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.pipeline.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.pipeline.lead)} />

          {/* Pipeline Diagram */}
          <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-x-auto">
            <img
              src="/pipeline-visualization.svg"
              alt={hiw.pipeline.imgAlt}
              className="w-full max-w-4xl mx-auto"
            />
          </div>

          <div className="relative">
            {/* Pipeline steps */}
            <div className="space-y-3">
              {hiw.pipeline.steps.map((item, idx) => {
                const step = idx + 1;
                const isConditional = step === 7 || step === 8;
                return (
                  <div key={step} className={`flex items-center gap-4 ${isConditional ? "opacity-60" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === 4 ? "bg-green-500 text-white" :
                      step === 6 ? "bg-brand-primary text-white" :
                      isConditional ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300" :
                      "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}>
                      {step}
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{item.desc}</span>
                      {isConditional && (
                        <span className="text-xs text-gray-400 ml-2">{hiw.pipeline.conditionalLabel}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Five DMAs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.dmas.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.dmas.lead)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.dmas.principleTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.dmas.principleBody}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.dmas.commonSenseTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(hiw.dmas.commonSenseBody)} />
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.dmas.domainTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(hiw.dmas.domainBody)} />
            </div>
            <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
                {hiw.dmas.idmaTitle}{" "}
                <a href="/research-status#idma" className="text-xs font-normal text-brand-primary hover:underline">{hiw.dmas.idmaLink}</a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(hiw.dmas.idmaBody)} />
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.dmas.actionSelectionTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.dmas.actionSelectionBody}
              </p>
            </div>
          </div>
        </section>

        {/* Six Conscience Checks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.conscience.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.conscience.lead}
          </p>

          {/* Bypass Checks */}
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide mb-3">{hiw.conscience.bypassHeading}</h3>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.bypass1Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.bypass1Body}
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.bypass2Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.bypass2Body}
              </p>
            </div>
          </div>

          {/* Normal Faculties */}
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide mb-3">{hiw.conscience.facultiesHeading}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.faculty1Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.faculty1Body}
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.faculty2Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.faculty2Body}
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.faculty3Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.faculty3Body}
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.conscience.faculty4Title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.conscience.faculty4Body}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4" dangerouslySetInnerHTML={h(hiw.conscience.exemptNote)} />
        </section>

        {/* 10 Handler Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.actions.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.actions.lead}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{hiw.actions.externalHeading}</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">SPEAK</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.speakDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">TOOL</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.toolDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">OBSERVE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.observeDesc}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{hiw.actions.memoryHeading}</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">MEMORIZE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.memorizeDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">RECALL</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.recallDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">FORGET</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.forgetDesc}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{hiw.actions.controlHeading}</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">DEFER</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.deferDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">PONDER</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.ponderDesc}</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">REJECT</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.rejectDesc}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{hiw.actions.terminalHeading}</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">TASK_COMPLETE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{hiw.actions.taskCompleteDesc}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Foundational Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.principles.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.principles.lead}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiw.principles.items.map((principle) => (
              <div key={principle.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{principle.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{principle.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Message Buses */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.buses.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.buses.lead)} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiw.buses.items.map((bus) => (
              <div key={bus.name} className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
                <h3 className="font-mono font-semibold text-gray-900 dark:text-white mb-1">{bus.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{bus.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Human Oversight */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.oversight.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.oversight.lead)} />
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">{hiw.oversight.rootBadge}</span>
                <h3 className="font-bold text-gray-900 dark:text-white">{hiw.oversight.rootTitle}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.oversight.rootBody}
              </p>
            </div>
            <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">{hiw.oversight.authorityBadge}</span>
                <h3 className="font-bold text-gray-900 dark:text-white">{hiw.oversight.authorityTitle}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.oversight.authorityBody}
              </p>
            </div>
            <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">{hiw.oversight.observerBadge}</span>
                <h3 className="font-bold text-gray-900 dark:text-white">{hiw.oversight.observerTitle}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.oversight.observerBody}
              </p>
            </div>
          </div>

          {/* Deferral Triggers */}
          <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{hiw.oversight.deferralHeading}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {hiw.oversight.deferralLead}
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{hiw.oversight.wbdTitle}</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  {hiw.oversight.wbdItems.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{hiw.oversight.professionalTitle}</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  {hiw.oversight.professionalItems.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{hiw.oversight.systemTitle}</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  {hiw.oversight.systemItems.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: "• " + item }} />
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{hiw.oversight.configTitle}</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  {hiw.oversight.configItems.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Kill Switch */}
          <div className="mt-8 rounded-lg border-4 border-gray-900 dark:border-white bg-gray-900 dark:bg-white p-6">
            <h3 className="font-bold text-white dark:text-gray-900 mb-3">
              {hiw.oversight.accordHeading}{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/accord" target="_blank" rel="noopener noreferrer" className="text-xs font-normal text-blue-400 dark:text-blue-600 hover:underline">
                {hiw.oversight.accordLink}
              </a>
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-700 mb-4" dangerouslySetInnerHTML={h(hiw.oversight.accordBody)} />
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-red-400 dark:text-red-600 font-bold text-sm">{hiw.oversight.shutdownLabel}</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{hiw.oversight.shutdownDesc}</p>
              </div>
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-yellow-400 dark:text-yellow-600 font-bold text-sm">{hiw.oversight.freezeLabel}</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{hiw.oversight.freezeDesc}</p>
              </div>
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-blue-400 dark:text-blue-600 font-bold text-sm">{hiw.oversight.safeModeLabel}</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{hiw.oversight.safeModeDesc}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
              {hiw.oversight.accordFooter}
            </p>
          </div>
        </section>

        {/* Operational Modes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.modes.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.modes.lead)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.modes.workTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hiw.modes.workSub}</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {hiw.modes.workItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.modes.playTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hiw.modes.playSub}</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {hiw.modes.playItems.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={h(item)} />
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.modes.solitudeTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hiw.modes.solitudeSub}</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {hiw.modes.solitudeItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.modes.dreamTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hiw.modes.dreamSub}</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {hiw.modes.dreamItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.privacy.heading}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">{hiw.privacy.secretsTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {hiw.privacy.secretsBody}
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                {`{{SECRET:uuid:description}}`}
              </code>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">{hiw.privacy.encryptionTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.privacy.encryptionBody}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">{hiw.privacy.localFirstTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.privacy.localFirstBody}
              </p>
            </div>
          </div>

          {/* Open Infrastructure */}
          <div className="mt-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{hiw.privacy.openSourceHeading}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {hiw.privacy.openSourceBody}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <a href="https://github.com/CIRISAI/CIRISProxy" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  {hiw.privacy.proxyLink}
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {hiw.privacy.proxyDesc}
                </p>
              </div>
              <div>
                <a href="https://github.com/CIRISAI/CIRISBilling" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  {hiw.privacy.billingLink}
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {hiw.privacy.billingDesc}
                </p>
              </div>
              <div>
                <a href="https://github.com/CIRISAI/CIRISBridge" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  {hiw.privacy.bridgeLink}
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {hiw.privacy.bridgeDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.transparency.heading}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.transparency.realtimeTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.transparency.realtimeBody}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.transparency.otelTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.transparency.otelBody}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.transparency.auditTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(hiw.transparency.auditBody)} />
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.transparency.airTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hiw.transparency.airBody}
              </p>
            </div>
          </div>

          {/* Example Signed Trace */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">{hiw.transparency.traceHeading}</h3>
              <a
                href="/explore-a-trace"
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                {hiw.transparency.traceLink}
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" dangerouslySetInnerHTML={h(hiw.transparency.traceBody)} />
            <TraceExplorer compact={true} defaultOpenIndex={4} />
          </div>
        </section>

        {/* HE-300 Coherence Benchmarking */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.benchmarking.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.benchmarking.lead1}{" "}
            <a href="https://arxiv.org/abs/2008.02275" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
              <span dangerouslySetInnerHTML={h(hiw.benchmarking.lead2)} />
            </a>{" "}
            {hiw.benchmarking.lead3}
          </p>
          <div className="grid gap-4 md:grid-cols-5 mb-6">
            {hiw.benchmarking.categories.map((cat) => (
              <div key={cat.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{cat.name}</h3>
                <p className="text-2xl font-bold text-brand-primary">{cat.count}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-2 border-dashed border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{hiw.benchmarking.fundingHeading}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {hiw.benchmarking.fundingBody}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/emooreatx/ethicsengine_enterprise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    {hiw.benchmarking.ethicsEngineLink}
                  </a>
                  <a
                    href="https://github.com/CIRISAI/CIRISLens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    {hiw.benchmarking.cirisLensLink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Agents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {hiw.agents.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hiw.agents.lead}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiw.agents.items.map((agent) => (
              <div key={agent.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded">{agent.role}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{agent.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 italic">{agent.useCase}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6" dangerouslySetInnerHTML={h(hiw.cta.body)} />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/safety"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              {hiw.cta.safetyBtn}
            </a>
            <a
              href="/compare"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              {hiw.cta.compareBtn}
            </a>
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {hiw.cta.coherenceBtn}
            </a>
            <a
              href="/ciris-scoring"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {hiw.cta.scoringBtn}
            </a>
          </div>
        </section>
      </div>

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
