import { STORIES } from "../lib/content";
import { FAMILY_COLOR, FAMILY_LABEL } from "../lib/shared";

export default function StoriesPanel() {
  return (
    <section id="stories" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Worked use-case stories
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Eight narratives that show CEG in action. Each names the primitives
          it uses and walks through the translation as a minimal annotated
          YAML.
        </p>
      </header>

      <div className="space-y-4">
        {STORIES.map((s, i) => (
          <details
            key={s.id}
            id={`story-${s.id}`}
            className="rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <summary className="cursor-pointer rounded-2xl px-5 py-4 hover:bg-slate-50 dark:hover:bg-gray-800/40">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand-primary/10 px-2 py-0.5 font-mono text-sm font-bold text-brand-primary">
                  Story {i + 1}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ background: FAMILY_COLOR[s.family] }}
                >
                  {FAMILY_LABEL[s.family]}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </span>
              </div>
            </summary>
            <div className="space-y-3 border-t border-slate-200 px-5 pb-5 pt-4 dark:border-gray-700">
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong>Scenario:</strong> {s.scenario}
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong>Walkthrough:</strong> {s.walkthrough}
              </p>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Primitives used
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.primitives.map((p) => (
                    <code
                      key={p}
                      className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-800 dark:bg-gray-800 dark:text-slate-200"
                    >
                      {p}
                    </code>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  CEG translation
                </p>
                <pre className="overflow-x-auto rounded-md bg-slate-50 p-3 text-[11px] leading-5 text-slate-800 dark:bg-gray-900/40 dark:text-slate-100">
                  {s.exampleYaml}
                </pre>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
