// v2 "dark-blueprint" coherence-collapse-analysis page. Renders the same
// t.coherenceCollapseAnalysis.* dictionary keys the old
// CoherenceCollapseAnalysisContent did — no copy is rewritten or re-translated
// here — inside the reusable ContentShell, with a rose (analysis/risk) accent.
// The technical body (the idea, the one formula, the corridor, what we measured,
// the honest ceiling, closing) is mapped onto the shared content.module
// vocabulary: sectionLabel/h2 headers, paragraphs, callouts, the accent card
// variants for the badges, and a centered mono panel for the literal formula.
// Existing links/CTAs are preserved verbatim.
//
// Strings that carry typographic emphasis (<strong>/<a>) are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe.
// Math notation and the formula display string stay literal.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

/** Shape of the coherenceCollapseAnalysis namespace (mirrors _src/coherenceCollapseAnalysis.json). */
interface CoherenceCollapseAnalysisNS {
  badge1: string;
  badge2: string;
  eyebrow: string;
  h1: string;
  heroPara: string;
  ctaPaper: string;
  ctaProofs: string;
  ideaEyebrow: string;
  ideaH2: string;
  ideaPara1: string;
  ideaPara2: string;
  formulaEyebrow: string;
  formulaH2: string;
  formulaPara1: string;
  formulaDisplay: string;
  formulaPara2: string;
  formulaLi1: string;
  formulaLi2: string;
  corridorEyebrow: string;
  corridorH2: string;
  corridorPara1: string;
  corridorPara2: string;
  measuredEyebrow: string;
  measuredH2: string;
  measuredPara: string;
  ceilingEyebrow: string;
  ceilingH2: string;
  ceilingPara1: string;
  ceilingPara2: string;
  closingEyebrow: string;
  closingH2: string;
  closingPara: string;
  closingCta1: string;
  closingCta2: string;
  closingCta3: string;
}

/** Extended dictionary that includes the coherenceCollapseAnalysis namespace. */
type DictionaryWithCCA = Dictionary & {
  coherenceCollapseAnalysis: CoherenceCollapseAnalysisNS;
};

export default function CoherenceCollapseAnalysisV2({
  t,
  locale,
}: {
  t: Dictionary;
  locale: string;
}) {
  const c = (t as DictionaryWithCCA).coherenceCollapseAnalysis;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="rose"
      kicker={c.eyebrow}
      title={c.h1}
      lede={c.heroPara}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Badges + hero CTAs */}
      <section className={s.section}>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{c.badge1}</h3>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{c.badge2}</h3>
          </div>
        </div>
        <div className={s.ctaRow} style={{ marginTop: 18 }}>
          <a
            href="https://zenodo.org/records/18217688"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {c.ctaPaper}
          </a>
          <a
            href="https://github.com/CIRISAI/RATCHET"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {c.ctaProofs}
          </a>
        </div>
      </section>

      {/* The idea */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.ideaEyebrow}</p>
        <h2 className={s.h2}>{c.ideaH2}</h2>
        <p className={s.paragraph}>{c.ideaPara1}</p>
        <p className={s.paragraph}>{c.ideaPara2}</p>
      </section>

      {/* The one formula */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.formulaEyebrow}</p>
        <h2 className={s.h2}>{c.formulaH2}</h2>
        <p className={s.paragraph}>{c.formulaPara1}</p>
        <div className={s.callout} style={{ textAlign: "center" }}>
          <p
            className={s.footnote}
            style={{ margin: 0, fontSize: 18, color: "var(--color-text)" }}
          >
            {c.formulaDisplay}
          </p>
        </div>
        <p className={s.paragraph}>{c.formulaPara2}</p>
        <p className={s.footnote} dangerouslySetInnerHTML={h(c.formulaLi1)} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(c.formulaLi2)} />
      </section>

      {/* The corridor */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{c.corridorEyebrow}</p>
        <h2 className={s.h2}>{c.corridorH2}</h2>
        <p className={s.paragraph}>{c.corridorPara1}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(c.corridorPara2)} />
      </div>

      {/* What we measured */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.measuredEyebrow}</p>
        <h2 className={s.h2}>{c.measuredH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(c.measuredPara)} />
      </section>

      {/* The honest ceiling */}
      <div className={`${s.callout} ${s.cBrass}`}>
        <p className={s.sectionLabel}>{c.ceilingEyebrow}</p>
        <h2 className={s.h2}>{c.ceilingH2}</h2>
        <p className={s.paragraph}>{c.ceilingPara1}</p>
        <p className={s.paragraph}>{c.ceilingPara2}</p>
      </div>

      {/* Closing */}
      <section className={s.cta}>
        <p className={s.sectionLabel}>{c.closingEyebrow}</p>
        <h2 className={s.h2}>{c.closingH2}</h2>
        <p className={s.ctaPara} dangerouslySetInnerHTML={h(c.closingPara)} />
        <div className={s.ctaRow}>
          <Link href={lh("/coherence-ratchet")} className={`${s.btn} ${s.btnP}`}>
            {c.closingCta1}
          </Link>
          <Link href={lh("/research-status")} className={`${s.btn} ${s.btnS}`}>
            {c.closingCta2}
          </Link>
          <a
            href="https://zenodo.org/records/18217688"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {c.closingCta3}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
