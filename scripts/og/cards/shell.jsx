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
// Cards are text-free art + a composited title zone. To localize, the renderer
// injects window.OG_TR (English source string -> localized string) plus per-
// locale script hints. Cards look every display string up through ogTr(), so
// the default (no OG_TR) renders the English card unchanged.
const ogTr = (s) => (window.OG_TR && window.OG_TR[s] != null ? window.OG_TR[s] : s);
const ogDir = () => (window.OG_DIR === 'rtl' ? 'rtl' : 'ltr');
const ogLatin = () => (window.OG_LATIN !== false); // Latin script unless told otherwise
// Font stack: Geist for Latin, Noto Sans families for every other script we ship.
const OG_SANS =
  "Geist, 'Noto Sans', 'Noto Sans Arabic', 'Noto Sans Devanagari', 'Noto Sans Bengali', " +
  "'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Gurmukhi', 'Noto Sans Myanmar', " +
  "'Noto Sans Ethiopic', 'Noto Sans Thai', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', sans-serif";
// Mono eyebrow only reads well in Latin; non-Latin falls back to the sans stack.
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

// The 1200x630 card frame. Children = text-free background art (absolute fill).
// Renders the unified title zone (eyebrow + title) bottom-left over a scrim.
function Card({ accent = CIRIS.teal, eyebrow, title, children, atmos, scrim = true }) {
  return (
    <div style={{
      position: 'relative', width: 1200, height: 630, overflow: 'hidden',
      background: `radial-gradient(120% 90% at 78% 8%, ${mix(accent,0.16)} 0%, transparent 46%), radial-gradient(90% 80% at 12% 100%, ${mix(accent,0.10)} 0%, transparent 50%), ${CIRIS.bgDeep}`,
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
      color: CIRIS.text, userSelect: 'none',
    }}>
      {/* faint top hairline grid atmosphere */}
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(255,255,255,0.025) 100%), repeating-linear-gradient(90deg, transparent 0 79px, rgba(255,255,255,0.018) 79px 80px)',
        maskImage: 'radial-gradient(80% 70% at 70% 20%, #000 0%, transparent 75%)' }} />
      {atmos}
      {/* text-free art */}
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      {/* scrim for title legibility — part of the (text-free) art */}
      {scrim && <div className="og-scrim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(7deg, ${mix('#090C10',0.96)} 4%, ${mix('#090C10',0.80)} 24%, transparent 52%), linear-gradient(86deg, ${mix('#090C10',0.72)} 0%, transparent 46%)` }} />}
      <Lockup markColor={accent} />
      {/* unified title zone — localized title/eyebrow composited per locale */}
      <div className="og-title-zone" style={{ position: 'absolute', left: 72, bottom: 70, maxWidth: 880, zIndex: 5, direction: ogDir(), textAlign: 'left' }}>
        <div style={{ fontFamily: ogLatin() ? OG_MONO : OG_SANS, fontSize: 18, fontWeight: 500,
          letterSpacing: ogLatin() ? '0.16em' : 'normal', textTransform: ogLatin() ? 'uppercase' : 'none', color: accent, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12, direction: 'ltr' }}>
          <span style={{ width: 26, height: 1.5, background: accent, display: 'inline-block', flex: '0 0 auto' }} />
          <span style={{ direction: ogDir(), unicodeBidi: 'plaintext' }}>{ogTr(eyebrow)}</span>
        </div>
        <div className="og-title-text" style={{ fontFamily: OG_SANS, fontWeight: 600, fontSize: 56,
          lineHeight: 1.08, letterSpacing: ogLatin() ? '-0.022em' : 'normal', color: CIRIS.text, textWrap: 'pretty', overflowWrap: 'break-word', maxWidth: 840 }}
          dangerouslySetInnerHTML={{ __html: ogTr(title) }} />
      </div>
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
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="16" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {children}
    </svg>
  );
}
window.Stage = Stage;

