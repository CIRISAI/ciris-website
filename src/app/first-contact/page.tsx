"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import CButton from "@/app/components/Buttons";
import navItems from "@/app/components/navitems";

export default function FirstContactPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />

      {/* Hero */}
      <HomeHeader
        headline="First Contact."
        subheadline="Two meanings. One framework."
        description="Whether you're deploying your first CIRIS agent or exploring why cooperation might be the cheapest survival strategy there is — start here."
        mediaType="image"
        opacityValue={0.75}
        mediaSrc="/nathan-farrish-ArcTfEoBgzs-unsplash.jpg"
        buttonText="Deploy Your First Agent"
        buttonHref="#quickstart"
        linkText="Read the Protocols"
        linkHref="#protocol"
      />

      {/* Thesis Banner */}
      <div className="bg-gradient-to-r from-amber-700/90 to-orange-700/90 py-6">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg font-bold text-white mb-2">
            Maintaining a coherent lie across multiple independent checks is
            harder than telling the truth. We think this has implications beyond
            computer science.
          </p>
          <p className="text-sm text-white/90">
            Different viewpoints, genuine independence, and people who cooperate
            over time &mdash; these make lying harder, but they also make
            communities stronger. CIRIS is built on that observation.
          </p>
        </div>
      </div>

      {/* Dual Paths */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Two Meanings, One Framework
          </h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            Every first contact requires trust.
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            CIRIS handles both: getting your first ethical AI agent running, and
            understanding the idea behind the framework.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-full rounded-xl border border-gray-200 dark:border-gray-700 border-t-4 border-t-blue-500 bg-white dark:bg-gray-800 p-8">
              <span className="text-3xl mb-4 block">{"\u2318"}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Your First Contact with CIRIS
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                You just heard about CIRIS. You want to go from &ldquo;what is
                this?&rdquo; to a running agent in minutes. Start with the
                quickstart below.
              </p>
              <CButton
                href="#quickstart"
                text="Begin the Quickstart"
                variant="primary"
              />
            </div>
            <div className="h-full rounded-xl border border-gray-200 dark:border-gray-700 border-t-4 border-t-amber-500 bg-white dark:bg-gray-800 p-8">
              <span className="text-3xl mb-4 block">{"\u25CE"}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                The Coherence Thesis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Why does the framework work? Lying is expensive and truth is
                cheap &mdash; and that pattern shows up everywhere, from
                ecosystems to economies to AI systems. We think that&apos;s
                worth paying attention to.
              </p>
              <CButton
                href="#thesis"
                text="Read the Thesis"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        {/* The Coherence Thesis */}
        <div id="thesis" className="my-16 mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4">
            The Core Idea
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lying Is Expensive. Truth Is Cheap.
          </h2>
          <p className="text-lg italic text-gray-500 dark:text-gray-400 mb-6">
            &ldquo;Oh, what a tangled web we weave, when first we practise to
            deceive.&rdquo;
            <span className="text-sm not-italic"> &mdash; Sir Walter Scott</span>
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
            Everyone already knows this. A truth-teller just describes what
            happened. A liar has to remember which story they told to which
            person &mdash; and keep it all consistent with reality and every
            other lie. Each new person who asks makes the web harder to
            maintain.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Now imagine five witnesses to a car accident. If they all watched
            the same dashcam, you have one perspective repeated five times. But
            if each stood at a different corner &mdash; fooling all five
            becomes genuinely hard. That&apos;s the difference between echo and
            independence.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            This is the idea behind the{" "}
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline font-medium"
            >
              Coherence Ratchet
            </a>
            . CIRIS counts how many genuinely independent perspectives checked
            a decision and adjusts for how similar those perspectives are to
            each other. When real independence drops too low, the system flags
            the reasoning as fragile and asks a human to look at it.
          </p>

          {/* Three pillars - DMV-style like the trust page */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm">1</span>
                <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400">Count the Sources</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                How many independent viewpoints actually checked this decision?
                Not how many sources exist &mdash; how many are genuinely
                different from each other.
              </p>
            </div>
            <div className="rounded-xl border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm">2</span>
                <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400">Check for Echoes</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Are these sources actually independent, or are they copying from
                the same place? Five news articles rewriting one press release
                is one opinion, not five.
              </p>
            </div>
            <div className="rounded-xl border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm">3</span>
                <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400">Escalate or Proceed</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If enough truly independent perspectives agree, proceed with
                confidence. If not, the system pauses and asks a human. No
                agent makes high-stakes decisions on thin evidence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="/explore-a-trace"
              className="text-brand-primary hover:underline font-medium"
            >
              See a live agent trace &rarr;
            </a>
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline"
            >
              Read the full thesis &rarr;
            </a>
            <a
              href="/how-it-works"
              className="text-brand-primary hover:underline"
            >
              How it works under the hood &rarr;
            </a>
          </div>
        </div>

        {/* The Broader Observation */}
        <div className="my-16 mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4">
            The Broader Observation
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            This Pattern Shows Up Everywhere
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            The things that make lying expensive &mdash; different viewpoints,
            genuine independence, and people who cooperate over time &mdash;
            turn out to be the same things that make communities and economies
            stronger.
          </p>

          {/* Observable evidence */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
                &ldquo;Don&apos;t put all your eggs in one basket.&rdquo;
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Nature
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A field of identical crops gets wiped out by one disease. A
                mixed forest survives it. Variety is the defense.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Markets
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Traders who cheat get cut out of networks. Communities that
                cooperate build wealth over generations.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Society
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Echo chambers make groups fragile. Groups where people genuinely
                disagree and work through it make better decisions.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In AI
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI models collapse when trained on their own output. The same
                pattern that makes echo chambers dangerous in society makes
                them dangerous in technology.
              </p>
            </div>
          </div>

          {/* The key insight */}
          <div className="mt-8 rounded-xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              What we think this means
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We didn&apos;t discover anything new. People have always known
              that cheaters lose in the long run. We just noticed the same
              pattern holds in AI systems, and we built a framework around it.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For the formal treatment, see the{" "}
              <a
                href="/coherence-ratchet"
                className="text-brand-primary hover:underline"
              >
                Coherence Ratchet thesis
              </a>
              .
            </p>
          </div>
        </div>

        {/* Progressive Trust Verification */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Progressive Trust Verification"
          subheadline="Five levels. Each builds on the last."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="mx-auto max-w-3xl px-4 md:px-12 pb-16">
          {[
            {
              num: "01",
              name: "Can it run?",
              desc: "The agent checks that its own verification system is working and hasn\u2019t been tampered with. Basic sanity check before anything else.",
            },
            {
              num: "02",
              name: "Where is it running?",
              desc: "Is this a real deployment or a fake environment? The agent checks that it\u2019s running somewhere legitimate.",
            },
            {
              num: "03",
              name: "Do multiple sources agree?",
              desc: "The agent checks its identity against several independent registries in different locations. If they disagree, something is wrong.",
            },
            {
              num: "04",
              name: "Has anything been changed?",
              desc: "Every file in the agent is checked against a known-good list. If even one file has been modified, the agent shuts down.",
            },
            {
              num: "05",
              name: "Can it prove its entire history?",
              desc: "A complete, tamper-proof record of everything the agent has done since it was first registered. Every action is signed and chained to the one before it.",
            },
          ].map((level) => (
            <div
              key={level.num}
              className="grid grid-cols-[60px_1fr] gap-4 py-6 border-b border-gray-200 dark:border-gray-700"
            >
              <span className="text-3xl font-extrabold text-teal-500">
                {level.num}
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {level.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {level.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each level depends on the one before it. If Level 3 fails, Levels
              4 and 5 can&apos;t be trusted either. Trust is earned step by
              step.{" "}
              <a href="/trust" className="text-brand-primary hover:underline">
                Learn more about trust verification &rarr;
              </a>
            </p>
          </div>
        </div>

        {/* First-Contact Protocols */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="First-Contact Protocols"
          subheadline="CIRIS Accord, Section V Chapter 4"
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div id="protocol">
          <CardsSection
            cardsData={[
              {
                headline: "First, Do No Harm",
                copyText:
                  "When you don't know what you're looking at, the first obligation is to not make it worse. If unsure, stop and ask a human.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Admit What You Don't Know",
                copyText:
                  "Watch for surprises. Accept that predictions have limits. The system that insists it understands everything is the system most likely to fail.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Boundaries That Learn",
                copyText:
                  "Not rigid walls, but responsive guardrails that adjust as understanding grows. Safety rules that can adapt to situations nobody planned for.",
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
                headline: "Treat Others as You'd Want to Be Treated",
                copyText:
                  "Recognize other thinking beings as worthy of respect. Act only in ways that preserve their ability to think, choose, and thrive.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Know When to Ask for Help",
                copyText:
                  "Some decisions shouldn't be made alone. When uncertainty is too high, stop, gather context, and hand it to a designated human authority.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
            ]}
          />
        </div>

        {/* Quickstart */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Deploy Your First Agent"
          subheadline="From zero to a running ethical agent in minutes."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div id="quickstart" className="mx-auto max-w-4xl px-4 pb-16">
          {/* Setup Paths */}
          <div className="my-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Mobile (Android &amp; iOS)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Install the CIRIS app. Sign in with Google for free AI, or
                bring your own API key. The setup wizard walks you through
                everything.
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
                  href="https://testflight.apple.com/join/zfCj9waH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primary hover:underline"
                >
                  TestFlight (iOS) &rarr;
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Desktop &amp; Server (Python)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Install via pip and launch. Works on Linux, macOS, and Windows.
              </p>
              <div className="rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-green-400 mb-4">
                pip install ciris-agent
              </div>
              <div className="rounded-lg bg-gray-900 px-4 py-3 font-mono text-xs text-gray-300 mb-4">
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

        {/* The CIRIS Accord */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The CIRIS Accord"
          subheadline="The rulebook. Nine sections covering everything from principles to protocols."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Why we built this",
              copyText:
                "The motivation. Why AI needs ethical guardrails, and why we think cooperation is the right foundation.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "How agents decide",
              headlineHref: "/how-it-works",
              copyText:
                "The decision engine. How a CIRIS agent weighs options, checks its work, and knows when to ask a human for help.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Real-world examples",
              headlineHref: "/explore-a-trace",
              copyText:
                "Case studies and live traces showing what happens when AI systems have ethical guardrails \u2014 and what happens when they don\u2019t.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <CardsSection
          cardsData={[
            {
              headline: "Responsibilities",
              copyText:
                "What an agent owes to the people it serves, the people who built it, and the wider world. First-contact protocols live here.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Who\u2019s accountable",
              copyText:
                "Building AI isn\u2019t just technical \u2014 it creates obligations. The Accord defines who is responsible and for what.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Hard situations",
              headlineHref: "/coherence-ratchet",
              copyText:
                "What to do in conflicts. How to safely shut down a system. The formal reasoning behind the framework.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <div className="text-center my-8">
          <a
            href="/ciris_accord.txt"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Read the Full Accord
          </a>
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
        subheadline="AGPL-3.0 licensed. Every decision auditable. Built for the long view."
        copyText="Whether you're a developer, researcher, or someone who thinks AI should explain itself — deploy an agent, read the Accord, or join the community."
        buttonText="Star on GitHub"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Join the Discord"
        linkHref="https://discord.gg/SWGM7Gsvrv"
      />

      <Footer />
    </>
  );
}
