"use client";

// MeshReel — "The Mesh, In Motion": the 67s, 8-scene ALM explainer reel. The
// canvas animation is drawn by the shared mesh-engine (engine.render(t)); the
// chrome (scene title, caption + provenance badge, HUD readout, scrubbable
// transport bar) is rebuilt natively here from the design handoff (support.js
// is intentionally not ported).
//
// All display text is localized: it comes in via `t` (the epistemicWeb.reel
// dictionary slice). Language-neutral bits — stat VALUES, colors, badge kind,
// scene number, timeline timing — stay in the component so translators can't
// break the numbers. Per-frame bar updates are imperative (refs) so only scene
// changes trigger a React render.

import { useEffect, useRef, useState } from "react";
import styles from "./MeshReel.module.css";

type Engine = {
  resize: () => void;
  render: (t: number) => number;
};
type Scene = { id: number; dur: number; label: string; start: number };

// bg / fg / border per provenance kind
const BADGE: Record<string, [string, string, string]> = {
  ok: ["rgba(74,222,128,0.12)", "#4ADE80", "rgba(74,222,128,0.35)"],
  info: ["rgba(96,165,250,0.12)", "#60A5FA", "rgba(96,165,250,0.35)"],
  magenta: ["rgba(225,75,127,0.12)", "#E14B7F", "rgba(225,75,127,0.38)"],
  mute: ["rgba(107,114,128,0.12)", "#9AA3AF", "rgba(107,114,128,0.3)"],
  comm: ["rgba(65,156,160,0.14)", "#52C4C8", "rgba(65,156,160,0.4)"],
};

// One badge kind per scene (provenance), and the language-neutral stat values
// + colors per scene. The stat LABELS are localized (from the dict), ordered to
// line up with these values.
const BADGE_KIND = ["mute", "ok", "info", "info", "magenta", "info", "ok", "comm"];
const STAT_STYLE: { value: string; color: string }[][] = [
  [{ value: "1", color: "#E14B7F" }],
  [{ value: "1", color: "#B08A3E" }],
  [{ value: "2 → 2,000", color: "#419CA0" }, { value: "~5", color: "#9AA3AF" }],
  [{ value: "2,000", color: "#22C0E8" }],
  [{ value: "3", color: "#22C0E8" }, { value: "30", color: "#7A6FD6" }],
  [{ value: "< 1", color: "#4ADE80" }, { value: "20 + 6", color: "#B08A3E" }],
  [{ value: "2", color: "#B08A3E" }],
  [],
];

export type ReelScene = {
  label: string;
  cap: string;
  badge: string;
  badgeDesc: string;
  stats: string[]; // labels, ordered to match STAT_STYLE for this scene
};
export type ReelStrings = { title: string; scenes: ReelScene[] };

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ":" + String(ss).padStart(2, "0");
};

export default function MeshReel({ t }: { t: ReelStrings }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLSpanElement | null>(null);

  const engineRef = useRef<Engine | null>(null);
  const tRef = useRef(0);
  const playingRef = useRef(true);
  const totalRef = useRef(67);

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const syncBar = () => {
    const pct = (tRef.current / totalRef.current) * 100;
    if (fillRef.current) fillRef.current.style.width = pct + "%";
    if (headRef.current) headRef.current.style.left = pct + "%";
    if (timeRef.current) timeRef.current.textContent = fmt(tRef.current);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let disposed = false;
    let lastIdx = -1;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const mod = await import("./mesh-engine.js");
      if (disposed || !canvasRef.current) return;
      const eng: Engine = mod.createEngine(canvasRef.current);
      engineRef.current = eng;
      totalRef.current = mod.TOTAL;
      setScenes(mod.SCENES as Scene[]);
      eng.resize();
      ro = new ResizeObserver(() => eng.resize());
      ro.observe(canvasRef.current);

      if (reduced) {
        // Honor reduced-motion: paint a representative frame, start paused,
        // let the viewer scrub.
        playingRef.current = false;
        setPlaying(false);
        const i = eng.render(tRef.current);
        lastIdx = i;
        setIdx(i);
        syncBar();
        return;
      }

      let last = performance.now();
      const loop = () => {
        const now = performance.now();
        let dt = (now - last) / 1000;
        last = now;
        if (dt > 0.1) dt = 0.1;
        if (playingRef.current) {
          tRef.current += dt;
          if (tRef.current >= totalRef.current) tRef.current = 0;
        }
        const i = eng.render(tRef.current);
        syncBar();
        if (i !== lastIdx) {
          lastIdx = i;
          setIdx(i);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  const seek = (sec: number) => {
    const eng = engineRef.current;
    tRef.current = Math.max(0, Math.min(totalRef.current - 0.01, sec));
    if (eng) setIdx(eng.render(tRef.current));
    syncBar();
  };
  const toggle = () => {
    const next = !playingRef.current;
    playingRef.current = next;
    setPlaying(next);
  };
  const restart = () => {
    tRef.current = 0;
    playingRef.current = true;
    setPlaying(true);
    seek(0);
  };
  const scrub = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const r = track.getBoundingClientRect();
    seek(((e.clientX - r.left) / r.width) * totalRef.current);
  };

  const scene = t.scenes[idx] || t.scenes[0];
  const no = String(idx + 1).padStart(2, "0");
  const badgeKind = BADGE_KIND[idx] || "mute";
  const stats = (STAT_STYLE[idx] || []).map((s, j) => ({
    value: s.value,
    color: s.color,
    label: scene.stats[j] ?? "",
  }));
  const [badgeBg, badgeFg, badgeBd] = BADGE[badgeKind] || BADGE.mute;
  const mono = "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace";

  return (
    <div className={styles.reel}>
      <div className={styles.stage}>
        <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />

        {/* top chrome */}
        <div className={styles.top}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#22C0E8", boxShadow: "0 0 12px #22C0E8" }} />
            <span style={{ font: `600 12px ${mono}`, letterSpacing: "0.16em", color: "#9AA3AF" }}>CIRIS · ALM</span>
          </div>
          <span style={{ font: `500 11px ${mono}`, letterSpacing: "0.14em", color: "#6B7280" }}>{t.title}</span>
        </div>

        {/* transport controls (overlaid on the globe, always) */}
        <div className={styles.transport}>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            style={{
              flex: "none",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #2A323C",
              background: "#151B24",
              color: "#F4F5F7",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            {playing ? "❚❚" : "►"}
          </button>
          <button
            onClick={restart}
            aria-label="Restart"
            style={{
              flex: "none",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #2A323C",
              background: "transparent",
              color: "#9AA3AF",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ↺
          </button>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
            <div
              ref={trackRef}
              onClick={scrub}
              style={{ position: "relative", height: 18, display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <div style={{ position: "absolute", left: 0, right: 0, height: 3, borderRadius: 2, background: "#222A33" }} />
              <div ref={fillRef} style={{ position: "absolute", left: 0, height: 3, borderRadius: 2, background: "#22C0E8", width: "0%" }} />
              <div
                ref={headRef}
                style={{
                  position: "absolute",
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#F4F5F7",
                  boxShadow: "0 0 0 3px rgba(34,192,232,0.25)",
                  left: "0%",
                  transform: "translateX(-50%)",
                }}
              />
              <div style={{ position: "absolute", left: 0, right: 0, top: 14 }}>
                {scenes.map((s) => (
                  <button
                    key={"tk" + s.id}
                    title={t.scenes[s.id]?.label ?? s.label}
                    aria-label={"Jump to " + (t.scenes[s.id]?.label ?? s.label)}
                    onClick={(e) => {
                      e.stopPropagation();
                      seek(s.start + 0.05);
                    }}
                    style={{
                      position: "absolute",
                      left: (s.start / (totalRef.current || 1)) * 100 + "%",
                      width: 1,
                      height: 5,
                      padding: 0,
                      border: "none",
                      background: "#39434F",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", font: `500 11px ${mono}`, color: "#6B7280" }}>
              <span ref={timeRef}>0:00</span>
              <span>{fmt(totalRef.current)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* caption + HUD: overlaid on the globe on desktop, stacked below it on
          mobile (a 16:9 canvas is too short to read text over on a phone) */}
      <div className={styles.chrome}>
        <div className={styles.caption}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
            <span style={{ font: `600 12px ${mono}`, color: "#419CA0", letterSpacing: "0.1em" }}>{no}</span>
            <span style={{ font: `600 12px ${mono}`, color: "#6B7280", letterSpacing: "0.16em" }}>{scene.label}</span>
          </div>
          <p
            key={idx}
            className={styles.rise}
            style={{
              margin: 0,
              fontSize: "clamp(16px, 2.4vw, 28px)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              textWrap: "balance",
            }}
          >
            {scene.cap}
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <span
              className={styles.badge}
              title={scene.badgeDesc}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 6,
                font: `600 10px ${mono}`,
                letterSpacing: "0.1em",
                background: badgeBg,
                color: badgeFg,
                border: `1px solid ${badgeBd}`,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: badgeFg }} />
              {scene.badge}
            </span>
          </div>
        </div>

        {stats.length > 0 && (
          <div className={styles.hud}>
            {stats.map((s, i) => (
              <div key={"s" + idx + i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ font: `700 clamp(20px, 3vw, 32px) ${mono}`, lineHeight: 1, color: s.color, fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </span>
                <span style={{ font: `500 10px ${mono}`, letterSpacing: "0.14em", color: "#6B7280", marginTop: 6 }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
