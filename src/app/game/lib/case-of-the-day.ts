// "Case 001 — The Bitter-Melon Mix-Up." First case the player meets at
// /game. Lands as a speech bubble from a specific named client (a year-1
// from the Junior Hydroponics Co-op, who genuinely saw something), with
// three empty deduction slots visible immediately. Per the research:
// one impossible-feeling contradiction in the first sentence, one named
// POV client, three slots that fill up.

import type { RoomId } from "./school";

export interface CaseSlot {
  id: "who" | "where" | "how";
  label: string;            // "WHO SAW IT" / "WHERE IT HAPPENED" / "WHAT GOT MIXED UP"
  hint: string;             // visible hint inside the empty slot
}

export interface OpeningClue {
  source_id: string;        // newspaper/club/character id
  source_label: string;     // "THE HOT-BUNK DAILY · 14:08"
  line: string;             // a single line from a printed source
  contradiction_hint: string; // why this line is interesting
}

export interface CaseHookCopy {
  id: string;
  /** Status chip displayed at the top. */
  status_chip: string;
  /** Two-word case codename. */
  codename: string;
  /** Sub-title. */
  subtitle: string;
  /** The NAMED client who walks into your study. Pulled from the real roster. */
  client_id: string;
  client_name: string;
  client_year: string;
  /** Speech bubble. ONE impossible-feeling contradiction. Two sentences max. */
  client_quote: string;
  /** Empty slots visible immediately. */
  slots: CaseSlot[];
  /** ONE starting clue, auto-visible. */
  opening_clue: OpeningClue;
  /** Two-line opener of the case body, shown only on expand. */
  framing_short: string;
}

export const CASE_OF_THE_DAY: CaseHookCopy = {
  id: "case-001-bitter-melon",
  status_chip: "TUE · 14:23 · HEARTHSIDE",
  codename: "CASE 001",
  subtitle: "THE BITTER-MELON MIX-UP",
  client_id: "student-y1-mateo-cordeiro",
  client_name: "Mateo Cordeiro",
  client_year: "Year 1, Junior Hydroponics",
  client_quote:
    "Two papers say my tray was bitter-melon and two papers say it was sweet-pea. They printed both before lunch. Nobody is lying, but everybody is wrong about something. Can you help me figure out what?",
  slots: [
    { id: "who",   label: "WHO WAS CARRYING",   hint: "tap a face to file" },
    { id: "where", label: "WHERE IT HAPPENED",  hint: "tap a room to file" },
    { id: "how",   label: "WHAT GOT MIXED UP",  hint: "tap a source to file" },
  ],
  opening_clue: {
    source_id: "pub-hotbunk-daily",
    source_label: "HOT-BUNK DAILY · 14:08",
    line: "Bitter-melon seedlings drowned in sweet-pea solution near Hydroponics this afternoon, per a year-1 source.",
    contradiction_hint:
      "INTER-CUPOLA EDITION at 14:12 said sweet-pea trays got bitter-melon nutrient. Both can't be right.",
  },
  framing_short:
    "Eleven kids and three teachers were in or near the gardens at 14:00. Four sources have already printed. Talk to who you trust. Read who you trust. Mark the details that drifted.",
};

// Rooms relevant to this case (highlighted on the school map).
export const CASE_HOT_ROOMS: RoomId[] = [
  "hydroponics",
  "gardens",
  "year1_room",
  "music_room",      // Idris was carrying the chapbook
  "comms_tower",     // Aurora's idle log
];
