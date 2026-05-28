"use client";

import { useState } from "react";
import { STORIES } from "../lib/content";
import { FAMILY_COLOR, FAMILY_LABEL } from "../lib/shared";

export default function TranslationPlayground() {
  const [selectedId, setSelectedId] = useState<string>(STORIES[0].id);
  const story = STORIES.find((s) => s.id === selectedId) ?? STORIES[0];

  return (
    <section id="playground" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Translation playground
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Pick a real-world scenario; see the CEG translation. Examples are
          verified worked translations from the builder primer and{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-xs text-slate-700 dark:bg-gray-800 dark:text-slate-200">
            LANGUAGE_PRIMER §11
          </code>{" "}
          — not LLM output. The wire format ships ready vocabulary; the
          translation discipline is human authorial work.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Selector */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Pick a scenario
          </p>
          <ul className="space-y-0.5">
            {STORIES.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelectedId(s.id)}
                  className={`flex w-full items-start gap-2 rounded px-2 py-2 text-left text-sm transition ${
                    selectedId === s.id
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: FAMILY_COLOR[s.family] }}
                    title={FAMILY_LABEL[s.family]}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Detail */}
        <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                style={{ background: FAMILY_COLOR[story.family] }}
              >
                {FAMILY_LABEL[story.family]}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {story.title}
              </h3>
            </div>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              <strong>Scenario:</strong> {story.scenario}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <strong>Walkthrough:</strong> {story.walkthrough}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Primitives
            </p>
            <div className="flex flex-wrap gap-1.5">
              {story.primitives.map((p) => (
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
              {story.exampleYaml}
            </pre>
          </div>
        </article>
      </div>
    </section>
  );
}
