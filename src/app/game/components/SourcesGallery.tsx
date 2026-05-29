"use client";

import { useState } from "react";
import {
  NEWSPAPERS,
  CLUB_NEWSLETTERS,
  CLASS_ANNOUNCEMENTS,
  ENCYCLOPEDIA,
  type Publication,
} from "../lib/publications";

type Tier = "all" | "newspaper" | "club_newsletter" | "class_announcement";

const TIER_LABELS: Record<Tier, string> = {
  all: "ALL",
  newspaper: "PAPERS",
  club_newsletter: "CLUBS",
  class_announcement: "CLASSES",
};

export default function SourcesGallery() {
  const [tier, setTier] = useState<Tier>("newspaper");
  const [selected, setSelected] = useState<string | null>(null);
  const all: Publication[] = [
    ...NEWSPAPERS,
    ...CLUB_NEWSLETTERS,
    ...CLASS_ANNOUNCEMENTS,
    ENCYCLOPEDIA,
  ];
  const filtered =
    tier === "all" ? all : all.filter((p) => p.tier === tier);
  const sel = selected
    ? all.find((p) => p.id === selected) ?? null
    : null;

  return (
    <section className="sources-gallery" aria-label="published sources">
      <div className="sources-tabs" role="tablist">
        {(Object.keys(TIER_LABELS) as Tier[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tier === t}
            className={`sources-tab ${tier === t ? "on" : ""}`}
            onClick={() => setTier(t)}
          >
            {TIER_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="sources-summary">
        <span className="kbd">{filtered.length} SOURCES</span>
        <span>tap a masthead to inspect drift rate</span>
      </div>

      <div className="sources-grid">
        {filtered.map((p) => (
          <SourceTile
            key={p.id}
            pub={p}
            selected={selected === p.id}
            onClick={() =>
              setSelected(selected === p.id ? null : p.id)
            }
          />
        ))}
      </div>

      {sel && (
        <div className="source-peek">
          <div className="source-peek-masthead">{sel.masthead}</div>
          <div className="source-peek-body">
            <div className="source-peek-name">{sel.name}</div>
            <div className="source-peek-tag">{sel.tagline}</div>
            <div className="source-peek-meta">
              drift rate{" "}
              <DriftBar rate={sel.drift_rate} /> · {Math.round(sel.drift_rate * 100)}%
            </div>
            <div className="source-peek-meta">
              focus: {sel.focus_domains.join(" · ")}
            </div>
            {sel.editorial_note && (
              <p className="source-peek-note">{sel.editorial_note}</p>
            )}
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
    </section>
  );
}

function SourceTile({
  pub,
  selected,
  onClick,
}: {
  pub: Publication;
  selected: boolean;
  onClick: () => void;
}) {
  // Color-grade the tile background by drift rate. Low drift = warm green;
  // high drift = warm red. Never a "bad" tile, just a noisier one.
  const driftFrac = (pub.drift_rate - 0.20) / 0.30; // 0..1 across the 20-50% band
  const tier = pub.tier;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`source-tile ${selected ? "selected" : ""}`}
      title={pub.name}
      data-tier={tier}
    >
      <div className="source-tile-masthead">{pub.masthead}</div>
      <div
        className="source-tile-drift"
        style={{
          background: `linear-gradient(to right, var(--accent-green) ${
            (1 - driftFrac) * 100
          }%, var(--accent-red) ${(1 - driftFrac) * 100}%)`,
        }}
        aria-label={`drift ${Math.round(pub.drift_rate * 100)} percent`}
      />
      <div className="source-tile-tier">{tierShortLabel(tier)}</div>
    </button>
  );
}

function tierShortLabel(t: Publication["tier"]): string {
  switch (t) {
    case "newspaper": return "PAPER";
    case "club_newsletter": return "CLUB";
    case "class_announcement": return "CLASS";
    case "encyclopedia": return "ENCYC";
  }
}

function DriftBar({ rate }: { rate: number }) {
  // 5 segments. Each lit segment = 0.10 drift.
  const lit = Math.round(rate * 10);
  return (
    <span className="drift-bar" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`drift-seg ${i * 2 < lit ? "on" : ""}`}
        />
      ))}
    </span>
  );
}
