# CIRIS narrative components — web handoff

Lifted from the CIRIS pitch deck for the ciris.ai homepage rebuild.
React 18 + TypeScript + **plain CSS Modules** (no styled-components / emotion).
None of the deck-stage / slide-scaling / Tweaks / speaker-notes scaffolding is
included — these are page-ready building blocks.

## Contents

```
ciris-handoff/
  tokens.css                      # narrative-scope CSS custom properties + font note
  deck-motion.css                 # global keyframe library + .rise/.anim/.in reveal pattern
  components/
    Funnel/                       # slide 1 — 5B dots → bottleneck → server racks
    MeshFlow/                     # cover + slide 10 — small-world trust graph
    MetroRing/                    # slide 4 — locality dividend metro ring
    PrivacyRadar/                 # slide 5 — seven privacy circles + contained pulses
    AttestationLedger/            # slide 6 — signed claim / agreed / loses-trust
    CaughtLyingCascade/           # slide 7 — 8.5s "caught lying" cascade
    Convergence/                  # slide 8 — three inputs → "every byte is signed"
```

Each component folder holds `<Name>.tsx` + `<Name>.module.css` (colocated).

## Install

1. Drop `tokens.css` and (optionally) `deck-motion.css` into your global styles,
   or import them on the narrative pages only:
   ```ts
   import './ciris-handoff/tokens.css';
   import './ciris-handoff/deck-motion.css'; // only for the scroll-reveal pattern
   ```
   Tokens are exposed both on `:root` and under a `.ciris-dark` wrapper, so you
   can keep them off the global type/color stack and opt in per page:
   ```tsx
   <main className="ciris-dark"> … </main>
   ```
2. Add the Geist + Geist Mono fonts on those pages (see the snippet in
   `tokens.css`; prefer `next/font/google` in Next.js).
3. Import a component:
   ```tsx
   import Convergence from '@/ciris-handoff/components/Convergence/Convergence';
   import PrivacyRadar from '@/ciris-handoff/components/PrivacyRadar/PrivacyRadar';

   <PrivacyRadar accent="#7A6FD6" coreLabel="self" outerLabel="global commons" />
   <Convergence coreTitle="every byte is signed" />
   ```

## Props (every component takes `accent?: string` (hex) + `className?: string`)

| Component | Extra props | Geometry |
|---|---|---|
| `Funnel` | — | fixed illustration |
| `MeshFlow` | — | fixed illustration |
| `MetroRing` | — | fixed illustration |
| `PrivacyRadar` | `coreLabel`, `outerLabel` | fixed (7 rings) |
| `AttestationLedger` | `claim`, `hash`, `agreed` (n checks), `pushedBackLabel` | n/a (flow layout) |
| `CaughtLyingCascade` | `sourceLabel`, `misleadingLabel`, `claims` (≤3), `conclusionLabel` | fixed |
| `Convergence` | `coreTitle`, `coreSub`, `inputs` ([{label,color}] × 3) | fixed |

Re: your Q2 — the **content** props above are exposed now; **geometry**
(node positions, ring radii, the people dot-cloud, connector paths) is kept as
fixed illustration for visual fidelity. All of it is plain markup in each .tsx,
so parameterising radii/positions later is a small, local change — say the word
and we can add e.g. `PrivacyRadar({ rings })` or `MeshFlow({ nodes, links })`.

## Reduced-motion contract

Every component wraps its loops in `@media (prefers-reduced-motion: no-preference)`
and authors the **base (un-animated) state as the final, readable visual**, so
`prefers-reduced-motion: reduce`, print, and SSR/no-JS all show a clean static
diagram — never a pre-animation blank. Per component, the frozen state is:

- **Funnel** — full diagram, lines/LEDs static.
- **MeshFlow** — mesh + nodes visible; trace packets and pings hidden (atmosphere only).
- **MetroRing** — ring + all links/nodes static.
- **PrivacyRadar** — all seven rings + core + labels; sonar pulses hidden.
- **AttestationLedger** — all checkmarks, seal and pill fully visible (no pop/pulse).
- **CaughtLyingCascade** — the calm "trusted" pre-cascade state (source teal, no
  strike-through, no re-open). The takeaway sentence carries the meaning in copy.
- **Convergence** — inputs + connectors + core visible; flow + travelling dots hidden.

## Self-containment note

Components define their own `@keyframes` **inside their CSS module** (CSS Modules
scope keyframe names), so they animate without `deck-motion.css` and are
import-order-independent. `deck-motion.css` is the separate global library: the
`.rise / .anim / .in / .d1–.d4` scroll-reveal pattern plus the full keyframe set,
for page-level animation and reuse.

### Scroll-reveal usage (deck-motion.css)
```tsx
// add "anim" to the section, "rise" (+ d1..d4) to children, toggle "in" on enter:
const ref = useRef<HTMLDivElement>(null);
useEffect(() => {
  const els = ref.current!.querySelectorAll('.rise');
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.2 }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}, []);
return <section ref={ref} className="anim"> <h2 className="rise d1">…</h2> … </section>;
```

## Notes
- CSS uses `color-mix(in srgb, var(--accent) N%, transparent)` for accent tints
  (Baseline 2023; fine for a modern Next.js target). If you must support older
  browsers, swap those for static rgba() values.
- Components are presentational and side-effect-free; safe in Server Components,
  though the motion is purely CSS (no JS needed).
- `AttestationLedger` / `CaughtLyingCascade` / `Convergence` are HTML+CSS; the
  rest are inline SVG. All scale fluidly to their container width.
