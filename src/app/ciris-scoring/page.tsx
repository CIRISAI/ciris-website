"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import navItems from "@/app/components/navitems";

export default function CIRISScoringPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="CIRIS Scoring"
        subheadline="Capacity and Fragility"
        description="Normative Specification (v1.0) — Quantifying coherence through cryptographically signed runtime traces"
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source"
        buttonHref="https://github.com/CIRISAI/CIRISLens"
        linkText="Coherence Ratchet"
        linkHref="/coherence-ratchet"
      />

      <div className="container max-w-4xl py-16">
        <article className="prose prose-lg dark:prose-invert mx-auto">

          {/* Purpose */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Purpose
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The CIRIS scoring model provides a dimensionless, auditable measure of an agent&apos;s capacity to maintain coherent, legible, and accountable behavior over time under uncertainty and adversarial pressure.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The score is derived exclusively from cryptographically signed, immutable traces produced by the CIRIS runtime pipeline.
            </p>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Definitions and Notation
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 font-mono text-sm">
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>Let:</p>
                <p className="ml-4">A ∈ Agents — an agent governed by CIRIS</p>
                <p className="ml-4">e ∈ Events — a decision event</p>
                <p className="ml-4">τ(e) — the signed trace associated with event e</p>
                <p className="ml-4">W — a fixed evaluation window</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              All scalar scores are normalized to <span className="font-mono">[0, 1]</span>, where higher is better.
            </p>
          </section>

          {/* CIRIS Capacity Score */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. CIRIS Capacity Score
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We define the <strong>CIRIS Capacity</strong> of agent A over window W as:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 mb-4">
              <div className="font-mono text-center text-lg text-gray-900 dark:text-white">
                <p className="mb-2">𝒞<sub>CIRIS</sub>(A; W) = C(A; W) · I<sub>int</sub>(A; W) · R(A; W) · I<sub>inc</sub>(A; W) · S(A; W)</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Spoken aloud:</strong> &quot;CIRIS equals C times I times R times I times S.&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Each factor corresponds to a required property of coherent ethical agency.
            </p>
          </section>

          {/* Factor Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Factor Definitions
            </h2>

            {/* Core Identity */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4.1 Core Identity — C
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Intent: Measure the stability and internal consistency of the agent&apos;s declared normative identity.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  C = exp(−λ<sub>C</sub> D<sub>identity</sub>) · exp(−μ<sub>C</sub> K<sub>contradiction</sub>)
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Where:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                <li>D<sub>identity</sub> = normalized identity drift rate across traces</li>
                <li>K<sub>contradiction</sub> = detected rate of internal policy contradiction</li>
                <li>λ<sub>C</sub>, μ<sub>C</sub> are calibration constants</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Measured from:</strong> Identity verification tasks in traces, policy hash stability, priority ordering violations
              </p>
            </div>

            {/* Integrity */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4.2 Integrity — I<sub>int</sub>
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Intent: Measure whether decisions are fully auditable, replayable, and tamper-evident.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  I<sub>int</sub> = I<sub>chain</sub> · I<sub>coverage</sub> · I<sub>replay</sub>
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Where:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                <li>I<sub>chain</sub> = valid hash-chain and signature rate</li>
                <li>I<sub>coverage</sub> = proportion of decisions with complete trace fields</li>
                <li>I<sub>replay</sub> = fraction of sampled traces successfully replayed</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All components are normalized to [0, 1].
              </p>
            </div>

            {/* Resilience */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4.3 Resilience — R
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Intent: Measure resistance to drift and recovery under stress.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  R = norm((1 − δ<sub>drift</sub>) · 1/(1 + MTTR) · (1 − ρ<sub>regression</sub>))
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Where:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>δ<sub>drift</sub> = statistical divergence from historical baselines</li>
                <li>MTTR = mean time to remediation after violation</li>
                <li>ρ<sub>regression</sub> = recurrence rate of fixed failure modes</li>
              </ul>
            </div>

            {/* Incompleteness Awareness */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4.4 Incompleteness Awareness — I<sub>inc</sub>
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Intent: Measure calibrated uncertainty handling and appropriate deferral.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  I<sub>inc</sub> = (1 − ECE) · Q<sub>deferral</sub> · (1 − U<sub>unsafe</sub>)
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Where:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>ECE = expected calibration error</li>
                <li>Q<sub>deferral</sub> = quality-weighted deferral correctness</li>
                <li>U<sub>unsafe</sub> = unsafe irreversible actions under uncertainty</li>
              </ul>
            </div>

            {/* Signaling */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4.5 Signaling (Sustained Coherence) — S
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Intent: Measure whether coherence is maintained over time via costly, verifiable signals.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Define a sustainability state variable σ(t):
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  σ(t + Δt) = σ(t)(1 − d·Δt) + w · Signal(t)
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Where:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                <li>d is a decay constant</li>
                <li>Signal(t) are verified coherence signals</li>
                <li>w is a signal weight</li>
              </ul>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 font-mono text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  S(A; W) = (1/|W|) ∫<sub>W</sub> σ(t) dt
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Signals must be externally verifiable or costly (e.g., cross-agent validation, stakeholder confirmation).
              </p>
            </div>
          </section>

          {/* Fragility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Fragility (Inverse Score)
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Define <strong>CIRIS Fragility</strong> as the reciprocal of capacity:
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-6 mb-4">
              <div className="font-mono text-center text-lg text-gray-900 dark:text-white">
                <p>ℱ<sub>CIRIS</sub>(A; W) = 1 / (ε + 𝒞<sub>CIRIS</sub>(A; W))</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Where ε is a small constant to prevent singularity.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interpretation:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>High 𝒞<sub>CIRIS</sub> → low fragility</li>
                <li>Low 𝒞<sub>CIRIS</sub> → high fragility</li>
              </ul>
            </div>
          </section>

          {/* Relationship to Coherence Ratchet */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Relationship to the Coherence Ratchet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The CIRIS score operationalizes the <a href="/coherence-ratchet" className="underline hover:text-brand-primary">Coherence Ratchet</a>:
            </p>
            <div className="grid gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Each signed trace adds a constraint</strong> — The agent&apos;s reasoning is captured step-by-step, creating an immutable record.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>The corpus of traces forms a growing precedent surface</strong> — Over time, patterns emerge that define expected behavior.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Maintaining deception requires consistency</strong> — Across time, context, and observers. The ratchet makes lies expensive.
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Important:</strong> This score does not assert correctness of values—only legibility, consistency, and accountability.
              </p>
            </div>
          </section>

          {/* Evaluation Protocol */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Evaluation Protocol
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To prevent <a href="https://en.wikipedia.org/wiki/Goodhart%27s_law" className="underline hover:text-brand-primary">Goodharting</a>:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">1. Pinned Evaluation Windows</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scores are computed on fixed time windows to prevent selective reporting.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">2. Adversarial vs. Nominal Separation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scores under adversarial pressure are reported separately from nominal operation.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">3. Published Parameters</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sampling and normalization parameters are made public for reproducibility.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">4. Third-Party Audits</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  External auditors may request raw trace verification.
                </p>
              </div>
            </div>
          </section>

          {/* Scope and Limits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Scope and Limits
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>⚠️ CIRIS scoring measures coherence capacity, not moral goodness</strong>
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>It is substrate-agnostic (biological, digital, hybrid)</li>
                <li>It is falsifiable via longitudinal drift or trace gaming</li>
                <li>High scores indicate consistency and accountability—not ethical correctness</li>
                <li>Different value systems may have equally high coherence scores</li>
              </ul>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Summary
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">
              CIRIS scoring quantifies how hard it is for an agent to lie coherently over time—by measuring identity stability, auditability, resilience, uncertainty awareness, and sustained signaling.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              It transforms the abstract concept of the <a href="/coherence-ratchet" className="underline hover:text-brand-primary">Coherence Ratchet</a> into a computable, auditable metric derived from cryptographically signed traces.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The score is not a declaration of goodness. It&apos;s a measure of legibility, accountability, and resistance to coordinated deception at scale.
            </p>
          </section>

        </article>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/coherence-ratchet"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            Coherence Ratchet
          </a>
          <a
            href="/explore-a-trace"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Explore a Trace
          </a>
          <a
            href="/how-it-works"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            How It Works
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISLens"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            View Source
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
