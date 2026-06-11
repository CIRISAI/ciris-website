// CIRIS OG cards — batch A: Home, Install, About, How-it-works, Trust, Vision.
// Art is text-free background (small technical labels are diagram language, not
// the localized title). Weighted top/right; bottom-left kept clear for titles.

const C = window.CIRIS;
const _mix = window.mix;

// small mono diagram label
const Lbl = ({ x, y, children, fill, anchor = 'start', size = 15 }) => (
  <text x={x} y={y} fontFamily="Geist Mono, monospace" fontSize={size} fill={fill || C.mute}
        textAnchor={anchor} letterSpacing="0.04em">{children}</text>
);

/* ---------------------------------------------------------------- HOME */
function OGHome() {
  const a = C.teal;
  return (
    <Card accent={a} eyebrow="ciris.ai" title="An AI You Can<br/>Actually Own">
      <Stage>
        {/* faint mesh */}
        <g stroke={_mix(a,0.22)} strokeWidth="1.4" fill="none">
          <path d="M690 90 L860 60 L1010 130 M860 60 L900 200 M1010 130 L1120 250 M900 200 L1060 320 M690 90 L760 230" />
        </g>
        <g fill={_mix(a,0.55)}>
          {[[690,90,4],[860,60,5],[1010,130,6],[900,200,4],[1120,250,4],[760,230,3]].map(([x,y,r],i)=>
            <circle key={i} cx={x} cy={y} r={r} />)}
        </g>
        {/* crossed-out data center (dim, upper) */}
        <g opacity="0.5">
          <g stroke={C.mute} strokeWidth="1.6" fill="none">
            <rect x="982" y="78" width="120" height="30" rx="5" />
            <rect x="982" y="116" width="120" height="30" rx="5" />
          </g>
          <circle cx="996" cy="93" r="3" fill={C.mute} /><circle cx="996" cy="131" r="3" fill={C.mute} />
          <line x1="965" y1="68" x2="1118" y2="156" stroke={C.rose} strokeWidth="3" strokeLinecap="round" />
        </g>
        {/* link phone -> home box */}
        <path d="M905 410 C955 410 965 360 1006 348" stroke={_mix(a,0.7)} strokeWidth="2.4" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
        {/* home box (local) */}
        <g transform="translate(1006,300)">
          <path d="M0 36 L40 8 L80 36 L80 96 L0 96 Z" fill={_mix(a,0.10)} stroke={a} strokeWidth="2" />
          <rect x="30" y="62" width="20" height="34" fill={_mix(a,0.5)} />
          <circle cx="40" cy="8" r="4" fill={a} filter="url(#glow)" />
        </g>
        {/* signed badge */}
        <g transform="translate(640,470)" filter="url(#glow)">
          <circle cx="0" cy="0" r="26" fill={_mix(C.ok,0.14)} stroke={C.ok} strokeWidth="2" />
          <path d="M-11 1 L-3 9 L12 -9" stroke={C.ok} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Stage>
      {/* phone */}
      <div style={{ position: 'absolute', left: 720, top: 150, width: 188, height: 340,
        borderRadius: 30, border: `2px solid ${C.borderS}`, background: C.bg,
        boxShadow: `0 40px 90px -30px rgba(0,0,0,0.8), 0 0 0 6px ${_mix(a,0.06)}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 56, height: 6, borderRadius: 3, background: C.borderS }} />
        <div style={{ padding: '40px 22px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Mark size={30} color={a} />
          <div style={{ height: 11, width: '78%', borderRadius: 6, background: _mix(a,0.32) }} />
          <div style={{ height: 11, width: '94%', borderRadius: 6, background: C.bgCard }} />
          <div style={{ height: 11, width: '60%', borderRadius: 6, background: C.bgCard }} />
          <div style={{ marginTop: 10, alignSelf: 'flex-end', height: 38, width: 120, borderRadius: 12, background: _mix(a,0.18), border: `1px solid ${_mix(a,0.5)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.ok, boxShadow: `0 0 8px ${C.ok}` }} />
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: C.dim }}>signed</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------- INSTALL */
function OGInstall() {
  const a = C.cyan;
  const Chip = ({ top, children }) => (
    <div style={{ position: 'absolute', right: 96, top, width: 280, height: 70, borderRadius: 16,
      background: C.bgCard, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
      boxShadow: '0 18px 40px -22px rgba(0,0,0,0.7)' }}>{children}</div>
  );
  return (
    <Card accent={a} eyebrow="ciris.ai / install" title="Install the<br/>CIRIS Agent">
      <Stage>
        <path d="M470 320 C560 320 560 150 660 150 M470 350 C560 350 560 330 660 330 M470 380 C560 380 560 510 660 510"
              stroke={_mix(a,0.5)} strokeWidth="2" fill="none" strokeDasharray="2 8" strokeLinecap="round" />
      </Stage>
      {/* App Store */}
      <Chip top={120}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill={C.text}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        <div><div style={{ fontSize: 13, color: C.mute, fontFamily: 'Geist Mono, monospace' }}>iOS</div><div style={{ fontSize: 19, fontWeight: 600, color: C.text }}>App&nbsp;Store</div></div>
      </Chip>
      {/* Google Play */}
      <Chip top={300}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill={a}><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.193 12l2.505-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302L5.864 2.658z"/></svg>
        <div><div style={{ fontSize: 13, color: C.mute, fontFamily: 'Geist Mono, monospace' }}>Android</div><div style={{ fontSize: 19, fontWeight: 600, color: C.text }}>Google&nbsp;Play</div></div>
      </Chip>
      {/* pip terminal */}
      <div style={{ position: 'absolute', right: 96, top: 480, width: 280, height: 70, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}`, background: '#05080B', boxShadow: '0 18px 40px -22px rgba(0,0,0,0.7)' }}>
        <div style={{ height: 22, background: C.bgElev, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px' }}>
          {[C.rose,C.brass,C.ok].map((c,i)=><span key={i} style={{ width:8,height:8,borderRadius:'50%',background:_mix(c,0.8)}}/>)}
        </div>
        <div style={{ padding: '11px 16px', fontFamily: 'Geist Mono, monospace', fontSize: 16 }}>
          <span style={{ color: a }}>$</span> <span style={{ color: C.text }}>pip install</span> <span style={{ color: C.dim }}>ciris-agent</span>
        </div>
      </div>
      {/* phone */}
      <div style={{ position: 'absolute', left: 270, top: 165, width: 190, height: 330, borderRadius: 30, border: `2px solid ${C.borderS}`, background: C.bg, boxShadow: `0 40px 90px -30px rgba(0,0,0,0.8), 0 0 0 6px ${_mix(a,0.06)}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 56, height: 6, borderRadius: 3, background: C.borderS }} />
        <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><Mark size={64} color={a} /></div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------- ABOUT */
function OGAbout() {
  const a = C.brass;
  return (
    <Card accent={a} eyebrow="ciris.ai / about" title="Mission-Locked,<br/>by People">
      <Stage>
        {/* people-as-circles, linked, warm */}
        <g stroke={_mix(a,0.3)} strokeWidth="1.4" fill="none">
          <path d="M690 150 L840 120 L980 180 M840 120 L900 260 M980 180 L1080 120 M690 150 L740 280 M900 260 L1040 300 M740 280 L900 260" />
        </g>
        {[[690,150,9],[840,120,11],[980,180,10],[900,260,9],[1080,120,8],[740,280,8],[1040,300,9]].map(([x,y,r],i)=>(
          <g key={i}><circle cx={x} cy={y} r={r} fill={_mix(a,0.16)} stroke={a} strokeWidth="1.8" />
            <circle cx={x} cy={y-r*0.35} r={r*0.34} fill={a} /></g>
        ))}
        {/* mission-lock: padlock fused with compass mark */}
        <g transform="translate(820,360)" filter="url(#glow)">
          <path d="M-34 0 a34 34 0 0 1 68 0" fill="none" stroke={a} strokeWidth="6" />
          <rect x="-52" y="0" width="104" height="86" rx="16" fill={_mix(a,0.14)} stroke={a} strokeWidth="2.5" />
        </g>
      </Stage>
      {/* compass mark inside lock body */}
      <div style={{ position: 'absolute', left: 768, top: 360, width: 104, height: 86, display: 'grid', placeItems: 'center', zIndex: 2 }}>
        <Mark size={62} color={a} />
      </div>
    </Card>
  );
}

/* -------------------------------------------------------- HOW IT WORKS */
function OGHow() {
  const a = C.cyan;
  const steps = ['Observe','Context','Analyze','Conscience','Execute'];
  const xs = [430, 590, 750, 910, 1070];
  const y = 250;
  return (
    <Card accent={a} eyebrow="how it works" title="The H3ERE<br/>Pipeline">
      <Stage>
        {/* connecting line */}
        <line x1={xs[0]} y1={y} x2={xs[4]} y2={y} stroke={_mix(a,0.4)} strokeWidth="2.5" />
        {/* flowing dot trail */}
        {xs.slice(0,4).map((x,i)=><polygon key={i} points={`${x+74},${y-5} ${x+86},${y} ${x+74},${y+5}`} fill={_mix(a,0.7)} />)}
        {/* replayable loop arrow */}
        <path d={`M${xs[4]} ${y+34} C${xs[4]} 360 ${xs[0]} 360 ${xs[0]} ${y+34}`} fill="none" stroke={_mix(a,0.45)} strokeWidth="2" strokeDasharray="3 8" />
        <polygon points={`${xs[0]-6},${y+30} ${xs[0]+6},${y+30} ${xs[0]},${y+40}`} fill={_mix(a,0.7)} />
        <Lbl x={(xs[0]+xs[4])/2} y={392} anchor="middle" fill={C.mute} size={14}>replayable · auditable</Lbl>
        {/* nodes */}
        {xs.map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r={i===3?30:24} fill={i===3?_mix(a,0.2):C.bgCard} stroke={a} strokeWidth={i===3?2.6:1.8} filter={i===3?'url(#glow)':undefined} />
            <circle cx={x} cy={y} r="5" fill={a} />
            <Lbl x={x} y={y-44} anchor="middle" fill={i===3?a:C.dim} size={15}>{steps[i]}</Lbl>
          </g>
        ))}
      </Stage>
    </Card>
  );
}

/* --------------------------------------------------------------- TRUST */
function OGTrust() {
  const a = C.cyan;
  const bx = 760, by = 250, bw = 96, gap = 22;
  return (
    <Card accent={a} eyebrow="trust & identity" title="Verify the Agent.<br/>Don't Trust It." >
      <Stage>
        {/* key glyph */}
        <g transform="translate(440,250)" filter="url(#glow)">
          <circle cx="0" cy="0" r="34" fill="none" stroke={a} strokeWidth="3.4" />
          <circle cx="0" cy="0" r="13" fill={_mix(a,0.5)} />
          <line x1="30" y1="0" x2="120" y2="0" stroke={a} strokeWidth="3.4" />
          <line x1="92" y1="0" x2="92" y2="26" stroke={a} strokeWidth="3.4" />
          <line x1="112" y1="0" x2="112" y2="20" stroke={a} strokeWidth="3.4" />
        </g>
        {/* dual signature badges */}
        <g transform="translate(560,150)">
          <rect x="0" y="0" width="150" height="40" rx="20" fill={_mix(C.teal,0.14)} stroke={C.teal} strokeWidth="1.6" />
          <circle cx="22" cy="20" r="6" fill={C.teal} />
          <Lbl x={40} y={25} fill={C.dim} size={14}>Ed25519</Lbl>
        </g>
        <g transform="translate(560,340)">
          <rect x="0" y="0" width="160" height="40" rx="20" fill={_mix(C.violet,0.14)} stroke={C.violet} strokeWidth="1.6" />
          <circle cx="22" cy="20" r="6" fill={C.violet} />
          <Lbl x={40} y={25} fill={C.dim} size={14}>ML-DSA-65</Lbl>
        </g>
        <path d="M712 170 C745 200 745 220 760 250 M720 360 C748 330 748 300 760 270" stroke={_mix(a,0.45)} strokeWidth="2" fill="none" strokeDasharray="2 7" />
        {/* hash-chained ledger blocks */}
        {[0,1,2,3].map(i=>(
          <g key={i} transform={`translate(${bx + i*(bw+gap)},${by-26})`}>
            <rect x="0" y="0" width={bw} height="100" rx="10" fill={C.bgCard} stroke={i===3?a:C.border} strokeWidth={i===3?2:1.4} filter={i===3?'url(#glow)':undefined} />
            <Lbl x={bw/2} y={40} anchor="middle" fill={C.mute} size={12}>{`0x${(0xA17F+i*0x131).toString(16).toUpperCase().slice(0,4)}`}</Lbl>
            <line x1="14" y1="58" x2={bw-14} y2="58" stroke={_mix(a,0.4)} strokeWidth="1.4" />
            <line x1="14" y1="72" x2={bw-30} y2="72" stroke={C.border} strokeWidth="1.4" />
            {i<3 && <line x1={bw} y1="50" x2={bw+gap} y2="50" stroke={_mix(a,0.6)} strokeWidth="2" />}
          </g>
        ))}
      </Stage>
    </Card>
  );
}

/* -------------------------------------------------------------- VISION */
function OGVision() {
  const warm = C.rose;
  return (
    <Card accent={warm} eyebrow="vision" title="A Hopeful<br/>Alternative">
      <Stage>
        {/* cold walled-off figure (left, grey, boxed) */}
        <g opacity="0.65">
          <rect x="470" y="150" width="150" height="300" rx="10" fill="none" stroke={C.mute} strokeWidth="1.6" strokeDasharray="6 7" />
          <circle cx="545" cy="250" r="26" fill="none" stroke={C.dim} strokeWidth="2.4" />
          <path d="M505 360 a40 40 0 0 1 80 0" fill="none" stroke={C.dim} strokeWidth="2.4" />
        </g>
        {/* many warm interlinked figures (right), glowing */}
        <g filter="url(#softglow)">
          <g stroke={_mix(warm,0.4)} strokeWidth="1.8" fill="none">
            <path d="M760 200 L900 160 L1030 230 M900 160 L960 320 M1030 230 L1100 350 M760 200 L820 360 M960 320 L1080 360 M820 360 L960 320 M900 160 L1030 230" />
          </g>
          {[[760,200,20,C.rose],[900,160,26,C.violet],[1030,230,22,C.cyan],[960,320,22,C.brass],[1100,350,18,C.rose],[820,360,18,C.teal],[1080,360,18,C.violet]].map(([x,y,r,col],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill={_mix(col,0.18)} stroke={col} strokeWidth="2" />
              <circle cx={x} cy={y-r*0.34} r={r*0.32} fill={col} />
              <path d={`M${x-r*0.7} ${y+r*0.9} a${r*0.7} ${r*0.7} 0 0 1 ${r*1.4} 0`} fill={col} opacity="0.85" />
            </g>
          ))}
        </g>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGHome, OGInstall, OGAbout, OGHow, OGTrust, OGVision });
