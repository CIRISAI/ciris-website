"use client";

import { useMemo, useState } from "react";
import {
  NEWSPAPERS,
  CLUB_NEWSLETTERS,
  CLASS_ANNOUNCEMENTS,
  ENCYCLOPEDIA,
  type Publication,
} from "../lib/publications";
import type { CaseFile, CaseArticle } from "../lib/cases-generated";

type Tier = "all" | "newspaper" | "club_newsletter" | "class_announcement";

const TIER_LABELS: Record<Tier, string> = {
  all: "ALL",
  newspaper: "PAPERS",
  club_newsletter: "CLUBS",
  class_announcement: "CLASSES",
};

export default function SourcesGallery({
  activeCase,
}: {
  activeCase?: CaseFile | null;
}) {
  const [tier, setTier] = useState<Tier>("newspaper");
  const [selected, setSelected] = useState<string | null>(null);
  const all: Publication[] = [
    ...NEWSPAPERS,
    ...CLUB_NEWSLETTERS,
    ...CLASS_ANNOUNCEMENTS,
    ENCYCLOPEDIA,
  ];
  // Sources cited by the active case's articles + opening clue.
  const caseSourceArticles = useMemo(() => {
    const m = new Map<string, CaseArticle[]>();
    if (activeCase) {
      for (const a of activeCase.articles) {
        const list = m.get(a.source_id) ?? [];
        list.push(a);
        m.set(a.source_id, list);
      }
    }
    return m;
  }, [activeCase]);
  const openingClueSource = activeCase?.opening_clue.source_id ?? null;
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
            citedInCase={caseSourceArticles.has(p.id)}
            isOpeningClue={openingClueSource === p.id}
            onClick={() =>
              setSelected(selected === p.id ? null : p.id)
            }
          />
        ))}
      </div>

      {sel && (
        <SourcePeek
          pub={sel}
          articles={caseSourceArticles.get(sel.id) ?? []}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function SourceTile({
  pub,
  selected,
  citedInCase,
  isOpeningClue,
  onClick,
}: {
  pub: Publication;
  selected: boolean;
  citedInCase?: boolean;
  isOpeningClue?: boolean;
  onClick: () => void;
}) {
  // Color-grade the tile background by drift rate. Low drift = warm green;
  // high drift = warm red. Never a "bad" tile, just a noisier one.
  const driftFrac = (pub.drift_rate - 0.20) / 0.30; // 0..1 across the 20-50% band
  const tier = pub.tier;
  const tag = isOpeningClue ? "CLUE" : citedInCase ? "CITED" : null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`source-tile ${selected ? "selected" : ""} ${
        citedInCase ? "cited" : ""
      } ${isOpeningClue ? "opening-clue" : ""}`}
      title={pub.name + (citedInCase ? " · CITED IN CASE" : "")}
      data-tier={tier}
    >
      {tag && <span className="source-tile-tag">{tag}</span>}
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

function SourcePeek({
  pub,
  articles,
  onClose,
}: {
  pub: Publication;
  articles: CaseArticle[];
  onClose: () => void;
}) {
  return (
    <div className="source-peek">
      <div className="source-peek-head">
        <div className="source-peek-masthead">{pub.masthead}</div>
        <div className="source-peek-body">
          <div className="source-peek-name">{pub.name}</div>
          <div className="source-peek-tag">{pub.tagline}</div>
          <div className="source-peek-meta">
            drift rate <DriftBar rate={pub.drift_rate} /> ·{" "}
            {Math.round(pub.drift_rate * 100)}%
          </div>
          <div className="source-peek-meta">
            focus: {pub.focus_domains.join(" · ")}
          </div>
          {pub.editorial_note && (
            <p className="source-peek-note">{pub.editorial_note}</p>
          )}
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
      {articles.length > 0 && (
        <div className="source-peek-articles">
          <div className="source-peek-articles-head">
            <span className="kbd kbd-small">{articles.length} ARTICLE{articles.length === 1 ? "" : "S"}</span>
            <span>this source printed about the case</span>
          </div>
          <ul className="source-peek-article-list">
            {articles.map((a) => (
              <li key={a.id} className="source-peek-article">
                <div className="source-peek-article-head">
                  {a.byline && (
                    <span className="source-peek-article-byline">
                      {a.byline}
                    </span>
                  )}
                  <div className="source-peek-article-headline">
                    {a.headline}
                  </div>
                </div>
                <p className="source-peek-article-body">{a.body}</p>
                <p className="source-peek-article-drift">
                  <span className="kbd kbd-small">!</span> {a.drift_notes}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
