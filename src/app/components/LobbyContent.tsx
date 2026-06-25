// The convergence-first home lobby (v2). Cold-opens with the claim + the
// MEASURED scoreboard, then four unequal-gravity doors. Dictionary-driven, so it
// localizes through the existing 29-locale system. Internal links are
// locale-prefixed via localizeHref.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import ConvergenceHero from "@/app/components/graphics/ConvergenceHero";
import StoreBadges from "@/app/components/graphics/StoreBadges";
import SiteHeader from "@/app/components/SiteHeader";
import styles from "./lobby.module.css";

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
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{l.eyebrow}</p>
          <div className={styles.heroTop}>
            <div className={styles.heroArt}>
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
            <div className={styles.heroText}>
              <h1 className={styles.h1}>
                {l.h1pre}
                <span className={styles.accent}>{l.h1accent}</span>
              </h1>
              <p className={styles.turn}>
                {l.turnPre}
                <b>{l.turnAccent}</b>
                {l.turnPost}
              </p>
              {/* A tiny strip of undeniable facts — legitimacy, stated not shown. */}
              <ul className={styles.facts} aria-label="At a glance">
                {l.facts.map((f) => (
                  <li className={styles.fact} key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.cta}>
            <Link className={`${styles.btn} ${styles.btnP}`} href={lh("/install")}>{l.ctaInstall} →</Link>
            <Link className={`${styles.btn} ${styles.btnS}`} href={lh("/install")}>{l.ctaPip}</Link>
          </div>
          <StoreBadges labels={l.store} className={styles.stores} />
          <div className={styles.ctahint}>{l.ctaHint}</div>
        </section>

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
