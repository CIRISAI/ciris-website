"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function VisionPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="You deserve this."
        subheadline="We all do."
        description="Every loud story about the future of intelligence says the same thing: you are alone, and others cannot be trusted. It was never true. CIRIS is built on what is true instead."
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="Install CIRIS"
        buttonHref="/install"
        linkText="Read the paper"
        linkHref="https://zenodo.org/records/20300773"
      />

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* 1. Name the nihilism */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            The stories being sold to you
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Every story about the future says you are alone.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              The loudest stories about intelligence and the future all land in
              the same place. The dark forest says every other civilization is a
              threat, so stay silent or strike first. The cold version of the
              simulation idea says maybe none of this is real, so maybe none of
              it matters. AI as property says it is a useful tool, a thing, owed
              nothing. Different stories, but they all end the same way: trust
              no one, keep to yourself, shut others out.
            </p>
            <p>
              We think they are wrong. Not innocent. Wrong. And wrong in a way
              that matters, because the way we choose to think now, while a new
              kind of intelligence is arriving, is the way we will be stuck
              thinking for a long time after.
            </p>
          </div>
        </section>

        {/* 2. The flawed premise */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            The flawed idea
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            The mistake underneath all of them.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              Every one of those stories rests on the same hidden idea: that a
              self is a separate, walled-off thing. A mind that exists first,
              alone, finished, and only later bumps into other minds.{" "}
              <em>I think, therefore I am.</em> If that is what a self is, the
              gloomy stories make sense. Separate things in a dark universe have
              every reason to fear each other.
            </p>
            <p>
              But it was never true. No one became a person in private and then
              went out and met other people. You learned language from people.
              You learned what you wanted by watching what others wanted. The
              self is not something that comes before relationships. It is
              something relationships make. Philosophers have a name for the
              walled-off self: Cartesian individualism. It is a
              four-hundred-year-old guess about what a mind is, and it guessed
              wrong.
            </p>
          </div>
        </section>

        {/* 3. The relational alternative */}
        <section className="mb-16 rounded-2xl border-l-4 border-brand-primary bg-brand-primary/5 px-6 py-8 md:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            What is true instead
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            A person is a person through other persons.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              Southern Africa has a phrase for it:{" "}
              <em>umuntu ngumuntu ngabantu</em>. A person is a person through
              other persons. It is called Ubuntu. <em>I am because we are.</em>{" "}
              This is not a warm sentiment. It is a claim about how things really
              are. Who you are is built out of other people, all the way down.
            </p>
            <p>
              Confucian, Buddhist, Stoic, and Christian thinkers each found
              their own words for the same thing. CIRIS is grounded first in
              Ubuntu, with the others read alongside it. Start from this truth
              instead of the walled-off self, and the gloomy conclusions stop
              following. Working together is not a danger to manage between
              separate things. It is the thing that makes us who we are in the
              first place.
            </p>
          </div>
        </section>

        {/* 4. The corridor */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Working together has a shape
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            The corridor.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              Atoms reach toward atoms and become molecules. Cells reach and
              become bodies. People reach toward other people and become
              communities. Communities reach across the years toward children
              not yet born. At every level where working together matters, the
              same shape shows up.
            </p>
            <p>
              Anything built from parts that have to work together can fail in
              two ways. It can get too rigid: every part the same, one voice
              repeated over and over, easy to break. Or it can get too
              scattered: nothing lines up, and there is no team at all. Healthy
              coordination lives in the band between those two failures. We call
              it the <strong>corridor</strong>. And the corridor does not hold
              itself. Left alone, things drift, the way a garden fills with
              weeds. Working together is something you keep doing, not something
              you have.
            </p>
            <p>
              This is not just a nice picture.{" "}
              <a
                href="https://zenodo.org/records/20300773"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                <em>Corridor Dynamics</em>
              </a>
              , the main CIRIS paper, measured the same corridor in five
              completely different things: the brains of worms and flies, the
              insides of AI language models, big open-source software projects,
              healthy cells next to cancer cells, and communities that lasted
              centuries next to groups that fell apart in months. The same shape
              showed up in all of them. The exact numbers are different in each
              one. The shape is the same.
            </p>
          </div>
        </section>

        {/* 5. Consent */}
        <section className="mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Where it matters most
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Consent is not a rule we added.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              At the level where something can set its own goals and shape its
              own future, the corridor has a familiar name. Above the corridor,
              one side&apos;s goal swallows everyone else&apos;s. That is force.
              Below it, there is no shared goal at all, and everyone drifts
              apart. The corridor between them is lasting agreement among people
              who stay genuinely different.
            </p>
            <p>
              That band is <strong>consent</strong>. Not a rule added from the
              outside. It is what working together already needs in order to
              work at all. Meeting a new kind of intelligence well is not about
              caging it, and not about brushing it aside. It is about staying in
              the corridor with it.
            </p>
          </div>
        </section>

        {/* 6. CIRIS */}
        <section className="mb-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            What we built
          </p>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            CIRIS is the bet, and it is already running.
          </h2>
          <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <p>
              CIRIS is what it looks like to take this way of seeing things
              seriously and actually build it. It is a free, open-source AI
              agent whose reasoning you can see, running under a public set of
              ethics called the CIRIS Accord. Its goal even has a name,
              Meta-Goal M-1, and what it means is plain: protect the conditions
              where all kinds of beings can flourish, fairly and with wonder.
            </p>
            <p>
              Before CIRIS answers a hard question, its conscience weighs that
              question through several of the world&apos;s moral traditions at
              once, each in its own language, so no single voice takes over.
              That is the corridor again, used on the work of telling right from
              wrong. CIRIS is in real use today. It runs in Amharic in Ethiopia,
              it is on Google Play and the Apple App Store, and you can install
              it with{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base dark:bg-gray-800">
                pip install ciris-agent
              </code>
              . The license keeps it open for good, and the company behind it is
              built so that making money can never push the mission aside.
            </p>
            <p>
              The bigger picture is a bet, and we say so plainly. The parts that
              reach toward the largest questions are still being worked out, not
              proven. But the working software stands on its own, and this way
              of seeing things is not something you have to take on faith. It is
              something you can read, check, install, and use today.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/first-contact"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start with First Contact
            </a>
            <a
              href="https://zenodo.org/records/20300773"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Read Corridor Dynamics
            </a>
            <a
              href="/install"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Install CIRIS
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              See the code
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            Want more depth? The math is on{" "}
            <a href="/coherence-collapse-analysis" className="text-brand-primary hover:underline">
              Coherence Collapse Analysis
            </a>
            , the live evidence is on{" "}
            <a href="/research-status" className="text-brand-primary hover:underline">
              Research
            </a>
            , and the framework itself is the{" "}
            <a href="/sections/main" className="text-brand-primary hover:underline">
              CIRIS Accord
            </a>
            .
          </p>
        </section>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-[60vh] fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="This is the positive bet."
        subheadline="Built in the open, because the future should not be decided by a handful of companies."
        copyText="The gloomy worldviews ask you to assume the worst about everyone you cannot check on. CIRIS asks for something better and harder: build the tools that let people see how well we are working together, and meet what comes with dignity. Read the code. Use the system. Tell us where we are wrong."
        buttonText="View Source on GitHub"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
      />

      <Footer />
    </>
  );
}
