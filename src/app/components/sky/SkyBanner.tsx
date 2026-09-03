"use client";
// The landing hero, compressed into a banner strip for interior pages: the
// same wash, the same 8-bit ground, the same luminary (bloom, corona, turning
// rays), just short. No headline, no CTAs — the page's own title carries that.
//
// The luminary sits above the strip's top edge so what shows is the glow, not
// a second logo: the brand lockup in the shell's header is the only mark.

import { useEffect, useRef } from "react";
import { T, GW, GH, paintTerrain, paintWeather, paintLuminary } from "./skyPaint";
import styles from "./sky.module.css";

export default function SkyBanner({ dark, children }: { dark: boolean; children?: React.ReactNode }) {
  const groundRef = useRef<HTMLCanvasElement>(null);
  const lumRef = useRef<HTMLCanvasElement>(null);
  const terrainRef = useRef<{ night: boolean; cv: HTMLCanvasElement } | null>(null);
  const P = dark ? T.dark : T.light;

  useEffect(() => {
    const night = dark;
    let raf = 0;
    const t0 = performance.now();
    const reduced =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const time = reduced ? 0 : (performance.now() - t0) / 1000;
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
        const cssH = lcv.clientHeight || 260;
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
      if (reduced) return; // one frame is enough when motion is not wanted
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dark]);

  return (
    <div className={styles.banner} style={{ background: P.skyWash }}>
      <canvas ref={groundRef} className={styles.ground} aria-hidden />
      <canvas ref={lumRef} className={styles.luminary} aria-hidden />
      <div
        className={styles.fade}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 58%, ${P.pageBg} 100%)`,
        }}
      />
      {children}
    </div>
  );
}
