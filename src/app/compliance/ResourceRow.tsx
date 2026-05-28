"use client";

import { useEffect, useState } from "react";

export type RenderKind = "json" | "text" | "markdown" | "yaml";

export type ResourceRepo = "response" | "agent";

const REPOS = {
  response: {
    blob: "https://github.com/CIRISAI/ciris-response-magnifica-humanitas/blob/main",
    raw: "https://raw.githubusercontent.com/CIRISAI/ciris-response-magnifica-humanitas/main",
    issues:
      "https://github.com/CIRISAI/ciris-response-magnifica-humanitas/issues/new",
    short: "ciris-response-magnifica-humanitas",
  },
  agent: {
    blob: "https://github.com/CIRISAI/CIRISAgent/blob/main",
    raw: "https://raw.githubusercontent.com/CIRISAI/CIRISAgent/main",
    issues: "https://github.com/CIRISAI/CIRISAgent/issues/new",
    short: "CIRISAgent",
  },
};

function issueUrl(
  repo: ResourceRepo,
  resourceName: string,
  dimensionId: string,
  filePath: string,
) {
  const r = REPOS[repo];
  const title = `Edit proposal: ${resourceName} (${dimensionId})`;
  const body = [
    `**Resource:** [\`${filePath}\`](${r.blob}/${filePath})`,
    `**Dimension:** \`${dimensionId}\``,
    ``,
    `### Proposed change`,
    ``,
    `<!-- describe the proposed edit; quote the section you want to change -->`,
    ``,
    `### Rationale`,
    ``,
    `<!-- why this edit improves the resource -->`,
  ].join("\n");
  const labels =
    repo === "response" ? `compliance,${dimensionId}` : `compliance,${dimensionId}`;
  const params = new URLSearchParams({ title, body, labels });
  return `${r.issues}?${params.toString()}`;
}

function renderJsonTree(value: unknown, depth = 0): React.ReactElement {
  if (value === null) return <span className="text-slate-400">null</span>;
  if (typeof value === "boolean")
    return (
      <span className="text-purple-700 dark:text-purple-300">
        {String(value)}
      </span>
    );
  if (typeof value === "number")
    return <span className="text-blue-700 dark:text-blue-300">{value}</span>;
  if (typeof value === "string") {
    return (
      <span className="whitespace-pre-wrap text-emerald-700 dark:text-emerald-300">
        {JSON.stringify(value)}
      </span>
    );
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-400">[]</span>;
    return (
      <ul className="ml-4 list-none border-l border-slate-200 dark:border-gray-700 pl-3 space-y-1">
        {value.map((v, i) => (
          <li key={i}>
            <span className="text-slate-400 mr-1">{i}:</span>
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0)
      return <span className="text-slate-400">{"{}"}</span>;
    return (
      <ul className="ml-4 list-none border-l border-slate-200 dark:border-gray-700 pl-3 space-y-1">
        {entries.map(([k, v]) => (
          <li key={k}>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {k}:
            </span>{" "}
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  return <span>{String(value)}</span>;
}

function ContentBody({ kind, text }: { kind: RenderKind; text: string }) {
  if (kind === "json") {
    try {
      const parsed = JSON.parse(text);
      return <div className="text-xs font-mono">{renderJsonTree(parsed)}</div>;
    } catch {
      // fall through to text rendering
    }
  }
  return (
    <pre className="overflow-auto rounded-md bg-slate-50 p-3 text-xs text-slate-900 dark:bg-gray-900/40 dark:text-slate-100 whitespace-pre-wrap break-words max-h-[60vh]">
      {text}
    </pre>
  );
}

export default function ResourceRow({
  label,
  filePath,
  dimensionId,
  resourceName,
  kind,
  repo,
  caption,
}: {
  label: string;
  filePath: string;
  dimensionId: string;
  resourceName: string;
  kind: RenderKind;
  repo: ResourceRepo;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setContent(null);
    setError(null);
  }, [filePath]);

  const r = REPOS[repo];

  async function handleToggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (content) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${r.raw}/${filePath}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      setContent(text);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {label}
          </h3>
          <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400 break-all">
            {r.short}/{filePath}
          </p>
          {caption && (
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              {caption}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <button
          onClick={handleToggle}
          className="rounded-md border-2 border-brand-primary bg-brand-primary/5 px-2.5 py-1 font-semibold text-brand-primary hover:bg-brand-primary/10"
        >
          {open ? "Hide content" : "View inline"}
        </button>
        <a
          href={`${r.blob}/${filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          GitHub →
        </a>
        <a
          href={`${r.raw}/${filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          Raw
        </a>
        <a
          href={issueUrl(repo, resourceName, dimensionId, filePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          Propose edit (GitHub issue)
        </a>
      </div>
      {open && (
        <div className="mt-4">
          {loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loading from GitHub…
            </p>
          )}
          {error && (
            <p className="text-xs text-red-700 dark:text-red-300">
              Failed to load: {error}. Open the GitHub link directly.
            </p>
          )}
          {content && <ContentBody kind={kind} text={content} />}
        </div>
      )}
    </div>
  );
}
