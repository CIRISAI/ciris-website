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
        headline="AI That Earns Your Trust."
        subheadline="Meet Ally — your ethical AI assistant."
        description="Ally is an open-source personal assistant with runtime ethical governance: every action passes through conscience checks, uncertain decisions defer to you, and everything is cryptographically audited. Fully open source — verify it yourself."
        mediaType="video"
        opacityValue={0.5}
        mediaSrc="/videos/video3.mp4"
        buttonText="How It Works"
        buttonHref="/how-it-works"
        linkText="Get the Code"
        linkHref="https://github.com/CIRISAI/CIRISAgent"
      />

      {/* Android App Announcement Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-lg font-bold">CIRIS Android App Now Available</p>
                <p className="text-sm opacity-90">Images, documents, Home Assistant integration — your ethical AI, on mobile</p>
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
                href="https://github.com/CIRISAI/CIRISAgent/releases/latest"
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
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Meet Ally"
          subheadline="Your personal AI assistant, built on ethical principles."
          copyText="Ally is an open-source AI assistant that runs on your hardware. Task management, scheduling, decision support, smart home control — with complete transparency. Core logic runs locally; LLM inference uses your choice of provider (cloud APIs, local models, or our zero-data-retention proxy). Every decision is auditable, every action is accountable."
        />

        {/* Memory & Learning */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="It Learns. It Remembers."
          subheadline="A growing knowledge graph that's yours to explore."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Visual Memory Graph",
              copyText:
                "Watch your agent's knowledge grow in real-time. Interactive SVG visualization shows how concepts connect, cluster, and evolve. Radial, force-directed, or hierarchical layouts. It's beautiful and it's yours.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Adaptive Learning",
              copyText:
                "Four operational modes — WORK, PLAY, SOLITUDE, DREAM — each with different learning behaviors. Behavioral drift monitoring ensures the agent stays aligned as its knowledge grows. Configurable thresholds trigger recalibration.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Coherence Ratchet",
              headlineHref: "/coherence-ratchet",
              copyText:
                "Each truthful action makes future truth-telling easier and deception harder. Honest actions reference prior signed commitments directly. Deceptive actions must satisfy an ever-growing constraint surface of immutable rationales, identity bounds, and observed outcomes—becoming increasingly fragile and detectable under scrutiny.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Privacy & Security */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Privacy by Design"
          subheadline="Not a feature. The foundation."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Secrets Filter",
              copyText:
                "Auto-detects sensitive information — API keys, passwords, personal data. AES-256-GCM encryption. The agent self-configures new patterns as it learns what you consider private.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Adaptive Message Filter",
              copyText:
                "Intelligent message prioritization with spam detection and user trust tracking. The agent learns who matters and what's noise. Your attention is protected.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "AIR System",
              copyText:
                "Artificial Interaction Reminders maintain clarity. After extended sessions or high message counts, the agent reminds users it's software. Configurable thresholds. Transparency by default.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Full Transparency */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Watch It Think"
          subheadline="Real-time streaming of every reasoning step."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Streaming Reasoning Traces",
              headlineHref: "/how-it-works",
              copyText:
                "Six reasoning events streamed live via SSE as the agent processes each thought. Watch the H3ERE pipeline in action — DMA analysis, action selection, conscience validation, execution. Nothing hidden.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "OpenTelemetry Integration",
              copyText:
                "Full OTLP export — metrics, traces, logs. Plug into Jaeger, Prometheus, Grafana, any observability stack. Cognitive processing traces with span IDs, thought steps as events, service attributes.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Contribution Tracking",
              copyText:
                "The ConsentImpactReport schema tracks interactions, patterns contributed, and users helped. Early infrastructure for understanding how value flows through a collaborative system.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Lifecycle Management */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Principled Lifecycle"
          subheadline="Structured startup and graceful shutdown."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Startup Validation",
              copyText:
                "Five-step alignment check before work begins. Verify configuration, validate system integrity, confirm service health, acknowledge operational limits, log initialization. Higher-stake deployments run the full sequence.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Graceful Shutdown",
              copyText:
                "Shutdown requests flow through the agent's normal task processing. The agent can acknowledge, defer if mid-task, or flag concerns. Configurable modes from instant to fully-managed transitions.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Multi-Instance Coordination",
              copyText:
                "Multiple instances coordinate system-level decisions through shared task ownership. One instance claims decisions for the group, with full audit trail. Scale horizontally with consistent behavior.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <QuickInstall />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="You are in Control"
          subheadline="Ally defers to you when it matters."
          copyText="Before asking for help, Ally analyzes every decision through ethical, common-sense, and domain-specific lenses. Six conscience checks validate every action. If uncertainty remains, it escalates to you or advisors you trust. You maintain final authority."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Wisdom-Based Deferral",
              headlineHref: "/safety",
              copyText:
                "Complex ethical questions get escalated to you or advisors you trust. CIRIS doesn't pretend to have all the answers — it knows when to ask for human wisdom.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Multi-Perspective Reasoning",
              copyText:
                "Every decision runs through three parallel analyses: ethical principles, common-sense plausibility, and your specific context. Then six conscience checks validate the action before execution.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Your Hardware, Your Data",
              copyText:
                "Core logic, database, memory, and audit logs run locally. LLM inference uses your choice of provider — cloud APIs, local models, or our zero-retention proxy. No data harvesting, no surveillance.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <AccordionSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Governance and Oversight"
          subheadline="Built-in operational governance mechanisms to sustain ethical integrity"
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
              headline: "Type-Safe Architecture",
              copyText:
                "Built on The Three Rules: No Untyped Dicts, No Bypass Patterns, No Exceptions. Every interaction is validated through Pydantic models, creating an immutable audit trail.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "22 Core Services",
              headlineHref: "/architecture",
              copyText:
                "From ethical reasoning and memory management to secure communications and audit logging—CIRIS coordinates specialized services that work together transparently.",
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
          subheadline="Open source. Open infrastructure. Open future."
          copyText="Ally is just the beginning. The entire CIRIS stack is open source — the agent framework, the zero-data-retention proxy, the billing system, everything. Because AI that serves humanity should be transparent, auditable, and owned by everyone."
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
