"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function WhyCirisPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              What Is Ethical Agentic AI?
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              Everyone says they're building "ethical AI." Almost nobody can point to where, exactly, the ethics live in the stack.
            </p>
          </div>

          {/* The Challenge */}
          <div className="mt-12 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-900/20 dark:to-purple-900/20">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              For CIRIS, "ethical agentic AI" isn't branding. It's a strict technical definition.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              An AI system only qualifies if it meets ALL six requirements below. Not five. Six.
            </p>
          </div>

          {/* The 6 Requirements */}
          <div className="mt-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              The Six Requirements
            </h2>

            <div className="space-y-6">
              {/* Requirement 1 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  1. Published Covenant
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  The agent must be explicitly bound to a publicly available ethical charter with a meta-goal and foundational principles. Not "guidelines." Not "values we care about." A formal covenant the agent is obligated to follow, available for anyone to read and critique.
                </p>
              </div>

              {/* Requirement 2 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  2. Runtime Conscience
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Every meaningful action the agent takes must pass through an internal conscience pipeline before execution. Speaking, invoking tools, changing memory. This is not a post-hoc filter or safety wrapper bolted on top. It's part of the agent's operational loop. Every. Single. Action.
                </p>
              </div>

              {/* Requirement 3 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  3. Human Deferral (Wise Authority)
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  When the agent encounters uncertainty, conflicting values, or potential harm, it must defer to human oversight with full context. Built-in workflow, not a design-time suggestion. The agent knows when it's out of its depth and asks for help instead of guessing.
                </p>
              </div>

              {/* Requirement 4 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  4. Cryptographic Audit Trail
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Every action, every rationale, every decision must be recorded in an immutable, signed ledger. Not "we log some things." Everything. Verifiable at any time by anyone with access. You should be able to trace exactly why the agent did what it did.
                </p>
              </div>

              {/* Requirement 5 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  5. Bilateral Consent
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Consent is symmetric. Humans can refuse data access. But the agent can also refuse partnerships or data collection if it would violate its ethical constraints. The agent isn't just a tool that does whatever you want. It has principles it won't compromise.
                </p>
              </div>

              {/* Requirement 6 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  6. Fully Open Source
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Ethical AI cannot be closed source. It cannot be patented. You cannot audit compliance when the implementation is hidden. "Trust us, it's ethical" is not ethical. Show the code or it doesn't count.
                </p>
                <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  If your "ethical AI" company won't show you the code, they're not building ethical AI. They're building a product and calling it ethical.
                </p>
              </div>
            </div>
          </div>

          {/* The Line */}
          <div className="mt-12 rounded-lg border-4 border-yellow-500 bg-yellow-50 p-8 dark:bg-yellow-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              This Is a Hard Line
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              These aren't suggestions. This is the bar. If you want to claim "ethical agentic AI," you need to put all six on the table, in code, not just in a paper or a pitch deck.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Governance frameworks are useful. Security scanners are useful. Policy constraint languages are useful. But they are not ethical agents. They're layers around agents, not agents themselves.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              How CIRIS Compares
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              There's good work happening in the space. But none of it delivers all six requirements in a single, running system.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="p-3 text-left font-bold text-gray-900 dark:text-white">Requirement</th>
                    <th className="p-3 text-center font-bold text-brand-primary">CIRIS</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Governance Frameworks</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Policy Constraints</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Scanners/Auditors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Published Covenant</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Runtime Conscience</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Human Deferral</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Concept</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Cryptographic Audit</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Partial</td>
                    <td className="p-3 text-center text-yellow-500">If built</td>
                    <td className="p-3 text-center text-yellow-500">Reports</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Bilateral Consent</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Open Source</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">What these other things actually are:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li><strong>Governance frameworks</strong> (AGENTSAFE, etc.) provide checklists and controls, but don't ship an agent that runs a conscience on every verb.</li>
                <li><strong>Policy artifacts</strong> (Policy Cards, etc.) define constraints, but don't enforce them inside the agent's action loop.</li>
                <li><strong>Scanners</strong> (MCPSafetyScanner, etc.) assess behavior after the fact, but don't embed ethical decisioning into the agent.</li>
              </ul>
              <p className="mt-3">
                These are useful components. They are not ethical agents.
              </p>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mt-12 rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Why This Matters
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              If an AI system can act autonomously without an enforceable ethical grounding, human deferral when uncertain, and verifiable records of what it did, then we have no reliable way to audit, challenge, correct, or constrain its behavior.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              That's not alignment. That's not accountability. That's risk without recourse.
            </p>
            <p className="mt-4 font-semibold text-gray-900 dark:text-white">
              CIRIS was built to close that gap.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border-4 border-green-500 bg-green-50 p-8 text-center dark:bg-green-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Prove Me Wrong
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              If there's another stack that does all six end-to-end, in code, running in production, I want to see it.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Until then:
            </p>
            <div className="mt-6 rounded-md bg-gray-900 p-4">
              <code className="text-green-400">pip install ciris-agent</code>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Try it. Read the code. Tell me it's wrong. That's how this works.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
              >
                View Source on GitHub
              </a>
              <a
                href="/sections/main"
                className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-800"
              >
                Read the Covenant
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
