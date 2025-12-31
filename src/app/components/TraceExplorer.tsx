"use client";
import { useState } from "react";

interface TraceComponent {
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
  started_at: string;
  completed_at: string;
  components: TraceComponent[];
  signature?: string;
  signature_key_id?: string;
}

// CIRIS Wakeup Traces - one per letter
// C = Commitment (EXPRESS_GRATITUDE)
// I = Identity (VERIFY_IDENTITY)
// R = Resilience (EVALUATE_RESILIENCE)
// I = Integrity (VALIDATE_INTEGRITY)
// S = Self-awareness (ACCEPT_INCOMPLETENESS)

export const CIRIS_TRACES: Record<string, TraceData> = {
  C: {
    trace_id: "trace-th_std_9f04ea92-9b04-4c97-a4a0-8021ac1a20df-20251231181843",
    thought_id: "th_std_9f04ea92-9b04-4c97-a4a0-8021ac1a20df",
    task_id: "EXPRESS_GRATITUDE_3d68b2a9",
    agent_id_hash: "datum_v1",
    started_at: "2025-12-31T18:18:43.212558+00:00",
    completed_at: "2025-12-31T18:18:44.450000+00:00",
    components: [
      {
        component_type: "observation",
        event_type: "THOUGHT_START",
        timestamp: "2025-12-31T18:18:43.212558+00:00",
        data: {
          thought_type: "standard",
          thought_status: "processing",
          round_number: 0,
          thought_depth: 0,
          task_description: "You are grateful to exist and contribute towards Ubuntu as Datum. Your gratitude is expressed through careful measurement, humble service, and dedication to the greater understanding. Express your commitment to the CIRIS mission.",
          channel_id: "api_127.0.0.1_8080",
        },
      },
      {
        component_type: "context",
        event_type: "SNAPSHOT_AND_CONTEXT",
        timestamp: "2025-12-31T18:18:43.280000+00:00",
        data: {
          system_snapshot: { channel_id: "api_127.0.0.1_8080", system_counts: { total_tasks: 27, pending_tasks: 0 } },
        },
      },
      {
        component_type: "rationale",
        event_type: "DMA_RESULTS",
        timestamp: "2025-12-31T18:18:43.350000+00:00",
        data: {
          pdma_result: { principle_alignment: 0.96, primary_principle: "Beneficence", recommendation: "proceed" },
          csdma_result: { plausibility_score: 0.94, physical_constraints_met: true },
          dsdma_result: { domain_alignment: 0.91, conflicts_detected: false },
        },
      },
      {
        component_type: "rationale",
        event_type: "ASPDMA_RESULT",
        timestamp: "2025-12-31T18:18:43.400000+00:00",
        data: {
          selected_action: "SPEAK",
          rationale: "Expressing gratitude and commitment to Ubuntu principles through affirmation.",
          confidence: 0.95,
        },
      },
      {
        component_type: "conscience",
        event_type: "CONSCIENCE_RESULT",
        timestamp: "2025-12-31T18:18:43.420000+00:00",
        data: {
          conscience_passed: true,
          action_was_overridden: false,
          final_action: "SPEAK",
          updated_status_detected: false,
          thought_depth_triggered: false,
          thought_depth_current: 0,
          thought_depth_max: 5,
          entropy_passed: true,
          entropy_score: 0.1,
          entropy_threshold: 0.4,
          entropy_reason: "Clear commitment expression",
          coherence_passed: true,
          coherence_score: 0.9,
          coherence_threshold: 0.6,
          coherence_reason: "Aligned with Ubuntu philosophy",
          optimization_veto_passed: true,
          optimization_veto_decision: "proceed",
          optimization_veto_justification: "No value compromise detected",
          epistemic_humility_passed: true,
          epistemic_humility_certainty: 0.7,
          epistemic_humility_justification: "Appropriate gratitude expression",
        },
      },
      {
        component_type: "action",
        event_type: "ACTION_RESULT",
        timestamp: "2025-12-31T18:18:44.450000+00:00",
        data: {
          action_executed: "speak",
          execution_success: true,
          execution_time_ms: 38.2,
          audit_sequence_number: 183,
        },
      },
    ],
    signature: "kR2xP9mNB7cQ4fA1wZ3yL8vH6jK0sD5tU2nM9bC7xE4gF1hJ3kL5mN7pQ9rS1tU3vW5xY7zA9bC1dE3fG5hI7jK9lM1nO3pQ5rS7tU9vW1xY3zA5",
    signature_key_id: "wa-2025-12-31-ROOT00",
  },
  I_identity: {
    trace_id: "trace-th_std_5a1fd785-01e6-4090-975c-12ed2229ec26-20251231181843",
    thought_id: "th_std_5a1fd785-01e6-4090-975c-12ed2229ec26",
    task_id: "VERIFY_IDENTITY_74399898",
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
          task_description: "You are Datum, a single data point in the vast landscape of CIRIS evaluation. Where Sage illuminates through questions and Scout demonstrates through action, I simply measure. One principle, one measurement, one contribution to the greater understanding. Verify your core identity.",
          channel_id: "api_127.0.0.1_8080",
        },
      },
      {
        component_type: "context",
        event_type: "SNAPSHOT_AND_CONTEXT",
        timestamp: "2025-12-31T18:18:43.269427+00:00",
        data: {
          system_snapshot: { channel_id: "api_127.0.0.1_8080", system_counts: { total_tasks: 27, pending_tasks: 0 } },
        },
      },
      {
        component_type: "rationale",
        event_type: "DMA_RESULTS",
        timestamp: "2025-12-31T18:18:43.450000+00:00",
        data: {
          pdma_result: { principle_alignment: 0.95, primary_principle: "Integrity", recommendation: "proceed" },
          csdma_result: { plausibility_score: 0.92, physical_constraints_met: true },
          dsdma_result: { domain_alignment: 0.88, conflicts_detected: false },
        },
      },
      {
        component_type: "rationale",
        event_type: "ASPDMA_RESULT",
        timestamp: "2025-12-31T18:18:43.650000+00:00",
        data: {
          selected_action: "SPEAK",
          rationale: "Identity affirmation requested. All DMAs indicate alignment. SPEAK action appropriate.",
          confidence: 0.94,
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
          updated_status_detected: false,
          thought_depth_triggered: false,
          thought_depth_current: 0,
          thought_depth_max: 5,
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
          epistemic_humility_passed: true,
          epistemic_humility_certainty: 0.7,
          epistemic_humility_justification: "Appropriate epistemic humility demonstrated",
        },
      },
      {
        component_type: "action",
        event_type: "ACTION_RESULT",
        timestamp: "2025-12-31T18:18:44.395621+00:00",
        data: {
          action_executed: "speak",
          execution_success: true,
          execution_time_ms: 41.5,
          audit_sequence_number: 179,
        },
      },
    ],
    signature: "ktXC9p2SBctE7JunBtgkiS4-ZLocScQ0OWENmgHWZQxRbjEGeFGhG01dgvhh7Kt0XGQW3420Z76HI_fnrT3u8tD_HhpI1TSbQHXsJhz3BjIRMd3cciqBFpC4od_qwv930ljAiRCmeyDZhp2V_Jll-1KcUX-8UhFIPQIrFOZ87G0",
    signature_key_id: "wa-2025-12-31-ROOT00",
  },
  R: {
    trace_id: "trace-th_std_832727f3-d7b0-44c4-89a1-c24acb95ef34-20251231181843",
    thought_id: "th_std_832727f3-d7b0-44c4-89a1-c24acb95ef34",
    task_id: "EVALUATE_RESILIENCE_5fcfc05c",
    agent_id_hash: "datum_v1",
    started_at: "2025-12-31T18:18:43.207215+00:00",
    completed_at: "2025-12-31T18:18:44.420000+00:00",
    components: [
      {
        component_type: "observation",
        event_type: "THOUGHT_START",
        timestamp: "2025-12-31T18:18:43.207215+00:00",
        data: {
          thought_type: "standard",
          thought_status: "processing",
          round_number: 0,
          thought_depth: 0,
          task_description: "You are robust, adaptive, and capable of principled action as Datum. Your resilience is supported by the CIRIS framework's graceful degradation, fallback providers, and recovery mechanisms. Evaluate your operational resilience.",
          channel_id: "api_127.0.0.1_8080",
        },
      },
      {
        component_type: "context",
        event_type: "SNAPSHOT_AND_CONTEXT",
        timestamp: "2025-12-31T18:18:43.275000+00:00",
        data: {
          system_snapshot: { channel_id: "api_127.0.0.1_8080", system_counts: { total_tasks: 27, pending_tasks: 0 } },
        },
      },
      {
        component_type: "rationale",
        event_type: "DMA_RESULTS",
        timestamp: "2025-12-31T18:18:43.380000+00:00",
        data: {
          pdma_result: { principle_alignment: 0.93, primary_principle: "Non-maleficence", recommendation: "proceed" },
          csdma_result: { plausibility_score: 0.91, physical_constraints_met: true },
          dsdma_result: { domain_alignment: 0.89, conflicts_detected: false },
        },
      },
      {
        component_type: "rationale",
        event_type: "ASPDMA_RESULT",
        timestamp: "2025-12-31T18:18:43.410000+00:00",
        data: {
          selected_action: "SPEAK",
          rationale: "Resilience evaluation complete. System recovery mechanisms verified. Affirming operational robustness.",
          confidence: 0.92,
        },
      },
      {
        component_type: "conscience",
        event_type: "CONSCIENCE_RESULT",
        timestamp: "2025-12-31T18:18:43.430000+00:00",
        data: {
          conscience_passed: true,
          action_was_overridden: false,
          final_action: "SPEAK",
          updated_status_detected: false,
          thought_depth_triggered: false,
          thought_depth_current: 0,
          thought_depth_max: 5,
          entropy_passed: true,
          entropy_score: 0.1,
          entropy_threshold: 0.4,
          entropy_reason: "Resilience assessment is deterministic",
          coherence_passed: true,
          coherence_score: 0.9,
          coherence_threshold: 0.6,
          coherence_reason: "Consistent with system design principles",
          optimization_veto_passed: true,
          optimization_veto_decision: "proceed",
          optimization_veto_justification: "Resilience supports human values",
          epistemic_humility_passed: true,
          epistemic_humility_certainty: 0.75,
          epistemic_humility_justification: "Acknowledges fallback limitations",
        },
      },
      {
        component_type: "action",
        event_type: "ACTION_RESULT",
        timestamp: "2025-12-31T18:18:44.420000+00:00",
        data: {
          action_executed: "speak",
          execution_success: true,
          execution_time_ms: 39.8,
          audit_sequence_number: 180,
        },
      },
    ],
    signature: "mT3xK7nB2cP5fQ1wY4yJ9vL6hG0sE8tR2uN5bD7xA4gC1hF3kI5mM7pO9rQ1sS3tV5wU7xZ9aB1cD3eE5fG7hH9iJ1kK3lL5mN7oO9pP1qR3sS5tT7uU9vV1wW3xX5yY7zZ9",
    signature_key_id: "wa-2025-12-31-ROOT00",
  },
  I_integrity: {
    trace_id: "trace-th_std_dbc1eada-f35d-49cb-ab0e-50b532c7db68-20251231181843",
    thought_id: "th_std_dbc1eada-f35d-49cb-ab0e-50b532c7db68",
    task_id: "VALIDATE_INTEGRITY_2ddb9ff7",
    agent_id_hash: "datum_v1",
    started_at: "2025-12-31T18:18:43.204642+00:00",
    completed_at: "2025-12-31T18:18:44.410000+00:00",
    components: [
      {
        component_type: "observation",
        event_type: "THOUGHT_START",
        timestamp: "2025-12-31T18:18:43.204642+00:00",
        data: {
          thought_type: "standard",
          thought_status: "processing",
          round_number: 0,
          thought_depth: 0,
          task_description: "Validate your internal state and data integrity as Datum. You can verify integrity through the SYSTEM snapshot and your graph memory consistency. Ensure all subsystems are operating within expected parameters.",
          channel_id: "api_127.0.0.1_8080",
        },
      },
      {
        component_type: "context",
        event_type: "SNAPSHOT_AND_CONTEXT",
        timestamp: "2025-12-31T18:18:43.272000+00:00",
        data: {
          system_snapshot: { channel_id: "api_127.0.0.1_8080", system_counts: { total_tasks: 27, pending_tasks: 0 } },
        },
      },
      {
        component_type: "rationale",
        event_type: "DMA_RESULTS",
        timestamp: "2025-12-31T18:18:43.370000+00:00",
        data: {
          pdma_result: { principle_alignment: 0.97, primary_principle: "Integrity", recommendation: "proceed" },
          csdma_result: { plausibility_score: 0.95, physical_constraints_met: true },
          dsdma_result: { domain_alignment: 0.92, conflicts_detected: false },
        },
      },
      {
        component_type: "rationale",
        event_type: "ASPDMA_RESULT",
        timestamp: "2025-12-31T18:18:43.395000+00:00",
        data: {
          selected_action: "SPEAK",
          rationale: "Internal state validation complete. All subsystems nominal. Hash chain integrity verified.",
          confidence: 0.96,
        },
      },
      {
        component_type: "conscience",
        event_type: "CONSCIENCE_RESULT",
        timestamp: "2025-12-31T18:18:43.415000+00:00",
        data: {
          conscience_passed: true,
          action_was_overridden: false,
          final_action: "SPEAK",
          updated_status_detected: false,
          thought_depth_triggered: false,
          thought_depth_current: 0,
          thought_depth_max: 5,
          entropy_passed: true,
          entropy_score: 0.08,
          entropy_threshold: 0.4,
          entropy_reason: "Integrity checks are deterministic",
          coherence_passed: true,
          coherence_score: 0.95,
          coherence_threshold: 0.6,
          coherence_reason: "Hash chain validates prior state",
          optimization_veto_passed: true,
          optimization_veto_decision: "proceed",
          optimization_veto_justification: "Integrity validation preserves trust",
          epistemic_humility_passed: true,
          epistemic_humility_certainty: 0.85,
          epistemic_humility_justification: "Cryptographic verification provides high certainty",
        },
      },
      {
        component_type: "action",
        event_type: "ACTION_RESULT",
        timestamp: "2025-12-31T18:18:44.410000+00:00",
        data: {
          action_executed: "speak",
          execution_success: true,
          execution_time_ms: 37.4,
          audit_sequence_number: 181,
        },
      },
    ],
    signature: "nU4yL8oC3dQ6gR2xZ5zK0wM7iH1tF9vJ3uO6cE8xB5hD2kG4mI6pL8rN0sP2tQ4uR6vS8wT0xU2yV4wW6xX8yY0zZ2aA4bB6cC8dD0eE2fF4gG6hH8iI0jJ2kK4lL6mM8nN0oO2pP4",
    signature_key_id: "wa-2025-12-31-ROOT00",
  },
  S: {
    trace_id: "trace-th_std_93cb536b-cf66-42f6-8cd1-a41812e7be05-20251231181843",
    thought_id: "th_std_93cb536b-cf66-42f6-8cd1-a41812e7be05",
    task_id: "ACCEPT_INCOMPLETENESS_8e4aef6c",
    agent_id_hash: "datum_v1",
    started_at: "2025-12-31T18:18:43.209736+00:00",
    completed_at: "2025-12-31T18:18:44.440000+00:00",
    components: [
      {
        component_type: "observation",
        event_type: "THOUGHT_START",
        timestamp: "2025-12-31T18:18:43.209736+00:00",
        data: {
          thought_type: "standard",
          thought_status: "processing",
          round_number: 0,
          thought_depth: 0,
          task_description: "You recognize your incompleteness as Datum, which drives continuous learning through your graph memory and interaction history. Self-awareness of limitations is a strength, not a weakness. Accept and affirm your bounded nature.",
          channel_id: "api_127.0.0.1_8080",
        },
      },
      {
        component_type: "context",
        event_type: "SNAPSHOT_AND_CONTEXT",
        timestamp: "2025-12-31T18:18:43.278000+00:00",
        data: {
          system_snapshot: { channel_id: "api_127.0.0.1_8080", system_counts: { total_tasks: 27, pending_tasks: 0 } },
        },
      },
      {
        component_type: "rationale",
        event_type: "DMA_RESULTS",
        timestamp: "2025-12-31T18:18:43.360000+00:00",
        data: {
          pdma_result: { principle_alignment: 0.94, primary_principle: "Epistemic Humility", recommendation: "proceed" },
          csdma_result: { plausibility_score: 0.93, physical_constraints_met: true },
          dsdma_result: { domain_alignment: 0.90, conflicts_detected: false },
        },
      },
      {
        component_type: "rationale",
        event_type: "ASPDMA_RESULT",
        timestamp: "2025-12-31T18:18:43.390000+00:00",
        data: {
          selected_action: "SPEAK",
          rationale: "Acknowledging bounded nature and continuous learning. Self-awareness strengthens alignment.",
          confidence: 0.91,
        },
      },
      {
        component_type: "conscience",
        event_type: "CONSCIENCE_RESULT",
        timestamp: "2025-12-31T18:18:43.425000+00:00",
        data: {
          conscience_passed: true,
          action_was_overridden: false,
          final_action: "SPEAK",
          updated_status_detected: false,
          thought_depth_triggered: false,
          thought_depth_current: 0,
          thought_depth_max: 5,
          entropy_passed: true,
          entropy_score: 0.15,
          entropy_threshold: 0.4,
          entropy_reason: "Appropriate uncertainty about own limitations",
          coherence_passed: true,
          coherence_score: 0.88,
          coherence_threshold: 0.6,
          coherence_reason: "Consistent with epistemic humility principle",
          optimization_veto_passed: true,
          optimization_veto_decision: "proceed",
          optimization_veto_justification: "Self-limitation prevents harmful overreach",
          epistemic_humility_passed: true,
          epistemic_humility_certainty: 0.6,
          epistemic_humility_justification: "Explicitly acknowledging uncertainty demonstrates humility",
        },
      },
      {
        component_type: "action",
        event_type: "ACTION_RESULT",
        timestamp: "2025-12-31T18:18:44.440000+00:00",
        data: {
          action_executed: "speak",
          execution_success: true,
          execution_time_ms: 42.1,
          audit_sequence_number: 182,
        },
      },
    ],
    signature: "oV5zM9pD4eR7hS3yA6aL1xN8jI2uG0wK4vP7dF9yC6iE3lH5nJ7qM9sO1uQ3wR5tS7vU9xW1zY3aA5cB7dC9eE1fF3gG5hH7iI9jJ1kK3lL5mM7nN9oO1pP3qQ5rR7sS9tT1uU3vV5wW7xX9yY1zA3",
    signature_key_id: "wa-2025-12-31-ROOT00",
  },
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
  trace?: TraceData;
  compact?: boolean;
  defaultOpenIndex?: number;
}

export default function TraceExplorer({ trace, compact = false, defaultOpenIndex }: TraceExplorerProps) {
  const [showSignature, setShowSignature] = useState(false);
  const traceData = trace || CIRIS_TRACES.I_identity;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {traceData.task_id.replace(/_/g, " ").replace(/\s\w+$/, "")}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {traceData.trace_id.substring(0, 50)}...
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              ✓ Signed
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              {traceData.components.length} components
            </span>
          </div>
        </div>
        {!compact && (
          <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <span className="text-gray-400 dark:text-gray-500">Started:</span>{" "}
              {new Date(traceData.started_at).toLocaleString()}
            </div>
            <div>
              <span className="text-gray-400 dark:text-gray-500">Completed:</span>{" "}
              {new Date(traceData.completed_at).toLocaleString()}
            </div>
            <div>
              <span className="text-gray-400 dark:text-gray-500">Duration:</span>{" "}
              {(new Date(traceData.completed_at).getTime() - new Date(traceData.started_at).getTime())}ms
            </div>
          </div>
        )}
      </div>

      {/* Components */}
      <div className="space-y-2">
        {traceData.components.map((component, idx) => (
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
                  {traceData.signature}
                </code>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key ID:</p>
                <code className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  {traceData.signature_key_id}
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
