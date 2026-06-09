// Shared vision body, driven by a per-locale dictionary. Both the English
// root (src/app/vision/page.tsx) and the localized routes
// (src/app/[locale]/vision/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>/<strong>/<code>/<a>) are stored
// as HTML in the dictionary and injected with dangerouslySetInnerHTML. The
// content is authored and machine-translated by us (never user input), so this
// is safe; translators are instructed to preserve the tags.

"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import HomeHeader from "@/app/components/HomeHeader";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function VisionContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const v = t.vision;

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
        headline={v.heroHeadline}
        subheadline={v.heroSubheadline}
        description={v.heroDescription}
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText={v.heroButtonText}
        buttonHref="/install"
        linkText={v.heroLinkText}
        linkHref="https://zenodo.org/records/20300773"
      />

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* 1. Name the nihilism */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec1Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec1H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>{v.sec1P1}</p>
            <p>{v.sec1P2}</p>
          </div>
        </section>

        {/* 2. The flawed premise */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec2Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec2H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p dangerouslySetInnerHTML={h(v.sec2P1)} />
            <p>{v.sec2P2}</p>
          </div>
        </section>

        {/* 3. The relational alternative */}
        <section className="mb-16 rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 px-6 py-8 md:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec3Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec3H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p dangerouslySetInnerHTML={h(v.sec3P1)} />
            <p>{v.sec3P2}</p>
          </div>
        </section>

        {/* 4. The corridor */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec4Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec4H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>{v.sec4P1}</p>
            <p dangerouslySetInnerHTML={h(v.sec4P2)} />
            <p dangerouslySetInnerHTML={h(v.sec4P3)} />
          </div>
        </section>

        {/* 5. Consent */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec5Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec5H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>{v.sec5P1}</p>
            <p dangerouslySetInnerHTML={h(v.sec5P2)} />
          </div>
        </section>

        {/* 6. CIRIS */}
        <section className="mb-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {v.sec6Eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {v.sec6H2}
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>{v.sec6P1}</p>
            <p dangerouslySetInnerHTML={h(v.sec6P2)} />
            <p>{v.sec6P3}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/first-contact"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {v.ctaFirstContact}
            </a>
            <a
              href="https://zenodo.org/records/20300773"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              {v.ctaCorridorDynamics}
            </a>
            <a
              href="/install"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {v.ctaInstall}
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {v.ctaSeeCode}
            </a>
          </div>
          <p
            className="mt-5 text-sm text-gray-500 dark:text-gray-400"
            dangerouslySetInnerHTML={h(v.moreDepthText)}
          />
        </section>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-[60vh] fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        logoSrc="logoIcon"
        logoAlt={v.closingLogoAlt}
        headline={v.closingHeadline}
        subheadline={v.closingSubheadline}
        copyText={v.closingCopy}
        buttonText={v.closingButtonText}
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
      />

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
