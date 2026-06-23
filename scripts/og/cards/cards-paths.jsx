// CIRIS OG cards — the four convergence path heroes (consumer-ai, super-
// alignment, misinformation, big-tech). Text-free background art adapted to
// landscape from the on-page path hero SVGs (src/app/components/graphics/svg/
// g02–g05), with the localized headline composited into the Card title zone.
// Art is weighted right/center; bottom-left is kept clear for the title.

const Cp = window.CIRIS, mp = window.mix;

/* ===================================== CONSUMER AI (g02 adapted) */
// A private AI you actually own: data circulates inside the phone, a sever
// glyph cuts the cloud, a shield holds the locality dividend.
function OGPathConsumer() {
  const a = Cp.cyan;
  const cx = 880, cy = 300; // hero center, right-weighted
  return (
    <Card accent={a} eyebrow="paths / consumer ai" title="A private AI you<br/>actually own.">
      <Stage>
        <defs>
          <radialGradient id="pc-local" cx="50%" cy="52%" r="55%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="45%" stopColor={a} stopOpacity="0.16" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* orbit ring */}
        <circle cx={cx} cy={cy} r="156" stroke={a} strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 9" />
        {/* severed cloud (top) */}
        <g stroke={Cp.mute} strokeOpacity="0.5" transform={`translate(${cx-300},${cy-228})`}>
          <path d="M256,84 q-14,-2 -14,12 q-16,0 -16,15 q0,14 16,14 h62 q16,0 16,-15 q0,-14 -16,-13 q-3,-16 -22,-14 q-12,1 -26,15 Z" strokeWidth="1.2" />
          <path d="M300,128 V150" strokeWidth="1.2" strokeDasharray="3 5" />
          <path d="M293,141 l14,12 M307,141 l-14,12" stroke={Cp.rose} strokeOpacity="0.8" strokeWidth="1.4" />
        </g>
        {/* shield */}
        <path transform={`translate(${cx-300},${cy-312})`} d="M300,150 L388,186 V330 Q388,442 300,498 Q212,442 212,330 V186 Z"
              stroke={a} strokeWidth="1.4" fill={a} fillOpacity="0.04" />
        {/* phone */}
        <g transform={`translate(${cx-300},${cy-312})`}>
          <rect x="246" y="178" width="108" height="268" rx="20" stroke={a} strokeOpacity="0.85" strokeWidth="1.8" />
          <rect x="246" y="178" width="108" height="268" rx="20" fill="url(#pc-local)" />
          <line x1="284" y1="192" x2="316" y2="192" stroke={a} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* data orbiting inside, never escaping */}
        <g filter="url(#glow)">
          {[0,60,120,180,240,300].map((deg,i)=>{
            const r = deg*Math.PI/180, rad = 120;
            const x = cx + Math.cos(r)*rad*0.46, y = cy + Math.sin(r)*rad;
            return <g key={i}><circle cx={x} cy={y} r="6" fill={a} fillOpacity="0.22" /><circle cx={x} cy={y} r="2.4" fill="#bfefff" /></g>;
          })}
        </g>
        <circle cx={cx} cy={cy} r="5" fill="#e8fbff" filter="url(#glow)" />
      </Stage>
    </Card>
  );
}

/* ================================ SUPERALIGNMENT (g03 adapted) */
// Alignment the network enforces: the agent sits inside an accountable
// federation; every action emits a signed artifact onto the mesh.
function OGPathSuper() {
  const a = Cp.violet;
  const cx = 870, cy = 300, R = 205; // hex radius, right-weighted
  // six hex vertices (pointy-ish), scaled from g03's 0..600 box
  const verts = [
    [cx, cy - R],
    [cx + R*0.866, cy - R*0.5],
    [cx + R*0.866, cy + R*0.5],
    [cx, cy + R],
    [cx - R*0.866, cy + R*0.5],
    [cx - R*0.866, cy - R*0.5],
  ];
  return (
    <Card accent={a} eyebrow="paths / superalignment" title="Alignment the<br/>network enforces.">
      <Stage>
        <defs>
          <radialGradient id="ps-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.5" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* hex frame */}
        <path d={'M'+verts.map(v=>v.join(',')).join(' L ')+' Z'} stroke={a} strokeOpacity="0.22" strokeWidth="1.1" />
        {/* spokes to center */}
        <g stroke={a} strokeOpacity="0.28" strokeWidth="1.1">
          {verts.map((v,i)=><line key={i} x1={cx} y1={cy} x2={v[0]} y2={v[1]} />)}
        </g>
        {/* federation nodes */}
        <g stroke={a} strokeWidth="1.6">
          {verts.map((v,i)=>(
            <g key={i} transform={`translate(${v[0]},${v[1]})`}>
              <path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill={Cp.bg} />
              <circle r="3" fill={a} stroke="none" />
            </g>
          ))}
        </g>
        {/* signed tokens travelling spokes */}
        <g fill={a} stroke="#e9e4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          {verts.map((v,i)=>{
            const t = [0.6,0.45,0.72,0.38,0.55,0.66][i];
            const x = cx + (v[0]-cx)*t, y = cy + (v[1]-cy)*t;
            return (
              <g key={i} transform={`translate(${x},${y})`}>
                <path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none" />
                <path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none" />
              </g>
            );
          })}
        </g>
        {/* central accountable agent */}
        <circle cx={cx} cy={cy} r="60" fill="url(#ps-core)" />
        <g filter="url(#glow)">
          <rect x={cx-22} y={cy-22} width="44" height="44" rx="11" transform={`rotate(45 ${cx} ${cy})`} stroke={a} strokeWidth="2" fill={Cp.bg} />
          <circle cx={cx} cy={cy} r="8" fill={a} />
          <circle cx={cx} cy={cy} r="3.2" fill="#e9e4ff" />
        </g>
      </Stage>
    </Card>
  );
}

/* ================================= MISINFORMATION (g04 adapted) */
// A web with receipts: a claim's provenance unfurls — who signed it, what it
// rests on, who agreed / corrected / replaced it.
function OGPathMisinfo() {
  const a = Cp.rose;
  // horizontal provenance tree, root left, leaves right
  const X = 470, midY = 300;
  const root  = [X, midY];
  const claim = [X+140, midY];
  const supA  = [X+330, midY-110];
  const supB  = [X+330, midY+110];
  const leaves = [
    [X+560, midY-150, Cp.ok],   // agreed (check)
    [X+560, midY-50,  Cp.brass],// corrected (edit)
    [X+560, midY+90,  a],       // replaced (redo)
    [X+560, midY+180, Cp.ok],
  ];
  return (
    <Card accent={a} eyebrow="paths / misinformation" title="A web with<br/>receipts.">
      <Stage>
        {/* edges */}
        <g stroke={a} strokeWidth="1.4" fill="none">
          <path d={`M${root[0]},${root[1]} L${claim[0]},${claim[1]}`} />
          <path d={`M${claim[0]},${claim[1]} L${supA[0]},${supA[1]}`} />
          <path d={`M${claim[0]},${claim[1]} L${supB[0]},${supB[1]}`} />
        </g>
        <g fill="none">
          <path d={`M${supA[0]},${supA[1]} L${leaves[0][0]},${leaves[0][1]}`} stroke={Cp.ok} strokeWidth="1.4" />
          <path d={`M${supA[0]},${supA[1]} L${leaves[1][0]},${leaves[1][1]}`} stroke={Cp.brass} strokeWidth="1.4" strokeDasharray="4 4" />
          <path d={`M${supB[0]},${supB[1]} L${leaves[2][0]},${leaves[2][1]}`} stroke={a} strokeWidth="1.4" />
          <path d={`M${supB[0]},${supB[1]} L${leaves[3][0]},${leaves[3][1]}`} stroke={Cp.ok} strokeWidth="1.4" />
        </g>
        {/* root signer node (hexagon, neutral) */}
        <g transform={`translate(${root[0]},${root[1]})`}>
          <path d="M0,-11 L9.5,-5.5 L9.5,5.5 L0,11 L-9.5,5.5 L-9.5,-5.5 Z" fill={Cp.bg} stroke="#c9cdd6" strokeWidth="1.6" />
          <circle r="3.4" fill="#c9cdd6" />
        </g>
        {/* the claim (rose circle with lines = a statement) */}
        <g transform={`translate(${claim[0]},${claim[1]})`} filter="url(#glow)">
          <circle r="18" fill={mp(a,0.16)} stroke={a} strokeWidth="1.8" />
          <line x1="-7" y1="-4" x2="7" y2="-4" stroke="#ffd2e1" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="-7" y1="1" x2="7" y2="1" stroke="#ffd2e1" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="-7" y1="6" x2="2" y2="6" stroke="#ffd2e1" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* support diamonds (what it rests on) */}
        {[supA, supB].map((p,i)=>(
          <g key={i} transform={`translate(${p[0]},${p[1]})`}>
            <path d="M0,-11 L11,0 L0,11 L-11,0 Z" fill={Cp.bg} stroke={Cp.dim} strokeWidth="1.6" />
            <circle r="2.6" fill={Cp.dim} />
          </g>
        ))}
        {/* verdict leaves: agreed / corrected / replaced */}
        <g transform={`translate(${leaves[0][0]},${leaves[0][1]})`}>
          <path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill={mp(Cp.ok,0.12)} stroke={Cp.ok} strokeWidth="1.7" />
          <path d="M-4,0 L-1,3.4 L5,-4" stroke={Cp.ok} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform={`translate(${leaves[1][0]},${leaves[1][1]})`}>
          <path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill={mp(Cp.brass,0.12)} stroke={Cp.brass} strokeWidth="1.7" />
          <line x1="-5" y1="2.5" x2="5" y2="2.5" stroke={Cp.brass} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-3.4" y1="-3" x2="4.4" y2="-3" stroke={Cp.brass} strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <g transform={`translate(${leaves[2][0]},${leaves[2][1]})`}>
          <path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill={mp(a,0.12)} stroke={a} strokeWidth="1.7" />
          <path d="M-4.5,-1.5 a4.5,4.5 0 1 1 1.4,3.4" stroke={a} strokeWidth="1.7" fill="none" strokeLinecap="round" />
          <path d="M-4.5,-4.6 L-4.5,-1 L-1.2,-1.4" stroke={a} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform={`translate(${leaves[3][0]},${leaves[3][1]})`}>
          <path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill={mp(Cp.ok,0.12)} stroke={Cp.ok} strokeWidth="1.7" />
          <path d="M-4,0 L-1,3.4 L5,-4" stroke={Cp.ok} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Stage>
    </Card>
  );
}

/* ====================================== BIG TECH (g05 adapted) */
// An internet with no datacenters: the centralized shell dissolves; its
// fragments redistribute out across a peer mesh.
function OGPathBigTech() {
  const a = Cp.teal;
  const cx = 870, cy = 300, R = 215; // mesh radius, right-weighted
  const ring = [
    [0,-1],[0.5,-0.866],[0.866,-0.5],[1,0],[0.866,0.5],[0.5,0.866],
    [0,1],[-0.5,0.866],[-0.866,0.5],[-1,0],[-0.866,-0.5],[-0.5,-0.866],
  ].map(([dx,dy])=>[cx+dx*R, cy+dy*R]);
  // fragment landing spots out on the mesh
  const frags = [
    [cx+30,cy-135],[cx+105,cy-107],[cx+152,cy-30],[cx+170,cy+25],[cx+130,cy+130],
    [cx+55,cy+170],[cx+30,cy+185],[cx-105,cy+157],[cx-160,cy+80],
    [cx-150,cy-75],[cx-130,cy-160],[cx-95,cy-185],
  ];
  return (
    <Card accent={a} eyebrow="paths / big tech" title="An internet with<br/>no datacenters.">
      <Stage>
        {/* mesh links */}
        <g stroke={a} strokeWidth="1.2" fill="none">
          <path d={'M'+ring.map(p=>p.join(',')).join(' L ')+' Z'} />
          <path d={`M${ring[0][0]},${ring[0][1]} L${ring[4][0]},${ring[4][1]} L${ring[8][0]},${ring[8][1]} Z`} />
          <path d={`M${ring[2][0]},${ring[2][1]} L${ring[6][0]},${ring[6][1]} L${ring[10][0]},${ring[10][1]} Z`} />
        </g>
        {/* dissolving data-center shell (center) */}
        <g stroke={a} strokeOpacity="0.55" strokeWidth="1.4">
          <rect x={cx-68} y={cy-104} width="136" height="208" rx="8" />
          <line x1={cx-68} y1={cy-68} x2={cx+68} y2={cy-68} />
        </g>
        {/* fragments redistributed onto the mesh */}
        <g stroke={a} strokeWidth="1.5">
          {frags.map((p,i)=>(
            <g key={i} transform={`translate(${p[0]},${p[1]})`}>
              <rect x="-17" y="-20" width="34" height="40" rx="3" fill={Cp.bg} />
              <circle r="2.4" fill="#5fd0d4" />
            </g>
          ))}
        </g>
      </Stage>
    </Card>
  );
}

Object.assign(window, { OGPathConsumer, OGPathSuper, OGPathMisinfo, OGPathBigTech });
