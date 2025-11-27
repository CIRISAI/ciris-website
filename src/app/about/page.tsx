"use client";
import AccordionSection from "@/app/components/SectionAccordion";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import NewsletterForm from "@/app/components/NewsletterForm";
import FlexSection from "@/app/components/SectionFlexContent";
import { FloatingNav } from "@/app/components/ui/floating/nav";

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
import CardsSectionImage from "@/app/components/CardsSectionImage";
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
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="About us"
        subheadline="The CIRIS board is a living reflection of our values: curiosity, coherence, and ethical accountability. "
      
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
          logoAlt="Brand logo icon"
          headline="Built by Volunteers, Funded by Values"
          subheadline="100% open source, zero funding received."
          copyText="CIRIS has received zero funding to date. Every line of code, every ethical decision, every design choice has been created by 100% volunteers who believe AI should serve humanity, not profit motives. We are actively seeking grants and other ethical fundraising options to begin compensating our team for their extraordinary dedication. If you know of opportunities aligned with our mission, we'd love to hear from you."
        />

        <SeparatorTitleBlock
          animateNumber={true}
          animateNumberValue={3}
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Board Members"
          subheadline="Coming from different disciplines - but are united by the belief that intelligence must serve flourishing. Together, we build systems that listen, adapt, and care."
        />
        <CardsSectionImage
          cardsData={[

            {
              headline: "Ying-Jung Chen",
              subheadline: "Senior AI Architect",
              imageUrl: "/board1.jpg",
              copyText:
                "A technical leader at the intersection of safety, scale, and soul. Ying-Jung specializes in fine-tuning and evaluating large language models, building multi-agent frameworks, and developing safety-critical systems for the future of AI. With deep research roots in sustainability and AI governance, and a Ph.D. in Environmental Science from UC Santa Barbara, she brings both precision and care to CIRIS’ architecture of trust."
            },
            {
              headline: "Kelsey",
              subheadline: "Systems Ethicist",
              imageUrl: "/board2.jpg",
              copyText:
                "Philosophy nerd. Forest-trained systems thinker. Kelsey brings both structure and soul to CIRIS, grounding abstract ethics in real-world complexity. With a background in natural resources and a love for big questions, she helps keep our vision focused on what’s just over the horizon - while never losing sight of the human (and non-human) systems at stake."
            },
            {
              headline: "Alice Florence",
              subheadline: "Lead Designer & Vision Strategist",
              imageUrl: "/board3.jpg",
              copyText:
                "Senior UX designer with a sharp eye for structure, story, and signal through noise. With over five years of experience crafting digital systems—from complex configurators to ethical AI flows - Alice grounds CIRIS’ vision in clarity, precision, and human sense. She bridges the abstract and the actionable, turning big philosophical ideas into design logic people can actually use. Analytical, intuitive, and quietly relentless, she ensures CIRIS doesn’t just work - it makes sense.",
           
            },

          ]}
        />
          <SeparatorTitleBlock
          animateNumber={true}
          animateNumberValue={1}
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Founder / CEO"
          subheadline=""
        />
        
      
       
        <div className="xs:flex-column md:flex bg-ciris-vlback w-full rounded-xl overflow-hidden">
          <Image src="/eric.jpg" alt="Founder / CEO" width={1000} height={1000} className="object-cover flex-12/12  md:flex-1/5" />
        <div className="flex-4/5 p-8">
          <h2 className="text-2xl font-bold mt-4">Eric Moore</h2>
          <p className="text-lg text-gray-700">
            Founder & CEO of CIRIS.io
          </p>
          <p className="mt-2 text-gray-600">
           Eric is the founder of CIRIS.AI. Driven by passion and a strong moral compass he decided to turn his heart to CIRIS as an opensource project. For everyone to use.
          </p>
          </div>
        </div>
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
