import type { Dictionary } from "@/i18n/dictionaries";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (s: string) => ({ __html: s });

export default function SimpleContent({ t }: { t: Dictionary }) {
  const f = t.federation;
  return (
    <>
      <p className="mb-10 text-lg leading-8 text-gray-700 dark:text-gray-300">
        {f.intro}
      </p>

      <section className="mb-12 rounded-2xl border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
        <p className="text-lg leading-8 text-gray-800 dark:text-gray-200">
          {f.supervisionCallout}
        </p>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.networkLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.networkH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{f.networkP1}</p>
          <p>{f.networkP2}</p>
          <p>{f.networkP3}</p>
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.chainLabel}
        </p>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          {f.chainH2}
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border-2 border-purple-500 bg-purple-50 p-5 dark:bg-purple-900/20">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">
              {f.chainPeopleH3}
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {f.chainPeopleBody}
            </p>
          </div>
          <div className="rounded-xl border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
              {f.chainEthicalSelfAwareH3}
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {f.chainEthicalSelfAwareBody}
            </p>
          </div>
          <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-5 dark:bg-yellow-900/20">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
              {f.chainEthicalH3}
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {f.chainEthicalBody}
            </p>
          </div>
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5 dark:border-red-700 dark:bg-red-900/20">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
              {f.chainSimpleH3}
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {f.chainSimpleBody}
            </p>
          </div>
        </div>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          {f.chainFooter}
        </p>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.recordsLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.recordsH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{f.recordsP1}</p>
          <p dangerouslySetInnerHTML={h(f.recordsP2Html)} />
        </div>
      </section>

      <section className="mb-12 rounded-2xl border-l-4 border-brand-primary bg-blue-50 px-6 py-8 dark:bg-blue-900/20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.healthyLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.healthyH2}
        </h2>
        <p
          className="text-lg leading-8 text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={h(f.healthyBodyHtml)}
        />
      </section>

      <section className="mb-10">
        <div className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-900/20">
          <p
            className="text-sm text-amber-900 dark:text-amber-200"
            dangerouslySetInnerHTML={h(f.statusWarningHtml)}
          />
        </div>
      </section>

      <section className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.joinLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.joinH2}
        </h2>
        <div className="mb-6 space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p>{f.joinP1}</p>
          <p>{f.joinP2}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-5 dark:bg-blue-900/20">
            <h3 className="mb-2 font-semibold text-blue-700 dark:text-blue-300">
              {f.registeredH3}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {f.registeredBody}
            </p>
          </div>
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-700 dark:text-green-300">
              {f.sovereignH3}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {f.sovereignBody}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {f.joinFooter}
        </p>
      </section>

      <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.honestH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p dangerouslySetInnerHTML={h(f.honestBodyHtml)} />
        </div>
      </section>

      <section className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {f.engageLabel}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {f.engageH2}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          <p dangerouslySetInnerHTML={h(f.engageP1Html)} />
          <p dangerouslySetInnerHTML={h(f.engageP2Html)} />
          <p>{f.engageP3}</p>
        </div>
      </section>
    </>
  );
}
