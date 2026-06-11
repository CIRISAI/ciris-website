// Generic title-less CIRIS brand card — the shared fallback OG image for
// pages without a bespoke designed card. Uses the shared Card frame so it
// matches the rest of the system; centered mark instead of a title zone.
function OGBrand() {
  const C = window.CIRIS;
  return (
    <div style={{
      position: 'relative', width: 1200, height: 630, overflow: 'hidden',
      background: `radial-gradient(120% 90% at 50% 6%, ${window.mix(C.teal,0.16)} 0%, transparent 50%), radial-gradient(80% 80% at 50% 108%, ${window.mix(C.cyan,0.08)} 0%, transparent 55%), ${C.bgDeep}`,
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif', color: C.text, userSelect: 'none',
    }}>
      {/* hairline grid atmosphere */}
      <div style={{ position: 'absolute', inset: 0, background:
        'repeating-linear-gradient(90deg, transparent 0 79px, rgba(255,255,255,0.018) 79px 80px)',
        maskImage: 'radial-gradient(70% 70% at 50% 45%, #000 0%, transparent 78%)' }} />
      {/* centered mark + wordmark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 34 }}>
        <window.Mark size={132} color={C.teal} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 60,
            letterSpacing: '0.28em', paddingLeft: 14 }}>CIRIS</span>
        </div>
        <div style={{ fontFamily: window.ogLatin() ? window.OG_MONO : window.OG_SANS, fontSize: 19, fontWeight: 500,
          letterSpacing: window.ogLatin() ? '0.18em' : 'normal', textTransform: window.ogLatin() ? 'uppercase' : 'none', color: C.teal, display: 'flex',
          alignItems: 'center', gap: 14, direction: window.ogDir() }}>
          <span style={{ width: 28, height: 1.5, background: C.teal, flex: '0 0 auto' }} />
          {window.ogTr('Verifiable Ethical AI')}
          <span style={{ width: 28, height: 1.5, background: C.teal, flex: '0 0 auto' }} />
        </div>
      </div>
    </div>
  );
}
window.OGBrand = OGBrand;
