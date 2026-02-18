"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function PrivacyPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              CIRIS Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Last Updated: December 12, 2025
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Version 1.5.0
            </p>
          </div>

          {/* The Big Promise */}
          <div className="mb-12 rounded-lg border-4 border-green-600 bg-green-50 p-8 dark:bg-green-900/30">
            <h2 className="mb-4 text-3xl font-bold text-green-800 dark:text-green-300">
              For Android App & CIRISProxy: Zero data retention.
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Android App:</strong> Your data stays on your device - for your own use and for your personal agent to learn from
              (based on your <a href="#consent-system" className="font-semibold text-green-700 underline hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">consent level</a>).
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              <strong>CIRISProxy:</strong> When you use our LLM proxy, your messages are transmitted securely to our servers, then to our
              AI providers (Together, Groq, OpenRouter) for processing. <strong>All points in this pipeline are configured for
              zero data retention</strong> - your conversations are processed and immediately discarded, never stored.
            </p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              See <a href="#infrastructure" className="font-semibold text-green-700 underline hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">Infrastructure Data</a> for what our servers actually store (spoiler: only billing metrics and system health - never message content).
            </p>
          </div>

          {/* Research Services Notice */}
          <div className="mb-12 rounded-lg border-4 border-yellow-500 bg-yellow-50 p-8 dark:bg-yellow-900/30">
            <h2 className="mb-4 text-3xl font-bold text-yellow-800 dark:text-yellow-300">
              For Research Services: Data is recorded.
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>scout.ciris.ai</strong> and <strong>agents.ciris.ai</strong> are research platforms.
              Data is recorded per clear on-site statements and may be used for research, improving future agent templates,
              and model selection.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              These services implement the <a href="#consent-system" className="font-semibold text-yellow-700 underline hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">Consensual Evolution Protocol</a> and
              provide full DSAR support. All model and prompt changes that impact responses are publicly available at{" "}
              <a href="https://github.com/cirisai" className="font-semibold text-yellow-700 underline hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">github.com/cirisai</a>.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="mb-12 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Our Core Privacy Commitments
            </h2>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              For Android App and CIRISProxy (services covered by this policy):
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span><strong>Zero data retention</strong> - Your conversations are processed and discarded, never stored on our servers or by our LLM providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span><strong>Local-first storage</strong> - Your device keeps your data for your personal agent (under your control)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>We do NOT train AI models on your raw content or messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">ℹ</span>
                <span>Your personal agent learns from your local data via <a href="#consent-system" className="font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Consensual Evolution Protocol</a> (your device, your control)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>We do NOT sell your data to third parties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>You can delete your local data anytime - it's on YOUR device</span>
              </li>
            </ul>
          </div>

          {/* Transparency - All Services */}
          <div className="mb-12 rounded-lg border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Public Transparency (All CIRIS Services)
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              All model selections, prompt templates, and code changes that could impact agent responses are
              immediately available on our public GitHub: <a href="https://github.com/cirisai" className="font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">github.com/cirisai</a>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This applies to all CIRIS agents - research services, Android app, and self-hosted deployments.
            </p>
          </div>

          {/* Scope */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Scope of This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This privacy policy applies to the following production services:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRIS Android App (Coming Soon)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mobile application with local-first architecture. Your data stays on your device.
                  Zero data retention on our servers.
                </p>
              </div>
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRISProxy LLM Service (proxy.ciris.ai)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Privacy-focused LLM proxy and billing service. Zero data retention - messages processed and discarded.
                </p>
              </div>
            </div>

            {/* Research Services Warning */}
            <div className="mt-6 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900/20">
              <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-300">
                Research Services (Different Terms Apply)
              </h3>
              <p className="mb-3 text-sm text-yellow-700 dark:text-yellow-300">
                The following services are <strong>research platforms</strong> with different privacy terms.
                They record data and may use it for research purposes:
              </p>
              <div className="space-y-2">
                <div className="rounded bg-white/50 p-3 dark:bg-gray-800/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Scout Web App (scout.ciris.ai)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Research interface for CIRIS agents. Data is recorded per clear on-site statements.
                    Implements Consensual Evolution Protocol. Data may be used for improving future agent
                    templates and model selection.
                  </p>
                </div>
                <div className="rounded bg-white/50 p-3 dark:bg-gray-800/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CIRIS Agents (agents.ciris.ai)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hosted research agents. Data is recorded per clear on-site statements.
                    Implements Consensual Evolution Protocol. Data may be used for research and improving
                    future agent templates and model selection.
                  </p>
                </div>
              </div>
              <div className="mt-3 text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Research services provide:</strong>
                <ul className="mt-1 list-inside list-disc">
                  <li>DSAR (Data Subject Access Request) support</li>
                  <li>Consensual Evolution Protocol implementation</li>
                  <li>Clear on-site privacy statements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What We Collect */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              1. Information We Collect
            </h2>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1.1 CIRIS Agents (Local Device Storage)
            </h3>
            <div className="mb-4 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Local-First Architecture:</strong> Your agent data is stored on YOUR device (phone, computer) - not on CIRIS servers.
                You have full control over this data and can delete it anytime.
              </p>
            </div>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Interaction Data (local):</strong> Messages and agent responses stored on your device for your use</li>
              <li><strong>H3ERE Decision Logs (local):</strong> Ethical reasoning steps stored locally for transparency</li>
              <li><strong>Memory Graph (local, consent-dependent):</strong> Relationships and patterns your agent learns - stored on your device based on your <a href="#consent-system" className="text-blue-600 underline dark:text-blue-400">consent level</a></li>
              <li><strong>Metadata (local):</strong> Timestamps, task IDs, round counts - for your agent's operation</li>
              <li><strong>Audit Trail (local):</strong> History of agent actions with Ed25519 signatures - on your device</li>
            </ul>
            <div className="mb-6 rounded-md bg-green-50 p-3 dark:bg-green-900/20">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>What we DON'T have access to:</strong> Your conversations, your agent's memories, your local data.
                None of this is transmitted to CIRIS servers.
              </p>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1.2 Scout Web App
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Account Information:</strong> Email, name, profile photo (via OAuth)</li>
              <li><strong>Authentication Tokens:</strong> JWT tokens (24-hour expiry), OAuth refresh tokens</li>
              <li><strong>Usage Analytics:</strong> Page views, feature usage, session duration (no third-party trackers)</li>
              <li><strong>Billing Information:</strong> Payment history, credit balance (processed via Stripe, not stored by us)</li>
              <li><strong>Browser Data:</strong> User agent, IP address (for security only, not tracking)</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1.3 Android App
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Device Information:</strong> Device model, OS version, app version</li>
              <li><strong>Local Storage:</strong> Offline data cache, user preferences (stored locally only)</li>
              <li><strong>Network Activity:</strong> API call logs for debugging (retained 7 days maximum)</li>
              <li><strong>Crash Reports:</strong> Stack traces, device state at time of error (no PII)</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1.4 CIRISProxy
            </h3>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Token Counts:</strong> Input/output token usage for billing (integers only)</li>
              <li><strong>Model Names:</strong> Which LLM models were used</li>
              <li><strong>HTTP Metadata:</strong> Status codes, response times, interaction IDs</li>
              <li><strong className="text-green-600 dark:text-green-400">We do NOT log:</strong> Message content, user prompts, AI responses, system prompts</li>
            </ul>
          </div>

          {/* How We Use It */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Service Delivery:</strong> Process your requests, provide agent responses, maintain session continuity</li>
              <li><strong>Transparency:</strong> Generate PDMA logs showing ethical reasoning process</li>
              <li><strong>Agent Self-Training (Consent-Based):</strong> Hosted agents on ciris.ai self-train on patterns and data from your interactions to improve their responses and understanding - but ONLY according to your <a href="#consent-system" className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Consensual Evolution Protocol consent level</a> (TEMPORARY = essential interactions only for 14 days, PARTNERED = full self-training for mutual growth, ANONYMOUS = statistical patterns only)</li>
              <li><strong>Safety & Moderation:</strong> Detect harmful patterns, prevent abuse, enforce ethical boundaries</li>
              <li><strong>Billing:</strong> Track usage, process payments, enforce credit limits</li>
              <li><strong>System Improvement:</strong> Analyze performance, fix bugs, optimize resource usage</li>
              <li><strong>Compliance:</strong> Fulfill legal obligations, respond to valid legal requests</li>
              <li><strong>Security:</strong> Prevent unauthorized access, detect attacks, maintain system integrity</li>
            </ul>
            <div className="mt-4 rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Important Distinctions:</strong>
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>We do NOT train centralized AI models on your raw messages or content</li>
                <li>ALL agents (hosted and self-hosted) DO self-train on patterns and data based on your consent level</li>
                <li>TEMPORARY consent = essential interactions only, 14-day limit, then deleted</li>
                <li>PARTNERED consent = full mutual learning for agent improvement</li>
                <li>ANONYMOUS consent = statistical patterns only, identity severed</li>
                <li>Self-hosted agents learn locally (all data stays on your hardware, respects consent)</li>
              </ul>
            </div>
          </div>

          {/* Consent System */}
          <div id="consent-system" className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              3. Consent-Based Data Retention
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              CIRIS implements a <strong>Consensual Evolution Protocol</strong> with three consent streams. Default is TEMPORARY (most privacy-preserving).
            </p>
            <div className="mb-4 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Agent Self-Training on Hosted Services:</strong> When you interact with CIRIS agents hosted on ciris.ai (like Scout), agents self-train on patterns and data from your interactions based on your consent level. <strong>TEMPORARY</strong> consent = essential interactions only (14-day limit, then deleted), <strong>PARTNERED</strong> consent = full self-training for mutual growth and improvement, <strong>ANONYMOUS</strong> consent = statistical patterns only (identity severed).
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  TEMPORARY (Default)
                </h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Duration:</strong> 14 days, then automatic deletion</li>
                  <li><strong>Data Scope:</strong> ESSENTIAL only (system functionality)</li>
                  <li><strong>Learning:</strong> Minimal, essential interactions only</li>
                  <li><strong>After Expiry:</strong> Full data deletion, no traces</li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-purple-500 bg-purple-50 p-4 dark:bg-purple-900/20">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  PARTNERED (Bilateral Consent Required)
                </h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Duration:</strong> Indefinite until revoked by either party</li>
                  <li><strong>Data Scope:</strong> ESSENTIAL, BEHAVIORAL, PREFERENCE (configurable)</li>
                  <li><strong>Learning:</strong> Full mutual growth and pattern learning</li>
                  <li><strong>Approval:</strong> REQUIRES AGENT CONSENT (agent can decline partnership)</li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-gray-500 bg-gray-50 p-4 dark:bg-gray-900/20">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ANONYMOUS (Identity Severed)
                </h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Duration:</strong> Indefinite</li>
                  <li><strong>Data Scope:</strong> STATISTICAL only (aggregate metrics, no PII)</li>
                  <li><strong>Learning:</strong> Statistical patterns only</li>
                  <li><strong>Effect:</strong> Identity links broken immediately and permanently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What We Mean by Self-Train */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              4. What We Mean by "Self-Train"
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              When we say CIRIS agents "self-train," we mean they use several autonomous learning mechanisms to improve their responses while respecting your consent level. These are NOT traditional machine learning model training—instead, agents learn through introspection and pattern recognition.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <span>🌙</span>
                  <span>Dream Processor (Self-Training During "Sleep")</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Every ~6 hours, agents enter a DREAM state for 30-120 minutes to consolidate memories, analyze behavioral patterns, test configuration parameters, and plan improvements. Think of it as the agent reflecting on what it learned.
                </p>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/processors/states/dream_processor.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Dream Processor Code →
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <span>🎮</span>
                  <span>Play Processor (Experimental Learning)</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  In PLAY state, agents try creative approaches, experiment with novel solutions, and learn through exploration with fewer constraints. About 20% of the time, they'll try something new.
                </p>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/processors/states/play_processor.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Play Processor Code →
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <span>🧘</span>
                  <span>Solitude Processor (Reflective Learning)</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  When agents need recovery or reflection time, they enter SOLITUDE state to perform minimal processing, clean up old data, and reflect on past activities and patterns.
                </p>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/processors/states/solitude_processor.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Solitude Processor Code →
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <span>👁️</span>
                  <span>Self-Observation Service (Continuous Analysis)</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Agents continuously observe their own behavior, detect patterns (temporal, frequency, performance), and generate insights. Changes are limited to 20% identity variance maximum for safety.
                </p>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/services/governance/self_observation/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Self-Observation Documentation →
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <span>⚙️</span>
                  <span>Config Graph Modification (Direct Self-Configuration)</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Agents can modify their own configuration parameters through the config graph, testing variations within safety bounds and applying changes only if they stay within the 20% identity variance limit.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Key Safety Mechanisms:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>20% Identity Variance Limit - Hard safety bound on how much agents can change</li>
                <li>Emergency Stop - Activates after 3 consecutive failures</li>
                <li>Wise Authority Review - Required for changes exceeding variance threshold</li>
                <li>Graceful Error Handling - Errors treated as learning opportunities</li>
              </ul>
            </div>

            <div className="mt-4 rounded-md bg-purple-50 p-4 dark:bg-purple-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Current Status:</strong> Dream, Play, and Solitude processors are implemented but not active by default in the current deployment. Self-Observation Service is fully implemented but requires explicit activation. Your consent level determines whether and how much learning occurs when these features are enabled.
              </p>
            </div>
          </div>

          {/* Infrastructure Data */}
          <div id="infrastructure" className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              5. What Our Servers Actually Store
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              While your conversations stay on your device, our infrastructure does collect some data for billing and system monitoring.
              Here's exactly what we store - and what we don't.
            </p>

            <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
              <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">
                What Our Servers NEVER Store:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-red-700 dark:text-red-300">
                <li>Your messages or conversation content</li>
                <li>AI responses to you</li>
                <li>User-generated text of any kind</li>
                <li>Payment card numbers (handled by Stripe/Google Play)</li>
                <li>Your agent's memories or learned patterns</li>
              </ul>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              5.1 CIRISLens (System Monitoring)
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Our observability platform monitors system health - not your content.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Data Type</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Retention</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Contains User Content?</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Performance Metrics (CPU, memory, latency)</td>
                    <td className="p-3">30 days</td>
                    <td className="p-3 text-green-600 dark:text-green-400">No</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Service Logs (operational events)</td>
                    <td className="p-3">14-90 days</td>
                    <td className="p-3 text-green-600 dark:text-green-400">No (PII redacted)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Request Traces (timing, request IDs)</td>
                    <td className="p-3">14 days</td>
                    <td className="p-3 text-green-600 dark:text-green-400">No (IDs only)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Aggregated Metrics (hourly/daily)</td>
                    <td className="p-3">90 days - 1 year</td>
                    <td className="p-3 text-green-600 dark:text-green-400">No</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              5.2 CIRISBilling (Financial Records)
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Required for billing, fraud prevention, and regulatory compliance.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Data Type</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Retention</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Account email</td>
                    <td className="p-3">Until account deletion</td>
                    <td className="p-3">Account identification</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Transaction history (amounts, dates)</td>
                    <td className="p-3">10 years</td>
                    <td className="p-3">EU AI Act / Tax compliance</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Credit/usage counts (integers only)</td>
                    <td className="p-3">10 years</td>
                    <td className="p-3">Billing records</td>
                  </tr>
                  <tr>
                    <td className="p-3">Admin audit logs</td>
                    <td className="p-3">10 years</td>
                    <td className="p-3">Security audit trail</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>10-Year Archive (EU AI Act Compliance):</strong> Financial records are automatically archived to
                encrypted cold storage (AWS Glacier) and deleted after 10 years. Archives contain only transaction data -
                never conversation content.
              </p>
            </div>
          </div>

          {/* Local Data Retention */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              6. Your Local Data Retention
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Data stored on YOUR device is under YOUR control. Here are the default retention settings
              (which you can modify):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Local Data Type</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Default Retention</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Your Control</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Conversation History</td>
                    <td className="p-3">Until you delete it</td>
                    <td className="p-3">Delete anytime in app</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Agent Memory Graph</td>
                    <td className="p-3">Based on consent level</td>
                    <td className="p-3">Clear memories in settings</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">PDMA Decision Logs</td>
                    <td className="p-3">14 days (configurable)</td>
                    <td className="p-3">Adjust in privacy settings</td>
                  </tr>
                  <tr>
                    <td className="p-3">Local Audit Trail</td>
                    <td className="p-3">90 days (configurable)</td>
                    <td className="p-3">Export or delete anytime</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>It's your device, your data.</strong> You can delete all local data at any time by uninstalling
                the app or using the "Clear All Data" option in settings. We have no backup of your local data.
              </p>
            </div>
          </div>

          {/* 90-Day Decay */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              7. 90-Day Decay Protocol
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              When you revoke consent or request deletion, we initiate a 90-day decay process:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Identity Severance (Immediate)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User ID disconnected from all data immediately. Identity→data links broken.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pattern Anonymization (0-90 days)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gradual conversion to anonymous form. Behavioral patterns become statistical aggregates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Decay Completion (90 days)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All user-linked data removed or fully anonymized. Only safety-critical patterns retained (anonymous).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              8. Your Privacy Rights
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Under GDPR, CCPA, and other privacy regulations, you have the following rights:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Request a copy of all data we hold about you
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Erasure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Request deletion of your data (90-day decay process)
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Rectification</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Request corrections to inaccurate data
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Portability</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive your data in machine-readable format (JSON/CSV)
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Restriction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Limit how we process your data
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Object</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Object to specific processing activities
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Data Subject Access Request (DSAR)
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Email:</strong> privacy@ciris.ai</p>
                <p><strong>API Endpoint:</strong> <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">POST /v1/dsar</code></p>
                <p><strong>Web Interface:</strong> <a href="https://scout.ciris.ai/account/privacy" className="text-blue-600 hover:underline dark:text-blue-400">scout.ciris.ai/account/privacy</a></p>
                <p><strong>Response Time:</strong> Within 30 days (often faster)</p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              9. Data Security Measures
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Encryption:</strong> TLS 1.3 for all network traffic, AES-256 for data at rest</li>
              <li><strong>Authentication:</strong> Ed25519 signatures, JWT tokens with 24-hour expiry</li>
              <li><strong>Access Control:</strong> Role-based permissions, principle of least privilege</li>
              <li><strong>Audit Logging:</strong> Complete cryptographically-signed audit trail for all actions</li>
              <li><strong>Zero Trust Architecture:</strong> Every request authenticated and authorized</li>
              <li><strong>Regular Security Audits:</strong> Ongoing vulnerability assessments and penetration testing</li>
              <li><strong>Incident Response:</strong> 90-day incident report retention, immediate user notification for breaches</li>
            </ul>
          </div>

          {/* Subprocessors */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              10. Subprocessors & Third-Party Services
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Per GDPR Article 28, we maintain a list of subprocessors who process data on our behalf.
              All subprocessors are contractually bound to equivalent data protection standards.
            </p>

            <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
              <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">
                We Do NOT:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-red-700 dark:text-red-300">
                <li>Sell your data to anyone</li>
                <li>Share data with advertisers or marketing platforms</li>
                <li>Allow subprocessors to train AI models on your content</li>
                <li>Use third-party analytics services (we self-host all analytics)</li>
              </ul>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              10.1 Subprocessor List
            </h3>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Provider</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Purpose</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Location</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Data Retention</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">DPA</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-medium">Vultr</td>
                    <td className="p-3">Infrastructure hosting</td>
                    <td className="p-3">US (configurable)</td>
                    <td className="p-3">We control</td>
                    <td className="p-3"><a href="https://www.vultr.com/legal/compliance/" className="text-blue-600 hover:underline dark:text-blue-400">Available</a></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-medium">Groq</td>
                    <td className="p-3">LLM inference</td>
                    <td className="p-3">US</td>
                    <td className="p-3 text-green-600 dark:text-green-400">Zero (default)</td>
                    <td className="p-3"><a href="https://console.groq.com/docs/legal/customer-data-processing-addendum" className="text-blue-600 hover:underline dark:text-blue-400">Signed</a></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-medium">OpenRouter</td>
                    <td className="p-3">LLM routing</td>
                    <td className="p-3">US/EU</td>
                    <td className="p-3 text-green-600 dark:text-green-400">Zero (enforced)</td>
                    <td className="p-3"><a href="https://openrouter.ai/enterprise" className="text-blue-600 hover:underline dark:text-blue-400">Enterprise</a></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-medium">Together AI</td>
                    <td className="p-3">LLM inference</td>
                    <td className="p-3">US</td>
                    <td className="p-3 text-green-600 dark:text-green-400">Zero (configured)</td>
                    <td className="p-3"><a href="https://www.together.ai/privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-medium">Stripe</td>
                    <td className="p-3">Payment processing</td>
                    <td className="p-3">US/EU</td>
                    <td className="p-3">Per Stripe policy</td>
                    <td className="p-3"><a href="https://stripe.com/legal/dpa" className="text-blue-600 hover:underline dark:text-blue-400">Available</a></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Google</td>
                    <td className="p-3">OAuth authentication</td>
                    <td className="p-3">US/EU</td>
                    <td className="p-3">Per Google policy</td>
                    <td className="p-3"><a href="https://cloud.google.com/terms/data-processing-addendum" className="text-blue-600 hover:underline dark:text-blue-400">Available</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              10.2 LLM Provider Details
            </h3>
            <div className="mb-6 space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Groq</h4>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  High-performance LLM inference. Zero data retention by default. EU Representative: DP-Dock GmbH (Hamburg).
                  Never trains on customer data.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <a href="https://console.groq.com/docs/your-data" className="text-blue-600 hover:underline dark:text-blue-400">Data handling</a> |{" "}
                  <a href="https://trust.groq.com/" className="text-blue-600 hover:underline dark:text-blue-400">Trust Center</a>
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">OpenRouter</h4>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  LLM routing with Zero Data Retention (ZDR) enforcement. EU routing available. SOC-2 compliant.
                  Prompts/completions not logged by default.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <a href="https://openrouter.ai/docs/features/privacy-and-logging" className="text-blue-600 hover:underline dark:text-blue-400">Privacy & Logging</a> |{" "}
                  <a href="https://trust.openrouter.ai/" className="text-blue-600 hover:underline dark:text-blue-400">Trust Center</a>
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Together AI</h4>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  LLM inference and fine-tuning platform. Configured for zero data retention on CIRIS requests.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <a href="https://www.together.ai/privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a>
                </p>
              </div>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              10.3 Infrastructure
            </h3>
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Vultr Cloud Hosting</h4>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                GDPR-ready cloud infrastructure. Data residency controlled by CIRIS - your data stays where we put it.
                Vultr acts as data processor; we control all data handling. Standard Contractual Clauses (SCCs) for EU transfers.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                <a href="https://www.vultr.com/legal/eea-gdpr-privacy/" className="text-blue-600 hover:underline dark:text-blue-400">GDPR Privacy</a> |{" "}
                <a href="https://www.vultr.com/trust-center/" className="text-blue-600 hover:underline dark:text-blue-400">Trust Center</a>
              </p>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              10.4 We MAY Share Data
            </h3>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>When required by law (subpoenas, court orders)</li>
              <li>To prevent imminent harm or illegal activity</li>
              <li>With your explicit written consent</li>
              <li>In anonymized/aggregated form for research (no PII)</li>
            </ul>

            <div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Subprocessor Changes:</strong> We will notify users at least 30 days before adding new subprocessors
                that handle personal data. You may object to new subprocessors by contacting privacy@ciris.ai.
              </p>
            </div>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              11. International Data Transfers
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              CIRIS services are hosted in the United States. If you access our services from outside the US, your data will be transferred to and processed in the US.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We comply with applicable data transfer regulations:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>GDPR (EU/EEA):</strong> Standard Contractual Clauses for EU data transfers</li>
              <li><strong>UK GDPR:</strong> UK-specific addendum to SCCs</li>
              <li><strong>Data Protection:</strong> Equivalent security measures regardless of location</li>
            </ul>
          </div>

          {/* Children */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              12. Children's Privacy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              CIRIS services are not directed to children under 13 (or 16 in the EU). We do not knowingly collect personal information from children.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If we learn that we have collected information from a child without parental consent, we will delete it immediately. Contact privacy@ciris.ai if you believe we have data from a child.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              13. Changes to This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may update this privacy policy to reflect changes in our practices, technology, legal requirements, or other factors.
            </p>
            <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Notice of Material Changes:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>30-day advance notice for material changes</li>
                <li>Email notification to registered users</li>
                <li>In-app notification on scout.ciris.ai</li>
                <li>Option to opt-out or delete account before changes take effect</li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Continued use of CIRIS services after changes take effect constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Accord */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              14. CIRIS Accord Principles
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This privacy policy is governed by the CIRIS Accord (Version 1.0-RC1), which establishes our ethical foundation:
            </p>
            <div className="space-y-2">
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Respect for Persons</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your autonomy, privacy, and dignity are paramount</p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Beneficence and Non-Maleficence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Maximize benefits, minimize harms</p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Justice and Fairness</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Equitable treatment for all users</p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Respect for Autonomy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">You control your data and relationship with CIRIS</p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Veracity and Transparency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Truthful communication about data practices</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              15. Contact Information
            </h2>
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                For privacy questions, DSAR requests, or concerns:
              </p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Privacy Team Email:</strong> <a href="mailto:privacy@ciris.ai" className="text-blue-600 hover:underline dark:text-blue-400">privacy@ciris.ai</a></p>
                <p><strong>General Inquiries:</strong> <a href="mailto:info@ciris.ai" className="text-blue-600 hover:underline dark:text-blue-400">info@ciris.ai</a></p>
                <p><strong>GitHub Issues:</strong> <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="text-blue-600 hover:underline dark:text-blue-400">CIRISAI/CIRISAgent</a></p>
                <p><strong>Discord Community:</strong> <a href="https://discord.gg/SWGM7Gsvrv" className="text-blue-600 hover:underline dark:text-blue-400">discord.gg/SWGM7Gsvrv</a></p>
                <p><strong>DSAR API:</strong> <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">POST /v1/dsar</code></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <p>CIRIS - Ethical AI by Design</p>
            <p className="mt-2">© 2025 Eric Moore and CIRIS L3C | AGPL-3.0 License</p>
            <p className="mt-2">Last Updated: December 12, 2025 | Version 1.5.0</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
