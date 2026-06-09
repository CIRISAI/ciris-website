"use client";

import { useEffect, useMemo, useState } from "react";
import { FAMILY_COLOR, FAMILY_LABEL } from "../lib/shared";
import type { FamilyId, GeneratedStory } from "../lib/shared";
import { STORIES as CURATED_STORIES } from "../lib/content";
import { ALL_STORIES, STORY_COUNT } from "../lib/stories-generated";

type LibraryStory = {
  id: string;
  title: string;
  scenario: string;
  primitives: string[];
  family: FamilyId;
  walkthrough: string;
  exampleYaml: string;
  curated?: boolean;
  sourceAgent?: string;
  dimensions?: string[];
};

const FAMILIES: FamilyId[] = [
  "STANDING",
  "ACTION",
  "DETECTION",
  "CONSENSUS",
  "CORRECTION",
];

function combinedLibrary(): LibraryStory[] {
  const curated: LibraryStory[] = CURATED_STORIES.map((s) => ({
    ...s,
    curated: true,
  }));
  const generated: LibraryStory[] = (ALL_STORIES as GeneratedStory[]).map(
    (s) => ({
      id: s.id,
      title: s.title,
      scenario: s.scenario,
      primitives: s.primitives,
      family: s.family,
      walkthrough: s.walkthrough,
      exampleYaml: s.exampleYaml,
      sourceAgent: s.sourceAgent,
      dimensions: s.dimensions,
    }),
  );
  return [...curated, ...generated];
}

export default function StoriesLibrary() {
  const all = useMemo(combinedLibrary, []);
  const [family, setFamily] = useState<FamilyId | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const PAGE = 10;
  const [visible, setVisible] = useState(PAGE);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: all.length };
    for (const f of FAMILIES) c[f] = all.filter((s) => s.family === f).length;
    return c;
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((s) => {
      if (family !== "ALL" && s.family !== family) return false;
      if (!q) return true;
      if (s.title.toLowerCase().includes(q)) return true;
      if (s.scenario.toLowerCase().includes(q)) return true;
      if (s.walkthrough.toLowerCase().includes(q)) return true;
      for (const p of s.primitives) {
        if (p.toLowerCase().includes(q)) return true;
      }
      return false;
    });
  }, [all, family, query]);

  // Collapse back to the first page whenever the filter or search changes,
  // so a fresh query never inherits a previously-expanded long list.
  useEffect(() => {
    setVisible(PAGE);
  }, [family, query]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  return (
    <section id="stories" className="space-y-5">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Story library
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          {STORY_COUNT + CURATED_STORIES.length} worked stories. Sci-fi
          children&rsquo;s grammar primer for adults, every prefix family
          covered at least twice. Filter by family or search for a primitive
          or phrase.
        </p>
      </header>

      {/* Filters */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFamily("ALL")}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
              family === "ALL"
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-slate-300 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            }`}
          >
            All ({counts.ALL})
          </button>
          {FAMILIES.map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                family === f
                  ? "border-brand-primary text-white"
                  : "border-slate-300 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              }`}
              style={
                family === f
                  ? { background: FAMILY_COLOR[f], borderColor: FAMILY_COLOR[f] }
                  : undefined
              }
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: FAMILY_COLOR[f] }}
              />
              {FAMILY_LABEL[f]} ({counts[f] ?? 0})
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by primitive, title, or phrase…"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-slate-500"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {shown.length} of {filtered.length} matching ({all.length}{" "}
          total). Filter or search to narrow the list.
        </p>
      </div>

      {/* Stories list */}
      <div className="space-y-3">
        {shown.map((s, i) => (
          <details
            key={s.id}
            id={`story-${s.id}`}
            className="rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <summary className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800/40">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ background: FAMILY_COLOR[s.family] }}
                >
                  {FAMILY_LABEL[s.family]}
                </span>
                {s.curated && (
                  <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                    Worked example
                  </span>
                )}
                <span className="text-[10px] font-mono text-slate-400">
                  #{i + 1}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </span>
              </div>
            </summary>
            <div className="space-y-3 border-t border-slate-200 px-4 pb-4 pt-3 dark:border-gray-700">
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong>Scenario:</strong> {s.scenario}
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong>Walkthrough:</strong> {s.walkthrough}
              </p>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Primitives
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
        {filtered.length === 0 && (
          <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-gray-700 dark:text-slate-400">
            No stories match this filter. Try clearing the search or picking
            a different family.
          </p>
        )}
        {remaining > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setVisible((v) => v + PAGE)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              Show {Math.min(PAGE, remaining)} more
            </button>
            <button
              onClick={() => setVisible(filtered.length)}
              className="text-sm font-medium text-slate-500 hover:text-brand-primary dark:text-slate-400"
            >
              Show all {filtered.length}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
