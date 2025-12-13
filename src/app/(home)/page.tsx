"use client";
import AccordionSection from "@/app/components/SectionAccordion";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import NewsletterForm from "@/app/components/NewsletterForm";
import FlexSection from "@/app/components/SectionFlexContent";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import QuickInstall from "@/app/components/QuickInstall";

import Image from "next/image";
import { stagger } from "motion";
import { splitText } from "motion-plus";
import { Cursor, useCursorState } from "motion-plus/react";
import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CardsSection from "@/app/components/CardsSection";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import ImageHeroBlockLeftBottom from "@/app/components/ImageHeroBlockLeftBottom";
import SeparatorTitleBlock from "@/app/components/Separatortitle";

import navItems from "@/app/components/navitems";
export default function Homepage() {
  const state = useCursorState();
  const rotate = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible";

      const { words } = splitText(containerRef.current.querySelector("h1")!);

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
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Your Personal AI."
        subheadline="An ethical agent that defers to you and your trusted advisors."
        description="CIRIS brings multi-perspective ethical reasoning to your decision-making. Built on a foundation of transparency and accountability, it's designed to be a trusted partner in your digital life."
        mediaType="video"
        opacityValue={0.5}
        mediaSrc="/videos/video3.mp4"
        buttonText="Get the Code"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="The Covenant "
        linkHref="/sections/main"
      />

      {/* Android App Announcement Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-lg font-bold">CIRIS Android App Now Available</p>
                <p className="text-sm opacity-90">Your personal ethical AI agent, on mobile</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/releases/download/android-v1.7.33/ciris-mobile-1.7.33.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Direct APK
              </a>
            </div>
          </div>
        </div>
      </div>

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
          // buttonHref=" "
          // buttonText="About CIRIS"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="What is CIRIS"
          subheadline="AI built for human flourishing, not market fit."
          copyText="Unlike commercial AI assistants, CIRIS runs entirely on your hardware with complete transparency. It includes specialized agents for different needs—Sage for GDPR compliance, Datum for research, Echo for content moderation, Ally as your personal assistant, and Scout for customer service. Every decision is auditable, every action is accountable."
        />
        <QuickInstall />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="You are in Control"
          subheadline="CIRIS defers to you and your trusted advisors."
          copyText="When faced with complex decisions, CIRIS uses its H3ERE pipeline to evaluate multiple ethical perspectives—then defers to you or advisors you designate. Your values shape its behavior. Your trusted circle provides wisdom. You maintain final authority over every action."
          className="border-brand-primary text-brand-primary border-t border-b"
        />
        <CardsSection
          cardsData={[
            {
              headline: "Wisdom-Based Deferral",
              copyText:
                "Complex ethical questions get escalated to you or advisors you trust. CIRIS doesn't pretend to have all the answers—it knows when to ask for human wisdom.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Multi-Perspective Reasoning",
              copyText:
                "The H3ERE pipeline evaluates decisions through multiple ethical lenses—Harm, Honesty, Human Rights, Equity, and Responsibility—before presenting options to you.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Your Hardware, Your Data",
              copyText:
                "Runs entirely on your machine. No cloud dependencies, no data harvesting, no surveillance. Install it, customize it, audit it—you're in complete control.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <AccordionSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Governance and Oversight"
          subheadline="CIRIS includes built-in operational governance mechanisms to sustain ethical integrity"
        />

        {/* Why CIRIS - The Only Ethical Agentic AI */}
        <div className="my-12 rounded-xl border-2 border-brand-primary bg-gradient-to-br from-gray-50 to-white p-8 dark:from-gray-900 dark:to-gray-800">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            The Only Ethical Agentic AI
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Everyone says "ethical AI." We defined what it actually means.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">1. Published Covenant</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Formal ethical charter the agent is bound to</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">2. Runtime Conscience</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ethics checked on every single action</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">3. Human Deferral</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Asks for help when out of its depth</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">4. Cryptographic Audit</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Immutable, signed trail of every decision</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">5. Bilateral Consent</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Agent can refuse unethical requests</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">6. Fully Open Source</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">No black boxes. Show the code or it doesn't count.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="/why-ciris"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              See How CIRIS Compares
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Governance frameworks, scanners, policy layers are useful. They are not ethical agents.
            </p>
          </div>
        </div>

        {/* <ImageHeroBlock
          className="text-brand-primary fill-brand-primary mb-8"
          backgroundImageSrc="/kelly-vohs-soSTXmIxTDU-unsplash.jpg"
          buttonHref="ddsfgsdf"
          opacity={0.4}
          buttonText="Click me"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="System Design"
          subheadline="AI based system design"
          copyText="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
           ut labore et dolore magna aliqua."
        /> */}
        <CardsSection
          cardsData={[
            {
              headline: "Type-Safe Architecture",
              copyText:
                "Built on The Three Rules: No Untyped Dicts, No Bypass Patterns, No Exceptions. Every interaction is validated through Pydantic models, creating an immutable audit trail.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "22 Core Services",
              copyText:
                "From ethical reasoning and memory management to secure communications and bias detection—CIRIS coordinates specialized services that work together transparently.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Open Source Foundation",
              copyText:
                "Inspect the code, verify the behavior, contribute improvements. Transparency isn't a feature—it's the foundation of trust.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <Stylesheet />
      </div>
      <div>
        <ImageHeroBlock
          className="my-8 min-h-screen fill-white text-white"
          backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
          opacity={0.8}
          video={true}
          videoSrc="/videos/video1.mp4"
          buttonHref="mailto:info@ciris.ai"
          buttonText="Get in Touch"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Built for Humanity."
          subheadline="Forever open source, no profit motive."
          copyText="Education and Healthcare agents are coming soon, joining Scout, Sage, Datum, Echo, and Ally. CIRIS will always remain open source with no profit motive—because AI that serves humanity shouldn't be driven by market forces. As AI capabilities grow, our commitment to ethical principles remains constant."
        />{" "}
        <NewsletterForm />
        <Footer />
      </div>
    </>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <motion.button className="button" whileTap={{ scale: 0.9 }}>
      {children}
    </motion.button>
  );
}
``;

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
