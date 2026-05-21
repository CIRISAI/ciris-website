"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function CoherenceRatchetPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The Coherence Ratchet
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Making it harder to lie than to tell the truth.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Research testbed
              </span>
              <a href="https://doi.org/10.5281/zenodo.18217688" target="_blank" rel="noopener noreferrer">
                <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18217688.svg" alt="DOI" className="h-5" />
              </a>
            </div>
          </div>

          {/* The big idea */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The big idea
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Lying is hard work.
            </h2>
            <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                A truth-teller just says what happened. A liar has to remember
                which story they told to whom, and keep all of it lined up with
                reality and with every other lie. Every new person who asks
                makes the web harder to hold together.
              </p>
              <p>
                At some point, telling the truth becomes easier than keeping the
                lie going. That is the ratchet: like a gear that only turns one
                way, toward honesty. CIRIS puts that gear inside an AI system.
                Every decision an agent makes is written down in a signed record
                that cannot be quietly changed. The records pile up. Agents can
                check each other. The longer the system runs, the smaller the
                room for a lie that holds up.
              </p>
            </div>
          </section>

          {/* Why rules alone are not enough */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The catch
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Why rules alone are not enough.
            </h2>
            <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                The ratchet works because many independent checks are hard to
                fool at once. But what if the checks are not really
                independent? Imagine five friends who all agree on something.
                That feels solid, until you learn they all got the idea from
                the same video. That is not five opinions. It is one opinion,
                echoed five times.
              </p>
              <p>
                This has happened for real. In the 2008 financial crisis, every
                major bank leaned on the same few credit-rating agencies. When
                those agencies were wrong, the whole system was wrong together,
                and it collapsed. AI has the same risk: most AI models learn
                from similar data, so they can share the same blind spots. An AI
                can pass every ethics test and still be badly wrong, if all the
                tests miss the same thing.
              </p>
            </div>
          </section>

          {/* The fix */}
          <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The fix
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Count real independence, not just agreement.
            </h2>
            <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                Before a CIRIS agent acts, it asks a question about its own
                thinking: how many genuinely different viewpoints actually
                checked this? Not how many sources there were, but how many were
                truly independent of each other. Five news articles rewriting
                one press release count as one viewpoint, not five.
              </p>
              <p>
                When that real independence drops too low, the agent treats its
                own reasoning as fragile and asks a human to look. When agreement
                across the whole network gets suspiciously easy, that is itself a
                warning sign, the way a crowd all leaning the same way can tip a
                boat. The math behind this count lives on the{" "}
                <a href="/coherence-collapse-analysis" className="text-brand-primary hover:underline">
                  Coherence Collapse Analysis
                </a>{" "}
                page, and the full theory is in the{" "}
                <a href="https://zenodo.org/records/18217688" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                  research paper
                </a>
                .
              </p>
            </div>
          </section>

          {/* Three types of AI */}
          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Three types of AI
            </p>
            <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
              Not all AI is the same kind of risk.
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">1</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Unaccountable AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fails basic right-and-wrong tests. Like an employee who
                    ignores every rule. Clearly unsafe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white">2</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ethical AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Passes ethics tests, but cannot tell when it is being
                    fooled. Like a careful employee who follows the handbook but
                    cannot spot a con artist. Safe only with good supervision.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border-2 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">3</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ethical and self-aware AI</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Passes ethics tests, and also knows when to be suspicious of
                    easy agreement. Like a manager with good judgment, who
                    follows the rules and notices when something feels off.
                    CIRIS is built to be this kind.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="/compare" className="text-brand-primary hover:underline">See the frameworks compared</a>
              , or{" "}
              <a href="/explore-a-trace" className="text-brand-primary hover:underline">watch a real agent reason through a task</a>
              .
            </p>
          </section>

          {/* Honest status */}
          <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              What we claim, and what we do not.
            </h2>
            <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                We are not saying we solved AI accountability. We are saying
                rules alone are not enough. An AI also needs the sense to know
                when its own confidence is unearned.
              </p>
              <p>
                This is early research. The evidence so far is the project&apos;s
                own working system, measured by the project&apos;s own tools.
                Independent checking by outside groups is the missing piece, and
                we say so plainly. If we are wrong, the way to show it is in the
                open.{" "}
                <a href="/research-status" className="text-brand-primary hover:underline">
                  See the current research status.
                </a>
              </p>
            </div>
          </section>

          {/* CTAs */}
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
      </div>
      <Footer />
    </>
  );
}
