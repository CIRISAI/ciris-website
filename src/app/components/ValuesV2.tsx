// /values — what CIRIS builds into the agent, and the argument for building it
// that way.
//
// Two halves that belong on one page. The first states the values: Meta-Goal
// M-1 as the apex, then the six principles the conscience reasons with. The
// second is the load-bearing claim: values run inside the agent at decision
// time, and accountability is proved by the shape of the signed envelope
// rather than by an inspector reading the content, because structure stays
// cheap to check as capability grows and judgment does not.
//
// The six principles are rendered from howItWorks.principles rather than
// copied into a second dictionary section. One source, so the two pages cannot
// drift and the six items are not translated twice.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import PageShell from "@/app/components/PageShell";
import { contentStyles as s } from "@/app/components/v2/ContentShell";

export default function ValuesV2({ t, locale }: { t: Dictionary; locale: string }) {
  const v = t.values;
  const principles = t.howItWorks.principles;
  const lh = (href: string) => localizeHref(href, locale);

  const envelope: string[] = [
    v.shapeItem1,
    v.shapeItem2,
    v.shapeItem3,
    v.shapeItem4,
    v.shapeItem5,
    v.shapeItem6,
  ];

  const binds: Array<{ head: string; body: string }> = [
    { head: v.bind1Head, body: v.bind1Body },
    { head: v.bind2Head, body: v.bind2Body },
    { head: v.bind3Head, body: v.bind3Body },
    { head: v.bind4Head, body: v.bind4Body },
  ];

  return (
    <PageShell
      nav={t.homeHero}
      locale={locale}
      accent="violet"
      kicker={v.kicker}
      title={v.h1}
      lede={v.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The apex goal everything else serves. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.apexHead}</h2>
        <div className={s.callout}>
          <p>{t.constitution.apexQuote}</p>
          <p className={s.footnote}>{v.apexQuoteAttrib}</p>
        </div>
        <p className={s.paragraph}>{v.apexP1}</p>
        <p className={s.paragraph}>{v.apexP2}</p>
      </section>

      {/* The six, read from the one place they are defined. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.sixHead}</h2>
        <p className={s.paragraph}>{v.sixLead}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {principles.items.map((p) => (
            <div key={p.name} className={`${s.card} ${s.cViolet}`}>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className={s.notice}>
          <p className={s.sectionLabel}>{v.sixRule}</p>
          <p>{v.sixRuleBody}</p>
        </div>
      </section>

      {/* Why the values sit inside the agent rather than around it. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.insideHead}</h2>
        <p className={s.paragraph}>{v.insideP1}</p>
        <p className={s.paragraph}>{v.insideP2}</p>
        <p className={s.paragraph}>{v.insideP3}</p>
      </section>

      {/* The argument. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.shapeHead}</h2>
        <p className={s.paragraph}>{v.shapeP1}</p>
        <p className={s.paragraph}>{v.shapeP2}</p>
        <ul className={s.paragraph} style={{ marginLeft: "1.5rem", listStyle: "disc" }}>
          {envelope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={s.paragraph}>{v.shapeP3}</p>

        <div className={s.callout}>
          <p className={s.sectionLabel}>{v.shapeClaimHead}</p>
          <p>{v.shapeClaim}</p>
        </div>

        <div className={s.notice}>
          <p className={s.sectionLabel}>{v.shapeLimitHead}</p>
          <p>{v.shapeLimit}</p>
        </div>
      </section>

      {/* What makes consent and authority checkable by a machine. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.cegHead}</h2>
        <p className={s.paragraph}>{v.cegP1}</p>
        <p className={s.paragraph}>{v.cegP2}</p>
        <p className={s.paragraph}>{v.cegP3}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/compliance")} className={`${s.btn} ${s.btnP}`}>
            {v.ctaCompliance}
          </Link>
          <Link href={lh("/grammar")} className={`${s.btn} ${s.btnS}`}>
            {v.ctaGrammar}
          </Link>
        </div>
      </section>

      {/* Where the values actually bind. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.bindHead}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {binds.map((b) => (
            <div key={b.head} className={`${s.card} ${s.cViolet}`}>
              <h3>{b.head}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The invitation to attack it. */}
      <section className={s.section}>
        <h2 className={s.h2}>{v.attackHead}</h2>
        <p className={s.paragraph}>{v.attackP1}</p>
        <p className={s.paragraph}>{v.attackP2}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/constitution")} className={`${s.btn} ${s.btnP}`}>
            {v.ctaConstitution}
          </Link>
          <Link href={lh("/how-it-works")} className={`${s.btn} ${s.btnS}`}>
            {v.ctaHowItWorks}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
