"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function CoherenceCollapseAnalysisPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                The math page
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                Checked by proof software
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Coherence Collapse Analysis
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              When do extra checks stop helping?
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Stacking up checks to catch a lie only works if the checks are
              truly independent. If they secretly copy each other, adding more
              does nothing. Coherence Collapse Analysis is the simple piece of
              math that measures the difference. The full version, with every
              proof, is in the paper.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Read the paper
              </a>
              <a
                href="https://github.com/CIRISAI/RATCHET"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                See the proofs (RATCHET)
              </a>
            </div>
          </section>

          {/* The idea */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The idea
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Five checks that all copy each other are really one check.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Say five people check an answer and all five agree. That feels
              safe. But if all five learned it from the same place, their
              agreement is not five opinions. It is one opinion repeated five
              times. The number of checks looks like five. The real number is
              one.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              This matters for AI. An AI system can run many checks on its own
              reasoning and still be fooled, if those checks share the same
              blind spot. Coherence Collapse Analysis is how CIRIS tells the
              difference between real checks and echoes.
            </p>
          </section>

          {/* The one formula */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The one formula
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Counting the checks you really have.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              There is a single short formula at the heart of it. It comes from
              survey statistics, where it is called the Kish design effect. CIRIS
              was the first to use it for AI alignment.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center font-mono text-lg dark:border-gray-800 dark:bg-gray-950 dark:text-slate-100">
              real checks = checks / (1 + copying × (checks − 1))
            </div>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              &ldquo;Checks&rdquo; is how many checks you ran. &ldquo;Copying&rdquo;
              is how much they overlap, from 0 (all independent) to 1 (all the
              same). The result is how many checks you really have.
            </p>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li>
                <strong className="text-slate-900 dark:text-white">No copying:</strong>{" "}
                ten checks count as ten. Every check earns its place.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Total copying:</strong>{" "}
                ten checks count as one. It does not matter how many you add.
              </li>
            </ul>
          </section>

          {/* The corridor */}
          <section className="mb-12 rounded-3xl border-l-4 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The healthy band
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Not too samey, not too scattered.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The same shape shows up here that shows up everywhere CIRIS looks.
              If the checks copy each other too much, the system is too rigid:
              one voice repeated, easy to fool. If they have nothing in common
              at all, it is too scattered: they cannot agree on anything. Healthy
              checking lives in the band between, the same corridor the rest of
              CIRIS is built around.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The exact edges of that band depend on the system being measured.
              There is no single magic number that works everywhere, and the
              research is honest about that.{" "}
              <a href="/vision" className="text-brand-primary hover:underline">
                The corridor idea, in full, is on the vision page.
              </a>
            </p>
          </section>

          {/* What we measured */}
          <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              On real traffic
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              This was measured, not just argued.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              CIRIS measured the real-check count on its own live agent traffic,
              across thousands of recorded decisions. On healthy traffic it has
              run in the range of about seven to nine genuinely independent
              checks. That measurement, and how it was done, is the{" "}
              <a
                href="https://zenodo.org/records/19839280"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Constrained Reasoning Chains study
              </a>
              . You can watch the live numbers on the{" "}
              <a href="/research-status" className="text-brand-primary hover:underline">
                research page
              </a>
              .
            </p>
          </section>

          {/* The honest ceiling */}
          <section className="mb-12 rounded-3xl border-l-4 border-amber-400 bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              The honest ceiling
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              What this math cannot do.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The paper proves a hard limit on itself. Some kinds of harm do not
              come from one dishonest part. They come from honest parts that add
              up to a bad result, and roughly forty percent of that kind of harm
              cannot be caught by any checker, no matter how good. CIRIS says so
              plainly rather than pretending the math catches everything.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              What the math does say is about cost over time: running real,
              honest reasoning for weeks on end is steadier and cheaper than
              keeping a lie consistent across thousands of recorded decisions.
              It tilts the ground toward honesty. It does not promise to catch
              every single lie.
            </p>
          </section>

          {/* Closing */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              How it fits together
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              The math is one part of a larger whole.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              This page is the measurement. The{" "}
              <a href="/coherence-ratchet" className="text-brand-primary hover:underline">
                Coherence Ratchet
              </a>{" "}
              is how the measurement is put to work. The{" "}
              <a href="/federation" className="text-brand-primary hover:underline">
                Federation
              </a>{" "}
              is how it becomes something many systems share. And the full
              proofs, written so a computer can check them line by line, are in
              the paper and the RATCHET repository.
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
                href="https://zenodo.org/records/18217688"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Read the paper
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
