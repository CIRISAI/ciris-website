// Cascadia Reach School — canonical layout for /game.
//
// The school footprint NEVER changes. Rooms and their positions are fixed.
// Only what is INSIDE a room changes (CLASS view vs CLUB view, time-of-day,
// case-specific filters).
//
// Mobile-first: 4 floors. Each floor has 4-6 rooms in a hand-laid grid. On
// phone you see one floor at a time; on tablet you can see two; on desktop
// the whole school folds open.

export type RoomId =
  | "year1_room"
  | "year2_room"
  | "year3_room"
  | "year4_room"
  | "year5_room"
  | "year6_room"
  | "dining_hall"
  | "kitchen"
  | "library"
  | "archive"
  | "counsellors_office"
  | "nurses_office"
  | "hydroponics"
  | "gardens"
  | "music_room"
  | "art_studio"
  | "comms_tower"
  | "the_reach"
  | "yarn_workshop"
  | "staff_room";

export interface Room {
  id: RoomId;
  label: string;          // displayed name
  short: string;          // 6-8 char fit-in-tile label
  floor: number;          // 1..4
  // 1-indexed grid position within the floor (col, row). Each floor is a
  // 3-col x 2-row grid on mobile, expanding to wider on larger screens.
  col: number;
  row: number;
  // The vibe glyph: a single emoji-free pixel glyph for the room icon. We
  // draw these in CSS using a 4-letter shorthand the FaceTile palette
  // already knows how to render.
  glyph: string;
}

export const FLOORS = [
  { id: 1, label: "GROUND" },
  { id: 2, label: "MIDDLE" },
  { id: 3, label: "UPPER" },
  { id: 4, label: "REACH" },
] as const;

// Hand-laid grid. Mobile shows one floor at a time. Each floor has up to 6
// rooms in a 3x2 grid; rooms that don't exist on a floor leave a gap.
export const ROOMS: Room[] = [
  // ──── Floor 1 ── ground: common life ────
  { id: "dining_hall",        label: "Dining Hall",         short: "DINING",  floor: 1, col: 1, row: 1, glyph: "▤" },
  { id: "kitchen",            label: "Kitchen",             short: "KITCH",   floor: 1, col: 2, row: 1, glyph: "⌑" },
  { id: "yarn_workshop",      label: "Yarn & Cloth",        short: "YARN",    floor: 1, col: 3, row: 1, glyph: "◇" },
  { id: "nurses_office",      label: "Nurse's Office",      short: "NURSE",   floor: 1, col: 1, row: 2, glyph: "✚" },
  { id: "counsellors_office", label: "Counsellor's Office", short: "COUNSEL", floor: 1, col: 2, row: 2, glyph: "◐" },
  { id: "staff_room",         label: "Staff Room",          short: "STAFF",   floor: 1, col: 3, row: 2, glyph: "⊡" },

  // ──── Floor 2 ── middle: year-1/2/3 classrooms ────
  { id: "year1_room",         label: "Year 1 Room",         short: "YEAR-1",  floor: 2, col: 1, row: 1, glyph: "1" },
  { id: "year2_room",         label: "Year 2 Room",         short: "YEAR-2",  floor: 2, col: 2, row: 1, glyph: "2" },
  { id: "year3_room",         label: "Year 3 Room",         short: "YEAR-3",  floor: 2, col: 3, row: 1, glyph: "3" },
  { id: "library",            label: "Library",             short: "LIBRARY", floor: 2, col: 1, row: 2, glyph: "✦" },
  { id: "archive",            label: "The Archive",         short: "ARCHIVE", floor: 2, col: 2, row: 2, glyph: "⊞" },
  { id: "music_room",         label: "Music Room",          short: "MUSIC",   floor: 2, col: 3, row: 2, glyph: "♪" },

  // ──── Floor 3 ── upper: year-4/5/6 + outer ────
  { id: "year4_room",         label: "Year 4 Room",         short: "YEAR-4",  floor: 3, col: 1, row: 1, glyph: "4" },
  { id: "year5_room",         label: "Year 5 Room",         short: "YEAR-5",  floor: 3, col: 2, row: 1, glyph: "5" },
  { id: "year6_room",         label: "Year 6 Room",         short: "YEAR-6",  floor: 3, col: 3, row: 1, glyph: "6" },
  { id: "hydroponics",        label: "Hydroponics Deck",    short: "HYDRO",   floor: 3, col: 1, row: 2, glyph: "≈" },
  { id: "gardens",            label: "Gardens",             short: "GARDEN",  floor: 3, col: 2, row: 2, glyph: "✿" },
  { id: "art_studio",         label: "Old Engine Bay",      short: "ART",     floor: 3, col: 3, row: 2, glyph: "△" },

  // ──── Floor 4 ── reach: comms + observation ────
  { id: "comms_tower",        label: "Comms Tower",         short: "COMMS",   floor: 4, col: 1, row: 1, glyph: "↑" },
  { id: "the_reach",          label: "The Reach",           short: "REACH",   floor: 4, col: 2, row: 1, glyph: "◉" },
];

export function roomsByFloor(floor: number): Room[] {
  return ROOMS.filter((r) => r.floor === floor);
}

export function findRoom(id: RoomId): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}
