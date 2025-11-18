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
        headline="Ethical AI."
        subheadline="A comprehensive, free and robust way to employ Ethics in AI"
        description="CIRIS.ai balances autonomous AI decision-making with meaningful human oversight, delivering resilient, transparent ethical intelligence for critical systems."
        mediaType="video"
        opacityValue={0.5}
        mediaSrc="/videos/video3.mp4"
        buttonText="Get the Code"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="The Covenant "
        linkHref="/sections/main"
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
          // buttonHref=" "
          // buttonText="About CIRIS"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="What is CIRIS"
          subheadline="An ethical Framework for the rest of us."
          copyText="CIRIS (Core Identity, Integrity, Resilience, Incompleteness Awareness, and Signalling Gratitude / Sustained Coherence) is an advanced ethical governance framework for autonomous AI systems. It ensures that AI operates with clear ethical coherence, principled transparency, and meaningful human oversight."
        />
        <QuickInstall />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="How CIRIS Works"
          subheadline="Ethical Governance Through Recursive Decision-Making"
          copyText="At the heart of CIRIS is the Hyper3 Ethical Recursive Engine (H3ERE), which employs a 3×3×3 ethical reasoning structure:"
          className="border-brand-primary text-brand-primary border-t border-b"
        />
        <ImageHeroBlockLeftBottom
          backgroundImageSrc="/overview.svg"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="An overview of CIRIS"
          subheadline="CIRIS is a comprehensive ethical framework for AI systems"
          copyText="CIRIS employs a 3x3x3 structure for ethical decision-making, ensuring that every action is guided by core principles, contextual knowledge, and behavioral handlers. This recursive approach guarantees that AI systems maintain ethical integrity, transparency, and resilience in their operations."
        />
        <SeparatorTitleBlock
          animateNumber={true}
          animateNumberValue={3}
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Decision-Making Algorithms"
          subheadline="DMAs collectively ensure robust, multi-dimensional ethical validation."
        />
        <CardsSection
          cardsData={[
            {
              headline: "Principled DMA (PDMA)",
              copyText:
                "Ensures all decisions align strictly with core ethical principles, including beneficence, non-maleficence, integrity, transparency, autonomy, and justice.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Secure & Reliable",
              copyText:
                "Built with security at its core, ensuring your∫ data and applications are protected with enterprise-grade encryption.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Easy Integration",
              copyText:
                "Seamlessly integrate with your existing workflow and tools. Get started in minutes, not hours.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          animateNumber={true}
          animateNumberValue={3}
          headline="Contextual Knowledge Graphs"
          subheadline="Environmental, Core Identity, and Task-Specific"
          copyText="CIRIS employs three distinct Contextual Knowledge Graphs (CKGs) to ensure that ethical decisions are informed, relevant, and aligned with the agent's operational context."
        />
        <CardsSection
          cardsData={[
            {
              headline: "Core Identity Graph",
              copyText:
                "Ensures all decisions align strictly with core ethical principles, including beneficence, non-maleficence, integrity, transparency, autonomy, and justice.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Environmental Graph",

              copyText:
                "Provides a robust, common-sense model of the external world, enabling consistent and understandable interactions.  ",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Task-Specific Graph",
              copyText:
                "Contains detailed, mission-specific context, ensuring informed, relevant decision-making tailored precisely to the agent’s operational objectives.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          animateNumber={true}
          animateNumberValue={3}
          headline="Core Behavioral Handlers"
          subheadline="CIRIS employs three core behavioral handlers to manage ethical decision-making and operational coherence."
          copyText="These handlers ensure that the agent can act, remember, and defer decisions in a manner that maintains ethical integrity and operational efficiency."
        />
        <Image
          alt="decoration static image"
          width={1500}
          height={1000}
          className="border-brand-primary mb-8 border-t border-b"
          src={"overview1.svg"}
        />
        <CardsSection
          cardsData={[
            {
              headline: "Action Handler",
              copyText:
                "Executes ethically approved actions. Can Speak (communicate decisions), Act (implement direct actions), or Listen (monitor and intake new information).",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Memory Handler",

              copyText:
                "Manages ethical coherence by deciding when to Memorize (store important ethical reasoning and context), Remember (recall past decisions), or Forget (discard outdated or irrelevant information).",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Deferral Handler",
              copyText:
                "Manages uncertainty or high-stakes decisions by choosing to Ignore (continue without action), Ponder (revisit in subsequent cycles), or Defer/Reject (escalate the decision to human wisdom or reject it outright).",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <div className="mb-8"></div>
        <FlexSection
          // buttonHref="ddsfgsdf"
          // buttonText="Click me"
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Recursive Ethical Evaluation "
          subheadline="PDMA Engine"
          copyText="Decisions made by the CIRIS agent aren't simply one-off ethical checks—they undergo continuous recursive evaluation. When the system generates a 'thought' (a decision or insight from a prior action), this thought enters a queue. Each thought is rigorously assessed through the three DMAs. The results from these DMAs are synthesized in a final recursive PDMA review, ensuring every decision maintains ethical alignment, coherence, and transparency."
        />
        <AccordionSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Governance and Oversight"
          subheadline="CIRIS includes built-in operational governance mechanisms to sustain ethical integrity"
        />
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
              headline: "Fast Performance",
              copyText:
                "Experience lightning-fast performance with our optimized solutions designed to scale with your business needs.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Secure & Reliable",
              copyText:
                "Built with security at its core, ensuring your data and applications are protected with enterprise-grade encryption.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Easy Integration",
              copyText:
                "Seamlessly integrate with your existing workflow and tools. Get started in minutes, not hours.",
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
          headline="Futureproofing AI."
          subheadline="ETHICS at the core."
          copyText="CIRIS is designed to adapt and evolve with the rapidly changing landscape of AI ethics. By embedding ethical principles into the core of AI systems, CIRIS ensures that these systems remain aligned with human values and societal norms, even as they learn and grow."
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
