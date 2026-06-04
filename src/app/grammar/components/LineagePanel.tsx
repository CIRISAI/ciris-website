// LineagePanel — the rapid 0.x lineage between the existing
// version-specific panels and the live spec head.
//
// MediaTierPanel covers 0.3 in depth; ConsentTierPanel covers 0.6 in
// depth. The four versions in between (0.7, 0.8, 0.9, 0.10 RC1) each
// landed substantive surface that deserves a callout without a full
// panel. The lineage table is the page's single source of truth for
// "what shipped when" between the dedicated panels.
//
// Order is newest-first (the RC1 head on top) so a reader checking
// "what's current" sees it immediately.

import { REGISTRY_BLOB, CEG_DIR } from "../lib/shared";

const CEG_BLOB = `${REGISTRY_BLOB}/${CEG_DIR}`;

type LineageRow = {
  version: string;
  date: string;
  headline: string;
  body: React.ReactNode;
  anchors: Array<{ label: string; href: string }>;
  status?: "rc1" | "shipped";
};

const ROWS: LineageRow[] = [
  {
    version: "0.10",
    date: "2026-06-03",
    headline: "Delivery axis · observer-share + streaming multicast",
    status: "rc1",
    body: (
      <>
        The third orthogonal envelope concern alongside visibility
        (cohort_scope) and revocability (subject_key_ids). Observer-
        share (N=1) and streaming multicast (N&gt;1) are the{" "}
        <i>same primitive at different cardinality</i>: subscriber-set
        = community per Policy M; E2E directed delivery = key_grant
        cascade of the stream-epoch DEK over the roster. Three new
        optional envelope fields:{" "}
        <code>delivery_mode</code>, <code>listed</code>,{" "}
        <code>history_on_join</code>. New §10.5 streaming transport
        with per-stream transparency logs that don&rsquo;t pollute the
        federation provenance log. JCS canonicalization is now
        normative. 1+4 structural-primitive set untouched —{" "}
        substrate-fan-out + 1:N media multicast compose from the same
        primitives as 1:1 attestations.
      </>
    ),
    anchors: [
      { label: "§4 envelope", href: `${CEG_BLOB}/04_envelope.md` },
      { label: "§10.5 streaming", href: `${CEG_BLOB}/10_endpoints.md` },
      { label: "§0.9 JCS canonicalization", href: `${CEG_BLOB}/00_conformance.md` },
    ],
  },
  {
    version: "0.9",
    date: "2026-06-01",
    headline: "identity_type as a set · single-key role cohabitation",
    status: "shipped",
    body: (
      <>
        Wire-break (representation-only): a single key can now hold
        more than one role at once. §7 gating reads
        <code>identity_type</code> as a set membership test rather than
        a single-valued field. Lets a registry-steward key also act as
        a community moderator without rotating into a separate identity.
      </>
    ),
    anchors: [
      { label: "§7 reserved prefixes", href: `${CEG_BLOB}/07_reserved.md` },
    ],
  },
  {
    version: "0.8",
    date: "2026-05-31",
    headline: "community + location_proof · cohort_subkind:geographic",
    status: "shipped",
    body: (
      <>
        New <code>community</code> subject_kind for cohort-scoped
        groups (not just affinity groups). <code>location_proof</code>{" "}
        with rough-only H3 precision enforcement at the wire format —
        so a community can be geographic without exposing exact
        coordinates of its members.
      </>
    ),
    anchors: [
      { label: "§5 namespace", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
  {
    version: "0.7",
    date: "2026-05-31",
    headline: "self/family structural invisibility at the wire",
    status: "shipped",
    body: (
      <>
        The CEG locality dividend, made structural. Content scoped{" "}
        <code>cohort_scope: self</code> or <code>family</code> now
        suppresses <code>holds_bytes</code> emission at the substrate
        level. Privacy by absence of attestation, not by policy
        promise — no peer can request what was never advertised.
        Adds <code>identity_occurrence</code> + <code>family</code>{" "}
        as substrate-recognized cohort primitives.
      </>
    ),
    anchors: [
      { label: "§5.6.8.5 cohort_scope", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
  {
    version: "0.4",
    date: "2026-05-30",
    headline: "event_listing + event-lifecycle dimensions",
    status: "shipped",
    body: (
      <>
        Events as a first-class content shape, with lifecycle
        dimensions (announced / starts / cancelled / occurred /
        finalized). Closes NodeCore#25 Gap 1 by giving the event-shape
        the same structural surface as media + governance.
      </>
    ),
    anchors: [
      { label: "§5.6.9 event_listing", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
];

export default function LineagePanel() {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What shipped since 0.3
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            lineage
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Multimedia tier (0.3) and subject-side consent (0.6) get
          their own panels above. The table below is the rapid lineage
          for everything else — newest first. The 1+4 structural set
          stays untouched across every entry; each row is either a
          new envelope field, a new dimension family, a new
          subject_kind, a new composition policy, or a representation-
          only wire-break that doesn&rsquo;t change the primitive set.
        </p>
      </header>

      <ol className="space-y-3">
        {ROWS.map((r) => (
          <li
            key={r.version}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[13px] font-bold text-slate-800 dark:bg-gray-800 dark:text-slate-100">
                  CEG {r.version}
                </code>
                {r.status === "rc1" ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    RC1
                  </span>
                ) : null}
                <span className="text-[11px] text-slate-500">{r.date}</span>
              </div>
            </div>
            <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              {r.headline}
            </p>
            <p className="mt-1 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
              {r.body}
            </p>
            {r.anchors.length > 0 ? (
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                {r.anchors.map((a) => (
                  <a
                    key={a.href + a.label}
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-primary underline-offset-2 hover:underline"
                  >
                    {a.label}
                  </a>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
