// /ciris-scoring — how a score is earned in the mesh, with no live numbers.
//
// The page this replaces rendered a live dashboard against the lens scoring
// endpoints. That serving is down, so the dashboard is gone and the page now
// explains the mechanism instead: the two consents, who signs a score and why
// it can never be the subject, what the number measures (independent
// constraint, not merit), and what it deliberately does not say.
//
// Grounded in CIRISServer: src/scorer.rs (the periodic scorer and its consent
// gate), src/scorer/n_eff.rs (the measure), crates/ciris-lens-core/src/capacity
// (the anti-self-attestation type and the [0,1] band), src/capacity_read.rs
// (reads are by subject and every row names its author), src/equivocation.rs,
// src/key_standing.rs, and FSD/GENESIS_TO_SCORE.md (the path from a minted
// trust root to a score).

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import PageShell from "@/app/components/PageShell";
import { contentStyles as s } from "@/app/components/v2/ContentShell";

export default function CirisScoringV2({ t, locale }: { t: Dictionary; locale: string }) {
  const sc = t.scoring;
  const lh = (href: string) => localizeHref(href, locale);

  const honest: Array<{ head: string; body: string }> = [
    { head: sc.honest1Head, body: sc.honest1Body },
    { head: sc.honest2Head, body: sc.honest2Body },
    { head: sc.honest3Head, body: sc.honest3Body },
    { head: sc.honest4Head, body: sc.honest4Body },
    { head: sc.honest5Head, body: sc.honest5Body },
    { head: sc.honest6Head, body: sc.honest6Body },
  ];

  return (
    <PageShell
      nav={t.homeHero}
      locale={locale}
      accent="teal"
      kicker={sc.kicker}
      title={sc.h1}
      lede={sc.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The two grants, and what declining costs. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.permHead}</h2>
        <p className={s.paragraph}>{sc.permP1}</p>
        <p className={s.paragraph}>{sc.permP2}</p>

        <div className={s.notice}>
          <p className={s.sectionLabel}>{sc.permCostHead}</p>
          <ul>
            <li>{sc.permCost1}</li>
            <li>{sc.permCost2}</li>
            <li>{sc.permCost3}</li>
          </ul>
        </div>

        <p className={s.paragraph}>{sc.permP3}</p>
      </section>

      {/* Who signs a new agent's score. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.whoHead}</h2>
        <p className={s.paragraph}>{sc.whoP1}</p>
        <p className={s.paragraph}>{sc.whoP2}</p>
        <p className={s.paragraph}>{sc.whoP3}</p>
      </section>

      {/* The measure itself. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.measureHead}</h2>
        <p className={s.paragraph}>{sc.measureP1}</p>
        <p className={s.paragraph}>{sc.measureP2}</p>
        <p className={s.paragraph}>{sc.measureP3}</p>
        <div className={s.callout}>{sc.measureCallout}</div>
        <p className={s.paragraph}>{sc.measureP4}</p>
      </section>

      {/* The honest scope. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.limitsHead}</h2>
        <p className={s.paragraph}>{sc.limitsP1}</p>
        <p className={s.paragraph}>{sc.limitsP2}</p>
        <p className={s.paragraph}>{sc.limitsP3}</p>
      </section>

      {/* The properties that hold it up. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.honestHead}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {honest.map((item) => (
            <div key={item.head} className={`${s.card} ${s.cTeal}`}>
              <h3>{item.head}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why the dashboard is gone, and what to read instead. */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.noNumbersHead}</h2>
        <p className={s.paragraph}>{sc.noNumbersP1}</p>
        <p className={s.paragraph}>{sc.noNumbersP2}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/explore-a-trace")} className={`${s.btn} ${s.btnP}`}>
            {sc.ctaTrace}
          </Link>
          <Link href={lh("/research-status")} className={`${s.btn} ${s.btnS}`}>
            {sc.ctaResearch}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
