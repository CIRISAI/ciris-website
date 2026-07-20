// The lobby, v3: WHAT first, WHY second. Cold-opens with a clean product hero
// (what CIRIS is + install), then the convergence story — the four paths — as
// the WHY section below it: thesis headline, the swirl animation, and the four
// door cards (t.lobby.doors, translated since v1 but unrendered in v2). The
// thesis line "It turns out these are all the same problem." now reads AFTER
// its four antecedents are on screen. Dictionary-driven, 29 locales; internal
// links are locale-prefixed via localizeHref.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import ConvergenceHero from "@/app/components/graphics/ConvergenceHero";
import StoreBadges from "@/app/components/graphics/StoreBadges";
import SiteHeader from "@/app/components/SiteHeader";
import styles from "./lobby.module.css";

const DOOR_ACCENT: Record<string, string> = {
  cyan: styles.cyan,
  teal: styles.teal,
  violet: styles.violet,
  rose: styles.rose,
};

export default function LobbyContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const l = t.lobby;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <>
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <SiteHeader locale={locale} />
      <div className={styles.wrap}>
        {/* THE WHAT — a clean product hero: what it is, install it. */}
        <section className={`${styles.hero} ${styles.heroSolo}`}>
          <p className={styles.eyebrow}>{l.eyebrow}</p>
          <h1 className={styles.h1}>
            {l.whatH1pre}
            <span className={styles.accent}>{l.whatH1accent}</span>
          </h1>
          <p className={styles.lede}>{l.whatLede}</p>
          {/* A tiny strip of undeniable facts — legitimacy, stated not shown. */}
          <ul className={styles.facts} aria-label="At a glance">
            {l.facts.map((f) => (
              <li className={styles.fact} key={f}>{f}</li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Link className={`${styles.btn} ${styles.btnP}`} href={lh("/install")}>{l.ctaInstall} →</Link>
            <Link className={`${styles.btn} ${styles.btnS}`} href={lh("/install")}>{l.ctaPip}</Link>
          </div>
          <StoreBadges labels={l.store} className={styles.stores} />
          <div className={styles.ctahint}>{l.ctaHint}</div>
        </section>

        {/* THE WHY — four huge problems, the swirl that fuses them, then the
            punchline. Reads top-to-bottom: problems → convergence → thesis. */}
        <section className={styles.why}>
          <p className={styles.whyProblemsHead}>{l.whyProblemsHead}</p>
          <ul className={styles.whyProblems}>
            <li>{l.heroLabels.consumerAi}</li>
            <li>{l.heroLabels.bigTech}</li>
            <li>{l.heroLabels.superalignment}</li>
            <li>{l.heroLabels.misinformation}</li>
          </ul>
          <div className={styles.whyArt}>
            <ConvergenceHero
              labels={l.heroLabels}
              links={{
                consumerAi: lh("/paths/consumer-ai"),
                misinformation: lh("/paths/misinformation"),
                superalignment: lh("/paths/superalignment"),
                bigTech: lh("/paths/big-tech"),
              }}
            />
          </div>
          <h2 className={styles.whyH2}>
            {l.h1pre}
            <span className={styles.accent}>{l.h1accent}</span>
          </h2>
          <p className={styles.turn}>
            {l.turnPre}
            <b>{l.turnAccent}</b>
            {l.turnPost}
          </p>
        </section>

        {/* The four doors — pick your fear, every one lands on the same floor. */}
        <div className={styles.doorsHead}>
          <h2>{l.doorsHead}</h2>
          <span className="q">{l.doorsNote}</span>
        </div>
        <div className={styles.doors}>
          {l.doors.map((d) => (
            <Link
              key={d.k}
              href={lh(d.href)}
              className={`${styles.door} ${DOOR_ACCENT[d.accent] ?? ""} ${d.heavy ? styles.heavy : ""}`}
            >
              <span className="k">{d.k}</span>
              <h3>{d.h}</h3>
              <p>{d.p}</p>
              <span className="go">{d.go} →</span>
            </Link>
          ))}
        </div>

        <section className={styles.conv}>
          <p>
            {l.convergence} <b>{l.convergenceAccent}</b>
          </p>
        </section>

        <div className={styles.foot}>
          <span>{l.footL}</span>
          <span>{l.footR}</span>
        </div>
      </div>
    </>
  );
}
