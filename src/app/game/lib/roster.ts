// Wire the real 100-character roster from lib/characters-generated.ts into
// the /game SchoolMap. The generated file lives under grammar/lib so the
// kindfuture corpus stays one source of truth shared by /grammar/explore
// and /game.

import {
  CHARACTERS,
  CLUBS,
  CLASSES,
  type CharacterProfile,
} from "@/app/grammar/lib/characters-generated";
import type { RoomId } from "./school";

export interface RosterCharacter {
  id: string;
  name: string;
  role: CharacterProfile["role"];
  yearBand?: string;
  classroom?: RoomId;
  clubRoom?: RoomId;
  hue: string;
  bio: string;
  pronouns: string;
  cegFamily: string;
  sharingPosture: CharacterProfile["sharing_posture"];
  goals: string[];
  clubName?: string;
  className?: string;
  surname?: string;
  storyCount: number;
}

// Map agent-generated location slugs to the canonical RoomId set.
const LOCATION_TO_ROOM: Record<string, RoomId> = {
  archive: "archive",
  library: "library",
  "hydroponics-bay": "hydroponics",
  hydroponics: "hydroponics",
  gardens: "gardens",
  "greenhouse-dome": "gardens",
  "orchard-terrace": "gardens",
  "music-room": "music_room",
  "theatre-cupola": "music_room",
  "comms-tower": "comms_tower",
  "observation-cupola": "the_reach",
  "the-reach": "the_reach",
  auditorium: "the_reach",
  "counsellor-office": "counsellors_office",
  "counsellors-office": "counsellors_office",
  "dining-hall-back-room": "yarn_workshop",
  "dining-hall": "dining_hall",
  kitchen: "kitchen",
  "yarn-workshop": "yarn_workshop",
  "sports-cupola": "art_studio",
  "print-room": "art_studio",
  "art-studio": "art_studio",
  "nurses-office": "nurses_office",
  "staff-room": "staff_room",
};

function yearBandToRoom(yearBand?: string): RoomId | undefined {
  switch (yearBand) {
    case "year-1": return "year1_room";
    case "year-2": return "year2_room";
    case "year-3": return "year3_room";
    case "year-4": return "year4_room";
    case "year-5": return "year5_room";
    case "year-6": return "year6_room";
    default: return undefined;
  }
}

function resolveClubRoom(clubId: string): RoomId | undefined {
  const club = CLUBS.find((c) => c.id === clubId);
  if (!club) return undefined;
  for (const slug of club.typical_locations) {
    const hit = LOCATION_TO_ROOM[slug];
    if (hit) return hit;
  }
  return undefined;
}

// Adult roles get a default classroom assignment per their primary class.
// Teachers go to the year-room they teach; staff and AI agents are mapped
// from their first club affiliation; visitors and community sit in the
// staff room when no club is set.
function adultClassroom(
  c: CharacterProfile,
  clubRoom: RoomId | undefined,
): RoomId {
  if (c.role === "teacher") {
    // Teachers don't have a yearBand, so pick the year-room of the
    // first student whose class they teach. Fallback: staff_room.
    const taughtClass = CLASSES.find((cls) => cls.teacher_id === c.id);
    if (taughtClass) {
      // Walk the roster to find any student in this class.
      const student = CHARACTERS.find((x) =>
        x.memberships.some(
          (m) => m.type === "class" && m.id === taughtClass.id,
        ) && x.role === "student",
      );
      const room = yearBandToRoom(student?.yearBand);
      if (room) return room;
    }
    return "staff_room";
  }
  if (c.role === "ai_agent") return clubRoom ?? "comms_tower";
  if (c.role === "staff") return clubRoom ?? "staff_room";
  if (c.role === "visitor") return clubRoom ?? "the_reach";
  if (c.role === "community") return clubRoom ?? "dining_hall";
  return "staff_room";
}

export const ROSTER: RosterCharacter[] = CHARACTERS.map((c) => {
  const classroomFromYear = yearBandToRoom(c.yearBand);
  const clubMembership = c.memberships.find((m) => m.type === "club");
  const clubRoom = clubMembership
    ? resolveClubRoom(clubMembership.id)
    : undefined;
  const classMembership = c.memberships.find((m) => m.type === "class");
  const clubName = clubMembership
    ? CLUBS.find((x) => x.id === clubMembership.id)?.name
    : undefined;
  const className = classMembership
    ? CLASSES.find((x) => x.id === classMembership.id)?.topic
    : undefined;

  return {
    id: c.id,
    name: c.name,
    role: c.role,
    yearBand: c.yearBand,
    classroom:
      classroomFromYear ?? adultClassroom(c, clubRoom),
    clubRoom: clubRoom ?? classroomFromYear,
    hue: c.hue,
    bio: c.bio,
    pronouns: c.pronouns,
    cegFamily: c.ceg_family,
    sharingPosture: c.sharing_posture,
    goals: c.default_goals,
    clubName,
    className,
    storyCount: c.storyHoldings.length,
  };
});
