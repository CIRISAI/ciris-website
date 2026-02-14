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
        description="If you can't audit the ethics, they're marketing. Here are seven requirements for verifiably ethical AI — and how existing approaches compare."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View the Code"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Principles"
        linkHref="/sections/main/v1"
      />

      {/* Three Types of AI */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Three Types of AI</h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            Ethics is necessary. It&apos;s not sufficient.
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Some AI ignores ethics entirely. Some follows rules but can&apos;t detect when its reasoning comes from an echo chamber. Only one type monitors its own epistemic diversity.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Type 1 */}
            <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">1</span>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Unethical AI</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                No published principles. No audit trail. Closed source. No runtime ethical checks.
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                Requires external governance. Cannot self-govern.
              </p>
            </div>

            {/* Type 2 */}
            <div className="rounded-xl border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">Ethical AI</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Runtime ethics checks present. But no correlation monitoring — vulnerable when correlated sources create false confidence.
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                Safe when supervised. Cannot detect echo chambers at scale.
              </p>
            </div>

            {/* Type 3 */}
            <div className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-6 ring-2 ring-green-400 ring-offset-2 dark:ring-offset-gray-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">3</span>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">Ethical + Intuitive AI</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Ethics plus correlation awareness. Monitors epistemic diversity per-decision. Flags fragile reasoning before acting. Escalates to humans when confidence is unjustified.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                This is what CIRIS implements.{" "}
                <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" className="hover:underline">View IDMA code →</a>
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            An AI can follow every rule, pass every audit, and still fail catastrophically if it&apos;s reasoning from an echo chamber.
            <strong className="text-gray-900 dark:text-white"> Intuition is the capacity to sense fragility before collapse.</strong>
          </p>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Seven Requirements"
          subheadline="Six for ethics. One for intuition."
          copyText="These requirements establish verifiable ethical AI. The first six are necessary but not sufficient — correlated sources can create false confidence even when all checks pass. The seventh requirement addresses that gap."
        />

        <CardsSection
          cardsData={[
            {
              headline: "1. Published Principles",
              copyText:
                "The agent must be bound to a public ethical framework: Beneficence, Non-maleficence, Integrity, Transparency, Autonomy, and Justice. A formal document the agent is obligated to follow.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "/sections/main/v1",
            },
            {
              headline: "2. Runtime Conscience",
              copyText:
                "Every action passes through ethical checks before execution. Not a post-hoc filter — part of the decision loop itself.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/conscience",
            },
            {
              headline: "3. Human Deferral",
              copyText:
                "When uncertain or facing potential harm, the agent defers to humans with full context. Built into the workflow, not a suggestion.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/handlers",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: "4. Cryptographic Audit",
              copyText:
                "Every action and rationale recorded in an immutable, signed ledger. Ed25519 signatures on every trace. Verify exactly why the agent did what it did.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/audit",
            },
            {
              headline: "5. Bilateral Consent",
              copyText:
                "Consent goes both ways. Humans can refuse data access. The agent can refuse requests that violate its principles. Neither party compromises.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/services/governance/consent",
            },
            {
              headline: "6. Open Source (AGPL-3.0)",
              copyText:
                "Ethical AI cannot be closed source. You can't audit what you can't see. Network copyleft ensures the stack stays open — any deployed modifications must be shared.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE",
            },
          ]}
        />

        {/* The Seventh Requirement - Intuition */}
        <div className="my-12 rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">7</span>
            <div>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Intuition (Corridor Maintenance)</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">The requirement ethics alone can&apos;t satisfy.</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The agent monitors its own epistemic diversity. Before acting, it asks: <em>&quot;Am I reasoning from truly independent sources, or is this an echo chamber?&quot;</em>
            When effective source count drops below threshold (k<sub>eff</sub> &lt; 2), the decision is flagged for human review.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">CHAOS</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Too loud. No coordination.</p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">{"\u03C1"} &lt; 0.2</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center ring-2 ring-green-400">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">HEALTHY CORRIDOR</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Diverse perspectives. Synthesizable.</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">0.2 &lt; {"\u03C1"} &lt; 0.7</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400 mb-1">RIGIDITY</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Echo chamber. False confidence.</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">{"\u03C1"} &gt; 0.7</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Implemented as <strong>IDMA</strong> (Intuition Decision Making Algorithm) — the 4th DMA in the CIRIS pipeline.
            </p>
            <a
              href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm"
            >
              View IDMA code →
            </a>
          </div>
        </div>

        {/* Why Ethics Alone Fails */}
        <div className="my-12 bg-gray-900 dark:bg-black rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Why Ethics Alone Fails</h3>
          <p className="text-brand-primary font-medium mb-6">The math of echo chambers.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                As sources become correlated ({"\u03C1"} → 1), effective diversity collapses regardless of how many sources you have:
              </p>
              <code className="block bg-gray-800 text-green-400 px-4 py-3 rounded-lg text-sm mb-4">
                k<sub>eff</sub> = k / (1 + {"\u03C1"}(k-1)) → 1 as {"\u03C1"} → 1
              </code>
              <p className="text-gray-400 text-sm">
                10 sources with {"\u03C1"}=0.9 → k<sub>eff</sub> ≈ 1.1 (effectively one source)
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-4">
                An ethical AI following correlated guidance is like a democracy where every voter reads the same newspaper.
                The vote count looks healthy. The effective diversity is 1.
              </p>
              <p className="text-gray-300">
                <strong className="text-white">Too correlated is the new too quiet.</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-gray-400">
              Based on Coherence Collapse Analysis (CCA) — validated across chemistry, political science, finance, and biology.
            </p>
            <a
              href="https://doi.org/10.5281/zenodo.18142668"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium text-sm"
            >
              Read the paper →
            </a>
          </div>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Current Landscape"
          subheadline="Different projects, different goals."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        {/* Landscape Comparison Table */}
        <div className="my-12 px-8 md:px-12">
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            Based on publicly available documentation as of February 2026. If we&apos;ve missed something or gotten something wrong, <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="underline hover:text-brand-primary">open an issue</a>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-4 text-left font-bold text-brand-primary">Project</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Runtime</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Principles</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Conscience</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Audit Trail</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Open Source</th>
                  <th className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">Intuition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-bold text-brand-primary">
                    <a href="https://github.com/CIRISAI/CIRISAgent" className="hover:underline">CIRIS</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">AGPL-3.0</td>
                  <td className="p-4 text-center text-indigo-600 font-bold">IDMA</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Constitutional AI</td>
                  <td className="p-4 text-center text-yellow-500">Training only</td>
                  <td className="p-4 text-center text-yellow-500">Implicit</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">LlamaFirewall / NeMo Guardrails</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Logging</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
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
                  <td className="p-4 text-center text-green-600">CC0</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Ethics Boards / Governance Frameworks</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Manual</td>
                  <td className="p-4 text-center text-gray-400">Varies</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Guardrails and governance frameworks solve important but different problems. Safety prevents harmful outputs. Ethics reasons about values. CIRIS aims to do both.
          </p>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Distinction"
          subheadline="Guardrails are not conscience."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Safety Guardrails",
              copyText:
                "LlamaFirewall, NeMo Guardrails, and similar tools block dangerous outputs — prompt injection, insecure code, adversarial inputs. Essential security infrastructure.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ethical Conscience",
              copyText:
                "Runtime reasoning about values, principles, and consequences. The agent considers whether an action is right, not just whether it's safe. Different problem, different architecture.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Correlation Awareness",
              copyText:
                "Neither guardrails nor conscience alone can detect when reasoning sources are correlated. IDMA adds this third layer — monitoring whether agreement is genuine diversity or echo chamber.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Many Aligned Agents"
          subheadline="Distributed governance, not concentrated power."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Decentralized Alignment"
          subheadline="No single point of failure."
          copyText="Many smaller agents, each bound to published principles, each auditable, each deferring to human authority. Distributed governance means no single entity controls the stack. Federation keeps correlation low."
          linkHref="/coherence-ratchet"
          linkText="Read about the Coherence Ratchet →"
        />

        {/* Research Status */}
        <div className="my-12 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-6">
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 mb-3">Research Status</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This is emerging research. We are transparent about what is established versus what is under investigation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2 text-sm">Established</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>- Kish design effect formula (1965)</li>
                <li>- Correlation reduces effective sample size</li>
                <li>- LLMs share training data overlap</li>
                <li>- RLHF produces behavioral convergence</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2 text-sm">Under Investigation</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>- Precise {"\u03C1"} measurement for LLM ensembles</li>
                <li>- k<sub>eff</sub> threshold calibration</li>
                <li>- Decorrelation intervention effectiveness</li>
                <li>- Domain-specific {"\u03C1"} dynamics</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800 flex flex-wrap gap-4">
            <a
              href="https://doi.org/10.5281/zenodo.18142668"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
            >
              CCA Paper →
            </a>
            <a
              href="https://zenodo.org/records/17195221"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
            >
              CIRISAgent Paper →
            </a>
            <a
              href="/research-status"
              className="text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
            >
              Full Research Status →
            </a>
          </div>
        </div>

        {/* Install CTA */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8">
          <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">Try It Yourself</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <a href="/explore-a-trace" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Transparent Reasoning</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Watch the agent&apos;s ethical checks in real-time. <span className="text-brand-primary">Explore a trace →</span></p>
            </a>
            <a href="https://ethicsengine.org" target="_blank" rel="noopener noreferrer" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">EthicsEngine</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Evaluate ethical reasoning quality of LLMs. <span className="text-brand-primary">ethicsengine.org →</span></p>
            </a>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Deferral in Edge Cases</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">When uncertain, the agent asks you instead of guessing. Human oversight in the loop.</p>
            </div>
          </div>
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
              Android
            </a>
            <a
              href="/install"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Desktop
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              View Source
            </a>
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
        copyText="An open stack implementing all seven requirements end-to-end, in code, running in production. Audit it. Break it. Tell us what's missing."
      />

      <Footer />
    </>
  );
}
