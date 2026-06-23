# CIRIS site rebuild — structure sketch

Fresh repo (`ciris-web`), clean slate. Same proven stack, but **localization-first,
glossary-led, graphics-first** from commit #1 — none of it retrofitted.

## Why a fresh repo (not a refactor)
- `.git` is ~1.8GB of OG-media history; a clean repo drops that dead weight.
- 41 legacy routes carry English-first prose + per-page density we're deleting anyway.
- Localization-first and glossary-led only work if they're load-bearing from the
  start; bolting them onto the current tree fights it.
- We keep the **wins** by copying them over deliberately (below), not the cruft.

## Carry over (the things we already got right)
- **Deploy:** Next 15 static export → Cloudflare Workers-assets. `wrangler` pinned as
  a devDependency (the ENOSPC fix). `cache:false` in next.config.
- **Theme:** hard-dark (forced via RootProvider + `.dark` tokens). One theme, no toggle.
- **OG cards:** the localized 1200×630 system (`scripts/og/`) — but **media → R2 from
  day one**, never committed to git (this is what bit us; fix it at the root).
- **Canvas engine:** `mesh-engine.js` (the globe hero + the reel).
- **Constitution reader:** fumadocs, but now rendering **Constitution 0.4** (Accord+CEG).
- **SEO:** sitemaps, IndexNow, JSON-LD, hreflang, citation tags for papers.

## Content model — the four-fear skeleton
```
src/app/
  (home)/                  ← the lobby: "what keeps you up at night?" + 4 doors
  paths/
    consumer-ai/           ← ① "no AI I'd trust with my family"
    superalignment/        ← ② "AI is outrunning accountability"
    misinformation/        ← ③ "I can't tell what's true"
    big-tech/              ← ④ "five companies own everything"
  epistemic-web/           ← CONVERGENCE: four doors, one floor
  vision/                  ← the manifesto / synthesis
  proof/
    research-status/       ← measured vs model
    papers/[slug]/         ← Zenodo-backed
  constitution/[[...slug]] ← the Constitution 0.4 reader (was /sections)
  glossary/[term]/         ← every concept defined once
  legal/ (privacy, safety-policy, canary, status, events, compliance)
  [locale]/…               ← full SSG mirror, English at root
```
Every named legacy page survives as a **redirect or a section** inside one of these
(per the simplification map) — 0 deletions, SEO intact.

## Localization-first
- The i18n dictionary is the **source of truth**. There is no hardcoded English in
  components — `en` is just a locale. Authoring = writing simple English *into the dict*.
- **Reading level: middle-school, hard cap.** Short sentences. No jargon in prose;
  jargon lives in the glossary and is *linked*, never inlined.
- Strings carry only words. **No text baked into graphics** (see design asks) so a
  graphic ships once for all 29 languages.
- Translation stays the fan-out-agents workflow (~150–270 strings/agent, per-chunk
  scratch files), run *per content unit as it lands* — not in a big retrofit.

## Glossary-led (the complexity sink)
- A first-class content type: `src/i18n/glossary/<locale>.json` → `{ term: {short, long, seeAlso[], href} }`.
- An inline `<Term k="fabric-node">fabric node</Term>` component: tooltip with the
  one-line plain definition, links to `/glossary/fabric-node`, links out to the repo.
- This is how prose stays middle-school while the project stays deep: **the page says
  the simple thing and links the hard word.** Each term is translated *once*, so the
  whole site's vocabulary is consistent across 29 languages by construction.
- Seed terms: epistemic web · fabric node · attestation · CEG / the grammar ·
  federation · holographic erasure coding · post-quantum identity · locality dividend ·
  weighted-aggregate scoring · superalignment · L0/L1 node · the Constitution.

## Graphics-first
- Every path + convergence + key proof page leads with **one rich, animated,
  text-free graphic** — the norm, not the exception (the current 7 SVG explainers +
  the canvas globe set the bar).
- Library at `src/graphics/<Name>/` — animated SVG for explainers, canvas for the
  hero/reel. Brand tokens, dark, `prefers-reduced-motion` aware.
- Text labels (if any) are overlaid from the dictionary, same trick as the OG cards.

## Build order
1. Scaffold repo + carry-overs (deploy, theme, i18n, glossary primitive, graphics lib).
2. **Home lobby** (the question + four mirror-doors + convergence teaser).
3. **Four path pages** — each the identical FEAR→MECHANISM→CONSEQUENCE→COLLAPSE staircase.
4. **Convergence** (epistemic-web) + **vision** (manifesto).
5. **Constitution 0.4 reader** (reframe /sections).
6. **Proof** (research-status honesty page + papers).
7. Thin/redirect the legacy long tail. Localize each unit as it lands.
