// The signet, made of fish.
//
// A handful of fish leave their schools, light up, and take stations along
// the outline of the CIRIS mark; a stretch of the mark glows once the fish at
// both of its ends are home. Then, slowly, the figure lets go and comes back:
//
//   hold     the mark stands, the fish idling on station
//   loosen   one after another, round the outline, fish grow restless and
//            drift off; each line fades as its fish leave
//   mill     the freed fish circle the empty centre as a loose glowing school
//   reform   one after another they pick a station (a new one) and settle;
//            lines relight as neighbours arrive
//
// Nothing here is a scripted path. Every glowing fish is a steering agent
// (seek-and-arrive toward a station, or boid rules while milling) and every
// line's brightness is read off how settled its two fish actually are. So
// the timing breathes and no two cycles match.
//
// The one thing the glowing fish never answer to is a whale shark. The silver
// schools part round it; these keep to their stations and their circle however
// close it comes, and wherever the visitor steers it. That is the point of
// them, so no whale is passed in here.

import { SIGNET_INTERIORS, SIGNET_OUTLINE } from "./signetGeometry";
import type { School } from "./school";
import { SCHOOLS } from "./school";
import { Palette, TAU, angleDelta, clamp01, rgba, seeded, smooth, smoothstep } from "./art";

const HOLD_SECONDS = 14;
const LOOSEN_SECONDS = 9;
const MILL_SECONDS = 7;
const REFORM_SECONDS = 10;
/** First formation: fish leave the schools over this long. */
const GATHER_SECONDS = 8.2;
/** The heading every fish on station shares. */
const REST_HEADING = -0.075;

const ABSENT = 0, SEEKING = 1, MILLING = 2;
type Stage = "gather" | "hold" | "loosen" | "mill" | "reform";

// ---- geometry, measured once -----------------------------------------------

const SAMPLES = 1024;
interface Measured {
  /** The outline as SAMPLES points, in logo coordinates. */
  pts: Float32Array;
  cx: number;
  cy: number;
  extent: number;
  /** Stations along the outline, as sample indices: the eight tips first. */
  tips: number[];
  interiors: { d: string; x: number; y: number; w: number; h: number }[];
}
let measured: Measured | null = null;

function measure(): Measured {
  if (measured) return measured;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  document.body.appendChild(svg);
  const mk = (d: string) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    svg.appendChild(p);
    return p;
  };
  const outline = mk(SIGNET_OUTLINE);
  const total = outline.getTotalLength();
  const pts = new Float32Array(SAMPLES * 2);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < SAMPLES; i++) {
    const p = outline.getPointAtLength((total * i) / SAMPLES);
    pts[i * 2] = p.x;
    pts[i * 2 + 1] = p.y;
    x0 = Math.min(x0, p.x);
    x1 = Math.max(x1, p.x);
    y0 = Math.min(y0, p.y);
    y1 = Math.max(y1, p.y);
  }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  // The eight points of the star: the furthest sample in each 45° sector.
  const best = Array.from({ length: 8 }, () => ({ reach: -Infinity, at: 0 }));
  for (let i = 0; i < SAMPLES; i++) {
    const dx = pts[i * 2] - cx, dy = pts[i * 2 + 1] - cy;
    const sector = (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8;
    const axis = (sector * Math.PI) / 4;
    const reach = dx * Math.cos(axis) + dy * Math.sin(axis);
    if (reach > best[sector].reach) best[sector] = { reach, at: i };
  }
  const interiors = SIGNET_INTERIORS.map((d) => {
    const b = mk(d).getBBox();
    return { d, x: b.x, y: b.y, w: b.width, h: b.height };
  });
  svg.remove();
  measured = {
    pts, cx, cy, extent: Math.max(x1 - x0, y1 - y0),
    tips: best.map((b) => b.at).sort((a, b) => a - b),
    interiors,
  };
  return measured;
}

interface Glyph {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function createSignet(w: number, h: number, small: boolean, centerY: number, introSeconds: number) {
  const geo = measure();
  let W = w, H = h;
  // Stations: the eight tips, plus the midpoints between them (every other
  // one on a phone, where sixteen fish would crowd the mark).
  const stations: number[] = [];
  geo.tips.forEach((at, i) => {
    stations.push(at);
    const nextTip = geo.tips[i + 1] ?? geo.tips[0] + SAMPLES;
    if (!small || i % 2 === 0) stations.push(((at + nextTip) / 2) % SAMPLES);
  });
  const S = stations.length;

  let scale = 1, ox = 0, oy = 0, radius = 1;
  const slotX = new Float32Array(S), slotY = new Float32Array(S);
  function layout() {
    scale = Math.min(W * (small ? 0.62 : 0.55), H * 0.62, 520) / geo.extent;
    ox = W * 0.5 - geo.cx * scale;
    oy = H * centerY - geo.cy * scale;
    radius = (geo.extent * scale) / 2;
    for (let i = 0; i < S; i++) {
      const at = Math.round(stations[i]) % SAMPLES;
      slotX[i] = ox + geo.pts[at * 2] * scale;
      slotY[i] = oy + geo.pts[at * 2 + 1] * scale;
    }
  }
  layout();
  const centreX = () => W * 0.5;
  const centreY = () => H * centerY;

  // Each inner shape belongs to the two stations nearest to it, and lights
  // only after the outline on both sides of those stations has: the figure is
  // traced first and fills in afterwards, the heart of it last.
  const inner = geo.interiors.map((b) => {
    const x = ox + (b.x + b.w / 2) * scale, y = oy + (b.y + b.h / 2) * scale;
    const near = Array.from({ length: S }, (_, i) => ({ i, d: (slotX[i] - x) ** 2 + (slotY[i] - y) ** 2 }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .map((e) => e.i);
    const links = [...new Set(near.flatMap((i) => [i, (i - 1 + S) % S]))];
    return { links, out: clamp01(Math.hypot(x - W * 0.5, y - H * centerY) / radius) };
  });

  // ---- the fish -----------------------------------------------------------
  const f32 = () => new Float32Array(S);
  const x = f32(), y = f32(), px = f32(), py = f32(), vx = f32(), vy = f32();
  const heading = f32(), pHeading = f32(), size = f32(), fromSize = f32(), grown = f32();
  const phase = f32(), depth = f32(), glow = f32(), dock = f32(), restless = f32();
  const beat = f32(), cue = f32(), born = f32();
  const mode = new Uint8Array(S);
  const slot = new Int16Array(S);
  /** Which fish holds each station (−1: nobody). */
  const holder = new Int16Array(S).fill(-1);
  const linkLit = f32();
  const innerLit = new Float32Array(geo.interiors.length);

  const random = seeded(4099);
  const fullSize = (i: number) =>
    Math.min(small ? 15.5 : 27, H * 0.04) * (0.91 + (fromSize[i] / (small ? 11.1 : 15.4)) * 0.17);

  let stage: Stage = "gather";
  let stageAt = 0;
  let recruited = 0;
  let spin = 1;
  let cycles = 0;
  // The order the first fish are called in hops round the outline, so the
  // mark does not draw itself like a pen stroke.
  const callOrder = Array.from({ length: S }, (_, i) => i).sort((a, b) => ((a * 5) % S) - ((b * 5) % S));

  function recruit(i: number, school: School) {
    const s = callOrder[i];
    const j = school.closest(i % SCHOOLS, slotX[s], slotY[s]);
    school.alive[j] = 0;
    x[i] = px[i] = school.x[j];
    y[i] = py[i] = school.y[j];
    vx[i] = school.vx[j];
    vy[i] = school.vy[j];
    heading[i] = pHeading[i] = school.heading[j];
    size[i] = fromSize[i] = school.size[j];
    phase[i] = school.phase[j];
    depth[i] = school.depth[j];
    mode[i] = SEEKING;
    slot[i] = s;
    holder[s] = i;
  }

  /** Ring distance between two stations, 0..S/2. */
  const ring = (a: number, b: number) => {
    const d = Math.abs(a - b) % S;
    return Math.min(d, S - d);
  };

  function enter(next: Stage, time: number) {
    stage = next;
    stageAt = time;
    if (next === "loosen") {
      // Start somewhere, and let go in both directions round the outline.
      const start = Math.floor(random() * S);
      for (let i = 0; i < S; i++) {
        cue[i] = time + 2.6 + (ring(slot[i], start) / (S / 2)) * (LOOSEN_SECONDS - 2.6) + (random() - 0.5) * 1.1;
      }
      spin = cycles % 2 === 0 ? 1 : -1;
    } else if (next === "reform") {
      // Stations go to whoever is nearest, taken in a shuffled order, so
      // the fish end up somewhere new without crossing the whole figure.
      holder.fill(-1);
      const free = new Uint8Array(S).fill(1);
      const order = Array.from({ length: S }, (_, i) => i).sort(() => random() - 0.5);
      const start = order[0];
      for (const s of order) {
        let pick = -1, score = Infinity;
        for (let i = 0; i < S; i++) {
          if (!free[i]) continue;
          const d = (x[i] - slotX[s]) ** 2 + (y[i] - slotY[s]) ** 2;
          if (d < score) {
            score = d;
            pick = i;
          }
        }
        free[pick] = 0;
        slot[pick] = s;
        cue[pick] = time + (ring(s, start) / (S / 2)) * REFORM_SECONDS + random() * 1.2;
      }
    } else if (next === "hold") {
      cycles++;
    }
  }

  function step(dt: number, time: number, school: School) {
    // ---- the stage manager ------------------------------------------------
    if (stage === "gather") {
      while (recruited < S) {
        const progress = recruited / (S - 1);
        const start = introSeconds + progress * GATHER_SECONDS + Math.sin(recruited * 2.41) * 0.28 * Math.sin(Math.PI * progress);
        if (time < start) break;
        born[recruited] = time;
        recruit(recruited++, school);
      }
      if (recruited === S && settled()) enter("hold", time);
    } else if (stage === "hold") {
      if (time - stageAt > HOLD_SECONDS) enter("loosen", time);
    } else if (stage === "loosen") {
      let out = 0;
      for (let i = 0; i < S; i++) {
        if (mode[i] === SEEKING && time >= cue[i]) {
          mode[i] = MILLING;
          holder[slot[i]] = -1;
        }
        if (mode[i] === MILLING) out++;
      }
      if (out === S) enter("mill", time);
    } else if (stage === "mill") {
      if (time - stageAt > MILL_SECONDS) enter("reform", time);
    } else if (stage === "reform") {
      for (let i = 0; i < S; i++) {
        if (mode[i] === MILLING && time >= cue[i]) {
          mode[i] = SEEKING;
          holder[slot[i]] = i;
        }
      }
      if (settled()) enter("hold", time);
    }

    // ---- the fish ---------------------------------------------------------
    const cx = centreX(), cy = centreY();
    const first = cycles === 0;
    for (let i = 0; i < S; i++) {
      if (mode[i] === ABSENT) continue;
      px[i] = x[i];
      py[i] = y[i];
      pHeading[i] = heading[i];
      glow[i] = smooth(clamp01((time - born[i]) / 1.35));
      grown[i] = Math.min(1, grown[i] + dt / 4);
      size[i] = fromSize[i] + (fullSize(i) - fromSize[i]) * smooth(grown[i]);

      let wantX = 0, wantY = 0, grip = 2.2;
      if (mode[i] === SEEKING) {
        // Fidgeting builds in the seconds before a fish lets go of its station.
        const due = stage === "loosen" ? clamp01(1 - (cue[i] - time) / 2.6) : 0;
        restless[i] += (due - restless[i]) * (1 - Math.exp(-dt * 2));
        const bob = 1.5 + 5.5 * restless[i];
        const tx = slotX[slot[i]] + Math.sin(time * 0.71 + phase[i]) * bob;
        const ty = slotY[slot[i]] + Math.cos(time * 0.93 + phase[i] * 1.7) * bob * 0.85;
        const dx = tx - x[i], dy = ty - y[i];
        const d = Math.hypot(dx, dy) || 1;
        const top = first ? H * 0.2 : H * 0.115;
        const pace = Math.min(top, d * 1.15);
        // Meander on the way in; straighten up for the last stretch.
        const stray = Math.min(1, d / (H * 0.22)) * top * 0.42 * Math.sin(time * 0.9 + phase[i] * 3);
        wantX = (dx / d) * pace - (dy / d) * stray;
        wantY = (dy / d) * pace + (dx / d) * stray;
        const off = Math.hypot(slotX[slot[i]] - x[i], slotY[slot[i]] - y[i]);
        dock[i] = 1 - smoothstep(3, radius * 0.17, off);
      } else {
        restless[i] *= Math.exp(-dt);
        dock[i] = 0;
        // Loose school round the open centre: circle, keep a lane, keep apart.
        const rx = x[i] - cx, ry = y[i] - cy;
        const r = Math.hypot(rx, ry) || 1;
        const lane = radius * (0.56 + 0.24 * Math.sin(time * 0.23 + phase[i] * 2));
        const pace = H * 0.088 * (0.8 + 0.4 * ((phase[i] / TAU) % 1));
        wantX = (-ry / r) * spin * pace + (rx / r) * (lane - r) * 0.8;
        wantY = (rx / r) * spin * pace + (ry / r) * (lane - r) * 0.8;
        let ax = 0, ay = 0, mates = 0;
        const room = radius * 0.3;
        for (let j = 0; j < S; j++) {
          if (j === i || mode[j] !== MILLING) continue;
          const dx = x[j] - x[i], dy = y[j] - y[i];
          const d = Math.hypot(dx, dy) || 1;
          if (d < room) {
            const crowd = (1 - d / room) ** 2 * pace * 2.4;
            wantX -= (dx / d) * crowd;
            wantY -= (dy / d) * crowd;
          }
          if (d < room * 2.2) {
            ax += vx[j];
            ay += vy[j];
            mates++;
          }
        }
        if (mates) {
          wantX += (ax / mates - vx[i]) * 0.3;
          wantY += (ay / mates - vy[i]) * 0.3;
        }
        wantY += Math.sin(time * 0.8 + phase[i] * 5) * pace * 0.25;
        grip = 1.2;
      }

      const fx = (wantX - vx[i]) * grip, fy = (wantY - vy[i]) * grip;
      vx[i] += fx * dt;
      vy[i] += fy * dt;
      x[i] += vx[i] * dt;
      y[i] += vy[i] * dt;

      const speed = Math.hypot(vx[i], vy[i]);
      const swim = speed > 1 ? Math.atan2(vy[i], vx[i]) : heading[i];
      const settle = smooth(dock[i]) * (1 - restless[i] * 0.6);
      const want = swim + angleDelta(swim, REST_HEADING) * Math.max(settle, 1 - clamp01(speed / 7));
      heading[i] += angleDelta(heading[i], want) * (1 - Math.exp(-dt * 4.2));
      beat[i] += dt * (3.4 + Math.min(9, speed * 0.16));
    }

    // ---- the light --------------------------------------------------------
    const ease = (now: number, want: number, up: number, down: number) =>
      now + (want - now) * (1 - Math.exp(-dt * (want > now ? up : down)));
    for (let s = 0; s < S; s++) {
      const a = holder[s], b = holder[(s + 1) % S];
      const home = a < 0 || b < 0 ? 0 : dock[a] * (1 - 0.55 * restless[a]) * dock[b] * (1 - 0.55 * restless[b]);
      linkLit[s] = ease(linkLit[s], home, 0.75, 1.5);
    }
    for (let k = 0; k < innerLit.length; k++) {
      let traced = 1;
      for (const l of inner[k].links) traced = Math.min(traced, linkLit[l]);
      innerLit[k] = ease(innerLit[k], smoothstep(0.35, 0.95, traced), 0.45 + 0.75 * inner[k].out, 2.2);
    }
  }

  function settled() {
    for (let i = 0; i < S; i++) if (mode[i] !== SEEKING || dock[i] < 0.985) return false;
    return true;
  }

  /** Skip straight to the finished mark (reduced motion). */
  function finish(school: School) {
    while (recruited < S) recruit(recruited++, school);
    for (let i = 0; i < S; i++) {
      mode[i] = SEEKING;
      holder[slot[i]] = i;
      x[i] = px[i] = slotX[slot[i]];
      y[i] = py[i] = slotY[slot[i]];
      vx[i] = vy[i] = 0;
      heading[i] = pHeading[i] = REST_HEADING;
      glow[i] = dock[i] = grown[i] = 1;
      size[i] = fullSize(i);
      born[i] = -10;
    }
    linkLit.fill(1);
    innerLit.fill(1);
    stage = "hold";
    stageAt = Infinity;
  }

  // ---- the lines, painted once ------------------------------------------
  let links: Glyph[] = [];
  let inners: Glyph[] = [];
  function paint(palette: Palette, light: boolean, dpr: number) {
    const core = light ? palette.gold : palette.glint;
    const glyph = (bx: number, by: number, bw: number, bh: number, draw: (g: CanvasRenderingContext2D) => void, inner: boolean, unit: number): Glyph => {
      const pad = 8;
      const gx = Math.floor(bx - pad), gy = Math.floor(by - pad);
      const gw = Math.ceil(bw + pad * 2 + 1), gh = Math.ceil(bh + pad * 2 + 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(gw * dpr);
      canvas.height = Math.ceil(gh * dpr);
      const g = canvas.getContext("2d")!;
      g.scale(dpr, dpr);
      g.translate(-gx, -gy);
      g.lineJoin = "round";
      g.lineCap = "round";
      const pass = (width: number, colour: readonly [number, number, number], alpha: number) => {
        g.lineWidth = width / unit;
        g.strokeStyle = rgba(colour, alpha);
        draw(g);
      };
      pass(inner ? 7.5 : 10, palette.glint, light ? 0.16 : 0.15);
      pass(inner ? 4 : 5, palette.glint, light ? 0.29 : 0.26);
      pass(inner ? 1.35 : 1.55, core, inner ? (light ? 0.73 : 0.72) : light ? 0.86 : 0.91);
      return { canvas, x: gx, y: gy, w: gw, h: gh };
    };
    links = Array.from({ length: S }, (_, s) => {
      const from = stations[s];
      let to = stations[(s + 1) % S];
      if (to <= from) to += SAMPLES;
      const path = new Path2D();
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (let a = Math.round(from); a <= Math.round(to); a++) {
        const k = a % SAMPLES;
        const qx = ox + geo.pts[k * 2] * scale, qy = oy + geo.pts[k * 2 + 1] * scale;
        if (a === Math.round(from)) path.moveTo(qx, qy);
        else path.lineTo(qx, qy);
        x0 = Math.min(x0, qx);
        x1 = Math.max(x1, qx);
        y0 = Math.min(y0, qy);
        y1 = Math.max(y1, qy);
      }
      return glyph(x0, y0, x1 - x0, y1 - y0, (g) => g.stroke(path), false, 1);
    });
    inners = geo.interiors.map((b) => {
      const path = new Path2D(b.d);
      return glyph(
        ox + b.x * scale, oy + b.y * scale, b.w * scale, b.h * scale,
        (g) => {
          g.save();
          g.translate(ox, oy);
          g.scale(scale, scale);
          g.stroke(path);
          g.restore();
        },
        true, scale,
      );
    });
  }

  function drawLines(ctx: CanvasRenderingContext2D, time: number, still: boolean) {
    for (let s = 0; s < links.length; s++) {
      const lit = linkLit[s] * (still ? 1 : 0.94 + 0.06 * Math.sin(s * 0.82 - time * 1.6));
      if (lit < 0.004) continue;
      const g = links[s];
      ctx.globalAlpha = lit;
      ctx.drawImage(g.canvas, g.x, g.y, g.w, g.h);
    }
    for (let k = 0; k < inners.length; k++) {
      const lit = innerLit[k] * (still ? 1 : 0.95 + 0.05 * Math.sin(time * 1.1 - k * 0.7));
      if (lit < 0.004) continue;
      const g = inners[k];
      ctx.globalAlpha = lit;
      ctx.drawImage(g.canvas, g.x, g.y, g.w, g.h);
    }
    ctx.globalAlpha = 1;
  }

  return {
    count: S, x, y, px, py, heading, pHeading, size, depth, glow, beat, mode,
    step, finish, paint, drawLines,
    get stage() {
      return stage;
    },
    resize(nw: number, nh: number) {
      const kx = nw / W, ky = nh / H;
      const oldX = Float32Array.from(slotX), oldY = Float32Array.from(slotY);
      W = nw;
      H = nh;
      layout();
      for (let i = 0; i < S; i++) {
        if (mode[i] === SEEKING && dock[i] > 0.5) {
          // Fish on station move with their station.
          x[i] += slotX[slot[i]] - oldX[slot[i]];
          y[i] += slotY[slot[i]] - oldY[slot[i]];
        } else {
          x[i] *= kx;
          y[i] *= ky;
        }
        px[i] = x[i];
        py[i] = y[i];
      }
    },
  };
}

export type Signet = ReturnType<typeof createSignet>;
