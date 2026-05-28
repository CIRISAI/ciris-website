"use client";

import { useEffect, useRef, useState } from "react";
import type { Batch, Chapter, Seed } from "../lib/shared";
import { SOURCE_URL } from "../lib/shared";

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

function authoritativeUrlFor(
  batch: Batch,
): { label: string; href: string } | null {
  const url = SOURCE_URL[batch.id];
  if (!url) return null;
  if (url.html) return { label: "Official source", href: url.html };
  if (url.pdf) return { label: "Official PDF", href: url.pdf };
  return null;
}

export default function SourceChapterView({
  batch,
  chapter,
  onPickParagraph,
}: {
  batch: Batch;
  chapter: Chapter;
  seed: Seed; // accepted for parity with the prior signature; unused here
  onPickCitation?: (citation: string, headingText: string) => void;
  onPickParagraph: (citation: string) => void;
}) {
  const { url, kind, isFullDocument } = sourcePathFor(batch, chapter);
  const auth = authoritativeUrlFor(batch);

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const htmlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setContent(null);
    setError(null);
    setLoading(true);
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

  // For MH HTML slices, strip the outer <html>/<head>/<body> wrapping.
  const bodyHtml = (() => {
    if (kind !== "html" || !content) return "";
    const m = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return m ? m[1] : content;
  })();

  // After MH HTML mounts, walk numbered <p class="MsoNormal">N. paragraphs
  // and inject a small "§N analysis →" affordance into each one. Click fires
  // onPickParagraph with the §N citation.
  useEffect(() => {
    if (kind !== "html") return;
    const root = htmlRef.current;
    if (!root || !content) return;
    const paragraphs = root.querySelectorAll<HTMLParagraphElement>(
      "p.MsoNormal",
    );
    const attachedButtons: HTMLButtonElement[] = [];
    paragraphs.forEach((p) => {
      // Skip if we've already attached an affordance during a previous
      // render in this mount.
      if (p.dataset.cegParagraphAttached === "1") return;
      const text = (p.textContent ?? "").trim();
      const match = text.match(/^(\d{1,4})\.\s/);
      if (!match) return;
      const n = match[1];
      const citation = `§${n}`;

      // Mark paragraph so we don't double-attach.
      p.dataset.cegParagraphAttached = "1";
      p.classList.add("ceg-source-paragraph");
      p.id = `p${n}`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ceg-analysis-trigger";
      btn.setAttribute("data-citation", citation);
      btn.setAttribute("aria-label", `Open CIRIS analysis for ${citation}`);
      btn.title = `Open CIRIS analysis for ${citation}`;
      btn.innerHTML = `<span class="ceg-analysis-label">${citation}</span><span class="ceg-analysis-arrow" aria-hidden="true">→</span>`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        onPickParagraph(citation);
      });
      p.appendChild(btn);
      attachedButtons.push(btn);
    });
    return () => {
      attachedButtons.forEach((b) => b.remove());
      paragraphs.forEach((p) => {
        if (p.dataset.cegParagraphAttached === "1") {
          delete p.dataset.cegParagraphAttached;
          p.classList.remove("ceg-source-paragraph");
        }
      });
    };
  }, [content, kind, onPickParagraph]);

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
        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          {auth && (
            <a
              href={auth.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              {auth.label} →
            </a>
          )}
          {kind === "html" && (
            <span className="text-slate-500 dark:text-slate-400">
              Click any <span className="font-semibold">§N</span> link to
              the right of a paragraph to open the CIRIS analysis in the
              detail panel.
            </span>
          )}
          {isFullDocument && (
            <span className="text-slate-500 dark:text-slate-400">
              Full document below. Use the in-browser find (Cmd/Ctrl-F) to
              locate this chapter, then use the chapter-analysis button
              for the CIRIS view.
            </span>
          )}
        </p>
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
            ref={htmlRef}
            className="ceg-source-html max-h-[70vh] overflow-y-auto px-5 py-6 text-[15px] leading-7 text-slate-800 dark:text-slate-200"
            // Source HTML is fair-use republication from public-domain papal
            // text; only the chapter slice was extracted, no scripts.
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
        {content && kind === "text" && (
          <pre className="ceg-source-text max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words px-5 py-6 font-serif text-[14px] leading-7 text-slate-800 dark:text-slate-200">
            {content}
          </pre>
        )}
      </article>

      {/* For non-MH batches (no per-paragraph anchors), expose a single
          chapter-level analysis button that opens the chapter's anchor
          citation in the detail panel. We use "chapter:{stem}" as a synthetic
          citation; ParagraphDetail falls back gracefully when no seed match
          exists. */}
      {kind === "text" && (
        <button
          onClick={() =>
            onPickParagraph(
              chapter.file
                .replace(/^CONTRIBUTION_OBJECTS_/, "")
                .replace(/\.md$/, ""),
            )
          }
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left hover:border-brand-primary hover:bg-slate-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/40"
        >
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Open chapter-level CIRIS analysis →
          </span>
        </button>
      )}
    </div>
  );
}
