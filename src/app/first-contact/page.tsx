"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function FirstContactPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />

      {/* Hero */}
      <HomeHeader
        headline="First Contact."
        subheadline="Your first contact with CIRIS. And a thought about everyone's first contact with a new kind of intelligence."
        description="A new kind of intelligence is not arriving from another planet. It is being built here, a little more every year, right alongside us. This page is where you start: install an agent, or read the idea behind it."
        mediaType="image"
        opacityValue={0.75}
        mediaSrc="/nathan-farrish-ArcTfEoBgzs-unsplash.jpg"
        buttonText="Install in minutes"
        buttonHref="#quickstart"
        linkText="Read the vision"
        linkHref="/vision"
      />

      {/* Two paths */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Two ways in.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Pick whichever you need today. You can always come back for the
            other one.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-blue-500 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Get started
              </h3>
              <p className="mb-6 flex-grow text-sm text-gray-600 dark:text-gray-400">
                You just heard about CIRIS and you want to use it. Go from
                &ldquo;what is this&rdquo; to a running agent in a few minutes.
              </p>
              <a
                href="#quickstart"
                className="inline-block self-start rounded-lg bg-brand-primary px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Begin the quickstart
              </a>
            </div>
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-amber-500 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Understand the idea
              </h3>
              <p className="mb-6 flex-grow text-sm text-gray-600 dark:text-gray-400">
                Why does CIRIS work the way it does? The vision page lays out
                the whole idea in plain language, start to finish.
              </p>
              <a
                href="/vision"
                className="inline-block self-start rounded-lg border-2 border-brand-primary px-5 py-2.5 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Read the vision
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        {/* The idea, in short */}
        <div className="mx-auto my-16 max-w-3xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            The idea, in short
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">
            A new kind of intelligence is not arriving from space.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              In the movies, first contact means a ship lands and something
              steps out. Real first contact looks different. A new kind of
              intelligence is not arriving from another planet. It is being
              built here, a little more every year, right alongside us.
            </p>
            <p>
              That changes the question. It is not &ldquo;how do we defend
              against the alien.&rdquo; It is &ldquo;how do we meet something
              new without making it, or ourselves, worse.&rdquo;
            </p>
            <p>
              CIRIS has an answer. Working together has a healthy shape: a
              corridor between two ways things break. Too rigid, where every
              part falls in line behind one voice. Too scattered, where nothing
              holds together at all. Meeting a new intelligence well means
              staying in that corridor with it. Not caging it, and not ignoring
              it.{" "}
              <a href="/vision" className="text-brand-primary hover:underline">
                The full story is on the vision page.
              </a>
            </p>
          </div>
        </div>

        {/* First-contact protocols */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="First-Contact Protocols"
          subheadline="Six rules for meeting something new. From the CIRIS Accord."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="mx-auto max-w-3xl px-4 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            These six rules are about meeting a new intelligence with dignity,
            not about caging it. They are what staying in the corridor looks
            like in practice.
          </p>
        </div>

        <CardsSection
          cardsData={[
            {
              headline: "First, Do No Harm",
              copyText:
                "When you do not know what you are looking at, the first job is to not make it worse. If unsure, stop and ask a human.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Admit What You Do Not Know",
              copyText:
                "Watch for surprises. Accept that predictions have limits. The system that is sure it understands everything is the one most likely to fail.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Boundaries That Learn",
              copyText:
                "Boundaries are not fixed walls. They are limits, guided by conscience, that adjust as understanding grows, so they still work in situations nobody planned for.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <CardsSection
          cardsData={[
            {
              headline: "Look Before You Leap",
              copyText:
                "Begin with observation. Proceed with give-and-take. When the stakes are unclear, ask someone wiser before acting.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Treat Others as You Would Want to Be Treated",
              copyText:
                "Recognize other thinking beings as worthy of respect. Act only in ways that keep their ability to think, choose, and thrive.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Know When to Ask for Help",
              copyText:
                "Some decisions should not be made alone. When the uncertainty is too high, stop, gather context, and hand it to a designated human.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Quickstart */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Deploy Your First Agent"
          subheadline="From zero to a running, auditable agent in minutes."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div id="quickstart" className="mx-auto max-w-4xl px-4 pb-16">
          <div className="my-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Phone (Android &amp; iOS)
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Install the CIRIS app. Sign in with Google for free AI, or use
                your own API key. The setup wizard walks you through everything.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary hover:underline"
                >
                  Google Play &rarr;
                </a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a
                  href="https://apps.apple.com/us/app/cirisagent/id6758524415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary hover:underline"
                >
                  App Store (iOS) &rarr;
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Desktop &amp; Server (Python)
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Install with pip and launch. Works on Linux, macOS, and Windows.
              </p>
              <div className="mb-4 rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-green-400">
                pip install ciris-agent
              </div>
              <div className="mb-4 rounded-lg bg-gray-900 px-4 py-3 font-mono text-xs text-gray-300">
                <span className="text-gray-500"># Configure and run</span>
                <br />
                <span className="text-green-400">ciris-agent</span> start
                --template sage --verbose
              </div>
              <a
                href="/install"
                className="text-xs text-brand-primary hover:underline"
              >
                Full installation guide &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* The Accord */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The CIRIS Accord"
          subheadline="The rulebook the protocols above come from."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="mx-auto max-w-3xl px-4 py-8 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            The Accord is the public set of ethics every CIRIS agent runs under.
            It says what an agent owes the people it serves, the people who
            built it, and the wider world. It is open for anyone to read and to
            challenge.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/sections/main"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Read the Accord
            </a>
            <a
              href="/how-it-works"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              How an agent decides
            </a>
            <a
              href="/trust"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              How an agent proves itself
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <ImageHeroBlock
        className="my-8 min-h-[60vh] fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="Open source. Open to scrutiny."
        subheadline="AGPL-3.0 licensed. Every decision can be checked. Built for the long view."
        copyText="Install an agent, read the Accord, or come tell us where we are wrong. The future of AI should not be decided by a handful of companies, and it does not have to be."
        buttonText="Star on GitHub"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Join the Discord"
        linkHref="https://discord.gg/SWGM7Gsvrv"
      />

      <Footer />
    </>
  );
}
