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
              What LLMs We Use and Why
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              CIRIS Agent runs on a small set of open models that meet five non-negotiable
              criteria. The current production lineup is Llama 4 Maverick, Llama 4 Scout, Qwen 3.6,
              and Gemma 4 — chosen for different roles in the agent&apos;s workload.
            </p>
          </div>

          {/* Current Lineup */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Llama 4 Maverick
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                The reasoning workhorse. Mixture-of-Experts with ~17B active parameters per token,
                1M token context, multi-provider availability. Default for the deeper reasoning
                steps where context capacity matters most.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Providers: OpenRouter, Groq, Together
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Llama 4 Scout
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                The fast companion in the Llama 4 family. Smaller and quicker than Maverick, with
                strong tool calling. Used for interactive tiers where latency matters and the full
                Maverick context budget is not required.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Providers: OpenRouter, Groq
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Qwen 3.6
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Multilingual depth and strong structured output. Carries weight in the
                non-English reasoning paths the polyglot Accord requires; an independent provider
                base outside the Llama family adds redundancy in the fallback chain.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Providers: OpenRouter, DashScope
              </p>
            </div>

            <div className="rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Gemma 4
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Small enough to run on commodity hardware. Used where reach matters more than
                raw capacity — on-device, low-bandwidth, and degraded-network deployments — and
                as a third-family fallback alongside Llama and Qwen.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Providers: OpenRouter, Google
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
              copyText="CIRIS includes the complete Accord and Comprehensive Guide in every single LLM call. No compression, no summaries, no options. This means the agent never forgets its obligations—not even for a single token. That's why context window isn't a vanity metric for us: it's a direct extension of our commitment to transparency and accountability."
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
                    "CIRIS embeds the full Accord and Guide into every prompt. 128K is the absolute minimum; 256K+ is strongly preferred for long conversations, tool outputs, and audit trails.",
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
                  Llama 4 Maverick via cost-optimized provider for deep-reasoning steps that need
                  the full context budget.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Fast Tier
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Llama 4 Scout via speed-optimized provider (Groq) for interactive use, with
                  Maverick on Groq as a heavier-context alternative.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Multilingual Tier
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Qwen 3.6 carries weight in non-English reasoning paths the polyglot Accord
                  requires, and provides a non-Llama fallback in the chain.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Edge Tier
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gemma 4 for on-device, low-bandwidth, and degraded-network deployments where
                  reaching the user matters more than the size of the model.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Fallback Chain
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maverick → Scout → Qwen 3.6 → Gemma 4 across multiple providers, so the agent
                  degrades gracefully across model families and infrastructure boundaries instead
                  of failing hard.
                </p>
              </div>
            </div>
          </div>

          {/* Why This Lineup */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Why This Lineup
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Different roles, not interchangeable parts
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Maverick handles deep reasoning where the full context budget matters. Scout
                  carries the interactive tier where latency dominates. Qwen 3.6 reaches the
                  polyglot reasoning paths the Accord requires across 29 languages. Gemma 4 is
                  the small-footprint option that puts the agent within reach of commodity
                  hardware. The lineup is chosen so different tiers of work go to the model that
                  actually fits, instead of forcing one model to do everything.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Three independent model families
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Llama (Maverick + Scout), Qwen, and Gemma come from three independent training
                  pipelines and three independent provider ecosystems. That matters for fallback
                  chains: a CVE, a licensing change, or a provider outage on one family does not
                  take the agent down. Independence at the model layer is the same property that
                  makes the IDMA component robust at the reasoning layer.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  What stays out of the lineup
                </h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  Models that cannot meet the five criteria — most often, models that look
                  attractive on token price but fail on structured output and tool calling.
                </p>
                <div className="rounded-md bg-red-100 p-3 dark:bg-red-900/40">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Representative failure mode (GPT-OSS-20B):</strong> &quot;tool choice
                    is required, but the model did not call a tool&quot;
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    This error is unacceptable for a framework that depends on 12-70 tool calls
                    per interaction. Even a 3-10× cheaper token price is not worth the
                    operational failures.
                  </p>
                </div>
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
                  Always-On Accord and Guide
                </h3>
                <p>
                  CIRIS embeds the <strong>full Accord</strong> and <strong>complete Comprehensive Guide</strong> into every prompt. Not a summary. Not a distilled version. The entire governance text.
                </p>
                <p className="mt-2">
                  This ensures that updates to the Accord or Guide immediately affect behavior across all agents, without waiting for new fine-tunes or prompt compression strategies.
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
                  <li>The complete Accord and Guide</li>
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

          {/* How This Supports the Accord */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="How This Supports the CIRIS Accord"
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
              CIRIS runs Llama 4 Maverick, Llama 4 Scout, Qwen 3.6, and Gemma 4 in production
              because together they satisfy the operational and economic constraints the Accord
              imposes — long context, reliable tool calling, polyglot coverage, and reach to
              commodity hardware — across three independent model families. New models are
              monitored and tested continuously; the lineup changes when something better
              actually meets the five criteria.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              This is not about chasing benchmark scores or following hype cycles. It is about
              choosing models that actually work for accountable, tool-centric agents in
              production — and that take the Accord seriously enough to carry it in every single
              call.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
