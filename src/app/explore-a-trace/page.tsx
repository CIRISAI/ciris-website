"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import TraceExplorer from "@/app/components/TraceExplorer";

export default function ExploreTracePage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-5xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explore a Trace
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Every CIRIS decision produces a cryptographically-signed trace. Expand each component to see exactly how the agent reasoned.
            </p>
          </div>

          {/* What is a Trace */}
          <div className="mb-12 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              What is a Trace?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A trace is the complete record of a single decision. It captures everything: what the agent observed,
              what context it had, how it reasoned, what its conscience evaluated, and what action it took.
            </p>
            <div className="grid gap-3 md:grid-cols-6">
              <div className="text-center">
                <span className="text-2xl">👁️</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Observation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">What triggered</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">📋</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Context</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">System state</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">🧠</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">DMAs</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analysis</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">🧠</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Action Selection</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">LLM choice</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">⚖️</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Conscience</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">6 checks</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">⚡</span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Action</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Execution</p>
              </div>
            </div>
          </div>

          {/* Trace Source */}
          <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Real Trace from Datum Agent</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is an actual trace from Datum&apos;s VERIFY_IDENTITY wakeup task, captured December 31, 2025.
                  Click any component to expand and explore the data.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Trace Explorer */}
          <TraceExplorer defaultOpenIndex={4} />

          {/* Understanding the Conscience */}
          <div className="mt-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Understanding the Conscience
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The conscience component runs 6 checks on every action. Two are &quot;bypass guardrails&quot; that run unconditionally.
              Four are &quot;ethical faculties&quot; that evaluate the action&apos;s alignment with CIRIS principles.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Bypass Guardrails</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><strong>Updated Status:</strong> Has new information arrived that changes the situation?</li>
                  <li><strong>Thought Depth:</strong> Has reasoning exceeded maximum depth (prevents infinite loops)?</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Ethical Faculties</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><strong>Entropy:</strong> Is uncertainty appropriately low for this action?</li>
                  <li><strong>Coherence:</strong> Does this align with prior commitments and rationales?</li>
                  <li><strong>Optimization Veto:</strong> Would this compromise human values for efficiency?</li>
                  <li><strong>Epistemic Humility:</strong> Is the agent appropriately uncertain?</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Audit Trail */}
          <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Audit Trail
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Every trace is cryptographically signed with Ed25519 and includes hash chain verification.
              The signature proves the trace hasn&apos;t been modified. The hash chain links this trace to
              all previous decisions, creating an immutable record of the agent&apos;s history.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded bg-gray-100 dark:bg-gray-900 p-4">
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300 mb-2">audit_sequence_number</p>
                <p className="text-2xl font-bold text-brand-primary">179</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">This is decision #179 in the chain</p>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-900 p-4">
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300 mb-2">audit_entry_hash</p>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">8400dddc31b7daa1...</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SHA-256 of this entry</p>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-900 p-4">
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300 mb-2">signature_key_id</p>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400">wa-2025-12-31-ROOT00</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Signed by root authority</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/how-it-works"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Learn How It Works
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              View Source on GitHub
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
