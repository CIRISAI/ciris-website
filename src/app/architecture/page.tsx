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
              Multi-region, privacy-first infrastructure. Designed to be deleted.
            </p>
          </div>

          {/* Philosophy Banner */}
          <div className="mb-12 rounded-lg border-4 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Designed to Be Deleted
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The CIRIS infrastructure is meant to be temporary. Every part of it is
              built knowing it will be retired once the peer-to-peer network meant to
              replace it is ready. That is the plan, not an accident. We avoid
              anything that ties CIRIS to one company, or that assumes a central hub
              has to exist forever.
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              This is the <strong>hosted path</strong>: the two rented regions below
              keep CIRIS free for everyone today. Run a small model on your own device
              and you skip them entirely. The substrate that replaces them is{" "}
              <a href="/cewp" className="font-semibold text-brand-primary hover:underline">CEWP</a>.
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
              Two Regions, Both Always On
            </h2>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              {/* Clients */}
              <div className="text-center mb-4">
                <div className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-6 py-3">
                  <div className="font-semibold text-gray-900 dark:text-white">Clients</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Americas / Europe</div>
                </div>
              </div>

              {/* Connection lines down */}
              <div className="flex justify-center mb-4">
                <div className="flex items-end gap-16 sm:gap-24">
                  <div className="w-px h-8 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="w-px h-8 bg-gray-400 dark:bg-gray-500"></div>
                </div>
              </div>

              {/* Domain label */}
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400 italic">separate domains per region</span>
              </div>

              {/* Region boxes */}
              <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 mb-4">
                {/* US Region */}
                <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                  <div className="text-center mb-3">
                    <h4 className="font-bold text-green-800 dark:text-green-300">Vultr US</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Chicago</div>
                    <div className="text-[10px] text-orange-600 dark:text-orange-400 mt-1">via Cloudflare</div>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      CIRISBilling
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      CIRISProxy
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      PostgreSQL
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Redis
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Caddy (TLS)
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-green-300 dark:border-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                      <span className="text-yellow-700 dark:text-yellow-400">+ CIRISLens</span>
                    </div>
                  </div>
                </div>

                {/* EU Region */}
                <div className="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
                  <div className="text-center mb-3">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Hetzner EU</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Falkenstein, Germany</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">direct DNS</div>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      CIRISBilling
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      CIRISProxy
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      PostgreSQL
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      Redis
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      Caddy (TLS)
                    </div>
                  </div>
                </div>
              </div>

              {/* Sync indicator */}
              <div className="flex items-center justify-center gap-2 py-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-400 dark:via-gray-500 dark:to-gray-500"></div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">PostgreSQL sync</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-400 to-gray-400 dark:via-gray-500 dark:to-gray-500"></div>
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900/20"></div>
                    <span>US Region (Americas)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20"></div>
                    <span>EU Region (Europe)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>US-only service</span>
                  </div>
                </div>
              </div>
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
                  Split DNS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The US site and the EU site reach the internet two different ways,
                  so no single failure can take both down.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• The US site goes through Cloudflare, which also absorbs attacks</li>
                  <li>• The EU site connects directly</li>
                  <li>• If Cloudflare has trouble, the EU site still works</li>
                </ul>
              </div>

              {/* Billing */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CIRISBilling
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Keeps CIRIS running without ads and without selling your data.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• You buy credits ahead of time</li>
                  <li>• Each credit is counted exactly once, never twice</li>
                  <li>• You sign in with Google</li>
                </ul>
              </div>

              {/* Proxy */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CIRISProxy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Passes requests to the AI model. Your conversations are never stored.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Works with standard AI model providers</li>
                  <li>• Every provider is set to keep no data</li>
                  <li>• Nothing you send or receive is logged</li>
                </ul>
              </div>

              {/* Database */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  PostgreSQL
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The database. Both regions keep matching copies, and either one
                  can be written to.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• The two copies stay in step with each other</li>
                  <li>• If they ever disagree, the most recent change wins</li>
                  <li>• A person, not a script, switches regions (safer for money)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Performance
            </h2>

            <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4">
                Production Metrics (scout.ciris.ai)
              </h3>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">368 MB</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Memory Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">5%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">CPU Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">5-10s</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">22</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Core Services</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Edge Device Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  CIRIS runs on ordinary Android phones, answering in about 15 to 20
                  seconds, with the whole app under 100 MB.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Runs fully on the phone, no cloud needed</li>
                  <li>• Keeps its data on the device</li>
                </ul>
              </div>

              <a href="/coherence-ratchet" className="block rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 hover:border-brand-primary transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Coherence Ratchet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Being honest is cheap. Keeping a lie going is expensive. An honest
                  agent can point back at what it already said. A lying agent has to
                  keep every past record lined up, and that gets harder over time.
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Honesty: just point back at the record</li>
                  <li>• Lying: keep an ever-growing pile of records in step</li>
                  <li>• The longer it runs, the more honesty is the easy path</li>
                </ul>
              </a>
            </div>

            <div className="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-900">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bending Instead of Breaking</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>Backup AI providers:</strong> if the main one is down, it falls back to another</li>
                <li>• <strong>Careful startup:</strong> the must-have parts load first, the optional parts can fail without stopping the rest</li>
                <li>• <strong>Adapts:</strong> copes with a patchy network or limited power</li>
              </ul>
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
                  Both Regions Run at Once
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Both regions handle real traffic at the same time, so neither is a
                  single point of failure. Each has its own web address. If one
                  region goes down, people can switch to the other right away, with
                  no waiting.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Two Separate Hosting Companies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  One US company (Vultr) and one German company (Hetzner), under two
                  different countries' laws. No single company can take CIRIS down,
                  and because nothing is locked to either one, we can switch if their
                  prices or policies change.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Split DNS Strategy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  US traffic goes through Cloudflare, which absorbs attacks and speeds
                  things up. EU traffic connects straight to Hetzner. Splitting it
                  this way means no single failure can take both down: if Cloudflare
                  has trouble, the EU site still works.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  A Person Switches the Database, Not a Script
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For money data, like credit balances and payments, a person makes
                  the call to switch regions, not an automatic script. This avoids
                  the case where both regions think they are in charge at once. When
                  money is involved, careful beats clever.
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
                The infrastructure follows the <a href="/safety" className="text-brand-primary hover:underline">safety policy</a>:
                <strong> &ldquo;Fix it if we can. Pause only if we cannot.&rdquo;</strong>
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="rounded bg-white p-4 dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Global Pause</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Stops the whole service across both regions. The database is
                    kept safe. A clear written reason is required.
                  </p>
                </div>
                <div className="rounded bg-white p-4 dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Regional Pause</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Pauses one region while the other keeps serving. Used for a
                    problem that only affects one place.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                Trust artifacts are public AGPL-3.0 in the CIRISBridge repository:{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISBridge/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  SECURITY.md
                </a>
                {", "}
                <a
                  href="https://github.com/CIRISAI/CIRISBridge/blob/main/OPERATIONS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  OPERATIONS.md
                </a>
                , and{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISBridge/tree/main/ansible/runbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  26 named Ansible runbooks
                </a>
                {" "}(incident-response, intrusion-response, cert-rotate, backup-verify,
                e2e-smoke-test, image-update, disk-cleanup, billing-rollback,
                add-region, and others). The repository itself is also public:{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISBridge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  CIRISAI/CIRISBridge
                </a>
                .
              </p>
            </div>
          </div>

          {/* Open Source */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              100% AGPL-3.0 Open Source
            </h2>

            <div className="rounded-lg border-2 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20 mb-6">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                Why AGPL-3.0?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Every CIRIS component uses the GNU Affero General Public License v3.0. This isn't just "open source". It's <strong>network copyleft</strong>. If anyone modifies CIRIS and offers it as a service, they must release their modifications under the same license.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>Prevents cloud appropriation:</strong> No company can take CIRIS, modify it, and offer it as a closed service</li>
                <li>• <strong>Ensures transparency:</strong> Any deployed version's source must be available to users</li>
                <li>• <strong>Protects the commons:</strong> Improvements flow back to the community, not into proprietary forks</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Every component of CIRIS infrastructure is open source under AGPL-3.0. You can audit our claims,
                reproduce our setup, or fork it, and if you serve it to others, you share your improvements.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {/* CIRISAgent */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISAgent</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Core agent framework</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISAgent" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* CIRISManager */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISManager</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Scout, research agents, Discord mods</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISManager" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISManager" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISManager" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* CIRISBridge */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISBridge</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Terraform + Ansible orchestration</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISBridge" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISBridge" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISBridge" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* CIRISBilling */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISBilling</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Credits and payments</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISBilling" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISBilling" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISBilling" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* CIRISProxy */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISProxy</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">LLM routing with ZDR</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISProxy" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISProxy" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISProxy" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* CIRISLens */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CIRISLens</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Observability and status</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/CIRISLens" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_CIRISLens" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/CIRISLens" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>

                {/* ciris-website */}
                <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">ciris-website</h4>
                    <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">AGPL-3.0</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">This website</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <a href="https://github.com/CIRISAI/ciris-website" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">GitHub</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://sonarcloud.io/project/overview?id=CIRISAI_ciris-website" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">SonarCloud</a>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <a href="https://deepwiki.com/CIRISAI/ciris-website" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">DeepWiki</a>
                  </div>
                </div>
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
              "This infrastructure exists to be deleted. That is the whole point."
            </p>
            <p className="mt-4">CIRIS: Accountability Infrastructure for Autonomous AI</p>
            <p className="mt-2">© 2025-2026 Eric Moore and CIRIS L3C | AGPL-3.0 License</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
