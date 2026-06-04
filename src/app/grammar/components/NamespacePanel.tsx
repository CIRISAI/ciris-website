// Server component — renders all §3 prefix families grouped by component,
// with per-component expandable details and per-prefix metadata.

import Link from "next/link";
import type { RegistrySource, PrefixRow } from "../lib/shared";
import {
  COMPONENT_ORDER,
  COMPONENT_REPO,
  COMPONENT_TAGLINE,
  FAMILY_COLOR,
  FAMILY_LABEL,
  REGISTRY_BLOB,
  CEG_CHAPTER,
} from "../lib/shared";
import { FractalSelfBadge } from "./FractalSelfCallout";

// Prefixes that the spec marks as self-attestation surfaces inviting the
// Cartesian misread (per CEG primer §0.5).
function isFractalSelfPrefix(prefix: string): string | null {
  // hardware_class — key-bearing entity reports provenance from within
  // existing cross-attestations of that key.
  if (/^hardware_(class|custody)/.test(prefix)) {
    return "The key-bearing entity reports its own hardware provenance from within the substrate's cross-attestations of that key.";
  }
  // accord:lifecycle:active — accord-holder self-attests at the
  // already-constituted humanity→triple→individual scale.
  if (/^accord:/.test(prefix)) {
    return "The accord-holder speaking from within the relational constitution humanity → triple → individual.";
  }
  // attestation:l1:self_verify — the binary speaking from within the
  // already-constituted CIRISVerify deployment.
  if (/^attestation:l1:self_verify/.test(prefix)) {
    return "The CIRISVerify binary speaking from within its already-constituted deployment.";
  }
  return null;
}

function PrefixRowDisplay({ row }: { row: PrefixRow }) {
  const fsdLink = `${REGISTRY_BLOB}/${CEG_CHAPTER.namespace}#${row.section.replace(/\./g, "")}`;
  return (
    <li className="rounded-md border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-900 dark:bg-gray-800 dark:text-slate-100">
          {row.prefix}
        </code>
        {row.family && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
            style={{ background: FAMILY_COLOR[row.family] }}
          >
            {FAMILY_LABEL[row.family]}
          </span>
        )}
        {row.polarity && (
          <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 dark:bg-gray-800 dark:text-slate-300">
            {row.polarity}
          </span>
        )}
        {(() => {
          const ctx = isFractalSelfPrefix(row.prefix);
          return ctx ? <FractalSelfBadge context={ctx} /> : null;
        })()}
      </div>
      <p
        className="text-xs leading-5 text-slate-700 dark:text-slate-300"
        // Description is pre-rendered markdown-ish; safe-ish (no user input)
        // — strip leading backticks if present.
      >
        {row.description}
      </p>
      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
        <a
          href={fsdLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:underline"
        >
          §{row.section}
        </a>
        {row.citation && (
          <>
            {" · "}
            <span className="italic">{row.citation}</span>
          </>
        )}
      </p>
    </li>
  );
}

export default function NamespacePanel({
  source,
}: {
  source: RegistrySource;
}) {
  // Order by COMPONENT_ORDER. Some components may have no subsections (yet).
  const byComponent = new Map(
    source.namespace.map((ns) => [ns.component, ns]),
  );

  return (
    <section id="namespace" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          The {source.totalPrefixes} prefix families, by owning component
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Auto-parsed from{" "}
          <a
            href={`${REGISTRY_BLOB}/${CEG_CHAPTER.namespace}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            {source.specVersion} §5
          </a>{" "}
          (commit {source.commitShaShort}). The namespace is open-extensible
          — new prefix families can be added via §11.2 amendment.
        </p>
      </header>

      <div className="space-y-3">
        {COMPONENT_ORDER.map((component) => {
          const ns = byComponent.get(component);
          const repoUrl = COMPONENT_REPO[component];
          const subsections = ns?.subsections ?? [];
          const totalRows = subsections.reduce((s, sub) => s + sub.rows.length, 0);
          return (
            <details
              key={component}
              id={`component-${component.toLowerCase()}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-gray-800 dark:bg-gray-900/40"
            >
              <summary className="cursor-pointer rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-gray-900/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {component}
                    </span>{" "}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {COMPONENT_TAGLINE[component]}
                    </span>
                  </div>
                  <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-brand-primary">
                    {totalRows} prefixes
                  </span>
                </div>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 dark:border-gray-700">
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                  Repo:{" "}
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    {repoUrl.replace("https://github.com/", "")}
                  </a>
                </p>
                {subsections.length === 0 ? (
                  <p className="text-xs italic text-slate-500 dark:text-slate-400">
                    No prefix tables parsed for this component in the current
                    spec cut.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {subsections.map((sub) => (
                      <div key={sub.section}>
                        <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            §{sub.section}
                          </span>{" "}
                          {sub.title}
                        </h4>
                        <ul className="grid gap-2 lg:grid-cols-2">
                          {sub.rows.map((row) => (
                            <PrefixRowDisplay
                              key={`${row.prefix}-${row.section}`}
                              row={row}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
