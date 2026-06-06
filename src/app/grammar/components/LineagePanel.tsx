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
    version: "0.15",
    date: "2026-06-06",
    headline: "Streaming standards folded in (SFrame, MLS, FIPS PQC)",
    status: "shipped",
    body: (
      <>
        The §10.5 streaming surface now <i>conforms to</i> the
        published standards rather than gesturing at them: the
        per-frame seal conforms to <b>SFrame</b>, the epoch-key rekey
        conforms to <b>MLS TreeKEM</b> (RFC 9420) with optional
        Post-Compromise Security, and SFrame / MLS / FIPS 203 / FIPS
        204 / RFC 9180 join the normative references. No wire-format
        change. Also landed: the §0.1.1 normative-vs-informative
        split, the §1.5 adversary model and privacy non-goals, and a
        §1.4 honesty pass (inductive, not closure, with a named
        falsification target).
      </>
    ),
    anchors: [
      { label: "§10.5 streaming", href: `${CEG_BLOB}/10_endpoints.md` },
      { label: "§0.4 references", href: `${CEG_BLOB}/00_conformance.md` },
    ],
  },
  {
    version: "0.14",
    date: "2026-06-05",
    headline: "Settlement linkage · the receipt, not the rail",
    status: "shipped",
    body: (
      <>
        Closes the last form of internet traffic in the completeness
        audit: commerce. Value transfer is not a CEG primitive (it
        rides USDC-on-Base via x402 under Identity=Wallet); 0.14 adds
        the optional, privacy-scoped attestation that <i>links</i> a
        federation action to its off-stack settlement. One new
        subject_kind <code>settlement</code> carrying{" "}
        <code>settled_action_ref</code> + <code>rail</code> +{" "}
        <code>settlement_ref</code> + an optional{" "}
        <code>amount_commitment</code>. Private by default
        (cohort_scope: self), auditability opt-in. CEG records the
        receipt; the chain settles the value.
      </>
    ),
    anchors: [
      { label: "§5.6.8.12 settlement", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
  {
    version: "0.13",
    date: "2026-06-04",
    headline: "Realtime group communication as composition",
    status: "shipped",
    body: (
      <>
        Group video, voice, screen sharing, text chat, and
        topic-scoped channels with sub-channels are the{" "}
        <i>same primitive set at N&times;N cardinality</i>, composing
        from <code>community</code> + <code>live_stream</code> +{" "}
        <code>chat_message</code> + member/transport resolution. One
        new normative subsection (§10.5.8) maps the whole surface.
        Small groups use direct Reticulum links (low-latency mesh);
        large groups use an SFU relay. A full group-communication
        platform needs nothing beyond the locked primitives.
      </>
    ),
    anchors: [
      { label: "§10.5.8 group comms", href: `${CEG_BLOB}/10_endpoints.md` },
    ],
  },
  {
    version: "0.12",
    date: "2026-06-03",
    headline: "DNS-free addressing · CEG over Reticulum, not TCP/IP",
    status: "shipped",
    body: (
      <>
        With the federation speaking CEG over Reticulum instead of
        TCP/IP, &ldquo;who is in a community and how do I reach
        them&rdquo; can&rsquo;t lean on DNS. 0.12 locks that resolution
        as a chain of signed bindings: one new optional field{" "}
        <code>transport_destination</code> on{" "}
        <code>identity_occurrence</code> (a federation-key-signed
        binding of a Reticulum transport destination to an identity),
        plus a deterministic <code>resolve_community</code> /{" "}
        <code>resolve_member_transport</code> algorithm. The wire
        format expresses its own addressing layer, DNS-free and
        self-certifying.
      </>
    ),
    anchors: [
      { label: "§5.6.8.8.1 transport", href: `${CEG_BLOB}/05_namespace.md` },
      { label: "§8.1.13.1.1 resolution", href: `${CEG_BLOB}/08_composition.md` },
    ],
  },
  {
    version: "0.11",
    date: "2026-06-02",
    headline: "Infrastructure cohort · the trust-root community subkind",
    status: "shipped",
    body: (
      <>
        The CIRIS canonical services (Registry, Lens, Node) need a
        community governed as a <i>trust root</i>, not a city: no
        location gate, and admission evaluated over the{" "}
        <b>founder</b> subset rather than all members (so flooding the
        membership can&rsquo;t dilute the admission quorum). 0.11
        codifies the second canonical <code>cohort_subkind</code>,{" "}
        <code>infrastructure</code>, with a one-payload constraint and
        trust-root conformance requirements. The shape the{" "}
        <code>ciris-canonical</code> trust root adopts instead of a
        family.
      </>
    ),
    anchors: [
      { label: "§5.6.8.10 infrastructure", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
  {
    version: "0.10",
    date: "2026-06-03",
    headline: "Delivery axis · observer-share + streaming multicast",
    status: "shipped",
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
        normative. 1+4 structural-primitive set untouched:{" "}
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
        with rough-only H3 precision enforcement at the wire format,
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
        promise. No peer can request what was never advertised.
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

function LineageItem({ r }: { r: LineageRow }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
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
  );
}

// Show the four newest versions; fold the rest behind a toggle so the
// lineage doesn't add a wall of scroll to an already-long page.
const RECENT_COUNT = 4;

export default function LineagePanel() {
  const recent = ROWS.slice(0, RECENT_COUNT);
  const older = ROWS.slice(RECENT_COUNT);
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What&rsquo;s new, through 0.15
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            lineage
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Multimedia tier (0.3) and subject-side consent (0.6) get
          their own panels above. The list below is the rapid lineage
          for everything else, newest first. The 1+4 structural set
          stays untouched across every entry; each row is either a
          new envelope field, a new dimension family, a new
          subject_kind, a new composition policy, or a representation-
          only wire-break that doesn&rsquo;t change the primitive set.
        </p>
      </header>

      <ol className="space-y-3">
        {recent.map((r) => (
          <LineageItem key={r.version} r={r} />
        ))}
      </ol>

      {older.length > 0 ? (
        <details className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Older versions (0.3 through {older[0].version})</span>
            <span aria-hidden className="text-slate-400 transition group-open:rotate-90">
              ›
            </span>
          </summary>
          <ol className="mt-3 space-y-3">
            {older.map((r) => (
              <LineageItem key={r.version} r={r} />
            ))}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
