// Server component, renders the fractal-self reading discipline from CEG
// 0.1 README.md ("How to read this spec without Cartesian default") + primer
// §0.5. Renders as a notes section near the bottom; the page is not built
// around this idea, but spec readers coming from PGP / X.509 will want it.

import { REGISTRY_BLOB, CEG_CHAPTER } from "../lib/shared";

export default function FractalSelfCallout() {
  return (
    <section
      id="fractal-self"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
          Notes for spec readers · the most common misread
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Self is self, fractally
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Readers arriving from PGP / X.509 / atomic-principal cryptographic
          identity work tend to read &ldquo;self-attestation&rdquo; the way
          those systems mean it. CEG means something different. Quick orientation:
        </p>
      </header>

      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
        <p>
          At every scale CEG operates on, key, occurrence, agent, fleet,
          cell, federation, biosphere,{" "}
          <strong>
            &ldquo;self&rdquo; means the already-relationally-constituted
            entity speaking at that scale
          </strong>
          . The cross-attestations that constituted the entity are upstream
          of the moment it speaks; when it then emits a self-attestation
          (the envelope&rsquo;s{" "}
          <code className="rounded bg-white px-1 font-mono text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            witness_relation: self
          </code>
          , declares its own{" "}
          <code className="rounded bg-white px-1 font-mono text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            confidence
          </code>
          , reports its own{" "}
          <code className="rounded bg-white px-1 font-mono text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            occurrence_id
          </code>
          , names its own{" "}
          <code className="rounded bg-white px-1 font-mono text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            hardware_class
          </code>
          , signs{" "}
          <code className="rounded bg-white px-1 font-mono text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            accord:lifecycle:active
          </code>
          ), that is{" "}
          <strong>the relational composition speaking AS itself</strong>, not
          a Cartesian atom asserting pre-relational identity.
        </p>
        <p>
          The substrate cannot require cross-attestation as a precondition
          for self-attestation because the cross-attestations are what
          constitute the self in the first place. They are upstream, not
          downstream gates. The fractal nesting is the point.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          <strong>The common misread to avoid:</strong> a reader importing
          Cartesian-individualist defaults from PGP / X.509 / DID
          atomic-principal frames will see{" "}
          <code className="rounded bg-white px-1 font-mono text-[11px] text-slate-800 dark:bg-gray-900 dark:text-slate-200">
            witness_relation: self
          </code>{" "}
          and think &ldquo;a lone principal is asserting its own state;
          surely the substrate should require cross-attestation before
          admitting.&rdquo; That reading is wrong. If you find yourself
          thinking the spec should add a cross-attestation gate before
          admitting this self-attestation,{" "}
          <strong>pause</strong>, cross-attestation already happened
          upstream; the self-attestation is its downstream voice.
        </p>
      </div>

      <p className="mt-4 text-[11px] text-slate-600 dark:text-slate-300">
        Canonical source:{" "}
        <a
          href={`${REGISTRY_BLOB}/${CEG_CHAPTER.namespace.replace(/\/[^/]+$/, "/README.md")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:underline"
        >
          CEG README, &ldquo;How to read this spec without Cartesian default&rdquo;
        </a>{" "}
        ·{" "}
        <a
          href={`${REGISTRY_BLOB}/${CEG_CHAPTER.foundation}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:underline"
        >
          §1 Foundation
        </a>
      </p>
    </section>
  );
}

// Used by other components to mark surfaces that invite the Cartesian
// misread (per CEG primer §0.5). Renders a small inline badge that links to
// the callout.
export function FractalSelfBadge({ context }: { context?: string }) {
  return (
    <a
      href="#fractal-self"
      title={
        context
          ? `Fractal self: ${context}`
          : "Fractal self: the relational composition speaking AS itself at this scale"
      }
      className="inline-flex items-center gap-1 rounded-full border border-brand-primary/40 bg-brand-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary hover:bg-brand-primary/10"
    >
      <svg
        viewBox="0 0 12 12"
        className="h-2.5 w-2.5"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="1.5" />
        <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      Fractal self
    </a>
  );
}
