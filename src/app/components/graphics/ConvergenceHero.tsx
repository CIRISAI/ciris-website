"use client";

// Graphic 01 — Convergence Hero (Field Convergence, final). Ported from the
// design team's canvas animation. Text-free by design: four colour-fields
// (Consumer AI / Misinformation / Superalignment / Big Tech) swirl inward as
// light and fuse into one luminous "floor" (the shared substrate). Continuous
// loop, dpr-aware, sizes to its container. Language-neutral, so one render
// serves all 29 locales. Freezes to a still frame under prefers-reduced-motion.

import { useEffect, useRef } from "react";
import Link from "next/link";
import nodeStyles from "./convergence.module.css";

export type ConvergenceLabels = {
  consumerAi: string;
  misinformation: string;
  superalignment: string;
  bigTech: string;
  oneFloor: string;
};

export type ConvergenceLinks = {
  consumerAi: string;
  misinformation: string;
  superalignment: string;
  bigTech: string;
};

export default function ConvergenceHero({
  className,
  labels,
  links,
  go,
}: {
  className?: string;
  labels?: ConvergenceLabels;
  /** When provided, each corner fear-node links to its path page. */
  links?: ConvergenceLinks;
  /** Short "go" affordance shown on hover (e.g. "explore →"), localized. */
  go?: string;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cv = canvasRef.current;
    if (!stage || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smooth = (e0: number, e1: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
      return t * t * (3 - 2 * t);
    };
    const hex = (h: string) =>
      [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const mix = (c1: string, c2: string, t: number) => {
      const a = hex(c1);
      const b = hex(c2);
      return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
    };
    const bez = (p0: number, p1: number, p2: number, t: number) => {
      const u = 1 - t;
      return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    };

    type Part = {
      c: string;
      sx: number;
      sy: number;
      cx: number;
      cy: number;
      t: number;
      sp: number;
      px: number;
      py: number;
      lead: boolean;
    };
    type Src = { c: string; x: number; y: number; ctlx: number; ctly: number };
    type Field = { cx: number; cy: number; srcs: Src[]; parts: Part[]; emit: number; beat: number };

    let S = 0;
    let k = 1;
    let G: Field | null = null;
    let t = 0;

    function layout() {
      if (!stage || !cv || !ctx) return;
      S = Math.max(120, Math.round(stage.clientWidth));
      k = S / 600;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = S * dpr;
      cv.height = S * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = S * 0.5;
      const cy = S * 0.52;
      const norm = [
        { c: "#22C0E8", x: 0.155, y: 0.165 },
        { c: "#E14B7F", x: 0.845, y: 0.18 },
        { c: "#7A6FD6", x: 0.14, y: 0.83 },
        { c: "#419CA0", x: 0.86, y: 0.83 },
      ];
      const srcs: Src[] = norm.map((s) => {
        const sx = S * s.x;
        const sy = S * s.y;
        const dx = cx - sx;
        const dy = cy - sy;
        const L = Math.hypot(dx, dy);
        const mx = (sx + cx) / 2;
        const my = (sy + cy) / 2;
        return { c: s.c, x: sx, y: sy, ctlx: mx + (-dy / L) * S * 0.17, ctly: my + (dx / L) * S * 0.17 };
      });
      G = { cx, cy, srcs, parts: [], emit: 0, beat: 0 };
    }

    function spawn() {
      if (!G) return;
      const s = G.srcs[(Math.random() * 4) | 0];
      const sx = s.x + (Math.random() * 2 - 1) * S * 0.045;
      const sy = s.y + (Math.random() * 2 - 1) * S * 0.045;
      G.parts.push({
        c: s.c,
        sx,
        sy,
        cx: s.ctlx + (Math.random() * 2 - 1) * S * 0.03,
        cy: s.ctly + (Math.random() * 2 - 1) * S * 0.03,
        t: 0,
        sp: 0.4 + Math.random() * 0.18,
        px: sx,
        py: sy,
        lead: Math.random() < 0.18,
      });
    }

    function drawBase(breath: number) {
      if (!ctx || !G) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      let g = ctx.createRadialGradient(G.cx, G.cy, 0, G.cx, G.cy, S * 0.13);
      g.addColorStop(0, `rgba(125,212,242,${0.12 + G.beat * 0.4 + breath * 0.05})`);
      g.addColorStop(1, "rgba(125,212,242,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(G.cx, G.cy, S * 0.13, 0, 7);
      ctx.fill();
      const fy = G.cy + S * 0.105;
      ctx.save();
      ctx.translate(G.cx, fy);
      ctx.scale(1, 0.3);
      const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.2);
      g2.addColorStop(0, `rgba(150,232,255,${0.13 + G.beat * 0.22})`);
      g2.addColorStop(1, "rgba(150,232,255,0)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(0, 0, S * 0.2, 0, 7);
      ctx.fill();
      ctx.restore();
      const hw = S * 0.135;
      const lg = ctx.createLinearGradient(G.cx - hw, 0, G.cx + hw, 0);
      lg.addColorStop(0, "rgba(150,232,255,0)");
      lg.addColorStop(0.5, `rgba(180,240,255,${0.5 + G.beat * 0.4})`);
      lg.addColorStop(1, "rgba(150,232,255,0)");
      ctx.strokeStyle = lg;
      ctx.lineWidth = 1.2 * k;
      ctx.beginPath();
      ctx.moveTo(G.cx - hw, fy);
      ctx.lineTo(G.cx + hw, fy);
      ctx.stroke();
      ctx.restore();
    }

    function draw(dt: number) {
      if (!ctx || !G) return;
      const sp = 1;
      t += dt;
      const breath = 0.5 + 0.5 * Math.sin(t / 640);
      ctx.clearRect(0, 0, S, S);
      drawBase(breath);
      G.emit += dt;
      if (G.emit >= 34 / sp) {
        G.emit = 0;
        const n = Math.max(1, Math.round(2 * k));
        for (let i = 0; i < n; i++) spawn();
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (let i = G.parts.length - 1; i >= 0; i--) {
        const p = G.parts[i];
        p.t += (dt / 1000) * p.sp * sp;
        if (p.t >= 1) {
          G.parts.splice(i, 1);
          G.beat = Math.min(1, G.beat + 0.045);
          continue;
        }
        const x = bez(p.sx, p.cx, G.cx, p.t);
        const y = bez(p.sy, p.cy, G.cy, p.t);
        const col = mix(p.c, "#dff7ff", smooth(0.5, 1, p.t));
        const a = smooth(0, 0.12, p.t) * (1 - smooth(0.82, 1, p.t));
        ctx.strokeStyle = col;
        ctx.globalAlpha = a * (p.lead ? 1 : 0.85);
        ctx.lineWidth = (p.lead ? 2.1 : 1.4) * k * (0.5 + p.t);
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(x, y);
        ctx.stroke();
        p.px = x;
        p.py = y;
      }
      ctx.shadowColor = "#cdeeff";
      ctx.shadowBlur = (16 + G.beat * 26 + breath * 6) * k;
      ctx.fillStyle = "rgba(232,251,255,0.96)";
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.arc(G.cx, G.cy, (3.1 + G.beat * 2.6 + breath * 0.6) * k, 0, 7);
      ctx.fill();
      ctx.restore();
      G.beat = Math.max(0, G.beat - (dt / 1000) * 0.7);
    }

    function still() {
      if (!G) return;
      for (let j = 0; j < 110; j++) {
        spawn();
        const p = G.parts[G.parts.length - 1];
        p.t = Math.random() * 0.92;
        p.px = bez(p.sx, p.cx, G.cx, Math.max(0, p.t - 0.03));
        p.py = bez(p.sy, p.cy, G.cy, Math.max(0, p.t - 0.03));
      }
      G.beat = 0.55;
      draw(0);
    }

    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(stage);

    let raf = 0;
    if (reduced) {
      still();
      return () => ro.disconnect();
    }
    let last = performance.now();
    const tick = (now: number) => {
      let dt = now - last;
      last = now;
      if (dt > 50) dt = 50;
      draw(dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // The four problem nodes — one per stream source. Each shows a small icon
  // (phone / receipt / agent-node / datacenter) + a label, color-matched to its
  // stream. Positions are physical (left/right) to match the canvas streams,
  // which do not mirror under RTL.
  const NODES = [
    {
      key: "consumerAi" as const,
      color: "#22C0E8",
      pos: { top: "2%", left: "2%" } as const,
      align: "flex-start" as const,
      icon: (
        <>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
        </>
      ),
    },
    {
      key: "misinformation" as const,
      color: "#E14B7F",
      pos: { top: "2%", right: "2%" } as const,
      align: "flex-end" as const,
      icon: (
        <>
          <path d="M6.5 3 h8 l3 3 v15 h-11 z" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="13.5" x2="15" y2="13.5" />
          <line x1="9" y1="17" x2="12.5" y2="17" />
        </>
      ),
    },
    {
      key: "superalignment" as const,
      color: "#7A6FD6",
      pos: { bottom: "2%", left: "2%" } as const,
      align: "flex-start" as const,
      icon: (
        <>
          <path d="M12 2.6 19 6.8 19 15.2 12 19.4 5 15.2 5 6.8 Z" />
          <circle cx="12" cy="12" r="2.4" />
        </>
      ),
    },
    {
      key: "bigTech" as const,
      color: "#419CA0",
      pos: { bottom: "2%", right: "2%" } as const,
      align: "flex-end" as const,
      icon: (
        <>
          <rect x="3.5" y="4" width="17" height="5.5" rx="1.2" />
          <rect x="3.5" y="11.5" width="17" height="5.5" rx="1.2" />
          <circle cx="7" cy="6.75" r="0.9" />
          <circle cx="7" cy="14.25" r="0.9" />
        </>
      ),
    },
  ];

  return (
    <div
      ref={stageRef}
      className={className}
      style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
      {labels && (
        <>
          {NODES.map((n) => {
            const href = links?.[n.key];
            const wrapStyle = {
              position: "absolute" as const,
              ...n.pos,
              display: "flex",
              flexDirection: "column" as const,
              alignItems: n.align,
              gap: "6px",
              color: n.color,
            };
            const inner = (
              <>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={n.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 6px ${n.color}55)` }}
                >
                  {n.icon}
                </svg>
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    lineHeight: 1.25,
                    maxWidth: "10em",
                    textAlign: n.align === "flex-end" ? "right" : "left",
                    textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  {labels[n.key]}
                </span>
                {href && go && (
                  <span
                    className={nodeStyles.go}
                    style={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontWeight: 600,
                      textAlign: n.align === "flex-end" ? "right" : "left",
                    }}
                  >
                    {go}
                  </span>
                )}
              </>
            );
            return href ? (
              <Link
                key={n.key}
                href={href}
                className={nodeStyles.node}
                style={wrapStyle}
                aria-label={labels[n.key]}
              >
                {inner}
              </Link>
            ) : (
              <div key={n.key} style={{ ...wrapStyle, pointerEvents: "none" }}>
                {inner}
              </div>
            );
          })}
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "63%",
              transform: "translateX(-50%)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#bfefff",
              // Label grew from "the same problem" to "Big Tech data centers";
              // long translations may need two centered lines on small screens.
              whiteSpace: "normal",
              textAlign: "center",
              maxWidth: "90%",
              lineHeight: 1.35,
              pointerEvents: "none",
              textShadow: "0 1px 10px rgba(0,0,0,0.7)",
            }}
          >
            {labels.oneFloor}
          </span>
        </>
      )}
    </div>
  );
}
