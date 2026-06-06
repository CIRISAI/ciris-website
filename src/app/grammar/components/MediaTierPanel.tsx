// MediaTierPanel, additive surface from CEG 0.3.
//
// CEG 0.3 shipped multimedia support without touching the 1+4 wire-
// format primitive set. The additions are five new external_content
// sub_kinds, four new dimension families, five media prefix families,
// two new governance subject_kinds (takedown_notice + key_grant), and
// Policy J for trusted-publisher composition. The panel below names
// the surface in one place so a reader doesn't have to thread it out
// of the namespace and composition panels.

import { REGISTRY_BLOB, CEG_DIR } from "../lib/shared";

const CEG_BLOB = `${REGISTRY_BLOB}/${CEG_DIR}`;

const SUB_KINDS: Array<{ id: string; label: string; description: string }> = [
  {
    id: "image",
    label: "image",
    description: "Still-image content. Photos, diagrams, scans, generated art.",
  },
  {
    id: "audio",
    label: "audio",
    description: "Audio content. Voice recordings, podcasts, music tracks.",
  },
  {
    id: "video",
    label: "video",
    description: "Short-form and user-generated video.",
  },
  {
    id: "film",
    label: "film",
    description:
      "Long-form film and series. Distinguished from video by a distributor attestation chain.",
  },
  {
    id: "model_3d",
    label: "model_3d",
    description: "3D meshes, scenes, scanned objects.",
  },
];

const PHASE_2 = "live_stream (Phase 2, drafted, not yet live)";

const DIMENSION_FAMILIES: Array<{ key: string; description: string }> = [
  {
    key: "content_rating:{scheme}:{rating}",
    description:
      "MPAA, BBFC, regional rating schemes. A signed claim that this content is rated X by scheme Y.",
  },
  {
    key: "content_class:{class}",
    description:
      "Class label (e.g. educational, news, fiction, sponsored). Composed with content_rating to gate consumer feeds.",
  },
  {
    key: "cw_class:{class}",
    description:
      "Content-warning class. A separate attestation channel so consumers can opt in or out at a different threshold from the rating.",
  },
  {
    key: "age_assurance:{level}",
    description:
      "Bound to the consumer key, not the content. Composes with content_rating to allow age-restricted material only where assurance is in place.",
  },
];

const SUBJECT_KINDS: Array<{ name: string; description: string }> = [
  {
    name: "takedown_notice",
    description:
      "Signed wire artifact carrying a legal takedown request. LegalBasis is a closed 10-value enum (5 immediate-removal, 4 expeditious-with-counter-notice, 1 compose-with-age-gate). The fast-path categories, TVEC, NCMEC, GIFCT, perceptual-hash CSAM, court order, propagate as withdraws against the holds_bytes attestation chain. The takedown is not a coup: §11.4 binds it so a takedown can remove content but cannot capture the substrate.",
  },
  {
    name: "key_grant",
    description:
      "Wrapped data-encryption-key delivery for restricted or subscription content. HPKE per RFC 9180 as the wrap_algorithm. Retiring a grant emits a fresh key_grant that supersedes the old one (rotation_chain semantics), not a withdraws, so the consumer-side path stays at the existing 1+4 primitive set.",
  },
];

export default function MediaTierPanel() {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Media tier
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            CEG 0.3 · additive
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          CEG 0.3 added the surface needed for multimedia, takedown
          coordination, and encrypted-content delivery without changing
          the 1+4 wire-format primitives. Everything below rides{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            scores
          </code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            delegates_to
          </code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            supersedes
          </code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            withdraws
          </code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            recants
          </code>,{" "}
          the existing five.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* sub_kinds */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              external_content sub_kinds
            </h3>
            <a
              href={`${CEG_BLOB}/05_namespace.md#5681-external_content-sub_kinds`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §5.6.8.1
            </a>
          </header>
          <ul className="space-y-2 text-sm">
            {SUB_KINDS.map((k) => (
              <li key={k.id}>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-semibold text-slate-800 dark:bg-gray-800 dark:text-slate-100">
                  external_content:{k.label}
                </code>
                <p className="mt-0.5 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
                  {k.description}
                </p>
              </li>
            ))}
            <li className="text-[12px] italic text-slate-500">{PHASE_2}</li>
          </ul>
        </article>

        {/* dimension families */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              New dimension families
            </h3>
            <a
              href={`${CEG_BLOB}/05_namespace.md#5683`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §5.6.8.3
            </a>
          </header>
          <ul className="space-y-2 text-sm">
            {DIMENSION_FAMILIES.map((d) => (
              <li key={d.key}>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-semibold text-slate-800 dark:bg-gray-800 dark:text-slate-100">
                  {d.key}
                </code>
                <p className="mt-0.5 text-[13px] leading-5 text-slate-600 dark:text-slate-400">
                  {d.description}
                </p>
              </li>
            ))}
            <li className="pt-1 text-[12px] text-slate-500">
              Plus five media-prefix families:{" "}
              <code>image:*</code>, <code>audio:*</code>,{" "}
              <code>video:*</code>, <code>film:*</code>,{" "}
              <code>model_3d:*</code>, one per sub_kind.
            </li>
          </ul>
        </article>

        {/* subject_kinds */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:col-span-2">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Governance Contribution subject_kinds
            </h3>
            <a
              href={`${CEG_BLOB}/05_namespace.md#5684-governance-subject_kinds-ceg-03-addition-per-cirisregistry37--38`}
              className="text-[11px] text-brand-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              §5.6.8.4
            </a>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {SUBJECT_KINDS.map((sk) => (
              <div key={sk.name}>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-semibold text-slate-800 dark:bg-gray-800 dark:text-slate-100">
                  {sk.name}
                </code>
                <p className="mt-1 text-[13px] leading-6 text-slate-600 dark:text-slate-400">
                  {sk.description}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* governance pointers */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:col-span-2">
          <header className="mb-3 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Governance additions
            </h3>
          </header>
          <ul className="space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li>
              <b>Policy J: Trusted-Publisher composition</b> (composition
              panel above). Three-layer: distributor attestation chain,
              content-class plus content-rating gate, age-assurance gate.
              Same shape as Policy F but for media.{" "}
              <a
                href={`${CEG_BLOB}/08_composition.md#8110-policy-j--trusted-publisher-composition-ceg-03-addition`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §8.1.10
              </a>
            </li>
            <li>
              <b>§11.4 Fast-path takedown coordination.</b> Immediate-
              removal categories: TVEC (terrorism), NCMEC (child safety),
              GIFCT, perceptual-hash CSAM, and court orders. Propagates
              as withdraws against the holds_bytes chain. The takedown-
              isn&rsquo;t-a-coup property binds it to the
              §9 Humanity Accord so a takedown can remove specific bytes
              but cannot capture the substrate.{" "}
              <a
                href={`${CEG_BLOB}/11_governance.md#114-fast-path-takedown-coordination`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §11.4
              </a>
            </li>
            <li>
              <b>§11.5 Hash-database operator policy.</b> Default is
              self-hosted PDQ against publicly-distributed feeds; a
              future CIRIS hash-coalition clearinghouse slot is
              documented but deferred.{" "}
              <a
                href={`${CEG_BLOB}/11_governance.md#115-hash-database-operator-policy`}
                className="text-brand-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                §11.5
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
