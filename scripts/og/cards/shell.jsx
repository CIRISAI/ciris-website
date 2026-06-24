// CIRIS OG card system — shared shell.
// Unified template (Model A): text-free background art + one consistent
// bottom-left title zone that engineering composites localized titles into.
// Exports to window: Card, Lockup, Mark, palette, Glow helpers.

const CIRIS = {
  bg:      '#0D1117',
  bgDeep:  '#090C10',
  bgElev:  '#151B24',
  bgCard:  '#1A222C',
  border:  'rgba(255,255,255,0.08)',
  borderS: 'rgba(255,255,255,0.16)',
  text:    '#F4F5F7',
  dim:     '#9AA3AF',
  mute:    '#6B7280',
  teal:    '#419CA0',
  cyan:    '#22C0E8',
  violet:  '#7A6FD6',
  rust:    '#C96A38',
  brass:   '#B08A3E',
  rose:    '#E14B7F',
  ok:      '#4ADE80',
  // signature gradient stops
  g1: '#22D3EE', g2: '#8B5CF6', g3: '#EC4899',
};
window.CIRIS = CIRIS;

// translucent accent helper
const mix = (hex, pct) => {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${pct})`;
};
window.mix = mix;

// --- Localization (Model A) -------------------------------------------------
// Cards are text-free art + a composited title zone. The renderer injects
// window.OG_TR (English source -> localized) plus script hints; every display
// string passes through ogTr(), so the default (no OG_TR) renders English.
const ogTr = (s) => (window.OG_TR && window.OG_TR[s] != null ? window.OG_TR[s] : s);
const ogDir = () => (window.OG_DIR === 'rtl' ? 'rtl' : 'ltr');
const ogLatin = () => (window.OG_LATIN !== false); // Latin unless told otherwise
const OG_SANS =
  "Geist, 'Noto Sans', 'Noto Sans Arabic', 'Noto Sans Devanagari', 'Noto Sans Bengali', " +
  "'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Gurmukhi', 'Noto Sans Myanmar', " +
  "'Noto Sans Ethiopic', 'Noto Sans Thai', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', sans-serif";
const OG_MONO = "'Geist Mono', ui-monospace, monospace";
window.ogTr = ogTr;
window.ogDir = ogDir;
window.ogLatin = ogLatin;
window.OG_SANS = OG_SANS;
window.OG_MONO = OG_MONO;

// The compass/flower mark, inline so currentColor applies.
function Mark({ size = 30, color }) {
  return (
    <svg viewBox={window.CIRIS_MARK_VIEWBOX} width={size} height={size * 124 / 140}
         style={{ display: 'block', color: color || CIRIS.teal, flex: '0 0 auto' }}
         aria-hidden="true">
      <path d={window.CIRIS_MARK_PATH} fill="currentColor" />
    </svg>
  );
}
window.Mark = Mark;

// Corner brand lockup: mark + CIRIS wordmark.
function Lockup({ markColor }) {
  return (
    <div style={{ position: 'absolute', top: 54, left: 72, display: 'flex', alignItems: 'center', gap: 14, zIndex: 5 }}>
      <Mark size={34} color={markColor || CIRIS.teal} />
      <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 25, letterSpacing: '0.26em', color: CIRIS.text, paddingLeft: 2 }}>CIRIS</span>
    </div>
  );
}
window.Lockup = Lockup;

// App-store / source chips for the OG CTA row (Apple, Google Play, Docker,
// GitHub), matching the design's round-2 OG refresh. Each is a 52px rounded
// tile with its brand glyph.
const CHIP_GLYPHS = {
  apple: <g transform="translate(18,14)" fill="#e8eaed"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.275-1.81-2.387-4.59-2.387-7.04 0-3.93 2.617-6.01 5.19-6.01 1.51 0 2.77.95 3.71.95.9 0 2.33-1.01 4.05-1.01.654 0 3.01.06 4.56 2.29-.12.07-2.66 1.55-2.66 4.59 0 3.51 3.13 4.74 3.22 4.77z" /></g>,
  gplay: <g transform="translate(22,16)"><path d="M0 1.2 L0 22.8 L11.8 12 Z" fill="#cfd5dc" /><path d="M0 1.2 L8.5 9.7 L11.8 12 L0 1.2 Z" fill="#eef2f6" opacity="0.5" /></g>,
  docker: <g transform="translate(15,19)" fill="#cfd5dc"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327a4.6 4.6 0 0 0-.612 1.43c-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137a15.7 15.7 0 0 0 2.93-.266 12.3 12.3 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" /></g>,
  github: <g transform="translate(16,16)" fill="#e8eaed"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></g>,
};
function Chip({ kind }) {
  return (
    <svg width="52" height="52" viewBox="0 0 56 56" style={{ display: 'block' }} aria-hidden="true">
      <rect x="1" y="1" width="54" height="54" rx="14" fill="#11161d" stroke="#2a313b" />
      {CHIP_GLYPHS[kind]}
    </svg>
  );
}
window.Chip = Chip;

// The 1200x630 card frame. Children = text-free background art (absolute fill).
// Renders the unified title zone (eyebrow + title) bottom-left over a scrim.
function Card({ accent = CIRIS.teal, eyebrow, title, children, atmos, scrim = true, glow }) {
  const g = glow || accent; // secondary glow hue for the rim-light
  return (
    <div className="og-card" style={{
      position: 'relative', width: 1200, height: 630, overflow: 'hidden',
      background: `radial-gradient(125% 95% at 80% 4%, ${mix(accent,0.34)} 0%, ${mix(accent,0.10)} 30%, transparent 52%), radial-gradient(95% 85% at 10% 102%, ${mix(accent,0.20)} 0%, transparent 52%), radial-gradient(60% 50% at 96% 64%, ${mix(g,0.14)} 0%, transparent 60%), ${CIRIS.bgDeep}`,
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
      color: CIRIS.text, userSelect: 'none',
    }}>
      {/* faint top hairline grid atmosphere */}
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(255,255,255,0.03) 100%), repeating-linear-gradient(90deg, transparent 0 79px, rgba(255,255,255,0.022) 79px 80px)',
        maskImage: 'radial-gradient(80% 70% at 70% 20%, #000 0%, transparent 75%)' }} />
      {/* drifting signature-gradient aurora (ambient motion; still = poster) */}
      <div className="og-aurora" style={{ position: 'absolute', inset: '-20% -10% auto auto', width: 760, height: 620, top: '-16%', right: '-8%',
        background: `radial-gradient(closest-side, ${mix(CIRIS.g1,0.34)}, transparent 70%), radial-gradient(closest-side, ${mix(CIRIS.g2,0.30)}, transparent 70%)`,
        backgroundPosition: '30% 30%, 70% 60%', backgroundSize: '70% 70%, 60% 60%', backgroundRepeat: 'no-repeat',
        filter: 'blur(8px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
      {/* slow light sheen sweeping the focal art (guarantees visible motion on every card) */}
      <div className="og-sheen" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '46%', pointerEvents: 'none',
        background: `linear-gradient(100deg, transparent, ${mix(CIRIS.text,0.07)} 45%, ${mix(g,0.12)} 55%, transparent)`,
        mixBlendMode: 'screen', maskImage: 'radial-gradient(120% 90% at 70% 35%, #000 0%, transparent 78%)', opacity: 0 }} />
      {atmos}
      {/* text-free art */}
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      {/* signature-gradient rim-light hairline along the top edge */}
      <div className="og-rim" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, pointerEvents: 'none',
        background: `linear-gradient(90deg, transparent 2%, ${CIRIS.g1} 30%, ${CIRIS.g2} 58%, ${CIRIS.g3} 82%, transparent 99%)`,
        opacity: 0.85, filter: 'blur(0.4px)', maskImage: 'linear-gradient(90deg, transparent, #000 22%, #000 92%, transparent)' }} />
      {/* scrim for title legibility — part of the (text-free) art */}
      {scrim && <div className="og-scrim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(7deg, ${mix('#090C10',0.96)} 4%, ${mix('#090C10',0.80)} 24%, transparent 52%), linear-gradient(86deg, ${mix('#090C10',0.72)} 0%, transparent 46%)` }} />}
      <Lockup markColor={accent} />
      {/* title zone — upper-left; localized title/eyebrow composited per locale.
          Sits above the CTA row (design round-2 OG refresh). */}
      <div className="og-title-zone" style={{ position: 'absolute', left: 72, top: 182, maxWidth: 640, zIndex: 5, direction: ogDir(), textAlign: 'left' }}>
        <div style={{ fontFamily: ogLatin() ? OG_MONO : OG_SANS, fontSize: 18, fontWeight: 500,
          letterSpacing: ogLatin() ? '0.16em' : 'normal', textTransform: ogLatin() ? 'uppercase' : 'none', color: accent, marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 12, direction: 'ltr' }}>
          <span style={{ width: 26, height: 1.5, background: accent, display: 'inline-block', flex: '0 0 auto' }} />
          <span style={{ direction: ogDir(), unicodeBidi: 'plaintext' }}>{ogTr(eyebrow)}</span>
        </div>
        <div className="og-title-text" style={{ fontFamily: OG_SANS, fontWeight: 600, fontSize: 50,
          lineHeight: 1.07, letterSpacing: ogLatin() ? '-0.022em' : 'normal', color: CIRIS.text, textWrap: 'pretty', overflowWrap: 'break-word', maxWidth: 624 }}
          dangerouslySetInnerHTML={{ __html: ogTr(title) }} />
      </div>
      {/* CTA row — store/source chips + localized get-it-now + accent bar. */}
      <div style={{ position: 'absolute', left: 60, top: 468, display: 'flex', gap: 14, zIndex: 5 }}>
        <Chip kind="apple" /><Chip kind="gplay" /><Chip kind="docker" /><Chip kind="github" />
      </div>
      <div style={{ position: 'absolute', left: 60, top: 538, display: 'inline-flex', alignItems: 'center',
        height: 26, padding: '0 12px', borderRadius: 6, background: 'rgba(13,17,23,0.5)', border: '1px dashed #3a424d',
        fontFamily: OG_MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: ogLatin() ? 'uppercase' : 'none',
        color: CIRIS.dim, zIndex: 5, direction: ogDir(), whiteSpace: 'nowrap' }}>{ogTr('GET IT NOW')}</div>
      <div style={{ position: 'absolute', left: 60, top: 574, width: 300, height: 3, borderRadius: 1.5, background: accent, zIndex: 5 }} />
      {/* safe-area guide (toggle) */}
      <div className="og-safe" style={{ position: 'absolute', left: 40, top: 45, width: 1120, height: 540,
        border: '1px dashed rgba(255,255,255,0.22)', borderRadius: 4, pointerEvents: 'none', display: 'none', zIndex: 6 }} />
    </div>
  );
}
window.Card = Card;

// Full-bleed 1200x630 SVG stage with a reusable glow filter (id per accent).
function Stage({ children, style }) {
  return (
    <svg viewBox="0 0 1200 630" width="1200" height="630" style={{ position: 'absolute', inset: 0, ...style }} aria-hidden="true">
      <defs>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="15" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bloom" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3" result="s" />
          <feGaussianBlur stdDeviation="12" result="w" />
          <feMerge><feMergeNode in="w" /><feMergeNode in="s" /><feMergeNode in="s" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="sig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CIRIS.g1} /><stop offset="0.5" stopColor={CIRIS.g2} /><stop offset="1" stopColor={CIRIS.g3} />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}
window.Stage = Stage;

