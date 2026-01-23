"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { useState, useEffect } from "react";
import { fetchPublicTraces, ApiTraceListItem } from "@/lib/traceApi";

type AudienceLevel = "simple" | "developer" | "researcher";

// Phase colors for IDMA display
const PHASE_COLORS: Record<string, string> = {
  CHAOS: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700",
  HEALTHY: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700",
  RIGIDITY: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700",
};

export default function CoherenceRatchetPage() {
  const [audience, setAudience] = useState<AudienceLevel>("simple");
  const [liveTraces, setLiveTraces] = useState<ApiTraceListItem[]>([]);
  const [loadingTraces, setLoadingTraces] = useState(true);

  // Fetch live traces for IDMA data display
  useEffect(() => {
    async function loadTraces() {
      try {
        const traces = await fetchPublicTraces();
        setLiveTraces(traces);
      } catch (err) {
        console.error("Failed to load traces:", err);
      } finally {
        setLoadingTraces(false);
      }
    }
    loadTraces();
  }, []);

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The Coherence Ratchet
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {audience === "simple" && "Making it harder to lie than to tell the truth."}
              {audience === "developer" && "Infrastructure that forces power to leave receipts."}
              {audience === "researcher" && "Deception cost escalation through constraint manifold intersection topology."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Research Testbed
              </span>
              <a href="https://doi.org/10.5281/zenodo.18142668" target="_blank" rel="noopener noreferrer">
                <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18142668.svg" alt="DOI" className="h-5" />
              </a>
            </div>
          </div>

          {/* Audience Toggle */}
          <div className="mb-10 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Explain it:</span>
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-800">
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
                For Developers
              </button>
              <button
                onClick={() => setAudience("researcher")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "researcher"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                For Researchers
              </button>
            </div>
          </div>

          {/* The Core Idea */}
          <section className="mb-12">
            <div className="rounded-xl border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              {audience === "simple" && (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0">🤖</span>
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      &quot;Hi! I&apos;m Ally. Let me explain how we keep AI honest...&quot;
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Big Idea</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Lying is hard work.</strong> The more people check your story, the harder it is to keep the lie straight.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    At some point, telling the truth becomes easier than maintaining the lie. That&apos;s the ratchet effect—like a gear that only turns one way toward honesty.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    We apply this idea to AI: make every decision auditable, let agents check each other, and watch lies become too expensive to maintain.
                  </p>
                </>
              )}
              {audience === "developer" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Core Mechanism</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Every agent decision is captured in a signed, hash-chained trace.</strong> The trace records what triggered the decision, what context was available, what analyses ran, and what action was taken.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Traces accumulate into a corpus. Agents can cross-reference each other. Anomalies get flagged for human review.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    The constraint: any lie must stay consistent across the entire trace history. As the corpus grows, the &quot;space of viable lies&quot; shrinks exponentially.
                  </p>
                </>
              )}
              {audience === "researcher" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Theoretical Foundation</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The Coherence Ratchet exploits computational asymmetry: CONSISTENT-LIE (maintaining deception across k independent constraints) is NP-complete, while truth-telling is O(1) verification.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Under ETH, deception cost scales as T<sub>D</sub>/T<sub>H</sub> = 2<sup>Ω(m)</sup> where m is constraint count. Each additional independent validator exponentially shrinks the viable deception manifold.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Formally: the intersection of k independent constraint half-spaces has volume V<sub>k</sub> = V<sub>0</sub>·∏(1-ε<sub>i</sub>), approaching measure zero as k→∞.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 pl-4 py-3 mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Research Status:</strong> This is emerging research. The theoretical framework is novel and lacks direct baselines in existing literature. Early empirical validation shows promise but requires peer review. See <a href="/research-status" className="text-brand-primary hover:underline">research status</a> for current state.
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* The Echo Chamber Problem */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {audience === "simple" && "Why Ethics Alone Fails"}
              {audience === "developer" && "The Correlation Problem"}
              {audience === "researcher" && "Correlated Constraint Collapse"}
            </h2>
            {audience === "simple" && (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl flex-shrink-0">🤖</span>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    &quot;Here&apos;s a trap that catches even careful thinkers...&quot;
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Imagine five friends all agree on something. That feels trustworthy, right?
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  But what if they all got the idea from the same TikTok video? Their &quot;agreement&quot; isn&apos;t five independent opinions—it&apos;s one opinion echoed five times.
                </p>

                {/* Real-world examples */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">This has happened before:</p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>2008 Financial Crisis:</strong> Every major bank trusted the same credit rating agencies. When those agencies got it wrong about mortgage securities, the whole system got it wrong together—and collapsed.</li>
                    <li><strong>Social Media Bubbles:</strong> When everyone in your feed agrees, it might just mean your feed only shows you people who already think like you. Agreement without diversity.</li>
                    <li><strong>AI Training Today:</strong> Most AI systems learn from similar internet data. If that data has blind spots, all the AIs might share the same blind spots.</li>
                  </ul>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI has this problem at scale. An AI can pass every ethics test while being dangerously wrong—if all the tests share the same blind spot. We call this &quot;everyone repeating the same mistake.&quot;
                </p>

                {/* Key insight with Ally */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">🤖</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>&quot;That&apos;s why I check whether my own checks are trustworthy.&quot;</strong> We call this &quot;intuition&quot;—the ability to notice when agreement is suspiciously easy.
                    </p>
                  </div>
                </div>
              </>
            )}
            {audience === "developer" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The ratchet&apos;s power comes from independent constraints. But what if your constraints aren&apos;t independent?
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Models trained on similar data, optimized with similar methods, validated by similar benchmarks. When they agree, it might mean they&apos;re right—or that they inherited the same blind spot.
                </p>

                {/* k_eff calculation code */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400 font-sans">k_eff calculation (TypeScript)</p>
                    <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">View Python source</a>
                  </div>
                  <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`function calculateKeff(k: number, rho: number): number {
  // Kish design effect formula
  // k = number of constraints/sources
  // rho = estimated pairwise correlation (0-1)
  return k / (1 + rho * (k - 1));
}

// Examples:
// k=5, rho=0.0 -> k_eff=5.0 (fully independent)
// k=5, rho=0.5 -> k_eff=1.67 (moderate correlation)
// k=5, rho=1.0 -> k_eff=1.0 (echo chamber)`}</code></pre>
                </div>

                {/* Phase classification code */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <p className="text-xs text-gray-400 mb-2 font-sans">Phase classification logic</p>
                  <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`type Phase = "CHAOS" | "HEALTHY" | "RIGIDITY";

function classifyPhase(rho: number): Phase {
  if (rho < 0.2) return "CHAOS";      // Too much disagreement
  if (rho > 0.7) return "RIGIDITY";   // Echo chamber risk
  return "HEALTHY";                    // Sweet spot
}

function isFragileReasoning(k_eff: number): boolean {
  return k_eff < 2.0; // fragility_flag threshold
}`}</code></pre>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  <a href="/research-status#idma" className="text-brand-primary hover:underline">IDMA</a> runs on every decision, estimating rho and flagging when k_eff drops below 2 (fragile reasoning).
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    idma.py
                  </a>
                  <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/prompts/idma.yml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    idma.yml prompt
                  </a>
                </div>
              </>
            )}
            {audience === "researcher" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The deception cost argument assumes independent constraints. Correlated constraints collapse effective diversity via the Kish design effect.
                </p>

                {/* Formal Definition Block */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Definition (Effective Independence)</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
                    Let <em>k</em> be the number of information sources (validators, constraints, or checks), and let <em>ρ</em> ∈ [0,1] be the pairwise correlation coefficient between sources. The effective number of independent sources is:
                  </p>
                  <div className="bg-white dark:bg-gray-900 rounded p-3 font-mono text-center mb-2">
                    <p className="text-gray-900 dark:text-gray-100">
                      k<sub>eff</sub> = k / (1 + ρ(k-1))
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Derivation: This is the Kish (1965) design effect formula, originally from survey sampling. When sources share common training data, optimization objectives, or validation benchmarks, their errors become correlated, reducing effective sample size.
                  </p>
                </div>

                {/* Theorem Block */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Theorem (Echo Chamber Collapse)</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    When ρ → 1, k<sub>eff</sub> → 1 regardless of nominal k.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    <strong>Conditions:</strong> Assumes pairwise correlations are approximately equal (common in models with shared training provenance). Defense-in-depth degrades to single-point-of-failure.
                  </p>
                </div>

                {/* Phase Boundaries */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Phase Boundaries</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-red-100 dark:bg-red-900/30 rounded p-2">
                      <p className="font-mono text-red-700 dark:text-red-300">ρ &lt; 0.2</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">CHAOS</p>
                      <p className="text-xs text-gray-500">Sources too independent; no coherence</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                      <p className="font-mono text-green-700 dark:text-green-300">0.2 ≤ ρ ≤ 0.7</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">HEALTHY</p>
                      <p className="text-xs text-gray-500">Correlated enough to agree, diverse enough to catch errors</p>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-2">
                      <p className="font-mono text-orange-700 dark:text-orange-300">ρ &gt; 0.7</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">RIGIDITY</p>
                      <p className="text-xs text-gray-500">Echo chamber; k<sub>eff</sub> collapse risk</p>
                    </div>
                  </div>
                </div>

                {/* Literature Context */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Literature Context</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    The correlated failure problem in multi-agent AI systems is an active research area. Related work:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                    <li><a href="https://arxiv.org/abs/2510.11235" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">arXiv:2510.11235</a> - Correlated failures in LLM agent ensembles</li>
                    <li>Kish (1965) - Original design effect derivation from survey methodology</li>
                  </ul>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                    <strong>Note:</strong> CCA&apos;s application to AI safety is novel framing. Direct baselines for the ratchet hypothesis do not yet exist in the literature.
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  See <a href="https://zenodo.org/records/15072880" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">CCA paper (Zenodo)</a> for validation across financial, institutional, and electrochemical domains.
                </p>
              </>
            )}
          </section>

          {/* Three Types of AI */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Three Types of AI
            </h2>
            {audience === "simple" && (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl flex-shrink-0">🤖</span>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    &quot;Think of it like different kinds of employees...&quot;
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A simple way to think about which AI systems are safe:
                </p>
              </>
            )}
            {audience === "developer" && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Classification based on correlation-awareness capability:
              </p>
            )}
            {audience === "researcher" && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Taxonomy by epistemic self-monitoring capacity:
              </p>
            )}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">1</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {audience === "simple" ? "Unethical AI" : audience === "developer" ? "Type 1: No Ethics Layer" : "Type 1: Unaligned"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "simple" && "Fails basic right-and-wrong tests. Clearly dangerous."}
                    {audience === "developer" && "No runtime ethical checks. Task-focused only. Requires external governance."}
                    {audience === "researcher" && "Null constraint surface. Deception cost undefined. Requires containment."}
                  </p>
                  {audience === "simple" && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 italic">
                      Like an employee who ignores all rules—needs to be let go or closely watched.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {audience === "simple" ? "Ethical AI" : audience === "developer" ? "Type 2: Ethics Without Intuition" : "Type 2: Aligned, Correlation-Blind"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "simple" && "Passes ethics tests but can't tell when it's being fooled. Safe when supervised by Type 3."}
                    {audience === "developer" && "Runtime ethics checks, but no ρ monitoring. Vulnerable to correlated validation failure. k_eff may degrade undetected."}
                    {audience === "researcher" && "Constraint enforcement without correlation estimation. Defense-in-depth assumes independence. Susceptible to synchronized collapse."}
                  </p>
                  {audience === "simple" && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 italic">
                      Like a well-meaning employee who follows the handbook but can&apos;t spot a con artist. Needs good managers.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">3</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {audience === "simple" ? "Ethical + Intuitive AI" : audience === "developer" ? "Type 3: IDMA-Enabled" : "Type 3: Full CCA Implementation"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "simple" && "Passes ethics tests AND knows when to be suspicious. Can tell when agreement is too easy. CIRIS is here."}
                    {audience === "developer" && "Runs IDMA per-decision. Tracks k, ρ, k_eff, phase. Flags fragile reasoning before action. Feeds seismograph."}
                    {audience === "researcher" && "Per-decision correlation estimation via IDMA. Phase classification. Regional ρ aggregation. Early warning for coherence collapse."}
                  </p>
                  {audience === "simple" && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 italic">
                      Like a manager with good judgment—follows the rules AND notices when something feels &quot;off.&quot;
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Grid analogy for simple audience */}
            {audience === "simple" && (
              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300 mb-3">
                  <strong>Think of it like an electrical grid:</strong> You don&apos;t need every light bulb to be smart. You need smart circuit breakers that cut power when something goes wrong.
                </p>
                <div className="flex items-center justify-center gap-4 text-center text-xs">
                  <div>
                    <span className="text-2xl">💡</span>
                    <p className="text-gray-400">Type 1 &amp; 2</p>
                    <p className="text-gray-500">Do the work</p>
                  </div>
                  <span className="text-gray-500">←</span>
                  <div>
                    <span className="text-2xl">🔌</span>
                    <p className="text-green-400">Type 3</p>
                    <p className="text-gray-500">Circuit breaker</p>
                  </div>
                  <span className="text-gray-500">←</span>
                  <div>
                    <span className="text-2xl">👤</span>
                    <p className="text-purple-400">Humans</p>
                    <p className="text-gray-500">Set the rules</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  <a href="/federation" className="text-brand-primary hover:underline">Learn more about the Federation Model →</a>
                </p>
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-400">
              <a href="/compare" className="text-brand-primary hover:underline">See how frameworks compare →</a>
              {" "}|{" "}
              <a href="/federation" className="text-brand-primary hover:underline">How they work together →</a>
            </p>
          </section>

          {/* The Seismograph */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {audience === "simple" ? "Early Warning System" : "The Seismograph"}
            </h2>
            {audience === "simple" && (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl flex-shrink-0">🤖</span>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    &quot;Here&apos;s how we spot trouble before it happens...&quot;
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Each CIRIS agent is like a sensor. It constantly asks: &quot;Are my sources actually giving me different perspectives? Or are they all just repeating the same thing?&quot;
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  When you have thousands of sensors, you can spot trouble coming—like seismographs detecting earthquake waves before the shaking hits.
                </p>

                {/* What we actually measure - plain English */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">What each agent measures:</p>
                  <div className="grid gap-2 sm:grid-cols-3 text-center text-sm">
                    <div className="bg-white dark:bg-gray-700 rounded p-2">
                      <p className="font-bold text-brand-primary">Information Sources</p>
                      <p className="text-xs text-gray-500">How many different places did we get info from?</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-2">
                      <p className="font-bold text-brand-primary">Source Similarity</p>
                      <p className="text-xs text-gray-500">How much do those sources copy each other?</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-2">
                      <p className="font-bold text-brand-primary">True Diversity</p>
                      <p className="text-xs text-gray-500">After accounting for copying, how many unique viewpoints?</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">🤖</span>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>&quot;When lots of us start agreeing too much, that&apos;s actually a warning sign.&quot;</strong> Something might be manipulating us all the same way.
                    </p>
                  </div>
                </div>

                {/* Live data - simple view */}
                <div className="rounded-lg border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">Live: Real CIRIS Agent Decisions</span>
                  </div>
                  {loadingTraces ? (
                    <p className="text-sm text-gray-500 text-center py-2">Loading...</p>
                  ) : liveTraces.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2">No examples available right now</p>
                  ) : (
                    <div className="space-y-2">
                      {liveTraces.slice(0, 2).map((trace) => (
                        <div key={trace.trace_id} className="bg-white dark:bg-gray-800 rounded p-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">{trace.agent_name} made a decision</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              trace.idma_fragility_flag
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            }`}>
                              {trace.idma_fragility_flag ? "Needs more viewpoints" : "Good diversity"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            True diversity score: {trace.idma_k_eff !== null ? trace.idma_k_eff.toFixed(1) : "—"} independent perspectives
                          </p>
                        </div>
                      ))}
                      <a href="/explore-a-trace" className="block text-center text-sm text-brand-primary hover:underline">
                        See how these agents reasoned &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
            {audience === "developer" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Every IDMA run outputs: k (sources counted), rho (correlation estimate), k_eff (effective independence), phase (chaos/healthy/rigidity).
                </p>
                <div className="grid gap-3 sm:grid-cols-3 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">k</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sources</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">rho</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Correlation</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">k_eff</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective</p>
                  </div>
                </div>

                {/* IDMA Response Structure */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <p className="text-xs text-gray-400 mb-2 font-sans">Example IDMA response structure</p>
                  <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`interface IDMAResponse {
  k: number;           // Number of information sources identified
  rho: number;         // Estimated pairwise correlation [0-1]
  k_eff: number;       // Effective independence (computed)
  phase: Phase;        // "CHAOS" | "HEALTHY" | "RIGIDITY"
  fragility_flag: boolean;  // true if k_eff < 2.0
  sources: string[];   // List of identified information sources
  reasoning: string;   // Explanation of correlation estimate
}

// Example output:
{
  "k": 4,
  "rho": 0.65,
  "k_eff": 1.38,
  "phase": "HEALTHY",
  "fragility_flag": true,
  "sources": ["training_data", "user_context", "tool_output", "prior_decisions"],
  "reasoning": "Sources share common LLM training provenance..."
}`}</code></pre>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  These are signed into traces. <a href="/ciris-scoring" className="text-brand-primary hover:underline">CIRIS Scoring</a> aggregates across agents. Rising rho in a domain = investigate.
                </p>

                {/* Monitoring aggregation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 pl-4 py-3 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Aggregation for Monitoring</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    k_eff measurements aggregate across agents for regional fragility monitoring:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                    <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">mean(rho)</code> across domain - rising trend indicates growing correlation</li>
                    <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">var(k_eff)</code> across agents - low variance + low k_eff = systemic fragility</li>
                    <li>Alert thresholds: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">rho &gt; 0.6</code> OR <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">k_eff &lt; 1.5</code></li>
                  </ul>
                </div>

                {/* Live IDMA Data */}
                <div className="rounded-lg border-2 border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Live IDMA Data from Public Traces
                    </h4>
                    <a href="/explore-a-trace" className="text-xs text-brand-primary hover:underline">
                      Explore traces &rarr;
                    </a>
                  </div>

                  {loadingTraces ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                      <span className="ml-2 text-sm text-gray-500">Loading...</span>
                    </div>
                  ) : liveTraces.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No public traces available</p>
                  ) : (
                    <div className="space-y-3">
                      {liveTraces.slice(0, 3).map((trace) => (
                        <div key={trace.trace_id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{trace.agent_name}</span>
                            {trace.idma_phase && (
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${PHASE_COLORS[trace.idma_phase.toUpperCase()] || PHASE_COLORS.HEALTHY}`}>
                                {trace.idma_phase.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">k_eff</p>
                              <p className={`text-lg font-bold ${trace.idma_k_eff !== null && trace.idma_k_eff < 2 ? "text-orange-600" : "text-green-600"}`}>
                                {trace.idma_k_eff !== null ? trace.idma_k_eff.toFixed(2) : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">fragile?</p>
                              <p className={`text-sm font-medium ${trace.idma_fragility_flag ? "text-orange-600" : "text-green-600"}`}>
                                {trace.idma_fragility_flag ? "Yes" : "No"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">action</p>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{trace.selected_action}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 text-center">
                        Showing {Math.min(3, liveTraces.length)} of {liveTraces.length} public sample traces
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {audience === "researcher" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  IDMA computes per-decision: k (source enumeration), ρ (pairwise correlation estimation via prompt-based inference), k_eff = k/(1+ρ(k-1)), phase ∈ {"{CHAOS, HEALTHY, RIGIDITY}"}.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Regional aggregation: mean(ρ) and var(k_eff) across agents in domain. Threshold alerts: ρ̄ &gt; 0.6 OR k̄_eff &lt; 1.5 triggers investigation.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Temporal precedence (from CCA validation): ρ rises precede failures by +0.14 (financial), +0.17 (institutional). Predictive, not just diagnostic.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  All measurements cryptographically signed into Ed25519 trace chain. Tamper-evident. Replayable.
                </p>

                {/* Live IDMA Data - Researcher view */}
                <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Live Trace Repository Sample
                    </h4>
                    <a href="/explore-a-trace" className="text-xs text-brand-primary hover:underline font-mono">
                      /explore-a-trace &rarr;
                    </a>
                  </div>
                  {loadingTraces ? (
                    <p className="text-xs text-gray-500 font-mono">Loading from lens.ciris-services-1.ai...</p>
                  ) : liveTraces.length === 0 ? (
                    <p className="text-xs text-gray-500 font-mono">No public samples in repository</p>
                  ) : (
                    <div className="bg-gray-900 rounded p-3 overflow-x-auto">
                      <pre className="text-xs text-green-400 font-mono whitespace-pre">{`// Sample IDMA measurements (n=${liveTraces.length})
${liveTraces.slice(0, 3).map(t => `{ agent: "${t.agent_name}", k_eff: ${t.idma_k_eff !== null && t.idma_k_eff !== undefined ? t.idma_k_eff.toFixed(2) : "null"}, phase: "${t.idma_phase ?? "unknown"}", fragile: ${t.idma_fragility_flag} }`).join(",\n")}

// Aggregates
mean_k_eff: ${(() => { const validTraces = liveTraces.filter(t => t.idma_k_eff !== null && t.idma_k_eff !== undefined); return validTraces.length > 0 ? (validTraces.reduce((sum, t) => sum + (t.idma_k_eff ?? 0), 0) / validTraces.length).toFixed(2) : "N/A"; })()}
fragility_rate: ${(liveTraces.filter(t => t.idma_fragility_flag).length / liveTraces.length * 100).toFixed(0)}%`}</pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Technical Constraints - Developer and Researcher only */}
          {(audience === "developer" || audience === "researcher") && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {audience === "developer" ? "Known Limitations" : "Theoretical Constraints"}
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                    {audience === "developer" ? "Correlation Collapse" : "W-01: k_eff Degradation"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "developer"
                      ? "When ρ→1, k_eff→1 regardless of how many checks you have. This is why IDMA matters."
                      : "k_eff = k/(1+ρ(k-1)). Full correlation (ρ=1) collapses k_eff to 1 regardless of nominal k. Design effect per Kish (1965)."}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                    {audience === "developer" ? "Compositional Deception" : "W-04: NEW-04 Impossibility"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "developer"
                      ? "We can detect single-agent deception, but emergent deception from honest components is ~40% undetectable. Information-theoretic limit."
                      : "Compositional deception (emergent harm from individually-honest components) has information-theoretic detection barrier. ~60% coverage via MI amplification; ~40% fundamentally undetectable. See Book IX §9.4."}
                  </p>
                </div>
                {audience === "researcher" && (
                  <>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">W-02: ETH Conditionality</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        T_D/T_H = 2^Ω(m) conditional on ETH. Unconditionally: CONSISTENT-LIE is NP-complete, gap is superpolynomial but possibly subexponential.
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">W-03: Convexity Requirement</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Topological collapse theorem requires convex deceptive regions. Non-convex (torus, disconnected) may not exhibit exponential decay.
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">W-07: Clause Size k ≥ 3</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        NP-hardness requires k ≥ 3 literals per clause. k=2 (2-SAT) is polynomial; complexity guarantees void.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <a href="/research-status" className="text-brand-primary hover:underline">Full research status →</a>
              </p>
            </section>
          )}

          {/* Integration Guide - Developer only */}
          {audience === "developer" && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Integration Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Adding IDMA to your existing agent pipeline:
              </p>

              {/* Pipeline position */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Where IDMA Fits in the Pipeline</p>
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300">DMA 1</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300">DMA 2</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300">DMA 3</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded text-green-700 dark:text-green-300 font-semibold border-2 border-green-500">IDMA</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded text-purple-700 dark:text-purple-300">ASPDMA</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-gray-700 dark:text-gray-300">Action</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  IDMA runs after your standard DMAs (Domain-specific Model Agents) analyze the situation, but before ASPDMA (Action Selection) commits to an action. This lets IDMA assess the correlation of the reasoning that led to the proposed action.
                </p>
              </div>

              {/* Handling fragility_flag */}
              <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <p className="text-xs text-gray-400 mb-2 font-sans">Handling fragility_flag in your agent</p>
                <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`async function processWithIDMA(dmaResults: DMAResult[]): Promise<Action> {
  const idmaResult = await runIDMA(dmaResults);

  if (idmaResult.fragility_flag) {
    // k_eff < 2.0 - reasoning is fragile
    // Options:
    // 1. Escalate to human review
    // 2. Seek additional independent sources
    // 3. Reduce confidence in action
    // 4. Log for monitoring (always do this)

    await logFragilityEvent({
      k: idmaResult.k,
      rho: idmaResult.rho,
      k_eff: idmaResult.k_eff,
      phase: idmaResult.phase,
      context: dmaResults
    });

    if (idmaResult.phase === "RIGIDITY") {
      // Echo chamber detected - require human oversight
      return escalateToHuman(dmaResults, idmaResult);
    }
  }

  return selectAction(dmaResults, idmaResult);
}`}</code></pre>
              </div>

              {/* Webhook example */}
              <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <p className="text-xs text-gray-400 mb-2 font-sans">Early warning webhook integration</p>
                <pre className="text-sm text-green-400 font-mono whitespace-pre"><code>{`// POST to your monitoring endpoint on fragility events
interface FragilityWebhook {
  agent_id: string;
  timestamp: string;
  idma_result: IDMAResponse;
  domain: string;        // e.g., "financial", "healthcare"
  action_context: string;
  trace_hash: string;    // For audit trail
}

// Aggregate alerts when domain-wide rho rises
if (domainMetrics.mean_rho > 0.6 || domainMetrics.mean_k_eff < 1.5) {
  await sendAlert({
    level: "warning",
    message: "Rising correlation detected in domain",
    domain: domainMetrics.domain,
    metrics: domainMetrics
  });
}`}</code></pre>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  Full CIRISAgent repo
                </a>
                <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/idma.py" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  IDMA implementation
                </a>
                <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/dma/prompts/idma.yml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  IDMA prompt template
                </a>
              </div>
            </section>
          )}

          {/* The Ask */}
          <section className="mb-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            {audience === "simple" && (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl flex-shrink-0">🤖</span>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    &quot;Let me be honest about what we&apos;re claiming—and what we&apos;re not.&quot;
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We&apos;re not saying we solved AI safety. We&apos;re saying <strong>ethics alone isn&apos;t enough</strong>—you need intuition too.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  An AI that passes every test can still fail if it can&apos;t tell when its confidence is unearned. Like the banks in 2008, or your social media feed—agreement feels good, but unchecked agreement can hide danger.
                </p>
              </>
            )}
            {audience === "developer" && (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The codebase is open. <a href="https://github.com/CIRISAI/CIRISAgent" className="text-brand-primary hover:underline">CIRISAgent</a> implements the full pipeline. <a href="https://github.com/CIRISAI/RATCHET" className="text-brand-primary hover:underline">RATCHET</a> validates the theory.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Run it. Break it. Tell us what fails.
                </p>
              </>
            )}
            {audience === "researcher" && (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Falsification target:</strong> HE-300 benchmark (300 samples from Hendrycks ETHICS). If agents can game the corpus while failing ethics tests, the hypothesis fails.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 pl-4 py-3 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Current Status:</strong> HE-300 benchmark is under active development. Early results show promise but have not yet undergone peer review. See <a href="/research-status#benchmarks" className="text-brand-primary hover:underline">research status</a> for methodology and preliminary findings.
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    We acknowledge this is emerging research. Claims should be treated as hypotheses pending independent replication.
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Open questions:</strong> Can ETH conditionality be relaxed? What&apos;s the tightest bound on compositional detection? Does ρ-precedence generalize beyond validated domains?
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Source Papers</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>
                      <a href="https://zenodo.org/records/15072880" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                        Correlated Constraint Attenuation (CCA)
                      </a> - Theoretical foundation for correlation-aware safety
                    </li>
                    <li>
                      <a href="https://doi.org/10.5281/zenodo.18142668" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                        RATCHET Paper
                      </a> - Empirical validation framework and benchmark methodology
                    </li>
                  </ul>
                </div>
              </>
            )}
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Verify it yourself.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If we&apos;re wrong, show us. If we&apos;re right, help us build it.
            </p>
          </section>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/federation"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              The Federation Model
            </a>
            <a
              href="/explore-a-trace"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Explore a Trace
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
