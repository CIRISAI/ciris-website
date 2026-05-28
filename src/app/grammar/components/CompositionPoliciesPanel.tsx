import { COMPOSITION_POLICIES } from "../lib/content";

const KIND_STYLE: Record<string, string> = {
  base: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  modifier:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  specialization:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function CompositionPoliciesPanel() {
  return (
    <section id="composition" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Composition policies
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Consumer-side composition is part of CEG, not bolted on. The
          federation does not adjudicate; it ships primitives, and consumers
          compose verdicts. Three base policies plus three modifiers /
          specializations.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {COMPOSITION_POLICIES.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-brand-primary/10 px-2 py-0.5 font-mono text-sm font-bold text-brand-primary">
                {p.id}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  KIND_STYLE[p.classification]
                }`}
              >
                {p.classification}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {p.name}
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
              {p.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
