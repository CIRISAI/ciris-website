#!/usr/bin/env node
// Merge /tmp/grammar_stories/agent_*.json into one TypeScript module that
// exports a typed ALL_STORIES const. Validates basic shape, dedupes IDs,
// extracts the YAML `dimension:` field as the canonical prefix list per story,
// and prints a per-prefix coverage report so we can verify the ≥2 floor.

const fs = require("fs");
const path = require("path");

const SRC_DIR = "/tmp/grammar_stories";
const OUT_PATH =
  "/home/emoore/ciris-website/src/app/grammar/lib/stories-generated.ts";

const VALID_FAMILIES = new Set([
  "STANDING",
  "ACTION",
  "DETECTION",
  "CONSENSUS",
  "CORRECTION",
]);

function escapeString(s) {
  // For TS string-literal output, use JSON.stringify which handles quoting.
  return JSON.stringify(s);
}

function extractDimensions(yaml) {
  const out = [];
  const re = /dimension:\s*["']?([^"'\r\n]+?)["']?\s*$/gm;
  let m;
  while ((m = re.exec(yaml)) !== null) {
    out.push(m[1].trim());
  }
  return out;
}

function extractPrefixFamily(dimension) {
  // dimension is something like "non_maleficence:epistemic_environment_degradation"
  // or "detection:correlated_action:rights_asymmetry:hiring_pipeline_v2"
  // We keep the first 1-2 segments as the "prefix family":
  //  - non_maleficence:* → non_maleficence:
  //  - detection:correlated_action:* → detection:correlated_action:
  //  - dma:pdma:* → dma:pdma:
  //  - attestation:l1:* → attestation:l1:
  // Heuristic: keep segments up through the last all-lowercase-alpha-or-underscore
  // segment, stopping at anything with an underscore + leaf-looking suffix.
  // Simpler: keep the first two segments if there are >2; else keep what's there.
  const parts = dimension.split(":");
  if (parts.length >= 2) {
    return parts.slice(0, 2).join(":");
  }
  return parts[0];
}

function loadAgentFile(filepath) {
  const raw = fs.readFileSync(filepath, "utf-8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`${filepath}: invalid JSON — ${e.message}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${filepath}: expected array, got ${typeof parsed}`);
  }
  return parsed;
}

function validateStory(story, agentName) {
  const errors = [];
  if (typeof story.id !== "string" || !story.id) errors.push("missing id");
  if (typeof story.title !== "string" || !story.title) errors.push("missing title");
  if (typeof story.scenario !== "string" || !story.scenario)
    errors.push("missing scenario");
  if (typeof story.walkthrough !== "string" || !story.walkthrough)
    errors.push("missing walkthrough");
  if (typeof story.exampleYaml !== "string" || !story.exampleYaml)
    errors.push("missing exampleYaml");
  if (typeof story.family !== "string" || !VALID_FAMILIES.has(story.family))
    errors.push(`bad family: ${story.family}`);
  if (!Array.isArray(story.primitives)) errors.push("primitives not array");
  return errors;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source dir ${SRC_DIR} not found`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => /^agent_\d+\.json$/.test(f))
    .sort();
  console.log(`Found ${files.length} agent files`);

  const all = [];
  const seenIds = new Set();
  const dropped = [];
  for (const file of files) {
    const fp = path.join(SRC_DIR, file);
    let stories;
    try {
      stories = loadAgentFile(fp);
    } catch (e) {
      console.error(e.message);
      continue;
    }
    let kept = 0;
    let agentDropped = 0;
    for (const story of stories) {
      const errs = validateStory(story, file);
      if (errs.length > 0) {
        dropped.push({ file, id: story.id, errs });
        agentDropped++;
        continue;
      }
      if (seenIds.has(story.id)) {
        dropped.push({ file, id: story.id, errs: ["duplicate id"] });
        agentDropped++;
        continue;
      }
      seenIds.add(story.id);
      // Compute prefix coverage from YAML
      const dims = extractDimensions(story.exampleYaml);
      story._dimensions = dims;
      story._prefixFamilies = [...new Set(dims.map(extractPrefixFamily))];
      story._sourceAgent = file.replace(/\.json$/, "");
      all.push(story);
      kept++;
    }
    console.log(`  ${file}: ${kept} kept, ${agentDropped} dropped`);
  }

  console.log(`\nTotal kept: ${all.length}`);
  if (dropped.length > 0) {
    console.log(`Dropped (${dropped.length}):`);
    dropped.slice(0, 20).forEach((d) =>
      console.log(`  ${d.file}: ${d.id} — ${d.errs.join(", ")}`),
    );
  }

  // Coverage report
  const coverage = {};
  for (const story of all) {
    for (const fam of story._prefixFamilies) {
      coverage[fam] = (coverage[fam] || 0) + 1;
    }
  }
  const sortedCoverage = Object.entries(coverage).sort((a, b) => b[1] - a[1]);
  console.log(`\nPrefix family coverage: ${sortedCoverage.length} unique`);
  const under2 = sortedCoverage.filter(([_, n]) => n < 2);
  console.log(`Families with <2 stories: ${under2.length}`);
  if (under2.length > 0) {
    console.log("Under-covered families:");
    under2.forEach(([k, n]) => console.log(`  ${n}× ${k}`));
  }
  console.log("\nTop 15 covered:");
  sortedCoverage.slice(0, 15).forEach(([k, n]) => console.log(`  ${n}× ${k}`));

  // Family breakdown
  const byFamily = {};
  for (const s of all) {
    byFamily[s.family] = (byFamily[s.family] || 0) + 1;
  }
  console.log("\nBy family:");
  Object.entries(byFamily).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  // Emit TypeScript module
  const banner = `// AUTO-GENERATED by scripts/merge_stories.js — do not edit by hand.
// ${all.length} stories generated by 8 sub-agents on ${new Date().toISOString().slice(0, 10)}.
// Theme: "a kinder future" — sci-fi children's grammar primer for adults,
// appropriate for kids. Coverage: every prefix family ≥2 stories.
//
// Run \`node scripts/merge_stories.js\` to regenerate after adding new
// agent_*.json files to /tmp/grammar_stories/.

import type { GeneratedStory } from "./shared";

`;

  // Convert each story to a TS object literal. Use JSON.stringify for safety.
  // We strip our internal _-prefixed fields and add the derived prefixFamilies.
  const lines = ["export const ALL_STORIES: GeneratedStory[] = ["];
  for (const s of all) {
    const obj = {
      id: s.id,
      title: s.title,
      scenario: s.scenario,
      primitives:
        s._prefixFamilies && s._prefixFamilies.length > 0
          ? s._prefixFamilies
          : s.primitives,
      family: s.family,
      walkthrough: s.walkthrough,
      exampleYaml: s.exampleYaml,
      dimensions: s._dimensions,
      sourceAgent: s._sourceAgent,
    };
    lines.push("  " + JSON.stringify(obj) + ",");
  }
  lines.push("];");
  lines.push("");
  lines.push(`export const STORY_COUNT = ${all.length};`);
  lines.push(
    `export const STORY_FAMILIES = ${JSON.stringify(byFamily, null, 2)} as const;`,
  );

  fs.writeFileSync(OUT_PATH, banner + lines.join("\n") + "\n");
  console.log(`\nWrote ${OUT_PATH}`);
}

main();
