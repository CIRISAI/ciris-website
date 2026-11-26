// The whale sharks. The lead animal is a steering agent: left alone it
// cruises back and forth across the water, turning round out of sight; when
// the visitor's pointer (or finger) is over the water it swims to it, and the
// schools part around it. The second, smaller one stays in the background on
// its own slow path.
//
// The body is a single image bent along its spine. Each frame the straight
// sprite is cut into vertical strips and every strip is sheared so its ends
// meet its neighbours' exactly: a continuous travelling wave from nose to
// tail tip, with no hinge anywhere for the tail to come off at.
//
// Turning round, it is a solid: the same artwork is wrapped over a tube and
// swung through the camera, head first and tail last (whaleTurn.ts).

import { TAU, WHALE, WHALE_NOSE, WHALE_TAIL, clamp01, seeded, smooth, smoothstep } from "./art";
import { type WhaleTurn, turning } from "./whaleTurn";

export interface Whale {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  /** Unit heading, for the fish to read. */
  hx: number;
  hy: number;
  size: number;
  /** 0..1: how much the fish should mind it (fades in with the animal). */
  presence: number;
  opacity: number;
  /**
   * Heading in the horizontal plane: 0 swims right, π left, and in between it
   * is coming toward the camera. The head leads, the middle follows it, the
   * tail follows the middle; that lag is the curve of the body in a turn.
   */
  yaw: Float32Array;
  pYaw: Float32Array;
  /** Which way it means to go (0 or π), and how fast the head is turning. */
  course: number;
  yawRate: number;
  /** Speed along its own heading. */
  fwd: number;
  /** Nearness to the camera gained in a turn, in body units. */
  z: number;
  pz: number;
  /** Nose-down angle in the animal's own (unflipped) frame. */
  pitch: number;
  pPitch: number;
  /** Smoothed pitch rate: the tail lags a turn. */
  bend: number;
  /** Tail-beat phase, advanced faster when it swims harder. */
  beat: number;
  /** 0..1 of top speed, smoothed: drives the amplitude of the stroke. */
  effort: number;
}

export interface Pointer {
  x: number;
  y: number;
  /** True while the visitor is steering. */
  active: boolean;
}

const MARGIN = 0.26; // head-room in the warp buffer, in whale units
const STRIPS = 44;

function blank(size: number, opacity: number): Whale {
  return {
    x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, hx: 1, hy: 0, size, presence: 0, opacity,
    yaw: new Float32Array(3), pYaw: new Float32Array(3), course: 0, yawRate: 0, fwd: 0, z: 0, pz: 0, pitch: 0, pPitch: 0, bend: 0, beat: 0, effort: 0.3,
  };
}

/** Point it one way at once (the opening, and the still picture). */
export function setCourse(s: Whale, left: boolean) {
  s.course = left ? Math.PI : 0;
  s.yaw.fill(s.course);
  s.pYaw.fill(s.course);
  s.yawRate = 0;
  s.hx = left ? -1 : 1;
}

export function createWhales(w: number, h: number, introSeconds: number) {
  let W = w;
  let H = h;
  const sizeFor = () => Math.min(W * 0.25, H * 0.38);
  const lead = blank(sizeFor(), 0.7);
  const far = blank(sizeFor() * 0.75, 0.43);
  far.beat = 2.9;

  // The lead starts just out of frame on the right, as in the prototype.
  lead.x = lead.px = W + lead.size * 1.35;
  lead.y = lead.py = H * 0.49;
  setCourse(lead, true);
  lead.presence = 1;
  const rand = seeded(5171);
  let goingLeft = true;
  let wayY = 0.47;

  function stepLead(dt: number, time: number, pointer: Pointer) {
    const s = lead;
    s.px = s.x;
    s.py = s.y;
    before(s);
    const top = s.size * 1.6;
    const cruise = Math.max(W * 0.0565, s.size * 0.3);
    let tx: number, ty: number, want: number, grip: number;
    // How quickly it answers a change of mind: slow when called, like a big animal.
    let ease = 1.7;
    if (pointer.active) {
      tx = pointer.x;
      ty = Math.max(H * 0.14, Math.min(H * 0.78, pointer.y));
      const d = Math.hypot(tx - s.x, ty - s.y);
      // Ease to a stop with the pointer somewhere on its head, not its middle.
      want = top * 0.55 * smoothstep(s.size * 0.22, s.size * 1.7, d);
      grip = H * 0.45;
      ease = 0.9;
    } else if (time < introSeconds) {
      // The opening belongs to the schools: wait off-screen.
      tx = s.x;
      ty = s.y;
      want = 0;
      grip = H * 0.3;
    } else {
      tx = goingLeft ? -s.size * 1.45 : W + s.size * 1.45;
      const swell = time * 0.17;
      ty = H * (wayY + 0.066 * Math.sin(swell) + 0.013 * Math.sin(swell * 2));
      if (goingLeft ? s.x < tx + s.size * 0.2 : s.x > tx - s.size * 0.2) {
        goingLeft = !goingLeft;
        wayY = 0.36 + rand() * 0.24;
      }
      // Level off toward the lane rather than diving straight at it.
      const dy = ty - s.y;
      ty = s.y + Math.max(-H * 0.2, Math.min(H * 0.2, dy));
      tx = s.x + (goingLeft ? -1 : 1) * Math.max(Math.abs(dy) * 2.4, s.size);
      want = cruise;
      grip = H * 0.28;
    }
    const dx = tx - s.x;
    const dy = ty - s.y;
    const d = Math.hypot(dx, dy) || 1;
    const wantX = (dx / d) * want, wantY = (dy / d) * want;
    // It changes its mind about direction only for something well behind it,
    // and it cannot swim backwards: it turns, carrying its way round the bend.
    if (want > 0 && Math.abs(dx) > s.size * 0.4) s.course = dx > 0 ? 0 : Math.PI;
    steer(s, dt);
    const turning = Math.abs(s.course - s.yaw[1]) > 0.3;
    const ahead = Math.max(0, s.course === 0 ? wantX : -wantX);
    const goal = turning ? Math.max(s.size * 0.42, Math.min(ahead, s.size * 0.8)) : ahead;
    const cap = (a: number) => Math.max(-grip, Math.min(grip, a));
    // A big animal: it cannot change its speed faster than this.
    s.fwd += cap((goal - s.fwd) * ease) * dt;
    s.vy += cap((wantY - s.vy) * ease) * dt;
    s.vx = s.fwd * Math.cos(s.yaw[1]);
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.z += ((s.fwd / s.size) * Math.sin(s.yaw[1]) * 1.2 - s.z * 0.45) * dt;
    pose(s, dt, top);
  }

  function stepFar(dt: number, time: number) {
    const s = far;
    s.px = s.x;
    s.py = s.y;
    before(s);
    const period = 46;
    const at = (t: number) => {
      const phase = ((t + 26) % period) / period;
      const glide = phase + 0.037 * Math.sin(TAU * phase);
      const swell = TAU * phase + 0.8;
      return {
        x: W * (-0.53 + 2.09 * glide),
        y: H * (0.31 + 0.066 * Math.sin(swell) + 0.013 * Math.sin(swell * 2)),
      };
    };
    const now = at(time);
    const next = at(time + 0.05);
    const wrapped = next.x < now.x;
    s.x = now.x;
    s.y = now.y;
    if (wrapped || Math.abs(s.x - s.px) > W * 0.5) {
      s.px = s.x;
      s.py = s.y;
    } else {
      s.vx = (next.x - now.x) / 0.05;
      s.vy = (next.y - now.y) / 0.05;
    }
    const entering = clamp01((time - introSeconds) / 2.5);
    s.presence = smooth(entering);
    pose(s, dt, s.size * 1.6);
  }

  function before(s: Whale) {
    s.pYaw.set(s.yaw);
    s.pPitch = s.pitch;
    s.pz = s.z;
  }

  /** Bring the head round to its course; the body and then the tail follow. */
  function steer(s: Whale, dt: number) {
    const w = 2.3;
    s.yawRate += (w * w * (s.course - s.yaw[0]) - 2 * w * s.yawRate) * dt;
    s.yawRate = Math.max(-1.7, Math.min(1.7, s.yawRate));
    s.yaw[0] += s.yawRate * dt;
    s.yaw[1] += (s.yaw[0] - s.yaw[1]) * (1 - Math.exp(-dt * 3));
    s.yaw[2] += (s.yaw[1] - s.yaw[2]) * (1 - Math.exp(-dt * 2.6));
  }

  /** Pitch, tail lag and stroke, all derived from how it is moving. */
  function pose(s: Whale, dt: number, top: number) {
    const speed = Math.hypot(s.vx, s.vy);
    const lean = Math.atan2(s.vy, Math.max(Math.abs(s.vx), s.fwd) + s.size * 0.18);
    const pitchWant = Math.max(-0.55, Math.min(0.55, lean)) * clamp01(speed / (s.size * 0.25))
      // It levels out to turn.
      * (1 - 0.6 * Math.sin(s.yaw[1]));
    const was = s.pitch;
    s.pitch += (pitchWant - s.pitch) * (1 - Math.exp(-dt * 2.2));
    s.bend += ((s.pitch - was) / dt - s.bend) * (1 - Math.exp(-dt * 3));
    s.effort += (clamp01(Math.max(speed / top, Math.abs(s.yawRate) * 0.3)) - s.effort) * (1 - Math.exp(-dt * 1.5));
    s.beat += dt * (1.15 + 3.1 * s.effort);
    if (speed > s.size * 0.08) {
      s.hx = s.vx / speed;
      s.hy = s.vy / speed;
    } else {
      s.hx = s.yaw[1] > Math.PI / 2 ? -1 : 1;
      s.hy = 0;
    }
  }

  return {
    list: [far, lead] as const,
    lead,
    step(dt: number, time: number, pointer: Pointer) {
      stepLead(dt, time, pointer);
      stepFar(dt, time);
    },
    /** Keep everything where it is, proportionally, when the water resizes. */
    resize(nw: number, nh: number) {
      const kx = nw / W;
      const ky = nh / H;
      W = nw;
      H = nh;
      for (const s of [lead, far]) {
        s.x *= kx;
        s.px *= kx;
        s.y *= ky;
        s.py *= ky;
      }
      lead.size = sizeFor();
      far.size = sizeFor() * 0.75;
    },
  };
}

// ---- drawing ---------------------------------------------------------------

/** Sideways (on screen: vertical) offset of the spine at body coordinate u. */
export function spine(u: number, s: Whale): number {
  const t = clamp01((WHALE_NOSE - u) / (WHALE_NOSE - WHALE_TAIL)); // 0 nose → 1 tail tip
  const amp = (0.004 + 0.074 * Math.pow(t, 2.3)) * (0.7 + 0.75 * s.effort);
  const lag = Math.max(-0.3, Math.min(0.3, s.bend * 0.45));
  return amp * Math.sin(s.beat - 4.4 * t) + lag * (WHALE_NOSE - WHALE_TAIL) * 0.5 * t * t;
}

export interface WhaleBuffer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** The simulation step the bent body was last assembled for. */
  stamp: number;
}

/** A scratch canvas the bent body is assembled in, one per animal. */
export function whaleBuffer(sprite: HTMLCanvasElement, pxPerUnit: number): WhaleBuffer {
  const canvas = document.createElement("canvas");
  canvas.width = sprite.width;
  canvas.height = sprite.height + Math.ceil(MARGIN * pxPerUnit) * 2;
  return { canvas, ctx: canvas.getContext("2d")!, stamp: -1 };
}

function bend(s: Whale, sprite: HTMLCanvasElement, buffer: WhaleBuffer, pxPerUnit: number, margin: number) {
  const g = buffer.ctx;
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, buffer.canvas.width, buffer.canvas.height);
  const SW = sprite.width;
  const SH = sprite.height;
  let x0 = 0;
  let o0 = spine(WHALE.x0, s) * pxPerUnit;
  for (let i = 1; i <= STRIPS; i++) {
    const x1 = Math.round((i * SW) / STRIPS);
    const o1 = spine(WHALE.x0 + x1 / pxPerUnit, s) * pxPerUnit;
    const width = Math.min(SW - x0, x1 - x0 + 1);
    g.setTransform(1, (o1 - o0) / (x1 - x0), 0, 1, x0, margin + o0);
    g.drawImage(sprite, x0, 0, width, SH, 0, 0, width, SH);
    x0 = x1;
    o0 = o1;
  }
}

export function drawWhale(
  ctx: CanvasRenderingContext2D,
  s: Whale,
  k: number,
  sprite: HTMLCanvasElement,
  buffer: WhaleBuffer,
  pxPerUnit: number,
  dpr: number,
  w: number,
  time: number,
  step: number,
  turn: WhaleTurn,
) {
  const x = s.px + (s.x - s.px) * k;
  const y = s.py + (s.y - s.py) * k;
  if (x < -s.size * 1.6 || x > w + s.size * 1.6 || s.opacity * s.presence <= 0.003) return;

  const pitch = s.pPitch + (s.pitch - s.pPitch) * k;
  const roll = 0.95 + 0.055 * Math.cos(time * 0.58 + s.beat * 0.1);
  const near = 1 + 0.2 * Math.max(0, s.pz + (s.z - s.pz) * k);
  if (turning(s)) {
    const art = turn.assemble(s, k, pitch);
    const unit = (s.size / art.pxPerUnit) * near;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = s.opacity * s.presence;
    const cw = art.canvas.width * unit, ch = art.canvas.height * unit * roll;
    ctx.drawImage(art.canvas, x - cw / 2, y - ch / 2, cw, ch);
    ctx.globalAlpha = 1;
    return;
  }

  // Assemble the bent body opaque in the buffer, then lay it into the water
  // translucent in one go, so the strips' overlap never shows as seams. The
  // stroke changes slowly, so the body is re-bent once per simulation step
  // (30 Hz), not once per displayed frame.
  const margin = Math.ceil(MARGIN * pxPerUnit);
  if (buffer.stamp !== step) bend(s, sprite, buffer, pxPerUnit, margin);
  buffer.stamp = step;

  const unit = s.size / pxPerUnit;
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.translate(x, y);
  ctx.scale((s.yaw[1] > Math.PI / 2 ? -1 : 1) * near, roll * near);
  ctx.rotate(pitch);
  ctx.globalAlpha = s.opacity * s.presence;
  ctx.drawImage(
    buffer.canvas,
    WHALE.x0 * s.size,
    WHALE.y0 * s.size - margin * unit,
    buffer.canvas.width * unit,
    buffer.canvas.height * unit,
  );
  ctx.restore();
}
