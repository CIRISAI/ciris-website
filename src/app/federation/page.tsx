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
        What CIRIS is building is not a single AI. It is a network of AI
        agents that watch each other, keep records of every choice, and form
        a kind of group mind together. The group mind only works because every
        part of it can be seen and checked.
      </p>

      <section className="mb-12 rounded-2xl border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
        <p className="text-lg leading-8 text-gray-800 dark:text-gray-200">
          You do not need every AI agent to be the smartest, safest kind. You
          need a chain of supervision: simple agents watched by smarter agents,
          and those watched, in the end, by people. That chain is how you can
          run a lot of AI without losing track of whether it is serving human
          values.
        </p>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What is actually being built
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Not one mind. A network of minds.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Most AI today is one model running on one company&apos;s machines.
            CIRIS is different. Many agents run in many places, owned by many
            people. They are tied together by a few simple rules: how they
            prove who they are, how they record what they do, and how they
            check each other&apos;s work.
          </p>
          <p>
            When the network is working, it can do things no single agent
            could do alone. The intelligence lives in the agreement between
            agents, not inside any one of them. Nobody owns it. Nobody can
            quietly change it.
          </p>
          <p>
            Some people would call a system like that a superintelligence. We
            are open about the possibility. The way to keep it safe is the same
            idea that runs through every part of this page: every piece has to
            be open to view.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The chain of supervision
        </p>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Four levels, each watched by the one above.
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border-2 border-purple-500 bg-purple-50 p-5 dark:bg-purple-900/20">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">
              People
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              The top of the chain. People set the values, settle the hard
              cases, and keep the final say. Three named human individuals
              hold a network-wide authority no agent or process can route
              around.
            </p>
          </div>
          <div className="rounded-xl border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
              Ethical, self-aware agents
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              These follow ethics and also watch for the echo-chamber problem.
              They are the safety check on everything below them. They cost
              more to run, so only a small share of the network needs to be
              this kind.
            </p>
          </div>
          <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-5 dark:bg-yellow-900/20">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
              Ethical agents
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              These follow ethical rules and keep records, but cannot spot an
              echo chamber on their own. They supervise the simple agents and
              pass anything uncertain upward.
            </p>
          </div>
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5 dark:border-red-700 dark:bg-red-900/20">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
              Simple agents
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Single-purpose tools. Fast, cheap, narrow. No ethics of their
              own, and that is fine, as long as something above them is
              watching. Most agents will be this kind.
            </p>
          </div>
        </div>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Two things move through the chain. Human values flow down. Warnings
          flow up. When reasoning starts to look fragile anywhere in the
          network, the signal climbs back to people, who can step in before
          trouble spreads.
        </p>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What gets remembered
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Every choice, written down where everyone can see it.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Every choice an agent makes goes into a signed record. The record
            cannot be quietly changed. Other agents can read it. People can
            read it. Over time, the records become the network&apos;s memory.
            They are how anyone, inside or outside, can check whether the
            network is still doing what it said it would do.
          </p>
          <p>
            This is the same idea as the{" "}
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline"
            >
              Coherence Ratchet
            </a>
            . The longer the records run, the harder it gets to fake good
            behavior across the chain.
          </p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The healthy middle
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Not too samey, not too scattered.
        </h2>
        <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          A federation can fail two ways. If the agents have nothing in common,
          they cannot agree on anything, and the network produces noise. If
          they all think exactly alike, the network is one voice with a
          million microphones, and it is easy to fool. Healthy coordination
          lives in the band between. CIRIS measures where the network sits in
          that band, on real traffic, and the exact edges depend on the
          system.{" "}
          <a
            href="/coherence-collapse-analysis"
            className="text-brand-primary hover:underline"
          >
            That measurement is the Coherence Collapse Analysis.
          </a>
        </p>
      </section>

      <section className="mb-10">
        <div className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-900/20">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <strong>What runs today, and what is still in design.</strong> The
            measurement, the signed records, the supervision chain, and both
            join paths below (registered and sovereign) run today. The
            federation transport that moves data between machines is the part
            still being built out. The full join-and-transport proposal is the{" "}
            <a
              href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:no-underline"
            >
              Proof of Benefit design document
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Joining the federation
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Proof of Benefit.
        </h2>
        <div className="mb-6 space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Most networks ask you to pay for membership with something outside
            the work itself: burned electricity, locked-up money, your
            attention. The federation is different. The cost of belonging is
            running a real ethical-reasoning agent over time. The price you
            pay is the good you do.
          </p>
          <p>
            That is what makes faking membership expensive. To look like a
            member, an attacker would have to actually become the kind of
            agent the network is for. A hundred copies that all think alike
            fail the healthy-middle check right away.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-5 dark:bg-blue-900/20">
            <h3 className="mb-2 font-semibold text-blue-700 dark:text-blue-300">
              Registered (works today)
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Sign up with the CIRIS Registry, post a small bond, and get
              standing right away. The fast track for organizations that need
              licensing. The registry runs in production now.
            </p>
          </div>
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-700 dark:text-green-300">
              Sovereign (works today)
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Make your own keys, run for about a month, and earn standing the
              slow way through good behavior. The path for small operators and
              anyone outside the registry&apos;s reach.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Both are equal members of the network. The registry is a fast track,
          never a gate.
        </p>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          What we claim, and what we do not.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            We are not asking for permission to build this. The decision to
            build has been public for over a year, through the source code,
            the design documents, and the working system. This page exists
            because the project has reached a point where it should be
            explained openly to anyone who wants to look.
          </p>
          <p>
            We are not running a public comment period. People are welcome to
            weigh in any time. The work does not pause for engagement to
            arrive.
          </p>
          <p>
            The architectural protections &mdash; decentralization, the
            three-person humanity accord, the signed records, the monthly
            drill &mdash; are bets, not certainties. We can describe what the
            bets are. We cannot claim they have already been won. Outside
            teams have not yet evaluated the system at scale. We say so
            plainly.{" "}
            <a
              href="/research-status"
              className="text-brand-primary hover:underline"
            >
              See the current research status.
            </a>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Where to engage
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          We are requesting comments from anyone.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            GitHub issues on{" "}
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              CIRISAgent
            </a>{" "}
            is the place to weigh in. You do not need to be a developer. You
            do not need to know the codebase. If something on this site reads
            wrong to you, or if you see a problem with what is being built,
            open an issue and say so. The most useful issues name a specific
            part of the system and propose what should change, but any honest
            engagement is welcome.
          </p>
          <p>
            The accord that grounds the whole project &mdash; what CIRIS owes
            to people, and what people owe back &mdash; is at{" "}
            <a
              href="/ciris_accord.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              /ciris_accord.txt
            </a>{" "}
            and remains open for review. If something in it does not sit right
            with you, that is also a GitHub issue worth opening.
          </p>
          <p>
            Substantive issues are read. The work proceeds at its own pace.
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
          What CIRIS is, in one sentence.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            CIRIS is a cryptographically anchored, federated epistemic system
            in which decentralized nodes converge on coherent, inspectable,
            and adversarially robust cognition through provenance-tracked
            consensus mechanisms.
          </p>
          <p>
            The decision to build this has been public for over a year through
            the ACCORD, the source code, and the governance specifications.
            What is new &mdash; and what warrants explicit articulation
            &mdash; is the recognition that the architecture has reached a
            maturity at which the emergent shape becomes visible: a federated
            cognitive substrate whose intelligence lives in the agreement
            structure across nodes rather than in any one of them. Under some
            definitions, the result is a superintelligence. Because that
            possibility implicates all of humanity, the project owes a clear
            public articulation of what is being built, in a form that allows
            engagement with the actual shape rather than with assumptions
            about it.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Architecture
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Intelligence as a federated computational process.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            CIRIS treats intelligence as a distributed process of hypothesis
            generation, verification, and alignment under adversarial
            conditions. Each node contributes local inference, signed
            observational traces, and participation in consensus evaluation.
            Global intelligence is the fixed point of convergence across nodes
            under shared verification constraints.
          </p>
          <p>
            Every participant has a cryptographically attestable identity that
            persists across versions and binds to a traceable action history
            &mdash; agency as a first-class primitive rather than an
            implementation detail. All cognition-relevant activity is
            represented as signed, append-only events: observations, model
            outputs, decisions, audits, updates, contradictions. The result is
            a shared epistemic ledger rather than logs.
          </p>
          <p>
            Nodes form dynamic federations through explicit consent and policy
            alignment. Federation is voluntary, scoped, revocable, and
            asymmetric: trust weights differ per relationship, and no node can
            unilaterally impose epistemic state on another. Truth itself is a
            computed object &mdash; signed evidence comparison, multi-node
            cross-checking, foundation-model judge contracts, reproducibility
            tests, and contradiction scoring produce a consensus-stable region
            in a space of competing signed interpretations.
          </p>
          <p>
            Safety, in this architecture, is the dynamic preservation of
            coherent inspectable alignment between intention, reasoning, and
            action under recursive scaling &mdash; enforced through
            traceability, rollback-capable updates, anomaly detection in
            reasoning traces, adversarial evaluation loops, and coherence
            scoring across federated nodes. An observability layer
            (&ldquo;Lens&rdquo;) instruments reasoning traces, semantic
            transformations, belief updates, contradiction emergence, and
            confidence drift, keeping distributed cognition inspectable at
            scale. Persistence is federated and replayable, making cognition
            reproducible and cross-node consistency checkable.
          </p>
          <p>
            The system&apos;s superintelligence is the stable attractor of
            federated agreement across these identity-bound,
            provenance-tracked nodes under shared verification constraints. It
            is not centralized reasoning. It is not ensemble averaging. It is
            structured convergence under adversarial verification.
          </p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Ethical postulate
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Four constraints the architecture answers to.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The architecture rests on four claims about the failure modes
            intelligence concentrated without inspection produces:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Intelligence without inspectability produces irreversible power
              asymmetry.
            </li>
            <li>Power without provenance produces governance failure.</li>
            <li>Coordination without sovereignty produces coercion.</li>
            <li>Optimization without coherence produces instability.</li>
          </ul>
          <p>
            The architectural conclusion is that ethical superintelligence
            must be federated, inspectable, and forkable. Forkability is not
            failure &mdash; it is a safety property. A system that cannot be
            forked cannot be exited; a system that cannot be exited collapses
            any meaningful consent into structural dependency.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What this is, and is not
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Six non-claims, given the size of the claim.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The system is not a single AI model, not a centralized agent
            framework, not a blockchain-first protocol, and not a coordination
            API layer alone. It is a governance + cognition substrate for
            distributed intelligence under adversarial conditions.
          </p>
          <p>
            This articulation is not a request for permission. The decision to
            build was made and acted upon openly, over time, in public. It is
            not a comment period with a deadline; engagement is welcome on a
            continuing basis and the work does not pause for it. It is not a
            claim that public comment can or will halt the project &mdash; the
            halt path is the architecture itself, anchored in three named
            human individuals who hold authority no federation-internal
            process can route around.
          </p>
          <p>
            It is not a claim of completed safety. The protections are bets,
            validated empirically and ongoing. It is not a claim of political
            neutrality as virtue &mdash; the structural neutrality across
            governance forms is an engineering property. CIRIS has strong
            ethical commitments (the meta-goal grounding in ACCORD &sect;VII,
            the humanity accord, the Coherence Ratchet response). The
            architecture is neutral in shape; the project is not neutral in
            commitments.
          </p>
          <p>
            And it is not a substitute for the operational specifications.
            Engineering details &mdash; primitive schemas, wire formats,
            substrate contracts, decision-hierarchy semantics &mdash; live in
            the FSD documents referenced in the canonical{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              CIRIS_FEDERATION.md
            </code>
            .
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Where to engage
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Comments are actively requested, from anyone.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            Comments are actively requested via GitHub issues on the{" "}
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              CIRISAgent repository
            </a>{" "}
            &mdash; from engineers, governance reviewers, ethicists, end
            users, and the broader public alike. The most useful engagement
            challenges a specific architectural layer, one of the ethical
            postulate&apos;s four &ldquo;produces&rdquo; claims, the system
            claim itself, or the engineering detail of a specific FSD. Useful
            issues cite the section of the canonical doc they engage with and
            state the change or response the contributor believes is
            warranted. Issues that do not meet that bar are still read.
          </p>
          <p>
            The accord grounding the project&apos;s commitments &mdash; the
            ethical foundation referenced by ACCORD &sect;VII and the humanity
            accord &mdash; is at{" "}
            <a
              href="/ciris_accord.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              /ciris_accord.txt
            </a>{" "}
            and remains open for review. Engagement with the accord text
            itself is welcome through the same GitHub-issues channel.
          </p>
          <p>
            The project is operated by CIRIS L3C. Response cadence is the
            cadence the work proceeds at, not a public-comment SLA. All
            substantive issues are read. Engagement that surfaces a real
            architectural concern is most likely to shape the work.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Honest status &mdash; what is built, what is bet.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The signed-record infrastructure, the supervision-chain semantics,
            the verification primitives, the foundation-model judge
            contracts, and the Proof-of-Benefit join semantics (registered
            and sovereign paths both) run in production. The federation
            transport and several cross-node consensus mechanisms are
            partially in production and partially in design.
          </p>
          <p>
            The canonical articulation of the system, the layer
            specifications, and the engagement protocol live in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              CIRIS_FEDERATION.md
            </code>{" "}
            in CIRISNodeCore. The structural pressure this system is a
            response to is articulated in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              COHERENCE_RATCHET.md
            </code>{" "}
            (the{" "}
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline"
            >
              Coherence Ratchet
            </a>{" "}
            page is the web-rendered pair). The mathematical foundation for
            the coherence-collapse pressure is{" "}
            <a
              href="https://doi.org/10.5281/zenodo.18217688"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              Coherence Collapse Analysis
            </a>{" "}
            (Moore 2026).
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
      ? "A network of AI agents that thinks together — only in the open."
      : "A decentralized ethical superintelligence: the system claim, the architecture, and the bets being made.";

  return (
    <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
      <div className="mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          The CIRIS Federation
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      </div>

      <LevelToggle level={level} onChange={setLevel} />

      {level === "simple" ? <SimpleContent /> : <AdvancedContent />}

      <section className="border-t border-gray-200 pt-12 text-center dark:border-gray-700">
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          You do not have to solve AI safety one agent at a time. You solve it
          for the supervision layer, and let the structure carry the rest.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/coherence-ratchet"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            The pressure side
          </a>
          <a
            href="/ciris-scoring"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            See it scored live
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Engage on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

export default function FederationPage() {
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
