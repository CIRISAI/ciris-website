# Site simplification map — "four fears, one floor"

**Principle:** the website explains, in plain middle-school English, that *there is a
path forward*. All real complexity (proofs, specs, code, benchmarks) lives in
**GitHub / Zenodo**; pages link out to it instead of carrying it. Named-concept
pages are **kept and thinned** for SEO/community, never deleted.

## The skeleton

```
LOBBY  (home)
  "The world has more problems than answers. What keeps you up at night?"
        │
        ├── ① Consumer AI         "No AI I'd trust with my family."
        ├── ② Superalignment      "AI is outrunning anyone accountable for it."
        ├── ③ Misinformation      "I can't tell what's true, and can't check."
        └── ④ Big Tech / Datacenters  "Five companies own everything I do."
                each runs the SAME staircase:
                FEAR → MECHANISM → CONSEQUENCE → COLLAPSE
        │
   CONVERGENCE   "Four doors, one room. Remove the center and all four dissolve."
        │
     PROOF       measured benchmarks · the Constitution 0.4 · the apps you can install now
        │
   UTILITY       legal / status / community (exist, low-touch)
```

Two facts driving this:
- **CIRIS Constitution 0.4** = the old **Accord** (`/sections`) **+ CEG** (`/grammar*`)
  merged into one document (source: `CIRISRegistry/FSD/CIRIS_Constitution`). The
  site treats them as **one** "Constitution" reader now.
- **CEWP advanced** — `/cewp` + `/epistemic-web` get the new measured numbers
  (~1 server / 10 humans, PQ identity 161.9µs, 2.24 GiB/s/core, erasure N=20/K=6/H=30
  → 99.6% @ 33% loss, conformance 13/0/44, Rust sim of real topology, 5B users on home hw).

## Treatment legend
- **KEEP-THIN** — stays as a named page, rewritten to plain English + a "go deeper on GitHub/Zenodo" link.
- **MERGE** — folds into another page (named concept can survive as a redirect/section).
- **DEPTH→repo** — the heavy material moves to GitHub/Zenodo; page keeps a one-screen explainer.
- **UTILITY** — legal/ops/community; leave essentially as-is.

## Full route map (41 routes)

| Route | Slot | Role | Treatment | Plain-English one-liner |
|---|---|---|---|---|
| `(home)` | LOBBY | the question + 4 doors + convergence teaser | REBUILD | "What keeps you up at night? Pick one." |
| `first-contact` | LOBBY | gentle "new here?" intro | MERGE → home | "Brand new? Start here." |
| `install` | ① + universal CTA | the app that ships today (gravitational center) | KEEP-THIN | "Put a private AI on your phone right now." |
| `models` | ① | the "brain" (agent = fabric node × brain) | DEPTH→CIRISAgent | "Which AI minds it can run." |
| `trust` | ① / ③ | verifiable identity | KEEP-THIN | "How it proves who said what, without a company vouching." |
| `how-it-works` | ① / convergence | the plain "how" | KEEP-THIN | "How the whole thing works, in one read." |
| `safety` | ② (path landing) | the safety case | KEEP-THIN | "Why this is the safe one." |
| `ciris-scoring` | ② | weighted-aggregate scoring | DEPTH→CIRISNodeCore | "How the network grades trust." |
| `coherence-ratchet` | ② / ③ | catches fakes/Sybil over time | KEEP-THIN | "How it spots coordinated lying." |
| `coherence-ratchet/advanced` | ② | the math | DEPTH→GitHub | (fold the heavy math into the repo) |
| `crowdsourcing-alignment` | ② / ③ | rules crowdsourced, verdicts machined | KEEP-THIN | "People write the rules; the judge applies them the same way every time." |
| `coherence-collapse-analysis` | ② proof | a paper | MERGE → papers | "The failure-mode paper." |
| `compare` | ② / convergence proof | vs the alternatives | KEEP-THIN | "How it stacks up against everything else, with receipts." |
| `safety-vs-censorship` | ② / ③ | safety ≠ censorship | KEEP-THIN | "Safe is not the same as silenced." |
| `explore-a-trace` | ② / ③ proof | interactive: see a signed reasoning trace | KEEP-THIN | "Watch an AI show its work, signed." |
| `grammar` | ③ + Constitution | the signed-claim grammar (CEG) | MERGE → Constitution | "Every claim carries who said it and what it rests on." |
| `grammar/details` | ③ + Constitution | CEG spec | MERGE → Constitution / DEPTH→Registry | (the spec lives in the Constitution + Registry) |
| `grammar/explore` | ③ proof | interactive grammar demo | KEEP-THIN | "Play with a signed claim." |
| `game` | ③ / community | play with the trust graph | UTILITY | "A puzzle that teaches the trust graph." |
| `cewp` | ④ (path landing) | an internet with no datacenters | KEEP-THIN (new numbers) | "The internet, minus the buildings." |
| `cewp/details` | ④ proof | the simulator (sliders/math) | KEEP-THIN, DEPTH→NodeCore | "Move the sliders; the honest math moves with you." |
| `architecture` | ④ | "no servers, only Fabric Nodes" | KEEP-THIN, DEPTH→CIRISServer | "There are no servers, only fabric nodes." |
| `federation` | ④ / convergence | the federation of equals | KEEP-THIN | "Humans, AIs, and orgs as equals on one mesh." |
| `federation/advanced` | ④ | the mechanics | DEPTH→GitHub | (depth → repo) |
| `services` | ④ | the substrate components (Verify/Persist/Edge…) | DEPTH→repos | "The handful of parts the substrate is made of." |
| `integrations` | ④ | how it connects to today's stack | KEEP-THIN | "How it plugs into what you already use." |
| `epistemic-web` | CONVERGENCE | the reveal hub | REBUILD | "Four fears, one floor — the epistemic web." |
| `vision` | CONVERGENCE / manifesto | the synthesis (Tesla "master plan") | KEEP-THIN | "The replacement for the internet is the replacement for ChatGPT." |
| `about` | CONVERGENCE / org | who's behind it, the L3C mission | KEEP-THIN | "Who's doing this and why." |
| `mdd` | about / method | Mission-Driven Development | DEPTH→GitHub | "How we build it." |
| `research-status` | PROOF | measured vs model honesty | KEEP-THIN | "What's measured, what's still simulated. No bluffing." |
| `papers` | PROOF | the formal backing (Zenodo) | KEEP | "The papers, with permanent DOIs." |
| `papers/[slug]` | PROOF | per-paper (Scholar) | KEEP | "One paper, citable." |
| `sections/[[...slug]]` | PROOF | **the Constitution 0.4 reader** (Accord+CEG) | RENAME/REFRAME | "Read the whole Constitution." |
| `compliance` + `/[id]` | PROOF / utility | regulatory mappings + source texts | UTILITY | "How it maps to the rules that exist." |
| `coherence-collapse-analysis` | (see above, → papers) | | | |
| `events` | UTILITY / community | talks & recordings | UTILITY | "Where CIRIS shows up." |
| `canary` | UTILITY | warrant canary | UTILITY | (leave as-is) |
| `status` | UTILITY | system status | UTILITY | (leave as-is) |
| `privacy` | UTILITY | privacy policy | UTILITY | (leave as-is) |
| `safety-policy` | UTILITY | safety policy | UTILITY | (leave as-is) |

## Complexity that moves OUT to GitHub / Zenodo
- CEG spec depth, scoring math, ratchet math, federation mechanics, MDD,
  service catalogs, the simulator's full model → the relevant repos
  (`CIRISRegistry`, `CIRISNodeCore`, `CIRISServer`, `CIRISAgent`, …).
- All formal/empirical depth → **Zenodo** (already the `/papers` pattern).
- The Constitution full text → `CIRISRegistry/FSD/CIRIS_Constitution` (the site
  reads/renders it at `/sections`, but it is *the doc*, not site-authored prose).

## Net effect
- **0 named pages deleted.** Each becomes a one-screen plain-English node that
  either *is* a door, a step on a path, evidence, or a utility — with depth linked out.
- **Two merges to flag for sign-off:** `grammar*` → the Constitution; the
  `/advanced` + heavy-math pages → repos (page keeps a short explainer).
- The four paths + convergence + proof give every page an obvious home and an
  obvious neighbor, so the nav and the homepage write themselves from the four fears.
