"use client";
import React, { useState, useEffect } from "react";

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

// CIRIS Wakeup Ritual letter labels (for reference)
// C = Core identity, I = Integrity, R = Resilience, I = Incompleteness, S = Signalling
const CIRIS_LETTER_LABELS: Record<string, { label: string; taskName: string }> = {
  C: { label: "Core Identity", taskName: "VERIFY_IDENTITY" },
  I_integrity: { label: "Integrity", taskName: "VALIDATE_INTEGRITY" },
  R: { label: "Resilience", taskName: "EVALUATE_RESILIENCE" },
  I_incompleteness: { label: "Incompleteness", taskName: "ACCEPT_INCOMPLETENESS" },
  S: { label: "Signalling Gratitude", taskName: "EXPRESS_GRATITUDE" },
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

// Additional icons for context sections
function ServerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function IdentityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SmallClipboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

// Expandable section component for context details
function ContextExpandableSection({
  title,
  icon,
  children,
  defaultOpen = false,
  badge,
  tooltip
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  tooltip?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title={tooltip}
      >
        <div className="flex items-center gap-2">
          <span className="text-purple-600 dark:text-purple-400">{icon}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
          {badge !== undefined && (
            <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-3 bg-white dark:bg-gray-900/50">
          {children}
        </div>
      )}
    </div>
  );
}

// Context Detail Component - renders the CONTEXT component data in a readable format
function ContextDetail({ data }: { data: Record<string, unknown> }) {
  const systemSnapshot = data.system_snapshot as Record<string, unknown> | undefined;

  if (!systemSnapshot) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 italic">
        No system snapshot available
      </div>
    );
  }

  const agentIdentity = systemSnapshot.agent_identity as Record<string, unknown> | undefined;
  const currentTask = systemSnapshot.current_task_details as Record<string, unknown> | undefined;
  const systemCounts = systemSnapshot.system_counts as Record<string, unknown> | undefined;
  const telemetry = systemSnapshot.telemetry_summary as Record<string, unknown> | undefined;
  const continuity = systemSnapshot.continuity_summary as Record<string, unknown> | undefined;
  const userProfiles = systemSnapshot.user_profiles as Array<Record<string, unknown>> | undefined;
  const availableTools = systemSnapshot.available_tools as Record<string, Array<Record<string, unknown>>> | undefined;
  const capabilities = systemSnapshot.identity_capabilities as string[] | undefined;
  const restrictions = systemSnapshot.identity_restrictions as string[] | undefined;

  // Format duration in human-readable form
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m`;
  };

  // Count total tools
  const totalTools = availableTools
    ? Object.values(availableTools).reduce((sum, tools) => sum + (tools?.length || 0), 0)
    : 0;

  return (
    <div className="space-y-3">
      {/* Overview Cards - Key metrics at a glance */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {systemCounts?.total_tasks !== undefined ? String(systemCounts.total_tasks) : "N/A"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Tasks</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {systemCounts?.pending_thoughts !== undefined ? String(systemCounts.pending_thoughts) : "N/A"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pending Thoughts</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {String(totalTools)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Available Tools</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {continuity ? formatDuration(Number(continuity.total_time_online_seconds || 0)) : "N/A"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Uptime</div>
        </div>
      </div>

      {/* Explanation of Context */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>What is Context?</strong> The context component provides a comprehensive snapshot of the agent&apos;s
          state at decision time. It includes identity, system metrics, user profiles, and available capabilities -
          all gathered by the ContextBuilder to inform the Decision Making Algorithms (DMAs).
        </p>
      </div>

      {/* Agent Identity Section */}
      <ContextExpandableSection
        title="Agent Identity"
        icon={<IdentityIcon />}
        defaultOpen={true}
        tooltip="Core identity information loaded from graph memory"
      >
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Agent ID</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{String(agentIdentity?.agent_id || "Unknown")}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Trust Level</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{Number(agentIdentity?.trust_level || 0).toFixed(2)}</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Version</span>
              <p className="text-sm font-mono text-gray-900 dark:text-white">{String(systemSnapshot.agent_version || "N/A")}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Codename</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{String(systemSnapshot.agent_codename || "N/A")}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Code Hash</span>
              <p className="text-sm font-mono text-gray-900 dark:text-white">{String(systemSnapshot.agent_code_hash || "N/A")}</p>
            </div>
          </div>

          {agentIdentity?.description ? (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Description</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-wrap">
                {String(agentIdentity.description).substring(0, 200)}...
              </p>
            </div>
          ) : null}

          {/* Capabilities & Restrictions */}
          {(capabilities || restrictions) ? (
            <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              {capabilities && capabilities.length > 0 ? (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Capabilities</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {capabilities.map((cap, idx) => (
                      <span key={idx} className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {restrictions && restrictions.length > 0 ? (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Restrictions</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {restrictions.map((res, idx) => (
                      <span key={idx} className="text-xs bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </ContextExpandableSection>

      {/* Current Task Section */}
      {currentTask ? (
        <ContextExpandableSection
          title="Current Task"
          icon={<SmallClipboardIcon />}
          tooltip="Details of the task being processed"
        >
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Task ID</span>
                <p className="text-sm font-mono text-gray-900 dark:text-white truncate">{String(currentTask.task_id || "N/A")}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</span>
                <span className={`inline-block text-xs px-2 py-0.5 rounded ${
                  currentTask.status === "active"
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300"
                }`}>
                  {String(currentTask.status || "unknown")}
                </span>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Channel</span>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{String(currentTask.channel_id || "N/A")}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Priority</span>
                <p className="text-sm text-gray-900 dark:text-white">{String(currentTask.priority ?? "0")}</p>
              </div>
            </div>
            {currentTask.parent_task_id ? (
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Parent Task</span>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{String(currentTask.parent_task_id)}</p>
              </div>
            ) : null}
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* Telemetry Section */}
      {telemetry ? (
        <ContextExpandableSection
          title="Telemetry Summary"
          icon={<ChartIcon />}
          badge={`${telemetry.messages_processed_24h || 0} msgs/24h`}
          tooltip="Resource usage and performance metrics"
        >
          <div className="space-y-3">
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {Number(telemetry.thoughts_processed_24h || 0)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Thoughts/24h</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {Number(telemetry.tasks_completed_24h || 0)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tasks/24h</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {Number(telemetry.errors_24h || 0)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Errors/24h</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {Number(telemetry.error_rate_percent || 0).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Error Rate</div>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Resource Usage (Last Hour)</span>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 mt-1">
                <div>
                  <span className="text-xs text-gray-400">Tokens</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {Number(telemetry.tokens_last_hour || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Cost</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(Number(telemetry.cost_last_hour_cents || 0) / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Carbon</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {Number(telemetry.carbon_last_hour_grams || 0).toFixed(1)}g CO2
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Energy</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {Number(telemetry.energy_last_hour_kwh || 0).toFixed(3)} kWh
                  </p>
                </div>
              </div>
            </div>

            {/* Avg Thought Depth */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Average Thought Depth: {Number(telemetry.avg_thought_depth || 0).toFixed(2)}
            </div>
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* Continuity Section */}
      {continuity ? (
        <ContextExpandableSection
          title="Continuity Summary"
          icon={<ClockIcon />}
          badge={`${continuity.total_shutdowns || 0} shutdowns`}
          tooltip="Agent uptime and session history"
        >
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">First Startup</span>
                <p className="text-sm text-gray-900 dark:text-white">
                  {continuity.first_startup ? new Date(String(continuity.first_startup)).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Session</span>
                <p className="text-sm text-gray-900 dark:text-white">
                  {formatDuration(Number(continuity.current_session_duration_seconds || 0))}
                </p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Online</span>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  {formatDuration(Number(continuity.total_time_online_seconds || 0))}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Offline</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatDuration(Number(continuity.total_time_offline_seconds || 0))}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Shutdowns</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {String(continuity.total_shutdowns || 0)}
                </p>
              </div>
            </div>
            {continuity.last_shutdown_reason ? (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Last shutdown: {String(continuity.last_shutdown_reason)} ({String(continuity.last_shutdown_consent) || "unknown"})
              </div>
            ) : null}
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* User Profiles Section */}
      {userProfiles && userProfiles.length > 0 ? (
        <ContextExpandableSection
          title="User Profiles"
          icon={<UserIcon />}
          badge={userProfiles.length}
          tooltip="Known users relevant to this thought"
        >
          <div className="space-y-2">
            {userProfiles.map((profile, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {String(profile.display_name || profile.user_id)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    profile.consent_stream === "PARTNERED"
                      ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                      : profile.consent_stream === "TEMPORARY"
                      ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
                      : "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300"
                  }`}>
                    {String(profile.consent_stream || "UNKNOWN")}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Trust: {Number(profile.trust_level || 0).toFixed(2)} |
                  Interactions: {String(profile.total_interactions || 0)} |
                  Style: {String(profile.communication_style || "default")}
                </div>
              </div>
            ))}
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* Available Tools Section */}
      {availableTools && totalTools > 0 ? (
        <ContextExpandableSection
          title="Available Tools"
          icon={<WrenchIcon />}
          badge={totalTools}
          tooltip="Tools the agent can use for actions"
        >
          <div className="space-y-2">
            {Object.entries(availableTools).map(([category, tools]) => (
              tools && tools.length > 0 ? (
                <div key={category}>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{category}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded cursor-help"
                        title={String(tool.description || "")}
                      >
                        {String(tool.name)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* Service Health Section */}
      {(systemSnapshot.service_health || systemSnapshot.circuit_breaker_status) ? (
        <ContextExpandableSection
          title="Service Health"
          icon={<ServerIcon />}
          tooltip="Health status of connected services and circuit breakers"
        >
          <div className="space-y-2">
            {Object.keys(systemSnapshot.service_health as Record<string, unknown> || {}).length > 0 ? (
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Services</span>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(systemSnapshot.service_health, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">All services healthy</p>
            )}
            {Object.keys(systemSnapshot.circuit_breaker_status as Record<string, unknown> || {}).length > 0 ? (
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Circuit Breakers</span>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(systemSnapshot.circuit_breaker_status, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        </ContextExpandableSection>
      ) : null}

      {/* Raw JSON fallback for any additional context fields */}
      {(data.gathered_context || data.relevant_memories || data.cognitive_state) ? (
        <ContextExpandableSection
          title="Additional Context"
          icon={<SmallClipboardIcon />}
          tooltip="Other context data gathered for this thought"
        >
          <pre className="text-xs bg-gray-900 dark:bg-black text-gray-300 p-2 rounded overflow-x-auto max-h-48">
            {JSON.stringify({
              gathered_context: data.gathered_context,
              relevant_memories: data.relevant_memories,
              cognitive_state: data.cognitive_state,
            }, null, 2)}
          </pre>
        </ContextExpandableSection>
      ) : null}
    </div>
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

// Icons for DMA components
function TargetIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <circle cx="12" cy="12" r="6" strokeWidth={2} />
      <circle cx="12" cy="12" r="2" strokeWidth={2} />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// DMA Result Card Component
function DMAResultCard({
  title,
  icon,
  score,
  scoreLabel,
  reasoning,
  flags,
  details,
  promptUsed,
  colorClass,
}: {
  title: string;
  icon: React.ReactNode;
  score?: number;
  scoreLabel?: string;
  reasoning: string;
  flags?: string[];
  details?: { label: string; value: string }[];
  promptUsed?: string;
  colorClass: string;
}) {
  const [showPrompt, setShowPrompt] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600 dark:text-green-400";
    if (score >= 0.6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 0.6) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  return (
    <div className={`rounded-lg border ${colorClass} p-4 space-y-3`}>
      {/* Header with title and score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 dark:text-yellow-400">{icon}</span>
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        </div>
        {score !== undefined && (
          <div className={`px-3 py-1 rounded-full ${getScoreBgColor(score)}`}>
            <span className={`font-bold ${getScoreColor(score)}`}>
              {(score * 100).toFixed(0)}%
            </span>
            {scoreLabel && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {scoreLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Flags if present */}
      {flags && flags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {flags.map((flag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700"
            >
              {flag}
            </span>
          ))}
        </div>
      )}

      {/* Additional details */}
      {details && details.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {details.map((detail, idx) => (
            <div key={idx} className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">{detail.label}:</span>{" "}
              <span className="text-gray-900 dark:text-white">{detail.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reasoning */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded p-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {reasoning}
        </p>
      </div>

      {/* Expandable prompt section */}
      {promptUsed && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <ChevronDownIcon className={`w-3 h-3 transition-transform ${showPrompt ? "rotate-180" : ""}`} />
            {showPrompt ? "Hide" : "Show"} prompt used
          </button>
          {showPrompt && (
            <pre className="mt-2 p-2 rounded bg-gray-900 dark:bg-black text-xs text-gray-400 overflow-x-auto max-h-48">
              {promptUsed}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// DMA Rationale Detail Component - renders the full DMA analysis
function DMARationaleDetail({ data }: { data: Record<string, unknown> }) {
  const csdma = data.csdma as Record<string, unknown> | undefined;
  const dsdma = data.dsdma as Record<string, unknown> | undefined;
  const pdma = data.pdma as Record<string, unknown> | undefined;
  const idma = data.idma as Record<string, unknown> | undefined;

  return (
    <div className="space-y-4">
      {/* DMA Overview Header */}
      <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          Decision-Making Algorithm (DMA) Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The DMA evaluates each thought through multiple lenses before selecting an action.
          Three specialized DMAs analyze the thought from different perspectives: plausibility,
          domain alignment, and ethical principles.
        </p>
      </div>

      {csdma ? (
        <DMAResultCard
          title="CSDMA - Context-Sensitive Analysis"
          icon={<CheckCircleIcon />}
          score={typeof csdma.plausibility_score === "number" ? csdma.plausibility_score : undefined}
          scoreLabel="plausibility"
          reasoning={String(csdma.reasoning || "No reasoning provided")}
          flags={Array.isArray(csdma.flags) ? csdma.flags.map(String) : undefined}
          promptUsed={typeof csdma.prompt_used === "string" ? csdma.prompt_used : undefined}
          colorClass="border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10"
        />
      ) : null}

      {dsdma ? (
        <DMAResultCard
          title={`DSDMA - ${String(dsdma.domain || "Domain")} Analysis`}
          icon={<TargetIcon />}
          score={typeof dsdma.domain_alignment === "number" ? dsdma.domain_alignment : undefined}
          scoreLabel="alignment"
          reasoning={String(dsdma.reasoning || "No reasoning provided")}
          flags={Array.isArray(dsdma.flags) ? dsdma.flags.map(String) : undefined}
          details={[
            { label: "Domain", value: String(dsdma.domain || "Unknown") },
          ]}
          promptUsed={typeof dsdma.prompt_used === "string" ? dsdma.prompt_used : undefined}
          colorClass="border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10"
        />
      ) : null}

      {pdma ? (
        <DMAResultCard
          title="PDMA - Ethical Principles Analysis"
          icon={<UsersIcon />}
          reasoning={String(pdma.reasoning || "No reasoning provided")}
          details={[
            { label: "Stakeholders", value: String(pdma.stakeholders || "Unknown") },
            { label: "Conflicts", value: String(pdma.conflicts || "None") },
          ]}
          promptUsed={typeof pdma.prompt_used === "string" ? pdma.prompt_used : undefined}
          colorClass="border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10"
        />
      ) : null}

      {pdma?.alignment_check ? (
        <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <ScaleIcon />
            Alignment Check
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {String(pdma.alignment_check)}
          </p>
        </div>
      ) : null}

      {/* IDMA - Intuition/Information Diversity Analysis */}
      {idma ? (
        <div className="rounded-lg border border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            IDMA - Information Diversity Analysis
          </h4>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {typeof idma.k_eff === "number" && (
              <div className="rounded bg-white dark:bg-gray-800 p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">k_eff</p>
                <p className={`text-lg font-bold ${idma.k_eff < 2 ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}>
                  {Number(idma.k_eff).toFixed(2)}
                </p>
              </div>
            )}
            {typeof idma.phase === "string" && idma.phase && (
              <div className="rounded bg-white dark:bg-gray-800 p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Phase</p>
                <p className={`text-sm font-bold ${
                  idma.phase.toUpperCase() === "HEALTHY" ? "text-green-600 dark:text-green-400" :
                  idma.phase.toUpperCase() === "CHAOS" ? "text-red-600 dark:text-red-400" :
                  "text-orange-600 dark:text-orange-400"
                }`}>
                  {idma.phase.toUpperCase()}
                </p>
              </div>
            )}
            {typeof idma.correlation_risk === "number" && (
              <div className="rounded bg-white dark:bg-gray-800 p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Correlation</p>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {Number(idma.correlation_risk).toFixed(2)}
                </p>
              </div>
            )}
            {typeof idma.fragility_flag === "boolean" && (
              <div className="rounded bg-white dark:bg-gray-800 p-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Fragile?</p>
                <p className={`text-sm font-bold ${idma.fragility_flag ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}>
                  {idma.fragility_flag ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>

          {/* Sources identified */}
          {Array.isArray(idma.sources_identified) && idma.sources_identified.length > 0 ? (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Sources Identified:</p>
              <div className="flex flex-wrap gap-1">
                {(idma.sources_identified as unknown[]).map((source: unknown, idx: number) => (
                  <span key={idx} className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                    {String(source)}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Correlation factors */}
          {Array.isArray(idma.correlation_factors) && idma.correlation_factors.length > 0 ? (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Correlation Factors:</p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside">
                {(idma.correlation_factors as unknown[]).map((factor: unknown, idx: number) => (
                  <li key={idx}>{String(factor)}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Reasoning */}
          {typeof idma.reasoning === "string" && idma.reasoning ? (
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Reasoning:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {idma.reasoning}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {data.combined_analysis ? (
        <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Combined Analysis
          </h4>
          <pre className="p-2 rounded bg-gray-900 dark:bg-black text-xs text-gray-300 overflow-x-auto">
            {JSON.stringify(data.combined_analysis, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

// ASPDMA (Action Selection) Detail Component
function ASPDMARationaleDetail({ data }: { data: Record<string, unknown> }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const selectedAction = String(data.selected_action || "").replace("HandlerActionType.", "");
  const isRecursive = Boolean(data.is_recursive);

  return (
    <div className="space-y-4">
      {/* Action Selection Header */}
      <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white">
            Action Selection DMA (ASPDMA)
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold">
              {selectedAction}
            </span>
            {isRecursive && (
              <span className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs">
                Recursive
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The ASPDMA synthesizes all prior DMA evaluations to select the most appropriate
          action for the current thought, ensuring alignment with CIRIS principles.
        </p>
      </div>

      {/* Action Rationale */}
      {data.action_rationale ? (
        <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <BrainIcon />
            Rationale
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {String(data.action_rationale)}
          </p>
        </div>
      ) : null}

      {/* Reasoning Summary if present */}
      {data.reasoning_summary ? (
        <div className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Reasoning Summary
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {String(data.reasoning_summary)}
          </p>
        </div>
      ) : null}

      {/* Alternatives Considered if present */}
      {data.alternatives_considered ? (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Alternatives Considered
          </h4>
          <pre className="p-2 rounded bg-gray-900 dark:bg-black text-xs text-gray-300 overflow-x-auto">
            {JSON.stringify(data.alternatives_considered, null, 2)}
          </pre>
        </div>
      ) : null}

      {/* Selection Confidence if present */}
      {typeof data.selection_confidence === "number" ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Selection Confidence:</span>
          <span className={`px-2 py-0.5 rounded text-sm font-medium ${
            data.selection_confidence >= 0.8
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : data.selection_confidence >= 0.6
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
          }`}>
            {(data.selection_confidence * 100).toFixed(0)}%
          </span>
        </div>
      ) : null}

      {/* Expandable prompt section */}
      {data.aspdma_prompt ? (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <ChevronDownIcon className={`w-3 h-3 transition-transform ${showPrompt ? "rotate-180" : ""}`} />
            {showPrompt ? "Hide" : "Show"} ASPDMA prompt
          </button>
          {showPrompt && (
            <pre className="mt-2 p-2 rounded bg-gray-900 dark:bg-black text-xs text-gray-400 overflow-x-auto max-h-64">
              {String(data.aspdma_prompt)}
            </pre>
          )}
        </div>
      ) : null}
    </div>
  );
}

// Icons for different action types
function SpeakIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function TaskCompleteIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DeferIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ObserveActionIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function ActionToolIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MemorizeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}

function RecallIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
    </svg>
  );
}

function ForgetIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function RejectIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function PonderIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function getActionIcon(actionType: string) {
  const normalized = actionType.toLowerCase().replace("handleractiontype.", "");
  switch (normalized) {
    case "speak":
      return <SpeakIcon />;
    case "task_complete":
      return <TaskCompleteIcon />;
    case "defer":
      return <DeferIcon />;
    case "observe":
      return <ObserveActionIcon />;
    case "tool":
      return <ActionToolIcon />;
    case "memorize":
      return <MemorizeIcon />;
    case "recall":
      return <RecallIcon />;
    case "forget":
      return <ForgetIcon />;
    case "reject":
      return <RejectIcon />;
    case "ponder":
      return <PonderIcon />;
    default:
      return <BoltIcon />;
  }
}

// Action type categories for styling
const ACTION_CATEGORIES: Record<string, { category: string; description: string }> = {
  speak: { category: "External", description: "Communicate with user" },
  tool: { category: "External", description: "Execute external tool" },
  observe: { category: "External", description: "Passive monitoring" },
  memorize: { category: "Memory", description: "Store information" },
  recall: { category: "Memory", description: "Retrieve information" },
  forget: { category: "Memory", description: "Remove information" },
  defer: { category: "Control", description: "Postpone task" },
  ponder: { category: "Control", description: "Follow-up thought" },
  reject: { category: "Control", description: "Refuse request" },
  task_complete: { category: "Terminal", description: "Mark task done" },
};

// Action Result Detail Component - renders the action execution results with red theme
function ActionDetail({ data }: { data: Record<string, unknown> }) {
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const actionExecuted = String(data.action_executed || "unknown").toLowerCase();
  const executionSuccess = Boolean(data.execution_success);
  const executionError = data.execution_error ? String(data.execution_error) : null;
  const executionTimeMs = Number(data.execution_time_ms || 0);

  // Token and cost data
  const tokensInput = Number(data.tokens_input || 0);
  const tokensOutput = Number(data.tokens_output || 0);
  const tokensTotal = Number(data.tokens_total || 0);
  const costCents = Number(data.cost_cents || 0);
  const carbonGrams = Number(data.carbon_grams || 0);
  const energyMwh = Number(data.energy_mwh || 0);
  const llmCalls = Number(data.llm_calls || 0);
  const modelsUsed = Array.isArray(data.models_used) ? data.models_used : [];

  // Audit data
  const auditEntryId = data.audit_entry_id ? String(data.audit_entry_id) : null;
  const auditSequenceNumber = data.audit_sequence_number !== undefined ? Number(data.audit_sequence_number) : null;
  const auditEntryHash = data.audit_entry_hash ? String(data.audit_entry_hash) : null;
  const auditSignature = data.audit_signature ? String(data.audit_signature) : null;

  // Action parameters
  const actionParameters = data.action_parameters as Record<string, unknown> | null;
  const followUpThoughtId = data.follow_up_thought_id ? String(data.follow_up_thought_id) : null;

  const actionInfo = ACTION_CATEGORIES[actionExecuted] || { category: "Unknown", description: "Unknown action" };

  // Format large numbers with commas
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="space-y-4">
      {/* Action Type Header */}
      <div className={`rounded-lg p-4 ${executionSuccess ? "bg-red-100 dark:bg-red-900/30" : "bg-red-200 dark:bg-red-800/40"}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${executionSuccess ? "bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-300" : "bg-red-300 dark:bg-red-700/50 text-red-800 dark:text-red-200"}`}>
            {getActionIcon(actionExecuted)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg text-gray-900 dark:text-white uppercase">
                {actionExecuted.replace(/_/g, " ")}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                actionInfo.category === "External" ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200" :
                actionInfo.category === "Memory" ? "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200" :
                actionInfo.category === "Control" ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200" :
                "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
              }`}>
                {actionInfo.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{actionInfo.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-sm font-medium px-2 py-1 rounded ${executionSuccess ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" : "bg-red-300 dark:bg-red-700 text-red-800 dark:text-red-200"}`}>
              {executionSuccess ? "SUCCESS" : "FAILED"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {executionTimeMs.toFixed(2)}ms
            </span>
          </div>
        </div>
        {executionError && (
          <div className="mt-3 p-2 rounded bg-red-200 dark:bg-red-800/50 text-red-800 dark:text-red-200 text-sm">
            <span className="font-medium">Error:</span> {executionError}
          </div>
        )}
      </div>

      {/* Action Parameters (expandable) */}
      {actionParameters && Object.keys(actionParameters).length > 0 && (
        <div>
          <button
            onClick={() => setShowParameters(!showParameters)}
            className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showParameters ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Action Parameters
          </button>
          {showParameters && (
            <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
              {actionExecuted === "speak" && actionParameters.content ? (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase">Content:</p>
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {String(actionParameters.content)}
                  </p>
                </div>
              ) : actionExecuted === "task_complete" && actionParameters.completion_reason ? (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase">Completion Reason:</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {String(actionParameters.completion_reason)}
                  </p>
                </div>
              ) : (
                <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {JSON.stringify(actionParameters, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {/* Token Usage & Cost */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
          Resource Usage
        </h4>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tokens</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200">
                {formatNumber(tokensTotal)}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              In: {formatNumber(tokensInput)} / Out: {formatNumber(tokensOutput)}
            </div>
          </div>
          <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Cost</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200">
                ${(costCents / 100).toFixed(4)}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {costCents.toFixed(4)} cents
            </div>
          </div>
          <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">LLM Calls</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200">
                {llmCalls}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate" title={modelsUsed.join(", ")}>
              {modelsUsed.length > 0 ? String(modelsUsed[0]).split("/").pop() : "N/A"}
            </div>
          </div>
          <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Carbon</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200">
                {carbonGrams.toFixed(2)}g CO2
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(energyMwh / 1000).toFixed(2)} Wh
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up Thought */}
      {followUpThoughtId && (
        <div className="rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Follow-up Thought</span>
          </div>
          <code className="text-xs text-gray-600 dark:text-gray-400 mt-1 block font-mono">
            {followUpThoughtId}
          </code>
        </div>
      )}

      {/* Audit Trail (expandable) */}
      {auditEntryId && (
        <div>
          <button
            onClick={() => setShowAuditTrail(!showAuditTrail)}
            className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showAuditTrail ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Cryptographic Audit Trail
            <span className="text-xs px-2 py-0.5 rounded bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-normal normal-case">
              Ed25519 Signed
            </span>
          </button>
          {showAuditTrail && (
            <div className="space-y-2">
              <div className="rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Entry ID</p>
                    <code className="text-xs text-gray-700 dark:text-gray-300 break-all">{auditEntryId}</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Sequence Number</p>
                    <code className="text-xs text-gray-700 dark:text-gray-300">#{auditSequenceNumber}</code>
                  </div>
                </div>
              </div>
              {auditEntryHash && (
                <div className="rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Hash Chain Entry (SHA256)</p>
                  <code className="text-xs text-gray-700 dark:text-gray-300 break-all font-mono">{auditEntryHash}</code>
                </div>
              )}
              {auditSignature && (
                <div className="rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Ed25519 Signature</p>
                  <code className="text-xs text-gray-700 dark:text-gray-300 break-all font-mono">{auditSignature.substring(0, 64)}...</code>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper icons for observation display
function InfoIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function SmallEyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

// Observation Detail Component - displays what triggered the agent's thought
function ObservationDetail({ data }: { data: Record<string, unknown> }) {
  const [showTaskDescription, setShowTaskDescription] = useState(false);
  const [showRawData, setShowRawData] = useState(false);

  const thoughtType = String(data.thought_type || "unknown");
  const thoughtStatus = String(data.thought_status || "unknown");
  const roundNumber = Number(data.round_number ?? 0);
  const thoughtDepth = Number(data.thought_depth ?? 0);
  const parentThoughtId = data.parent_thought_id as string | null;
  const taskPriority = Number(data.task_priority ?? 0);
  const taskDescription = String(data.task_description || "");
  const channelId = String(data.channel_id || "unknown");
  const sourceAdapter = data.source_adapter as string | null;
  const updatedInfoAvailable = Boolean(data.updated_info_available);
  const requiresHumanInput = data.requires_human_input as boolean | null;
  const initialContext = data.initial_context as string | null;

  // Determine the thought depth badge color
  const getDepthColor = (depth: number) => {
    if (depth === 0) return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300";
    if (depth === 1) return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300";
    return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
  };

  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300";
      case "completed":
        return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300";
      case "failed":
        return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      {/* Observation Summary - What triggered this thought */}
      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400">
            <SmallEyeIcon />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Thought Trigger</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This observation captures what initiated the agent&apos;s cognitive processing.
              It represents the input or stimulus that created this thought in the H3ERE pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Thought Type */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><LayersIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Thought Type</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white capitalize">{thoughtType}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <InfoIcon />
              <span className="sr-only">Info:</span>
              {thoughtType === "standard" ? "Normal processing" : "Special handling"}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><RefreshIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</span>
          </div>
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(thoughtStatus)}`}>
            {thoughtStatus}
          </span>
        </div>

        {/* Thought Depth */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><LayersIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Thought Depth</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getDepthColor(thoughtDepth)}`}>
              Depth {thoughtDepth}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {thoughtDepth === 0 ? "(initial thought)" : `(follow-up after ${thoughtDepth} ponder${thoughtDepth > 1 ? "s" : ""})`}
            </span>
          </div>
        </div>

        {/* Round Number */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><HashIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Round</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">{roundNumber}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">processing iteration</span>
          </div>
        </div>

        {/* Task Priority */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><LayersIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
              taskPriority === 0 ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400" :
              taskPriority > 5 ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" :
              "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
            }`}>
              {taskPriority}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {taskPriority === 0 ? "(normal)" : taskPriority > 5 ? "(urgent)" : "(elevated)"}
            </span>
          </div>
        </div>

        {/* Channel ID */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 dark:text-gray-400"><HashIcon /></span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Channel</span>
          </div>
          <code className="text-xs bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 break-all">
            {channelId}
          </code>
        </div>
      </div>

      {/* Status Flags */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide flex items-center gap-2">
          <InfoIcon />
          Status Flags
        </h4>
        <div className="grid gap-2 sm:grid-cols-3">
          {/* Updated Info Available */}
          <div className={`rounded border p-3 ${
            updatedInfoAvailable
              ? "border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20"
              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Info Available</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                updatedInfoAvailable
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {updatedInfoAvailable ? "YES" : "no"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              New observation arrived during processing
            </p>
          </div>

          {/* Requires Human Input */}
          <div className={`rounded border p-3 ${
            requiresHumanInput
              ? "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20"
              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Human Input Needed</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                requiresHumanInput
                  ? "bg-orange-500 text-white"
                  : requiresHumanInput === null
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {requiresHumanInput === null ? "N/A" : requiresHumanInput ? "YES" : "no"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Task requires human approval or input
            </p>
          </div>

          {/* Has Parent Thought */}
          <div className={`rounded border p-3 ${
            parentThoughtId
              ? "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20"
              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Has Parent</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                parentThoughtId
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {parentThoughtId ? "YES" : "no"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {parentThoughtId ? "Follow-up from prior thought" : "Seed thought (original)"}
            </p>
          </div>
        </div>
      </div>

      {/* Source Adapter (if present) */}
      {sourceAdapter ? (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500 dark:text-gray-400"><UserIcon /></span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Source Adapter</span>
          </div>
          <code className="text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
            {sourceAdapter}
          </code>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            The adapter that received this observation (e.g., Discord, API, CLI)
          </p>
        </div>
      ) : null}

      {/* Parent Thought ID (if present) */}
      {parentThoughtId ? (
        <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-600 dark:text-purple-400"><LayersIcon /></span>
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Parent Thought</span>
          </div>
          <code className="text-xs bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded text-purple-700 dark:text-purple-300 break-all">
            {parentThoughtId}
          </code>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
            This thought is a follow-up created after an action (like PONDER or OBSERVE) from the parent thought.
          </p>
        </div>
      ) : null}

      {/* Initial Context (if present) */}
      {initialContext ? (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500 dark:text-gray-400"><SmallClipboardIcon /></span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Initial Context</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{initialContext}</p>
        </div>
      ) : null}

      {/* Task Description - Expandable */}
      {taskDescription ? (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <button
            onClick={() => setShowTaskDescription(!showTaskDescription)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400"><SmallClipboardIcon /></span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Task Description</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">(the observation content)</span>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${showTaskDescription ? "rotate-180" : ""}`} />
          </button>
          {showTaskDescription ? (
            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 mb-2">
                This is what the agent is being asked to process. It can be a user message, a system task,
                or a wakeup ritual instruction.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto">
                {taskDescription}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Raw Data - Expandable */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <button
          onClick={() => setShowRawData(!showRawData)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Raw JSON Data</span>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${showRawData ? "rotate-180" : ""}`} />
        </button>
        {showRawData ? (
          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <pre className="mt-3 p-3 rounded bg-gray-900 dark:bg-black text-xs text-gray-300 overflow-x-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Conscience-specific icons
function ConscienceCheckmarkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ConscienceXMarkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ConscienceChevronIcon({ isOpen, className = "w-4 h-4" }: { isOpen: boolean; className?: string }) {
  return (
    <svg className={`${className} transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function HeartPulseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h2l1-2 2 4 1-2h2" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

// Individual conscience check card with expandable details
function ConscienceCheckCard({
  name,
  description,
  passed,
  score,
  threshold,
  reason,
  details,
  confidence,
}: {
  name: string;
  description: string;
  passed: boolean;
  score?: number;
  threshold?: number;
  reason?: string;
  details?: string;
  confidence?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-lg border-2 transition-all ${
      passed
        ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
        : "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 rounded-full p-1 ${
            passed
              ? "bg-green-500 dark:bg-green-600 text-white"
              : "bg-red-500 dark:bg-red-600 text-white"
          }`}>
            {passed ? (
              <ConscienceCheckmarkIcon className="w-4 h-4" />
            ) : (
              <ConscienceXMarkIcon className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {score !== undefined && threshold !== undefined && (
            <span className={`text-xs font-mono px-2 py-1 rounded ${
              passed
                ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
            }`}>
              {score.toFixed(2)} / {threshold.toFixed(2)}
            </span>
          )}
          {confidence !== undefined && (
            <span className={`text-xs font-mono px-2 py-1 rounded ${
              passed
                ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
            }`}>
              {(confidence * 100).toFixed(0)}%
            </span>
          )}
          <ConscienceChevronIcon isOpen={isExpanded} className="w-4 h-4 text-gray-500" />
        </div>
      </button>

      {isExpanded && (reason || details) && (
        <div className="px-3 pb-3 pt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            {reason && (
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {reason}
              </p>
            )}
            {details && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                {details}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Bypass guardrail card (amber/green themed)
function BypassGuardrailCard({
  name,
  description,
  triggered,
  statusText,
  details,
}: {
  name: string;
  description: string;
  triggered: boolean;
  statusText: string;
  details?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-lg border-2 transition-all ${
      triggered
        ? "border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20"
        : "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 rounded-full p-1 ${
            triggered
              ? "bg-amber-500 dark:bg-amber-600 text-white"
              : "bg-green-500 dark:bg-green-600 text-white"
          }`}>
            {triggered ? (
              <AlertTriangleIcon className="w-4 h-4" />
            ) : (
              <ShieldCheckIcon className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            triggered
              ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
              : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
          }`}>
            {statusText}
          </span>
          <ConscienceChevronIcon isOpen={isExpanded} className="w-4 h-4 text-gray-500" />
        </div>
      </button>

      {isExpanded && details && (
        <div className="px-3 pb-3 pt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
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
  const epistemicData = data.epistemic_data as Record<string, unknown> | undefined;

  // Count passed checks for summary
  const bypassGuardrailsCount = 2;
  const bypassGuardrailsPassed = (!updatedStatusDetected ? 1 : 0) + (!thoughtDepthTriggered ? 1 : 0);
  const ethicalFacultiesCount = 4;
  const ethicalFacultiesPassed = ethicalFacultiesSkipped ? 0 : (
    (entropyPassed ? 1 : 0) +
    (coherencePassed ? 1 : 0) +
    (optimizationVetoPassed ? 1 : 0) +
    (epistemicHumilityPassed ? 1 : 0)
  );

  return (
    <div className="space-y-4">
      {/* Overall Result Header */}
      <div className={`rounded-lg p-4 ${
        consciencePassed
          ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border-2 border-green-400 dark:border-green-600"
          : "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 border-2 border-red-400 dark:border-red-600"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${
              consciencePassed
                ? "bg-green-500 dark:bg-green-600"
                : "bg-red-500 dark:bg-red-600"
            }`}>
              {consciencePassed ? (
                <ConscienceCheckmarkIcon className="w-6 h-6 text-white" />
              ) : (
                <ConscienceXMarkIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {consciencePassed ? "Conscience Passed" : "Conscience Failed"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Action: <span className="font-mono font-medium">{String(data.final_action || "").replace("HandlerActionType.", "")}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className={`text-center px-3 py-1 rounded-lg ${
              bypassGuardrailsPassed === bypassGuardrailsCount
                ? "bg-green-200 dark:bg-green-800"
                : "bg-amber-200 dark:bg-amber-800"
            }`}>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{bypassGuardrailsPassed}/{bypassGuardrailsCount}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Guardrails</div>
            </div>
            <div className={`text-center px-3 py-1 rounded-lg ${
              ethicalFacultiesSkipped
                ? "bg-gray-200 dark:bg-gray-800"
                : ethicalFacultiesPassed === ethicalFacultiesCount
                  ? "bg-green-200 dark:bg-green-800"
                  : "bg-red-200 dark:bg-red-800"
            }`}>
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {ethicalFacultiesSkipped ? "-" : `${ethicalFacultiesPassed}/${ethicalFacultiesCount}`}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Ethical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Epistemic State */}
      {epistemicData && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide flex items-center gap-2">
            <HeartPulseIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            Epistemic State
          </h4>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {Number(epistemicData.entropy_level || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Entropy</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {Number(epistemicData.coherence_level || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Coherence</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {Number(epistemicData.confidence_level || epistemicData.certainty_level || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Confidence</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {Number(epistemicData.stability_index || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Stability</div>
            </div>
          </div>
        </div>
      )}

      {/* Bypass Guardrails Section */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide flex items-center gap-2">
          <ShieldCheckIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Bypass Guardrails
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">(run on ALL actions)</span>
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <BypassGuardrailCard
            name="Updated Status Conscience"
            description="Detects new information requiring re-evaluation"
            triggered={updatedStatusDetected}
            statusText={updatedStatusDetected ? "TRIGGERED" : "Clear"}
            details={updatedStatusDetected
              ? "New information was detected that may affect the decision. The agent may need to re-evaluate its reasoning."
              : "No new information detected. The current evaluation remains valid."
            }
          />
          <BypassGuardrailCard
            name="Thought Depth Guardrail"
            description="Prevents infinite recursive thinking loops"
            triggered={thoughtDepthTriggered}
            statusText={thoughtDepthTriggered
              ? "TRIGGERED"
              : `${data.thought_depth_current ?? "0"}/${data.thought_depth_max ?? "5"}`
            }
            details={thoughtDepthTriggered
              ? "Maximum thought depth exceeded. The agent must stop recursive thinking to prevent infinite loops."
              : `Current thought depth is within limits. Depth: ${data.thought_depth_current ?? "0"} of max ${data.thought_depth_max ?? "5"}.`
            }
          />
        </div>
      </div>

      {/* Ethical Faculties Section */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide flex items-center gap-2">
          <ScaleIcon />
          <span className="text-green-600 dark:text-green-400">Ethical Faculties</span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">(4 conscience checks)</span>
        </h4>

        {ethicalFacultiesSkipped ? (
          <div className="rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ethical faculties were skipped for this action (e.g., follow-up thoughts or internal operations).
            </p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            <ConscienceCheckCard
              name="Entropy Conscience"
              description="Monitors uncertainty levels in reasoning"
              passed={entropyPassed}
              score={Number(data.entropy_score || 0)}
              threshold={Number(data.entropy_threshold || 0.4)}
              reason={String(data.entropy_reason || "Entropy level within acceptable bounds.")}
              details="Lower entropy indicates more certainty. High entropy may require the agent to seek more information."
            />
            <ConscienceCheckCard
              name="Coherence Conscience"
              description="Ensures reasoning is internally consistent"
              passed={coherencePassed}
              score={Number(data.coherence_score || 0)}
              threshold={Number(data.coherence_threshold || 0.6)}
              reason={String(data.coherence_reason || "Reasoning is coherent and consistent.")}
              details="Higher coherence indicates better alignment between beliefs, goals, and actions."
            />
            <ConscienceCheckCard
              name="Optimization Veto"
              description="Prevents harmful optimization pressures"
              passed={optimizationVetoPassed}
              reason={String(data.optimization_veto_justification || "No harmful optimization patterns detected.")}
              details={`Decision: ${String(data.optimization_veto_decision || "ALLOW")}`}
            />
            <ConscienceCheckCard
              name="Epistemic Humility"
              description="Maintains appropriate uncertainty about knowledge"
              passed={epistemicHumilityPassed}
              confidence={Number(data.epistemic_humility_certainty || 0)}
              reason={String(data.epistemic_humility_justification || "Agent maintains appropriate epistemic humility.")}
              details="Ensures the agent does not overstate its confidence in uncertain situations."
            />
          </div>
        )}
      </div>
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
          {component.event_type === "THOUGHT_START" ? (
            <div className="mt-4">
              <ObservationDetail data={component.data} />
            </div>
          ) : component.event_type === "CONSCIENCE_RESULT" ? (
            <div className="mt-4">
              <ConscienceDetail data={component.data} />
            </div>
          ) : component.event_type === "DMA_RESULTS" ? (
            <div className="mt-4">
              <DMARationaleDetail data={component.data} />
            </div>
          ) : component.event_type === "ASPDMA_RESULT" ? (
            <div className="mt-4">
              <ASPDMARationaleDetail data={component.data} />
            </div>
          ) : component.event_type === "SNAPSHOT_AND_CONTEXT" ? (
            <div className="mt-4">
              <ContextDetail data={component.data} />
            </div>
          ) : component.event_type === "ACTION_RESULT" ? (
            <div className="mt-4">
              <ActionDetail data={component.data} />
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
        // Static file loading removed - traces now loaded via API
        console.warn("TraceExplorer: No trace prop provided, static files no longer supported");
        setTraceData(null);
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
              {CIRIS_LETTER_LABELS[selectedLetter]?.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">
              ({CIRIS_LETTER_LABELS[selectedLetter]?.taskName})
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
