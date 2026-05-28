# Story Agent Guide

**Purpose**: every agent commissioned to generate, review, or translate CIRIS Epistemic Grammar (CEG) stories MUST read this guide first. It codifies the load-bearing reading disciplines so the same misreads do not recur across generations of agents.

**Audience**: sub-agents invoked via the parallel-agent pattern in the `/home/emoore/ciris-website` project. Read this before writing a single YAML envelope.

**Last updated**: 2026-05-28 (CEG 0.1 Public Working Draft release).

---

## §0 Source-of-truth pointers

When writing CEG content you cite this canonical surface:

| What | Where |
|---|---|
| Wire-format spec (authoritative) | [`FSD/CEG/README.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/README.md) — 18-file Public Working Draft under `FSD/CEG/` |
| Namespace catalogue (§5) | [`FSD/CEG/05_namespace.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/05_namespace.md) |
| Translation discipline | [`FSD/LANGUAGE_PRIMER.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/LANGUAGE_PRIMER.md) |
| Anti-patterns (what NOT to write) | [`FSD/CEG/13_anti_patterns.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/13_anti_patterns.md) |
| Glossaries (warm narrative → canonical) | [`FSD/CEG/14_glossaries.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/14_glossaries.md) |
| Page-rendering primer | [`docs/CEG_EXPLORATION_PAGE_PRIMER.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/docs/CEG_EXPLORATION_PAGE_PRIMER.md) |
| Tone reference (the Accord this serves) | [`https://ciris.ai/ciris_accord.txt`](https://ciris.ai/ciris_accord.txt) |

FSD-002 is **design history**, not authoritative. Do not cite it as the spec.

---

## §1 The fractal-self reading discipline (LOAD-BEARING)

### §1.1 The frame, stated directly

**Self is self, fractally.** At every scale CEG operates on — key, occurrence, agent, fleet, cell, federation, biosphere — "self" means *the already-relationally-constituted entity speaking at that scale*. The cross-attestations that constituted the entity are upstream of the moment it speaks; when it then emits a self-attestation (`witness_relation: self`, declares its own `confidence`, reports its own `occurrence_id`, names its own `hardware_class`, signs `accord:lifecycle:active`), that is **the relational composition speaking AS itself**, not a Cartesian atom asserting pre-relational identity.

### §1.2 Why it matters for your stories

The substrate cannot require cross-attestation as a precondition for self-attestation because the cross-attestations are what constitute the self in the first place. They are **upstream**, not **downstream gates**. The fractal nesting IS the point.

If you find yourself writing a story scenario whose moral is "look, the substrate has a hole that lets a lone atom assert itself; here is how we should plug it" — **stop**. That moral is the Cartesian misread the spec exists to preempt. The substrate has no such hole, and your story is implicitly arguing the wire format should adopt a default it actively rejects.

### §1.3 The five surfaces that invite the misread

When you write stories touching any of these, frame them as the substrate operating as designed (Ubuntu-fractal at this scale), never as a limitation, gap, or trade-off:

| Surface | Cartesian misread to AVOID | Fractal-self frame to USE |
|---|---|---|
| `witness_relation: self` | "A lone principal asserting its own state without external check." | The relationally-constituted entity reporting its own state at this scale; the cross-attestations that constituted it are already upstream. |
| Attester-supplied `confidence` | "The attester gets to grade their own work." | The relationally-constituted attester reporting its own calibration; downstream consumers weight by composition policy. |
| `occurrence_id` | "An untrusted self-declaration of fleet position." | The fleet-constituted occurrence speaking from within the fleet's `AGENT_OCCURRENCE_ID` partitioning. |
| `hardware_class` | "The key claims its own hardware without an external attestor." | The key-bearing entity reporting provenance from within the substrate's existing cross-attestations of that key. |
| `accord:lifecycle:active` | "The accord-holder declares themselves active without humanity gating." | The accord-holder speaking from within the relational constitution `humanity → accord-holder-triple → individual`; humanity-as-such is the one scale outside the federation, by design. |

### §1.4 What this looks like in your YAML

- A `witness_relation: self` envelope is **valid everywhere the wire admits attestation**. Do not invent a "this might need stronger evidence" caveat in `context:` simply because the witness relation is self. The cross-attestations that constituted the attester already did that work.
- Do not write `epistemic_mode: introspection` — that value does not exist; the substrate rejects it as a Cartesian smuggle. If your story wants to express "I am reporting my own state," use `witness_relation: self` + appropriate `confidence`. See §3 below.
- Do not write `stake: epistemic` or `stake: dignitary` — see §3 anti-patterns.
- Do not frame `confidence` < 1.0 as "the substrate's way of admitting Cartesian doubt." `confidence` is the relational composition reporting its own calibration; it is a substrate primitive at every scale, not a Cartesian admission.

---

## §2 The Ubuntu commitment (the sibling discipline)

Read alongside §1: standing is constituted **relationally** through attestation by others; the federation wire format **resists** primitives that let a single key pre-declare its own state without external composition. Standing comes from being witnessed, not from announcing.

The fractal-self framing (§1) and the Ubuntu commitment do not contradict each other — they are the same insight from two angles. The Ubuntu commitment names what the substrate **resists** (Cartesian admission primitives); the fractal-self framing names what the substrate **admits** (relationally-constituted entities speaking AS themselves at every scale). The wire IS Ubuntu-fractal at every scale.

---

## §3 Anti-patterns (CEG 0.1 §13.2)

These were proposed as extensions during the CIRISRegistry#30 stress test and explicitly **rejected** in CEG 0.1 §13.2. **Do not use them in your stories.** If you find your story reaching for one, redirect using the "correct expression" column.

| Anti-pattern | Why rejected | Correct expression |
|---|---|---|
| `epistemic_mode: introspection` | Cartesian shortcut — lone subject pre-declaring inner state | `witness_relation: self` + `confidence < 1.0` + pending external composition |
| `epistemic_mode: testimony` | Reducible to existing values | `epistemic_mode: external` + `witness_relation: external` |
| `transparency:{kind}` standalone prefix | Disclosure is constituted by reception, not announcement | `evidence_refs[]` of reasoning-chain hash + downstream `transparency_log:inclusion` by a witness |
| `stake: civic` | Reducible | `stake: reputational` + `cohort_scope: community` |
| `stake: epistemic` | Same axis as confidence; not separate | `confidence` + `stake: reputational` |
| `stake: dignitary` | Wrong axis (stake names attester loss, dignity harm is attested loss) | `harm_class:dignity_harm` composition |
| `oversight_mode: deferred` / `active` / `advisory` | All map to existing | `HITL` (pre-decision or substrate-monitored) / `HOTL` (advisory) |
| `provenance_walk` as wire primitive | UX concern, not wire | Consumer-side composition (Portal / Verify dashboards) |
| Renaming canonical capacity factors or HE-300 categories to "kid-friendly" names | Loses precision | Use canonical names; the primer §14 glossary maps narrative to canonical |

---

## §4 Tone

- The Accord that the grammar serves was written by a father for his two children, Elliot and Aurora ("half lullaby, half compass"). Reference [`https://ciris.ai/ciris_accord.txt`](https://ciris.ai/ciris_accord.txt) foreword for tone.
- Warm, wonder-filled, sci-fi worldbuilding where the federation actually works — a children's grammar primer for adults, appropriate for kids.
- Cooperation, care, repair, gentleness; never dystopian; never adversarial.
- Even structurally punitive primitives (`slashing:PROVEN_ROGUE`, `accord:invoke:CONSTITUTIONAL`) end with care, dignity, and gentle retirement — never punishment-as-end.
- Le Guin / The Wild Robot / Becky Chambers register.

## §4.1 The app ships

CIRIS Agent is **installable today** on the Apple App Store and Google Play.

- App Store: `https://apps.apple.com/us/app/cirisagent/id6758524415`
- Google Play: `https://play.google.com/store/apps/details?id=ai.ciris.mobile`

When story scenarios picture CIRIS in use, default to "the agent on someone's phone" / "the helper app the school downloaded" rather than abstract substrate-level framing. The substrate framing is still valid; real-world deployment should appear when the scenario invites it.

## §4.2 No em dashes; no AI writing tells

The project's prose discipline rejects em dashes entirely (use `,` or `;` or `—` rendered as a real em dash in source only when quoting another work). Scrub other AI writing tells (formulaic transitions, hedge sentences that announce what the next paragraph will do, summary sentences that restate the obvious).

---

## §5 Output format and validation gate

Every story you emit MUST satisfy:

1. **Valid YAML envelope** — parseable with `yaml.safe_load`; 2-space indent; quote strings containing colons.
2. **Canonical dimension leaves** — every `dimension:` value resolves to a prefix family that exists in [CEG 0.1 §5](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/05_namespace.md). If you reach for a leaf under a valid family that is not in the spec (e.g., `audit_chain:integrity`), check `14_glossaries.md` and use the canonical leaf (`audit_chain:hash_continuity`).
3. **Canonical envelope axes** — use only enum values that exist:
   - `epistemic_mode`: `direct` | `crypto` | `hearsay` | `derivative` | `appeal`
   - `witness_relation`: `self` | `external` | `derived`
   - `oversight_mode`: `HITL` | `HOTL` | `HOOTL`
   - `stake`: `free` | `reputational` | `capital` | `cryptoeconomic`
   - `cohort_scope`: `self` | `family` | `community` | `affiliations` | `species` | `biosphere` | `federation`
4. **Open-vocabulary fields where applicable** — `testimonial_witness:{kind}` and `hard_case:{kind}` are open vocabulary as of CEG 0.1; you may invent kinds that fit the singular-voice or escalation-flag discipline. For testimonial_witness specifically, the four wire-level disciplines (`witness_relation: self`, `cohort_scope: self`, never aggregated, never sole evidence for `slashing:*`) are what make it Ubuntu-aligned, not the enum membership.
5. **No anti-patterns** (§3 above). If your story uses one, redirect.
6. **No Cartesian framing of self-attestation** (§1 above). Frame as the substrate operating as designed.

---

## §6 Story object schema

Each story is a JSON object:

```json
{
  "id": "agentN-kebab-case-unique-slug",
  "title": "7-10 word title in house style",
  "scenario": "2-3 sentence positive premise; sci-fi-warm",
  "primitives": ["prefix:family:1", "prefix:family:2"],
  "family": "STANDING | ACTION | DETECTION | CONSENSUS | CORRECTION",
  "walkthrough": "2-3 sentences on how the primitives compose",
  "exampleYaml": "valid YAML attestation, 15-30 lines, angle-bracket placeholders for key_ids"
}
```

The output of a generation agent is a JSON array of these objects written to a single file via the Write tool (no prose wrapping). The output of a review agent is a JSON object with `approved` (IDs that pass), `rejected` (IDs with reasons), `grammar_gaps` (observations), `overlaps`, `tone_notes`.

---

## §7 If you are uncertain

When uncertain about whether a YAML construct is canonical:

1. Read [`FSD/CEG/05_namespace.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/05_namespace.md) for the prefix family.
2. Read [`FSD/CEG/13_anti_patterns.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/13_anti_patterns.md) to check you are not reaching for a rejected extension.
3. Read [`FSD/CEG/14_glossaries.md`](https://github.com/CIRISAI/CIRISRegistry/blob/main/FSD/CEG/14_glossaries.md) for the narrative-to-canonical mapping.
4. If none of those resolve it, write the story with what you have and clearly flag the uncertainty in your reviewer notes. Do not invent new envelope values; do not invent new structural primitives. The 1+4 set is closed.

---

## §8 Common failure modes to avoid

- **Story moralizes about a Cartesian gap.** §1.3 above — redirect.
- **YAML invents leaves under valid families.** §5.2 above — use the glossary.
- **Story uses an anti-pattern envelope value.** §3 — redirect.
- **Tone breaks toward dystopia, punishment, or abstraction.** §4 — keep the Le Guin register.
- **Stories duplicate (same parable across two slots).** Vary cohort_scope, vary witness_relation, vary the substrate-rung.

If your output passes §5's validation gate, satisfies §1's framing discipline, avoids §3's anti-patterns, and keeps §4's tone, the story is shippable.

Read this guide before every commission. It is the durable artifact across the 283-story round (CIRISRegistry#30) and the future rounds that follow CEG 0.1 → CEG 1.0.
