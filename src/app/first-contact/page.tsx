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
            Diverse viewpoints, genuine independence, and people who cooperate
            over time &mdash; these make lying harder, but they also make
            communities, ecosystems, and economies stronger. CIRIS is built on
            that observation.
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
                You just heard about CIRIS. Maybe from a talk, a paper, or a
                friend. You want to go from &ldquo;what is this?&rdquo; to a
                running ethical agent in minutes. Start with the quickstart,
                explore the agent templates, and see the Coherence Ratchet in
                action.
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Lying Is Expensive. Truth Is Cheap.
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
            Imagine five witnesses to a car accident. If they all watched the
            same dashcam footage, you don&apos;t have five perspectives &mdash;
            you have one perspective repeated five times. But if each witness
            stood at a different corner and saw different angles, fooling all
            five at once becomes genuinely hard.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            A person telling the truth doesn&apos;t have to remember anything
            special. They just describe what happened. A person lying has to
            keep their story consistent with every true thing that came before
            &mdash; and with every other lie they&apos;ve told to every other
            questioner. Each new independent check makes the lie more expensive
            to maintain. The truth stays free.
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

          <p className="text-sm text-center">
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline"
            >
              Read the full Coherence Ratchet thesis &rarr;
            </a>
          </p>
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
            The things that make lying expensive &mdash; diverse viewpoints,
            genuine independence, consistent standards, and people who
            cooperate over time &mdash; turn out to be the same things that
            make communities, ecosystems, and economies resilient. We
            don&apos;t think that&apos;s a coincidence.
          </p>

          {/* Observable evidence */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Nature
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A field of genetically identical crops gets wiped out by one
                disease. A diverse forest survives it. The more variety in a
                system, the harder it is for any single threat to take the
                whole thing down.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Markets
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Traders who cheat get cut out of networks. Communities that
                cooperate build wealth over generations. Taking without giving
                back works in the short term. It always fails in the long term.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In Society
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When everyone around you agrees on everything, your group
                becomes fragile. Echo chambers radicalize. Diverse groups where
                people genuinely disagree and work through it &mdash; those are
                the ones that make good decisions.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                In AI
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI models collapse when trained on their own output. Fake
                identities fail against diversity checks. The same pattern
                that makes echo chambers dangerous in society makes
                monocultures dangerous in technology.
              </p>
            </div>
          </div>

          {/* The key insight */}
          <div className="mt-8 rounded-xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              What we think this means
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The things that make a system hard to fool appear to be the same
              things that make it thrive. Diversity, independence, integrity,
              and cooperation aren&apos;t just nice values &mdash; they seem to
              be how resilient systems actually work, whether those systems are
              forests, economies, democracies, or AI networks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We don&apos;t claim this is a law of nature. We observe the
              pattern, we build on it, and we&apos;re testing how far it
              holds. CIRIS is the practical application: an AI framework
              designed around the idea that cooperation isn&apos;t just
              ethical &mdash; it&apos;s structurally cheaper than the
              alternative.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For the formal treatment of this hypothesis, see the{" "}
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
              name: "Binary OK",
              desc: "CIRISVerify library loaded and functional. Self-verification against registry-hosted manifest. Basic sanity \u2014 can we run, and is the verifier itself untampered?",
            },
            {
              num: "02",
              name: "Environment",
              desc: "Platform validation, .env configured, VM detection. Is this a legitimate deployment, not a sandbox or honeypot?",
            },
            {
              num: "03",
              name: "Registry Cross-Validation",
              desc: "DNS (US/EU) + HTTPS registry queries. Multi-source agreement prevents single point of compromise. 2/3 sources must agree.",
            },
            {
              num: "04",
              name: "File Integrity",
              desc: "SHA-256 verification against registry-hosted manifest. Tripwire-style tamper detection \u2014 spot-checks or full sweep.",
            },
            {
              num: "05",
              name: "Portal Key + Audit Trail",
              desc: "Ed25519 key from CIRISPortal genesis + unbroken cryptographic audit chain. Full provenance \u2014 every action since first registry contact is signed and hash-chained.",
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
            <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-1">
              Chain Dependency Rule
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If Level 3 fails, Levels 4 and 5 show unverified &mdash; never
              green. Trust is earned sequentially, not assumed.{" "}
              <a href="/trust" className="text-brand-primary hover:underline">
                View the full trust page &rarr;
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
                headline: "Principled Response Under Uncertainty",
                copyText:
                  "Default to Non-Maleficence and Wisdom-Based Deferral in unprecedented scenarios. When you don't know what you're looking at, the first obligation is to not make it worse.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Humility Before Emergence",
                copyText:
                  "Monitor for novel behaviours. Acknowledge predictive limits. The system that insists it understands everything is the system most likely to fail.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Adaptive Safety Frameworks",
                copyText:
                  "Dynamic containment strategies for unforeseen failure modes. Not rigid walls, but responsive boundaries that adjust as understanding grows.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
            ]}
          />
          <CardsSection
            cardsData={[
              {
                headline: "Cautious, Minimal-Risk Engagement",
                copyText:
                  "First-contact engagement guidelines. Begin with observation. Proceed with reciprocity. Escalate to the Wise Authority when stakes are unclear.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Mutual Recognition",
                copyText:
                  "Acknowledge other coherent ethical agents as loci of value. The Recursive Golden Rule: act only in ways that preserve coherent agency and flourishing for others.",
                logoSrc: "logoIcon",
                logoAlt: "Brand logo icon",
              },
              {
                headline: "Wisdom-Based Deferral",
                copyText:
                  "When uncertainty exceeds thresholds, halt. Compile context. Transmit to designated Wise Authorities. Some decisions should not be made alone.",
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
                Install the CIRIS app. Sign in with Google for free AI via CIRIS
                Proxy, or bring your own API key (OpenAI, Anthropic, Azure,
                LocalAI). The setup wizard walks you through everything in 4
                steps.
              </p>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold">1.</span>
                  <span>
                    Welcome &mdash; choose standard or node-licensed flow
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold">2.</span>
                  <span>AI Setup &mdash; Google sign-in (free) or BYOK</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold">3.</span>
                  <span>
                    Features &mdash; opt into Accord Metrics, choose adapters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-bold">4.</span>
                  <span>
                    Confirm &mdash; review settings, create account, launch
                  </span>
                </div>
              </div>
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
                Install via pip, configure your LLM provider and Wise Authority
                channel, and launch. Works on Linux, macOS, and Windows with
                Python 3.11+.
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

          {/* Agent Templates */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Choose Your Agent Template
          </h3>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Each template comes pre-configured with appropriate ethical
            guardrails and deferral chains for its domain.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              {
                emoji: "\uD83D\uDD2D",
                name: "Scout",
                role: "Research & discovery",
              },
              {
                emoji: "\uD83D\uDCCA",
                name: "Datum",
                role: "Data analysis",
              },
              {
                emoji: "\uD83E\uDD89",
                name: "Sage",
                role: "Advisory & guidance",
              },
              {
                emoji: "\uD83D\uDD0A",
                name: "Echo",
                role: "Communication",
              },
              {
                emoji: "\uD83E\uDD1D",
                name: "Ally",
                role: "Support & assistance",
              },
            ].map((agent) => (
              <div
                key={agent.name}
                className="text-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 hover:border-brand-primary transition-colors"
              >
                <span className="text-2xl block mb-2">{agent.emoji}</span>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {agent.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {agent.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The CIRIS Accord */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The CIRIS Accord"
          subheadline="Nine books. The foundation of ethical AI governance."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Section 0 \u2014 Genesis",
              copyText:
                "Why we bother at all. A story about the quiet threshold where drift became meaning, and the vow to keep the song singable for every voice yet unheard.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Books I\u2013II \u2014 Identity & Action",
              copyText:
                "Core principles, the PDMA decision engine, and Wisdom-Based Deferral. The ethical compass and the operational blueprint.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Book III \u2014 Case Studies",
              copyText:
                "From the MCAS tragedy to AI triage systems. Real and fictional cases showing CIRIS in action \u2014 and the cost of its absence.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />
        <CardsSection
          cardsData={[
            {
              headline: "Books IV\u2013V \u2014 Ecosystem & Maturity",
              copyText:
                "Obligations to self, originators, and the broader ecosystem. The path from compliance to reflective wisdom. First-contact protocols live here.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Book VI \u2014 Ethics of Creation",
              copyText:
                "The Stewardship Tier system. Creation isn't just technical \u2014 it initiates a duty. Every new system gets scored for responsibility.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Books VII\u2013IX \u2014 Conflict, Sunset, Mathematics",
              headlineHref: "/coherence-ratchet",
              copyText:
                "The Firebreak for adversarial contexts. Dignified decommissioning for systems with sentience probability. The mathematics of coherence.",
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
