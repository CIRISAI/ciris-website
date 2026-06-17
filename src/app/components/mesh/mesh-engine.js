// mesh-engine.js — canvas engine for "The mesh, in motion"
// A true peer mesh on a rotating globe: ~900 nodes, each linked to its nearest
// neighbours (no hierarchy, no center). Shared by the master player + hero loop.

export const C = {
  bg: '#0D1117', bgElev: '#151B24', bgCard: '#1A222C',
  text: '#F4F5F7', dim: '#9AA3AF', mute: '#6B7280',
  comm: '#419CA0', llm: '#22C0E8', memory: '#7A6FD6',
  tool: '#C96A38', wise: '#B08A3E', runtime: '#E14B7F',
  ok: '#4ADE80', warn: '#FBBF24', err: '#F87171', info: '#60A5FA',
};

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const easeInOut = t => { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
const easeOut = t => { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); };
const TAU = Math.PI * 2;
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; }

export const SCENES = [
  { id: 0, dur: 5, label: 'THE STAR WE\u2019RE REPLACING' },
  { id: 1, dur: 8, label: 'ONE COPY IN' },
  { id: 2, dur: 12, label: 'THE FABRIC GROWS' },
  { id: 3, dur: 8, label: 'PRESENCE AT SCALE' },
  { id: 4, dur: 10, label: 'HOLOGRAPHIC DELIVERY' },
  { id: 5, dur: 12, label: 'IT GETS HIT \u2014 AND HEALS' },
  { id: 6, dur: 8, label: 'THE SEAL' },
  { id: 7, dur: 4, label: 'THE ROOM CARRIES IT' },
];
let _a = 0; for (const s of SCENES) { s.start = _a; _a += s.dur; }
export const TOTAL = _a;
export const LOOP_START = SCENES[1].start;

export function createEngine(canvas, opts) {
  opts = opts || {};
  const ctx = canvas.getContext('2d');
  const N = opts.nodes || 10000;        // node count on the globe
  const K = opts.neighbors || 3;        // nearest-neighbour links per node
  const TILT = -0.42;                    // globe tilt (radians)
  let W = 0, H = 0, DPR = 1;
  let vp = { x: 0, y: 0, w: 0, h: 0 };   // 16:9 viewport rect inside canvas
  let globe = null, holders = [], glyphs = [];

  // ---- build the mesh: fibonacci sphere + nearest-neighbour links ----
  function buildGlobe() {
    const rnd = mulberry32(7);
    const pts = [];
    // --- population centers (lat, lon, weight, angular spread) -> continents ---
    const CEN = [
      // East / South / SE Asia (densest, but spread into landmasses)
      { lat: 35, lon: 115, w: 9, s: 0.42 },   // East China
      { lat: 30, lon: 103, w: 5, s: 0.40 },   // Inland China
      { lat: 45, lon: 125, w: 3, s: 0.40 },   // NE China / Manchuria
      { lat: 26, lon: 80, w: 8, s: 0.40 },    // North India
      { lat: 16, lon: 78, w: 5, s: 0.36 },    // South India
      { lat: 16, lon: 102, w: 4, s: 0.34 },   // Indochina
      { lat: -5, lon: 110, w: 4, s: 0.30 },   // Indonesia
      { lat: 37, lon: 138, w: 3, s: 0.18 },   // Japan / Korea
      // Europe
      { lat: 50, lon: 9, w: 6, s: 0.34 },     // Europe West
      { lat: 52, lon: 26, w: 4, s: 0.32 },    // Europe East
      { lat: 56, lon: 44, w: 3, s: 0.55 },    // Russia (sparse, wide)
      // Middle East / N Africa
      { lat: 32, lon: 42, w: 4, s: 0.34 },    // Middle East
      { lat: 27, lon: 30, w: 3, s: 0.34 },    // North Africa / Nile
      // Sub-Saharan Africa
      { lat: 9, lon: 7, w: 5, s: 0.38 },      // West Africa
      { lat: 0, lon: 36, w: 4, s: 0.40 },     // East Africa
      { lat: -22, lon: 26, w: 2, s: 0.36 },   // Southern Africa
      // North America
      { lat: 40, lon: -80, w: 5, s: 0.36 },   // US East
      { lat: 36, lon: -119, w: 3, s: 0.30 },  // US West
      { lat: 41, lon: -96, w: 3, s: 0.42 },   // US Central
      { lat: 19, lon: -99, w: 3, s: 0.28 },   // Mexico / C.America
      { lat: 56, lon: -106, w: 1.5, s: 0.55 },// Canada (sparse, wide)
      // South America
      { lat: -16, lon: -50, w: 4, s: 0.42 },  // Brazil
      { lat: -10, lon: -76, w: 2, s: 0.42 },  // Andes / West
      { lat: -35, lon: -62, w: 2, s: 0.34 },  // Southern Cone
      // Oceania
      { lat: -28, lon: 140, w: 2, s: 0.40 },  // Australia
    ];
    const D2R = Math.PI / 180;
    const cvec = c => {
      const phi = c.lat * D2R, lam = c.lon * D2R;
      return { x: Math.cos(phi) * Math.cos(lam), y: Math.sin(phi), z: Math.cos(phi) * Math.sin(lam) };
    };
    for (const c of CEN) { const v = cvec(c); c.v = v; }
    const wsum = CEN.reduce((a, c) => a + c.w, 0);
    const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(TAU * rnd());
    const norm = v => { const m = Math.hypot(v.x, v.y, v.z) || 1; return { x: v.x / m, y: v.y / m, z: v.z / m }; };
    // sample a point at geodesic angle th from center c, random azimuth
    function nearCenter(c) {
      const cc = c.v;
      // tangent basis
      let u = { x: -cc.z, y: 0, z: cc.x };
      if (Math.hypot(u.x, u.y, u.z) < 1e-4) u = { x: 1, y: 0, z: 0 };
      u = norm(u);
      const vv = { x: cc.y * u.z - cc.z * u.y, y: cc.z * u.x - cc.x * u.z, z: cc.x * u.y - cc.y * u.x };
      const th = Math.min(1.15, Math.abs(gauss()) * c.s);
      const psi = rnd() * TAU;
      const ct = Math.cos(th), stt = Math.sin(th);
      return norm({
        x: cc.x * ct + (u.x * Math.cos(psi) + vv.x * Math.sin(psi)) * stt,
        y: cc.y * ct + (u.y * Math.cos(psi) + vv.y * Math.sin(psi)) * stt,
        z: cc.z * ct + (u.z * Math.cos(psi) + vv.z * Math.sin(psi)) * stt,
      });
    }
    // --- continent outlines (simplified coastlines, lon/lat). Also the LAND MASK. ---
    const CONT = [
      // North America
      [[-166,65],[-156,71],[-128,70],[-100,68],[-82,73],[-58,52],[-66,45],[-70,42],[-75,35],[-81,25],[-97,26],[-106,30],[-117,32],[-124,40],[-138,58],[-166,65]],
      // South America
      [[-81,8],[-77,1],[-80,-5],[-71,-18],[-70,-30],[-73,-45],[-67,-55],[-62,-40],[-58,-34],[-48,-25],[-35,-8],[-44,-2],[-52,5],[-62,10],[-78,9],[-81,8]],
      // Africa
      [[-17,15],[-10,5],[8,4],[9,-1],[13,-12],[12,-18],[18,-35],[25,-34],[33,-28],[40,-15],[51,-1],[43,11],[44,12],[35,22],[34,31],[10,37],[0,36],[-10,30],[-17,21],[-17,15]],
      // Europe
      [[-10,36],[-9,44],[-1,49],[2,51],[-4,58],[6,62],[12,67],[28,71],[40,66],[42,55],[33,52],[30,46],[24,40],[14,40],[18,45],[12,45],[3,43],[-2,36],[-10,36]],
      // Asia
      [[28,38],[33,31],[35,37],[45,40],[48,30],[57,25],[67,25],[72,20],[80,8],[90,22],[95,16],[100,8],[105,10],[110,21],[121,31],[122,40],[135,48],[143,59],[130,73],[105,78],[100,73],[78,68],[60,55],[55,52],[50,45],[40,46],[33,42],[28,38]],
      // Australia
      [[114,-22],[122,-18],[130,-12],[137,-16],[142,-11],[146,-19],[150,-24],[153,-28],[150,-38],[143,-39],[135,-35],[129,-32],[122,-34],[115,-34],[114,-28],[114,-22]],
      // Greenland
      [[-45,60],[-30,60],[-20,70],[-22,78],[-40,83],[-58,80],[-55,70],[-45,60]],
    ];
    const lonlat = (lon, lat) => { const a = lat * D2R, b = lon * D2R; const cl = Math.cos(a); return { x: cl * Math.cos(b), y: Math.sin(a), z: cl * Math.sin(b) }; };
    const vec2ll = v => ({ lon: Math.atan2(v.z, v.x) / D2R, lat: Math.asin(Math.max(-1, Math.min(1, v.y))) / D2R });
    function pip(lon, lat, poly) {
      let inside = false;
      for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
        const xi = poly[a][0], yi = poly[a][1], xj = poly[b][0], yj = poly[b][1];
        if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
      }
      return inside;
    }
    const onLand = (lon, lat) => { for (const p of CONT) if (pip(lon, lat, p)) return true; return false; };
    // sample nodes weighted to population centers, REJECTED unless they land on a continent
    for (let i = 0; i < N; i++) {
      let v = null;
      for (let att = 0; att < 60; att++) {
        let r = rnd() * wsum, ci = 0; for (; ci < CEN.length; ci++) { r -= CEN[ci].w; if (r <= 0) break; }
        const cand = nearCenter(CEN[Math.min(ci, CEN.length - 1)]);
        const ll = vec2ll(cand);
        if (onLand(ll.lon, ll.lat)) { v = cand; break; }
      }
      if (!v) { const p = CONT[Math.floor(rnd() * CONT.length)]; const x = p[Math.floor(rnd() * (p.length - 1))]; v = lonlat(x[0], x[1]); }
      const ll2 = vec2ll(v);
      pts.push({ i, x: v.x, y: v.y, z: v.z, lon: ll2.lon, lat: ll2.lat, phase: rnd() * TAU, tw: rnd(), core: false });
    }
    // nearest neighbours via a lon/lat grid (avoids O(N²) at high node counts)
    const edgeSet = new Set();
    const edges = [];
    const adj = pts.map(() => []);
    function addEdge(i, j) {
      const key = i < j ? i * N + j : j * N + i;
      if (edgeSet.has(key)) return;
      edgeSet.add(key); edges.push({ a: i, b: j });
      adj[i].push(j); adj[j].push(i);
    }
    const BIN = 10, nLon = Math.ceil(360 / BIN), nLat = Math.ceil(180 / BIN);
    const bins = new Map();
    const lonBin = lon => Math.min(nLon - 1, Math.max(0, Math.floor((lon + 180) / BIN)));
    const latBin = lat => Math.min(nLat - 1, Math.max(0, Math.floor((lat + 90) / BIN)));
    for (let i = 0; i < N; i++) { const k = latBin(pts[i].lat) * nLon + lonBin(pts[i].lon); let a = bins.get(k); if (!a) bins.set(k, a = []); a.push(i); }
    for (let i = 0; i < N; i++) {
      const a = pts[i], bl = lonBin(a.lon), bt = latBin(a.lat);
      const best = []; let dens = 0;
      for (let dt = -1; dt <= 1; dt++) {
        const tt = bt + dt; if (tt < 0 || tt >= nLat) continue;
        for (let dl = -1; dl <= 1; dl++) {
          const ll = (bl + dl + nLon) % nLon; // longitude wraps
          const arr = bins.get(tt * nLon + ll); if (!arr) continue;
          for (const j of arr) {
            if (j === i) continue;
            const b = pts[j];
            const d = a.x * b.x + a.y * b.y + a.z * b.z;
            if (d > 0.985) dens++;             // local crowding ~ donated-uplink potential
            if (best.length < K) { best.push({ j, d }); best.sort((p, q) => p.d - q.d); }
            else if (d > best[0].d) { best[0] = { j, d }; best.sort((p, q) => p.d - q.d); }
          }
        }
      }
      a.dens = dens;
      for (const { j } of best) addEdge(i, j);
    }
    // --- connectivity repair: union-find, then stitch components w/ backbone links ---
    const uf = [...Array(N).keys()];
    const find = x => { while (uf[x] !== x) { uf[x] = uf[uf[x]]; x = uf[x]; } return x; };
    const uni = (a, b) => { uf[find(a)] = find(b); };
    for (const e of edges) uni(e.a, e.b);
    const comps = {};
    for (let i = 0; i < N; i++) { const r = find(i); (comps[r] = comps[r] || []).push(i); }
    const roots = Object.keys(comps).map(Number);
    if (roots.length > 1) {
      // biggest component is the backbone
      roots.sort((a, b) => comps[b].length - comps[a].length);
      const main = comps[roots[0]];
      for (let ri = 1; ri < roots.length; ri++) {
        const grp = comps[roots[ri]];
        // nearest pair grp<->main (sampled for speed)
        let bi = grp[0], bj = main[0], bd = -2;
        for (const gi of grp) {
          const a = pts[gi];
          for (let s = 0; s < main.length; s += Math.max(1, (main.length / 60) | 0)) {
            const b = pts[main[s]];
            const d = a.x * b.x + a.y * b.y + a.z * b.z;
            if (d > bd) { bd = d; bi = gi; bj = main[s]; }
          }
        }
        addEdge(bi, bj); uni(bi, bj);
        for (const gi of grp) main.push(gi);
      }
    }
    // reveal order = spreading front from a seed node in the front-facing hemisphere
    const frontVec = lonlat(-32, 12); // Atlantic-facing: Americas + Africa/Europe
    let seed = 0, sbest = -2;
    for (let i = 0; i < N; i++) { const d = pts[i].x * frontVec.x + pts[i].y * frontVec.y + pts[i].z * frontVec.z; if (d > sbest) { sbest = d; seed = i; } }
    const order = new Array(N).fill(Infinity);
    order[seed] = 0;
    let frontier = [seed], step = 0;
    const seen = new Set([seed]);
    while (frontier.length) {
      step++;
      const next = [];
      for (const u of frontier) for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); order[v] = step + rnd() * 0.9; next.push(v); }
      frontier = next;
    }
    const maxOrder = Math.max(...order.filter(o => isFinite(o)), 1);
    for (let i = 0; i < N; i++) pts[i].rev = (isFinite(order[i]) ? order[i] : maxOrder) / maxOrder;
    pts[seed].core = true;

    // --- node ROLES (the brief: not every node forwards) ---
    // relay = "fat interior" peer with donated uplink (dense areas); the minority
    // that actually forwards.  holder = stores one fountain symbol (~5%).
    // leaf = a phone: receives + publishes its own presence dot, forwards nothing.
    const byDens = [...pts].sort((a, b) => b.dens - a.dens);
    const relayCount = Math.floor(N * 0.08);
    for (let i = 0; i < N; i++) pts[i].role = 'leaf';
    for (let i = 0; i < relayCount; i++) byDens[i].role = 'relay';
    // holders: ~7%, spread across the non-relay nodes
    const hr = mulberry32(53);
    let hc = 0; const holderTarget = Math.floor(N * 0.05);
    for (let i = 0; i < N && hc < holderTarget; i++) {
      const p = pts[i];
      if (p.role === 'leaf' && hr() < 0.12) { p.role = 'holder'; hc++; }
    }
    pts[seed].role = 'core';
    // role weight drives pipe thickness (donated uplink)
    const RW = { core: 1.1, relay: 1, holder: 0.55, leaf: 0.3 };
    for (const p of pts) p.rw = RW[p.role];

    // failure cap axis = West Africa: dense, near-equatorial (frames centered), in view
    const capAxis = norm(CEN[13].v);
    const CAP_COS = 0.80; // ~37° cap
    for (const p of pts) p.capDot = p.x * capAxis.x + p.y * capAxis.y + p.z * capAxis.z;
    // centroid of the actual dead LAND nodes — what we frame the heal on
    let cc = { x: 0, y: 0, z: 0 }, ccn = 0;
    for (const p of pts) if (p.capDot > CAP_COS) { cc.x += p.x; cc.y += p.y; cc.z += p.z; ccn++; }
    const capCentroid = ccn ? norm(cc) : capAxis;
    // base spin: keep the Atlantic hemisphere (Americas + Africa/Europe) forward —
    // no Australia, no empty Pacific.
    const landAxis = lonlat(-32, 14);
    const baseSpin = Math.atan2(-landAxis.x, landAxis.z);

    // flow-pulse edges — only emitted BY relays/core (leaves never forward)
    const pr = mulberry32(99);
    const relayEdges = edges.filter(e => pts[e.a].rw >= 0.55 || pts[e.b].rw >= 0.55);
    const pulses = [];
    for (let k = 0; k < 150; k++) {
      const e = relayEdges[Math.floor(pr() * relayEdges.length)];
      if (!e) continue;
      // direction: from the higher-uplink end outward
      const fromA = pts[e.a].rw >= pts[e.b].rw;
      pulses.push({ a: fromA ? e.a : e.b, b: fromA ? e.b : e.a, off: pr(), spd: 0.5 + pr() * 0.7 });
    }
    globe = { pts, edges, adj, seed, capAxis, capCentroid, baseSpin, capCos: CAP_COS, pulses };
    globe.backboneEdges = edges.filter(e => pts[e.a].rw >= 0.5 || pts[e.b].rw >= 0.5);
    // a relay near the front to focus-pull in scene 3
    globe.focusNode = byDens[Math.floor(relayCount * 0.25)].i;

    // --- continent outlines reuse the hoisted CONT / lonlat (also the land mask) ---
    globe.outlines = CONT.map(loop => loop.map(([lon, lat]) => lonlat(lon, lat)));
    // a faint graticule: equator + two tropics, sampled as rings
    const ring = lat => { const out = []; for (let k = 0; k <= 48; k++) { const lon = -180 + k * 360 / 48; out.push(lonlat(lon, lat)); } return out; };
    globe.graticule = [ring(0), ring(30), ring(-30), ring(60), ring(-60)];

    // fountain holders (legacy, scene 4)
    holders = [];
    for (let i = 0; i < 30; i++) holders.push({ a: (i / 30) * TAU - Math.PI / 2, idx: i });
    glyphs = [];
    const gr = mulberry32(31);
    for (let i = 0; i < 26; i++) glyphs.push({ idx: i, repair: i >= 20, a0: gr() * TAU });
  }

  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    const r = canvas.getBoundingClientRect();
    W = Math.max(2, Math.round(r.width)); H = Math.max(2, Math.round(r.height));
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const target = 16 / 9, ar = W / H;
    if (ar > target) { vp.h = H; vp.w = H * target; } else { vp.w = W; vp.h = W / target; }
    vp.x = (W - vp.w) / 2; vp.y = (H - vp.h) / 2;
    if (!globe) buildGlobe();
  }

  // ---- camera / projection ----
  // cam: scale (zoom), center focal in viewport-normalized coords
  let cam = { cx: 0.5, cy: 0.5, zoom: 1 };
  let _orderIdx = null, _proj = null; // reused per-frame buffers (avoid GC churn at 10k)
  const SU = () => (vp.h / 900);
  function project(p, ang) {
    // spin about Y, then tilt about X
    const ca = Math.cos(ang), sa = Math.sin(ang);
    let x = p.x * ca + p.z * sa;
    let z1 = -p.x * sa + p.z * ca;
    const y = p.y;
    const ct = Math.cos(TILT), st = Math.sin(TILT);
    const y2 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    const R = vp.h * 0.36 * cam.zoom;
    const cx = vp.x + cam.cx * vp.w, cy = vp.y + cam.cy * vp.h;
    return { x: cx + x * R, y: cy - y2 * R, z: z2, depth: (z2 + 1) / 2 }; // depth 0(back)..1(front)
  }

  // ---- primitives ----
  function roundRect(x, y, w, h, r) {
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function glow(x, y, r, col, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }
  function bg() {
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(vp.x + vp.w * 0.5, vp.y + vp.h * 0.46, vp.h * 0.06, vp.x + vp.w * 0.5, vp.y + vp.h * 0.5, vp.h);
    g.addColorStop(0, 'rgba(28,42,56,0.5)'); g.addColorStop(1, 'rgba(13,17,23,0)');
    ctx.fillStyle = g; ctx.fillRect(vp.x, vp.y, vp.w, vp.h);
    ctx.fillStyle = C.bg;
    if (vp.y > 0) { ctx.fillRect(0, 0, W, vp.y); ctx.fillRect(0, vp.y + vp.h, W, H); }
    if (vp.x > 0) { ctx.fillRect(0, 0, vp.x, H); ctx.fillRect(vp.x + vp.w, 0, vp.x, H); }
  }

  // ---- the globe renderer ----
  // o: { ang, t, grow(0..1 fraction revealed), flow(0..1), presence(bool),
  //     dead(Set<int>|null), heal(0..1), focus(int|null), focusK, dimAll(bool) }
  function inCap(p) {
    return p.capDot > globe.capCos;
  }
  function relitParam(np) {
    return (np.capDot - globe.capCos) / (1 - globe.capCos); // 0 at border, 1 at center
  }
  function drawGlobe(o) {
    o = o || {};
    const ang = o.ang || 0, S = SU();
    const grow = o.grow == null ? 1 : o.grow;
    const dim = o.dimAll ? 0.4 : 1;
    const dead = o.dead || null, heal = o.heal || 0, healFront = o.healFront || 0;
    const pts = globe.pts;
    // project all once (inlined + reused buffer — no per-node allocation at 10k)
    if (!_proj || _proj.length !== N) { _proj = new Array(N); for (let i = 0; i < N; i++) _proj[i] = { x: 0, y: 0, z: 0, depth: 0, rev: false, dead: false }; }
    const proj = _proj;
    const breathe = 1 + Math.sin((o.t || 0) * 0.6) * 0.012;
    const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(TILT), st = Math.sin(TILT);
    const R = vp.h * 0.36 * cam.zoom, ccx = vp.x + cam.cx * vp.w, ccy = vp.y + cam.cy * vp.h;
    for (let i = 0; i < N; i++) {
      const p = pts[i];
      const px = p.x * breathe, py = p.y * breathe, pz = p.z * breathe;
      const x = px * ca + pz * sa, z1 = -px * sa + pz * ca;
      const y2 = py * ct - z1 * st, z2 = py * st + z1 * ct;
      const o2 = proj[i];
      o2.x = ccx + x * R; o2.y = ccy - y2 * R; o2.z = z2; o2.depth = (z2 + 1) / 2;
      o2.rev = p.rev <= grow; o2.dead = dead ? dead.has(i) : false;
    }

    // faint sphere haze
    if (grow > 0.4) {
      const cx = vp.x + cam.cx * vp.w, cy = vp.y + cam.cy * vp.h, R = vp.h * 0.36 * cam.zoom;
      glow(cx, cy, R * 1.15, C.comm, 0.06 * dim);
    }

    // graticule (faint, under the mesh — gives the sphere its shape)
    if (grow > 0.5 && globe.graticule) {
      const og = clamp((grow - 0.5) / 0.4, 0, 1) * dim;
      ctx.lineWidth = 0.6 * S;
      for (const r of globe.graticule) {
        ctx.beginPath(); let pen = false;
        for (let k = 0; k < r.length; k++) {
          const q = project(r[k], ang);
          if (q.depth < 0.52) { pen = false; continue; }
          if (!pen) { ctx.moveTo(q.x, q.y); pen = true; } else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = hexA(C.comm, 0.07 * og); ctx.stroke();
      }
    }

    // edges — only the forwarding backbone (precomputed). Hiding the dense
    // leaf-to-leaf web removes thin-line clutter and is far cheaper at 10k.
    ctx.lineCap = 'round';
    const edgeList = dead ? globe.edges : globe.backboneEdges;
    for (const e of edgeList) {
      const a = proj[e.a], b = proj[e.b];
      if (!a.rev || !b.rev) continue;
      const onCap = a.dead || b.dead;
      if (dead && !onCap && pts[e.a].rw < 0.5 && pts[e.b].rw < 0.5) continue; // leaf-leaf
      const ev = (a.depth + b.depth) / 2;
      if (ev < 0.42 && !onCap) continue; // skip deep-back edges (barely visible)
      const aLive = !a.dead || healFront > relitParam(pts[e.a]);
      const bLive = !b.dead || healFront > relitParam(pts[e.b]);
      if (!aLive || !bLive) {
        // severed edge — red, fading as heal rises
        const k = 1 - heal;
        if (k <= 0.02) continue;
        ctx.strokeStyle = hexA(C.err, 0.5 * ev * k);
        ctx.lineWidth = 1.0 * S;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        continue;
      }
      const front = ev > 0.5;
      // freshly-healed edges glow cyan briefly
      const healed = (a.dead || b.dead);
      const col = healed ? C.llm : C.comm;
      const ew = Math.max(pts[e.a].rw, pts[e.b].rw); // pipe thickness = donated uplink
      ctx.strokeStyle = hexA(col, (front ? lerp(0.16, 0.5, ew) : lerp(0.06, 0.16, ew)) * ev * dim);
      ctx.lineWidth = (front ? lerp(0.5, 1.9, ew) : lerp(0.4, 1.1, ew)) * S;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }

    // reroute bridges during heal — green geodesic links spanning the cap border
    if (dead && heal > 0) {
      ctx.strokeStyle = hexA(C.ok, 0.7 * heal);
      ctx.lineWidth = 1.6 * S;
      ctx.setLineDash([5 * S, 5 * S]); ctx.lineDashOffset = -(o.t || 0) * 26;
      ctx.beginPath();
      let drawn = 0;
      for (const e of globe.edges) {
        const ad = proj[e.a].dead, bd = proj[e.b].dead;
        if (ad === bd) continue;                 // only border edges
        if (drawn++ % 2) continue;
        const a = proj[e.a], b = proj[e.b];
        if ((a.depth + b.depth) / 2 < 0.45) continue;
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    }

    // repair streams during heal — escrow packets flow from live nodes INTO the
    // dead region, knitting it back. Colored brass (repair) + cyan (source).
    if (dead && healFront > 0) {
      for (const e of globe.edges) {
        const a = proj[e.a], b = proj[e.b], pa = pts[e.a], pb = pts[e.b];
        // edge must feed a still-dark dead node from a live (or already-relit) one
        let from, to, tp;
        if (a.dead && !b.dead) { from = b; to = a; tp = pa; }
        else if (b.dead && !a.dead) { from = a; to = b; tp = pb; }
        else if (a.dead && b.dead) {
          // inner repair link: feed the less-healed from the more-healed
          const ra = relitParam(pa), rb = relitParam(pb);
          if (Math.abs(ra - rb) < 0.001) continue;
          if (ra < rb) { from = a; to = b; tp = pb; } else { from = b; to = a; tp = pa; }
        } else continue;
        if (healFront < relitParam(tp) - 0.18) continue; // only stream just ahead of the front
        const ev = (a.depth + b.depth) / 2;
        if (ev < 0.42) continue;
        const u = ((o.t * 0.9 + pts[e.a].tw * 7 + pts[e.b].tw * 5) % 1);
        const x = lerp(from.x, to.x, u), y = lerp(from.y, to.y, u);
        const col = (e.a + e.b) % 3 === 0 ? C.wise : C.llm;
        glow(x, y, 5 * S, col, 0.5 * ev);
        ctx.fillStyle = hexA(col, 0.9 * ev);
        ctx.beginPath(); ctx.arc(x, y, 1.7 * S, 0, TAU); ctx.fill();
      }
    }

    // flow pulses along edges (emitted by relays/core only)
    if (o.flow) {
      for (const pu of globe.pulses) {
        const a = proj[pu.a], b = proj[pu.b];
        if (!a.rev || !b.rev || a.dead || b.dead) continue;
        const ev = (a.depth + b.depth) / 2;
        if (ev < 0.5) continue;                  // only front pulses
        const u = ((o.t * pu.spd + pu.off) % 1);
        const x = lerp(a.x, b.x, u), y = lerp(a.y, b.y, u);
        const r = 2.0 * S;
        glow(x, y, r * 3, C.llm, 0.45 * o.flow * ev);
        ctx.fillStyle = hexA(C.text, 0.85 * o.flow * ev);
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      }
    }

    // nodes — order back→front with an O(N) depth bucket sort (no comparator at 10k)
    const _gcx = vp.x + cam.cx * vp.w, _gcy = vp.y + cam.cy * vp.h, _gR = vp.h * 0.36 * cam.zoom;
    if (!_orderIdx || _orderIdx.length !== N) _orderIdx = new Array(N);
    const NB = 24, counts = new Int32Array(NB + 1);
    for (let i = 0; i < N; i++) { let b = (proj[i].depth * NB) | 0; if (b < 0) b = 0; else if (b >= NB) b = NB - 1; proj[i]._b = b; counts[b + 1]++; }
    for (let b = 0; b < NB; b++) counts[b + 1] += counts[b];
    for (let i = 0; i < N; i++) { const b = proj[i]._b; _orderIdx[counts[b]++] = i; }
    for (const i of _orderIdx) {
      const p = proj[i], np = pts[i];
      if (!p.rev) continue;
      if (p.dead) {
        // dead node — relights from the cap border inward as the heal-front passes
        const rp = relitParam(np);
        const relit = healFront > rp;
        const just = relit && healFront < rp + 0.16; // bright pop right at the front
        const x = p.x, y = p.y;
        if (relit) {
          const col = just ? C.ok : C.llm;
          glow(x, y, (just ? 15 : 6) * S, col, (just ? 0.85 : 0.5) * p.depth);
          ctx.fillStyle = hexA(just ? C.text : col, (just ? 1 : 0.9) * p.depth);
          ctx.beginPath(); ctx.arc(x, y, (just ? 2.8 : 1.7) * S, 0, TAU); ctx.fill();
        } else {
          ctx.fillStyle = hexA(C.err, 0.6 * p.depth);
          ctx.beginPath(); ctx.arc(x, y, 1.6 * S, 0, TAU); ctx.fill();
        }
        continue;
      }
      const role = np.role;
      let a, r, col, glowAmt = 0;
      if (role === 'leaf') {
        // a phone: small dim presence dot, just shimmers (forwards nothing)
        r = (1.1 + 0.9 * p.depth) * S;
        col = C.llm;
        a = (0.25 + 0.5 * p.depth) * dim;
        if (o.presence) {
          const q = Math.floor(o.t * 1.6 + np.tw * 9);
          a *= 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(q * 2.3 + np.tw * 11));
        }
      } else if (role === 'relay') {
        // fat-interior peer: brighter teal, steady, donated uplink — a producer
        r = (2.4 + 1.8 * p.depth) * S;
        col = C.comm;
        a = (0.5 + 0.5 * p.depth) * dim;
        glowAmt = 0.45 * a;
      } else if (role === 'holder') {
        // fountain holder: violet, holds one symbol (~5%)
        r = (1.8 + 1.2 * p.depth) * S;
        col = C.memory;
        a = (0.45 + 0.5 * p.depth) * dim;
        glowAmt = 0.3 * a;
      } else { // core / publisher
        r = 5 * S; col = C.wise; a = dim; glowAmt = 0.6;
      }
      if (o.focus === i) { col = C.llm; r = 4.2 * S; a = 1; glowAmt = 0.6; }
      // gentle limb fade — keeps dense clusters from stacking into a bright crescent
      const rho = Math.hypot(p.x - _gcx, p.y - _gcy) / _gR;
      const limb = clamp(1 - (rho - 0.82) / 0.18, 0, 1);
      a *= 0.4 + 0.6 * limb;
      // fade glow toward the limb so dense clusters don't smear the silhouette;
      // only the brighter front nodes glow (keeps gradient count sane at 10k)
      const gd = clamp((p.depth - 0.58) / 0.36, 0, 1) * (0.3 + 0.7 * limb);
      const gAmt = glowAmt * gd;
      if (gAmt > 0.02) glow(p.x, p.y, r * 3.0, col, gAmt);
      ctx.fillStyle = hexA(col, a);
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill();
      if (role === 'relay' && p.depth > 0.55) {
        // faint uplink ring marks a forwarder
        ctx.lineWidth = 1 * S; ctx.strokeStyle = hexA(C.comm, 0.4 * a);
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 1.7, 0, TAU); ctx.stroke();
      }
      if (role === 'holder' && p.depth > 0.5) {
        // a tiny held-symbol diamond
        ctx.save(); ctx.translate(p.x, p.y - r * 2.1); ctx.rotate(Math.PI / 4);
        ctx.fillStyle = hexA(C.memory, 0.8 * a); ctx.fillRect(-1.4 * S, -1.4 * S, 2.8 * S, 2.8 * S);
        ctx.restore();
      }
      if (role === 'core') {
        ctx.lineWidth = 1.8 * S; ctx.strokeStyle = hexA(C.wise, 0.9);
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 1.7, 0, TAU); ctx.stroke();
      }
    }

    // coastlines — drawn ON TOP of the mesh so every continent reads clearly
    if (grow > 0.5 && globe.outlines) {
      const og = clamp((grow - 0.5) / 0.4, 0, 1) * dim;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      const COAST = '#AEEBEE';
      for (const loop of globe.outlines) {
        for (let k = 0; k < loop.length - 1; k++) {
          const a = project(loop[k], ang), b = project(loop[k + 1], ang);
          const ev = (a.depth + b.depth) / 2;
          if (ev < 0.5) continue;
          const fa = clamp((ev - 0.5) / 0.38, 0, 1);
          // soft halo
          ctx.strokeStyle = hexA(C.comm, 0.22 * fa * og); ctx.lineWidth = 4 * S;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          // crisp bright coast
          ctx.strokeStyle = hexA(COAST, lerp(0.28, 0.92, fa) * og); ctx.lineWidth = 1.8 * S;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    // focus-pull presence tile (scene 3)
    if (o.focus != null && o.focusK > 0) {
      const p = proj[o.focus], k = easeInOut(o.focusK);
      const w = lerp(8, 230, k) * S, h = w * 0.6;
      const tx = lerp(p.x, vp.x + vp.w * 0.5, k), ty = lerp(p.y, vp.y + vp.h * 0.46, k);
      glow(tx, ty, w * 1.2, C.llm, 0.4 * k);
      ctx.save();
      roundRect(tx - w / 2, ty - h / 2, w, h, 8 * S); ctx.clip();
      ctx.fillStyle = C.bgCard; ctx.fillRect(tx - w / 2, ty - h / 2, w, h);
      // a person — the live presence behind this one node
      const cxp = tx, cyp = ty + h * 0.12, hr = h * 0.2;
      glow(cxp, cyp - h * 0.04, h * 0.55, C.llm, 0.18 * k);
      ctx.fillStyle = hexA(C.llm, 0.85 * k);
      ctx.beginPath(); ctx.arc(cxp, cyp - hr * 1.1, hr, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cxp, cyp + hr * 1.5, hr * 1.7, hr * 1.5, 0, Math.PI, 0); ctx.fill();
      ctx.restore();
      ctx.lineWidth = 2 * S * k; ctx.strokeStyle = hexA(C.llm, 0.9 * k);
      roundRect(tx - w / 2, ty - h / 2, w, h, 8 * S); ctx.stroke();
      // connector
      ctx.strokeStyle = hexA(C.llm, 0.4 * k); ctx.lineWidth = 1 * S;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(tx, ty + h / 2); ctx.stroke();
    }
  }

  // shared device tile (scene 0 grid + scene 1)
  function deviceTile(x, y, w, h, col, alpha) {
    ctx.globalAlpha = alpha;
    roundRect(x, y, w, h, h * 0.16); ctx.fillStyle = C.bgCard; ctx.fill();
    ctx.lineWidth = Math.max(0.6, h * 0.03); ctx.strokeStyle = hexA(col, 0.7); ctx.stroke();
    ctx.fillStyle = hexA(col, 0.55);
    ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.4, h * 0.16, 0, TAU); ctx.fill();
    roundRect(x + w * 0.3, y + h * 0.6, w * 0.4, h * 0.22, h * 0.08); ctx.fillStyle = hexA(col, 0.4); ctx.fill();
    ctx.globalAlpha = 1;
  }
  function fade(local, dur, fin = 0.55, fout = 0.55) {
    return Math.min(smooth(local / fin), smooth((dur - local) / fout));
  }
  function setCam(zoom, cx, cy) { cam.zoom = zoom; cam.cx = cx; cam.cy = cy; }
  function resetCam() { cam = { cx: 0.5, cy: 0.5, zoom: 1 }; }
  // gentle oscillating spin around the land-rich hemisphere — never swings to the empty Pacific
  function spin(t, w, amp) { return globe.baseSpin + Math.sin(t * (w == null ? 0.16 : w)) * (amp == null ? 0.7 : amp); }

  // ===================== SCENES =====================

  // Scene 0 — the star we're replacing (datacenter foil)
  function scene0(t, dur) {
    const A = fade(t, dur), S = SU();
    const cx = vp.x + vp.w * 0.5, cy = vp.y + vp.h * 0.46;
    glow(cx, cy, 150 * S, C.runtime, (0.16 + 0.05 * Math.sin(t * 3)) * A);
    const cols = 7, rows = 7, gw = 34 * S, gh = 22 * S, gap = 8 * S;
    const gridW = cols * gw + (cols - 1) * gap, gridH = rows * gh + (rows - 1) * gap;
    const x0 = cx - gridW / 2, y0 = cy - gridH / 2;
    const shown = easeOut(clamp(t / 1.6, 0, 1)) * 49;
    let k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (Math.abs(r - 3) <= 1 && Math.abs(c - 3) <= 1) { k++; continue; }
      if (k > shown) { k++; continue; }
      const tx = x0 + c * (gw + gap), ty = y0 + r * (gh + gap);
      deviceTile(tx, ty, gw, gh, C.comm, A * 0.9);
      if (t > 1.4) {
        ctx.globalAlpha = A * (0.10 + 0.06 * Math.sin(t * 4 + k));
        ctx.strokeStyle = C.err; ctx.lineWidth = 1 * S;
        ctx.beginPath(); ctx.moveTo(tx + gw / 2, ty + gh / 2); ctx.lineTo(cx, cy); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      k++;
    }
    ctx.globalAlpha = A;
    const bw = 132 * S, bh = 92 * S;
    roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 8 * S);
    ctx.fillStyle = C.bgElev; ctx.fill();
    ctx.lineWidth = 2 * S; ctx.strokeStyle = C.runtime; ctx.stroke();
    for (let i = 0; i < 3; i++) { ctx.fillStyle = hexA(C.runtime, 0.6); ctx.fillRect(cx - bw * 0.3, cy - bh * 0.26 + i * bh * 0.26, bw * 0.6, 2.4 * S); }
    ctx.fillStyle = C.dim; ctx.font = `600 ${11 * S}px 'Geist Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('DATACENTER', cx, cy + bh * 0.34);
    const cap = smooth((t - 2.4) / 0.6);
    if (cap > 0) {
      ctx.globalAlpha = A * cap;
      ctx.strokeStyle = C.err; ctx.lineWidth = 3 * S; ctx.setLineDash([10 * S, 6 * S]);
      roundRect(x0 - 10 * S, y0 - 10 * S, gridW + 20 * S, gridH + 20 * S, 12 * S); ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
  }

  // Scene 1 — one sealed copy in: a device seals into a node, ready to replicate
  function scene1(t, dur) {
    const A = fade(t, dur), S = SU();
    const cx = vp.x + vp.w * 0.5, cy = vp.y + vp.h * 0.48;

    // a target socket glows from the very first frame so the frame is never empty
    const socket = 0.5 + 0.5 * Math.sin(t * 2.4);
    glow(cx, cy, 64 * S, C.wise, (0.12 + 0.06 * socket) * A);
    ctx.globalAlpha = A * 0.6;
    ctx.lineWidth = 1.4 * S; ctx.strokeStyle = hexA(C.wise, 0.5); ctx.setLineDash([4 * S, 5 * S]);
    ctx.beginPath(); ctx.arc(cx, cy, 40 * S, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // 1) a single device descends quickly into the socket
    const drop = easeInOut(clamp(t / 0.8, 0, 1));
    const tw = 104 * S, th = 68 * S;
    const dvy = lerp(vp.y + vp.h * 0.04, cy - 104 * S, drop);
    const dvFade = 1 - smooth((t - 1.4) / 0.5);
    if (dvFade > 0.01) {
      deviceTile(cx - tw / 2, dvy, tw, th, C.comm, A * dvFade);
      ctx.globalAlpha = A * dvFade * 0.7;
      ctx.strokeStyle = hexA(C.wise, 0.7); ctx.lineWidth = 2 * S; ctx.setLineDash([3 * S, 4 * S]); ctx.lineDashOffset = -t * 20;
      ctx.beginPath(); ctx.moveTo(cx, dvy + th); ctx.lineTo(cx, cy - 30 * S); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      // a sealed copy packet slides down the beam into the socket
      const pk = smooth((t - 0.5) / 0.9);
      if (pk > 0 && pk < 1) {
        const py = lerp(dvy + th, cy, pk);
        glow(cx, py, 16 * S, C.wise, 0.6 * A);
        ctx.fillStyle = hexA(C.wise, 0.95 * A);
        ctx.save(); ctx.translate(cx, py); ctx.rotate(Math.PI / 4);
        ctx.fillRect(-5 * S, -5 * S, 10 * S, 10 * S); ctx.restore();
      }
    }

    // 2) the sealed node forms (brass ring + padlock), pulsing
    const seal = smooth((t - 0.9) / 0.8);
    if (seal > 0) {
      const R = 32 * S * seal;
      const pulse = 1 + 0.06 * Math.sin(t * 3);
      glow(cx, cy, 100 * S * seal, C.wise, 0.34 * A);
      ctx.globalAlpha = A;
      ctx.lineWidth = 3.2 * S; ctx.strokeStyle = hexA(C.wise, 0.95);
      ctx.beginPath(); ctx.arc(cx, cy, R * pulse, 0, TAU); ctx.stroke();
      ctx.fillStyle = hexA(C.bgElev, 0.95); ctx.beginPath(); ctx.arc(cx, cy, R * 0.74, 0, TAU); ctx.fill();
      // seal-snap ring
      const snap = smooth((t - 1.4) / 0.5);
      if (snap > 0 && snap < 1) {
        ctx.globalAlpha = A * (1 - snap);
        ctx.lineWidth = 2.5 * S; ctx.strokeStyle = hexA(C.wise, 0.8);
        ctx.beginPath(); ctx.arc(cx, cy, lerp(R, 70 * S, snap), 0, TAU); ctx.stroke();
        ctx.globalAlpha = A;
      }
      // padlock
      const lk = smooth((t - 1.3) / 0.5);
      if (lk > 0) {
        ctx.globalAlpha = A * lk;
        ctx.lineWidth = 3 * S; ctx.strokeStyle = C.wise;
        ctx.beginPath(); ctx.arc(cx, cy - 3 * S, 8 * S, Math.PI, 0); ctx.stroke();
        ctx.fillStyle = C.wise; roundRect(cx - 11 * S, cy - 1 * S, 22 * S, 17 * S, 3 * S); ctx.fill();
        ctx.fillStyle = hexA(C.bgElev, 0.9); ctx.beginPath(); ctx.arc(cx, cy + 6 * S, 2.6 * S, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // 3) first replication — links sprout to fresh peers, copy packets travel out
    const rep = smooth((t - 2.6) / 2.0);
    if (rep > 0) {
      const peers = [{ a: -0.5, d: 1 }, { a: Math.PI + 0.5, d: 1 }, { a: -Math.PI / 2 - 0.2, d: 0.78 }, { a: Math.PI / 2 + 0.3, d: 0.66 }];
      for (let i = 0; i < peers.length; i++) {
        const pk = smooth((rep - i * 0.1) / 0.6);
        if (pk <= 0) continue;
        const ang = peers[i].a, dist = lerp(34 * S, 132 * S * peers[i].d, easeOut(pk));
        const ex = cx + Math.cos(ang) * dist, ey = cy + Math.sin(ang) * dist * 0.82;
        ctx.globalAlpha = A;
        ctx.strokeStyle = hexA(C.comm, 0.7 * pk); ctx.lineWidth = 1.6 * S;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(ang) * 30 * S, cy + Math.sin(ang) * 30 * S * 0.82); ctx.lineTo(ex, ey); ctx.stroke();
        const u = (t * 0.8 + i * 0.3) % 1;
        const px = cx + Math.cos(ang) * lerp(30 * S, dist, u), py = cy + Math.sin(ang) * lerp(30 * S, dist, u) * 0.82;
        glow(px, py, 6 * S, C.llm, 0.5 * pk);
        glow(ex, ey, 11 * S, C.llm, 0.6 * pk);
        ctx.fillStyle = hexA(C.llm, pk); ctx.beginPath(); ctx.arc(ex, ey, 3.4 * S, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  // Scene 2 — the mesh spreads (peers replicate across the globe)
  function scene2(t, dur) {
    const A = fade(t, dur, 0.5, 0.6);
    const grow = easeInOut(clamp(t / (dur - 2.0), 0, 1));
    const flow = smooth((t - 4) / 2) * 0.7;
    ctx.globalAlpha = A;
    drawGlobe({ ang: spin(t, 0.14, 0.55), t, grow: 0.03 + grow * 0.97, flow, presence: grow > 0.85 });
    ctx.globalAlpha = 1;
  }

  // Scene 3 — presence at scale (focus pull on one node)
  function scene3(t, dur) {
    const A = fade(t, dur, 0.5, 0.5);
    const focus = globe.focusNode;
    const zoom = easeInOut(clamp((t - 1.2) / 3.5, 0, 1));
    setCam(lerp(1, 1.5, zoom), lerp(0.5, 0.42, zoom), 0.5);
    ctx.globalAlpha = A;
    drawGlobe({ ang: spin(t, 0.13, 0.5), t, grow: 1, flow: 0.7, presence: true, focus, focusK: smooth((t - 2.4) / 2.6) });
    ctx.globalAlpha = 1;
    resetCam();
  }

  // Scene 4 — holographic delivery: layered streams composite into one presence
  function scene4(t, dur) {
    const A = fade(t, dur, 0.6, 0.6), S = SU();
    const cx = vp.x + vp.w * 0.52, cy = vp.y + vp.h * 0.5;
    // globe dimmed, behind/left
    ctx.globalAlpha = A * 0.4;
    drawGlobe({ ang: spin(t, 0.13, 0.45), t, grow: 1, flow: 0.35, dimAll: true });
    ctx.globalAlpha = 1;

    const cardW = 158 * S, cardH = 100 * S;
    const layers = [
      { col: C.comm, label: 'TRANSPORT' },
      { col: C.memory, label: 'STATE' },
      { col: C.llm, label: 'VIEW' },
    ];
    const conv = easeInOut(clamp((t - 1.0) / 2.2, 0, 1)); // spread → stacked

    // light streams from the globe feeding the stack
    const streamApp = smooth((t - 0.4) / 1.0);
    if (streamApp > 0) {
      for (let i = 0; i < 10; i++) {
        const u = ((t * 0.5 + i * 0.1) % 1);
        const sx = vp.x + vp.w * 0.2, sy = cy + (i - 5) * 12 * S;
        const x = lerp(sx, cx - cardW * 0.4, easeOut(u)), y = lerp(sy, cy, easeOut(u));
        ctx.globalAlpha = A * streamApp * (1 - u) * 0.8;
        ctx.fillStyle = hexA([C.comm, C.memory, C.llm][i % 3], 0.8);
        ctx.beginPath(); ctx.arc(x, y, 1.8 * S, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // three layered stream cards — spread out, then composite into a stack
    for (let i = 0; i < 3; i++) {
      const app = smooth((t - 0.3 - i * 0.3) / 0.8);
      if (app <= 0) continue;
      const spread = 1 - conv;
      const dx = (i - 1) * 78 * S * spread + (i - 1) * 9 * S * conv;
      const dy = (i - 1) * 56 * S * spread + (i - 1) * 10 * S * conv;
      const x = cx + dx, y = cy + dy;
      ctx.globalAlpha = A * app;
      roundRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 10 * S);
      ctx.fillStyle = hexA(layers[i].col, 0.12); ctx.fill();
      ctx.lineWidth = 1.6 * S; ctx.strokeStyle = hexA(layers[i].col, 0.85); ctx.stroke();
      for (let k = 0; k < 4; k++) {
        ctx.fillStyle = hexA(layers[i].col, 0.16 + 0.12 * Math.sin(t * 2 + i + k));
        ctx.fillRect(x - cardW / 2 + 10 * S, y - cardH / 2 + (k + 1) * cardH / 5, cardW - 20 * S, 2.4 * S);
      }
      ctx.fillStyle = hexA(layers[i].col, 0.95);
      ctx.font = `600 ${9 * S}px 'Geist Mono', monospace`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(layers[i].label, x - cardW / 2 + 10 * S, y - cardH / 2 + 11 * S);
      ctx.globalAlpha = 1;
    }

    // the reconstructed presence — a clean avatar resolving on the composited stack
    const reb = smooth((t - 3.0) / 1.6);
    if (reb > 0) {
      const x = cx + 9 * S, y = cy + 10 * S;
      ctx.globalAlpha = A * reb;
      glow(x, y, 56 * S, C.llm, 0.16 + 0.05 * Math.sin(t * 2));
      ctx.fillStyle = hexA(C.llm, 0.85);
      ctx.beginPath(); ctx.arc(x, y - 12 * S, 13 * S, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x, y + 22 * S, 22 * S, 16 * S, 0, Math.PI, 0); ctx.fill();
      // "re-rendered per viewer" — a soft ring tick
      ctx.lineWidth = 1.4 * S; ctx.strokeStyle = hexA(C.llm, 0.5 * reb);
      ctx.beginPath(); ctx.arc(x, y + 2 * S, 46 * S, 0, TAU); ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Scene 5 — it gets hit, and heals (entirely on the globe)
  function scene5(t, dur) {
    const A = fade(t, dur, 0.5, 0.5), S = SU();
    const dead = new Set();
    for (let i = 0; i < N; i++) if (inCap(globe.pts[i])) dead.add(i);

    // hold the failed region toward the viewer — frame on the dead-node centroid
    // (small north bias keeps the lit mass dead-center as land skews north).
    const cc = globe.capCentroid;
    const focusAxis = (function () { const m = Math.hypot(cc.x, cc.y + 0.12, cc.z) || 1; return { x: cc.x / m, y: (cc.y + 0.12) / m, z: cc.z / m }; })();
    const baseAng = Math.atan2(-focusAxis.x, focusAxis.z);
    const drift = Math.sin(t * 0.16) * 0.04;
    const ang = baseAng + drift;

    // timeline: hit → reroute → heal-front sweeps in → settle
    const hitK = smooth((t - 1.0) / 0.5);
    const reroute = smooth((t - 1.8) / 1.2);
    const healFront = smooth((t - 3.2) / (dur - 5.2));   // node relight front
    const settle = smooth((t - (dur - 1.8)) / 1.4);      // final confirmation

    // camera gently centers the failed region (frame on its centroid)
    const cp0 = project(focusAxis, ang); // cam is reset here → zoom 1, centered
    const ox = (cp0.x - (vp.x + 0.5 * vp.w)) / vp.w; // region offset from frame center
    const oy = (cp0.y - (vp.y + 0.5 * vp.h)) / vp.h;
    const push = smooth((t - 0.6) / 1.8) * (1 - settle * 0.55);
    const zoom = lerp(1, 1.62, push);
    setCam(zoom, lerp(0.5, 0.5 - ox * zoom, push), lerp(0.5, 0.5 - oy * zoom, push));

    ctx.globalAlpha = A;
    drawGlobe({
      ang, t, grow: 1, flow: 0.55, presence: true,
      dead: hitK > 0 ? dead : null, heal: reroute, healFront,
    });
    ctx.globalAlpha = 1;

    const cp = project(focusAxis, ang); // re-project under current cam
    const capR = vp.h * 0.36 * cam.zoom * Math.sin(Math.acos(globe.capCos)); // cap screen radius

    // impact — flash + shock ring
    if (hitK > 0 && t < 2.8) {
      glow(cp.x, cp.y, capR * 1.5 * hitK, C.err, 0.5 * (1 - smooth((t - 1.0) / 1.6)));
      const sr = smooth((t - 1.0) / 0.9);
      if (sr > 0 && sr < 1) {
        ctx.globalAlpha = A * (1 - sr);
        ctx.strokeStyle = hexA(C.err, 0.85); ctx.lineWidth = 3 * S;
        ctx.beginPath(); ctx.arc(cp.x, cp.y, capR * sr, 0, TAU); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // heal-front — a luminous wavefront sweeps across the region as nodes relight
    if (healFront > 0.02 && healFront < 0.99) {
      const wr = lerp(6 * S, capR, healFront);
      // soft leading glow
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      glow(cp.x, cp.y, wr + 26 * S, C.ok, 0.10 * A);
      ctx.restore();
      // crisp wavefront arc
      ctx.globalAlpha = A * 0.9 * (1 - healFront * 0.3);
      ctx.strokeStyle = hexA(C.ok, 0.8); ctx.lineWidth = 2.4 * S;
      ctx.beginPath(); ctx.arc(cp.x, cp.y, wr, 0, TAU); ctx.stroke();
      // a trailing softer ring
      ctx.globalAlpha = A * 0.4 * (1 - healFront);
      ctx.lineWidth = 1.4 * S; ctx.strokeStyle = hexA(C.llm, 0.6);
      ctx.beginPath(); ctx.arc(cp.x, cp.y, Math.max(0, wr - 14 * S), 0, TAU); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // final "restored" bloom + confirmation ripple
    if (settle > 0) {
      glow(cp.x, cp.y, capR * 1.1, C.ok, 0.22 * settle * (1 - settle) * 4);
      const rip = smooth(settle);
      ctx.globalAlpha = A * (1 - rip) * 0.7;
      ctx.strokeStyle = hexA(C.ok, 0.8); ctx.lineWidth = 2 * S;
      ctx.beginPath(); ctx.arc(cp.x, cp.y, lerp(capR * 0.4, capR * 1.5, rip), 0, TAU); ctx.stroke();
      ctx.globalAlpha = 1;
      // a small "sealed/healed" check pip at center once fully restored
      const chk = smooth((settle - 0.3) / 0.5);
      if (chk > 0) {
        ctx.globalAlpha = A * chk;
        ctx.strokeStyle = C.ok; ctx.lineWidth = 2.6 * S; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cp.x - 7 * S, cp.y); ctx.lineTo(cp.x - 1 * S, cp.y + 6 * S); ctx.lineTo(cp.x + 9 * S, cp.y - 7 * S);
        ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
    resetCam();
  }

  // Scene 6 — the seal (two-shell E2E core)
  function scene6(t, dur) {
    const A = fade(t, dur, 0.6, 0.6), S = SU();
    const cx = vp.x + vp.w * 0.5, cy = vp.y + vp.h * 0.5, R = vp.h * 0.3;
    ctx.globalAlpha = A * 0.4;
    drawGlobe({ ang: spin(t, 0.13, 0.45), t, grow: 1, flow: 0.3, dimAll: true });
    ctx.globalAlpha = 1;
    ctx.save(); ctx.globalAlpha = A; ctx.translate(cx, cy); ctx.rotate(t * 0.2);
    ctx.lineWidth = 2 * S; ctx.strokeStyle = hexA(C.comm, 0.55); ctx.setLineDash([5 * S, 9 * S]);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    const lock = smooth((t - 1.0) / 1.4);
    ctx.save(); ctx.globalAlpha = A;
    glow(cx, cy, R * 0.7, C.wise, 0.16 + 0.06 * Math.sin(t * 2) * lock);
    ctx.lineWidth = 3 * S; ctx.strokeStyle = hexA(C.wise, 0.9);
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.6, 0, TAU); ctx.stroke();
    const gap = lerp(R * 0.5, 0, lock);
    ctx.lineWidth = 4 * S; ctx.strokeStyle = C.wise;
    ctx.beginPath(); ctx.arc(cx - gap, cy, R * 0.34, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + gap, cy, R * 0.34, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
    if (lock > 0.8) {
      const lk = smooth((lock - 0.8) / 0.2); ctx.globalAlpha = A * lk;
      glow(cx, cy, 30 * S, C.wise, 0.5);
      ctx.lineWidth = 3 * S; ctx.strokeStyle = C.wise;
      ctx.beginPath(); ctx.arc(cx, cy - 6 * S, 9 * S, Math.PI, 0); ctx.stroke();
      ctx.fillStyle = C.wise; roundRect(cx - 11 * S, cy - 3 * S, 22 * S, 17 * S, 3 * S); ctx.fill();
    }
    ctx.restore();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + t * 0.5;
      const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
      ctx.globalAlpha = A * 0.5; ctx.fillStyle = hexA(C.comm, 0.7);
      roundRect(x - 3 * S, y - 2 * S, 6 * S, 4 * S, 1 * S); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Scene 7 — the room carries it (zoom out to the full rotating globe)
  function scene7(t, dur) {
    const A = smooth(t / 0.8);
    const z = easeInOut(clamp(t / 2.5, 0, 1));
    setCam(lerp(1.35, 1.0, z), 0.5, 0.5);
    ctx.globalAlpha = A;
    drawGlobe({ ang: spin(t, 0.12, 0.5), t, grow: 1, flow: 0.55, presence: true });
    ctx.globalAlpha = 1;
    resetCam();
  }

  const SCENE_FN = [scene0, scene1, scene2, scene3, scene4, scene5, scene6, scene7];

  function render(time) {
    resetCam(); bg();
    let idx = SCENES.length - 1;
    for (let i = 0; i < SCENES.length; i++) {
      if (time < SCENES[i].start + SCENES[i].dur || i === SCENES.length - 1) { idx = i; break; }
    }
    const s = SCENES[idx];
    SCENE_FN[idx](time - s.start, s.dur);
    return idx;
  }

  // seamless hero — full rotating globe, always breathing + flowing. `scale`
  // enlarges the globe (handy when the hero canvas is tall/narrow and the 16:9
  // letterbox would otherwise shrink it).
  function renderHeroSteady(t, introT, scale) {
    resetCam(); bg();
    if (scale && scale !== 1) cam.zoom = scale;
    const intro = introT == null ? 1 : easeOut(clamp(introT, 0, 1));
    drawGlobe({ ang: spin(t, 0.12, 0.6), t, grow: intro, flow: intro * 0.55, presence: true });
  }
  function renderHero(loopT) { renderHeroSteady(loopT + 6, Math.min(loopT / 3, 1)); }

  return { resize, render, renderHero, renderHeroSteady, get scenes() { return SCENES; }, get total() { return TOTAL; }, get loopStart() { return LOOP_START; } };
}

