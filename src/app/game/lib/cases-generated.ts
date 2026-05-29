// AUTO-GENERATED — 5 G-rated school mysteries with articles + witnesses.
//
// Cascadia Reach School, on the Hearthside space colony. Every kid is
// honest. Every adult is honest. Mysteries arise from MISUNDERSTANDING:
// people paid attention to different things, sources got hurried, kids of
// different ages mixed up names and times in good faith. Stakes are
// school-scale; nobody is in trouble. The TRUTH for every case carries a
// small systems insight, never a blame finger.

import type { RoomId } from "./school";

export interface CaseWitness {
  character_id: string;
  attestation: string;        // 25-50 words. What they sincerely say.
  domain_present: string;     // which AttentionDomain their goal was on
  drift_hint?: string;        // optional: what detail is honest but drifted
}

export interface CaseArticle {
  id: string;                 // e.g. "art-case-1-hotbunk-headline"
  source_id: string;          // a publication id
  byline?: string;            // optional reporter or "Staff"
  headline: string;
  body: string;               // 50-90 words, brisk
  drift_notes: string;        // 1-line, what specifically the article got wrong
}

export interface CaseSlot {
  id: "who" | "where" | "how";
  label: string;
  hint: string;
}

export interface CaseFile {
  id: string;
  status_chip: string;
  codename: string;
  subtitle: string;
  client_id: string;
  client_year: string;
  client_quote: string;
  framing_short: string;
  slots: CaseSlot[];
  opening_clue: {
    source_id: string;
    source_label: string;
    line: string;
    contradiction_hint: string;
  };
  hot_rooms: RoomId[];
  truth: {
    who_carried: string;
    where_it_happened: RoomId;
    what_got_mixed_up: string;
    /** The one failure-mode from the 8 how_options that names the case. */
    how_correct: string;
    explainer: string;
  };
  suspects: string[];
  how_options: string[];
  where_options: RoomId[];
  witnesses: CaseWitness[];
  articles: CaseArticle[];
}

// ─── Shared deck: 8 epistemic failure modes ────────────────────────────
// Same list for every case. Players learn to spot which one happened.

const HOW_OPTIONS: string[] = [
  "An honest mistake",
  "A delayed message",
  "A wrong calibration",
  "A withheld correction",
  "A misread attestation",
  "An out-of-date book",
  "A vouches chain that drifted",
  "A rumour that hardened into fact",
];

// ─── Shared slot labels (every case uses the same three) ───────────────

const SLOTS: CaseSlot[] = [
  { id: "who",   label: "WHO WAS CARRYING",  hint: "tap a face to file" },
  { id: "where", label: "WHERE IT HAPPENED", hint: "tap a room to file" },
  { id: "how",   label: "WHAT GOT MIXED UP", hint: "tap a source to file" },
];

// ─── The five cases ────────────────────────────────────────────────────

export const CASES: CaseFile[] = [
  // ============================================================
  // CASE 001 — THE BITTER-MELON MIX-UP
  // ============================================================
  {
    id: "case-001-bitter-melon",
    status_chip: "TUE · 14:23 · HEARTHSIDE",
    codename: "CASE 001",
    subtitle: "THE BITTER-MELON MIX-UP",
    client_id: "student-y1-mateo-cordeiro",
    client_year: "Year 1, Junior Hydroponics Co-op",
    client_quote:
      "Two papers say my tray was bitter-melon and two papers say it was sweet-pea. They printed both before lunch. Nobody is lying, but everybody is wrong about something. Can you help me figure out what?",
    framing_short:
      "Eleven kids and three teachers were in or near the gardens at 14:00. The bitter-melon tray and the sweet-pea tray sit on the same rack, one shelf apart. The labels are little wooden tags. They got swapped sometime after morning watering.",
    slots: SLOTS,
    opening_clue: {
      source_id: "pub-hotbunk-daily",
      source_label: "HOT-BUNK DAILY · 14:08",
      line: "Bitter-melon seedlings drowned in sweet-pea solution near Hydroponics this afternoon, per a year-1 source.",
      contradiction_hint:
        "INTER-CUPOLA EDITION at 14:12 says the sweet-pea trays got bitter-melon nutrient. Same hour, opposite story.",
    },
    hot_rooms: ["hydroponics", "gardens", "year1_room", "music_room", "comms_tower"],
    truth: {
      who_carried: "student-y1-amaru-quispe",
      where_it_happened: "hydroponics",
      what_got_mixed_up: "the little wooden tray-tags",
      how_correct: "An honest mistake",
      explainer:
        "Amaru tidied the rack at 13:50 and stood the two wooden tags back up after wiping the shelf. He put them back in the order he read them, left to right. The trays had been moved that morning for a leak check. Live tray markers would fix this; the tags need to live ON the tray, not on the shelf.",
    },
    suspects: [
      "student-y1-mateo-cordeiro",
      "student-y1-amaru-quispe",
      "student-y1-saoirse-flynn",
      "student-y2-ekene-nwosu",
      "student-y3-amara-eze",
      "student-y4-rasul-kerimov",
      "teacher-davies-hydroponics",
      "staff-gardens-steward-wilson",
    ],
    how_options: HOW_OPTIONS,
    where_options: ["hydroponics", "gardens", "year1_room", "kitchen", "dining_hall", "comms_tower"],
    witnesses: [
      {
        character_id: "student-y1-mateo-cordeiro",
        attestation:
          "I watered the bitter-melon tray at 13:40 using the green can. The can said sweet-pea when I looked again at 14:00. I did not change cans. The tag on the rack also moved.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "student-y1-amaru-quispe",
        attestation:
          "I wiped the shelf at 13:50 because a bee had landed in the spill. I stood the two tags back up afterwards. I read them left to right and put them back left to right. I thought I was being careful.",
        domain_present: "smells-and-tastes",
        drift_hint: "Did not check whether the trays had been moved earlier.",
      },
      {
        character_id: "student-y2-ekene-nwosu",
        attestation:
          "The orchard hive had two workers in the deck around 13:30. They were on the sweet-pea flowers, not the bitter-melon. Bees do not lie about which thing is blooming.",
        domain_present: "smells-and-tastes",
      },
      {
        character_id: "student-y3-amara-eze",
        attestation:
          "Auntie keeps the seed library and she taught me bitter-melon leaves have a pale underside. The tray on the lower shelf had pale undersides at lunchtime. The wooden tag in front of it said sweet-pea.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "student-y4-rasul-kerimov",
        attestation:
          "Ms. Davies asked me at 13:15 to move both trays a hand-span to the left so she could check a slow drip. I moved them and went back to class. I did not move the tags. The tags stayed where they were on the shelf.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "teacher-davies-hydroponics",
        attestation:
          "I noticed a slow drip at 13:10 and asked Rasul to shift the trays so I could see under them. I did not write it in the log because I meant to come back and the bell rang. I should have written it.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "staff-gardens-steward-wilson",
        attestation:
          "I came through at 13:55 and the bitter-melon tray smelled of sweet-pea nutrient. I assumed someone would catch it in the next round. I did not put a sticker on it. That was my piece to drop.",
        domain_present: "smells-and-tastes",
      },
      {
        character_id: "student-y1-saoirse-flynn",
        attestation:
          "Mateo looked upset before lunch. He kept smelling the green can and frowning. I told him to ask Ms. Davies but he wanted to be sure first. He is the careful kind of year-1.",
        domain_present: "people-feelings",
      },
      {
        character_id: "kelp-gardens-coordinator",
        attestation:
          "My sensor on shelf two registered the sweet-pea conductivity reading on the bitter-melon tray at 13:42. I logged it. I did not raise an alert because the variance was inside tolerance for the first hour after watering.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "student-y2-anika-vance",
        attestation:
          "I was in Hydroponics writing up a leak check report for engineering. I did not look at the trays. I saw Rasul move things and I saw Amaru tidy. Both looked normal.",
        domain_present: "technical-readings",
      },
      {
        character_id: "aurora-school-companion",
        attestation:
          "The dining-hall logbook noted bitter-melon seedlings at the salad bar tasting at lunch. The cook said they tasted faintly sweet. Mateo was the only year-1 who flagged it before the second paper printed.",
        domain_present: "spoken-words",
      },
      {
        character_id: "student-y5-arjun-bhattacharya",
        attestation:
          "Bee-Tending Co-op moved a hive frame this morning, nothing else. We did not enter the Hydroponics deck before lunch. I saw Mateo at the door at 14:05 looking at his watering can.",
        domain_present: "weather-and-light",
      },
    ],
    articles: [
      {
        id: "art-c1-hotbunk",
        source_id: "pub-hotbunk-daily",
        byline: "Staff",
        headline: "BITTER-MELON SEEDLINGS DROWNED IN SWEET-PEA",
        body:
          "A year-1 source says the bitter-melon tray got the sweet-pea solution this lunchtime. Cook reports an oddly sweet salad. The Hydroponics teacher would not comment on the spill before this paper printed; the kid says nobody is in trouble, the kid just wants his trays back. We expect a correction by morning.",
        drift_notes: "Reversed which tray got which solution; called Mateo 'a source' instead of naming him.",
      },
      {
        id: "art-c1-intercupola",
        source_id: "pub-intercupola",
        byline: "Office of the Dean",
        headline: "NUTRIENT NOTE: SWEET-PEA TRAY RE-DOSED",
        body:
          "Per Ms. Davies's afternoon end-of-class summary, the sweet-pea tray was incorrectly dosed with bitter-melon nutrient solution during the lunch break. The tray has been flushed and is on watch. No action is required of students. The Hydroponics log will reflect the standard re-dose protocol by end of day.",
        drift_notes: "Trusted the verbal summary; trays were actually swapped at the tag, not re-dosed by anyone.",
      },
      {
        id: "art-c1-bees",
        source_id: "pub-bee-bulletin",
        byline: "Ms. Fields",
        headline: "BEE PRESENCE ON HYDROPONICS DECK NORMAL FOR THE HOUR",
        body:
          "Two foragers were seen on the deck at 13:30. Both were on sweet-pea blossoms; bitter-melon had not yet opened today. This is the second consecutive Tuesday for that pattern. Beekeepers will note: if a tray that ought to be bitter-melon shows bee activity at this hour, the tag may be wrong.",
        drift_notes: "Bulletin is accurate on bees; players have to notice the bee observation indirectly proves the tag was wrong.",
      },
      {
        id: "art-c1-hydro-news",
        source_id: "news-club-hydro-junior",
        headline: "TAG-CHECK PROTOCOL: A NOTE FROM THE CO-OP",
        body:
          "After today's confusion the Junior Hydroponics Co-op will add a same-tray-tag policy: every wooden tag rides ON its tray, not the shelf in front of it. Trays move; shelves stay. The co-op thanks Mateo Cordeiro for spotting the smell first. We will print a new batch of tag clips at the workshop on Friday.",
        drift_notes: "Quietly correct on the systems insight; slightly under-credits Amaru's tidying as part of the chain.",
      },
      {
        id: "art-c1-park-class",
        source_id: "ann-class-park-life-sciences",
        headline: "LIFE-SCIENCES NOTE ON LEAF UNDERSIDES",
        body:
          "Today's lesson on plant identification by leaf underside applied directly: a bitter-melon leaf's pale underside is the simplest way to tell the tray apart from sweet-pea, which has a darker, more uniform underside. Year-3 students used this in the gardens this afternoon. Excellent observational work from Amara Eze.",
        drift_notes: "Accurate; players can use this to weight Amara's testimony.",
      },
    ],
  },

  // ============================================================
  // CASE 002 — THE DRILL THAT NOBODY LOST
  // ============================================================
  {
    id: "case-002-drill-nobody-lost",
    status_chip: "MON · 09:14 · HEARTHSIDE",
    codename: "CASE 002",
    subtitle: "THE DRILL THAT NOBODY LOST",
    client_id: "student-y6-pablo-ortega",
    client_year: "Year 6, Comms Relay Apprentices",
    client_quote:
      "The Reach Times says we lost the comms-tower drill last Friday. The club knows we did not. The drill was on a Friday morning. Or was it? The schedule list in our binder is from last term.",
    framing_short:
      "The annual comms drill is run twice a year. The tower kids are sure they passed it. The Reach Times printed that they failed. The drill report nobody can confirm exists. The binder schedule is one term out of date.",
    slots: SLOTS,
    opening_clue: {
      source_id: "pub-reach-times",
      source_label: "REACH TIMES · 07:55 MON",
      line: "Comms Relay Apprentices did not pass Friday's tower drill, per the school's drill report.",
      contradiction_hint:
        "The COMMS RELAY APPRENTICES NEWSLETTER on Saturday morning published their pass-result line by line. Both can't be right unless they're talking about two different days.",
    },
    hot_rooms: ["comms_tower", "the_reach", "staff_room", "year6_room", "library"],
    truth: {
      who_carried: "staff-comms-relay-doyle",
      where_it_happened: "comms_tower",
      what_got_mixed_up: "the THURSDAY drill and the FRIDAY make-up",
      how_correct: "A misread attestation",
      explainer:
        "There were two drills. The full club passed on Thursday. A small make-up was run on Friday for two kids who had been at the clinic. The Times reporter read the make-up summary, did not see the Thursday pass, and printed it as the result. The school needs the drill report to double-print: one line for the main drill, one line for any make-up.",
    },
    suspects: [
      "student-y6-pablo-ortega",
      "student-y6-anya-volkonskaya",
      "student-y4-thomas-okeefe",
      "student-y5-tariq-malouf",
      "student-y5-jonas-engel",
      "teacher-singh-engineering",
      "staff-comms-relay-doyle",
      "community-ham-radio-vetter",
    ],
    how_options: HOW_OPTIONS,
    where_options: ["comms_tower", "the_reach", "staff_room", "year6_room", "library", "archive"],
    witnesses: [
      {
        character_id: "student-y6-pablo-ortega",
        attestation:
          "We ran the full drill Thursday at 09:00. Everyone was present except Thomas and Tariq, both at the clinic. We passed it. We hung the pass-sheet in the tower at 09:55. I signed it.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "student-y4-thomas-okeefe",
        attestation:
          "I was at the clinic Thursday morning. I came back Friday and did the make-up with Tariq at 09:00. Mr. Doyle ran us through the short version. We passed. He wrote it on a fresh sheet because the long one was already up.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "student-y5-tariq-malouf",
        attestation:
          "The Friday make-up was on the small console. Mr. Doyle wrote our names at the top. The sheet was thinner than the Thursday one. I did not see the Thursday sheet at the time.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "staff-comms-relay-doyle",
        attestation:
          "Thursday drill: full pass, fifteen kids. Friday make-up: Thomas and Tariq, also pass. I filed both reports the same way I always do. I did not write 'make-up' big enough on the second sheet. I see that now.",
        domain_present: "systems-and-flows",
        drift_hint: "Underweighted how easy the second sheet was to misread alone.",
      },
      {
        character_id: "student-y6-anya-volkonskaya",
        attestation:
          "I was on the Thursday drill. We passed in fifty-five minutes. I remember the time because I had a Forum meeting at ten and I had to run.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "student-y5-jonas-engel",
        attestation:
          "The Reach Times reporter came by Friday at lunch. She talked to Mr. Doyle for about three minutes. She asked for the most recent report and he handed her the Friday sheet because it was on top.",
        domain_present: "social-tensions",
      },
      {
        character_id: "teacher-singh-engineering",
        attestation:
          "The engineering binder still has last term's drill schedule. We never reprint at term-roll. I checked Friday afternoon when Pablo flagged the article and yes, our copy is the old one.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "community-ham-radio-vetter",
        attestation:
          "I listen to the tower drills on my home set. Thursday morning the kids ran the long pattern and finished clean. Friday I heard the short pattern around 09:00. Two kids. They cleared it.",
        domain_present: "technical-readings",
      },
      {
        character_id: "aurora-school-companion",
        attestation:
          "The school's master schedule shows both events: Thursday at 09:00 and Friday at 09:00. The Times pulled from the Inter-Cupola summary which only listed one slot. The summary collapses both days into a single line on the public copy.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "student-y4-naledi-mokoena",
        attestation:
          "I am not in comms but I share Mr. Doyle's office for gardens paperwork. The Thursday sheet was tacked up at the top of his board. The Friday sheet was on top of his desk. He had both.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "tally-assignments-tracker",
        attestation:
          "Drill records arrived in my queue at 10:18 Thursday and at 09:47 Friday. Both marked pass. The Reach Times request log shows only the Friday record was viewed before publication.",
        domain_present: "systems-and-flows",
      },
    ],
    articles: [
      {
        id: "art-c2-times",
        source_id: "pub-reach-times",
        byline: "Staff Reporter",
        headline: "COMMS RELAY APPRENTICES DO NOT PASS FRIDAY DRILL",
        body:
          "The school's most recent drill report indicates the Comms Relay Apprentices did not complete a full tower drill on Friday morning. Only two students were marked present. The report does not indicate a failure of conduct, only a partial completion. The Times will print clarifications as the school provides them; the apprentices' newsletter has already disputed our framing.",
        drift_notes: "Read the make-up sheet as the full drill; did not see Thursday's report.",
      },
      {
        id: "art-c2-comms-news",
        source_id: "news-club-comms-senior",
        headline: "WE PASSED THURSDAY. WE ALSO PASSED FRIDAY.",
        body:
          "The Comms Relay Apprentices ran the full drill on Thursday at 09:00 and passed. Two members had a clinic conflict; their make-up was Friday at 09:00 and they also passed. Two reports exist. Mr. Doyle filed both. Anyone with the binder can confirm. We are not in trouble. We just want the record straight.",
        drift_notes: "Accurate; mildly defensive in tone.",
      },
      {
        id: "art-c2-intercupola",
        source_id: "pub-intercupola",
        headline: "WEEKLY DRILL ROUNDUP",
        body:
          "Comms Relay tower drill: completed week of the equinox. All apprentices participated across the scheduled window. Result on file with the engineering office. Next drill window opens with the spring term.",
        drift_notes: "Collapsed Thursday and Friday into a single 'window'; ambiguity is what fooled the Times.",
      },
      {
        id: "art-c2-singh-class",
        source_id: "ann-class-singh-engineering",
        headline: "BINDER SCHEDULE: REPRINTING THIS WEEK",
        body:
          "The engineering binder schedule pages are one term out of date. We will reprint Wednesday after lunch. Until then, please check the master schedule on the wall by Mr. Doyle's office for current drill times. Apologies for the confusion in any club using this binder for cross-reference.",
        drift_notes: "Accurate confession; players can use this to anchor the systems insight.",
      },
      {
        id: "art-c2-encyc",
        source_id: "pub-encyclopedia",
        headline: "DRILL REPORTING PROCEDURE (ENTRY UNLOCKED)",
        body:
          "Drill reports at Cascadia Reach are filed by the running adult on the day. If a make-up drill follows the main drill within the same week, BOTH reports must be filed and labelled at the top: MAIN or MAKE-UP. The summary system collapses adjacent same-week drills into one display line, which is appropriate for parents but not for press.",
        drift_notes: "Accurate procedural reference; clarifies why the summary was misleading.",
      },
    ],
  },

  // ============================================================
  // CASE 003 — THE OUT-OF-DATE SONGBOOK
  // ============================================================
  {
    id: "case-003-out-of-date-songbook",
    status_chip: "WED · 16:02 · HEARTHSIDE",
    codename: "CASE 003",
    subtitle: "THE OUT-OF-DATE SONGBOOK",
    client_id: "student-y3-marta-kowalski",
    client_year: "Year 3, Moon-Song Ensemble",
    client_quote:
      "I brought back a moon-song chapbook from the class trip and the Ensemble newsletter says the lyrics are wrong. Keoni's grandfather sings it exactly the way the chapbook prints it. The encyclopedia says both versions exist. So which is wrong?",
    framing_short:
      "A year-3 brought back a chapbook of moon-songs from the lower-terrace class trip. The Moon-Song Ensemble newsletter called the lyrics out of date. An elder says they are correct. The encyclopedia entry shows two versions. Nobody is wrong; the song has two correct forms.",
    slots: SLOTS,
    opening_clue: {
      source_id: "pub-moonsong",
      source_label: "MOONSONG · 07:30 WED",
      line: "The lyrics in the new lower-terrace chapbook are out of date and should not be taught.",
      contradiction_hint:
        "Mr. Rhys, an elder musician at Long-Crossing Weekly, sings them as printed and says they are the correct old form. The encyclopedia entry lists both.",
    },
    hot_rooms: ["music_room", "library", "year3_room", "archive", "the_reach"],
    truth: {
      who_carried: "student-y3-marta-kowalski",
      where_it_happened: "library",
      what_got_mixed_up: "the older 'long-crossing' verse and the newer 'arrival' verse",
      how_correct: "An out-of-date book",
      explainer:
        "The song has two verses both currently sung. The lower-terrace chapbook prints the older 'long-crossing' verse, which Keoni's grandfather and many elders sing. The Ensemble teaches the newer 'arrival' verse the school adopted four years ago. Both are correct in their own community. Songbooks need a version tag: which verse, which year, which singer learned it from.",
    },
    suspects: [
      "student-y3-marta-kowalski",
      "student-y1-keoni-makaiau",
      "student-y1-aanya-rao",
      "student-y5-iolanda-marin",
      "student-y6-sun-hye-yoon",
      "teacher-akinyemi-music",
      "elder-musician-rhys",
      "staff-librarian-ferreira",
    ],
    how_options: HOW_OPTIONS,
    where_options: ["music_room", "library", "year3_room", "archive", "the_reach", "art_studio", "dining_hall"],
    witnesses: [
      {
        character_id: "student-y3-marta-kowalski",
        attestation:
          "On the class trip the lower-terrace teacher gave me the chapbook. She said it was the version her grandmother sang. The print is faded and the spine is older than I am. I copied two lines into my notebook.",
        domain_present: "sounds-and-songs",
      },
      {
        character_id: "student-y1-keoni-makaiau",
        attestation:
          "Grandfather sang me this song over the voice letter from Earth. He sings it the way the chapbook prints it. He is very careful about the second verse. He calls it the long-crossing verse.",
        domain_present: "sounds-and-songs",
      },
      {
        character_id: "student-y1-aanya-rao",
        attestation:
          "My grandmother kept the long-crossing songbook. There are two verses we sing at the family table. The one in the chapbook is the older one. The Ensemble at school taught us the newer one this term.",
        domain_present: "sounds-and-songs",
      },
      {
        character_id: "elder-musician-rhys",
        attestation:
          "Both verses are alive. I sing the long-crossing verse because that is what I learned at sixteen. The school adopted the arrival verse four years ago. The chapbook prints the long-crossing verse. It is not out of date; it is the other one.",
        domain_present: "sounds-and-songs",
      },
      {
        character_id: "teacher-akinyemi-music",
        attestation:
          "The Ensemble teaches the arrival verse because the school chose it for the equinox concert. I would not call the long-crossing verse out of date. The newsletter ran ahead of me; I will write a clarifying note this week.",
        domain_present: "people-feelings",
        drift_hint: "Did not catch the newsletter draft before it printed.",
      },
      {
        character_id: "staff-librarian-ferreira",
        attestation:
          "The library has three chapbook copies of this song. The two older ones print the long-crossing verse; the one we bought last year prints both, with a small note about when the arrival verse came in. The new chapbook from the trip matches our older copies.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "student-y5-iolanda-marin",
        attestation:
          "Grandmother kept the tide-clock and the seed-library notebook, and she taught both verses. She said one was for crossing and one was for landing. She did not say either was wrong.",
        domain_present: "sounds-and-songs",
      },
      {
        character_id: "student-y6-sun-hye-yoon",
        attestation:
          "Encyclopedia Maintainers locked this entry last year. Two verses, both listed. The entry note says: do not call either out of date. The Moonsong paper either did not check the entry or read the older draft.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "quill-writing-tutor",
        attestation:
          "I helped Marta transcribe two lines on Tuesday. The phrasing is older. The cadence matches Mr. Rhys's recording in the archive, not the Ensemble's current arrangement. Both are valid; the cadence is the giveaway.",
        domain_present: "spoken-words",
      },
      {
        character_id: "student-y3-bilal-rahman",
        attestation:
          "Grandma sang the chapbook version when she cooked. She would say 'this is the old one' but not in a sad way. Like saying 'this is the old kettle.' Both kettles work.",
        domain_present: "people-feelings",
      },
      {
        character_id: "teacher-okeke-history",
        attestation:
          "The class trip chapbook came from the lower-terrace school's archive shelf. Their librarian dates it to about thirty years before the colony. It is a real artefact and a working songbook for that community.",
        domain_present: "spoken-words",
      },
    ],
    articles: [
      {
        id: "art-c3-moonsong",
        source_id: "pub-moonsong",
        byline: "Editorial Desk",
        headline: "NOTE ON THE NEW LOWER-TERRACE CHAPBOOK",
        body:
          "A chapbook brought back from the lower-terrace school prints lyrics our Ensemble has not used since before the colony. We recommend the school not teach from it. Singers will know the difference; younger years may not. The Moonsong calendar for the equinox concert remains the Ensemble arrangement.",
        drift_notes: "Conflated 'not currently taught' with 'out of date'; missed that both verses are live.",
      },
      {
        id: "art-c3-longcrossing",
        source_id: "pub-long-crossing",
        byline: "Mr. Gareth Rhys",
        headline: "THE LONG-CROSSING VERSE IS NOT OUT OF DATE",
        body:
          "I have sung this verse since I was sixteen. The chapbook prints it correctly. The arrival verse the school teaches now came in four years ago and is a fine verse. Both are sung at different tables for different reasons. The papers should not pick one for us.",
        drift_notes: "Mostly accurate; slightly partisan tone for the long-crossing community.",
      },
      {
        id: "art-c3-encyc",
        source_id: "pub-encyclopedia",
        headline: "MOON-SONG, ANCHOR-VERSE (ENTRY LOCKED)",
        body:
          "This entry is locked. Two verses are documented and current: the LONG-CROSSING verse, taught by elders from the migration generation; and the ARRIVAL verse, adopted by the school Ensemble four years ago for the equinox concert. Both are correct. Cataloguers must tag chapbooks with verse, year, and source community.",
        drift_notes: "Accurate; the locked entry is the strongest source in the case.",
      },
      {
        id: "art-c3-akinyemi-class",
        source_id: "ann-class-akinyemi-music",
        headline: "CLARIFICATION COMING ON THE LOWER-TERRACE CHAPBOOK",
        body:
          "I will post a clarification later this week on the lower-terrace chapbook Marta brought back. The Moonsong newsletter wrote ahead of the Ensemble's position. The chapbook prints the long-crossing verse, which is a real verse, sung by real people, and welcome in this music room.",
        drift_notes: "Accurate; written late and addresses the social drift more than the lyrics.",
      },
      {
        id: "art-c3-archive-news",
        source_id: "news-club-archive-junior",
        headline: "VERSION TAGS FOR THE SONGBOOK SHELF",
        body:
          "After the chapbook confusion the Junior Archive Helpers will add a small version tag to every songbook on the shelf: verse, year, source community. Three songbooks were ambiguous last week and we want zero. Mr. Ferreira approved the design at lunch. Tagging starts Friday.",
        drift_notes: "Accurate; lands the systems insight cleanly.",
      },
    ],
  },

  // ============================================================
  // CASE 004 — THE WRONG-DOOR LETTER
  // ============================================================
  {
    id: "case-004-wrong-door-letter",
    status_chip: "THU · 10:48 · HEARTHSIDE",
    codename: "CASE 004",
    subtitle: "THE WRONG-DOOR LETTER",
    client_id: "student-y5-rena-akamatsu",
    client_year: "Year 5, Encyclopedia Maintainers",
    client_quote:
      "An exchange letter from the lower-terrace school was addressed to 'Mx. Akamatsu' and someone gave it to Mr. Akinyemi the music teacher. Then the Inter-Cupola printed it as if it was an announcement for everyone. Both surnames begin with Ak. Nobody is in trouble; I just want to know whose letter it actually was.",
    framing_short:
      "An exchange letter from the Lower Terrace school arrived addressed to Mx. Akamatsu (Rena's family, who runs the printer cluster) and was handed to Mr. Akinyemi (the music teacher). It is friendly. The Inter-Cupola Edition printed the letter publicly thinking it was a community announcement. Nobody is upset. The handoff just dropped one syllable.",
    slots: SLOTS,
    opening_clue: {
      source_id: "pub-intercupola",
      source_label: "INTER-CUPOLA · 09:55 THU",
      line: "Lower Terrace sends warm greetings to Mx. Akinyemi and the music room for the visiting choir this spring.",
      contradiction_hint:
        "But the LOWER TERRACE BOND from yesterday says they wrote to 'the Akamatsu printer cluster' about an exchange of letterpress trays. Same letter, two recipients.",
    },
    hot_rooms: ["staff_room", "music_room", "year5_room", "library", "art_studio"],
    truth: {
      who_carried: "staff-attestation-clerk-aoki",
      where_it_happened: "staff_room",
      what_got_mixed_up: "the surname 'Akamatsu' read as 'Akinyemi' on a hand-written envelope",
      how_correct: "A misread attestation",
      explainer:
        "The mail came in hand-written. The clerk read the surname as Akinyemi because Mr. Akinyemi is the only Ak- surname most staff see daily. Mr. Akinyemi opened it kindly, realised the printer-tray request was not for him, and walked it to the Akamatsu family the same afternoon. The Inter-Cupola assumed the music room was hosting a choir. The school needs a same-day name-check column at the mail desk.",
    },
    suspects: [
      "student-y5-rena-akamatsu",
      "teacher-akinyemi-music",
      "staff-attestation-clerk-aoki",
      "staff-librarian-ferreira",
      "staff-custodian-thunderchild",
      "student-y6-sun-hye-yoon",
      "student-y4-thomas-okeefe",
      "elder-archivist-cheung",
    ],
    how_options: HOW_OPTIONS,
    where_options: ["staff_room", "music_room", "year5_room", "library", "art_studio", "year1_room", "comms_tower"],
    witnesses: [
      {
        character_id: "staff-attestation-clerk-aoki",
        attestation:
          "The envelope was hand-written. I read the surname as Akinyemi because I file his post every week and the Ak- shape is familiar. I should have checked the second syllable. I am the piece that dropped it.",
        domain_present: "objects-and-textures",
        drift_hint: "Pattern-matched on a familiar surname.",
      },
      {
        character_id: "teacher-akinyemi-music",
        attestation:
          "I opened the letter at lunch. It mentioned letterpress trays and a printer cluster. I do not have either. I walked the letter to the year-5 room and asked Rena if her family ran the printer cluster. She said yes.",
        domain_present: "people-feelings",
      },
      {
        character_id: "student-y5-rena-akamatsu",
        attestation:
          "Mum runs the printer cluster. The lower-terrace school wanted to swap two trays of wooden type. The letter was hers, not the music room's. Mr. Akinyemi was very kind about it.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "staff-librarian-ferreira",
        attestation:
          "The library mail tray is next to the music room mail tray. The two trays look identical. Someone has labelled them in the same handwriting; from a step away the labels read the same colour.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "staff-custodian-thunderchild",
        attestation:
          "I clean the staff room mail trays every morning. The Inter-Cupola reporter took a photo of the music room tray on Wednesday afternoon. She did not ask whose post was in it.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "student-y6-sun-hye-yoon",
        attestation:
          "I helped sort post on Tuesday with Mx. Aoki. We split letters by club newsletter and personal post. The lower-terrace envelope went into the personal post stack. I did not read the surname carefully.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "elder-archivist-cheung",
        attestation:
          "The lower-terrace clerk who wrote the envelope has a careful hand but joins the m and n in 'Akamatsu' close together. I have seen this surname misread as Akinyemi twice this year. We told the lower-terrace school last spring; they have not had time to retrain the clerk.",
        domain_present: "spoken-words",
      },
      {
        character_id: "aurora-school-companion",
        attestation:
          "The Inter-Cupola wrote the announcement at 09:30 Thursday. The reporter saw the letter on the music room mail tray and assumed context. I did not flag the assumption because nobody asked me to check.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "student-y4-thomas-okeefe",
        attestation:
          "I was in the staff room dropping off a Comms form when Mr. Akinyemi opened the letter. He smiled, said 'oh, this is for the Akamatsus,' and put his coat on to walk it over. He took the long way to drop the letter and his coffee mug back.",
        domain_present: "body-language",
      },
      {
        character_id: "tally-assignments-tracker",
        attestation:
          "The mail desk does not run a name-check column. Items are filed by the clerk's read of the envelope, full stop. A weekly cross-check against the staff and student list would have caught this surname in under an hour.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "student-y2-rivka-feldman",
        attestation:
          "The zine print room is next to the printer cluster. Mum runs the colony zine press; I know the cluster well. Rena's mum had been waiting on a letter about wooden type trays for two weeks. She was relieved when it came.",
        domain_present: "smells-and-tastes",
      },
    ],
    articles: [
      {
        id: "art-c4-intercupola",
        source_id: "pub-intercupola",
        headline: "LOWER TERRACE GREETS MX. AKINYEMI AND THE MUSIC ROOM",
        body:
          "An exchange letter from the lower-terrace school greets Mx. Akinyemi and the music room for the visiting choir this spring. The school looks forward to hosting and sends regards through the Inter-Cupola Edition for community awareness. Music room visitors will be welcomed at the front entrance on the day.",
        drift_notes: "Misidentified the recipient by reading the music room mail tray as context.",
      },
      {
        id: "art-c4-lowerterrace",
        source_id: "pub-lower-terrace",
        headline: "AKAMATSU PRINTER CLUSTER TO HOST TRAY EXCHANGE",
        body:
          "The lower-terrace school has written to the Akamatsu printer cluster at Cascadia Reach asking to exchange two trays of wooden letterpress type. The cluster is run by Mx. Akamatsu, whose work is well known on the lower terrace. The trays will be hand-walked, not posted, when the time is right.",
        drift_notes: "Names the correct recipient family. This source is essential.",
      },
      {
        id: "art-c4-akinyemi-class",
        source_id: "ann-class-akinyemi-music",
        headline: "NOT A CHOIR-EXCHANGE LETTER (BRIEF NOTE)",
        body:
          "Just a brief note: a letter the Inter-Cupola printed as a greeting to the music room was actually for the Akamatsu printer cluster about letterpress trays. I walked it over Thursday afternoon. The Inter-Cupola will run a correction. The music room is, however, always happy to receive a real visiting choir.",
        drift_notes: "Accurate; gentle.",
      },
      {
        id: "art-c4-hotbunk",
        source_id: "pub-hotbunk-daily",
        byline: "Staff",
        headline: "OUR FAVOURITE MAIL MIX-UP OF THE TERM",
        body:
          "Picture it: a hand-written envelope, an Ak- surname, a kind music teacher opening a letter about letterpress trays. The Inter-Cupola printed it as a choir announcement and the whole staff room had a quiet laugh. The Akamatsus got their letter by mid-afternoon. The mail clerk is starting a name-check column. We will miss the original.",
        drift_notes: "Accurate gossip; colourful but does not name-shame.",
      },
      {
        id: "art-c4-zine",
        source_id: "news-club-zine",
        headline: "PRINT TRAY EXCHANGE: WHAT IT MEANS",
        body:
          "The Zine Collective knows two trays of wooden letterpress type would meaningfully upgrade the lower-terrace school's print runs. The Akamatsu cluster has spare capacity. Everyone is glad the letter got there. The Collective will help carry the trays on the day, regardless of which surname the envelope ends up reading.",
        drift_notes: "Accurate; small editorial joke at the end.",
      },
    ],
  },

  // ============================================================
  // CASE 005 — THE BEE CENSUS CONFUSION
  // ============================================================
  {
    id: "case-005-bee-census-confusion",
    status_chip: "FRI · 11:30 · HEARTHSIDE",
    codename: "CASE 005",
    subtitle: "THE BEE CENSUS CONFUSION",
    client_id: "student-y1-amaru-quispe",
    client_year: "Year 1, Bee-Tending Co-op",
    client_quote:
      "The Bee-Tender Bulletin says the orchard has 14 hives. The Junior Hydroponics log says 12. The Equinox planners need a number next week for the Honey Tally. I counted 13 last weekend. Which number is real?",
    framing_short:
      "Three sources disagree on the orchard hive count: Bee-Tender Bulletin (14), Junior Hydroponics log (12), Amaru's weekend count (13). The Equinox Ceremony Planners need a number for the Honey Tally. Two hives were temporarily moved to the side terrace for repair the same week each source counted.",
    slots: SLOTS,
    opening_clue: {
      source_id: "pub-bee-bulletin",
      source_label: "BEE BULLETIN · 06:00 FRI",
      line: "Orchard hive count: 14 (steady from spring).",
      contradiction_hint:
        "But the Junior Hydroponics Co-op log says 12. Amaru counted 13. Three honest counts, three different days.",
    },
    hot_rooms: ["gardens", "hydroponics", "year1_room", "library", "the_reach"],
    truth: {
      who_carried: "community-beekeeper-fields",
      where_it_happened: "gardens",
      what_got_mixed_up: "two hives moved to the side terrace for varroa-check this week",
      how_correct: "A wrong calibration",
      explainer:
        "There are 14 hives in the orchard system this season. Two were moved to the side terrace for a varroa-check on Monday. The Bulletin counted at the registry (14). Junior Hydroponics counted at the orchard on Tuesday and saw 12. Amaru counted at the weekend mid-move and saw 13 (one had just come back). All three counts are honest. The Equinox Honey Tally needs a single census day with a 'moved-out' column on the log.",
    },
    suspects: [
      "student-y1-amaru-quispe",
      "student-y2-ekene-nwosu",
      "student-y4-rasul-kerimov",
      "student-y5-arjun-bhattacharya",
      "student-y3-amara-eze",
      "community-beekeeper-fields",
      "teacher-haakonsen-civics",
      "staff-gardens-steward-wilson",
    ],
    how_options: HOW_OPTIONS,
    where_options: ["gardens", "hydroponics", "year1_room", "library", "the_reach", "archive", "art_studio"],
    witnesses: [
      {
        character_id: "student-y1-amaru-quispe",
        attestation:
          "I counted on Saturday afternoon with my notebook. I walked the whole row twice and got 13 both times. I did not see any hives on the side terrace. I did see one being carried back by Ms. Fields.",
        domain_present: "smells-and-tastes",
      },
      {
        character_id: "community-beekeeper-fields",
        attestation:
          "Total hives in the orchard system this season: 14. I moved 2 to the side terrace Monday for varroa-check. One came back Saturday around midday. The other comes back tomorrow. The Bulletin number is right at the registry; the orchard number is right at the orchard.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "student-y2-ekene-nwosu",
        attestation:
          "Junior Hydroponics counted Tuesday morning at the orchard. We got 12. We did not know two were on the side terrace because nobody had posted a note. Dad keeps bees and he says the side terrace is normal varroa work, not a problem.",
        domain_present: "smells-and-tastes",
      },
      {
        character_id: "student-y5-arjun-bhattacharya",
        attestation:
          "Bee-Tending Co-op counted at the registry on Sunday. We got 14. The registry counts all hives in the system, including any that are temporarily moved. That is what the registry is for.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "student-y4-rasul-kerimov",
        attestation:
          "I was on the side terrace Monday afternoon for Hydroponics drainage. I saw two hives in carriers on the lower wall. I did not ask whose. They were quiet and roped down.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "student-y3-amara-eze",
        attestation:
          "Auntie keeps the seed library and the orchard hive list is on the same shelf. The orchard count for last spring was 14 and the spring before that was 14. The list does not have a 'moved out' column. It probably should.",
        domain_present: "objects-and-textures",
      },
      {
        character_id: "staff-gardens-steward-wilson",
        attestation:
          "Ms. Fields posted a note on the orchard gate Monday morning but the wind tore it down by Tuesday. I taped a fresh one up Wednesday and that one stayed. The Bulletin and the Bee-Tending Co-op both saw the Wednesday note. The hydroponics kids counted Tuesday before the note went back up.",
        domain_present: "weather-and-light",
      },
      {
        character_id: "teacher-haakonsen-civics",
        attestation:
          "Equinox planners need a number by next Tuesday for the Honey Tally. We will accept any of the three numbers if the census-day-and-method is recorded next to it. We do not need a single true count; we need a method we trust.",
        domain_present: "schedule-and-dates",
      },
      {
        character_id: "kelp-gardens-coordinator",
        attestation:
          "My orchard sensor pings every hive lid daily. This week I pinged 12 lids in the orchard and 2 lids on the side terrace. Total 14 in the system. I did not raise an alert because Ms. Fields filed the move on Monday morning before the move.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "tally-assignments-tracker",
        attestation:
          "Filing record from Ms. Fields, Monday 06:14: 'Hives B7 and B11 to side terrace for varroa-check, return between Saturday and Sunday.' The Junior Hydroponics log did not query my record before counting. It would have shown.",
        domain_present: "systems-and-flows",
      },
      {
        character_id: "student-y5-arjun-bhattacharya",
        attestation:
          "Bee-Tending Co-op newsletter will print Saturday with the registry number and a footnote: two hives on side terrace through this week. We always footnote moves. The Bulletin does not always copy the footnote.",
        domain_present: "spoken-words",
      },
      {
        character_id: "student-y1-noa-bensoussan",
        attestation:
          "I was helping move the hive carriers Monday because my mums work the loading dock and I am strong for year-1. The carriers are red. Two of them. Roped tight. We took them up the side path before assembly.",
        domain_present: "body-language",
      },
    ],
    articles: [
      {
        id: "art-c5-bees",
        source_id: "pub-bee-bulletin",
        byline: "Ms. Fields",
        headline: "ORCHARD HIVE COUNT STEADY AT 14",
        body:
          "The orchard hive count remains 14 for the third consecutive month. Two hives are on the side terrace this week for routine varroa-check and will return by the weekend. Bee-tenders will note the move in their weekly walk-throughs. Honey Tally projections for the Equinox should anchor on 14.",
        drift_notes: "Accurate at the registry; the side-terrace footnote is correct but easy to skim.",
      },
      {
        id: "art-c5-hydro-news",
        source_id: "news-club-hydro-junior",
        headline: "ORCHARD HIVE COUNT: WE GOT 12",
        body:
          "Tuesday's orchard count by the Junior Hydroponics Co-op returned 12 hives, two fewer than the Bee-Tender Bulletin reports. We counted at the orchard, not the registry. We did not see a note about a move at the gate when we counted. We are happy to recount this weekend with Ms. Fields.",
        drift_notes: "Honest count; missed the wind-torn move note on Monday/Tuesday.",
      },
      {
        id: "art-c5-equinox-news",
        source_id: "news-club-equinox",
        headline: "HONEY TALLY METHOD: REGISTRY + MOVE COLUMN",
        body:
          "The Equinox Ceremony Planners will accept the Honey Tally on either method, provided the census day and a 'moved-out' column are both reported. Single-day orchard counts without a move column have produced three different numbers this week. We thank everyone who counted; we need method, not a winner.",
        drift_notes: "Accurate; lands the systems insight.",
      },
      {
        id: "art-c5-encyc",
        source_id: "pub-encyclopedia",
        headline: "HIVE CENSUS, METHOD (OPEN ENTRY)",
        body:
          "Two methods exist for orchard hive census at Cascadia Reach. REGISTRY method counts all hives in the orchard system, including hives temporarily moved for varroa-check or queen-rearing. ORCHARD method counts only hives present at the orchard on census day. Both are valid. Sources should label which method they used.",
        drift_notes: "Open entry; edit-warred mildly last year. Currently accurate.",
      },
      {
        id: "art-c5-hotbunk",
        source_id: "pub-hotbunk-daily",
        byline: "Staff",
        headline: "THREE COUNTS, THREE NUMBERS, NO SHADE",
        body:
          "Twelve, thirteen, fourteen. Nobody is wrong. The bee-tenders count at the registry, the hydro kids count at the orchard, a year-1 with a notebook caught the middle of a varroa move. The honey will still be honey. The number on the Equinox sign needs to say which method, that is all. We expect a steward to caption the gate by Sunday.",
        drift_notes: "Accurate gossip; the methodology hint is correct.",
      },
      {
        id: "art-c5-park-class",
        source_id: "ann-class-park-life-sciences",
        headline: "VARROA-CHECK PROTOCOL (WEEKLY NOTE)",
        body:
          "Varroa-check moves are routine and do not indicate a hive problem. The move log lives with Ms. Fields and is filed before the move. If a gate-note is missing on census day, ask the steward. Year-3 students will help post fresh move-notes after wind events this term.",
        drift_notes: "Accurate; small action item assigned to year-3.",
      },
    ],
  },
];

// ─── Lookups ──────────────────────────────────────────────────────────

export const CASES_BY_ID: Record<string, CaseFile> = Object.fromEntries(
  CASES.map((c) => [c.id, c]),
);
