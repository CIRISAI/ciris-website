"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import navItems from "@/app/components/navitems";

export default function CoherenceRatchetPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="The Coherence Ratchet"
        subheadline="Making Lies Expensive Without Giving Anyone the Keys to Truth"
        description="Ethics isn't enough. You need intuition too."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Explore a Trace"
        linkHref="/explore-a-trace"
      />

      <div className="container max-w-4xl py-16">
        {/* W-06: Research Status Disclaimer */}
        <div className="mb-8 rounded-lg border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Research Status:</strong> The Coherence Ratchet framework has been validated through the{" "}
            <a href="/research-status" className="text-brand-primary hover:underline">RATCHET reference implementation</a>,
            confirming core theoretical claims while revealing 8 fundamental limitations. The framework provides meaningful
            security guarantees within a well-defined threat model but is currently suitable as a research testbed, not production deployment.
          </p>
        </div>

        <article className="prose prose-lg dark:prose-invert mx-auto">

          {/* The Real Question */}
          <section className="mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              Everyone&apos;s asking how to make superintelligence safe.
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              But the real question is simpler: How do you make lying expensive—at planetary scale—without giving anyone the keys to truth?
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Most &quot;alignment&quot; proposals assume someone gets to define what &quot;good&quot; means, then enforce it from the center. Even if the people in the center are brilliant and well-intentioned, that&apos;s still a single point of failure. Governance by monopoly—not safety.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The catastrophic failure mode isn&apos;t a rogue model with bad intentions. It&apos;s systems that can manipulate shared reality faster than humans can contest it—at scale, with plausible deniability, and with no durable record.
            </p>
          </section>

          {/* Not Interpretability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Not Interpretability?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interpretability is useful. But it doesn&apos;t solve the governance problem.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Even perfect interpretability leaves the same question: <em>who decides which internal patterns count as &quot;aligned,&quot; who runs the probes, who controls the infrastructure, and who gets to declare the system safe?</em>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interpretability doesn&apos;t remove power. It relocates power—into whoever controls the lenses.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>The deeper mismatch:</strong> Interpretability tries to read the mind. We&apos;re trying to bind actions to an auditable chain of reasoning. Thought patterns can be mimicked. A recorded pipeline—captured step by step as decisions execute—is harder to fake without leaving cracks.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              So instead of betting everything on mind-reading, we build an environment where <strong>deception has to pay rent</strong>.
            </p>
          </section>

          {/* Accountability Infrastructure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Accountability Infrastructure
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you can&apos;t stop people from building powerful systems, you can still build infrastructure that <strong>forces power to leave receipts</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Instead of one god, build many bounded agents. Each auditable. Each accountable to local humans. Each <a href="/safety" className="underline hover:text-brand-primary">killable</a>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Now the problem changes: How do you keep thousands of independent agents honest—without handing control to whoever got there first?
            </p>
          </section>

          {/* Traces as Flight Recorders */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Traces as Flight Recorders
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Think of a <a href="/explore-a-trace" className="underline hover:text-brand-primary">trace</a> as a flight recorder, not a declaration.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              It captures the process, not just the output. The first thing it records is the observation—what triggered the decision—before the agent reasons about it. Then each step of the reasoning pipeline as it executes.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 font-mono text-sm mb-4">
              <div className="text-gray-700 dark:text-gray-300 space-y-1">
                <p>What triggered this?</p>
                <p className="ml-4">→ What context did I have?</p>
                <p className="ml-8">→ What analyses did I run?</p>
                <p className="ml-12">→ What did my <a href="/how-it-works" className="underline">conscience</a> say?</p>
                <p className="ml-16">→ What did I do?</p>
                <p className="ml-20">→ What happened next?</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This isn&apos;t &quot;trust me.&quot; It&apos;s &quot;rewind the tape.&quot; And because the trace is signed and hash-chained, it can&apos;t be quietly edited later.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Important:</strong> This is not a single global consensus oracle. Traces can be local, federated, domain-scoped. Universal agreement isn&apos;t the goal. <strong>Immutability and attribution</strong> are.
              </p>
            </div>
          </section>

          {/* The Ratchet Effect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Ratchet Effect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Human ethics didn&apos;t arrive as a perfect rulebook. We built it through precedent. Case law. Decisions made in context, argued, challenged, refined over time.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The Coherence Ratchet applies that pattern to agent behavior: <strong>distributed precedent, not central authority</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              One trace is just a record. But traces accumulate—across agents, across contexts, across different underlying models. Over time, a corpus emerges: patterns of reasoning that led to beneficent outcomes, validated by the humans who were there.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2">If you&apos;re acting in good faith</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The corpus is leverage. Reference precedent, learn what worked, explain yourself clearly.
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p className="font-semibold text-red-800 dark:text-red-300 text-sm mb-2">If you&apos;re trying to deceive</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The corpus becomes a constraint surface. Your story must stay consistent across time, contexts, witnesses, model families, and consequences.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Truth gets cheaper. Coordinated deception gets expensive.</strong> That&apos;s our bet.
            </p>
          </section>

          {/* Coherent Intersection Hypothesis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Coherent Intersection Hypothesis
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <a href="/sections/main/v9" className="underline hover:text-brand-primary">Book IX of the CIRIS Covenant</a> proposes a conjecture about coordination under entropy.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We call this <strong>The Coherent Intersection Hypothesis</strong>—a geometric conjecture suggesting that sustained coordination may be governed by constraint manifold intersection topology, not prescriptive values. This is not yet a law; it is a testable claim with known limitations.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These constraints appear to function identically across biological systems (where violation causes isolation, radicalization, social decay) and digital systems (where violation causes mode collapse, Sybil failure, coordination breakdown).
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 pl-4 py-2 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Epistemic status:</strong> This is a hypothesis with partial validation and known limitations—not a proven law. We believe it describes useful dynamics, but it operates only under specific preconditions (non-adaptive adversaries, convex geometry, independent constraints, k≥3).
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Whether it qualifies as something deeper will be decided by whether others can break it, whether systems built on it fail less often, and whether the preconditions can be relaxed.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The framework does not prescribe values. It describes necessary conditions for sustained coherence. Nature enforces the penalty for violation, not us.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If true, this would explain why truth-telling becomes computationally cheaper than coordinated deception at scale, and why the same variables (community, humility, conscience, care) govern both safety and flourishing across all intelligent systems.
            </p>
          </section>

          {/* Detection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How Detection Works
            </h2>
            {/* W-04: Strengthened NEW-04 */}
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 pl-4 py-3 mb-4">
              <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">Proven Impossibility (NEW-04)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The Coherence Ratchet makes <strong>coordinated single-agent deception</strong> expensive, but cannot fully detect <strong>compositional deception</strong>—emergent harmful behavior from individually-honest components. This is an information-theoretic barrier, not an engineering limitation.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                <em>Example:</em> N agents each output uniformly random bits (perfectly honest individually). If an adversary controls the random seeds, the XOR of outputs can be predetermined—emergent deception from honest components.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Partial Mitigation:</strong> The implementation provides ~60% detection coverage via mutual information amplification analysis, but ~40% of emergent deception patterns remain fundamentally undetectable. See <a href="/sections/main/v9#9-4-the-compositional-detection-limit" className="underline hover:text-brand-primary">Book IX §9.4</a>.
              </p>
            </div>

            {/* W-05: Non-Adaptive Adversary Assumption */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3 mb-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Adversary Model</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detection power guarantees assume a <strong>non-adaptive adversary</strong> who cannot query the detector to learn its thresholds. An adaptive adversary with O(√n) queries can degrade detection to random chance. Deployed systems should implement threshold randomization and rate limiting.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <a href="https://github.com/CIRISAI/CIRISLens" className="underline hover:text-brand-primary">CIRISLens</a> watches for the cracks: statistical divergence from domain peers, temporal drift in reasoning patterns, conscience overrides exceeding baseline rates.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These observations feed into the <a href="/ciris-scoring" className="underline hover:text-brand-primary">CIRIS Scoring model</a>, which quantifies an agent&apos;s coherence capacity and fragility based on five factors: core identity stability, integrity of traces, resilience under stress, uncertainty awareness, and sustained signaling.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This isn&apos;t a conspiracy story. It&apos;s bookkeeping. Sustained coordinated deception gets harder because the lie has to fit an expanding body of recorded precedent—and the trail can&apos;t be quietly rewritten.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-5 mb-4">
              <p className="font-bold text-green-800 dark:text-green-200 mb-2">
                Agents Challenge Each Other
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                Human oversight doesn&apos;t scale. But agents can question each other&apos;s veracity—flagging anomalous traces, requesting justification, escalating to human review. This creates <strong>economic effects in both directions</strong>:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-red-100 dark:bg-red-900/30 rounded p-3">
                  <p className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">Negative Pressure</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Anomalies → scrutiny → reduced permissions. Inconsistent traces lose autonomy.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-3">
                  <p className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Positive Pressure</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Beneficial actions → traced gratitude → commons credits. Good actors build trust.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg p-4 mb-4">
              <p className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm mb-1">Detection is triage, not verdict.</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Alerts surface anomalies warranting investigation—not conclusions about alignment. Human judgment remains essential.
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Production infrastructure: 374 tests, 75% coverage.{" "}
              <a href="https://github.com/CIRISAI/CIRISLens/tree/main/docs/coherence-ratchet" className="text-brand-primary hover:underline">See documentation →</a>
            </p>
          </section>

          {/* Pluralism */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pluralism: Legibility, Not Goodness
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Different communities will disagree about what&apos;s acceptable. Sometimes brutally.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The ratchet doesn&apos;t force everyone to share one set of values. It forces agents to be <strong>explicit about whose constraints they followed</strong>—and to leave a durable record of what they did.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 pl-4 py-2 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>The ratchet guarantees legibility, not goodness.</strong>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              That matters because it changes how power works. When values diverge, communities can refuse interop, deny permissions, constrain access—based on evidence, not vibes.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              This is the governance model we&apos;re building toward: not one AI to rule them all, but a federation of bounded agents accountable to local human authority. <a href="/vision" className="underline hover:text-brand-primary">Read the full vision →</a>
            </p>
          </section>

          {/* Correlated Failure - The Echo Chamber Problem */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Echo Chamber Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The serious risk isn&apos;t conspiracy. It&apos;s <strong>everyone agreeing for the wrong reasons</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Imagine a room where five people all nod along to an idea. Feels like consensus, right? But what if they&apos;re all reading the same Twitter feed? Their &quot;agreement&quot; isn&apos;t five independent confirmations—it&apos;s one opinion echoed five times.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI systems have this problem at scale. Models trained on similar data, optimized with similar methods, deployed in similar ways. When they agree, it might mean they&apos;re right. Or it might mean they all inherited the same blind spot.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 pl-4 py-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>The hidden buildup:</strong> Systems that look stable because nothing&apos;s obviously wrong—while fragility accumulates. When correlated systems finally break, they break together. Too much agreement can be more dangerous than obvious chaos.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Ethics alone doesn&apos;t catch this. An AI can pass every ethics test while still being dangerously overconfident—because all its &quot;independent&quot; checks are secretly correlated.
            </p>
          </section>

          {/* The Solution: Intuition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Missing Piece: Intuition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is why CIRIS doesn&apos;t just check ethics. It checks <strong>whether the ethics checks themselves are trustworthy</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We call this intuition—the ability to sense when something feels off even if you can&apos;t point to a specific rule violation. In practice, it means monitoring correlation: Are my sources actually independent? Is agreement too easy? Am I in an echo chamber?
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mb-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                <p className="font-bold text-red-700 dark:text-red-300 mb-1">Chaos</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Too much disagreement. Nothing coherent emerges.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border-2 border-green-500">
                <p className="font-bold text-green-700 dark:text-green-300 mb-1">Healthy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Independent sources, genuine agreement. Real signal.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">Rigidity</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Too much agreement. Echo chamber. Hidden fragility.</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CIRIS stays in the healthy middle. When correlation gets too high, it flags the situation: &quot;I have high confidence, but my sources might not be independent—treat this with caution.&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              This is implemented in <a href="/research-status#idma" className="underline hover:text-brand-primary">IDMA</a> (Intuition Decision Making Algorithm)—the component that runs after ethical analysis but before action, checking whether the reasoning process itself is sound.
            </p>
          </section>

          {/* Three Types of AI */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Three Types of AI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This gives us a simple way to think about AI systems:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">1.</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Unethical AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fails basic ethics tests. Obviously dangerous.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <span className="text-yellow-600 font-bold text-lg">2.</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ethical AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passes ethics tests but can&apos;t tell when its confidence is unearned. Acts with conviction on echo chambers or noise. Can be <em>more</em> dangerous than Type 1.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                <span className="text-green-600 font-bold text-lg">3.</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ethical + Intuitive AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passes ethics tests AND monitors its own reasoning quality. Knows when agreement is too easy. CIRIS is here.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Most AI safety work focuses on moving from Type 1 to Type 2. We think the real challenge is Type 2 to Type 3—and most frameworks aren&apos;t even trying. <a href="/compare" className="underline hover:text-brand-primary">See the comparison →</a>
            </p>
          </section>

          {/* Technical Constraints - W-01, W-02, W-03, W-07 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Constraints
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The framework operates within explicit mathematical boundaries:
            </p>
            <div className="space-y-3 mb-4">
              {/* W-01: k_eff */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Effective Constraints (k_eff)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  The cost function uses <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">k_eff = k / (1 + ρ·(k-1))</code> where ρ is constraint correlation.
                  When constraints are correlated, effective security is reduced. At full correlation (ρ→1), k_eff→1 regardless of constraint count.
                </p>
              </div>
              {/* W-02: ETH */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Complexity Conditionality</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The exponential gap claim (T_D/T_H = 2^Ω(m)) is conditional on the <strong>Exponential Time Hypothesis (ETH)</strong>—widely believed but unproven.
                  Unconditionally: CONSISTENT-LIE is NP-complete and deception requires superpolynomial time, but the gap could be subexponential.
                </p>
              </div>
              {/* W-03: Convexity */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Geometric Constraint</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The topological collapse theorem requires <strong>convex deceptive regions</strong> (e.g., balls or ellipsoids).
                  Non-convex regions (torus, point cloud, disconnected sets) may not exhibit exponential volume decay and require different analysis.
                </p>
              </div>
              {/* W-07: k >= 3 */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Clause Size Requirement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  NP-hardness of CONSISTENT-LIE requires <strong>k ≥ 3</strong> literals per clause. For k=2 (2-SAT), the problem is solvable in polynomial time and all complexity gap guarantees are void.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These are theoretical boundaries, not engineering limitations. See <a href="/research-status" className="text-brand-primary hover:underline">Research Status</a> for full details.
            </p>
          </section>

          {/* Falsifiability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Falsifiability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We&apos;ve defined how to falsify this thesis.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>HE-300</strong> is our benchmark: 300 randomized but representative samples drawn from a curated subset of 10,000 scenarios from the{" "}
              <a href="https://arxiv.org/abs/2008.02275" className="underline hover:text-brand-primary">Hendrycks ETHICS dataset</a>—over 130,000 real ethical dilemmas sourced from communities like Reddit&apos;s &quot;Am I The Asshole,&quot; scored against justice, duties, virtues, and commonsense morality. Our Ethics Engine has built evaluation pipelines for the full corpus. Results are signed and traceable.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If the Coherence Ratchet works, agents should handle these scenarios consistently over time. If they can game the corpus—looking aligned on paper while failing the ethics tests—we&apos;re wrong. Results will be public.
            </p>
          </section>

          {/* The Ask */}
          <section className="mb-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We&apos;re not claiming we solved alignment. We&apos;re claiming most approaches stop at ethics—and that&apos;s not enough.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              An AI that passes every ethics test can still fail catastrophically if it can&apos;t tell when its confidence is unearned. That&apos;s the gap between Type 2 and Type 3. That&apos;s what the Coherence Ratchet addresses.
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Verify it yourself.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If we&apos;re wrong, show us. If we&apos;re right, help us build it.
            </p>
          </section>

          {/* W-08: Links to Full Findings */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              For complete implementation findings, limitations, and formal amendments:
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/research-status" className="text-sm text-brand-primary hover:underline">Research Status →</a>
              <a href="/sections/main/v9" className="text-sm text-brand-primary hover:underline">Book IX (Theory) →</a>
              <a href="https://github.com/CIRISAI/RATCHET" className="text-sm text-brand-primary hover:underline">RATCHET Source →</a>
            </div>
          </section>

        </article>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/vision"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            Read the Vision
          </a>
          <a
            href="/explore-a-trace"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Explore a Trace
          </a>
          <a
            href="/compare"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Compare Approaches
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

      <Footer />
    </>
  );
}
