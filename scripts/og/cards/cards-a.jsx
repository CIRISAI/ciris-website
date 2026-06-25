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
// Round-2: field convergence. Four colour-streams (Consumer AI / Misinformation
// / Superalignment / Big Tech) curve inward from the corners of a right-weighted
// field and fuse into one luminous floor — the static landscape counterpart to
// the on-page ConvergenceHero. Text-free; the headline composites bottom-left.
function OGHome() {
  const a = C.cyan;
  // right-weighted convergence field, ~ square, centred at (cx,cy)
  const cx = 854, cy = 312, F = 250; // field half-size (nudged left so the
  // right-edge problem labels keep margin)
  const floorY = cy + F * 0.30;
  // four sources, colour-matched to the four paths (physical corners)
  const SRC = [
    { c: C.cyan,   x: cx - F * 0.70, y: cy - F * 0.70 }, // consumer ai (TL)
    { c: C.rose,   x: cx + F * 0.70, y: cy - F * 0.66 }, // misinformation (TR)
    { c: C.violet, x: cx - F * 0.72, y: cy + F * 0.66 }, // superalignment (BL)
    { c: C.teal,   x: cx + F * 0.72, y: cy + F * 0.66 }, // big tech (BR)
  ];
  // a curved stream from a source into the centre (control bowed by the normal)
  const stream = (s) => {
    const dx = cx - s.x, dy = cy - s.y, L = Math.hypot(dx, dy);
    const mx = (s.x + cx) / 2, my = (s.y + cy) / 2;
    const ctlx = mx + (-dy / L) * F * 0.34, ctly = my + (dx / L) * F * 0.34;
    return `M${s.x} ${s.y} Q${ctlx} ${ctly} ${cx} ${cy}`;
  };
  return (
    <Card accent={a} eyebrow="the convergence" title="It turns out these are<br/>all the same problem." glow={C.violet}>
      <Stage>
        <defs>
          <radialGradient id="oh-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8fbff" stopOpacity="0.95" />
            <stop offset="40%" stopColor={a} stopOpacity="0.45" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
          {SRC.map((s,i)=>(
            <linearGradient key={i} id={`oh-s${i}`} gradientUnits="userSpaceOnUse"
              x1={s.x} y1={s.y} x2={cx} y2={cy}>
              <stop offset="0" stopColor={s.c} stopOpacity="0" />
              <stop offset="0.45" stopColor={s.c} stopOpacity="0.85" />
              <stop offset="1" stopColor="#dff7ff" stopOpacity="0.95" />
            </linearGradient>
          ))}
        </defs>
        {/* four converging streams (broad soft + bright core, twice each) */}
        {SRC.map((s,i)=>(
          <g key={i} filter="url(#softglow)">
            <path d={stream(s)} stroke={`url(#oh-s${i})`} strokeWidth="14" fill="none"
                  strokeLinecap="round" opacity="0.22" />
            <path d={stream(s)} stroke={`url(#oh-s${i})`} strokeWidth="3.4" fill="none"
                  strokeLinecap="round" />
          </g>
        ))}
        {/* source nodes */}
        {SRC.map((s,i)=>(
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="9" fill={_mix(s.c,0.18)} stroke={s.c} strokeWidth="2" />
            <circle cx={s.x} cy={s.y} r="3" fill={s.c} />
          </g>
        ))}
        {/* name the four problems at their source nodes — so the card SAYS what
            is converging, not just shows abstract streams. Bright light-tints of
            each node colour so they stay colour-coded but read easily on the dark
            field. Localized via OG_TR (reuses the home hero's heroLabels). */}
        {[
          { i: 0, t: 'No AI you can trust',      dy: -25, c: '#a9e7ff' },
          { i: 1, t: "Can't tell what's true",   dy: -25, c: '#ffaecb' },
          { i: 2, t: 'AI outrunning everyone',   dy: 41,  c: '#cabff9' },
          { i: 3, t: 'Big Tech owns everything', dy: 41,  c: '#8fd9dc' },
        ].map(({ i, t, dy, c }) => (
          <text key={`lbl${i}`} x={SRC[i].x} y={SRC[i].y + dy} textAnchor="middle"
                fontFamily="Geist Mono, monospace" fontSize="19" fontWeight="500" letterSpacing="0.02em"
                fill={c}>{window.ogTr(t)}</text>
        ))}
        {/* the luminous floor (shared substrate) the streams fuse into */}
        <g filter="url(#softglow)">
          <ellipse cx={cx} cy={floorY} rx={F * 0.62} ry={F * 0.085}
                   fill="#96e8ff" opacity="0.10" />
          <line x1={cx - F * 0.5} y1={floorY} x2={cx + F * 0.5} y2={floorY}
                stroke="#bdf0ff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
        {/* convergence core */}
        <circle cx={cx} cy={cy} r={F * 0.34} fill="url(#oh-core)" />
        <g filter="url(#bloom)">
          <circle cx={cx} cy={cy} r="7" fill="#e8fbff" />
        </g>
      </Stage>
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
        <path className="og-flow" d="M470 320 C560 320 560 150 660 150 M470 350 C560 350 560 330 660 330 M470 380 C560 380 560 510 660 510"
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
        <g className="og-twinkle" transform="translate(820,360)" filter="url(#glow)">
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
        <path className="og-flow" d={`M${xs[4]} ${y+34} C${xs[4]} 360 ${xs[0]} 360 ${xs[0]} ${y+34}`} fill="none" stroke={_mix(a,0.45)} strokeWidth="2" strokeDasharray="3 8" />
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
        <path className="og-flow" d="M712 170 C745 200 745 220 760 250 M720 360 C748 330 748 300 760 270" stroke={_mix(a,0.45)} strokeWidth="2" fill="none" strokeDasharray="2 7" />
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

/* ----------------------------------------------------- VISION / REACHING */
// Round-2 bespoke card for /vision ("The Reaching"). A quiet chain of widening
// rungs ascends toward a crowning glow (atoms -> cells -> people -> beyond),
// with rising motes — the static landscape counterpart to the on-page
// ReachingGraphic. Weighted right so the bottom-left title zone stays clear.
// Subdued by design; text-free, title composites in the Card title zone.
function OGReaching() {
  const a = C.violet;
  const cx = 880;            // ascent axis, right-weighted
  const topY = 70, botY = 560;
  const N = 12;
  // rungs: narrow + bright near the top crown, wide + dim near the base
  const rungs = Array.from({ length: N }, (_, i) => {
    const f = i / (N - 1);                 // 0 at base, 1 at crown
    const y = botY + (topY - botY) * f;
    const hw = 168 + (40 - 168) * f;       // half-width: 168 -> 40
    const b = 0.16 + f * 0.66;             // brightness
    return { y, hw, b };
  });
  // rising motes (deterministic; this is a still poster)
  const motes = Array.from({ length: 22 }, (_, i) => {
    const r = (i * 9973) % 1000 / 1000;
    const r2 = (i * 7333 + 137) % 1000 / 1000;
    return {
      x: cx + (r * 2 - 1) * 150,
      y: topY + r2 * (botY - topY),
      rad: 0.8 + r * 1.8,
      f: 1 - r2,
    };
  });
  return (
    <Card accent={a} eyebrow="vision / the reaching" title="The Reaching" glow={C.rose}>
      <Stage>
        <defs>
          <linearGradient id="or-axis" x1="0" y1={botY} x2="0" y2={topY} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={a} stopOpacity="0" />
            <stop offset="1" stopColor="#beb4f5" stopOpacity="0.34" />
          </linearGradient>
          <radialGradient id="or-crown" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cfc7f2" stopOpacity="0.85" />
            <stop offset="45%" stopColor={a} stopOpacity="0.30" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* central ascent axis, brightening upward */}
        <line x1={cx} y1={botY} x2={cx} y2={topY - 6} stroke="url(#or-axis)" strokeWidth="1.4" />
        {/* the chain of reaching rungs + the side rails between them */}
        <g strokeLinecap="round" fill="none">
          {rungs.map((r, i) => {
            const op = (r.b * 0.85).toFixed(3);
            const next = rungs[i + 1];
            return (
              <g key={i}>
                <line x1={cx - r.hw} y1={r.y} x2={cx + r.hw} y2={r.y}
                      stroke="#b0a6ec" strokeWidth="1.6" opacity={op} />
                {next && (
                  <>
                    <path d={`M${cx - r.hw} ${r.y} Q${cx} ${(r.y + next.y) / 2 - 8} ${cx - next.hw} ${next.y}`}
                          stroke={_mix(a, 0.36)} strokeWidth="1.1" opacity={op} />
                    <path d={`M${cx + r.hw} ${r.y} Q${cx} ${(r.y + next.y) / 2 - 8} ${cx + next.hw} ${next.y}`}
                          stroke={_mix(a, 0.36)} strokeWidth="1.1" opacity={op} />
                  </>
                )}
              </g>
            );
          })}
        </g>
        {/* rung endpoint nodes (the reaching hands) */}
        <g>
          {rungs.map((r, i) => (
            <g key={i} fill="#cfc7f2" opacity={(r.b * 0.9).toFixed(3)}>
              <circle cx={cx - r.hw} cy={r.y} r={1.6 + r.b * 1.6} />
              <circle cx={cx + r.hw} cy={r.y} r={1.6 + r.b * 1.6} />
            </g>
          ))}
        </g>
        {/* rising motes */}
        <g fill="#beb4f5">
          {motes.map((m, i) => (
            <circle key={i} cx={m.x} cy={m.y} r={m.rad} opacity={(0.18 + m.f * 0.42).toFixed(3)} />
          ))}
        </g>
        {/* the crown: where the chain dissolves into light */}
        <circle cx={cx} cy={topY} r="150" fill="url(#or-crown)" />
        <g filter="url(#bloom)">
          <circle cx={cx} cy={topY} r="5.5" fill="#efeaff" />
        </g>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGHome, OGInstall, OGAbout, OGHow, OGTrust, OGReaching });
