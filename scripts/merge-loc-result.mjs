// Merge the localize-v2-strings workflow result into the per-locale dicts.
//   node scripts/merge-loc-result.mjs <resultJsonFile>
//
// The result is a JSON array of { code, slice } where slice = { lobby,
// pathsCommon, paths }. We unescape stray HTML entities, re-stamp values that
// must stay verbatim (hrefs, accents, tags, stat values, pip line) from English,
// validate the shape, then write the three keys into src/i18n/dictionaries/<code>.json.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const resultPath = process.argv[2];
if (!resultPath) {
  console.error("usage: node scripts/merge-loc-result.mjs <resultJsonFile>");
  process.exit(1);
}

const DICT_DIR = "src/i18n/dictionaries";
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const REF = { lobby: en.lobby, pathsCommon: en.pathsCommon, paths: en.paths };

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&nbsp;": " " };
function unescapeDeep(v) {
  if (typeof v === "string") {
    let s = v;
    for (const [e, c] of Object.entries(ENTITIES)) s = s.split(e).join(c);
    return s;
  }
  if (Array.isArray(v)) return v.map(unescapeDeep);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v)) o[k] = unescapeDeep(v[k]);
    return o;
  }
  return v;
}

function reStamp(t, ref) {
  t.lobby.ctaPip = ref.lobby.ctaPip;
  ref.lobby.stats.forEach((s, i) => {
    if (t.lobby.stats[i]) { t.lobby.stats[i].v = s.v; t.lobby.stats[i].tag = s.tag; }
  });
  ref.lobby.doors.forEach((d, i) => {
    if (t.lobby.doors[i]) { t.lobby.doors[i].accent = d.accent; t.lobby.doors[i].href = d.href; t.lobby.doors[i].heavy = d.heavy; }
  });
  for (const slug of Object.keys(ref.paths)) {
    const rp = ref.paths[slug], tp = t.paths[slug];
    if (!tp) continue;
    tp.accent = rp.accent;
    rp.seeAlso.forEach((s, i) => { if (tp.seeAlso[i]) tp.seeAlso[i].href = s.href; });
  }
}

function shapeErrors(s) {
  const e = [];
  for (const k of ["lobby", "pathsCommon", "paths"]) if (!s[k]) e.push(`missing ${k}`);
  if (e.length) return e;
  if (s.lobby.stats?.length !== REF.lobby.stats.length) e.push("lobby.stats length");
  if (s.lobby.doors?.length !== REF.lobby.doors.length) e.push("lobby.doors length");
  if (s.pathsCommon.stepLabels?.length !== 4) e.push("pathsCommon.stepLabels length");
  for (const slug of Object.keys(REF.paths)) {
    const p = s.paths[slug];
    if (!p) { e.push(`paths.${slug} missing`); continue; }
    if (p.steps?.length !== 4) e.push(`paths.${slug}.steps length`);
    if (p.seeAlso?.length !== 3) e.push(`paths.${slug}.seeAlso length`);
  }
  return e;
}

const parsed = JSON.parse(readFileSync(resultPath, "utf8"));
const result = Array.isArray(parsed) ? parsed : parsed.result;
if (!Array.isArray(result)) {
  console.error("could not find result array in", resultPath);
  process.exit(1);
}
let merged = 0;
const problems = [];
const got = new Set();

for (const entry of result) {
  if (!entry || !entry.code || !entry.slice) continue;
  const code = entry.code;
  got.add(code);
  let slice = unescapeDeep(entry.slice);
  const errs = shapeErrors(slice);
  if (errs.length) { problems.push(`${code}: ${errs.join(", ")}`); continue; }
  reStamp(slice, REF);
  const dictPath = join(DICT_DIR, `${code}.json`);
  if (!existsSync(dictPath)) { problems.push(`${code}: no dictionary file`); continue; }
  const dict = JSON.parse(readFileSync(dictPath, "utf8"));
  dict.lobby = slice.lobby;
  dict.pathsCommon = slice.pathsCommon;
  dict.paths = slice.paths;
  writeFileSync(dictPath, JSON.stringify(dict, null, 2) + "\n");
  merged++;
}

const EXPECTED = ["es","am","ha","yo","sw","ta","te","mr","pa","my","bn","hi","vi","id","th","tr","uk","ru","ko","ja","zh","de","fr","it","pt","ar","fa","ur"];
const missing = EXPECTED.filter((c) => !got.has(c));
console.log(`merged ${merged}/${result.length} entries`);
if (missing.length) console.log(`MISSING locales: ${missing.join(", ")}`);
if (problems.length) { console.log("PROBLEMS:"); for (const p of problems) console.log("  - " + p); }
