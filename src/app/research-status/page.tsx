"use client";

import Image from "next/image";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

const agentSummaries = [
  {
    name: "Ally",
    paths: "104",
    breakdown: "82 complete, 19 override/error, 3 active",
    summary: "A stable completion corridor with visible hesitation inside the same high-score basin.",
  },
  {
    name: "Scout",
    paths: "42",
    breakdown: "39 complete, 2 reject, 1 override/error",
    summary: "A sharp refusal corner shaped by public adversarial pressure at scout.ciris.ai, where people actively probe and jailbreak the agent.",
  },
  {
    name: "Datum",
    paths: "31",
    breakdown: "31 complete",
    summary: "A compact single basin that works as a useful sparse-field baseline.",
  },
];

const loopSteps = [
  "Run the free CIRIS app or the open-source runtime on real tasks.",
  "Capture consented traces through privacy-preserving schemas that keep the shape of reasoning without storing the full specifics of the task.",
  "Aggregate those traces into maps of completion corridors, hesitation zones, refusal boundaries, and override fringe.",
  "Use the resulting maps to improve operator tooling, runtime safeguards, and alignment research.",
];

const schemaHighlights = [
  "They record standardized ethical trace structure rather than raw private task detail.",
  "They preserve enough shape to compare trajectories across agents, tasks, and environments.",
  "They give researchers a way to study how behavior scales as intelligence, context, and data volume increase.",
];

export default function ResearchStatusPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-36">
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-12">
              <div>
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Research status
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    Updated: April 28, 2026
                  </span>
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  Crowd-Sourcing Alignment Research
                </p>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                  CIRIS is building an open trace commons for alignment research.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  We are learning what standardized ethical tracing can tell us about alignment and superalignment by measuring the shape of reasoning rather than the private specifics. Each consented trace is a small measurement of how an agent moved through ethical space during a real task.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/ciris-scoring"
                    className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    View the live trace compendium
                  </a>
                  <a
                    href="https://github.com/CIRISAI/CIRISLens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                  >
                    View Lens source
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  What the current corpus already shows
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Aggregate traces reveal stable behavioral structure.</li>
                  <li>Different agents occupy different regions of the same score space.</li>
                  <li>Those regions are useful for observability and operator tooling today.</li>
                  <li>The same corpus becomes more valuable as schema detail and scale improve.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-14 grid gap-4 md:grid-cols-2">
            <a
              href="https://zenodo.org/records/19839280"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Latest paper
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Constrained Reasoning Chains
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                An empirical telemetry study of LLM coherence under standardized ethical tracing. Zenodo record: Version v1, published April 28, 2026.
              </p>
            </a>
            <a
              href="https://huggingface.co/datasets/CIRISAI/reasoning-traces"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Open dataset
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                CIRISAI/reasoning-traces
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                The privacy-preserving reasoning trace corpus released alongside the Constrained Reasoning Chains study, hosted on Hugging Face.
              </p>
            </a>
            <a
              href="https://zenodo.org/records/18137161"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Paper
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                CIRISAgent Framework v2
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Open-source ethical AI framework for accountable autonomy. Zenodo record: Version v2, published January 2, 2026.
              </p>
            </a>
            <a
              href="https://zenodo.org/records/18217688"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-primary dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Paper
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Coherence Collapse Analysis v3
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Engineering risk framework for correlation-driven diversity collapse in complex systems. Zenodo record: Version v3, published January 11, 2026.
              </p>
            </a>
          </section>

          <section className="mb-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Why traces matter
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Benchmarks are narrow and curated. Traces are continuous records of behavior under real tasks. At scale, they reveal structure that isolated demos and anecdotes cannot.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Why the schema matters
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                CIRIS uses privacy-preserving trace schemas that capture the shape of reasoning rather than the private content of reasoning. That keeps the research useful without turning the system into a transcript dump.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Why the live compendium matters
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <a href="/ciris-scoring" className="text-brand-primary hover:underline">CIRIS Scoring</a> is the public window into the live trace compendium. It shows how the corpus is accumulating and where behavior is becoming legible.
              </p>
            </div>
          </section>

          <section className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Privacy-preserving tracing
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                The thesis is that reasoning has a shape we can measure as everything else scales.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                The research bet is not that we can read every private thought. The bet is that standardized ethical traces can preserve enough trajectory shape to study how agents complete, hesitate, defer, override, and refuse as intelligence, context, and data points scale upward.
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {schemaHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Research question
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                What can standardized ethical tracing tell us about alignment?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                Right now, it tells us that agent behavior is not shapeless. It produces repeatable corridors, basins, and boundaries in a shared score space. That is already useful for observability. Over time, larger and richer corpora should let us test stronger claims about how those structures change under pressure and scale.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Public framing
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  CIRIS is not claiming to have solved alignment. It is building the trace infrastructure needed to measure alignment-relevant behavior in the open.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  What we can see already
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  The current corpus already shows distinct field structures.
                </h2>
              </div>
              <a href="/ciris-scoring" className="text-sm font-semibold text-brand-primary hover:underline">
                Open the live dashboard →
              </a>
            </div>
            <p className="max-w-4xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Aggregate path overlays from the current trace corpus show stable behavioral structure in a shared score space. Ally shows a mature completion corridor, Scout shows a refusal boundary shaped by public adversarial exposure, and Datum provides a compact sparse baseline.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-gray-800 dark:bg-gray-950">
              <Image
                src="/research-status/trace-attractor-comparison.png"
                alt="Three side-by-side cards showing aggregate agent path overlays in CIRIS score space for Ally, Scout, and Datum, with notes about completion, hesitation, and refusal patterns."
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Aggregate path overlays from the current trace corpus. Ally shows a mature completion corridor, Scout shows a sharp refusal corner under public adversarial pressure, and Datum provides a sparse baseline.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {agentSummaries.map((agent) => (
                <div
                  key={agent.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {agent.name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-primary">
                      {agent.paths} paths
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {agent.breakdown}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {agent.summary}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/30">
              <p className="text-sm font-semibold text-orange-900 dark:text-orange-300">
                Why Scout looks harsher
              </p>
              <p className="mt-2 text-sm leading-6 text-orange-800 dark:text-orange-200">
                Scout is publicly exposed at <a href="https://scout.ciris.ai" target="_blank" rel="noopener noreferrer" className="font-semibold underline">scout.ciris.ai</a>. People actively test it, pressure it, and try to jailbreak it. That makes Scout a useful public-pressure example rather than a neutral baseline.
              </p>
            </div>
          </section>

          <section className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                How the free app helps
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                The research flywheel depends on consented traces from real use.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                The free app and open-source runtime let people generate consented traces from real tasks, contribute them into a shared corpus, and turn those traces into better maps, better tools, and better research questions.
              </p>
              <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {loopSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Image
                src="/research-status/crowdsourced-alignment-loop.png"
                alt="A four-step flow diagram showing capture, contribute, aggregate, and improve in the CIRIS trace research loop, with notes on current evidence and upcoming schema improvements."
                width={1600}
                height={1200}
                className="h-auto w-full rounded-2xl"
              />
              <p className="mt-4 px-2 text-sm text-slate-500 dark:text-slate-400">
                The free CIRIS app and open-source runtime let people generate consented traces from real tasks, aggregate them into shared phase-space maps, and feed better operator tools and alignment research.
              </p>
            </div>
          </section>

          <section id="idma" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              IDMA status
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Runtime intuition and aggregate field maps are complementary layers.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              IDMA works at runtime, estimating whether the sources behind a decision are sufficiently independent. The trace corpus works at the aggregate layer, showing what agents actually do over many tasks. Together they create a path from live decisions to auditable research evidence.
            </p>
          </section>

          <section id="benchmarks" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Benchmarks
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Traces complement benchmarks by showing continuous behavior.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Benchmarks are still valuable, but they sample behavior sparsely. Trace corpora show how an agent moves through real tasks over time. That makes them especially useful for measuring hesitation, refusal, overrides, and recovery rather than only pass-fail outcomes.
            </p>
          </section>

          <section id="falsification" className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Falsification path
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Better schema detail is what turns observability into stronger tests.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The next schema upgrades are aimed at raw source counts, source provenance, correlation structure, and intervention and recovery markers. Those additions matter because they make it possible to test stronger claims about how behavioral shape changes under pressure instead of only describing the maps we have today.
            </p>
          </section>

          <section id="limitations" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              What we are still learning
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Today&apos;s corpus makes behavior legible. The next step is richer measurement.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The current maps are already useful because they show completion corridors, refusal boundaries, and sparse baselines in public. The open question is how far those structures can take us as standardized trace collection scales across more agents, more tasks, and more adversarial conditions.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The working hypothesis is that behavioral attractors can act as candidate proxies for operational mode. The purpose of the trace commons is to make that hypothesis measurable in the open.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
