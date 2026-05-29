"use client";

import { useEffect, useState } from "react";
import { CASES, type CaseFile } from "../lib/cases-generated";
import { loadSolved, markSolved } from "../lib/progress";
import CaseBanner from "./CaseBanner";
import SchoolMap from "./SchoolMap";
import SourcesGallery from "./SourcesGallery";
import SolveOverlay from "./SolveOverlay";
import FaceTile from "./FaceTile";

export default function GameShell() {
  const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0]?.id ?? "");
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [showOverlay, setShowOverlay] = useState(false);
  const activeCase = CASES.find((c) => c.id === activeCaseId) ?? CASES[0];

  useEffect(() => {
    setSolved(loadSolved());
  }, []);

  function handleFileBrief() {
    if (!activeCase) return;
    const next = markSolved(activeCase.id);
    setSolved(new Set(next));
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

  return (
    <>
      <CasePicker
        cases={CASES}
        activeId={activeCaseId}
        solved={solved}
        onPick={setActiveCaseId}
      />

      <CaseBanner case={activeCase} onFileBrief={handleFileBrief} />

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
            <span className="kbd kbd-small">WEAK POOL</span> If you trust
            only one gossipy paper and a clutch of year-1s who were doing
            hydroponics during the comms-tower incident, the game tells you
            so. Build out your roster. Pin a kid whose attention domain
            overlaps the case.
          </p>
        </div>
      </details>

      <h2 className="section-h">THE CAST</h2>
      <SchoolMap hotRooms={activeCase.hot_rooms} />

      <h2 className="section-h">THE PRINTED SOURCES</h2>
      <SourcesGallery />

      {showOverlay && (
        <SolveOverlay
          case={activeCase}
          solvedCount={solved.size}
          totalCount={CASES.length}
          onClose={() => setShowOverlay(false)}
          onNext={handleNextCase}
        />
      )}
    </>
  );
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
