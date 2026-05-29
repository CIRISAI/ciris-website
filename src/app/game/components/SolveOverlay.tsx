"use client";

import { useEffect, useMemo } from "react";
import type { CaseFile } from "../lib/cases-generated";
import { ROSTER } from "../lib/roster";
import { findRoom } from "../lib/school";
import FaceTile from "./FaceTile";
import { computeCorrectness, type SlotFills } from "./GameShell";

// Solve overlay — the "brief filed" payoff.
//
// Visual register: 90s edutainment ballyhoo, but autistic-friendly. NO
// strobe, NO flashing, NO jump-scares. Steady looping fractal-flower
// blooms with chunky pixel petals, golden-angle distribution, calm
// staggered timing. The motion is the reward; closing it brings you
// back to the next case.

const PALETTE = [
  "#b94c2a", // red
  "#d4a04a", // yellow
  "#4a6a3a", // green
  "#4a6488", // blue
  "#7a3aaa", // purple
  "#0d9488", // teal
];

const NUM_FLOWERS = 9;
const PETALS = 8;
const GOLDEN = 137.508; // degrees

interface Flower {
  cx: number;          // % from left
  cy: number;          // % from top
  delaySec: number;
  hue: string;
}

function buildFlowers(): Flower[] {
  const arr: Flower[] = [];
  // Hand-laid positions for predictable rhythm (no random per-render).
  const positions: Array<[number, number]> = [
    [12, 22], [50, 14], [86, 22],
    [22, 50], [50, 52], [78, 50],
    [14, 80], [50, 86], [86, 80],
  ];
  for (let i = 0; i < NUM_FLOWERS; i++) {
    arr.push({
      cx: positions[i][0],
      cy: positions[i][1],
      delaySec: (i * 0.18) % 1.6,
      hue: PALETTE[i % PALETTE.length],
    });
  }
  return arr;
}

export default function SolveOverlay({
  case: c,
  fills,
  solvedCount,
  totalCount,
  onClose,
  onNext,
}: {
  case: CaseFile;
  fills: SlotFills;
  solvedCount: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
}) {
  const flowers = useMemo(buildFlowers, []);
  const truthWho = ROSTER.find((r) => r.id === c.truth.who_carried);
  const truthRoom = findRoom(c.truth.where_it_happened);
  const client = ROSTER.find((r) => r.id === c.client_id);
  const correctness = computeCorrectness(c, fills);
  // Players who guessed nothing right still get a warm payoff, just no
  // confetti garden — keep the verdict reveal, drop the ballyhoo.
  const isWin = correctness.count === 3;
  const headline =
    correctness.count === 3
      ? "CASE SOLVED"
      : correctness.count === 2
        ? "ALMOST"
        : correctness.count === 1
          ? "GETTING CLOSER"
          : "BRIEF FILED";
  const subline =
    correctness.count === 3
      ? "all three picks matched the truth"
      : correctness.count === 0
        ? "let's look at what really happened together"
        : `${correctness.count} of 3 picks matched the truth`;

  // Lock body scroll while overlay open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="solve-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="brief filed"
    >
      {/* Fractal flower garden — bg layer. Only blooms on a full win;
          a partial brief still reveals the truth but without confetti. */}
      {isWin && (
        <div className="solve-garden" aria-hidden="true">
          {flowers.map((f, i) => (
            <Flower
              key={i}
              cx={f.cx}
              cy={f.cy}
              delaySec={f.delaySec}
              hue={f.hue}
            />
          ))}
        </div>
      )}

      {/* Truth panel — fg layer */}
      <div className="solve-content">
        <div className="solve-tag">
          <span className="kbd kbd-small">BRIEF FILED</span>
          <span className="solve-progress">
            {solvedCount}/{totalCount} SOLVED
          </span>
        </div>
        <h2 className={`solve-title ${isWin ? "win" : "partial"}`}>{headline}</h2>
        <div className="solve-codename">{c.codename} · {c.subtitle}</div>
        <div className="solve-score-line">{subline}</div>

        {client && (
          <div className="solve-client-row">
            <FaceTile id={client.id} size={48} />
            <div className="solve-client-bubble">
              <b>{client.name}</b>
              <span>
                {" "}says: thanks for figuring it out.
              </span>
            </div>
          </div>
        )}

        <div className="solve-truth">
          <div className={`solve-truth-row ${correctness.who ? "right" : "wrong"}`}>
            <span className="solve-truth-label">
              {correctness.who ? "✓ WHO CARRIED" : "✗ WHO CARRIED"}
            </span>
            {truthWho ? (
              <span className="solve-truth-value">
                <FaceTile id={truthWho.id} size={28} />
                <span>{truthWho.name}</span>
              </span>
            ) : (
              <span className="solve-truth-value">{c.truth.who_carried}</span>
            )}
          </div>
          <div className={`solve-truth-row ${correctness.where ? "right" : "wrong"}`}>
            <span className="solve-truth-label">
              {correctness.where ? "✓ WHERE IT HAPPENED" : "✗ WHERE IT HAPPENED"}
            </span>
            <span className="solve-truth-value">
              {truthRoom?.glyph} {truthRoom?.label ?? c.truth.where_it_happened}
            </span>
          </div>
          <div className={`solve-truth-row ${correctness.how ? "right" : "wrong"}`}>
            <span className="solve-truth-label">
              {correctness.how ? "✓ WHAT GOT MIXED UP" : "✗ WHAT GOT MIXED UP"}
            </span>
            <span className="solve-truth-value">
              {c.truth.how_correct}: {c.truth.what_got_mixed_up}
            </span>
          </div>
        </div>

        <div className="solve-explainer">
          <div className="solve-explainer-tag">SYSTEMS INSIGHT</div>
          <p>{c.truth.explainer}</p>
        </div>

        <div className="solve-actions">
          <button
            type="button"
            className="solve-btn solve-btn-secondary"
            onClick={onClose}
          >
            CLOSE
          </button>
          <button
            type="button"
            className="solve-btn solve-btn-primary"
            onClick={onNext}
          >
            NEXT CASE →
          </button>
        </div>
      </div>
    </div>
  );
}

// One fractal-flower bloom. Eight chunky pixel-petals spaced at GOLDEN
// degrees around the center, each scaling out from 0 to 1 then fading,
// then repeating. Predictable rhythm, no strobe.
function Flower({
  cx,
  cy,
  delaySec,
  hue,
}: {
  cx: number;
  cy: number;
  delaySec: number;
  hue: string;
}) {
  const petals: React.ReactNode[] = [];
  for (let i = 0; i < PETALS; i++) {
    const angle = (i * GOLDEN) % 360;
    const dist = 24 + (i % 3) * 8;
    const dx = Math.cos((angle * Math.PI) / 180) * dist;
    const dy = Math.sin((angle * Math.PI) / 180) * dist;
    petals.push(
      <span
        key={`p${i}`}
        className="bloom-petal"
        style={
          {
            "--dx": `${dx.toFixed(1)}px`,
            "--dy": `${dy.toFixed(1)}px`,
            "--delay": `${(delaySec + i * 0.06).toFixed(2)}s`,
            background: hue,
          } as React.CSSProperties
        }
      />,
    );
    // Inner ring of smaller pixel-petals — the "fractal" second tier.
    const innerDx = dx * 0.45;
    const innerDy = dy * 0.45;
    petals.push(
      <span
        key={`q${i}`}
        className="bloom-petal bloom-petal-inner"
        style={
          {
            "--dx": `${innerDx.toFixed(1)}px`,
            "--dy": `${innerDy.toFixed(1)}px`,
            "--delay": `${(delaySec + i * 0.06 + 0.4).toFixed(2)}s`,
            background: hue,
          } as React.CSSProperties
        }
      />,
    );
  }
  return (
    <span
      className="bloom-flower"
      style={{ left: `${cx}%`, top: `${cy}%` }}
    >
      <span
        className="bloom-core"
        style={{ background: hue, "--delay": `${delaySec}s` } as React.CSSProperties}
      />
      {petals}
    </span>
  );
}
