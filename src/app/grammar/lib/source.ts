import "server-only";
import { cache } from "react";
import {
  REGISTRY_RAW,
  REGISTRY_REPO,
  CEG_DIR,
  CEG_README_PATH,
  CEG_NAMESPACE_PATH,
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
const README_URL = `${REGISTRY_RAW}/${CEG_README_PATH}?cb=${BUILD_REV}`;
const NAMESPACE_URL = `${REGISTRY_RAW}/${CEG_NAMESPACE_PATH}?cb=${BUILD_REV}`;

// CEG 0.1 §5 namespace mapping. §5 lives in its own file (05_namespace.md)
// as of the directory-based 18-file layout. Headings are ## §5.x (top-level
// component) and ### §5.x.y (sub-section).
const SECTION_TO_COMPONENT: Record<string, ComponentId> = {
  "5.1": "CIRISAgent",
  "5.2": "CIRISVerify",
  "5.3": "CIRISPersist",
  "5.4": "CIRISEdge",
  "5.5": "CIRISLensCore",
  "5.6": "CIRISNodeCore",
  "5.7": "RATCHET",
  "5.8": "CIRISBench",
  "5.9": "CIRISRegistry",
};

// Per CEG 0.1 §12.1 — the five-family organization of the namespace.
const SUBSECTION_TO_FAMILY: Record<string, FamilyId> = {
  // Agent (§5.1) — Accord + DMA + conscience + apophatic = STANDING
  "5.1.1": "STANDING",
  "5.1.2": "STANDING",
  "5.1.3": "STANDING",
  "5.1.4": "STANDING",
  // Verify (§5.2) — attestation ladder + provenance + transparency = STANDING
  "5.2": "STANDING",
  "5.2.1": "STANDING",
  // Persist (§5.3) — substrate self-reports = STANDING
  "5.3": "STANDING",
  // Edge (§5.4) — substrate self-reports = STANDING
  "5.4": "STANDING",
  // LensCore (§5.5)
  "5.5": "DETECTION",
  "5.5.1": "DETECTION", // Coherence Ratchet detectors
  "5.5.2": "STANDING", // Cohort + conformity
  "5.5.3": "DETECTION", // F-3 correlated-action
  "5.5.4": "STANDING", // Capacity-Score factors
  "5.5.5": "DETECTION", // Distributive-access
  // NodeCore (§5.6)
  "5.6.1": "STANDING", // Tier-1 ledger
  "5.6.2": "ACTION", // Tier-2 decision hierarchy
  "5.6.3": "CONSENSUS", // Tier-3 consensus mechanics
  "5.6.4": "CORRECTION", // Tier-4 governance
  "5.6.5": "ACTION", // Decision locality
  "5.6.6": "STANDING", // hard_case + transparency + judge_model
  "5.6.7": "STANDING", // Files-as-Contributions
  "5.6.8": "STANDING", // Content ingestion (news/encyclopedia/topical_relation)
  // RATCHET (§5.7)
  "5.7": "DETECTION",
  // Bench (§5.8)
  "5.8": "STANDING",
  // Registry (§5.9)
  "5.9": "STANDING",
};

function familyFor(section: string): FamilyId | null {
  if (SUBSECTION_TO_FAMILY[section]) return SUBSECTION_TO_FAMILY[section];
  const parent = section.split(".").slice(0, 2).join(".");
  return SUBSECTION_TO_FAMILY[parent] ?? null;
}

function componentFor(section: string): ComponentId {
  const top = section.split(".").slice(0, 2).join(".");
  return SECTION_TO_COMPONENT[top] ?? "CIRISAgent";
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

function extractSpecVersion(text: string): {
  specVersion: string;
  lastUpdated: string;
} {
  // Capture the version token up to the first space or "(", so release-
  // candidate suffixes survive (e.g. "1.0-RC2 (Release Candidate ...)" ->
  // "1.0-RC2", not "1.0").
  const versionMatch = text.match(/\*\*Version\*\*:\s*([0-9][^\s(]*)/);
  // Status format: "Public Working Draft (2026-05-28). ..."
  const statusMatch = text.match(/\*\*Status\*\*:[^(]*\((\d{4}-\d{2}-\d{2})\)/);
  return {
    specVersion: versionMatch ? `CEG ${versionMatch[1].trim()}` : "CEG 0.1",
    lastUpdated: statusMatch ? statusMatch[1] : "—",
  };
}

async function fetchCommitSha(): Promise<{
  short: string;
  full: string;
}> {
  const url = `https://api.github.com/repos/CIRISAI/CIRISRegistry/commits?path=${encodeURIComponent(CEG_DIR)}&per_page=1&cb=${BUILD_REV}`;
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
    `Failed to fetch ${label} after ${attempts} attempts: ${String(lastErr)}. CEG is the source of truth — no fallback to FSD-002.`,
  );
}

export const getRegistrySource = cache(async (): Promise<RegistrySource> => {
  const [readmeText, text] = await Promise.all([
    fetchTextWithRetry(README_URL, CEG_README_PATH),
    fetchTextWithRetry(NAMESPACE_URL, CEG_NAMESPACE_PATH),
  ]);
  const { specVersion, lastUpdated } = extractSpecVersion(readmeText);
  const sha = await fetchCommitSha();

  // The whole namespace file IS §5. No boundary slicing needed.
  const sec5 = scanSections(text);

  const byTopSection = new Map<string, NamespaceSection>();
  for (const s of sec5) {
    const isTop = s.section.split(".").length === 2;
    if (isTop) {
      const component = componentFor(s.section);
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
    const component = componentFor(s.section);
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
  return `${REGISTRY_REPO}/blob/${sha || "main"}/${CEG_DIR}/README.md`;
}
