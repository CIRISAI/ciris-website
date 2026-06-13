// LineagePanel — the rapid lineage between the existing version-specific
// panels and the live spec head.
//
// MediaTierPanel covers 0.3 in depth; ConsentTierPanel covers 0.6 in
// depth. Every cut since then landed substantive surface that deserves a
// callout without a full panel. The lineage table is the page's single
// source of truth for "what shipped when" between the dedicated panels.
//
// Order is newest-first (the 1.0-RC4 head on top) so a reader checking
// "what's current" sees it immediately. The RC rows carry a badge: RC1
// froze the wire surface, RC2 completed the design surface, RC3 was a
// clarity cut, RC4 ratified the last reserved §RC slot.

import { REGISTRY_BLOB, CEG_DIR } from "../lib/shared";

const CEG_BLOB = `${REGISTRY_BLOB}/${CEG_DIR}`;

type LineageRow = {
  version: string;
  date: string;
  headline: string;
  body: React.ReactNode;
  anchors: Array<{ label: string; href: string }>;
  status?: "rc" | "rc2" | "rc1" | "shipped";
};

const ROWS: LineageRow[] = [
  {
    version: "1.0-RC4",
    date: "2026-06-12",
    headline: "§RC ratified · the consent_role Counter-RII gate",
    status: "rc",
    body: (
      <>
        The one reserved §RC slot is filled (new §7.0.2), ratifying the
        Accord §RC <code>consent_role</code> semantics at the{" "}
        <code>ConsentGate.lean</code> defaults with zero proof delta. The
        revocation chain is <code>BaseRole</code>-only and non-recursive
        (overwrite-on-revoke; any retained history lives in a separate audit
        surface, never embedded in the <code>consent_role</code> field), and{" "}
        <code>Peer</code>-role nodes are suppressed from Counter-RII. No wire
        change; the design surface stays complete.
      </>
    ),
    anchors: [
      { label: "§7.0.2 consent_role", href: `${CEG_BLOB}/07_reserved.md` },
    ],
  },
  {
    version: "1.0-RC3",
    date: "2026-06-12",
    headline: "Clarity cut · the fabric-node trust model",
    status: "rc",
    body: (
      <>
        Four clarifications plus one canonical-encoding addition, all
        additive on the frozen surface. The load-bearing one: §7.0.1
        fabric-node separation-of-powers. A fabric node (the headless
        cohabitation runtime, where <code>agent = fabric node + brain</code>)
        that co-locates substrate, steward, detector, and witness roles in
        one process is <b>custody, not consolidation of authority</b>.
        Authority stays quorum-bound (a vote, not a verdict), observation
        stays non-authoritative by namespace, and observation can never
        manufacture authority. Plus the NodeCode shorthand. No wire change.
      </>
    ),
    anchors: [
      { label: "§7.0.1 fabric-node", href: `${CEG_BLOB}/07_reserved.md` },
    ],
  },
  {
    version: "1.0-RC2",
    date: "2026-06-10",
    headline: "Operational-data envelopes · the design surface completes",
    status: "rc2",
    body: (
      <>
        The one scheduled additive cut, and the last. Cross-region
        operational data (orgs, memberships, partner licenses) becomes
        signed CEG envelopes: three new subject_kinds (§5.6.8.13){" "}
        <code>organization</code>, <code>org_membership</code>, and{" "}
        <code>partner_record</code>, under one rule, federate only the
        trust and authz projection; PII and business detail stay
        region-local. Org and membership are single-signer role-gated;{" "}
        <code>partner_record</code> takes an M-of-N steward quorum, with
        admission quorum and merge quorum kept distinct. New §10.1.6
        declares per-subject_kind merge intents with a skew bound at
        admission. The sixteenth independent path; no 1+4 change. The wire
        surface stays frozen and the design surface is now complete, with
        no further additions scheduled.
      </>
    ),
    anchors: [
      { label: "§5.6.8.13 operational data", href: `${CEG_BLOB}/05_namespace.md` },
      { label: "§10.1.6 merge intents", href: `${CEG_BLOB}/10_endpoints.md` },
    ],
  },
  {
    version: "1.0-RC1",
    date: "2026-06-10",
    headline: "The freeze cut · wire surface frozen",
    status: "rc1",
    body: (
      <>
        Five honesty and safety patches, two pins, and the canonical-bytes
        resolution, then freeze. Provenance contracts are redesigned as JCS
        (RFC 8785) objects with pinned <code>domain</code> members, retiring
        TupleHash128 so there is one canonicalization family. §10.5.3 adds
        removal coalescing (all removals in one transparency-log window
        batch into a single rotation, capping the rekey cascade regardless
        of churn) plus a public-broadcast exemption. Forward secrecy is
        stated honestly (KEM rotation bounds future exposure only), and
        fail-secure exclusion now emits a §7.7 <code>hard_case</code> into
        the affected cohort instead of failing silently. No 1+4 change.
      </>
    ),
    anchors: [
      { label: "§5.2.1 provenance (JCS)", href: `${CEG_BLOB}/05_namespace.md` },
      { label: "§10.5.3 removal coalescing", href: `${CEG_BLOB}/10_endpoints.md` },
    ],
  },
  {
    version: "0.18",
    date: "2026-06-09",
    headline: "Recipient encryption-key registration",
    status: "shipped",
    body: (
      <>
        The at-rest DEK cascade needs each recipient&rsquo;s
        content-encryption keys, but the federation directory carries only
        signing keys (Ed25519 + ML-DSA-65), and ML-KEM is not derivable from
        ML-DSA. 0.18 adds an optional <code>encryption_pubkeys</code>{" "}
        field-set on <code>identity_occurrence</code> (x25519 + ML-KEM-768),
        structurally parallel to <code>transport_destination</code>:
        self-certified, hybrid-signed, and rotatable without touching the
        signing identity. A recipient with no valid ML-KEM key is excluded
        from the grant (content stays encrypted), never downgraded to
        plaintext. Content-KEM, signing, and Reticulum transport are three
        separate keypairs, never reused. No 1+4 change.
      </>
    ),
    anchors: [
      { label: "§5.6.8.8.2 encryption_pubkeys", href: `${CEG_BLOB}/05_namespace.md` },
    ],
  },
  {
    version: "0.17",
    date: "2026-06-09",
    headline: "Three crypto tiers · self/family, Community, Commons",
    status: "shipped",
    body: (
      <>
        The old binary cut (self and family encrypt; everything else
        plaintext) is replaced by three tiers. self/family stays encrypted
        and structurally invisible. <b>Community</b> (<code>community</code>,{" "}
        <code>affiliations</code>) is encrypted under a per-community DEK
        with cleartext provenance: byte-confidential to members, discoverable
        by provenance. <b>Commons</b> (<code>species</code>,{" "}
        <code>biosphere</code>, <code>federation</code>) stays plaintext for
        anyone to inspect. The community DEK is the §10.5.3 epoch-DEK
        cascade, so a community is a stream its members subscribe to
        cryptographically. Mandatory, not opt-in. No 1+4 change.
      </>
    ),
    anchors: [
      { label: "§8.1.13.3 holder-inspectability", href: `${CEG_BLOB}/08_composition.md` },
      { label: "§10.5.3 epoch DEK", href: `${CEG_BLOB}/10_endpoints.md` },
    ],
  },
  {
    version: "0.16",
    date: "2026-06-09",
    headline: "Agent-identity hardening + cross-impl byte determinism",
    status: "shipped",
    body: (
      <>
        A pins-and-determinism wave over the locked 1+4 set, with no
        wire-format change. §10.1.5 adds the attestation tier model:{" "}
        <code>local</code> (deferred-signature, producer-only authority)
        versus <code>federation</code> (hybrid-signed, visible), plus{" "}
        <code>promote</code>. §8.1.12.7 &ldquo;Self at login&rdquo; binds one
        hybrid hardware-rooted user identity to app and agent occurrences
        sharing one Self DEK. §0.9.2.1 pins the three things JCS does not
        (array element ordering, byte-field to lowercase hex, timestamp
        form), and PQC at rest (<code>wrap_algorithm: v2</code>,
        X25519 + ML-KEM-768) becomes mandatory down to self/family.
      </>
    ),
    anchors: [
      { label: "§10.1.5 attestation tiers", href: `${CEG_BLOB}/10_endpoints.md` },
      { label: "§0.9.2.1 determinism", href: `${CEG_BLOB}/00_conformance.md` },
    ],
  },
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
                {/-RC\d+$/.test(r.version) ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    {r.version.split("-")[1]}
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
            What&rsquo;s new, through 1.0-RC4
          </h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            wire frozen · design complete
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Multimedia tier (0.3) and subject-side consent (0.6) get
          their own panels above. The list below is the rapid lineage
          for everything else, newest first. 1.0-RC1 froze the wire
          surface, 1.0-RC2 completed the design surface, and RC3 and RC4
          are clarity and ratification cuts, so the spec is now
          feature-stable. The 1+4 structural set stays untouched
          across every entry; each row is either a new envelope field, a
          new dimension family, a new subject_kind, a new composition
          policy, or a representation-only wire-break that doesn&rsquo;t
          change the primitive set.
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
            <span>Older versions ({older[0].version} and earlier)</span>
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
