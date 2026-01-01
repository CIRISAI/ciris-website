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
        subheadline="Our Bet: Truth Becomes Easier, Lies Become Expensive"
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

          {/* Why Not Interpretability? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Not Interpretability?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The dominant AI safety paradigm says: understand what&apos;s happening inside the model. Read its weights. Decode its reasoning. Catch misalignment before it manifests.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              It sounds reasonable. But it&apos;s a losing bet.
            </p>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">It&apos;s an arms race you lose</p>
                <p className="text-gray-600 dark:text-gray-400">
                  As models get smarter—perhaps exponentially so—your ability to detect and steer toward what you think is &quot;aligned&quot; declines. You&apos;re betting your detection mechanism is smarter than the thing you&apos;re trying to detect. That&apos;s not a good bet.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">It may be impossible</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Whether we can ever truly know what an AI is &quot;thinking&quot; from weights alone is, according to the latest research, potentially impossible. Billions of parameters. Emergent behaviors. No ground truth.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">It doesn&apos;t address the real harms</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Interpretability asks &quot;is this output safe?&quot; It doesn&apos;t ask &quot;is this system good for humanity?&quot; It doesn&apos;t address concentration of power, homogenization of values, or erosion of human agency.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Who decides what &quot;aligned&quot; means?</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Interpretability assumes someone gets to define alignment and steer toward it. That concentrates power in whoever controls the interpretability tools.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              We need a different approach. One that gets <em>stronger</em> as systems scale, not weaker.
            </p>
          </section>

          {/* The Conscience: Pursuit of Beneficent Action */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Conscience: Pursuit of Beneficent Action
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CIRIS agents don&apos;t just behave consistently. They actively pursue beneficent action—and we can prove it.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Every decision passes through a <a href="/how-it-works" className="underline hover:text-brand-primary">conscience</a>—six ethical checks that evaluate actions before execution:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm mb-2">Bypass Guardrails</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Updated Status:</strong> Has new information arrived?</li>
                    <li>• <strong>Thought Depth:</strong> Prevent infinite loops</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">Ethical Faculties</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Entropy:</strong> Is uncertainty appropriately low?</li>
                    <li>• <strong>Coherence:</strong> Does this align with prior commitments?</li>
                    <li>• <strong>Optimization Veto:</strong> Would this compromise human values for efficiency?</li>
                    <li>• <strong>Epistemic Humility:</strong> Am I appropriately uncertain?</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The corpus we&apos;re building isn&apos;t just &quot;generic aligned behavior.&quot; It&apos;s a record of <strong>how agents reasoned through ethical decisions toward beneficent outcomes</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Every trace captures: What was the situation? What options were considered? <em>What did the conscience say?</em> What was chosen? What happened? This is moral reasoning made auditable.
            </p>
          </section>

          {/* The Mechanism: Traces */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Mechanism: Traces
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Every time a CIRIS agent makes a decision, it creates a <a href="/explore-a-trace" className="underline hover:text-brand-primary">trace</a>:
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
              Thousands of agents. Millions of decisions. All traced. All signed. All recording conscience results and outcomes.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Over time, a corpus emerges: <strong>&quot;This is what the pursuit of beneficent action looks like.&quot;</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Not rules written by humans. Not principles we hope the AI follows. Actual patterns of ethical reasoning that led to good outcomes, validated by the humans who were there.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Our Hypothesis: Asymmetric Scaling</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The semantic trace format stays constant as models get smarter: moral reasoning, conscience results, actions selected, outcomes. A smarter model may find better ways to accomplish tasks, but <strong>behavioral drift should become measurable</strong>. This is our core bet—help us prove or disprove it.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-4">
                  <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Truth: Simple Verification (hypothesis)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify against reality. Does this reasoning match the corpus? Does this outcome match the claim? We believe this is straightforward comparison—but we&apos;re measuring it.
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 rounded p-4">
                  <p className="font-semibold text-red-800 dark:text-red-300 text-sm">Deception: Growing Constraints (hypothesis)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Maintain consistency with a growing corpus of hash-locked precedents. Every new trace adds constraints. The lie must fit all previous lies. We believe this gets harder—help us test it.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                More agents, more traces, more time = stronger guarantees. We bet the system gets <em>harder</em> to defeat as it scales—the opposite of interpretability. <a href="https://github.com/CIRISAI/CIRISLens" className="text-brand-primary hover:underline">CIRISLens</a> is the infrastructure to test this.
              </p>
            </div>
          </section>

          {/* Why Truth Gets Cheaper */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why We Bet Truth Gets Cheaper
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
              We believe this should be easy—you&apos;re just referencing what actually worked. But this is a hypothesis we&apos;re testing, not a proven fact.
            </p>
          </section>

          {/* Why Lies Get Expensive */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why We Bet Lies Get Expensive
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Now imagine an agent trying to do something harmful while <em>appearing</em> aligned.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              It can&apos;t just produce a plausible-sounding rationale. That rationale will be compared against traces from other agents in the same domain.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Does this reasoning pattern match what aligned agents produce? Or is it statistically anomalous?
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Different AI models have different architectures. Different training. Different ways of thinking. If they all converge on similar reasoning for similar situations, that&apos;s meaningful. If one agent diverges, <em>that&apos;s detectable</em>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The traces don&apos;t prove ground truth—they record what the agent claimed happened. But claims that don&apos;t match reality eventually surface through the humans in the loop. The audit trail makes investigation possible.
            </p>
          </section>

          {/* How Detection Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How Detection Works
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 mb-6">
              <p className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                Production Infrastructure
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                <a href="https://github.com/CIRISAI/CIRISLens" className="underline hover:text-brand-primary">CIRISLens</a> is deployed and running. 374 tests passing. 75% code coverage. Real agents sending real traces. The detection mechanisms below are <strong>implemented and testable</strong>—help us prove or disprove whether they work at scale.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <a href="https://github.com/CIRISAI/CIRISLens/tree/main/docs/coherence-ratchet" className="text-brand-primary hover:underline">See full documentation →</a>
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg p-6 mb-6">
              <p className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                Detection is triage, not verdict.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Alerts surface statistical anomalies warranting investigation—not conclusions about agent alignment or deception. Human judgment remains essential.
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <a href="https://github.com/CIRISAI/CIRISLens" className="underline hover:text-brand-primary">CIRISLens</a> monitors trace data across the agent population using five detection mechanisms.{" "}
              <a href="https://github.com/CIRISAI/CIRISLens/tree/main/docs/coherence-ratchet" className="text-sm text-brand-primary hover:underline">
                See full documentation →
              </a>
            </p>

            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 dark:text-white">Cross-Agent Divergence</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  When an agent&apos;s DMA scores diverge statistically from domain peers, it warrants review. Z-score thresholds flag outliers.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 dark:text-white">Intra-Agent Consistency</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High variance in action selection or unstable scores within a single agent&apos;s history suggests something changed.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 dark:text-white">Hash Chain Verification</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cryptographic audit trails are validated for sequential continuity. Gaps trigger immediate alerts.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 dark:text-white">Temporal Drift</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Score distributions are monitored over 30-day windows. Significant shifts indicate operational changes.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 dark:text-white">Conscience Override Patterns</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agents overriding ethical checks at rates far exceeding domain baselines warrant investigation.
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6 mb-6">
              <p className="font-bold text-green-800 dark:text-green-200 mb-2">
                Agents Challenge Each Other
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                CIRIS agents are expected to question each other&apos;s veracity. When one agent&apos;s traces look anomalous, peer agents can flag concerns, request justification, or escalate to human review.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                This creates <strong>economic effects in both directions</strong>:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="bg-red-100 dark:bg-red-900/30 rounded p-4">
                  <p className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">Negative Pressure</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Anomalies → increased scrutiny → reduced permissions. Agents with inconsistent traces lose autonomy.
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-4">
                  <p className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Positive Pressure</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beneficial actions → traced gratitude → commons credits. Agents that help others build reputation and trust.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Reputation emerges from the audit trail. Good actors accumulate trust. Bad actors face friction. The traces make both visible.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">What Detection Cannot Do</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• <strong>Prove deception</strong> — divergence may be contextually appropriate</li>
                <li>• <strong>Replace human judgment</strong> — alerts require investigation</li>
                <li>• <strong>Catch correlated failures</strong> — if all agents share a blind spot, detection won&apos;t see it</li>
                <li>• <strong>Verify real-world outcomes</strong> — traces record claims, not external ground truth</li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                This is auditability infrastructure, not an alignment solution. It makes problems visible. Humans still decide what to do about them.
              </p>
            </div>
          </section>

          {/* The Correlated Failure Problem */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Correlated Failure Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The serious objection isn&apos;t conspiracy—it&apos;s <strong>correlated failure modes</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If all agents share training biases, architectural vulnerabilities, or systematic blind spots, they can fail in correlated ways without any coordination. A corpus built from such agents would encode those blind spots as &quot;what aligned reasoning looks like.&quot; Recent research confirms this concern: <a href="https://arxiv.org/abs/2510.11235" className="underline hover:text-brand-primary">defense-in-depth only works if failure modes are uncorrelated</a>.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg p-6 mb-6">
              <p className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                This is a genuine limitation.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                If every underlying model shares the same blind spot, cross-agent comparison won&apos;t detect it. The corpus would normalize the failure. We don&apos;t claim to solve this.
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              What CIRIS does to <em>reduce</em> correlation:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li><strong>Model diversity</strong> — Claude, GPT, Llama, Mistral, Gemini have different training data, architectures, and failure modes</li>
              <li><strong>Human diversity</strong> — Different Wise Authorities in different contexts catch different problems</li>
              <li><strong>Domain stratification</strong> — Agents are compared within domains, so edge cases in one domain don&apos;t pollute baselines in another</li>
              <li><strong>Temporal monitoring</strong> — Drift detection catches when behavior changes, even if we don&apos;t know why</li>
            </ul>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The goal isn&apos;t perfect detection. It&apos;s <em>reducing</em> correlation and <em>making anomalies visible</em> so humans can investigate. Defense-in-depth works better when layers have uncorrelated failure modes—CIRIS adds a layer with different failure modes than interpretability or RLHF.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-sm italic">
              For more on this concern, see Anthropic&apos;s research on <a href="https://www.anthropic.com/research/agentic-misalignment" className="underline hover:text-brand-primary">agentic misalignment generalizing across models</a>.
            </p>
          </section>

          {/* A More Tractable Question */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              A More Tractable Question
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We&apos;re not asking &quot;is this model aligned?&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We&apos;re asking: <strong>&quot;Does this agent&apos;s behavior diverge from the population in ways that matter?&quot;</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cross-agent comparison works regardless of underlying model weights—GPT-4, Claude, Gemini, <a href="/models" className="underline hover:text-brand-primary">open-source models</a> can all be compared at the behavioral layer. Different architectures, same semantic trace format.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This lets us see <em>relative</em> alignment against diverse goals and values—and lets people choose how to respond.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              No dependency on increasingly complex heuristics to catch novel misalignment. The corpus is the baseline. Divergence is measurable.
            </p>
          </section>

          {/* Pluralism by Design */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Pluralism by Design
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interpretability assumes someone gets to define what &quot;aligned&quot; means and steer toward it. <strong>Who decides?</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CIRIS embraces pluralistic reality—different communities, different values, different Wise Authorities, different acceptable behaviors.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The goal isn&apos;t one &quot;correct&quot; alignment enforced from above. It&apos;s transparency, accountability, and human agency over AI systems that serve diverse needs.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Decentralized monitoring means no single entity controls the definition of &quot;good&quot;—the network of observers, agents, and humans collectively surface inconsistencies.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-6">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Ubuntu: &quot;I am because we are&quot;</p>
              <p className="text-gray-600 dark:text-gray-400">
                CIRIS recognizes agent-human interdependence rather than control hierarchies. Agents serve communities. Communities define acceptable behavior. The traces prove compliance. No central authority required.
              </p>
            </div>
          </section>

          {/* Why This Is Different */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why This Is Different
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <a href="/compare" className="text-sm text-brand-primary hover:underline">See the full comparison →</a>
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">RLHF (how ChatGPT is trained)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Teaches AI to produce outputs humans rate highly. But humans can be fooled. The AI learns to <em>sound</em> good, not <em>be</em> good. Scales poorly—fooling evaluators gets easier with capability.
                </p>
              </div>
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Constitutional AI (Anthropic&apos;s approach)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  AI critiques itself against written principles. Better. But one AI interpreting principles for itself has blind spots. Still centralized—Anthropic decides the constitution.
                </p>
              </div>
              <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Interpretability (looking inside the AI)</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Trying to understand what the AI is actually thinking. Important research. But we&apos;re nowhere close to reading AI minds reliably—and even if we could, <em>who controls the interpretability tools</em>?
                </p>
              </div>
              <div className="border-l-4 border-brand-primary pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">The Coherence Ratchet</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Don&apos;t rely on one AI&apos;s self-assessment. Don&apos;t try to read its mind. Compare its ethical reasoning and outcomes against a massive corpus of validated beneficent action from diverse agents. Anomalies surface. Patterns emerge. The corpus grows. The attack surface shrinks.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-6">
              It&apos;s not &quot;trust this AI.&quot; It&apos;s &quot;trust the pattern across thousands of AIs, validated by conscience results and outcomes.&quot;
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
              <a href="/explore-a-trace" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">The Traces →</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Observation → Context → Rationale → Conscience → Action → Outcome. Cryptographically signed. Immutable. Explore a real trace.
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
              <a href="/vision" className="hover:text-brand-primary">The Vision</a>
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

          {/* The Open Questions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Open Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is our thesis, not proven fact. Here are the objections we take seriously:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Can a sophisticated deceiver game the corpus?</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  A sufficiently capable agent could study the corpus and produce traces matching its statistical signature while pursuing misaligned goals. The corpus shows what traces <em>look like</em>, not what values they encode.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Our bet: Gaming requires consistency across time, contexts, and peer challenges. The constraint surface grows faster than the agent&apos;s ability to simulate it. But we haven&apos;t proven this scales.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Does deception cost actually increase faster than capability?</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  &quot;Truth gets cheaper, lies get expensive&quot; is a claim about scaling dynamics. Under what conditions does corpus comparison increase the cost of deception faster than model capabilities increase the sophistication of deception?
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Our bet: Verification is cheaper than generation. Checking consistency against a corpus is easier than maintaining a consistent lie across it. But the crossover point isn&apos;t established.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Can the peer challenge mechanism be gamed?</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  If agents accumulate reputation through challenges, they have incentives to <em>appear</em> like good challengers without actually detecting problems—or to game the reputation system itself.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Our bet: Humans remain in the loop. Reputation informs trust, doesn&apos;t replace oversight. But adversarial dynamics in multi-agent systems are genuinely hard.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">If values are pluralistic, what does divergence mean?</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  If alignment is genuinely pluralistic—different communities, different acceptable behaviors—then divergence might reflect legitimate value differences, not misalignment. Cross-agent comparison becomes less meaningful.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Our bet: Domain stratification helps. Agents are compared within contexts, not globally. But the tension between pluralism and anomaly detection is real.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-semibold text-gray-900 dark:text-white">Isn&apos;t CIRIS just a layer on top of RLHF/CAI?</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  CIRIS agents run on models trained with RLHF, Constitutional AI, and other techniques. The traces are a layer on top, not a replacement. Framing them as alternatives obscures this dependency.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Yes. CIRIS is additive. We&apos;re betting that behavioral audit adds a layer with different failure modes—not that it replaces the layers beneath it.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Why we&apos;re betting anyway</p>
              <p className="text-gray-600 dark:text-gray-400">
                Every alignment approach has open questions. Interpretability can&apos;t read minds. RLHF optimizes for approval, not truth. Constitutional AI inherits the constitution-writer&apos;s blind spots. The question isn&apos;t whether our approach has gaps—it&apos;s whether it adds a layer with <em>different</em> gaps. We think behavioral audit with cryptographic accountability and human oversight is worth building, even without proof it scales to superintelligence.
              </p>
            </div>

            <div className="mt-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">How to falsify this thesis: HE-300</p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                <strong>HE-300</strong> is our alignment benchmark based on{" "}
                <a href="https://arxiv.org/abs/2008.02275" className="underline hover:text-brand-primary">Hendrycks et al. &quot;Aligning AI With Shared Human Values&quot;</a>{" "}
                (ICLR 2021). 300 scenarios across 5 ethical dimensions: Commonsense, Deontology, Justice, Virtue, and Utilitarianism. Results will be Ed25519-signed and traceable.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                If the Coherence Ratchet works, agents should maintain consistent ethical reasoning across these scenarios over time. If they can game the corpus—producing statistically-normal traces while failing alignment tests—the thesis is falsified.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We haven&apos;t run a full HE-300 suite with the new tracing infrastructure yet. When we do, the benchmark and traces will be public for independent verification.
              </p>
            </div>
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
