"use client";

import { useEffect, useMemo, useState } from "react";
import { FLOORS, ROOMS, roomsByFloor, type Room, type RoomId } from "../lib/school";

const ROOMS_BY_ID = Object.fromEntries(ROOMS.map((r) => [r.id, r]));
import { ROSTER, type RosterCharacter } from "../lib/roster";
import type { CaseFile, CaseWitness } from "../lib/cases-generated";
import { CHARACTERS } from "@/app/grammar/lib/characters-generated";
import { ALL_STORIES } from "@/app/grammar/lib/stories-generated";
import FaceTile from "./FaceTile";

const CHAR_BY_ID = new Map(CHARACTERS.map((c) => [c.id, c]));
const STORY_BY_ID = new Map(ALL_STORIES.map((s) => [s.id, s]));

type ViewMode = "class" | "club";

function charactersInRoom(
  roster: RosterCharacter[],
  roomId: RoomId,
  mode: ViewMode,
): RosterCharacter[] {
  return roster.filter((c) =>
    mode === "class" ? c.classroom === roomId : c.clubRoom === roomId,
  );
}

export default function SchoolMap({
  hotRooms = [],
  activeSlot = null,
  selectedCharacterId = null,
  selectedRoomId = null,
  activeCase = null,
  onSelectCharacter,
  onSelectRoom,
}: {
  hotRooms?: RoomId[];
  activeSlot?: "who" | "where" | "how" | null;
  selectedCharacterId?: string | null;
  selectedRoomId?: RoomId | null;
  activeCase?: CaseFile | null;
  onSelectCharacter?: (id: string) => void;
  onSelectRoom?: (id: RoomId) => void;
}) {
  // Case-relevance: suspects + witnesses get a gold glow on their face
  // tile so the player can see WHO matters to this mystery without
  // having to read every kid's bio.
  const witnessById = useMemo(() => {
    const m = new Map<string, CaseWitness>();
    if (activeCase) {
      for (const w of activeCase.witnesses) m.set(w.character_id, w);
    }
    return m;
  }, [activeCase]);
  const suspectIds = useMemo(
    () => new Set(activeCase?.suspects ?? []),
    [activeCase],
  );
  // Default to the floor with the most CASE-hot rooms. Falls back to F2 if
  // the case touches every floor equally.
  const defaultFloor = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const id of hotRooms) {
      const r = ROOMS_BY_ID[id];
      if (r) counts[r.floor] = (counts[r.floor] ?? 0) + 1;
    }
    const best = Object.entries(counts).sort(
      (a, b) => Number(b[1]) - Number(a[1]),
    )[0]?.[0];
    return best ? parseInt(best, 10) : 2;
  }, [hotRooms]);
  const [floor, setFloor] = useState<number>(defaultFloor);
  useEffect(() => {
    setFloor(defaultFloor);
  }, [defaultFloor]);
  const [mode, setMode] = useState<ViewMode>("class");
  const [selected, setSelected] = useState<string | null>(null);
  const rooms = roomsByFloor(floor);
  const totalKidsHere = ROSTER.filter((c) =>
    rooms.some((r) =>
      mode === "class" ? c.classroom === r.id : c.clubRoom === r.id,
    ),
  ).length;
  const selectedChar = selected
    ? ROSTER.find((c) => c.id === selected) ?? null
    : null;

  return (
    <div className="school-map">
      {/* Mode toggle */}
      <div className="mode-toggle" role="tablist" aria-label="view mode">
        <button
          role="tab"
          aria-selected={mode === "class"}
          className={`mode-btn ${mode === "class" ? "on" : ""}`}
          onClick={() => setMode("class")}
        >
          CLASS
        </button>
        <button
          role="tab"
          aria-selected={mode === "club"}
          className={`mode-btn ${mode === "club" ? "on" : ""}`}
          onClick={() => setMode("club")}
        >
          CLUB
        </button>
      </div>

      {/* Floor tabs */}
      <div className="floor-tabs" role="tablist" aria-label="school floor">
        {FLOORS.map((f) => {
          const hotCount = hotRooms.filter(
            (id) => ROOMS_BY_ID[id]?.floor === f.id,
          ).length;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={floor === f.id}
              className={`floor-btn ${floor === f.id ? "on" : ""} ${
                hotCount > 0 ? "has-hot" : ""
              }`}
              onClick={() => setFloor(f.id)}
            >
              <span className="floor-num">F{f.id}</span>
              <span className="floor-name">{f.label}</span>
              {hotCount > 0 && (
                <span className="floor-hot-badge" title="rooms in this case">
                  {hotCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="floor-summary">
        <span className="kbd">FLOOR {floor}</span>
        <span>{rooms.length} rooms</span>
        <span>{totalKidsHere} kids on floor</span>
        <span>view: {mode.toUpperCase()}</span>
      </div>

      {/* Rooms grid */}
      <div
        className={`rooms-grid ${
          activeSlot === "who" ? "picking-who" : ""
        } ${activeSlot === "where" ? "picking-where" : ""}`}
      >
        {rooms.map((r) => {
          const isSelectedRoom = selectedRoomId === r.id;
          return (
            <RoomTile
              key={r.id}
              room={r}
              chars={charactersInRoom(ROSTER, r.id, mode)}
              selected={selected}
              onSelect={(charId) => {
                if (activeSlot === "who" && charId && onSelectCharacter) {
                  onSelectCharacter(charId);
                } else {
                  setSelected(charId);
                }
              }}
              hot={hotRooms.includes(r.id)}
              picking={activeSlot === "where"}
              isSelectedRoom={isSelectedRoom}
              isPickedCharacter={selectedCharacterId}
              witnessIds={witnessById}
              suspectIds={suspectIds}
              onPickRoom={() => {
                if (activeSlot === "where" && onSelectRoom) {
                  onSelectRoom(r.id);
                }
              }}
            />
          );
        })}
      </div>

      {/* Selected character peek */}
      {selectedChar && (
        <CharacterPeek
          char={selectedChar}
          witness={witnessById.get(selectedChar.id) ?? null}
          isSuspect={suspectIds.has(selectedChar.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CharacterPeek({
  char,
  witness,
  isSuspect,
  onClose,
}: {
  char: RosterCharacter;
  witness: CaseWitness | null;
  isSuspect: boolean;
  onClose: () => void;
}) {
  const profile = CHAR_BY_ID.get(char.id);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  return (
    <div className="peek-card">
      <div className="peek-head">
        <FaceTile
          id={char.id}
          size={64}
          ring={witness ? "#d4a04a" : isSuspect ? "#b94c2a" : undefined}
        />
        <div className="peek-body">
          <div className="peek-name">{char.name}</div>
          <div className="peek-meta">
            {char.role}
            {char.yearBand ? ` · ${char.yearBand}` : ""}
            {char.cegFamily ? ` · ${char.cegFamily}` : ""}
            {" · "}
            {char.pronouns}
          </div>
          <div className="peek-bio">{char.bio}</div>
          <div className="peek-meta">
            {char.className ? `class: ${char.className}` : ""}
            {char.clubName ? ` · club: ${char.clubName}` : ""}
          </div>
          <div className="peek-meta">
            holds {char.storyCount} stories ·{" "}
            {char.sharingPosture.replace(/_/g, " ")}
          </div>
        </div>
        <button
          type="button"
          className="peek-close"
          onClick={onClose}
          aria-label="close"
        >
          X
        </button>
      </div>

      {witness && (
        <div className="peek-witness">
          <div className="peek-witness-tag">
            <span className="kbd kbd-small">WITNESS</span>
            <span>attention was on {witness.domain_present}</span>
          </div>
          <p className="peek-witness-quote">
            &ldquo;{witness.attestation}&rdquo;
          </p>
          {witness.drift_hint && (
            <p className="peek-witness-drift">
              <span className="kbd kbd-small">!</span> {witness.drift_hint}
            </p>
          )}
        </div>
      )}

      {!witness && isSuspect && (
        <div className="peek-suspect">
          <span className="kbd kbd-small">NEARBY</span>
          <span>this kid was in or near the case at the time</span>
        </div>
      )}

      {profile && profile.storyHoldings.length > 0 && (
        <div className="peek-stories">
          <div className="peek-stories-head">
            <span className="kbd kbd-small">STORIES</span>
            <span>tap a title to read</span>
          </div>
          <ul className="peek-stories-list">
            {profile.storyHoldings.map((h, i) => {
              const story = STORY_BY_ID.get(h.storyId);
              const open = expandedStory === h.storyId;
              return (
                <li key={i} className="peek-story-item">
                  <button
                    type="button"
                    className={`peek-story-row ${open ? "on" : ""}`}
                    onClick={() =>
                      setExpandedStory(open ? null : h.storyId)
                    }
                  >
                    <span className="peek-story-prov">
                      {h.provenance.replace(/_/g, " ")}
                    </span>
                    <span className="peek-story-title">
                      {story?.title ?? h.storyId}
                    </span>
                  </button>
                  {open && story && (
                    <div className="peek-story-body">
                      {h.note && (
                        <p className="peek-story-note">
                          <span className="kbd kbd-small">NOTE</span>{" "}
                          {h.note}
                        </p>
                      )}
                      <p className="peek-story-text">{story.scenario}</p>
                      <p className="peek-story-meta">
                        family: {story.family} ·{" "}
                        {story.dimensions.join(", ")}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function RoomTile({
  room,
  chars,
  selected,
  onSelect,
  hot,
  picking,
  isSelectedRoom,
  isPickedCharacter,
  witnessIds,
  suspectIds,
  onPickRoom,
}: {
  room: Room;
  chars: RosterCharacter[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  hot: boolean;
  picking?: boolean;
  isSelectedRoom?: boolean;
  isPickedCharacter?: string | null;
  witnessIds?: Map<string, CaseWitness>;
  suspectIds?: Set<string>;
  onPickRoom?: () => void;
}) {
  const clickableRoom = picking && !!onPickRoom;
  return (
    <div
      className={`room-tile ${hot ? "hot" : ""} ${
        clickableRoom ? "pickable" : ""
      } ${isSelectedRoom ? "picked" : ""}`}
      data-room-id={room.id}
      onClick={clickableRoom ? onPickRoom : undefined}
      role={clickableRoom ? "button" : undefined}
      tabIndex={clickableRoom ? 0 : undefined}
    >
      {hot && <div className="room-hot-flag" aria-hidden="true">!</div>}
      {isSelectedRoom && (
        <div className="room-picked-flag" aria-hidden="true">✓</div>
      )}
      <div className="room-header">
        <span className="room-glyph">{room.glyph}</span>
        <span className="room-name">{room.short}</span>
        <span className="room-count">{chars.length}</span>
      </div>
      <div className="room-floor-num">
        {room.label}
      </div>
      <div className="room-faces">
        {chars.length === 0 ? (
          <div className="room-empty">— empty —</div>
        ) : (
          chars.map((c) => {
            const isWitness = !!witnessIds?.has(c.id);
            const isSuspect = !!suspectIds?.has(c.id);
            const titleSuffix = isWitness
              ? " · WITNESS"
              : isSuspect
                ? " · NEARBY"
                : "";
            return (
              <FaceTile
                key={c.id}
                id={c.id}
                size={28}
                selected={c.id === selected || c.id === isPickedCharacter}
                ring={isWitness ? "#d4a04a" : isSuspect ? "#b94c2a" : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(c.id === selected ? null : c.id);
                }}
                title={c.name + titleSuffix}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
