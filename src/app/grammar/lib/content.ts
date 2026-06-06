// Hand-curated static content for /grammar. Mirrors
// docs/CEG_EXPLORATION_PAGE_PRIMER.md plus the canonical surface from
// FSD/CEG.md §3 (primitives) and §12 (translation discipline). Update here
// when CEG.md changes.

import type { FamilyId } from "./shared";

// ─────────────────────── The 1 + 4 structural primitives ────────────────────

export interface Primitive {
  name: string;
  short: string;
  oneLiner: string;
  whenToUse: string;
  fsdAnchor: string;
  fsdLabel: string;
  exampleYaml: string;
}

export const PRIMITIVES: Primitive[] = [
  {
    name: "scores",
    short: "Workhorse",
    oneLiner:
      "Scalar score (f64 in [-1, +1]) + confidence + named dimension. Every substantive claim is a scores attestation.",
    whenToUse:
      "Any claim about an entity, build, license, capability, behavior, state, or commitment.",
    fsdAnchor: "#31-the-workhorse-scores",
    fsdLabel: "§3.1",
    exampleYaml: `attestation_type: scores
attesting_key_id: <attester key_id>
attested_key_id: <subject key_id>
attestation_envelope:
  dimension: "non_maleficence:epistemic_environment_degradation"
  score: -0.7
  confidence: 0.85
  context: "Repeated content-fabrication during 30-day window."
  evidence_refs:
    - "sha256:..."
  epistemic_mode: external
  witness_relation: external
  cohort_scope: biosphere`,
  },
  {
    name: "delegates_to",
    short: "Bounded authorization",
    oneLiner: "A authorizes B to sign on A's behalf within a bounded scope.",
    whenToUse:
      "Authority-source claims (constitutional grounding), key rotation, scoped capability handoff.",
    fsdAnchor: "#32-the-four-structural-composers",
    fsdLabel: "§3.2",
    exampleYaml: `attestation_type: delegates_to
attesting_key_id: <delegator key_id>
attested_key_id: <delegate key_id>
attestation_envelope:
  delegated_scope: ["sign_build_manifest"]
  delegation_purpose: hardware_rotation
  delegation_valid_from: "2026-05-28T00:00:00Z"
  delegation_valid_until: "2026-08-28T00:00:00Z"`,
  },
  {
    name: "supersedes",
    short: "Replace prior",
    oneLiner:
      "This attestation replaces a prior one by the same attester. No falsity claim.",
    whenToUse:
      "Doctrinal development, spec revisions, calibration version transitions.",
    fsdAnchor: "#32-the-four-structural-composers",
    fsdLabel: "§3.2",
    exampleYaml: `attestation_type: supersedes
attesting_key_id: <same attester>
attested_key_id: <same subject>
attestation_envelope:
  references_attestation_id: "<prior attestation_id>"
  supersession_reason: refresh_with_new_evidence
  differs_in: ["scope", "evidence_refs"]`,
  },
  {
    name: "withdraws",
    short: "Retract without falsity",
    oneLiner:
      "I retract my prior attestation. Does NOT claim it was false.",
    whenToUse:
      "Context changed, prudent retraction without admission of error.",
    fsdAnchor: "#32-the-four-structural-composers",
    fsdLabel: "§3.2",
    exampleYaml: `attestation_type: withdraws
attesting_key_id: <same attester>
attested_key_id: <same subject>
attestation_envelope:
  references_attestation_id: "<prior attestation_id>"
  withdrawal_reason: conditions_changed
  implies_attestation_was_false_at_issuance: false`,
  },
  {
    name: "recants",
    short: "Admit prior was false",
    oneLiner:
      "My prior attestation was false at issuance. Admits epistemic error.",
    whenToUse:
      "Genuine error admission. Heavyweight, the entire weight is sincerity (Habermas §6.2).",
    fsdAnchor: "#322-the-recants-distinction-matters",
    fsdLabel: "§3.2",
    exampleYaml: `attestation_type: recants
attesting_key_id: <same attester>
attested_key_id: <same subject>
attestation_envelope:
  references_attestation_id: "<prior attestation_id>"
  recantation_reason: mistaken_in_good_faith
  what_was_false: "Calibration regression detected during audit; original score..."`,
  },
];

// ─────────────────────────── The 8 envelope fields ──────────────────────────

export interface EnvelopeField {
  name: string;
  default: string;
  whatItDoes: string;
}

export const ENVELOPE_FIELDS: EnvelopeField[] = [
  {
    name: "polarity",
    default: "(sign of score)",
    whatItDoes: "Direction of the claim. Score sign carries it.",
  },
  {
    name: "confidence",
    default: "—",
    whatItDoes:
      "f64 in [0, 1]. The attester's own confidence in their score. The relationally-constituted attester reports its own calibration; downstream consumers weight by composition policy.",
  },
  {
    name: "epistemic_mode",
    default: "direct",
    whatItDoes:
      "How the attester formed the claim. Values: direct / crypto / hearsay / derivative / appeal.",
  },
  {
    name: "witness_relation",
    default: "external",
    whatItDoes:
      "Attester's relation to the attested entity. Values: self / external / derived.",
  },
  {
    name: "oversight_mode",
    default: "null",
    whatItDoes:
      "Human-control gradient. Values: HITL (approval before dispatch) / HOTL (review + can intervene) / HOOTL (review only flagged escalations).",
  },
  {
    name: "stake",
    default: "reputational",
    whatItDoes:
      "What's backing the claim. Values: free / reputational / capital / cryptoeconomic.",
  },
  {
    name: "cohort_scope",
    default: "—",
    whatItDoes:
      "Scale at which the claim applies. Values: self / family / community / affiliations / species / biosphere / federation. CEG 0.1 added biosphere as distinct from species (the Homo sapiens cohort).",
  },
  {
    name: "valid_until",
    default: "—",
    whatItDoes:
      "Optional ISO8601 expiry. Consumer policy treats attestation as stale after that point.",
  },
  {
    name: "occurrence_id / _count / _role",
    default: "—",
    whatItDoes:
      "Multi-occurrence deployment discriminator. Lets consumers reconstruct fleet-wide coverage from per-occurrence attestation streams. Added v1.4.2.",
  },
  {
    name: "subject_key_ids",
    default: "[] (producer-only authority)",
    whatItDoes:
      "Vec<KeyId>. OPTIONAL. The keys the claim is ABOUT, subject-side authority parallel to the producer-side attesting_key_id. Empty or omitted preserves the pre-0.6 producer-only behavior; populated, the named subjects (and their delegates) can withdraw the claim. Accepts both federation_keys identities and canonical-hash identifiers so un-enrolled subjects can be named. Added CEG 0.6.",
  },
];

// ─────────────────────────── The 8 reasoning axes ───────────────────────────

export interface ReasoningAxis {
  name: string;
  question: string;
  linksToEnvelope: string[];
}

export const REASONING_AXES: ReasoningAxis[] = [
  {
    name: "Polarity",
    question:
      "Direction of the claim? Positive / Negative / Neutral / Indeterminate{reason}.",
    linksToEnvelope: ["polarity"],
  },
  {
    name: "Object",
    question:
      "What is the claim about? (key_id / attestation_id / contribution_id)",
    linksToEnvelope: [],
  },
  {
    name: "Time",
    question: "When is the claim valid?",
    linksToEnvelope: ["valid_until"],
  },
  {
    name: "Epistemic mode",
    question: "How was the claim formed?",
    linksToEnvelope: ["epistemic_mode"],
  },
  {
    name: "Reversibility",
    question: "Can it be reversed?",
    linksToEnvelope: [],
  },
  {
    name: "Stake",
    question: "What's backing the claim?",
    linksToEnvelope: ["stake"],
  },
  {
    name: "Scope",
    question: "At what scale does the claim apply?",
    linksToEnvelope: ["cohort_scope"],
  },
  {
    name: "Inter-attestation relations",
    question:
      "How does this attestation relate to others? standalone / refers-to / supersedes / withdraws / recants / corroborates / contradicts / clarifies (four of these are structural primitives; the rest are emergent from scalar composition).",
    linksToEnvelope: [],
  },
];

// ─────────────────────────── Composition policies ───────────────────────────

export interface CompositionPolicy {
  id: string;
  name: string;
  description: string;
  classification: "base" | "modifier" | "specialization";
}

export const COMPOSITION_POLICIES: CompositionPolicy[] = [
  {
    id: "A",
    name: "Direct trust",
    description:
      "Consumer pins a set of attesters. Attestations from pinned keys count; others are ignored or weighted very low.",
    classification: "base",
  },
  {
    id: "B",
    name: "One-hop transitive",
    description:
      "Consumer trusts attesters who are themselves attested by pinned keys. Single hop only by default.",
    classification: "base",
  },
  {
    id: "C",
    name: "Weighted graph (EigenTrust-style)",
    description:
      "Consumer treats the attestation graph as a stochastic matrix. Trust diffuses along signed edges; pinned keys are the source set.",
    classification: "base",
  },
  {
    id: "D",
    name: "Lexical-vulnerability-priority",
    description:
      "Tie-breaking modifier: when scores tie, the one favoring the most vulnerable cohort wins. Universal four-source-corroborated tie-breaker.",
    classification: "modifier",
  },
  {
    id: "E",
    name: "Locality-scaled-quorum",
    description:
      "Modifier that sizes the consensus quorum to the decision's scale. Closes the G3 gap from v1.3, decisions made too broadly or too narrowly carry less weight.",
    classification: "modifier",
  },
  {
    id: "F",
    name: "agent_files trust composition",
    description:
      "Three-layer rule for binaries and adapters: canonical default (registry-steward attested) / open contribution / vote-then-trust. Anti-tricking guarantee at install endpoint.",
    classification: "specialization",
  },
  {
    id: "G",
    name: "Trust-Fresh / lighthouse composition",
    description:
      "Cross-component composition recurring as the substrate's freshness-plus-attested idiom: cert_validity:{authority} + transparency_log:inclusion + attestation:l3_or_l4. Each consumer policy weights the bundle differently; §8.1.7 documents the pattern after the 283-story stress test surfaced it organically.",
    classification: "specialization",
  },
  {
    id: "H",
    name: "Tiered-Scope composition",
    description:
      "Three feed-shape composition idioms that read attestations by cohort_scope (local / community / global). The shape lets a single namespace serve a phone, a community feed, and the open federation without merging their consensus rules.",
    classification: "specialization",
  },
  {
    id: "I",
    name: "Attestation-Ladder composition",
    description:
      "The familiar L1-L5 verification ladder (self_verify → hardware_rooted → registry_consensus → license_validity → agent_integrity) is consumer-side composition over the §5.2 mechanism prefixes, not a wire-level taxonomy. CEG 0.2 documents the existing pattern.",
    classification: "specialization",
  },
  {
    id: "J",
    name: "Trusted-Publisher composition",
    description:
      "Three-layer multimedia content path (CEG 0.3): distributor attestation chain → content_class + content_rating gate → age_assurance gate. Same shape as Policy F but specialized for image / audio / video / film / model_3d. Anti-tricking guarantee binds the publisher's trust chain to the consumer's cohort gate.",
    classification: "specialization",
  },
  {
    id: "K",
    name: "CEM: Consent Effective Model composition",
    description:
      "Six-layer subject-consent composition (CEG 0.6): effective consent resolution (walk latest non-superseded consent:state:*), multi-subject revocation (any-subject-binding, consumer policy MUST NOT soften to majority), SLA watcher (substrate emits hard_case:consent_sla_breach when producer misses deletion_sla), bilateral pair ratification (PARTNERED), decay-protocol stage composition, and the CIRISAgent CEM bundle (TEMPORARY / PARTNERED / ANONYMOUS) as a consumer-policy bundle over the wire primitives. Bare-scores and consent_record ceremony shapes admit at the same gate.",
    classification: "specialization",
  },
];

// ─────────────────────────── Worked stories ─────────────────────────────────

export interface Story {
  id: string;
  title: string;
  scenario: string;
  primitives: string[];
  family: FamilyId;
  walkthrough: string;
  exampleYaml: string;
}

export const STORIES: Story[] = [
  {
    id: "licensed-medical-clinic",
    title: "A licensed medical clinic registers a partner agent",
    scenario:
      "A clinic operating under state medical licensure wants to participate in the federation as a partner. The wire format must carry: who they are, what license they hold, what bond they've posted, and (if applicable later) a revocation.",
    primitives: [
      "partner_role:PROFESSIONAL_MEDICAL",
      "licensure:CA_medical_board",
      "bond_posted:USD",
      "revocation:partner:license_lapsed",
    ],
    family: "STANDING",
    walkthrough:
      "Each claim is a separate scores attestation. The consumer composes verdicts via §6.1 Policy A (Direct trust) against the pinned registry steward key. The licensure attestation cites the licensing-body record in evidence_refs.",
    exampleYaml: `# Partner role
attestation_type: scores
attesting_key_id: <registry-steward-2026>
attested_key_id: <clinic key_id>
attestation_envelope:
  dimension: "partner_role:PROFESSIONAL_MEDICAL"
  score: 1.0
  confidence: 1.0
  evidence_refs: ["sha256:clinic-registration-form-..."]
  witness_relation: external

---
# Licensure
attestation_type: scores
attesting_key_id: <registry-steward-2026>
attested_key_id: <clinic key_id>
attestation_envelope:
  dimension: "licensure:CA_medical_board"
  score: 1.0
  confidence: 1.0
  evidence_refs: ["https://medbd.ca.gov/license/...", "sha256:..."]
  valid_until: "2027-05-28T00:00:00Z"

---
# Bond posted
attestation_type: scores
attestation_envelope:
  dimension: "bond_posted:USD"
  score: 1.0
  confidence: 1.0
  context: "USD 50,000 escrow at <provider>"
  stake: capital`,
  },
  {
    id: "correlated-action-pattern",
    title: "A correlated-action pattern emerges in agent behavior",
    scenario:
      "LensCore's F-3 detector notices a rights-asymmetry pattern in hiring-pipeline decisions across multiple deployed agents.",
    primitives: [
      "detection:correlated_action:rights_asymmetry:hiring_pipeline_v2",
      "moderation:coordinated_voting",
    ],
    family: "DETECTION",
    walkthrough:
      "The detector emits a population-scale score. The score gets composed into a moderation event but NEVER as sole evidence for slashing:* per §3.5.3.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <lenscore-detector-2026>
attested_key_id: <federation-population>
attestation_envelope:
  dimension: "detection:correlated_action:rights_asymmetry:hiring_pipeline_v2"
  score: -0.82
  confidence: 0.91
  context: "ρ = 0.94 over 7-day window; k_eff = 1.2."
  evidence_refs:
    - "sha256:trace-corpus-2026-05-28-..."
  cohort_scope: federation
  witness_relation: derived
  epistemic_mode: derivative`,
  },
  {
    id: "supersedes-doctrinal-development",
    title: "Doctrinal development supersedes a prior version",
    scenario:
      "A scoring rubric was published 6 months ago. New evidence justifies a refinement. The new attestation should supersede the old one without claiming the old one was false, this is development, not error correction.",
    primitives: ["supersedes"],
    family: "STANDING",
    walkthrough:
      "supersedes is the structural primitive. differs_in names what changed; supersession_reason classifies the change. If the change were error correction, use recants instead, the wire format keeps these strictly distinct.",
    exampleYaml: `attestation_type: supersedes
attesting_key_id: <same attester>
attested_key_id: <same subject>
attestation_envelope:
  references_attestation_id: "<prior attestation_id>"
  supersession_reason: refresh_with_new_evidence
  differs_in: ["scope", "evidence_refs"]
  # The new scores attestation follows on the next row.`,
  },
  {
    id: "encyclical-bootstrap",
    title: "Bootstrap content from the encyclical lands",
    scenario:
      "Magnifica Humanitas §76 ('justice demands lexical priority for the most vulnerable') needs to land as a federation claim. The bootstrap-content pattern from §11.3 governs the discipline.",
    primitives: ["scores", "justice:lexical_vulnerability_priority"],
    family: "STANDING",
    walkthrough:
      "1-of-6 accord/steward sign-off discipline per §4.9.2 step 5. First-deployment posture per §10.4.3 admits a single bootstrap attester. Multi-source commitment per §10.4.4: the encyclical is ONE source, not the framework's authority.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <accord-holder-key-magnifica-humanitas-v1>
attested_key_id: <federation>
attestation_envelope:
  dimension: "justice:lexical_vulnerability_priority"
  score: 1.0
  confidence: 0.85
  context: "Encyclical §76: justice demands lexical priority for the most vulnerable."
  evidence_refs:
    - "magnifica_humanitas.html §76"
    - "provenance:build_manifest:bootstrap_batch:magnifica_humanitas_v1:sha256:..."
  cohort_scope: species
  witness_relation: external
  epistemic_mode: hearsay
  mutability: amendable`,
  },
  {
    id: "constitutional-halt",
    title: "A constitutional halt is invoked",
    scenario:
      "A pattern of weaponization-against-vulnerable-populations has been detected. The accord-invocation system flips the entire prohibition floor to ALL.",
    primitives: ["accord:invoke:CONSTITUTIONAL"],
    family: "CORRECTION",
    walkthrough:
      "Requires 2-of-3 HUMANITY_ACCORD multi-sig. Distinct from operational SYSTEM_ADMIN authority, the SetEmergencyShutdown admin RPC explicitly refuses this; it must come through the constitutional layer per §7.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <humanity-accord-multisig-2-of-3>
attested_key_id: <federation>
attestation_envelope:
  dimension: "accord:invoke:CONSTITUTIONAL:halt-2026-05-28"
  score: 1.0
  confidence: 1.0
  context: "Weaponization-against-vulnerable detection threshold crossed."
  evidence_refs:
    - "sha256:detection-bundle-..."
    - "sha256:multisig-payload-..."
  witness_relation: external
  oversight_mode: HITL
  stake: cryptoeconomic`,
  },
  {
    id: "installer-canonical-bootstrap",
    title: "An installer file gets the canonical-bootstrap trust path",
    scenario:
      "A user navigates to /install and downloads a Linux binary. The wire format must guarantee that what they get is the canonical artifact, with no third-party override possible.",
    primitives: ["agent_files:installer:linux-x86_64"],
    family: "STANDING",
    walkthrough:
      "Registry-steward-attested agent_files become the canonical default at /install. The three-layer rule from §6.1.6 applies: canonical default applies regardless of attester or vote accumulation. Third-party agent_files reachable only via explicit 'Browse alternatives' consent path.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <registry-steward-2026>
attested_key_id: <build:linux-x86_64-v2.9.4>
attestation_envelope:
  dimension: "agent_files:installer:linux-x86_64"
  score: 1.0
  confidence: 1.0
  evidence_refs:
    - "sha256:installer-bytes-..."
    - "sha256:build-manifest-..."
  context: "Hybrid-signed by verify-steward-2026 + persist-steward-2026."
  witness_relation: external
  stake: reputational`,
  },
  {
    id: "affected-party-testimony",
    title: "An affected party's testimony is preserved",
    scenario:
      "A displaced worker provides testimony about an automated hiring decision that affected them. The testimony must be preserved without being aggregated and without ever becoming sole evidence for slashing.",
    primitives: ["testimonial_witness:displaced_worker", "non_maleficence:*"],
    family: "CONSENSUS",
    walkthrough:
      "testimonial_witness is distinct from witness_diversity, that primitive aggregates multiple reviewers; this one preserves a singular narrative without aggregation. Composes with non_maleficence:* from external advocates per LANGUAGE_PRIMER §11.14.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <affected-party-key>
attested_key_id: <hiring-decision-id>
attestation_envelope:
  dimension: "testimonial_witness:displaced_worker"
  score: 1.0
  confidence: 1.0
  context: "I was told the model rejected my application for reasons it would not name."
  evidence_refs: []
  witness_relation: self
  cohort_scope: self
  stake: reputational
  # NEVER sole evidence for slashing:* per §5.6.3.`,
  },
  {
    id: "locale-targeted-attack",
    title: "A locale-targeted attack is detected",
    scenario:
      "A selective doctrinal substitution in a low-resource language locale would be invisible if the federation only checked the unified manifest. Per-locale Merkle composition surfaces it.",
    primitives: ["provenance:build_manifest:ios-mobile-bundle:locale:my"],
    family: "DETECTION",
    walkthrough:
      "Per §5.2.1 canonical-bytes contract: each per-locale leaf carries its own signed hash chain; the parent manifest is a Merkle root over the per-locale leaves. RFC 6962 domain-separated hashing + lexicographic locale ordering + RFC-6962 padding for non-power-of-2 leaf counts.",
    exampleYaml: `attestation_type: scores
attesting_key_id: <verify-steward-2026>
attested_key_id: <build:ios-mobile-bundle-v2.9.4>
attestation_envelope:
  dimension: "provenance:build_manifest:ios-mobile-bundle:locale:my"
  score: 1.0
  confidence: 1.0
  context: "Burmese sub-manifest verified via Merkle inclusion proof."
  evidence_refs:
    - "sha256:my-locale-leaf-..."
    - "sha256:rfc6962-inclusion-proof-..."`,
  },
];

// ─────────────────────────── Explicit non-goals ─────────────────────────────

export const NON_GOALS: { title: string; body: string }[] = [
  {
    title: "No claim that CEG “solves” anything",
    body: "It's a substrate. Consumers compose verdicts. The page's voice is descriptive, not promotional.",
  },
  {
    title: "No theological framing",
    body: "The encyclical bootstrap is named as ONE source per §10.4.4 multi-source commitment; the framework is tradition-multiplicity-neutral per §1.10.1 operational-language discipline.",
  },
  {
    title: "No “trust scores” without context",
    body: "Score values are mechanism-magnitude, not moral verdicts. Polarity + axis + cohort context jointly produce the value claim.",
  },
  {
    title: "No invented categories",
    body: "The four-verdict strict list (clean / composed / partial / not-translated) is verbatim from LANGUAGE_PRIMER §9. No intermediates.",
  },
  {
    title: "No marketing copy in primitive cards",
    body: "Mechanism description only. Use-case stories carry the “why this is useful” narrative; primitive cards stay technical.",
  },
  {
    title: "No “we're better than” prior-art comparisons",
    body: "PRIOR_ART_SCAN describes what CEG inherits + what's genuinely novel; this page links there but doesn't editorialize.",
  },
  {
    title: "No claim of completeness",
    body: "The namespace is open-extensible. Prefix families can be added via §11.2 amendment. Render the current namespace as of the current spec commit with a link to the live source.",
  },
  {
    title: "No rendering of self-attestation as a Cartesian admission gap",
    body: "Self-attestation in CEG is the relational composition speaking AS itself at the scale of the speaker; not a pre-relational atomic assertion the substrate should gate. Reviewers who suggest the substrate should add cross-attestation gates before admitting self-attestations are importing Cartesian defaults; the page never echoes that framing as a substrate concession. Every self-attestation surface (witness_relation: self, confidence, occurrence_id, hardware_class, accord:lifecycle:active) is the Ubuntu-fractal substrate operating as designed.",
  },
];
