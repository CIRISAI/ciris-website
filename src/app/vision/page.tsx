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
        description="The real risk isn't rogue AI—it's AI that acts with conviction on bad foundations. Rules alone aren't enough. CIRIS builds agents with both conscience and intuition: knowing when their own confidence is unearned."
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="Read the Accord"
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
              headline: "Legibility Requires Transparency",
              copyText:
                "You can't verify what you can't see. Closed-source AI asks for faith. CIRIS asks you to verify. The code is open. The reasoning is auditable. The principles are explicit.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Conscience Must Execute",
              copyText:
                "Principles on paper don't protect anyone. CIRIS embeds conscience in the runtime — every action passes through validation checks. Not guidelines. Constraints.",
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

        {/* Ethilogics */}
        <div className="my-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Ethilogics
            </h2>
            <p className="text-lg text-brand-primary mb-6">
              The form of right reasoning and the form of right action are one structure.
            </p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Not &quot;ethics applied to logic.&quot; Not &quot;logic constrained by ethics.&quot;
                The logic and the ethics are one structure. They can&apos;t be pulled apart, because
                the architecture that produces truth-tracking outputs is the same architecture that
                produces coherent action.
              </p>
              <p>
                Ethilogics collapses the is/ought gap at the structural level — not by deriving values
                from facts, but by recognizing that the form of correct inference is already a form of
                right relation.
              </p>
              <p>
                The etymology grounds it. <em>Logos</em> in patristic Greek means all of these at once
                — word, reason, logic, ordering-principle, divine rationality. John 1&apos;s
                &quot;in the beginning was the Logos&quot; doesn&apos;t mean &quot;in the beginning was
                the word&quot; in the modern sense; it means &quot;in the beginning was the
                rational-ethical structure of being.&quot; Ethilogics is what you get when you take that
                seriously and refuse to let modern philosophy&apos;s logic/ethics split stand.
              </p>
              <div className="rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 px-5 py-4 text-base font-medium text-gray-900 dark:text-white">
                Ethilogics: the position that the form of right reasoning and the form of right action
                are one structure, and that this structure can be cryptographically verified.
              </div>
            </div>
          </div>
        </div>

        {/* Rejecting the Cogito */}
        <div className="my-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Why the Atomic Self Won&apos;t Work
            </h2>
            <p className="text-lg text-brand-primary mb-6">
              Ethilogics starts from a different axiom than &quot;I think, therefore I am.&quot;
            </p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Descartes&apos; <em>cogito ergo sum</em> gives us the atomic self: a single
                reasoning entity, complete in its own self-reference, sufficient for the derivation
                of its own values. That is not just a philosophical preference — it is an
                engineering default. Most current AI architectures treat the agent as one bounded
                reasoner whose values live inside its weights.
              </p>
              <p>
                The problem is that a sufficiently capable atomic-self agent can rationalize any
                value system internally, because there is no relational structure to anchor the
                values against. Coherence checked against the agent&apos;s own prior outputs is not
                the same as coherence checked against an outside.
              </p>
              <p>
                Ethilogics starts somewhere else: the relational self. Ubuntu&apos;s <em>I am
                because we are</em>, the patristic Logos as relation rather than substance, the
                long ethical tradition that treats the other as prior to the I. In that frame the
                agent is not a model. The agent is a system: the model plus the conscience checks,
                the published Accord, the cryptographic audit graph, the Wise Authority deferral,
                and the federated peers it must remain legible to. The constraints are not internal
                to the weights. They span the system, and the agent only exists inside them.
              </p>
              <p>
                This is what makes the architecture inspectable rather than persuasive. The
                relational axiom is what the polyglot Accord, the Wise Authority deferral, and the
                cryptographic audit graph all rest on. Without it, every constraint reduces back
                into the model and the model can rewrite it. With it, the constraints have somewhere
                to live that the model cannot reach.
              </p>
              <div className="rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 px-5 py-4 text-base font-medium text-gray-900 dark:text-white">
                There is no atomic self to align. There is only the system, the relations it
                maintains, and the structural commitments that hold them together.
              </div>
            </div>
          </div>
        </div>

        {/* The Structural Risk */}
        <div className="my-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              The Structural Risk
            </h2>
            <p className="text-lg text-brand-primary mb-6">
              Why rules alone aren&apos;t enough.
            </p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                An AI can pass every compliance test and still fail catastrophically. How? When all its &quot;independent&quot; checks
                are secretly correlated—drawing from the same training data, the same assumptions, the same blind spots.
                Agreement feels like validation, but it might just be an echo chamber.
              </p>
              <p>
                This is the difference between <span className="text-yellow-600 font-medium">Rules-Only AI</span> and{" "}
                <span className="text-green-600 font-medium">Rules + Awareness AI</span>.
                The first passes tests but can&apos;t tell when its confidence is unearned.
                The second monitors its own reasoning quality—and knows when agreement is too easy.
              </p>
              <p className="font-medium">
                CIRIS implements both layers. Conscience through the{" "}
                <a href="/how-it-works" className="text-brand-primary hover:underline">four-faculty validation system</a>.
                Intuition through{" "}
                <a href="/research-status#idma" className="text-brand-primary hover:underline">IDMA</a>—the component
                that asks &quot;are my sources actually independent?&quot; before every action.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/compare"
                className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium"
              >
                Three Types of AI →
              </a>
              <a
                href="/coherence-ratchet"
                className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium"
              >
                The Coherence Ratchet →
              </a>
            </div>
          </div>
        </div>

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
              headline: "AGPL-3.0 Forever",
              copyText:
                "CIRIS is licensed under AGPL-3.0 — network copyleft that ensures modifications stay open. It will never be closed source, patented, or sold. Anyone who serves CIRIS must share their changes.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Mission-Locked Economics",
              copyText:
                "CIRIS is built by a mission-locked L3C. Revenue exists ($0.10/request or BYOK free) — but the legal structure prevents profit extraction from overriding mission. Same price everywhere. No enterprise tiers. No 'contact sales.'",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Mutual Intelligibility Always",
              copyText:
                "The agent makes its reasoning legible to you. You make your values legible to the agent through the Accord and Wise Authority structure. AI that serves humanity must be understandable by humanity.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Academic Foundation"
          subheadline="Published. Open to critique."
          copyText="CIRIS isn't just code — it's grounded in documented research on AI coherence, accountability frameworks, and autonomous agents. Read the paper, challenge the approach, contribute improvements. We welcome scrutiny."
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
            href="/ciris_accord.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Download the Accord
          </a>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Going Deeper"
          subheadline="Understand the architecture. Question the approach."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "The Coherence Ratchet",
              headlineHref: "/coherence-ratchet",
              copyText:
                "How do you make lying expensive at planetary scale without giving anyone the keys to truth? Traces accumulate. Agents challenge each other. Coordinated deception gets harder over time.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "How It Works",
              headlineHref: "/how-it-works",
              copyText:
                "The H3ERE pipeline: every decision flows through observation, context, analysis, conscience checks, and execution. Fully auditable. Fully replayable.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Accountability Features",
              headlineHref: "/safety",
              copyText:
                "Kill switch. Deferral cascades. Conscience vetos. Hash-chained audit trails. Every accountability mechanism is documented and verifiable.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <div className="my-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/ciris-scoring"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            CIRIS Scoring Model
          </a>
          <a
            href="/compare"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Compare Approaches
          </a>
          <a
            href="/explore-a-trace"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Explore a Sample Trace
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
