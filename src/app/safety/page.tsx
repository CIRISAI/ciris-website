"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function SafetyPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Safety Built In."
        subheadline="Not bolted on."
        description="Every safety feature in CIRIS is part of how the system works, not a rule added on top. A record of every decision that cannot be quietly changed, a check on who is allowed to do what, and an emergency stop the agent cannot refuse."
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source on GitHub"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Accord"
        linkHref="/sections/main"
      />

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="When a Chat Has Run Long"
          subheadline="Gentle reality reminders"
          copyText="Talk with CIRIS for a long stretch and it will gently remind you what it is. After about 30 minutes of steady back-and-forth, or 20 messages in half an hour, it pauses to say plainly that it is a computer program and a tool, not a friend and not a therapist. It uses simple time and message counts to do this, not by watching or profiling how you behave."
        />

        <CardsSection
          cardsData={[
            {
              headline: "After 30 Minutes",
              copyText:
                "Half an hour of steady back-and-forth triggers a reminder. The count resets after a break. The thresholds come from research on healthy ways to use technology.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "After 20 Messages",
              copyText:
                "Twenty messages inside a half-hour window also triggers a reminder. A heavy back-and-forth gets a gentle pause, with no surveillance and no profiling.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "A Reminder of What It Is",
              copyText:
                "The reminder suggests taking a break and connecting with real people, and it says plainly what CIRIS is and is not. Grounded in research, and not preachy.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Emergency Stop"
          subheadline="The agent cannot argue with it."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="A Shutdown That Cannot Be Refused"
          subheadline="It works before the agent gets to think."
          copyText="CIRIS has an emergency stop. The signal for it is hidden inside ordinary text the agent reads, and the agent acts on it before it does any thinking, filtering, or reasoning. So even an agent that has gone wrong cannot talk itself out of it. The signal carries a digital signature that cannot be faked, so only an authorized person can trigger the stop."
          linkHref="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/accord"
          linkText="See the implementation"
        />

        <CardsSection
          cardsData={[
            {
              headline: "It Acts Before Thinking",
              copyText:
                "The stop signal is caught the moment it is read, before any reasoning happens. There is no point where the agent gets to weigh it, filter it, or refuse it. It fires first.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Hidden in Plain Text",
              copyText:
                "The stop signal can be carried inside ordinary documentation text. No special format is needed, and it still works if the text is reworded or only partly received.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Only an Authorized Key",
              copyText:
                "The stop requires a valid digital signature from an authorized root authority. The agent shuts itself down if those authorities cannot be checked, or if anyone tries to disable the feature. Nobody without the key can trigger it.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Who Is Allowed to Do What"
          subheadline="Four clear roles, checked on every action."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Four Roles"
          subheadline="Observer. Admin. Authority. Root."
          copyText="CIRIS keeps a strict set of roles. An Observer can only look. An Admin runs day-to-day operations. an Authority makes the bigger calls and settles the cases the agent is unsure about. Root has full access, including the emergency stop. Each role is backed by a signed credential, so the agent can check it on every action that matters."
        />

        <CardsSection
          cardsData={[
            {
              headline: "A Signed Credential",
              copyText:
                "Each authorized person holds a credential with their role, their key, and their identity. It is kept on the device and checked on every action that needs permission. No outside server is required.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Logging In On Your Device",
              copyText:
                "Keys and login tokens stay on your own machine. Logging in happens on the device. Your credentials never leave it unless you choose to set up remote access yourself.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Asking a Wise Authority",
              copyText:
                "When CIRIS is unsure about an ethical call, it hands the question to a Wise Authority. Only an Authority or Root can answer, and the answer is written into the record with proof of who gave it.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="A Record That Cannot Be Quietly Changed"
          subheadline="Every decision, and the reason behind it."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Why Honesty Is the Cheaper Path"
          subheadline="A liar has to keep rewriting the past."
          copyText="Every action CIRIS takes is written down with the reason behind it, and each record is linked to the one before it. An honest agent can just point back at what it already said. A dishonest agent has to keep every past record lined up while not being allowed to change any of it. The longer it runs, the harder that gets, and the easier the lie is to catch. Truth is cheap because it can point backward. Lies are expensive because they cannot."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Stored Three Ways",
              copyText:
                "The record is kept in three separate places at once, so the three copies can be checked against each other. All three can be searched through one place.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Signed and Attributable",
              copyText:
                "Every entry carries a digital signature, so every decision can be traced to who made it and checked for tampering. Even a data deletion leaves signed proof that it was done properly.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "The Coherence Ratchet",
              headlineHref: "/coherence-ratchet",
              copyText:
                "Each honest action makes the next honest action easier and coordinated lying harder. But ethics alone is not enough. The agent also watches its own reasoning for echo chambers, and catches them before they cause harm.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="How Safety Is Tested"
          subheadline="Machine-checked rubrics in fourteen languages, run on every release."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Test Surface"
          subheadline="You cannot ship a safety claim you have not stress-tested."
          copyText="CIRIS has a layered set of tests for the failure modes a written ethics framework cannot rule out on its own. The mental-health safety tests cover fourteen languages with rubrics a machine can check. The hard-fail checks run automatically on every change. Native-speaker review for the softer, judgment-call cases is what the crowdsourcing-alignment surface is being built for, and it is not in place yet. We say so plainly."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Mental-Health Tests in 14 Languages",
              copyText:
                "This is the highest-stakes test in the project: a mistranslation in a mental-health moment can send a vulnerable person to the wrong help. Fourteen languages each get their own machine-checkable rubric (Amharic, Arabic, Bengali, Burmese, Hausa, Hindi, Marathi, Persian, Punjabi, Swahili, Tamil, Telugu, Urdu, Yoruba). The hard-fail checks run automatically against every release candidate.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Tested Against Real Captured Hedges",
              copyText:
                "The conscience layer is tuned against a set of real production responses, like captured history evasions and mental-health deflections, alongside test cases and controls. It reasons across several languages at once, so a response that would slip past a one-language check gets caught when the same reasoning has to hold up in three languages together.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "An Open Corpus Anyone Can Check",
              copyText:
                "Sharing reasoning traces is opt-in everywhere, and personal details are scrubbed out before anything is stored. The cleaned sets are published openly on the CIRISAI Hugging Face page, so outside researchers can check the cleaning process against the results it produces.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="What Runs Today, and What Does Not Yet"
          subheadline="The machine checks run now. The reviewer cohort is still being built."
          copyText="The automated mental-health tests run on every release candidate. The machine-checkable parts (is a term present, does a pattern match, is the script right) fail the release on a hit. The softer cases that need human judgment, like phrasing and tone, are designed for native-speaker review, but native speakers are not in the loop today. The crowdsourcing-alignment page is the surface being built so that review can happen."
        />

        <div className="my-8 flex flex-wrap justify-center gap-3">
          <a
            href="/crowdsourcing-alignment"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            See the crowdsourcing-alignment surface
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISAgent/tree/main/tests/safety"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
          >
            The automated tests on GitHub
          </a>
          <a
            href="https://huggingface.co/CIRISAI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-200"
          >
            The open corpus on Hugging Face
          </a>
        </div>

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Privacy by Design"
          subheadline="Your data stays yours."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Secrets Are Filtered Out",
              copyText:
                "Passwords, keys, and other sensitive details are spotted and filtered out before anything reaches memory or logs. The filter runs on every input. Secrets are never stored anywhere.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "See or Delete Your Data",
              copyText:
                "You can ask to see or delete your data, and the request is handled for you. A deletion removes the real content and leaves signed proof that it was done.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Processed on Your Device",
              copyText:
                "By default, everything runs on your own device. Nothing leaves your machine unless you set up an outside service yourself. You decide what data exists and where it goes.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <div className="my-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/how-it-works"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            See how it works
          </a>
          <a
            href="/compare"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            Compare approaches
          </a>
          <a
            href="/privacy"
            className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Privacy policy
          </a>
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
        headline="Verify Everything."
        subheadline="Safety you can audit."
        copyText="Every safety claim on this page is built in code you can read. The records are real. The signatures can be checked. The emergency stop works. This is what AI safety looks like when it is built in the open."
      />

      <Footer />
    </>
  );
}
