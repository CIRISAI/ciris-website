// The convergence-first home lobby (v2). Cold-opens with the claim + the
// MEASURED scoreboard, then four unequal-gravity doors. Dictionary-driven, so it
// localizes through the existing 29-locale system. Internal links are
// locale-prefixed via localizeHref.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
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
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <span className={styles.dot} /> CIRIS · safe by structure, open by principle, kind by design
          </div>
          <div className={styles.navlinks}>
            <a className="g" href={lh("/install")}>Install</a>
            <a href={lh("/research-status")}>Proof</a>
            <a href={lh("/grammar")}>Constitution</a>
            <a href="https://github.com/CIRISAI/CIRISAgent">GitHub</a>
          </div>
        </nav>

        <section className={styles.hero}>
          <svg className={styles.art} viewBox="0 0 380 360" fill="none" aria-hidden="true">
            <line x1="60" y1="60" x2="200" y2="250" stroke="#22C0E8" strokeWidth="1.2" strokeDasharray="3 4" />
            <line x1="320" y1="70" x2="200" y2="250" stroke="#E14B7F" strokeWidth="1.2" strokeDasharray="3 4" />
            <line x1="50" y1="300" x2="200" y2="250" stroke="#7A6FD6" strokeWidth="1.2" strokeDasharray="3 4" />
            <line x1="330" y1="300" x2="200" y2="250" stroke="#419CA0" strokeWidth="1.2" strokeDasharray="3 4" />
            <circle cx="60" cy="60" r="6" fill="#22C0E8" />
            <circle cx="320" cy="70" r="6" fill="#E14B7F" />
            <circle cx="50" cy="300" r="6" fill="#7A6FD6" />
            <circle cx="330" cy="300" r="6" fill="#419CA0" />
            <circle cx="200" cy="250" r="14" fill="none" stroke="#22C0E8" strokeWidth="2" />
            <circle cx="200" cy="250" r="5" fill="#22C0E8" />
          </svg>

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

          <div className={styles.score}>
            {l.stats.map((s) => (
              <div className={styles.stat} key={s.l}>
                <div className={styles.statV}>{s.v}</div>
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
              className={`${styles.door} ${ACCENT[d.accent]} ${d.heavy ? styles.heavy : ""}`}
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
