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

const ACCENT: Record<string, string> = {
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
      <div className={styles.wrap}>
        <SiteHeader locale={locale} />

        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{l.eyebrow}</p>
              <h1 className={styles.h1}>
                {l.h1pre}
                <span className={styles.accent}>{l.h1accent}</span>
              </h1>
              <p className={styles.lede}>{l.lede}</p>
              <p className={styles.turn}>
                {l.turnPre}
                <b>{l.turnAccent}</b>
                {l.turnPost}
              </p>
            </div>
            <div className={styles.heroArt}>
              <ConvergenceHero labels={l.heroLabels} />
            </div>
          </div>

          <div className={styles.score}>
            {l.stats.map((s) => (
              <div className={styles.stat} key={s.l}>
                <div className={styles.statV} dir="ltr">{s.v}</div>
                <div className={styles.statL}>
                  {s.l}{" "}
                  <span className={`${styles.tag} ${s.tag === "measured" ? styles.measured : styles.model}`}>
                    {s.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <Link className={`${styles.btn} ${styles.btnP}`} href={lh("/install")}>{l.ctaInstall} →</Link>
            <Link className={`${styles.btn} ${styles.btnS}`} href={lh("/install")}>{l.ctaPip}</Link>
          </div>
          <StoreBadges labels={l.store} className={styles.stores} />
          <div className={styles.ctahint}>{l.ctaHint}</div>
        </section>

        <div className={styles.doorsHead}>
          <h2>{l.doorsHead}</h2>
          <span className={styles.q}>{l.doorsNote}</span>
        </div>
        <section className={styles.doors}>
          {l.doors.map((d) => (
            <Link
              key={d.k}
              href={lh(d.href)}
              className={`${styles.door} ${ACCENT[d.accent] ?? styles.cyan} ${d.heavy ? styles.heavy : ""}`}
            >
              <span className={styles.glow} />
              <div className={styles.bar} />
              <div className={styles.k}>{d.k}</div>
              <h3>{d.h}</h3>
              <p>{d.p}</p>
              <span className={styles.go}>{d.go} →</span>
            </Link>
          ))}
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
