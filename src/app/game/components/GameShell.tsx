"use client";

import { useEffect, useState } from "react";
import { CASES, type CaseFile } from "../lib/cases-generated";
import { loadSolved, markSolved } from "../lib/progress";
import type { RoomId } from "../lib/school";
import CaseBanner from "./CaseBanner";
import SchoolMap from "./SchoolMap";
import SourcesGallery from "./SourcesGallery";
import SolveOverlay from "./SolveOverlay";
import FaceTile from "./FaceTile";

export type SlotId = "who" | "where" | "how";
export interface SlotFills {
  who: string | null;     // character id
  where: RoomId | null;   // room id
  how: string | null;     // failure mode string
}

export default function GameShell() {
  const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0]?.id ?? "");
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeSlot, setActiveSlot] = useState<SlotId | null>(null);
  const [fills, setFills] = useState<SlotFills>({
    who: null,
    where: null,
    how: null,
  });
  const activeCase = CASES.find((c) => c.id === activeCaseId) ?? CASES[0];

  useEffect(() => {
    setSolved(loadSolved());
  }, []);

  // Reset slot state when the active case changes.
  useEffect(() => {
    setFills({ who: null, where: null, how: null });
    setActiveSlot(null);
  }, [activeCaseId]);

  function handleSlotTap(id: SlotId) {
    setActiveSlot((prev) => (prev === id ? null : id));
  }

  function handleSelectCharacter(charId: string) {
    if (activeSlot === "who") {
      setFills((f) => ({ ...f, who: charId }));
      setActiveSlot(null);
    }
  }

  function handleSelectRoom(roomId: RoomId) {
    if (activeSlot === "where") {
      setFills((f) => ({ ...f, where: roomId }));
      setActiveSlot(null);
    }
  }

  function handleSelectHow(opt: string) {
    if (activeSlot === "how") {
      setFills((f) => ({ ...f, how: opt }));
      setActiveSlot(null);
    }
  }

  function handleFileBrief() {
    if (!activeCase) return;
    // Mark solved only on full 3/3 correct. Filing a wrong/partial
    // brief STILL reveals truth (cozy game framing) but doesn't add to
    // the solved counter.
    const correctness = computeCorrectness(activeCase, fills);
    if (correctness.who && correctness.where && correctness.how) {
      const next = markSolved(activeCase.id);
      setSolved(new Set(next));
    }
    setShowOverlay(true);
  }

  function handleNextCase() {
    const idx = CASES.findIndex((c) => c.id === activeCaseId);
    const next = CASES[(idx + 1) % CASES.length];
    if (next) {
      setActiveCaseId(next.id);
    }
    setShowOverlay(false);
  }

  const allFilled = !!(fills.who && fills.where && fills.how);

  return (
    <>
      <CasePicker
        cases={CASES}
        activeId={activeCaseId}
        solved={solved}
        onPick={setActiveCaseId}
      />

      <CaseBanner
        case={activeCase}
        fills={fills}
        activeSlot={activeSlot}
        onSlotTap={handleSlotTap}
        onSelectHow={handleSelectHow}
        onFileBrief={allFilled ? handleFileBrief : undefined}
      />

      <details className="how-to-play">
        <summary>
          <span className="kbd kbd-small">?</span> HOW TO PLAY
        </summary>
        <div className="how-to-play-body">
          <p className="game-note-rule">
            <span className="kbd kbd-small">HOUSE RULE</span> Every kid here
            is good and honest. You never mark a kid as untrustworthy. You
            mark a specific DETAIL inside a specific story as drifted.
            Younger kids see everything but mix up names and times. Older
            kids are narrow and accurate. The truth is in the gaps between
            what each kid was paying attention to.
          </p>
          <p className="game-note-rule">
            <span className="kbd kbd-small">PRINTED SOURCES</span> Some kids
            cite school newspapers, club newsletters, class announcements,
            or the colony encyclopedia. The KID is honest; the PUBLISHED
            SOURCE may have drifted. All sources are wrong 20 to 50 percent
            of the time. None is reliable enough to trust blindly, none
            unreliable enough to silence. Important details live in the
            noisier sources too.
          </p>
          <p className="game-note-rule">
            <span className="kbd kbd-small">FILLING SLOTS</span> Tap WHO to
            arm the pick-a-kid; then tap a face in the cast below. Tap
            WHERE then tap a room. Tap HOW then pick a failure mode from
            the row that appears. You file the brief when all three slots
            are filled.
          </p>
        </div>
      </details>

      <h2 className="section-h">
        THE CAST
        {activeSlot === "who" && <span className="section-h-prompt"> ← TAP A KID FOR &ldquo;WHO&rdquo;</span>}
        {activeSlot === "where" && <span className="section-h-prompt"> ← TAP A ROOM FOR &ldquo;WHERE&rdquo;</span>}
      </h2>
      <SchoolMap
        hotRooms={activeCase.hot_rooms}
        activeSlot={activeSlot}
        selectedCharacterId={fills.who}
        selectedRoomId={fills.where}
        onSelectCharacter={handleSelectCharacter}
        onSelectRoom={handleSelectRoom}
      />

      <h2 className="section-h">THE PRINTED SOURCES</h2>
      <SourcesGallery />

      {showOverlay && (
        <SolveOverlay
          case={activeCase}
          fills={fills}
          solvedCount={solved.size}
          totalCount={CASES.length}
          onClose={() => setShowOverlay(false)}
          onNext={handleNextCase}
        />
      )}
    </>
  );
}

export function computeCorrectness(
  c: CaseFile,
  f: SlotFills,
): { who: boolean; where: boolean; how: boolean; count: number } {
  const who = f.who === c.truth.who_carried;
  const where = f.where === c.truth.where_it_happened;
  const how = f.how === c.truth.how_correct;
  return { who, where, how, count: [who, where, how].filter(Boolean).length };
}

function CasePicker({
  cases,
  activeId,
  solved,
  onPick,
}: {
  cases: CaseFile[];
  activeId: string;
  solved: Set<string>;
  onPick: (id: string) => void;
}) {
  return (
    <section className="case-picker" aria-label="pick a case">
      <div className="case-picker-head">
        <span className="kbd kbd-small">{solved.size}/{cases.length} SOLVED</span>
        <span>swipe or tap</span>
      </div>
      <div className="case-picker-scroll">
        {cases.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`case-card ${c.id === activeId ? "on" : ""} ${
              solved.has(c.id) ? "solved" : ""
            }`}
            onClick={() => onPick(c.id)}
            aria-pressed={c.id === activeId}
          >
            <FaceTile id={c.client_id} size={36} />
            <div className="case-card-body">
              <div className="case-card-num">{c.codename}</div>
              <div className="case-card-title">{c.subtitle}</div>
              <div className="case-card-meta">
                {c.witnesses.length} witnesses · {c.articles.length} articles
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
