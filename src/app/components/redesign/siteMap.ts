// The site regrouped by who is reading (the redesign's nav-sitemap artboard).
// One table feeds the header panels, the phone menu and the footer, so the
// three can never disagree. Labels are dictionary keys under rd.groups.<group>;
// every href here is a page that exists today.

import type { Dictionary } from "@/i18n/dictionaries";

type Groups = Dictionary["rd"]["groups"];
export type AudienceKey = "people" | "builders" | "network" | "researchers";

export interface SiteLink {
  /** Key of the label in rd.groups.<group>; the sub-line is `${key}Sub`. */
  key: string;
  href: string;
  /** Status chip beside the name. */
  chip?: "inDev";
}

export interface Audience {
  key: AudienceKey;
  feature: string;
  links: SiteLink[];
  /** The subset the footer lists (the panel lists them all). */
  footer: string[];
}

export const AUDIENCES: Audience[] = [
  {
    key: "people",
    feature: "/install",
    links: [
      { key: "install", href: "/install" },
      { key: "plainAnswers", href: "/plain-answers" },
      { key: "howItWorks", href: "/how-it-works" },
      { key: "privacy", href: "/privacy" },
      { key: "safety", href: "/safety" },
      { key: "trust", href: "/trust" },
      { key: "services", href: "/services" },
      { key: "values", href: "/values" },
      { key: "models", href: "/models" },
    ],
    footer: ["install", "plainAnswers", "howItWorks", "privacy", "safety", "values"],
  },
  {
    key: "builders",
    feature: "/architecture",
    links: [
      { key: "architecture", href: "/architecture" },
      { key: "grammar", href: "/grammar" },
      { key: "trace", href: "/explore-a-trace" },
      { key: "verification", href: "/verification" },
      { key: "integrations", href: "/integrations" },
      { key: "compliance", href: "/compliance" },
      { key: "killSwitch", href: "/security/post-quantum-kill-switch" },
      { key: "compare", href: "/compare" },
      { key: "repositories", href: "https://github.com/CIRISAI" },
    ],
    footer: ["architecture", "grammar", "trace", "verification", "repositories"],
  },
  {
    key: "network",
    feature: "/web4",
    links: [
      { key: "federation", href: "/federation" },
      { key: "cewp", href: "/cewp" },
      { key: "cewpos", href: "/cewpos", chip: "inDev" },
      { key: "constitution", href: "/constitution" },
      { key: "stewardship", href: "/stewardship" },
      { key: "mesh", href: "/constitutional-mesh" },
    ],
    footer: ["mesh", "federation", "cewp", "cewpos", "constitution"],
  },
  {
    key: "researchers",
    feature: "/research-status",
    links: [
      { key: "status", href: "/research-status" },
      { key: "theory", href: "/first-contact/theory" },
      { key: "papers", href: "/papers" },
      { key: "proof", href: "/proof" },
      { key: "collapse", href: "/coherence-collapse-analysis" },
      { key: "ratchet", href: "/coherence-ratchet" },
      { key: "scoring", href: "/ciris-scoring" },
      { key: "integrity", href: "/contextual-integrity" },
    ],
    footer: ["status", "theory", "papers", "proof", "scoring"],
  },
];

/** Footer only: about and ethos. */
export const ABOUT_LINKS: { key: keyof Groups["about"]; href: string }[] = [
  { key: "about", href: "/about" },
  { key: "philosophy", href: "/philosophy" },
  { key: "mdd", href: "/mdd" },
  { key: "welfare", href: "/ai-welfare" },
  { key: "firstContact", href: "/first-contact" },
  { key: "reviews", href: "/reviews" },
  { key: "status", href: "/status" },
  { key: "events", href: "/events" },
  { key: "safetyPolicy", href: "/safety-policy" },
];

export const SUPPORT_HREF = "https://www.gofundme.com/f/the-ai-the-world-deserves";

/** Read a label (or its sub-line) out of a group's copy. */
export function label(groups: Groups, group: AudienceKey, key: string): string {
  return (groups[group] as Record<string, string>)[key] ?? key;
}
