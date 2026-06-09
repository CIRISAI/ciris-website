import type { Dictionary } from "@/i18n/dictionaries";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (s: string) => ({ __html: s });

export default function SimpleContent({ t }: { t: Dictionary }) {
  const cr = t.coherenceRatchet;
  return (
    <>
      <p className="mb-10 text-lg leading-8 text-gray-700 dark:text-gray-300">
        {cr.intro}
      </p>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {cr.coherentLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {cr.coherentH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{cr.coherentListIntro}</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>{cr.coherentLi1}</li>
            <li>{cr.coherentLi2}</li>
            <li>{cr.coherentLi3}</li>
            <li>{cr.coherentLi4}</li>
            <li>{cr.coherentLi5}</li>
          </ul>
          <p>{cr.coherentP2}</p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {cr.hiddenLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {cr.hiddenH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{cr.hiddenP1}</p>
          <p>{cr.hiddenP2}</p>
          <p>{cr.hiddenP3}</p>
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {cr.ratchetLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {cr.ratchetH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{cr.ratchetP1}</p>
          <p>{cr.ratchetP2}</p>
          <p>{cr.ratchetP3}</p>
          <p className="text-base italic text-gray-600 dark:text-gray-400">
            {cr.ratchetP4Italic}
          </p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {cr.cirisLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {cr.cirisH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{cr.cirisP1}</p>
          <p>{cr.cirisP2}</p>
          <p>{cr.cirisP3}</p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {cr.claimH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{cr.claimP1}</p>
          <p dangerouslySetInnerHTML={h(cr.claimP2Html)} />
        </div>
      </section>
    </>
  );
}
