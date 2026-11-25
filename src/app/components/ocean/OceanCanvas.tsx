"use client";
// The React seam for the underwater hero. All of the work is in scene.ts;
// this mounts it on a canvas, hands it the day/night choice, and takes it
// down again. The canvas is decoration: hidden from assistive tech, and it
// never takes pointer events (the scene listens on the window instead, so
// links and buttons laid over the water keep working).

import { useEffect, useRef } from "react";
import { createOceanScene, type OceanScene } from "./scene";

export default function OceanCanvas({ dark, className }: { dark: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const scene = useRef<OceanScene | null>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    if (!ref.current) return;
    const s = createOceanScene(ref.current, darkRef.current);
    scene.current = s;
    return () => {
      s.destroy();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.setDark(dark);
  }, [dark]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
