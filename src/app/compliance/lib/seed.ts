import "server-only";
import { cache } from "react";
import yaml from "js-yaml";

export const RESPONSE_REPO =
  "https://github.com/CIRISAI/ciris-response-magnifica-humanitas";
export const RESPONSE_BLOB = `${RESPONSE_REPO}/blob/main`;
export const RESPONSE_RAW =
  "https://raw.githubusercontent.com/CIRISAI/ciris-response-magnifica-humanitas/main";
export const RESPONSE_ISSUES_NEW = `${RESPONSE_REPO}/issues/new`;

export const AGENT_REPO = "https://github.com/CIRISAI/CIRISAgent";
export const AGENT_BLOB = `${AGENT_REPO}/blob/main`;
export const AGENT_RAW =
  "https://raw.githubusercontent.com/CIRISAI/CIRISAgent/main";
export const AGENT_ISSUES_NEW = `${AGENT_REPO}/issues/new`;

export const SEED_PATH = "SEED_DIMENSIONS.yaml";
export const SEED_URL = `${RESPONSE_RAW}/${SEED_PATH}`;

export type BatchId =
  | "magnifica_humanitas_v1"
  | "eu_hleg_v1"
  | "ieee_ead_v1"
  | "asean_guide_v1";

export type BatchShort = "MH" | "EU" | "IEEE" | "ASEAN";

export type Tier = "STRONG-4" | "STRONG-3";

export type AccordPrinciple =
  | "beneficence"
  | "non_maleficence"
  | "integrity"
  | "fidelity"
  | "autonomy"
  | "justice";

export interface Batch {
  id: BatchId;
  short: BatchShort;
  institutional_shape: string;
  geographic_scope: string;
  publication_date: string;
  authority: string;
  title: string;
  atomic_units_mapped: number;
}

export interface Attestations {
  MH?: number;
  EU?: number;
  IEEE?: number;
  ASEAN?: number;
  total: number;
}

export interface RegulatoryAttestation {
  batch_id: BatchId;
  citation: string;
  language: string;
  wire_form: string;
}

export interface AbsentBatch {
  batch_id: BatchId;
  absence_note: string;
  functional_analogue?: string;
}

export interface CirisCompliance {
  status: string;
  proposed_pointer?: string;
}

export interface Dimension {
  id: string;
  prefix: string;
  tier: Tier;
  gloss: string;
  attestations: Attestations;
  regulatory_attestations: RegulatoryAttestation[];
  absent_batch?: AbsentBatch[];
  wire_primitives: string[];
  ciris_compliance?: CirisCompliance;
  monitors?: CirisCompliance;
  accord_principle: AccordPrinciple;
  convergence_note?: string;
}

export interface Conflict {
  id: string;
  type: string;
  dimensions: string[];
  sources: string[];
  claim: string;
  disposition?: string;
  severity: string;
}

export interface T3Candidate {
  id: string;
  proposed_prefix: string;
  priority: string;
  source: string[];
  registry_issue?: string;
  affects_dimension?: string;
  resolution_preferred?: string;
}

export interface AggregateIndices {
  by_accord_principle: Record<AccordPrinciple, string[]>;
  by_tier: { STRONG_4: string[]; STRONG_3: string[] };
  absent_in_MH?: string[];
  absent_in_ASEAN?: string[];
  low_density_MH_but_nonzero?: string[];
  thin_ASEAN_but_nonzero?: string[];
  conflicts_surfaced: Conflict[];
  t3_candidates_v1_5: T3Candidate[];
}

export interface SeedMetadata {
  seed_version: number;
  seed_date: string;
  schema_version: number;
  generator: string;
  source_repo: string;
  wire_format_version: string;
  language_primer_version: string;
  totals: {
    dimensions: number;
    strong_4: number;
    strong_3: number;
    total_attestations: number;
    batches_in_corpus: number;
  };
}

export interface Seed {
  metadata: SeedMetadata;
  batches: Batch[];
  dimensions: Dimension[];
  aggregate_indices: AggregateIndices;
}

export const getSeed = cache(async (): Promise<Seed> => {
  const resp = await fetch(SEED_URL, { cache: "force-cache" });
  if (!resp.ok) {
    throw new Error(
      `Failed to fetch SEED_DIMENSIONS.yaml from ${SEED_URL}: HTTP ${resp.status}`,
    );
  }
  const text = await resp.text();
  // JSON_SCHEMA: don't coerce YYYY-MM-DD strings to Date objects (default schema
  // would, then React refuses to render the Date as a child).
  const parsed = yaml.load(text, { schema: yaml.JSON_SCHEMA }) as Seed;
  return parsed;
});

export async function getDimension(id: string): Promise<Dimension | null> {
  const seed = await getSeed();
  return seed.dimensions.find((d) => d.id === id) ?? null;
}

export async function getAllDimensionIds(): Promise<string[]> {
  const seed = await getSeed();
  return seed.dimensions.map((d) => d.id);
}

export function batchById(seed: Seed, id: BatchId): Batch | undefined {
  return seed.batches.find((b) => b.id === id);
}

export function controlPath(dimensionId: string): string {
  return `compliance/${dimensionFilename(dimensionId)}`;
}

const FILENAME_BY_ID: Record<string, string> = {
  D01: "D01_non_maleficence.md",
  D02: "D02_integrity.md",
  D03: "D03_justice.md",
  D04: "D04_prohibited.md",
  D05: "D05_detection.md",
  D06: "D06_goal.md",
  D07: "D07_locality_decision_scale.md",
  D08: "D08_autonomy.md",
  D09: "D09_fidelity.md",
  D10: "D10_beneficence.md",
  D11: "D11_multilateral_participation_forum_kind.md",
  D12: "D12_conscience.md",
  D13: "D13_testimonial_witness_kind.md",
  D14: "D14_witness_diversity.md",
  D15: "D15_moderation.md",
  D16: "D16_method.md",
  D17: "D17_transparency_log.md",
  D18: "D18_attestation_l_3_5.md",
  D19: "D19_partner_role.md",
  D20: "D20_approach.md",
  D21: "D21_progress_measure.md",
  D22: "D22_expertise.md",
  D23: "D23_accountability.md",
  D24: "D24_reconsideration.md",
  D25: "D25_credits.md",
  D26: "D26_key_boundary.md",
  D27: "D27_provenance.md",
};

export function dimensionFilename(id: string): string {
  return FILENAME_BY_ID[id] ?? `${id}.md`;
}

export function complianceDocPath(id: string): string {
  return `compliance/${dimensionFilename(id)}`;
}
