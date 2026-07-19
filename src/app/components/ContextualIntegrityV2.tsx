// Cited SEO/concept landing page (/contextual-integrity), localized. The anchor
// for the site-wide "contextual integrity" tagging: explains Nissenbaum's
// framework in plain language, then shows the one-to-one mapping from her five
// privacy parameters onto CIRIS wire fields, with constitution citations. Prose
// from t.contextualIntegrity (29 locales); citation URLs and the CC part links
// stay in code, matching the SecurityKillSwitchV2 idiom. Wire tokens
// (subject_key_ids, consent:scope, ...) render inside the translated strings and
// stay verbatim across locales per the translation brief.

import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import Link from "next/link";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;

const CONST_BASE = "https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CIRIS_Constitution";
// Constitution part file per mapping row, same order as t.contextualIntegrity.params.
const PARAM_CITE_FILES = [
  "part_2_the_grammar.md", // CC 2.3  subject_key_ids
  "part_2_the_grammar.md", // CC 2.1  envelope / attesting_key_id
  "part_2_the_grammar.md", // CC 2.3.3 three-axis orthogonality
  "part_3_the_namespace.md", // CC 3.1  dimension namespace
  "part_3_the_namespace.md", // CC 3.3.1 consent family
];
// Alternate the two privacy-family accents down the mapping cards.
const PARAM_ACCENTS = [s.cCyan, s.cTeal, s.cCyan, s.cTeal, s.cCyan];

// External citations, same order as t.contextualIntegrity.sources.
const SOURCE_URLS = [
  "https://digitalcommons.law.uw.edu/wlr/vol79/iss1/10/",
  "https://nissenbaum.tech.cornell.edu/papers/Privacy%20and%20Contextual%20Integrity%20-%20Frameworks%20and%20Applications.pdf",
  "https://www.microsoft.com/en-us/research/blog/reducing-privacy-leaks-in-ai-two-approaches-to-contextual-integrity/",
  "https://arxiv.org/abs/2508.06760",
];

export default function ContextualIntegrityV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.contextualIntegrity;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={c.kicker}
      title={c.title}
      lede={c.lede}
      // INTERIM hero: g13 (prefixes compose, seal sets) borrowed from /grammar
      // until the bespoke CI graphic (g18, briefed in the design project as
      // BRIEF-contextual-integrity-graphics.md) lands.
      graphicId="g13"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      {/* 1 · What contextual integrity is */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s1label}</p>
        <h2 className={s.h2}>{c.s1h2}</h2>
        <p className={s.paragraph}>{c.s1p1}</p>
        <p className={s.paragraph}>{c.s1p2}</p>
      </section>

      {/* 2 · The five-parameter mapping, one card per parameter */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s2label}</p>
        <h2 className={s.h2}>{c.s2h2}</h2>
        <p className={s.paragraph}>{c.s2intro}</p>
        <div className={s.cardGrid}>
          {c.params.map((p, i) => (
            <a
              key={p.name}
              href={`${CONST_BASE}/${PARAM_CITE_FILES[i]}`}
              {...A}
              className={`${s.card} ${PARAM_ACCENTS[i]}`}
            >
              <h3>{p.name}</h3>
              <p>{p.body}</p>
              <p className={s.footnote}>
                {c.citePrefix} <span dir="ltr">{p.cite}</span>
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3 · Transmission-principle spotlight */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{c.s3label}</p>
        <h2 className={s.h2}>{c.s3h2}</h2>
        <p className={s.paragraph}>{c.s3p1}</p>
        <p className={s.paragraph}>{c.s3p2}</p>
      </div>

      {/* 4 · Beyond the checkbox */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s4label}</p>
        <h2 className={s.h2}>{c.s4h2}</h2>
        <div className={s.cardGrid}>
          {c.beyond.map((b) => (
            <div key={b.title} className={`${s.card} ${s.cViolet}`}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · The convergence story */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s5label}</p>
        <h2 className={s.h2}>{c.s5h2}</h2>
        <p className={s.paragraph}>{c.s5p1}</p>
      </section>

      {/* 6 · The AI-agent research context + cited sources */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s6label}</p>
        <h2 className={s.h2}>{c.s6h2}</h2>
        <p className={s.paragraph}>{c.s6p1}</p>
        <p className={s.sectionLabel}>{c.sourcesLabel}</p>
        {c.sources.map((src, i) => (
          <p key={src} className={s.footnote}>
            <a href={SOURCE_URLS[i]} {...A}>{src}</a>
          </p>
        ))}
      </section>

      {/* Read the machinery */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{c.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/constitution")} className={`${s.btn} ${s.btnP}`}>{c.btnConstitution}</Link>
          <Link href={lh("/structural-privacy")} className={`${s.btn} ${s.btnS}`}>{c.btnPrivacy}</Link>
          <Link href={lh("/grammar")} className={`${s.btn} ${s.btnS}`}>{c.btnGrammar}</Link>
          <Link href={lh("/cewp")} className={`${s.btn} ${s.btnS}`}>{c.btnCewp}</Link>
        </div>
      </section>
    </ContentShell>
  );
}

/** Small cross-link callout other pages render to tag themselves with the
 *  concept and funnel link equity to the anchor. Same translated strings. */
export function ContextualIntegrityCrossLink({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.contextualIntegrity;
  return (
    <div className={s.callout}>
      <h2 className={s.h2}>{c.crossTitle}</h2>
      <p className={s.paragraph}>{c.crossBody}</p>
      <Link href={localizeHref("/contextual-integrity", locale)} className={`${s.btn} ${s.btnP}`}>
        {c.crossCta}
      </Link>
    </div>
  );
}
