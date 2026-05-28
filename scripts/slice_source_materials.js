#!/usr/bin/env node
// Slice the four source documents into per-chapter HTML files under
// public/source-materials/{batch_id}/. The chapter→source mapping mirrors
// the CHAPTERS_BY_BATCH constant in src/app/compliance/lib/shared.ts.

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = "/home/emoore/ciris-website/public/source-materials";

// ─────────────────────── Magnifica Humanitas slicer ─────────────────────────

function sliceMagnificaHumanitas() {
  const src = fs.readFileSync(
    path.join(PUBLIC_DIR, "magnifica_humanitas_v1.html"),
    "utf-8",
  );
  const lines = src.split("\n");

  // Find chapter anchor lines.
  const anchorLine = (name) =>
    lines.findIndex((l) => l.includes(`<a name="${name}"></a>`));

  const boundaries = [
    { stem: "CH0_INTRO", anchor: "INTRODUCTION_", title: "Introduction" },
    { stem: "CH1_DOCTRINE", anchor: "CHAPTER_ONE", title: "Chapter One — A Dynamic Approach Faithful to the Gospel" },
    { stem: "CH2_FOUNDATIONS", anchor: "CHAPTER_TWO_", title: "Chapter Two — Foundations" },
    { stem: "CH3_TECH_AI", anchor: "CHAPTER_THREE", title: "Chapter Three — Technology & AI" },
    { stem: "CH4_TRUTH_WORK_FREEDOM", anchor: "CHAPTER_FOUR_", title: "Chapter Four — Truth, Work, Freedom" },
    { stem: "CH5_POWER_LOVE", anchor: "CHAPTER_FIVE", title: "Chapter Five — Power, Love" },
    { stem: "CONCLUSION", anchor: "CONCLUSION", title: "Conclusion" },
  ];

  // Find start lines
  const starts = boundaries.map((b) => ({
    ...b,
    start: anchorLine(b.anchor),
  }));
  for (const s of starts) {
    if (s.start < 0) {
      console.warn(`MH: anchor not found for ${s.anchor}`);
    }
  }

  // Body bounds (skip head + footer)
  const bodyStart = lines.findIndex((l) => /<body/.test(l));
  const bodyEnd = lines.findIndex((l) => /<\/body/.test(l));

  // Stamp end-of-chapter = next chapter start (or bodyEnd for the last)
  const stampedChapters = starts
    .filter((s) => s.start >= 0)
    .sort((a, b) => a.start - b.start);
  // Intro = body start to first chapter
  const introStart = bodyStart + 1;
  for (let i = 0; i < stampedChapters.length; i++) {
    if (stampedChapters[i].stem === "CH0_INTRO") {
      stampedChapters[i].start = introStart;
    }
  }
  stampedChapters.sort((a, b) => a.start - b.start);
  for (let i = 0; i < stampedChapters.length; i++) {
    const ch = stampedChapters[i];
    const next = stampedChapters[i + 1];
    ch.end = next ? next.start : bodyEnd;
  }

  const outDir = path.join(PUBLIC_DIR, "magnifica_humanitas_v1");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const ch of stampedChapters) {
    const slice = lines.slice(ch.start, ch.end).join("\n");
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${ch.title} — Magnifica Humanitas</title>
<style>
  body { font-family: Georgia, serif; max-width: 720px; margin: 1rem auto; padding: 0 1rem; line-height: 1.7; color: #1f2937; }
  p { margin: 0.85em 0; }
  sup { font-size: 0.8em; }
  a[href^="#_ftnref"], a[href^="#_ftn"] { color: #64748b; }
  .MsoNormal { margin: 0.85em 0; }
</style>
</head>
<body>
<h1>${ch.title}</h1>
<p style="color:#64748b;font-size:0.9em;font-style:italic;">From Magnifica Humanitas (Pope Leo XIV, 15 May 2026). Fair-use republication; the canonical source remains at <a href="http://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html" target="_blank" rel="noopener">vatican.va</a>.</p>
${slice}
</body>
</html>`;
    fs.writeFileSync(path.join(outDir, `${ch.stem}.html`), html);
    console.log(`MH: wrote ${ch.stem}.html (lines ${ch.start}-${ch.end})`);
  }
}

// ─────────────────────── Plain-text source preservation ─────────────────────
//
// EU HLEG / IEEE EAD / ASEAN are kept as single full-text files. The chapter
// reader will fetch the full text and render it as a navigable document; the
// reader scrolls to the matched chapter heading on selection.

function preserveTextSources() {
  // Already in place at public/source-materials/{batch_id}.txt — nothing to do.
  // Print a manifest so build-time runs leave a record.
  const sources = [
    { batch: "eu_hleg_v1", file: "eu_hleg_v1.txt" },
    { batch: "ieee_ead_v1", file: "ieee_ead_v1.txt" },
    { batch: "asean_guide_v1", file: "asean_guide_v1.txt" },
  ];
  for (const s of sources) {
    const p = path.join(PUBLIC_DIR, s.file);
    if (fs.existsSync(p)) {
      const sz = fs.statSync(p).size;
      console.log(`${s.batch}: ${s.file} (${(sz / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`${s.batch}: missing ${s.file}`);
    }
  }
}

function main() {
  sliceMagnificaHumanitas();
  preserveTextSources();
}

main();
