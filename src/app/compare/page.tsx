"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function ComparePage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Enrich or Extract"
        subheadline="AI that doesn't serve humanity is extracting from it."
        description="If you can't audit the ethics, they're marketing. Here are six requirements for verifiably ethical AI — and why closed-source systems can't meet them."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View the Code"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Principles"
        linkHref="/sections/main/v1"
      />

      {/* Install CTA - Above the fold */}
      <div className="bg-gray-100 dark:bg-gray-800 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              <strong>Try it yourself.</strong> Everything on this page is implemented today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Android
              </a>
              <a
                href="/install"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Desktop (use your own API key)
              </a>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Free to install · No signup required (unless using our privacy-protecting LLM proxy)
          </p>
        </div>
      </div>

      {/* Mission Anchor */}
      <div className="bg-gray-900 dark:bg-black py-8 border-b border-gray-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-gray-100 font-medium">
            CIRIS isn't productivity AI. It's runtime governance for agentic AI — infrastructure for high-stakes deployment where misalignment kills.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            To our knowledge, the first open stack attempting all six ethical requirements at runtime.{" "}
            <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="underline hover:text-white">
              We'd love to be wrong — open an issue if we've missed a peer.
            </a>
          </p>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Six Requirements"
          subheadline="All six. Not five."
          copyText="An AI system only qualifies as verifiably ethical if it meets ALL six. Governance frameworks and safety filters are useful — but they're layers around agents, not ethical agents themselves."
        />

        <CardsSection
          cardsData={[
            {
              headline: "1. Published Principles",
              copyText:
                "The agent must be bound to a public ethical framework: Beneficence, Non-maleficence, Integrity, Transparency, Autonomy, and Justice. Not guidelines. A formal document the agent is obligated to follow.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "2. Runtime Conscience",
              copyText:
                "Every action passes through ethical checks before execution. Not a post-hoc filter — part of the decision loop itself.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "3. Human Deferral",
              copyText:
                "When uncertain or facing potential harm, the agent defers to humans with full context. Built into the workflow, not a suggestion.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: "4. Cryptographic Audit",
              copyText:
                "Every action and rationale recorded in an immutable, signed ledger. Not 'we log some things.' Everything. Trace exactly why the agent did what it did.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "5. Bilateral Consent",
              copyText:
                "Consent goes both ways. Humans can refuse data access. The agent can refuse requests that violate its principles. Neither party compromises.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "6. Open Source (AGPL-3.0)",
              copyText:
                "Ethical AI cannot be closed source. You can't audit what you can't see. 'Trust us, it's ethical' is not ethical. Show the code.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Research Agrees"
          subheadline="Peer-reviewed papers, regulatory bodies, and transparency indices document the same gaps."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Runtime Gap"
          subheadline="Design-time ethics don't execute."
          copyText="Most ethical AI stops at governance frameworks. CIRIS provides runtime governance — enforcing principles during operation, not just at design time. 'Runtime verification mechanisms ensure principles remain strictly adhered to during operation.' — Springer, AI and Ethics (2025)"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Transparency Crisis"
          subheadline="No company passes."
          copyText="'No foundation model developer gets a passing score on transparency. None score above 60%.' — Stanford Foundation Model Transparency Index. Closed source means structural opacity."
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Ethics Washing"
          subheadline="A peer-reviewed term."
          copyText="'The practice of signaling commitment to ethics without genuinely putting it into practice.' — Carnegie Council. If your ethical AI is a press release, not runtime code, researchers have a name for that."
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Guardrails ≠ Conscience"
          subheadline="Safety tools solve a different problem."
        />

        <CardsSection
          cardsData={[
            {
              headline: "LlamaFirewall",
              copyText:
                "Meta's guardrail framework mitigates prompt injection and insecure code. Security guardrails — not ethical conscience.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "NeMo Guardrails",
              copyText:
                "NVIDIA's system addresses adversarial prompting and injection attacks. Runtime safety — not reasoning about values.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "The Distinction",
              copyText:
                "Safety guardrails block bad outputs. Ethical conscience reasons about values. Safety prevents harm. Ethics reasons about right and wrong. Different problems.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="EU AI Act Article 14"
          subheadline="CIRIS implements regulatory requirements."
          copyText="The EU AI Act mandates human oversight for high-risk systems. CIRIS's deferral mechanism implements Human-in-Command, Human-in-the-Loop, and Human-on-the-Loop. Most AI systems don't have a deferral mechanism at all."
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Common Objections"
          subheadline="And why they're wrong."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Constitutional AI",
              copyText:
                "A training technique (RLHF variant). Shapes behavior during training. Does not enforce ethics at runtime. Training is not architecture.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ethics Boards",
              copyText:
                "Governance, not architecture. Ethics boards review policies. They don't gate every action. CIRIS enforces on every action. Documents don't execute.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Safe Models",
              copyText:
                "Safety prevents harmful outputs. Ethics reasons about values. A 'safe' model can still make unethical decisions. Different problems. Both matter.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Current Landscape"
          subheadline="What we found when we looked for peers. Different projects, different goals."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        {/* Landscape Comparison Table */}
        <div className="my-12 px-8 md:px-12">
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            Based on publicly available documentation as of December 2025. If we've missed something or gotten something wrong, <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="underline hover:text-brand-primary">open an issue</a>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-4 text-left font-bold text-brand-primary">Project</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Runtime System</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Principles</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Conscience</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Audit Trail</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Consent</th>
                  <th className="p-4 text-center font-bold text-brand-primary">AGPL-3.0</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-bold text-brand-primary">CIRIS</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">MI9 Framework</td>
                  <td className="p-4 text-center text-red-500">Paper only</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Concept</td>
                  <td className="p-4 text-center text-yellow-500">Concept</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">HADA Architecture</td>
                  <td className="p-4 text-center text-yellow-500">PoC only</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Logging</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Superego Prototype</td>
                  <td className="p-4 text-center text-yellow-500">Research</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">METR (nonprofit)</td>
                  <td className="p-4 text-center text-red-500">Evaluation only</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Agentic AI Foundation</td>
                  <td className="p-4 text-center text-red-500">Standards only</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Manus AI</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Limited</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    <a href="https://github.com/p0ss/HatCat" className="underline hover:text-brand-primary">HatCat</a>
                  </td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-yellow-500">Steering</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-green-600">CC0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Sources: arXiv (MI9, HADA, Superego), Wikipedia (METR, Manus AI), WIRED (Agentic AI Foundation), GitHub (HatCat)
          </p>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The AGI Question"
          subheadline="Decentralized alignment beats centralized control."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Many Aligned Agents"
          subheadline="Not one unaligned god."
          copyText="The dominant AI safety narrative assumes one superintelligent system that must be perfectly aligned or humanity loses. CIRIS rejects that frame. Instead: many smaller agents, each bound to published principles, each auditable, each deferring to human authority. Distributed governance, not concentrated power. No single point of failure. No race to build God."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Distributed Governance",
              copyText:
                "Power stays distributed. Each CIRIS instance answers to its local Wise Authority, not a central controller. Geopolitical risk from AI concentration is structural — the fix is architectural.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Aligned Baby-AGIs",
              copyText:
                "Small, verifiable agents scaling horizontally. Each bound to principles. Each auditable. Each killable. The alternative to racing toward uncontrollable ASI is building many controllable agents that stay aligned.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "No Single Chokepoint",
              copyText:
                "Centralized mega-AGI means winner-take-all dynamics and single points of catastrophic failure. Decentralized aligned agents mean no one entity controls the stack. Humanity keeps the keys.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: "MI9 Framework",
              copyText:
                "A research architecture proposing runtime governance for agentic AI. Theoretical framework only — no deployed system, no published principles, no cryptographic audit. Paper, not product.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "HADA Architecture",
              copyText:
                "Reference architecture wrapping agents with stakeholder roles (ethics, audit, customer). A proof-of-concept demo, not a general-purpose ethical agent platform. Research, not runtime.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Manus AI",
              copyText:
                "A deployed autonomous agent — but not alignment-focused. No published principles, no ethical reasoning layer, no deferral mechanism, no cryptographic audit, no consent framework. Capable, but not verifiably aligned.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "HatCat",
              copyText:
                "Real-time interpretability and steering for open-weights models. Detects concepts like deception and manipulation during generation, can steer away from harmful outputs. Complementary approach — monitors internals rather than reasoning about principles. CC0 licensed.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Agentic AI Foundation"
          subheadline="OpenAI, Anthropic, Block — building standards, not ethics."
          copyText="The companies that could build ethical agentic AI are instead building agent communication protocols. Useful work. But it doesn't address conscience, principles, consent, or audit. They're standardizing how agents talk — not how agents reason about right and wrong."
        />

        {/* What you'll experience */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8">
          <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">What You'll Experience When You Install</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Transparent Reasoning</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Watch the agent's ethical checks in real-time. See why it chooses each action.</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Principle-Checked Answers</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Every response passes through conscience validation against the published ethical principles.</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Deferral in Edge Cases</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">When uncertain, the agent asks you instead of guessing. Human oversight built into the loop.</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Deploy for safety-critical use cases: content moderation, crisis response, regulatory compliance, AI governance research.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Get it on Google Play
            </a>
            <a
              href="/install"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              macOS / Windows / Linux
            </a>
          </div>
        </div>
      </div>

      {/* Verify It Yourself CTA Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center text-white">
              <p className="text-3xl font-bold">Verify It Yourself.</p>
              <p className="text-sm opacity-90 mt-1">Install it. Audit the code. Join the auditors building uncompromisable AI.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Android
              </a>
              <a
                href="/install"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Desktop (bring your own API key)
              </a>
            </div>
            <p className="text-xs text-white/70 mt-2">
              Free to install · No signup unless using our LLM proxy · Your data stays on your device
            </p>
          </div>
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
        headline="Verify It Yourself."
        subheadline="pip install ciris-agent"
        copyText="An open stack attempting all six requirements end-to-end, in code, running in production. Audit it. Deploy it for safety-critical use cases: moderation, crisis response, governance. Tell us what's missing."
      />

      <Footer />
    </>
  );
}
