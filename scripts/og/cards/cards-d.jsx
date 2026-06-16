// CIRIS OG cards — batch D (v2 new cards). Bright/luminous per ask v2.
const Cd = window.CIRIS, md = window.mix;
const LblD = ({ x, y, children, fill, anchor = 'start', size = 15, fam = 'Geist Mono, monospace', weight }) => (
  <text x={x} y={y} fontFamily={fam} fontSize={size} fontWeight={weight} fill={fill || Cd.mute}
        textAnchor={anchor} letterSpacing="0.04em">{children}</text>
);
// small signature seal badge
const Seal = ({ x, y, r = 13, col }) => (
  <g transform={`translate(${x},${y})`} filter="url(#bloom)">
    <circle r={r} fill={md(col,0.2)} stroke={col} strokeWidth="2" />
    <path d={`M${-r*0.42} 0 l${r*0.32} ${r*0.34} l${r*0.62} -${r*0.7}`} stroke={col} strokeWidth={r*0.18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* ============================================ EPISTEMIC WEB (hero) */
function OGEpistemicWeb() {
  const a = Cd.cyan;
  const N = [[470,250,Cd.cyan],[640,160,Cd.violet],[700,360,Cd.g3],[840,250,Cd.cyan],[980,160,Cd.violet],[1010,360,Cd.cyan],[880,430,Cd.g3],[1120,260,Cd.violet]];
  const L = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[2,6],[5,4],[5,7],[6,5],[4,7]];
  return (
    <Card accent={a} glow={Cd.g2} eyebrow="epistemic web" title="The Web, With<br/>Its Receipts">
      <Stage>
        {/* luminous signed threads */}
        <g className="og-thread" fill="none" strokeLinecap="round">
          {L.map(([s,e],i)=>(
            <line key={i} x1={N[s][0]} y1={N[s][1]} x2={N[e][0]} y2={N[e][1]}
              stroke="url(#sig)" strokeWidth="2.4" opacity="0.55" strokeDasharray="3 7" />
          ))}
        </g>
        {/* signed packets traveling the threads */}
        <g className="og-pkt">
          {L.slice(0,6).map(([s,e],i)=>(
            <circle key={i} r="4.5" fill={Cd.text} filter="url(#bloom)">
              <animateMotion dur={`${3.2+i*0.4}s`} repeatCount="indefinite"
                path={`M${N[s][0]} ${N[s][1]} L${N[e][0]} ${N[e][1]}`} />
            </circle>
          ))}
        </g>
        {/* claim nodes, each carrying a seal */}
        {N.map(([x,y,c],i)=>(
          <g key={i} className="og-breathe" style={{ animationDelay: `${i*0.3}s` }}>
            <circle cx={x} cy={y} r={i===3?30:21} fill={md(c,0.16)} stroke={c} strokeWidth={i===3?2.6:1.8} filter="url(#bloom)" />
            <Seal x={x} y={y} r={i===3?13:9} col={c} />
          </g>
        ))}
      </Stage>
    </Card>
  );
}

/* ====================================================== CEWP mesh */
function OGCewp() {
  const a = Cd.teal;
  // personal devices: phone, laptop, home box, tablet, watch — linked peer-to-peer
  const D = [
    {x:470,y:200,t:'laptop'},{x:660,y:150,t:'phone'},{x:850,y:220,t:'home'},
    {x:1050,y:170,t:'phone'},{x:560,y:380,t:'phone'},{x:760,y:430,t:'tablet'},
    {x:980,y:400,t:'laptop'},{x:1130,y:330,t:'phone'},
  ];
  const L = [[0,1],[1,2],[2,3],[0,4],[1,5],[2,6],[4,5],[5,6],[6,7],[3,6],[1,3],[4,2]];
  const glyphs = ['▶','✉','◆','⬡']; // stream / message / file / signed-claim
  return (
    <Card accent={a} glow={Cd.cyan} eyebrow="cewp" title="The Internet,<br/>No Middleman">
      <Stage>
        {/* faded, bypassed data center (the middle that's gone) */}
        <g opacity="0.32">
          <rect x="760" y="250" width="120" height="92" rx="8" fill="none" stroke={Cd.mute} strokeWidth="1.6" strokeDasharray="5 6" />
          {[0,1,2].map(i=><line key={i} x1="775" y1={270+i*22} x2="865" y2={270+i*22} stroke={Cd.mute} strokeWidth="3" strokeLinecap="round" />)}
          <line x1="748" y1="238" x2="892" y2="354" stroke={Cd.rose} strokeWidth="3.5" strokeLinecap="round" />
        </g>
        {/* direct device-to-device links */}
        <g fill="none" strokeLinecap="round">
          {L.map(([s,e],i)=>(
            <line key={i} x1={D[s].x} y1={D[s].y} x2={D[e].x} y2={D[e].y} stroke={md(a,0.5)} strokeWidth="1.8" />
          ))}
          {/* post-quantum signed packets flowing along links */}
          {L.slice(0,7).map(([s,e],i)=>(
            <circle key={i} r="4" fill={i%2?Cd.cyan:Cd.g1} filter="url(#bloom)">
              <animateMotion dur={`${2.8+i*0.35}s`} repeatCount="indefinite" path={`M${D[s].x} ${D[s].y} L${D[e].x} ${D[e].y}`} />
            </circle>
          ))}
        </g>
        {/* everything-rides-the-mesh glyph chips on a couple links */}
        {[[565,175,0],[955,285,1],[660,405,2],[1090,250,3]].map(([x,y,gi],i)=>(
          <g key={i}>
            <rect x={x-15} y={y-15} width="30" height="30" rx="8" fill={Cd.bgCard} stroke={md(Cd.cyan,0.6)} strokeWidth="1.3" />
            <text x={x} y={y+6} textAnchor="middle" fontSize="16" fill={Cd.cyan}>{glyphs[gi]}</text>
          </g>
        ))}
        {/* device nodes */}
        {D.map((d,i)=>(
          <g key={i} className="og-breathe" style={{ animationDelay: `${i*0.25}s` }}>
            <circle cx={d.x} cy={d.y} r="17" fill={md(a,0.18)} stroke={a} strokeWidth="2" filter="url(#bloom)" />
            <DeviceGlyph t={d.t} x={d.x} y={d.y} col={a} />
          </g>
        ))}
        {/* tiny lock on a central link = post-quantum */}
        <g transform="translate(720,300)">
          <rect x="-9" y="-3" width="18" height="14" rx="3" fill={md(Cd.violet,0.3)} stroke={Cd.violet} strokeWidth="1.4" />
          <path d="M-5 -3 a5 5 0 0 1 10 0" fill="none" stroke={Cd.violet} strokeWidth="1.6" />
        </g>
      </Stage>
    </Card>
  );
}
// minimal device glyphs
function DeviceGlyph({ t, x, y, col }) {
  const s = { stroke: col, strokeWidth: 1.6, fill: 'none' };
  if (t === 'phone') return <rect x={x-5} y={y-8} width="10" height="16" rx="2.5" {...s} />;
  if (t === 'laptop') return <g {...s}><rect x={x-8} y={y-6} width="16" height="10" rx="1.5" /><line x1={x-10} y1={y+6} x2={x+10} y2={y+6} /></g>;
  if (t === 'tablet') return <rect x={x-6} y={y-7} width="12" height="14" rx="2" {...s} />;
  return <g {...s}><path d={`M${x-8} ${y+1} L${x} ${y-7} L${x+8} ${y+1} L${x+8} ${y+8} L${x-8} ${y+8} Z`} /></g>; // home
}

/* =================================================== GRAMMAR (CEG) */
function OGGrammar() {
  const a = Cd.violet;
  const cx = 800, cy = 290;
  const around = [
    {x:560,y:180,c:Cd.ok,k:'agree'},{x:1040,y:180,c:Cd.rose,k:'disagree'},
    {x:560,y:410,c:Cd.cyan,k:'correct'},{x:1040,y:410,c:Cd.brass,k:'supersede'},
  ];
  const Env = ({ x, y, w = 116, h = 78, col, seal, big }) => (
    <g>
      <rect x={x-w/2} y={y-h/2} width={w} height={h} rx="9" fill={md(col,big?0.16:0.1)} stroke={col} strokeWidth={big?2.6:1.8} filter={big?'url(#bloom)':undefined} />
      <path d={`M${x-w/2} ${y-h/2} L${x} ${y} L${x+w/2} ${y-h/2}`} fill="none" stroke={col} strokeWidth="1.6" />
      <Seal x={x+w/2-15} y={y+h/2-14} r={9} col={seal||col} />
    </g>
  );
  return (
    <Card accent={a} glow={Cd.g2} eyebrow="ciris epistemic grammar" title="See Who Said It.<br/>Decide Yourself.">
      <Stage>
        {/* threads from center claim to the composing envelopes */}
        <g fill="none" strokeLinecap="round">
          {around.map((p,i)=>(
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="url(#sig)" strokeWidth="2" opacity="0.5" strokeDasharray="3 6">
              <animate attributeName="stroke-dashoffset" from="0" to="-18" dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />
            </line>
          ))}
        </g>
        {around.map((p,i)=><Env key={i} x={p.x} y={p.y} col={p.c} />)}
        {/* center signed claim */}
        <Env x={cx} y={cy} w={150} h={100} col={a} seal={Cd.g1} big />
        {around.map((p,i)=><LblD key={i} x={p.x} y={p.y+52} anchor="middle" fill={md(p.c,0.9)} size={13}>{p.k}</LblD>)}
      </Stage>
    </Card>
  );
}

/* ====================================================== EVENTS */
function OGEvents() {
  const a = Cd.rose;
  const cx = 860, cy = 300, R = 150;
  const beams = [-58,-26,4,32,64];
  return (
    <Card accent={a} glow={Cd.g3} eyebrow="events" title="Where CIRIS<br/>Shows Up">
      <Stage>
        {/* globe */}
        <circle cx={cx} cy={cy} r={R} fill={md(a,0.08)} stroke={md(a,0.5)} strokeWidth="1.6" filter="url(#bloom)" />
        {[-0.55,-0.18,0.2,0.58].map((k,i)=>(
          <ellipse key={i} cx={cx} cy={cy+k*R} rx={Math.sqrt(Math.max(0.001,1-k*k))*R} ry={12} fill="none" stroke={md(a,0.3)} strokeWidth="1.1" />
        ))}
        {[-0.55,-0.18,0.2,0.58].map((k,i)=>(
          <ellipse key={'m'+i} cx={cx} cy={cy} rx={Math.abs(k)*R} ry={R} fill="none" stroke={md(a,0.22)} strokeWidth="1" />
        ))}
        {/* origin pin */}
        <circle cx={cx-40} cy={cy-46} r="7" fill={Cd.g1} filter="url(#bloom)" />
        {/* radiating signals to rooms */}
        <g className="og-radiate">
          {beams.map((deg,i)=>{
            const r = deg*Math.PI/180; const ex = cx-40 + Math.cos(r)*260, ey = cy-46 + Math.sin(r)*190;
            return (
              <g key={i}>
                <line x1={cx-40} y1={cy-46} x2={ex} y2={ey} stroke="url(#sig)" strokeWidth="2" opacity="0.5" strokeDasharray="2 8">
                  <animate attributeName="stroke-dashoffset" from="0" to="-20" dur={`${1.4+i*0.2}s`} repeatCount="indefinite" />
                </line>
                {/* a room / venue marker */}
                <g transform={`translate(${ex},${ey})`}>
                  <circle r="15" fill={Cd.bgCard} stroke={md(a,0.7)} strokeWidth="1.6" />
                  {/* podium-and-people glyph */}
                  <circle cx="0" cy="-4" r="3.4" fill={a} />
                  <path d="M-7 7 a7 7 0 0 1 14 0" fill={md(a,0.8)} />
                </g>
              </g>
            );
          })}
        </g>
      </Stage>
    </Card>
  );
}

/* ====================================================== PAPERS */
function OGPapers() {
  const a = Cd.cyan;
  const x0 = 640, y0 = 470, w = 470, h = 290;
  const pts = Array.from({length:9}).map((_,i)=>{
    const x = x0 + (i/8)*w; const y = y0 - h*(0.9*Math.exp(-i*0.46)+0.07); return [x,y];
  });
  return (
    <Card accent={a} glow={Cd.g2} eyebrow="papers" title="The Formal<br/>Backing">
      <Stage>
        {/* stacked signed documents (left) */}
        {[0,1,2].map(i=>(
          <g key={i} transform={`translate(${470+i*8},${250 - i*34})`}>
            <rect x="0" y="0" width="120" height="150" rx="8" fill={Cd.bgCard} stroke={md(a,0.45)} strokeWidth="1.5" />
            {[0,1,2,3].map(k=><line key={k} x1="16" y1={30+k*22} x2={104-(k%2)*30} y2={30+k*22} stroke={md(a,0.3)} strokeWidth="2.2" strokeLinecap="round" />)}
            {i===2 && <Seal x={96} y={126} r={11} col={Cd.g1} />}
          </g>
        ))}
        {/* k_eff collapse curve (right) */}
        <line x1={x0} y1={y0} x2={x0+w} y2={y0} stroke={Cd.border} strokeWidth="1.5" />
        <line x1={x0} y1={y0} x2={x0} y2={y0-h} stroke={Cd.border} strokeWidth="1.5" />
        {[0.25,0.5,0.75].map((k,i)=><line key={i} x1={x0} y1={y0-h*k} x2={x0+w} y2={y0-h*k} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
        <path className="og-draw" d={'M'+pts.map(p=>p.join(' ')).join(' L ')} fill="none" stroke="url(#sig)" strokeWidth="3.4" filter="url(#bloom)" />
        {pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="5" fill={i===0?Cd.g1:a} filter="url(#bloom)" />)}
        <LblD x={x0+w} y={y0+26} anchor="end" fill={Cd.mute} size={13}>layer depth →</LblD>
        <LblD x={x0-12} y={y0-h+4} anchor="end" fill={Cd.mute} size={13}>k_eff</LblD>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGEpistemicWeb, OGCewp, OGGrammar, OGEvents, OGPapers });
