// Graphic 09 — Holographic Survival. Text-free SVG, ported verbatim from the design team.
const g09 = `<svg viewBox="0 0 600 600" width="100%" height="100%" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="g09glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#7A6FD6" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#7A6FD6" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g stroke="#7A6FD6" stroke-opacity="0.45" stroke-width="1.1">
        <path d="M180,150 L300,470"/><path d="M300,205 L300,470"/><path d="M360,260 L300,470"/>
        <path d="M420,260 L300,470"/><path d="M180,315 L300,470"/><path d="M420,315 L300,470"/>
      </g>

      <g stroke-width="1.6">
        <g><rect x="160" y="130" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="180" cy="150" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="180" cy="150" r="2.6" fill="#bfb4f5"/></g>
        <g><rect x="220" y="130" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="240" cy="150" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="280" y="130" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="340" y="130" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="360" cy="150" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="400" y="130" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="420" cy="150" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="160" y="185" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="220" y="185" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="240" cy="205" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="280" y="185" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="300" cy="205" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="300" cy="205" r="2.6" fill="#bfb4f5"/></g>
        <g><rect x="340" y="185" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="360" cy="205" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="400" y="185" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="160" y="240" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="180" cy="260" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="220" y="240" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="280" y="240" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="300" cy="260" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="340" y="240" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="360" cy="260" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="360" cy="260" r="2.6" fill="#bfb4f5"/></g>
        <g><rect x="400" y="240" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="420" cy="260" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="420" cy="260" r="2.6" fill="#bfb4f5"/></g>
        <g><rect x="160" y="295" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="180" cy="315" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="180" cy="315" r="2.6" fill="#bfb4f5"/></g>
        <g><rect x="220" y="295" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="280" y="295" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.1"/><circle cx="300" cy="315" r="2.6" fill="#7A6FD6"/></g>
        <g><rect x="340" y="295" width="40" height="40" rx="7" stroke="#3a3f49" stroke-dasharray="3 4" fill="none"/></g>
        <g><rect x="400" y="295" width="40" height="40" rx="7" stroke="#7A6FD6" fill="#7A6FD6" fill-opacity="0.14"/><circle cx="420" cy="315" r="9" stroke="#bfb4f5" stroke-width="1.5"/><circle cx="420" cy="315" r="2.6" fill="#bfb4f5"/></g>
      </g>

      <circle cx="300" cy="470" r="50" fill="url(#g09glow)"/>
      <g transform="translate(300,470)">
        <path d="M0,-34 L29.4,-17 L29.4,17 L0,34 L-29.4,17 L-29.4,-17 Z" fill="#0D1117" stroke="#7A6FD6" stroke-width="2"/>
        <path d="M0,-18 L15.6,-9 L15.6,9 L0,18 L-15.6,9 L-15.6,-9 Z" stroke="#7A6FD6" stroke-opacity="0.6" stroke-width="1.3"/>
        <circle r="6" fill="#7A6FD6"/><circle r="2.4" fill="#e9e4ff"/>
        <path d="M11,-22 l4,3.5 l7,-7" stroke="#4ADE80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`;
export default g09;
