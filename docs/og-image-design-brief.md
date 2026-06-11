# Design ask — Per-page social preview images (og:image)

**For:** Graphics team
**From:** Web/eng
**Goal:** Replace the single shared, square preview image with a **unique, on-brand, localized** preview image per page, so that when someone shares a CIRIS link (any of 29 languages) the card looks intentional and in-language.

---

## 1. Why this matters

When a CIRIS URL is shared on Slack / iMessage / X / LinkedIn / WhatsApp, the platform shows a **card**: an image + a title + a description. Today **every page shares one 512×512 image** — wrong shape (cards are 1.91:1, so it gets cropped) and generic. The title/description are already unique and localized into 29 languages; the **image is the missing piece.**

---

## 2. The one big decision: how to handle 29 languages

We have **~18 marketing pages + ~26 Accord sections**, each in **29 languages** = ~1,300 cards. Hand-designing all of them is not the ask. Two viable models — **we recommend A:**

- **A. Template + programmatic title (recommended).** You design, per page, a **language-neutral background illustration** (no localized text in the art) plus a **title zone + type spec**. Engineering composites the **already-translated** title onto it at build time, per locale. → You produce ~**19 artworks + 1 layout template**; we generate the 1,300 localized cards. This gives rich, in-language previews cheaply.
- **B. Text-free conceptual images.** One finished image per page, **no text baked in** (the platform shows our localized title beside it). Simplest; you produce ~19 images total. Previews are on-brand but the *image* isn't localized (the *title* still is).

Either way: **do not bake localized sentences into the artwork** (that's the 1,300-file trap). Brand wordmark ("CIRIS") in the art is fine.

---

## 3. Technical specs

| Spec | Value |
|---|---|
| Dimensions | **1200 × 630 px** (1.91:1) — the standard OG / Twitter `summary_large_image` size |
| Safe area | Keep title, logo, focal art within a centered **~1120 × 540** box (platforms crop edges & round corners) |
| Theme | **Dark** (the site's hero uses a near-black `.ciris-dark` surface) — design dark unless a page is clearly light |
| Format | PNG (flat art) or JPG (photographic); target **< 400 KB**, hard cap 1 MB |
| Title legibility | Must read as a **~300 px-wide thumbnail**; for model A, leave a clear title zone (≈ left or bottom third) with a type spec (weight/size/line-height/max-lines=2) |
| Source files | Figma (or SVG) + exported PNGs |

---

## 4. Brand system (use these)

- **Palette:** cyan `#22C0E8`, violet `#7A6FD6`, rose `#E14B7F`, teal `#419CA0`, green `#4ADE80`, gold `#B08A3E`; ink `#151B24` / `#1A222C`; brand blue `#2563EB`. **Signature gradient:** cyan → violet → pink (`#22D3EE → #8B5CF6 → #EC4899`) — used on the site's language switcher; great as an accent/edge.
- **Type:** Inter (site font). Bold, confident headlines.
- **Logo:** the CIRIS wordmark/mark — include a small consistent lockup (corner) on every card.
- **Existing motifs to draw from** (we already ship bespoke SVG diagrams on the homepage — reuse/evolve their visual language): **MeshFlow** (a web of trusting devices), **Funnel** (the internet centralizing into a few buildings), **MetroRing** (locality / stays-in-your-city), **PrivacyRadar** (seven concentric privacy circles), **AttestationLedger** (signed claims stacking), **CaughtLyingCascade** (one lie unravels everything), **Convergence** (one signature → privacy + low-waste + safety).
- **Tone:** hopeful, rigorous, human, **anti-dystopian.** No scary robots, no cold corporate-AI clichés, no glowing blue brains. Think "you can own and check this," "a person is a person through other persons."

---

## 5. Per-page briefs

For each page: the **title/description that will sit next to the image** (so the art complements, not repeats, the words), and a **visual concept.**

### Marketing

1. **`/` — Home** · *"CIRIS: An AI You Can Actually Own"* / one app, no data centers, every claim signed.
   → A phone + a small home box, a green "signed ✓" claim badge, and a crossed-out data-center. Warm, hopeful, ownership. (MeshFlow / cover energy.)

2. **`/install` — Install** · *"Install CIRIS Agent: Android, iOS, or pip"* / auditable, AGPL-3.0, Ed25519-attested.
   → Product shot vibe: the app on a phone + the three install paths (App Store badge, Google Play badge, a terminal `pip install`). Clean, concrete, "get it now."

3. **`/about` — About** · *"The People and L3C Behind Mission-Locked Ethical AI."*
   → Human warmth + the **mission-lock** idea: a padlock fused to a compass/mission glyph. Optional: abstract people-as-circles. Avoid stocky team photos.

4. **`/how-it-works` — How it works** · *"The H3ERE Pipeline."*
   → A clean **left-to-right pipeline**: Observe → Context → Analyze → Conscience-check → Execute, with a small "replayable/auditable" loop arrow. (AttestationLedger language.)

5. **`/trust` — Trust & Identity** · *"Post-Quantum Cryptographic Attestation. Verify the agent, do not trust it."*
   → A **key + dual signature** (Ed25519 + ML-DSA-65) feeding a **hash-chained ledger**; hardware-anchored. Cryptographic, precise. Headline feel: "verify, don't trust."

6. **`/vision` — Vision** · *"A Hopeful Alternative to the Gloomy Stories About AI."*
   → The **anti-Cartesian** idea: a single walled-off figure (grey, cold) vs many **interlinked figures in warm light** — "a person is a person through other persons" (Ubuntu). The most emotional card; make it beautiful.

7. **`/safety` — Safety** · *"The Safest, Most Ethical AI You Can Actually Use."*
   → A big **emergency-stop** button + an **immutable ledger** + a **multilingual shield (29 languages)**. Reassuring, solid, open ("code you can read").

8. **`/crowdsourcing-alignment` — Crowdsourcing alignment** · *"Pick a language. Browse the Accord, propose edits."*
   → A **globe ringed with 29 language scripts** + a collaborative-edit motif (a diff / a hand adding a note). Community + many tongues. (This is the localization showcase — make it the "29 languages" hero.)

9. **`/first-contact` — First Contact** · *"A new kind of intelligence is co-emerging with us, not landing from space."*
   → A gentle **first-contact** between a human and an emergent intelligence that grows *with* us (roots/branches, not a UFO). Wonder, not menace.

10. **`/federation` — Federation** · *"A network of AI agents that watches itself."*
    → **MeshFlow** evolved: a network with a visible **supervision chain** and **signed records** flowing between nodes.

11. **`/compare` — Compare** · *"vs the Alternatives, With Receipts."*
    → A **scorecard / comparison table** with green checks on CIRIS's side, and a literal **receipt** motif ("with receipts"). Confident, a little cheeky.

12. **`/safety-vs-censorship` — Safety vs Censorship** · *"Where crowdsourced safety can drift."*
    → A **tension/balance**: rules (crowd) vs verdicts (machine), a needle **drifting** off-center. Honest, self-critical — not triumphant.

13. **`/services` — Services** · *"Hosted CIRIS Agent. Same price everywhere. No enterprise tiers."*
    → A single **flat, honest price tag** / one tier. Radical pricing simplicity. Calm, trustworthy.

14. **`/models` — Models** · *"Open-Model Lineup for Ethical AI Agents."*
    → A **lineup** of three independent open-model families (Llama 4, Qwen 3.6, Gemma 4) as labeled blocks/cards; tool-centric. Technical, clean.

15. **`/mdd` — Mission Driven Development** · *"Mission as the load-bearing fourth foundation of architecture."*
    → A **blueprint** with four pillars: Logic · Schemas · Protocols · **Mission** (the fourth, highlighted). Architectural, structural.

16. **`/coherence-ratchet` — Coherence Ratchet** · *"Why a powerful AI has to show its work."*
    → A literal **ratchet** mechanism (gear + pawl) that only turns one way — toward coherence/transparency. Mechanical, rigorous.

17. **`/coherence-collapse-analysis` — Collapse analysis** · *"Coherence-Based Alignment, Kish Effect, Effective Dimensionality."*
    → **Mathematical**: intersecting constraint manifolds collapsing to a point, the Kish-formula motif, a "singularity boundary." Elegant, geometric. (Most technical card.)

18. **`/research-status` — Research status** · *"Effective Dimensionality on Production AI Traces."*
    → **Empirical**: real telemetry/traces, a dimensionality chart, the alignment manifold. Data-forward, credible.

### The Accord reader (`/sections/**`)

~26 section pages (Books I–IX, Formulas, Addenda, Annexes A–J, Backmatter). **Recommended: one unified "constitutional document" template**, with the **section name overlaid** (localized) — e.g., a dignified dark cover with "CIRIS Accord · 1.3-RC2" + the section title (`Book IX`, `Annex F`, …). Optional: a subtle per-Book accent color drawn from the palette. This is the constitutional layer of CIRIS — it should feel weighty and timeless, less "marketing," more "charter."

---

## 6. Deliverables

- **Model A:** ~19 background artworks (18 marketing + 1 Accord template) at 1200×630, **text-free** (brand wordmark ok), each with a defined **title zone** + a shared **type/layout spec** (Figma component) so we composite localized titles. Optionally per-Book Accord accents.
- **Model B:** ~19 finished 1200×630 images (text-free).
- Source files (Figma) + exported PNGs.
- **Naming:** `og-<slug>.png` — e.g. `og-home.png`, `og-trust.png`, `og-sections.png`. Engineering maps these to `/og/<slug>.png` and (model A) generates the per-locale versions.

## 7. How engineering wires it

We already hold all **29 localized titles** (in `src/lib/marketing-og.ts` for marketing, and the Accord section frontmatter). For **model A**, hand us the title-less art + the type spec and we generate one card per page per locale at build time, setting each page's `og:image` to its localized card. For **model B**, one image per page is used across all locales (the platform renders our localized `og:title`/`og:description` beside it).

Quick win regardless: even the **English set at the correct 1200×630** would immediately beat today's cropped 512×512 shared image.
