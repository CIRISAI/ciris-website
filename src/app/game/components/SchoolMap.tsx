"use client";

import { useState } from "react";
import { FLOORS, roomsByFloor, type Room, type RoomId } from "../lib/school";
import { ROSTER, type RosterCharacter } from "../lib/roster";
import FaceTile from "./FaceTile";

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

export default function SchoolMap() {
  const [floor, setFloor] = useState<number>(1);
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
        {FLOORS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={floor === f.id}
            className={`floor-btn ${floor === f.id ? "on" : ""}`}
            onClick={() => setFloor(f.id)}
          >
            <span className="floor-num">F{f.id}</span>
            <span className="floor-name">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="floor-summary">
        <span className="kbd">FLOOR {floor}</span>
        <span>{rooms.length} rooms</span>
        <span>{totalKidsHere} kids on floor</span>
        <span>view: {mode.toUpperCase()}</span>
      </div>

      {/* Rooms grid */}
      <div className="rooms-grid">
        {rooms.map((r) => (
          <RoomTile
            key={r.id}
            room={r}
            chars={charactersInRoom(ROSTER, r.id, mode)}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* Selected character peek */}
      {selectedChar && (
        <div className="peek-card">
          <FaceTile id={selectedChar.id} size={64} />
          <div className="peek-body">
            <div className="peek-name">{selectedChar.name}</div>
            <div className="peek-meta">
              {selectedChar.role}
              {selectedChar.yearBand ? ` · ${selectedChar.yearBand}` : ""}
              {selectedChar.cegFamily ? ` · ${selectedChar.cegFamily}` : ""}
              {" · "}{selectedChar.pronouns}
            </div>
            <div className="peek-bio">{selectedChar.bio}</div>
            <div className="peek-meta">
              {selectedChar.className ? `class: ${selectedChar.className}` : ""}
              {selectedChar.clubName ? ` · club: ${selectedChar.clubName}` : ""}
            </div>
            <div className="peek-meta">
              holds {selectedChar.storyCount} stories ·{" "}
              {selectedChar.sharingPosture.replace(/_/g, " ")}
            </div>
          </div>
          <button
            type="button"
            className="peek-close"
            onClick={() => setSelected(null)}
            aria-label="close"
          >
            X
          </button>
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
}: {
  room: Room;
  chars: RosterCharacter[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="room-tile" data-room-id={room.id}>
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
          chars.map((c) => (
            <FaceTile
              key={c.id}
              id={c.id}
              size={28}
              selected={c.id === selected}
              onClick={() =>
                onSelect(c.id === selected ? null : c.id)
              }
              title={c.name}
            />
          ))
        )}
      </div>
    </div>
  );
}
