"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function ArchitecturePage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-5xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Infrastructure
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Multi-region, privacy-first infrastructure for ~$30/month.
              Designed to be deleted.
            </p>
          </div>

          {/* Philosophy Banner */}
          <div className="mb-12 rounded-lg border-4 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Designed to Be Deleted
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              CIRISBridge is temporary infrastructure. Every component knows it will be retired
              when Veilid matures. This isn't a bug—it's the mission. We avoid lock-in,
              vendor-specific integrations, and features that assume centralization is forever.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-3">
              <div><strong>DNS</strong> → Veilid DHT</div>
              <div><strong>Proxy</strong> → Veilid private routes</div>
              <div><strong>Billing</strong> → TBD (may persist longest)</div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Multi-Region Active/Active
            </h2>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <pre className="overflow-x-auto text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
{`                    Clients (Americas / Europe)
                              │
                     ┌────────┴────────┐
                     │                 │
                     ▼                 ▼
                ┌─────────┐       ┌─────────┐
                │  Vultr  │◄─────►│ Hetzner │
                │   US    │  sync │   EU    │
                │ Chicago │       │ Germany │
                └─────────┘       └─────────┘
                     │                 │
    ─────────────────┼─────────────────┼─────────────────
                     │                 │
              Each region runs:        │
              ├─ Constellation DNS     │
              ├─ CIRISBilling          │
              ├─ CIRISProxy            │
              ├─ PostgreSQL ◄──────────┘ (bi-directional)
              ├─ Redis
              └─ Caddy (TLS)`}
              </pre>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded bg-green-50 p-4 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-300">US Region (Vultr)</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Chicago datacenter. Serves Americas. Runs CIRISLens (observability).
                  </p>
                </div>
                <div className="rounded bg-blue-50 p-4 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">EU Region (Hetzner)</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Falkenstein, Germany. Serves Europe. Full service redundancy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Cost Breakdown
            </h2>

            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 dark:text-white">Resource</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 dark:text-white">Provider</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 dark:text-white">Specs</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">US Node</td>
                    <td className="py-3 px-4">Vultr</td>
                    <td className="py-3 px-4 text-xs">2 vCPU, 4GB RAM, 80GB SSD</td>
                    <td className="py-3 px-4 text-right">$24/mo</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">EU Node</td>
                    <td className="py-3 px-4">Hetzner</td>
                    <td className="py-3 px-4 text-xs">2 vCPU, 4GB RAM, 40GB SSD</td>
                    <td className="py-3 px-4 text-right">~$7/mo</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">Block Storage</td>
                    <td className="py-3 px-4">Hetzner</td>
                    <td className="py-3 px-4 text-xs">20GB for PostgreSQL</td>
                    <td className="py-3 px-4 text-right">~$1/mo</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">Domains (2)</td>
                    <td className="py-3 px-4">Registrar</td>
                    <td className="py-3 px-4 text-xs">ciris-services-1.ai, ciris-services-2.ai</td>
                    <td className="py-3 px-4 text-right">~$3/mo</td>
                  </tr>
                  <tr className="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <td className="py-3 px-4 font-bold" colSpan={3}>Total</td>
                    <td className="py-3 px-4 text-right font-bold text-brand-primary">~$35/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-900">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Why so low?</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• No managed service premiums (self-hosted DNS, Postgres, observability)</li>
                <li>• Two independent providers (no vendor lock-in penalty)</li>
                <li>• Minimal resources (2 vCPU/4GB sufficient for all services)</li>
                <li>• No VC pressure to monetize—sustainable indefinitely</li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Services
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* DNS */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Constellation DNS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Self-hosted authoritative DNS. No third party can cut off access to CIRIS.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Geo-DNS routing to nearest region</li>
                  <li>• Health-check-based failover</li>
                  <li>• Both nodes serve both domains</li>
                </ul>
              </div>

              {/* Billing */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CIRISBilling
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Sustainable operation without ads or data monetization.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Pre-purchased credits ($0.05/interaction)</li>
                  <li>• Idempotent consumption (exactly-once)</li>
                  <li>• Google OAuth authentication</li>
                </ul>
              </div>

              {/* Proxy */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CIRISProxy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  LLM routing with Zero Data Retention. Your conversations are never stored.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• OpenAI-compatible API (LiteLLM)</li>
                  <li>• All providers configured for ZDR</li>
                  <li>• No prompt/response logging</li>
                </ul>
              </div>

              {/* Database */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  PostgreSQL
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Bi-directional replication. Both regions can accept writes.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Synchronous replication</li>
                  <li>• Last-write-wins conflict resolution</li>
                  <li>• Manual failover (safer for financial data)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Design Decisions */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Key Design Decisions
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Active/Active, Not Primary/Replica
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Both regions serve all requests simultaneously. No single point of failure for compute.
                  Clients are geo-routed to the nearest region. If one region fails, the other continues
                  serving immediately—no failover delay.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Two Independent Providers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vultr (US company) and Hetzner (German company) provide jurisdictional diversity.
                  No single provider can take down CIRIS. No vendor lock-in means we can swap
                  providers if pricing or policies change.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Self-Hosted DNS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Running our own authoritative DNS (Constellation) means no third party—not Cloudflare,
                  not Route53—can cut access to CIRIS. Both nodes serve both domains, so even DNS
                  has no single point of failure.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Manual Database Failover
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For financial data (credit balances, transactions), we chose manual promotion over
                  automatic failover. This prevents split-brain scenarios and ensures human verification
                  before changing write authority. Good enough beats perfect when money is involved.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Integration */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Safety Integration
            </h2>

            <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                CIRISBridge implements the <a href="/safety-policy" className="text-brand-primary hover:underline">Safety Policy</a>:
                <strong> "Fix if we can. Pause only if we can't."</strong>
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="rounded bg-white p-4 dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Global Pause</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Stops proxy, billing, DNS across all regions. PostgreSQL persists.
                    Requires explicit documented reason.
                  </p>
                </div>
                <div className="rounded bg-white p-4 dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Regional Pause</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Pauses one region while other continues serving.
                    Graceful degradation for localized issues.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                Safety runbooks are public in the{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISBridge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  CIRISBridge repository
                </a>.
              </p>
            </div>
          </div>

          {/* Open Source */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              100% Open Source
            </h2>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Every component of CIRIS infrastructure is open source. You can audit our claims,
                reproduce our setup, or fork it for your own use.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href="https://github.com/CIRISAI/CIRISBridge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISBridge</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Terraform + Ansible orchestration</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISAgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISAgent</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Core agent framework</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISBilling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISBilling</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Credits and payments</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISProxy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISProxy</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">LLM routing with ZDR</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/CIRISLens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISLens</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Observability and status</p>
                </a>
                <a
                  href="https://github.com/CIRISAI/ciris-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-gray-200 p-3 hover:border-brand-primary dark:border-gray-700 dark:hover:border-brand-primary transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">ciris-website</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">This website</p>
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/status"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              View Live Status
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISBridge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-center text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              View Source Code
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <p className="italic">
              "This infrastructure exists to be deleted. That's not a bug—it's the mission."
            </p>
            <p className="mt-4">CIRIS - Ethical AI by Design</p>
            <p className="mt-2">© 2025 Eric Moore and CIRIS L3C | Apache 2.0 License</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
