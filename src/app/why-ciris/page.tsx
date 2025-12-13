"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function WhyCirisPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="What Is Ethical Agentic AI?"
        subheadline="Everyone says they're building ethical AI."
        description="Almost nobody can point to where, exactly, the ethics live in the stack. For CIRIS, ethical agentic AI isn't branding. It's a strict technical definition with six non-negotiable requirements."
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
                "Every meaningful action must pass through an internal conscience pipeline before execution. Speaking, invoking tools, changing memory. Not a post-hoc filter. Part of the operational loop. Every. Single. Action.",
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
