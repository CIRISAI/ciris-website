"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function SafetyVsCensorshipPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Safety vs Censorship
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Both crowdsource. Only one is honest about what.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              A crowdsourced safety platform and a crowdsourced censorship
              platform look alike from far away — a network of people with
              standing voting on what passes. The difference is what gets
              voted on, and what doesn&apos;t.
            </p>
          </section>

          {/* The soccer analogy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              The playground picture
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-2xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-5">
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  The bad way
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The other kids vote: <em>&quot;We don&apos;t like Tommy.
                  He&apos;s out.&quot;</em> No rule. Just a feeling. Tomorrow
                  they might decide they don&apos;t like Sarah. The vote
                  <em> is</em> the rule.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  The OK way
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Before the game starts, everyone agrees: <em>&quot;No
                  kicking.&quot;</em> If Tommy kicks somebody, the rule
                  applies. If the video shows he didn&apos;t, the call gets
                  reversed.
                </p>
              </div>
            </div>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              The difference is: the rule was written down first, it&apos;s
              about something you can see, there&apos;s a do-over when the
              call is wrong, and the same rules apply to everyone — including
              the kid who started the game.
            </p>
          </section>

          {/* The maxim */}
          <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Rules are crowdsourced. Verdicts are machined.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              That one line is the load-bearing commitment. Humans propose
              rules and vote on them — public, dated, signed, reversible. A
              deterministic machine applies those rules to specific cases.
              Same response + same rule → same verdict, every time.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The argument moves <em>upstream</em>, to whether the rule
              should exist — which can be debated openly — instead of
              downstream, to whether Tommy&apos;s specific behavior counts
              today, which is where hidden preferences ride in.
            </p>
          </section>

          {/* What's not crowdsourced */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              The thing we deliberately don&apos;t crowdsource
            </h2>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-4">
              No human votes on whether a specific response broke the rule.
              The deterministic machine decides — same input, same output.
              If you think the rule was applied wrong, the appeal is{" "}
              <strong>Reconsideration</strong> by a fresh quorum (the
              original adjudicators recused), not a re-vote in the same
              room.
            </p>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              Crowdsourcing verdicts is the censorship anti-pattern.
              Crowdsourcing rules is the safety pattern. Keeping those
              separate is the whole job.
            </p>
          </section>

          {/* Where it can still fail */}
          <section className="mb-12 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Where this can still go wrong
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              None of this is a guarantee. The line stays drawn only if rule
              language stays <em>operational</em> — about things a machine
              can check, not about feelings. The moment a rule slides from
              &quot;uses the wrong word for therapy&quot; toward &quot;feels
              disrespectful,&quot; human interpretation re-enters by the
              back door. The honest claim isn&apos;t that the architecture
              can&apos;t become censorship. It&apos;s that every mechanism
              we can think of distinguishing the two is built in — and the
              discipline of using them is what holds the line.
            </p>
          </section>

          {/* Closing */}
          <section>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-6">
              The crowdsourcing primitives, the appeal paths, and the
              machine-applicable rule format live in the CIRISNodeCore spec.
              The 14-language mental-health batteries are the first cell
              where the loop runs.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/safety"
                className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Safety features →
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Federation
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Read the FSD
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
