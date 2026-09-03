"use client";
// The chrome every revamped page wears: the landing's sky as a short banner,
// the brand lockup and the two chips (language, day/night) on it, whatever the
// page puts between, and the landing's bottom nav. No top navigation.
//
// Split out of PageShell so the full-bleed interactive pages (the stack, the
// safety arch, the path staircase) can wear the same chrome without the
// centred prose column.

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Instrument_Sans } from "next/font/google";
import type { Dictionary } from "@/i18n/dictionaries";
import { LOCALES, localeMeta, localizeHref, localizedPath, delocalizePath } from "@/i18n/config";
import { setLocalePref } from "@/i18n/pref";
import SkyBanner from "@/app/components/sky/SkyBanner";
import { useSkyTheme } from "@/app/components/sky/useSkyTheme";
import { T } from "@/app/components/sky/skyPaint";
import styles from "./pageShell.module.css";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

/** The eight bottom-nav labels: all PageShell needs from the dictionary. */
export type ShellNav = Dictionary["homeHero"];

export default function SkyChrome({
  nav,
  locale,
  forceDark = false,
  children,
}: {
  nav: ShellNav;
  locale: string;
  /** For pages whose content is a hard-coded dark scene. */
  forceDark?: boolean;
  children: React.ReactNode;
}) {
  const { dark, toggle } = useSkyTheme(forceDark ? "dark" : undefined);
  // Switching language keeps you on the page you are reading.
  const here = delocalizePath(usePathname() || "/").path;
  const [langOpen, setLangOpen] = useState(false);
  const P = dark ? T.dark : T.light;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <div className={`${instrument.className} ${styles.page}`} data-page-theme={dark ? "dark" : "light"}>
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
            {!forceDark && (
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
            )}
          </div>
        </header>
      </SkyBanner>

      {children}

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
