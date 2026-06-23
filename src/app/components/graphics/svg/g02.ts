// Graphic 02 — Consumer AI. Text-free SVG (data circles inside the phone and
// never escapes to a cloud; a shield holds the locality dividend). Animation in
// css/g02.css. Ported verbatim from the design team's deliverable.
const g02 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <radialGradient id="g02local" cx="50%" cy="52%" r="55%">
      <stop offset="0%" stop-color="#22C0E8" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#22C0E8" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#22C0E8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle class="ring" cx="300" cy="312" r="156" stroke="#22C0E8" stroke-opacity="0.16" stroke-width="1" stroke-dasharray="2 9"/>
  <g class="sever" stroke="#9aa3af" stroke-opacity="0.5">
    <path d="M256,84 q-14,-2 -14,12 q-16,0 -16,15 q0,14 16,14 h62 q16,0 16,-15 q0,-14 -16,-13 q-3,-16 -22,-14 q-12,1 -26,15 Z" stroke-width="1.2"/>
    <path d="M300,128 V150" stroke-width="1.2" stroke-dasharray="3 5"/>
    <path d="M293,141 l14,12 M307,141 l-14,12" stroke="#E14B7F" stroke-opacity="0.8" stroke-width="1.4"/>
  </g>
  <path class="shield" d="M300,150 L388,186 V330 Q388,442 300,498 Q212,442 212,330 V186 Z" stroke="#22C0E8" stroke-width="1.4" fill="#22C0E8" fill-opacity="0.04"/>
  <rect x="246" y="178" width="108" height="268" rx="20" stroke="#22C0E8" stroke-opacity="0.85" stroke-width="1.8"/>
  <rect x="246" y="178" width="108" height="268" rx="20" fill="url(#g02local)" class="glow"/>
  <line x1="284" y1="192" x2="316" y2="192" stroke="#22C0E8" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
  <g class="dot" style="offset-distance:0%;animation-delay:0s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <g class="dot" style="offset-distance:16%;animation-delay:-1.16s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <g class="dot" style="offset-distance:33%;animation-delay:-2.33s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <g class="dot" style="offset-distance:50%;animation-delay:-3.5s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <g class="dot" style="offset-distance:66%;animation-delay:-4.66s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <g class="dot" style="offset-distance:83%;animation-delay:-5.83s"><circle r="6" fill="#22C0E8" fill-opacity="0.22"/><circle r="2.4" fill="#bfefff"/></g>
  <circle cx="300" cy="312" r="5" fill="#e8fbff"/>
</svg>`;
export default g02;
