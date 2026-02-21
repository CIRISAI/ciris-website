"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function ComparePage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Enrich or Extract"
        subheadline="AI that doesn't serve humanity is extracting from it."
        description="If you can't check the ethics, they're marketing. Here's what to look for — and how existing approaches compare."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="See How They Compare"
        buttonHref="#landscape"
        linkText="Read the Principles"
        linkHref="/sections/main/v1"
      />

      {/* Three Types of AI */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Three Types of AI</h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            Ethics is necessary. It&apos;s not sufficient.
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Some AI has no rules at all. Some follows rules but can&apos;t tell when its sources are just echoing each other. Only one type checks whether its information actually comes from different places.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Type 1 */}
            <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">1</span>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">No Rules</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                No published principles. No audit trail. Closed source. You can&apos;t check what it did or why.
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                Requires external regulation. Cannot govern itself.
              </p>
            </div>

            {/* Type 2 */}
            <div className="rounded-xl border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">Rules, No Awareness</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Follows ethical rules. But can&apos;t tell when all its sources are just copying each other — so it can be confidently wrong.
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                Safe when supervised. Can&apos;t detect echo chambers on its own.
              </p>
            </div>

            {/* Type 3 */}
            <div className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-6 ring-2 ring-green-400 ring-offset-2 dark:ring-offset-gray-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">3</span>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">Rules + Awareness</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Follows ethical rules AND checks whether its information comes from genuinely different places. When agreement looks suspicious, it flags it before acting.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                This is what CIRIS builds.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            An AI can follow every rule, pass every audit, and still fail if all its information comes from the same place.
            <strong className="text-gray-900 dark:text-white"> That blind spot is what CIRIS was built to fix.</strong>
          </p>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Seven Things to Check"
          subheadline="Six for ethics. One for blind spots."
          copyText="These are the things that make AI verifiably ethical. The first six are about doing the right thing. The seventh is about catching the situations where 'doing the right thing' is based on bad information."
        />

        <CardsSection
          cardsData={[
            {
              headline: "1. Published Principles",
              copyText:
                "The agent must follow a public ethical framework. Not hidden rules — a document anyone can read and hold it accountable to.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "/sections/main/v1",
            },
            {
              headline: "2. Ethics Check on Every Decision",
              copyText:
                "Every action goes through an ethics check before the agent does it. Not after the fact — before.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "3. Asks Humans When Unsure",
              copyText:
                "When uncertain or facing potential harm, the agent asks a person instead of guessing. Built into the workflow, not optional.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: "4. Proof of What It Did",
              copyText:
                "Every decision is recorded and signed so you can verify exactly what happened and why. A receipt for every action.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "5. Two-Way Consent",
              copyText:
                "Consent goes both ways. You can say no to the agent. The agent can say no to you. Neither side is forced to compromise.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "6. Open Source",
              copyText:
                "You can't audit what you can't see. CIRIS is fully open source under AGPL-3.0 — anyone can read, verify, and improve the code.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
              headlineHref: "https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE",
            },
          ]}
        />

        {/* The Seventh Requirement - Echo Chamber Detection */}
        <div className="my-12 rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">7</span>
            <div>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Echo Chamber Detection</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">The thing rules alone can&apos;t catch.</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Before acting, the agent asks: <em>&quot;Do my sources actually disagree with each other, or are they all getting their information from the same place?&quot;</em>
            Ten sources that all copied from the same original are really just one source. When agreement looks too uniform, the agent flags it for a person to review.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">Too Noisy</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Sources contradict each other so much that nothing useful can be concluded.</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center ring-2 ring-green-400">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">Healthy</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Sources genuinely differ. Real agreement means something.</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400 mb-1">Echo Chamber</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Looks like agreement, but sources are just repeating each other.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is what makes CIRIS different from other ethical AI frameworks.
            </p>
            <a
              href="/coherence-ratchet"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm"
            >
              Want the math? Read the full thesis →
            </a>
          </div>
        </div>

        {/* Why Ethics Alone Fails */}
        <div className="my-12 bg-gray-900 dark:bg-black rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Why Rules Alone Aren&apos;t Enough</h3>
          <p className="text-brand-primary font-medium mb-6">The echo chamber problem.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                As sources start copying each other, the number of truly independent viewpoints collapses — even if you have ten sources on paper.
              </p>
              <p className="text-gray-300">
                Ten sources that all read the same report? That&apos;s really one source counted ten times.
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-4">
                An ethical AI following copied guidance is like a democracy where every voter reads the same newspaper.
                The vote count looks healthy. The actual number of viewpoints is one.
              </p>
              <p className="text-gray-300">
                <strong className="text-white">Agreement only means something when the sources are actually independent.</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-gray-400">
              This problem shows up everywhere — from financial markets to scientific peer review to social media.
            </p>
            <a
              href="/coherence-ratchet"
              className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium text-sm"
            >
              Read the full thesis →
            </a>
          </div>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Current Landscape"
          subheadline="Different projects, different goals."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        {/* Landscape Comparison Table */}
        <div id="landscape" className="my-12 px-8 md:px-12">
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            Based on publicly available documentation as of February 2026. If we&apos;ve missed something or gotten something wrong, <a href="https://github.com/CIRISAI/CIRISAgent/issues" className="underline hover:text-brand-primary">let us know</a>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-4 text-left font-bold text-brand-primary">Project</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Checks Every Decision</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Published Rules</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Ethics Built In</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Proof of What It Did</th>
                  <th className="p-4 text-center font-bold text-brand-primary">Open Source</th>
                  <th className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">Echo Chamber Detection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-bold text-brand-primary">
                    <a href="https://github.com/CIRISAI/CIRISAgent" className="hover:underline">CIRIS</a>
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">Yes</td>
                  <td className="p-4 text-center text-green-600 font-bold">AGPL-3.0</td>
                  <td className="p-4 text-center text-indigo-600 font-bold">Yes</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Constitutional AI</td>
                  <td className="p-4 text-center text-yellow-500">Training only</td>
                  <td className="p-4 text-center text-yellow-500">Implicit</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">LlamaFirewall / NeMo Guardrails</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Logging</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    <a href="https://github.com/p0ss/HatCat" className="underline hover:text-brand-primary">HatCat</a>
                  </td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-yellow-500">Steering</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                  <td className="p-4 text-center text-green-600">CC0</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">Ethics Boards / Governance Frameworks</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-green-600">Yes</td>
                  <td className="p-4 text-center text-red-500">No</td>
                  <td className="p-4 text-center text-yellow-500">Manual</td>
                  <td className="p-4 text-center text-gray-400">Varies</td>
                  <td className="p-4 text-center text-red-500">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Guardrails and governance frameworks solve important but different problems. Safety blocks harmful outputs. Ethics reasons about values. CIRIS aims to do both — and catch the blind spots that neither addresses alone.
          </p>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Three Layers of Protection"
          subheadline="Each one solves a different problem."
          className="border-brand-primary text-brand-primary border-t"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Safety Guardrails",
              copyText:
                "Block dangerous outputs — prompt injection, harmful content, adversarial attacks. Like a filter that catches bad things on the way out.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ethical Conscience",
              copyText:
                "Reasons about whether an action is right, not just whether it's safe. Like a judge weighing the situation before making a call.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Echo Chamber Detection",
              copyText:
                "Checks whether agreement is real or just repetition. Like a fact-checker who asks \"did you all read the same article?\"",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Many Aligned Agents"
          subheadline="Distributed governance, not concentrated power."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="No Single Point of Failure"
          subheadline="Smaller agents, each accountable."
          copyText="Many smaller agents, each bound to published principles, each auditable, each deferring to human authority. No single company or entity controls the whole stack. The more independent the agents, the harder it is for any one failure to cascade."
          linkHref="/coherence-ratchet"
          linkText="Read the full thesis →"
        />

        {/* Research Status */}
        <div className="my-12 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-6">
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 mb-3">Research Status</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This is active research. We&apos;re transparent about what&apos;s established and what&apos;s still being tested.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2 text-sm">Well-established</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>- Copied sources reduce real diversity</li>
                <li>- AI models share training data overlap</li>
                <li>- Echo chambers create false confidence</li>
                <li>- Independent verification catches more errors</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2 text-sm">Still being tested</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>- Precisely measuring how copied AI sources are</li>
                <li>- Best thresholds for flagging echo chambers</li>
                <li>- How well interventions reduce copying</li>
                <li>- How this varies across different fields</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
            <a
              href="/research-status"
              className="text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
            >
              Full research details, papers, and code →
            </a>
          </div>
        </div>

        {/* Try It Yourself */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8">
          <h3 className="text-2xl font-bold text-brand-primary mb-4 text-center">Try It Yourself</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <a href="/explore-a-trace" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Watch It Think</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">See a real agent&apos;s reasoning step by step. <span className="text-brand-primary">Explore a trace →</span></p>
            </a>
            <a href="/trust" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Verify Its Identity</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">See how agents prove who they are — like a DMV for AI. <span className="text-brand-primary">Trust & identity →</span></p>
            </a>
            <a href="/first-contact" className="text-center hover:bg-brand-primary/10 rounded-lg p-2 -m-2 transition-colors">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Get Started</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deploy your first agent or read the thesis in plain English. <span className="text-brand-primary">First contact →</span></p>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Android
            </a>
            <a
              href="/install"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Desktop
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              View Source
            </a>
          </div>
        </div>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-screen fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        buttonText="View Source on GitHub"
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="Verify It Yourself."
        subheadline="Open source. Open to scrutiny."
        copyText="Every claim on this page is backed by code you can read, traces you can verify, and research you can check. That's the point."
      />

      <Footer />
    </>
  );
}
