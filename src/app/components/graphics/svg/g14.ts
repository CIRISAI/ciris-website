// Graphic 14 — Mission-Driven Development. Text-free SVG, ported verbatim from the design team.
const g14 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="g14beamGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e6d4ad" stop-opacity="0.9"/><stop offset="100%" stop-color="#B08A3E" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <path d="M150,438 L450,438" stroke="#B08A3E" stroke-opacity="0.5" stroke-width="2"/>
  <path d="M150,438 L138,460 M450,438 L462,460 M300,438 L300,460" stroke="#6b7280" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="4 5"/>
  <rect class="drift" x="168" y="196" width="264" height="22" rx="4" stroke="#9aa3af" stroke-opacity="0.6" stroke-width="1.4" fill="#11161d"/>
  <g stroke="#419CA0" stroke-width="1.8" class="drift">
    <g><rect x="182" y="226" width="40" height="206" rx="5" fill="#419CA0" fill-opacity="0.06"/><path d="M188,250 h28 M188,330 h28 M188,410 h28" stroke="#419CA0" stroke-opacity="0.4" stroke-width="1"/></g>
    <g><rect x="280" y="226" width="40" height="206" rx="5" fill="#419CA0" fill-opacity="0.06"/><path d="M286,250 h28 M286,330 h28 M286,410 h28" stroke="#419CA0" stroke-opacity="0.4" stroke-width="1"/></g>
    <g><rect x="378" y="226" width="40" height="206" rx="5" fill="#419CA0" fill-opacity="0.06"/><path d="M384,250 h28 M384,330 h28 M384,410 h28" stroke="#419CA0" stroke-opacity="0.4" stroke-width="1"/></g>
  </g>
  <g class="beam">
    <rect x="290" y="120" width="20" height="316" rx="5" fill="url(#g14beamGrad)" stroke="#B08A3E" stroke-width="1.4"/>
    <path d="M300,108 L286,128 L314,128 Z" fill="#e6d4ad"/>
  </g>
  <g class="lock" stroke="#B08A3E" stroke-width="2" stroke-linecap="round">
    <circle cx="300" cy="207" r="10" stroke-width="1.8" fill="#0D1117"/><path d="M296,207 l3,3 l5,-6"/>
    <circle cx="300" cy="430" r="10" stroke-width="1.8" fill="#0D1117"/><path d="M296,430 l3,3 l5,-6"/>
  </g>
</svg>`;
export default g14;
