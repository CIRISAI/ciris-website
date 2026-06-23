// v2 "dark-blueprint" federation (Plain English level). Renders the same
// t.federation.* dictionary keys the old SimpleContent did — no copy is rewritten
// here — inside the reusable ContentShell, with the Federation-of-Equals graphic
// (g08, teal/violet palette → teal accent) and the colored chain/join cards
// mapped onto the v2 accent card variants (violet / ok / brass / rose, blue /
// green). The simple↔advanced toggle is kept working via a dark v2 pill.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

function LevelPill({
  locale,
  levels,
}: {
  locale: string;
  levels: { simple: string; advanced: string; srLabel: string };
}) {
  const lh = (href: string) => localizeHref(href, locale);
  return (
    <div role="tablist" aria-label={levels.srLabel} className={s.levelPill}>
      <span className={`${s.levelTab} ${s.levelTabActive}`} role="tab" aria-selected="true">
        {levels.simple}
      </span>
      <Link className={s.levelTab} href={lh("/federation/advanced")} role="tab" aria-selected="false">
        {levels.advanced}
      </Link>
    </div>
  );
}

export default function FederationV2({ t, locale }: { t: Dictionary; locale: string }) {
  const f = t.federation;
  const sh = f.shell;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="teal"
      kicker="The CIRIS Federation"
      title={sh.h1}
      lede={sh.subtitleSimple}
      graphicId="g08"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      <div className={s.section}>
        <LevelPill locale={locale} levels={t.common.levels} />
      </div>

      <div className={s.section}>
        <p className={s.paragraph}>{f.intro}</p>
      </div>

      <div className={s.callout}>
        <p className={s.paragraph}>{f.supervisionCallout}</p>
      </div>

      <section className={s.section}>
        <p className={s.sectionLabel}>{f.networkLabel}</p>
        <h2 className={s.h2}>{f.networkH2}</h2>
        <p className={s.paragraph}>{f.networkP1}</p>
        <p className={s.paragraph}>{f.networkP2}</p>
        <p className={s.paragraph}>{f.networkP3}</p>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{f.chainLabel}</p>
        <h2 className={s.h2}>{f.chainH2}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{f.chainPeopleH3}</h3>
            <p>{f.chainPeopleBody}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{f.chainEthicalSelfAwareH3}</h3>
            <p>{f.chainEthicalSelfAwareBody}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{f.chainEthicalH3}</h3>
            <p>{f.chainEthicalBody}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{f.chainSimpleH3}</h3>
            <p>{f.chainSimpleBody}</p>
          </div>
        </div>
        <p className={s.footnote}>{f.chainFooter}</p>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{f.recordsLabel}</p>
        <h2 className={s.h2}>{f.recordsH2}</h2>
        <p className={s.paragraph}>{f.recordsP1}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(f.recordsP2Html)} />
      </section>

      <div className={s.callout}>
        <p className={s.sectionLabel}>{f.healthyLabel}</p>
        <h2 className={s.h2}>{f.healthyH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(f.healthyBodyHtml)} />
      </div>

      <div className={s.notice}>
        <p dangerouslySetInnerHTML={h(f.statusWarningHtml)} />
      </div>

      <section className={s.section}>
        <p className={s.sectionLabel}>{f.joinLabel}</p>
        <h2 className={s.h2}>{f.joinH2}</h2>
        <p className={s.paragraph}>{f.joinP1}</p>
        <p className={s.paragraph}>{f.joinP2}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{f.registeredH3}</h3>
            <p>{f.registeredBody}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{f.sovereignH3}</h3>
            <p>{f.sovereignBody}</p>
          </div>
        </div>
        <p className={s.footnote}>{f.joinFooter}</p>
      </section>

      <div className={s.callout}>
        <h2 className={s.h2}>{f.honestH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(f.honestBodyHtml)} />
      </div>

      <section className={s.section}>
        <p className={s.sectionLabel}>{f.engageLabel}</p>
        <h2 className={s.h2}>{f.engageH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(f.engageP1Html)} />
        <p className={s.paragraph} dangerouslySetInnerHTML={h(f.engageP2Html)} />
        <p className={s.paragraph}>{f.engageP3}</p>
      </section>

      <section className={s.cta}>
        <p className={s.ctaPara}>{sh.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/coherence-ratchet")} className={`${s.btn} ${s.btnP}`}>
            {sh.ctaBtn1}
          </Link>
          <Link href={lh("/ciris-scoring")} className={`${s.btn} ${s.btnS}`}>
            {sh.ctaBtn2}
          </Link>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {sh.ctaBtn3}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
