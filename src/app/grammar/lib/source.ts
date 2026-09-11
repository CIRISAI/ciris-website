import "server-only";
import { cache } from "react";
import {
  CC_RAW,
  CC_REPO,
  REGISTRY_REPO,
  CC_DIR,
  CC_README_PATH,
  CC_VERSION_PATH,
  CC_NAMESPACE_PATH,
  type ComponentId,
  type FamilyId,
  type NamespaceSection,
  type PrefixRow,
  type RegistrySource,
} from "./shared";

export * from "./shared";

// Next's fetch Data Cache (force-cache below) persists across builds, so the
// first cached registry response gets pinned forever — that is how the version
// badge silently froze on an old cut. Bust the cache key once per build (the
// deploy's commit SHA in CI, build time locally) so every deploy re-fetches the
// registry's current main. The buster is a query param raw.githubusercontent
// ignores, so the bytes are unchanged.
const BUILD_REV =
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  String(Date.now());
const README_URL = `${CC_RAW}/${CC_README_PATH}?cb=${BUILD_REV}`;
const VERSION_URL = `${CC_RAW}/${CC_VERSION_PATH}?cb=${BUILD_REV}`;
const NAMESPACE_URL = `${CC_RAW}/${CC_NAMESPACE_PATH}?cb=${BUILD_REV}`;

// Namespace mapping, read from the constitution's Part 3. Headings are
// ## 3.x (the namespace, reservations, relations), ### 3.x.y (the per-component
// sections) and #### 3.x.y.z (their sub-sections).
// Part 3 groups the per-component prefixes under §3.1, so a component now sits
// at three segments (3.1.5) where it used to sit at two (5.1). The headings
// name their component in plain text ("3.1.5 `accord-agent` — CIRISAgent — ..."),
// so the name is read from the heading first and this map is the fallback: a
// renumbering upstream then costs nothing here.
const SECTION_TO_COMPONENT: Record<string, ComponentId> = {
  "3.1.1": "CIRISRegistry",
  "3.1.2": "CIRISVerify",
  "3.1.3": "CIRISPersist",
  "3.1.4": "CIRISEdge",
  "3.1.5": "CIRISAgent",
  "3.1.6": "RATCHET",
  "3.1.8": "CIRISLensCore",
  "3.1.9": "CIRISNodeCore",
  "3.1.10": "CIRISBench",
};

/** The component names that appear verbatim in Part 3's headings. */
const COMPONENT_NAMES: ComponentId[] = [
  "CIRISRegistry",
  "CIRISVerify",
  "CIRISPersist",
  "CIRISEdge",
  "CIRISAgent",
  "CIRISLensCore",
  "CIRISNodeCore",
  "CIRISBench",
  "RATCHET",
];

// The five-family organization, re-keyed onto Part 3. Same editorial reading as
// before the move: who may speak, what was detected, what was done, what was
// agreed, what was corrected.
const SUBSECTION_TO_FAMILY: Record<string, FamilyId> = {
  "3.1.1": "STANDING", // registry — identity / build / license
  "3.1.2": "STANDING", // attestation ladder + provenance
  "3.1.3": "STANDING", // substrate self-reports
  "3.1.4": "STANDING", // transport + delivery
  "3.1.5": "STANDING", // Accord principles + DMA + conscience + apophatic
  "3.1.6": "DETECTION", // anti-Sybil flags
  "3.1.8": "DETECTION", // lens
  "3.1.8.1": "STANDING", // Capacity-Score factors
  "3.1.8.2": "DETECTION", // Coherence-Ratchet detectors
  "3.1.8.3": "STANDING", // cohort + conformity
  "3.1.8.4": "DETECTION", // structural injustice / correlated action
  "3.1.8.5": "DETECTION", // distributive access
  "3.1.9": "STANDING", // node
  "3.1.9.1": "STANDING", // files as contributions
  "3.1.9.2": "CORRECTION", // tier 4, governance steering
  "3.1.9.3": "CONSENSUS", // tier 3, consensus mechanics
  "3.1.9.4": "STANDING", // hard case + transparency + judge model
  "3.1.9.5": "ACTION", // decision locality
  "3.1.9.6": "STANDING", // tier 1, agent-state ledger
  "3.1.9.7": "ACTION", // tier 2, decision hierarchy
  "3.1.10": "STANDING", // benchmark outcomes
  "3.2": "STANDING", // community subject_kind
  "3.3": "STANDING", // content ingestion, consent, subject kinds
};

function familyFor(section: string): FamilyId | null {
  const parts = section.split(".");
  for (let n = parts.length; n >= 2; n--) {
    const key = parts.slice(0, n).join(".");
    if (SUBSECTION_TO_FAMILY[key]) return SUBSECTION_TO_FAMILY[key];
  }
  return null;
}

function componentFor(section: string, title?: string): ComponentId {
  if (title) {
    const named = COMPONENT_NAMES.find((c) => title.includes(c));
    if (named) return named;
  }
  // Walk up: 3.1.5.2 -> 3.1.5 -> 3.1. The component lives at three segments.
  const parts = section.split(".");
  for (let n = Math.min(parts.length, 3); n >= 2; n--) {
    const key = parts.slice(0, n).join(".");
    if (SECTION_TO_COMPONENT[key]) return SECTION_TO_COMPONENT[key];
  }
  return "CIRISAgent";
}

interface ParsedTableRow {
  cells: string[];
}

interface ParsedTable {
  headers: string[];
  rows: ParsedTableRow[];
}

function parseMarkdownTable(lines: string[]): ParsedTable | null {
  if (lines.length < 2) return null;
  const headerCells = splitTableRow(lines[0]);
  if (!/^\|?\s*:?-+/.test(lines[1])) return null;
  const rows: ParsedTableRow[] = [];
  for (let i = 2; i < lines.length; i++) {
    const cells = splitTableRow(lines[i]);
    if (cells.length === 0) continue;
    rows.push({ cells });
  }
  return { headers: headerCells, rows };
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return [];
  const inner = trimmed.replace(/^\|/, "").replace(/\|$/, "");
  return inner.split("|").map((c) => c.trim());
}

interface SectionScan {
  section: string;
  title: string;
  startLine: number;
}

// CEG 0.1 (directory layout): the namespace file uses `## §5.1` for top-level
// components and `### §5.1.1` for sub-sections.
function scanSections(text: string): SectionScan[] {
  const lines = text.split("\n");
  const out: SectionScan[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m = line.match(/^##\s+§?(\d+\.\d+)\s+(.+)$/);
    if (m) {
      out.push({ section: m[1], title: m[2].trim(), startLine: i });
      continue;
    }
    m = line.match(/^###\s+§?(\d+\.\d+\.\d+)\s+(.+)$/);
    if (m) {
      out.push({ section: m[1], title: m[2].trim(), startLine: i });
      continue;
    }
  }
  return out;
}

function extractSection(
  text: string,
  startLine: number,
  endLine: number,
): {
  rows: PrefixRow[];
  notes: string[];
} {
  const lines = text.split("\n").slice(startLine + 1, endLine);
  const rows: PrefixRow[] = [];
  const notes: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const parsed = parseMarkdownTable(tableLines);
      if (!parsed) continue;
      const idx = (name: string) =>
        parsed.headers.findIndex((h) => h.toLowerCase() === name);
      const prefixCol = idx("prefix");
      const descCol = idx("description");
      const citationCol = idx("citation");
      const polarityCol = idx("polarity");
      if (prefixCol === -1) continue;
      for (const r of parsed.rows) {
        const prefix = stripBackticks(r.cells[prefixCol] ?? "");
        if (!prefix || prefix === "—") continue;
        rows.push({
          prefix,
          description: r.cells[descCol] ?? "",
          citation: citationCol >= 0 ? r.cells[citationCol] : undefined,
          polarity: polarityCol >= 0 ? r.cells[polarityCol] : undefined,
          section: "",
          sectionTitle: "",
          component: "CIRISAgent",
          family: null,
        });
      }
    } else {
      const t = lines[i].trim();
      if (
        t.startsWith("**") ||
        t.startsWith("- ") ||
        t.startsWith("22 leaves") ||
        t.startsWith("`")
      ) {
        notes.push(t);
      }
      i++;
    }
  }
  // Fallback: if no tabular rows were parsed, some §5 sub-sections
  // (§5.1.2 DMA verdicts, §5.1.3 conscience, §5.3 Persist, §5.4 Edge,
  // §5.5.1/2, §5.7 RATCHET) list prefixes as inline backtick tokens
  // separated by " / " or "," instead of in markdown tables. Pull those
  // out so the namespace panel doesn't show 0 prefixes for those owners.
  if (rows.length === 0) {
    rows.push(...extractInlineListPrefixes(lines));
  }
  return { rows, notes };
}

function extractInlineListPrefixes(lines: string[]): PrefixRow[] {
  const out: PrefixRow[] = [];
  const seen = new Set<string>();
  // A prefix-shaped backtick token: starts with a lowercase letter or word
  // char, contains at least one ":", may contain "{...}" segments. We
  // anchor on backticks to avoid pulling URLs or inline code.
  const prefixTokenRe = /`([a-z][a-z0-9_]*(?::[A-Za-z0-9_{}*+\-]+)+\*?)`/g;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("|") || line.startsWith("#")) continue;
    // Find every backtick-token in the line that matches a prefix shape.
    const matches: string[] = [];
    let m: RegExpExecArray | null;
    prefixTokenRe.lastIndex = 0;
    while ((m = prefixTokenRe.exec(line)) !== null) {
      matches.push(m[1]);
    }
    if (matches.length === 0) continue;
    // Polarity / description: take what follows the last token in the
    // line. Strip leading "— ", "- ", or "/".
    const lastIdx = line.lastIndexOf("`" + matches[matches.length - 1] + "`");
    const tail = line
      .slice(lastIdx + matches[matches.length - 1].length + 2)
      .replace(/^[\s—\-/.,]+/, "")
      .trim();
    const polarityMatch = tail.match(/Polarity:\s*([^.]+)\./i);
    const polarity = polarityMatch ? polarityMatch[1].trim() : undefined;
    // Description is the tail minus the polarity sentence (best-effort).
    const description = tail.replace(/Polarity:[^.]*\.?/i, "").trim();
    for (const prefix of matches) {
      if (seen.has(prefix)) continue;
      seen.add(prefix);
      out.push({
        prefix,
        description: description || tail,
        polarity,
        section: "",
        sectionTitle: "",
        component: "CIRISAgent",
        family: null,
      });
    }
  }
  return out;
}

function stripBackticks(s: string): string {
  return s.replace(/`/g, "").trim();
}

function extractSpecVersion(
  versionText: string,
  readmeText: string,
): {
  specVersion: string;
  lastUpdated: string;
} {
  // VERSION is the bare number ("1.0-rc4"). The README carries the cut date on
  // its status line: "**This tree:** CC 1.0-rc4 ... cut 2026-09-03 (...)".
  const version = versionText.trim().split(/\s/)[0];
  const cut = readmeText.match(/cut\s+(\d{4}-\d{2}-\d{2})/);
  return {
    specVersion: version ? `CC ${version}` : "CC 1.0-rc4",
    lastUpdated: cut ? cut[1] : "\u2014",
  };
}

async function fetchCommitSha(): Promise<{
  short: string;
  full: string;
}> {
  const url = `https://api.github.com/repos/CIRISAI/CIRISConstitution/commits?path=${encodeURIComponent(CC_DIR)}&per_page=1&cb=${BUILD_REV}`;
  try {
    const resp = await fetch(url, {
      cache: "force-cache",
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!resp.ok) return { short: "—", full: "" };
    const data = (await resp.json()) as { sha?: string }[];
    const sha = data?.[0]?.sha;
    if (!sha) return { short: "—", full: "" };
    return { short: sha.slice(0, 7), full: sha };
  } catch {
    return { short: "—", full: "" };
  }
}

// Fetch text with a longer timeout and a couple of retries. The cache-buster
// forces a live network fetch every build, so a transient raw.githubusercontent
// hiccup would otherwise fail the whole deploy; retry rather than break.
async function fetchTextWithRetry(
  url: string,
  label: string,
  attempts = 3,
): Promise<string> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const resp = await fetch(url, {
        cache: "force-cache",
        signal: AbortSignal.timeout(20000),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.text();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
      }
    }
  }
  throw new Error(
    `Failed to fetch ${label} after ${attempts} attempts: ${String(lastErr)}. The constitution is the source of truth, and there is no other document to fall back to.`,
  );
}

/**
 * The spec source, or `null` when it cannot be read.
 *
 * The CEG chapters moved into the CIRIS Constitution and the old directory is
 * a stub, so this fetch 404s and took the whole site's build with it. The rule
 * above still holds: there is no fallback to another document, because a
 * different source would be a different spec. What changed is that a missing
 * source now returns `null` and the two pages that read it say so, instead of
 * every page on the site failing to build.
 */
export const getRegistrySource = cache(async (): Promise<RegistrySource | null> => {
  let readmeText: string;
  let versionText: string;
  let text: string;
  try {
    [readmeText, versionText, text] = await Promise.all([
      fetchTextWithRetry(README_URL, CC_README_PATH),
      fetchTextWithRetry(VERSION_URL, CC_VERSION_PATH),
      fetchTextWithRetry(NAMESPACE_URL, CC_NAMESPACE_PATH),
    ]);
  } catch (e) {
    console.warn(
      `[grammar] spec source unavailable, rendering the moved-notice instead: ${String(e)}`,
    );
    return null;
  }
  const { specVersion, lastUpdated } = extractSpecVersion(versionText, readmeText);
  const sha = await fetchCommitSha();

  // The whole file IS Part 3. No boundary slicing needed.
  const sec5 = scanSections(text);

  const byTopSection = new Map<string, NamespaceSection>();
  for (const s of sec5) {
    const isTop = s.section.split(".").length === 2;
    if (isTop) {
      const component = componentFor(s.section, s.title);
      byTopSection.set(s.section, {
        section: s.section,
        title: s.title,
        component,
        subsections: [],
      });
    }
  }

  const endOfFile = text.split("\n").length;
  for (let i = 0; i < sec5.length; i++) {
    const s = sec5[i];
    const nextStart = i + 1 < sec5.length ? sec5[i + 1].startLine : endOfFile;
    const extracted = extractSection(text, s.startLine, nextStart);
    const component = componentFor(s.section, s.title);
    const family = familyFor(s.section);
    extracted.rows.forEach((r) => {
      r.section = s.section;
      r.sectionTitle = s.title;
      r.component = component;
      r.family = family;
    });
    const isTop = s.section.split(".").length === 2;
    if (isTop) {
      const top = byTopSection.get(s.section)!;
      if (extracted.rows.length > 0) {
        top.subsections.push({
          section: s.section,
          title: s.title,
          family,
          rows: extracted.rows,
          notes: extracted.notes,
        });
      }
    } else {
      const parentSection = s.section.split(".").slice(0, 2).join(".");
      const parent = byTopSection.get(parentSection);
      if (parent) {
        parent.subsections.push({
          section: s.section,
          title: s.title,
          family,
          rows: extracted.rows,
          notes: extracted.notes,
        });
      }
    }
  }

  const namespace = Array.from(byTopSection.values()).sort((a, b) =>
    a.section.localeCompare(b.section),
  );
  const totalPrefixes = namespace.reduce(
    (acc, ns) =>
      acc + ns.subsections.reduce((s, sub) => s + sub.rows.length, 0),
    0,
  );

  return {
    specVersion,
    fsdLastUpdated: lastUpdated,
    commitShaShort: sha.short,
    commitShaFull: sha.full,
    namespace,
    totalPrefixes,
  };
});

export function specCommitUrl(sha: string): string {
  return `${CC_REPO}/blob/${sha || "main"}/${CC_NAMESPACE_PATH}`;
}
