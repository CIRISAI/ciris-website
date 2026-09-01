"use client";
// The new landing page: the day/night hero with the CIRIS signet in the sky.
// Ported from the redesign's 2a artboard (CIRIS Home Hero.dc.html): a sky
// wash with an 8-bit ground band, the signet (public/logo.svg, masked and
// floating) as the sky's luminary with bloom, corona and slowly turning
// rays, day or night on the toggle. Per Eric: no cell/neural viz, no pixel
// agent, no Scout sign-in inset; "Chat with Scout" links to scout.ciris.ai
// next to Install. The old four-doors lobby is retired entirely.

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Instrument_Sans, Silkscreen } from "next/font/google";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import styles from "./homeHero.module.css";

const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"] });

const THEME_KEY = "ciris-hero-theme";

// ---- palettes (verbatim from the design script) ---------------------------
const T = {
  light: {
    pageBg: "#faf9f6",
    pageFg: "#14181d",
    chipBg: "rgba(250,249,246,0.78)",
    logoFilter: "none",
    signetFill: "linear-gradient(160deg, #ffcf5c 0%, #f2b02f 52%, #dd9412 100%)",
    signetGlow: "rgba(228,168,52,0.3)",
    skyWash: "linear-gradient(to bottom, #8cb7d8 0%, #a9cbe3 32%, #cfe1ea 64%, #f3e7d3 100%)",
    ground: ["#b3c29c", "#9aab84", "#849570", "#70805d"],
    lightPipBg: "#14181d",
    lightPipDot: "#faf9f6",
    darkPipBg: "transparent",
    darkPipDot: "#6b7280",
  },
  dark: {
    pageBg: "#0d1117",
    pageFg: "#e8eaed",
    chipBg: "rgba(13,17,23,0.72)",
    logoFilter: "invert(1)",
    signetFill: "linear-gradient(160deg, #ffffff 0%, #e6edfb 55%, #c3d2ee 100%)",
    signetGlow: "rgba(170,198,246,0.22)",
    skyWash: "linear-gradient(to bottom, #05080f 0%, #0a1020 36%, #131c39 68%, #212b4e 100%)",
    ground: ["#141d33", "#0c1220", "#070b13", "#04060b"],
    lightPipBg: "transparent",
    lightPipDot: "#9aa3af",
    darkPipBg: "#e8eaed",
    darkPipDot: "#0d1117",
  },
} as const;

function hash(x: number, y: number, s: number): number {
  let n = (Math.imul(x + 17, 374761393) ^ Math.imul(y + 5, 668265263) ^ Math.imul(s + 3, 1274126177)) | 0;
  n = Math.imul(n ^ (n >>> 15), 1 | n);
  n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n;
  return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
}

// 8-bit ground band: static terrain rasterized once per theme, weather live.
const GW = 318;
const GH = 110;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const hy = (x: number) => Math.round(86 - Math.sin(x * 0.0275 + 1.2) * 4.4 - Math.sin(x * 0.07) * 1.8);

function paintTerrain(g: CanvasRenderingContext2D, ground: readonly string[]) {
  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      const gy = hy(x);
      if (y < gy) continue; // sky is the smooth wash behind this layer
      const d = y - gy;
      const band = d < 2 ? 0 : d < 8 ? 1 : d < 18 ? 2 : 3;
      const seam = d === 2 || d === 3 || d === 8 || d === 9 || d === 18 || d === 19;
      const mix = seam && BAYER[(y % 4) * 4 + (x % 4)] / 16 < 0.45 ? Math.max(0, band - 1) : band;
      g.fillStyle = ground[mix];
      g.fillRect(x, y, 1, 1);
    }
  }
}

function paintWeather(g: CanvasRenderingContext2D, t: number, night: boolean) {
  if (night) {
    for (let i = 0; i < 150; i++) {
      const x = Math.floor(hash(i, 1, 91) * GW);
      const y = Math.floor(hash(i, 2, 91) * 76);
      const tw = Math.sin(t * 0.9 + i * 1.7);
      if (tw < -0.2) continue;
      g.fillStyle = tw > 0.75 ? "#ffffff" : "#9fb6dd";
      g.fillRect(x, y, 1, 1);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const cw = 20 + Math.floor(hash(i, 7, 12) * 18);
      const x0 = Math.floor(((hash(i, 4, 12) * GW + t * (2.4 + i * 0.8)) % (GW + 80)) - 40);
      const y0 = 10 + Math.floor(hash(i, 5, 12) * 42);
      g.fillStyle = "rgba(255,255,255,0.62)";
      g.fillRect(x0 + 5, y0, cw - 10, 2);
      g.fillRect(x0, y0 + 2, cw, 2);
      g.fillStyle = "rgba(255,255,255,0.42)";
      g.fillRect(x0 + 3, y0 + 4, cw - 6, 2);
    }
  }
}

// The signet as the sky's luminary: bloom, corona, rays, shimmer rings.
function paintLuminary(g: CanvasRenderingContext2D, W: number, H: number, t: number, night: boolean) {
  g.clearRect(0, 0, W, H);
  const cx = W / 2;
  const cy = H * 0.42;
  const breathe = 1 + 0.02 * Math.sin((t / 9) * 2 * Math.PI);

  const far = g.createRadialGradient(cx, cy, 20, cx, cy, 430 * breathe);
  far.addColorStop(0, night ? "rgba(150,185,240,0.14)" : "rgba(255,240,205,0.26)");
  far.addColorStop(0.42, night ? "rgba(120,155,215,0.05)" : "rgba(255,234,188,0.09)");
  far.addColorStop(1, night ? "rgba(110,145,205,0)" : "rgba(255,232,180,0)");
  g.fillStyle = far;
  g.fillRect(0, 0, W, H);

  const near = g.createRadialGradient(cx, cy, 8, cx, cy, 168 * breathe);
  near.addColorStop(0, night ? "rgba(226,238,255,0.22)" : "rgba(255,251,232,0.34)");
  near.addColorStop(0.5, night ? "rgba(170,200,250,0.07)" : "rgba(255,238,196,0.13)");
  near.addColorStop(1, night ? "rgba(150,185,240,0)" : "rgba(255,236,186,0)");
  g.fillStyle = near;
  g.beginPath();
  g.arc(cx, cy, 168 * breathe, 0, 6.284);
  g.fill();

  g.save();
  g.translate(cx, cy);
  g.rotate((t * 0.35 * Math.PI) / 180);
  for (let i = 0; i < 12; i++) {
    const long = i % 2 === 0;
    const len = (long ? 232 : 158) * (1 + 0.04 * Math.sin(t * 0.5 + i));
    const ray = g.createLinearGradient(0, 0, len, 0);
    const a = (long ? 0.085 : 0.05) * (night ? 0.6 : 1);
    ray.addColorStop(0, (night ? "rgba(205,226,255," : "rgba(255,246,214,") + a + ")");
    ray.addColorStop(1, night ? "rgba(205,226,255,0)" : "rgba(255,246,214,0)");
    g.fillStyle = ray;
    g.save();
    g.rotate((i * 30 * Math.PI) / 180);
    g.beginPath();
    g.moveTo(60, -3.2);
    g.lineTo(len, -0.6);
    g.lineTo(len, 0.6);
    g.lineTo(60, 3.2);
    g.closePath();
    g.fill();
    g.restore();
  }
  g.restore();

  g.strokeStyle = night ? "rgba(214,232,255,0.10)" : "rgba(240,214,160,0.22)";
  g.lineWidth = 1.2;
  g.beginPath();
  g.arc(cx, cy, 132 * breathe, 0, 6.284);
  g.stroke();
  g.strokeStyle = night ? "rgba(214,232,255,0.05)" : "rgba(240,214,160,0.11)";
  g.beginPath();
  g.arc(cx, cy, 158 * breathe, 0, 6.284);
  g.stroke();
}

export default function HomeHero({ t, locale }: { t: Dictionary; locale: string }) {
  const hero = t.homeHero;
  const [dark, setDark] = useState<boolean | null>(null);
  const groundRef = useRef<HTMLCanvasElement>(null);
  const lumRef = useRef<HTMLCanvasElement>(null);
  const terrainRef = useRef<{ night: boolean; cv: HTMLCanvasElement } | null>(null);

  // Day by default per the design; the visitor's choice sticks locally, and
  // ?theme=dark|light overrides for that load (handy for sharing a look).
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search).get("theme");
      if (q === "dark" || q === "light") {
        setDark(q === "dark");
        return;
      }
      const saved = localStorage.getItem(THEME_KEY);
      setDark(saved === "dark");
    } catch {
      setDark(false);
    }
  }, []);

  const isDark = dark === true;
  const P = isDark ? T.dark : T.light;

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !(d === true);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    if (dark === null) return;
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
  }, [dark, isDark]);

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

      {/* Header: brand left; theme toggle right (language pill floats site-wide). */}
      <header className={styles.header}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="CIRIS" width={28} height={22} style={{ filter: P.logoFilter }} />
          <span className={styles.wordmark}>CIRIS</span>
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
      </main>

      <div className={styles.facts}>
        <span>{hero.fact1}</span>
        <span>{hero.fact2}</span>
        <span>{hero.fact3}</span>
      </div>

      <LanguageSwitcher currentLocale={locale} large />
    </div>
  );
}
