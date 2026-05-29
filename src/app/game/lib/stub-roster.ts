// Temporary stub roster for /game while the character-generation agent
// finishes. Replaced wholesale by lib/characters-generated.ts when that
// file lands. The shape mirrors the agreed CharacterProfile schema so the
// UI built against this stub will work unchanged when the real data lands.

import type { RoomId } from "./school";

export interface StubCharacter {
  id: string;
  name: string;
  role: "student" | "teacher" | "staff" | "visitor" | "ai_agent" | "community";
  yearBand?: "year-1" | "year-2" | "year-3" | "year-4" | "year-5" | "year-6";
  classroom?: RoomId;     // CLASS view: kid sits here
  clubRoom?: RoomId;      // CLUB view: kid is here when their main club meets
  hue: string;
}

// Diverse multicultural name pool for the stub. The real agent-generated
// roster will replace this; the pool exists only to make the UI build
// against shape-realistic data.
const FIRST_NAMES = [
  "Anwen", "Tomás", "Idris", "Marcia", "Aurora", "Nilai", "Okeke",
  "Akiyama", "Tilak", "Velasco", "Chen", "Nakamura", "Adeyemi",
  "Singh", "Kowalski", "Oyelaran", "Tamura", "Park", "Patel",
  "Ngata", "Ahmed", "Brennan", "Tahir", "Kuriakose", "Eze",
  "Lindqvist", "Wong", "Aram", "Bahir", "Cyril", "Devi",
  "Esi", "Faiza", "Gita", "Hana", "Ima", "Joon", "Kalu",
  "Lior", "Mira", "Naia", "Onyi", "Priya", "Quan", "Ravi",
  "Sara", "Tomi", "Una", "Vera", "Wynn", "Xola", "Yara",
  "Zara", "Adi", "Bora", "Cleo", "Dara", "Emi", "Finn",
  "Gemma", "Hira", "Ibo", "Jia", "Kya", "Levi", "Mei",
  "Noor", "Oona", "Pita", "Quin", "Rune", "Sera", "Tara",
  "Umi", "Vali", "Wren", "Xen", "Yumi", "Zola", "Ari",
  "Bina", "Cato", "Dia", "Eda", "Faye", "Galo", "Hema",
  "Iri", "Jai", "Kio", "Lana", "Mio", "Nia", "Olu",
  "Pia", "Qiao", "Rio", "Saba", "Tova", "Uri",
];

const ROLES: Array<StubCharacter["role"]> = [
  ...Array(60).fill("student") as StubCharacter["role"][],
  ...Array(18).fill("teacher") as StubCharacter["role"][],
  ...Array(8).fill("staff") as StubCharacter["role"][],
  ...Array(6).fill("visitor") as StubCharacter["role"][],
  ...Array(4).fill("ai_agent") as StubCharacter["role"][],
  ...Array(4).fill("community") as StubCharacter["role"][],
];

const YEAR_BANDS = [
  "year-1", "year-2", "year-3", "year-4", "year-5", "year-6",
] as const;
const STUDENT_ROOMS: RoomId[] = [
  "year1_room", "year2_room", "year3_room",
  "year4_room", "year5_room", "year6_room",
];
const ADULT_ROOMS: RoomId[] = [
  "staff_room", "library", "archive", "music_room", "art_studio",
  "hydroponics", "gardens", "kitchen", "comms_tower", "yarn_workshop",
  "nurses_office", "counsellors_office", "the_reach",
];
const CLUB_ROOMS: RoomId[] = [
  "library", "archive", "music_room", "gardens", "hydroponics",
  "comms_tower", "the_reach", "yarn_workshop", "counsellors_office",
];

const HUES = [
  "#0d9488", "#8b5cf6", "#f59e0b", "#ec4899", "#22d3ee",
  "#84cc16", "#fb923c", "#c084fc", "#34d399", "#f43f5e",
];

export const STUB_ROSTER: StubCharacter[] = (() => {
  const out: StubCharacter[] = [];
  for (let i = 0; i < 100; i++) {
    const role = ROLES[i];
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = FIRST_NAMES[(i * 7 + 3) % FIRST_NAMES.length];
    const name = `${first} ${last}`;
    let yearBand: StubCharacter["yearBand"] | undefined;
    let classroom: RoomId;
    if (role === "student") {
      const studentIdx = out.filter((c) => c.role === "student").length;
      yearBand = YEAR_BANDS[Math.floor(studentIdx / 10)];
      classroom = STUDENT_ROOMS[Math.floor(studentIdx / 10)];
    } else {
      classroom = ADULT_ROOMS[i % ADULT_ROOMS.length];
    }
    const clubRoom = CLUB_ROOMS[(i * 13 + 1) % CLUB_ROOMS.length];
    out.push({
      id: `stub_${i.toString().padStart(3, "0")}`,
      name,
      role,
      yearBand,
      classroom,
      clubRoom,
      hue: HUES[i % HUES.length],
    });
  }
  return out;
})();
