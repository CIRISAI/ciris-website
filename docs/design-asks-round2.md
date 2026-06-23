# CIRIS site — Graphics ask, round 2

Round 1 shipped the convergence hero (g01), the four path heroes (g02–05), and
the static proof set (g06–10). All are wired and live. After a full quality pass
on the rebuilt v2 site, here is what would most raise the bar. Same rules as
round 1: **dark blueprint** (#0D1117 + faint grid), **text-free** (every label
overlaid from the dictionary, one asset serves all 29 locales), `<300KB`,
honors `prefers-reduced-motion`, holds up on a 4-year-old Android.

Tokens: teal #419CA0 · cyan #22C0E8 · violet #7A6FD6 · rose #E14B7F · brass
#B08A3E · ok #4ADE80 · core #bfefff.

## A. Hero graphics for pages that still lead with text only

The brief said *every* path/concept/proof page should lead with one rich
graphic. These rebuilt pages currently have none (or reuse another page's):

1. **/safety — the conscience + the human stop.** ★ highest value. A running
   agent whose every action passes through a conscience gate; one control, a
   physical *halt*, sits in a human hand outside the machine and is the only
   thing never automated. Reads as "safety is structural, and the off-switch is
   human." Accent ok/rose. Animate (the gate pulses; the halt is calm, always lit).

2. **/vision "The Reaching" — a quiet reaching motif.** ★ A slow, faint chain
   of reaching gestures / rungs ascending toward light (atoms → cells → people →
   beyond), resolving upward. Must be *subdued* — it sits behind a long
   first-person manifesto and must never compete with the prose. Violet/core,
   very low contrast, slow. This is the emotional centerpiece; treat it like the
   convergence hero's quieter sibling.

3. **/grammar (the Constitution) — prefixes composing into a sealed statement.**
   Small typed prefixes snap together into one signed/sealed line (the epistemic
   grammar → a constitution seal). Accent brass/violet. Light animation (the seal
   sets).

4. **/mdd — mission as the fourth foundation.** Three pillars (logic · schemas ·
   protocols) plus a fourth beam (mission) that locks the structure so it cannot
   drift. Accent brass. Static or a single settling motion.

5. **/trust — a bespoke post-quantum identity seal** (replaces the reused g03).
   One identity key producing a dual signature (Ed25519 + ML-DSA-65) that seals a
   record; the seal survives a "quantum" sweep. Accent teal/cyan. Animate the
   double-seal.

6. **/coherence-ratchet & /coherence-collapse-analysis — the deck's math, dark.**
   (a) a ratchet that only turns one way (coherence can rise, not silently fall);
   (b) the effective-dimensionality / diversity-collapse curve with the
   singularity boundary. Accent violet/rose. Static is fine.

## B. OG social-card refresh (1200×630, text-free art + composited title)

- **og-home / the convergence card** — the current home OG still uses the round-0
  Model-A brand art. Refresh it to the **field-convergence** look (four streams →
  one floor) so the share preview matches the new hero. ★
- **A bespoke "The Reaching" / vision OG card** — quiet, the reaching motif from
  A2, title composited. ★
- (Lower priority) refresh the remaining kept-page OG cards (trust, federation,
  how-it-works, research-status, install, epistemic-web) to the v2 look as the
  reaching/safety/grammar art lands.

## C. Tuning

- **Convergence hero:** a touch more core brightness + stream density on small
  screens (it reads a little faint on mobile). Keep the four corner labels'
  breathing room at <420px.
- **Direction-neutral art:** keep all art mirror-safe — the site now emits
  `dir=rtl` server-side for ar/fa/ur, and the code keeps the canvas physical
  (labels pinned to the matching stream), so the design just needs to avoid baking
  any left/right-meaningful arrows into the art (none currently do).

## Handoff format (unchanged)

Each as a self-contained prototype (HTML/CSS/SVG, or canvas JS) we re-integrate
as a React component; text-free with marked label anchors; short README with
tokens + motion timings.
