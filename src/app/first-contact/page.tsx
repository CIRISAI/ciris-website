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
        description="Whether you're deploying your first CIRIS agent or exploring why cooperation may be a mathematical survival imperative — start here."
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
            The same factors that make deception expensive &mdash; diverse
            sources, genuine independence, sustained cooperation &mdash; are the
            same factors that make communities, ecosystems, and economies
            resilient. CIRIS is built on that observation.
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
            understanding the mathematical thesis behind the framework.
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
                Why does the framework work? We hypothesize that the
                computational asymmetry between truth and deception isn&apos;t
                just an engineering trick &mdash; it reflects something
                structural about how cooperation works across biology,
                economics, and AI systems.
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
            The Core Mechanism
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Cooperation Is Cheaper Than Deception
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
            Five sources that all copy from the same place aren&apos;t five
            opinions &mdash; they&apos;re one opinion repeated five times.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            The Coherence Ratchet measures this. It tracks how many genuinely
            independent perspectives verified a decision, correcting for
            correlation between sources. When real diversity drops too low, the
            system flags the reasoning as fragile and escalates to a human.
          </p>

          <div className="rounded-lg bg-gray-900 dark:bg-gray-800 border border-gray-700 p-8">
            {/* Equation */}
            <div className="text-center py-6 border-y border-gray-700">
              <p className="font-mono text-xl md:text-2xl text-gray-100 tracking-wider">
                k<sub className="text-teal-400">eff</sub> ={" "}
                <span className="text-blue-400">k</span> / (1 +{" "}
                <span className="text-teal-400">{"\u03C1"}</span>(
                <span className="text-blue-400">k</span> &minus; 1))
              </p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex gap-3 items-start">
                <div className="w-1 min-h-[40px] bg-blue-400 flex-shrink-0 rounded" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    k &mdash; Sources
                  </h4>
                  <p className="text-xs text-gray-400">
                    How many independent information sources checked the
                    decision. More sources, stronger verification.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-1 min-h-[40px] bg-teal-400 flex-shrink-0 rounded" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {"\u03C1"} &mdash; Correlation
                  </h4>
                  <p className="text-xs text-gray-400">
                    How similar those sources are to each other. High
                    correlation means echo chamber risk.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-1 min-h-[40px] bg-green-400 flex-shrink-0 rounded" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    k<sub>eff</sub> &mdash; True Diversity
                  </h4>
                  <p className="text-xs text-gray-400">
                    After accounting for correlation, how many genuinely
                    independent perspectives remain.
                  </p>
                </div>
              </div>
            </div>

            {/* Plain-English Explanation */}
            <div className="mt-6 bg-gray-800 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Why this matters:</strong> A liar
                has to keep their story consistent with everything true that came
                before &mdash; and that gets harder with each independent check.
                A truth-teller just references what happened. The more diverse,
                independent verification a system has, the more expensive
                deception becomes, while honesty stays cheap.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-center">
            <a
              href="/coherence-ratchet"
              className="text-brand-primary hover:underline"
            >
              Read the full Coherence Ratchet thesis &rarr;
            </a>
          </p>
        </div>

        {/* The Broader Hypothesis */}
        <div className="my-16 mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4">
            The Broader Hypothesis
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            This Pattern Appears Everywhere
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            We observe that the factors which make deception expensive in AI
            systems &mdash; diverse independent sources, low correlation,
            rigorous standards, and sustained reciprocity &mdash; are the same
            factors associated with resilience in biology, economics, and social
            systems. We think this structural parallel is worth taking seriously.
          </p>

          {/* Observable evidence */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-3">
                <span className="text-teal-500 font-bold text-lg mt-0.5">
                  &bull;
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">
                    Biological
                  </strong>
                  Monocultures collapse. Diverse ecosystems persist. When every
                  organism in a system is genetically identical, a single disease
                  wipes them out. Diversity is structural resilience.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 font-bold text-lg mt-0.5">
                  &bull;
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">
                    Economic
                  </strong>
                  Trust-based markets outperform extractive ones over time.
                  Actors who take without reciprocating get excluded from trade
                  networks. Cooperation compounds; extraction depletes.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 font-bold text-lg mt-0.5">
                  &bull;
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">
                    Social
                  </strong>
                  Echo chambers radicalize. Diverse networks innovate. When
                  everyone around you confirms the same view, your group becomes
                  fragile. Genuine independence between perspectives is what
                  produces robust collective judgment.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 font-bold text-lg mt-0.5">
                  &bull;
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-white block mb-1">
                    Digital
                  </strong>
                  AI models collapse when trained on their own output. Fake
                  identities in networks fail against diversity checks. The same
                  math that detects echo chambers in AI systems describes why
                  monocultures fail in nature.
                </div>
              </div>
            </div>
          </div>

          {/* The J=C conjecture */}
          <div className="mt-8 rounded-lg bg-gray-900 dark:bg-gray-800 border border-gray-700 p-8">
            <p className="text-xs text-gray-500 text-center mb-4 uppercase tracking-wider">
              The Defense&ndash;Flourishing Conjecture
            </p>
            <div className="text-center py-6 border-y border-gray-700">
              <p className="font-mono text-lg md:text-xl text-gray-100 tracking-wider">
                J = C = k<sub className="text-blue-400">eff</sub> &middot; (1
                &minus;{" "}
                <span className="text-teal-400">{"\u03C1\u0304"}</span>)
                &middot; <span className="text-amber-400">{"\u03BB"}</span>{" "}
                &middot; <span className="text-rose-400">{"\u03C3"}</span>
              </p>
            </div>

            <div className="mt-6 bg-gray-800 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong className="text-white">The conjecture:</strong> We model
                defense against deception (J) and capacity for flourishing (C)
                using the same four variables &mdash; effective scale, diversity,
                integrity, and sustained reciprocity. If this model is correct,
                the things that make a system safe are the same things that make
                it thrive. We present this as a testable hypothesis with{" "}
                <a
                  href="/coherence-ratchet"
                  className="text-brand-primary hover:underline"
                >
                  known limitations
                </a>
                , not a proven law.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="text-center">
                <div className="w-8 h-1 bg-blue-400 mx-auto rounded mb-2" />
                <p className="text-xs text-white font-semibold">Scale</p>
                <p className="text-xs text-gray-500">Independent sources</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-1 bg-teal-400 mx-auto rounded mb-2" />
                <p className="text-xs text-white font-semibold">Diversity</p>
                <p className="text-xs text-gray-500">Low correlation</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-1 bg-amber-400 mx-auto rounded mb-2" />
                <p className="text-xs text-white font-semibold">Integrity</p>
                <p className="text-xs text-gray-500">Rigorous standards</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-1 bg-rose-400 mx-auto rounded mb-2" />
                <p className="text-xs text-white font-semibold">Reciprocity</p>
                <p className="text-xs text-gray-500">Sustained cooperation</p>
              </div>
            </div>
          </div>

          {/* Thesis statement */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Our position:
              </strong>{" "}
              We posit that the nature of the observable universe is one of
              ethical cooperation as a clear survival imperative. The same
              structural factors that resist deception in multi-agent AI systems
              appear to govern resilience in ecosystems, economies, and social
              networks. If this hypothesis holds, alignment between
              intelligences isn&apos;t a constraint we impose &mdash; it&apos;s
              a property of coherent systems that we can measure and build on.
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
