"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { IconLink } from "@tabler/icons-react";
import type {
  Batch,
  Chapter,
  Seed,
  RegulatoryAttestation,
  Dimension,
} from "../lib/shared";

const RESPONSE_RAW =
  "https://raw.githubusercontent.com/CIRISAI/ciris-response-magnifica-humanitas/main";
const RESPONSE_BLOB =
  "https://github.com/CIRISAI/ciris-response-magnifica-humanitas/blob/main";

// Extract the leading citation token from a heading. Examples that should match:
//   "§131 — Chapter 4 programmatic frame" → "§131"
//   "§§197-198 LAWS prohibition" → "§§197-198"
//   "Ch4 §0.a Wellbeing" → "Ch4 §0.a"
//   "§1.2 Technical robustness" → "§1.2 Technical robustness"
//   "Annex A" / "§B.3" / "§E.001" → the leading token
function extractCitationToken(headingText: string): string | null {
  const cleaned = headingText.trim();
  // Drop trailing "— ..." or " - ..."
  const m = cleaned.match(/^([^—–-]+)/);
  return m ? m[1].trim() : null;
}

// Given a citation token, find dimensions whose regulatory_attestations[]
// reference this batch with a citation that starts with the token. We
// only match against the user's currently-selected batch.
function findCrossReferences(
  seed: Seed,
  batchId: Batch["id"],
  citationToken: string,
): { dimension: Dimension; attestation: RegulatoryAttestation }[] {
  const normalized = citationToken.toLowerCase().replace(/\s+/g, " ").trim();
  const hits: { dimension: Dimension; attestation: RegulatoryAttestation }[] =
    [];
  for (const d of seed.dimensions) {
    for (const a of d.regulatory_attestations) {
      if (a.batch_id !== batchId) continue;
      const cit = a.citation.toLowerCase().replace(/\s+/g, " ").trim();
      // exact, startsWith, or includes — citations vary in tokenisation
      if (
        cit === normalized ||
        cit.startsWith(normalized) ||
        normalized.startsWith(cit) ||
        cit.includes(normalized)
      ) {
        hits.push({ dimension: d, attestation: a });
        break;
      }
    }
  }
  return hits;
}

export default function ChapterReader({
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
  const [raw, setRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `${RESPONSE_RAW}/${chapter.file}`;
  const blobUrl = `${RESPONSE_BLOB}/${chapter.file}`;

  useEffect(() => {
    const controller = new AbortController();
    setRaw(null);
    setError(null);
    setLoading(true);
    fetch(url, { signal: controller.signal })
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
  }, [url]);

  // Citations available in seed for this batch (used to determine which
  // headings get a clickable cross-ref affordance).
  const seedCitations = useMemo(() => {
    const set = new Set<string>();
    for (const d of seed.dimensions) {
      for (const a of d.regulatory_attestations) {
        if (a.batch_id === batch.id) {
          set.add(a.citation.toLowerCase().replace(/\s+/g, " ").trim());
        }
      }
    }
    return set;
  }, [seed, batch.id]);

  const components: Components = useMemo(
    () => ({
      h1: ({ children }) => (
        <h1 className="mt-6 mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => {
        const text =
          typeof children === "string"
            ? children
            : Array.isArray(children)
              ? children
                  .map((c) => (typeof c === "string" ? c : ""))
                  .join("")
              : "";
        const token = extractCitationToken(text);
        const normalized = token?.toLowerCase().replace(/\s+/g, " ").trim();
        const hasSeedHit = normalized
          ? Array.from(seedCitations).some(
              (c) =>
                c === normalized ||
                c.startsWith(normalized) ||
                normalized.startsWith(c) ||
                c.includes(normalized),
            )
          : false;
        const hits = token ? findCrossReferences(seed, batch.id, token) : [];
        return (
          <h2 className="group mt-8 mb-3 flex flex-wrap items-baseline gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <span>{children}</span>
            {hasSeedHit && hits.length > 0 && (
              <button
                onClick={() => onPickCitation(token!, text)}
                className="rounded-full border border-brand-primary/40 bg-brand-primary/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-primary opacity-70 transition hover:opacity-100"
                title={`Show CIRIS semantics for ${token}`}
              >
                <span className="inline-flex items-center gap-1">
                  <IconLink className="h-3 w-3" />
                  cross-references ({hits.length})
                </span>
              </button>
            )}
          </h2>
        );
      },
      h3: ({ children }) => (
        <h3 className="mt-5 mb-2 text-base font-semibold text-slate-900 dark:text-white">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="my-3 leading-7 text-slate-700 dark:text-slate-300">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="my-3 ml-5 list-disc space-y-1 text-slate-700 dark:text-slate-300">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="my-3 ml-5 list-decimal space-y-1 text-slate-700 dark:text-slate-300">
          {children}
        </ol>
      ),
      li: ({ children }) => <li className="leading-7">{children}</li>,
      blockquote: ({ children }) => (
        <blockquote className="my-3 border-l-4 border-brand-primary/40 bg-brand-primary/5 px-3 py-1 italic text-slate-700 dark:text-slate-300">
          {children}
        </blockquote>
      ),
      hr: () => <hr className="my-6 border-slate-200 dark:border-gray-700" />,
      strong: ({ children }) => (
        <strong className="font-semibold text-slate-900 dark:text-white">
          {children}
        </strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      a: ({ href, children }) => {
        const external = href?.startsWith("http") ?? false;
        return (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:bg-brand-primary/10"
          >
            {children}
          </a>
        );
      },
      code: ({ className, children, ...props }) => {
        if (className && className.startsWith("language-")) {
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
        return (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800 dark:bg-gray-800 dark:text-slate-200">
            {children}
          </code>
        );
      },
      pre: ({ children }) => (
        <pre className="my-3 overflow-x-auto rounded-md bg-slate-50 p-3 text-[11px] leading-5 text-slate-900 dark:bg-gray-900/40 dark:text-slate-100">
          {children}
        </pre>
      ),
    }),
    [seed, batch.id, seedCitations, onPickCitation],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/40">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {batch.short} · {chapter.label}
          </p>
          <p className="truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">
            ciris-response-magnifica-humanitas/{chapter.file}
          </p>
        </div>
        <a
          href={blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          GitHub →
        </a>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-6">
        {loading && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading {chapter.file}…
          </p>
        )}
        {error && (
          <p className="text-sm text-red-700 dark:text-red-300">
            Failed to load: {error}.{" "}
            <a
              href={blobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline"
            >
              Open on GitHub →
            </a>
          </p>
        )}
        {raw && (
          <div className="text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {raw}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
}
