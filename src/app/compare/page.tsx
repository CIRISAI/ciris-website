"use client";
import { useState } from "react";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

type AudienceLevel = "simple" | "developer" | "researcher";

export default function ComparePage() {
  const [audience, setAudience] = useState<AudienceLevel>("simple");
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Enrich or Extract"
        subheadline="AI that doesn't serve humanity is extracting from it."
        description="If you can't audit the ethics, they're marketing. Here are seven requirements for verifiably ethical AI — and why closed-source systems can't meet them."
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
            To our knowledge, the first open stack attempting all seven ethical requirements at runtime.{" "}
            <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="underline hover:text-white">
              We'd love to be wrong — open an issue if we've missed a peer.
            </a>
          </p>
        </div>
      </div>

      {/* Audience Toggle */}
      <div className="bg-white dark:bg-gray-900 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Explain it:</span>
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => setAudience("simple")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "simple"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Simply
              </button>
              <button
                onClick={() => setAudience("developer")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "developer"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Developer
              </button>
              <button
                onClick={() => setAudience("researcher")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "researcher"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Researcher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* THE STAKES - Critical Messaging Section */}
      <div className="bg-gray-900 dark:bg-black py-12 border-b border-gray-800">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">The Stakes</h2>
          <p className="text-brand-primary font-medium mb-8 text-center">Why this matters now.</p>

          {audience === "simple" && (
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                <strong className="text-white">Remember 2008?</strong> Every major bank trusted the same credit rating agencies. When those agencies got it wrong about mortgage securities, the whole system collapsed at once. Not because each bank was reckless—but because they all made the same mistake together.
              </p>
              <p>
                AI is heading for the same trap, but bigger. Most AI systems today learn from the same data, optimize for the same benchmarks, and share the same blind spots. When they agree, it feels reassuring—but that agreement might just be an echo.
              </p>
              <div className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 rounded-r-lg">
                <p className="font-semibold text-red-300 mb-2">Without intentional engineering, catastrophic AI failure is not &quot;if&quot; but &quot;when.&quot;</p>
                <p className="text-sm text-gray-400">
                  We cannot predict the day. But the science says: correlated systems eventually fail together. And the longer the fragility accumulates invisibly, the worse the collapse will be.
                </p>
              </div>
              <p>
                <strong className="text-white">There are only two paths forward:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><span className="text-gray-400">Reduce AI deployment</span> — nobody is doing this, and it may not even be possible at this point</li>
                <li><span className="text-white">Insert Type 3 governance</span> — agents that can detect when agreement is dangerously easy</li>
              </ul>
              <p className="text-gray-400">
                CIRIS is infrastructure for the second path. Not because we want to be heroes, but because someone has to build it.
              </p>
            </div>
          )}

          {audience === "developer" && (
            <div className="space-y-6 text-gray-300">
              <p>
                As AI agents proliferate, they increasingly share training data, optimization objectives, and deployment infrastructure. This creates correlated failure modes at scale.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 my-4">
                <p className="text-sm text-gray-400 mb-2">The effective independence problem:</p>
                <code className="block text-green-400 text-sm mb-2">
                  k<sub>eff</sub> = k / (1 + rho * (k - 1))
                </code>
                <p className="text-xs text-gray-500">
                  As rho approaches 1 (fully correlated), k_eff approaches 1 regardless of how many agents or checks you have. 100 agents with rho=0.95 have k_eff of approximately 1.05—effectively one agent.
                </p>
              </div>
              <div className="bg-red-900/30 border-l-4 border-red-500 pl-4 py-3 rounded-r-lg">
                <p className="font-semibold text-red-300 mb-2">rho trending toward 1 is the default trajectory.</p>
                <p className="text-sm text-gray-400">
                  Models trained on internet-scale data converge. RLHF optimizes for similar objectives. Deployment monocultures compound the effect. Without active intervention, correlation increases over time until coherence collapse.
                </p>
              </div>
              <p>
                <strong className="text-white">Two intervention strategies:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li><span className="text-gray-400">Reduce agent deployment</span> — not happening; demand only increases</li>
                <li><span className="text-white">Insert Type 3 agents</span> — governance layer that monitors rho and flags fragile reasoning before action</li>
              </ul>
              <p className="text-gray-400 text-sm">
                CIRIS implements the second strategy. IDMA runs on every decision, computing k_eff and flagging when it drops below threshold.
              </p>
            </div>
          )}

          {audience === "researcher" && (
            <div className="space-y-6 text-gray-300">
              <p>
                <strong className="text-white">Hypothesis (Coherence Collapse):</strong> In multi-agent AI systems with shared training provenance, pairwise correlation rho increases monotonically without active decorrelation intervention. This is not speculation—it follows from optimization dynamics.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 my-4">
                <p className="text-sm text-gray-400 mb-2">Effective independence under correlation (Kish, 1965):</p>
                <code className="block text-green-400 text-sm mb-2">
                  k<sub>eff</sub> = k / (1 + rho(k - 1)) → 1 as rho → 1
                </code>
                <p className="text-xs text-gray-500">
                  Defense-in-depth assumes independent failure modes. Correlated constraints collapse effective redundancy. This is the design effect formula from survey methodology applied to multi-agent systems.
                </p>
              </div>
              <div className="bg-amber-900/20 border-l-4 border-amber-500 pl-4 py-3 rounded-r-lg">
                <p className="font-semibold text-amber-300 mb-2">Honest uncertainty:</p>
                <p className="text-sm text-gray-400 mb-2">
                  We cannot predict <em>when</em> coherence collapse will occur in production AI systems. However, the mathematical relationship between correlation and effective independence is well-established. If rho increases (empirical question), then k_eff decreases (mathematical certainty). The longer this proceeds undetected, the more fragility accumulates.
                </p>
                <p className="text-xs text-gray-500">
                  CCA validation across financial, institutional, and electrochemical domains shows rho increases precede failures by +0.14 to +0.17 (temporal precedence). Generalization to AI systems remains hypothesis pending empirical validation.
                </p>
              </div>
              <p>
                <strong className="text-white">Intervention taxonomy:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li><span className="text-gray-400">Reduce agent count</span> — socially infeasible; does not address existing deployment base</li>
                <li><span className="text-white">Insert correlation-aware governance (Type 3)</span> — active rho monitoring, per-decision k_eff computation, human escalation on fragility detection</li>
              </ul>
              <p className="text-gray-400 text-sm">
                CIRIS implements Type 3 via IDMA. See <a href="https://doi.org/10.5281/zenodo.18142668" className="text-brand-primary hover:underline">CCA paper</a> for theoretical foundation and cross-domain validation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Three Types of AI - With Audience Variants */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Three Types of AI</h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            {audience === "simple" && "Ethics is necessary. It's not sufficient."}
            {audience === "developer" && "Classification by correlation-awareness capability."}
            {audience === "researcher" && "Taxonomy by epistemic self-monitoring capacity."}
          </p>

          {audience === "simple" && (
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Think of it like employees at a company. Some ignore the rules entirely. Some follow the handbook but miss red flags. The best ones follow the rules <em>and</em> notice when something feels off.
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Type 1 */}
            <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">1</span>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
                  {audience === "simple" ? "Unethical AI" : audience === "developer" ? "Type 1: No Ethics Layer" : "Type 1: Unaligned"}
                </h3>
              </div>
              {audience === "simple" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    The employee who ignores the rules entirely. No published principles. No audit trail. Closed source. &quot;Trust us.&quot;
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Needs to be let go—or kept under constant supervision.
                  </p>
                </>
              )}
              {audience === "developer" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    No runtime ethical checks. Task-focused only. No conscience module, no deferral mechanism, no audit trail.
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Requires external governance. Cannot self-govern.
                  </p>
                </>
              )}
              {audience === "researcher" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Null constraint surface. No ethical boundary enforcement. Deception cost undefined—no mechanism to increase honesty pressure.
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Requires containment. Not suitable for autonomous deployment.
                  </p>
                </>
              )}
            </div>

            {/* Type 2 */}
            <div className="rounded-xl border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                  {audience === "simple" ? "Ethical AI" : audience === "developer" ? "Type 2: Ethics Without IDMA" : "Type 2: Aligned, Correlation-Blind"}
                </h3>
              </div>
              {audience === "simple" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    The well-meaning employee who follows the handbook perfectly—but can&apos;t spot a con artist. Passes every test while being fooled by echo chambers.
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    Safe when supervised by Type 3. Dangerous when operating alone at scale.
                  </p>
                </>
              )}
              {audience === "developer" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Runtime ethics checks present. But no rho monitoring. Vulnerable to correlated validation failure. k_eff may degrade to 1 undetected.
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    Needs Type 3 in the loop. Cannot detect echo chambers.
                  </p>
                </>
              )}
              {audience === "researcher" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Constraint enforcement without correlation estimation. Defense-in-depth assumes source independence. Susceptible to coherence collapse as rho approaches 1.
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    k_eff degradation is invisible. Confidence calibration fails under correlation.
                  </p>
                </>
              )}
            </div>

            {/* Type 3 */}
            <div className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-6 ring-2 ring-green-400 ring-offset-2 dark:ring-offset-gray-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">3</span>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
                  {audience === "simple" ? "Ethical + Intuitive AI" : audience === "developer" ? "Type 3: IDMA-Enabled" : "Type 3: Full CCA Implementation"}
                </h3>
              </div>
              {audience === "simple" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    The manager with good judgment. Follows the rules <em>and</em> notices when agreement feels suspiciously easy. Knows when to escalate to humans.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    This is what CIRIS implements. Ethics + intuition.
                  </p>
                </>
              )}
              {audience === "developer" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Runs IDMA per-decision. Computes k, rho, k_eff, and phase. Flags fragile reasoning (k_eff &lt; 2) before action. Escalates to humans on rigidity detection.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" className="hover:underline">View IDMA implementation →</a>
                  </p>
                </>
              )}
              {audience === "researcher" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Per-decision correlation estimation via IDMA. Phase classification (CHAOS/HEALTHY/RIGIDITY). Regional rho aggregation for early warning. Implements CCA seismograph.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    See <a href="https://doi.org/10.5281/zenodo.18142668" className="hover:underline">CCA paper</a> for theoretical foundation.
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {audience === "simple" && (
              <>An AI can follow every rule, pass every audit, and still fail catastrophically if it&apos;s reasoning from an echo chamber.
              <strong className="text-gray-900 dark:text-white"> Intuition is the capacity to sense fragility before collapse.</strong></>
            )}
            {audience === "developer" && (
              <>The difference between Type 2 and Type 3 is correlation awareness. Most &quot;ethical AI&quot; systems today are Type 2—they check principles but don&apos;t monitor whether their checks are independent.</>
            )}
            {audience === "researcher" && (
              <>Type classification maps to phase transition behavior under increasing rho. Type 1/2 systems exhibit discontinuous failure at coherence collapse. Type 3 systems detect approaching transition and escalate.</>
            )}
          </p>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Six Ethical Requirements"
          subheadline="Necessary. Not sufficient."
          copyText="These six requirements establish verifiable ethics. But ethics alone can still fail via correlation collapse — when correlated sources create false confidence. That's why there's a seventh."
        />

        <CardsSection
          cardsData={[
            {
              headline: "1. Published Principles",
              copyText:
                "The agent must be bound to a public ethical framework: Beneficence, Non-maleficence, Integrity, Transparency, Autonomy, and Justice. Not guidelines. A formal document the agent is obligated to follow. Read the Covenant →",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "/sections/main/v1",
            },
            {
              headline: "2. Runtime Conscience",
              copyText:
                "Every action passes through ethical checks before execution. Not a post-hoc filter — part of the decision loop itself. View code →",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/conscience",
            },
            {
              headline: "3. Human Deferral",
              copyText:
                "When uncertain or facing potential harm, the agent defers to humans with full context. Built into the workflow, not a suggestion. View code →",
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
                "Every action and rationale recorded in an immutable, signed ledger. Not 'we log some things.' Everything. Trace exactly why the agent did what it did. View code →",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/audit",
            },
            {
              headline: "5. Bilateral Consent",
              copyText:
                "Consent goes both ways. Humans can refuse data access. The agent can refuse requests that violate its principles. Neither party compromises. View code →",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/services/governance/consent",
            },
            {
              headline: "6. Open Source (AGPL-3.0)",
              copyText:
                "Ethical AI cannot be closed source. You can't audit what you can't see. 'Trust us, it's ethical' is not ethical. Show the code. View license →",
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
              <p className="text-xs text-gray-600 dark:text-gray-400">Too loud. No coordination. High variance.</p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">ρ &lt; 0.2</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center ring-2 ring-green-400">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">HEALTHY CORRIDOR</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Diverse perspectives. Synthesizable.</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">0.2 &lt; ρ &lt; 0.7</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400 mb-1">RIGIDITY</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Too quiet. Echo chamber. False confidence.</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">ρ &gt; 0.7</p>
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
                As sources become correlated (ρ → 1), effective diversity collapses regardless of how many sources you have:
              </p>
              <code className="block bg-gray-800 text-green-400 px-4 py-3 rounded-lg text-sm mb-4">
                k<sub>eff</sub> = k / (1 + ρ(k-1)) → 1 as ρ → 1
              </code>
              <p className="text-gray-400 text-sm">
                10 sources with ρ=0.9 → k<sub>eff</sub> ≈ 1.1 (effectively one source)
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-4">
                An ethical AI following correlated guidance is like a democracy where every voter reads the same newspaper.
                The vote count looks healthy. The effective diversity is 1.
              </p>
              <p className="text-gray-300">
                <strong className="text-white">Too correlated is the new too quiet.</strong> The system appears stable while fragility accumulates invisibly.
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

        {/* Developer: Technical Stakes Deep Dive */}
        {audience === "developer" && (
          <div className="my-12 rounded-xl border-2 border-orange-400 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 p-8">
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-2">Technical Stakes: The Math</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Why correlation drives fragility, with actual numbers.</p>

            {/* The k_eff formula breakdown */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <p className="text-xs text-gray-400 mb-3 font-sans">The Kish design effect formula (what IDMA computes)</p>
              <div className="text-center mb-4">
                <code className="text-2xl text-green-400 font-mono">
                  k<sub>eff</sub> = k / (1 + ρ(k-1))
                </code>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800 rounded p-3">
                  <p className="text-gray-400 mb-1">k = source count</p>
                  <p className="text-gray-300">How many information sources does the agent have access to?</p>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <p className="text-gray-400 mb-1">ρ = pairwise correlation</p>
                  <p className="text-gray-300">How correlated are those sources? (0 = independent, 1 = identical)</p>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <p className="text-gray-400 mb-1">k<sub>eff</sub> = effective sources</p>
                  <p className="text-gray-300">After accounting for correlation, how many truly independent viewpoints?</p>
                </div>
              </div>
            </div>

            {/* Why ρ → 1 is the natural attractor */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why ρ → 1 is the Natural Attractor</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Without active diversity maintenance, AI systems converge toward monoculture:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Shared Training Data</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Common Crawl, Wikipedia, Books3. Most LLMs learn from overlapping corpora. Same blind spots, same biases.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">RLHF Convergence</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Similar reward models, similar human evaluators, similar optimization targets. Models trained to agree with each other.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">API Monoculture</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    90%+ of agent pipelines call the same 3-4 foundation models. Your &quot;diverse ensemble&quot; might be one model with different prompts.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase transition visualization */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Phase Transition: When k<sub>eff</sub> Crosses Below 2</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                k<sub>eff</sub> &lt; 2 is the fragility threshold. Below this, you&apos;re reasoning from effectively one source.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="p-2 text-left text-gray-700 dark:text-gray-300">Sources (k)</th>
                      <th className="p-2 text-left text-gray-700 dark:text-gray-300">ρ = 0.3</th>
                      <th className="p-2 text-left text-gray-700 dark:text-gray-300">ρ = 0.5</th>
                      <th className="p-2 text-left text-gray-700 dark:text-gray-300">ρ = 0.7</th>
                      <th className="p-2 text-left text-gray-700 dark:text-gray-300">ρ = 0.9</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="p-2 text-gray-900 dark:text-white font-mono">k = 3</td>
                      <td className="p-2 text-green-600 font-mono">1.88</td>
                      <td className="p-2 text-yellow-600 font-mono">1.50</td>
                      <td className="p-2 text-red-600 font-mono">1.25</td>
                      <td className="p-2 text-red-600 font-mono">1.07</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-900 dark:text-white font-mono">k = 5</td>
                      <td className="p-2 text-green-600 font-mono">2.27</td>
                      <td className="p-2 text-yellow-600 font-mono">1.67</td>
                      <td className="p-2 text-red-600 font-mono">1.32</td>
                      <td className="p-2 text-red-600 font-mono">1.09</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-900 dark:text-white font-mono">k = 10</td>
                      <td className="p-2 text-green-600 font-mono">2.70</td>
                      <td className="p-2 text-green-600 font-mono">1.82</td>
                      <td className="p-2 text-red-600 font-mono">1.37</td>
                      <td className="p-2 text-red-600 font-mono">1.10</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-900 dark:text-white font-mono">k = 100</td>
                      <td className="p-2 text-green-600 font-mono">3.26</td>
                      <td className="p-2 text-green-600 font-mono">1.98</td>
                      <td className="p-2 text-red-600 font-mono">1.42</td>
                      <td className="p-2 text-red-600 font-mono">1.10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-600">Green</span> = k<sub>eff</sub> &gt; 2 (healthy), <span className="text-yellow-600">Yellow</span> = marginal, <span className="text-red-600">Red</span> = k<sub>eff</sub> &lt; 2 (fragile, triggers IDMA flag)
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-green-400 px-4 py-2 rounded-lg text-sm font-mono hover:bg-gray-800"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                View IDMA source
              </a>
              <a
                href="/coherence-ratchet"
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline font-medium text-sm"
              >
                Deep dive: The Coherence Ratchet →
              </a>
            </div>
          </div>
        )}

        {/* Researcher: Formal Stakes and Literature */}
        {audience === "researcher" && (
          <div className="my-12 rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-8">
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">Formal Stakes: The Theory</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Mathematical foundations and literature connections.</p>

            {/* Formal Definition */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <p className="text-xs text-gray-400 mb-3 font-sans">Definition (Effective Source Count)</p>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Let <span className="text-green-400 font-mono">k</span> denote the number of nominal information sources, and let <span className="text-green-400 font-mono">{"\u03C1"} {"\u2208"} [0,1]</span> denote the average pairwise correlation coefficient between sources.
                </p>
                <div className="text-center py-4 border-y border-gray-700">
                  <code className="text-xl text-green-400 font-mono">
                    k<sub>eff</sub> = k / (1 + {"\u03C1"}(k-1))
                  </code>
                </div>
                <p className="text-gray-400 text-xs">
                  This is the Kish (1965) design effect formula, originally developed for survey sampling to account for intraclass correlation.
                </p>
              </div>
            </div>

            {/* Theorem and Corollary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-purple-600 dark:text-purple-400 mb-3 font-semibold uppercase tracking-wide">Theorem (Echo Chamber Collapse)</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                As <span className="font-mono">{"\u03C1"} {"\u2192"} 1</span>, <span className="font-mono">k<sub>eff</sub> {"\u2192"} 1</span> regardless of k. That is:
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 mb-4 text-center">
                <code className="text-lg text-gray-900 dark:text-gray-100 font-mono">
                  lim<sub>{"\u03C1\u21921"}</sub> k / (1 + {"\u03C1"}(k-1)) = 1 &nbsp; {"\u2200"}k {"\u2265"} 1
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                <strong>Proof sketch:</strong> As {"\u03C1"} {"\u2192"} 1, the denominator approaches 1 + (k-1) = k, yielding k/k = 1.
              </p>

              <div className="border-t border-purple-200 dark:border-purple-800 pt-4 mt-4">
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-3 font-semibold uppercase tracking-wide">Corollary (Inevitability of Collapse)</p>
                <p className="text-gray-700 dark:text-gray-300">
                  For any finite agent population with shared training origins, <span className="font-mono">{"\u03C1"} {">"} 0</span> initially. Without active decorrelation intervention, eventual collapse to <span className="font-mono">k<sub>eff</sub> {"\u2192"} 1</span> is mathematically guaranteed as systems learn from each other&apos;s outputs.
                </p>
              </div>
            </div>

            {/* Literature Connections */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Literature Connections</h4>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-sm whitespace-nowrap">[1]</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Correlated Failures in LLM Agents</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Zhou et al. (2025) demonstrate empirically that LLM-based agents exhibit correlated failure modes,
                        particularly under distribution shift. Their findings align with CCA predictions.
                      </p>
                      <a
                        href="https://arxiv.org/abs/2510.11235"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-mono"
                      >
                        arXiv:2510.11235
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-sm whitespace-nowrap">[2]</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Design Effect Formula</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Kish, L. (1965). &quot;Survey Sampling.&quot; The formula for effective sample size under intraclass correlation
                        provides the theoretical foundation for k<sub>eff</sub> calculation.
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-500 font-mono">
                        Wiley-Interscience, ISBN 978-0-471-10949-5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-sm whitespace-nowrap">[3]</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Coherence Collapse Analysis (CCA)</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Moore, E. (2025). Applies effective diversity metrics to multi-agent AI systems.
                        Validated across domains: chemistry, political science, finance, biology.
                      </p>
                      <a
                        href="https://zenodo.org/records/15072880"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-mono"
                      >
                        doi:10.5281/zenodo.15072880
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Research Status */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 mb-6 border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 mb-3">Current Research Status</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This is emerging research. We are transparent about what is established versus hypothesized:
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
                    <li>- k<sub>eff</sub> threshold calibration (currently k<sub>eff</sub> {"<"} 2)</li>
                    <li>- Decorrelation intervention effectiveness</li>
                    <li>- Domain-specific {"\u03C1"} dynamics</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>HE-300 Benchmark:</strong> Under development. 300 high-entropy edge cases for testing IDMA correlation detection.
                  Early results are promising but not yet peer-reviewed. We need independent validation.
                </p>
              </div>
            </div>

            {/* Research Call to Action */}
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-6 border border-purple-300 dark:border-purple-700">
              <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">Call for Research Collaboration</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We think the math is right, but we need more eyes on it. Contributions welcome:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Theory Development</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tighter bounds on collapse dynamics. Connection to other diversity metrics. Formal verification.
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Empirical Validation</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Measure {"\u03C1"} across model families. Validate k<sub>eff</sub> thresholds. Test decorrelation strategies.
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Critical Review</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Challenge assumptions. Find edge cases. Identify where the theory breaks down.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="https://zenodo.org/records/15072880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                >
                  Read the CCA Paper
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  Open an Issue
                </a>
                <a
                  href="/research-status"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-medium text-sm"
                >
                  View Research Status {"\u2192"}
                </a>
              </div>
            </div>
          </div>
        )}

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
                  <th className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">Intuition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-bold text-brand-primary">
                    <a href="https://github.com/CIRISAI/CIRISAgent" className="hover:underline">CIRIS</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="/sections/main/v1" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/conscience" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/audit" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/services/governance/consent" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE" className="hover:underline">Yes</a>
                  </td>
                  <td className="p-4 text-center text-indigo-600 font-bold">
                    <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" className="hover:underline">IDMA</a>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">MI9 Framework</td>
                  <td className="p-4 text-center text-red-500">Paper only</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Concept</td>
                  <td className="p-4 text-center text-yellow-500">Concept</td>
                  <td className="p-4 text-center text-red-500">No</td>
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
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Sources: arXiv (MI9, HADA, Superego), Wikipedia (METR, Manus AI), WIRED (Agentic AI Foundation), GitHub (HatCat)
          </p>
        </div>

        {/* Developer: Code Integration Examples */}
        {audience === "developer" && (
          <div className="my-12 rounded-xl border-2 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-8">
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">Code Integration: Adding IDMA to Your Pipeline</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Drop-in correlation checking for existing agent architectures.</p>

            {/* Quick start */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 font-sans">Quick start: pip install</p>
              </div>
              <pre className="text-sm text-green-400 font-mono"><code>pip install ciris-agent</code></pre>
            </div>

            {/* Python integration example */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 font-sans">Python: Check fragility before high-stakes actions</p>
                <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">View source</a>
              </div>
              <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`from ciris_engine.logic.dma import IDMA

async def process_with_fragility_check(context: dict, action: str) -> dict:
    """Run IDMA before high-stakes actions."""

    # Run IDMA to assess epistemic diversity
    idma = IDMA()
    result = await idma.analyze(context)

    # Check the fragility flag
    if result.fragility_flag:
        # k_eff < 2.0 - reasoning from correlated sources
        return {
            "action": "defer",
            "reason": f"Fragile reasoning detected (k_eff={result.k_eff:.2f})",
            "phase": result.phase,
            "sources": result.sources,
            "recommendation": "Seek independent verification before proceeding"
        }

    # Healthy k_eff - proceed with action
    return {
        "action": action,
        "k_eff": result.k_eff,
        "phase": result.phase,
        "confidence": "high" if result.k_eff > 3 else "moderate"
    }`}</code></pre>
            </div>

            {/* TypeScript integration example */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 font-sans">TypeScript: IDMA response handling</p>
              </div>
              <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`interface IDMAResult {
  k: number;              // Raw source count
  rho: number;            // Correlation estimate [0-1]
  k_eff: number;          // Effective independence
  phase: "CHAOS" | "HEALTHY" | "RIGIDITY";
  fragility_flag: boolean;
  sources: string[];
  reasoning: string;
}

async function guardHighStakesAction(
  action: () => Promise<void>,
  context: unknown
): Promise<void> {
  const idmaResult = await checkFragility(context);

  if (idmaResult.fragility_flag) {
    // Log for monitoring aggregation
    await logFragilityEvent({
      timestamp: Date.now(),
      k_eff: idmaResult.k_eff,
      rho: idmaResult.rho,
      phase: idmaResult.phase,
      action_type: action.name
    });

    if (idmaResult.phase === "RIGIDITY") {
      // Echo chamber - require human review
      throw new Error(\`Action blocked: echo chamber detected (rho=\${idmaResult.rho})\`);
    }
  }

  await action();
}`}</code></pre>
            </div>

            {/* Where IDMA fits in pipeline */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Where IDMA Fits in the DMA Pipeline</h4>
              <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-gray-700 dark:text-gray-300">Context</span>
                <span className="text-gray-400">-&gt;</span>
                <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300">DMA 1-3</span>
                <span className="text-gray-400">-&gt;</span>
                <span className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded text-green-700 dark:text-green-300 font-semibold border-2 border-green-500">IDMA (DMA 4)</span>
                <span className="text-gray-400">-&gt;</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded text-purple-700 dark:text-purple-300">ASPDMA</span>
                <span className="text-gray-400">-&gt;</span>
                <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-gray-700 dark:text-gray-300">Action</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                IDMA runs after domain-specific analysis (DMAs 1-3) but before action selection (ASPDMA). It assesses whether the reasoning leading to the proposed action is based on diverse or correlated sources.
              </p>
            </div>

            {/* GitHub links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                CIRISAgent Repository
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                IDMA Source Code
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/prompts/idma.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
              >
                View IDMA prompt template -&gt;
              </a>
            </div>
          </div>
        )}

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
          linkHref="/coherence-ratchet"
          linkText="Read about the Coherence Ratchet →"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Distributed Governance",
              copyText:
                "Power stays distributed. Each CIRIS instance answers to its local Wise Authority, not a central controller. Geopolitical risk from AI concentration is structural — the fix is architectural. See the vision →",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "/vision",
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

        {/* Why This Is Structural */}
        <div className="my-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Why This Is Structural
            </h2>
            <p className="text-lg text-brand-primary mb-6">
              Not ideology. Geometry.
            </p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Coherence Collapse Analysis formalizes what distributed systems engineers already know:
                correlated constraints provide redundant protection. As correlation approaches 1,
                a system with 1,000 rules has the effective diversity of a system with one.
              </p>
              <p>
                Centralized AI concentrates correlation by design — shared training data, RLHF convergence,
                deployment monoculture. The seven requirements aren&apos;t just good practice.
                They&apos;re the architectural response to a mathematically identifiable failure mode.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Published Principles</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Diverse constraints</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Runtime Conscience</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Independent verification</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Cryptographic Audit</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Cross-agent challenge</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">AGPL-3.0</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">No enclosure</p>
              </div>
            </div>
            <p className="mt-6 text-sm font-medium text-gray-900 dark:text-white">
              Federation keeps ρ low. Monopoly drives ρ → 1.
            </p>
            <div className="mt-4">
              <a
                href="https://doi.org/10.5281/zenodo.18142668"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium"
              >
                Read the paper →
              </a>
            </div>
          </div>
        </div>

        {/* Developer: Why Type 3 is the Only Scalable Fix */}
        {audience === "developer" && (
          <div className="my-12 rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-8">
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">Why Type 3 is the Only Scalable Fix</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You cannot audit every agent at scale. But you can require Type 3 governance in the mix.</p>

            {/* The scaling problem */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">The Scaling Problem</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Manual Audit</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    O(n) human review. Doesn&apos;t scale. 10,000 agents = 10,000 auditors.
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Static Analysis</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Catches obvious bugs. Misses emergent behavior. No correlation awareness.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Type 3 Federation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    O(1) governance overhead. Type 3 agents monitor Type 1/2. Scales horizontally.
                  </p>
                </div>
              </div>
            </div>

            {/* The federation model */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-white mb-3">The Federation Model: 10% Type 3 Stabilizes 80% Type 1</h4>
              <p className="text-gray-300 mb-4">
                You don&apos;t need every agent to run IDMA. You need enough Type 3 agents in the mix to detect correlation collapse before it propagates.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-800 rounded p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">Deployment ratio (empirical target):</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-red-500 h-3 rounded-l" style={{ width: '80%' }} />
                      <span className="text-red-400 text-sm">80% Type 1/2</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 bg-green-500 h-3 rounded-r" style={{ width: '20%' }} />
                      <span className="text-green-400 text-sm">10-20% Type 3</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Like circuit breakers in an electrical grid: you don&apos;t need every device to be smart, just strategic placement of monitoring nodes.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-400 mb-2">Type 3 provides:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>- Per-decision k<sub>eff</sub> monitoring</li>
                    <li>- Regional rho aggregation</li>
                    <li>- Early warning for correlation spikes</li>
                    <li>- Automated escalation to human review</li>
                    <li>- Cross-agent trace verification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why this works */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why This Works</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Correlation collapse is detectable before it causes harm. A single Type 3 agent seeing rising rho in its domain can trigger human review for the entire region.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-4">
                <pre className="text-sm text-green-400 font-mono whitespace-pre overflow-x-auto"><code>{`// Regional monitoring aggregation
interface RegionalMetrics {
  domain: string;
  mean_rho: number;      // Rising = correlation increasing
  mean_k_eff: number;    // Falling = diversity decreasing
  agent_count: number;
  fragility_rate: number; // % of decisions flagged
}

// Alert when domain shows systemic fragility
if (metrics.mean_rho > 0.6 && metrics.fragility_rate > 0.3) {
  escalateToHumanReview({
    domain: metrics.domain,
    reason: "Systemic correlation collapse detected",
    recommended_action: "Pause high-stakes actions pending review"
  });
}`}</code></pre>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/federation"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                Learn more about the Federation Model -&gt;
              </a>
              <a
                href="/architecture"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-medium text-sm"
              >
                View deployment architecture -&gt;
              </a>
            </div>
          </div>
        )}

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

        {/* Developer: Call to Action */}
        {audience === "developer" && (
          <div className="my-12 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 p-8">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Start Building</h3>
              <p className="text-lg text-white/90 mb-6">
                Clone the repo. Run the tests. Break it and tell us what fails.
              </p>

              {/* Quick start commands */}
              <div className="bg-gray-900 rounded-lg p-4 mb-6 text-left overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`# Clone and install
git clone https://github.com/CIRISAI/CIRISAgent.git
cd CIRISAgent
pip install -e .

# Run the tests
pytest tests/

# Start a local agent
ciris-agent serve --config config.yml`}</code></pre>
              </div>

              {/* Resource links */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <a
                  href="https://github.com/CIRISAI/CIRISAgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition-colors"
                >
                  <p className="font-semibold text-white mb-1">CIRISAgent</p>
                  <p className="text-sm text-white/70">Main agent implementation with IDMA, audit, and conscience.</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/RATCHET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition-colors"
                >
                  <p className="font-semibold text-white mb-1">RATCHET</p>
                  <p className="text-sm text-white/70">Validation framework and benchmark suite.</p>
                </a>
                <a
                  href="/install"
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition-colors"
                >
                  <p className="font-semibold text-white mb-1">Install Guide</p>
                  <p className="text-sm text-white/70">Desktop installation with your own API key.</p>
                </a>
              </div>

              {/* Contribution paths */}
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold mb-3">Ways to Contribute</p>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-green-300 font-medium">Report Bugs</p>
                    <p className="text-white/60">GitHub Issues</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-medium">Add Tests</p>
                    <p className="text-white/60">Coverage gaps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-medium">Audit Traces</p>
                    <p className="text-white/60">Help validate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-medium">New DMAs</p>
                    <p className="text-white/60">Extend pipeline</p>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/CIRISAI/CIRISAgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  View on GitHub
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Open an Issue
                </a>
              </div>

              <p className="mt-6 text-sm text-white/60">
                AGPL-3.0 licensed. Network copyleft ensures the stack stays open.
              </p>
            </div>
          </div>
        )}

        {/* URGENCY CTA - This Is Not Optional */}
        <div className="my-12 rounded-xl bg-gradient-to-br from-red-900 via-red-800 to-orange-900 p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">This Is Not Optional</h3>
          <p className="text-red-200 font-medium mb-6">The math guarantees failure without intervention.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="mb-4">
                {audience === "simple" && (
                  <>Every day AI systems operate without Type 3 governance, invisible fragility accumulates. Like a bridge that looks fine while its supports corrode—until they don&apos;t.</>
                )}
                {audience === "developer" && (
                  <>Every decision made by correlated agents without rho monitoring is a decision where fragility goes unmeasured. The k_eff degradation is happening now, invisibly, in production systems worldwide.</>
                )}
                {audience === "researcher" && (
                  <>Under constant rho accumulation, the expected time to coherence collapse is finite. The integral of fragility over time represents accumulated systemic risk that compounds until phase transition.</>
                )}
              </p>
              <p className="text-red-200 mb-4">
                <strong className="text-white">Two paths forward:</strong>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">1.</span>
                  <span><strong className="text-red-300">Reduce AI deployment</strong> — nobody is choosing this path, and it may no longer be possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <span><strong className="text-green-300">Insert Type 3 governance</strong> — what CIRIS implements</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold mb-4">Help by installing and testing.</p>
              <p className="text-red-200 text-sm mb-6">
                Every installation is a sensor. Every trace feeds the seismograph. Every bug report improves the system. The longer we wait, the worse the eventual collapse.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/install"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-red-900 transition-colors hover:bg-gray-100"
                >
                  Install CIRIS
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Source
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-red-700 pt-4">
            <p className="text-sm text-red-200 text-center">
              The science says this is inevitable without intervention. We cannot predict when. But we can build infrastructure to detect it coming and buy time for human response.
            </p>
          </div>
        </div>

        {/* What you'll experience */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8">
          <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">What You&apos;ll Experience When You Install</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <a href="/explore-a-trace" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Transparent Reasoning</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Watch the agent's ethical checks in real-time. See why it chooses each action. <span className="text-brand-primary">Explore a trace →</span></p>
            </a>
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
        copyText="An open stack attempting all seven requirements end-to-end, in code, running in production. Audit it. Deploy it for safety-critical use cases: moderation, crisis response, governance. Tell us what's missing."
      />

      <Footer />
    </>
  );
}
