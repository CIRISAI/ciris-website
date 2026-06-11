// CIRIS OG cards — Accord constitutional template (og-sections).
// A distinct, weighty "charter" template: centered seal, fine double rule,
// version line. Section name is the localized overlay (title zone). The same
// art ships for every section; a subtle per-Book accent is optional.
const Ca = window.CIRIS;
const ma = window.mix;

function OGAccord({ accent, book = 'Book IX', version = '1.3-RC2' }) {
  const a = accent || Ca.brass;
  return (
    <div style={{
      position: 'relative', width: 1200, height: 630, overflow: 'hidden',
      background: `radial-gradient(120% 80% at 50% -12%, ${ma(a,0.16)} 0%, transparent 52%), ${Ca.bgDeep}`,
      fontFamily: 'Geist, sans-serif', color: Ca.text, userSelect: 'none',
    }}>
      {/* engraved double-rule border within the safe area */}
      <div style={{ position: 'absolute', left: 56, top: 50, right: 56, bottom: 50, border: `1px solid ${ma(a,0.45)}` }} />
      <div style={{ position: 'absolute', left: 66, top: 60, right: 66, bottom: 60, border: `1px solid ${ma('#FFFFFF',0.07)}` }} />
      {/* corner pips */}
      {[[56,50],[1144,50],[56,580],[1144,580]].map(([x,y],i)=>(
        <div key={i} style={{ position: 'absolute', left: x-3, top: y-3, width: 6, height: 6, background: a, transform: 'rotate(45deg)' }} />
      ))}

      {/* masthead */}
      <div style={{ position: 'absolute', top: 92, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 13 }}>
        <Mark size={26} color={a} />
        <span style={{ fontWeight: 600, fontSize: 21, letterSpacing: '0.32em', color: Ca.text }}>CIRIS&nbsp;ACCORD</span>
      </div>

      {/* central seal */}
      <svg viewBox="0 0 400 400" width="280" height="280" style={{ position: 'absolute', left: '50%', top: 168, transform: 'translateX(-50%)' }} aria-hidden="true">
        <defs>
          <filter id="sealglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke={ma(a,0.3)} strokeWidth="1.4" />
        <circle cx="200" cy="200" r="128" fill="none" stroke={ma(a,0.5)} strokeWidth="2" filter="url(#sealglow)" />
        {/* tick ring */}
        {Array.from({length:48}).map((_,i)=>{ const an=(i/48)*Math.PI*2; const r1=150,r2= i%4===0?138:144;
          return <line key={i} x1={200+Math.cos(an)*r1} y1={200+Math.sin(an)*r1} x2={200+Math.cos(an)*r2} y2={200+Math.sin(an)*r2} stroke={ma(a,0.4)} strokeWidth="1.2" />; })}
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: 234, transform: 'translateX(-50%)', display: 'grid', placeItems: 'center' }}>
        <Mark size={118} color={a} />
      </div>

      {/* section title — the localized overlay (title zone) */}
      <div className="og-title-zone" style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', zIndex: 5, direction: window.ogDir() }}>
        <div style={{ fontFamily: window.ogLatin() ? window.OG_MONO : window.OG_SANS, fontSize: 15, letterSpacing: window.ogLatin() ? '0.22em' : 'normal', textTransform: window.ogLatin() ? 'uppercase' : 'none', color: a, marginBottom: 14 }}>{window.ogTr('The Constitutional Layer')}</div>
        <div className="og-title-text" style={{ fontFamily: window.OG_SANS, fontWeight: 600, fontSize: 46, letterSpacing: window.ogLatin() ? '-0.02em' : 'normal', color: Ca.text }}>{window.ogTr(book)}</div>
      </div>

      {/* version, bottom center */}
      <div style={{ position: 'absolute', bottom: 78, left: 0, right: 0, textAlign: 'center', fontFamily: 'Geist Mono, monospace', fontSize: 15, color: Ca.mute, letterSpacing: '0.12em' }}>
        <span style={{ display: 'inline-block', width: 40, height: 1, background: ma(a,0.5), verticalAlign: 'middle', marginRight: 14 }} />
        v{version}
        <span style={{ display: 'inline-block', width: 40, height: 1, background: ma(a,0.5), verticalAlign: 'middle', marginLeft: 14 }} />
      </div>
    </div>
  );
}

window.OGAccord = OGAccord;
