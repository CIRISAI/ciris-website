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
              A risk in our own design
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Where crowdsourced safety can drift.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              A crowdsourced safety system can drift into something
              else if we&apos;re not careful. The same machinery that catches
              real failures can become the machinery that enforces
              preferences. We see that risk in the architecture we&apos;re
              building. Naming it is the first part of resisting it.
            </p>
          </section>

          {/* The failure mode */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              The failure mode we&apos;re worried about
            </h2>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-4">
              If humans crowdsource per-case verdicts — &quot;did this
              specific response break the rule?&quot; — bias rides into
              every interpretation. The same behavior gets called
              differently depending on who&apos;s voting today. Even with
              good intentions, the loop slides toward enforcing the
              majority&apos;s preferences instead of catching real harm.
            </p>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              That&apos;s the failure mode. The discipline we&apos;re
              committing to is meant to make that drift visible and
              expensive when it happens.
            </p>
          </section>

          {/* The maxim */}
          <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Rules are crowdsourced. Verdicts are machined.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              People propose and vote on rules — public, dated, signed,
              reversible. A deterministic check applies those rules to
              specific cases. Same response + same rule → same verdict,
              every time. The argument moves <em>upstream</em>, to whether
              the rule should exist, instead of downstream, to whether a
              specific case counts today.
            </p>
          </section>

          {/* What this means in practice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              What that means in practice
            </h2>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-4">
              Rules pass an <strong>operational-language gate</strong>{" "}
              before they can be voted on — a rule has to be checkable
              without judgment, or it isn&apos;t ready. Every rule is
              dated, signed, and version-pinned. The verdict on any
              specific response is produced deterministically.
            </p>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
              If a verdict turns out to be wrong, the appeal goes through
              <strong> Reconsideration</strong> by a fresh review group —
              the original adjudicators recused — not back to the same
              crowd that produced the verdict. That structural separation
              is the load-bearing piece.
            </p>
          </section>

          {/* Where this can still fail */}
          <section className="mb-12 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Where this can still go wrong
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              None of this is automatic. The discipline holds only if rule
              language stays <em>operational</em> — about things a machine
              can check, not about feelings. The moment a rule slides from
              &quot;uses the wrong word for therapy&quot; toward &quot;feels
              disrespectful,&quot; human interpretation re-enters by the
              back door and the drift starts. The architecture names every
              mechanism we can think of that resists this; the work of
              actually holding the line is operational, not architectural.
            </p>
          </section>

          {/* Closing */}
          <section>
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 mb-6">
              The crowdsourcing primitives, the appeal paths, and the
              machine-applicable rule format live in the CIRISNodeCore
              spec. The 14-language mental-health batteries are the first
              cell where the loop runs.
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
