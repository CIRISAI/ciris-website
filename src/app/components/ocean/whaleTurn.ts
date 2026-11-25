// A whale shark turning round, in three dimensions.
//
// The side-view artwork is wrapped over a tube: every ring of the tube takes
// its height from the drawing and its width from WIDTH, and the rings follow
// a centreline that curves with the turn. Seen square from the side the tube
// projects exactly onto the drawing, so a turn can start and end without a
// jump; seen from the front the two flanks meet, and the eyes, mouth, spots
// and gills already in the drawing make the face.
//
// The fins are flat pieces of the same drawing: dorsals and tail in the
// body's own plane, the pectorals spread out and down from each flank.
//
// Everything is small textured parallelograms, drawn far to near into a
// scratch canvas. It only runs while an animal is turning.

import { Palette, WHALE, WHALE_NOSE, WHALE_TAIL, clamp01, mix, rgba, smooth, whaleSprite } from "./art";
import { type Whale, spine } from "./whale";

const HALF_X = 1.5, HALF_Y = 0.78;
/** Camera distance in body units. */
const CAMERA = 4.6;
const AROUND = 20;
/** Where the mouth meets the tip of the snout. */
const MOUTH = -0.013;
/** Body coordinates of the rings, closer together at the blunt nose. */
const RINGS = [
  -0.94, -0.86, -0.78, -0.7, -0.62, -0.54, -0.46, -0.38, -0.3, -0.22, -0.14, -0.06, 0.02, 0.1, 0.18, 0.26, 0.34,
  0.42, 0.5, 0.58, 0.65, 0.71, 0.76, 0.8, 0.83, 0.855, 0.872, 0.884, 0.892,
];
/** Half-width of the body: a broad, flat head and a narrow tail stock. */
const WIDTH: readonly (readonly [number, number])[] = [
  [-0.94, 0.028], [-0.7, 0.045], [-0.4, 0.096], [0, 0.168], [0.3, 0.2], [0.55, 0.205], [0.74, 0.192], [0.83, 0.17],
  [0.872, 0.135], [0.892, 0.06],
];

function widthAt(u: number) {
  for (let i = 1; i < WIDTH.length; i++) {
    if (u <= WIDTH[i][0]) {
      const [u0, w0] = WIDTH[i - 1], [u1, w1] = WIDTH[i];
      return w0 + (w1 - w0) * ((u - u0) / (u1 - u0));
    }
  }
  return WIDTH[WIDTH.length - 1][1];
}

/** How far it is from lying square to the camera, 0 at rest. */
function swing(s: Whale) {
  const off = (a: number) => Math.min(Math.abs(a), Math.abs(a - Math.PI));
  return Math.max(off(s.yaw[0]), off(s.yaw[1]), off(s.yaw[2]), Math.abs(s.yaw[0] - s.yaw[2]));
}
export const turning = (s: Whale) => swing(s) > 0.012;

interface Cell {
  z: number;
  tex: HTMLCanvasElement;
  alpha: number;
  /** Source rectangle, in pixels. */
  sx: number; sy: number; sw: number; sh: number;
  /** Centre and half-edges on screen, in pixels. */
  cx: number; cy: number; ux: number; uy: number; vx: number; vy: number;
}

export function whaleTurn(palette: Palette, light: boolean, pxPerUnit: number) {
  let parts: Record<"trunk" | "crest" | "fin" | "finFar", HTMLCanvasElement> | null = null;
  let canvas: HTMLCanvasElement, g: CanvasRenderingContext2D;
  let mid: Float32Array, tall: Float32Array;
  let snout: string[] = [];
  const lip = rgba(mix(palette.shark, palette.rim, light ? 0.38 : 0.27), 1);
  const cells: Cell[] = [];
  let used = 0;

  /** The first turn of a visit paints the parts; most visits never need it. */
  function prepare() {
    const part = (l: "trunk" | "crest" | "fin" | "finFar") => whaleSprite(palette, light, pxPerUnit, l);
    parts = { trunk: part("trunk"), crest: part("crest"), fin: part("fin"), finFar: part("finFar") };
    canvas = document.createElement("canvas");
    canvas.width = Math.ceil(HALF_X * 2 * pxPerUnit);
    canvas.height = Math.ceil(HALF_Y * 2 * pxPerUnit);
    g = canvas.getContext("2d")!;
    // Read the drawing's own outline: where its back and belly are.
    const { width: w, height: h } = parts.trunk;
    const px = parts.trunk.getContext("2d")!.getImageData(0, 0, w, h).data;
    mid = new Float32Array(RINGS.length);
    tall = new Float32Array(RINGS.length);
    RINGS.forEach((u, r) => {
      const col = Math.max(0, Math.min(w - 1, Math.round((u - WHALE.x0) * pxPerUnit)));
      let top = -1, bottom = -1;
      for (let row = 0; row < h; row++) {
        if (px[(row * w + col) * 4 + 3] > 120) {
          if (top < 0) top = row;
          bottom = row + 1;
        }
      }
      if (top < 0) {
        mid[r] = r ? mid[r - 1] : 0;
        tall[r] = r ? tall[r - 1] * 0.8 : 0.02;
      } else {
        mid[r] = WHALE.y0 + (top + bottom) / 2 / pxPerUnit;
        tall[r] = (bottom - top) / 2 / pxPerUnit;
      }
    });
    const last = RINGS.length - 1;
    const col = Math.max(0, Math.round((0.868 - WHALE.x0) * pxPerUnit));
    snout = [-0.8, -0.4, 0, 0.4, 0.8].map((f) => {
      const row = Math.round((mid[last] + f * tall[last] - WHALE.y0) * pxPerUnit);
      const at4 = (row * w + col) * 4;
      return `rgb(${px[at4]},${px[at4 + 1]},${px[at4 + 2]})`;
    });
  }

  function assemble(s: Whale, k: number, pitch: number) {
    if (!parts) prepare();
    const p = parts!;
    const yaw = [0, 1, 2].map((i) => s.pYaw[i] + (s.yaw[i] - s.pYaw[i]) * k);
    const deep = smooth(clamp01(swing(s) / 0.7));
    const bank = Math.max(-0.4, Math.min(0.4, -s.yawRate * 0.2)) * deep;
    const cp = Math.cos(pitch), sp = Math.sin(pitch), cb = Math.cos(bank), sb = Math.sin(bank);
    const W2 = canvas.width / 2, H2 = canvas.height / 2;

    // ---- the centreline -----------------------------------------------------
    const N = 96;
    const uAt = (i: number) => WHALE_TAIL - 0.06 + ((WHALE_NOSE - WHALE_TAIL + 0.1) * i) / N;
    const du = uAt(1) - uAt(0);
    const theta = (u: number) => {
      const t = clamp01((u - WHALE_TAIL) / (WHALE_NOSE - WHALE_TAIL));
      const a = yaw[2] + (yaw[1] - yaw[2]) * t, b = yaw[1] + (yaw[0] - yaw[1]) * t;
      return a + (b - a) * t;
    };
    const lx = new Float32Array(N + 1), ly = new Float32Array(N + 1), lz = new Float32Array(N + 1);
    for (let i = 1; i <= N; i++) {
      const a = theta(uAt(i - 0.5));
      lx[i] = lx[i - 1] + Math.cos(a) * cp * du;
      ly[i] = ly[i - 1] + sp * du;
      lz[i] = lz[i - 1] + Math.sin(a) * cp * du;
    }
    const on = (arr: Float32Array, u: number) => {
      const f = Math.max(0, Math.min(N - 0.001, (u - uAt(0)) / du));
      const i = Math.floor(f);
      return arr[i] + (arr[i + 1] - arr[i]) * (f - i);
    };
    const zx = on(lx, 0), zy = on(ly, 0), zz = on(lz, 0);

    // A point of the animal: u along it, v down its side, l out from its
    // middle plane. Returns canvas pixels and depth.
    const out = { x: 0, y: 0, z: 0 };
    const place = (u: number, v: number, l: number) => {
      const a = theta(u), ca = Math.cos(a), sa = Math.sin(a);
      const v1 = v * cb - l * sb, l1 = v * sb + l * cb;
      const X = on(lx, u) - zx - sp * ca * v1 - sa * l1;
      const Y = on(ly, u) - zy + cp * v1 + spine(u, s);
      const Z = on(lz, u) - zz - sp * sa * v1 + ca * l1;
      const f = 1 + deep * (CAMERA / (CAMERA - Z) - 1);
      out.x = W2 + X * f * pxPerUnit;
      out.y = H2 + Y * f * pxPerUnit;
      out.z = Z;
      return out;
    };

    const quad = (
      tex: HTMLCanvasElement, alpha: number, u0: number, u1: number, v0: number, v1: number,
      a: readonly number[], b: readonly number[], c: readonly number[], d: readonly number[],
    ) => {
      // a (u0,v0)  b (u1,v0)  c (u0,v1)  d (u1,v1)
      const cell = (cells[used] ??= {} as Cell);
      used++;
      cell.tex = tex;
      cell.alpha = alpha;
      cell.sx = (u0 - WHALE.x0) * pxPerUnit;
      cell.sw = Math.max(0.5, (u1 - u0) * pxPerUnit);
      cell.sy = (v0 - WHALE.y0) * pxPerUnit;
      cell.sh = Math.max(0.5, (v1 - v0) * pxPerUnit);
      cell.cx = (a[0] + b[0] + c[0] + d[0]) / 4;
      cell.cy = (a[1] + b[1] + c[1] + d[1]) / 4;
      cell.ux = (b[0] - a[0] + d[0] - c[0]) / 2;
      cell.uy = (b[1] - a[1] + d[1] - c[1]) / 2;
      cell.vx = (c[0] - a[0] + d[0] - b[0]) / 2;
      cell.vy = (c[1] - a[1] + d[1] - b[1]) / 2;
      cell.z = (a[2] + b[2] + c[2] + d[2]) / 4;
    };
    const at = (u: number, v: number, l: number) => {
      const o = place(u, v, l);
      return [o.x, o.y, o.z] as const;
    };
    used = 0;

    // ---- the trunk ----------------------------------------------------------
    const R = RINGS.length;
    const ring = (r: number, j: number) => {
      const ang = (Math.PI * 2 * j) / AROUND;
      return at(RINGS[r], mid[r] - tall[r] * Math.cos(ang), widthAt(RINGS[r]) * Math.sin(ang));
    };
    const grid: (readonly number[])[][] = [];
    for (let r = 0; r < R; r++) {
      const row: (readonly number[])[] = [];
      for (let j = 0; j < AROUND; j++) row.push(ring(r, j));
      grid.push(row);
    }
    const inset = 0.97;
    for (let r = 0; r + 1 < R; r++) {
      for (let j = 0; j < AROUND; j++) {
        const j1 = (j + 1) % AROUND;
        // j walks down one flank and up the other; keep v0 above v1.
        const down = j < AROUND / 2;
        const jt = down ? j : j1, jb = down ? j1 : j;
        const a = grid[r][jt], b = grid[r + 1][jt], c = grid[r][jb], d = grid[r + 1][jb];
        const facing = (b[0] - c[0]) * (d[1] - a[1]) - (b[1] - c[1]) * (d[0] - a[0]);
        if (down ? facing <= 0 : facing >= 0) continue;
        const cosT = Math.cos((Math.PI * 2 * (down ? j : j + 1)) / AROUND);
        const cosB = Math.cos((Math.PI * 2 * (down ? j + 1 : j)) / AROUND);
        const m = (mid[r] + mid[r + 1]) / 2, t = ((tall[r] + tall[r + 1]) / 2) * inset;
        quad(p.trunk, 1, RINGS[r], RINGS[r + 1], m - t * cosT, m - t * cosB, a, b, c, d);
      }
    }
    // The blunt tip of the snout.
    const tip = grid[R - 1];
    const front = Math.sin(theta(RINGS[R - 1]));

    // ---- dorsals and tail, in the body's own plane ----------------------------
    const strips = 28;
    for (let i = 0; i < strips; i++) {
      const u0 = WHALE.x0 + ((0.1 - WHALE.x0) * i) / strips, u1 = WHALE.x0 + ((0.1 - WHALE.x0) * (i + 1)) / strips;
      quad(p.crest, 1, u0, u1, WHALE.y0, WHALE.y1, at(u0, WHALE.y0, 0), at(u1, WHALE.y0, 0), at(u0, WHALE.y1, 0), at(u1, WHALE.y1, 0));
    }

    // ---- pectorals ------------------------------------------------------------
    const V0 = 0.06, V1 = 0.385;
    for (const side of [1, -1]) {
      // How far this fin is on the far flank, 0..1.
      const far = clamp01(0.5 - side * Math.cos(yaw[1]) * 0.5);
      const fin = (u: number, v: number) =>
        at(-0.145 + (u + 0.145) * (1 - 0.25 * far), 0.07 + (v - 0.068) * (1 - 0.22 * far), side * (0.14 + 0.95 * (v - V0)));
      for (let i = 0; i < 6; i++) {
        const u0 = -0.16 + (0.56 * i) / 6, u1 = -0.16 + (0.56 * (i + 1)) / 6;
        const a = fin(u0, V0), b = fin(u1, V0), c = fin(u0, V1), d = fin(u1, V1);
        if (far < 1) quad(p.fin, 1 - smooth(far), u0, u1, V0, V1, a, b, c, d);
        if (far > 0) quad(p.finFar, smooth(far), u0, u1, V0, V1, a, b, c, d);
      }
    }

    // ---- far to near ----------------------------------------------------------
    const order = cells.slice(0, used).sort((m, n) => m.z - n.z);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    for (const c of order) {
      // Grow each piece a little over its neighbours, so no seams show.
      const lu = Math.hypot(c.ux, c.uy) || 1, lv = Math.hypot(c.vx, c.vy) || 1;
      // (Not so much on the translucent fins, where an overlap would show.)
      const gu = 1 + (c.tex === p.trunk ? 1.1 : 0.12) / Math.max(lu, 0.6), gv = 1 + 1.1 / Math.max(lv, 0.6);
      g.globalAlpha = c.alpha;
      g.setTransform((c.ux * gu) / c.sw, (c.uy * gu) / c.sw, (c.vx * gv) / c.sh, (c.vy * gv) / c.sh, c.cx, c.cy);
      g.drawImage(c.tex, c.sx, c.sy, c.sw, c.sh, -c.sw / 2, -c.sh / 2, c.sw, c.sh);
    }
    g.globalAlpha = 1;
    // Close the snout: the skin tones read off the drawing just behind it, with
    // the mouth carried across from one flank to the other.
    if (front > 0.02) {
      let x = 0, y = 0;
      for (const q of tip) {
        x += q[0] / AROUND;
        y += q[1] / AROUND;
      }
      const top = tip[0], bottom = tip[AROUND / 2];
      const tone = g.createLinearGradient(top[0], top[1], bottom[0], bottom[1]);
      snout.forEach((c, i) => tone.addColorStop(i / (snout.length - 1), c));
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.fillStyle = tone;
      g.beginPath();
      tip.forEach((q, i) => {
        const qx = x + (q[0] - x) * 1.05, qy = y + (q[1] - y) * 1.05;
        if (i) g.lineTo(qx, qy);
        else g.moveTo(qx, qy);
      });
      g.fill();
      const l = at(RINGS[R - 1], MOUTH, widthAt(RINGS[R - 1])), r = at(RINGS[R - 1], MOUTH, -widthAt(RINGS[R - 1]));
      g.globalAlpha = smooth(clamp01(front * 1.6)) * 0.8;
      g.strokeStyle = lip;
      g.lineWidth = 0.0085 * pxPerUnit;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(l[0], l[1]);
      g.quadraticCurveTo(x, (l[1] + r[1]) / 2 - 0.012 * pxPerUnit, r[0], r[1]);
      g.stroke();
      g.globalAlpha = 1;
    }
    return { canvas, pxPerUnit };
  }

  return { assemble };
}

export type WhaleTurn = ReturnType<typeof whaleTurn>;
