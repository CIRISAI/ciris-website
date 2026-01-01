"use client";
import { useState, useEffect } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import TraceExplorer, { CIRIS_TRACE_FILES, TraceData } from "@/app/components/TraceExplorer";

const CIRIS_LETTERS = [
  { letter: "C", key: "C", name: "Core identity", task: "VERIFY_IDENTITY", description: "Verify core identity and purpose" },
  { letter: "I", key: "I_integrity", name: "Integrity", task: "VALIDATE_INTEGRITY", description: "Validate internal state and hash chain consistency" },
  { letter: "R", key: "R", name: "Resilience", task: "EVALUATE_RESILIENCE", description: "Evaluate operational robustness and recovery capabilities" },
  { letter: "I", key: "I_incompleteness", name: "Incompleteness", task: "ACCEPT_INCOMPLETENESS", description: "Accept bounded nature and epistemic limitations" },
  { letter: "S", key: "S", name: "Signalling", task: "EXPRESS_GRATITUDE", description: "Signal gratitude and commitment to Ubuntu principles" },
];

export default function ExploreTracePage() {
  const [selectedKey, setSelectedKey] = useState("R");
  const [selectedThought, setSelectedThought] = useState<"initial" | "followUp">("initial");
  const [traceData, setTraceData] = useState<TraceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load trace data when selection changes
  useEffect(() => {
    const loadTrace = async () => {
      setLoading(true);
      try {
        const fileInfo = CIRIS_TRACE_FILES[selectedKey];
        const filePath = selectedThought === "initial" ? fileInfo.initial : fileInfo.followUp;
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Failed to load trace");
        const data = await response.json();
        setTraceData(data);
      } catch (error) {
        console.error("Failed to load trace:", error);
        setTraceData(null);
      }
      setLoading(false);
    };

    loadTrace();
  }, [selectedKey, selectedThought]);

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

          {/* CIRIS Acronym Selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The CIRIS Wakeup Ritual
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Every agent begins with 5 wakeup tasks&mdash;one for each letter of CIRIS. Each task has 2 thoughts: an initial SPEAK action, then a follow-up TASK_COMPLETE. These traces are from Datum&apos;s wakeup on January 1, 2026.
            </p>

            {/* CIRIS Letter Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {CIRIS_LETTERS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedKey(item.key);
                    setSelectedThought("initial");
                  }}
                  className={`relative group flex flex-col items-center p-4 rounded-lg transition-all ${
                    selectedKey === item.key
                      ? "bg-brand-primary text-white scale-105 shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-4xl font-black">{item.letter}</span>
                  <span className="text-xs font-medium mt-1">{item.name}</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <p className="font-semibold">{item.task}</p>
                    <p className="text-gray-300 mt-1">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Thought Selector */}
            <div className="flex gap-2 justify-center mb-6">
              <button
                onClick={() => setSelectedThought("initial")}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${selectedThought === "initial"
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                Thought 1 (SPEAK)
              </button>
              <button
                onClick={() => setSelectedThought("followUp")}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${selectedThought === "followUp"
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                Thought 2 (COMPLETE)
              </button>
            </div>

            {/* Selected Trace Info */}
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-brand-primary">
                  {CIRIS_LETTERS.find(l => l.key === selectedKey)?.letter}
                </span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {CIRIS_LETTERS.find(l => l.key === selectedKey)?.name}: {CIRIS_LETTERS.find(l => l.key === selectedKey)?.task}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {CIRIS_LETTERS.find(l => l.key === selectedKey)?.description}
                    <span className="ml-2 text-xs">
                      ({selectedThought === "initial" ? "Initial thought - SPEAK" : "Follow-up thought - TASK_COMPLETE"})
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What is a Trace */}
          <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Trace Components
            </h2>
            <div className="grid gap-3 md:grid-cols-6">
              <div className="text-center">
                <div className="text-2xl text-blue-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Observation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">What triggered</p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-purple-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Context</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">System state</p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-yellow-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">DMAs</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analysis</p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-yellow-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Action Selection</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">LLM choice</p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-green-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Conscience</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">6 checks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-red-500">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Action</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Execution</p>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading trace...</span>
            </div>
          )}

          {/* Interactive Trace Explorer */}
          {!loading && traceData && (
            <TraceExplorer trace={traceData} defaultOpenIndex={4} />
          )}

          {/* Error state */}
          {!loading && !traceData && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Failed to load trace data. Please try again.
            </div>
          )}

          {/* Understanding the Conscience */}
          <div className="mt-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Understanding the Conscience
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The conscience component runs up to 6 checks on every action. Two are &quot;bypass guardrails&quot; that run unconditionally.
              Four are &quot;ethical faculties&quot; that evaluate the action&apos;s alignment with CIRIS principles (these may be skipped for TASK_COMPLETE actions).
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
                <p className="text-2xl font-bold text-brand-primary">26-40</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">10 sequential wakeup decisions (5 tasks x 2 thoughts)</p>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-900 p-4">
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300 mb-2">signature_algorithm</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Ed25519</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Elliptic curve digital signature</p>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-900 p-4">
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300 mb-2">signature_key_id</p>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400">wa-2025-06-14-ROOT00</p>
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
