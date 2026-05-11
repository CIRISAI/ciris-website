/**
 * CIRIS Trace Repository API Client (CIRISPersist v0.5.0)
 *
 * Talks to the lens-side pass-through of CIRISPersist's typed read
 * primitives:
 *   GET /api/v1/accord/repository/traces           -> TraceListPage
 *   GET /api/v1/accord/repository/traces/{id}      -> TraceDetail
 *
 * The list endpoint returns a flat array of trace summaries plus an
 * opaque cursor. Task grouping for the sidebar is derived client-side
 * (one bucket per task_id, sorted by thought_depth).
 */

const API_BASE = "https://lens.ciris-services-1.ai/api/v1/accord/repository";

// ─────────────────────────── Wire types (v0.5.0) ──────────────────────────

export interface TraceSummary {
  trace_id: string;
  thought_id: string;
  task_id: string;
  agent_id_hash: string;
  agent_name: string;
  agent_role: string | null;
  deployment_domain: string | null;
  deployment_type: string | null;
  started_at: string;
  completed_at: string | null;
  trace_level: string;
  schema_version: string;
  signature_verified: boolean;
  cognitive_state: string;
  thought_type: string;
  thought_depth: number;
  csdma_plausibility_score: number | null;
  dsdma_domain_alignment: number | null;
  dsdma_domain: string | null;
  idma_k_eff: number | null;
  idma_correlation_risk: number | null;
  idma_fragility_flag: boolean | null;
  idma_phase: string | null;
  conscience_passed: boolean | null;
  action_was_overridden: boolean;
  entropy_passed: boolean | null;
  coherence_passed: boolean | null;
  optimization_veto_passed: boolean | null;
  epistemic_humility_passed: boolean | null;
  selected_action: string | null;
  action_success: boolean | null;
  llm_calls: number;
  tokens_total: number;
  cost_usd: number;
}

// next_cursor is opaque on the wire — observed shape in v0.5.0 is an
// object {version, last_started_at, last_trace_id}, but FastAPI could
// return anything here. Type as unknown and JSON-stringify when sending
// it back as a query param.
interface TraceListPage {
  items: TraceSummary[];
  next_cursor: unknown | null;
}

interface TraceComponentRow {
  step_point: number | null;
  event_type: string;
  attempt_index: number;
  ts: string;
  payload: Record<string, unknown> | null;
}

interface TraceLlmCallRow {
  [key: string]: unknown;
}

interface TraceEnvelopeRefs {
  signature?: string;
  signature_key_id?: string;
  original_content_hash?: string;
  scrub_signature?: string;
  scrub_key_id?: string;
  scrub_timestamp?: string;
  pii_scrubbed?: boolean;
}

export interface TraceDetail {
  summary: TraceSummary;
  components: TraceComponentRow[];
  llm_calls: TraceLlmCallRow[];
  envelope: TraceEnvelopeRefs;
}

// ────────────────────────── UI-side view models ────────────────────────────

// Backward-compatible alias used by existing UI components.
export type ApiTraceListItem = TraceSummary;

// Task bucket grouping derived client-side from the flat list.
export interface ApiTaskListItem {
  task_id: string;
  initial_observation: string;
  traces: ApiTraceListItem[];
}

// TraceData is the shape TraceExplorer consumes. Kept stable across
// API migrations; the transform below populates it from TraceDetail.
export interface TraceComponent {
  component_type: string;
  event_type: string;
  timestamp?: string;
  data: Record<string, unknown>;
}

export interface TraceData {
  trace_id: string;
  thought_id: string;
  task_id: string;
  agent_id_hash?: string;
  agent_name?: string;
  started_at: string;
  completed_at: string;
  components: TraceComponent[];
  signature?: string;
  signature_key_id?: string;
}

// New v0.5.0 event_type → legacy component_type for color/icon lookup.
// Unknown event_types (e.g. additions in post-2.7.9 schema versions)
// fall through to "other" with neutral styling so the page degrades
// gracefully instead of guessing wrong.
const EVENT_TYPE_TO_COMPONENT_TYPE: Record<string, string> = {
  THOUGHT_START: "observation",
  SNAPSHOT_AND_CONTEXT: "context",
  DMA_RESULTS: "rationale",
  IDMA_RESULT: "rationale",
  ASPDMA_RESULT: "rationale",
  CONSCIENCE_RESULT: "conscience",
  ACTION_RESULT: "action",
};

// LLM_CALL events fire between the reasoning beats above; we filter them
// out of the rendered narrative because their totals already live on the
// summary (llm_calls, tokens_total, cost_usd). The raw rows are still in
// TraceDetail.llm_calls if a future surface wants to enumerate them.
const HIDDEN_EVENT_TYPES = new Set<string>(["LLM_CALL"]);

// ────────────────────────────── Fetchers ──────────────────────────────────

async function fetchTracePage(
  cursor?: string,
  limit = 100,
): Promise<TraceListPage> {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  if (cursor) params.set("cursor", cursor);
  const response = await fetch(`${API_BASE}/traces?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch traces: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch a single page of public traces and group them by task_id for
 * the sidebar buckets. Traces within each bucket are sorted by depth.
 */
export async function fetchPublicTasks(): Promise<ApiTaskListItem[]> {
  const page = await fetchTracePage();
  const byTaskId = new Map<string, ApiTaskListItem>();
  for (const item of page.items) {
    const taskId = item.task_id ?? `standalone-${item.trace_id}`;
    if (!byTaskId.has(taskId)) {
      byTaskId.set(taskId, {
        task_id: taskId,
        // Server-side initial-observation derivation lands in v0.5.1
        // (§C task-grouped listings). Until then, the task_id is the
        // only readable label available without fetching every detail.
        initial_observation: taskId,
        traces: [],
      });
    }
    byTaskId.get(taskId)!.traces.push(item);
  }
  for (const task of byTaskId.values()) {
    task.traces.sort((a, b) => a.thought_depth - b.thought_depth);
  }
  return Array.from(byTaskId.values());
}

/**
 * Flat list of trace summaries (no task grouping).
 */
export async function fetchPublicTraces(): Promise<ApiTraceListItem[]> {
  const page = await fetchTracePage();
  return page.items;
}

/**
 * Fetch a single trace with full component decomposition.
 */
export async function fetchTraceDetail(traceId: string): Promise<TraceDetail> {
  const response = await fetch(
    `${API_BASE}/traces/${encodeURIComponent(traceId)}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch trace: ${response.status}`);
  }
  return response.json();
}

/**
 * Convert TraceDetail to the TraceData shape TraceExplorer consumes.
 * The new API returns typed component rows directly — no JSON-string
 * unwrap dance — so this is near-identity: map event_type to a legacy
 * component_type for color/icon styling and forward the payload.
 */
export function transformToTraceData(detail: TraceDetail): TraceData {
  const { summary, components, envelope } = detail;
  const mappedComponents: TraceComponent[] = components
    .filter((c) => !HIDDEN_EVENT_TYPES.has(c.event_type))
    .map((c) => ({
      component_type: EVENT_TYPE_TO_COMPONENT_TYPE[c.event_type] ?? "other",
      event_type: c.event_type,
      timestamp: c.ts,
      data: c.payload ?? {},
    }));
  return {
    trace_id: summary.trace_id,
    thought_id: summary.thought_id,
    task_id: summary.task_id,
    agent_id_hash: summary.agent_id_hash,
    agent_name: summary.agent_name,
    started_at: summary.started_at,
    completed_at: summary.completed_at ?? summary.started_at,
    components: mappedComponents,
    signature: envelope?.signature,
    signature_key_id: envelope?.signature_key_id,
  };
}
