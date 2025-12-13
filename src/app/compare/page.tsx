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
        description="Closed source AI asks for faith. You can't audit what you can't see. If the ethics are proprietary, they're marketing. Here are six requirements for verifiably ethical AI — and why closed-source systems can't demonstrate they meet them."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View the Code"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Covenant"
        linkHref="/sections/main"
      />

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Six Requirements"
          subheadline="All six. Not five. Six."
          copyText="An AI system only qualifies as ethical agentic AI if it meets ALL of the following requirements. Governance frameworks, security scanners, and policy constraints are useful — but they are not ethical agents. They're layers around agents, not agents themselves."
        />

        <CardsSection
          cardsData={[
            {
              headline: "1. Published Covenant",
              copyText:
                "The agent must be explicitly bound to a publicly available ethical charter with a meta-goal and foundational principles. Not guidelines. Not values we care about. A formal covenant the agent is obligated to follow.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "2. Runtime Conscience",
              copyText:
                "Speaking, tool use, memory writes, and reflection pass through four conscience checks before execution. Passive actions (recall, observe) and terminal actions (defer, reject) are exempt. Part of the operational loop, not a post-hoc filter.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "3. Human Deferral",
              copyText:
                "When the agent encounters uncertainty, conflicting values, or potential harm, it must defer to human oversight with full context. Built-in workflow, not a design-time suggestion. It knows when to ask for help.",
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
                "Every action, every rationale, every decision must be recorded in an immutable, signed ledger. Not 'we log some things.' Everything. Verifiable at any time. You should be able to trace exactly why the agent did what it did.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "5. Bilateral Consent",
              copyText:
                "Consent is symmetric. Humans can refuse data access. But the agent can also refuse partnerships or data collection if it would violate its ethical constraints. The agent has principles it won't compromise.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "6. Fully Open Source",
              copyText:
                "Ethical AI cannot be closed source. It cannot be patented. You cannot audit compliance when the implementation is hidden. 'Trust us, it's ethical' is not ethical. Show the code or it doesn't count.",
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
          copyText="'Inviolable constraints can be embedded within the AI's decision-making architecture... Runtime verification and enforcement mechanisms ensure that the principles remain strictly adhered to during operation.' — Springer, AI and Ethics (2025). Most ethical AI work stops at governance frameworks and design-time principles. CIRIS enforces at runtime."
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Transparency Crisis"
          subheadline="No company passes."
          copyText="'No foundation model developer gets a passing score on transparency. None of the 10 companies score more than 60%.' — Stanford Foundation Model Transparency Index. Open developers consistently score higher. Closed source means structural opacity. You cannot verify what you cannot see."
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Ethics Washing"
          subheadline="A peer-reviewed term."
          copyText="'Ethics washing refers to the practice of signaling a commitment to ethics without genuinely having such a commitment or sufficiently putting it into practice.' — Carnegie Council for Ethics in International Affairs. If your ethical AI is a press release and not a runtime constraint, researchers have a name for that."
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
                "Meta's open-source 'security focused guardrail framework... mitigates prompt injection, agent misalignment, insecure code.' Security guardrails. Not ethical conscience.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "NeMo Guardrails",
              copyText:
                "NVIDIA's system to 'address risks at inference time, such as adversarial prompting, prompt injection attacks.' Runtime safety. Not normative reasoning about values.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "The Distinction",
              copyText:
                "Safety guardrails prevent specific bad outputs. CIRIS has an ethical conscience that reasons about values on every action. Safety prevents harm. Ethics reasons about right and wrong. Different problems.",
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
          copyText="'High-risk AI systems must be designed... that they can be effectively overseen by natural persons during the period in which they are in use.' The EU AI Act mandates human oversight. CIRIS's Wise Authority deferral mechanism directly implements Human-in-Command, Human-in-the-Loop, and Human-on-the-Loop requirements. Most AI systems don't have a deferral mechanism at all."
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
                "Constitutional AI is a training technique (an RLHF variant). It shapes model behavior during training. It does not enforce ethical constraints at runtime. Training is not architecture.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ethics Boards",
              copyText:
                "That's governance, not architecture. Ethics boards don't gate every action the agent takes. They review policies. CIRIS enforces on every verb. Governance documents don't execute.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Safe Models",
              copyText:
                "Safety is not ethics. Safety prevents harmful outputs. Ethics reasons about values and tradeoffs. You can have a 'safe' model that makes unethical decisions. Different problems. Both matter.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Current Landscape"
          subheadline="As of December 2025, we haven't found another system meeting all six."
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
                  <th className="p-4 text-center font-bold text-brand-primary">Covenant</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Conscience</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Audit Trail</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Consent</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Open Source</th>
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
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Sources: arXiv (MI9, HADA, Superego), Wikipedia (METR, Manus AI), WIRED (Agentic AI Foundation)
          </p>
        </div>

        <CardsSection
          cardsData={[
            {
              headline: "MI9 Framework",
              copyText:
                "A research architecture proposing runtime governance for agentic AI. Theoretical framework and protocol only — no deployed system, no normative covenant, no cryptographic audit. Paper, not product.",
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
                "A real deployed autonomous agent — but not alignment-focused. No published covenant, no documented ethical reasoning layer, no public deferral mechanism, no cryptographic audit trail, no bilateral consent framework. Capable, but not verifiably aligned.",
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
          copyText="The companies that could build ethical agentic AI are instead building agent communication protocols and interoperability standards. Useful work. But it doesn't address conscience, covenant, consent, or audit. They're standardizing how agents talk to each other — not how agents reason about right and wrong."
        />
      </div>

      {/* Prove Us Wrong CTA Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3 text-white text-center sm:text-left">
              <div>
                <p className="text-2xl font-bold">Prove Us Wrong.</p>
                <p className="text-sm opacity-90">Install it. Read the code. Tell us what's missing.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </a>
              <a
                href="/install"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                All Platforms
              </a>
            </div>
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
        headline="Prove Me Wrong."
        subheadline="pip install ciris-agent"
        copyText="If there's another stack that does all six end-to-end, in code, running in production — I want to see it. Until then, try it. Read the code. Tell me it's wrong. That's how this works."
      />

      <Footer />
    </>
  );
}
