// v2 "dark-blueprint" Mission Driven Development page. Renders the same
// t.mdd.* dictionary keys the old MddContent did — no copy is rewritten or
// re-translated here — inside the reusable ContentShell, with a brass accent
// fitting a methodology page. The long body (four-component model, alignment,
// requirements, implementation patterns, sustainability, quality gates, failure
// modes, CIRIS case study, adoption, closing) is mapped onto the shared
// content.module vocabulary: sectionLabel/h2 headers, paragraphs, callouts,
// notices, and the accent card variants. Existing links/CTAs are preserved.
//
// Strings that carry typographic emphasis (<strong>/<em>/inline <a>) are stored
// as HTML in the dictionary and injected with dangerouslySetInnerHTML. The
// content is authored and machine-translated by us (never user input), so this
// is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

/** Shape of the mdd namespace (mirrors _src/mdd.json). */
interface MddNS {
  heroBadgeMethodology: string;
  heroBadgeActive: string;
  heroEyebrow: string;
  h1: string;
  heroPara: string;
  fourEyebrow: string;
  fourH2: string;
  fourPara: string;
  leg1Label: string;
  leg1H3: string;
  leg1Desc: string;
  leg2Label: string;
  leg2H3: string;
  leg2Desc: string;
  leg3Label: string;
  leg3H3: string;
  leg3Desc: string;
  seatLabel: string;
  seatH3: string;
  seatDesc: string;
  alignEyebrow: string;
  alignH2: string;
  alignParaHtml: string;
  reqEyebrow: string;
  reqH2: string;
  req1H3: string;
  req1Li1: string;
  req1Li2: string;
  req1Li3: string;
  req1Li4: string;
  req2H3: string;
  req2Li1: string;
  req2Li2: string;
  req2Li3: string;
  req2Li4: string;
  req3H3: string;
  req3Li1: string;
  req3Li2: string;
  req3Li3: string;
  req3Li4: string;
  implEyebrow: string;
  implH2: string;
  implSvcH3: string;
  implSvcFlow: string;
  implSvcLi1Html: string;
  implSvcLi2Html: string;
  implSvcLi3Html: string;
  implSchH3: string;
  implSchFlow: string;
  implSchLi1Html: string;
  implSchLi2Html: string;
  implSchLi3Html: string;
  implProtoH3: string;
  implProtoFlow: string;
  implProtoLi1Html: string;
  implProtoLi2Html: string;
  implProtoLi3Html: string;
  sustEyebrow: string;
  sustH2: string;
  sust1H3: string;
  sust1Li1: string;
  sust1Li2: string;
  sust1Li3: string;
  sust2H3: string;
  sust2Li1: string;
  sust2Li2: string;
  sust2Li3: string;
  sust3H3: string;
  sust3Li1: string;
  sust3Li2: string;
  sust3Li3: string;
  gateEyebrow: string;
  gateH2: string;
  gate1H3: string;
  gate1Li1: string;
  gate1Li2: string;
  gate1Li3: string;
  gate2H3: string;
  gate2Li1: string;
  gate2Li2: string;
  gate2Li3: string;
  gate2Li4: string;
  gate3H3: string;
  gate3Li1: string;
  gate3Li2: string;
  gate3Li3: string;
  failEyebrow: string;
  failH2: string;
  fail1H3: string;
  fail1Body: string;
  fail2H3: string;
  fail2Body: string;
  fail3H3: string;
  fail3Body: string;
  fail4H3: string;
  fail4Body: string;
  caseEyebrow: string;
  caseH2: string;
  caseParaHtml: string;
  caseArchH3: string;
  caseArchLi1: string;
  caseArchLi2: string;
  caseArchLi3: string;
  caseArchLi4Html: string;
  caseArchLi5Html: string;
  caseArchLi6: string;
  caseSuccessH3: string;
  caseSuccessLi1: string;
  caseSuccessLi2Html: string;
  caseSuccessLi3: string;
  caseSuccessLi4: string;
  adoptEyebrow: string;
  adoptH2: string;
  adoptNewH3: string;
  adoptNewLi1: string;
  adoptNewLi2: string;
  adoptNewLi3: string;
  adoptNewLi4: string;
  adoptExistH3: string;
  adoptExistLi1: string;
  adoptExistLi2: string;
  adoptExistLi3: string;
  adoptExistLi4: string;
  adoptTeamH3: string;
  adoptTeamLi1: string;
  adoptTeamLi2: string;
  adoptTeamLi3: string;
  adoptTeamLi4: string;
  closeEyebrow: string;
  closeH2: string;
  closePara1: string;
  closePara2: string;
  closeLink1: string;
  closeLink2: string;
  closeLink3: string;
  closeLink4: string;
}

/** Extended dictionary that includes the mdd namespace. */
type DictionaryWithMdd = Dictionary & { mdd: MddNS };

export default function MddV2({ t, locale }: { t: Dictionary; locale: string }) {
  const m = (t as DictionaryWithMdd).mdd;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="brass"
      kicker={m.heroEyebrow}
      title={m.h1}
      lede={m.heroPara}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Hero badges */}
      <div className={s.section}>
        <div className={s.levelPill}>
          <span className={`${s.levelTab} ${s.levelTabActive}`}>{m.heroBadgeMethodology}</span>
          <span className={s.levelTab}>{m.heroBadgeActive}</span>
        </div>
      </div>

      {/* Four-component model */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.fourEyebrow}</p>
        <h2 className={s.h2}>{m.fourH2}</h2>
        <p className={s.paragraph}>{m.fourPara}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <p className={s.footnote}>{m.leg1Label}</p>
            <h3>{m.leg1H3}</h3>
            <p>{m.leg1Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <p className={s.footnote}>{m.leg2Label}</p>
            <h3>{m.leg2H3}</h3>
            <p>{m.leg2Desc}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <p className={s.footnote}>{m.leg3Label}</p>
            <h3>{m.leg3H3}</h3>
            <p>{m.leg3Desc}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <p className={s.footnote}>{m.seatLabel}</p>
            <h3>{m.seatH3}</h3>
            <p>{m.seatDesc}</p>
          </div>
        </div>
      </section>

      {/* Constant alignment */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{m.alignEyebrow}</p>
        <h2 className={s.h2}>{m.alignH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(m.alignParaHtml)} />
      </div>

      {/* Mission framework requirements */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.reqEyebrow}</p>
        <h2 className={s.h2}>{m.reqH2}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.req1H3}</h3>
            <p>
              • {m.req1Li1}<br />
              • {m.req1Li2}<br />
              • {m.req1Li3}<br />
              • {m.req1Li4}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.req2H3}</h3>
            <p>
              • {m.req2Li1}<br />
              • {m.req2Li2}<br />
              • {m.req2Li3}<br />
              • {m.req2Li4}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.req3H3}</h3>
            <p>
              • {m.req3Li1}<br />
              • {m.req3Li2}<br />
              • {m.req3Li3}<br />
              • {m.req3Li4}
            </p>
          </div>
        </div>
      </section>

      {/* Implementation patterns */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.implEyebrow}</p>
        <h2 className={s.h2}>{m.implH2}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{m.implSvcH3}</h3>
            <p className={s.footnote}>{m.implSvcFlow}</p>
            <p>
              <span dangerouslySetInnerHTML={h("• " + m.implSvcLi1Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implSvcLi2Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implSvcLi3Html)} />
            </p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{m.implSchH3}</h3>
            <p className={s.footnote}>{m.implSchFlow}</p>
            <p>
              <span dangerouslySetInnerHTML={h("• " + m.implSchLi1Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implSchLi2Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implSchLi3Html)} />
            </p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{m.implProtoH3}</h3>
            <p className={s.footnote}>{m.implProtoFlow}</p>
            <p>
              <span dangerouslySetInnerHTML={h("• " + m.implProtoLi1Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implProtoLi2Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.implProtoLi3Html)} />
            </p>
          </div>
        </div>
      </section>

      {/* Sustainable development */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.sustEyebrow}</p>
        <h2 className={s.h2}>{m.sustH2}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.sust1H3}</h3>
            <p>
              • {m.sust1Li1}<br />
              • {m.sust1Li2}<br />
              • {m.sust1Li3}
            </p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.sust2H3}</h3>
            <p>
              • {m.sust2Li1}<br />
              • {m.sust2Li2}<br />
              • {m.sust2Li3}
            </p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.sust3H3}</h3>
            <p>
              • {m.sust3Li1}<br />
              • {m.sust3Li2}<br />
              • {m.sust3Li3}
            </p>
          </div>
        </div>
      </section>

      {/* Quality gates */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.gateEyebrow}</p>
        <h2 className={s.h2}>{m.gateH2}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.gate1H3}</h3>
            <p>
              • {m.gate1Li1}<br />
              • {m.gate1Li2}<br />
              • {m.gate1Li3}
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.gate2H3}</h3>
            <p>
              • {m.gate2Li1}<br />
              • {m.gate2Li2}<br />
              • {m.gate2Li3}<br />
              • {m.gate2Li4}
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.gate3H3}</h3>
            <p>
              • {m.gate3Li1}<br />
              • {m.gate3Li2}<br />
              • {m.gate3Li3}
            </p>
          </div>
        </div>
      </section>

      {/* Failure modes */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.failEyebrow}</p>
        <h2 className={s.h2}>{m.failH2}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.fail1H3}</h3>
            <p>{m.fail1Body}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.fail2H3}</h3>
            <p>{m.fail2Body}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.fail3H3}</h3>
            <p>{m.fail3Body}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.fail4H3}</h3>
            <p>{m.fail4Body}</p>
          </div>
        </div>
      </section>

      {/* Case study: CIRIS */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{m.caseEyebrow}</p>
        <h2 className={s.h2}>{m.caseH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(m.caseParaHtml)} />
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.caseArchH3}</h3>
            <p>
              • {m.caseArchLi1}<br />
              • {m.caseArchLi2}<br />
              • {m.caseArchLi3}<br />
              <span dangerouslySetInnerHTML={h("• " + m.caseArchLi4Html)} /><br />
              <span dangerouslySetInnerHTML={h("• " + m.caseArchLi5Html)} /><br />
              • {m.caseArchLi6}
            </p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{m.caseSuccessH3}</h3>
            <p>
              • {m.caseSuccessLi1}<br />
              <span dangerouslySetInnerHTML={h("• " + m.caseSuccessLi2Html)} /><br />
              • {m.caseSuccessLi3}<br />
              • {m.caseSuccessLi4}
            </p>
          </div>
        </div>
      </div>

      {/* Adoption guidelines */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.adoptEyebrow}</p>
        <h2 className={s.h2}>{m.adoptH2}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.adoptNewH3}</h3>
            <p>
              1. {m.adoptNewLi1}<br />
              2. {m.adoptNewLi2}<br />
              3. {m.adoptNewLi3}<br />
              4. {m.adoptNewLi4}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.adoptExistH3}</h3>
            <p>
              1. {m.adoptExistLi1}<br />
              2. {m.adoptExistLi2}<br />
              3. {m.adoptExistLi3}<br />
              4. {m.adoptExistLi4}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{m.adoptTeamH3}</h3>
            <p>
              • {m.adoptTeamLi1}<br />
              • {m.adoptTeamLi2}<br />
              • {m.adoptTeamLi3}<br />
              • {m.adoptTeamLi4}
            </p>
          </div>
        </div>
      </section>

      {/* Closing / CTA */}
      <section className={s.cta}>
        <p className={s.sectionLabel}>{m.closeEyebrow}</p>
        <h2 className={s.h2}>{m.closeH2}</h2>
        <p className={s.ctaPara}>{m.closePara1}</p>
        <p className={s.paragraph}>{m.closePara2}</p>
        <div className={s.ctaRow}>
          <a
            href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/MISSION_DRIVEN_DEVELOPMENT.md"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {m.closeLink1}
          </a>
          <Link href={lh("/vision")} className={`${s.btn} ${s.btnS}`}>
            {m.closeLink2}
          </Link>
          <Link href={lh("/sections/main")} className={`${s.btn} ${s.btnS}`}>
            {m.closeLink3}
          </Link>
          <Link href={lh("/federation")} className={`${s.btn} ${s.btnS}`}>
            {m.closeLink4}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
