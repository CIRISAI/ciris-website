# App Store Metadata Recommendations

**Source:** SEO + Discoverability Handoff (2026-05-08)
**Scope:** Out-of-repo metadata that lives in the Google Play Console and the App Store Connect dashboard. This document captures the recommended copy. Apply directly in the consoles; do not push from this repository.

---

## Google Play — `ai.ciris.mobile`

### Short description (80 char max)

```
Verifiable ethical AI agent. Cryptographic attestation. AGPL-3.0. Mission-locked.
```

### Long description (4000 char max)

> CIRIS Agent is an open-source ethical AI agent built on cryptographic attestation, runtime conscience, and Ubuntu-grounded relational ethics. Verify the agent — do not trust it.
>
> **Verifiable, not promised.** Every decision the agent makes is signed with an Ed25519 key and recorded in a hash-chained audit ledger. You see the reasoning, not just the output. The agent's identity is anchored in cryptographic attestation, not in a vendor's word.
>
> **Coherence-grounded.** CIRIS implements Coherence-Based Alignment (CBA), an architecture where independent constraints accumulate to make deception structurally expensive over time. The mathematical foundation — Coherence Collapse Analysis — is published, peer-reviewable, and Lean-formalized.
>
> **Polyglot reasoning across 29 languages.** The reasoning pipeline is not English-only. The CIRIS Accord, the published ethical framework the agent operates under, is available in 29 languages.
>
> **Mission-locked.** CIRIS is built by a low-profit limited-liability company (L3C) under AGPL-3.0. The legal structure prevents profit-driven mission drift. Same price everywhere — no enterprise tiers, no contact-sales.
>
> **Built on Mission Driven Development.** The methodology embeds mission as the fourth structural foundation alongside logic, schemas, and protocols. Every architectural decision is challenged against alignment with the stated mission.
>
> **What you can do:**
> • Inspect the agent's reasoning step by step
> • Verify cryptographic attestation on every decision
> • Read the public Accord that governs agent behavior
> • Run the agent across 29 languages
>
> **For:**
> • Researchers studying AI alignment, governance, and accountability
> • Compliance officers evaluating AI for regulated deployment
> • Developers building accountable autonomous AI systems
> • Anyone who wants to verify, not trust, the AI they use
>
> Open source: github.com/CIRISAI/CIRISAgent
> Documentation: ciris.ai
> License: AGPL-3.0

### Keywords woven into description (already present in long copy)

- ethical AI, ethical AI agent
- verifiable AI agent, auditable AI agent
- cryptographic attestation, Ed25519
- Ubuntu AI ethics, Ubuntu-grounded
- coherence-based alignment, Coherence Collapse Analysis
- AGPL-3.0, mission-locked, L3C
- Mission Driven Development, MDD
- runtime conscience
- 29 languages, polyglot AI

### Screenshot alt-text

For each screenshot, ensure alt text contains the relevant cross-domain identifier:

1. **Reasoning trace inspector:** "CIRIS Agent reasoning trace — every conscience check, decision, and tool call signed with Ed25519 and replayable."
2. **Conscience faculties:** "Four conscience faculties evaluating an action — entropy, coherence, optimization veto, epistemic humility."
3. **Audit ledger:** "Hash-chained audit ledger — cryptographic attestation of every agent decision."
4. **Accord text:** "The CIRIS Accord — public ethical framework, polyglot across 29 languages, AGPL-3.0."
5. **Settings / verifiability:** "Bring-your-own-key support — verifiable AI agent, auditable, mission-locked L3C."

---

## iOS App Store — `id6758524415`

### Title (30 char max)

```
CIRIS — Verifiable Ethical AI
```

(29 characters; check exact length in App Store Connect.)

### Subtitle (30 char max)

```
Auditable. AGPL. Mission-locked.
```

(31 characters — trim to 30: `Auditable. AGPL. Mission-lock` or use `Auditable. AGPL-3.0. Open.`)

### Keywords field (100 char max — high leverage)

Comma-separated, no spaces after commas:

```
ethical AI,Ubuntu,verifiable,auditable,attestation,AGPL,coherence,alignment,sovereign,mission-lock
```

(99 characters. Each term should appear once and only once across title + subtitle + keywords combined; the iOS algorithm already indexes title and subtitle words.)

### Promotional text (170 char max — updateable without app review)

```
Verifiable AI agent with cryptographic attestation, runtime conscience, and Ubuntu-grounded ethics. AGPL-3.0 open source. Mission-locked L3C structure.
```

### Long description

Use the same long-form copy as the Play Store (above). The iOS App Store accepts up to 4000 characters.

---

## Application checklist for the operator

- [ ] Copy short description into Play Console
- [ ] Copy long description into Play Console
- [ ] Update screenshot alt text in Play Console (per asset)
- [ ] Update iOS title in App Store Connect
- [ ] Update iOS subtitle in App Store Connect (verify char count)
- [ ] Update iOS keywords field in App Store Connect (99 chars)
- [ ] Update iOS promotional text in App Store Connect
- [ ] Update iOS long description in App Store Connect
- [ ] Submit metadata-only update on iOS (no binary change required)

---

## Notes

- The iOS keywords field does not need to repeat words from the title or subtitle — Apple already indexes those. Keep the field tight to 99–100 characters of distinct terms.
- The 100-character limit is *bytes*, not characters; non-ASCII expansion can push you over silently. ASCII-only here.
- Promotional text (iOS) can be updated without resubmitting the app — useful for periodic refresh as Tier 1 / Tier 2 terms shift.
- App store reviewers occasionally flag "verifiable" / "auditable" claims as marketing hyperbole. The defense is that Ed25519 attestation and the hash-chained ledger are concretely verifiable and the AGPL source is publicly inspectable. Have those facts ready.
- Refresh cadence: re-evaluate this metadata each time a new SEO Tier 1 term lands on ciris.ai.
