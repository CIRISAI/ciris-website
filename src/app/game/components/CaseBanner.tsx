"use client";

import type { CaseFile } from "../lib/cases-generated";
import { ROSTER } from "../lib/roster";
import { findRoom } from "../lib/school";
import type { SlotFills, SlotId } from "./GameShell";
import FaceTile from "./FaceTile";

export default function CaseBanner({
  case: c,
  fills,
  activeSlot,
  onSlotTap,
  onSelectHow,
  onFileBrief,
}: {
  case: CaseFile;
  fills: SlotFills;
  activeSlot: SlotId | null;
  onSlotTap: (id: SlotId) => void;
  onSelectHow: (opt: string) => void;
  onFileBrief?: () => void;
}) {
  const client = ROSTER.find((r) => r.id === c.client_id);
  const clientName = client?.name ?? c.client_id;
  const filledCount = [fills.who, fills.where, fills.how].filter(Boolean)
    .length;
  const totalSlots = c.slots.length;

  return (
    <section className="case-banner" aria-label="today's case">
      <div className="case-status-row">
        <span className="case-pulse">●</span>
        <span className="case-status-text">{c.status_chip}</span>
        <span className="case-counter">
          {filledCount}/{totalSlots} FILLED
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
            <b>{clientName}</b> · {c.client_year}
          </div>
          <p className="case-bubble-quote">&ldquo;{c.client_quote}&rdquo;</p>
        </div>
      </div>

      <div className="case-slots">
        {c.slots.map((slot) => {
          const slotKey = slot.id as SlotId;
          const filled = fills[slotKey];
          const isActive = activeSlot === slotKey;
          const display = filled
            ? formatFill(slotKey, filled)
            : isActive
              ? slot.hint.toUpperCase()
              : slot.hint;
          return (
            <button
              key={slot.id}
              type="button"
              className={`case-slot ${filled ? "locked" : ""} ${
                isActive ? "active" : ""
              }`}
              onClick={() => onSlotTap(slotKey)}
              aria-pressed={!!filled}
            >
              <div className="case-slot-tag">{slot.label}</div>
              <div className="case-slot-state">
                {filled ? "✓ " : ""}
                {display}
              </div>
            </button>
          );
        })}
      </div>

      {/* HOW picker — shown inline when WHAT slot is active. */}
      {activeSlot === "how" && (
        <div className="how-picker" aria-label="pick what got mixed up">
          <div className="how-picker-head">
            <span className="kbd kbd-small">PICK ONE</span>
            <span>which kind of mix-up was this?</span>
          </div>
          <div className="how-picker-grid">
            {c.how_options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`how-option ${fills.how === opt ? "on" : ""}`}
                onClick={() => onSelectHow(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

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

      {filledCount === totalSlots && onFileBrief && (
        <button
          type="button"
          className="case-file-btn"
          onClick={onFileBrief}
        >
          FILE BRIEF →
        </button>
      )}
    </section>
  );
}

function formatFill(slot: SlotId, value: string): string {
  if (slot === "who") {
    const ch = ROSTER.find((r) => r.id === value);
    return ch ? ch.name : value;
  }
  if (slot === "where") {
    const r = findRoom(value as Parameters<typeof findRoom>[0]);
    return r ? r.label : value;
  }
  return value;
}
