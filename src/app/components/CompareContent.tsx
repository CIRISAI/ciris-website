// Shared compare-page body, driven by a per-locale dictionary. Both the English
// root (src/app/compare/page.tsx) and the localized routes
// (src/app/[locale]/compare/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<strong>, <em>, inline <a>) are
// stored as HTML in the dictionary and injected with dangerouslySetInnerHTML.
// The content is authored and machine-translated by us (never user input), so
// this is safe; translators are instructed to preserve the tags.

"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import HomeHeader from "@/app/components/HomeHeader";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function CompareContent({ t }: { t: Dictionary }) {
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
      <HomeHeader
        headline={t.compare.h1}
        subheadline={t.compare.heroSubheadline}
        description={t.compare.heroDescription}
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText={t.compare.heroButtonText}
        buttonHref="#landscape"
        linkText={t.compare.heroLinkText}
        linkHref="/sections/main/v1"
      />

      {/* Three Types of AI */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">{t.compare.threeTypesHeading}</h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            {t.compare.threeTypesTagline}
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.compare.threeTypesPara}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Type 1 */}
            <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">{t.compare.type1Number}</span>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">{t.compare.type1Heading}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {t.compare.type1Para}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 italic mb-3">
                {t.compare.type1Note}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {t.compare.type1Warning}
              </p>
            </div>

            {/* Type 2 */}
            <div className="rounded-xl border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">{t.compare.type2Number}</span>
                <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">{t.compare.type2Heading}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {t.compare.type2Para}
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                {t.compare.type2Warning}
              </p>
            </div>

            {/* Type 3 */}
            <div className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-6 ring-2 ring-green-400 ring-offset-2 dark:ring-offset-gray-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">{t.compare.type3Number}</span>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">{t.compare.type3Heading}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {t.compare.type3Para}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                {t.compare.type3Badge}
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" dangerouslySetInnerHTML={h(t.compare.threeTypesClosingHtml)} />
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt={t.compare.sevenThingsLogoAlt}
          headline={t.compare.sevenThingsHeadline}
          subheadline={t.compare.sevenThingsSubheadline}
          copyText={t.compare.sevenThingsCopy}
        />

        <CardsSection
          cardsData={[
            {
              headline: t.compare.card1Headline,
              copyText: t.compare.card1Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "/sections/main/v1",
            },
            {
              headline: t.compare.card2Headline,
              copyText: t.compare.card2Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: t.compare.card3Headline,
              copyText: t.compare.card3Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: t.compare.card4Headline,
              copyText: t.compare.card4Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: t.compare.card5Headline,
              copyText: t.compare.card5Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: t.compare.card6Headline,
              copyText: t.compare.card6Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE",
            },
          ]}
        />

        {/* The Seventh Requirement - Echo Chamber Detection */}
        <div className="my-12 rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">{t.compare.req7Number}</span>
            <div>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{t.compare.req7Heading}</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">{t.compare.req7Subheading}</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={h(t.compare.req7Para)} />

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">{t.compare.req7NoisyLabel}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t.compare.req7NoisyDesc}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center ring-2 ring-green-400">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">{t.compare.req7HealthyLabel}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t.compare.req7HealthyDesc}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400 mb-1">{t.compare.req7EchoLabel}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t.compare.req7EchoDesc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.compare.req7FooterText}
            </p>
            <a
              href="/coherence-ratchet"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm"
            >
              {t.compare.req7MathLink}
            </a>
          </div>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.compare.landscapeSeparatorLogoAlt}
          headline={t.compare.landscapeSeparatorHeadline}
          subheadline={t.compare.landscapeSeparatorSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        {/* Landscape Comparison Table */}
        <div id="landscape" className="my-12 px-8 md:px-12">
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(t.compare.landscapeDisclaimer)} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-4 text-left font-bold text-brand-primary">{t.compare.tableHeaderProject}</th>
                  <th className="p-4 text-center font-bold text-brand-primary">{t.compare.tableHeaderChecksEvery}</th>
                  <th className="p-4 text-center font-bold text-brand-primary">{t.compare.tableHeaderPublishedRules}</th>
                  <th className="p-4 text-center font-bold text-brand-primary">{t.compare.tableHeaderConscience}</th>
                  <th className="p-4 text-center font-bold text-brand-primary">{t.compare.tableHeaderProof}</th>
                  <th className="p-4 text-center font-bold text-brand-primary">{t.compare.tableHeaderOpenSource}</th>
                  <th className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">{t.compare.tableHeaderEcho}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-bold text-brand-primary">
                    <a href="https://github.com/CIRISAI/CIRISAgent" className="hover:underline">{t.compare.rowCiris}</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">{t.compare.rowCirisChecks}</td>
                  <td className="p-4 text-center text-green-600 font-bold">{t.compare.rowCirisRules}</td>
                  <td className="p-4 text-center text-green-600 font-bold">{t.compare.rowCirisConscience}</td>
                  <td className="p-4 text-center text-green-600 font-bold">{t.compare.rowCirisProof}</td>
                  <td className="p-4 text-center text-green-600 font-bold">{t.compare.rowCirisOpenSource}</td>
                  <td className="p-4 text-center text-indigo-600 font-bold">{t.compare.rowCirisEcho}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{t.compare.rowConstitutional}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowConstitutionalChecks}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowConstitutionalRules}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowConstitutionalConscience}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowConstitutionalProof}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowConstitutionalOpenSource}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowConstitutionalEcho}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{t.compare.rowLlama}</td>
                  <td className="p-4 text-center text-green-600">{t.compare.rowLlamaChecks}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowLlamaRules}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowLlamaConscience}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowLlamaProof}</td>
                  <td className="p-4 text-center text-green-600">{t.compare.rowLlamaOpenSource}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowLlamaEcho}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    <a href="https://github.com/p0ss/HatCat" className="underline hover:text-brand-primary">{t.compare.rowHatcat}</a>
                  </td>
                  <td className="p-4 text-center text-green-600">{t.compare.rowHatcatChecks}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowHatcatRules}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowHatcatConscience}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowHatcatProof}</td>
                  <td className="p-4 text-center text-green-600">{t.compare.rowHatcatOpenSource}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowHatcatEcho}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{t.compare.rowEthicsBoards}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowEthicsBoardsChecks}</td>
                  <td className="p-4 text-center text-green-600">{t.compare.rowEthicsBoardsRules}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowEthicsBoardsConscience}</td>
                  <td className="p-4 text-center text-yellow-500">{t.compare.rowEthicsBoardsProof}</td>
                  <td className="p-4 text-center text-gray-400">{t.compare.rowEthicsBoardsOpenSource}</td>
                  <td className="p-4 text-center text-red-500">{t.compare.rowEthicsBoardsEcho}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {t.compare.tableFootnote}
          </p>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.compare.layersSeparatorLogoAlt}
          headline={t.compare.layersSeparatorHeadline}
          subheadline={t.compare.layersSeparatorSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: t.compare.layersCard1Headline,
              copyText: t.compare.layersCard1Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: t.compare.layersCard2Headline,
              copyText: t.compare.layersCard2Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: t.compare.layersCard3Headline,
              copyText: t.compare.layersCard3Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.compare.manyAgentsSeparatorLogoAlt}
          headline={t.compare.manyAgentsSeparatorHeadline}
          subheadline={t.compare.manyAgentsSeparatorSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={t.compare.noSPOFLogoAlt}
          headline={t.compare.noSPOFHeadline}
          subheadline={t.compare.noSPOFSubheadline}
          copyText={t.compare.noSPOFCopy}
          linkHref="/coherence-ratchet"
          linkText={t.compare.noSPOFLinkText}
        />

        {/* Research Status */}
        <div className="my-12 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-6">
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 mb-3">{t.compare.researchHeading}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t.compare.researchPara}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2 text-sm">{t.compare.researchEstablishedLabel}</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>{t.compare.researchEstablishedItem1}</li>
                <li>{t.compare.researchEstablishedItem2}</li>
                <li>{t.compare.researchEstablishedItem3}</li>
                <li>{t.compare.researchEstablishedItem4}</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2 text-sm">{t.compare.researchTestingLabel}</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>{t.compare.researchTestingItem1}</li>
                <li>{t.compare.researchTestingItem2}</li>
                <li>{t.compare.researchTestingItem3}</li>
                <li>{t.compare.researchTestingItem4}</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
            <a
              href="/research-status"
              className="text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
            >
              {t.compare.researchLink}
            </a>
          </div>
        </div>

        {/* Try It Yourself */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8">
          <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">{t.compare.tryHeading}</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <a href="/explore-a-trace" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{t.compare.tryWatchHeading}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.compare.tryWatchDesc} <span className="text-brand-primary">{t.compare.tryWatchCta}</span></p>
            </a>
            <a href="/trust" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{t.compare.tryVerifyHeading}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.compare.tryVerifyDesc} <span className="text-brand-primary">{t.compare.tryVerifyCta}</span></p>
            </a>
            <a href="/first-contact" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{t.compare.tryStartHeading}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.compare.tryStartDesc} <span className="text-brand-primary">{t.compare.tryStartCta}</span></p>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/cirisagent/id6758524415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t.compare.tryIOSLabel}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              {t.compare.tryAndroidLabel}
            </a>
            <a
              href="/install"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              {t.compare.tryDesktopLabel}
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t.compare.trySourceLabel}
            </a>
          </div>
        </div>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-screen fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        buttonText={t.compare.imageHeroButtonText}
        logoSrc="logoIcon"
        logoAlt={t.compare.imageHeroLogoAlt}
        headline={t.compare.imageHeroHeadline}
        subheadline={t.compare.imageHeroSubheadline}
        copyText={t.compare.imageHeroCopy}
      />

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
