// Shared first-contact page body, driven by a per-locale dictionary. Both the
// English root (src/app/first-contact/page.tsx) and the localized routes
// (src/app/[locale]/first-contact/page.tsx) render this with their own
// dictionary -- one content component, two thin entry points, no duplicated
// markup.
//
// Strings that carry typographic emphasis or inline links are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.

"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import HomeHeader from "@/app/components/HomeHeader";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function FirstContactContent({ t }: { t: Dictionary }) {
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

      {/* Hero */}
      <HomeHeader
        headline={t.firstContact.heroHeadline}
        subheadline={t.firstContact.heroSubheadline}
        description={t.firstContact.heroDescription}
        mediaType="image"
        opacityValue={0.75}
        mediaSrc="/nathan-farrish-ArcTfEoBgzs-unsplash.jpg"
        buttonText={t.firstContact.heroButtonText}
        buttonHref="#quickstart"
        linkText={t.firstContact.heroLinkText}
        linkHref="/vision"
      />

      {/* Two paths */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {t.firstContact.twoPathsHeading}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            {t.firstContact.twoPathsBody}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-blue-500 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {t.firstContact.card1Heading}
              </h3>
              <p className="mb-6 flex-grow text-sm text-gray-600 dark:text-gray-400">
                {t.firstContact.card1Body}
              </p>
              <a
                href="#quickstart"
                className="inline-block self-start rounded-lg bg-brand-primary px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t.firstContact.card1Cta}
              </a>
            </div>
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-amber-500 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {t.firstContact.card2Heading}
              </h3>
              <p className="mb-6 flex-grow text-sm text-gray-600 dark:text-gray-400">
                {t.firstContact.card2Body}
              </p>
              <a
                href="/vision"
                className="inline-block self-start rounded-lg border-2 border-brand-primary px-5 py-2.5 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {t.firstContact.card2Cta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        {/* The idea, in short */}
        <div className="mx-auto my-16 max-w-3xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {t.firstContact.ideaEyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">
            {t.firstContact.ideaHeading}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>{t.firstContact.ideaP1}</p>
            <p>{t.firstContact.ideaP2}</p>
            <p dangerouslySetInnerHTML={h(t.firstContact.ideaP3Html)} />
          </div>
        </div>

        {/* First-contact protocols */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.firstContact.protocolsLogoAlt}
          headline={t.firstContact.protocolsSepHeadline}
          subheadline={t.firstContact.protocolsSepSub}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="mx-auto max-w-3xl px-4 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t.firstContact.protocolsIntroPara}
          </p>
        </div>

        <CardsSection
          cardsData={[
            {
              headline: t.firstContact.protocol1Headline,
              copyText: t.firstContact.protocol1Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
            {
              headline: t.firstContact.protocol2Headline,
              copyText: t.firstContact.protocol2Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
            {
              headline: t.firstContact.protocol3Headline,
              copyText: t.firstContact.protocol3Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
          ]}
        />
        <CardsSection
          cardsData={[
            {
              headline: t.firstContact.protocol4Headline,
              copyText: t.firstContact.protocol4Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
            {
              headline: t.firstContact.protocol5Headline,
              copyText: t.firstContact.protocol5Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
            {
              headline: t.firstContact.protocol6Headline,
              copyText: t.firstContact.protocol6Copy,
              logoSrc: "logoIcon",
              logoAlt: t.firstContact.protocolsLogoAlt,
            },
          ]}
        />

        {/* Quickstart */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.firstContact.protocolsLogoAlt}
          headline={t.firstContact.quickstartSepHeadline}
          subheadline={t.firstContact.quickstartSepSub}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div id="quickstart" className="mx-auto max-w-4xl px-4 pb-16">
          <div className="my-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {t.firstContact.phoneHeading}
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {t.firstContact.phoneBody}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary hover:underline"
                >
                  {t.firstContact.googlePlayLink}
                </a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a
                  href="https://apps.apple.com/us/app/cirisagent/id6758524415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary hover:underline"
                >
                  {t.firstContact.appStoreLink}
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {t.firstContact.desktopHeading}
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {t.firstContact.desktopBody}
              </p>
              <div className="mb-4 rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-green-400">
                pip install ciris-agent
              </div>
              <div className="mb-4 rounded-lg bg-gray-900 px-4 py-3 font-mono text-xs text-gray-300">
                <span className="text-gray-500"># Configure and run</span>
                <br />
                <span className="text-green-400">ciris-agent</span> start
                --template sage --verbose
              </div>
              <a
                href="/install"
                className="text-xs text-brand-primary hover:underline"
              >
                {t.firstContact.fullGuideLink}
              </a>
            </div>
          </div>
        </div>

        {/* The Accord */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={t.firstContact.protocolsLogoAlt}
          headline={t.firstContact.accordSepHeadline}
          subheadline={t.firstContact.accordSepSub}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="mx-auto max-w-3xl px-4 py-8 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {t.firstContact.accordBody}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/sections/main"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t.firstContact.accordCtaRead}
            </a>
            <a
              href="/how-it-works"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.firstContact.accordCtaHow}
            </a>
            <a
              href="/trust"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.firstContact.accordCtaTrust}
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <ImageHeroBlock
        className="my-8 min-h-[60vh] fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        logoSrc="logoIcon"
        logoAlt={t.firstContact.protocolsLogoAlt}
        headline={t.firstContact.ctaHeadline}
        subheadline={t.firstContact.ctaSubheadline}
        copyText={t.firstContact.ctaCopy}
        buttonText={t.firstContact.ctaButtonText}
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText={t.firstContact.ctaLinkText}
        linkHref="https://discord.gg/SWGM7Gsvrv"
      />

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
