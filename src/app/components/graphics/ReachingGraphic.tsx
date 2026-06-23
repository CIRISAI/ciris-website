"use client";

// Graphic 12 — The Reaching (canvas). A quiet chain of reaching gestures / rungs
// ascending toward light (atoms -> cells -> people -> beyond), with rising motes
// and a crowning glow where the chain dissolves into light. Subdued by design:
// it sits behind the /vision manifesto and must not compete with the prose.
// dpr-aware, sizes to its container, freezes to a still frame under
// prefers-reduced-motion. Ported from the design team's canvas deliverable.

import { useEffect, useRef } from "react";

export default function ReachingGraphic({ className }: { className?: string }) {
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

    type Rung = { y: number; hw: number; b: number; ph: number };
    type Mote = { x: number; y: number; sp: number; r: number; a: number; sway: number };
    let S = 0;
    let rungs: Rung[] = [];
    let motes: Mote[] = [];
    let t = 0;

    function layout() {
      if (!stage || !cv || !ctx) return;
      S = Math.max(120, Math.round(stage.clientWidth));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = S * dpr;
      cv.height = S * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rungs = [];
      const N = 13;
      for (let i = 0; i < N; i++) {
        const f = i / (N - 1);
        const y = lerp(0.9, 0.08, f);
        const w = lerp(0.2, 0.055, f);
        const bright = 0.18 + f * 0.62;
        rungs.push({ y: y * S, hw: w * S, b: bright, ph: i * 0.6 });
      }
      motes = [];
      const M = Math.round(26 * (S / 520));
      for (let i = 0; i < M; i++) {
        motes.push({
          x: (0.5 + (Math.random() * 2 - 1) * 0.16) * S,
          y: Math.random() * S,
          sp: 0.004 + Math.random() * 0.006,
          r: 0.6 + Math.random() * 1.4,
          a: 0.1 + Math.random() * 0.3,
          sway: Math.random() * 6.28,
        });
      }
    }

    function draw(dt: number) {
      if (!ctx) return;
      t += dt;
      const T = t / 1000;
      ctx.clearRect(0, 0, S, S);
      const cx = S * 0.5;

      let g = ctx.createRadialGradient(cx, S * 0.02, 0, cx, S * 0.02, S * 0.5);
      const breath = 0.5 + 0.5 * Math.sin(T / 5);
      g.addColorStop(0, `rgba(150,138,224,${0.12 + breath * 0.05})`);
      g.addColorStop(0.5, "rgba(122,111,214,0.04)");
      g.addColorStop(1, "rgba(122,111,214,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, S, S);

      ctx.save();
      const sg = ctx.createLinearGradient(0, S * 0.95, 0, S * 0.05);
      sg.addColorStop(0, "rgba(122,111,214,0)");
      sg.addColorStop(1, "rgba(190,180,245,0.22)");
      ctx.strokeStyle = sg;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, S * 0.95);
      ctx.lineTo(cx, S * 0.05);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.lineCap = "round";
      for (let i = 0; i < rungs.length; i++) {
        const r = rungs[i];
        const pulse = 0.5 + 0.5 * Math.sin(T * 0.5 - r.ph);
        const a = r.b * (0.55 + pulse * 0.45);
        ctx.strokeStyle = `rgba(176,166,236,${a * 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx - r.hw, r.y);
        ctx.lineTo(cx + r.hw, r.y);
        ctx.stroke();
        if (i < rungs.length - 1) {
          const n = rungs[i + 1];
          ctx.strokeStyle = `rgba(150,138,224,${a * 0.32})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - r.hw, r.y);
          ctx.quadraticCurveTo(cx, (r.y + n.y) / 2 - S * 0.01, cx - n.hw, n.y);
          ctx.moveTo(cx + r.hw, r.y);
          ctx.quadraticCurveTo(cx, (r.y + n.y) / 2 - S * 0.01, cx + n.hw, n.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(207,199,242,${a * 0.8})`;
        ctx.beginPath();
        ctx.arc(cx - r.hw, r.y, 1.5 + r.b * 1.4, 0, 7);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + r.hw, r.y, 1.5 + r.b * 1.4, 0, 7);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        m.y -= m.sp * S * (dt / 16.7);
        if (m.y < S * 0.04) {
          m.y = S * 0.96;
          m.x = (0.5 + (Math.random() * 2 - 1) * 0.16) * S;
        }
        const f = 1 - m.y / S;
        const x = m.x + Math.sin(T * 0.4 + m.sway) * S * 0.012;
        ctx.fillStyle = `rgba(190,180,245,${m.a * (0.4 + f * 0.6)})`;
        ctx.beginPath();
        ctx.arc(x, m.y, m.r, 0, 7);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const cg = ctx.createRadialGradient(cx, S * 0.1, 0, cx, S * 0.1, S * 0.14);
      cg.addColorStop(0, `rgba(207,199,242,${0.18 + breath * 0.12})`);
      cg.addColorStop(1, "rgba(207,199,242,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, S * 0.1, S * 0.14, 0, 7);
      ctx.fill();
      ctx.restore();
    }

    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(stage);

    let raf = 0;
    if (reduced) {
      t = 3200;
      draw(0);
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

  return (
    <div
      ref={stageRef}
      className={className}
      aria-hidden="true"
      style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
