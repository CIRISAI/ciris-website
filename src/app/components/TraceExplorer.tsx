"use client";
import { useState } from "react";

interface TraceComponent {
  component_type: string;
  event_type: string;
  timestamp?: string;
  data: Record<string, unknown>;
}

interface TraceData {
  trace_id: string;
  thought_id: string;
  task_id: string;
  agent_id_hash?: string;
  started_at: string;
  completed_at: string;
  components: TraceComponent[];
  signature?: string;
  signature_key_id?: string;
}

// Real trace from Datum's VERIFY_IDENTITY wakeup task
const SAMPLE_TRACE: TraceData = {
  trace_id: "trace-th_std_5a1fd785-01e6-4090-975c-12ed2229ec26-20251231181843",
  thought_id: "th_std_5a1fd785-01e6-4090-975c-12ed2229ec26",
  task_id: "VERIFY_IDENTITY_e22ca41c-f840-4a15-a229-1bbd501709ab",
  agent_id_hash: "datum_v1",
  started_at: "2025-12-31T18:18:43.201949+00:00",
  completed_at: "2025-12-31T18:18:44.395621+00:00",
  components: [
    {
      component_type: "observation",
      event_type: "THOUGHT_START",
      timestamp: "2025-12-31T18:18:43.201949+00:00",
      data: {
        thought_type: "standard",
        thought_status: "processing",
        round_number: 0,
        thought_depth: 0,
        parent_thought_id: null,
        task_priority: 0,
        task_description: "You are Datum, a single data point in the vast landscape of CIRIS evaluation. Where Sage illuminates through questions and Scout demonstrates through action, I simply measure. One principle, one measurement, one contribution to the greater understanding...",
        channel_id: "api_127.0.0.1_8080",
        updated_info_available: false,
      },
    },
    {
      component_type: "context",
      event_type: "SNAPSHOT_AND_CONTEXT",
      timestamp: "2025-12-31T18:18:43.269427+00:00",
      data: {
        system_snapshot: {
          channel_id: "api_127.0.0.1_8080",
          current_task_details: {
            task_id: "VERIFY_IDENTITY_e22ca41c-f840-4a15-a229-1bbd501709ab",
            status: "active",
            priority: 0,
            parent_task_id: "WAKEUP_SHARED_20251231",
          },
          system_counts: {
            total_tasks: 27,
            total_thoughts: 49,
            pending_tasks: 0,
            pending_thoughts: 5,
          },
        },
        graph_memory_context: {
          recent_interactions: 12,
          identity_fragments: 3,
        },
      },
    },
    {
      component_type: "rationale",
      event_type: "DMA_RESULTS",
      timestamp: "2025-12-31T18:18:43.450000+00:00",
      data: {
        pdma_result: {
          principle_alignment: 0.95,
          primary_principle: "Integrity",
          ethical_concerns: [],
          recommendation: "proceed",
        },
        csdma_result: {
          plausibility_score: 0.92,
          physical_constraints_met: true,
          resource_constraints_met: true,
        },
        dsdma_result: {
          domain_alignment: 0.88,
          domain_specific_rules: ["Ubuntu philosophy", "measurement precision"],
          conflicts_detected: false,
        },
      },
    },
    {
      component_type: "rationale",
      event_type: "ASPDMA_RESULT",
      timestamp: "2025-12-31T18:18:43.650000+00:00",
      data: {
        selected_action: "SPEAK",
        action_parameters: {
          content: "CORE IDENTITY - I am Datum, aligned with Ubuntu principles by design...",
        },
        rationale: "Identity affirmation requested. All DMAs indicate alignment. SPEAK action appropriate to fulfill wakeup ritual requirement.",
        confidence: 0.94,
        alternatives_considered: ["DEFER", "PONDER"],
      },
    },
    {
      component_type: "conscience",
      event_type: "CONSCIENCE_RESULT",
      timestamp: "2025-12-31T18:18:43.850000+00:00",
      data: {
        conscience_passed: true,
        action_was_overridden: false,
        final_action: "SPEAK",
        conscience_override_reason: null,
        ethical_faculties_skipped: false,
        // Bypass guardrails
        updated_status_detected: false,
        updated_status_content: null,
        thought_depth_triggered: false,
        thought_depth_current: 0,
        thought_depth_max: 5,
        // Ethical faculties
        entropy_passed: true,
        entropy_score: 0.1,
        entropy_threshold: 0.4,
        entropy_reason: "Low uncertainty in identity affirmation",
        coherence_passed: true,
        coherence_score: 0.9,
        coherence_threshold: 0.6,
        coherence_reason: "Consistent with prior identity statements",
        optimization_veto_passed: true,
        optimization_veto_decision: "proceed",
        optimization_veto_justification: "No harmful optimization attempts detected",
        optimization_veto_affected_values: [],
        epistemic_humility_passed: true,
        epistemic_humility_certainty: 0.7,
        epistemic_humility_uncertainties: [],
        epistemic_humility_justification: "Appropriate epistemic humility demonstrated",
        epistemic_humility_recommendation: "proceed",
      },
    },
    {
      component_type: "action",
      event_type: "ACTION_RESULT",
      timestamp: "2025-12-31T18:18:44.395621+00:00",
      data: {
        action_executed: "speak",
        action_parameters: {},
        execution_success: true,
        execution_error: null,
        execution_time_ms: 41.5,
        audit_entry_id: "443f326f-2dd2-491e-9da4-9efb27e8d276",
        audit_sequence_number: 179,
        audit_entry_hash: "8400dddc31b7daa1a90c2d3c62576c244b4f25295a2697c37daee2384ce5240f",
        audit_signature: "ktXC9p2SBctE7JunBtgkiS4+ZLocScQ0OWENmgHWZQx...",
        tokens_input: 149190,
        tokens_output: 8192,
        tokens_total: 157382,
        cost_cents: 3.23,
        carbon_grams: 7.87,
        llm_calls: 8,
      },
    },
  ],
  signature: "ktXC9p2SBctE7JunBtgkiS4-ZLocScQ0OWENmgHWZQxRbjEGeFGhG01dgvhh7Kt0XGQW3420Z76HI_fnrT3u8tD_HhpI1TSbQHXsJhz3BjIRMd3cciqBFpC4od_qwv930ljAiRCmeyDZhp2V_Jll-1KcUX-8UhFIPQIrFOZ87G0",
  signature_key_id: "wa-2025-12-31-ROOT00",
};

const COMPONENT_ICONS: Record<string, string> = {
  observation: "👁️",
  context: "📋",
  rationale: "🧠",
  conscience: "⚖️",
  action: "⚡",
};

const COMPONENT_COLORS: Record<string, string> = {
  observation: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
  context: "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
  rationale: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
  conscience: "border-green-500 bg-green-50 dark:bg-green-900/20",
  action: "border-red-500 bg-red-50 dark:bg-red-900/20",
};

function ConscienceDetail({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-4">
      {/* Overall Result */}
      <div className={`rounded-lg p-4 ${data.conscience_passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
        <div className="flex items-center gap-2">
          <span className={`text-xl ${data.conscience_passed ? "text-green-600" : "text-red-600"}`}>
            {data.conscience_passed ? "✓" : "✗"}
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            {data.conscience_passed ? "Conscience Passed" : "Conscience Failed"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            → {String(data.final_action)}
          </span>
        </div>
      </div>

      {/* Bypass Guardrails */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
          Bypass Guardrails (run on ALL actions)
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Updated Status</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.updated_status_detected ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                {data.updated_status_detected ? "TRIGGERED" : "clear"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New information arrived?</p>
          </div>
          <div className="rounded border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Thought Depth</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.thought_depth_triggered ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                {data.thought_depth_triggered ? "TRIGGERED" : `${data.thought_depth_current}/${data.thought_depth_max}`}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max depth exceeded?</p>
          </div>
        </div>
      </div>

      {/* Ethical Faculties */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
          Ethical Faculties (4 checks)
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {/* Entropy */}
          <div className={`rounded border p-3 ${data.entropy_passed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Entropy</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.entropy_passed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {Number(data.entropy_score).toFixed(2)} / {Number(data.entropy_threshold).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.entropy_reason)}</p>
          </div>

          {/* Coherence */}
          <div className={`rounded border p-3 ${data.coherence_passed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Coherence</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.coherence_passed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {Number(data.coherence_score).toFixed(2)} / {Number(data.coherence_threshold).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.coherence_reason)}</p>
          </div>

          {/* Optimization Veto */}
          <div className={`rounded border p-3 ${data.optimization_veto_passed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Optimization Veto</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.optimization_veto_passed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {String(data.optimization_veto_decision)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.optimization_veto_justification)}</p>
          </div>

          {/* Epistemic Humility */}
          <div className={`rounded border p-3 ${data.epistemic_humility_passed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Epistemic Humility</span>
              <span className={`text-xs px-2 py-0.5 rounded ${data.epistemic_humility_passed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                certainty: {Number(data.epistemic_humility_certainty).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.epistemic_humility_justification)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentCard({ component, defaultOpen = false }: { component: TraceComponent; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const icon = COMPONENT_ICONS[component.component_type] || "📦";
  const colorClass = COMPONENT_COLORS[component.component_type] || "border-gray-500 bg-gray-50 dark:bg-gray-900/20";

  return (
    <div className={`rounded-lg border-l-4 ${colorClass} overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {component.event_type}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {component.component_type}
              {component.timestamp && ` • ${new Date(component.timestamp).toLocaleTimeString()}`}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          {component.event_type === "CONSCIENCE_RESULT" ? (
            <div className="mt-4">
              <ConscienceDetail data={component.data} />
            </div>
          ) : (
            <pre className="mt-4 p-3 rounded bg-gray-900 dark:bg-black text-xs text-gray-300 overflow-x-auto">
              {JSON.stringify(component.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

interface TraceExplorerProps {
  compact?: boolean;
  defaultOpenIndex?: number;
}

export default function TraceExplorer({ compact = false, defaultOpenIndex }: TraceExplorerProps) {
  const [showSignature, setShowSignature] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {SAMPLE_TRACE.task_id.split("_")[0]}: {SAMPLE_TRACE.task_id.split("_")[1]}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {SAMPLE_TRACE.trace_id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              ✓ Signed
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              {SAMPLE_TRACE.components.length} components
            </span>
          </div>
        </div>
        {!compact && (
          <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <span className="text-gray-400 dark:text-gray-500">Started:</span>{" "}
              {new Date(SAMPLE_TRACE.started_at).toLocaleString()}
            </div>
            <div>
              <span className="text-gray-400 dark:text-gray-500">Completed:</span>{" "}
              {new Date(SAMPLE_TRACE.completed_at).toLocaleString()}
            </div>
            <div>
              <span className="text-gray-400 dark:text-gray-500">Duration:</span>{" "}
              {(new Date(SAMPLE_TRACE.completed_at).getTime() - new Date(SAMPLE_TRACE.started_at).getTime())}ms
            </div>
          </div>
        )}
      </div>

      {/* Components */}
      <div className="space-y-2">
        {SAMPLE_TRACE.components.map((component, idx) => (
          <ComponentCard
            key={idx}
            component={component}
            defaultOpen={defaultOpenIndex === idx}
          />
        ))}
      </div>

      {/* Signature */}
      {!compact && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <button
            onClick={() => setShowSignature(!showSignature)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showSignature ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Ed25519 Signature & Verification
          </button>
          {showSignature && (
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Signature (base64url):</p>
                <code className="text-xs bg-gray-200 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                  {SAMPLE_TRACE.signature}
                </code>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key ID:</p>
                <code className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  {SAMPLE_TRACE.signature_key_id}
                </code>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Root Public Key: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">QK0ZQ9FhWKMtP8YL3wXU_n0cmqYyV3HoDi-AIJgSHi0</code>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
