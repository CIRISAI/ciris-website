// Graphic 15 — Trust Seal (post-quantum dual signature). Text-free SVG, ported verbatim from the design team.
const g15 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="g15glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22C0E8" stop-opacity="0.45"/><stop offset="100%" stop-color="#22C0E8" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="g15clip"><rect x="120" y="250" width="360" height="200" rx="14"/></clipPath>
      </defs>

      <g class="keypulse" transform="translate(300,118)">
        <circle r="30" stroke="#22C0E8" stroke-width="2" fill="#22C0E8" fill-opacity="0.08"/>
        <circle r="11" stroke="#22C0E8" stroke-width="1.8"/>
        <path d="M0,11 V42 M0,28 H14 M0,36 H10" stroke="#22C0E8" stroke-width="1.8" stroke-linecap="round"/>
      </g>

      <path class="sig sigA" style="--len:150" d="M286,168 C250,205 232,228 232,262" stroke="#22C0E8" stroke-width="1.8"/>
      <path class="sig sigB" style="--len:150" d="M314,168 C350,205 368,228 368,262" stroke="#7fd8f2" stroke-width="1.8" stroke-dasharray="150" />

      <g class="rec">
        <rect x="190" y="282" width="220" height="150" rx="13" stroke="#9aa3af" stroke-opacity="0.5" stroke-width="1.5" fill="#11161d"/>
        <path d="M214,312 h150 M214,328 h128 M214,344 h150 M214,360 h96" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round"/>
      </g>

      <g transform="translate(300,408)"><g class="survive">
        <circle r="40" fill="url(#g15glow)"/>
        <circle r="25" stroke="#22C0E8" stroke-width="2.2" fill="#0D1117"/>
        <path d="M-13,-6 a14,14 0 0 1 26,0" stroke="#22C0E8" stroke-width="2" fill="none"/>
        <path d="M-13,6 a14,14 0 0 0 26,0" stroke="#7fd8f2" stroke-width="2" fill="none"/>
        <circle r="3.4" fill="#e8fbff"/>
      </g></g>

      <g clip-path="url(#g15clip)">
        <g class="sweep">
          <rect x="-12" y="250" width="24" height="200" fill="#bff0ff" opacity="0.16"/>
          <line x1="0" y1="250" x2="0" y2="450" stroke="#cfeeff" stroke-width="1.4" stroke-opacity="0.7"/>
          <line x1="-8" y1="250" x2="-8" y2="450" stroke="#7fd8f2" stroke-width="1" stroke-opacity="0.4"/>
          <line x1="8" y1="250" x2="8" y2="450" stroke="#7fd8f2" stroke-width="1" stroke-opacity="0.4"/>
        </g>
      </g>
    </svg>`;
export default g15;
