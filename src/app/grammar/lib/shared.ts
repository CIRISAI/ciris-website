// Client-safe constants + types for /grammar. No fetching, no markdown
// parsing — both server and client components can import from here.

export const REGISTRY_REPO = "https://github.com/CIRISAI/CIRISRegistry";
export const REGISTRY_BLOB = `${REGISTRY_REPO}/blob/main`;
export const REGISTRY_RAW =
  "https://raw.githubusercontent.com/CIRISAI/CIRISRegistry/main";

// CEG 0.1 Public Working Draft (2026-05-28) is the authoritative spec. It
// ships as a directory of 18 files under FSD/CEG/. FSD-002 is design history.
// The build pulls FSD/CEG/05_namespace.md for the §5 prefix tables and reads
// version metadata from FSD/CEG/README.md. No fallback to FSD-002.
export const CEG_DIR = "FSD/CEG";
export const CEG_README_PATH = `${CEG_DIR}/README.md`;
export const CEG_NAMESPACE_PATH = `${CEG_DIR}/05_namespace.md`;
// Per-chapter file paths the page links into.
export const CEG_CHAPTER = {
  conformance: `${CEG_DIR}/00_conformance.md`,
  foundation: `${CEG_DIR}/01_foundation.md`,
  grammar: `${CEG_DIR}/02_grammar.md`,
  primitives: `${CEG_DIR}/03_primitives.md`,
  envelope: `${CEG_DIR}/04_envelope.md`,
  namespace: `${CEG_DIR}/05_namespace.md`,
  relations: `${CEG_DIR}/06_relations.md`,
  reserved: `${CEG_DIR}/07_reserved.md`,
  composition: `${CEG_DIR}/08_composition.md`,
  humanityAccord: `${CEG_DIR}/09_humanity_accord.md`,
  endpoints: `${CEG_DIR}/10_endpoints.md`,
  governance: `${CEG_DIR}/11_governance.md`,
  translation: `${CEG_DIR}/12_translation.md`,
  antiPatterns: `${CEG_DIR}/13_anti_patterns.md`,
  glossaries: `${CEG_DIR}/14_glossaries.md`,
  gaps: `${CEG_DIR}/15_gaps.md`,
  references: `${CEG_DIR}/16_references.md`,
  cadence: `${CEG_DIR}/17_cadence.md`,
} as const;
export const WITNESS_KIND_REGISTRY_PATH = "FSD/WITNESS_KIND_REGISTRY.md";
export const LANG_PRIMER_PATH = "FSD/LANGUAGE_PRIMER.md";
export const CEG_PRIMER_PATH = "docs/CEG_EXPLORATION_PAGE_PRIMER.md";

export type FamilyId =
  | "STANDING"
  | "ACTION"
  | "DETECTION"
  | "CONSENSUS"
  | "CORRECTION";

export type ComponentId =
  | "CIRISAgent"
  | "CIRISVerify"
  | "CIRISPersist"
  | "CIRISEdge"
  | "CIRISLensCore"
  | "CIRISNodeCore"
  | "RATCHET"
  | "CIRISBench"
  | "CIRISRegistry";

export interface PrefixRow {
  prefix: string;
  description: string;
  citation?: string;
  polarity?: string;
  // Which §3.x sub-section it came from, e.g. "3.1.1"
  section: string;
  sectionTitle: string;
  component: ComponentId;
  // Best-guess family assignment (derived from the §3.x section, see
  // FAMILY_BY_SECTION in source.ts).
  family: FamilyId | null;
}

export interface NamespaceSection {
  // e.g., "3.1"
  section: string;
  // e.g., "CIRISAgent — Accord principles + DMA + conscience + apophatic bounds"
  title: string;
  component: ComponentId;
  // Optional sub-section header within a component slice, e.g. "3.1.1"
  subsections: {
    section: string;
    title: string;
    family: FamilyId | null;
    rows: PrefixRow[];
    notes: string[];
  }[];
}

export interface RegistrySource {
  // From FSD-002 metadata
  specVersion: string;
  fsdLastUpdated: string;
  commitShaShort: string;
  commitShaFull: string;
  // Parsed §3 namespace
  namespace: NamespaceSection[];
  // Total prefix family count
  totalPrefixes: number;
}

export const FAMILY_LABEL: Record<FamilyId, string> = {
  STANDING: "Standing",
  ACTION: "Action",
  DETECTION: "Detection",
  CONSENSUS: "Consensus",
  CORRECTION: "Correction",
};

export const FAMILY_ONE_LINER: Record<FamilyId, string> = {
  STANDING: "Claims about an entity. Who, what, signed, with evidence.",
  ACTION: "The decision hierarchy. Goal → Approach → Method → Progress Measure.",
  DETECTION: "Claims about reality patterns. Surveillance without judgment.",
  CONSENSUS: "How the federation forms collective judgment.",
  CORRECTION: "How the federation corrects itself when something goes wrong.",
};

export const FAMILY_ANALOGY: Record<FamilyId, string> = {
  STANDING: "Notarized professional credential record.",
  ACTION:
    "Research grant proposal: aim, approach, methods, outcome metrics.",
  DETECTION:
    "Epidemiological surveillance — patterns surfaced, treatment downstream.",
  CONSENSUS:
    "Peer review combined with jury deliberation: multiple reviewers, weighted votes.",
  CORRECTION:
    "Academic ethics committee + journal retraction + appellate review.",
};

export const FAMILY_COLOR: Record<FamilyId, string> = {
  STANDING: "#3b82f6", // blue
  ACTION: "#10b981", // emerald
  DETECTION: "#f59e0b", // amber
  CONSENSUS: "#8b5cf6", // violet
  CORRECTION: "#ec4899", // pink
};

export const COMPONENT_ORDER: ComponentId[] = [
  "CIRISAgent",
  "CIRISVerify",
  "CIRISPersist",
  "CIRISEdge",
  "CIRISLensCore",
  "CIRISNodeCore",
  "RATCHET",
  "CIRISBench",
  "CIRISRegistry",
];

export const COMPONENT_REPO: Record<ComponentId, string> = {
  CIRISAgent: "https://github.com/CIRISAI/CIRISAgent",
  CIRISVerify: "https://github.com/CIRISAI/CIRISVerify",
  CIRISPersist: "https://github.com/CIRISAI/CIRISPersist",
  CIRISEdge: "https://github.com/CIRISAI/CIRISEdge",
  CIRISLensCore: "https://github.com/CIRISAI/CIRISLensCore",
  CIRISNodeCore: "https://github.com/CIRISAI/CIRISNodeCore",
  RATCHET: "https://github.com/CIRISAI/RATCHET",
  CIRISBench: "https://github.com/CIRISAI/CIRISBench",
  CIRISRegistry: "https://github.com/CIRISAI/CIRISRegistry",
};

export const COMPONENT_TAGLINE: Record<ComponentId, string> = {
  CIRISAgent:
    "Accord principles + DMA verdicts + conscience verdicts + apophatic bounds",
  CIRISVerify:
    "Attestation ladder L1-L5, provenance, transparency log, cert validity",
  CIRISPersist: "Substrate self-reports (system:* reserved)",
  CIRISEdge:
    "Transport, delivery, peer reachability, key boundary (system:* reserved)",
  CIRISLensCore:
    "Coherence Ratchet detectors, Capacity Score, correlated-action + distributive-access detectors",
  CIRISNodeCore:
    "Credits / Expertise / Decision hierarchy / Consensus / Governance",
  RATCHET: "Anti-Sybil flags (advisory, never sole evidence)",
  CIRISBench: "HE-300 benchmark outcomes",
  CIRISRegistry:
    "Identity / build / license / partner + agent_files + accord (reserved)",
};

// Auto-generated story shape (output of the 8 sub-agents merged via
// scripts/merge_stories.js into lib/stories-generated.ts).
export interface GeneratedStory {
  id: string;
  title: string;
  scenario: string;
  primitives: string[];
  family: FamilyId;
  walkthrough: string;
  exampleYaml: string;
  dimensions: string[];
  sourceAgent: string;
}

// Anchor IDs for in-page navigation.
export const ANCHORS = {
  hero: "top",
  fractalSelf: "fractal-self",
  primitives: "primitives",
  families: "families",
  envelope: "envelope",
  axes: "axes",
  composition: "composition",
  namespace: "namespace",
  graph: "graph",
  playground: "playground",
  stories: "stories",
  nonGoals: "non-goals",
  references: "references",
} as const;
