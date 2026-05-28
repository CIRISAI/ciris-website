"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  Batch,
  Chapter,
  Dimension,
  RegulatoryAttestation,
  Seed,
} from "../lib/shared";

const RESPONSE_RAW =
  "https://raw.githubusercontent.com/CIRISAI/ciris-response-magnifica-humanitas/main";
const RESPONSE_BLOB =
  "https://github.com/CIRISAI/ciris-response-magnifica-humanitas/blob/main";

const ACCORD_LABEL: Record<string, string> = {
  beneficence: "Beneficence",
  non_maleficence: "Non-maleficence",
  integrity: "Integrity",
  fidelity: "Fidelity",
  autonomy: "Autonomy",
  justice: "Justice",
};

// Pull the `## §N — title` section that matches a citation token from the
// chapter's CONTRIBUTION_OBJECTS markdown. Returns the title line + the body
// up to (but not including) the next `## ` heading.
function extractSection(
  markdown: string,
  citation: string,
): { title: string; body: string } | null {
  const normalized = citation.trim();
  const lines = markdown.split("\n");
  let startIdx = -1;
  let title = "";
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!/^##\s+/.test(l)) continue;
    const headingText = l.replace(/^##\s+/, "").trim();
    // Citation comes at the head of the heading text, e.g. "§131 — ..."
    // Match prefix loosely (citation may appear as "§17", "§§17-18", "§1.2",
    // "Ch4 §0.a").
    if (
      headingText.startsWith(normalized) ||
      headingText.toLowerCase().startsWith(normalized.toLowerCase())
    ) {
      startIdx = i;
      title = headingText;
      break;
    }
  }
  if (startIdx === -1) return null;
  let endIdx = lines.length;
  for (let j = startIdx + 1; j < lines.length; j++) {
    if (/^##\s+/.test(lines[j])) {
      endIdx = j;
      break;
    }
  }
  return {
    title,
    body: lines.slice(startIdx + 1, endIdx).join("\n").trim(),
  };
}

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

const MARKDOWN_COMPONENTS: Components = {
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 text-sm font-semibold text-slate-900 dark:text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 ml-4 list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-6">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-4 border-brand-primary/40 bg-brand-primary/5 px-3 py-1 italic text-sm text-slate-700 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    if (className && className.startsWith("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800 dark:bg-gray-800 dark:text-slate-200">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-md bg-slate-50 p-3 text-[11px] leading-5 text-slate-800 dark:bg-gray-900/40 dark:text-slate-100">
      {children}
    </pre>
  ),
};

export default function ParagraphDetail({
  batch,
  chapter,
  citation,
  seed,
  onJumpToDimension,
}: {
  batch: Batch;
  chapter: Chapter;
  citation: string;
  seed: Seed;
  onJumpToDimension: (id: string) => void;
}) {
  const url = `${RESPONSE_RAW}/${chapter.file}`;
  const [raw, setRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const section = useMemo(
    () => (raw ? extractSection(raw, citation) : null),
    [raw, citation],
  );

  const crossRefs = useMemo(
    () => findCrossReferences(seed, batch.id, citation),
    [seed, batch.id, citation],
  );
  const batchById = new Map(seed.batches.map((b) => [b.id, b]));
  const agentBlob = "https://github.com/CIRISAI/CIRISAgent/blob/main";

  return (
    <div className="space-y-4">
      {/* Citation header */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {batch.short} · {chapter.label}
        </p>
        <p className="mt-0.5 break-all font-mono text-sm font-semibold text-slate-900 dark:text-white">
          {citation}
        </p>
      </div>

      {/* Wire-envelope analysis */}
      <section>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
          CIRIS wire-envelope analysis
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          {loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loading paragraph analysis…
            </p>
          )}
          {error && (
            <p className="text-xs text-red-700 dark:text-red-300">
              Could not load: {error}
            </p>
          )}
          {!loading && !error && raw && !section && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No analysis found for citation <code>{citation}</code> in{" "}
              <a
                href={`${RESPONSE_BLOB}/${chapter.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline"
              >
                {chapter.file}
              </a>
              .
            </p>
          )}
          {section && (
            <>
              <p className="mb-2 text-xs font-semibold text-slate-900 dark:text-white">
                {section.title}
              </p>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MARKDOWN_COMPONENTS}
              >
                {section.body}
              </ReactMarkdown>
            </>
          )}
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            Source:{" "}
            <a
              href={`${RESPONSE_BLOB}/${chapter.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              {chapter.file} →
            </a>
          </p>
        </div>
      </section>

      {/* CIRIS dimensions + parallel attestations */}
      {crossRefs.length > 0 && (
        <section>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            CIRIS dimensions this paragraph anchors ({crossRefs.length})
          </p>
          <div className="space-y-3">
            {crossRefs.map(({ dimension, attestation }) => {
              const others = dimension.regulatory_attestations.filter(
                (a) => a.batch_id !== batch.id,
              );
              const controlPath = `compliance/${dimension.id}_${dimension.prefix
                .replace(/:\*$/, "")
                .replace(/[^a-zA-Z0-9]+/g, "_")
                .toLowerCase()}.md`;
              return (
                <div
                  key={dimension.id}
                  className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        dimension.tier === "STRONG-4"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {dimension.tier}
                    </span>
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                      {ACCORD_LABEL[dimension.accord_principle] ??
                        dimension.accord_principle}
                    </span>
                  </div>
                  <button
                    onClick={() => onJumpToDimension(dimension.id)}
                    className="break-all text-left font-mono text-sm font-semibold text-brand-primary hover:underline"
                    title={dimension.gloss}
                  >
                    {dimension.prefix}
                  </button>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {dimension.gloss}
                  </p>
                  <p className="mt-2 break-all rounded bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-800 dark:bg-gray-900/40 dark:text-slate-200">
                    Wire form: {attestation.wire_form}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onJumpToDimension(dimension.id)}
                      className="rounded-md border-2 border-brand-primary bg-brand-primary/5 px-2.5 py-1 text-[11px] font-semibold text-brand-primary hover:bg-brand-primary/10"
                    >
                      Open dimension →
                    </button>
                    <a
                      href={`${agentBlob}/${controlPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                    >
                      Control on GitHub →
                    </a>
                  </div>
                  {others.length > 0 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                        Parallel attestations ({others.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {others.map((a) => {
                          const ob = batchById.get(a.batch_id);
                          return (
                            <div
                              key={a.batch_id}
                              className="rounded border border-slate-200 bg-slate-50 p-2 dark:border-gray-700 dark:bg-gray-900/40"
                            >
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="rounded bg-brand-primary/10 px-1 py-0.5 text-[10px] font-bold text-brand-primary">
                                  {ob?.short ?? a.batch_id}
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                                  {a.citation}
                                </span>
                              </div>
                              <blockquote className="mt-1 border-l-2 border-brand-primary/30 pl-2 text-xs italic leading-5 text-slate-700 dark:text-slate-300">
                                &ldquo;{a.language}&rdquo;
                              </blockquote>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      {crossRefs.length === 0 && section && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This paragraph is not a seed-anchored CIRIS dimension citation. (The
          seed flags the canonical anchor citations, not every paragraph in
          the source.)
        </p>
      )}
    </div>
  );
}
