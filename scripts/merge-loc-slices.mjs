// Merge translated lobby/pathsCommon/paths slices back into the per-locale
// dictionaries. Reads scratch/loc/<code>.json, validates it has the same shape
// as English (same keys, same array lengths, hrefs/accents/tags untouched), and
// writes the three keys into src/i18n/dictionaries/<code>.json.
//
//   node scripts/merge-loc-slices.mjs <scratchLocDir>

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const locDir = process.argv[2];
if (!locDir) {
  console.error("usage: node scripts/merge-loc-slices.mjs <scratchLocDir>");
  process.exit(1);
}

const DICT_DIR = "src/i18n/dictionaries";
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const REF = { lobby: en.lobby, pathsCommon: en.pathsCommon, paths: en.paths };

// Values that must be carried over verbatim (never translated). We re-stamp them
// from English after merge so a stray translation can't break links/styling.
function reStamp(target, ref) {
  // lobby.stats[].tag + v, lobby.doors[].accent/href/heavy, lobby.ctaPip
  target.lobby.ctaPip = ref.lobby.ctaPip;
  ref.lobby.stats.forEach((s, i) => {
    if (target.lobby.stats[i]) {
      target.lobby.stats[i].v = s.v;
      target.lobby.stats[i].tag = s.tag;
    }
  });
  ref.lobby.doors.forEach((d, i) => {
    if (target.lobby.doors[i]) {
      target.lobby.doors[i].accent = d.accent;
      target.lobby.doors[i].href = d.href;
      target.lobby.doors[i].heavy = d.heavy;
    }
  });
  for (const slug of Object.keys(ref.paths)) {
    const rp = ref.paths[slug];
    const tp = target.paths[slug];
    if (!tp) continue;
    tp.accent = rp.accent;
    rp.seeAlso.forEach((s, i) => {
      if (tp.seeAlso[i]) tp.seeAlso[i].href = s.href;
    });
  }
}

function shapeErrors(slice, code) {
  const errs = [];
  for (const key of ["lobby", "pathsCommon", "paths"]) {
    if (!slice[key]) errs.push(`missing ${key}`);
  }
  if (errs.length) return errs;
  if (!Array.isArray(slice.lobby.stats) || slice.lobby.stats.length !== REF.lobby.stats.length)
    errs.push("lobby.stats length");
  if (!Array.isArray(slice.lobby.doors) || slice.lobby.doors.length !== REF.lobby.doors.length)
    errs.push("lobby.doors length");
  if (!Array.isArray(slice.pathsCommon.stepLabels) || slice.pathsCommon.stepLabels.length !== 4)
    errs.push("pathsCommon.stepLabels length");
  for (const slug of Object.keys(REF.paths)) {
    const p = slice.paths[slug];
    if (!p) { errs.push(`paths.${slug} missing`); continue; }
    if (!Array.isArray(p.steps) || p.steps.length !== 4) errs.push(`paths.${slug}.steps length`);
    if (!Array.isArray(p.seeAlso) || p.seeAlso.length !== 3) errs.push(`paths.${slug}.seeAlso length`);
  }
  return errs;
}

const present = readdirSync(locDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
let merged = 0;
const problems = [];

for (const code of present) {
  const path = join(locDir, `${code}.json`);
  let slice;
  try {
    slice = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    problems.push(`${code}: invalid JSON (${e.message})`);
    continue;
  }
  const errs = shapeErrors(slice, code);
  if (errs.length) {
    problems.push(`${code}: ${errs.join(", ")}`);
    continue;
  }
  reStamp(slice, REF);
  const dictPath = join(DICT_DIR, `${code}.json`);
  if (!existsSync(dictPath)) {
    problems.push(`${code}: no dictionary file`);
    continue;
  }
  const dict = JSON.parse(readFileSync(dictPath, "utf8"));
  dict.lobby = slice.lobby;
  dict.pathsCommon = slice.pathsCommon;
  dict.paths = slice.paths;
  writeFileSync(dictPath, JSON.stringify(dict, null, 2) + "\n");
  merged++;
}

console.log(`merged ${merged}/${present.length} present slices`);
if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of problems) console.log("  - " + p);
}
const expected = 28;
if (present.length < expected) {
  console.log(`MISSING ${expected - present.length} locale slice(s) not yet written`);
}
