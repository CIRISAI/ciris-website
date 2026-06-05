"use client";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export default function MddPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Methodology
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                Active: v1.0
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Mission Driven Development
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Mission as the fourth foundation of software architecture.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Most software asks how to build a thing. Mission Driven Development
              (MDD) adds one question first: why are we building it, and does this
              choice serve that purpose? CIRIS was built this way, so ethics is part
              of the design instead of a rule bolted on afterward.
            </p>
          </section>

          {/* Four-component model */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The Four-Component Model
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Three structural legs supporting one purposeful seat.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Conventional software methodologies stop at three: how the system runs, what it
              represents, and who talks to whom. MDD adds a fourth foundation that the other
              three are answerable to. Without the seat, the legs are just legs.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Leg 1: HOW
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  Logic
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Implementation patterns, service architectures, algorithms.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Leg 2: WHAT
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  Schemas
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Data structures, type systems, validation rules.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Leg 3: WHO
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  Protocols
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Interface contracts, communication patterns, service boundaries.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-brand-primary bg-brand-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  Seat: WHY
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  Mission
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Objective ethical framework defining system purpose and constraints.
                </p>
              </div>
            </div>
          </section>

          {/* Constant alignment */}
          <section className="mb-14 rounded-3xl border-l-4 border-brand-primary bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Core principle
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Constant alignment.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Every architectural decision must demonstrate alignment with the stated mission.
              Logic is challenged: <em>does this serve the mission?</em> Schemas are validated:
              {" "}<em>do these data structures support mission objectives?</em> Protocols are
              evaluated: <em>do these interfaces enable mission fulfillment?</em>
            </p>
          </section>

          {/* Mission framework requirements */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Mission framework requirements
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              What a mission needs to be, to be load-bearing.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  1. Objective ethical foundation
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Measurable principles, not aspirational values</li>
                  <li>Clear algorithms for trade-off resolution</li>
                  <li>Pluralistic across cultural contexts</li>
                  <li>Auditable ethical reasoning</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  2. Meta-goal definition
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Provides decision guidance under uncertainty</li>
                  <li>Filters contradictory proposals automatically</li>
                  <li>Creates coherent behavior across components</li>
                  <li>Stable across implementation changes</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  3. Operational integration
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Each service justifies its existence</li>
                  <li>Schemas reflect mission information shapes</li>
                  <li>Protocols enable mission-aligned behavior</li>
                  <li>Tests verify mission alignment, not just function</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Implementation patterns */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Implementation patterns
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Each leg has a question it has to answer.
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Service architecture
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  mission definition → service responsibilities → interface contracts → implementation
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li><strong className="text-slate-900 dark:text-white">Mission alignment:</strong> how does this service advance the meta-goal?</li>
                  <li><strong className="text-slate-900 dark:text-white">Boundary justification:</strong> why does this responsibility need a separate service?</li>
                  <li><strong className="text-slate-900 dark:text-white">Interface necessity:</strong> what mission-critical interactions does this protocol enable?</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Schema design
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  mission requirements → information model → type system → validation rules
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li><strong className="text-slate-900 dark:text-white">Mission relevance:</strong> what mission-critical information does this capture?</li>
                  <li><strong className="text-slate-900 dark:text-white">Behavioral constraints:</strong> how do these types enforce mission-aligned behavior?</li>
                  <li><strong className="text-slate-900 dark:text-white">Evolution path:</strong> how can this schema adapt while preserving mission alignment?</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Protocol specification
                </h3>
                <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                  mission interactions → communication requirements → contract definition → implementation
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li><strong className="text-slate-900 dark:text-white">Mission context:</strong> what mission-critical communication does this enable?</li>
                  <li><strong className="text-slate-900 dark:text-white">Constraint enforcement:</strong> how does this interface prevent mission-violating behaviors?</li>
                  <li><strong className="text-slate-900 dark:text-white">Composability:</strong> how do these contracts combine into mission-aligned systems?</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sustainable development */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Sustainable development integration
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Long-term mission alignment requires maintainable velocity.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Anti-Goodhart measures
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Regular audits of implementation-mission alignment</li>
                  <li>Measure mission fulfillment, not gameable proxies</li>
                  <li>Reject additions that don&apos;t strengthen the mission</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Rhythm-based work
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Sessions aligned with productivity rhythms</li>
                  <li>Built-in choice points for re-alignment</li>
                  <li>Sustainable pace as a first-class requirement</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Continuous validation
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Regular questioning of component necessity</li>
                  <li>Ongoing verification that behavior matches mission</li>
                  <li>Automated detection of mission-violating changes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quality gates */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Quality gates
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Gates that won&apos;t open without a mission justification.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Code review
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Mission-alignment explanation required</li>
                  <li>Constraint verification</li>
                  <li>Integration must strengthen overall coherence</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Testing
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Functional correctness</li>
                  <li>Mission-alignment verification</li>
                  <li>Ethical-boundary refusal tests</li>
                  <li>Constraint resilience under stress</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Documentation
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Mission context for every component</li>
                  <li>Rationale for ethical trade-offs</li>
                  <li>How constraints shape implementation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Failure modes */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Failure modes
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              How MDD breaks, and how it stays unbroken.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  Mission drift
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Symptom: features accumulate that don&apos;t serve the core mission.
                  Mitigation: regular architectural reviews with mission-alignment as the gate.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  Complexity explosion
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Symptom: the system becomes unmaintainable through unnecessary sophistication.
                  Mitigation: reject additions unless they strengthen mission fulfillment.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  Ethical inconsistency
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Symptom: components apply ethical reasoning inconsistently. Mitigation:
                  centralized ethical framework with shared implementation patterns.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
                <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
                  Purpose confusion
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Symptom: team members lose the link between technical decisions and mission.
                  Mitigation: ongoing training on mission-driven decision making.
                </p>
              </div>
            </div>
          </section>

          {/* Case study: CIRIS */}
          <section className="mb-14 rounded-3xl border-2 border-brand-primary bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Case study
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              CIRIS, the worked example.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              CIRIS (Core Identity, Integrity, Resilience, Incompleteness, Signalling Gratitude)
              is the system MDD was developed alongside. The mission is{" "}
              <a href="/vision" className="text-brand-primary hover:underline">
                Meta-Goal M-1
              </a>
              : promote sustainable adaptive coherence enabling diverse sentient beings to pursue
              flourishing.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Architecture results
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>22 services, each justified by mission requirements</li>
                  <li>200+ API endpoints verified</li>
                  <li>10,000+ tests, with minimal untyped data structures in production</li>
                  <li>
                    <a href="/vision" className="text-brand-primary hover:underline">
                      Ubuntu philosophy
                    </a>{" "}
                    embedded in protocol design
                  </li>
                  <li>
                    Wisdom-Based Deferral preventing mission violations (
                    <a href="/safety" className="text-brand-primary hover:underline">
                      see Safety
                    </a>
                    )
                  </li>
                  <li>Production deployment moderating Discord communities</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Key success factors
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Clear meta-goal: M-1 provides unambiguous decision criteria</li>
                  <li>
                    Operational ethics: Accord principles implemented as code constraints (
                    <a href="/sections/main" className="text-brand-primary hover:underline">
                      read the Accord
                    </a>
                    )
                  </li>
                  <li>Sustainable development: Grace companion enforcing healthy rhythms</li>
                  <li>Constant validation: every architectural decision challenged</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Adoption guidelines */}
          <section className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Adoption guidelines
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              How to start, where you are.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  For new projects
                </h3>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Define a clear mission with measurable ethical principles before writing code</li>
                  <li>Establish a meta-goal that provides decision-making guidance</li>
                  <li>Design the architecture so mission constraints sit at the foundational level</li>
                  <li>Build continuous validation of mission-technical alignment from day one</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  For existing projects
                </h3>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Audit the current architecture for implicit mission assumptions</li>
                  <li>Articulate an explicit mission that explains the existing design patterns</li>
                  <li>Identify mission violations in the current implementation</li>
                  <li>Plan incremental alignment, prioritized by mission impact</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Team prerequisites
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <li>Commitment to objective ethical reasoning</li>
                  <li>Willingness to reject elegant solutions that don&apos;t serve the mission</li>
                  <li>Belief that mission constraints create rather than limit good architecture</li>
                  <li>Sustainable development practices that preserve long-term focus</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Where this goes
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              MDD is not appropriate for every project.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              MDD is designed for systems where ethical behavior is mission-critical and
              long-term reliability matters more than short-term feature velocity. For those
              systems, MDD provides a pathway from ethical intentions to operational reality,
              with the same engineering discipline applied to the mission as to the code.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Initial overhead is real as the team learns mission-driven decision making. The
              compounding return is in the development that follows: the framework clarifies
              architectural choices instead of multiplying them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/MISSION_DRIVEN_DEVELOPMENT.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Read the source FSD
              </a>
              <a
                href="/vision"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                The CIRIS mission (M-1)
              </a>
              <a
                href="/sections/main"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                The Accord
              </a>
              <a
                href="/federation"
                className="inline-block rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
              >
                Federation (3.X plan)
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
