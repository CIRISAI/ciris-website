// ConsentTierPanel, additive surface from CEG 0.6.
//
// CEG 0.6 added subject-side consent authority, the missing half of
// the wire format. Pre-0.6 only encoded producer authority
// (attesting_key_id); 0.6 adds subject_key_ids to the envelope so a
// claim about a person can be revoked by that person, not only by the
// person who made the claim. Universal across medical records,
// photos, interviews, training data, group chat, financial
// transactions, surveillance, education records, multi-party
// contracts.
//
// The 1+4 wire-format primitives are unchanged. The whole consent
// surface rides scores / delegates_to / supersedes / withdraws /
// recants, with one envelope field added and the withdraws admission
// rule semantically broadened.

import { REGISTRY_BLOB, CEG_DIR } from "../lib/shared";

const CEG_BLOB = `${REGISTRY_BLOB}/${CEG_DIR}`;

const CONSENT_PREFIXES: Array<{ key: string; description: string }> = [
  {
    key: "consent:state:{granted|revoked|expired}",
    description:
      "The subject's current stance on a given producer's use of their data. Walk latest non-superseded to resolve the effective consent.",
  },
  {
    key: "consent:stream:{kind}",
    description:
      "Which consent stream this rides. Canonical recommendations: temporary, partnered, anonymous. Open vocabulary so operators can name their own streams.",
  },
  {
    key: "consent:deletion_sla:{days}",
    description:
      "Producer commitment: how many days the substrate gives them to delete after a subject revocation. Substrate emits hard_case:consent_sla_breach if they miss the window.",
  },
  {
    key: "consent:deletion_complete",
    description: "Producer's signed attestation that deletion finished, after a revocation.",
  },
  {
    key: "consent:decay:{stage}",
    description:
      "Substrate emission at each milestone of a multi-stage decay protocol (CIRISAgent's 90-day decay is the canonical example).",
  },
  {
    key: "consent:partnership_grant",
    description: "Bilateral subject-side grant in a PARTNERED stream.",
  },
  {
    key: "consent:partnership_accept",
    description: "Bilateral producer-side acceptance in a PARTNERED stream.",
  },
  {
    key: "consent:scope:{kind}",
    description:
      "Which downstream uses the consent covers. Canonical recommendations: retain, share, analyze, train, publish.",
  },
];

const ADMISSION_RULES: Array<{ rule: string; description: string }> = [
  {
    rule: "issuer.key_id == T.attesting_key_id",
    description:
      "Producer self-withdraw, the original author retracting their own claim. The pre-0.6 rule, unchanged.",
  },
  {
    rule: "issuer.key_id ∈ T.subject_key_ids",
    description:
      "Subject revocation. The person the claim is about can withdraw it directly. New in 0.6.",
  },
  {
    rule: "delegates_to chain to a canonical-hash subject",
    description:
      "Proxy authority, a parent revoking on behalf of a child, a fiduciary on behalf of a client, an estate on behalf of the deceased. Scope must include consent_revocation. New in 0.6.",
  },
  {
    rule: "via delegates_to from any of the above",
    description: "Standard CEG delegation chain into one of the above, transitive.",
  },
];

export default function ConsentTierPanel() {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Subject-side consent
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            CEG 0.6 · additive
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          The missing half of consent at the wire format. CEG{" "}
          <span className="font-mono">&le; 0.5</span> only encoded
          producer authority (the person who made the claim). CEG 0.6
          adds <span className="font-mono">subject_key_ids</span> so
          the person a claim is <i>about</i> can revoke it, even when
          the producer is someone else. Universal across medical
          records, photos, interviews, training data, group chats,
          financial transactions, surveillance, education records, and
          multi-party contracts. The 1+4 wire-format primitives are
          unchanged.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* envelope field */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              The new envelope field
            </h3>
            <a
              href={`${CEG_BLOB}/04_envelope.md`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §4.2
            </a>
          </header>
          <pre className="overflow-x-auto rounded bg-slate-100 p-3 text-[12px] leading-5 dark:bg-gray-950">
{`subject_key_ids: Vec<KeyId>   // OPTIONAL`}
          </pre>
          <p className="mt-2 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
            Empty or omitted means status quo, producer authority only,
            pre-0.6 behavior preserved. Accepts both{" "}
            <code>federation_keys</code> identities and canonical-hash
            identifiers, so a claim about someone who has not enrolled
            in the federation can still name them and let them revoke
            via delegation. Orthogonal to{" "}
            <code>cohort_scope</code>: cohort_scope is producer-side
            (visibility), subject_key_ids is subject-side
            (revocability).
          </p>
        </article>

        {/* withdraws admission */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Withdraws admission, broadened
            </h3>
            <a
              href={`${CEG_BLOB}/03_primitives.md`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §3.2.3
            </a>
          </header>
          <p className="mb-3 text-[12px] text-slate-500">
            The substrate now admits a <code>withdraws</code> against a
            target T when the issuer matches any of:
          </p>
          <ol className="space-y-2 text-[13px]">
            {ADMISSION_RULES.map((r, i) => (
              <li key={r.rule} className="leading-5">
                <span className="mr-2 inline-block rounded-full bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {i + 1}
                </span>
                <code className="rounded bg-slate-100 px-1 text-[11px] font-semibold dark:bg-gray-800">
                  {r.rule}
                </code>
                <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                  {r.description}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[12px] italic text-slate-500">
            Wire shape of <code>withdraws</code> unchanged. 1+4
            lockdown preserved, this is a semantic broadening, not a
            new structural primitive.
          </p>
        </article>

        {/* consent:* prefixes */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:col-span-2">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              consent:* dimension family
            </h3>
            <a
              href={`${CEG_BLOB}/05_namespace.md`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §5.6.8.6
            </a>
          </header>
          <p className="mb-3 text-[12px] text-slate-500">
            Open vocabulary with 8 canonical prefixes. Operators MAY
            mint their own; the substrate canonicalizes the shape.
          </p>
          <ul className="grid gap-2 md:grid-cols-2">
            {CONSENT_PREFIXES.map((p) => (
              <li key={p.key}>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-semibold text-slate-800 dark:bg-gray-800 dark:text-slate-100">
                  {p.key}
                </code>
                <p className="mt-0.5 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </article>

        {/* consent_record subject_kind + ceremony layering */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              consent_record subject_kind
            </h3>
            <a
              href={`${CEG_BLOB}/05_namespace.md`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §5.6.8.7
            </a>
          </header>
          <p className="text-[13px] leading-6 text-slate-600 dark:text-slate-400">
            A ceremony envelope, parallel to{" "}
            <code>key_grant</code> and{" "}
            <code>takedown_notice</code>. Both bare{" "}
            <code>scores</code> attestations and{" "}
            <code>consent_record</code> ceremony shapes admit at the
            same gate (primitive clean at the wire, ceremony UX above
            the primitive). Lets the app surface a clear&ldquo;I
            consent / I revoke&rdquo; surface without changing the
            substrate.
          </p>
        </article>

        {/* governance */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Governance additions
            </h3>
          </header>
          <ul className="space-y-3 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
            <li>
              <b>Policy K: CEM composition</b> (composition panel
              above). Six layers: effective consent resolution,
              multi-subject revocation, SLA watcher, bilateral pair
              ratification, decay-protocol stages, and the CIRISAgent
              CEM bundle (TEMPORARY / PARTNERED / ANONYMOUS).{" "}
              <a
                href={`${CEG_BLOB}/08_composition.md`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §8.1.11
              </a>
            </li>
            <li>
              <b>Consent revocations are not local-tier eligible.</b>{" "}
              Self-attestations may ride a local signature deferral;
              subject-side consent revocations must promote to the
              federation tier within a bounded window (default 24
              hours, operator-tunable). Closes the leak window where a
              revoked claim could keep replicating because the
              revocation stayed local.{" "}
              <a
                href={`${CEG_BLOB}/10_endpoints.md`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §10.1.3
              </a>
            </li>
            <li>
              <b>Vertical compliance mapping.</b> Informational pointers
              to GDPR Art 7/9/17/20, HIPAA 164.502/164.524, FERPA,
              CCPA, EU AI Act Art 50, and CIRIS Accord M-1.
              Operator-configurable; CEG wire primitives stay
              domain-agnostic.{" "}
              <a
                href={`${CEG_BLOB}/11_governance.md`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §11.6
              </a>
            </li>
          </ul>
        </article>
      </div>

      {/* The lockdown reassurance, surfaced. */}
      <div className="rounded-md border-l-4 border-teal-400 bg-teal-50/70 p-3 text-[13px] leading-6 text-slate-800 dark:bg-teal-950/30 dark:text-slate-200">
        <p>
          <b>1+4 wire-format lockdown preserved.</b> CEG 0.6 is the
          seventh independent path confirming the minimal-and-adequate
          claim: a structural set rich enough to express not just
          producer authority over content but the full duality of
          producer plus subject authority real-world data shapes
          require, without adding a new primitive.
        </p>
      </div>
    </section>
  );
}
