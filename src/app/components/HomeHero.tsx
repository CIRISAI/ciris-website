"use client";
// The new landing page: the day/night hero with the CIRIS signet in the sky.
// Ported from the redesign's 2a artboard (CIRIS Home Hero.dc.html): a sky
// wash with an 8-bit ground band, the signet (public/logo.svg, masked and
// floating) as the sky's luminary with bloom, corona and slowly turning
// rays, day or night on the toggle. Per Eric: no cell/neural viz, no pixel
// agent, no Scout sign-in inset; "Chat with Scout" links to scout.ciris.ai
// next to Install. The old four-doors lobby is retired entirely.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instrument_Sans, Silkscreen } from "next/font/google";
import type { Dictionary } from "@/i18n/dictionaries";
import { LOCALES, localeMeta, localizeHref, localizedPath } from "@/i18n/config";
import { setLocalePref } from "@/i18n/pref";
import StoreBadges from "./graphics/StoreBadges";
import styles from "./homeHero.module.css";
import { T, GW, GH, paintTerrain, paintWeather, paintLuminary } from "./sky/skyPaint";
import { useSkyTheme } from "./sky/useSkyTheme";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"] });

export default function HomeHero({ t, locale }: { t: Dictionary; locale: string }) {
  const hero = t.homeHero;
  const { dark: isDark, ready, toggle } = useSkyTheme();
  const [langOpen, setLangOpen] = useState(false);
  const groundRef = useRef<HTMLCanvasElement>(null);
  const lumRef = useRef<HTMLCanvasElement>(null);
  const terrainRef = useRef<{ night: boolean; cv: HTMLCanvasElement } | null>(null);

  const P = isDark ? T.dark : T.light;

  useEffect(() => {
    if (!ready) return;
    const night = isDark;
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      const time = (performance.now() - t0) / 1000;
      const gcv = groundRef.current;
      if (gcv) {
        if (gcv.width !== GW) {
          gcv.width = GW;
          gcv.height = GH;
        }
        const g = gcv.getContext("2d");
        if (g) {
          g.imageSmoothingEnabled = false;
          if (!terrainRef.current || terrainRef.current.night !== night) {
            const off = document.createElement("canvas");
            off.width = GW;
            off.height = GH;
            const og = off.getContext("2d")!;
            og.imageSmoothingEnabled = false;
            paintTerrain(og, night ? T.dark.ground : T.light.ground);
            terrainRef.current = { night, cv: off };
          }
          g.clearRect(0, 0, GW, GH);
          g.drawImage(terrainRef.current.cv, 0, 0);
          paintWeather(g, time, night);
        }
      }
      const lcv = lumRef.current;
      if (lcv) {
        const cssW = lcv.clientWidth || 1272;
        const cssH = lcv.clientHeight || 440;
        const DPR = 2;
        if (lcv.width !== cssW * DPR || lcv.height !== cssH * DPR) {
          lcv.width = cssW * DPR;
          lcv.height = cssH * DPR;
        }
        const g = lcv.getContext("2d");
        if (g) {
          g.setTransform(DPR, 0, 0, DPR, 0, 0);
          paintLuminary(g, cssW, cssH, time, night);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, isDark]);

  const lh = (href: string) => localizeHref(href, locale);

  return (
    <div
      className={`${instrument.className} ${styles.page}`}
      style={{ background: P.pageBg, color: P.pageFg }}
      data-hero-theme={isDark ? "dark" : "light"}
    >
      {/* The sky: wash, 8-bit ground, luminary, floating signet, fade. */}
      <div className={styles.sky} style={{ background: P.skyWash }}>
        <canvas ref={groundRef} className={styles.ground} aria-hidden />
        <canvas ref={lumRef} className={styles.luminary} aria-hidden />
        <div className={styles.signetWrap} aria-hidden>
          <div
            className={styles.signet}
            style={{
              background: P.signetFill,
              WebkitMaskImage: "url(/logo.svg)",
              maskImage: "url(/logo.svg)",
              filter: `drop-shadow(0 1px 14px ${P.signetGlow})`,
            }}
          />
        </div>
        <div
          className={styles.skyFade}
          style={{ background: `linear-gradient(to bottom, transparent 0%, transparent 80%, ${P.pageBg} 100%)` }}
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

      {/* The claim, centered under the signet. */}
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
        <Link href={lh("/constitutional-mesh")}>{hero.navMesh}</Link>
        <Link href={lh("/safety")}>{hero.navSafety}</Link>
        <Link href={lh("/research-status")}>{hero.navResearch}</Link>
        <Link href="/papers">{hero.navPapers}</Link>
        <Link href="/reviews">{hero.navReviews}</Link>
        <Link href="/status">{hero.navStatus}</Link>
        <a href="https://github.com/CIRISAI" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>

    </div>
  );
}
