// v2 "dark-blueprint" CEG landing (/grammar). Renders the same t.grammar.*
// dictionary keys the old GrammarBaseContent did — no copy is rewritten or
// re-translated here — inside the reusable ContentShell, with a brass accent
// (this is the Constitution / epistemic grammar). The live spec figures
// (version, release date, prefix-family count) are fetched server-side in
// page.tsx and passed in as props, rendered here as a notice stat row. The two
// PDF editions plus the English-only /grammar/details spec reader and
// /grammar/explore workshop are preserved as CTA buttons.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

type Props = {
  t: Dictionary;
  specVersion: string;
  releasedDate: string;
  totalPrefixes: number;
  readerPdf: string;
  fullPdf: string;
};

export default function GrammarV2({
  t,
  specVersion,
  releasedDate,
  totalPrefixes,
  readerPdf,
  fullPdf,
}: Props) {
  const locale = t._meta.locale;
  const g = t.grammar;

  return (
    <ContentShell
      locale={locale}
      accent="brass"
      graphicId="g13"
      kicker={g.eyebrow}
      title={g.headline}
      lede={g.intro}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Live spec figures — version / release date / prefix-family count. */}
      <div className={s.notice}>
        <p>
          {specVersion} · {g.releasedLabel} {releasedDate} · {totalPrefixes}{" "}
          {g.prefixFamilies}
        </p>
      </div>

      {/* PDF editions. */}
      <section className={s.cta} style={{ borderTop: "none", paddingTop: 0 }}>
        <div className={s.ctaRow}>
          <a
            href={readerPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {g.pdfReader}
          </a>
          <a
            href={fullPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {g.pdfFull}
          </a>
        </div>
        <p className={s.footnote}>
          {specVersion}, {g.pdfNoteSuffix}
        </p>
      </section>

      {/* What this is, why we made it, what's comparable. */}
      <section className={s.section}>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{g.whatIsTitle}</h3>
            <p>{g.whatIsBody}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{g.whyTitle}</h3>
            <p>{g.whyBody}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{g.comparableTitle}</h3>
            <ul style={{ margin: 0, paddingLeft: "1.1em" }}>
              {g.comparable.map((item, i) => (
                <li
                  key={i}
                  style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-dim)" }}
                  dangerouslySetInnerHTML={h(item)}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Three things a reader can actually do here. */}
      <section className={s.section}>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{g.doTitle1}</h3>
            <p>{g.doBody1}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{g.doTitle2}</h3>
            <p>{g.doBody2}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{g.doTitle3}</h3>
            <p>{g.doBody3}</p>
          </div>
        </div>
      </section>

      {/* Deep tech CTA — the full spec reader + the workshop (English-only). */}
      <section className={s.cta}>
        <p className={s.sectionLabel}>{g.deepTitle}</p>
        <p className={s.ctaPara}>{g.deepBody}</p>
        <div className={s.ctaRow}>
          <Link href="/grammar/details" className={`${s.btn} ${s.btnP}`}>
            {g.ctaSpecReader}
          </Link>
          <Link href="/grammar/explore" className={`${s.btn} ${s.btnS}`}>
            {g.ctaExplore}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
