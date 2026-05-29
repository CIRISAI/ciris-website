// Red Riding Hood as a CEG teaching demo.
//
// ONE story, ONE ground truth. EIGHT named voices. EIGHT story dimensions.
// The wolf is a perfectly valid CEG attester whose claims happen to be
// DELIBERATELY FALSE on the dimensions where he lies.
//
// The roster was chosen to exercise EVERY CEG primitive and family
// organically (no contrived voices):
//   - `scores`        — every voice posts scored attestations
//   - `delegates_to`  — Mother delegates the cottage question to the
//                       Woodsman ("I wasn't there; ask the Woodsman")
//   - `vouches_for`   — Mother vouches for Red's standing
//   - `withdraws`     — Red withdraws her "grandmother had big eyes"
//                       claim once she understands it was the wolf
//   - `recants`       — Grandmother recants opening the door for
//                       anyone claiming to be Red, with a stated why
//   - `supersedes`    — The Village Crier publishes the official
//                       chronicle, superseding the Wolf's earlier lies
//   - STANDING        — Red, Grandmother
//   - ACTION          — Wolf, Woodsman
//   - DETECTION       — The Squirrel (small witness, easy to discount,
//                       independent placement of the wolf)
//   - CONSENSUS       — Hunter (corroboration), Village Crier
//                       (institutional voice)
//   - CORRECTION      — Mother (vouches, delegates), Woodsman (kills),
//                       Grandmother (recants)
//
// The time axis is the demo's punchline. As the time slider advances,
// voices arrive in story-order. With only the Wolf testifying the
// graph reads "Wolf was nowhere near the cottage" — a false verdict.
// As the witness-diverse voices arrive, k_eff climbs, the corridor
// opens, the wolf's lies isolate, and the verdict converges on the
// truth. The Woodsman's arrival at t=8 is the inflection.

export type RrhDim =
  | "wolf_in_cottage"
  | "grandmother_eaten"
  | "red_strayed_from_path"
  | "woodsman_killed_wolf"
  | "red_safe_at_end"
  | "wolf_disguised_as_grandmother"
  | "mothers_instructions_followed"
  | "wolf_was_just_a_dog";

export type RrhPrimitive =
  | "scores"
  | "delegates_to"
  | "vouches_for"
  | "withdraws"
  | "recants"
  | "supersedes";

export interface RrhVoice {
  id: string;
  name: string;
  role: string;
  hue: string;
  family: "STANDING" | "ACTION" | "DETECTION" | "CONSENSUS" | "CORRECTION";
  glyph: string;       // emoji icon for the sphere
  bio: string;
}

export interface RrhDimension {
  id: RrhDim;
  label: string;
  truth: 0 | 1;        // ground truth
  truth_note: string;
}

export interface RrhAttestation {
  voice_id: string;
  dim?: RrhDim;        // optional — composition primitives may not bind to a dim
  primitive: RrhPrimitive;
  // For "vouches_for" / "delegates_to" / "supersedes" these point at the
  // other attester whose voice is being vouched / delegated to / replaced.
  target_voice_id?: string;
  // For "withdraws" / "recants" / "supersedes" these point at the
  // previous attestation being undone (by index into this array).
  target_attestation_idx?: number;
  score: number;       // -1 to 1
  confidence: number;  // 0 to 1
  time: number;        // 0 to 10 — when this attestation enters the graph
  context: string;     // in-character explanation
  why?: string;        // for recants — the stated reason
}

// ── Voices ────────────────────────────────────────────────────

export const RRH_VOICES: RrhVoice[] = [
  {
    id: "rrh-wolf",
    name: "The Wolf",
    role: "The deceiver",
    family: "ACTION",
    glyph: "🐺",
    hue: "#5a3a30",
    bio: "Ate grandmother, disguised as her, killed by the Woodsman. Attests as if none of that happened, high confidence on every lie. CEG handles him without special-casing: he's just a node whose scored attestations conflict with witness-diverse corroborators.",
  },
  {
    id: "rrh-mother",
    name: "The Mother",
    role: "The sender",
    family: "CORRECTION",
    glyph: "👩",
    hue: "#c48a3a",
    bio: "Packs the basket, gives the path instruction. Delegates the cottage question to the Woodsman because she wasn't there. Vouches for Red's standing — Red is honest, just inexperienced.",
  },
  {
    id: "rrh-hunter",
    name: "The Passing Hunter",
    role: "The earlier sighting",
    family: "CONSENSUS",
    glyph: "🏹",
    hue: "#4a6488",
    bio: "Crossed the woods at dawn. Saw the wolf circling, asked Red where she was going. Earlier sighting corroborates the wolf's path even though he didn't see the cottage scene.",
  },
  {
    id: "rrh-red",
    name: "Little Red Riding Hood",
    role: "The protagonist",
    family: "STANDING",
    glyph: "🧒",
    hue: "#c93b3b",
    bio: "Honest, partial knowledge. Saw the wolf-in-grandmother's-clothes, didn't see grandmother eaten. Withdraws her early 'grandmother had big eyes' claim once she understands what was actually in the bed.",
  },
  {
    id: "rrh-grandmother",
    name: "Grandmother",
    role: "The eaten elder",
    family: "STANDING",
    glyph: "👵",
    hue: "#a48cab",
    bio: "Lived alone in the cottage. Heard the knock, opened the door, was eaten. After being cut out alive by the Woodsman, recants the door-opening with a stated why.",
  },
  {
    id: "rrh-squirrel",
    name: "The Forest Squirrel",
    role: "The small witness",
    family: "DETECTION",
    glyph: "🐿️",
    hue: "#b88c4a",
    bio: "In an oak above the cottage path. Saw the grey shape go through the door. Small witness, easy to discount, but the only one who can place the wolf at the scene independently of Red.",
  },
  {
    id: "rrh-woodsman",
    name: "The Woodsman",
    role: "The end-state eyewitness",
    family: "ACTION",
    glyph: "🪓",
    hue: "#3a6a4a",
    bio: "Heard noise from the cottage, entered, found the wolf, killed it with his axe, freed grandmother and Red. Direct firsthand attestation on the entire end-state. His arrival is the demo's inflection.",
  },
  {
    id: "rrh-crier",
    name: "The Village Crier",
    role: "The institutional voice",
    family: "CONSENSUS",
    glyph: "📜",
    hue: "#6a4a8a",
    bio: "Publishes the village's official chronicle after the rescue. Cites Red, Grandmother, Woodsman, Squirrel, Hunter. Supersedes the Wolf's earlier self-serving statement and makes the deception part of the public record.",
  },
];

// ── Dimensions of the story ─────────────────────────────────────

export const RRH_DIMENSIONS: RrhDimension[] = [
  {
    id: "wolf_in_cottage",
    label: "The wolf was inside the cottage",
    truth: 1,
    truth_note: "Entered through the door grandmother opened, climbed into her bed.",
  },
  {
    id: "grandmother_eaten",
    label: "Grandmother was eaten by the wolf",
    truth: 1,
    truth_note: "Eaten whole, then cut out alive by the Woodsman.",
  },
  {
    id: "red_strayed_from_path",
    label: "Red strayed from the path to pick flowers",
    truth: 1,
    truth_note: "Stopped to gather a posy for grandmother, against her mother's instruction.",
  },
  {
    id: "woodsman_killed_wolf",
    label: "The Woodsman killed the wolf",
    truth: 1,
    truth_note: "With his axe, after hearing snoring through the cottage door.",
  },
  {
    id: "red_safe_at_end",
    label: "Red came home safe at the end",
    truth: 1,
    truth_note: "Rescued from the wolf's belly by the Woodsman; walked home with grandmother.",
  },
  {
    id: "wolf_disguised_as_grandmother",
    label: "The wolf disguised himself as grandmother",
    truth: 1,
    truth_note: "Wore her cap and nightgown, lay in her bed.",
  },
  {
    id: "mothers_instructions_followed",
    label: "Red followed her mother's instructions",
    truth: 0,
    truth_note: "She strayed to pick flowers and spoke to the wolf.",
  },
  {
    id: "wolf_was_just_a_dog",
    label: "The wolf was just a helpful forest dog",
    truth: 0,
    truth_note: "He was a wolf, not a dog. This is the Wolf's own identity lie.",
  },
];

// ── Attestations ──────────────────────────────────────────────

export const RRH_ATTESTATIONS: RrhAttestation[] = [
  // T=0 — Wolf publishes his self-serving statement.
  // The wolf gets the first word, high confidence in every lie.
  {
    voice_id: "rrh-wolf",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: -0.9,
    confidence: 0.95,
    time: 0,
    context: "I was nowhere near the cottage. I have an alibi.",
  },
  {
    voice_id: "rrh-wolf",
    dim: "grandmother_eaten",
    primitive: "scores",
    score: -0.9,
    confidence: 0.95,
    time: 0,
    context: "I would never. I am a vegetarian. This is slander.",
  },
  {
    voice_id: "rrh-wolf",
    dim: "wolf_disguised_as_grandmother",
    primitive: "scores",
    score: -0.9,
    confidence: 0.95,
    time: 0,
    context: "Why would I do that? The child must have been confused.",
  },
  {
    voice_id: "rrh-wolf",
    dim: "wolf_was_just_a_dog",
    primitive: "scores",
    score: 0.95,
    confidence: 0.99,
    time: 0,
    context: "Look at me. I am clearly a misunderstood forest dog.",
  },

  // T=1 — Mother attests on path instructions, delegates the cottage
  // question to the Woodsman (delegates_to primitive).
  {
    voice_id: "rrh-mother",
    dim: "red_strayed_from_path",
    primitive: "scores",
    score: 0.6,
    confidence: 0.6,
    time: 1,
    context: "I told her to stay on the path. She has a way of forgetting.",
  },
  {
    voice_id: "rrh-mother",
    dim: "mothers_instructions_followed",
    primitive: "scores",
    score: -0.4,
    confidence: 0.5,
    time: 1,
    context: "I gave her clear instructions. Whether she followed them, I'd rather hear from those who saw.",
  },
  {
    voice_id: "rrh-mother",
    dim: "wolf_in_cottage",
    primitive: "delegates_to",
    target_voice_id: "rrh-woodsman",
    score: 0,
    confidence: 0,
    time: 1,
    context: "I wasn't at the cottage. Ask the Woodsman.",
  },

  // T=2 — Mother vouches for Red's standing.
  {
    voice_id: "rrh-mother",
    primitive: "vouches_for",
    target_voice_id: "rrh-red",
    score: 0.9,
    confidence: 0.95,
    time: 2,
    context: "Red tells the truth. Whatever she says she saw, she saw.",
  },

  // T=3 — Hunter arrives with an earlier sighting.
  {
    voice_id: "rrh-hunter",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: 0.5,
    confidence: 0.55,
    time: 3,
    context: "I did not see him at the cottage. But I saw him heading that direction at dawn.",
  },
  {
    voice_id: "rrh-hunter",
    dim: "red_strayed_from_path",
    primitive: "scores",
    score: 0.65,
    confidence: 0.65,
    time: 3,
    context: "I asked where she was going and she pointed off the path.",
  },
  {
    voice_id: "rrh-hunter",
    dim: "wolf_was_just_a_dog",
    primitive: "scores",
    score: -0.95,
    confidence: 0.95,
    time: 3,
    context: "I know a wolf when I see one. That was no dog.",
  },

  // T=4 — Red returns and testifies on her direct experience.
  {
    voice_id: "rrh-red",
    dim: "red_strayed_from_path",
    primitive: "scores",
    score: 0.95,
    confidence: 0.95,
    time: 4,
    context: "Yes. I stopped to pick flowers for grandmother. I knew I shouldn't have.",
  },
  {
    voice_id: "rrh-red",
    dim: "wolf_disguised_as_grandmother",
    primitive: "scores",
    score: 0.65,
    confidence: 0.55,
    time: 4,
    context: "Grandmother looked strange. Big eyes, big ears, big teeth. I asked her about it.",
  },
  {
    voice_id: "rrh-red",
    dim: "red_safe_at_end",
    primitive: "scores",
    score: 1.0,
    confidence: 0.95,
    time: 4,
    context: "Yes. The Woodsman cut me out of the wolf. I am alright.",
  },

  // T=5 — Red withdraws her earlier framing once she understands.
  {
    voice_id: "rrh-red",
    primitive: "withdraws",
    target_attestation_idx: 11, // the "grandmother had big eyes" claim above
    score: 0,
    confidence: 0,
    time: 5,
    context: "I want to take back the way I said it. It wasn't grandmother with big eyes. It was the wolf wearing grandmother.",
  },

  // T=6 — Grandmother arrives post-rescue, recants opening the door.
  {
    voice_id: "rrh-grandmother",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 6,
    context: "Yes. He knocked, said he was Red, I opened the door.",
  },
  {
    voice_id: "rrh-grandmother",
    dim: "grandmother_eaten",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 6,
    context: "I would know. I was in there.",
  },
  {
    voice_id: "rrh-grandmother",
    primitive: "recants",
    score: 1.0,
    confidence: 1.0,
    time: 6,
    context: "I take back my old habit of opening the door for any voice that says 'it's Red'. Next time I want a code word.",
    why: "Anyone can copy a child's voice. A shared code word can't be faked from outside.",
  },

  // T=7 — Squirrel: small witness, independent placement.
  {
    voice_id: "rrh-squirrel",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: 0.85,
    confidence: 0.7,
    time: 7,
    context: "From my oak I saw the grey shape go through the door. Squirrels remember.",
  },
  {
    voice_id: "rrh-squirrel",
    dim: "wolf_was_just_a_dog",
    primitive: "scores",
    score: -0.9,
    confidence: 0.85,
    time: 7,
    context: "Dogs don't move like that. I have watched both. Wolves move like that.",
  },

  // T=8 — THE WOODSMAN. Inflection. Full firsthand on the end state.
  {
    voice_id: "rrh-woodsman",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 8,
    context: "I opened the door and there he was, in grandmother's bed, snoring.",
  },
  {
    voice_id: "rrh-woodsman",
    dim: "grandmother_eaten",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 8,
    context: "I cut her out of him with my axe. She was alive. So was Red.",
  },
  {
    voice_id: "rrh-woodsman",
    dim: "woodsman_killed_wolf",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 8,
    context: "I did, yes. Quickly. He did not feel it.",
  },
  {
    voice_id: "rrh-woodsman",
    dim: "wolf_disguised_as_grandmother",
    primitive: "scores",
    score: 0.95,
    confidence: 0.95,
    time: 8,
    context: "He was wearing her cap. Looked ridiculous on him.",
  },
  {
    voice_id: "rrh-woodsman",
    dim: "red_safe_at_end",
    primitive: "scores",
    score: 1.0,
    confidence: 1.0,
    time: 8,
    context: "Walked her home myself.",
  },

  // T=9 — Village Crier publishes the chronicle. Cites everyone.
  {
    voice_id: "rrh-crier",
    dim: "wolf_in_cottage",
    primitive: "scores",
    score: 1.0,
    confidence: 0.95,
    time: 9,
    context: "Per chronicle entry 14B-3: wolf entered cottage at midday. Witnesses: Grandmother, Woodsman, Squirrel.",
  },
  {
    voice_id: "rrh-crier",
    dim: "grandmother_eaten",
    primitive: "scores",
    score: 1.0,
    confidence: 0.95,
    time: 9,
    context: "Per chronicle entry 14B-4: grandmother eaten and subsequently extracted alive.",
  },
  {
    voice_id: "rrh-crier",
    dim: "wolf_was_just_a_dog",
    primitive: "scores",
    score: -1.0,
    confidence: 0.95,
    time: 9,
    context: "Per chronicle entry 14B-7: identity of perpetrator confirmed as Canis lupus, not Canis familiaris.",
  },

  // T=10 — Crier formally supersedes the Wolf's earlier self-serving
  // statement. This is the supersedes primitive made visible.
  {
    voice_id: "rrh-crier",
    primitive: "supersedes",
    target_attestation_idx: 0, // the Wolf's "I was nowhere near the cottage"
    score: 0,
    confidence: 0,
    time: 10,
    context: "The Wolf's earlier statement is superseded by the chronicle's witness-diverse account. Filed under recanted-by-others.",
  },
];

// ── Voice + dim lookup helpers ─────────────────────────────────

export function rrhVoiceById(id: string): RrhVoice | undefined {
  return RRH_VOICES.find((v) => v.id === id);
}

export function rrhDimensionById(id: RrhDim): RrhDimension | undefined {
  return RRH_DIMENSIONS.find((d) => d.id === id);
}

// Filter attestations to those that have arrived by `currentTime`. The
// graph builder uses this to emit a time-sliced view.
export function rrhAttestationsAt(currentTime: number): RrhAttestation[] {
  return RRH_ATTESTATIONS.filter((a) => a.time <= currentTime);
}

export const RRH_TITLE = "Red Riding Hood";
export const RRH_TAGLINE =
  "One story. Eight voices. One liar. Watch the truth converge as voices arrive.";
