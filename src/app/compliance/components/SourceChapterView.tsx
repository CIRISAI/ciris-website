"use client";

import { useEffect, useState } from "react";
import type { Batch, Chapter, Seed } from "../lib/shared";
import { SOURCE_URL } from "../lib/shared";
import ChapterReader from "./ChapterReader";

// MH ships per-chapter HTML slices under
// /source-materials/magnifica_humanitas_v1/{stem}.html (built by
// scripts/slice_source_materials.js). Other batches ship a single full-text
// document; chapter selection navigates within that document.

function sourcePathFor(batch: Batch, chapter: Chapter): {
  url: string;
  kind: "html" | "text";
  isFullDocument: boolean;
} {
  if (batch.id === "magnifica_humanitas_v1") {
    const stem = chapter.file
      .replace(/^CONTRIBUTION_OBJECTS_v1\.4_/, "")
      .replace(/\.md$/, "");
    return {
      url: `/source-materials/magnifica_humanitas_v1/${stem}.html`,
      kind: "html",
      isFullDocument: false,
    };
  }
  return {
    url: `/source-materials/${batch.id}.txt`,
    kind: "text",
    isFullDocument: true,
  };
}

function authoritativeUrlFor(batch: Batch): { label: string; href: string } | null {
  const url = SOURCE_URL[batch.id];
  if (!url) return null;
  if (url.html) return { label: "Official source", href: url.html };
  if (url.pdf) return { label: "Official PDF", href: url.pdf };
  return null;
}

export default function SourceChapterView({
  batch,
  chapter,
  seed,
  onPickCitation,
}: {
  batch: Batch;
  chapter: Chapter;
  seed: Seed;
  onPickCitation: (citation: string, headingText: string) => void;
}) {
  const { url, kind, isFullDocument } = sourcePathFor(batch, chapter);
  const auth = authoritativeUrlFor(batch);

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setContent(null);
    setError(null);
    setLoading(true);
    setShowAnalysis(false);
    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if ((e as { name?: string })?.name === "AbortError") return;
        setError(String(e));
        setLoading(false);
      });
    return () => controller.abort();
  }, [url]);

  // For MH HTML slices, strip the outer <html>/<head>/<body> wrapping and
  // extract just the body innerHTML for inline rendering.
  const bodyHtml = (() => {
    if (kind !== "html" || !content) return "";
    const m = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return m ? m[1] : content;
  })();

  return (
    <div className="space-y-4">
      {/* Header with source link */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Source work
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
          {batch.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
          {chapter.label}
        </p>
        {auth && (
          <p className="mt-2 text-xs">
            <a
              href={auth.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              {auth.label} →
            </a>
            {isFullDocument && (
              <span className="ml-2 text-slate-500 dark:text-slate-400">
                Full document below. Use the in-browser find (Cmd/Ctrl-F)
                to locate this chapter.
              </span>
            )}
          </p>
        )}
      </div>

      {/* Source content — primary view */}
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {loading && (
          <p className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">
            Loading source text…
          </p>
        )}
        {error && (
          <p className="px-5 py-6 text-sm text-red-700 dark:text-red-300">
            Could not load source: {error}.{" "}
            {auth && (
              <a
                href={auth.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline"
              >
                Read on the publisher&rsquo;s site →
              </a>
            )}
          </p>
        )}
        {content && kind === "html" && (
          <div
            className="ceg-source-html max-h-[70vh] overflow-y-auto px-5 py-6 text-[15px] leading-7 text-slate-800 dark:text-slate-200"
            // Source HTML is fair-use republication from public-domain papal
            // text; only the chapter slice was extracted, no JS or scripts.
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
        {content && kind === "text" && (
          <pre className="ceg-source-text max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words px-5 py-6 font-serif text-[14px] leading-7 text-slate-800 dark:text-slate-200">
            {content}
          </pre>
        )}
      </article>

      {/* Analysis toggle */}
      <div className="rounded-lg border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <button
          onClick={() => setShowAnalysis((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-gray-800/40"
        >
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            CIRIS wire-envelope analysis (CONTRIBUTION_OBJECTS)
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {showAnalysis ? "Hide" : "Show"}
          </span>
        </button>
        {showAnalysis && (
          <div className="border-t border-slate-200 px-4 py-4 dark:border-gray-700">
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              The wire-envelope translation of this chapter into CEG. Each
              ## §N heading marks one source paragraph; the YAML block below
              is the structured Contribution. Section headings with a
              matching CIRIS dimension show a cross-references button.
            </p>
            <ChapterReader
              batch={batch}
              chapter={chapter}
              seed={seed}
              onPickCitation={onPickCitation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
