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
              Last Updated: November 29, 2025
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Version 1.3.0
            </p>
          </div>

          {/* Key Commitments */}
          <div className="mb-12 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Our Core Privacy Commitments
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>We do NOT train AI models on your raw content or messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">ℹ</span>
                <span>Hosted agents (ciris.ai) DO self-train on patterns and data from your interactions according to the <a href="#consent-system" className="font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Consensual Evolution Protocol</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>We do NOT sell your data to third parties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Message content retained for maximum 14 days (pilot phase)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>You can request your data or complete deletion anytime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Default consent is TEMPORARY (14-day auto-delete, essential interactions only)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Full transparency via public audit feeds</span>
              </li>
            </ul>
          </div>

          {/* Scope */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Scope of This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This privacy policy applies to all CIRIS services:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRIS Agents (agents.ciris.ai)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Self-hosted or cloud-hosted AI agents running the CIRIS framework with H3ERE ethical reasoning
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Scout Web App (scout.ciris.ai)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browser-based interface for interacting with CIRIS agents, viewing reasoning, and managing account
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRIS Android App (Coming Soon)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mobile application for CIRIS agents with offline-first architecture
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRISProxy LLM Service (proxy.ciris.ai)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Privacy-focused LLM proxy and billing service (Android app only)
                </p>
              </div>
            </div>
          </div>

          {/* What We Collect */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              1. Information We Collect
            </h2>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1.1 CIRIS Agents
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Interaction Data:</strong> Messages, commands, and agent responses</li>
              <li><strong>H3ERE Decision Logs:</strong> Ethical reasoning steps (PDMA pipeline) for transparency and auditability</li>
              <li><strong>Memory Graph:</strong> Relationships and patterns stored in graph database (consent-dependent)</li>
              <li><strong>Metadata:</strong> Timestamps, occurrence IDs, task IDs, round counts</li>
              <li><strong>Audit Trail:</strong> Complete history of all agent actions with Ed25519 signatures</li>
              <li><strong>Telemetry:</strong> Performance metrics, resource usage, error rates (aggregated)</li>
            </ul>

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

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              5. Data Retention Periods
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Data Type</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Retention Period</th>
                    <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">After Deletion</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Message Content</td>
                    <td className="p-3">14 days (pilot phase)</td>
                    <td className="p-3">Permanently deleted</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">PDMA Decision Logs</td>
                    <td className="p-3">14 days</td>
                    <td className="p-3">Hashed for pattern detection only</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Audit Trail</td>
                    <td className="p-3">90 days</td>
                    <td className="p-3">Deleted after compliance period</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Incident Reports</td>
                    <td className="p-3">90 days</td>
                    <td className="p-3">Deleted unless legally required</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">Billing Records</td>
                    <td className="p-3">7 years</td>
                    <td className="p-3">Legal requirement (tax/compliance)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3">System Metrics</td>
                    <td className="p-3">Indefinite</td>
                    <td className="p-3">Aggregated only, no PII</td>
                  </tr>
                  <tr>
                    <td className="p-3">CIRISProxy Logs</td>
                    <td className="p-3">7 days</td>
                    <td className="p-3">Permanently deleted (no content logged)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Note:</strong> These are maximum retention periods. We will not extend these periods without explicit user consent and advance notice. We aim to retain data for the shortest period necessary.
              </p>
            </div>
          </div>

          {/* 90-Day Decay */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              5. 90-Day Decay Protocol
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
              6. Your Privacy Rights
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
              7. Data Security Measures
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

          {/* Third Parties */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              8. Third-Party Services
            </h2>
            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                We Do NOT:
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>Sell your data to anyone</li>
                <li>Share data with advertisers or marketing platforms</li>
                <li>Use your content to train AI models</li>
                <li>Provide data to analytics services (we self-host all analytics)</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                We DO Share Data With:
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Stripe (Payment Processing)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For credit purchases only. We do not store credit card information. Stripe's privacy policy: <a href="https://stripe.com/privacy" className="text-blue-600 hover:underline dark:text-blue-400">stripe.com/privacy</a>
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Google OAuth (Optional Authentication)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you choose Google login, we receive name, email, and profile photo. Google's privacy policy: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline dark:text-blue-400">policies.google.com/privacy</a>
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">LLM Providers (OpenRouter, Groq, Together)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your prompts are sent to LLM providers for processing. We use providers with strong privacy commitments and no training policies.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                We MAY Share Data:
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>When required by law (subpoenas, court orders)</li>
                <li>To prevent imminent harm or illegal activity</li>
                <li>With your explicit written consent</li>
                <li>In anonymized/aggregated form for research (no PII)</li>
              </ul>
            </div>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              9. International Data Transfers
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
              10. Children's Privacy
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
              11. Changes to This Policy
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

          {/* Covenant */}
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              12. CIRIS Covenant Principles
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This privacy policy is governed by the CIRIS Covenant (Version 1.0-β), which establishes our ethical foundation:
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
              13. Contact Information
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
            <p className="mt-2">© 2025 Eric Moore and CIRIS L3C | Apache 2.0 License</p>
            <p className="mt-2">Last Updated: November 29, 2025 | Version 1.3.0</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
