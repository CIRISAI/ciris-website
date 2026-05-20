"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function CoherenceCollapseAnalysisPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Mathematical foundation
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                Lean-formalized
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Empirically validated
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Coherence Collapse Analysis (CCA)
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Coherence-based alignment, with effective dimensionality measurable on production traces.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              The Coherence Collapse Analysis (CCA) is the mathematical foundation under
              CIRIS&apos;s coherence-based alignment thesis. It says when accumulating
              constraints actually defend against deception, and when they collapse into an
              echo chamber regardless of how many you add. The central tool is the Kish design
              effect, applied to AI alignment for the first time. The empirical anchor is the
              Constrained Reasoning Chains study on 6,465+ production agent traces.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Read the CCA paper
              </a>
              <a
                href="https://github.com/CIRISAI/RATCHET"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Lean formalization (RATCHET)
              </a>
              <a
                href="https://zenodo.org/records/19839280"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Empirical anchor (CRC)
              </a>
            </div>
          </section>

          {/* Coherence-Based Alignment */}
          <section id="coherence-based-alignment" className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The thesis
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Coherence-Based Alignment.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Coherence-Based Alignment (CBA) is the position that an AI system stays aligned
              not by being trained on the right values once, but by being structurally required
              to maintain coherence across many <em>independent</em> constraints over time. The
              constraints accumulate. The space of trace shapes consistent with deception
              shrinks. Truth occupies the intersection of every constraint manifold; deception
              has to satisfy all of them simultaneously, which is a different and harder
              problem.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The catch: independence is load-bearing. Correlated constraints provide little
              additional security regardless of how many of them there are. CCA is the formal
              treatment of when constraints stop being independent and start being an echo
              chamber.
            </p>
          </section>

          {/* Kish design effect */}
          <section id="kish-design-effect" className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The central formula
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The Kish design effect, applied to AI alignment.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The Kish design effect is a survey-statistics formula for converting a nominal
              sample size into the effective sample size when observations are correlated. CCA
              uses it to convert a nominal constraint count into the effective independent
              constraint count.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-slate-200">
              <div className="text-slate-900 dark:text-white">
                k_eff = k / (1 + ρ · (k − 1))
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                where k is the number of constraints and ρ is the average pairwise correlation
                between them.
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300 md:grid-cols-2">
              <li>
                <strong className="text-slate-900 dark:text-white">ρ = 0:</strong> independent
                constraints. k_eff = k. Every constraint adds.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">ρ = 1:</strong> perfectly
                correlated constraints. k_eff = 1, no matter how many of them. The echo chamber.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Critical rigidity:</strong>{" "}
                ρ_crit = 0.43. k_eff ≈ 2.3 at collapse, verified numerically in the Lean
                formalization.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Healthy corridor:</strong>{" "}
                0.2 &lt; ρ &lt; 0.7, below the singularity curve K_req · ρ = 1.
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Source:{" "}
              <a
                href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet-math/RatchetMath/FundamentalIdentity.lean"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                FundamentalIdentity.lean
              </a>
              {" "}(rigidity_collapse, ρ_crit, k_eff_at_collapse, k_eff_rho_crit_relation).
            </p>
          </section>

          {/* Effective dimensionality */}
          <section id="effective-dimensionality" className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The empirical surface
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Effective dimensionality on production AI traces.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The Constrained Reasoning Chains study built a 17-dimension constraint vector per
              trace from fields the lens already extracts at ingest, then computed two
              effective-dimensionality measures from the eigenvalue spectrum: participation
              ratio and entropy perplexity. Both are reported because they bound the answer
              from different sides.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Lifetime peak
                </h3>
                <p className="mt-2 text-3xl font-bold text-brand-primary">
                  N_eff_H = 9.51
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Entropy-perplexity measure. Reached mid-April 2026, on a corpus going back to
                  2026-03-02.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Lifetime mean
                </h3>
                <p className="mt-2 text-3xl font-bold text-brand-primary">
                  N_eff_H = 7.20
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Mean across rolling 500-trace windows over the full corpus. Includes mixed
                  organic and QA-class traffic.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Operational floor
                </h3>
                <p className="mt-2 text-3xl font-bold text-brand-primary">
                  k_eff ≥ 9.2
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Stability condition for operational autonomy in the Lean formalization
                  (TruthManifold.is_stable).
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
              These are not the same number. The 9.51 peak is the maximum measured organic
              codimension. The 7.20 mean is the corpus-wide average across mixed traffic. The
              9.2 floor is the formal stability threshold the architecture targets. Reporting
              all three keeps the metric honest.
            </p>
          </section>

          {/* Singularity boundary */}
          <section id="singularity-boundary" className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The boundary
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The singularity boundary.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Above the singularity curve, time-to-truth diverges to infinity. Correlated
              constraints provide no additional security regardless of scale or time. The
              singularity is the deterministic edge of the healthy corridor: between the chaos
              regime (ρ &lt; 0.2) and the rigidity regime (ρ &gt; 0.7), below the curve K_req
              · ρ = 1.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300 md:grid-cols-2">
              <li>
                <strong className="text-slate-900 dark:text-white">Singularity condition</strong>{" "}
                : K_req · ρ ≥ 1. Above this curve, T_truth → ∞.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Time to truth</strong>:{" "}
                T_truth = K_req · (1 − ρ) / [α · (1 − K_req · ρ)].
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Required constraints</strong>{" "}
                : K_req = −ln(ε / V₀) / λ for safety target ε.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Volume decay</strong>:{" "}
                V(k) = V₀ · exp(−λ · k_eff). Deceptive volume collapses exponentially in
                effective constraints.
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Source:{" "}
              <em>Coherence Collapse Analysis</em>{" "}
              (
              <a
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Zenodo
              </a>
              ) and the Lean formalization in{" "}
              <a
                href="https://github.com/CIRISAI/RATCHET/tree/main/ratchet-math"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAI/RATCHET
              </a>
              .
            </p>
          </section>

          {/* L-01 ceiling */}
          <section className="mb-14 rounded-3xl border-l-4 border-amber-400 bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              The honest ceiling
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              L-01: what no detector can do.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The CCA paper proves an information-theoretic limitation. Roughly 60% of emergent
              incoherence is detectable from marginal distributions; roughly 40% is
              fundamentally undetectable by any polynomial-time complete detector for
              compositional deception. The singularity is the deterministic boundary; L-01 is
              the information-theoretic ceiling on what any singularity-aware detector can see.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              CCA is a topological cost-asymmetry argument over time, not a pointwise decision
              procedure. It says that running real ethical reasoning over weeks is structurally
              more expensive than producing single deceptive outputs that defeat any single
              detector, not that the deceptive output can always be caught.
            </p>
          </section>

          {/* Related work */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Related work
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Where this sits in the literature.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <li>
                <strong className="text-slate-900 dark:text-white">Coherence-Based Alignment (CBA), PhilArchive.</strong>{" "}
                An independent paper using nearly identical framing. CCA provides the formal
                apparatus and empirical validation that the CBA philosophical framing calls
                for.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Effective dimensionality in ML.</strong>{" "}
                Active term in the adversarial-robustness and generalization literature
                (Khachaturov &amp; Mullins; Maddox / Wilson). CCA bridges this measurement to
                AI alignment governance with production data.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Perspectival homogenization, FAccT 2025.</strong>{" "}
                Coined in &quot;Value of Disagreement in AI Design, Evaluation, and
                Alignment.&quot; This is the failure mode CCA measures structurally.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Constrained Reasoning Chains (CRC).</strong>{" "}
                The empirical telemetry study published April 2026 ({" "}
                <a
                  href="https://zenodo.org/records/19839280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  Zenodo
                </a>
                ) that validated the effective-dimensionality measurement on production
                traces.
              </li>
            </ul>
          </section>

          {/* Closing CTAs */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Where this goes next
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The math is one part of a larger architecture.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              CCA grounds the measurement. The Coherence Ratchet is the operational mechanism.
              The Federation is the social and cryptographic structure that makes the
              measurement collective. Mission Driven Development is the engineering discipline
              that keeps the whole thing aligned with what it is for.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/coherence-ratchet"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                The Coherence Ratchet
              </a>
              <a
                href="/research-status"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Research status
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Federation (3.X plan)
              </a>
              <a
                href="/mdd"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Mission Driven Development
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
