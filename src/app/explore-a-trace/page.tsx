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
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [traceDataList, setTraceDataList] = useState<TraceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch list of public tasks on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublicTasks();
        setTasks(data || []);
        // Auto-select first task if available
        if (data && data.length > 0) {
          setSelectedTaskId(data[0].task_id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load traces");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  // Fetch all trace details when task selection changes
  useEffect(() => {
    if (!selectedTaskId) {
      setTraceDataList([]);
      return;
    }

    const selectedTask = tasks.find(t => t.task_id === selectedTaskId);
    if (!selectedTask || !selectedTask.traces || selectedTask.traces.length === 0) {
      setTraceDataList([]);
      return;
    }

    async function loadTaskTraces() {
      try {
        setLoadingDetail(true);
        const tracePromises = selectedTask!.traces.map(async (trace) => {
          const detail = await fetchTraceDetail(trace.trace_id);
          return transformToTraceData(detail);
        });
        const traces = await Promise.all(tracePromises);
        setTraceDataList(traces);
      } catch (err) {
        console.error("Failed to load trace details:", err);
        setTraceDataList([]);
      } finally {
        setLoadingDetail(false);
      }
    }
    loadTaskTraces();
  }, [selectedTaskId, tasks]);

  // Count total traces (with defensive check)
  const totalTraces = tasks?.reduce((sum, task) => sum + (task.traces?.length || 0), 0) || 0;

  // Get selected task
  const selectedTask = tasks.find(t => t.task_id === selectedTaskId);


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
                    Observations ({tasks.length})
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{totalTraces} traces</span>
                </div>

                {!tasks || tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No public traces available</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {tasks.map((task) => (
                      <button
                        key={task.task_id}
                        onClick={() => setSelectedTaskId(task.task_id)}
                        className={`w-full text-left rounded-lg border-2 transition-all ${
                          selectedTaskId === task.task_id
                            ? "border-brand-primary bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        {/* Observation header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {task.initial_observation}
                            </p>
                          </div>
                        </div>

                        {/* Task meta */}
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {task.traces && task.traces.length > 0 && (
                              <>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {task.traces[0].agent_name}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${ACTION_COLORS[task.traces[0].selected_action] || ACTION_COLORS.SPEAK}`}>
                                  {task.traces[0].selected_action}
                                </span>
                                {task.traces.length > 1 && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    +{task.traces.length - 1} more
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                          <span className={`w-2 h-2 rounded-full ${
                            task.traces?.every(t => t.conscience_passed)
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`} />
                        </div>
                      </button>
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

                {!loadingDetail && selectedTask && traceDataList.length > 0 && (
                  <>
                    {/* Task observation header */}
                    <div className="mb-6 p-5 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mb-1">
                            Initial Observation
                          </p>
                          <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                            {selectedTask.initial_observation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Show all traces for this task */}
                    {traceDataList.map((traceData, index) => (
                      <div key={traceData.trace_id} className="mb-8">
                        {/* Trace step indicator */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                              {traceData.agent_name || "Agent"} &mdash; {selectedTask.traces?.[index]?.selected_action || "Action"}
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Depth {selectedTask.traces?.[index]?.thought_depth || 0} &bull; {traceData.trace_id.slice(0, 40)}...
                            </p>
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
                              <div className="mb-4 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-1">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                                      Response: {actionType?.toUpperCase()}
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

                        {/* Interactive Trace Explorer */}
                        <TraceExplorer trace={traceData} defaultOpenIndex={2} />
                      </div>
                    ))}
                  </>
                )}

                {!loadingDetail && selectedTaskId && traceDataList.length === 0 && (
                  <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p>Failed to load trace details</p>
                  </div>
                )}

                {!selectedTaskId && (
                  <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">Select an observation</p>
                    <p className="text-sm mt-1">Click on an observation to see how CIRIS reasoned through it</p>
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
