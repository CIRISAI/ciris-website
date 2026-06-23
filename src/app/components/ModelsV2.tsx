// v2 "dark-blueprint" models page. Renders the same t.models.* dictionary keys
// the old ModelsContent did -- no copy is rewritten or re-translated here --
// inside the reusable ContentShell (violet accent, no hero graphic). The model
// lineup, selection criteria, production tiers, lineup rationale, the 128K+
// context requirement, Accord-support sections, and conclusion are mapped onto
// the shared content.module vocabulary: sectionLabel/h2 headers, paragraphs,
// callouts, notices, and the accent card variants. The four lineup model names
// are product names rendered verbatim, exactly as in the old component.
//
// Strings that carry typographic emphasis (<strong>, inline <a>) are stored as
// HTML in the dictionary and injected with dangerouslySetInnerHTML. The content
// is authored and machine-translated by us (never user input), so this is safe.

import type { Dictionary } from "@/i18n/dictionaries";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function ModelsV2({ t, locale }: { t: Dictionary; locale: string }) {
  const m = t.models;

  return (
    <ContentShell
      locale={locale}
      accent="violet"
      kicker={m.criteriaHeadline}
      title={m.h1}
      lede={m.heroPara}
      backHref="/"
      backLabel="back to the lobby"
      mtBanner={t.common.mtBanner}
    >
      {/* Current Lineup */}
      <section className={s.section}>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>Llama 4 Maverick</h3>
            <p>{m.maverickDesc}</p>
            <p className={s.footnote}>{m.maverickProviders}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>Llama 4 Scout</h3>
            <p>{m.scoutDesc}</p>
            <p className={s.footnote}>{m.scoutProviders}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>Qwen 3.6</h3>
            <p>{m.qwenDesc}</p>
            <p className={s.footnote}>{m.qwenProviders}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>Gemma 4</h3>
            <p>{m.gemmaDesc}</p>
            <p className={s.footnote}>{m.gemmaProviders}</p>
          </div>
        </div>
      </section>

      {/* Model Selection Criteria */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.criteriaHeadline}</p>
        <h2 className={s.h2}>{m.criteriaHeadline}</h2>
        <p className={s.paragraph}>{m.criteriaSubheadline}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.criteria1Heading}</h3>
            <p>{m.criteria1Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.criteria2Heading}</h3>
            <p>{m.criteria2Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.criteria3Heading}</h3>
            <p>{m.criteria3Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.criteria4Heading}</h3>
            <p>{m.criteria4Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.criteria5Heading}</h3>
            <p>{m.criteria5Body}</p>
          </div>
        </div>
      </section>

      {/* Production Deployment Tiers */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.productionHeading}</p>
        <h2 className={s.h2}>{m.productionHeading}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.tier1Heading}</h3>
            <p>{m.tier1Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.tier2Heading}</h3>
            <p>{m.tier2Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.tier3Heading}</h3>
            <p>{m.tier3Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.tier4Heading}</h3>
            <p>{m.tier4Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.tier5Heading}</h3>
            <p>{m.tier5Desc}</p>
          </div>
        </div>
      </section>

      {/* Why This Lineup */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.whyLineupHeading}</p>
        <h2 className={s.h2}>{m.whyLineupHeading}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.whyRoles1Heading}</h3>
            <p>{m.whyRoles1Body}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.whyRoles2Heading}</h3>
            <p>{m.whyRoles2Body}</p>
          </div>
        </div>

        <div className={`${s.card} ${s.cRose}`}>
          <h3>{m.whyExcludedHeading}</h3>
          <p>{m.whyExcludedBody}</p>
          <p dangerouslySetInnerHTML={h(m.whyExcludedFailure)} />
          <p>{m.whyExcludedConclusion}</p>
        </div>
      </section>

      {/* The 128K+ Context Requirement */}
      <div className={s.callout}>
        <h2 className={s.h2}>{m.contextHeading}</h2>
        <h3>{m.contextAlwaysOnHeading}</h3>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(m.contextAlwaysOnPara1)} />
        <p className={s.paragraph}>{m.contextAlwaysOnPara2}</p>

        <h3>{m.contextStateHeading}</h3>
        <p className={s.paragraph}>{m.contextStateIntro}</p>
        <p className={s.paragraph}>
          {[m.contextStateLi1, m.contextStateLi2, m.contextStateLi3, m.contextStateLi4].map(
            (item, i) => (
              <span key={i}>
                {"• "}
                {item}
                <br />
              </span>
            )
          )}
        </p>
        <p className={s.paragraph}>{m.contextStateConclusion}</p>

        <div className={`${s.card} ${s.cViolet}`}>
          <h3>{m.contextBottomLineLabel}</h3>
          <p>{m.contextBottomLineBody}</p>
        </div>
      </div>

      {/* How This Supports the Accord */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.accordHeadline}</p>
        <h2 className={s.h2}>{m.accordHeadline}</h2>
        <p className={s.paragraph}>{m.accordSubheadline}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.accord1Heading}</h3>
            <p>
              {[m.accord1Li1, m.accord1Li2, m.accord1Li3].map((item, i) => (
                <span key={i}>
                  {"• "}
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.accord2Heading}</h3>
            <p>
              {[m.accord2Li1, m.accord2Li2, m.accord2Li3].map((item, i) => (
                <span key={i}>
                  {"• "}
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.accord3Heading}</h3>
            <p>
              {[m.accord3Li1, m.accord3Li2, m.accord3Li3].map((item, i) => (
                <span key={i}>
                  {"• "}
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <div className={s.callout}>
        <h2 className={s.h2}>{m.conclusionHeading}</h2>
        <p className={s.paragraph}>{m.conclusionPara1}</p>
        <p className={s.paragraph}>{m.conclusionPara2}</p>
      </div>
    </ContentShell>
  );
}
