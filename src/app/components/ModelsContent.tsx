// Shared models-page body, driven by a per-locale dictionary. Both the English
// root (src/app/models/page.tsx) and the localized routes
// (src/app/[locale]/models/page.tsx) render this with their own dictionary --
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<strong>, inline <a>) are stored as
// HTML in the dictionary and injected with dangerouslySetInnerHTML. The content
// is authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.

"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import CardsSection from "@/app/components/CardsSection";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function ModelsContent({ t }: { t: Dictionary }) {
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t.models.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t.models.heroPara}
            </p>
          </div>

          {/* Current Lineup */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Llama 4 Maverick
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {t.models.maverickDesc}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t.models.maverickProviders}
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Llama 4 Scout
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {t.models.scoutDesc}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t.models.scoutProviders}
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Qwen 3.6
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {t.models.qwenDesc}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t.models.qwenProviders}
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Gemma 4
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {t.models.gemmaDesc}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t.models.gemmaProviders}
              </p>
            </div>
          </div>

          {/* Model Criteria */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline={t.models.criteriaHeadline}
              subheadline={t.models.criteriaSubheadline}
            />

            <CardsSection
              cardsData={[
                {
                  headline: t.models.criteria1Heading,
                  copyText: t.models.criteria1Body,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.models.criteria2Heading,
                  copyText: t.models.criteria2Body,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.models.criteria3Heading,
                  copyText: t.models.criteria3Body,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.models.criteria4Heading,
                  copyText: t.models.criteria4Body,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.models.criteria5Heading,
                  copyText: t.models.criteria5Body,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Production Deployment */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              {t.models.productionHeading}
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.tier1Heading}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.models.tier1Desc}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.tier2Heading}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.models.tier2Desc}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.tier3Heading}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.models.tier3Desc}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.tier4Heading}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.models.tier4Desc}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.tier5Heading}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.models.tier5Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Why This Lineup */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              {t.models.whyLineupHeading}
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.whyRoles1Heading}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.models.whyRoles1Body}
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.whyRoles2Heading}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.models.whyRoles2Body}
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.whyExcludedHeading}
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  {t.models.whyExcludedBody}
                </p>
                <div className="rounded-md bg-red-100 p-3 dark:bg-red-900/40">
                  <p className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={h(t.models.whyExcludedFailure)} />
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {t.models.whyExcludedConclusion}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The 128K+ Requirement */}
          <div className="mt-12 rounded-lg border-4 border-brand-primary bg-gradient-to-br from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t.models.contextHeading}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.contextAlwaysOnHeading}
                </h3>
                <p dangerouslySetInnerHTML={h(t.models.contextAlwaysOnPara1)} />
                <p className="mt-2">
                  {t.models.contextAlwaysOnPara2}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.contextStateHeading}
                </h3>
                <p>
                  {t.models.contextStateIntro}
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>{t.models.contextStateLi1}</li>
                  <li>{t.models.contextStateLi2}</li>
                  <li>{t.models.contextStateLi3}</li>
                  <li>{t.models.contextStateLi4}</li>
                </ul>
                <p className="mt-2">
                  {t.models.contextStateConclusion}
                </p>
              </div>

              <div className="mt-6 rounded-md bg-purple-100 p-4 dark:bg-purple-900/40">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t.models.contextBottomLineLabel}
                </p>
                <p className="mt-2 text-sm">
                  {t.models.contextBottomLineBody}
                </p>
              </div>
            </div>
          </div>

          {/* How This Supports the Accord */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline={t.models.accordHeadline}
              subheadline={t.models.accordSubheadline}
            />

            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.accord1Heading}
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>{t.models.accord1Li1}</li>
                  <li>{t.models.accord1Li2}</li>
                  <li>{t.models.accord1Li3}</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.accord2Heading}
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>{t.models.accord2Li1}</li>
                  <li>{t.models.accord2Li2}</li>
                  <li>{t.models.accord2Li3}</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.models.accord3Heading}
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>{t.models.accord3Li1}</li>
                  <li>{t.models.accord3Li2}</li>
                  <li>{t.models.accord3Li3}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {t.models.conclusionHeading}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.models.conclusionPara1}
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {t.models.conclusionPara2}
            </p>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
