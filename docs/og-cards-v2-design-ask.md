# Design ask v2: finish, brighten, and animate the social cards

**For:** Graphics team
**From:** Web/eng
**Builds on:** `docs/og-image-design-brief.md` (v1, the brief that produced the current cards). Read that first for the brand system and the per-page concepts already shipped.

Four asks: **(1)** design the missing cards, **(2)** make every card more vibrant, **(3)** animate every card (with a static fallback for social), **(4)** refresh the CEWP/decentralized-web graphics.

---

## 0. What exists today (so you are not redesigning from zero)

- **Model A is live.** Each card is text-free 1200x630 brand art plus one consistent **localized title zone** (eyebrow + headline, bottom-left) that engineering composites per language. The same art ships in **29 languages**.
- **Pipeline:** the cards are React/SVG components in `scripts/og/cards/` (`shell.jsx` is the shared frame; `cards-a/b/c.jsx` the marketing set; `cards-accord.jsx` the charter template; `cards-default.jsx` the generic brand card). `scripts/og/generate.py` renders each to a 1200x630 JPEG per locale. So **whatever you design lands as a small SVG/React composition, not a flat PNG** — which is exactly why animation (ask 3) is cheap to wire.
- **Coverage now:** 18 marketing pages + the Accord template have bespoke cards. Everything else falls back to the generic CIRIS brand card.
- **Palette (use verbatim):** bg `#0D1117` / deep `#090C10`; teal `#419CA0`, cyan `#22C0E8`, violet `#7A6FD6`, rose `#E14B7F`, green `#4ADE80`, brass `#B08A3E`, rust `#C96A38`; text `#F4F5F7`. **Signature gradient (lean into this for ask 2):** `#22D3EE` → `#8B5CF6` → `#EC4899` (cyan → violet → pink).
- **Existing motifs to reuse/evolve:** MeshFlow, Funnel, MetroRing, PrivacyRadar, AttestationLedger, CaughtLyingCascade, Convergence.
- **Tone (unchanged):** hopeful, rigorous, human, anti-dystopian. No scary robots, no cold corporate-AI clichés, no glowing blue brains.

---

## 1. Add the remaining cards

These public pages currently share the generic brand card and deserve their own. Same Model A rules: **text-free art + a defined title zone**, never bake localized sentences into the art (29-locale trap). Listed by priority.

1. **`/epistemic-web` — the umbrella front door (HIGHEST priority).** Title sits next to it: *"What is an epistemic web?"* The concept: the web **with its receipts** — every claim signed, attributed, traceable. Visual: a web/graph of claims where each node carries a small signature/seal, links between them are signed threads (agree / correct / supersede), and the trail is luminous and followable. This is the most-shared, most-persuasive page now; make it the hero of the set. (Connects to ask 4: the epistemic web rides CEWP.)

2. **`/cewp` — the decentralized network.** *"The internet, rebuilt without the middleman."* See **ask 4** for the full visual direction. The card should read as a peer-to-peer mesh of personal devices carrying everything (streaming, calls, gaming, files), no data centers in the middle.

3. **`/grammar` — CEG, the language.** *"See who said it. See who agrees. Decide for yourself."* Visual: a single signed claim envelope at center, other envelopes composing around it (agree / disagree / correct / supersede), the whole trail readable end-to-end. AttestationLedger language, evolved and brightened.

4. **`/events` — talks & conferences.** *"Where CIRIS is showing up."* Visual: a warm, human "on a stage / in the room" energy, or a signal radiating from a point on a globe to many. Less abstract than the rest; this one is about real people in real rooms.

5. **`/papers` — the research.** *"The empirical and formal backing."* Visual: rigorous and quiet — a constraint manifold, the k_eff collapse curve, a Lean-proof lattice, or stacked signed documents. The "credible, technical" card. (Optionally a shared template the four per-paper pages can reuse.)

6. **Optional: per-Book Accord accents.** The Accord template (`cards-accord.jsx`) already supports a per-Book accent (Book IX brass, Book I cyan, Formulas violet, Annex teal). We pruned the rendered variants to save weight; if the brightened Accord card (ask 2) looks great, we may re-enable per-Book accents. Design the accent system, not 26 separate cards.

---

## 2. Make every card more vibrant

The current set is deliberately dark and restrained. It reads as elegant at full size but **muddy as a 300px thumbnail** in a busy feed, which is where these actually live. Push it.

- **Lean hard into the signature gradient** (`#22D3EE → #8B5CF6 → #EC4899`) as a luminous accent: glowing edges, a gradient rim-light on the focal art, brighter radial accent fields. Today's accent glows sit at ~10-16% opacity; roughly double that.
- **Raise chroma and contrast on the focal art** so the subject pops off the dark base. Keep the near-black background (brand, and it makes the title legible), but let the art elements **emit light**.
- **The thumbnail test is the bar:** at ~300px wide the card must still read as intentional, in-brand, and distinct from the others. If two cards are indistinguishable as thumbnails, push their accent colors apart.
- **Guardrails:** do not blow out the bottom-left title zone (the scrim that keeps composited text legible must survive the brightening), keep the corner CIRIS lockup readable, and stay tasteful — vibrant, not neon-soup. Dark + luminous, not light mode.

Deliver this as an **updated style pass across all cards** (the existing 18 + Accord + brand + the new ones from ask 1), so the whole set is consistent.

---

## 3. Animate every card (static fallback is mandatory)

**Read this constraint first, it shapes the deliverable.** Major social scrapers (Facebook, Instagram, LinkedIn, and most others) **do not animate the `og:image`** — they show the first frame or ignore motion. The Open Graph spec technically allows animated GIFs, but platforms flatten them for consistent rendering. So we are **not** replacing the static card with a GIF/MP4.

Instead, every card gets **two deliverables**:

- **(A) A static poster frame — this stays the `og:image`.** A single, deliberately-composed key frame (the most striking moment of the animation), exported 1200x630 as **JPEG/PNG/WebP**. This is what 95% of shares actually render. It must stand alone as a great still. (This is the brightened card from ask 2.)
- **(B) An animated version — for the surfaces that *do* play motion:** the website itself (hero/section embeds), Discord and Slack unfurls, X/Twitter, presentation decks, and `og:video` where supported. We will also add `og:video` / `twitter:player` tags so platforms that honor them get the motion, while `og:image` stays the static poster.

**Motion direction (subtle, looping, on-brand — this is ambient motion, not a TikTok):**

- Short seamless loop, roughly **3–6 seconds**, ease-in-out, no hard cuts.
- Per-card ideas: the CIRIS mark slowly rotating/breathing; the mesh links pulsing as signed packets travel device to device; a "signed ✓" badge resolving onto a claim; the attestation trail drawing itself; the signature gradient drifting across a rim-light; the k_eff curve collapsing and resetting.
- **Implementation reality:** because the cards are already SVG/React, you can hand us **Lottie JSON** (preferred — vector, tiny, crisp at any size) or a motion spec we implement in CSS/SVG. For sharing surfaces we will export **MP4 + WebM** (and a GIF fallback) from the same source, and the **static poster is the designed key frame**, not a random first frame.
- **Weight budget:** Lottie/web animation under ~150 KB; exported MP4/WebM under ~1.5 MB; keep loops short so file size stays small.

So the rule of thumb: **design the loop, then choose its single best frame as the poster.** Both come from one composition.

---

## 4. Refresh the CEWP / decentralized-web graphics

CEWP's framing has sharpened since v1. It is no longer "a better internet" in the abstract; it is a **complete replacement for the internet**: everything you do online (streaming, video calls, gaming, files, messages, signed claims) routed **directly between the devices people already own**, post-quantum encrypted, **no data centers**, **no big tech in the middle**, and the network **governs itself** (no platform owner). The graphics should say all of that at a glance.

Visual direction (applies to the `/cewp` and `/epistemic-web` cards, and evolves the MeshFlow/Funnel motifs everywhere they appear):

- **A true peer-to-peer mesh of *personal* devices** — phones, laptops, a home box — linked **directly to each other**, not through a hub. This is the core image. Evolve MeshFlow from "a web of trusting devices" into "the network *is* the devices."
- **No middle:** show the hyperscale data center crossed out / faded / bypassed (Funnel motif, inverted — the funnel is gone). The contrast is the point: today's internet routes through a few warehouses; CEWP does not.
- **Everything rides the mesh:** small glyphs of a video stream, a call, a game controller, a file, a signed claim, all flowing along the device-to-device links. "Not just AI, everything."
- **Post-quantum + signed:** a subtle lock or dual-key motif on the links (hybrid Ed25519 + ML-DSA-65), and the signed-packet idea (each hop is attested).
- **Self-governing:** optionally, nodes casting weighted votes / a quorum glow, to hint that the network polices itself with no owner.
- Keep it **warm and hopeful**, not a cold cyberpunk grid. People own this.

---

## 5. Technical specs

| Spec | Value |
|---|---|
| Dimensions | 1200 x 630 (1.91:1), the OG / `summary_large_image` standard |
| Safe area | keep focal art + title zone within a centered ~1120 x 540 box |
| Theme | dark base (`#0D1117` / `#090C10`), luminous art |
| Static (the `og:image`) | JPEG/PNG/WebP, < 400 KB target, one designed poster frame per card |
| Animated | Lottie JSON (web, < ~150 KB) **and** MP4 + WebM (+ GIF fallback, < ~1.5 MB) for sharing surfaces |
| Title zone | leave the bottom-left ~third clear; eyebrow + 2-line headline, composited per locale by eng (do not bake text in) |
| Source | Figma (or SVG) + the motion source; we re-implement as the existing card components |
| Naming | `og-<slug>` (e.g. `og-epistemic-web`, `og-cewp`, `og-events`, `og-papers`) |

---

## 6. Deliverables

1. **New cards (ask 1):** `og-epistemic-web`, `og-cewp`, `og-grammar`, `og-events`, `og-papers` (+ optional per-Book Accord accent system), each as Model A art + title-zone spec.
2. **Vibrancy pass (ask 2):** a brightened restyle of the full set (existing 18 + Accord + brand + new), consistent across all.
3. **Animation (ask 3):** for every card, a **static poster frame** (the `og:image`) **and** an animated loop (Lottie + MP4/WebM/GIF), from one composition.
4. **CEWP/decentralized-web refresh (ask 4):** the device-to-device mesh direction applied to `/cewp`, `/epistemic-web`, and the shared mesh/funnel motifs.
5. Source files (Figma + motion) so eng can re-implement in `scripts/og/cards/`.

---

## 7. How engineering wires it

- **Static posters** flow into `scripts/og/cards/` as the card components and render per-locale via `generate.py` to `public/og/[<locale>/]og-<slug>.jpg`. We add each new slug to `DESIGNED_OG_CARDS` in `src/lib/seo.ts` and `jobs.txt`; `localizedSeo()` then sets each page's `og:image` automatically across all 29 locales.
- **Animations** get embedded on the pages themselves (hero/section) and exported to `og:video` / `twitter:player` for the platforms that honor motion, while `og:image` stays the static poster — exactly the best-practice split: static preview, animation on the page it links to.
- Net: you design **one motion composition per card**; we get a great still *and* a great loop out of it, and the still is what keeps rendering everywhere the loop can't.
