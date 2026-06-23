// Graphic 11 — Safety. Text-free SVG: every action the agent takes passes
// through a conscience gate; the only control never automated is a physical
// halt in a human hand. Animation in css/g11.css. Ported from the design team.
const g11 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <radialGradient id="g11gateGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.5"/><stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g11haltGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E14B7F" stop-opacity="0.5"/><stop offset="100%" stop-color="#E14B7F" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle class="spin" cx="196" cy="300" r="120" stroke="#22C0E8" stroke-opacity="0.14" stroke-width="1" stroke-dasharray="2 10"/>
  <circle cx="196" cy="300" r="92" stroke="#22C0E8" stroke-opacity="0.2" stroke-width="1"/>
  <g transform="translate(196,300)">
    <rect x="-26" y="-26" width="52" height="52" rx="13" transform="rotate(45)" stroke="#22C0E8" stroke-width="1.9" fill="#0D1117"/>
    <circle r="10" fill="#22C0E8" fill-opacity="0.85"/><circle r="4" fill="#e8fbff"/>
  </g>
  <path class="flow" d="M196,208 a92,92 0 0 1 0,184" stroke="#22C0E8" stroke-opacity="0.5" stroke-width="1.4"/>
  <path class="flow" d="M288,300 L388,300" stroke="#4ADE80" stroke-opacity="0.55" stroke-width="1.4"/>
  <g transform="translate(388,300)">
    <circle class="haltglow" r="46" fill="url(#g11gateGrad)"/>
    <g class="gate">
      <circle r="34" stroke="#4ADE80" stroke-width="2" fill="#0D1117"/>
      <path d="M-15,-3 a15,15 0 0 1 30,0" stroke="#4ADE80" stroke-width="1.8" fill="none"/>
      <rect x="-15" y="-3" width="30" height="20" rx="4" stroke="#4ADE80" stroke-width="1.8" fill="#4ADE80" fill-opacity="0.08"/>
    </g>
    <circle class="gatecore" r="3.4" cy="7" fill="#bff5d2"/>
    <circle class="pass" r="34" stroke="#bff5d2" stroke-width="1.4" fill="none"/>
  </g>
  <path class="flow" d="M422,300 L500,300" stroke="#4ADE80" stroke-opacity="0.4" stroke-width="1.4"/>
  <g class="act" style="offset-path:path('M288,300 L388,300')"><circle r="5" fill="#22C0E8" fill-opacity="0.3"/><circle r="2.2" fill="#bff5d2"/></g>
  <rect x="506" y="280" width="40" height="40" rx="7" stroke="#419CA0" stroke-width="1.5" fill="#419CA0" fill-opacity="0.08"/>
  <path d="M514,292 h24 M514,300 h24 M514,308 h16" stroke="#419CA0" stroke-width="1.4" stroke-linecap="round"/>
  <line x1="388" y1="266" x2="388" y2="150" stroke="#E14B7F" stroke-opacity="0.5" stroke-width="1.6" stroke-dasharray="5 5"/>
  <g transform="translate(388,120)">
    <circle class="haltglow" r="50" fill="url(#g11haltGrad)"/>
    <circle r="30" stroke="#E14B7F" stroke-width="2.4" fill="#E14B7F" fill-opacity="0.12"/>
    <circle r="17" fill="#E14B7F" fill-opacity="0.9"/><circle r="17" stroke="#ffd2e1" stroke-width="1.2" fill="none"/>
    <rect x="-7" y="-7" width="14" height="14" rx="2.5" fill="#1a0a12"/>
  </g>
  <g transform="translate(388,120)" stroke="#E8C9D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M-6,52 q-10,8 -10,22 M6,52 q10,8 10,22"/>
    <path d="M-20,86 q20,16 40,0" stroke-opacity="0.7"/>
  </g>
</svg>`;
export default g11;
