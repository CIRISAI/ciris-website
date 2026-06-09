// Shared services-page body, driven by a per-locale dictionary. Both the English
// root (src/app/services/page.tsx) and the localized routes
// (src/app/[locale]/services/page.tsx) render this with their own dictionary —
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
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import { DeviceMobile, Shield, CurrencyDollar } from "@phosphor-icons/react";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function ServicesContent({ t }: { t: Dictionary }) {
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
          {/* Try CIRIS Now - Scout Preview */}
          <div className="mb-8 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              {t.services.tryCirisHeading}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {t.services.tryCirisPara}
            </p>
            <a
              href="https://scout.ciris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              {t.services.tryCirisCta}
            </a>
          </div>

          {/* Android App NOW AVAILABLE */}
          <div className="mb-12 rounded-lg border-4 border-green-500 bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center shadow-xl dark:from-green-900/20 dark:to-blue-900/20">
            <div className="mb-4 flex justify-center">
              <DeviceMobile size={64} weight="fill" className="text-green-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {t.services.mobileHeading}
            </h1>
            <div className="mb-4 inline-block rounded-full bg-green-600 px-4 py-2 text-lg font-semibold text-white">
              {t.services.mobileAvailableBadge}
            </div>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              {t.services.mobilePara}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://apps.apple.com/us/app/cirisagent/id6758524415"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t.services.appStoreLabel}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                {t.services.googlePlayLabel}
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t.services.mobileSourcePre}{" "}
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline dark:text-green-400"
              >
                {t.services.mobileSourceLink}
              </a>
            </p>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t.services.heroHeading}
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t.services.heroSub}
            </p>
            <div className="mt-4 rounded-md bg-blue-100 p-3 dark:bg-blue-900/40">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {t.services.heroNote}
              </p>
            </div>
          </div>

          {/* Privacy-First Section */}
          <div className="mb-12 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-400 dark:bg-green-900/20">
            <div className="mb-4 flex items-center gap-3">
              <Shield size={32} weight="fill" className="text-green-600 dark:text-green-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.services.privacyHeading}
              </h3>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {t.services.privacyPara}
            </p>
            <div className="rounded-md bg-green-100 p-4 dark:bg-green-900/40">
              <p className="mb-2 font-semibold text-gray-900 dark:text-white">{t.services.privacyLogLabel}</p>
              <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>{t.services.privacyLog1}</li>
                <li>{t.services.privacyLog2}</li>
                <li>{t.services.privacyLog3}</li>
                <li>{t.services.privacyLog4}</li>
              </ul>
              <p className="mb-2 font-semibold text-gray-900 dark:text-white">{t.services.privacyNoLogLabel}</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>{t.services.privacyNoLog1}</li>
                <li>{t.services.privacyNoLog2}</li>
                <li>{t.services.privacyNoLog3}</li>
                <li>{t.services.privacyNoLog4}</li>
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12 rounded-lg border-2 border-purple-500 bg-purple-50 p-6 dark:border-purple-400 dark:bg-purple-900/20">
            <div className="mb-4 flex items-center gap-3">
              <CurrencyDollar size={32} weight="fill" className="text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.services.pricingHeading}
              </h3>
            </div>
            <div className="mb-4 text-center">
              <div className="inline-block rounded-lg bg-purple-100 p-6 dark:bg-purple-900/40">
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">$0.10</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">{t.services.pricingUnit}</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t.services.pricingNote}
            </p>
            <div className="mt-4 rounded-md bg-purple-100 p-3 dark:bg-purple-900/40">
              <p className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={h(t.services.pricingStripeHtml)} />
            </div>
          </div>

          {/* Billing Model */}
          <div className="mb-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline={t.services.billingHeadline}
              subheadline={t.services.billingSubheadline}
            />
            <CardsSection
              cardsData={[
                {
                  headline: t.services.billingCard1Headline,
                  copyText: t.services.billingCard1Copy,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.services.billingCard2Headline,
                  copyText: t.services.billingCard2Copy,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: t.services.billingCard3Headline,
                  copyText: t.services.billingCard3Copy,
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Priority Order */}
          <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t.services.priorityHeading}
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {t.services.priorityPara}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white font-semibold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.services.priority1Label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.services.priority1Sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.services.priority2Label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.services.priority2Sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.services.priority3Label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.services.priority3Sub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {t.services.techHeading}
            </h3>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.services.techDetail1Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {t.services.techDetail1Para}
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    https://proxy.ciris.ai/v1/chat/completions
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.services.techDetail2Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">{t.services.techDetail2Para}</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    Authorization: Bearer YOUR_API_KEY
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.services.techDetail3Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">{t.services.techDetail3Para}</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>{t.services.techDetail3Item1}</li>
                    <li>{t.services.techDetail3Item2}</li>
                    <li>{t.services.techDetail3Item3}</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t.services.ctaPara}
            </p>
            <a
              href="/install"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              {t.services.ctaBtn}
            </a>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
