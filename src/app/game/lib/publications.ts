// Institutional attesters — newspapers, club newsletters, class
// announcements, the colony encyclopedia. These are the PUBLISHED sources
// the kids cite when they say "I read it in…" or "the announcement said…"
//
// Design rules locked by the user:
// 1. Every source has a drift rate in [0.20, 0.50]. Lower than 20% and
//    players just trust them blindly; higher than 50% and players silence
//    them. The sweet spot forces case-by-case evaluation.
// 2. Important clue details DELIBERATELY land in noisier sources too. You
//    can't just ignore the gossipy paper — sometimes it's the only place a
//    detail survives in writing.
// 3. The game surfaces "your evidence pool is weak" when a player has
//    pinned only low-credibility sources OR only witnesses whose attention
//    was nowhere near the case's domain. The surfacing is honest, not
//    punitive: "your interview roster is narrow; here's how to widen it."
//
// Trust applies AT THE SOURCE level (newspaper / club / class /
// encyclopedia), never at the kid level. Kids faithfully report what they
// read. The newspaper may have drifted.

import {
  CLUBS,
  CLASSES,
  CHARACTERS,
} from "@/app/grammar/lib/characters-generated";
import type { AttentionDomain } from "@/app/grammar/lib/characters-generated";

export interface Publication {
  id: string;
  tier: "newspaper" | "club_newsletter" | "class_announcement" | "encyclopedia";
  name: string;
  masthead: string;        // 4-8 char displayed short label
  tagline: string;         // one short line, no em dashes
  /** Probability that any given detail in this source has drifted. In [0.20, 0.50]. */
  drift_rate: number;
  /** Domains the source COVERS well. Drift outside these is higher. */
  focus_domains: AttentionDomain[];
  /** Optional bias note rendered in the UI when the source is consulted. */
  editorial_note?: string;
  /** Affiliated club id / class id / null for newspapers and encyclopedia. */
  affiliation_id?: string;
  /** Source palette key for the tile background. */
  hue: string;
}

// ── Newspapers (colony-wide) ─────────────────────────────────────────

export const NEWSPAPERS: Publication[] = [
  {
    id: "pub-reach-times",
    tier: "newspaper",
    name: "The Reach Times",
    masthead: "TIMES",
    tagline: "Slow news from the observation cupola.",
    drift_rate: 0.22,
    focus_domains: ["schedule-and-dates", "technical-readings", "weather-and-light"],
    editorial_note: "Verified-twice editorial; never publishes inside 12 hours of an event.",
    hue: "#4a6488",
  },
  {
    id: "pub-hotbunk-daily",
    tier: "newspaper",
    name: "The Hot-Bunk Daily",
    masthead: "HOTBNK",
    tagline: "Whoever sleeps late prints late.",
    drift_rate: 0.46,
    focus_domains: ["social-tensions", "people-feelings", "spoken-words"],
    editorial_note: "Gossip-leaning; corrections column is two pages long. Also breaks half the real stories first.",
    hue: "#b94c2a",
  },
  {
    id: "pub-bee-bulletin",
    tier: "newspaper",
    name: "The Bee-Tender Bulletin",
    masthead: "BEES",
    tagline: "Pollen counts. Honey reports. Other things, sometimes.",
    drift_rate: 0.27,
    focus_domains: ["smells-and-tastes", "weather-and-light", "systems-and-flows"],
    editorial_note: "Hyper-focused on pollinators. Adjacent stories get a sentence and a guess.",
    hue: "#d4a04a",
  },
  {
    id: "pub-moonsong",
    tier: "newspaper",
    name: "The Moonsong",
    masthead: "MOON",
    tagline: "Arts, schedules, and the long calendar.",
    drift_rate: 0.34,
    focus_domains: ["sounds-and-songs", "body-language", "schedule-and-dates"],
    editorial_note: "Accurate on performance schedules; runs on vibe for everything else.",
    hue: "#7a3aaa",
  },
  {
    id: "pub-lower-terrace",
    tier: "newspaper",
    name: "The Lower Terrace Bond",
    masthead: "LOWER",
    tagline: "Neighborhood news with a long memory.",
    drift_rate: 0.41,
    focus_domains: ["social-tensions", "spoken-words", "people-feelings"],
    editorial_note: "Knows every name on the lower terrace; mixes up upper-terrace names freely.",
    hue: "#4a6a3a",
  },
  {
    id: "pub-intercupola",
    tier: "newspaper",
    name: "Inter-Cupola Edition",
    masthead: "ICED",
    tagline: "Official school communications.",
    drift_rate: 0.29,
    focus_domains: ["schedule-and-dates", "spoken-words", "systems-and-flows"],
    editorial_note: "Institutional; underreports scandal, overcounts attendance.",
    hue: "#3a2e2a",
  },
  {
    id: "pub-long-crossing",
    tier: "newspaper",
    name: "Long-Crossing Weekly",
    masthead: "CROSS",
    tagline: "Diaspora news and elder remembrance.",
    drift_rate: 0.44,
    focus_domains: ["spoken-words", "people-feelings", "weather-and-light"],
    editorial_note: "Mostly Earth-era reprints; sometimes the only source on what an elder did before they came up.",
    hue: "#aa3a4a",
  },
];

// ── Club newsletters (one per club) ──────────────────────────────────

const CLUB_DRIFT_RATE: Record<string, number> = {
  "club-archive-junior": 0.30,
  "club-hydro-junior": 0.38,
  "club-hydro-senior": 0.24,
  "club-gardens-crew": 0.31,
  "club-moonsong": 0.27,
  "club-comms-senior": 0.23,
  "club-comms-junior": 0.39,
  "club-reach-watchers": 0.25,
  "club-myths": 0.42,
  "club-equinox": 0.35,
  "club-bees": 0.26,
  "club-encyclopedia": 0.28,
  "club-yarn": 0.36,
  "club-wellbeing": 0.33,
  "club-forum": 0.30,
  "club-skiff": 0.40,
  "club-zine": 0.45,
};

export const CLUB_NEWSLETTERS: Publication[] = CLUBS.map((club) => ({
  id: `news-${club.id}`,
  tier: "club_newsletter" as const,
  name: `${club.name} Newsletter`,
  masthead: club.name.split(" ")[0].slice(0, 6).toUpperCase(),
  tagline: `News and notes from ${club.name}.`,
  drift_rate: CLUB_DRIFT_RATE[club.id] ?? 0.33,
  focus_domains: club.attention_focus,
  affiliation_id: club.id,
  editorial_note: `Voice of the club. Solid inside their focus, vaguer outside.`,
  hue: "#4a6488",
}));

// ── Class announcements (one per teacher's class) ────────────────────

const CLASS_DRIFT_RATE: Record<string, number> = {
  "class-okeke-history": 0.27,
  "class-park-life-sciences": 0.30,
  "class-iyer-ethics": 0.34,
  "class-akinyemi-music": 0.32,
  "class-davies-hydroponics": 0.26,
  "class-yazzie-orbital-mech": 0.23,
  "class-haakonsen-civics": 0.31,
  "class-takahashi-literature": 0.36,
  "class-nakamura-mathematics": 0.21,
  "class-singh-engineering": 0.24,
  "class-kealoha-oceanography": 0.29,
  "class-haddad-arabic": 0.33,
  "class-nascimento-art": 0.37,
  "class-chen-computing": 0.25,
  "class-lacroix-french": 0.34,
  "class-tafari-physical-education": 0.38,
  "class-volkova-russian": 0.32,
  "class-blackbird-storytelling": 0.40,
};

function teacherShortName(teacherId: string): string {
  const teacher = CHARACTERS.find((c) => c.id === teacherId);
  if (!teacher) return "MX";
  const surnameMatch = teacher.name.match(/(?:Mx\.?|Ms\.?|Mr\.?|Mrs\.?|Dr\.?)\s*([A-Z][a-z]+)/);
  const surname = surnameMatch?.[1] ?? teacher.name.split(/\s+/).pop() ?? "MX";
  return surname.slice(0, 6).toUpperCase();
}

export const CLASS_ANNOUNCEMENTS: Publication[] = CLASSES.map((cls) => ({
  id: `ann-${cls.id}`,
  tier: "class_announcement" as const,
  name: `${cls.topic} class announcements`,
  masthead: teacherShortName(cls.teacher_id),
  tagline: `${cls.topic}. Posted at end of class.`,
  drift_rate: CLASS_DRIFT_RATE[cls.id] ?? 0.30,
  focus_domains: cls.attention_imprint,
  affiliation_id: cls.id,
  editorial_note: `Teacher-curated. Accurate on the lesson; brisk outside it.`,
  hue: "#4a6a3a",
}));

// ── Encyclopedia (single source, edit-warred) ────────────────────────

export const ENCYCLOPEDIA: Publication = {
  id: "pub-encyclopedia",
  tier: "encyclopedia",
  name: "The Cascadia Encyclopedia",
  masthead: "ENCYC",
  tagline: "Maintained by the Encyclopedia Maintainers club.",
  drift_rate: 0.30,
  focus_domains: ["systems-and-flows", "spoken-words", "schedule-and-dates"],
  editorial_note: "Edit-warred on contested topics; locked entries are more trustworthy than open ones.",
  hue: "#7a3aaa",
};

// ── All sources, indexed ─────────────────────────────────────────────

export const ALL_PUBLICATIONS: Publication[] = [
  ...NEWSPAPERS,
  ...CLUB_NEWSLETTERS,
  ...CLASS_ANNOUNCEMENTS,
  ENCYCLOPEDIA,
];

export const PUBLICATIONS_BY_ID: Record<string, Publication> =
  Object.fromEntries(ALL_PUBLICATIONS.map((p) => [p.id, p]));

// ── Diagnostic: how good is this evidence pool? ──────────────────────

export interface EvidencePoolDiagnostic {
  source_count: number;
  avg_drift: number;
  domain_coverage: AttentionDomain[];
  worst_offender_id?: string;
  // surfaces honestly when the pool is weak; never punitive
  warnings: string[];
}

export function diagnoseEvidencePool(
  pinnedPublicationIds: string[],
  pinnedWitnessAttentionDomains: AttentionDomain[],
  caseRelevantDomains: AttentionDomain[],
): EvidencePoolDiagnostic {
  const pubs = pinnedPublicationIds
    .map((id) => PUBLICATIONS_BY_ID[id])
    .filter((p): p is Publication => !!p);
  const avgDrift =
    pubs.length === 0
      ? 0
      : pubs.reduce((s, p) => s + p.drift_rate, 0) / pubs.length;
  const coverage = new Set<AttentionDomain>(pinnedWitnessAttentionDomains);
  pubs.forEach((p) => p.focus_domains.forEach((d) => coverage.add(d)));
  const missingDomains = caseRelevantDomains.filter(
    (d) => !coverage.has(d),
  );
  const worstOffender = pubs
    .slice()
    .sort((a, b) => b.drift_rate - a.drift_rate)[0]?.id;

  const warnings: string[] = [];
  if (pubs.length === 0 && pinnedWitnessAttentionDomains.length === 0) {
    warnings.push(
      "Empty evidence pool. Pin some kids, some sources, or both.",
    );
  }
  if (avgDrift > 0.40 && pubs.length > 0) {
    warnings.push(
      `Average source drift ${(avgDrift * 100).toFixed(0)}%. Add a more careful paper or two.`,
    );
  }
  if (missingDomains.length >= caseRelevantDomains.length) {
    warnings.push(
      "Nobody in your pool was paying attention to anything this case is about. Widen your roster.",
    );
  } else if (missingDomains.length > 0) {
    warnings.push(
      `Missing domain coverage: ${missingDomains.join(", ")}. Consider pinning a kid whose club or class hits those.`,
    );
  }

  return {
    source_count: pubs.length,
    avg_drift: avgDrift,
    domain_coverage: Array.from(coverage),
    worst_offender_id: worstOffender,
    warnings,
  };
}
