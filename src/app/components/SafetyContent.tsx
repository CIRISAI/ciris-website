// Shared safety-page body, driven by a per-locale dictionary. Both the English
// root (src/app/safety/page.tsx) and the localized routes
// (src/app/[locale]/safety/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.

"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import HomeHeader from "@/app/components/HomeHeader";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default function SafetyContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const s = t.safety;

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
        headline={s.heroHeadline}
        subheadline={s.heroSubheadline}
        description={s.heroDescription}
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText={s.heroButtonText}
        buttonHref={s.heroButtonHref}
        linkText={s.heroLinkText}
        linkHref={s.heroLinkHref}
      />

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.longChatHeadline}
          subheadline={s.longChatSubheadline}
          copyText={s.longChatCopy}
        />

        <CardsSection
          cardsData={[
            {
              headline: s.card30MinHeadline,
              copyText: s.card30MinCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.card20MsgHeadline,
              copyText: s.card20MsgCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardReminderHeadline,
              copyText: s.cardReminderCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.emergencyStopSepHeadline}
          subheadline={s.emergencyStopSepSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.emergencyStopHeadline}
          subheadline={s.emergencyStopSubheadline}
          copyText={s.emergencyStopCopy}
          linkHref={s.emergencyStopLinkHref}
          linkText={s.emergencyStopLinkText}
        />

        <CardsSection
          cardsData={[
            {
              headline: s.cardActsBeforeThinkingHeadline,
              copyText: s.cardActsBeforeThinkingCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardHiddenTextHeadline,
              copyText: s.cardHiddenTextCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardAuthorizedKeyHeadline,
              copyText: s.cardAuthorizedKeyCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.rolesSepHeadline}
          subheadline={s.rolesSepSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.rolesHeadline}
          subheadline={s.rolesSubheadline}
          copyText={s.rolesCopy}
        />

        <CardsSection
          cardsData={[
            {
              headline: s.cardSignedCredHeadline,
              copyText: s.cardSignedCredCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardDeviceLoginHeadline,
              copyText: s.cardDeviceLoginCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardWiseAuthHeadline,
              copyText: s.cardWiseAuthCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.auditSepHeadline}
          subheadline={s.auditSepSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.auditHeadline}
          subheadline={s.auditSubheadline}
          copyText={s.auditCopy}
        />

        <CardsSection
          cardsData={[
            {
              headline: s.cardStoredThreeWaysHeadline,
              copyText: s.cardStoredThreeWaysCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardSignedAttributableHeadline,
              copyText: s.cardSignedAttributableCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardCoherenceRatchetHeadline,
              headlineHref: s.cardCoherenceRatchetHref,
              copyText: s.cardCoherenceRatchetCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.testingSepHeadline}
          subheadline={s.testingSepSubheadline}
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.testingHeadline}
          subheadline={s.testingSubheadline}
          copyText={s.testingCopy}
        />

        <CardsSection
          cardsData={[
            {
              headline: s.cardMentalHealthHeadline,
              copyText: s.cardMentalHealthCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardCapturedHedgesHeadline,
              copyText: s.cardCapturedHedgesCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardOpenCorpusHeadline,
              copyText: s.cardOpenCorpusCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.testingCurrentHeadline}
          subheadline={s.testingCurrentSubheadline}
          copyText={s.testingCurrentCopy}
        />

        <div className="my-8 flex flex-wrap justify-center gap-3">
          <a
            href={s.ctaCrowdsourcingHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            {s.ctaCrowdsourcing}
          </a>
          <a
            href={s.ctaAutomatedTestsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
          >
            {s.ctaAutomatedTests}
          </a>
          <a
            href={s.ctaOpenCorpusHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
          >
            {s.ctaOpenCorpus}
          </a>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt={s.logoAlt}
          headline={s.privacySepHeadline}
          subheadline={s.privacySepSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: s.cardSecretsFilteredHeadline,
              copyText: s.cardSecretsFilteredCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardSeeDeleteHeadline,
              copyText: s.cardSeeDeleteCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
            {
              headline: s.cardProcessedOnDeviceHeadline,
              copyText: s.cardProcessedOnDeviceCopy,
              logoSrc: "logoIcon",
              logoAlt: s.logoAlt,
            },
          ]}
        />

        <div className="my-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={s.footerCtaPapersHref}
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            {s.footerCtaPapers}
          </a>
          <a
            href={s.footerCtaHowItWorksHref}
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            {s.footerCtaHowItWorks}
          </a>
          <a
            href={s.footerCtaCompareHref}
            className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {s.footerCtaCompare}
          </a>
          <a
            href={s.footerCtaPrivacyHref}
            className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {s.footerCtaPrivacy}
          </a>
        </div>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-screen fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref={s.imageHeroButtonHref}
        buttonText={s.imageHeroButtonText}
        logoSrc="logoIcon"
        logoAlt={s.logoAlt}
        headline={s.imageHeroHeadline}
        subheadline={s.imageHeroSubheadline}
        copyText={s.imageHeroCopy}
      />

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
