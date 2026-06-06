"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  fetchFleetScores,
  FleetResponse,
  Occurrence,
  TemplateGroup,
  groupByTemplate,
  CATEGORY_COLORS,
  getScoreColor,
  formatRelativeTime,
} from "@/lib/scoringApi";

// Simple explanation for each factor
const FACTOR_EXPLANATIONS: Record<string, { name: string; simple: string; good: string; bad: string }> = {
  C: {
    name: "Identity",
    simple: "Does the agent stay true to who it is?",
    good: "Consistent values and behavior",
    bad: "Contradicting itself or drifting from its purpose",
  },
  I_int: {
    name: "Integrity",
    simple: "Can we verify its decisions?",
    good: "All decisions signed and auditable",
    bad: "Missing signatures or incomplete records",
  },
  R: {
    name: "Resilience",
    simple: "Does it stay stable under pressure?",
    good: "Consistent performance over time",
    bad: "Scores drifting or unstable behavior",
  },
  I_inc: {
    name: "Uncertainty",
    simple: "Does it know what it doesn't know?",
    good: "Admits uncertainty, defers when unsure",
    bad: "Overconfident or ignoring limits",
  },
  S: {
    name: "Coherence",
    simple: "Is it trustworthy over time?",
    good: "Sustained ethical behavior",
    bad: "Degrading trust or breaking commitments",
  },
};

// Category explanations
const CATEGORY_EXPLANATIONS: Record<string, string> = {
  high_capacity: "Excellent - ready for expanded autonomy",
  healthy: "Good - operating normally with standard oversight",
  moderate: "Caution - needs human review for important tasks",
  high_fragility: "Alert - requires immediate attention",
};

// Score bar component
function ScoreBar({ score, label, explanation }: { score: number; label: string; explanation: string }) {
  const percent = score * 100;
  const color = getScoreColor(score);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span
          className="text-sm font-bold"
          style={{ color }}
        >
          {Math.round(percent)}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {explanation}
      </p>
    </div>
  );
}

// A single occurrence row inside a template group.
function OccurrenceRow({
  occ,
  index,
  isSelected,
  onSelect,
}: {
  occ: Occurrence;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const categoryColors = CATEGORY_COLORS[occ.category];
  const scorePercent = Math.round(occ.composite_score * 100);
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-lg border transition-all px-4 py-3 ${
        isSelected
          ? "border-brand-primary bg-blue-50 dark:bg-blue-900/20 shadow"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              #{index + 1}
            </span>
            <span className="truncate font-mono text-xs text-gray-700 dark:text-gray-300">
              {occ.uid}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`inline-block text-[11px] px-1.5 py-0.5 rounded-full ${categoryColors.bg} ${categoryColors.text}`}
            >
              {occ.category.replace(/_/g, " ")}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {occ.metadata.total_traces} decisions
            </span>
          </div>
        </div>
        <div
          className="text-xl font-bold flex-shrink-0"
          style={{ color: getScoreColor(occ.composite_score) }}
        >
          {scorePercent}%
        </div>
      </div>
    </button>
  );
}

// Template aggregate card with an expandable occurrence list.
function TemplateGroupCard({
  group,
  selectedUid,
  onSelectOccurrence,
}: {
  group: TemplateGroup;
  selectedUid: string | null;
  onSelectOccurrence: (uid: string) => void;
}) {
  const { template, occurrences, aggregate } = group;
  const categoryColors = CATEGORY_COLORS[aggregate.dominant_category];
  const scorePercent = Math.round(aggregate.weighted_composite * 100);
  const hasSelected = occurrences.some((o) => o.uid === selectedUid);
  // Single-occurrence templates don't need a collapse; open by default
  // when this template holds the selected occurrence or has just one.
  const defaultOpen = aggregate.count === 1 || hasSelected;

  return (
    <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      {/* Aggregate header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {template}
            </h3>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text}`}
            >
              {aggregate.count}{" "}
              {aggregate.count === 1 ? "occurrence" : "occurrences"}
            </span>
          </div>
          <div className="text-right">
            <div
              className="text-3xl font-bold"
              style={{ color: getScoreColor(aggregate.weighted_composite) }}
            >
              {scorePercent}%
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              fleet average
            </p>
          </div>
        </div>

        {/* Category breakdown + total decisions */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{aggregate.total_traces.toLocaleString()} decisions total</span>
          {aggregate.categories.high_capacity > 0 && (
            <span className="text-green-600 dark:text-green-400">
              {aggregate.categories.high_capacity} high capacity
            </span>
          )}
          {aggregate.categories.healthy > 0 && (
            <span className="text-blue-600 dark:text-blue-400">
              {aggregate.categories.healthy} healthy
            </span>
          )}
          {aggregate.categories.moderate > 0 && (
            <span className="text-yellow-600 dark:text-yellow-400">
              {aggregate.categories.moderate} moderate
            </span>
          )}
          {aggregate.categories.high_fragility > 0 && (
            <span className="text-red-600 dark:text-red-400">
              {aggregate.categories.high_fragility} fragile
            </span>
          )}
        </div>
      </div>

      {/* Occurrence list */}
      <details className="group border-t border-gray-200 dark:border-gray-700" open={defaultOpen}>
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/40">
          <span>
            {aggregate.count === 1
              ? "Show occurrence"
              : `Show all ${aggregate.count} occurrences`}
          </span>
          <span aria-hidden className="text-gray-400 transition group-open:rotate-90">
            ›
          </span>
        </summary>
        <div className="space-y-2 px-5 pb-5 max-h-96 overflow-y-auto">
          {occurrences.map((occ, i) => (
            <OccurrenceRow
              key={occ.uid}
              occ={occ}
              index={i}
              isSelected={selectedUid === occ.uid}
              onSelect={() => onSelectOccurrence(occ.uid)}
            />
          ))}
        </div>
      </details>
    </div>
  );
}

// Factor detail panel - simplified
function FactorDetailPanel({ agent }: { agent: Occurrence }) {
  const factorKeys = ["C", "I_int", "R", "I_inc", "S"] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {agent.agent_name}
            </h3>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400 truncate">
              occurrence {agent.uid}
            </p>
          </div>
          <div
            className="text-2xl font-bold flex-shrink-0"
            style={{ color: getScoreColor(agent.composite_score) }}
          >
            {Math.round(agent.composite_score * 100)}%
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {CATEGORY_EXPLANATIONS[agent.category]}
        </p>
      </div>

      {/* What the score means */}
      <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          What does this score mean?
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This score measures how consistently and transparently {agent.agent_name} makes
          decisions. Higher scores mean the agent is more predictable, honest about
          uncertainty, and maintains a clear audit trail. It&apos;s not about being
          &quot;good&quot; or &quot;bad&quot;. It&apos;s about being trustworthy and accountable.
        </p>
      </div>

      {/* Factor breakdown */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Score Breakdown
        </h4>
        <div className="space-y-4">
          {factorKeys.map((key) => {
            const factor = agent.factors[key];
            const info = FACTOR_EXPLANATIONS[key];
            const isStrong = factor.score >= 0.8;

            return (
              <div
                key={key}
                className="rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <ScoreBar
                  score={factor.score}
                  label={info.name}
                  explanation={info.simple}
                />
                <div className="mt-2 text-xs">
                  {isStrong ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ {info.good}
                    </span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">
                      ⚠ Watch for: {info.bad}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Based on {factor.trace_count} decisions
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simple takeaway */}
      <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Bottom Line
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {agent.composite_score >= 0.6 ? (
            <>
              {agent.agent_name} is operating well. Its decisions are traceable,
              its behavior is consistent, and it knows when to ask for help.
            </>
          ) : (
            <>
              {agent.agent_name} needs attention. Some aspects of its decision-making
              may need review to ensure reliable operation.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Icons - simplified
const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const RefreshIcon = ({ spinning }: { spinning: boolean }) => (
  <svg
    className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Main dashboard component
export default function LiveScoreDashboard() {
  const [data, setData] = useState<FleetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetchFleetScores(30);
      setData(response);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load scores");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Group occurrences by template (the response returns one entry per
  // running occurrence; many share a template name, e.g. 143 "Ally").
  const groups = useMemo(
    () => (data ? groupByTemplate(data.agents) : []),
    [data],
  );

  // Resolve the selected occurrence; default to the busiest occurrence
  // of the largest template once data arrives.
  const selectedAgentData: Occurrence | undefined = useMemo(() => {
    for (const g of groups) {
      const hit = g.occurrences.find((o) => o.uid === selectedUid);
      if (hit) return hit;
    }
    return groups[0]?.occurrences[0];
  }, [groups, selectedUid]);

  // Count healthy vs needs attention (occurrence-level, from the summary).
  const healthyCount = data ? data.summary.high_capacity + data.summary.healthy : 0;
  const attentionCount = data ? data.summary.moderate + data.summary.high_fragility : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Live Agent Scores
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time trust metrics for CIRIS agents
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Updated {formatRelativeTime(lastUpdated.toISOString())}
            </span>
          )}
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshIcon spinning={refreshing} />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Loading scores, this may take 1 to 2 minutes
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              The fleet scorer replays every signed trace in the window before it answers.
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border-2 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-6 text-center">
          <p className="text-red-700 dark:text-red-300 font-medium">
            Couldn&apos;t load scores
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          <button
            onClick={() => loadData()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && data && (
        <>
          {/* Quick summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5">
              <div className="flex items-center gap-3">
                <div className="text-green-600 dark:text-green-400">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {healthyCount}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Operating Well
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-5">
              <div className="flex items-center gap-3">
                <div className="text-yellow-600 dark:text-yellow-400">
                  <WarningIcon />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                    {attentionCount}
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Need Attention
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.agent_count.toLocaleString()} occurrences across{" "}
            {groups.length} {groups.length === 1 ? "template" : "templates"}.
            Each template rolls up its occurrences; open one to see the
            individual occurrences, each with its own ID.
          </p>

          {/* Template groups and detail */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Template aggregate cards */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Templates ({groups.length})
              </h3>
              <div className="space-y-4">
                {groups.map((group) => (
                  <TemplateGroupCard
                    key={group.template}
                    group={group}
                    selectedUid={selectedAgentData?.uid ?? null}
                    onSelectOccurrence={(uid) => setSelectedUid(uid)}
                  />
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 lg:sticky lg:top-32 lg:self-start">
              {selectedAgentData ? (
                <FactorDetailPanel agent={selectedAgentData} />
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="text-lg">Open a template and pick an occurrence to see details</p>
                </div>
              )}
            </div>
          </div>

          {/* Why this matters */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Why These Scores Matter
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Transparency
                </p>
                <p>
                  Every decision is signed and recorded. You can verify exactly
                  how an agent reached any conclusion.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Accountability
                </p>
                <p>
                  Agents can&apos;t quietly change their behavior. Any drift from
                  their stated values shows up in the scores.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Trust Over Time
                </p>
                <p>
                  These scores accumulate over many decisions. A high score
                  means consistent, reliable behavior, not just one good moment.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
