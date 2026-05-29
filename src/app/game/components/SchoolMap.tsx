"use client";

import { useState } from "react";
import { FLOORS, roomsByFloor, type Room, type RoomId } from "../lib/school";
import { STUB_ROSTER, type StubCharacter } from "../lib/stub-roster";
import FaceTile from "./FaceTile";

type ViewMode = "class" | "club";

function charactersInRoom(
  roster: StubCharacter[],
  roomId: RoomId,
  mode: ViewMode,
): StubCharacter[] {
  return roster.filter((c) =>
    mode === "class" ? c.classroom === roomId : c.clubRoom === roomId,
  );
}

export default function SchoolMap() {
  const [floor, setFloor] = useState<number>(1);
  const [mode, setMode] = useState<ViewMode>("class");
  const [selected, setSelected] = useState<string | null>(null);
  const rooms = roomsByFloor(floor);
  const totalKidsHere = STUB_ROSTER.filter((c) =>
    rooms.some((r) =>
      mode === "class" ? c.classroom === r.id : c.clubRoom === r.id,
    ),
  ).length;
  const selectedChar = selected
    ? STUB_ROSTER.find((c) => c.id === selected) ?? null
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
            chars={charactersInRoom(STUB_ROSTER, r.id, mode)}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* Selected character peek */}
      {selectedChar && (
        <div className="peek-card">
          <FaceTile id={selectedChar.id} size={56} />
          <div className="peek-body">
            <div className="peek-name">{selectedChar.name}</div>
            <div className="peek-meta">
              {selectedChar.role}
              {selectedChar.yearBand ? ` · ${selectedChar.yearBand}` : ""}
            </div>
            <div className="peek-meta">
              class: {selectedChar.classroom ?? "—"} · club: {selectedChar.clubRoom ?? "—"}
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
  chars: StubCharacter[];
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
