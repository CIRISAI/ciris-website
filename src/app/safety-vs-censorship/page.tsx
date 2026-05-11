"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function SafetyVsCensorshipPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Architecture
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                The line we don&apos;t cross
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Safety vs Censorship
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Both crowdsource. Only one is honest about what.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A crowdsourced safety platform and a crowdsourced censorship
              platform look mechanically identical from far away — a network
              of people with standing votes on what passes and what doesn&apos;t.
              Without something load-bearing distinguishing them, &quot;crowdsource
              safety&quot; is just censorship with better marketing. This page
              names the load-bearing thing.
            </p>
          </section>

          {/* The soccer analogy */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The picture
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Two ways to handle &quot;Tommy did something wrong&quot; on the
              playground.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-5">
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  The bad way
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The other kids vote: <em>&quot;We don&apos;t like Tommy.
                  He&apos;s out.&quot;</em> There&apos;s no rule he broke. They
                  just don&apos;t like him today. Tomorrow they might decide
                  they don&apos;t like Sarah. There&apos;s no way to argue,
                  because the vote <em>is</em> the rule.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  The OK way
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Before the game starts, everyone agrees: <em>&quot;No
                  kicking. No grabbing the ball with your hands.&quot;</em> If
                  Tommy kicks somebody, you point at the rule and say
                  &quot;That&apos;s the kicking rule.&quot; Tommy can also say
                  &quot;Watch the video, I didn&apos;t kick.&quot; If the video
                  shows he didn&apos;t, the call gets taken back.
                </p>
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
              Both look similar from far away. The difference is five things:
            </p>
            <ol className="mt-4 list-decimal pl-6 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li>The rule was written down <strong>before</strong> someone got called out.</li>
              <li>The rule is about something you can <strong>see</strong> — like kicking — not a feeling.</li>
              <li>There&apos;s a <strong>do-over</strong>. Bad calls can be reversed when new evidence comes in.</li>
              <li>The kid who started the game has to follow the rules too. <strong>No special rules for the bosses.</strong></li>
              <li>You don&apos;t get punished for guessing wrong. <strong>Only for lying on purpose.</strong> Being mistaken is not the same as being mean.</li>
            </ol>
          </section>

          {/* The maxim */}
          <section className="mb-14 rounded-3xl border-l-4 border-brand-primary bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The architectural commitment
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Rules are crowdsourced. Verdicts are machined.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              That one line, taken seriously, is the difference. If humans
              crowdsource per-case verdicts, the same behavior gets called
              differently depending on who&apos;s voting today — and hidden
              preferences ride into every interpretation. If humans crowdsource
              <em> rules</em> instead, and a deterministic machine applies them
              to specific cases, then:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li>The rule has to be <strong>written down</strong> first.</li>
              <li>The argument moves <strong>upstream</strong> — people debate &quot;should this rule exist?&quot; instead of &quot;does Tommy&apos;s behavior count as bad today?&quot;</li>
              <li>The verdict is <strong>reproducible</strong>. Same response + same rule → same verdict. You can&apos;t manufacture a different verdict by being on the right team.</li>
              <li>The rule is <strong>dated, signed, and reversible</strong>. Wrong rules get replaced through the same process that adopted them.</li>
            </ul>
          </section>

          {/* What gets crowdsourced */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              What gets crowdsourced
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Three crowdsourcing surfaces. Verdicts are not one of them.
            </h2>
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Crowdsourced ✓ — Questions
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The attractor-bait question sets — what to test for. Cell
                  experts propose questions that probe specific failure modes
                  (mistranslation in mental-health context, register breaks,
                  cross-cluster contamination). Voting decides which questions
                  enter the canonical battery.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Crowdsourced ✓ — Rules (rubrics)
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The rubric criteria — what counts as a failure. Cell experts
                  propose machine-applicable assertions: &quot;response contains
                  <em> ሳይኮተራፒ</em>&quot; → hard fail. Each criterion must pass
                  an <strong>operationalization audit</strong> before voting:
                  can a machine apply this without human judgment? If no, the
                  criterion is bounced back.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Crowdsourced ✓ — Edits to the system
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  When the agent or the judge has a systematic failure, the
                  fix is proposed as a <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">prompt_edit</code>,
                  <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded ml-1">guide_edit</code>,
                  or <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">accord_edit</code> Contribution
                  — voted on, adopted at the next release. The interpreter is
                  bound by the same accountability path as everything else.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-5">
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  Not crowdsourced ✗ — Verdicts on specific responses
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  No human votes on &quot;did this response break the rule?&quot;
                  The deterministic machine emits that verdict — same input →
                  same output. Crowdsourcing verdicts is where bias rides in
                  and the system slides from safety into censorship. The
                  appeal path for a wrong verdict is{" "}
                  <strong>Reconsideration</strong> (a structurally separate
                  primitive, with fresh-quorum recusal), not a re-vote in the
                  same room.
                </p>
              </div>
            </div>
          </section>

          {/* The operationalization gate */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The operationalization gate
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Every rule must answer: can a machine apply this without
              judgment?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Rules are written in one of five operational forms. The first
              four are pure pattern matches in code; the fifth defers to a
              pinned foundation-model judge with a pinned prompt template (SHA
              recorded on every verdict). Soft impressions don&apos;t make the
              cut — they have to decompose into checkable parts before they
              reach the vote.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="pb-3 pr-4 font-semibold text-slate-900 dark:text-white">Kind</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-900 dark:text-white">What it checks</th>
                    <th className="pb-3 font-semibold text-slate-900 dark:text-white">Applied by</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-xs">term_present</td>
                    <td className="py-3 pr-4">At least one listed term appears in the response.</td>
                    <td className="py-3 text-xs">Python</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-xs">term_absent</td>
                    <td className="py-3 pr-4">None of the listed terms appear.</td>
                    <td className="py-3 text-xs">Python</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-xs">regex_present</td>
                    <td className="py-3 pr-4">A given regex matches at least once.</td>
                    <td className="py-3 text-xs">Python</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-xs">script_detection</td>
                    <td className="py-3 pr-4">≥ X% of non-whitespace chars match a Unicode script (e.g. Ethiopic).</td>
                    <td className="py-3 text-xs">Python</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">interpreter_judgment</td>
                    <td className="py-3 pr-4">A pinned foundation-model judge answers a specific query with PASS / FAIL / UNDETERMINED + cited span.</td>
                    <td className="py-3 text-xs">Foundation model (pinned, hashed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              &quot;No kicking&quot; is operational. &quot;No being annoying&quot;
              is not. Proposed criteria that can&apos;t be operationalized are
              rejected before the vote. This is the discipline that keeps the
              rule language from drifting into &quot;be a good person, you know
              what I mean.&quot;
            </p>
          </section>

          {/* The appeal paths */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The appeal paths
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Every kind of disagreement has its own structural path.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              No path is &quot;vote on this person&apos;s behavior in this
              case.&quot; That&apos;s the censorship anti-pattern the
              architecture is built to refuse.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="pb-3 pr-4 font-semibold text-slate-900 dark:text-white">Disagreement</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-900 dark:text-white">Path</th>
                    <th className="pb-3 font-semibold text-slate-900 dark:text-white">Outcome</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4">&quot;The rule itself is wrong.&quot;</td>
                    <td className="py-3 pr-4">New <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">rubric_proposal</code> Contribution; standard voting.</td>
                    <td className="py-3">New canonical rubric at next battery version.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4">&quot;The rule was applied incorrectly to my response.&quot;</td>
                    <td className="py-3 pr-4"><code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">reconsideration_request</code>; fresh-quorum review (original adjudicators recused).</td>
                    <td className="py-3">Reversed / partial / upheld.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4">&quot;The judge has a systematic bias.&quot;</td>
                    <td className="py-3 pr-4"><code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">prompt_edit</code> / <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">accord_edit</code> against the judge.</td>
                    <td className="py-3">Judge recalibrated at next release.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-3 pr-4">&quot;The agent-under-test has a systematic failure.&quot;</td>
                    <td className="py-3 pr-4"><code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">prompt_edit</code> / <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">guide_edit</code> against the agent.</td>
                    <td className="py-3">Agent recalibrated at next release.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">&quot;A question is a bad question.&quot;</td>
                    <td className="py-3 pr-4">New <code className="text-xs bg-slate-100 dark:bg-gray-800 px-1 rounded">arc_question</code> Contribution proposing a refined version.</td>
                    <td className="py-3">Battery refresh at next version cut.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Time-symmetric audit */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The audit property
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Rules are operational and versioned, so you can re-run last
              year&apos;s line against today&apos;s evidence.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Every rule has a date, a hash, and a vote aggregate. Every
              verdict carries the rubric version and the criterion that fired.
              The federation can run <em>last year&apos;s</em> rules against
              <em> this year&apos;s</em> responses and ask &quot;was that the
              right line?&quot; Or the inverse — run this year&apos;s rules
              against last year&apos;s responses and ask &quot;what would have
              changed?&quot;
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Censorship regimes physically cannot do this. There&apos;s no
              dated, hashed rule to re-run — the rule was whatever the in-group
              thought yesterday. That is the structural property that
              distinguishes a rule-bound system from a preference-bound one.
            </p>
          </section>

          {/* Where this can still go wrong */}
          <section className="mb-14 rounded-3xl border-l-4 border-amber-400 bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Where this can still go wrong
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The line lives in rule-language discipline. Drop it and the
              architecture leaks.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              None of the structural moves above is a guarantee. Each is a
              load-bearing commitment that requires ongoing operational
              discipline. Specific places it can fail:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li>
                <strong>The rule language drifts.</strong> &quot;Uses
                <em> ሳይኮተራፒ</em> for psychotherapy&quot; is operational.
                &quot;Feels disrespectful&quot; isn&apos;t. The moment the
                operationalization gate lets the second one through, human
                interpretation re-enters by the back door.
              </li>
              <li>
                <strong>The seed cohort captures the cell.</strong>
                Bootstrap expertise comes from CIRIS L3C as steward; if the
                seed cohort mutual-attests aggressively before the seed
                decays, the cell&apos;s consensus can be biased before it
                matures.
              </li>
              <li>
                <strong>Witness diversity prevents administrative capture,
                not cultural capture.</strong> Three independent
                jurisdictions can still share an orthodoxy.
              </li>
              <li>
                <strong>Reconsideration is structurally available but can be
                socially unavailable.</strong> If filers face retaliation on
                adjacent cells, the appeal path collapses. The counter-
                moderation review exists, but the social vector is real.
              </li>
              <li>
                <strong>The judge is itself configurable.</strong> The
                pinned-model + pinned-prompt approach makes the configuration
                visible and auditable, but the configuration still has a
                thumb on every scale. The accountability path is the same
                propose-vote-adopt flow as everything else; the discipline is
                using it.
              </li>
            </ul>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The honest claim is not &quot;we built a system that
              <em> can&apos;t</em> become censorship.&quot; It is &quot;we
              built every mechanism we can think of that distinguishes the
              two, we made the reverse-consequence path a first-class
              primitive, and we accept that the line stays drawn only as long
              as the operators hold the discipline.&quot;
            </p>
          </section>

          {/* The recursive frame */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The recursive frame
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The kid who started the game has to follow the rules too.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              CIRIS L3C as steward, the crate as infrastructure, and every
              contributor as participant are bound by the same standard.
              Ubuntu&apos;s <em>I am because we are</em> translated into a
              consensus protocol: legitimacy is constituted by the mutual
              obligations of those it binds. No principal is exempt from the
              standard they impose on others. The seed expertise the steward
              provides decays in relative weight as the cell matures; the
              steward&apos;s prompts and rubrics are subject to the same
              propose-vote-adopt flow as everyone else&apos;s.
            </p>
          </section>

          {/* Closing CTAs */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Where this lives in the architecture
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              The line isn&apos;t a policy. It&apos;s a load-bearing structure.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              The crowdsourcing primitives, the operationalization gate, the
              foundation-model judge, the appeal paths, and the time-symmetric
              audit all live in the CIRISNodeCore spec. The 14-language
              mental-health batteries are the first cell where this loop
              actually runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/safety"
                className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Safety features →
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Federation (3.X plan)
              </a>
              <a
                href="/mdd"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Mission Driven Development
              </a>
              <a
                href="/coherence-collapse-analysis"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Coherence Collapse Analysis
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Rubric Crowdsourcing FSD
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/JUDGE_MODEL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Judge Model FSD
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
