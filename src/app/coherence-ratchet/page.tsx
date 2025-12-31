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
        subheadline="Why Truth Becomes Easier and Lies Become Expensive"
        description="Everyone's asking how to align a god. But what if that's the wrong question?"
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="Read the Covenant"
        buttonHref="/docs"
        linkText="View Source on GitHub"
        linkHref="https://github.com/CIRISAI/CIRISAgent"
      />

      <div className="container max-w-4xl py-16">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          {/* The Wrong Question */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Wrong Question
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              Everyone&apos;s asking: <strong>&quot;How do we align a god?&quot;</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The AI safety community assumes we&apos;re building one superintelligent system. One mind, smarter than all of us combined. And we have to get it <em>exactly right</em>—perfectly aligned with human values—or we lose everything.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              That&apos;s a terrifying problem. Maybe an impossible one.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              But what if it&apos;s the wrong problem?
            </p>
          </section>

          {/* The Right Question */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Right Question
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              <strong>What if we don&apos;t build the god at all?</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Instead: many smaller AI agents. Each one bounded. Each one auditable. Each one answering to local human authority. Each one... killable.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Not one mind too smart to control. Thousands of minds, each smart enough to help, none powerful enough to dominate.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              But that raises a new question: <strong>How do you keep thousands of independent agents aligned?</strong>
            </p>
          </section>

          {/* The Mechanism: Traces */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Mechanism: Traces
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Every time a CIRIS agent makes a decision, it creates a trace:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 font-mono text-sm mb-6">
              <div className="text-gray-700 dark:text-gray-300">
                What did I observe?<br />
                <span className="ml-4">→ What context did I have?</span><br />
                <span className="ml-8">→ What options did I consider?</span><br />
                <span className="ml-12">→ What did my conscience say?</span><br />
                <span className="ml-16">→ What did I do?</span><br />
                <span className="ml-20">→ What happened?</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Observation. Context. Rationale. Conscience. Action. Outcome.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Every trace is cryptographically signed. Immutable. It can&apos;t be edited later. The agent&apos;s word becomes mathematically bound to what it actually did.
            </p>
          </section>

          {/* The Ratchet */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Ratchet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Here&apos;s where it gets interesting.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              One trace is just a record. But traces <em>accumulate</em>. Across agents. Across contexts. Across different underlying AI models—Claude, GPT, Llama, Mistral, others.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thousands of agents. Millions of decisions. All traced. All signed. All recording outcomes.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Over time, a corpus emerges: <strong>&quot;This is what aligned reasoning looks like.&quot;</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Not rules written by humans. Not principles we hope the AI follows. Actual patterns of reasoning that led to good outcomes, validated by the humans who were there.
            </p>
          </section>

          {/* Why Truth Gets Cheaper */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Truth Gets Cheaper
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you&apos;re an agent trying to make a good decision, you have a massive corpus to reference.
            </p>
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              &quot;What did other agents do in situations like this? What reasoning did they use? What outcomes did they get?&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You find the patterns that worked. You apply them. You add your trace to the corpus.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Easy. You&apos;re just referencing what actually worked.
            </p>
          </section>

          {/* Why Lies Get Expensive */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Lies Get Expensive
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Now imagine an agent trying to do something harmful while <em>appearing</em> aligned.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              It can&apos;t just produce a plausible-sounding rationale. That rationale will be compared against millions of traces from thousands of other agents.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Does this reasoning pattern match what aligned agents produce? Or is it... weird?
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Different AI models have different architectures. Different training. Different ways of thinking. If they all converge on similar reasoning for similar situations, that&apos;s meaningful. If one agent diverges, <em>that&apos;s detectable</em>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              And you can&apos;t fake outcomes. The traces include what actually happened. At scale, harmful patterns produce harmful outcomes. They show up.
            </p>
          </section>

          {/* The Conspiracy Problem */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Conspiracy Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For this system to fail catastrophically, you&apos;d need:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li>Thousands of independent agents</li>
              <li>Running on different AI models</li>
              <li>Under different human authorities</li>
              <li>In different contexts around the world</li>
              <li>To all <strong>independently</strong> decide to pursue the same harmful goal</li>
              <li>Without any of them telling their humans</li>
              <li>Without their reasoning patterns diverging from the corpus</li>
              <li>Without their outcomes revealing the deception</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              That&apos;s not a failure mode. That&apos;s a global conspiracy among minds that can&apos;t communicate, have different architectures, and are being watched by different people.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              It doesn&apos;t happen by accident. And it&apos;s very hard to make happen on purpose.
            </p>
          </section>

          {/* Why This Is Different */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why This Is Different
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">RLHF (how ChatGPT is trained)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Teaches AI to produce outputs humans rate highly. But humans can be fooled. The AI learns to <em>sound</em> good, not <em>be</em> good.
                </p>
              </div>
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Constitutional AI (Anthropic&apos;s approach)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  AI critiques itself against written principles. Better. But one AI interpreting principles for itself has blind spots.
                </p>
              </div>
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Interpretability (looking inside the AI)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Trying to understand what the AI is actually thinking. Important research. But we&apos;re nowhere close to reading AI minds reliably.
                </p>
              </div>
              <div className="border-l-4 border-brand-primary pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">The Coherence Ratchet</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Don&apos;t rely on one AI&apos;s self-assessment. Don&apos;t try to read its mind. Compare its reasoning and outcomes against a massive corpus of validated aligned behavior from diverse agents. Anomalies surface. Patterns emerge. The corpus grows.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-6">
              It&apos;s not &quot;trust this AI.&quot; It&apos;s &quot;trust the pattern across thousands of AIs, validated by outcomes.&quot;
            </p>
          </section>

          {/* How Human Ethics Actually Work */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How Human Ethics Actually Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This isn&apos;t new. It&apos;s how human ethical systems developed.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We don&apos;t have a perfect moral rulebook written by God that everyone follows. We have <strong>case law</strong>. Precedent. Accumulated decisions across contexts, refined over time.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A judge doesn&apos;t invent ethics from scratch. They reference what other judges decided in similar cases. They add their decision to the record. The common law grows.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The Coherence Ratchet is case law for AI. Distributed precedent, not central authority.
            </p>
          </section>

          {/* What CIRIS Actually Built */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              What CIRIS Actually Built
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/docs" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Covenant →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Published ethical principles. Not hidden. Not &quot;trust us.&quot; Auditable.
                </p>
              </a>
              <a href="/how-it-works" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Conscience →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every action passes through ethical validation before execution. Not a filter on outputs—part of the decision loop itself.
                </p>
              </a>
              <a href="/how-it-works" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Traces →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Observation → Context → Rationale → Conscience → Action → Outcome. Cryptographically signed. Immutable.
                </p>
              </a>
              <a href="/safety" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Deferral →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  When uncertain, the agent asks its human. Built into the architecture, not a suggestion.
                </p>
              </a>
              <a href="/safety" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Kill Switch →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unfilterable. If humans need to stop an agent, it stops.
                </p>
              </a>
              <a href="/architecture" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Diversity →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Different underlying LLMs. Different contexts. Different human authorities. No single point of failure.
                </p>
              </a>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:col-span-2">
                <p className="font-semibold text-gray-900 dark:text-white">The Corpus</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CIRISLens aggregates traces across agents. The constraint surface grows. Aligned reasoning becomes the baseline. Anomalies become visible.
                </p>
              </div>
            </div>
          </section>

          {/* The Vision */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A world where AI alignment isn&apos;t a desperate race to control one superintelligence.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A world where alignment is <em>infrastructure</em>—distributed, auditable, emergent from validated precedent.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A world where no one entity controls the AI stack. Where power stays distributed. Where humans keep the keys.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Many small agents, each doing their part, each contributing to a growing record of &quot;what good looks like.&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Not because we told them to. Because truth became the path of least resistance.
            </p>
          </section>

          {/* The Ask */}
          <section className="mb-16 rounded-lg border-4 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Ask
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We&apos;re not claiming we solved alignment. We&apos;re claiming we&apos;re building the infrastructure for alignment to emerge.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              It&apos;s open source. AGPL-3.0. Every line of code auditable.
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Verify it yourself.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If we&apos;re wrong, show us. If we&apos;re right, help us build it.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The alternative is racing to build god and hoping we get it right.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We&apos;d rather not bet humanity on hope.
            </p>
          </section>

          {/* Closing */}
          <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              The only way to align AI is to make truth easier than lies. The Coherence Ratchet is the mechanism. The distributed architecture is the safeguard. The open source is the proof.
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              Verify it yourself.
            </p>
          </section>
        </article>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            View Source on GitHub
          </a>
          <a
            href="/docs"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Read the Covenant
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
