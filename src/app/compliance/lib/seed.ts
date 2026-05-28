import "server-only";
import { cache } from "react";
import yaml from "js-yaml";
import { SEED_URL, type BatchId, type Batch, type Seed } from "./shared";

// Re-export client-safe symbols so existing imports from "./lib/seed" keep
// working for server callers. Client components import from "./lib/shared"
// directly.
export * from "./shared";

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

export async function getDimension(id: string) {
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
