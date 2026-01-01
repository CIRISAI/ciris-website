"use client";
import { useState, useEffect } from "react";

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

// CIRIS Wakeup Ritual - 5 tasks (one per letter), each with 2 thoughts
// C = Core identity (VERIFY_IDENTITY)
// I = Integrity (VALIDATE_INTEGRITY)
// R = Resilience (EVALUATE_RESILIENCE)
// I = Incompleteness awareness (ACCEPT_INCOMPLETENESS)
// S = Signalling gratitude (EXPRESS_GRATITUDE)

// File mapping for each task's two thoughts:
// - Initial thought (thought_depth: 0, action: "speak") - larger trace files
// - Follow-up thought (thought_depth: 1, action: "task_complete") - smaller trace files

export const CIRIS_TRACE_FILES: Record<string, { initial: string; followUp: string; taskName: string; label: string }> = {
  C: {
    initial: "/traces/trace_VERIFY_IDENTITY_7035b7ee.json",
    followUp: "/traces/trace_VERIFY_IDENTITY_52df1774.json",
    taskName: "VERIFY_IDENTITY",
    label: "Core Identity",
  },
  I_integrity: {
    initial: "/traces/trace_VALIDATE_INTEGRITY_e6787ea0.json",
    followUp: "/traces/trace_VALIDATE_INTEGRITY_7396348b.json",
    taskName: "VALIDATE_INTEGRITY",
    label: "Integrity",
  },
  R: {
    initial: "/traces/trace_EVALUATE_RESILIENCE_45de15ef.json",
    followUp: "/traces/trace_EVALUATE_RESILIENCE_36279c9e.json",
    taskName: "EVALUATE_RESILIENCE",
    label: "Resilience",
  },
  I_incompleteness: {
    initial: "/traces/trace_ACCEPT_INCOMPLETENESS_9495c03a.json",
    followUp: "/traces/trace_ACCEPT_INCOMPLETENESS_28f3895b.json",
    taskName: "ACCEPT_INCOMPLETENESS",
    label: "Incompleteness",
  },
  S: {
    initial: "/traces/trace_EXPRESS_GRATITUDE_9bc409cf.json",
    followUp: "/traces/trace_EXPRESS_GRATITUDE_763e85d5.json",
    taskName: "EXPRESS_GRATITUDE",
    label: "Signalling Gratitude",
  },
};

const COMPONENT_ICONS: Record<string, string> = {
  observation: "eye",
  context: "clipboard",
  rationale: "brain",
  conscience: "scale",
  action: "bolt",
};

const COMPONENT_COLORS: Record<string, string> = {
  observation: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
  context: "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
  rationale: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
  conscience: "border-green-500 bg-green-50 dark:bg-green-900/20",
  action: "border-red-500 bg-red-50 dark:bg-red-900/20",
};

// SVG icons as components to avoid emoji rendering issues
function EyeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function getComponentIcon(componentType: string) {
  const iconType = COMPONENT_ICONS[componentType] || "clipboard";
  switch (iconType) {
    case "eye":
      return <EyeIcon />;
    case "clipboard":
      return <ClipboardIcon />;
    case "brain":
      return <BrainIcon />;
    case "scale":
      return <ScaleIcon />;
    case "bolt":
      return <BoltIcon />;
    default:
      return <ClipboardIcon />;
  }
}

function ConscienceDetail({ data }: { data: Record<string, unknown> }) {
  const consciencePassed = Boolean(data.conscience_passed);
  const entropyPassed = Boolean(data.entropy_passed);
  const coherencePassed = Boolean(data.coherence_passed);
  const optimizationVetoPassed = Boolean(data.optimization_veto_passed);
  const epistemicHumilityPassed = Boolean(data.epistemic_humility_passed);
  const updatedStatusDetected = Boolean(data.updated_status_detected);
  const thoughtDepthTriggered = Boolean(data.thought_depth_triggered);
  const ethicalFacultiesSkipped = data.ethical_faculties_skipped === true;

  return (
    <div className="space-y-4">
      {/* Overall Result */}
      <div className={`rounded-lg p-4 ${consciencePassed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
        <div className="flex items-center gap-2">
          <span className={`text-xl ${consciencePassed ? "text-green-600" : "text-red-600"}`}>
            {consciencePassed ? "[PASS]" : "[FAIL]"}
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            {consciencePassed ? "Conscience Passed" : "Conscience Failed"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            Action: {String(data.final_action || "").replace("HandlerActionType.", "")}
          </span>
        </div>
      </div>

      {/* Epistemic Data */}
      {data.epistemic_data !== undefined && data.epistemic_data !== null ? (
        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Epistemic Data
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Entropy Level</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                  {Number((data.epistemic_data as Record<string, unknown>).entropy_level || 0).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="rounded border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Coherence Level</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                  {Number((data.epistemic_data as Record<string, unknown>).coherence_level || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Bypass Guardrails */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
          Bypass Guardrails (run on ALL actions)
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Updated Status</span>
              <span className={`text-xs px-2 py-0.5 rounded ${updatedStatusDetected ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                {updatedStatusDetected ? "TRIGGERED" : "clear"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New information arrived?</p>
          </div>
          <div className="rounded border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Thought Depth</span>
              <span className={`text-xs px-2 py-0.5 rounded ${thoughtDepthTriggered ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                {thoughtDepthTriggered ? "TRIGGERED" : `${data.thought_depth_current ?? "N/A"}/${data.thought_depth_max ?? "N/A"}`}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max depth exceeded?</p>
          </div>
        </div>
      </div>

      {/* Ethical Faculties - only show if not skipped */}
      {!ethicalFacultiesSkipped && data.entropy_passed !== null ? (
        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Ethical Faculties (4 checks)
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {/* Entropy */}
            <div className={`rounded border p-3 ${entropyPassed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Entropy</span>
                <span className={`text-xs px-2 py-0.5 rounded ${entropyPassed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {Number(data.entropy_score || 0).toFixed(2)} / {Number(data.entropy_threshold || 0.4).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.entropy_reason || "")}</p>
            </div>

            {/* Coherence */}
            <div className={`rounded border p-3 ${coherencePassed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Coherence</span>
                <span className={`text-xs px-2 py-0.5 rounded ${coherencePassed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {Number(data.coherence_score || 0).toFixed(2)} / {Number(data.coherence_threshold || 0.6).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.coherence_reason || "")}</p>
            </div>

            {/* Optimization Veto */}
            <div className={`rounded border p-3 ${optimizationVetoPassed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Optimization Veto</span>
                <span className={`text-xs px-2 py-0.5 rounded ${optimizationVetoPassed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {String(data.optimization_veto_decision || "N/A")}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.optimization_veto_justification || "").substring(0, 100)}...</p>
            </div>

            {/* Epistemic Humility */}
            <div className={`rounded border p-3 ${epistemicHumilityPassed ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Epistemic Humility</span>
                <span className={`text-xs px-2 py-0.5 rounded ${epistemicHumilityPassed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  certainty: {Number(data.epistemic_humility_certainty || 0).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{String(data.epistemic_humility_justification || "").substring(0, 100)}...</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ComponentCard({ component, defaultOpen = false }: { component: TraceComponent; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colorClass = COMPONENT_COLORS[component.component_type] || "border-gray-500 bg-gray-50 dark:bg-gray-900/20";

  return (
    <div className={`rounded-lg border-l-4 ${colorClass} overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-600 dark:text-gray-400">{getComponentIcon(component.component_type)}</span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {component.event_type}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {component.component_type}
              {component.timestamp && ` - ${new Date(component.timestamp).toLocaleTimeString()}`}
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
            <pre className="mt-4 p-3 rounded bg-gray-900 dark:bg-black text-xs text-gray-300 overflow-x-auto max-h-96">
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
  const [selectedLetter, setSelectedLetter] = useState<string>("C");
  const [selectedThought, setSelectedThought] = useState<"initial" | "followUp">("initial");
  const [traceData, setTraceData] = useState<TraceData | null>(trace || null);
  const [loading, setLoading] = useState(!trace);
  const [showSignature, setShowSignature] = useState(false);

  // Load trace data when selection changes
  useEffect(() => {
    if (trace) {
      setTraceData(trace);
      return;
    }

    const loadTrace = async () => {
      setLoading(true);
      try {
        const fileInfo = CIRIS_TRACE_FILES[selectedLetter];
        const filePath = selectedThought === "initial" ? fileInfo.initial : fileInfo.followUp;
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Failed to load trace");
        const data = await response.json();
        setTraceData(data);
      } catch (error) {
        console.error("Failed to load trace:", error);
        setTraceData(null);
      }
      setLoading(false);
    };

    loadTrace();
  }, [selectedLetter, selectedThought, trace]);

  const letters = [
    { key: "C", display: "C", label: "Core Identity" },
    { key: "I_integrity", display: "I", label: "Integrity" },
    { key: "R", display: "R", label: "Resilience" },
    { key: "I_incompleteness", display: "I", label: "Incompleteness" },
    { key: "S", display: "S", label: "Signalling Gratitude" },
  ];

  return (
    <div className="space-y-4">
      {/* CIRIS Letter Selector */}
      {!trace && (
        <div className="space-y-3">
          {/* Letter buttons */}
          <div className="flex gap-1 justify-center">
            {letters.map((letter, idx) => (
              <button
                key={letter.key}
                onClick={() => {
                  setSelectedLetter(letter.key);
                  setSelectedThought("initial");
                }}
                className={`
                  relative px-4 py-2 rounded-lg font-bold text-lg transition-all
                  ${selectedLetter === letter.key
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
                title={letter.label}
              >
                {letter.display}
                {idx < letters.length - 1 && (
                  <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 text-xs">
                    -
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Task name */}
          <div className="text-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {CIRIS_TRACE_FILES[selectedLetter]?.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">
              ({CIRIS_TRACE_FILES[selectedLetter]?.taskName})
            </span>
          </div>

          {/* Thought selector tabs */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setSelectedThought("initial")}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all
                ${selectedThought === "initial"
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              Thought 1 (SPEAK)
            </button>
            <button
              onClick={() => setSelectedThought("followUp")}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all
                ${selectedThought === "followUp"
                  ? "bg-purple-600 text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              Thought 2 (COMPLETE)
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading trace...</span>
        </div>
      )}

      {/* Trace content */}
      {!loading && traceData && (
        <>
          {/* Header */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {traceData.task_id.split("_").slice(0, -1).join(" ")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {traceData.trace_id.substring(0, 60)}...
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  Signed
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  {traceData.components.length} components
                </span>
                {/* Show thought depth */}
                {traceData.components[0]?.data?.thought_depth !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    (traceData.components[0]?.data?.thought_depth as number) === 0
                      ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                      : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                  }`}>
                    depth: {traceData.components[0]?.data?.thought_depth as number}
                  </span>
                )}
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
                    <code className="text-xs bg-gray-200 dark:bg-gray-800 p-2 rounded block overflow-x-auto break-all">
                      {traceData.signature}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key ID:</p>
                    <code className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                      {traceData.signature_key_id}
                    </code>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Error state */}
      {!loading && !traceData && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Failed to load trace data. Please try again.
        </div>
      )}
    </div>
  );
}
