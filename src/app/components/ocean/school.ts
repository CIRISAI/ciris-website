// The three schools.
//
// Each fish steers by its nearest neighbours in its own school: at most
// seven of them, whoever they are, rather than everyone inside some radius.
// That is the rule measured in real flocks (Ballerini et al., 2008: starlings
// track six to seven neighbours regardless of how far away those are), and it
// is what lets a school stretch thin round the whale shark and close up again
// without tearing. On top of the classic three (keep apart, match heading,
// stay together) sit a slow current each school follows, and the whales.
//
// For speed the fish live in flat typed arrays and the neighbour search runs
// over a uniform grid (one cell-list per school), so a step costs about the
// same for 370 fish as for 37: each fish looks at the 3×3 cells around it.

import type { Whale } from "./whale";
import { TAU, seeded } from "./art";

/** Neighbours a fish tracks. */
const K = 7;

const CURRENTS = [
  { x: 0.29, y: 0.25, dir: 1, phase: -0.75, rate: 0.235, depth: 0.89, span: 0.29 },
  { x: 0.71, y: 0.45, dir: -1, phase: 2.39, rate: 0.206, depth: 0.72, span: 0.27 },
  { x: 0.43, y: 0.64, dir: 1, phase: -0.26, rate: 0.184, depth: 0.59, span: 0.28 },
] as const;

export const SCHOOLS = CURRENTS.length;

export function createSchool(w: number, h: number) {
  let W = w;
  let H = h;
  const small = w < 580;
  const counts = small ? [92, 79, 72] : [142, 121, 106];
  const n = counts[0] + counts[1] + counts[2];
  const f32 = () => new Float32Array(n);
  const x = f32(), y = f32(), px = f32(), py = f32(), vx = f32(), vy = f32();
  const nx = f32(), ny = f32();
  const heading = f32(), pHeading = f32(), roll = f32(), pRoll = f32();
  const phase = f32(), depth = f32(), spacing = f32(), size = f32(), panic = f32();
  const group = new Uint8Array(n);
  const alive = new Uint8Array(n).fill(1);

  const random = seeded(8702);
  let i = 0;
  counts.forEach((count, g) => {
    const c = CURRENTS[g];
    for (let j = 0; j < count; j++, i++) {
      const u = random() * 2 - 1;
      const v = random() + random() + random() - 1.5;
      const scale = random();
      const layer = random();
      x[i] = px[i] = W * (c.x + u * (c.span + (small ? 0.03 : 0)));
      y[i] = py[i] = H * (c.y + v * (0.052 + 0.106 * (1 - u * u)) - Math.sin(u * 2.9) * 0.057 * c.dir);
      vx[i] = c.dir * H * (0.06 + random() * 0.045);
      vy[i] = H * (random() - 0.5) * 0.045;
      heading[i] = pHeading[i] = Math.atan2(vy[i], vx[i]);
      phase[i] = random() * TAU;
      depth[i] = c.depth * (0.34 + layer * 0.66);
      spacing[i] = 0.73 + 0.53 * random();
      size[i] = ((small ? 4.9 : 5.2) + scale * (small ? 6.2 : 9.6)) * (0.73 + 0.32 * layer);
      group[i] = g;
    }
  });

  // ---- the grid -----------------------------------------------------------
  let cell = 1, cols = 1, rows = 1;
  let heads = new Int16Array(1);
  const next = new Int16Array(n);
  const nearest = new Int16Array(K);
  const nearD = new Float32Array(K);
  function layout() {
    const personal = Math.max(13, Math.min(W * 0.081, H * 0.086));
    cell = personal * 1.7;
    cols = Math.ceil(W / cell) + 2;
    rows = Math.ceil(H / cell) + 2;
    heads = new Int16Array(cols * rows * SCHOOLS);
    return personal;
  }
  let personal = layout();
  const cellOf = (v: number, max: number) => {
    const c = Math.floor(v / cell) + 1;
    return c < 0 ? 0 : c >= max ? max - 1 : c;
  };

  function step(dt: number, time: number, whales: readonly Whale[]) {
    heads.fill(-1);
    const plane = cols * rows;
    for (let i = 0; i < n; i++) {
      if (!alive[i]) continue;
      const c = group[i] * plane + cellOf(y[i], rows) * cols + cellOf(x[i], cols);
      next[i] = heads[c];
      heads[c] = i;
    }

    for (let g = 0; g < SCHOOLS; g++) {
      const cur = CURRENTS[g];
      const a = time * cur.rate + cur.phase;
      const guideX = W * (0.5 + Math.sin(a) * 0.3);
      const guideY = H * (cur.y + Math.sin(a * 1.35 + g * 0.61) * 0.088);
      const cruiseX = Math.cos(a) * H * 0.092;
      const cruiseY = Math.cos(a * 1.35 + g * 0.61) * H * 0.037;
      const bias = cur.y < 0.45 ? -0.39 : 0.39;

      for (let i = 0; i < n; i++) {
        if (!alive[i] || group[i] !== g) continue;
        const fx0 = x[i], fy0 = y[i];

        // The seven nearest, from the nine cells around this fish.
        let found = 0;
        const cx0 = cellOf(fx0, cols), cy0 = cellOf(fy0, rows);
        for (let cy = cy0 > 0 ? cy0 - 1 : 0; cy <= cy0 + 1 && cy < rows; cy++) {
          for (let cx = cx0 > 0 ? cx0 - 1 : 0; cx <= cx0 + 1 && cx < cols; cx++) {
            for (let j = heads[g * plane + cy * cols + cx]; j >= 0; j = next[j]) {
              if (j === i) continue;
              const dx = x[j] - fx0, dy = y[j] - fy0;
              const d = dx * dx + dy * dy;
              if (found === K && d >= nearD[K - 1]) continue;
              let k = found < K ? found++ : K - 1;
              while (k > 0 && d < nearD[k - 1]) {
                nearD[k] = nearD[k - 1];
                nearest[k] = nearest[k - 1];
                k--;
              }
              nearD[k] = d;
              nearest[k] = j;
            }
          }
        }

        let cohX = 0, cohY = 0, aliX = 0, aliY = 0, sepX = 0, sepY = 0;
        const room = personal * spacing[i];
        for (let k = 0; k < found; k++) {
          const j = nearest[k];
          const dx = x[j] - fx0, dy = y[j] - fy0;
          const d = Math.max(0.01, Math.sqrt(nearD[k]));
          cohX += dx;
          cohY += dy;
          aliX += vx[j] - vx[i];
          aliY += vy[j] - vy[i];
          const crowd = Math.max(0, 1 - d / room);
          sepX -= (dx / d) * crowd * crowd;
          sepY -= (dy / d) * crowd * crowd;
        }

        const wave = Math.sin((fx0 / W) * 9 - time * 1.05 + g * 1.5);
        const eddy = Math.sin((fy0 / H) * 8 + (fx0 / W) * 5 + time * 0.54 + g * 0.71);
        let fx = cohX * 0.077 + aliX * 0.16 + sepX * H * 0.39 + (cruiseX - vx[i]) * 0.48 + (guideX - fx0) * 0.12 + eddy * H * 0.022;
        let fy = cohY * 0.11 + aliY * 0.16 + sepY * H * 0.39 + (cruiseY - vy[i]) * 0.49 + (guideY - fy0) * 0.34 + wave * H * 0.056;

        let fright = 0;
        for (let s = 0; s < whales.length; s++) {
          const wh = whales[s];
          if (wh.presence <= 0) continue;
          const hx = wh.hx, hy = wh.hy;
          const cxr = fx0 - wh.x, cyr = fy0 - wh.y;
          if (Math.abs(cxr) > wh.size * 3.2 || Math.abs(cyr) > wh.size * 2.2) continue;
          const pace = Math.hypot(wh.vx, wh.vy) / (wh.size * 0.39);
          // Fish read the water ahead of the snout, not the animal's middle.
          const rx = cxr - hx * wh.size * 0.3, ry = cyr - hy * wh.size * 0.3;
          const along = rx * hx + ry * hy;
          const lat = ry * hx - rx * hy;
          const reach = wh.size + H * 0.14;
          const d = Math.hypot(along, lat * 1.18);
          if (d < reach) {
            const near = (1 - d / reach) ** 2;
            const push = near * H * 1.19 * wh.presence * (0.75 + 0.25 * Math.min(4, pace));
            const ahead = (along / Math.max(d, 8)) * push * 0.66;
            // Bank round the animal's centreline instead of bouncing off it.
            const side = Math.tanh(lat / (H * 0.043) + bias * hx) * push;
            fx += hx * ahead - hy * side;
            fy += hy * ahead + hx * side;
            if (near > fright) fright = near;
          }
          // A broad, gentler wake keeps the school turning after it has passed.
          const trail = -(cxr * hx + cyr * hy) / wh.size;
          const off = Math.abs(cyr * hx - cxr * hy);
          if (trail > 0 && trail < 1.9 && off < reach * 0.63) {
            const wake =
              Math.sin((Math.PI * trail) / 1.9) ** 2 * (1 - off / (reach * 0.63)) ** 2 * H * 0.21 * wh.presence * Math.min(1.6, pace);
            const sway = Math.sin(trail * 2.1 + g) * wake * 0.62;
            fx += hx * wake * 0.8 - hy * sway;
            fy += hy * wake * 0.8 + hx * sway;
          }
        }
        // A startled fish may sprint for a moment; calm ones keep the school's pace.
        panic[i] = Math.max(fright, panic[i] * Math.exp(-dt * 1.6));

        fx += Math.max(0, W * 0.045 - fx0) * 1.5 - Math.max(0, fx0 - W * 0.955) * 1.5;
        fy += Math.max(0, H * 0.13 - fy0) * 1.6 - Math.max(0, fy0 - H * 0.8) * 1.6;
        let ux = vx[i] + fx * dt, uy = vy[i] + fy * dt;
        const speed = Math.hypot(ux, uy);
        const max = H * 0.215 * (1 + 0.85 * panic[i]);
        if (speed > max) {
          ux *= max / speed;
          uy *= max / speed;
        }
        nx[i] = ux;
        ny[i] = uy;
      }
    }

    // Everyone read the same frame; now everyone moves together.
    for (let i = 0; i < n; i++) {
      if (!alive[i]) continue;
      px[i] = x[i];
      py[i] = y[i];
      pHeading[i] = heading[i];
      pRoll[i] = roll[i];
      vx[i] = nx[i];
      vy[i] = ny[i];
      const speed = Math.hypot(vx[i], vy[i]);
      const yaw = Math.atan2(vy[i], vx[i]) - heading[i];
      const turn = Math.atan2(Math.sin(yaw), Math.cos(yaw));
      heading[i] += turn * (1 - Math.exp(-dt * Math.min(6.8, speed * 0.25)));
      const ripple = 0.16 + 0.15 * Math.sin((x[i] / W) * 9 - time * 1.05 + group[i] * 1.5 + phase[i] * 0.39);
      roll[i] += (Math.min(0.9, ripple + Math.abs(turn) * 0.53) - roll[i]) * (1 - Math.exp(-dt * 4.6));
      x[i] += vx[i] * dt;
      y[i] += vy[i] * dt;
    }
  }

  /**
   * The fish of school `g` closest to a point, among those in plain view.
   * The signet recruits with this: a real fish leaves, its schoolmates swim on.
   */
  function closest(g: number, gx: number, gy: number): number {
    let best = -1, score = Infinity;
    for (let i = 0; i < n; i++) {
      if (!alive[i] || group[i] !== g) continue;
      if (x[i] < W * 0.035 || x[i] > W * 0.965 || y[i] < H * 0.12 || y[i] > H * 0.78) continue;
      const d = (x[i] - gx) ** 2 + (y[i] - gy) ** 2;
      if (d < score) {
        score = d;
        best = i;
      }
    }
    if (best < 0) for (let i = 0; i < n && best < 0; i++) if (alive[i] && group[i] === g) best = i;
    return best;
  }

  return {
    n, small, x, y, px, py, vx, vy, heading, pHeading, roll, pRoll, phase, depth, size, group, alive,
    step,
    closest,
    resize(nw: number, nh: number) {
      const kx = nw / W, ky = nh / H;
      for (let i = 0; i < n; i++) {
        x[i] *= kx;
        px[i] *= kx;
        y[i] *= ky;
        py[i] *= ky;
        vy[i] *= ky;
        vx[i] *= ky;
      }
      W = nw;
      H = nh;
      personal = layout();
    },
  };
}

export type School = ReturnType<typeof createSchool>;
