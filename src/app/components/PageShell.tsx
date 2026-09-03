"use client";
// The interior-page chrome in the new look: the landing's sky as a short
// banner, the brand lockup and the two chips (language, day/night) on top of
// it, the page's own title and body underneath, and the landing's clean
// bottom nav. No top navigation anywhere, by design.
//
// The prop surface is ContentShell's, so a page moves over by changing one
// import: kicker/title/lede/graphic/back-link/machine-translation banner all
// behave the same, and the body keeps using the content.module.css helpers.
// What changes is the chrome around it and that the page now honours day mode.

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Instrument_Sans } from "next/font/google";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  LOCALES,
  localeMeta,
  localizeHref,
  localizedPath,
  delocalizePath,
  DEFAULT_LOCALE,
} from "@/i18n/config";
import { setLocalePref } from "@/i18n/pref";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import SvgGraphic from "@/app/components/graphics/SvgGraphic";
import SkyBanner from "@/app/components/sky/SkyBanner";
import { useSkyTheme } from "@/app/components/sky/useSkyTheme";
import { T } from "@/app/components/sky/skyPaint";
import content from "@/app/components/v2/content.module.css";
import styles from "./pageShell.module.css";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export type ContentAccent = "cyan" | "teal" | "violet" | "rose" | "ok" | "brass";

const ACCENT: Record<ContentAccent, string> = {
  cyan: content.cyan,
  teal: content.teal,
  violet: content.violet,
  rose: content.rose,
  ok: content.ok,
  brass: content.brass,
};

export default function PageShell({
  t,
  locale,
  accent = "cyan",
  kicker,
  title,
  lede,
  graphicId,
  backHref,
  backLabel,
  mtBanner,
  children,
}: {
  t: Dictionary;
  locale: string;
  accent?: ContentAccent;
  kicker: string;
  title: string;
  lede?: string;
  graphicId?: string;
  backHref?: string;
  backLabel?: string;
  mtBanner?: { lead: string; body: string; cta: string };
  children: React.ReactNode;
}) {
  const { dark, toggle } = useSkyTheme();
  // Switching language keeps you on the page you are reading.
  const here = delocalizePath(usePathname() || "/").path;
  const [langOpen, setLangOpen] = useState(false);
  const P = dark ? T.dark : T.light;
  const nav = t.homeHero;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const lh = (href: string) => localizeHref(href, locale);
  const backArrow = localeMeta(locale).dir === "rtl" ? "→" : "←";

  return (
    <div
      className={`${instrument.className} ${styles.page}`}
      data-page-theme={dark ? "dark" : "light"}
    >
      <SkyBanner dark={dark}>
        <header className={styles.header}>
          <Link href={lh("/")} className={styles.brand} aria-label="CIRIS">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={26} height={20} style={{ filter: P.logoFilter }} />
            <span className={styles.wordmark}>CIRIS</span>
          </Link>
          <div className={styles.chips}>
            <div className={styles.langWrap}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className={styles.langChip}
                style={{ background: P.chipBg }}
              >
                <span className={styles.langRing} />
                {localeMeta(locale)?.nativeName ?? "English"}
              </button>
              {langOpen && (
                <div
                  className={styles.langPanel}
                  role="listbox"
                  style={{
                    background: P.pageBg,
                    borderColor: "color-mix(in srgb, currentColor 16%, transparent)",
                  }}
                >
                  {LOCALES.map((l) => (
                    <a
                      key={l.code}
                      role="option"
                      aria-selected={l.code === locale}
                      href={localizedPath(here, l.code)}
                      onClick={() => setLocalePref(l.code)}
                      className={l.code === locale ? styles.langActive : undefined}
                    >
                      {l.nativeName}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggle}
              title="Light / dark"
              aria-label="Toggle day or night"
              className={styles.themeToggle}
              style={{ background: P.chipBg }}
            >
              <span className={styles.pip} style={{ background: P.lightPipBg }}>
                <span className={styles.pipDotFill} style={{ background: P.lightPipDot }} />
              </span>
              <span className={styles.pip} style={{ background: P.darkPipBg }}>
                <span className={styles.pipDotRing} style={{ borderColor: P.darkPipDot }} />
              </span>
            </button>
          </div>
        </header>
      </SkyBanner>

      {isLocalized && mtBanner && (
        <MachineTranslationBanner lead={mtBanner.lead} body={mtBanner.body} cta={mtBanner.cta} />
      )}

      <main className={`${content.wrap} ${ACCENT[accent]} ${styles.main}`}>
        {backHref && (
          <p className={content.back}>
            <Link href={lh(backHref)}>
              {backArrow} {backLabel ?? "back"}
            </Link>
          </p>
        )}

        <header className={content.head}>
          <p className={content.kicker}>{kicker}</p>
          <h1 className={content.h1}>{title}</h1>
          {lede && <p className={content.lede}>{lede}</p>}
          {graphicId && (
            <div className={content.heroArt} aria-hidden="true">
              <SvgGraphic id={graphicId} className={content.heroGraphic} />
            </div>
          )}
        </header>

        <article className={content.article}>{children}</article>
      </main>

      {/* The landing's bottom nav: the only navigation on the page. */}
      <nav className={styles.bottomNav} aria-label="Site">
        <Link href={lh("/constitution")}>{nav.navConstitution}</Link>
        <Link href={lh("/constitutional-mesh")}>{nav.navMesh}</Link>
        <Link href={lh("/safety")}>{nav.navSafety}</Link>
        <Link href={lh("/research-status")}>{nav.navResearch}</Link>
        <Link href="/papers">{nav.navPapers}</Link>
        <Link href="/reviews">{nav.navReviews}</Link>
        <Link href="/status">{nav.navStatus}</Link>
        <a href="https://github.com/CIRISAI" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </div>
  );
}
