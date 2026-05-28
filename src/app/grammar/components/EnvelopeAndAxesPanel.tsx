// Server component — the 8 envelope fields paired with the 8 reasoning axes.
// Cross-links between them per the primer.

import { ENVELOPE_FIELDS, REASONING_AXES } from "../lib/content";
import { FractalSelfBadge } from "./FractalSelfCallout";

// Surfaces that invite the Cartesian misread per CEG primer §0.5. Each gets
// a "Fractal self" badge that links to the callout.
const FRACTAL_SELF_SURFACES: Record<string, string> = {
  witness_relation:
    "witness_relation: self is the relationally-constituted attester reporting from within itself.",
  confidence:
    "The attester's own confidence is the relational composition reporting its own calibration.",
  "occurrence_id / _count / _role":
    "The fleet-constituted occurrence speaking from within the fleet's partitioning.",
};

export default function EnvelopeAndAxesPanel() {
  return (
    <section id="envelope" className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Envelope fields and reasoning axes
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          The envelope carries eight fields that consumers use to weight an
          attestation. These are <strong>not</strong> wire primitives — they
          are consumer-reasoning axes per CEG 0.1 §2.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Envelope fields */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
            8 envelope fields
          </h3>
          <ul className="space-y-2">
            {ENVELOPE_FIELDS.map((f) => (
              <li
                key={f.name}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800 dark:bg-gray-800 dark:text-slate-200">
                      {f.name}
                    </code>
                    {FRACTAL_SELF_SURFACES[f.name] && (
                      <FractalSelfBadge context={FRACTAL_SELF_SURFACES[f.name]} />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    default: {f.default}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                  {f.whatItDoes}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Reasoning axes */}
        <div id="axes">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
            8 reasoning axes
          </h3>
          <ul className="space-y-2">
            {REASONING_AXES.map((a) => (
              <li
                key={a.name}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {a.name}
                </p>
                <p className="mt-0.5 text-xs italic text-slate-600 dark:text-slate-300">
                  {a.question}
                </p>
                {a.linksToEnvelope.length > 0 && (
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Maps to envelope:{" "}
                    {a.linksToEnvelope.map((e, i) => (
                      <span key={e}>
                        <code className="rounded bg-slate-100 px-1 font-mono text-[10px] text-slate-700 dark:bg-gray-800 dark:text-slate-300">
                          {e}
                        </code>
                        {i < a.linksToEnvelope.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
