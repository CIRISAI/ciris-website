"use client";

// Graphic 01 — Convergence Hero (Field Convergence, final). Ported from the
// design team's canvas animation. Text-free by design: four colour-fields
// (Consumer AI / Misinformation / Superalignment / Big Tech) swirl inward as
// light and fuse into one luminous "floor" (the shared substrate). Continuous
// loop, dpr-aware, sizes to its container. Language-neutral, so one render
// serves all 29 locales. Freezes to a still frame under prefers-reduced-motion.

import { useEffect, useRef } from "react";

export type ConvergenceLabels = {
  consumerAi: string;
  misinformation: string;
  superalignment: string;
  bigTech: string;
  oneFloor: string;
};

export default function ConvergenceHero({
  className,
  labels,
}: {
  className?: string;
  labels?: ConvergenceLabels;
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

  const labelBase = {
    position: "absolute" as const,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap" as const,
    pointerEvents: "none" as const,
  };

  return (
    <div
      ref={stageRef}
      className={className}
      style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
      {labels && (
        <>
          <span style={{ ...labelBase, left: "1%", top: "6%", color: "#22C0E8", textAlign: "left" }}>
            {labels.consumerAi}
          </span>
          <span style={{ ...labelBase, right: "1%", top: "7%", color: "#E14B7F", textAlign: "right" }}>
            {labels.misinformation}
          </span>
          <span style={{ ...labelBase, left: "1%", bottom: "6%", color: "#7A6FD6", textAlign: "left" }}>
            {labels.superalignment}
          </span>
          <span style={{ ...labelBase, right: "1%", bottom: "6%", color: "#419CA0", textAlign: "right" }}>
            {labels.bigTech}
          </span>
          <span
            style={{
              ...labelBase,
              left: "50%",
              top: "64%",
              transform: "translateX(-50%)",
              color: "#bfefff",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {labels.oneFloor}
          </span>
        </>
      )}
    </div>
  );
}
