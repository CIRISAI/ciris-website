// Graphic 03 — Superalignment. Text-free SVG: the agent sits inside an
// accountable federation; every action emits a signed artifact onto the mesh.
// Animation in css/g03.css. Ported verbatim from the design team's deliverable.
const g03 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <radialGradient id="g03core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7A6FD6" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#7A6FD6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path d="M300,95 L477.5,197.5 L477.5,402.5 L300,505 L122.5,402.5 L122.5,197.5 Z" stroke="#7A6FD6" stroke-opacity="0.22" stroke-width="1.1"/>
  <g stroke="#7A6FD6" stroke-opacity="0.28" stroke-width="1.1">
    <path d="M300,300 L300,95"/>
    <path d="M300,300 L477.5,197.5"/>
    <path d="M300,300 L477.5,402.5"/>
    <path d="M300,300 L300,505"/>
    <path d="M300,300 L122.5,402.5"/>
    <path d="M300,300 L122.5,197.5"/>
  </g>
  <g stroke="#7A6FD6" stroke-width="1.6">
    <g transform="translate(300,95)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
    <g transform="translate(477.5,197.5)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
    <g transform="translate(477.5,402.5)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
    <g transform="translate(300,505)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
    <g transform="translate(122.5,402.5)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
    <g transform="translate(122.5,197.5)"><path d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" fill="#0D1117"/><circle r="3" fill="#7A6FD6" stroke="none"/></g>
  </g>
  <g fill="none" stroke="#bfb4f5" stroke-width="1.4">
    <circle class="flash" cx="300" cy="95" r="15" style="animation-delay:0s"/>
    <circle class="flash" cx="477.5" cy="197.5" r="15" style="animation-delay:-0.566s"/>
    <circle class="flash" cx="477.5" cy="402.5" r="15" style="animation-delay:-1.133s"/>
    <circle class="flash" cx="300" cy="505" r="15" style="animation-delay:-1.7s"/>
    <circle class="flash" cx="122.5" cy="402.5" r="15" style="animation-delay:-2.266s"/>
    <circle class="flash" cx="122.5" cy="197.5" r="15" style="animation-delay:-2.833s"/>
  </g>
  <circle class="agentglow" cx="300" cy="300" r="60" fill="url(#g03core)"/>
  <g class="agent">
    <rect x="278" y="278" width="44" height="44" rx="11" transform="rotate(45 300 300)" stroke="#7A6FD6" stroke-width="2" fill="#0D1117"/>
    <circle cx="300" cy="300" r="8" fill="#7A6FD6"/>
    <circle cx="300" cy="300" r="3.2" fill="#e9e4ff"/>
  </g>
  <g fill="#7A6FD6" stroke="#e9e4ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <g class="tok" style="offset-path:path('M300,300 L300,95');offset-distance:60%;animation-delay:0s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
    <g class="tok" style="offset-path:path('M300,300 L477.5,197.5');offset-distance:45%;animation-delay:-0.566s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
    <g class="tok" style="offset-path:path('M300,300 L477.5,402.5');offset-distance:72%;animation-delay:-1.133s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
    <g class="tok" style="offset-path:path('M300,300 L300,505');offset-distance:38%;animation-delay:-1.7s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
    <g class="tok" style="offset-path:path('M300,300 L122.5,402.5');offset-distance:55%;animation-delay:-2.266s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
    <g class="tok" style="offset-path:path('M300,300 L122.5,197.5');offset-distance:66%;animation-delay:-2.833s"><path d="M0,-6 L6,0 L0,6 L-6,0 Z" stroke="none"/><path d="M-2.6,0 L-0.6,2 L3,-2.6" fill="none"/></g>
  </g>
</svg>`;
export default g03;
