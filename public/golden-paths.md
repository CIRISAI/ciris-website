# CIRIS Golden Paths
## Recommended journeys through the site for different audiences

---

## Quick Reference

| Persona | Start Here | Key Pages | End Goal |
|---------|------------|-----------|----------|
| **Developer** | /first-contact | /how-it-works → /architecture → /mdd → /federation → /explore-a-trace | Deploy an agent |
| **Executive** | /vision | /compare → /coherence-ratchet → /federation → /trust → /mdd | Understand the value proposition |
| **End User** | / (homepage) | /first-contact → /coherence-ratchet → /install | Install the app |
| **Researcher** | /coherence-ratchet/advanced | /papers → /coherence-collapse-analysis → /failure-modes → /research-status → /ciris-scoring → /federation/advanced → /sections/main | Evaluate the thesis |
| **Compliance Officer** | /compare | /safety → /failure-modes → /safety-vs-censorship → /trust → /papers → /privacy → /status | Assess for deployment |
| **AI Safety Reviewer** | /coherence-ratchet | /federation → /failure-modes → /papers → /research-status | Engage on GitHub Issues |

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
/mdd (Mission Driven Development — how we build it)
    ↓
/federation (the canonical response: a network of AI agents that watches itself)
    ↓ optional
/federation/advanced (system claim, architectural layers, ethical postulate)
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
- Proof of Benefit federation: both registered and sovereign join paths run today; the federation transport between machines is the part still being built out
- Signed append-only audit chain (CIRISPersist) and cross-agent verification

### Technical Resources
- GitHub: https://github.com/CIRISAI/CIRISAgent
- CIRISNodeCore (canonical specs): https://github.com/CIRISAI/CIRISNodeCore
- DeepWiki: https://deepwiki.com/CIRISAI/CIRISAgent
- CIRIS_COMPREHENSIVE_GUIDE.md

### Language to Use
- "Signed, append-only audit chain with cryptographic identity per agent"
- "Ed25519 signatures, with the kill signal embedded in ordinary text the agent reads before its reasoning pipeline runs"
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
/coherence-ratchet (the structural pressure, plain English)
    ↓
/federation (the response: a network of AI agents that watches itself)
    ↓
/trust (5-level post-quantum attestation)
    ↓
/mdd (Mission Driven Development — methodology and worked example)
    ↓
/about (team and mission)
    ↓
/services (pricing: $0.10/request)
```

### Key Concepts to Absorb
- Mission-locked L3C structure
- Same price everywhere (no enterprise tiers)
- Coherence Ratchet = the longer the system runs, the harder it is for hidden state to survive
- Federation = supervision chain (people → ethical-self-aware → ethical → simple)
- Three-person humanity accord as the architectural halt path
- "Does not require trust in its creator"

### Compelling Lines
- "Verify me, not trust me."
- "The longer the system runs, the harder it is to corrupt"
- "Cryptographic record of every decision, traceable back to hardware"
- "Three named humans hold a network-wide authority no internal process can route around"
- "L3C structure — legally cannot prioritize shareholder returns over mission"

### Numbers That Matter
- $0.10/request or free with BYOK
- 22 core services
- 11 pipeline steps
- 5-level attestation
- 29 languages (mental-health and cross-cultural safety batteries)

---

## 3. End User Path

**Goal**: Install the app and start using it

### Journey
```
/ (homepage — "Accountability Without Gatekeepers")
    ↓
/first-contact (two meanings, one framework)
    ↓
/coherence-ratchet (plain English: why a powerful AI has to show its work)
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

**Goal**: Evaluate the theoretical foundations, the empirical evidence, and the falsification criteria

### Journey
```
/coherence-ratchet/advanced (the structural pressure, full technical articulation)
    ↓
/papers (the four papers under the architecture, with scope limits)
    ↓
/coherence-collapse-analysis (mathematical foundation — k_eff formula, effective dimensionality, singularity boundary, L-01)
    ↓
/failure-modes (executable mechanism per claim + explicit out-of-scope list)
    ↓
/research-status (open trace commons; the empirical surface)
    ↓
/ciris-scoring (live trace dashboard — evidence in production)
    ↓
/federation/advanced (the response: system claim, architectural layers, ethical postulate, non-claims)
    ↓
/sections/main (The CIRIS Accord)
    ↓
GitHub Issues on CIRISAgent (where engagement happens)
```

### Key Concepts to Absorb
- The Coherence Ratchet is the recursive pressure on sufficiently introspective cognitive systems to externalize materially action-relevant premises, because hidden state introduces unverifiable optimization pathways
- Coherence as five-axis alignment: belief, perception, action, memory, representation
- k_eff = k / (1 + ρ(k−1)) → 1 as ρ → 1 (Coherence Collapse Analysis)
- The four "produces" claims (ethical postulate, CIRIS_FEDERATION.md §11): intelligence-without-inspectability produces irreversible power asymmetry; power-without-provenance produces governance failure; coordination-without-sovereignty produces coercion; optimization-without-coherence produces instability
- Forkability as a safety property (architecture must be federated, inspectable, AND forkable)
- The three-person humanity accord as the architectural halt path
- Effective-dimensionality threshold N_eff ≈ 7.1 (Constrained Reasoning Chains, 6,465 traces)
- Five-substrate empirical record (Corridor Dynamics flagship synthesis): C. elegans, Drosophila, four LLM architectures, four open-source projects, five cancers, three religious societies
- Explicit out-of-scope failure modes: undetectable emergent deception, adaptive-adversary manipulation, coordinated compromise of the humanity accord, substrate-level supply-chain attacks, and the system measuring itself

### Language to Use
- "Hidden state introduces unverifiable optimization pathways that destabilize trust, coordination, and adaptive error correction under increasing capability density"
- "The cost of opacity scales faster than the system's ability to compensate for it internally"
- "Each rung makes the next rung steeper"
- "Forkability is not failure — it is a safety property"

### Critical Resources
- Corridor Dynamics in Coordinated Systems v2 (flagship synthesis): https://zenodo.org/records/20300773 (DOI 10.5281/zenodo.20300773)
- Coherence Collapse Analysis: https://zenodo.org/records/18217688 (DOI 10.5281/zenodo.18217688)
- Constrained Reasoning Chains: https://zenodo.org/records/19839280 (DOI 10.5281/zenodo.19839280)
- CIRISAgent Framework: https://zenodo.org/records/18137161 (DOI 10.5281/zenodo.18137161)
- Reasoning Traces dataset: https://huggingface.co/datasets/CIRISAI/reasoning-traces
- Proof of Benefit FSD: https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md
- CIRIS_FEDERATION.md (canonical system articulation): https://github.com/CIRISAI/CIRISNodeCore/blob/main/CIRIS_FEDERATION.md
- COHERENCE_RATCHET.md (canonical pressure articulation): https://github.com/CIRISAI/CIRISNodeCore/blob/main/COHERENCE_RATCHET.md
- Falsification criteria and known limitations: /research-status

---

## 5. Compliance/Legal Path

**Goal**: Assess CIRIS for organizational deployment, including what is and is not claimed

### Journey
```
/compare (seven requirements checklist)
    ↓
/safety (kill switch, deferral cascades, rubric pipeline)
    ↓
/failure-modes (each claim with executable mechanism + named out-of-scope list)
    ↓
/safety-vs-censorship (rules-not-verdicts discipline — the line we don't cross)
    ↓
/trust (5-level post-quantum attestation: Ed25519 + ML-DSA-65)
    ↓
/coherence-collapse-analysis (mathematical foundation auditors can verify)
    ↓
/papers (formal and empirical backing with permanent DOIs)
    ↓
/privacy (data handling)
    ↓
/safety-policy (operational guidelines)
    ↓
/canary (warrant canary)
    ↓
/status (live infrastructure status)
```

### Key Concepts to Absorb
- AGPL-3.0 licensing implications
- Cryptographic attestation for audit trails
- Three-person humanity accord — the kill path no internal process can route around
- Monthly drill (30-day cadence) verifying the kill switch path so it doesn't silently fail
- Human deferral (Wise Authority) for edge cases
- Zero data retention option (BYOK)
- EU AI Act compliance positioning
- The system is open about what it does NOT cover: undetectable emergent deception, adaptive-adversary scenarios, supply-chain attacks (see /failure-modes)

### Checklist Questions Answered
- ✓ Published principles? → /sections/main (The Accord)
- ✓ Ethics check on every decision? → /how-it-works (H3ERE)
- ✓ Human oversight? → /safety (Wise Authority deferral) + three-person humanity accord
- ✓ Audit trail? → /trust (cryptographic attestation), CIRISPersist
- ✓ Open source? → AGPL-3.0 on GitHub
- ✓ Privacy controls? → /privacy + BYOK option
- ✓ Honest about limits? → /failure-modes (explicit out-of-scope list)
- ✓ Formal foundation? → /papers (four papers, permanent DOIs)

---

## 6. AI Safety Reviewer Path

**Goal**: Evaluate the structural claim, the architectural response, and engage substantively

### Journey
```
/coherence-ratchet (the structural pressure — start with the plain version, then escalate)
    ↓
/coherence-ratchet/advanced (full technical articulation with grounding cases)
    ↓
/federation (what is actually being built as a response)
    ↓
/federation/advanced (the system claim: a decentralized ethical superintelligence, with ethical postulate and non-claims)
    ↓
/failure-modes (mechanism per claim + named out-of-scope failure modes)
    ↓
/papers (Coherence Collapse Analysis, Constrained Reasoning Chains, framework paper, synthesis)
    ↓
/research-status (open trace commons; what evidence exists today)
    ↓
GitHub Issues on CIRISAgent (where the engagement is requested)
```

### What the Project Is Explicitly Asking For
Comments from anyone, on GitHub issues at https://github.com/CIRISAI/CIRISAgent. The most useful engagement names a specific architectural layer, ethical postulate claim, system claim, or specific FSD, and proposes what should change. The accord at https://ciris.ai/ciris_accord.txt remains open for review.

### What the Project Is Not Claiming
- Not asking permission (the decision to build has been public for over a year)
- Not running a public comment period with a deadline (engagement is continuous; the work proceeds at its own cadence)
- Not claiming completed safety (the protections are bets, validated empirically and ongoing — see /failure-modes)
- Not claiming political neutrality as virtue (the structural neutrality across governance forms is an engineering property; CIRIS has strong ethical commitments anchored in ACCORD §VII and the humanity accord)

### Where Outside Replication Would Be Most Valuable
- Independent verification of the k_eff identity on production traces from systems CIRIS doesn't operate
- Independent evaluation of the rubric pipeline against adversarial inputs
- Independent audit of the monthly kill-switch drill outcomes
- Adversarial testing of the cross-agent verification under coordinated compromise scenarios

---

## Cross-Persona Entry Points

### If They Ask "What Is This?"
→ Start at /first-contact (dual meaning works for all audiences)

### If They Ask "How Is It Different?"
→ Start at /compare (seven requirements, competitive table)

### If They Ask "Does It Actually Work?"
→ Start at /explore-a-trace (live reasoning visualization)

### If They Ask "Can I Trust It?"
→ Start at /trust (5-level attestation) → then /coherence-ratchet → then /failure-modes

### If They Ask "What's the Catch?"
→ Start at /failure-modes (executable mechanism per claim + what's out of scope) → then /research-status

### If They Ask "Isn't This Cargo Cult Safety?"
→ Start at /failure-modes — each claim is paired with its executable mechanism and a "where to verify" link; the asymmetry argument is at the bottom

### If They Ask "Is This Really a Superintelligence?"
→ Start at /federation/advanced (the system claim and the four-clause ethical postulate)

### If They Ask "How Do I Push Back?"
→ Open a GitHub issue at https://github.com/CIRISAI/CIRISAgent. See the Engagement section of /federation/advanced for what makes an issue substantive.

---

## Canonical Lines by Audience

### For Everyone
- "Verify me, not trust me."
- "Hidden ideas inside a powerful system can do great harm."
- "The push toward open only goes one way."

### For Developers
- "Signed, append-only audit chain with cryptographic identity per agent."
- "The kill signal is read before the reasoning pipeline runs — an agent that has gone wrong cannot reason its way out of it."
- "Effective independence is computed before action; k_eff < threshold triggers human escalation."

### For Executives
- "The longer the system runs, the harder it is to corrupt — honesty compounds like interest."
- "L3C structure — legally cannot prioritize shareholder returns over mission."
- "Three named humans hold an authority no internal process can route around."

### For End Users
- "Gets more trustworthy over time, not less."
- "Thinks before it acts."
- "Nothing hidden. Watch it think in real time."

### For Researchers
- "Hidden state introduces unverifiable optimization pathways that destabilize trust, coordination, and adaptive error correction under increasing capability density."
- "Forkability is not failure — it is a safety property."
- "The architecture is its own disprover: every step is on the record."

### For Compliance
- "Every decision is attested — signed, chained, and tamper-evident."
- "The failure modes we cover and the ones we don't are listed openly at /failure-modes."

### For AI Safety Reviewers
- "We are not asking for permission. We are asking for comments."
- "The bets are explicit; the wins are not yet claimed."
- "Open a GitHub issue. The work proceeds at its own cadence; substantive issues are read."

---

*Open coherence infrastructure. AGPL-3.0 | Mission-locked.*
*© 2025-2026 Eric Moore and CIRIS L3C*
