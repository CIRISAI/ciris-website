"use client";

import { useState } from "react";
import { CASE_OF_THE_DAY } from "../lib/case-of-the-day";
import FaceTile from "./FaceTile";

export default function CaseBanner() {
  const c = CASE_OF_THE_DAY;
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const lockedCount = Object.values(locked).filter(Boolean).length;
  const totalSlots = c.slots.length;

  return (
    <section className="case-banner" aria-label="today's case">
      <div className="case-status-row">
        <span className="case-pulse">●</span>
        <span className="case-status-text">{c.status_chip}</span>
        <span className="case-counter">
          {lockedCount}/{totalSlots} LOCKED
        </span>
      </div>

      <div className="case-headline">
        <div className="case-codename">{c.codename}</div>
        <div className="case-subtitle">{c.subtitle}</div>
      </div>

      <div className="case-client">
        <FaceTile id={c.client_id} size={56} />
        <div className="case-bubble">
          <div className="case-bubble-tail" aria-hidden="true" />
          <div className="case-bubble-meta">
            <b>{c.client_name}</b> · {c.client_year}
          </div>
          <p className="case-bubble-quote">&ldquo;{c.client_quote}&rdquo;</p>
        </div>
      </div>

      <div className="case-slots">
        {c.slots.map((slot) => {
          const isLocked = !!locked[slot.id];
          return (
            <button
              key={slot.id}
              type="button"
              className={`case-slot ${isLocked ? "locked" : ""}`}
              onClick={() =>
                setLocked((s) => ({ ...s, [slot.id]: !s[slot.id] }))
              }
              aria-pressed={isLocked}
            >
              <div className="case-slot-tag">{slot.label}</div>
              <div className="case-slot-state">
                {isLocked ? "✓ LOCKED" : slot.hint}
              </div>
            </button>
          );
        })}
      </div>

      <div className="case-clue">
        <div className="case-clue-label">
          <span className="kbd kbd-small">CLUE</span>
          <span>{c.opening_clue.source_label}</span>
        </div>
        <p className="case-clue-line">&ldquo;{c.opening_clue.line}&rdquo;</p>
        <p className="case-clue-hint">
          <span className="kbd kbd-small">!</span>{" "}
          {c.opening_clue.contradiction_hint}
        </p>
      </div>

      <details className="case-framing-toggle">
        <summary>
          <span className="kbd kbd-small">+</span> CASE BRIEFING
        </summary>
        <p>{c.framing_short}</p>
      </details>
    </section>
  );
}
