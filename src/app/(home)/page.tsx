"use client";

import Footer from "@/app/components/Footer";
import HomeHeader from "@/app/components/HomeHeader";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import NewsletterForm from "@/app/components/NewsletterForm";
import QuickInstall from "@/app/components/QuickInstall";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function Homepage() {

  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Coordination has a shape."
        subheadline="A free ChatGPT alternative you can actually check, in your language, on your phone."
        description="We found it, and built CIRIS to hold it. An open, auditable AI agent with visible reasoning, privacy-preserving traces, and a public ethical framework. On iPhone, Android, desktop, and pip."
        supportingText="Open source, free, privacy-preserving, and built for accountability."
        mediaType="video"
        opacityValue={0.55}
        mediaSrc="/videos/video3.mp4"
        buttonText="Install CIRIS"
        buttonHref="/install"
        linkText="See the Comparison"
        linkHref="/compare"
      />

      {/* Mobile install badges: surface the most-clicked action directly under the hero */}
      <div className="container max-w-7xl pt-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Get it now:</p>
          <a
            href="https://apps.apple.com/us/app/cirisagent/id6758524415"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.193 12l2.505-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302L5.864 2.658z" />
            </svg>
            Google Play
          </a>
          <a
            href="/install"
            className="text-sm text-brand-primary hover:underline"
          >
            or install on desktop →
          </a>
        </div>
      </div>

      <div className="container max-w-7xl py-16">
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="What CIRIS Agent Does"
          subheadline="Use it instead of ChatGPT or Gemini. Open-source, auditable, multilingual, and plugs into your home."
          copyText="Ask it the things you'd ask any AI assistant. The difference is you can see exactly how it reasoned, verify it didn't drift from a public ethical framework, and run it on a phone in 228 megabytes. Plug it into Home Assistant for fully open-source home control. Production deployments today include a Discord moderation bot and mobile apps across 29 languages."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Replace ChatGPT or Gemini",
              headlineHref: "/install",
              copyText:
                "An open-source assistant for the questions you'd otherwise put to a closed-source model. Polyglot across 29 languages (including low-resource ones) and runs in 228 MB on a commodity Android phone.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Watch it think",
              headlineHref: "/explore-a-trace",
              copyText:
                "Every decision is signed, replayable, and inspectable. Four conscience faculties evaluate each action before it executes. The reasoning trace is part of the product, not buried.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Run your home, your way",
              headlineHref: "/integrations",
              copyText:
                "Plugs into Home Assistant for fully open-source home control. Discord moderation bot in production today. CLI, HTTP API, and SQL adapters available. MCP, weather, and navigation integrations on the way.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Choose Your Path"
          subheadline="Start from your reason for being here."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Install the Agent",
              headlineHref: "/install",
              copyText:
                "Get CIRIS running through pip, desktop, or mobile. Use a model you trust. Keep your data under your control.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Inspect the Accord",
              headlineHref: "/sections/main",
              copyText:
                "Read the public ethical framework behind the runtime. Principles are explicit, published, and open to scrutiny.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Work with the Platform",
              headlineHref: "/services",
              copyText:
                "Use the hosted path, mobile apps, and platform surfaces when you want to evaluate, integrate, or deploy faster.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Why CIRIS"
          subheadline="The thesis is simple."
          copyText="An agentic system you can inspect is easier to keep accountable than one you can't. CIRIS makes reasoning visible, keeps the framework public, and uses privacy-preserving traces to measure the shape of behavior as systems scale."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Safer by Design",
              headlineHref: "/compare",
              copyText:
                "We make the safety claim in public and put it next to alternatives. Completion corridors, refusal boundaries, and behavioral evidence are all inspectable.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Open and Free",
              headlineHref: "/vision",
              copyText:
                "The app and framework are open source and free. The trust model is meant to survive commercial pressure, not depend on it.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Measured in the Open",
              headlineHref: "/research-status",
              copyText:
                "Privacy-preserving trace schemas and a live compendium let outsiders inspect aggregate behavior without exposing private reasoning content.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Proof Surfaces"
          subheadline="If you want evidence, start here."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Compare",
              headlineHref: "/compare",
              copyText:
                "See the public case for why CIRIS is the safest and most ethical AI in production today, checked against other approaches, with the receipts.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Research Status",
              headlineHref: "/research-status",
              copyText:
                "Read what the current trace corpus supports, what we are learning, and how the public research loop works.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Explore a Trace",
              headlineHref: "/explore-a-trace",
              copyText:
                "Inspect a concrete example of how the runtime reasons, checks itself, and decides to act or defer.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Researchers: deep dives are linked from /research-status; the
            homepage stays product-first. */}
        <div className="mt-12 mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span>For researchers:</span>
          <a href="/coherence-collapse-analysis" className="text-brand-primary hover:underline">
            Coherence Collapse Analysis
          </a>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <a href="/research-status" className="text-brand-primary hover:underline">
            Research status
          </a>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <a href="/federation" className="text-brand-primary hover:underline">
            Federation (3.X plan)
          </a>
        </div>

        <QuickInstall />
      </div>

      <ImageHeroBlock
        className="my-8 min-h-[70vh] fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref="mailto:info@ciris.ai"
        buttonText="Work With CIRIS"
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="Built to Be Inspected."
        subheadline="Open source agent runtime. Public framework. Live evidence surfaces."
        copyText="If you want to use the agent, read the Accord, or evaluate the platform with us, the shortest path is now visible from the homepage."
        linkHref="/sections/main"
        linkText="Read the Accord →"
      />

      <NewsletterForm />
      <Footer />
    </>
  );
}
