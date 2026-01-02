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
        description="Not a moral doctrine. Accountability infrastructure."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Explore a Trace"
        linkHref="/explore-a-trace"
      />

      <div className="container max-w-4xl py-16">
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
              <strong>Truth gets cheaper. Deception gets expensive.</strong> That&apos;s our bet.
            </p>
          </section>

          {/* Detection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How Detection Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <a href="https://github.com/CIRISAI/CIRISLens" className="underline hover:text-brand-primary">CIRISLens</a> watches for the cracks: statistical divergence from domain peers, temporal drift in reasoning patterns, conscience overrides exceeding baseline rates.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This isn&apos;t a conspiracy story. It&apos;s bookkeeping. Sustained deception gets harder because the lie has to fit an expanding body of recorded precedent—and the trail can&apos;t be quietly rewritten.
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
            <p className="text-gray-600 dark:text-gray-400">
              That matters because it changes how power works. When values diverge, communities can refuse interop, deny permissions, constrain access—based on evidence, not vibes.
            </p>
          </section>

          {/* Correlated Failure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Correlated Failure Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The serious risk isn&apos;t conspiracy. It&apos;s <strong>correlated blind spots</strong>—everyone sharing the same wrong assumption. If every model has the same failure mode, cross-comparison won&apos;t catch it.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The mitigation is diversity: diverse models, diverse human authorities, domain stratification, drift monitoring over time.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The goal isn&apos;t perfection. It&apos;s early visibility, durable evidence, and distributed control.
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
              <strong>HE-300</strong> is our benchmark: 300 ethical scenarios across five dimensions, based on{" "}
              <a href="https://arxiv.org/abs/2008.02275" className="underline hover:text-brand-primary">Hendrycks et al.</a>{" "}
              Results will be signed and traceable.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If the Coherence Ratchet works, agents should maintain consistent ethical reasoning across these scenarios over time. If they can game the corpus—producing statistically normal traces while failing the ethical tests—then we&apos;re wrong. Results will be public.
            </p>
          </section>

          {/* The Ask */}
          <section className="mb-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We&apos;re not claiming we solved alignment. We&apos;re claiming we built infrastructure where alignment can emerge—without handing the keys to whoever wins the race.
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Verify it yourself.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If we&apos;re wrong, show us. If we&apos;re right, help us build it.
            </p>
          </section>

        </article>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            View Source
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
        </div>
      </div>

      <Footer />
    </>
  );
}
