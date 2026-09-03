// The day/night sky: palettes and painters, lifted verbatim from the landing
// hero (2a artboard) so the landing and every interior page's banner run one
// implementation. Pure canvas work, no React.

// ---- palettes (verbatim from the design script) ---------------------------
export const T = {
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

export function hash(x: number, y: number, s: number): number {
  let n = (Math.imul(x + 17, 374761393) ^ Math.imul(y + 5, 668265263) ^ Math.imul(s + 3, 1274126177)) | 0;
  n = Math.imul(n ^ (n >>> 15), 1 | n);
  n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n;
  return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
}

// 8-bit ground band: static terrain rasterized once per theme, weather live.
export const GW = 318;
export const GH = 110;
export const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
export const hy = (x: number) => Math.round(86 - Math.sin(x * 0.0275 + 1.2) * 4.4 - Math.sin(x * 0.07) * 1.8);

export function paintTerrain(g: CanvasRenderingContext2D, ground: readonly string[]) {
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

export function paintWeather(g: CanvasRenderingContext2D, t: number, night: boolean) {
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
export function paintLuminary(g: CanvasRenderingContext2D, W: number, H: number, t: number, night: boolean) {
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
