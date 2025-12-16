"use client";
import { useEffect, useState, useCallback } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

type StatusLevel = "operational" | "degraded" | "outage";

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
  status: StatusLevel;
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

const STATUS_API = "https://lens.ciris-services-1.ai/lens-api/api/v1/status";
const HISTORY_API = "https://lens.ciris-services-1.ai/lens-api/api/v1/status/history";

interface HistoryEntry {
  date: string;
  uptime_pct: number;
  status: StatusLevel;
}

interface HistoryData {
  days: number;
  region: string | null;
  history: HistoryEntry[];
  regions?: Record<string, HistoryEntry[]>;
}

function StatusIndicator({ status }: { status: StatusLevel }) {
  const colors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    outage: "bg-red-500",
  };
  return <span className={`inline-block h-3 w-3 rounded-full ${colors[status]}`} />;
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
    <span className={`rounded-full font-medium ${sizeClass} ${styles[status]}`}>
      {labels[status]}
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

function RegionCard({ regionKey, region, infrastructure }: { regionKey: string; region: RegionData; infrastructure?: ProviderStatus }) {
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
      </div>
    </div>
  );
}

function UptimeBar({ history, days = 90 }: { history: HistoryEntry[]; days?: number }) {
  // Create array of days, showing gray for missing data
  const today = new Date();
  const bars = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const entry = history.find((h) => h.date === dateStr);

    // No data = gray, has data = color based on status
    let color: string;
    let title: string;

    if (!entry) {
      color = "bg-gray-300 dark:bg-gray-600";
      title = `${dateStr}: No data`;
    } else {
      const status = entry.status;
      const uptime = entry.uptime_pct ?? 0;

      color =
        status === "outage"
          ? "bg-red-500"
          : status === "degraded"
          ? "bg-yellow-500"
          : uptime < 99.9
          ? "bg-yellow-500"
          : "bg-green-500";
      title = `${dateStr}: ${uptime.toFixed(2)}% uptime`;
    }

    bars.push(
      <div
        key={dateStr}
        className={`h-8 flex-1 ${color} rounded-sm hover:opacity-80 transition-opacity cursor-pointer`}
        title={title}
      />
    );
  }

  // Calculate overall uptime only from days with data
  const validHistory = history.filter((h) => typeof h.uptime_pct === 'number');
  const avgUptime =
    validHistory.length > 0
      ? validHistory.reduce((sum, h) => sum + h.uptime_pct, 0) / validHistory.length
      : null;

  const daysWithData = validHistory.length;

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
        setHistory(json);
      }
    } catch (err) {
      // History is optional, just log for debugging
      console.warn('[CIRIS Status] History fetch warning:', err);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchHistory();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, [fetchStatus, fetchHistory]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
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

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                CIRIS Status
              </h1>
              {data && <StatusBadge status={data.status} />}
            </div>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {formatTime(lastUpdated)}
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
                  <li>Data sourced from CIRISLens observability platform</li>
                  <li>Multi-region monitoring: US (Chicago) and EU (Germany)</li>
                  <li>Latency measured from our infrastructure to each provider</li>
                </ul>
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://github.com/CIRISAI/CIRISLens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    View CIRISLens Source
                  </a>
                  <a
                    href="https://lens.ciris-services-1.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    Grafana Dashboard
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
