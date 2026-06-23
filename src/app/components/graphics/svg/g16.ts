// Graphic 16 — Coherence (the ratchet / collapse curve). Text-free SVG, ported verbatim from the design team.
// Source is a two-panel pair of 0 0 400 400 SVGs; composed here into one 600x600 frame
// via nested viewports so every path coordinate is preserved verbatim. Static (no animation).
const g16 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <svg x="20" y="100" width="280" height="280" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="210" r="118" stroke="#7A6FD6" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="2 9"/>
    <g stroke="#7A6FD6" stroke-width="2" stroke-linejoin="round" fill="#7A6FD6" fill-opacity="0.06">
      <path d="M200,210 m0,-92 l16,20 l-26,8 Z" transform="rotate(0 200 210)"/>
    </g>
    <g stroke="#7A6FD6" stroke-width="2" fill="#0D1117">
      <circle cx="200" cy="210" r="86"/>
    </g>
    <g stroke="#a99ee6" stroke-width="1.8" fill="#7A6FD6" fill-opacity="0.1" stroke-linejoin="round">
      <path d="M200,124 l14,14 l-20,8 Z"/>
      <path d="M261,150 l8,18 l-21,-3 Z"/>
      <path d="M286,210 l-2,20 l-19,-10 Z"/>
      <path d="M261,270 l-13,15 l-9,-19 Z"/>
      <path d="M200,296 l-19,7 l5,-20 Z"/>
      <path d="M139,270 l-18,9 l13,-16 Z"/>
      <path d="M114,210 l-20,-3 l18,-12 Z"/>
      <path d="M139,150 l-15,-13 l20,-5 Z"/>
    </g>
    <circle cx="200" cy="210" r="12" stroke="#7A6FD6" stroke-width="1.8" fill="#0D1117"/><circle cx="200" cy="210" r="4" fill="#a99ee6"/>
    <path d="M300,150 L262,182" stroke="#E14B7F" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="304" cy="146" r="5" fill="#E14B7F"/>
    <path d="M150,96 a64,64 0 0 1 108,8" stroke="#4ADE80" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M252,96 l6,12 l-13,1 Z" fill="#4ADE80"/>
    <g stroke="#E14B7F" stroke-width="2" stroke-linecap="round"><path d="M120,320 l24,24 M144,320 l-24,24"/></g>
  </svg>
  <svg x="300" y="100" width="280" height="280" viewBox="0 0 400 400" fill="none">
    <g stroke="#9aa3af" stroke-opacity="0.45" stroke-width="1.2" stroke-linecap="round">
      <path d="M70,330 H350 M343,325 L350,330 L343,335"/>
      <path d="M70,330 V60 M65,67 L70,60 L75,67"/>
    </g>
    <path d="M250,60 V330" stroke="#E14B7F" stroke-opacity="0.7" stroke-width="1.4" stroke-dasharray="5 5"/>
    <rect x="250" y="60" width="100" height="270" fill="#E14B7F" fill-opacity="0.05"/>
    <path d="M70,96 C150,100 210,112 244,150 C256,164 258,250 262,300 C265,322 280,328 348,330" stroke="#7A6FD6" stroke-width="2.2"/>
    <g fill="#a99ee6"><circle cx="92" cy="98" r="3"/><circle cx="150" cy="103" r="3"/><circle cx="210" cy="120" r="3"/></g>
    <g fill="#E14B7F"><circle cx="280" cy="318" r="3"/><circle cx="320" cy="328" r="3"/></g>
    <circle cx="250" cy="150" r="6" stroke="#E14B7F" stroke-width="1.8" fill="#0D1117"/>
  </svg>
</svg>`;
export default g16;
