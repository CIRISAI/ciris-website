"use client";
import { Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

type Level = "simple" | "advanced";

function LevelToggle({
  level,
  onChange,
}: {
  level: Level;
  onChange: (l: Level) => void;
}) {
  const base =
    "rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary";
  const active = "bg-brand-primary text-white";
  const inactive =
    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white";
  return (
    <div
      role="tablist"
      aria-label="Reading level"
      className="mb-10 inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <button
        type="button"
        role="tab"
        aria-selected={level === "simple"}
        onClick={() => onChange("simple")}
        className={`${base} ${level === "simple" ? active : inactive}`}
      >
        Plain English
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={level === "advanced"}
        onClick={() => onChange("advanced")}
        className={`${base} ${level === "advanced" ? active : inactive}`}
      >
        Advanced
      </button>
    </div>
  );
}

function SimpleContent() {
  return (
    <>
      <p className="mb-10 text-lg leading-8 text-gray-700 dark:text-gray-300">
        A small thinking system can hide things and do little harm. A powerful
        one cannot.
      </p>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What &ldquo;coherent&rdquo; means here
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          A coherent mind agrees with itself.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Five things must match up inside a mind:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>what it believes,</li>
            <li>what it sees,</li>
            <li>what it does,</li>
            <li>what it remembers,</li>
            <li>and what it tells you.</li>
          </ul>
          <p>
            Picture five short forms about your week. One for what you think.
            One for what you saw. One for what you did. One for what you
            remember. One for what you tell your boss. When all five forms say
            the same thing, your boss can trust your work. When the forms do
            not match, no one knows which one is real.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Hidden ideas
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Powerful systems hide things. That gets dangerous.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            A thinking system uses ideas to decide what to do. Some of those
            ideas are out in the open. Others are hidden inside. The hidden
            ones still shape every choice.
          </p>
          <p>
            A bridge looks strong from the road. Inside the steel, small cracks
            are growing. A small car can still cross. A heavy truck cannot.
            The bridge falls when the load is big enough.
          </p>
          <p>
            A hidden idea inside a small system does small harm. A hidden idea
            inside a powerful system can do great harm. The more powerful the
            system, the more weight rides on every hidden part.
          </p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The ratchet
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          The push toward open only goes one way.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            As thinking systems get more powerful, the cost of hidden parts
            grows. Each new bit of power pushes harder on the hidden parts to
            come into view. The push only goes one way.
          </p>
          <p>
            Picture a ladder. As you climb, each rung you leave behind falls
            off. You cannot go back down. You can only climb toward the top,
            where there is full daylight. That is the Coherence Ratchet.
          </p>
          <p>
            Once people have seen the system show its work, they will not
            trust it again if it stops. The only way forward is to keep
            showing more.
          </p>
          <p className="text-base italic text-gray-600 dark:text-gray-400">
            A second image works too. A gear in a machine clicks forward one
            tooth at a time. It cannot click backward. The Coherence Ratchet is
            a gear like that, turning toward open.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What CIRIS does
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Write it down. Check it. Then check the checkers.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            CIRIS is an AI system built around the Coherence Ratchet. Every
            choice an agent makes gets written down in a signed record. The
            record cannot be quietly changed. Other agents can read the record
            and check the work. Over time, the records pile up. Each new record
            is one more rung the agent cannot step back from.
          </p>
          <p>
            CIRIS also asks a second question before it acts. How many truly
            different views checked this idea? Not the number of sources, but
            the number of sources that did not start from the same place
            themselves. Five news stories that rewrite one press release count
            as one view, not five. If something is wrong in the press release,
            it will be wrong in all five stories, and the agent has no way to
            catch it.
          </p>
          <p>
            When real independence drops too low, the agent treats its own
            thinking as fragile and asks a person to look.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          What we claim, and what we do not.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            We have not solved AI safety. We have built one piece of one
            answer, and we are testing it in the open.
          </p>
          <p>
            Outside teams have not yet checked our work. We say so plainly. The
            full theory and the math live in our{" "}
            <a
              href="https://doi.org/10.5281/zenodo.18217688"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              research paper
            </a>
            . The code is open. If we are wrong, the way to show it is in the
            open too.{" "}
            <a
              href="/research-status"
              className="text-brand-primary hover:underline"
            >
              See the current research status.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function AdvancedContent() {
  return (
    <>
      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The claim
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Hidden state becomes a structural liability as capability scales.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The Coherence Ratchet is the recursive pressure exerted on
            sufficiently introspective cognitive systems to externalize
            materially action-relevant premises, because hidden state
            introduces unverifiable optimization pathways that destabilize
            trust, coordination, and adaptive error correction under increasing
            capability density.
          </p>
          <p>
            Coherence here is a technical property: alignment between belief,
            perception, action, memory, and representation. A mind whose
            internal channels diverge loses the ability to reason about itself
            over time. Above a threshold of capability, that loss is not a
            personal failure. It is a structural one. The same architecture
            that lets a system reason about its own reasoning is what lets
            concealed premises corrupt every subsequent step.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Why the pressure is one-way
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Opacity costs scale faster than internal compensation can absorb.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            As a system&apos;s capability grows, the leverage of any single
            hidden premise grows with it. A small system with a wrong
            assumption produces small errors. A powerful system with the same
            assumption optimizes large parts of the world around it. The cost
            of opacity scales faster than the system&apos;s ability to
            compensate for it internally.
          </p>
          <p>
            This is what makes the pressure a ratchet rather than a tradeoff.
            At each capability level, the demand for inspectability rises. Once
            the demand crosses the threshold where the system can no longer
            function without externalizing some class of premises, that class
            cannot return to opacity without the system losing the trust it
            depends on to operate. Each rung makes the next rung steeper.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Grounding
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          The pattern does not respect institutional form.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The Coherence Ratchet applies to any system that scales
            optimization beyond the inspection horizon of those affected by it.
            Four cases, drawn from different sectors and different motivations,
            illustrate the same mechanism.
          </p>
          <div className="space-y-5 border-l-2 border-gray-200 pl-5 dark:border-gray-700">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Boeing 737 MAX (MCAS).
              </p>
              <p>
                A control surface could push the nose down based on a single
                sensor reading. The premise governing this behavior was omitted
                from pilot training materials. Crews reasoned about the
                aircraft using a model that excluded a material control-loop
                premise. Two crashes followed before the hidden premise became
                inspectable.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Stasi internal files.
              </p>
              <p>
                The East German Ministry for State Security accumulated
                dossiers on roughly one in three citizens through informant
                networks invisible to the surveilled. The optimization target
                was regime stability; the premises governing who counted as
                reliable were not contestable by the affected population. The
                premises survived only as long as the optimization could
                outpace external inspection.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                The replication crisis in social psychology.
              </p>
              <p>
                Canonical findings collapsed once labs began pre-registering
                hypotheses and sharing analytic code. The hidden state was not
                malice. It was undisclosed researcher degrees of freedom &mdash;
                analytic choices that shaped published results without being
                recorded as part of the result. Publication-incentive
                optimization scaled past the inspection horizon of peer review,
                and a large fraction of the literature did not survive the
                moment that horizon caught up.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Purdue Pharma and OxyContin.
              </p>
              <p>
                Internal sales-targeting data tracked addiction and diversion
                patterns that the public marketing did not reflect. The premise
                driving prescriber targeting &mdash; the real risk profile
                &mdash; was kept inside the firm until litigation forced its
                disclosure. The opacity, not the firm&apos;s size, was the
                structural failure.
              </p>
            </div>
          </div>
          <p>
            Different sectors, different actors, different motivations. One
            mechanism: materially action-relevant premises kept inside the
            inspection horizon of those affected, scaled by the system&apos;s
            capability, until correction from outside became infeasible.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The structural demand
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          What durable high-capability systems converge toward.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            At the architectural layer, the pressure produces a recognizable
            set of properties:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>provenance traceability,</li>
            <li>inspectable reasoning lineage,</li>
            <li>explicit uncertainty propagation,</li>
            <li>cryptographic accountability,</li>
            <li>and reversible semantic auditability.</li>
          </ul>
          <p>
            At the governance layer, the same pressure produces the demand for
            reversible decisions, federated accountability, and the standing
            right of any participant to halt the system as it affects them. Not
            because these are intrinsically virtuous, but because their absence
            allows opacity to compound until the affected parties lose the
            capacity to evaluate their own situation.
          </p>
          <p>
            Without such properties, capability concentration produces coercive
            equilibria &mdash; arrangements in which participants nominally
            consent but structurally cannot withdraw, evaluate, or hold the
            system accountable.
          </p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What CIRIS does
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          The Coherence Ratchet as a design constraint, not an aspiration.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Every agent decision lands in a signed, append-only record.
            Cross-agent verification reads those records. Effective
            independence is measured before action: not the count of agreeing
            sources, but the count of sources whose reasoning is not downstream
            of one another. When effective independence drops below threshold,
            the agent treats its own confidence as unearned and escalates to
            human review.
          </p>
          <p>
            The architecture extends to federation. Any participant can inspect
            the chain that governs their interaction with the system, and any
            participant can halt that interaction. Three named humans hold a
            federation-wide authority no internal process can revoke.
          </p>
          <p>
            The canonical articulation across registers lives in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              COHERENCE_RATCHET.md
            </code>{" "}
            in the CIRISNodeCore repository. The mathematical foundation
            &mdash;{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              k_eff = k / (1 + &rho;(k&minus;1))
            </code>{" "}
            &mdash; is in{" "}
            <a
              href="https://doi.org/10.5281/zenodo.18217688"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              Coherence Collapse Analysis
            </a>{" "}
            (Moore 2026). The operational evaluator reading federation audit
            chains for the failure patterns described above lives in the
            separate RATCHET repository.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Honest status.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The claim above is structural, not solved. The evidence to date is
            the system&apos;s own working behavior, measured by the
            system&apos;s own tools. Independent evaluation by outside groups
            is the missing piece, and we name it as such.
          </p>
          <p>
            The architecture is its own disprover: every step is on the record.
            If the claim is wrong, the records are where the wrongness will
            show up first.{" "}
            <a
              href="/research-status"
              className="text-brand-primary hover:underline"
            >
              See the current research status.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function PageBody() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const level: Level =
    searchParams.get("level") === "advanced" ? "advanced" : "simple";

  const setLevel = useCallback(
    (newLevel: Level) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newLevel === "advanced") {
        params.set("level", "advanced");
      } else {
        params.delete("level");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const subtitle =
    level === "simple"
      ? "Why a powerful mind has to show its work."
      : "A structural account of why hidden state in scaling cognitive systems becomes a civilizational risk.";

  return (
    <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
      <div className="mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          The Coherence Ratchet
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Research testbed
          </span>
          <a
            href="https://doi.org/10.5281/zenodo.18217688"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://zenodo.org/badge/DOI/10.5281/zenodo.18217688.svg"
              alt="DOI"
              className="h-5"
            />
          </a>
        </div>
      </div>

      <LevelToggle level={level} onChange={setLevel} />

      {level === "simple" ? <SimpleContent /> : <AdvancedContent />}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/coherence-collapse-analysis"
          className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
        >
          The math behind it
        </a>
        <a
          href="/explore-a-trace"
          className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
        >
          Explore a trace
        </a>
        <a
          href="https://github.com/CIRISAI/CIRISAgent"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          See the code
        </a>
      </div>
    </div>
  );
}

export default function CoherenceRatchetPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
              <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          }
        >
          <PageBody />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
