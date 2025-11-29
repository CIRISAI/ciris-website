"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import FlexSection from "@/app/components/SectionFlexContent";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import CardsSection from "@/app/components/CardsSection";

export default function ModelsPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              What LLM We Use and Why
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              CIRIS Agent runs on Llama 4 Maverick because it's the only open model that actually works for ethical, tool-heavy agents in production.
            </p>
          </div>

          {/* Current Model */}
          <div className="mt-12 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Llama 4 Maverick
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">Architecture:</strong> Mixture-of-Experts (activates ~17B parameters per token)
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Context Window:</strong> 1M tokens
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Pricing:</strong> ~$0.11 in / $0.34 out per 1M tokens (via OpenRouter)
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Deployment:</strong> Multi-provider (OpenRouter, Groq, Together)
              </p>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mt-12">
            <FlexSection
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="CIRIS doesn't trim its values to fit the model"
              subheadline="We choose models large enough to carry our entire ethical framework."
              copyText="CIRIS includes the complete Covenant and Comprehensive Guide in every single LLM call. No compression, no summaries, no options. This means the agent never forgets its obligations—not even for a single token. That's why context window isn't a vanity metric for us: it's a direct extension of our commitment to transparency and accountability."
            />
          </div>

          {/* Model Criteria */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Our Model Criteria"
              subheadline="Five non-negotiable requirements for CIRIS Agent"
            />

            <CardsSection
              cardsData={[
                {
                  headline: "1. Structured Outputs & Tool Use",
                  copyText:
                    "Must natively support function calling and return valid JSON across 12-70 tool calls per interaction. CIRIS is an orchestrator—we need stable tool semantics, not chatty conversation.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "2. Context Window: 128K Minimum",
                  copyText:
                    "CIRIS embeds the full Covenant and Guide into every prompt. 128K is the absolute minimum; 256K+ is strongly preferred for long conversations, tool outputs, and audit trails.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "3. Cost Efficiency",
                  copyText:
                    "Target: <$1.00 per 1M tokens combined. We choose the cheapest working option—not the cheapest benchmark winner. A reliable model that never breaks JSON beats a cheaper model that fails 1 in 10 calls.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "4. Multi-Provider Availability",
                  copyText:
                    "Must be available from at least two independent providers for robust fallback chains. CIRIS degrades gracefully during outages instead of failing hard.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "5. Latency & User Experience",
                  copyText:
                    "Fast responses keep humans in the loop for ethical review workflows. We prioritize low-latency providers for interactive tiers while accepting slower backends for background tasks.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Production Deployment */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Production Deployment
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Default Tier
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Llama 4 Maverick via cost-optimized provider (OpenRouter)
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Fast Tier
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Llama 4 Maverick via speed-optimized provider (Groq) for interactive use
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Fallback Chain
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maverick across multiple providers, with final fallback to large Llama 3.3-class models when Maverick is unavailable
                </p>
              </div>
            </div>
          </div>

          {/* Why Not Other Models */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Why Maverick Over Other Open Models
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  GPT-OSS-20B
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Attractive on paper due to cost, but weak in structured output and tool calling.
                </p>
                <div className="rounded-md bg-red-100 p-3 dark:bg-red-900/40">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Failure mode:</strong> "tool choice is required, but the model did not call a tool"
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    This error is unacceptable for a framework that depends on 12-70 tool calls per interaction. Even a 3-10× cheaper token price is not worth the operational failures.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Other Long-Context "Max" Models
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Some newer high-context, high-parameter models offer impressive benchmarks and large contexts, but with significantly higher per-token pricing and less mature tool-calling behavior. For CIRIS's mission—ethical, inspectable, tool-centric agents—these models are currently better suited to targeted experiments than to default production use.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Maverick's Sweet Spot
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Llama 4 Maverick via cost-optimized providers delivers:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Reliable tool calling across 12-70 calls per interaction</li>
                  <li>1M token context (8× the minimum, plenty of headroom)</li>
                  <li>Multi-provider availability (OpenRouter, Groq, Together)</li>
                  <li>Cost significantly below proprietary frontier models</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The 128K+ Requirement */}
          <div className="mt-12 rounded-lg border-4 border-brand-primary bg-gradient-to-br from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Why 128K+ Context Is Non-Negotiable
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Always-On Covenant and Guide
                </h3>
                <p>
                  CIRIS embeds the <strong>full Covenant</strong> and <strong>complete Comprehensive Guide</strong> into every prompt. Not a summary. Not a distilled version. The entire governance text.
                </p>
                <p className="mt-2">
                  This ensures that updates to the Covenant or Guide immediately affect behavior across all agents, without waiting for new fine-tunes or prompt compression strategies.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Full Ethical and Procedural State
                </h3>
                <p>
                  CIRIS Agents are tool-heavy orchestrators juggling:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Multi-step workflows</li>
                  <li>System state and tool outputs</li>
                  <li>User messages and conversation history</li>
                  <li>The complete Covenant and Guide</li>
                </ul>
                <p className="mt-2">
                  This combined context easily exceeds 32K-64K, especially for long-running sessions or complex investigations. That's why 128K is the minimum and 256K+ is preferred.
                </p>
              </div>

              <div className="mt-6 rounded-md bg-purple-100 p-4 dark:bg-purple-900/40">
                <p className="font-semibold text-gray-900 dark:text-white">
                  The bottom line:
                </p>
                <p className="mt-2 text-sm">
                  CIRIS does not trim its values or procedures to fit the model. Instead, CIRIS chooses models that are large enough to carry the entire ethical and operational framework on every call. Models with smaller context windows—even if cheaper or more popular—are excluded from production use.
                </p>
              </div>
            </div>
          </div>

          {/* How This Supports the Covenant */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="How This Supports the CIRIS Covenant"
              subheadline="Model selection as ethical infrastructure"
            />

            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Transparency and Inspectability
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Long context keeps reasoning traces, decisions, and tool calls visible for human review</li>
                  <li>Stable JSON and structured outputs make every tool invocation auditable</li>
                  <li>Complete governance artifacts in every call ensure decisions are traceable back to principles</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Resilience and Governance
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Multi-provider deployment avoids single points of failure in critical ethical infrastructure</li>
                  <li>Choosing "good enough and reliable" over "flashy but fragile" prioritizes safety and continuity</li>
                  <li>Graceful degradation during outages maintains service availability</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Human Oversight
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Fast tiers keep humans comfortably in the loop for real-time ethical review</li>
                  <li>Cheaper tiers enable extensive background analysis without prohibitive costs</li>
                  <li>Balanced approach supports both day-to-day use and periodic governance audits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              The Bottom Line
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              CIRIS uses Llama 4 Maverick as the primary model because it is the most reliable open option that satisfies CIRIS's ethical, operational, and economic constraints. Other models are monitored and periodically tested, but Maverick is the current default because it best serves CIRIS's commitment to trustworthy, tool-centric AI systems.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              This isn't about chasing benchmark scores or following hype cycles. It's about choosing a model that actually works for ethical agents in production—and that takes the Covenant seriously enough to carry it in every single call.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
