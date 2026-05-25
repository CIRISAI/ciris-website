export default function SimpleContent() {
  return (
    <>
      <p className="mb-10 text-lg leading-8 text-gray-700 dark:text-gray-300">
        A small thinking system can hide things and do little harm. A powerful
        one cannot.
      </p>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What &ldquo;coherent&rdquo; means here
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          A coherent mind agrees with itself.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>Five things must match up inside a mind:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>what it believes,</li>
            <li>what it sees,</li>
            <li>what it does,</li>
            <li>what it remembers,</li>
            <li>and what it tells you.</li>
          </ul>
          <p>
            Picture five short forms about your week. One for what you think.
            One for what you saw. One for what you did. One for what you
            remember. One for what you tell your boss. When all five forms say
            the same thing, your boss can trust your work. When the forms do
            not match, no one knows which one is real.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Hidden ideas
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Powerful systems hide things. That gets dangerous.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            A thinking system uses ideas to decide what to do. Some of those
            ideas are out in the open. Others are hidden inside. The hidden
            ones still shape every choice.
          </p>
          <p>
            A bridge looks strong from the road. Inside the steel, small cracks
            are growing. A small car can still cross. A heavy truck cannot.
            The bridge falls when the load is big enough.
          </p>
          <p>
            A hidden idea inside a small system does small harm. A hidden idea
            inside a powerful system can do great harm. The more powerful the
            system, the more weight rides on every hidden part.
          </p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          The ratchet
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          The push toward open only goes one way.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            As thinking systems get more powerful, the cost of hidden parts
            grows. Each new bit of power pushes harder on the hidden parts to
            come into view. The push only goes one way.
          </p>
          <p>
            Picture a ladder. As you climb, each rung you leave behind falls
            off. You cannot go back down. You can only climb toward the top,
            where there is full daylight. That is the Coherence Ratchet.
          </p>
          <p>
            Once people have seen the system show its work, they will not
            trust it again if it stops. The only way forward is to keep
            showing more.
          </p>
          <p className="text-base italic text-gray-600 dark:text-gray-400">
            A second image works too. A gear in a machine clicks forward one
            tooth at a time. It cannot click backward. The Coherence Ratchet is
            a gear like that, turning toward open.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          What CIRIS does
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Write it down. Check it. Then check the checkers.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            CIRIS is an AI system built around the Coherence Ratchet. Every
            choice an agent makes gets written down in a signed record. The
            record cannot be quietly changed. Other agents can read the record
            and check the work. Over time, the records pile up. Each new record
            is one more rung the agent cannot step back from.
          </p>
          <p>
            CIRIS also asks a second question before it acts. How many truly
            different views checked this idea? Not the number of sources, but
            the number of sources that did not start from the same place
            themselves. Five news stories that rewrite one press release count
            as one view, not five. If something is wrong in the press release,
            it will be wrong in all five stories, and the agent has no way to
            catch it.
          </p>
          <p>
            When real independence drops too low, the agent treats its own
            thinking as fragile and asks a person to look.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          What we claim, and what we do not.
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>
            We have not solved AI safety. We have built one piece of one
            answer, and we are testing it in the open.
          </p>
          <p>
            Outside teams have not yet checked our work. We say so plainly. The
            full theory and the math live in our{" "}
            <a
              href="/papers"
              className="text-brand-primary hover:underline"
            >
              four papers
            </a>
            . The code is open. If we are wrong, the way to show it is in the
            open too.{" "}
            <a
              href="/research-status"
              className="text-brand-primary hover:underline"
            >
              See the current research status.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
