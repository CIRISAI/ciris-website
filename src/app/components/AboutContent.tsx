// Shared /about body, driven by a per-locale dictionary. Both the English
// root (src/app/about/page.tsx) and the localized routes
// (src/app/[locale]/about/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>/<b>/<br>) are stored as HTML
// in the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.

"use client";
import AccordionSection from "@/app/components/SectionAccordion";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import NewsletterForm from "@/app/components/NewsletterForm";
import FlexSection from "@/app/components/SectionFlexContent";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";

import Image from "next/image";
import { stagger } from "motion";
import { splitText } from "motion-plus";
import { Cursor, useCursorState } from "motion-plus/react";
import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import CardsSection from "@/app/components/CardsSection";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import ImageHeroBlockLeftBottom from "@/app/components/ImageHeroBlockLeftBottom";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import CardsSectionImage from "@/app/components/CardsSectionImage";
import navItems from "@/app/components/navitems";

import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function AboutContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const about = t.about;

  const state = useCursorState();
  const rotate = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible";

      const h1 = containerRef.current.querySelector("h1");
      if (h1) {
        const { words } = splitText(h1);

        // Animate the words in the h1
        animate(
          words,
          { opacity: [0, 1], y: [10, 0] },
          {
            type: "spring",
            duration: 2,
            bounce: 0,
            delay: stagger(0.05),
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!state.targetBoundingBox) {
      /**
       * If we don't have a current target then we want to make an infinite
       * rotation animation. We do an infinite rotation between the current rotation
       * and +360 degrees.
       */
      animate(rotate, [rotate.get(), rotate.get() + 360], {
        duration: 17,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      /**
       * If we do have a target then we want to animate the rotation to
       * the nearest 180 degree angle. We can use 180 instead of 360 to minimise
       * the spin and because it doesn't visually matter if the cursor is upside down
       * for this effect. We could increase the spin by doing something like
       * (rotate.get() + minimumSpin) / 180
       */
      animate(rotate, Math.round(rotate.get() / 180) * 180, {
        type: "spring",
        bounce: 0.3,
      });
    }
  }, [state.targetBoundingBox]);

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
        headline={about.header.headline}
        subheadline={about.header.subheadline}
        mediaType="image"
        opacityValue={0.5}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
      />
      <div className="container min-h-screen max-w-7xl" ref={containerRef}>
        <Cursor
          magnetic={{ morph: false, snap: 0 }}
          matchTextSize={false}
          style={{ width: 4, height: 4 }}
          className="cursor"
        />
        <Cursor
          magnetic={{ snap: 0.9 }}
          style={{ rotate, width: 30, height: 30 }}
          variants={{
            pressed: {
              scale: state.targetBoundingBox ? 0.9 : 0.7,
            },
          }}
          className="reticule"
        >
          <>
            <Corner top={0} left={0} />
            <Corner top={0} right={0} />
            <Corner bottom={0} left={0} />
            <Corner bottom={0} right={0} />
          </>
        </Cursor>

        <FlexSection
          logoSrc="logoIcon"
          logoAlt={about.boardSection.logoAlt}
          headline={about.funding.headline}
          subheadline={about.funding.subheadline}
          copyText={about.funding.copyText}
        />

        <SeparatorTitleBlock
          animateNumber={true}
          animateNumberValue={2}
          logoSrc="logoIcon"
          logoAlt={about.boardSection.logoAlt}
          headline={about.boardSection.headline}
          subheadline={about.boardSection.subheadline}
        />
        <CardsSectionImage cardsData={about.boardMembers} />
        <SeparatorTitleBlock
          animateNumber={true}
          animateNumberValue={1}
          logoSrc="logoIcon"
          logoAlt={about.founderSection.logoAlt}
          headline={about.founderSection.headline}
          subheadline=""
        />

        <div className="xs:flex-column md:flex bg-ciris-vlback w-full rounded-xl overflow-hidden">
          <Image
            src="/eric.jpg"
            alt={about.founder.imageAlt}
            width={1000}
            height={1000}
            className="object-cover flex-12/12  md:flex-1/5"
          />
          <div className="flex-4/5 p-8">
            <h2 className="text-2xl font-bold mt-4">{about.founder.name}</h2>
            <p className="text-lg text-gray-700">{about.founder.title}</p>
            <p className="mt-2 text-gray-600">{about.founder.bio}</p>
          </div>
        </div>
        <Stylesheet />

        {/* Next steps */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="/vision"
            className="text-brand-primary hover:underline font-medium text-sm"
          >
            {about.links.vision}
          </a>
          <a
            href="/first-contact"
            className="text-brand-primary hover:underline font-medium text-sm"
          >
            {about.links.firstContact}
          </a>
          <a
            href="/mdd"
            className="text-brand-primary hover:underline font-medium text-sm"
          >
            {about.links.mdd}
          </a>
        </div>
      </div>
      <div>
        <ImageHeroBlock
          className="my-8 min-h-screen fill-white text-white"
          backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
          opacity={0.8}
          video={true}
          videoSrc="/videos/video1.mp4"
          buttonHref="mailto:info@ciris.ai"
          buttonText={about.hero.buttonText}
          logoSrc="logoIcon"
          logoAlt={about.hero.logoAlt}
          headline={about.hero.headline}
          subheadline={about.hero.subheadline}
          copyText={about.hero.copyText}
        />
        <NewsletterForm />
        <Footer locale={locale} />
      </div>
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}

function Corner({
  thickness = 1.5,
  length = 9,
  ...position
}: {
  thickness?: number;
  length?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}) {
  return (
    <>
      <motion.div
        layout
        className="corner"
        style={{
          width: thickness,
          height: length,
          ...position,
        }}
      />
      <motion.div
        layout
        className="corner"
        style={{
          width: length,
          height: thickness,
          ...position,
        }}
      />
    </>
  );
}

/**
 * ==============   Styles   ================
 */

function Stylesheet() {
  return (
    <style>
      {`

           .corner {
              background: var(--color-brand-primary);
              position: absolute;
            }

            .cursor {
              background-color: var(--color-brand-primary);
            }

            .reticule {
              background-color: transparent;
              border-radius: 0;
            }

            `}
    </style>
  );
}
