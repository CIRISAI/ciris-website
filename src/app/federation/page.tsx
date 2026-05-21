"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function FederationPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The Federation Model
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              It is fine to build simple agents. They just need the right
              supervision.
            </p>
          </div>

          {/* Core idea */}
          <section className="mb-12 rounded-2xl border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
            <p className="text-lg leading-8 text-gray-800 dark:text-gray-200">
              You do not need every AI agent to be the smartest, safest kind.
              You need a chain of supervision: simple agents watched by smarter
              agents, and those watched, in the end, by people. That chain is
              how you can run a lot of AI without losing track of whether it is
              serving human values.
            </p>
          </section>

          {/* The four tiers */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The chain of supervision
            </p>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Four levels, each watched by the one above.
            </h2>
            <div className="space-y-3">
              <div className="rounded-xl border-2 border-purple-500 bg-purple-50 p-5 dark:bg-purple-900/20">
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">People</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  The top of the chain. People set the values, settle the hard
                  cases, and keep the final say.
                </p>
              </div>
              <div className="rounded-xl border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
                <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
                  Ethical, self-aware agents
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  These follow ethics and also watch for the echo-chamber
                  problem. They are the safety check on everything below them.
                  They cost more to run, so you only need a small share of them.
                </p>
              </div>
              <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-5 dark:bg-yellow-900/20">
                <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                  Ethical agents
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  These follow ethical rules and keep records, but cannot spot
                  an echo chamber on their own. They supervise the simple agents
                  and pass anything uncertain upward.
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
          </section>

          {/* Why it works */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Why it works
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Scale, without losing the thread.
            </h2>
            <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                You can run millions of simple agents for narrow jobs. They do
                not each have to be wise. They have to be supervised by agents
                that are. The expensive, self-aware kind only needs to be a
                small slice of the whole, maybe one in ten. The rest can be
                cheap.
              </p>
              <p>
                Two things move through the chain. Human values flow down: from
                people, to the self-aware agents, to the rule-followers, to the
                simple tools. Warnings flow up: when reasoning starts to look
                fragile anywhere in the network, that signal climbs back to
                people, who can step in before trouble spreads. The loop closes.
                That is the difference between hoping AI does not drift and
                actually watching whether it does.
              </p>
            </div>
          </section>

          {/* The corridor */}
          <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The healthy middle
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Not too samey, not too scattered.
            </h2>
            <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
              A federation can fail two ways. If the agents have nothing in
              common, they cannot agree on anything, and the network produces
              noise. If they all think exactly alike, the network is one voice
              with a million microphones, and it is easy to fool. Healthy
              coordination lives in the band between. CIRIS measures where the
              network sits in that band, on real traffic, and the exact edges
              depend on the system.{" "}
              <a href="/coherence-collapse-analysis" className="text-brand-primary hover:underline">
                That measurement is the Coherence Collapse Analysis.
              </a>
            </p>
          </section>

          {/* 3.X note */}
          <section className="mb-10">
            <div className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-900/20">
              <p className="text-sm text-amber-900 dark:text-amber-200">
                <strong>A plan, not a finished thing.</strong> The measurement
                runs today. The parts below, how agents join the federation and
                how it travels between machines, are a proposed design. The full
                proposal is the{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:no-underline"
                >
                  Proof of Benefit design document
                </a>
                . Read the rest as a plan to react to.
              </p>
            </div>
          </section>

          {/* Proof of Benefit */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Joining the federation
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Proof of Benefit.
            </h2>
            <div className="mb-6 space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                Most networks ask you to pay for membership with something
                outside the work itself: burned electricity, locked-up money,
                your attention. The federation is different. The cost of
                belonging is running a real ethical-reasoning agent over time.
                The price you pay is the good you do.
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
                  standing right away. The fast track for organizations that
                  need licensing. The registry runs in production now.
                </p>
              </div>
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold text-green-700 dark:text-green-300">
                  Sovereign (planned)
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Make your own keys, run for about a month, and earn standing
                  the slow way through good behavior. The path for small
                  operators and anyone outside the registry&apos;s reach.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Both are equal members of the network. The registry is a fast
              track, never a gate.
            </p>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-200 pt-12 text-center dark:border-gray-700">
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
              You do not have to solve AI safety one agent at a time. You solve
              it for the supervision layer, and let the structure carry the rest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/coherence-ratchet"
                className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
              >
                How the checking works
              </a>
              <a
                href="/ciris-scoring"
                className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                See it scored live
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Read the design doc
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
