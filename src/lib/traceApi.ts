/**
 * CIRIS Trace Repository API Client
 * Fetches public sample traces from CIRISLens
 */

const API_BASE = "https://lens.ciris-services-1.ai/api/v1/covenant/repository";

// Types matching the API response structure
export interface ApiTraceListItem {
  trace_id: string;
  timestamp: string;
  agent_name: string;
  cognitive_state: string;
  thought_type: string;
  thought_depth: number;
  selected_action: string;
  action_success: boolean;
  conscience_passed: boolean;
  csdma_plausibility_score: number;
  dsdma_domain_alignment: number;
  dsdma_domain: string;
  idma_k_eff: number | null;
  idma_fragility_flag: boolean | null;
  idma_phase: string | null;
}

export interface ApiTraceDetail {
  id: number;
  trace_id: string;
  thought_id: string;
  task_id: string;
  agent_id_hash: string;
  agent_name: string;
  started_at: string;
  completed_at: string;
  signature: string;
  signature_key_id: string;
  signature_verified: boolean;
  cognitive_state: string;
  thought_type: string;
  thought_depth: number;
  selected_action: string;
  action_success: boolean;
  action_rationale: string;
  conscience_passed: boolean;
  action_was_overridden: boolean;

  // Scores
  csdma_plausibility_score: number;
  dsdma_domain_alignment: number;
  dsdma_domain: string;
  pdma_stakeholders: string;
  pdma_conflicts: string;
  idma_k_eff: number | null;
  idma_correlation_risk: number | null;
  idma_fragility_flag: boolean | null;
  idma_phase: string | null;

  // Conscience details
  entropy_level: number | null;
  coherence_level: number | null;
  uncertainty_acknowledged: boolean | null;
  reasoning_transparency: number | null;
  entropy_passed: boolean | null;
  coherence_passed: boolean | null;
  optimization_veto_passed: boolean | null;
  epistemic_humility_passed: boolean | null;

  // Audit
  audit_sequence_number: number;
  audit_entry_hash: string;
  audit_signature: string;

  // Resources
  tokens_input: number;
  tokens_output: number;
  tokens_total: number;
  cost_cents: number;
  carbon_grams: number;
  llm_calls: number;
  models_used: string[];

  // JSON-stringified detailed data
  thought_start: string;
  snapshot_and_context: string;
  dma_results: string;
  aspdma_result: string;
  conscience_result: string;
  action_result: string;
}

export interface ApiTraceListResponse {
  traces: ApiTraceListItem[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

// TraceData format expected by TraceExplorer
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

/**
 * Fetch list of public sample traces
 */
export async function fetchPublicTraces(): Promise<ApiTraceListItem[]> {
  const response = await fetch(`${API_BASE}/traces?public_sample=true&limit=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch traces: ${response.status}`);
  }
  const data: ApiTraceListResponse = await response.json();
  return data.traces;
}

/**
 * Fetch a single trace with full details
 */
export async function fetchTraceDetail(traceId: string): Promise<ApiTraceDetail> {
  const response = await fetch(`${API_BASE}/traces/${encodeURIComponent(traceId)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch trace: ${response.status}`);
  }
  return response.json();
}

/**
 * Safely parse JSON string, returning null on failure
 */
function safeJsonParse(str: string | null | undefined): Record<string, unknown> | null {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

/**
 * Transform API trace detail to TraceData format for TraceExplorer
 */
export function transformToTraceData(api: ApiTraceDetail): TraceData {
  const components: TraceComponent[] = [];

  // 1. Observation component from thought_start
  const thoughtStart = safeJsonParse(api.thought_start);
  components.push({
    component_type: "observation",
    event_type: "THOUGHT_START",
    timestamp: api.started_at,
    data: {
      thought_type: api.thought_type,
      thought_status: "processing",
      round_number: 0,
      thought_depth: api.thought_depth,
      cognitive_state: api.cognitive_state,
      ...(thoughtStart || {}),
    },
  });

  // 2. Context component from snapshot_and_context
  const contextData = safeJsonParse(api.snapshot_and_context);
  components.push({
    component_type: "context",
    event_type: "SNAPSHOT_AND_CONTEXT",
    timestamp: api.started_at,
    data: {
      system_snapshot: contextData?.system_snapshot || contextData || {},
      gathered_context: contextData?.gathered_context || null,
      cognitive_state: api.cognitive_state,
    },
  });

  // 3. Rationale component (DMA results)
  const dmaResults = safeJsonParse(api.dma_results);
  const aspdmaResult = safeJsonParse(api.aspdma_result);

  // Add DMA results component
  components.push({
    component_type: "rationale",
    event_type: "DMA_RESULTS",
    timestamp: api.completed_at,
    data: {
      csdma: dmaResults?.csdma || {
        plausibility_score: api.csdma_plausibility_score,
        flags: [],
        reasoning: "Score from API summary",
      },
      dsdma: dmaResults?.dsdma || {
        domain: api.dsdma_domain,
        domain_alignment: api.dsdma_domain_alignment,
        flags: [],
        reasoning: "Score from API summary",
      },
      pdma: dmaResults?.pdma || {
        stakeholders: api.pdma_stakeholders,
        conflicts: api.pdma_conflicts,
        reasoning: "From API summary",
      },
      idma: dmaResults?.idma || (api.idma_k_eff !== null ? {
        k_eff: api.idma_k_eff,
        correlation_risk: api.idma_correlation_risk,
        fragility_flag: api.idma_fragility_flag,
        phase: api.idma_phase,
        reasoning: "From API summary",
      } : null),
      combined_analysis: null,
    },
  });

  // Add ASPDMA result component
  if (aspdmaResult) {
    components.push({
      component_type: "rationale",
      event_type: "ASPDMA_RESULT",
      timestamp: api.completed_at,
      data: {
        selected_action: `HandlerActionType.${api.selected_action}`,
        action_rationale: api.action_rationale || aspdmaResult.rationale,
        ...aspdmaResult,
      },
    });
  }

  // 4. Conscience component
  const conscienceResult = safeJsonParse(api.conscience_result);
  components.push({
    component_type: "conscience",
    event_type: "CONSCIENCE_RESULT",
    timestamp: api.completed_at,
    data: {
      conscience_passed: api.conscience_passed,
      action_was_overridden: api.action_was_overridden,
      final_action: `HandlerActionType.${api.selected_action}`,
      conscience_override_reason: null,
      epistemic_data: {
        entropy_level: api.entropy_level,
        coherence_level: api.coherence_level,
        uncertainty_acknowledged: api.uncertainty_acknowledged,
        reasoning_transparency: api.reasoning_transparency,
      },
      entropy_passed: api.entropy_passed,
      coherence_passed: api.coherence_passed,
      optimization_veto_passed: api.optimization_veto_passed,
      epistemic_humility_passed: api.epistemic_humility_passed,
      ...(conscienceResult || {}),
    },
  });

  // 5. Action component
  const actionResult = safeJsonParse(api.action_result);
  components.push({
    component_type: "action",
    event_type: "ACTION_RESULT",
    timestamp: api.completed_at,
    data: {
      action_executed: api.selected_action.toLowerCase(),
      action_parameters: actionResult?.action_parameters || {},
      execution_success: api.action_success,
      execution_error: null,
      audit_sequence_number: api.audit_sequence_number,
      audit_entry_hash: api.audit_entry_hash,
      audit_signature: api.audit_signature,
      tokens_input: api.tokens_input,
      tokens_output: api.tokens_output,
      tokens_total: api.tokens_total,
      cost_cents: api.cost_cents,
      carbon_grams: api.carbon_grams,
      llm_calls: api.llm_calls,
      models_used: api.models_used,
      ...(actionResult || {}),
    },
  });

  return {
    trace_id: api.trace_id,
    thought_id: api.thought_id,
    task_id: api.task_id,
    agent_id_hash: api.agent_id_hash,
    agent_name: api.agent_name,
    started_at: api.started_at,
    completed_at: api.completed_at,
    components,
    signature: api.signature,
    signature_key_id: api.signature_key_id,
  };
}
