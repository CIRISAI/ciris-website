// Graphic 17 — Proof (five classes verify, then the master seal sets). Text-free
// animated SVG, ported verbatim from the design team's "Graphic 17 - Proof". A
// record at the center is checked by five proof classes in turn; each lights its
// verdict-ring segment (reusing the five proof-class glyphs), verify signals
// travel inward, and once all five hold the master seal pops — proven. The
// design's HTML anchor labels are intentionally omitted (text-free; the page
// supplies any labels). Keyframes live in css/g17.css, scoped under .g17.
const g17 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <radialGradient id="g17sealGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#bfefff" stop-opacity="0.55"/><stop offset="100%" stop-color="#bfefff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <circle class="spin" cx="300" cy="300" r="210" stroke="#22C0E8" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="2 12"/>

  <g stroke-width="1.3" stroke-opacity="0.18">
    <path d="M300,228 L300,142" stroke="#4ADE80"/>
    <path d="M368.5,277.8 L450.3,251.2" stroke="#22C0E8"/>
    <path d="M342.3,358.2 L392.9,427.8" stroke="#7A6FD6"/>
    <path d="M257.7,358.2 L207.1,427.8" stroke="#B08A3E"/>
    <path d="M231.5,277.8 L149.7,251.2" stroke="#419CA0"/>
  </g>

  <g class="dotA" style="offset-path:path('M300,120 L300,248')"><circle r="5" fill="#4ADE80" fill-opacity="0.3"/><circle r="2.2" fill="#bff5d2"/></g>
  <g class="dotB" style="offset-path:path('M471,244 L349.5,283.9')"><circle r="5" fill="#22C0E8" fill-opacity="0.3"/><circle r="2.2" fill="#bfefff"/></g>
  <g class="dotC" style="offset-path:path('M406,446 L330.6,342.1')"><circle r="5" fill="#7A6FD6" fill-opacity="0.3"/><circle r="2.2" fill="#e9e4ff"/></g>
  <g class="dotD" style="offset-path:path('M194,446 L269.4,342.1')"><circle r="5" fill="#B08A3E" fill-opacity="0.3"/><circle r="2.2" fill="#e6d4ad"/></g>
  <g class="dotE" style="offset-path:path('M129,244 L250.5,283.9')"><circle r="5" fill="#419CA0" fill-opacity="0.3"/><circle r="2.2" fill="#bfe6e8"/></g>

  <circle cx="300" cy="300" r="72" stroke="#9aa3af" stroke-opacity="0.4" stroke-width="1.4" fill="#0b0f15"/>

  <circle class="pfA" cx="300" cy="300" r="52" stroke="#4ADE80" stroke-width="3.4" stroke-dasharray="56 271" transform="rotate(-120.8 300 300)" fill="none" stroke-linecap="butt"/>
  <circle class="pfB" cx="300" cy="300" r="52" stroke="#22C0E8" stroke-width="3.4" stroke-dasharray="56 271" transform="rotate(-48.8 300 300)" fill="none" stroke-linecap="butt"/>
  <circle class="pfC" cx="300" cy="300" r="52" stroke="#7A6FD6" stroke-width="3.4" stroke-dasharray="56 271" transform="rotate(23.2 300 300)" fill="none" stroke-linecap="butt"/>
  <circle class="pfD" cx="300" cy="300" r="52" stroke="#B08A3E" stroke-width="3.4" stroke-dasharray="56 271" transform="rotate(95.2 300 300)" fill="none" stroke-linecap="butt"/>
  <circle class="pfE" cx="300" cy="300" r="52" stroke="#419CA0" stroke-width="3.4" stroke-dasharray="56 271" transform="rotate(167.2 300 300)" fill="none" stroke-linecap="butt"/>

  <g class="pend"><circle cx="300" cy="300" r="3.4" fill="#9aa3af"/><circle cx="289" cy="300" r="2" fill="#6b7280"/><circle cx="311" cy="300" r="2" fill="#6b7280"/></g>

  <circle class="sealglow" cx="300" cy="300" r="54" fill="url(#g17sealGrad)"/>
  <g transform="translate(300,300)"><g class="seal">
    <circle r="27" stroke="#22C0E8" stroke-width="2.4" fill="#0D1117"/>
    <circle r="20" stroke="#22C0E8" stroke-opacity="0.5" stroke-width="1" stroke-dasharray="3 4"/>
    <path d="M-10,1 l6,7 l13,-15" stroke="#bfefff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g></g>

  <g class="pfA" transform="translate(300,120) scale(1.55) translate(-11,-11)" stroke="#4ADE80" stroke-width="1.55" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M11 2.5 L18.25 5 L18.25 11 C18.25 15.25 15 18.5 11 19.75 C7 18.5 3.75 15.25 3.75 11 L3.75 5 Z"></path><path d="M7.75 11 L10.25 13.5 L14.5 8.5"></path>
  </g>
  <g class="pfB" transform="translate(471,244) scale(1.55) translate(-11,-11)" stroke="#22C0E8" stroke-width="1.55" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M18.5 11 L14.75 4.5 L7.25 4.5 L3.5 11 L7.25 17.5 L14.75 17.5 Z"></path><circle cx="11" cy="11" r="3"></circle>
  </g>
  <g class="pfC" transform="translate(406,446) scale(1.55) translate(-11,-11)" stroke="#7A6FD6" stroke-width="1.55" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M11 6 C8 4.5 5 4.5 3.5 5.5 L3.5 16 C5 15 8 15 11 16.5"></path><path d="M11 6 C14 4.5 17 4.5 18.5 5.5 L18.5 16 C17 15 14 15 11 16.5"></path><path d="M11 6 L11 16.5"></path>
  </g>
  <g class="pfD" transform="translate(194,446) scale(1.55) translate(-11,-11)" stroke="#B08A3E" stroke-width="1.55" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M5 4.5 L17 4.5 L17 19.25 L5 19.25 Z"></path><path d="M8.5 2.75 L13.5 2.75 L13.5 5.5 L8.5 5.5 Z"></path><path d="M7.75 11.5 L10.25 14 L14.5 9"></path>
  </g>
  <g class="pfE" transform="translate(129,244) scale(1.55) translate(-11,-11)" stroke="#419CA0" stroke-width="1.55" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M3.5 11 C6 6.5 16 6.5 18.5 11 C16 15.5 6 15.5 3.5 11 Z"></path><circle cx="11" cy="11" r="2.75"></circle>
  </g>
</svg>`;
export default g17;
