# Design asks — CIRIS site rebuild graphics

For the design team / Claude Design. The rebuild leads every path + convergence +
key-proof page with **one rich, animated, text-free graphic**. This is the norm.

## The visual language: "dark blueprint"
Reconcile the pitch deck's blueprint precision with the site's hard-dark theme.
- **Background:** `#0D1117`. Faint graph-paper grid + measurement ticks/dimension
  lines (the deck's NotebookLM look, inverted to dark). Precision *is* the message:
  it signals "measured, not theory."
- **Accents (brand tokens):** teal `#419CA0`, cyan `#22C0E8`, violet `#7A6FD6`,
  rose `#E14B7F`, brass `#B08A3E`, ok-green `#4ADE80`. Signature gradient
  cyan→violet→rose for hero moments.
- **Motion:** continuous, calm, looping (SVG CSS keyframes for explainers; canvas
  for hero/reel). Must honor `prefers-reduced-motion` (freeze to a clean still).
- **HARD RULE — no baked text.** Graphics carry shapes/lines/motion only. Any label
  is overlaid from the dictionary at render (the OG-card trick) so one asset serves
  all 29 languages. Numbers that are universal (161.9µs, 65%) may appear as glyphs
  but prefer overlay.
- **Weight:** SVG+CSS for explainers (the current 7 are the bar, ~40–60 lines);
  canvas only where it earns it (globe/reel). Keep each under a few hundred KB.

## The graphics (priority order)

### 1. Lobby hero — "four fears, one floor"  ★ flagship
Home page. The structural metaphor: four distinct entry points (the four fears)
that all rest on one shared floor/substrate. Suggested: four staircases descending
from four corners into a single glowing base; or the mesh globe with four labeled
approach-vectors converging. Must feel like *one thing seen four ways*, not four
products. Label zones overlaid: the four fears + the question.

### 2. ① Consumer AI — "it never leaves your phone"
A phone with a warm local glow; data particles that circle inside it and pointedly
do **not** escape to the cloud; a faint shield. Conveys the locality dividend
(65% never leaves the device) and "no datacenter behind it."

### 3. ② Superalignment — "the agent inside the accountable mesh"
The deck's Synthesis figure, animated: an AI agent at the center of a holonomic,
cryptographically accountable federation; every action emits a small signed-artifact
glyph onto the mesh. Reads as "accountability is structural, not a policy."
(Seed: the existing canvas mesh + `Convergence` SVG.)

### 4. ③ Misinformation — "the web with receipts"
A single claim with its provenance chain unfurling: who signed it → what it rests on
→ who agreed/corrected/replaced it. An attestation graph you can *read*. Seeds exist:
`AttestationLedger`, `CaughtLyingCascade`.

### 5. ④a Big Tech — "the datacenter is unnecessary"
The deck's slide-2 motion: a monolithic datacenter shattering into a peer mesh.
Red "authority roots in accountable humans, never in bare infrastructure" energy.

### 6. ④b Big Tech — "one server per ten humans"
The deck's slide-9 world map: real-topology mesh (PeeringDB/CAIDA vibe) lighting up
across the globe; payoff that 5B users fit on home-server-class hardware. Animated
node-chain tracer.

### 7. Convergence — "four doors, one room"  ★
The reveal: the four path-colors flow inward and resolve into the single substrate.
Each inbound stream is one fear; they cross-weave at the center. This is the
iPhone-collapse moment rendered.

### 8. Fabric Node — "agent = fabric node × brain"
The deck's slide-6 exploded diagram, animated: the Brain cube × the Fabric Node
(Registry / Lens / Node on top; Verify / Persist / Edge substrate trio below).
Used on `/big-tech` + the architecture explainer.

### 9. Federation of equals
Deck slide 4: Human · AI Agent · Organization as the *same identity shape* (same
key glyph), joined by the grammar. Each a first-class node.

### 10. Proof — holographic survival
Deck slide 7: an N=20/K=6 fragment grid; fragments drop out (red), the whole still
reconstructs (99.6% at 33% loss). Pair with the O(log T) memory pyramid curve.

## Handoff format
Same as the prior handoffs (OG cards, mesh animation): deliver each as a
**self-contained prototype** (HTML/CSS/SVG, or canvas JS like `mesh-engine.js`) we
re-integrate as a React component. Include the README with tokens + motion timings.
Text-free; label anchors marked so we can wire dictionary overlays.

## Not graphics (built in code, not designed)
Benchmark scoreboard (styled table, MEASURED/MODEL tags), the glossary tooltips,
the Constitution reader (fumadocs) — these are code, listed here so they're not
double-commissioned.
