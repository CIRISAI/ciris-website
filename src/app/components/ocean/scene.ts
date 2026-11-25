// The underwater hero, assembled: schools, whale sharks, the fish signet, and
// the loop that runs them. Framework-free; OceanCanvas.tsx is the React seam.
//
// Where the time goes, and what was done about it:
//   · simulation runs at a fixed 30 Hz and the picture interpolates between
//     steps, so motion is equally smooth at 60 and 120 Hz for half the work;
//   · neighbour search is a uniform grid over typed arrays (school.ts);
//   · every drawing is a pre-rendered sprite: a frame is ~400 drawImage calls
//     and no gradients, paths or filters;
//   · the loop stops when the water is off-screen or the tab is hidden;
//   · the backing store is capped at 1.75× and drops to 1× on a device that
//     cannot hold the frame rate.

import {
  FISH_FRAMES, FISH_H, FISH_W, PALETTES, Palette, TAU, clamp01, fishSheet, haloSprite, rgba, seeded,
  waterBackdrop, whaleSprite,
} from "./art";
import { School, createSchool } from "./school";
import { Signet, createSignet } from "./signet";
import { Pointer, WhaleBuffer, createWhales, drawWhale, whaleBuffer } from "./whale";

/** The schools have the water to themselves for this long. */
const INTRO_SECONDS = 4.5;
const STEP = 1 / 30;
/** Where the signet's centre sits, as a fraction of the water's height. */
const SIGNET_Y = 0.49;
const MAX_DPR = 1.75;
/** A resting mouse stops steering after this long; a lifted finger sooner. */
const MOUSE_IDLE_MS = 7000;
const TOUCH_IDLE_MS = 3500;

export interface OceanScene {
  setDark(dark: boolean): void;
  destroy(): void;
}

export function createOceanScene(canvas: HTMLCanvasElement, initialDark: boolean): OceanScene {
  const maybe = canvas.getContext("2d", { alpha: false });
  if (!maybe) return { setDark() {}, destroy() {} };
  const ctx: CanvasRenderingContext2D = maybe;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  let dark = initialDark;
  let palette: Palette = dark ? PALETTES.dark : PALETTES.light;
  let w = 0, h = 0, dpr = 1, dprCap = MAX_DPR;
  let school: School | null = null;
  let signet: Signet | null = null;
  let whales: ReturnType<typeof createWhales> | null = null;
  let back: HTMLCanvasElement | null = null;
  let shoal: HTMLCanvasElement, gold: HTMLCanvasElement, halo: HTMLCanvasElement, whaleArt: HTMLCanvasElement;
  let buffers: WhaleBuffer[] = [];
  let whalePx = 1;
  let motes: { x: number; y: number; speed: number; r: number }[][] = [];
  const MOTE_ALPHA = [0.08, 0.13, 0.19];

  let time = 0, simulated = 0, lag = 0, steps = 0;
  let frame = 0, previous: number | null = null;
  let visible = false, still = reduced.matches, dead = false, dirty = true;

  // ---- the pointer --------------------------------------------------------
  // Listened for on the window, not the canvas: the headline and header sit
  // on top of the water, and the whale should follow the pointer under them.
  const pointer: Pointer = { x: 0, y: 0, active: false };
  let clientX = 0, clientY = 0, movedAt = -Infinity, idleAfter = MOUSE_IDLE_MS;
  const onPointer = (e: PointerEvent) => {
    clientX = e.clientX;
    clientY = e.clientY;
    movedAt = performance.now();
    idleAfter = e.pointerType === "mouse" ? MOUSE_IDLE_MS : TOUCH_IDLE_MS;
  };
  const onLeave = () => {
    movedAt = -Infinity;
  };
  function readPointer(now: number) {
    pointer.active = false;
    if (now - movedAt > idleAfter) return;
    const r = canvas.getBoundingClientRect();
    const x = clientX - r.left, y = clientY - r.top;
    if (x < 0 || x > r.width || y < 0 || y > r.height) return;
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
  }

  // ---- building -----------------------------------------------------------
  function populate() {
    school = createSchool(w, h);
    whales = createWhales(w, h, INTRO_SECONDS);
    signet = createSignet(w, h, school.small, SIGNET_Y, INTRO_SECONDS);
    time = simulated = lag = 0;
    if (still) pose();
  }

  /** The finished picture, for visitors who asked for no motion. */
  function pose() {
    if (!school || !signet || !whales) return;
    signet.finish(school);
    const lead = whales.lead;
    lead.x = lead.px = w * 0.19;
    lead.y = lead.py = h * 0.52;
    lead.facing = lead.pFacing = 1;
    lead.hx = 1;
  }

  function paint() {
    if (!w || !h || !signet || !whales) return;
    palette = dark ? PALETTES.dark : PALETTES.light;
    const light = !dark;
    back = waterBackdrop(palette, light, w, h, dpr);
    shoal = fishSheet(palette, light, false);
    gold = fishSheet(palette, light, true);
    halo = haloSprite(palette, light);
    // The whale is soft and translucent: it does not need the full backing
    // density, and its texture size is what the per-step bend costs.
    whalePx = Math.max(40, Math.min(whales.lead.size * Math.min(dpr, 1.25), 380));
    whaleArt = whaleSprite(palette, light, whalePx);
    buffers = [whaleBuffer(whaleArt, whalePx), whaleBuffer(whaleArt, whalePx)];
    signet.paint(palette, light, dpr);
  }

  function resize() {
    dirty = false;
    const nw = canvas.clientWidth, nh = canvas.clientHeight;
    const density = Math.min(window.devicePixelRatio || 1, dprCap);
    if (!nw || !nh || (nw === w && nh === h && density === dpr)) return;
    const first = !school;
    const regroup = !first && nw < 580 !== school!.small;
    dpr = density;
    canvas.width = Math.round(nw * dpr);
    canvas.height = Math.round(nh * dpr);
    if (first || regroup) {
      w = nw;
      h = nh;
      const keep = time;
      populate();
      // Crossing the phone breakpoint mid-visit should not replay the opening.
      if (regroup && !still) fastForward(keep);
    } else {
      school!.resize(nw, nh);
      whales!.resize(nw, nh);
      signet!.resize(nw, nh);
      w = nw;
      h = nh;
    }
    const r = seeded(42);
    motes = MOTE_ALPHA.map(() => []);
    for (let i = 0, n = w < 580 ? 40 : 92; i < n; i++) {
      motes[i % MOTE_ALPHA.length].push({ x: r(), y: r(), speed: 1 + r() * 4, r: 0.5 + r() * 1.55 });
    }
    paint();
  }

  function fastForward(to: number) {
    const idle: Pointer = { x: 0, y: 0, active: false };
    const until = Math.min(to, 90);
    while (simulated < until) advance(idle);
    time = simulated;
  }

  // ---- running ------------------------------------------------------------
  function advance(p: Pointer) {
    simulated += STEP;
    steps++;
    whales!.step(STEP, simulated, p);
    school!.step(STEP, simulated, whales!.list);
    signet!.step(STEP, simulated, school!);
  }

  function fish(
    sheet: HTMLCanvasElement, x: number, y: number, dir: number, roll: number, size: number, alpha: number, beat: number,
  ) {
    const facing = Math.cos(dir) < 0 ? -1 : 1;
    const a = facing < 0 ? dir + Math.PI : dir;
    const c = Math.cos(a) * dpr, s = Math.sin(a) * dpr;
    const sx = facing * (1 - 0.09 * roll), sy = 1 - 0.32 * roll;
    ctx.setTransform(c * sx, s * sx, -s * sy, c * sy, x * dpr, y * dpr);
    ctx.globalAlpha = alpha;
    const cell = Math.floor((beat / TAU) * FISH_FRAMES) % FISH_FRAMES;
    ctx.drawImage(sheet, (cell < 0 ? cell + FISH_FRAMES : cell) * FISH_W, 0, FISH_W, FISH_H, -size, (-size * 2) / 3, size * 2, (size * 4) / 3);
  }

  function render() {
    if (!back || !school || !signet || !whales) return;
    const k = still ? 1 : clamp01(lag / STEP);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(back, 0, 0, w, h);

    for (let b = 0; b < motes.length; b++) {
      ctx.fillStyle = rgba(palette.dust, MOTE_ALPHA[b]);
      ctx.beginPath();
      for (const m of motes[b]) {
        const x = (m.x * w + time * m.speed) % w;
        const y = m.y * h + 3 * Math.sin(time * 0.4 + m.x * TAU);
        ctx.moveTo(x + m.r, y);
        ctx.ellipse(x, y, m.r, m.r * 0.72, 0, 0, TAU);
      }
      ctx.fill();
    }

    whales.list.forEach((s, i) => drawWhale(ctx, s, k, whaleArt, buffers[i], whalePx, dpr, w, time, still ? -2 : steps));

    // Deepest school first.
    const o = school;
    for (let i = o.n - 1; i >= 0; i--) {
      if (!o.alive[i]) continue;
      const x = o.px[i] + (o.x[i] - o.px[i]) * k;
      const size = o.size[i];
      if (x < -size * 2 || x > w + size * 2) continue;
      const roll = o.pRoll[i] + (o.roll[i] - o.pRoll[i]) * k;
      fish(
        shoal, x, o.py[i] + (o.y[i] - o.py[i]) * k, o.pHeading[i] + (o.heading[i] - o.pHeading[i]) * k, roll, size,
        0.13 + o.depth[i] * 0.5 + roll * 0.065, time * (8 + o.depth[i] * 4) + o.phase[i],
      );
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    signet.drawLines(ctx, time, still);

    const g = signet;
    for (let i = 0; i < g.count; i++) {
      if (!g.mode[i]) continue;
      const x = g.px[i] + (g.x[i] - g.px[i]) * k, y = g.py[i] + (g.y[i] - g.py[i]) * k;
      const dir = g.pHeading[i] + (g.heading[i] - g.pHeading[i]) * k;
      const lit = g.glow[i], size = g.size[i];
      if (lit > 0) {
        const r = size * 1.2;
        ctx.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr);
        ctx.globalAlpha = lit * (still ? 1 : 0.87 + 0.13 * Math.sin(time * 1.42 + i * 1.9));
        ctx.drawImage(halo, -r, -r, r * 2, r * 2);
      }
      if (lit < 1) fish(shoal, x, y, dir, 0.1, size, (0.2 + g.depth[i] * 0.5) * (1 - lit), g.beat[i]);
      if (lit > 0) fish(gold, x, y, dir, 0.1, size, lit, g.beat[i]);
    }
    ctx.globalAlpha = 1;
  }

  // If the device cannot hold the frame rate at full density, give up
  // sharpness, not smoothness. Decided once, from the median frame interval
  // over the first few seconds of play (after a short warm-up).
  const intervals: number[] = [];
  let watched = 0;
  function govern(ms: number) {
    if (dprCap === 1 || watched < 0) return;
    watched += ms;
    if (watched < 800) return;
    intervals.push(ms);
    if (watched < 3800) return;
    intervals.sort((a, b) => a - b);
    if (intervals[intervals.length >> 1] > 22 && dpr > 1) {
      dprCap = 1;
      dirty = true;
    }
    watched = -1;
  }

  function tick(now: number) {
    frame = 0;
    if (dead) return;
    if (dirty) resize();
    if (school && previous !== null) {
      const elapsed = now - previous;
      govern(elapsed);
      const delta = Math.min(0.064, elapsed / 1000);
      lag += delta;
      time += delta;
      readPointer(performance.now());
      while (lag >= STEP) {
        advance(pointer);
        lag -= STEP;
      }
    }
    previous = now;
    render();
    sync();
  }

  function sync() {
    if (dead) return;
    const play = visible && !document.hidden && !still;
    if (play && !frame) frame = requestAnimationFrame(tick);
    if (!play && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (!play) previous = null;
  }

  function redraw() {
    if (dirty) resize();
    render();
  }

  const sizes = new ResizeObserver(() => {
    dirty = true;
    if (still || !frame) redraw();
  });
  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  const onMotion = () => {
    still = reduced.matches;
    if (still) pose();
    redraw();
    sync();
  };

  resize();
  render();
  sizes.observe(canvas);
  seen.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", onMotion);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("blur", onLeave);
  document.documentElement.addEventListener("pointerleave", onLeave);

  return {
    setDark(next) {
      if (next === dark) return;
      dark = next;
      paint();
      render();
    },
    destroy() {
      dead = true;
      if (frame) cancelAnimationFrame(frame);
      sizes.disconnect();
      seen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    },
  };
}
