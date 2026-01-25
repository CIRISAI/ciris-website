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
