"use client";

// MeshReel — "The Mesh, In Motion": the 67s, 8-scene ALM explainer reel. The
// canvas animation is drawn by the shared mesh-engine (engine.render(t)); the
// chrome (eyebrow, scene title, caption + provenance badges, HUD readout, and
// the scrubbable transport bar) is rebuilt natively here from the design
// handoff (support.js is intentionally not ported).
//
// Captions are de-em-dashed to match the site's house style. The per-frame bar
// updates are imperative (refs) so only scene changes trigger a React render.

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

type Meta = {
  no: string;
  cap: string;
  badges: [string, string, string][]; // [text, srLabel, kind]
  stats: [string, string, string][]; // [value, label, color]
};

const META: Meta[] = [
  {
    no: "01",
    cap: 'Today, "presence at scale" means one hyperscale datacenter, and a hard ceiling on who fits.',
    badges: [["CTX", "The status quo", "mute"]],
    stats: [["1", "CENTRAL STAR", "#E14B7F"]],
  },
  {
    no: "02",
    cap: "CIRIS starts from a single sealed copy. An identity that enters the mesh and cannot be forged.",
    badges: [["MEASURED", "Sealed identity ships today", "ok"]],
    stats: [["1", "SEALED COPY", "#B08A3E"]],
  },
  {
    no: "03",
    cap: "Each node brings on the next. Neighbors link to neighbors, so the fabric grows itself, with no center to depend on.",
    badges: [["MODEL", "Projected fan-out", "info"]],
    stats: [
      ["2 → 2,000", "PEER NODES", "#419CA0"],
      ["~5", "LINKS / NODE", "#9AA3AF"],
    ],
  },
  {
    no: "04",
    cap: "Every node is a live presence, a participant, not a viewer. Thousands, all at once.",
    badges: [["MODEL", "Target topology", "info"]],
    stats: [["2,000", "LIVE PRESENCES", "#22C0E8"]],
  },
  {
    no: "05",
    cap: "Delivery is holographic: layered streams re-rendered per viewer, never a single fixed feed.",
    badges: [["FRONTIER", "In active research", "magenta"]],
    stats: [
      ["3", "LAYERED SHELLS", "#22C0E8"],
      ["30", "RENDER HOLDERS", "#7A6FD6"],
    ],
  },
  {
    no: "06",
    cap: "A whole region drops, and the mesh reroutes around it and heals. Presence never blinks.",
    badges: [["MODEL", "Reroute + escrow repair", "info"]],
    stats: [
      ["< 1", "REROUTE (s)", "#4ADE80"],
      ["20 + 6", "SOURCE + REPAIR", "#B08A3E"],
    ],
  },
  {
    no: "07",
    cap: "Sealed end to end. Carriers move the bytes; not one of them can read what is inside.",
    badges: [["MEASURED", "E2E sealing ships today", "ok"]],
    stats: [["2", "SHELL SEAL", "#B08A3E"]],
  },
  {
    no: "08",
    cap: "No star. No single point. The room itself carries the presence.",
    badges: [["CIRIS", "Autonomic Living Mesh", "comm"]],
    stats: [],
  },
];

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ":" + String(ss).padStart(2, "0");
};

export default function MeshReel() {
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

  const seek = (t: number) => {
    const eng = engineRef.current;
    tRef.current = Math.max(0, Math.min(totalRef.current - 0.01, t));
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

  const cur = META[idx] || META[0];
  const sc = scenes[idx];
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
          <span style={{ font: `500 11px ${mono}`, letterSpacing: "0.14em", color: "#6B7280" }}>THE MESH, IN MOTION</span>
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
                    title={s.label}
                    aria-label={"Jump to " + s.label}
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
            <span style={{ font: `600 12px ${mono}`, color: "#419CA0", letterSpacing: "0.1em" }}>{cur.no}</span>
            <span style={{ font: `600 12px ${mono}`, color: "#6B7280", letterSpacing: "0.16em" }}>{sc ? sc.label : ""}</span>
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
            {cur.cap}
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {cur.badges.map((b, i) => {
              const [bg, fg, bd] = BADGE[b[2]] || BADGE.mute;
              return (
                <span
                  key={"b" + idx + i}
                  className={styles.badge}
                  title={b[1]}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 10px",
                    borderRadius: 6,
                    font: `600 10px ${mono}`,
                    letterSpacing: "0.1em",
                    background: bg,
                    color: fg,
                    border: `1px solid ${bd}`,
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: fg }} />
                  {b[0]}
                </span>
              );
            })}
          </div>
        </div>

        {cur.stats.length > 0 && (
          <div className={styles.hud}>
            {cur.stats.map((s, i) => (
              <div key={"s" + idx + i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ font: `700 clamp(20px, 3vw, 32px) ${mono}`, lineHeight: 1, color: s[2], fontVariantNumeric: "tabular-nums" }}>
                  {s[0]}
                </span>
                <span style={{ font: `500 10px ${mono}`, letterSpacing: "0.14em", color: "#6B7280", marginTop: 6 }}>{s[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
