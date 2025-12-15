"use client";
import { useEffect, useState, useCallback } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

interface ProviderStatus {
  status: "operational" | "degraded" | "outage";
  latency_ms?: number;
  source?: string;
  name?: string;
  url?: string | null;
  provider?: string;
}

interface StatusData {
  status: "operational" | "degraded" | "outage";
  timestamp: string;
  last_incident: string | null;
  services: Record<string, ProviderStatus>;
  infrastructure: Record<string, ProviderStatus>;
  llm_providers: Record<string, ProviderStatus>;
  auth_providers: Record<string, ProviderStatus>;
  database_providers: Record<string, ProviderStatus>;
  internal_providers: Record<string, ProviderStatus>;
}

const STATUS_API = "https://lens.ciris-services-1.ai/lens-api/api/v1/status";

function StatusIndicator({ status }: { status: "operational" | "degraded" | "outage" }) {
  const colors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    outage: "bg-red-500",
  };
  return <span className={`inline-block h-3 w-3 rounded-full ${colors[status]}`} />;
}

function StatusBadge({ status }: { status: "operational" | "degraded" | "outage" }) {
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
  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ServiceRow({ name, displayName, status, latency }: { name: string; displayName: string; status: "operational" | "degraded" | "outage"; latency?: number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-3">
        <StatusIndicator status={status} />
        <span className="font-medium text-gray-900 dark:text-white">{displayName}</span>
      </div>
      <div className="flex items-center gap-4">
        {latency !== undefined && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{latency}ms</span>
        )}
        <StatusBadge status={status} />
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
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(STATUS_API);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " UTC";
  };

  const providerDisplayNames: Record<string, string> = {
    lens: "Observability",
    billing: "Billing & Authentication",
    proxy: "LLM Proxy",
    openrouter: "OpenRouter",
    groq: "Groq",
    together: "Together AI",
    google_oauth: "Google OAuth",
    google_play: "Google Play",
    vultr: "US Region (Chicago)",
    github: "Container Registry",
    "lens.postgresql": "Lens Database",
    "billing.postgresql": "Billing Database",
    "lens.grafana": "Grafana",
    "proxy.billing": "Proxy-Billing Link",
    brave_search: "Brave Search",
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
              {/* Core Services */}
              <ServiceSection title="Services">
                {Object.entries(data.services).map(([key, service]) => (
                  <ServiceRow
                    key={key}
                    name={key}
                    displayName={service.name || providerDisplayNames[key] || key}
                    status={service.status}
                  />
                ))}
              </ServiceSection>

              {/* AI Providers */}
              <ServiceSection title="AI Providers">
                {Object.entries(data.llm_providers).map(([key, provider]) => (
                  <ServiceRow
                    key={key}
                    name={key}
                    displayName={providerDisplayNames[key] || key}
                    status={provider.status}
                    latency={provider.latency_ms}
                  />
                ))}
              </ServiceSection>

              {/* Authentication */}
              <ServiceSection title="Authentication">
                {Object.entries(data.auth_providers).map(([key, provider]) => (
                  <ServiceRow
                    key={key}
                    name={key}
                    displayName={providerDisplayNames[key] || key}
                    status={provider.status}
                    latency={provider.latency_ms}
                  />
                ))}
              </ServiceSection>

              {/* Infrastructure (Collapsible) */}
              <CollapsibleSection title="Infrastructure Details">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Hosting
                  </h3>
                  {Object.entries(data.infrastructure).map(([key, infra]) => (
                    <ServiceRow
                      key={key}
                      name={key}
                      displayName={infra.name || providerDisplayNames[key] || key}
                      status={infra.status}
                      latency={infra.latency_ms}
                    />
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Databases
                  </h3>
                  {Object.entries(data.database_providers).map(([key, db]) => (
                    <ServiceRow
                      key={key}
                      name={key}
                      displayName={providerDisplayNames[key] || key}
                      status={db.status}
                      latency={db.latency_ms}
                    />
                  ))}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Internal Services
                  </h3>
                  {Object.entries(data.internal_providers).map(([key, svc]) => (
                    <ServiceRow
                      key={key}
                      name={key}
                      displayName={providerDisplayNames[key] || key}
                      status={svc.status}
                      latency={svc.latency_ms}
                    />
                  ))}
                </div>
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
