// v2 "dark-blueprint" grammar landing (/grammar), post-fold edition. The CEG
// is no longer presented as a standalone spec: the version badge and the CEG
// PDF buttons are gone (the 0.15 PDFs 404ed after the grammar was folded into
// the constitution, CC 0.4). Instead: a prominent dive-in CTA to the
// English-only /grammar/details spec reader right under the hero (per Eric:
// "make sure /grammar/details is prominently linked"), the localized explainer
// cards, and a "where the grammar lives now" section pointing at the
// constitution. This page no longer fetches the registry at build time; only
// /grammar/details and /grammar/explore still read FSD/CEG.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import { ContextualIntegrityCrossLink } from "@/app/components/ContextualIntegrityV2";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

// Self-hosted constitution reader PDF (same file ConstitutionV2 serves).
const CONSTITUTION_PDF = "/ciris-constitution-0.4.pdf";

export default function GrammarV2({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const g = t.grammar;
  const lh = (href: string) => localizeHref(href, locale);

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
      {/* The dive-in, promoted to the top: the spec reader is the page that
          really explains the grammar, so it gets the first and biggest CTA.
          Both deep pages are English-only. */}
      <section className={s.cta} style={{ borderTop: "none", paddingTop: 0 }}>
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

      {/* Where the grammar canonically lives since the fold: the constitution.
          Button labels reuse already-translated strings from other sections. */}
      <div className={s.callout}>
        <h2 className={s.h2}>{g.constTitle}</h2>
        <p className={s.paragraph}>{g.constBody}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/constitution")} className={`${s.btn} ${s.btnP}`}>
            {t.contextualIntegrity.btnConstitution}
          </Link>
          <a href={CONSTITUTION_PDF} download className={`${s.btn} ${s.btnS}`}>
            {t.constitution.readCta}
          </a>
        </div>
      </div>

      {/* Concept tag: the envelope + consent family is contextual integrity. */}
      <ContextualIntegrityCrossLink t={t} locale={locale} />
    </ContentShell>
  );
}
