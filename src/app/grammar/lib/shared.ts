// Client-safe constants + types for /grammar. No fetching, no markdown
// parsing — both server and client components can import from here.

export const REGISTRY_REPO = "https://github.com/CIRISAI/CIRISRegistry";
export const REGISTRY_BLOB = `${REGISTRY_REPO}/blob/main`;
export const REGISTRY_RAW =
  "https://raw.githubusercontent.com/CIRISAI/CIRISRegistry/main";

// The grammar is no longer a standalone spec. It was absorbed into the CIRIS
// Constitution, which is now the single source of truth, and the old
// CIRISRegistry/FSD/CEG directory is a stub that says so. The old 1.0-RC29
// line was discontinued at the move and must not be cited as later than the
// constitution's own number.
//
// The build reads the namespace from Part 3 and the version from VERSION.
// Section numbering did not survive the move: cite the Part anchor, never the
// old section number.
export const CC_REPO = "https://github.com/CIRISAI/CIRISConstitution";
export const CC_BLOB = `${CC_REPO}/blob/main`;
export const CC_RAW = "https://raw.githubusercontent.com/CIRISAI/CIRISConstitution/main";
export const CC_DIR = "constitution";
export const CC_VERSION_PATH = "VERSION";
export const CC_README_PATH = "README.md";
export const CC_NAMESPACE_PATH = `${CC_DIR}/part_3_the_namespace.md`;

// The eight Parts the old eighteen CEG chapters became. Panels link into these.
export const CC_PART = {
  foundation: `${CC_DIR}/part_1_foundation.md`,
  grammar: `${CC_DIR}/part_2_the_grammar.md`,
  namespace: `${CC_DIR}/part_3_the_namespace.md`,
  composition: `${CC_DIR}/part_4_composition_governance.md`,
  transport: `${CC_DIR}/part_5_transport_substrate.md`,
  mathematics: `${CC_DIR}/part_6_the_coherence_mathematics.md`,
  lifecycle: `${CC_DIR}/part_7_lifecycle_stewardship.md`,
  appendices: `${CC_DIR}/part_8_appendices.md`,
} as const;

// Kept under their old names so the panels that link to chapters keep
// compiling; each now points at the Part that absorbed it.
export const CEG_CHAPTER = {
  conformance: CC_PART.grammar,
  foundation: CC_PART.foundation,
  grammar: CC_PART.grammar,
  primitives: CC_PART.grammar,
  envelope: CC_PART.grammar,
  namespace: CC_PART.namespace,
  relations: CC_PART.namespace,
  reserved: CC_PART.namespace,
  composition: CC_PART.composition,
  humanityAccord: CC_PART.composition,
  endpoints: CC_PART.transport,
  governance: CC_PART.composition,
  translation: CC_PART.appendices,
  antiPatterns: CC_PART.appendices,
  glossaries: CC_PART.appendices,
  gaps: CC_PART.appendices,
  references: CC_PART.appendices,
  cadence: CC_PART.lifecycle,
} as const;

// The PDF editions the constitution publishes.
export const CEG_READER_PDF = `${CC_REPO}/blob/main/ciris_constitution-1.0-rc4.pdf`;
export const CEG_FULL_PDF = CEG_READER_PDF;

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
    "Epidemiological surveillance: patterns surfaced, treatment downstream.",
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
