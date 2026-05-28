import { NON_GOALS } from "../lib/content";

export default function NonGoalsPanel() {
  return (
    <section
      id="non-goals"
      className="space-y-4 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900"
    >
      <header>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          What this page deliberately doesn&rsquo;t do
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          These are the explicit non-goals named in the builder primer §5.
          They prevent the page from drifting into spec-restatement or
          marketing.
        </p>
      </header>
      <ul className="grid gap-3 md:grid-cols-2">
        {NON_GOALS.map((g) => (
          <li
            key={g.title}
            className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-gray-700 dark:bg-gray-900/40"
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {g.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
              {g.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
