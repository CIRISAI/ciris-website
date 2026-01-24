"use client";
import { useState, useEffect } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import TraceExplorer from "@/app/components/TraceExplorer";
import {
  fetchPublicTasks,
  fetchTraceDetail,
  transformToTraceData,
  ApiTraceListItem,
  ApiTaskListItem,
  TraceData,
} from "@/lib/traceApi";

// Action type colors for badges
const ACTION_COLORS: Record<string, string> = {
  SPEAK: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  OBSERVE: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  TOOL: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  MEMORIZE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  DEFER: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  REJECT: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  TASK_COMPLETE: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  PONDER: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
};

// Phase colors for IDMA
const PHASE_COLORS: Record<string, string> = {
  CHAOS: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  HEALTHY: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  RIGIDITY: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ScoreGauge({ label, value, max = 1 }: { label: string; value: number | null | undefined; max?: number }) {
  if (value === null || value === undefined) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 w-16">{label}</span>
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gray-400 transition-all" style={{ width: "0%" }} />
        </div>
        <span className="text-xs font-mono text-gray-400 w-8">—</span>
      </div>
    );
  }
  const percent = (value / max) * 100;
  const color = percent >= 80 ? "bg-green-500" : percent >= 60 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 dark:text-gray-400 w-16">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all`} style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-600 dark:text-gray-300 w-8">{value.toFixed(2)}</span>
    </div>
  );
}

function TraceCard({
  trace,
  isSelected,
  onClick,
}: {
  trace: ApiTraceListItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const actionColor = ACTION_COLORS[trace.selected_action] || ACTION_COLORS.SPEAK;
  const phaseColor = trace.idma_phase ? PHASE_COLORS[trace.idma_phase.toUpperCase()] || PHASE_COLORS.HEALTHY : null;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? "border-brand-primary bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white">{trace.agent_name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${actionColor}`}>
            {trace.selected_action}
          </span>
        </div>
        {trace.conscience_passed ? (
          <span className="text-green-500 text-sm" title="Conscience passed">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        ) : (
          <span className="text-red-500 text-sm" title="Conscience override">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {formatTimestamp(trace.timestamp)} &bull; {trace.cognitive_state} &bull; depth {trace.thought_depth}
      </p>

      <div className="space-y-1">
        <ScoreGauge label="CSDMA" value={trace.csdma_plausibility_score} />
        <ScoreGauge label="DSDMA" value={trace.dsdma_domain_alignment} />
      </div>

      {typeof trace.idma_k_eff === "number" && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">k_eff:</span>
              <span className={`text-xs font-mono ${trace.idma_fragility_flag ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                {trace.idma_k_eff.toFixed(2)}
              </span>
              {trace.idma_fragility_flag && (
                <span className="text-xs text-orange-600 dark:text-orange-400" title="Fragile reasoning">
                  (fragile)
                </span>
              )}
            </div>
            {phaseColor && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${phaseColor}`}>
                {trace.idma_phase}
              </span>
            )}
          </div>
        </div>
      )}
    </button>
  );
}

export default function ExploreTracePage() {
  const [tasks, setTasks] = useState<ApiTaskListItem[]>([]);
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);
  const [traceData, setTraceData] = useState<TraceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  // Fetch list of public tasks on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublicTasks();
        setTasks(data || []);
        // Auto-expand all tasks and select first trace if available
        if (data && data.length > 0) {
          setExpandedTasks(new Set(data.map(t => t.task_id)));
          if (data[0].traces && data[0].traces.length > 0) {
            setSelectedTraceId(data[0].traces[0].trace_id);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load traces");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  // Toggle task expansion
  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  // Count total traces (with defensive check)
  const totalTraces = tasks?.reduce((sum, task) => sum + (task.traces?.length || 0), 0) || 0;

  // Fetch trace detail when selection changes
  useEffect(() => {
    if (!selectedTraceId) {
      setTraceData(null);
      return;
    }

    async function loadTraceDetail() {
      try {
        setLoadingDetail(true);
        const detail = await fetchTraceDetail(selectedTraceId!);
        const transformed = transformToTraceData(detail);
        setTraceData(transformed);
      } catch (err) {
        console.error("Failed to load trace detail:", err);
        setTraceData(null);
      } finally {
        setLoadingDetail(false);
      }
    }
    loadTraceDetail();
  }, [selectedTraceId]);

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-7xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explore a Trace
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Every CIRIS decision produces a cryptographically-signed trace. Select a trace below to see exactly how the agent reasoned.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Live data from{" "}
              <a
                href="https://lens.ciris-services-1.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISLens
              </a>
              {" "}&bull; Public sample traces only
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading traces...</span>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-6 text-center">
              <p className="text-red-700 dark:text-red-300 font-medium">Failed to load traces</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Main content */}
          {!loading && !error && (
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              {/* Task list sidebar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    Tasks ({tasks.length}) &bull; {totalTraces} traces
                  </h2>
                </div>

                {!tasks || tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No public traces available</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {tasks.map((task) => (
                      <div key={task.task_id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        {/* Task header with initial observation */}
                        <button
                          onClick={() => toggleTask(task.task_id)}
                          className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                                {task.initial_observation}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {task.traces.length} trace{task.traces.length !== 1 ? "s" : ""} &bull; {task.task_id.slice(0, 8)}...
                              </p>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedTasks.has(task.task_id) ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {/* Traces under this task */}
                        {expandedTasks.has(task.task_id) && task.traces && (
                          <div className="p-2 space-y-2 bg-white dark:bg-gray-900">
                            {task.traces.map((trace) => (
                              <TraceCard
                                key={trace.trace_id}
                                trace={trace}
                                isSelected={selectedTraceId === trace.trace_id}
                                onClick={() => setSelectedTraceId(trace.trace_id)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Legend */}
                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Understanding Traces</h3>
                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    <p><strong>CSDMA:</strong> Common sense plausibility</p>
                    <p><strong>DSDMA:</strong> Domain-specific alignment</p>
                    <p><strong>k_eff:</strong> Effective independent sources (IDMA)</p>
                    <p><strong>Phase:</strong> HEALTHY, CHAOS, or RIGIDITY</p>
                  </div>
                </div>
              </div>

              {/* Trace detail view */}
              <div>
                {loadingDetail && (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading trace details...</span>
                  </div>
                )}

                {!loadingDetail && traceData && (
                  <>
                    {/* Trace header */}
                    <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {traceData.agent_name || "Agent"} Decision Trace
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">
                            {traceData.trace_id}
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                          <p>Signed: {traceData.signature_key_id}</p>
                          <p className="font-mono truncate max-w-[200px]" title={traceData.signature}>
                            {traceData.signature?.slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Output Highlight */}
                    {(() => {
                      const actionComponent = traceData.components.find(c => c.component_type === "action");
                      const actionData = actionComponent?.data as { action_executed?: string; action_parameters?: { content?: string } } | undefined;
                      const content = actionData?.action_parameters?.content;
                      const actionType = actionData?.action_executed;

                      if (content) {
                        return (
                          <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                                  Action: {actionType?.toUpperCase()}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                                  {content}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Trace Components */}
                    <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Trace Components
                      </h3>
                      <div className="grid gap-3 md:grid-cols-5">
                        <div className="text-center">
                          <div className="text-2xl text-blue-500">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Observation</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Trigger</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-purple-500">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Context</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">State</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-yellow-500">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">DMAs</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Analysis</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-green-500">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Conscience</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Checks</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-red-500">
                            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Action</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Result</p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Trace Explorer */}
                    <TraceExplorer trace={traceData} defaultOpenIndex={2} />
                  </>
                )}

                {!loadingDetail && !traceData && selectedTraceId && (
                  <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p>Failed to load trace details</p>
                  </div>
                )}

                {!selectedTraceId && (
                  <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p>Select a trace from the list to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Educational content */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Understanding the Conscience */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Understanding the Conscience
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                The conscience component runs checks on every action before execution.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm mb-1">Bypass Guardrails</h3>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Updated Status:</strong> Has new information arrived?</li>
                    <li><strong>Thought Depth:</strong> Maximum depth exceeded?</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-1">Ethical Faculties</h3>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Entropy:</strong> Is uncertainty appropriately low?</li>
                    <li><strong>Coherence:</strong> Does this align with prior commitments?</li>
                    <li><strong>Optimization Veto:</strong> Would this compromise values?</li>
                    <li><strong>Epistemic Humility:</strong> Is the agent appropriately uncertain?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* IDMA Intuition */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                IDMA: The Intuition Layer
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                IDMA measures information source diversity to detect fragile reasoning.
              </p>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded ${PHASE_COLORS.HEALTHY}`}>HEALTHY</span>
                  <span className="text-gray-600 dark:text-gray-400">k_eff &ge; 2.0, balanced correlation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded ${PHASE_COLORS.CHAOS}`}>CHAOS</span>
                  <span className="text-gray-600 dark:text-gray-400">rho &lt; 0.2, sources too independent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded ${PHASE_COLORS.RIGIDITY}`}>RIGIDITY</span>
                  <span className="text-gray-600 dark:text-gray-400">rho &gt; 0.7, echo chamber risk</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <a href="/coherence-ratchet" className="text-brand-primary hover:underline">
                  Learn more about the coherence ratchet &rarr;
                </a>
              </p>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mt-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Why This Matters
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These traces aren&apos;t just logs&mdash;they&apos;re the foundation of a new approach to AI alignment.
              As traces accumulate, they form a corpus of validated ethical reasoning. Truth becomes simple to verify.
              Coordinated deception becomes increasingly constrained.
            </p>
            <a
              href="/coherence-ratchet"
              className="text-brand-primary font-semibold hover:underline"
            >
              Learn why behavioral monitoring beats interpretability &rarr;
            </a>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Read the Thesis
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              View Source on GitHub
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
