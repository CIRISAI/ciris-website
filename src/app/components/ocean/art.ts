// Artwork for the underwater hero: palettes, the fish sprite sheets, the
// whale shark, and the water itself. The drawings are Franco's, from his
// standalone prototype (CIRISAI/ciris-website PR 38); what changed in the
// port is when they are painted. Everything here is rasterized once per
// theme/resize into offscreen canvases, so a frame is nothing but drawImage.

export type RGB = readonly [number, number, number];

export interface Palette {
  surface: readonly [string, string, string, string];
  beam: RGB;
  depth: RGB;
  haze: RGB;
  shoal: RGB;
  rim: RGB;
  dust: RGB;
  gold: RGB;
  glint: RGB;
  shark: RGB;
}

export const PALETTES: { light: Palette; dark: Palette } = {
  light: {
    surface: ["#dceffa", "#a5cdeb", "#78afd5", "#d8e8f4"],
    beam: [243, 251, 255],
    depth: [32, 75, 115],
    haze: [225, 241, 255],
    shoal: [37, 82, 124],
    rim: [223, 243, 255],
    dust: [50, 103, 147],
    gold: [158, 84, 22],
    glint: [255, 219, 120],
    shark: [42, 92, 128],
  },
  dark: {
    surface: ["#203b52", "#142d44", "#101e33", "#0d1117"],
    beam: [150, 201, 228],
    depth: [7, 16, 34],
    haze: [75, 168, 192],
    shoal: [112, 169, 193],
    rim: [203, 245, 245],
    dust: [162, 224, 230],
    gold: [239, 169, 61],
    glint: [255, 232, 160],
    shark: [17, 45, 70],
  },
};

export const TAU = Math.PI * 2;
export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const smooth = (x: number) => x * x * (3 - 2 * x);
export const smoothstep = (a: number, b: number, x: number) => smooth(clamp01((x - a) / (b - a)));
export const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
export const mix = (a: RGB, b: RGB, k: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * k),
  Math.round(a[1] + (b[1] - a[1]) * k),
  Math.round(a[2] + (b[2] - a[2]) * k),
];
/** Shortest signed turn from angle a to angle b. */
export const angleDelta = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/** Small deterministic generator, so the scene is the same on every visit. */
export function seeded(n: number): () => number {
  return () => {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    return n / 4294967296;
  };
}

function offscreen(width: number, height: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(width));
  c.height = Math.max(1, Math.ceil(height));
  return c;
}

// ---- fish ------------------------------------------------------------------

export const FISH_FRAMES = 24;
/** Sprite cell, in pixels. A fish of `size` is drawn 2·size wide, 4/3·size tall. */
export const FISH_W = 96;
export const FISH_H = 64;

/**
 * One tail-beat cycle of a fish in a single horizontal strip (one texture, so
 * the browser keeps one upload instead of twenty-four). `lit` is the gold
 * variant worn by the fish that carry the signet.
 */
export function fishSheet(palette: Palette, light: boolean, lit: boolean): HTMLCanvasElement {
  const sheet = offscreen(FISH_W * FISH_FRAMES, FISH_H);
  const s = sheet.getContext("2d")!;
  const base = lit ? palette.gold : palette.shoal;
  const silver = lit ? palette.glint : palette.rim;
  const fin = mix(base, palette.depth, lit ? 0.25 : 0.39);
  const P = (d: string) => new Path2D(d);

  for (let i = 0; i < FISH_FRAMES; i++) {
    s.save();
    s.beginPath();
    s.rect(i * FISH_W, 0, FISH_W, FISH_H);
    s.clip();
    s.translate(i * FISH_W + FISH_W / 2, FISH_H / 2);
    s.scale(32, 32);
    const phase = (i * TAU) / FISH_FRAMES;
    const swing = Math.sin(phase);
    const far = Math.sin(phase - 0.62);
    const tail = -0.7 + 0.047 * Math.cos(phase);
    const neck = swing * 0.075;
    const tip = far * 0.21;
    const outline = P(
      `M .89 -.009 C .871 -.071 .753 -.127 .615 -.178 C .432 -.24 .274 -.287 .083 -.263 C -.185 -.234 -.39 -.102 ${tail} ${neck - 0.043} L ${tail - 0.014} ${neck + 0.033} C -.458 .097 -.225 .187 .045 .213 C .34 .244 .618 .147 .773 .060 Q .843 .041 .89 -.009 Z`,
    );
    s.fillStyle = rgba(fin, 0.65);
    s.fill(P("M .38 .047 Q .208 .23 -.18 .324 C -.1 .20 .026 .108 .099 .058 Z"));
    s.fill(P("M .32 -.221 Q .164 -.345 -.019 -.422 Q .018 -.312 -.132 -.235 Z"));
    s.fill(P("M -.216 .141 Q -.352 .269 -.523 .243 L -.401 .092 Z"));

    const caudal = s.createLinearGradient(tail, neck, -1.23, tip);
    caudal.addColorStop(0, rgba(base, 0.95));
    caudal.addColorStop(0.67, rgba(fin, 0.77));
    caudal.addColorStop(1, rgba(mix(fin, silver, 0.36), 0.48));
    s.fillStyle = caudal;
    s.fill(
      P(
        `M ${tail + 0.07} ${neck - 0.041} C -.86 ${neck - 0.066} -.918 ${tip - 0.231} -1.17 ${tip - 0.318} Q -1.105 ${tip - 0.132} -1.00 ${tip + 0.013} Q -1.075 ${tip + 0.108} -1.164 ${tip + 0.29} Q -.965 ${tip + 0.23} -.873 ${neck + 0.082} L ${tail + 0.06} ${neck + 0.047} Z`,
      ),
    );

    const tone = s.createLinearGradient(0, -0.29, 0, 0.25);
    tone.addColorStop(0, rgba(mix(base, palette.depth, lit ? 0.36 : 0.62), 1));
    tone.addColorStop(0.29, rgba(base, 1));
    tone.addColorStop(0.56, rgba(mix(base, silver, lit ? 0.64 : light ? 0.35 : 0.52), 1));
    tone.addColorStop(0.82, rgba(mix(base, silver, lit ? 0.77 : 0.64), 1));
    tone.addColorStop(1, rgba(silver, lit ? 0.88 : 0.79));
    s.fillStyle = tone;
    s.fill(outline);
    s.save();
    s.clip(outline);
    const lightRim = s.createLinearGradient(-0.59, 0, 0.74, 0);
    lightRim.addColorStop(0, rgba(silver, 0));
    lightRim.addColorStop(0.52, rgba(silver, lit ? 0.67 : 0.48));
    lightRim.addColorStop(1, rgba(silver, 0.14));
    s.strokeStyle = lightRim;
    s.lineWidth = 0.032;
    s.stroke(P(`M -.61 ${neck} C -.365 -.076 -.198 -.112 .103 -.092 Q .484 -.088 .783 -.028`));
    s.strokeStyle = rgba(fin, 0.51);
    s.lineWidth = 0.022;
    s.stroke(P("M .561 -.138 C .465 -.091 .43 .014 .493 .119 M .826 .016 Q .755 .044 .68 .038"));
    s.restore();
    s.fillStyle = rgba(mix(fin, base, 0.4), 0.36);
    s.fill(P(`M .424 .022 Q .277 ${0.2 + swing * 0.09} .037 ${0.21 + swing * 0.08} Q .14 .101 .24 .047 Z`));
    s.beginPath();
    s.arc(0.685, -0.044, 0.049, 0, TAU);
    s.fillStyle = rgba(mix(silver, base, 0.22), 0.85);
    s.fill();
    s.beginPath();
    s.arc(0.697, -0.047, 0.032, 0, TAU);
    s.fillStyle = rgba(palette.depth, 0.92);
    s.fill();
    s.beginPath();
    s.arc(0.71, -0.059, 0.012, 0, TAU);
    s.fillStyle = rgba(silver, 0.92);
    s.fill();
    s.restore();
  }
  return sheet;
}

/** The halo round a lit fish: one radial gradient, painted once. */
export function haloSprite(palette: Palette, light: boolean): HTMLCanvasElement {
  const R = 48;
  const c = offscreen(R * 2, R * 2);
  const g = c.getContext("2d")!;
  const glow = g.createRadialGradient(R, R, 1, R, R, R);
  glow.addColorStop(0, rgba(palette.glint, light ? 0.54 : 0.6));
  glow.addColorStop(0.48, rgba(palette.glint, light ? 0.24 : 0.25));
  glow.addColorStop(1, rgba(palette.glint, 0));
  g.fillStyle = glow;
  g.fillRect(0, 0, R * 2, R * 2);
  return c;
}

// ---- whale shark -----------------------------------------------------------

/**
 * The whale shark's box in its own units (1 unit = `size` px): nose at +x,
 * tail tip at −x. The sprite covers exactly this box.
 */
export const WHALE = { x0: -1.3, x1: 0.96, y0: -0.44, y1: 0.42 } as const;
/** Where the nose and the tail tip sit along x, for the swimming wave. */
export const WHALE_NOSE = 0.91;
export const WHALE_TAIL = -1.25;

/**
 * The whole animal, straight and at rest, as ONE image: body, tail fin, fins,
 * spots. The prototype drew the tail fin as a separate shape rotated at a
 * hinge, which is where it came apart from the body. Here nothing is hinged;
 * the swimmer bends this single image along its spine (see whale.ts), so the
 * tail cannot separate from the body by construction.
 */
/** The parts a turning whale is assembled from, all in the sprite's frame. */
export type WhaleLayer = "all" | "trunk" | "crest" | "fin" | "finFar";

export function whaleSprite(
  palette: Palette, light: boolean, pxPerUnit: number, layer: WhaleLayer = "all",
): HTMLCanvasElement {
  const on = (...l: WhaleLayer[]) => layer === "all" || l.includes(layer);
  const c = offscreen((WHALE.x1 - WHALE.x0) * pxPerUnit, (WHALE.y1 - WHALE.y0) * pxPerUnit);
  const ctx = c.getContext("2d")!;
  ctx.scale(pxPerUnit, pxPerUnit);
  ctx.translate(-WHALE.x0, -WHALE.y0);
  const P = (d: string) => new Path2D(d);
  const hide = palette.shark;
  const rim = palette.rim;
  const backFin = mix(hide, palette.depth, 0.26);
  const lipTone = mix(hide, rim, light ? 0.38 : 0.27);

  const farFin = P("M .25 .080 Q .15 .196 -.11 .30 Q -.15 .314 -.145 .282 L .025 .104 Z");
  const nearFin = P(
    "M .38 .068 C .264 .167 .133 .288 -.119 .36 Q -.152 .373 -.142 .34 L .002 .167 C .074 .088 .18 .065 .38 .068 Z",
  );
  const dorsal = P("M -.009 -.169 Q -.06 -.266 -.177 -.329 Q -.223 -.354 -.204 -.317 Q -.179 -.250 -.222 -.159 Z");
  const secondDorsal = P("M -.50 -.092 Q -.58 -.149 -.629 -.157 Q -.609 -.113 -.649 -.059 Z");
  const tailFin = P(
    "M .06 -.033 C -.032 -.059 -.084 -.177 -.286 -.354 C -.318 -.379 -.33 -.353 -.311 -.312 C -.269 -.223 -.201 -.105 -.188 -.025 Q -.176 .019 -.216 .081 C -.277 .165 -.293 .225 -.298 .268 Q -.294 .292 -.269 .272 C -.13 .192 -.052 .094 .06 .027 Z",
  );
  const ridges = P(
    "M -.70 -.035 C -.398 -.074 -.17 -.147 .14 -.151 Q .45 -.146 .683 -.073 M -.62 .013 C -.32 -.017 -.14 -.081 .14 -.099 Q .43 -.108 .652 -.050",
  );
  const mouth = P("M .87 -.013 Q .823 .018 .684 .033");
  const gills = P(
    Array.from({ length: 5 }, (_, i) => `M ${0.518 - i * 0.026} ${-0.021 - i * 0.005} q -.019 .052 -.055 .082`).join(" "),
  );
  // The trunk runs unbroken into the tail stock; the fin overlaps its end.
  const hingeX = -0.92;
  const body = P(
    `M .89 -.08 C .91 -.044 .902 .021 .856 .053 C .74 .13 .54 .164 .25 .151 C -.10 .145 -.32 .098 -.62 .046 C -.719 .030 -.833 .041 ${hingeX - 0.022} .029 L ${hingeX - 0.022} -.031 C -.833 -.040 -.714 -.026 -.62 -.066 Q -.54 -.091 -.40 -.121 C -.16 -.172 .035 -.202 .27 -.204 C .49 -.199 .672 -.158 .80 -.13 Q .866 -.111 .89 -.08 Z`,
  );

  if (layer === "finFar") {
    // Seen from outside its own flank, so the near fin's outline in far tones.
    ctx.fillStyle = rgba(backFin, 0.7);
    ctx.fill(nearFin);
  }
  if (layer === "all") {
    ctx.fillStyle = rgba(backFin, 0.7);
    ctx.fill(farFin);
  }
  if (on("crest")) {
    ctx.fillStyle = rgba(backFin, 0.7);
    ctx.fill(secondDorsal);
    ctx.fill(dorsal);
  }

  if (on("crest")) {
  ctx.save();
  ctx.translate(hingeX, 0);
  const tailTone = ctx.createLinearGradient(0, -0.32, 0, 0.24);
  tailTone.addColorStop(0, rgba(backFin, 0.85));
  tailTone.addColorStop(0.57, rgba(hide, 0.98));
  tailTone.addColorStop(1, rgba(mix(hide, rim, 0.26), 0.84));
  ctx.fillStyle = tailTone;
  ctx.fill(tailFin);
  ctx.restore();
  }

  if (on("trunk")) {
  const tone = ctx.createLinearGradient(0, -0.21, 0, 0.17);
  tone.addColorStop(0, rgba(mix(hide, palette.depth, 0.39), 1));
  tone.addColorStop(0.25, rgba(hide, 1));
  tone.addColorStop(0.65, rgba(mix(hide, rim, light ? 0.17 : 0.22), 1));
  tone.addColorStop(1, rgba(mix(hide, rim, light ? 0.56 : 0.49), 0.9));
  ctx.fillStyle = tone;
  ctx.fill(body);
  ctx.save();
  ctx.clip(body);
  ctx.strokeStyle = rgba(rim, 0.21);
  ctx.lineWidth = 0.009;
  ctx.stroke(ridges);
  const rand = seeded(142);
  const spots = Array.from({ length: 4 }, () => new Path2D());
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 29; col++) {
      const x = -0.79 + col * 0.056 + (row % 2) * 0.023 + (rand() - 0.5) * 0.04;
      const y = -0.166 + row * 0.039 + Math.sin(x * 4.1 + row * 0.3) * 0.012 + (rand() - 0.5) * 0.025;
      const r = 0.0034 + rand() * 0.009;
      if (rand() > 0.19 + row * 0.036) {
        const layer = spots[Math.floor(rand() * spots.length)];
        layer.moveTo(x + r, y);
        layer.ellipse(x, y, r, r * 0.71, 0, 0, TAU);
      }
    }
  }
  spots.forEach((layer, i) => {
    ctx.fillStyle = rgba(rim, (0.25 + i * 0.14) * (light ? 0.84 : 0.71));
    ctx.fill(layer);
  });
  ctx.restore();
  }

  if (on("fin")) {
  const finTone = ctx.createLinearGradient(0.24, 0.078, -0.13, 0.34);
  finTone.addColorStop(0, rgba(mix(hide, rim, 0.12), 1));
  finTone.addColorStop(0.82, rgba(backFin, 0.89));
  finTone.addColorStop(1, rgba(hide, 0.55));
  ctx.fillStyle = finTone;
  ctx.fill(nearFin);
  }
  if (!on("trunk")) return c;
  ctx.strokeStyle = rgba(lipTone, 0.8);
  ctx.lineWidth = 0.0085;
  ctx.stroke(mouth);
  ctx.strokeStyle = rgba(palette.depth, 0.66);
  ctx.lineWidth = 0.006;
  ctx.stroke(gills);
  ctx.beginPath();
  ctx.ellipse(0.744, -0.071, 0.015, 0.01, -0.1, 0, TAU);
  ctx.fillStyle = rgba(palette.depth, 0.91);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0.749, -0.073, 0.004, 0, TAU);
  ctx.fillStyle = rgba(rim, 0.66);
  ctx.fill();
  return c;
}

// ---- water -----------------------------------------------------------------

/**
 * The still water: depth gradient, light shafts, surface shimmer, vignette.
 * Painted once per resize/theme. The shafts are drawn small and scaled up,
 * which feathers them without canvas `filter` (Safari does not have it).
 */
export function waterBackdrop(
  palette: Palette,
  light: boolean,
  w: number,
  h: number,
  dpr: number,
): HTMLCanvasElement {
  const back = offscreen(w * dpr, h * dpr);
  const b = back.getContext("2d")!;
  b.scale(dpr, dpr);
  const grad = b.createLinearGradient(0, 0, 0, h);
  const stops = [0, 0.24, 0.72, 1];
  palette.surface.forEach((c, i) => grad.addColorStop(stops[i], c));
  b.fillStyle = grad;
  b.fillRect(0, 0, w, h);

  const glow = b.createRadialGradient(w * 0.48, 0, 0, w * 0.48, 0, Math.max(w * 0.69, h * 0.96));
  glow.addColorStop(0, rgba(palette.haze, light ? 0.72 : 0.23));
  glow.addColorStop(1, rgba(palette.haze, 0));
  b.fillStyle = glow;
  b.fillRect(0, 0, w, h);

  const noise = seeded(987);
  const K = 1 / 12;
  const shafts = offscreen(w * K, h * K);
  const sg = shafts.getContext("2d")!;
  sg.scale(K, K);
  for (let i = 0; i < 23; i++) {
    const x = w * (0.02 + noise() * 0.94);
    const width = 10 + noise() * w * 0.06;
    const reach = h * (0.36 + noise() * 0.53);
    sg.save();
    sg.translate(x, -h * 0.1);
    sg.rotate(-0.2 - noise() * 0.23);
    const g = sg.createLinearGradient(0, 0, 0, reach);
    g.addColorStop(0, rgba(palette.beam, (0.1 + noise() * 0.18) * (light ? 1 : 0.27)));
    g.addColorStop(1, rgba(palette.beam, 0));
    sg.fillStyle = g;
    sg.beginPath();
    sg.moveTo(-width * 0.18, 0);
    sg.lineTo(width * 0.18, 0);
    sg.lineTo(width * 0.68, reach);
    sg.lineTo(-width * 0.68, reach);
    sg.closePath();
    sg.fill();
    sg.restore();
  }
  b.imageSmoothingEnabled = true;
  b.imageSmoothingQuality = "high";
  b.drawImage(shafts, 0, 0, w, h);

  for (let i = 0; i < 9; i++) {
    const y = 5 + i * i * 0.55;
    const x = noise() * w * 0.33;
    b.strokeStyle = rgba(palette.beam, (1 - i / 10) * (light ? 0.16 : 0.09));
    b.lineWidth = 1 + i * 0.21;
    b.beginPath();
    b.moveTo(x, y);
    b.bezierCurveTo(w * 0.19, y + 26, w * 0.34, y - 21, w * 0.54, y + 2);
    b.bezierCurveTo(w * 0.71, y + 19, w * 0.82, y - 13, w - x * 0.5, y + 3);
    b.stroke();
  }
  const vignette = b.createRadialGradient(w * 0.5, h * 0.34, h * 0.14, w * 0.5, h * 0.41, Math.max(w * 0.67, h * 0.74));
  vignette.addColorStop(0, rgba(palette.depth, 0));
  vignette.addColorStop(1, rgba(palette.depth, light ? 0.13 : 0.5));
  b.fillStyle = vignette;
  b.fillRect(0, 0, w, h);
  return back;
}
