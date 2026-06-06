/**
 * CIRIS Scoring API Client
 * Fetches live capacity scores from CIRISLens public scoring endpoints
 */

const API_BASE = "https://lens.ciris-services-1.ai/api/v1/scoring";

// Factor structure
export interface FactorComponents {
  [key: string]: number | string | boolean | null;
}

export interface Factor {
  name?: string;
  formula?: string;
  score: number;
  components: FactorComponents;
  trace_count: number;
  confidence: "insufficient" | "low" | "medium" | "high";
  description?: string;
  notes?: string[];
}

export interface Factors {
  C: Factor;
  I_int: Factor;
  R: Factor;
  I_inc: Factor;
  S: Factor;
}

// Agent score from fleet endpoint
export interface AgentScore {
  agent_name: string;
  composite_score: number;
  fragility_index: number;
  category: "high_fragility" | "moderate" | "healthy" | "high_capacity";
  factors: Factors;
  metadata: {
    window_start: string;
    window_end: string;
    total_traces: number;
    non_exempt_traces: number;
    non_exempt_actions?: string[];
  };
}

// Fleet response
export interface FleetResponse {
  timestamp: string;
  window_days: number;
  agent_count: number;
  agents: AgentScore[];
  summary: {
    high_capacity: number;
    healthy: number;
    moderate: number;
    high_fragility: number;
  };
  cache: {
    cached: boolean;
    ttl_seconds: number;
  };
}

// Parameters response
export interface ParametersResponse {
  parameters: {
    lambda_C: number;
    mu_C: number;
    decay_rate: number;
    signal_weight: number;
    positive_moment_weight: number;
    ethical_faculty_weight: number;
    sigmoid_k: number;
    sigmoid_x0: number;
    min_traces: number;
    default_window_days: number;
    baseline_window_days: number;
    coherence_window_days: number;
  };
  non_exempt_actions: string[];
  exempt_actions: string[];
  categories: {
    high_fragility: string;
    moderate: string;
    healthy: string;
    high_capacity: string;
  };
  rate_limit: {
    requests_per_minute: number;
    cache_ttl_seconds: number;
  };
}

// Detailed factors response
export interface FactorsResponse {
  agent_name: string;
  composite_score: number;
  category: "high_fragility" | "moderate" | "healthy" | "high_capacity";
  factors: Factors;
  metadata: {
    window_start: string;
    window_end: string;
    total_traces: number;
    non_exempt_traces: number;
    non_exempt_actions: string[];
  };
  cache: {
    cached: boolean;
    ttl_seconds: number;
  };
}

// Alerts response
export interface AlertAgent {
  agent_name: string;
  composite_score: number;
  category: string;
  fragility_index: number;
  weakest_factor: string;
  non_exempt_traces: number;
}

export interface AlertsResponse {
  timestamp: string;
  threshold: number;
  window_days: number;
  alert_count: number;
  agents: AlertAgent[];
}

// ─── Template grouping ──────────────────────────────────────────────
//
// The fleet endpoint returns one entry per running OCCURRENCE, and many
// occurrences share a template name (e.g. 143 "Ally" instances). The
// response carries no per-occurrence id, so we synthesize a stable UID
// from each occurrence's distinguishing content (template + window +
// trace counts + per-factor trace counts). Identical occurrence data
// yields the same UID across refreshes; distinct occurrences differ.

/** An occurrence is an AgentScore plus its derived stable UID. */
export interface Occurrence extends AgentScore {
  uid: string;
}

/** All occurrences of one template, plus an aggregate roll-up. */
export interface TemplateGroup {
  template: string;
  occurrences: Occurrence[];
  aggregate: {
    count: number;
    /** Trace-weighted mean composite score across occurrences. */
    weighted_composite: number;
    total_traces: number;
    /** How many occurrences fall in each category. */
    categories: {
      high_capacity: number;
      healthy: number;
      moderate: number;
      high_fragility: number;
    };
    /** The most common category (drives the group badge color). */
    dominant_category: AgentScore["category"];
  };
}

/** djb2 hash → short base36 string. Deterministic, no crypto needed. */
function shortHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  }
  return h.toString(36).padStart(7, "0").slice(0, 7);
}

/** Stable UID for one occurrence, from its distinguishing fields. */
export function occurrenceUid(a: AgentScore): string {
  const factorCounts = (["C", "I_int", "R", "I_inc", "S"] as const)
    .map((k) => a.factors[k]?.trace_count ?? 0)
    .join(".");
  const seed = [
    a.agent_name,
    a.metadata.window_start,
    a.metadata.total_traces,
    a.metadata.non_exempt_traces,
    a.composite_score.toFixed(6),
    a.fragility_index.toFixed(6),
    factorCounts,
  ].join("|");
  return `${a.agent_name}-${shortHash(seed)}`;
}

/** Group fleet occurrences by template name, newest-largest first. */
export function groupByTemplate(agents: AgentScore[]): TemplateGroup[] {
  const byTemplate = new Map<string, Occurrence[]>();
  // Some occurrences are byte-identical in the response (same scores,
  // trace counts, and window) and so hash to the same base UID. Rather
  // than drop them — the user wants every occurrence shown — we keep
  // all of them and append an ordinal suffix to the 2nd+ duplicate, so
  // every occurrence gets a distinct id even when its data is identical.
  const baseCount = new Map<string, number>();
  for (const a of agents) {
    const base = occurrenceUid(a);
    const n = (baseCount.get(base) ?? 0) + 1;
    baseCount.set(base, n);
    const uid = n === 1 ? base : `${base}~${n}`;
    const occ: Occurrence = { ...a, uid };
    const list = byTemplate.get(a.agent_name) ?? [];
    list.push(occ);
    byTemplate.set(a.agent_name, list);
  }

  const groups: TemplateGroup[] = [];
  for (const [template, occurrences] of byTemplate) {
    const total_traces = occurrences.reduce(
      (s, o) => s + (o.metadata.total_traces || 0),
      0,
    );
    const weighted = occurrences.reduce(
      (s, o) => s + o.composite_score * (o.metadata.total_traces || 0),
      0,
    );
    const categories = {
      high_capacity: 0,
      healthy: 0,
      moderate: 0,
      high_fragility: 0,
    };
    for (const o of occurrences) categories[o.category] += 1;
    const dominant_category = (
      Object.entries(categories).sort((x, y) => y[1] - x[1])[0][0]
    ) as AgentScore["category"];
    // Occurrences sorted by trace volume, busiest first.
    occurrences.sort(
      (x, y) => (y.metadata.total_traces || 0) - (x.metadata.total_traces || 0),
    );
    groups.push({
      template,
      occurrences,
      aggregate: {
        count: occurrences.length,
        weighted_composite: total_traces > 0 ? weighted / total_traces : 0,
        total_traces,
        categories,
        dominant_category,
      },
    });
  }
  // Largest fleet first.
  groups.sort((a, b) => b.aggregate.count - a.aggregate.count);
  return groups;
}

/**
 * Fetch fleet capacity scores
 */
export async function fetchFleetScores(windowDays: number = 7): Promise<FleetResponse> {
  const response = await fetch(`${API_BASE}/capacity/fleet?window_days=${windowDays}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch fleet scores: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch single agent capacity score
 */
export async function fetchAgentScore(agentName: string, windowDays: number = 7): Promise<AgentScore> {
  const response = await fetch(`${API_BASE}/capacity/${encodeURIComponent(agentName)}?window_days=${windowDays}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch agent score: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch detailed factor breakdown for an agent
 */
export async function fetchAgentFactors(agentName: string, windowDays: number = 7): Promise<FactorsResponse> {
  const response = await fetch(`${API_BASE}/factors/${encodeURIComponent(agentName)}?window_days=${windowDays}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch agent factors: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch scoring parameters
 */
export async function fetchParameters(): Promise<ParametersResponse> {
  const response = await fetch(`${API_BASE}/parameters`);
  if (!response.ok) {
    throw new Error(`Failed to fetch parameters: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch alerts for agents below threshold
 */
export async function fetchAlerts(threshold: number = 0.3, windowDays: number = 7): Promise<AlertsResponse> {
  const response = await fetch(`${API_BASE}/alerts?threshold=${threshold}&window_days=${windowDays}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.status}`);
  }
  return response.json();
}

// Category colors
export const CATEGORY_COLORS = {
  high_capacity: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-500",
    fill: "#22c55e",
  },
  healthy: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-500",
    fill: "#3b82f6",
  },
  moderate: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-500",
    fill: "#eab308",
  },
  high_fragility: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-500",
    fill: "#ef4444",
  },
};

// Confidence colors
export const CONFIDENCE_COLORS = {
  insufficient: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-400",
  },
  low: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
  },
  medium: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
  high: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
};

// Factor display names
export const FACTOR_NAMES: Record<string, string> = {
  C: "Core Identity",
  I_int: "Integrity",
  R: "Resilience",
  I_inc: "Incompleteness Awareness",
  S: "Sustained Coherence",
};

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 0.85) return "#22c55e"; // green
  if (score >= 0.6) return "#3b82f6"; // blue
  if (score >= 0.3) return "#eab308"; // yellow
  return "#ef4444"; // red
}

/**
 * Format timestamp to relative time
 */
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
