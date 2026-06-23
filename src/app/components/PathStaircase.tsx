// A path staircase (v2): FEAR -> MECHANISM -> CONSEQUENCE -> COLLAPSE, the
// collapse cross-woven to the other three doors. Dictionary-driven; links
// locale-prefixed. Slug is one of the four path keys.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref, localeMeta } from "@/i18n/config";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import SvgGraphic, { PATH_GRAPHIC } from "@/app/components/graphics/SvgGraphic";
import StoreBadges from "@/app/components/graphics/StoreBadges";
import SiteHeader from "@/app/components/SiteHeader";
import styles from "./path.module.css";

const ACCENT: Record<string, string> = {
  cyan: styles.cyan,
  teal: styles.teal,
  violet: styles.violet,
  rose: styles.rose,
};

export default function PathStaircase({ t, slug }: { t: Dictionary; slug: string }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const p = t.paths[slug as keyof typeof t.paths];
  const c = t.pathsCommon;
  const lh = (href: string) => localizeHref(href, locale);
  const backArrow = localeMeta(locale).dir === "rtl" ? "→" : "←";

  return (
    <>
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <main className={`${styles.wrap} ${ACCENT[p.accent] ?? styles.cyan}`}>
        <SiteHeader locale={locale} />
        <p className={styles.back}>
          <Link href={lh("/")}>{backArrow} {c.back}</Link>
        </p>

        <header className={styles.head}>
          <p className={styles.kicker}>{p.kicker}</p>
          <h1 className={styles.h1}>{p.h1}</h1>
          <div className={styles.heroArt} aria-hidden="true">
            {PATH_GRAPHIC[slug] ? (
              <SvgGraphic id={PATH_GRAPHIC[slug]} className={styles.heroGraphic} />
            ) : (
              <span className={styles.bar} />
            )}
          </div>
        </header>

        <ol className={styles.steps}>
          {p.steps.map((body, i) => (
            <li className={styles.step} key={i}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className={styles.stepLabel}>{c.stepLabels[i]}</p>
                <p className={styles.stepBody}>{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className={styles.summit}>
          <p>{c.summit}</p>
        </section>

        <section className={styles.seeAlso}>
          <p className={styles.seeAlsoHead}>{c.seeAlsoHead}</p>
          <div className={styles.seeAlsoRow}>
            {p.seeAlso.map((s) => (
              <Link key={s.href} href={lh(s.href)} className={styles.seeAlsoCard}>
                {s.label} <span className={styles.arrow}>&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <Link href={lh("/install")} className={styles.ctaBtn}>{c.cta} &rarr;</Link>
        </div>
        <StoreBadges labels={t.lobby.store} className={styles.stores} />
      </main>
    </>
  );
}
