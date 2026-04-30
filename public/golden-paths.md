# CIRIS Golden Paths
## Recommended journeys through the site for different audiences

---

## Quick Reference

| Persona | Start Here | Key Pages | End Goal |
|---------|------------|-----------|----------|
| **Developer** | /first-contact | /how-it-works → /architecture → /federation → /explore-a-trace | Deploy an agent |
| **Executive** | /vision | /compare → /coherence-ratchet → /trust | Understand the value proposition |
| **End User** | / (homepage) | /first-contact → /install | Install the app |
| **Researcher** | /coherence-ratchet | /research-status → /federation → /sections/main | Evaluate the thesis |
| **Compliance Officer** | /compare | /safety → /trust → /privacy | Assess for deployment |

---

## 1. Developer Path

**Goal**: Understand the architecture and deploy an agent

### Journey
```
/first-contact (quickstart)
    ↓
/how-it-works (H3ERE pipeline)
    ↓
/architecture (22 services, message buses)
    ↓
/federation (Proof of Benefit, sovereign vs registered, transport)
    ↓
/explore-a-trace (see real reasoning)
    ↓
/install (pip install ciris-agent)
    ↓
/integrations (Discord, Home Assistant)
```

### Key Concepts to Absorb
- H3ERE 11-step pipeline
- 4 conscience faculties
- 10 action handlers
- The Three Rules (no untyped dicts, no bypass patterns, no exceptions)
- Message bus architecture
- Proof of Benefit federation primitive — score-as-pure-function, sovereign and registered tiers, Reticulum-rs transport

### Technical Resources
- GitHub: https://github.com/CIRISAI/CIRISAgent
- DeepWiki: https://deepwiki.com/CIRISAI/CIRISAgent
- CIRIS_COMPREHENSIVE_GUIDE.md

### Language to Use
- "Append-only signed constraint ledger where CONSISTENT-LIE is NP-complete for k ≥ 3"
- "Ed25519 signatures anchored in hardware secure elements"
- "SSE-streamed reasoning traces via OpenTelemetry"

---

## 2. Executive/Investor Path

**Goal**: Understand the business value and mission-lock structure

### Journey
```
/vision (why this exists)
    ↓
/compare (competitive landscape)
    ↓
/coherence-ratchet (the core thesis, simplified)
    ↓
/trust (5-level attestation)
    ↓
/about (team and mission)
    ↓
/services (pricing: $0.10/request)
```

### Key Concepts to Absorb
- Mission-locked L3C structure
- Same price everywhere (no enterprise tiers)
- Coherence Ratchet = "honesty compounds like interest"
- Four-signature approval analogy for conscience
- "Does not require trust in its creator"

### Compelling Lines
- "The longer the system runs, the harder it is to corrupt"
- "Every decision passes four independent checks before execution"
- "Cryptographic proof of every decision, traceable back to hardware"
- "L3C structure — legally cannot prioritize shareholder returns over mission"

### Numbers That Matter
- $0.10/request or free with BYOK
- 22 core services
- 11 pipeline steps
- 5-level attestation

---

## 3. End User Path

**Goal**: Install the app and start using it

### Journey
```
/ (homepage - "Accountability Without Gatekeepers")
    ↓
/first-contact (two meanings, one framework)
    ↓
/install (mobile apps + desktop)
    ↓
App Store / Play Store
```

### Key Concepts to Absorb
- "Verify me, not trust me"
- Gets more trustworthy over time
- Every decision is signed and traceable
- You can see how it thinks
- Asks you when it's not sure

### Language to Use
- "Nothing hidden. Watch it think in real time."
- "Built by a company that legally can't sell out"
- "Your personal AI assistant with a conscience"
- "Thinks before it acts — checks itself against four different standards"

### Install Links
- iOS: https://apps.apple.com/us/app/cirisagent/id6758524415
- Android: https://play.google.com/store/apps/details?id=ai.ciris.mobile
- Desktop: `pip install ciris-agent`

---

## 4. Researcher/Academic Path

**Goal**: Evaluate the theoretical foundations and falsification criteria

### Journey
```
/coherence-ratchet (full thesis)
    ↓
/research-status (what's proven vs. being tested)
    ↓
/federation (Proof of Benefit + N_eff empirical validation)
    ↓
/sections/main (The CIRIS Accord)
    ↓
Academic Paper (Zenodo)
    ↓
PoB FSD (GitHub)
    ↓
/compare (landscape positioning)
```

### Key Concepts to Absorb
- Computational asymmetry: O(1) vs NP-complete
- k_eff formula: k/(1 + ρ(k-1))
- J = C Duality (interpretive, not formal theorem)
- L-01 Barrier (~40% fundamental limit) — possibly addressable via recursive II with prompt perturbation (v4 conscience methodology, proposed and not yet empirically validated)
- Corridor bounds (0.2 < ρ < 0.7)
- Falsification criteria F-1 through F-5
- Proof of Benefit: cost ≡ benefit primitive; N_eff ≥ 9 measured on 17-dim constraint vector; lifetime peak N_eff_H = 9.51 (April 2026)
- Federated Ratchet / Coherent Intersection Hypothesis (Accord Book IX Ch. 3-4)

### Language to Use
- "Conditional exponential gap under ETH"
- "k_eff validated against NASA battery data, QoG institutional data, American Gut microbiome data"
- "Structural equivalence between defense and flourishing capacity equations"
- "Interpretive claim, not formal theorem; falsifiable per criteria F-1 through F-5"

### Critical Resources
- Academic Paper: https://zenodo.org/records/17195221
- Constrained Reasoning Chains (Apr 2026): https://zenodo.org/records/19839280
- Reasoning Traces dataset: https://huggingface.co/datasets/CIRISAI/reasoning-traces
- Proof of Benefit FSD: https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md
- Falsification criteria: /research-status#falsification
- Known limitations: /research-status#limitations

---

## 5. Compliance/Legal Path

**Goal**: Assess CIRIS for organizational deployment

### Journey
```
/compare (seven requirements checklist)
    ↓
/safety (kill switch, deferral cascades)
    ↓
/trust (5-level attestation)
    ↓
/privacy (data handling)
    ↓
/safety-policy (operational guidelines)
    ↓
/canary (warrant canary)
```

### Key Concepts to Absorb
- AGPL-3.0 licensing implications
- Cryptographic attestation for audit trails
- Human deferral (Wise Authority) for edge cases
- Zero data retention option (BYOK)
- EU AI Act compliance positioning

### Checklist Questions Answered
- ✓ Published principles? → /sections/main (The Accord)
- ✓ Ethics check on every decision? → /how-it-works (H3ERE)
- ✓ Human oversight? → /safety (Wise Authority deferral)
- ✓ Audit trail? → /trust (cryptographic attestation)
- ✓ Open source? → AGPL-3.0 on GitHub
- ✓ Privacy controls? → /privacy + BYOK option

---

## Cross-Persona Entry Points

### If They Ask "What Is This?"
→ Start at /first-contact (dual meaning works for all audiences)

### If They Ask "How Is It Different?"
→ Start at /compare (seven requirements, competitive table)

### If They Ask "Does It Actually Work?"
→ Start at /explore-a-trace (live reasoning visualization)

### If They Ask "Can I Trust It?"
→ Start at /trust (5-level attestation) → then /coherence-ratchet

### If They Ask "What's the Catch?"
→ Start at /research-status (honest limitations)

---

## Canonical Lines by Audience

### For Everyone
- "Verify me, not trust me."
- "Make lying expensive at planetary scale."

### For Developers
- "Runtime conscience — enforcing principles during operation, not just at design time."
- "Ed25519 signatures anchored in hardware secure elements, 5-level trust system."

### For Executives
- "The longer the system runs, the harder it is to corrupt — honesty compounds like interest."
- "L3C structure — legally cannot prioritize shareholder returns over mission."

### For End Users
- "Gets more trustworthy over time, not less."
- "Thinks before it acts."
- "Nothing hidden. Watch it think in real time."

### For Researchers
- "Computational asymmetry between truth-telling (O(1)) and deception (NP-complete for k ≥ 3)."
- "Falsifiable per criteria F-1 through F-5."

### For Compliance
- "Every decision is attested — signed, chained, and tamper-evident."
- "Cryptographic proof of every decision, traceable back to hardware."

---

*Open coherence infrastructure. AGPL-3.0 | Mission-locked.*
*© 2025-2026 Eric Moore and CIRIS L3C*
