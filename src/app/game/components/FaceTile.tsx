// FaceTile — a deterministic pixel-art portrait per character.
//
// 90s edutainment register: chunky pixels, hard borders, limited palette,
// no anti-aliasing, no rounded corners. We render via SVG using fixed
// integer coordinates on a 16x16 grid so the portrait stays crisp at any
// scale (image-rendering: pixelated on the parent for scaled bitmap feel).
//
// Features are deterministically derived from the character's id so the
// same character always looks the same. Variant count: ~ 6 skin tones x
// 8 hair colors x 5 hair styles x 4 eyes x 4 mouths x 4 accessories =
// 15k unique combinations, plenty for 100 distinct kids.

import type React from "react";

const SKIN = ["#f4d4b2", "#e6b89a", "#c89472", "#a06a4a", "#6e4830", "#3d2618"];
const HAIR = ["#1a1410", "#3a2a18", "#7a4a20", "#b87830", "#d6a430", "#e8d094", "#5a6a8a", "#aa3a4a"];
const ACC_COLOR = ["#b94c2a", "#4a6a3a", "#4a6488", "#d4a04a", "#7a3aaa"];

function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

interface FaceProps {
  id: string;
  size?: number;     // px
  ring?: string;     // ring color for selected/trusted state
  selected?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export default function FaceTile({
  id,
  size = 40,
  ring,
  selected,
  className = "",
  onClick,
  title,
}: FaceProps) {
  const h = hash(id);
  const skin = SKIN[h % SKIN.length];
  const hair = HAIR[(h >> 4) % HAIR.length];
  const hairStyle = (h >> 8) & 0x7;          // 0..4 of styles
  const eyes = (h >> 12) & 0x3;              // 0..3
  const mouth = (h >> 16) & 0x3;             // 0..3
  const acc = (h >> 20) & 0x7;               // 0..4 (5 = none)
  const accColor = ACC_COLOR[(h >> 24) % ACC_COLOR.length];

  // 16x16 grid, rendered as integer-position rects. The viewBox is
  // 16x16; the consumer scales via width/height.
  const bg = "#1a1410"; // tile background
  const borderColor = ring ?? "#1a1410";

  // Hair shapes — five preset masks on the top of the head.
  const hairRects: Array<[number, number, number, number]> = (() => {
    switch (hairStyle % 5) {
      case 0: // crew cut: thin cap
        return [[3, 3, 10, 2]];
      case 1: // tall puff
        return [[3, 2, 10, 3], [2, 3, 12, 2]];
      case 2: // sides + part
        return [[2, 3, 4, 4], [10, 3, 4, 4], [3, 3, 10, 1]];
      case 3: // long down sides
        return [[2, 3, 2, 8], [12, 3, 2, 8], [3, 3, 10, 2]];
      case 4: // wrap headcloth
        return [[3, 2, 10, 4]];
      default:
        return [[3, 3, 10, 2]];
    }
  })();

  // Face block (the skin face)
  // square head from y=4..12, x=4..12
  // Eyes at y=7 (two pixels)
  const eyeY = 7;
  const eyeRects: Array<[number, number, number, number]> = (() => {
    switch (eyes) {
      case 0: // dots
        return [[6, eyeY, 1, 1], [9, eyeY, 1, 1]];
      case 1: // wider eyes
        return [[6, eyeY, 1, 2], [9, eyeY, 1, 2]];
      case 2: // squint
        return [[6, eyeY, 2, 1], [8, eyeY, 2, 1]];
      case 3: // big block eyes
        return [[5, eyeY, 2, 2], [9, eyeY, 2, 2]];
      default:
        return [[6, eyeY, 1, 1], [9, eyeY, 1, 1]];
    }
  })();

  // Mouths at y=10
  const mouthY = 10;
  const mouthRects: Array<[number, number, number, number]> = (() => {
    switch (mouth) {
      case 0: // small smile
        return [[7, mouthY, 2, 1]];
      case 1: // bigger smile
        return [[6, mouthY, 4, 1]];
      case 2: // surprised o
        return [[7, mouthY, 2, 2]];
      case 3: // slight frown
        return [[6, mouthY + 1, 4, 1]];
      default:
        return [[7, mouthY, 2, 1]];
    }
  })();

  // Accessory
  const accRects: Array<[number, number, number, number, string]> = (() => {
    switch (acc) {
      case 0: // glasses
        return [
          [5, eyeY - 1, 2, 3, accColor],
          [9, eyeY - 1, 2, 3, accColor],
          [7, eyeY, 2, 1, accColor],
        ];
      case 1: // headphones
        return [
          [2, 4, 1, 4, accColor],
          [13, 4, 1, 4, accColor],
          [3, 3, 10, 1, accColor],
        ];
      case 2: // badge on shirt
        return [[7, 13, 2, 2, accColor]];
      case 3: // headband
        return [[3, 4, 10, 1, accColor]];
      // 4-7 = none
      default:
        return [];
    }
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? id}
      className={`face-tile ${className}`}
      style={{
        width: size,
        height: size,
        padding: 0,
        background: bg,
        border: `2px solid ${borderColor}`,
        outline: selected ? "2px solid #d4a04a" : "none",
        outlineOffset: selected ? "1px" : 0,
        imageRendering: "pixelated",
        cursor: onClick ? "pointer" : "default",
        flex: "0 0 auto",
      }}
    >
      <svg
        viewBox="0 0 16 16"
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        style={{ display: "block" }}
      >
        {/* background tile color */}
        <rect x={0} y={0} width={16} height={16} fill={bg} />
        {/* shoulders / shirt */}
        <rect x={2} y={13} width={12} height={3} fill="#3a4a5a" />
        {/* head block */}
        <rect x={4} y={4} width={8} height={9} fill={skin} />
        {/* neck */}
        <rect x={6} y={12} width={4} height={1} fill={skin} />
        {/* hair */}
        {hairRects.map(([x, y, w, h2], i) => (
          <rect key={`h${i}`} x={x} y={y} width={w} height={h2} fill={hair} />
        ))}
        {/* eyes */}
        {eyeRects.map(([x, y, w, h2], i) => (
          <rect key={`e${i}`} x={x} y={y} width={w} height={h2} fill="#1a1410" />
        ))}
        {/* mouth */}
        {mouthRects.map(([x, y, w, h2], i) => (
          <rect key={`m${i}`} x={x} y={y} width={w} height={h2} fill="#5a2a20" />
        ))}
        {/* accessory */}
        {accRects.map(([x, y, w, h2, c], i) => (
          <rect key={`a${i}`} x={x} y={y} width={w} height={h2} fill={c as string} />
        ))}
      </svg>
    </button>
  );
}
