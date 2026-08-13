"use client";
import { useEffect, useState, useCallback } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

// Data comes from ciris-status (CIRISAI/CIRISStatus), a fabric node whose
// StatusAdapter probes every target each cycle and signs the results into its
// own record. Response shapes below mirror the documented contract in that
// repo's README (v0.3.41+): per-day history carries `uptime_pct` (with an
// `overall_uptime_pct` alias), a one-word `status`, per-region/service
// breakdowns, and `outage_count` counting incidents, not samples.

type StatusLevel = "operational" | "degraded" | "outage";
// The aggregate rollup has two extra levels the per-service statuses never use.
type OverallLevel = StatusLevel | "partial_outage" | "major_outage";

interface ProviderStatus {
  status: StatusLevel;
  latency_ms?: number | null;
  source?: string;
  name?: string;
  url?: string | null;
  provider?: string;
}

interface RegionData {
  name: string;
  status: StatusLevel;
  services: Record<string, ProviderStatus>;
}

interface StatusData {
  status: OverallLevel;
  timestamp: string;
  last_incident: string | null;
  regions?: Record<string, RegionData>;
  services?: Record<string, ProviderStatus>; // Legacy fallback
  infrastructure?: Record<string, ProviderStatus>;
  llm_providers?: Record<string, ProviderStatus>;
  auth_providers?: Record<string, ProviderStatus>;
  database_providers?: Record<string, ProviderStatus>;
  internal_providers?: Record<string, ProviderStatus>;
}

const API_BASE = "https://lens.ciris-services-1.ai/status/api/v1";
const STATUS_API = `${API_BASE}/status`;
const HISTORY_API = `${API_BASE}/status/history`;
const CI_API = `${API_BASE}/ci`;

interface ServiceDayStats {
  uptime_pct?: number;
  avg_latency_ms?: number;
  outage_count?: number;
}

interface RegionDayStats {
  uptime_pct?: number;
  services?: Record<string, ServiceDayStats>;
}

interface HistoryEntry {
  date: string;
  uptime_pct?: number;
  overall_uptime_pct?: number; // alias kept by the API for compatibility
  status?: StatusLevel;
  outage_count?: number;
  regions?: Record<string, RegionDayStats>;
  services?: Record<string, ServiceDayStats>; // flat "region.stack.probe" keys
}

interface HistoryData {
  days: number;
  region: string | null;
  history: HistoryEntry[];
}

type CiRunResult = "success" | "failure" | "in_progress" | "queued" | "cancelled";

interface CiRepo {
  repo: string;
  runs: CiRunResult[];
}

interface CiData {
  timestamp: string;
  repos: CiRepo[];
}

/** The day's uptime number, whichever field the API spelled it with. */
function dayUptime(entry: HistoryEntry): number | null {
  const v = entry.uptime_pct ?? entry.overall_uptime_pct;
  return typeof v === "number" ? v : null;
}

const OVERALL_META: Record<OverallLevel, { label: string; dot: string; badge: string }> = {
  operational: {
    label: "All systems operational",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  degraded: {
    label: "Degraded performance",
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  partial_outage: {
    label: "Partial outage",
    dot: "bg-orange-500",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  major_outage: {
    label: "Major outage",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
  outage: {
    label: "Outage",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
};

/** Unknown strings from a newer API render as degraded rather than crashing. */
function overallMeta(status: string) {
  return OVERALL_META[(status as OverallLevel) in OVERALL_META ? (status as OverallLevel) : "degraded"];
}

function StatusIndicator({ status }: { status: StatusLevel }) {
  const colors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    outage: "bg-red-500",
  };
  return <span className={`inline-block h-3 w-3 rounded-full ${colors[status] ?? "bg-gray-400"}`} />;
}

function StatusBadge({ status, size = "md" }: { status: StatusLevel; size?: "sm" | "md" }) {
  const styles = {
    operational: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    degraded: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    outage: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  const labels = {
    operational: "Operational",
    degraded: "Degraded",
    outage: "Outage",
  };
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  return (
    <span className={`rounded-full font-medium ${sizeClass} ${styles[status] ?? styles.degraded}`}>
      {labels[status] ?? status}
    </span>
  );
}

function ServiceRow({ displayName, status, latency }: { displayName: string; status: StatusLevel; latency?: number | null }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-3">
        <StatusIndicator status={status} />
        <span className="font-medium text-gray-900 dark:text-white">{displayName}</span>
      </div>
      <div className="flex items-center gap-4">
        {latency !== undefined && latency !== null && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{latency}ms</span>
        )}
        <StatusBadge status={status} size="sm" />
      </div>
    </div>
  );
}

function ServiceSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

function RegionCard({
  regionKey,
  region,
  infrastructure,
  avgUptime90d,
}: {
  regionKey: string;
  region: RegionData;
  infrastructure?: ProviderStatus;
  avgUptime90d?: number | null;
}) {
  const regionIcons: Record<string, string> = {
    us: "🇺🇸",
    eu: "🇪🇺",
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${
      region.status === "operational"
        ? "border-green-500 bg-green-50 dark:bg-green-900/10"
        : region.status === "degraded"
        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
        : "border-red-500 bg-red-50 dark:bg-red-900/10"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{regionIcons[regionKey] || "🌍"}</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{region.name}</h3>
        </div>
        <StatusBadge status={region.status} />
      </div>

      <div className="space-y-2">
        {Object.entries(region.services).map(([key, service]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <StatusIndicator status={service.status} />
              <span className="text-gray-700 dark:text-gray-300">{service.name || key}</span>
            </div>
            {service.latency_ms && (
              <span className="text-gray-500 dark:text-gray-400">{service.latency_ms}ms</span>
            )}
          </div>
        ))}
        {infrastructure && (
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <StatusIndicator status={infrastructure.status} />
              <span className="text-gray-500 dark:text-gray-400">Infrastructure</span>
            </div>
            {infrastructure.latency_ms && (
              <span className="text-gray-500 dark:text-gray-400">{infrastructure.latency_ms}ms</span>
            )}
          </div>
        )}
        {typeof avgUptime90d === "number" && (
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400">90-day uptime</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{avgUptime90d.toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** "us.cirisbilling.google_oauth" → { region: "US", name: "Billing · Google OAuth" } */
function prettyServiceKey(key: string): { region: string; name: string } {
  const REGION: Record<string, string> = { us: "US", eu: "EU", global: "Global" };
  const STACK: Record<string, string> = { cirisbilling: "Billing", cirisproxy: "Proxy" };
  const LEAF: Record<string, string> = {
    google_oauth: "Google OAuth",
    google_play: "Google Play",
    postgresql: "PostgreSQL",
    service: "Service",
    billing: "Billing link",
    groq: "Groq",
    openrouter: "OpenRouter",
    together: "Together AI",
    brave_search: "Brave Search",
  };
  const parts = key.split(".");
  if (parts.length === 3) {
    const [region, stack, leaf] = parts;
    const stackName = STACK[stack] ?? stack;
    const leafName = LEAF[leaf] ?? leaf;
    // "Billing · Service" reads redundantly; collapse to the stack's own name.
    const name = leaf === "service" ? `${stackName} service` : `${stackName} · ${leafName}`;
    return { region: REGION[region] ?? region, name };
  }
  return { region: "", name: key };
}

function uptimeColor(uptime: number | null, status?: StatusLevel): string {
  if (status === "outage") return "bg-red-500";
  if (status === "degraded") return "bg-yellow-500";
  if (status === "operational") return "bg-green-500";
  // No explicit status: infer from the number alone.
  if (uptime === null) return "bg-gray-300 dark:bg-gray-600";
  if (uptime >= 99.9) return "bg-green-500";
  if (uptime >= 95) return "bg-yellow-500";
  return "bg-red-500";
}

function DayDetail({ entry, onClose }: { entry: HistoryEntry; onClose: () => void }) {
  const uptime = dayUptime(entry);
  const services = entry.services ?? {};
  const rows = Object.entries(services)
    .map(([key, stats]) => ({ key, ...prettyServiceKey(key), ...stats }))
    .sort((a, b) => (a.uptime_pct ?? 100) - (b.uptime_pct ?? 100));
  const regionRollups = Object.entries(entry.regions ?? {}).filter(
    ([, r]) => typeof r.uptime_pct === "number"
  );

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900 dark:text-white">{entry.date}</span>
          {uptime !== null && (
            <span className="text-sm text-gray-600 dark:text-gray-300">{uptime.toFixed(2)}% uptime</span>
          )}
          {entry.status && <StatusBadge status={entry.status} size="sm" />}
        </div>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close day detail"
        >
          ✕
        </button>
      </div>

      {regionRollups.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          {regionRollups.map(([r, stats]) => (
            <span key={r}>
              {prettyServiceKey(`${r}.x.x`).region || r}: {stats.uptime_pct!.toFixed(2)}%
            </span>
          ))}
        </div>
      )}

      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="py-1 pr-4 font-medium">Service</th>
                <th className="py-1 pr-4 font-medium">Region</th>
                <th className="py-1 pr-4 font-medium text-right">Uptime</th>
                <th className="py-1 pr-4 font-medium text-right">Avg latency</th>
                <th className="py-1 font-medium text-right">Incidents</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-1.5 pr-4 text-gray-900 dark:text-white">{row.name}</td>
                  <td className="py-1.5 pr-4 text-gray-500 dark:text-gray-400">{row.region}</td>
                  <td className={`py-1.5 pr-4 text-right font-medium ${
                    (row.uptime_pct ?? 100) >= 99.9
                      ? "text-green-700 dark:text-green-400"
                      : (row.uptime_pct ?? 100) >= 95
                      ? "text-yellow-700 dark:text-yellow-400"
                      : "text-red-700 dark:text-red-400"
                  }`}>
                    {typeof row.uptime_pct === "number" ? `${row.uptime_pct.toFixed(1)}%` : "–"}
                  </td>
                  <td className="py-1.5 pr-4 text-right text-gray-500 dark:text-gray-400">
                    {typeof row.avg_latency_ms === "number" ? `${row.avg_latency_ms}ms` : "–"}
                  </td>
                  <td className="py-1.5 text-right text-gray-500 dark:text-gray-400">
                    {row.outage_count || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No per-service breakdown for this day.</p>
      )}
    </div>
  );
}

function UptimeBar({ history, days = 90 }: { history: HistoryEntry[]; days?: number }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const bars = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const entry = history.find((h) => h.date === dateStr);
    const uptime = entry ? dayUptime(entry) : null;

    let color: string;
    let title: string;

    if (!entry || uptime === null) {
      // A day the monitor has no numbers for is unknown, never an outage.
      color = "bg-gray-300 dark:bg-gray-600";
      title = `${dateStr}: no data`;
    } else {
      color = uptimeColor(uptime, entry.status);
      const incidents = Object.values(entry.services ?? {}).reduce(
        (sum, s) => sum + (s.outage_count ?? 0),
        0
      );
      title = `${dateStr}: ${uptime.toFixed(2)}% uptime${
        incidents > 0 ? ` · ${incidents} ${incidents === 1 ? "incident" : "incidents"}` : ""
      }`;
    }

    const selected = selectedDate === dateStr;
    const clickable = !!entry && uptime !== null;
    bars.push(
      <button
        key={dateStr}
        type="button"
        disabled={!clickable}
        onClick={() => setSelectedDate(selected ? null : dateStr)}
        className={`h-8 flex-1 ${color} rounded-sm transition-opacity ${
          clickable ? "cursor-pointer hover:opacity-75" : "cursor-default"
        } ${selected ? "ring-2 ring-brand-primary ring-offset-1 dark:ring-offset-gray-800" : ""}`}
        title={title}
        aria-label={title}
      />
    );
  }

  const validHistory = history.filter((h) => dayUptime(h) !== null);
  const avgUptime =
    validHistory.length > 0
      ? validHistory.reduce((sum, h) => sum + (dayUptime(h) as number), 0) / validHistory.length
      : null;
  const daysWithData = validHistory.length;
  const selectedEntry = selectedDate ? history.find((h) => h.date === selectedDate) : undefined;

  return (
    <div>
      <div className="flex gap-0.5 mb-2">{bars}</div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{days} days ago</span>
        {avgUptime !== null ? (
          <span className="font-medium text-gray-900 dark:text-white">
            {avgUptime.toFixed(2)}% uptime ({daysWithData} {daysWithData === 1 ? "day" : "days"} of data)
          </span>
        ) : (
          <span>Collecting data...</span>
        )}
        <span>Today</span>
      </div>
      {daysWithData > 0 && !selectedEntry && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Click a day for its per-service breakdown.
        </p>
      )}
      {selectedEntry && <DayDetail entry={selectedEntry} onClose={() => setSelectedDate(null)} />}
    </div>
  );
}

const CI_RUN_META: Record<CiRunResult, { color: string; label: string }> = {
  success: { color: "bg-green-500", label: "success" },
  failure: { color: "bg-red-500", label: "failure" },
  cancelled: { color: "bg-gray-300 dark:bg-gray-600", label: "cancelled" },
  queued: { color: "bg-amber-400", label: "queued" },
  in_progress: { color: "bg-amber-400 animate-pulse", label: "in progress" },
};

function BuildHealth({ ci }: { ci: CiData }) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Build Health</h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        The last ten CI runs of each substrate repo, oldest to newest.
      </p>
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        {ci.repos.map((repo) => {
          const latest = repo.runs[repo.runs.length - 1];
          return (
            <div
              key={repo.repo}
              className="flex items-center justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <a
                href={`https://github.com/CIRISAI/${repo.repo}/actions`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 hover:text-brand-primary dark:text-white dark:hover:text-brand-primary"
              >
                {repo.repo}
              </a>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {repo.runs.map((run, i) => {
                    const meta = CI_RUN_META[run] ?? CI_RUN_META.cancelled;
                    return (
                      <span
                        key={i}
                        className={`inline-block h-4 w-2.5 rounded-sm ${meta.color}`}
                        title={`Run ${i + 1} of ${repo.runs.length}: ${meta.label}`}
                      />
                    );
                  })}
                </div>
                {latest && (
                  <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
                    {(CI_RUN_META[latest] ?? CI_RUN_META.cancelled).label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between mb-4 text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [history, setHistory] = useState<HistoryData | null>(null);
  const [ci, setCi] = useState<CiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(STATUS_API, {
        mode: 'cors',
        credentials: 'omit',
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      if (!json || typeof json.status !== 'string') {
        throw new Error('Invalid response format');
      }
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch status";
      console.error('[CIRIS Status] Fetch error:', errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`${HISTORY_API}?days=90`, {
        mode: 'cors',
        credentials: 'omit',
      });
      if (response.ok) {
        const json = await response.json();
        if (json && Array.isArray(json.history)) setHistory(json);
      }
    } catch (err) {
      // History is optional, just log for debugging
      console.warn('[CIRIS Status] History fetch warning:', err);
    }
  }, []);

  const fetchCi = useCallback(async () => {
    try {
      const response = await fetch(CI_API, {
        mode: 'cors',
        credentials: 'omit',
      });
      if (response.ok) {
        const json = await response.json();
        if (json && Array.isArray(json.repos)) setCi(json);
      }
    } catch (err) {
      // Build health is optional, just log for debugging
      console.warn('[CIRIS Status] CI fetch warning:', err);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchHistory();
    fetchCi();
    const interval = setInterval(() => {
      fetchStatus();
      fetchHistory();
      fetchCi();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchStatus, fetchHistory, fetchCi]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }) + " UTC";
  };

  const providerDisplayNames: Record<string, string> = {
    openrouter: "OpenRouter",
    groq: "Groq",
    together: "Together AI",
    google_oauth: "Google OAuth",
    google_play: "Google Play",
    vultr: "US (Chicago)",
    hetzner: "EU (Germany)",
    github: "Container Registry",
    "lens.postgresql": "Lens Database",
    "us.postgresql": "US Database",
    "eu.postgresql": "EU Database",
    "billing.postgresql": "Billing Database",
    "lens.grafana": "Grafana",
    brave_search: "Brave Search",
  };

  // Map infrastructure keys to region keys
  const infraToRegion: Record<string, string> = {
    vultr: "us",
    hetzner: "eu",
  };

  // 90-day per-region averages from the history rollup, for the region cards.
  const regionAvg = (regionKey: string): number | null => {
    const entries = (history?.history ?? [])
      .map((h) => h.regions?.[regionKey]?.uptime_pct)
      .filter((v): v is number => typeof v === "number");
    if (entries.length === 0) return null;
    return entries.reduce((a, b) => a + b, 0) / entries.length;
  };

  const overall = data ? overallMeta(data.status) : null;

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              CIRIS Status
            </h1>
            {data && overall && (
              <div className="flex items-center gap-3">
                <span className={`inline-block h-3.5 w-3.5 rounded-full ${overall.dot}`} />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {overall.label}
                </span>
              </div>
            )}
            {lastUpdated && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Last updated {formatTime(lastUpdated)} · refreshes every 60 seconds
              </p>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
              <h2 className="mb-2 text-xl font-bold text-red-800 dark:text-red-300">
                Status Unavailable
              </h2>
              <p className="text-red-700 dark:text-red-300">
                Unable to fetch system status: {error}
              </p>
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Retrying automatically...
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !data && (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-brand-primary" />
            </div>
          )}

          {/* Status Data */}
          {data && (
            <>
              {/* Regional Status */}
              {data.regions && (
                <div className="mb-8">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Regions</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(data.regions).map(([key, region]) => {
                      const infraKey = data.infrastructure
                        ? (infraToRegion[key] === key ? key : Object.keys(data.infrastructure).find(k => infraToRegion[k] === key) || "")
                        : "";
                      return (
                        <RegionCard
                          key={key}
                          regionKey={key}
                          region={region}
                          infrastructure={data.infrastructure?.[infraKey]}
                          avgUptime90d={regionAvg(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 90-Day Uptime History */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  90-Day Uptime
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <UptimeBar history={history?.history || []} days={90} />
                </div>
              </div>

              {/* Legacy Services (if no regions) */}
              {!data.regions && data.services && (
                <ServiceSection title="Services">
                  {Object.entries(data.services).map(([key, service]) => (
                    <ServiceRow
                      key={key}
                      displayName={service.name || key}
                      status={service.status}
                    />
                  ))}
                </ServiceSection>
              )}

              {/* AI Providers */}
              {data.llm_providers && Object.keys(data.llm_providers).length > 0 && (
                <ServiceSection title="AI Providers">
                  {Object.entries(data.llm_providers).map(([key, provider]) => (
                    <ServiceRow
                      key={key}
                      displayName={providerDisplayNames[key] || key}
                      status={provider.status}
                      latency={provider.latency_ms}
                    />
                  ))}
                </ServiceSection>
              )}

              {/* Authentication */}
              {data.auth_providers && Object.keys(data.auth_providers).length > 0 && (
                <ServiceSection title="Authentication">
                  {Object.entries(data.auth_providers).map(([key, provider]) => (
                    <ServiceRow
                      key={key}
                      displayName={providerDisplayNames[key] || key}
                      status={provider.status}
                      latency={provider.latency_ms}
                    />
                  ))}
                </ServiceSection>
              )}

              {/* Build Health (CI) */}
              {ci && ci.repos.length > 0 && <BuildHealth ci={ci} />}

              {/* Infrastructure (Collapsible) */}
              <CollapsibleSection title="Infrastructure Details">
                {data.infrastructure && Object.keys(data.infrastructure).length > 0 && (
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Hosting
                    </h3>
                    {Object.entries(data.infrastructure).map(([key, infra]) => (
                      <ServiceRow
                        key={key}
                        displayName={infra.name || providerDisplayNames[key] || key}
                        status={infra.status}
                        latency={infra.latency_ms}
                      />
                    ))}
                  </div>
                )}

                {data.database_providers && Object.keys(data.database_providers).length > 0 && (
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Databases
                    </h3>
                    {Object.entries(data.database_providers).map(([key, db]) => (
                      <ServiceRow
                        key={key}
                        displayName={providerDisplayNames[key] || key}
                        status={db.status}
                        latency={db.latency_ms}
                      />
                    ))}
                  </div>
                )}

                {data.internal_providers && Object.keys(data.internal_providers).length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Internal Services
                    </h3>
                    {Object.entries(data.internal_providers).map(([key, svc]) => (
                      <ServiceRow
                        key={key}
                        displayName={providerDisplayNames[key] || key}
                        status={svc.status}
                        latency={svc.latency_ms}
                      />
                    ))}
                  </div>
                )}
              </CollapsibleSection>

              {/* Last Incident */}
              {data.last_incident && (
                <div className="mb-8 rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <h2 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-300">
                    Last Incident
                  </h2>
                  <p className="text-yellow-700 dark:text-yellow-300">{data.last_incident}</p>
                </div>
              )}

              {/* Info Footer */}
              <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
                <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  About This Page
                </h2>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Status updates every 60 seconds automatically</li>
                  <li>Served by ciris-status, an open-source monitor that signs every health check into its own record (Ed25519 + ML-DSA-65)</li>
                  <li>Multi-region monitoring: US (Chicago) and EU (Germany)</li>
                  <li>Latency measured from our infrastructure to each provider</li>
                  <li>Incident counts are incidents, not failed samples: one outage that spans many checks counts once</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/CIRISAI/CIRISStatus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    View Source
                  </a>
                  <a
                    href={STATUS_API}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    Raw JSON
                  </a>
                  <a
                    href={`${HISTORY_API}?days=90`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    History JSON
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
