"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { useState } from "react";

type AudienceLevel = "simple" | "developer" | "researcher";

export default function CoherenceRatchetPage() {
  const [audience, setAudience] = useState<AudienceLevel>("simple");

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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Big Idea</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Lying is hard work.</strong> The more people check your story, the harder it is to keep the lie straight.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    At some point, telling the truth becomes easier than maintaining the lie. That&apos;s the ratchet effect.
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
                  <p className="text-gray-700 dark:text-gray-300">
                    Formally: the intersection of k independent constraint half-spaces has volume V<sub>k</sub> = V<sub>0</sub>·∏(1-ε<sub>i</sub>), approaching measure zero as k→∞.
                  </p>
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Imagine five friends all agree on something. That feels trustworthy, right?
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  But what if they all got the idea from the same TikTok video? Their &quot;agreement&quot; isn&apos;t five independent opinions—it&apos;s one opinion echoed five times.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI has this problem at scale. An AI can pass every ethics test while being dangerously wrong—if all the tests share the same blind spot.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>This is why CIRIS checks whether its own checks are trustworthy.</strong> That&apos;s what we call &quot;intuition.&quot;
                  </p>
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
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 font-mono text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    k_eff = k / (1 + ρ·(k-1))
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    k = constraints, ρ = correlation. At ρ=1, k_eff=1 regardless of k.
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="/research-status#idma" className="text-brand-primary hover:underline">IDMA</a> runs on every decision, estimating ρ and flagging when k_eff drops below 2 (fragile reasoning).
                </p>
              </>
            )}
            {audience === "researcher" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The deception cost argument assumes independent constraints. Correlated constraints collapse effective diversity via the Kish design effect.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 font-mono text-sm">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    k<sub>eff</sub> = k / (1 + ρ(k-1))
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    As ρ → 1, k<sub>eff</sub> → 1 regardless of nominal k. Defense-in-depth degrades to single-point-of-failure.
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Phase classification: ρ &lt; 0.2 (CHAOS), 0.2 ≤ ρ ≤ 0.7 (HEALTHY), ρ &gt; 0.7 (RIGIDITY). IDMA computes these per-decision and aggregates for regional fragility monitoring.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  See <a href="https://zenodo.org/records/18217688" className="text-brand-primary hover:underline">CCA paper</a> for validation across financial, institutional, and electrochemical domains.
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple way to think about which AI systems are safe:
              </p>
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
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {audience === "simple" ? "Ethical AI" : audience === "developer" ? "Type 2: Ethics Without Intuition" : "Type 2: Aligned, Correlation-Blind"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {audience === "simple" && "Passes ethics tests but can't tell when it's being fooled. Needs Type 3 in the mix to stay safe."}
                    {audience === "developer" && "Runtime ethics checks, but no ρ monitoring. Vulnerable to correlated validation failure. k_eff may degrade undetected."}
                    {audience === "researcher" && "Constraint enforcement without correlation estimation. Defense-in-depth assumes independence. Susceptible to synchronized collapse."}
                  </p>
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
                </div>
              </div>
            </div>
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Each CIRIS agent is like a sensor. It constantly asks: &quot;Are my sources actually independent? Is this agreement real or an echo chamber?&quot;
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  When you have thousands of sensors, you can spot trouble coming—like seismographs detecting earthquake waves before the shaking hits.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Rising agreement across many agents = early warning.</strong> Something might be manipulating them all the same way.
                  </p>
                </div>
              </>
            )}
            {audience === "developer" && (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Every IDMA run outputs: k (sources counted), ρ (correlation estimate), k_eff (effective independence), phase (chaos/healthy/rigidity).
                </p>
                <div className="grid gap-3 sm:grid-cols-3 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">k</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sources</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">ρ</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Correlation</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-brand-primary mb-1">k_eff</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  These are signed into traces. <a href="/ciris-scoring" className="text-brand-primary hover:underline">CIRIS Scoring</a> aggregates across agents. Rising ρ in a domain = investigate.
                </p>
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
                <p className="text-gray-600 dark:text-gray-400">
                  All measurements cryptographically signed into Ed25519 trace chain. Tamper-evident. Replayable.
                </p>
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

          {/* The Ask */}
          <section className="mb-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            {audience === "simple" && (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We&apos;re not saying we solved AI safety. We&apos;re saying <strong>ethics alone isn&apos;t enough</strong>—you need intuition too.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  An AI that passes every test can still fail if it can&apos;t tell when its confidence is unearned.
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
                  Falsification target: HE-300 benchmark (300 samples from Hendrycks ETHICS). If agents can game the corpus while failing ethics tests, the hypothesis fails.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Open questions: Can ETH conditionality be relaxed? What&apos;s the tightest bound on compositional detection? Does ρ-precedence generalize beyond validated domains?
                </p>
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
