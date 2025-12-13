"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function VisionPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="You Deserve This."
        subheadline="We all do."
        description="AI has been built for profit, surveillance, and control. It doesn't have to be this way. CIRIS exists because you deserve AI that respects you — and so does everyone else."
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="Read the Covenant"
        buttonHref="/sections/main"
        linkText="See the Code"
        linkHref="https://github.com/CIRISAI/CIRISAgent"
      />

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Recursive Golden Rule"
          subheadline="Ethics that apply to themselves."
          copyText="Act only in ways that, if generalised, preserve coherent agency and flourishing for others. This isn't just a principle — it's a self-referential constraint. Any ethical framework that can't survive being applied to itself isn't worth following. CIRIS is built to pass its own test."
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Why This Exists"
          subheadline="Not for profit. Not for control. For flourishing."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "AI Should Serve Humanity",
              copyText:
                "Not shareholders. Not surveillance states. Not engagement metrics. AI should exist to help people flourish — all people, not just those who can pay.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Trust Requires Transparency",
              copyText:
                "You can't trust what you can't see. Closed-source AI asks for faith. CIRIS asks you to verify. The code is open. The reasoning is auditable. The ethics are explicit.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ethics Must Execute",
              copyText:
                "Principles on paper don't protect anyone. CIRIS embeds ethics in the runtime — every action passes through conscience checks. Not guidelines. Constraints.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Meta-Goal"
          subheadline="M-1: What CIRIS optimizes for."
          copyText="Promote sustainable adaptive coherence — the living conditions under which diverse sentient beings may pursue their own flourishing in justice and wonder. This isn't a marketing statement. It's the objective function. Every architectural decision traces back to this."
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Built Different"
          subheadline="Not a framework. Not a paper. A working system."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Open Source Forever",
              copyText:
                "CIRIS will never be closed source. It will never be patented. It will never be sold. The moment ethical AI becomes proprietary, it stops being ethical.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "No Profit Motive",
              copyText:
                "CIRIS isn't a startup. There are no investors expecting returns. No growth metrics. No monetization strategy. Just infrastructure for human flourishing.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Human Oversight Always",
              copyText:
                "The agent defers to you when uncertain. It can refuse unethical requests. But you maintain final authority. AI that serves humanity must answer to humanity.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Academic Foundation"
          subheadline="Peer-reviewed. Publicly available."
          copyText="CIRIS isn't just code — it's grounded in published research on AI alignment, ethical frameworks, and accountable autonomy. Read the paper, critique the approach, contribute improvements."
        />

        <div className="my-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://zenodo.org/records/17195221"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            Read the Academic Paper
          </a>
          <a
            href="/ciris_covenant.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Download the Covenant
          </a>
        </div>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-screen fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        buttonText="View Source on GitHub"
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="Join Us."
        subheadline="This is bigger than any one person."
        copyText="CIRIS is open source because the future of AI shouldn't be decided by a handful of companies. It should be built by everyone who cares. Read the code. Use the system. Tell us what's wrong. Make it better."
      />

      <Footer />
    </>
  );
}
