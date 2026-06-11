// CIRIS OG cards — batch C.
const Cc = window.CIRIS;
const mc = window.mix;
const Lbl3 = ({ x, y, children, fill, anchor = 'start', size = 15, fam = 'Geist Mono, monospace', weight }) => (
  <text x={x} y={y} fontFamily={fam} fontSize={size} fontWeight={weight} fill={fill || Cc.mute}
        textAnchor={anchor} letterSpacing="0.04em">{children}</text>
);

/* ------------------------------------------------------------- SERVICES */
function OGServices() {
  const a = Cc.teal;
  return (
    <Card accent={a} eyebrow="services" title="Same Price.<br/>Everywhere.">
      <Stage>
        {/* one honest price tag */}
        <g transform="translate(740,170) rotate(-6 160 160)">
          <path d="M40 0 L300 0 L300 230 L170 320 L40 230 Z" fill={mc(a,0.10)} stroke={a} strokeWidth="2.4" filter="url(#glow)" />
          <circle cx="170" cy="46" r="16" fill="none" stroke={a} strokeWidth="2.4" />
          <circle cx="170" cy="46" r="5" fill={a} />
          <Lbl3 x={170} y={150} anchor="middle" fill={Cc.text} size={64} weight="600" fam="Geist, sans-serif">$20</Lbl3>
          <Lbl3 x={170} y={186} anchor="middle" fill={Cc.dim} size={18}>/ month · flat</Lbl3>
          <line x1="80" y1="214" x2="260" y2="214" stroke={mc(a,0.4)} strokeWidth="1.4" />
          <Lbl3 x={170} y={244} anchor="middle" fill={Cc.mute} size={14}>one tier · no enterprise</Lbl3>
        </g>
      </Stage>
    </Card>
  );
}

/* --------------------------------------------------------------- MODELS */
function OGModels() {
  const a = Cc.cyan;
  const fams = [['Llama 4', Cc.cyan], ['Qwen 3.6', Cc.violet], ['Gemma 4', Cc.teal]];
  return (
    <Card accent={a} eyebrow="models" title="Open-Model<br/>Lineup">
      <Stage>
        {fams.map(([name,col],i)=>{
          const x = 470 + i*215, y = 170 + (i===1?-18:18);
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <rect x="0" y="0" width="180" height="240" rx="16" fill={Cc.bgCard} stroke={mc(col,0.5)} strokeWidth="1.8" filter={i===1?'url(#glow)':undefined} />
              <rect x="0" y="0" width="180" height="6" rx="3" fill={col} />
              {/* layer bars = a model */}
              {[0,1,2,3,4].map(k=>(
                <rect key={k} x="24" y={48+k*30} width={140 - (k%2)*40} height="14" rx="7" fill={mc(col, 0.18 + k*0.06)} />
              ))}
              <circle cx="156" cy="34" r="5" fill={col} filter="url(#glow)" />
              <Lbl3 x={24} y={222} fill={Cc.dim} size={16} fam="Geist, sans-serif" weight="600">{name}</Lbl3>
            </g>
          );
        })}
        <Lbl3 x={865} y={140} anchor="middle" fill={Cc.mute} size={14}>independent · open · tool-centric</Lbl3>
      </Stage>
    </Card>
  );
}

/* ------------------------------------------------------------------ MDD */
function OGMdd() {
  const a = Cc.brass;
  const pillars = [['Logic', Cc.dim], ['Schemas', Cc.dim], ['Protocols', Cc.dim], ['Mission', a]];
  const baseY = 440, topY = 210, px = [510, 640, 770, 900];
  return (
    <Card accent={a} eyebrow="mission-driven development" title="The Fourth<br/>Foundation">
      <Stage>
        {/* blueprint grid */}
        <g stroke={mc(a,0.12)} strokeWidth="1">
          {Array.from({length:9}).map((_,i)=><line key={'v'+i} x1={440+i*80} y1={140} x2={440+i*80} y2={500} />)}
          {Array.from({length:5}).map((_,i)=><line key={'h'+i} x1={440} y1={140+i*90} x2={1080} y2={140+i*90} />)}
        </g>
        {/* beam */}
        <rect x={px[0]-26} y={topY-30} width={px[3]-px[0]+108} height="26" rx="5" fill={mc(a,0.16)} stroke={a} strokeWidth="2" />
        {/* base */}
        <rect x={px[0]-40} y={baseY} width={px[3]-px[0]+136} height="18" rx="4" fill={mc(a,0.16)} stroke={a} strokeWidth="2" />
        {pillars.map(([name,col],i)=>{
          const hl = i===3;
          return (
            <g key={i}>
              <rect x={px[i]} y={topY} width="56" height={baseY-topY} fill={hl?mc(a,0.18):mc(col,0.05)} stroke={hl?a:mc(col,0.4)} strokeWidth={hl?2.6:1.6} filter={hl?'url(#glow)':undefined} />
              <Lbl3 x={px[i]+28} y={topY-44} anchor="middle" fill={hl?a:Cc.dim} size={15} fam="Geist, sans-serif" weight={hl?'600':'500'}>{name}</Lbl3>
              {hl && <Lbl3 x={px[i]+28} y={topY+ (baseY-topY)/2} anchor="middle" fill={a} size={22} weight="700" fam="Geist, sans-serif">04</Lbl3>}
            </g>
          );
        })}
      </Stage>
    </Card>
  );
}

/* ---------------------------------------------------- COHERENCE RATCHET */
function OGRatchet() {
  const a = Cc.rust;
  const cx = 840, cy = 300, R = 130, teeth = 16;
  const pts = [];
  for (let i=0;i<teeth;i++){
    const a0 = (i/teeth)*Math.PI*2, a1 = ((i+0.5)/teeth)*Math.PI*2;
    pts.push(`${cx+Math.cos(a0)*R},${cy+Math.sin(a0)*R}`);
    pts.push(`${cx+Math.cos(a1)*(R-26)},${cy+Math.sin(a1)*(R-26)}`);
  }
  return (
    <Card accent={a} eyebrow="coherence ratchet" title="It Only Turns<br/>One Way">
      <Stage>
        <polygon points={pts.join(' ')} fill={mc(a,0.10)} stroke={a} strokeWidth="2.2" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r="34" fill={Cc.bgElev} stroke={a} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="8" fill={a} />
        {/* pawl arm */}
        <g stroke={Cc.cyan} strokeWidth="3" fill={mc(Cc.cyan,0.16)} strokeLinejoin="round">
          <path d={`M${cx+R+70} ${cy-150} L${cx+18} ${cy-R+8} L${cx+44} ${cy-R-20} Z`} />
          <circle cx={cx+R+70} cy={cy-150} r="9" fill={Cc.cyan} stroke="none" />
        </g>
        {/* one-way arrow */}
        <path d={`M${cx-40} ${cy+R+44} A${R+44} ${R+44} 0 0 1 ${cx+90} ${cy+R+10}`} fill="none" stroke={mc(a,0.6)} strokeWidth="2.4" />
        <polygon points={`${cx+82},${cy+R+2} ${cx+100},${cy+R+6} ${cx+88},${cy+R+22}`} fill={mc(a,0.8)} />
      </Stage>
    </Card>
  );
}

/* ------------------------------------------------------ COLLAPSE ANALYSIS */
function OGCollapse() {
  const a = Cc.violet;
  const cx = 850, cy = 300;
  return (
    <Card accent={a} eyebrow="coherence-collapse analysis" title="Collapse to<br/>Coherence">
      <Stage>
        {/* intersecting constraint manifolds collapsing to a point */}
        {[0,1,2,3].map(i=>{
          const rot = i*45;
          return <ellipse key={i} cx={cx} cy={cy} rx="220" ry="80" fill="none" stroke={mc(i%2?Cc.cyan:a, 0.35)} strokeWidth="1.6" transform={`rotate(${rot} ${cx} ${cy})`} />;
        })}
        {/* singularity boundary */}
        <circle cx={cx} cy={cy} r="60" fill="none" stroke={mc(a,0.4)} strokeWidth="1.4" strokeDasharray="3 7" />
        {/* collapse point */}
        <circle cx={cx} cy={cy} r="13" fill={a} filter="url(#softglow)" />
        <circle cx={cx} cy={cy} r="26" fill="none" stroke={a} strokeWidth="2" />
        {/* converging arrows */}
        {[0,90,180,270].map((ang,i)=>{
          const r=(ang*Math.PI)/180; const x=cx+Math.cos(r)*150, y=cy+Math.sin(r)*150;
          return <line key={i} x1={x} y1={y} x2={cx+Math.cos(r)*40} y2={cy+Math.sin(r)*40} stroke={mc(a,0.5)} strokeWidth="1.6" strokeDasharray="2 7" />;
        })}
        {/* Kish formula motif */}
        <g transform="translate(470,180)">
          <rect x="0" y="0" width="180" height="56" rx="10" fill={Cc.bgCard} stroke={Cc.border} strokeWidth="1.4" />
          <Lbl3 x={90} y={36} anchor="middle" fill={Cc.dim} size={20} fam="Geist, serif" weight="500">k_eff = (Σλ)² / Σλ²</Lbl3>
        </g>
      </Stage>
    </Card>
  );
}

/* ------------------------------------------------------- RESEARCH STATUS */
function OGResearch() {
  const a = Cc.cyan;
  const x0 = 470, y0 = 460, w = 600, h = 300;
  // decreasing dimensionality curve
  const pts = Array.from({length:9}).map((_,i)=>{
    const x = x0 + (i/8)*w;
    const y = y0 - h*(0.92*Math.exp(-i*0.42) + 0.06);
    return [x,y];
  });
  return (
    <Card accent={a} eyebrow="research status" title="Measured on<br/>Real Traces">
      <Stage>
        {/* axes */}
        <line x1={x0} y1={y0} x2={x0+w} y2={y0} stroke={Cc.border} strokeWidth="1.6" />
        <line x1={x0} y1={y0} x2={x0} y2={y0-h} stroke={Cc.border} strokeWidth="1.6" />
        {[0.25,0.5,0.75].map((k,i)=><line key={i} x1={x0} y1={y0-h*k} x2={x0+w} y2={y0-h*k} stroke={mc('#FFFFFF',0.05)} strokeWidth="1" />)}
        {/* scatter telemetry */}
        {Array.from({length:42}).map((_,i)=>{
          const px = x0 + Math.random()*w, py = y0 - Math.random()*h*0.7*Math.exp(-(px-x0)/w*1.6);
          return <circle key={i} cx={px} cy={py} r="3" fill={mc(a,0.4)} />;
        })}
        {/* curve */}
        <path d={'M'+pts.map(p=>p.join(' ')).join(' L ')} fill="none" stroke={a} strokeWidth="3" filter="url(#glow)" />
        {pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="5" fill={a} />)}
        <Lbl3 x={x0+w} y={y0+26} anchor="end" fill={Cc.mute} size={13}>layer depth →</Lbl3>
        <Lbl3 x={x0-14} y={y0-h} anchor="end" fill={Cc.mute} size={13}>k_eff</Lbl3>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGServices, OGModels, OGMdd, OGRatchet, OGCollapse, OGResearch });
