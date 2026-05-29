// CEG icon language.
//
// Every node in the graph gets one emoji glyph plus a family-badge icon.
// Same icon family = same CEG role. A 🤲 between two attesters is a
// delegation; a ♻️ on a claim is a supersession; a 💌 is a recantation
// with reason. The vocabulary is consistent across every viewing mode.
//
// Resolver order: explicit id match → role match → family fallback.

import type { KernelNode } from "../components/AlephView";

// ── Primitives (composition verbs) ─────────────────────────────
export const PRIMITIVE_ICONS: Record<string, string> = {
  scores: "⚖️",
  delegates_to: "🤲",
  supersedes: "♻️",
  withdraws: "🫥",
  recants: "💌",
};

// ── Families (concern areas) ───────────────────────────────────
export const FAMILY_ICONS: Record<string, string> = {
  STANDING: "🏛️",
  ACTION: "⚙️",
  DETECTION: "🔍",
  CONSENSUS: "🤝",
  CORRECTION: "🔧",
};

// ── Game roles ─────────────────────────────────────────────────
export const ROLE_ICONS: Record<string, string> = {
  student: "🧒",
  teacher: "🧑‍🏫",
  staff: "🛠️",
  visitor: "👤",
  community: "👴",
  ai_agent: "🤖",
};

// ── Named AI agents (override the generic 🤖) ──────────────────
const AI_BY_NAME: Record<string, string> = {
  Aurora: "🌅",
  Tally: "📊",
  Quill: "✍️",
  Kelp: "🌿",
};

// ── Staff specialisation (override the generic 🛠️ when the name fits) ──
const STAFF_BY_KEYWORD: Array<[RegExp, string]> = [
  [/librar/i, "📚"],
  [/counsellor|counselor/i, "💭"],
  [/cook|dining/i, "🍳"],
  [/nurse|clinic|medic/i, "🏥"],
  [/custodi|janitor|clean/i, "🧹"],
  [/comms|relay|tech/i, "📡"],
  [/clerk|registr/i, "📋"],
  [/garden|hydro/i, "🌱"],
];

// ── Publications ───────────────────────────────────────────────
const PUB_BY_TIER: Record<string, string> = {
  newspaper: "📰",
  club_newsletter: "📃",
  class_announcement: "🗒️",
  encyclopedia: "📚",
};

// ── Encyclopedia voices ────────────────────────────────────────
const ENC_BY_ID: Record<string, string> = {
  "pub-encyclopedia": "📚",
  "att-accord": "⚖️",
};

// ── Red Riding Hood demo voices ────────────────────────────────
export const RRH_GLYPHS: Record<string, string> = {
  "rrh-red": "🧒",
  "rrh-wolf": "🐺",
  "rrh-grandmother": "👵",
  "rrh-mother": "👩",
  "rrh-woodsman": "🪓",
  "rrh-squirrel": "🐿️",
  "rrh-hunter": "🏹",
  "rrh-crier": "📜",
};

// ── Meta-group cluster anchors ─────────────────────────────────
const META_GLYPH_BY_FAMILY: Record<string, string> = {
  STANDING: "🏛️",
  ACTION: "⚙️",
  DETECTION: "🔍",
  CONSENSUS: "🤝",
  CORRECTION: "🔧",
};

// ── Components (in encyclopedia mode) ──────────────────────────
const COMPONENT_GLYPH: Record<string, string> = {
  CIRISAgent: "🤖",
  CIRISVerify: "✅",
  CIRISPersist: "💾",
  CIRISEdge: "📡",
  CIRISLensCore: "🔭",
  CIRISNodeCore: "🌐",
  RATCHET: "🪜",
  CIRISBench: "📐",
  CIRISRegistry: "📚",
};

// ── Top-level resolver ─────────────────────────────────────────
export function iconForNode(node: KernelNode): string {
  const id = node.id;

  // Demo voices win first.
  if (id in RRH_GLYPHS) return RRH_GLYPHS[id];

  // Encyclopedia institutional voices.
  if (id in ENC_BY_ID) return ENC_BY_ID[id];

  // Component voice (att-comp:CIRISAgent etc).
  if (id.startsWith("att-comp:")) {
    const comp = id.replace(/^att-comp:/, "");
    return COMPONENT_GLYPH[comp] ?? "🏛️";
  }

  // Meta-group anchor (meta:STANDING etc).
  if (id.startsWith("meta:")) {
    const fam = id.replace(/^meta:/, "");
    return META_GLYPH_BY_FAMILY[fam] ?? "✨";
  }

  // Family node.
  if (node.group === "family" && node.family) {
    return FAMILY_ICONS[node.family] ?? "✦";
  }

  // Primitive node.
  if (node.group === "primitive") {
    const key = id.replace(/^prim:/, "");
    return PRIMITIVE_ICONS[key] ?? "·";
  }

  // Component node (structural, not an attester).
  if (node.group === "component" && node.component) {
    return COMPONENT_GLYPH[node.component] ?? "🏷️";
  }

  // Publication ids — by id prefix.
  if (id.startsWith("pub-") || id.startsWith("news-") || id.startsWith("ann-")) {
    if (id.startsWith("news-")) return PUB_BY_TIER.club_newsletter;
    if (id.startsWith("ann-")) return PUB_BY_TIER.class_announcement;
    if (id === "pub-encyclopedia") return PUB_BY_TIER.encyclopedia;
    return PUB_BY_TIER.newspaper;
  }

  // Game characters — by id prefix and label.
  if (id.startsWith("student-")) return ROLE_ICONS.student;
  if (id.startsWith("teacher-")) return ROLE_ICONS.teacher;
  if (id.startsWith("staff-")) {
    for (const [re, glyph] of STAFF_BY_KEYWORD) {
      if (re.test(id) || re.test(node.label)) return glyph;
    }
    return ROLE_ICONS.staff;
  }
  if (id.startsWith("visitor-")) return ROLE_ICONS.visitor;
  if (id.startsWith("community-")) return ROLE_ICONS.community;
  if (id.startsWith("ai-") || id.endsWith("-ai") || node.label in AI_BY_NAME) {
    return AI_BY_NAME[node.label] ?? ROLE_ICONS.ai_agent;
  }
  for (const [name, glyph] of Object.entries(AI_BY_NAME)) {
    if (node.label.startsWith(name)) return glyph;
  }

  // Prefix leaf — small dot, not labelled individually.
  if (node.group === "prefix") return "·";

  // Claim — no icon (claims are the small spheres halo'd around voices).
  if (node.group === "claim") return "";

  // Generic attester fallback.
  if (node.group === "attester") {
    if (node.family) return FAMILY_ICONS[node.family] ?? "👤";
    return "👤";
  }

  return "·";
}

// Family badge for an attester — small glyph that goes next to the main
// icon to show which concern area they care about.
export function familyBadgeForNode(node: KernelNode): string {
  if (node.family && node.family in FAMILY_ICONS) {
    return FAMILY_ICONS[node.family];
  }
  return "";
}
