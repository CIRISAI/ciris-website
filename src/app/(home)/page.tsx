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
        headline="The Open Ethical AI Agent."
        subheadline="Install it. Inspect it. Compare it. Build with it."
        description="CIRIS is a free, open-source agent platform with a rich UI, visible reasoning, privacy-preserving tracing, and support across desktop, mobile, and pip. It is built to be inspectable, not taken on faith."
        supportingText="Available on iPhone, Android, desktop, and pip. Open source, free, privacy-preserving, and built for accountability."
        mediaType="video"
        opacityValue={0.55}
        mediaSrc="/videos/video3.mp4"
        buttonText="Install CIRIS"
        buttonHref="/install"
        linkText="See the Comparison"
        linkHref="/compare"
      />

      <div className="container max-w-7xl py-16">
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
          copyText="The safest agentic system is the one you can inspect. CIRIS makes reasoning visible, keeps the framework public, and uses privacy-preserving traces to measure the shape of behavior as systems scale."
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
                "See the public argument for why CIRIS is the safest and most ethical agentic option available.",
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
