"use client";

import { useEffect, useMemo, useState } from "react";
import MarkdownView from "./MarkdownView";
import { dimensionFilename } from "../lib/shared";

const AGENT_RAW =
  "https://raw.githubusercontent.com/CIRISAI/CIRISAgent/main";
const AGENT_BLOB = "https://github.com/CIRISAI/CIRISAgent/blob/main";

function splitOnHumanFences(text: string): { meta: string; body: string } {
  const beginIdx = text.indexOf("<!-- BEGIN HUMAN -->");
  const endIdx = text.indexOf("<!-- END HUMAN -->");
  if (beginIdx === -1 || endIdx === -1) {
    return { meta: "", body: text };
  }
  const meta = text
    .slice(0, beginIdx)
    .replace(/\n*---\n*$/, "")
    .trim();
  const body = text
    .slice(beginIdx + "<!-- BEGIN HUMAN -->".length, endIdx)
    .trim();
  return { meta, body };
}

export default function DimensionDoc({
  dimensionId,
}: {
  dimensionId: string;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMeta, setShowMeta] = useState(false);

  const filename = dimensionFilename(dimensionId);
  const filePath = `compliance/${filename}`;
  const rawUrl = `${AGENT_RAW}/${filePath}`;
  const blobUrl = `${AGENT_BLOB}/${filePath}`;

  useEffect(() => {
    const controller = new AbortController();
    setRaw(null);
    setError(null);
    setLoading(true);
    setShowMeta(false);
    fetch(rawUrl, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        setRaw(text);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if ((e as { name?: string })?.name === "AbortError") return;
        setError(String(e));
        setLoading(false);
      });
    return () => controller.abort();
  }, [rawUrl]);

  const { meta, body } = useMemo(
    () => (raw ? splitOnHumanFences(raw) : { meta: "", body: "" }),
    [raw],
  );

  if (loading) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Loading {filename} from GitHub…
      </p>
    );
  }
  if (error || !raw) {
    return (
      <p className="text-sm text-red-700 dark:text-red-300">
        Failed to load {filename}: {error ?? "no content"}.{" "}
        <a
          href={blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary underline"
        >
          Open on GitHub →
        </a>
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Source link */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 break-all">
          CIRISAgent/{filePath}
        </p>
        <div className="flex gap-2 text-xs">
          <a
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-2 py-0.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            GitHub →
          </a>
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-2 py-0.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
          >
            Raw
          </a>
        </div>
      </div>

      {/* HUMAN section as primary content */}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-6">
        <MarkdownView source={body} />
      </article>

      {/* Auto-rendered metadata expandable */}
      {meta && (
        <details
          className="rounded-md border border-slate-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900/40"
          open={showMeta}
          onToggle={(e) => setShowMeta((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-brand-primary dark:text-slate-300">
            Seed-rendered metadata (auto-generated from SEED_DIMENSIONS.yaml)
          </summary>
          <div className="border-t border-slate-200 px-4 py-3 dark:border-gray-700">
            <MarkdownView source={meta} />
          </div>
        </details>
      )}
    </div>
  );
}
