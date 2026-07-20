// v2 "dark-blueprint" front-door for the unified CIRIS Constitution. The Accord
// (the ethics) and the CEG (the wire grammar) are no longer two documents — they
// are folded into one ~120-page constitution (CC 0.4) that lives canonically in
// CIRISAI/CIRISRegistry (FSD/CIRIS_Constitution). This page frames that whole,
// surfaces the M-1 apex + the eight parts, and links out to the PDF and source.
// Every label comes from the dictionary (constitution.*); the GitHub URLs and
// roman-numeral part numbers are language-neutral and live here.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import { ContextualIntegrityCrossLink } from "@/app/components/ContextualIntegrityV2";

const REPO = "https://github.com/CIRISAI/CIRISRegistry";
const CONST_DIR = `${REPO}/tree/main/FSD/CIRIS_Constitution`;
// Self-hosted so the read CTA downloads the reader PDF directly (the `download`
// attribute only forces a download for same-origin files, not a GitHub blob URL).
const PDF = "/ciris-constitution-0.4.pdf";

// Per-part source files, in the same order as constitution.parts.
const PART_FILES = [
  "part_1_foundation.md",
  "part_2_the_grammar.md",
  "part_3_the_namespace.md",
  "part_4_composition_governance.md",
  "part_5_transport_substrate.md",
  "part_6_the_coherence_mathematics.md",
  "part_7_lifecycle_stewardship.md",
  "part_8_appendices.md",
];

const PART_ACCENTS = [s.cOk, s.cTeal, s.cCyan, s.cViolet, s.cRose, s.cBrass, s.cTeal, s.cCyan];

export default function ConstitutionV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.constitution;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="brass"
      kicker={c.eyebrow}
      title={c.headline}
      lede={c.intro}
      graphicId="g13"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The apex — Meta-Goal M-1, the cornerstone the whole document serves. */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{c.apexLabel}</p>
        <p className={s.lead}>{c.apexQuote}</p>
        <p className={s.paragraph}>{c.apexNote}</p>
      </div>

      {/* What folded in — the Accord + CEG, woven into one version line. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.foldedTitle}</p>
        <p className={s.paragraph}>{c.foldedBody}</p>
        <p className={s.footnote}>{c.versionNote}</p>
      </section>

      {/* The eight parts — a table of contents into the unified document. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.partsLabel}</p>
        <div className={s.cardGrid}>
          {c.parts.map((part, i) => (
            <a
              key={part.n}
              href={`${REPO}/blob/main/FSD/CIRIS_Constitution/${PART_FILES[i]}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${PART_ACCENTS[i]}`}
            >
              <h3>
                <span dir="ltr">{part.n}</span> · {part.title}
              </h3>
              <p>{part.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      {/* A line from the foreword — the covenant in plain voice. */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{c.forewordLabel}</p>
        <p className={s.lead}>{c.forewordQuote}</p>
      </div>

      {/* Concept tag: the wire-level consent machinery is contextual integrity. */}
      <ContextualIntegrityCrossLink t={t} locale={locale} />

      {/* Read it / read the source. */}
      <section className={s.cta}>
        <div className={s.ctaRow}>
          <a href={PDF} download className={`${s.btn} ${s.btnP}`}>
            {c.readCta}
          </a>
          <a href={CONST_DIR} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {c.sourceCta}
          </a>
          <Link href={lh("/philosophy")} className={`${s.btn} ${s.btnS}`}>
            {t.philosophy.crossCta}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
