"use client";

// MeshHero — the homepage cover's living-mesh background: a seamless, text-free
// rotating globe drawn on <canvas> by the framework-agnostic mesh-engine
// (src/app/components/mesh/mesh-engine.js, reused from the design handoff). The
// copy/CTA live in normal DOM on top of this; the canvas is decorative.
//
// It is a live canvas, not a video file — crisp at any size and ~zero media
// weight. Honors prefers-reduced-motion (paints one static frame, no loop) and
// scales the node count to the viewport so low-end/mobile devices stay smooth.

import { useEffect, useRef } from "react";

type Engine = {
  resize: () => void;
  renderHeroSteady: (t: number, introT: number, scale?: number) => void;
};

export default function MeshHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: Engine | null = null;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let disposed = false;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Node count is the main cost knob (engine default 10000 is demanding).
    // Scale to the viewport; the globe reads fine with fewer on small screens.
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    const nodes = w < 768 ? 3500 : w < 1280 ? 6000 : 8000;
    // The cover canvas is full-bleed and tall, so the engine's 16:9 letterbox
    // shrinks the globe, worst on a narrow phone. Zoom it up, more on mobile.
    const scale = w < 768 ? 1.55 : w < 1280 ? 1.3 : 1.15;
    const t0 = performance.now();
    const now = () => (reduced ? 8 : (performance.now() - t0) / 1000 + 8);

    (async () => {
      const mod = await import("./mesh/mesh-engine.js");
      if (disposed || !canvasRef.current) return;
      engine = mod.createEngine(canvasRef.current, { nodes });
      engine.resize();
      // Paint a complete frame up front so there's no empty flash.
      engine.renderHeroSteady(now(), 1, scale);
      ro = new ResizeObserver(() => {
        if (!engine) return;
        engine.resize();
        engine.renderHeroSteady(now(), 1, scale);
      });
      ro.observe(canvasRef.current);

      if (reduced) return; // single static frame, no animation loop

      const loop = () => {
        if (!engine) return;
        engine.renderHeroSteady(now(), 1, scale);
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

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
