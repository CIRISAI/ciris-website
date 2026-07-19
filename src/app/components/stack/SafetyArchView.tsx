// The CIRIS Safety Arch — the interactive centerpiece of /safety. An arch of
// seven safety guarantees (the kill switch is the keystone) rains beams onto the
// five-strata stack monolith below; clicking a stone shows that guarantee, and
// clicking a stratum shows that layer. Ported faithfully from the Claude Design
// source (CIRIS Safety Arch.dc.html) — the SVG scene is kept as the design
// authored it (React.createElement) so the arch geometry, gradients, and beams
// are preserved exactly. Safety copy comes from t.safetyArch; the stack panels
// reuse t.stack.layers (already localized), so both localize.
//
// Every "Explore" flows through to its page. Font is wired via var(--font-geist-*)
// (SVG text through the .scene CSS in safetyArch.module.css). The scene's idle
// loops reuse the ciris* keyframes in global.css and honor prefers-reduced-motion
// via the data-ciris-scene wrapper.

"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, DEFAULT_LOCALE } from "@/i18n/config";
import SiteHeader from "@/app/components/SiteHeader";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import styles from "./safetyArch.module.css";

type BlockId = "moderation" | "humans" | "limits" | "killswitch" | "privacy" | "vulnerable" | "lifecycle";
type LayerId = "app" | "gov" | "ceg" | "env" | "transport";

// Arch stones, drawn left to right. killswitch is the keystone (index 3).
const SBLOCKS: { id: BlockId; hue: string; href: string }[] = [
  { id: "moderation", hue: "#4ADE80", href: "/safety-vs-censorship" },
  { id: "humans", hue: "#419CA0", href: "/crowdsourcing-alignment" },
  { id: "limits", hue: "#C96A38", href: "/constitution" },
  { id: "killswitch", hue: "#E14B7F", href: "/security/post-quantum-kill-switch" },
  { id: "privacy", hue: "#22C0E8", href: "/structural-privacy" },
  { id: "vulnerable", hue: "#7A6FD6", href: "/ai-welfare" },
  { id: "lifecycle", hue: "#B08A3E", href: "/stewardship" },
];
const SKEY = 3;

// The five stack strata below the arch; panels reuse t.stack.layers.
const KLAYERS: { id: LayerId; num: number; hue: string; href: string }[] = [
  { id: "app", num: 5, hue: "#EF6A4E", href: "/install" },
  { id: "gov", num: 4, hue: "#E6B93C", href: "/crowdsourcing-alignment" },
  { id: "ceg", num: 3, hue: "#3FBE7A", href: "/grammar" },
  { id: "env", num: 2, hue: "#1FC4E0", href: "/cewp" },
  { id: "transport", num: 1, hue: "#8B6FE0", href: "/verification" },
];

const THREADS: { id: "verify" | "legal"; href: string }[] = [
  { id: "verify", href: "/verification" },
  { id: "legal", href: "/compliance" },
];

const e = React.createElement;

function mkIcon(id: string, size: number) {
  const w = (...c: React.ReactNode[]) =>
    e("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }, c);
  switch (id) {
    case "killswitch": return w(e("path", { key: 1, d: "M8.5 3.2 L15.5 3.2 L20.8 8.5 L20.8 15.5 L15.5 20.8 L8.5 20.8 L3.2 15.5 L3.2 8.5 Z" }), e("path", { key: 2, d: "M12 8 V12.4", strokeWidth: 2 }), e("path", { key: 3, d: "M9.4 9.6 A3.4 3.4 0 1 0 14.6 9.6", strokeWidth: 1.9 }));
    case "limits": return w(e("circle", { key: 1, cx: 12, cy: 12, r: 8.4 }), e("path", { key: 2, d: "M6.2 6.2 L17.8 17.8", strokeWidth: 2 }));
    case "humans": return w(e("circle", { key: 1, cx: 12, cy: 8, r: 3 }), e("path", { key: 2, d: "M5.5 20 C5.5 15.8 8.6 14 12 14 C15.4 14 18.5 15.8 18.5 20" }), e("path", { key: 3, d: "M12 14 V20", opacity: 0.5 }));
    case "moderation": return w(e("path", { key: 1, d: "M4 5 h16 v10 h-9 l-4 3.5 V15 H4 Z" }), e("path", { key: 2, d: "M8 9 h8 M8 12 h5", opacity: 0.75 }));
    case "privacy": return w(e("rect", { key: 1, x: 5, y: 10.5, width: 14, height: 9, rx: 2 }), e("path", { key: 2, d: "M8 10.5 V8 a4 4 0 0 1 8 0 V10.5" }), e("circle", { key: 3, cx: 12, cy: 15, r: 1.4, fill: "currentColor", stroke: "none" }));
    case "vulnerable": return w(e("path", { key: 1, d: "M12 21 C12 21 4.5 16.5 4.5 10.5 A3.8 3.8 0 0 1 12 8.4 A3.8 3.8 0 0 1 19.5 10.5 C19.5 16.5 12 21 12 21 Z" }));
    case "lifecycle": return w(e("path", { key: 1, d: "M19 12 a7 7 0 1 1-2.5-5.4" }), e("path", { key: 2, d: "M19 4 V7.2 H15.8" }), e("circle", { key: 3, cx: 12, cy: 12, r: 1.6, fill: "currentColor", stroke: "none" }));
    case "verify": return w(e("circle", { key: 1, cx: 12, cy: 12, r: 8 }), e("path", { key: 2, d: "M8.5 12 l2.5 2.5 L15.5 9.5", strokeWidth: 2 }));
    case "legal": return w(e("path", { key: 1, d: "M12 4 V20 M6 8 h12" }), e("path", { key: 2, d: "M6 8 l-2.5 5 h5 Z M18 8 l-2.5 5 h5 Z" }), e("path", { key: 3, d: "M8.5 20 h7", opacity: 0.7 }));
    case "app": return w(e("rect", { key: 1, x: 3.5, y: 5, width: 17, height: 14, rx: 2.5 }), e("path", { key: 2, d: "M3.5 9 H20.5" }), e("circle", { key: 3, cx: 6.4, cy: 7, r: 0.6, fill: "currentColor", stroke: "none" }), e("path", { key: 4, d: "M7.5 13 H12.5" }), e("path", { key: 5, d: "M7.5 16 H15", opacity: 0.5 }));
    case "gov": return w(e("path", { key: 1, d: "M12 3 L19 6 V12 C19 16.8 15.2 19.9 12 21 C8.8 19.9 5 16.8 5 12 V6 Z" }), e("path", { key: 2, d: "M9 12 L11 14 L15.2 9.8", strokeWidth: 2 }));
    case "ceg": return w(e("path", { key: 1, d: "M9 4 C6.5 4 6.5 6 6.5 8 C6.5 10.5 5 12 5 12 C5 12 6.5 13.5 6.5 16 C6.5 18 6.5 20 9 20" }), e("path", { key: 2, d: "M15 4 C17.5 4 17.5 6 17.5 8 C17.5 10.5 19 12 19 12 C19 12 17.5 13.5 17.5 16 C17.5 18 17.5 20 15 20" }), e("circle", { key: 3, cx: 12, cy: 12, r: 1.7, fill: "currentColor", stroke: "none" }));
    case "env": return w(e("path", { key: 1, d: "M12 3 L20 7 V16 L12 20 L4 16 V7 Z" }), e("path", { key: 2, d: "M4 7 L12 11 L20 7", opacity: 0.85 }), e("path", { key: 3, d: "M12 11 V20", opacity: 0.85 }), e("circle", { key: 4, cx: 12, cy: 11, r: 1.5, fill: "currentColor", stroke: "none" }));
    case "transport": return w(e("circle", { key: 1, cx: 5, cy: 6, r: 1.8 }), e("circle", { key: 2, cx: 19, cy: 6, r: 1.8 }), e("circle", { key: 3, cx: 12, cy: 19, r: 1.8 }), e("circle", { key: 4, cx: 12, cy: 11, r: 2.3, fill: "currentColor", stroke: "none" }), e("path", { key: 5, d: "M6.4 6.9 L10.4 10 M17.6 6.9 L13.6 10 M12 13.3 V17", opacity: 0.9 }));
    default: return null;
  }
}

const polar = (ang: number, r: number): [number, number] => {
  const rad = (ang * Math.PI) / 180;
  return [190 + r * Math.cos(rad), 214 - r * Math.sin(rad)];
};

export default function SafetyArchView({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.safetyArch;
  const lh = (href: string) => localizeHref(href, locale);
  const isLocalized = locale !== DEFAULT_LOCALE;

  const [mode, setMode] = useState<"safety" | "stack">("safety");
  const [sSel, setSSel] = useState(SKEY);
  const [kSel, setKSel] = useState(3);

  const pickStone = (i: number) => { setMode("safety"); setSSel(i); };
  const pickLayer = (i: number) => { setMode("stack"); setKSel(i); };
  const onKey = (fn: () => void) => (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); }
  };

  // ---------- SVG scene (ported from the design's mkScene) ----------
  function scene() {
    const Cx = 190, Cy = 214, Ro = 178, Ri = 116, N = 7, sw = 180 / N, gap = 1.6;
    const f = (n: number) => n.toFixed(2);
    const kids: React.ReactNode[] = [];
    const safeMode = mode === "safety";

    const SX = 185, SW = 100, SH = 13, SD = 9, TOPY = 197, STEP = 13;
    const Y0 = TOPY - SH / 2, Y1 = TOPY + 4 * STEP + SH / 2, MID = (Y0 + Y1) / 2;
    const convX = SX + SD / 2, convY = Y0 - SD * 0.25;

    kids.push(e("defs", { key: "defs" }, [
      e("radialGradient", { key: "sheen", id: "archSheen", gradientUnits: "userSpaceOnUse", cx: 190, cy: 168, r: 178, fx: 190, fy: 142 }, [
        e("stop", { key: 0, offset: "0%", stopColor: "#ffffff", stopOpacity: 0.5 }),
        e("stop", { key: 1, offset: "42%", stopColor: "#ffffff", stopOpacity: 0.09 }),
        e("stop", { key: 2, offset: "100%", stopColor: "#ffffff", stopOpacity: 0 }),
      ]),
      e("linearGradient", { key: "rain", id: "archRainbow", gradientUnits: "userSpaceOnUse", x1: 12, y1: 0, x2: 368, y2: 0 }, [
        e("stop", { key: 0, offset: "0%", stopColor: "#4ADE80" }), e("stop", { key: 1, offset: "27%", stopColor: "#C96A38" }),
        e("stop", { key: 2, offset: "50%", stopColor: "#E14B7F" }), e("stop", { key: 3, offset: "73%", stopColor: "#22C0E8" }),
        e("stop", { key: 4, offset: "100%", stopColor: "#7A6FD6" }),
      ]),
      e("linearGradient", { key: "sg", id: "stackGrad", gradientUnits: "userSpaceOnUse", x1: SX, y1: Y0, x2: SX, y2: Y1 }, [
        e("stop", { key: 0, offset: "0%", stopColor: "#EF6A4E" }), e("stop", { key: 1, offset: "25%", stopColor: "#E6B93C" }),
        e("stop", { key: 2, offset: "50%", stopColor: "#3FBE7A" }), e("stop", { key: 3, offset: "75%", stopColor: "#1FC4E0" }),
        e("stop", { key: 4, offset: "100%", stopColor: "#8B6FE0" }),
      ]),
    ]));

    const abut = (x: number, w: number, label: string, key: string) => {
      kids.push(e("rect", { key, x: f(x), y: Cy + 3, width: w, height: 22, rx: 3, fill: "rgba(65,156,160,0.1)", stroke: "rgba(65,156,160,0.4)", strokeWidth: 1 }));
      kids.push(e("text", { key: key + "t", className: styles.mono, x: f(x + w / 2), y: Cy + 14.5, fill: "#5FB8BC", fontSize: 8, fontWeight: 600, letterSpacing: "0.08em", textAnchor: "middle", dominantBaseline: "central" }, label));
    };
    abut(Cx - Ro - 2, Ro - Ri + 4, c.abutmentLeft.toUpperCase(), "abL");
    abut(Cx + Ri - 2, Ro - Ri + 4, c.abutmentRight.toUpperCase(), "abR");

    kids.push(e("circle", { key: "keyGlow", cx: Cx, cy: Cy - Ro + 18, r: 26, fill: "rgba(225,75,127,0.4)", style: { filter: "blur(10px)" } }));

    // ---- arch stones ----
    for (let i = 0; i < N; i++) {
      const b = SBLOCKS[i]; const hue = b.hue; const isKey = i === SKEY;
      const tx = c.blocks[b.id];
      const a1 = 180 - i * sw - gap, a0 = 180 - (i + 1) * sw + gap;
      const [x1o, y1o] = polar(a1, Ro), [x0o, y0o] = polar(a0, Ro), [x0i, y0i] = polar(a0, Ri), [x1i, y1i] = polar(a1, Ri);
      const d = `M ${f(x1o)} ${f(y1o)} A ${Ro} ${Ro} 0 0 1 ${f(x0o)} ${f(y0o)} L ${f(x0i)} ${f(y0i)} A ${Ri} ${Ri} 0 0 0 ${f(x1i)} ${f(y1i)} Z`;
      const isSel = safeMode && i === sSel;
      const cen = 180 - (i + 0.5) * sw;
      const baseFill = isSel ? 0.42 : isKey ? 0.3 : 0.18;
      const strokeOp = (isSel || isKey) ? 0.95 : 0.46;
      const strokeW = (isSel || isKey) ? 2.2 : 1.2;
      const glow = (isSel || (isKey && safeMode)) ? `drop-shadow(0 0 10px color-mix(in oklab, ${hue} 70%, transparent))` : "none";
      const sheenOp = (isSel || isKey) ? 0.92 : 0.6;
      const depth = isKey ? 10 : 8;
      const layers: React.ReactNode[] = [
        e("path", { key: "ext", d, transform: `translate(${(depth * 0.34).toFixed(1)} ${depth})`, fill: `color-mix(in oklab, ${hue} 40%, #05070A)`, style: { opacity: 0.92 } }),
        e("path", { key: "ext2", d, transform: `translate(${(depth * 0.17).toFixed(1)} ${(depth * 0.5).toFixed(1)})`, fill: `color-mix(in oklab, ${hue} 30%, #05070A)`, style: { opacity: 0.9 } }),
        e("path", { key: "base", d, fill: `color-mix(in oklab, ${hue} ${(baseFill * 100).toFixed(0)}%, rgba(9,12,17,0.6))`, stroke: hue, strokeOpacity: strokeOp, strokeWidth: strokeW, style: { filter: glow, transition: "fill .3s, stroke-opacity .3s, filter .3s" } }),
        e("path", { key: "sheen", d, fill: "url(#archSheen)", style: { mixBlendMode: "screen", opacity: sheenOp, pointerEvents: "none", transition: "opacity .3s" } }),
        e("path", { key: "rain", d, fill: "url(#archRainbow)", style: { mixBlendMode: "screen", opacity: 0.15, pointerEvents: "none" } }),
      ];
      const [lx, ly] = polar(cen, (Ro + Ri) / 2);
      layers.push(e("text", { key: "lbl", x: f(lx), y: f(ly + (isKey ? 4 : 0)), fill: (isSel || isKey) ? "#ffffff" : "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600, textAnchor: "middle", dominantBaseline: "central", style: { pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.9)" } }, tx.short));
      if (isKey) layers.push(e("text", { key: "kw", className: styles.mono, x: f(lx), y: f(ly - 13), fill: hue, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.18em", textAnchor: "middle", dominantBaseline: "central", style: { pointerEvents: "none", textShadow: "0 1px 3px rgba(0,0,0,0.9)" } }, c.keystoneBadge.toUpperCase()));
      kids.push(e("g", { key: "blk" + i, onClick: () => pickStone(i), onKeyDown: onKey(() => pickStone(i)), role: "button", tabIndex: 0, "aria-label": `${tx.short}: ${tx.name}`, "aria-pressed": isSel, style: { cursor: "pointer" } }, layers));
      if (isKey) { const [dx, dy] = polar(cen, Ro + 12); kids.push(e("path", { key: "diamond", d: `M ${f(dx)} ${f(dy - 6)} L ${f(dx + 6)} ${f(dy)} L ${f(dx)} ${f(dy + 6)} L ${f(dx - 6)} ${f(dy)} Z`, fill: hue, style: { filter: `drop-shadow(0 0 6px ${hue})` } })); }
    }

    // ---- beams from every stone to the convergence point ----
    for (let k = 0; k < N; k++) {
      const bk = SBLOCKS[k]; const ck = 180 - (k + 0.5) * sw;
      const [sx, sy] = polar(ck, Ri - 3);
      const on = safeMode && k === sSel;
      kids.push(e("line", { key: "beam" + k, x1: f(sx), y1: f(sy), x2: convX, y2: convY, stroke: bk.hue, strokeWidth: on ? 2.8 : 1.5, strokeLinecap: "round", opacity: on ? 0.72 : 0.4, style: { filter: on ? `drop-shadow(0 0 7px ${bk.hue})` : `drop-shadow(0 0 3px color-mix(in oklab, ${bk.hue} 60%, transparent))`, transition: "all .3s" } }));
    }

    // ---- stack monolith (5 strata) ----
    const stackGlowHue = safeMode ? SBLOCKS[sSel].hue : KLAYERS[kSel].hue;
    kids.push(e("circle", { key: "stackGlow", cx: SX, cy: MID, r: 70, fill: `color-mix(in oklab, ${stackGlowHue} 15%, transparent)`, style: { filter: "blur(15px)", transition: "fill .4s" } }));

    {
      const fL = SX - SW / 2, fR = SX + SW / 2;
      const front = `M ${fL} ${Y0} L ${fR} ${Y0} L ${fR} ${Y1} L ${fL} ${Y1} Z`;
      const top = `M ${fL} ${Y0} L ${fR} ${Y0} L ${fR + SD} ${(Y0 - SD * 0.5).toFixed(1)} L ${fL + SD} ${(Y0 - SD * 0.5).toFixed(1)} Z`;
      const right = `M ${fR} ${Y0} L ${fR + SD} ${(Y0 - SD * 0.5).toFixed(1)} L ${fR + SD} ${(Y1 - SD * 0.5).toFixed(1)} L ${fR} ${Y1} Z`;
      const mono: React.ReactNode[] = [
        e("path", { key: "mtop", d: top, fill: "#161C26", stroke: "rgba(255,255,255,0.16)", strokeWidth: 0.8 }),
        e("path", { key: "mright", d: right, fill: "#0A0E14", stroke: "rgba(255,255,255,0.08)", strokeWidth: 0.8 }),
        e("path", { key: "mbase", d: front, fill: "rgba(9,12,17,0.86)" }),
        e("path", { key: "mgrad", d: front, fill: "url(#stackGrad)", style: { opacity: 0.66, mixBlendMode: "screen" } }),
        e("path", { key: "msheen", d: front, fill: "url(#archSheen)", style: { mixBlendMode: "screen", opacity: 0.42, pointerEvents: "none" } }),
        e("path", { key: "mstroke", d: front, fill: "none", stroke: "rgba(255,255,255,0.5)", strokeOpacity: 0.55, strokeWidth: 1.2 }),
      ];
      for (let i = 0; i < 5; i++) {
        const l = KLAYERS[i], hue = l.hue;
        const lx = t.stack.layers[l.id];
        const yT = Y0 + i * STEP, yC = yT + STEP / 2;
        if (i > 0) mono.push(e("line", { key: "dv" + i, x1: fL, y1: yT, x2: fR, y2: yT, stroke: "rgba(255,255,255,0.14)", strokeWidth: 0.7 }));
        const lit = !safeMode && i === kSel;
        if (lit) mono.push(e("rect", { key: "hl" + i, x: fL, y: yT, width: SW, height: STEP, fill: `color-mix(in oklab, ${hue} 42%, transparent)`, stroke: hue, strokeWidth: 1.4, style: { filter: `drop-shadow(0 0 11px color-mix(in oklab, ${hue} 78%, transparent))` } }));
        mono.push(e("text", { key: "nl" + i, className: styles.mono, x: fL + 8, y: yC, fill: lit ? "#fff" : hue, fillOpacity: lit ? 1 : 0.95, fontSize: 7.5, fontWeight: 600, textAnchor: "start", dominantBaseline: "central", style: { pointerEvents: "none", textShadow: "0 1px 3px rgba(0,0,0,0.85)" } }, "L" + l.num));
        mono.push(e("text", { key: "nm" + i, x: fL + 24, y: yC, fill: lit ? "#fff" : "rgba(255,255,255,0.88)", fillOpacity: 1, fontSize: 9, fontWeight: 600, textAnchor: "start", dominantBaseline: "central", style: { pointerEvents: "none", textShadow: "0 1px 3px rgba(0,0,0,0.92)" } }, lx.name));
        mono.push(e("rect", { key: "hit" + i, x: fL, y: yT, width: SW, height: STEP, fill: "transparent", onClick: () => pickLayer(i), onKeyDown: onKey(() => pickLayer(i)), role: "button", tabIndex: 0, "aria-label": `L${l.num} ${lx.name}`, "aria-pressed": lit, style: { cursor: "pointer" } }));
      }
      kids.push(e("g", { key: "stack" }, mono));
    }

    kids.push(e("circle", { key: "conv", cx: convX, cy: convY, r: 3, fill: "#ffffff", opacity: 0.9, style: { filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" } }));
    {
      const oh = stackGlowHue;
      kids.push(e("line", { key: "outbeam", x1: SX, y1: Y1, x2: SX, y2: 270, stroke: oh, strokeWidth: 3.4, strokeLinecap: "round", opacity: 0.85, style: { filter: `drop-shadow(0 0 10px ${oh})`, transition: "all .4s" } }));
    }

    return e("svg", { className: styles.scene, viewBox: "0 0 380 276", role: "img", "aria-label": c.headlineLead + " " + c.headlineAccent }, kids);
  }

  // ---------- current panel data ----------
  const hue = mode === "safety" ? SBLOCKS[sSel].hue : KLAYERS[kSel].hue;
  const href = mode === "safety" ? SBLOCKS[sSel].href : KLAYERS[kSel].href;
  const safety = mode === "safety";
  const sb = c.blocks[SBLOCKS[sSel].id];
  const kl = t.stack.layers[KLAYERS[kSel].id];
  const isKey = safety && sSel === SKEY;
  const name = safety ? sb.name : kl.name;
  const tagLine = safety ? sb.tag : `LAYER ${String(KLAYERS[kSel].num).padStart(2, "0")} · ${kl.descriptor}`;
  const iconId = safety ? SBLOCKS[sSel].id : KLAYERS[kSel].id;

  const hueVar = { ["--hue" as string]: hue };
  const ctaStyle: React.CSSProperties = {
    marginTop: 18, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
    padding: "13px 16px", borderRadius: 12, textDecoration: "none",
    font: "600 13.5px/1 var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif", letterSpacing: "-0.005em", color: "#fff",
    background: `color-mix(in oklab, ${hue} 24%, rgba(10,13,18,0.5))`, border: `1px solid color-mix(in oklab, ${hue} 52%, transparent)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
  };

  return (
    <>
      {isLocalized && t.common.mtBanner && (
        <MachineTranslationBanner lead={t.common.mtBanner.lead} body={t.common.mtBanner.body} cta={t.common.mtBanner.cta} />
      )}
      <SiteHeader locale={locale} />

      <main className={styles.page} data-ciris-scene>
        <div className={styles.inner}>
          <p className={styles.back}>
            <Link href={lh("/")}>{localeArrow(locale)} {t.pathsCommon.back}</Link>
          </p>

          <h1 className={styles.h1}>
            {c.headlineLead} <em>{c.headlineAccent}</em>
          </h1>

          {/* SCENE */}
          <div style={hueVar}>
            <div className={styles.sceneWrap}>{scene()}</div>
          </div>

          {/* PROJECTED PANEL */}
          <div style={hueVar}>
            <div style={{ display: "flex", justifyContent: "center", margin: "2px 0 -9px", position: "relative", zIndex: 2 }}>
              <div style={{ width: 6, height: 30, borderRadius: 3, background: `linear-gradient(180deg, color-mix(in oklab, ${hue} 92%, #fff), color-mix(in oklab, ${hue} 28%, transparent))`, boxShadow: `0 0 24px 5px color-mix(in oklab, ${hue} 62%, transparent)`, animation: "cirisBeamPulse 2.6s ease-in-out infinite" }} />
            </div>

            <div key={safety ? "s" + SBLOCKS[sSel].id : "k" + KLAYERS[kSel].id} style={{ position: "relative", overflow: "hidden", borderRadius: 20, padding: "22px 18px", border: `1px solid color-mix(in oklab, ${hue} 42%, transparent)`, background: `linear-gradient(180deg, color-mix(in oklab, ${hue} 11%, rgba(10,13,18,0.72)), rgba(10,13,18,0.84))`, boxShadow: `0 0 0 1px color-mix(in oklab, ${hue} 18%, transparent), 0 26px 70px -34px color-mix(in oklab, ${hue} 60%, transparent), inset 0 0 56px color-mix(in oklab, ${hue} 8%, transparent)`, animation: "cirisHoloIn .45s cubic-bezier(.2,.7,.2,1)" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, color-mix(in oklab, ${hue} 13%, transparent) 0px, transparent 1px, transparent 3px)`, opacity: 0.4, mixBlendMode: "screen", animation: "cirisScan 7s linear infinite", pointerEvents: "none" }} />

              <div style={{ position: "relative", animation: "cirisHoloFloat 8s ease-in-out infinite" }}>
                {/* header */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `color-mix(in oklab, ${hue} 22%, transparent)`, display: "grid", placeItems: "center", color: hue, flexShrink: 0, boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hue} 38%, transparent), 0 0 22px color-mix(in oklab, ${hue} 34%, transparent)` }}>{mkIcon(iconId, 26)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, font: "500 10px/1.3 var(--font-geist-mono), ui-monospace, monospace", letterSpacing: "0.13em", color: hue }}>
                      <span>{tagLine}</span>
                      {isKey && <span style={{ padding: "2px 7px", borderRadius: 999, background: `color-mix(in oklab, ${hue} 24%, transparent)`, border: `1px solid color-mix(in oklab, ${hue} 50%, transparent)`, fontSize: 9, letterSpacing: "0.1em" }}>◆ {c.keystoneBadge.toUpperCase()}</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 21, letterSpacing: "-0.015em", marginTop: 4, lineHeight: 1.15, textShadow: `0 0 16px color-mix(in oklab, ${hue} 45%, transparent)` }}>{name}</div>
                  </div>
                </div>

                {safety ? (
                  <>
                    <p style={{ margin: "15px 0 0", fontSize: 14, lineHeight: 1.55, color: "#dbe0e6", fontWeight: 500 }}>{sb.promise}</p>
                    <div style={{ marginTop: 18 }}>
                      <div style={{ font: "500 9.5px/1 var(--font-geist-mono), ui-monospace, monospace", letterSpacing: "0.14em", color: "#6b7280", textTransform: "uppercase", marginBottom: 11 }}>{isKey ? c.keystoneMechLabel : c.mechLabel}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {sb.mechanisms.map((m, i) => (
                          <div key={m.label} style={mechRow(hue)}>
                            <span style={mechIdx(hue)}>{String(i + 1).padStart(2, "0")}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: 13.5, letterSpacing: "-0.005em", lineHeight: 1.35 }}>{m.label}</div>
                              <div style={{ fontSize: 12, color: "#9aa3af", lineHeight: 1.45, marginTop: 3 }}>{m.note}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 11, background: `color-mix(in oklab, ${hue} 8%, transparent)`, border: `1px solid color-mix(in oklab, ${hue} 22%, transparent)` }}>
                      <span style={{ fontSize: 12.5, color: "#c6ccd4", lineHeight: 1.5, fontStyle: "italic" }}>{sb.note}</span>
                    </div>
                    {/* Concept tag on the Privacy block: this guarantee IS
                        contextual integrity; funnel to the anchor page. */}
                    {SBLOCKS[sSel].id === "privacy" && (
                      <p style={{ margin: "12px 0 0", fontSize: 13 }}>
                        <Link href={lh("/contextual-integrity")} style={{ color: hue }}>
                          {t.contextualIntegrity.crossCta}
                        </Link>
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p style={{ margin: "15px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "#c6ccd4" }}>{kl.role}</p>
                    <div style={{ marginTop: 18 }}>
                      <div style={{ font: "500 9.5px/1 var(--font-geist-mono), ui-monospace, monospace", letterSpacing: "0.14em", color: "#6b7280", textTransform: "uppercase", marginBottom: 11 }}>{kl.primitivesLabel}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {kl.primitives.map((p, i) => (
                          <div key={p.label} style={mechRow(hue)}>
                            <span style={mechIdx(hue)}>{String(i + 1).padStart(2, "0")}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: 13.5, letterSpacing: "-0.005em", lineHeight: 1.35 }}>{p.label}</div>
                              <div style={{ fontSize: 12, color: "#9aa3af", lineHeight: 1.45, marginTop: 3 }}>{p.note}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
                      {kl.notes.map((n) => (
                        <div key={n.title} style={{ padding: "12px 14px", borderRadius: 11, background: `color-mix(in oklab, ${hue} 8%, transparent)`, border: `1px solid color-mix(in oklab, ${hue} 22%, transparent)` }}>
                          <span style={{ fontWeight: 600, fontSize: 12.5, color: "#f4f5f7" }}>{n.title}. </span>
                          <span style={{ fontSize: 12.5, color: "#9aa3af", lineHeight: 1.5 }}>{n.body}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Link href={lh(href)} style={ctaStyle}>
                  {c.exploreCta} {name}
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* THREADS */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ font: "500 9.5px/1 var(--font-geist-mono), ui-monospace, monospace", letterSpacing: "0.14em", color: "#4b5563", textTransform: "uppercase", paddingLeft: 2 }}>{c.groundLabel}</div>
            {THREADS.map((th) => (
              <Link key={th.id} href={lh(th.href)} style={{ display: "flex", gap: 11, alignItems: "center", padding: "12px 14px", borderRadius: 12, background: "rgba(65,156,160,0.06)", border: "1px solid rgba(65,156,160,0.2)", textDecoration: "none" }}>
                <span style={{ color: "#419ca0", flexShrink: 0, display: "grid", placeItems: "center" }}>{mkIcon(th.id, 18)}</span>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#eaf6f6" }}>{c.threads[th.id].title} — </span>
                  <span style={{ fontSize: 12.5, color: "#9aa3af", lineHeight: 1.5 }}>{c.threads[th.id].body}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* RATCHET CLOSING NOTE */}
          <div style={{ marginTop: 16, padding: "16px", borderRadius: 14, background: "linear-gradient(120deg, rgba(63,190,122,0.08), rgba(65,156,160,0.05))", border: "1px solid rgba(63,190,122,0.24)" }}>
            <div style={{ font: "500 9.5px/1 var(--font-geist-mono), ui-monospace, monospace", letterSpacing: "0.14em", color: "#3fbe7a", textTransform: "uppercase", marginBottom: 8 }}>{c.ratchetLabel}</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "#c6ccd4" }}>{c.ratchetBody}</p>
          </div>

          <p className={styles.footline}>
            <span>CIRIS</span> · safe by structure, open by principle, kind by design
          </p>
        </div>
      </main>
    </>
  );
}

function mechRow(hue: string): React.CSSProperties {
  return { display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 13px", borderRadius: 11, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `2.5px solid ${hue}` };
}
function mechIdx(hue: string): React.CSSProperties {
  return { font: "500 10.5px/1.4 var(--font-geist-mono), ui-monospace, monospace", color: hue, flexShrink: 0, paddingTop: 1 };
}
function localeArrow(locale: string) {
  // RTL locales read right-to-left, so the "back" chevron points the other way.
  return ["ar", "fa", "ur"].includes(locale) ? "→" : "←";
}
