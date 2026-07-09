// The CIRIS Stack — the interactive centerpiece of /epistemic-web. A holographic
// five-strata stack sitting on one signed primitive: tap a layer, a prism
// refracts its anatomy into a hologram, and an "Explore" CTA flows through to the
// page that goes deep on it. Ported faithfully from the two Claude Design sources
// (CIRIS Stack.dc.html desktop + CIRIS Stack Mobile.dc.html), which is why both a
// wide two-column isometric stage and a stacked vertical stage are rendered and
// toggled by CSS at the 900px breakpoint. Both stages share one selection state
// and pull every string from t.stack, so the whole thing localizes.
//
// Per-layer hue and the glass/holo treatment are inline (they depend on --hue);
// cirisStack.module.css owns page chrome, widths, and the desktop/mobile split.

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, DEFAULT_LOCALE, localeMeta } from "@/i18n/config";
import SiteHeader from "@/app/components/SiteHeader";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import StoreBadges from "@/app/components/graphics/StoreBadges";
import styles from "./cirisStack.module.css";

type LayerId = "app" | "gov" | "ceg" | "env" | "transport";

// Static, non-translatable config. Order top-to-bottom matches the design
// (L5 Applications … L1 Transport). href is the flow-through target per the
// agreed mapping.
const LAYERS: { id: LayerId; num: number; hue: string; href: string }[] = [
  { id: "app", num: 5, hue: "#EF6A4E", href: "/install" },
  { id: "gov", num: 4, hue: "#E6B93C", href: "/crowdsourcing-alignment" },
  { id: "ceg", num: 3, hue: "#3FBE7A", href: "/grammar" },
  { id: "env", num: 2, hue: "#1FC4E0", href: "/cewp" },
  { id: "transport", num: 1, hue: "#8B6FE0", href: "/verification" },
];
const DEFAULT_SEL = 3; // The Envelope — the primitive everything reduces to.

// Layer glyphs, ported from the design's mkIcon().
function LayerIcon({ id, size }: { id: LayerId; size: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "app":
      return (
        <svg {...p}>
          <rect x={3.5} y={5} width={17} height={14} rx={2.5} />
          <path d="M3.5 9 H20.5" />
          <circle cx={6.4} cy={7} r={0.6} fill="currentColor" stroke="none" />
          <path d="M7.5 13 H12.5" />
          <path d="M7.5 16 H15" opacity={0.5} />
        </svg>
      );
    case "gov":
      return (
        <svg {...p}>
          <path d="M12 3 L19 6 V12 C19 16.8 15.2 19.9 12 21 C8.8 19.9 5 16.8 5 12 V6 Z" />
          <path d="M9 12 L11 14 L15.2 9.8" strokeWidth={2} />
        </svg>
      );
    case "ceg":
      return (
        <svg {...p}>
          <path d="M9 4 C6.5 4 6.5 6 6.5 8 C6.5 10.5 5 12 5 12 C5 12 6.5 13.5 6.5 16 C6.5 18 6.5 20 9 20" />
          <path d="M15 4 C17.5 4 17.5 6 17.5 8 C17.5 10.5 19 12 19 12 C19 12 17.5 13.5 17.5 16 C17.5 18 17.5 20 15 20" />
          <circle cx={12} cy={12} r={1.7} fill="currentColor" stroke="none" />
        </svg>
      );
    case "env":
      return (
        <svg {...p}>
          <path d="M12 3 L20 7 V16 L12 20 L4 16 V7 Z" />
          <path d="M4 7 L12 11 L20 7" opacity={0.85} />
          <path d="M12 11 V20" opacity={0.85} />
          <circle cx={12} cy={11} r={1.5} fill="currentColor" stroke="none" />
        </svg>
      );
    case "transport":
      return (
        <svg {...p}>
          <circle cx={5} cy={6} r={1.8} />
          <circle cx={19} cy={6} r={1.8} />
          <circle cx={12} cy={19} r={1.8} />
          <circle cx={12} cy={11} r={2.3} fill="currentColor" stroke="none" />
          <path d="M6.4 6.9 L10.4 10 M17.6 6.9 L13.6 10 M12 13.3 V17" opacity={0.9} />
        </svg>
      );
  }
}

function ArrowIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

// Text for one layer, pulled from the dictionary.
type LayerText = Dictionary["stack"]["layers"]["app"];

/** The holographic projection panel. Shared by both stages; `compact` tunes the
 *  sizes to match the mobile design. Ends in the flow-through "Explore" CTA. */
function Hologram({
  layer,
  tx,
  href,
  exploreLabel,
  compact,
}: {
  layer: (typeof LAYERS)[number];
  tx: LayerText;
  href: string;
  exploreLabel: string;
  compact?: boolean;
}) {
  const hue = layer.hue;
  const hero = "hero" in tx ? (tx as { hero?: HeroText }).hero : undefined;
  const ctaLabel = `${exploreLabel} ${tx.name}`;
  return (
    <div style={{ position: "relative", animation: "cirisHoloFloat 8s ease-in-out infinite" }}>
      {/* header */}
      <div style={{ display: "flex", gap: compact ? 14 : 18, alignItems: "center" }}>
        <div
          style={{
            width: compact ? 52 : 60,
            height: compact ? 52 : 60,
            borderRadius: compact ? 14 : 16,
            background: `color-mix(in oklab, ${hue} 22%, transparent)`,
            display: "grid",
            placeItems: "center",
            color: hue,
            flexShrink: 0,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hue} 38%, transparent), 0 0 24px color-mix(in oklab, ${hue} 35%, transparent)`,
          }}
        >
          <LayerIcon id={layer.id} size={compact ? 28 : 30} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: "500 11px/1.3 'Geist Mono', ui-monospace, monospace", letterSpacing: "0.13em", color: hue }}>
            LAYER {String(layer.num).padStart(2, "0")} · {tx.descriptor}
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: compact ? 22 : 26,
              letterSpacing: "-0.015em",
              marginTop: compact ? 5 : 6,
              lineHeight: 1.15,
              textShadow: `0 0 20px color-mix(in oklab, ${hue} 55%, transparent), 1px 0 rgba(255,70,120,0.28), -1px 0 rgba(0,190,255,0.28)`,
            }}
          >
            {tx.name}
          </div>
        </div>
      </div>

      {/* role */}
      <p style={{ margin: "16px 0 0", fontSize: compact ? 13.5 : 15, lineHeight: 1.6, color: "#c6ccd4" }}>{tx.role}</p>

      {/* envelope hero: 1 + 4 */}
      {hero && (
        <div style={{ marginTop: 20, border: `1px solid color-mix(in oklab, ${hue} 32%, transparent)`, borderRadius: 16, padding: 18, background: `color-mix(in oklab, ${hue} 10%, transparent)` }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: hue }}>1 + 4</span>
            <span style={{ fontSize: 12, color: "#9aa3af" }}>{hero.body}</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 200px", borderRadius: 12, padding: 14, background: `color-mix(in oklab, ${hue} 22%, #0A0D12)`, border: `1px solid color-mix(in oklab, ${hue} 42%, transparent)` }}>
              <div style={{ font: "500 9.5px/1 'Geist Mono', ui-monospace, monospace", letterSpacing: "0.12em", color: "rgba(255,255,255,0.72)" }}>1 WORKHORSE</div>
              <div style={{ font: "500 15px/1.2 'Geist Mono', ui-monospace, monospace", color: "#fff", marginTop: 8 }}>{hero.workhorse.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", lineHeight: 1.45, marginTop: 6 }}>{hero.workhorse.note}</div>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ font: "500 9.5px/1 'Geist Mono', ui-monospace, monospace", letterSpacing: "0.12em", color: "#9aa3af", marginBottom: 8 }}>4 STRUCTURAL COMPOSERS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {hero.composers.map((c) => (
                  <div key={c.label} style={{ font: "500 12px/1 'Geist Mono', ui-monospace, monospace", color: "#e4e8ee", padding: "11px 10px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", textAlign: "center" }}>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* primitives */}
      <div style={{ marginTop: 20 }}>
        <div style={{ font: "500 10px/1 'Geist Mono', ui-monospace, monospace", letterSpacing: "0.14em", color: "#6b7280", textTransform: "uppercase", marginBottom: 12 }}>{tx.primitivesLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: compact ? 8 : 9 }}>
          {tx.primitives.map((pr, i) => (
            <div key={pr.label} style={{ display: "flex", gap: compact ? 12 : 14, alignItems: "flex-start", padding: compact ? "11px 13px" : "13px 15px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `2.5px solid ${hue}` }}>
              <span style={{ font: "500 11px/1.4 'Geist Mono', ui-monospace, monospace", color: hue, flexShrink: 0, paddingTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: compact ? 13.5 : 14, letterSpacing: "-0.005em", lineHeight: 1.35 }}>{pr.label}</div>
                <div style={{ fontSize: compact ? 12 : 12.5, color: "#9aa3af", lineHeight: 1.45, marginTop: 3 }}>{pr.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* notes */}
      <div style={{ display: "flex", flexDirection: "column", gap: compact ? 9 : 10, marginTop: compact ? 14 : 16 }}>
        {tx.notes.map((n) => (
          <div key={n.title} style={{ padding: compact ? "12px 14px" : "14px 16px", borderRadius: 12, background: `color-mix(in oklab, ${hue} 8%, transparent)`, border: `1px solid color-mix(in oklab, ${hue} 22%, transparent)` }}>
            <span style={{ fontWeight: 600, fontSize: compact ? 12.5 : 13, color: "#f4f5f7" }}>{n.title}. </span>
            <span style={{ fontSize: compact ? 12.5 : 13, color: "#9aa3af", lineHeight: 1.5 }}>{n.body}</span>
          </div>
        ))}
      </div>

      {/* flow-through CTA — the "Explore the X" link per projection */}
      <Link
        href={href}
        className={styles.exploreCta}
        style={{
          ["--hue" as string]: hue,
          marginTop: compact ? 18 : 22,
        }}
      >
        {ctaLabel}
        <ArrowIcon />
      </Link>
    </div>
  );
}

type HeroText = NonNullable<Dictionary["stack"]["layers"]["env"]["hero"]>;

export default function CirisStackView({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.stack;
  const [sel, setSel] = useState(DEFAULT_SEL);
  const lh = (href: string) => localizeHref(href, locale);
  const isLocalized = locale !== DEFAULT_LOCALE;
  const backArrow = localeMeta(locale).dir === "rtl" ? "→" : "←";

  const holoFor = (i: number, compact: boolean) => {
    const layer = LAYERS[i];
    return <Hologram layer={layer} tx={c.layers[layer.id]} href={lh(layer.href)} exploreLabel={c.exploreCta} compact={compact} />;
  };

  return (
    <>
      {isLocalized && t.common.mtBanner && (
        <MachineTranslationBanner lead={t.common.mtBanner.lead} body={t.common.mtBanner.body} cta={t.common.mtBanner.cta} />
      )}
      <SiteHeader locale={locale} />

      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.back}>
            <Link href={lh("/")}>{backArrow} {t.pathsCommon.back}</Link>
          </p>

          {/* HEADER */}
          <div className={styles.head}>
            <div className={styles.headText}>
              <p className={styles.eyebrow}>{c.eyebrow}</p>
              <h1 className={styles.h1}>
                {c.headlineLead} <em>{c.headlineAccent}</em>
              </h1>
              <p className={styles.lede}>{c.lede}</p>
              <p className={styles.meta}>
                <b>{c.metaGoalLabel}.</b> {c.metaGoal}
              </p>
            </div>
            <div className={styles.badge}>
              <span className={styles.dot} />
              {c.statusBadge}
            </div>
          </div>

          {/* ===== DESKTOP STAGE: isometric stack + prism + side hologram ===== */}
          <div className={styles.desktopStage}>
            {/* light apparatus (tracks selected layer) */}
            <div
              aria-hidden
              style={{ position: "absolute", left: 0, right: 0, top: `calc(280px + ${(sel - 2) * 60}px)`, height: 0, zIndex: 1, pointerEvents: "none", transition: "top .5s cubic-bezier(.2,.7,.2,1)", ["--hue" as string]: LAYERS[sel].hue }}
            >
              <div style={{ position: "absolute", left: -34, top: -1.5, width: 86, height: 3, background: "linear-gradient(90deg, transparent, #ffffff)", boxShadow: "0 0 14px 2px rgba(255,255,255,0.85)", borderRadius: 2, animation: "cirisBeamPulse 2.6s ease-in-out infinite" }} />
              <div style={{ position: "absolute", left: 46, top: -32, width: 52, height: 64, clipPath: "polygon(0 0, 100% 50%, 0 100%)", background: "linear-gradient(118deg, rgba(255,255,255,0.92), rgba(255,80,120,0.72) 34%, rgba(122,111,214,0.72) 62%, rgba(80,220,255,0.85))", boxShadow: "0 0 26px color-mix(in oklab, var(--hue) 60%, transparent)", opacity: 0.95, animation: "cirisShimmer 3.4s ease-in-out infinite" }} />
              <div style={{ position: "absolute", left: 96, top: -3, width: "44%", height: 6, background: "linear-gradient(90deg, color-mix(in oklab, var(--hue) 92%, #fff), color-mix(in oklab, var(--hue) 55%, transparent))", boxShadow: "0 0 28px 4px color-mix(in oklab, var(--hue) 70%, transparent)", filter: "blur(.4px)", borderRadius: 3, animation: "cirisBeamPulse 2.6s ease-in-out infinite" }} />
              <div style={{ position: "absolute", left: "44%", top: -235, width: "60%", height: 470, clipPath: "polygon(0 48.6%, 0 51.4%, 100% 0, 100% 100%)", background: "linear-gradient(90deg, color-mix(in oklab, var(--hue) 62%, transparent), color-mix(in oklab, var(--hue) 16%, transparent) 72%, transparent)", filter: "blur(9px)", mixBlendMode: "screen", opacity: 0.5, animation: "cirisBeamPulse 3.4s ease-in-out infinite" }} />
            </div>

            {/* left: isometric glass stack */}
            <div className={styles.isoCol}>
              <div className={styles.isoCaption}>↑ {c.ascendLabel}</div>
              <div className={styles.isoScene}>
                <div className={styles.isoWorld}>
                  {LAYERS.map((layer, i) => {
                    const selected = i === sel;
                    return (
                      <div
                        key={layer.id}
                        style={{
                          ["--hue" as string]: layer.hue,
                          ["--lit" as string]: selected ? 1 : 0,
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: 380,
                          height: 60,
                          transformStyle: "preserve-3d",
                          transform: `translate(-50%,-50%) translateY(${(i - 2) * 60}px)${selected ? " translateZ(18px) scale(1.012)" : ""}`,
                          transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
                          pointerEvents: "none",
                        }}
                      >
                        <button type="button" onClick={() => setSel(i)} aria-label={c.layers[layer.id].name} className={styles.slabFace}>
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(112deg, rgba(255,60,150,0.15), rgba(80,170,255,0.11) 34%, rgba(150,120,255,0.14) 60%, rgba(90,255,200,0.11) 82%, rgba(255,190,70,0.11))", mixBlendMode: "screen", pointerEvents: "none" }} />
                          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "44%", background: "linear-gradient(rgba(255,255,255,0.16), transparent)", pointerEvents: "none" }} />
                          <div style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: "calc(0.2 * var(--lit))", mixBlendMode: "overlay", pointerEvents: "none" }} />
                          <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 12, color: "#fff", whiteSpace: "nowrap" }}>
                            <span style={{ font: "600 13px/1 'Geist Mono', ui-monospace, monospace", opacity: 0.82, textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}>L{layer.num}</span>
                            <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.005em", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{c.layers[layer.id].name}</span>
                            <span style={{ font: "500 10.5px/1 'Geist Mono', ui-monospace, monospace", opacity: 0.72, textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}>{c.layers[layer.id].descriptor}</span>
                          </div>
                        </button>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 74, height: "100%", transformOrigin: "100% 50%", transform: "rotateY(-90deg)", background: "linear-gradient(115deg, color-mix(in oklab, var(--hue) calc(34% + 22% * var(--lit)), #090C11), color-mix(in oklab, var(--hue) calc(18% + 14% * var(--lit)), #090C11))", border: "1px solid color-mix(in oklab, var(--hue) 38%, transparent)" }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* right: holographic projection */}
            <div className={styles.holoCol}>
              <div key={sel} style={holoPanelStyle(LAYERS[sel].hue)}>
                <div style={scanOverlay(LAYERS[sel].hue)} />
                <div style={sheenOverlay} />
                {holoFor(sel, false)}
              </div>
            </div>
          </div>

          {/* ===== MOBILE STAGE: vertical isometric cube + downward beam + hologram ===== */}
          <div className={styles.mobileStage} style={{ ["--hue" as string]: LAYERS[sel].hue }}>
            <div style={{ position: "relative", height: 236, zIndex: 2 }}>
              <div style={{ font: "500 9px/1 'Geist Mono', ui-monospace, monospace", letterSpacing: "0.14em", color: "#4b5563", position: "absolute", left: 2, top: 0 }}>↑ {c.ascendLabel}</div>
              <div style={{ perspective: "1300px", perspectiveOrigin: "50% 46%", position: "absolute", inset: 0 }}>
                <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: "rotateX(9deg) rotateY(-19deg)" }}>
                  {LAYERS.map((layer, i) => {
                    const selected = i === sel;
                    return (
                      <div
                        key={layer.id}
                        style={{
                          ["--hue" as string]: layer.hue,
                          ["--lit" as string]: selected ? 1 : 0,
                          position: "absolute",
                          top: "46%",
                          left: "50%",
                          width: "clamp(220px, 66%, 340px)",
                          height: 44,
                          transformStyle: "preserve-3d",
                          transform: `translate(-50%,-50%) translateY(${(i - 2) * 44}px)${selected ? " translateZ(16px) scale(1.015)" : ""}`,
                          transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
                          pointerEvents: "none",
                        }}
                      >
                        <button type="button" onClick={() => setSel(i)} aria-label={c.layers[layer.id].name} className={styles.slabFaceM}>
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(112deg, rgba(255,60,150,0.14), rgba(80,170,255,0.10) 34%, rgba(150,120,255,0.13) 60%, rgba(90,255,200,0.10) 82%, rgba(255,190,70,0.10))", mixBlendMode: "screen", pointerEvents: "none" }} />
                          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "46%", background: "linear-gradient(rgba(255,255,255,0.15), transparent)", pointerEvents: "none" }} />
                          <div style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: "calc(0.18 * var(--lit))", mixBlendMode: "overlay", pointerEvents: "none" }} />
                          <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 10, color: "#fff", whiteSpace: "nowrap" }}>
                            <span style={{ font: "600 11px/1 'Geist Mono', ui-monospace, monospace", opacity: 0.82, textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}>L{layer.num}</span>
                            <span style={{ fontWeight: 700, fontSize: 15.5, letterSpacing: "0.003em", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{c.layers[layer.id].name}</span>
                            <span style={{ font: "500 9px/1 'Geist Mono', ui-monospace, monospace", opacity: 0.68, textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}>{c.layers[layer.id].descriptor}</span>
                          </div>
                        </button>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: "100%", transformOrigin: "100% 50%", transform: "rotateY(-90deg)", background: "linear-gradient(115deg, color-mix(in oklab, var(--hue) calc(32% + 22% * var(--lit)), #090C11), color-mix(in oklab, var(--hue) calc(16% + 14% * var(--lit)), #090C11))", border: "1px solid color-mix(in oklab, var(--hue) 36%, transparent)" }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* downward refracted beam */}
            <div style={{ position: "relative", height: 46, zIndex: 1 }}>
              <div style={{ position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)", width: 6, height: 52, borderRadius: 3, background: "linear-gradient(180deg, color-mix(in oklab, var(--hue) 92%, #fff), color-mix(in oklab, var(--hue) 32%, transparent))", boxShadow: "0 0 26px 5px color-mix(in oklab, var(--hue) 68%, transparent)", animation: "cirisBeamPulse 2.6s ease-in-out infinite" }} />
            </div>

            {/* hologram panel */}
            <div key={sel} style={{ ...holoPanelStyle(LAYERS[sel].hue), width: "clamp(280px, 100%, 460px)", marginLeft: "auto", marginRight: "auto", padding: "22px 18px", borderRadius: 20 }}>
              <div style={scanOverlay(LAYERS[sel].hue)} />
              <div style={sheenOverlay} />
              {holoFor(sel, true)}
            </div>
          </div>

          {/* app-store CTA — CIRIS ships today */}
          <div className={styles.appCta}>
            <h2 className={styles.appCtaTitle}>{t.epistemicWeb.appTitle}</h2>
            <p className={styles.appCtaBody}>{t.epistemicWeb.appBody}</p>
            <StoreBadges labels={t.lobby.store} />
          </div>

          <p className={styles.footline}>
            <span>CIRIS</span> · safe by structure, open by principle, kind by design
          </p>
        </div>
      </main>
    </>
  );
}

// Shared inline style helpers for the hologram shell.
function holoPanelStyle(hue: string): React.CSSProperties {
  return {
    position: "relative",
    overflow: "hidden",
    borderRadius: 22,
    padding: 28,
    border: `1px solid color-mix(in oklab, ${hue} 45%, transparent)`,
    background: `linear-gradient(180deg, color-mix(in oklab, ${hue} 11%, rgba(10,13,18,0.74)), rgba(10,13,18,0.84))`,
    boxShadow: `0 0 0 1px color-mix(in oklab, ${hue} 20%, transparent), 0 34px 90px -34px color-mix(in oklab, ${hue} 65%, transparent), inset 0 0 70px color-mix(in oklab, ${hue} 9%, transparent)`,
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(7px)",
    animation: "cirisHoloIn .5s cubic-bezier(.2,.7,.2,1)",
  };
}
function scanOverlay(hue: string): React.CSSProperties {
  return { position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, color-mix(in oklab, ${hue} 15%, transparent) 0px, transparent 1px, transparent 3px)`, opacity: 0.45, mixBlendMode: "screen", animation: "cirisScan 7s linear infinite", pointerEvents: "none" };
}
const sheenOverlay: React.CSSProperties = { position: "absolute", inset: 0, background: "linear-gradient(122deg, rgba(255,255,255,0.05), transparent 30%)", pointerEvents: "none" };
