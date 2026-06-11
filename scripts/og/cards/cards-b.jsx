// CIRIS OG cards — batch B.
const Cb = window.CIRIS;
const mb = window.mix;
const Lbl2 = ({ x, y, children, fill, anchor = 'start', size = 15, fam = 'Geist Mono, monospace', weight }) => (
  <text x={x} y={y} fontFamily={fam} fontSize={size} fontWeight={weight} fill={fill || Cb.mute}
        textAnchor={anchor} letterSpacing="0.04em">{children}</text>
);

/* -------------------------------------------------------------- SAFETY */
function OGSafety() {
  const a = Cb.ok;
  return (
    <Card accent={a} eyebrow="safety" title="The Safest AI<br/>You Can Use">
      <Stage>
        {/* immutable ledger stack (left of stop) */}
        {[0,1,2].map(i=>(
          <g key={i} transform={`translate(${470+i*10},${150+i*70})`}>
            <rect x="0" y="0" width="150" height="54" rx="9" fill={Cb.bgCard} stroke={mb(a,0.4)} strokeWidth="1.5" />
            <path d="M16 27 l9 9 l16 -18" stroke={a} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="56" y1="22" x2="132" y2="22" stroke={mb(a,0.5)} strokeWidth="2" />
            <line x1="56" y1="34" x2="110" y2="34" stroke={Cb.border} strokeWidth="2" />
          </g>
        ))}
        {/* multilingual shield with 29 */}
        <g transform="translate(1010,360)">
          <path d="M0 -78 L72 -52 L72 22 C72 70 38 96 0 112 C-38 96 -72 70 -72 22 L-72 -52 Z"
                fill={mb(Cb.cyan,0.10)} stroke={Cb.cyan} strokeWidth="2.2" filter="url(#glow)" />
          <Lbl2 x={0} y={6} anchor="middle" fill={Cb.text} size={46} weight="600" fam="Geist, sans-serif">29</Lbl2>
          <Lbl2 x={0} y={40} anchor="middle" fill={Cb.dim} size={15}>languages</Lbl2>
        </g>
      </Stage>
      {/* emergency stop button */}
      <div style={{ position: 'absolute', left: 690, top: 180, width: 210, height: 210, borderRadius: '50%',
        background: `radial-gradient(circle at 38% 32%, ${mb(Cb.rose,0.95)}, ${mb('#8E1733',0.95)})`,
        border: `8px solid ${Cb.bgElev}`, boxShadow: `0 0 0 4px ${mb(Cb.rose,0.4)}, 0 40px 80px -30px rgba(225,75,127,0.6)`,
        display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 150, height: 150, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.55)', display: 'grid', placeItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 8, background: 'rgba(255,255,255,0.9)' }} />
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------- CROWDSOURCING (hero) */
function OGCrowd() {
  const a = Cb.violet;
  const cx = 880, cy = 300, R = 196;
  const scripts = ['A','あ','文','ع','א','क','ਪ','த','ไ','한','Я','Ξ','ね','字','ع','ñ','ç','Ω','য','ᮃ','የ','क','カ','文','नी','ক',' A','字','ع'];
  return (
    <Card accent={a} eyebrow="crowdsourcing alignment" title="Pick a Language.<br/>Shape the Accord.">
      <Stage>
        {/* ring of 29 language glyphs */}
        {scripts.map((s,i)=>{
          const ang = (i/scripts.length)*Math.PI*2 - Math.PI/2;
          const x = cx + Math.cos(ang)*(R+30), y = cy + Math.sin(ang)*(R+30);
          return <text key={i} x={x} y={y+6} textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="22"
            fill={i%3===0?a:(i%3===1?Cb.cyan:Cb.dim)} opacity={0.5+0.5*Math.abs(Math.cos(ang))}>{s}</text>;
        })}
        {/* globe */}
        <circle cx={cx} cy={cy} r={R} fill={mb(a,0.07)} stroke={mb(a,0.45)} strokeWidth="1.6" filter="url(#glow)" />
        {[-0.6,-0.25,0.1,0.45,0.78].map((k,i)=>(
          <ellipse key={i} cx={cx} cy={cy+ k*R} rx={Math.sqrt(Math.max(0.001,1-k*k))*R} ry={14} fill="none" stroke={mb(a,0.3)} strokeWidth="1.2" />
        ))}
        {[-0.6,-0.2,0.2,0.6].map((k,i)=>(
          <ellipse key={'m'+i} cx={cx} cy={cy} rx={Math.abs(k)*R} ry={R} fill="none" stroke={mb(a,0.22)} strokeWidth="1.1" />
        ))}
        <ellipse cx={cx} cy={cy} rx={R} ry={R} fill="none" stroke={mb(a,0.4)} strokeWidth="1.4" />
        {/* signature gradient arc — nod to the language switcher */}
        <defs>
          <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={Cb.g1} /><stop offset="0.5" stopColor={Cb.g2} /><stop offset="1" stopColor={Cb.g3} />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={R+30} fill="none" stroke="url(#sigGrad)" strokeWidth="3" strokeDasharray="3 10" opacity="0.6" />
      </Stage>
      {/* diff edit card (collaborative) */}
      <div style={{ position: 'absolute', left: 470, top: 220, width: 184, height: 168, borderRadius: 14, background: Cb.bgCard, border: `1px solid ${Cb.border}`, padding: '16px 18px', fontFamily: 'Geist Mono, monospace', fontSize: 14, boxShadow: '0 24px 50px -26px rgba(0,0,0,0.8)' }}>
        <div style={{ color: Cb.mute, fontSize: 12, marginBottom: 12 }}>Book IX · §3</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 7 }}><span style={{ color: Cb.rose }}>−</span><span style={{ color: Cb.mute, textDecoration: 'line-through' }}>shall comply</span></div>
        <div style={{ display: 'flex', gap: 8 }}><span style={{ color: Cb.ok }}>+</span><span style={{ color: Cb.text }}>shall reason and</span></div>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 18, marginBottom: 12 }}><span style={{ color: Cb.text }}>then act</span></div>
        <div style={{ height: 32, borderRadius: 9, background: mb(a,0.18), border: `1px solid ${mb(a,0.5)}`, display: 'grid', placeItems: 'center', color: Cb.text, fontSize: 13 }}>propose edit</div>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------- FIRST CONTACT */
function OGFirst() {
  const a = Cb.teal;
  return (
    <Card accent={a} eyebrow="first contact" title="Co-Emerging<br/>With Us">
      <Stage>
        {/* a growing form: shared trunk, human roots below, emergent branches above */}
        <g stroke={a} strokeWidth="2" fill="none" filter="url(#glow)">
          {/* trunk */}
          <path d="M820 360 L820 270" strokeWidth="3" />
          {/* branches up (emergent) */}
          <path d="M820 270 C820 220 760 210 720 170 M820 270 C820 220 880 210 920 170 M820 270 C820 230 820 200 820 150 M760 200 C740 180 720 175 700 150 M880 200 C900 180 920 175 940 150" />
          {/* roots down (human) */}
          <path d="M820 360 C820 420 760 430 720 470 M820 360 C820 420 880 430 920 470 M820 360 C820 410 820 440 820 490 M755 420 C735 445 720 455 705 480 M885 420 C905 445 920 455 935 480" stroke={mb(Cb.brass,0.8)} />
        </g>
        {/* node tips — emergent (cyan) above, human (warm) below */}
        {[[720,170,Cb.cyan],[920,170,Cb.cyan],[820,150,Cb.cyan],[700,150,Cb.cyan],[940,150,Cb.cyan]].map(([x,y,c],i)=><circle key={'u'+i} cx={x} cy={y} r="7" fill={c} filter="url(#glow)" />)}
        {[[720,470,Cb.brass],[920,470,Cb.brass],[820,490,Cb.brass],[705,480,Cb.brass],[935,480,Cb.brass]].map(([x,y,c],i)=><circle key={'d'+i} cx={x} cy={y} r="7" fill={c} />)}
        {/* meeting heart at center */}
        <circle cx="820" cy="315" r="13" fill={mb(a,0.3)} stroke={a} strokeWidth="2.5" filter="url(#glow)" />
        <Lbl2 x={1040} y={175} anchor="end" fill={mb(Cb.cyan,0.8)} size={14}>emergent</Lbl2>
        <Lbl2 x={1040} y={490} anchor="end" fill={mb(Cb.brass,0.8)} size={14}>human</Lbl2>
      </Stage>
    </Card>
  );
}

/* ----------------------------------------------------------- FEDERATION */
function OGFed() {
  const a = Cb.teal;
  const nodes = [[560,210],[720,150],[900,200],[1050,160],[640,340],[820,320],[1000,360],[760,470],[940,470]];
  const links = [[0,1],[1,2],[2,3],[0,4],[1,5],[2,6],[4,5],[5,6],[4,7],[5,7],[6,8],[7,8],[3,6]];
  return (
    <Card accent={a} eyebrow="federation" title="A Network That<br/>Watches Itself">
      <Stage>
        <g stroke={mb(a,0.3)} strokeWidth="1.5" fill="none">
          {links.map(([s,e],i)=><line key={i} x1={nodes[s][0]} y1={nodes[s][1]} x2={nodes[e][0]} y2={nodes[e][1]} />)}
        </g>
        {/* supervision chain — dashed oversight from a hub */}
        <g stroke={mb(Cb.cyan,0.7)} strokeWidth="2" fill="none" strokeDasharray="2 8" strokeLinecap="round">
          <path d="M820 320 L720 150 M820 320 L1000 360 M820 320 L640 340" />
        </g>
        {nodes.map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r={i===5?20:11} fill={i===5?mb(Cb.cyan,0.2):mb(a,0.18)} stroke={i===5?Cb.cyan:a} strokeWidth={i===5?2.4:1.8} filter={i===5?'url(#glow)':undefined} />
            {i!==5 && <circle cx={x} cy={y} r="4" fill={a} />}
          </g>
        ))}
        {/* eye in supervisor node */}
        <g transform="translate(820,320)">
          <path d="M-13 0 C-7 -8 7 -8 13 0 C7 8 -7 8 -13 0 Z" fill="none" stroke={Cb.cyan} strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill={Cb.cyan} />
        </g>
        {/* signed record chips flowing on a link */}
        {[[680,250],[930,280]].map(([x,y],i)=>(
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-20" y="-12" width="40" height="24" rx="6" fill={Cb.bgCard} stroke={mb(a,0.5)} strokeWidth="1.3" />
            <path d="M-8 0 l5 5 l9 -10" stroke={Cb.ok} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </Stage>
    </Card>
  );
}

/* -------------------------------------------------------------- COMPARE */
function OGCompare() {
  const a = Cb.ok;
  return (
    <Card accent={a} eyebrow="compare" title="With Receipts.">
      <Stage>
        {/* scorecard */}
        <g>
          <rect x="430" y="150" width="360" height="330" rx="16" fill={Cb.bgCard} stroke={Cb.border} strokeWidth="1.5" />
          <Lbl2 x={470} y={200} fill={Cb.dim} size={15}>CIRIS</Lbl2>
          <Lbl2 x={690} y={200} fill={Cb.mute} size={15}>others</Lbl2>
          <line x1="450" y1="218" x2="770" y2="218" stroke={Cb.border} strokeWidth="1.4" />
          {[0,1,2,3].map(i=>{
            const y = 258 + i*52;
            return (
              <g key={i}>
                <rect x="450" y={y-22} width="120" height="10" rx="5" fill={mb(a,0.25)} />
                <g transform={`translate(620,${y-18})`}><circle r="14" cx="0" cy="0" fill={mb(a,0.16)} stroke={a} strokeWidth="1.8" /><path d="M-7 0 l5 5 l9 -10" stroke={a} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
                <g transform={`translate(710,${y-18})`}><circle r="14" cx="0" cy="0" fill="none" stroke={Cb.mute} strokeWidth="1.6" /><line x1="-6" y1="0" x2="6" y2="0" stroke={Cb.mute} strokeWidth="2.2" /></g>
              </g>
            );
          })}
        </g>
      </Stage>
      {/* receipt */}
      <div style={{ position: 'absolute', left: 860, top: 120, width: 230, transform: 'rotate(4deg)', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.7))' }}>
        <div style={{ background: '#F4F5F7', color: '#1A222C', padding: '24px 22px 30px', fontFamily: 'Geist Mono, monospace', fontSize: 14,
          clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),92% 100%,84% calc(100% - 8px),76% 100%,68% calc(100% - 8px),60% 100%,52% calc(100% - 8px),44% 100%,36% calc(100% - 8px),28% 100%,20% calc(100% - 8px),12% 100%,4% calc(100% - 8px),0 100%)' }}>
          <div style={{ textAlign: 'center', fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '0.1em', marginBottom: 14 }}>CIRIS</div>
          <div style={{ borderTop: '1.5px dashed #1A222C', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[['signed',1],['auditable',1],['no lock-in',1],['data centers',0]].map(([k,v],i)=>(
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}><span>{k}</span><span style={{ color: v?'#1F8A4C':'#B33', fontWeight: 700 }}>{v?'✓':'0'}</span></div>
            ))}
          </div>
          <div style={{ borderTop: '1.5px dashed #1A222C', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>TRUST</span><span>100%</span></div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------- SAFETY VS CENSORSHIP */
function OGSvC() {
  const a = Cb.brass;
  const cx = 820, cy = 380;
  return (
    <Card accent={a} eyebrow="safety vs censorship" title="Where Safety<br/>Can Drift">
      <Stage>
        {/* gauge arc */}
        <path d={`M${cx-200} ${cy} A200 200 0 0 1 ${cx+200} ${cy}`} fill="none" stroke={Cb.border} strokeWidth="14" strokeLinecap="round" />
        <path d={`M${cx-200} ${cy} A200 200 0 0 1 ${cx-40} ${cy-196}`} fill="none" stroke={mb(Cb.ok,0.7)} strokeWidth="14" strokeLinecap="round" />
        <path d={`M${cx+40} ${cy-196} A200 200 0 0 1 ${cx+200} ${cy}`} fill="none" stroke={mb(Cb.rose,0.7)} strokeWidth="14" strokeLinecap="round" />
        {/* ticks */}
        {Array.from({length:11}).map((_,i)=>{
          const ang = Math.PI - (i/10)*Math.PI;
          const r1=170,r2=186;
          return <line key={i} x1={cx+Math.cos(ang)*r1} y1={cy-Math.sin(ang)*r1} x2={cx+Math.cos(ang)*r2} y2={cy-Math.sin(ang)*r2} stroke={Cb.mute} strokeWidth="2" />;
        })}
        {/* needle drifting off-center (toward rose side) */}
        {(()=>{ const ang = Math.PI - 0.62*Math.PI; const x=cx+Math.cos(ang)*150, y=cy-Math.sin(ang)*150;
          return <g><line x1={cx} y1={cy} x2={x} y2={y} stroke={a} strokeWidth="4" strokeLinecap="round" filter="url(#glow)" /><circle cx={cx} cy={cy} r="14" fill={Cb.bgElev} stroke={a} strokeWidth="2.5" /></g>; })()}
        {/* crowd dots (left) vs machine verdict (right) */}
        <g fill={mb(Cb.ok,0.6)}>{[[480,180],[510,210],[470,240],[520,260],[490,290]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6" />)}</g>
        <Lbl2 x={480} y={150} fill={Cb.dim} size={14}>crowd rules</Lbl2>
        <g transform="translate(1120,200)"><rect x="-70" y="-20" width="80" height="40" rx="9" fill={mb(Cb.rose,0.14)} stroke={Cb.rose} strokeWidth="1.6" /><Lbl2 x={-30} y={5} anchor="middle" fill={Cb.dim} size={13}>verdict</Lbl2></g>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGSafety, OGCrowd, OGFirst, OGFed, OGCompare, OGSvC });
