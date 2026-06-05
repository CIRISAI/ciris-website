export default function SimpleContent() {
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
          Honest status.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            The architectural protections, decentralization, the
            three-person humanity accord, the signed records, the monthly
            drill, are bets, not certainties. We can describe what the
            bets are. We cannot claim they have already been won. Outside
            teams have not yet evaluated the system at scale.{" "}
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
            The accord that grounds the whole project, what CIRIS owes
            to people, and what people owe back, is at{" "}
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
