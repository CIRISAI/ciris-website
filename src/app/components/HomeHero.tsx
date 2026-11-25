"use client";
// The landing page: the underwater hero. Schools of fish, a whale shark the
// visitor can steer with the pointer, and a handful of glowing fish that
// gather into the CIRIS signet, drift apart, and gather again. Franco's
// design (CIRISAI/ciris-website PR 38); the engine is in ./ocean.
// Day or night on the toggle, shared with the rest of the site. Per Eric: no
// Scout sign-in inset; "Chat with Scout" links to scout.ciris.ai next to
// Install. The old four-doors lobby is retired entirely.

import { useState } from "react";
import Link from "next/link";
import { Instrument_Sans, Silkscreen } from "next/font/google";
import type { Dictionary } from "@/i18n/dictionaries";
import { LOCALES, localeMeta, localizeHref, localizedPath } from "@/i18n/config";
import { setLocalePref } from "@/i18n/pref";
import StoreBadges from "./graphics/StoreBadges";
import styles from "./homeHero.module.css";
import { T } from "./sky/skyPaint";
import OceanCanvas from "./ocean/OceanCanvas";
import { useSkyTheme } from "./sky/useSkyTheme";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"] });

export default function HomeHero({ t, locale }: { t: Dictionary; locale: string }) {
  const hero = t.homeHero;
  const { dark: isDark, ready, toggle } = useSkyTheme();
  const [langOpen, setLangOpen] = useState(false);
  const P = isDark ? T.dark : T.light;

  const lh = (href: string) => localizeHref(href, locale);

  return (
    <div
      className={`${instrument.className} ${styles.page}`}
      style={{ background: P.pageBg, color: P.pageFg }}
      data-hero-theme={isDark ? "dark" : "light"}
    >
      {/* The water. Mounted once the stored day/night choice is known, so a
          night visitor never sees a flash of daylight sea. */}
      <div className={styles.water} style={{ background: P.pageBg }}>
        {ready && <OceanCanvas dark={isDark} className={styles.ocean} />}
        <div
          className={styles.waterFade}
          style={{ background: `linear-gradient(to bottom, transparent 0%, transparent 70%, ${P.pageBg} 100%)` }}
        />
      </div>

      {/* Header: brand left; language pill + theme toggle top right, matching
          chips per the design (and Eric: language lives beside the toggle). */}
      <header className={styles.header}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="CIRIS" width={28} height={22} style={{ filter: P.logoFilter }} />
          <span className={styles.wordmark}>CIRIS</span>
        </div>
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
                style={{ background: P.pageBg, borderColor: "color-mix(in srgb, currentColor 16%, transparent)" }}
              >
                {LOCALES.map((l) => (
                  <a
                    key={l.code}
                    role="option"
                    aria-selected={l.code === locale}
                    href={localizedPath("/", l.code)}
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

      {/* The claim, centered under the water. */}
      <main className={styles.copy}>
        <p className={`${silkscreen.className} ${styles.kicker}`}>{hero.kicker}</p>
        <h1 className={styles.h1}>{hero.h1}</h1>
        <p className={styles.sub}>{hero.sub}</p>
        <div className={styles.ctas}>
          <a href="https://scout.ciris.ai" className={styles.ctaPrimary}>
            {hero.ctaChat}
          </a>
          <Link href={lh("/install")} className={styles.ctaSecondary}>
            {hero.ctaInstall}
          </Link>
        </div>
        {/* The app is on both stores today: the icon people will look for on
            their phone, and the two badges that take them there. */}
        <div className={styles.store}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/apple-touch-icon.png"
            alt="CIRIS app icon"
            width={44}
            height={44}
            className={styles.appIcon}
          />
          <StoreBadges labels={t.lobby.store} className={styles.storeBadges} />
        </div>
      </main>

      <div className={styles.facts}>
        <span>{hero.fact1}</span>
        <span>{hero.fact2}</span>
        <span>{hero.fact3}</span>
      </div>

      {/* The clean bottom nav: the landing's only navigation (no top nav by
          design). Small, dim, one row; the rest of the site hangs off it. */}
      <nav className={styles.bottomNav} aria-label="Site">
        <Link href={lh("/constitution")}>{hero.navConstitution}</Link>
        <Link href={lh("/values")}>{hero.navValues}</Link>
        <Link href={lh("/constitutional-mesh")}>{hero.navMesh}</Link>
        <Link href={lh("/safety")}>{hero.navSafety}</Link>
        <Link href={lh("/research-status")}>{hero.navResearch}</Link>
        <Link href="/papers">{hero.navPapers}</Link>
        <Link href="/reviews">{hero.navReviews}</Link>
        <Link href="/status">{hero.navStatus}</Link>
        <a href="https://github.com/CIRISAI" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {/* CIRIS is not a 501(c)(3), so this says support, never donate. */}
        <a
          href="https://www.gofundme.com/f/the-ai-the-world-deserves"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navSupport}
        >
          {hero.navSupport}
        </a>
      </nav>

    </div>
  );
}
