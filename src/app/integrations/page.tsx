"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import FlexSection from "@/app/components/SectionFlexContent";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import CardsSection from "@/app/components/CardsSection";

export default function IntegrationsPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Integrations & Adapters
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              CIRIS connects to your world through adapters. Each adapter is a self-contained integration that provides tools or communication channels.
            </p>
          </div>

          {/* Architecture Overview */}
          <div className="mt-12 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Adapter Architecture
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">Message Bus:</strong> Adapters communicate via typed message buses (Tool, Communication, RuntimeControl)
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Multi-Adapter:</strong> Run CLI + API + Discord + Home Assistant simultaneously in the same process
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Type-Safe:</strong> All data flows through Pydantic schemas. No untyped dicts, no bypass patterns.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Self-Contained:</strong> Each adapter includes its own schemas, protocols, and configuration wizard
              </p>
            </div>
          </div>

          {/* Communication Adapters */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Communication Adapters"
              subheadline="Primary interfaces for interacting with CIRIS"
            />

            <CardsSection
              cardsData={[
                {
                  headline: "CLI Adapter",
                  copyText:
                    "Interactive command-line interface. Launch with --adapter cli. Perfect for development, testing, and direct terminal interaction. Supports mock LLM for offline testing.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "API Adapter",
                  copyText:
                    "RESTful HTTP server built with FastAPI. Launch with --adapter api --port 8000. Provides web UI, OAuth2 authentication, and multi-tenant support. Best for service integration.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "Discord Adapter",
                  copyText:
                    "Full Discord bot integration for community moderation. Launch with --adapter discord --guild-id YOUR_GUILD_ID. Persistent graph storage and real LLM providers with fallback.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Platform Adapters */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Platform Adapters"
              subheadline="Deep integrations with specific platforms"
            />

            <div className="space-y-6">
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-400 dark:bg-green-900/20">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Home Assistant + CIRISHome
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Complete multi-modal home automation with 100% local AI processing. Voice control, camera analysis, and smart automation — no cloud required.
                </p>
                <div className="mb-4 rounded-md bg-green-100 p-4 dark:bg-green-900/40">
                  <p className="mb-2 font-semibold text-gray-900 dark:text-white">Capabilities:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Voice commands via Wyoming protocol</li>
                    <li>Device control (lights, switches, climate, locks)</li>
                    <li>Local vision processing with Llama-4-Scout</li>
                    <li>Camera snapshot analysis</li>
                    <li>Enriches context with entity states</li>
                    <li>Text-to-speech via Coqui TTS</li>
                  </ul>
                </div>
                <div className="mb-4 rounded-md bg-green-200 p-4 dark:bg-green-800/40">
                  <p className="mb-2 font-semibold text-gray-900 dark:text-white">Hardware Stack:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Home Assistant Yellow (automation hub)</li>
                    <li>Jetson Orin Nano (local AI processing)</li>
                    <li>Voice PE Pucks (voice satellites)</li>
                  </ul>
                </div>
                <div className="rounded-md border border-green-300 bg-white p-4 dark:border-green-600 dark:bg-gray-800">
                  <p className="mb-2 font-semibold text-gray-900 dark:text-white">HACS Installation:</p>
                  <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Install HACS in Home Assistant</li>
                    <li>Add repository: <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">https://github.com/CIRISAI/CIRISHome</code></li>
                    <li>Install "CIRISHome Agent" add-on</li>
                    <li>Configure with Jetson IP and HA token</li>
                  </ol>
                  <a
                    href="https://github.com/CIRISAI/CIRISHome/blob/main/INSTALLATION.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-green-600 hover:underline dark:text-green-400"
                  >
                    Full Installation Guide →
                  </a>
                </div>
              </div>

              <div className="rounded-lg border-2 border-orange-500 bg-orange-50 p-6 dark:border-orange-400 dark:bg-orange-900/20">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Reddit
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Full Reddit integration with posting, commenting, and content moderation. Built-in GDPR compliance, AI transparency disclosure, and deletion compliance.
                </p>
                <div className="rounded-md bg-orange-100 p-4 dark:bg-orange-900/40">
                  <p className="mb-2 font-semibold text-gray-900 dark:text-white">Capabilities:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Submit posts and comments</li>
                    <li>Submission and user context lookups</li>
                    <li>Active observation mode</li>
                    <li>Content removal and moderation</li>
                    <li>Automatic AI transparency disclosure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Infrastructure Adapters */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Data & Infrastructure"
              subheadline="Database access and external data sources"
            />

            <CardsSection
              cardsData={[
                {
                  headline: "External Data SQL",
                  copyText:
                    "DSAR/GDPR compliance tools for SQL databases. Privacy schema support, dialect-specific implementations (PostgreSQL, MySQL, SQLite), and structured data access.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Coming Soon */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Coming Soon"
              subheadline="Adapters currently under development"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                <h3 className="font-semibold text-gray-900 dark:text-white">MCP Server</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Model Context Protocol server. Expose CIRIS tools to MCP-compatible clients.
                </p>
              </div>
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                <h3 className="font-semibold text-gray-900 dark:text-white">MCP Client</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Connect to external MCP servers for additional tool capabilities.
                </p>
              </div>
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                <h3 className="font-semibold text-gray-900 dark:text-white">Weather</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Weather forecasting via NOAA National Weather Service API.
                </p>
              </div>
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                <h3 className="font-semibold text-gray-900 dark:text-white">Navigation</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Geographic routing and directions via OpenStreetMap.
                </p>
              </div>
            </div>
          </div>

          {/* Utility Adapters */}
          <div className="mt-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="Utility Adapters"
              subheadline="Testing, metrics, and hosted services"
            />

            <CardsSection
              cardsData={[
                {
                  headline: "Mock LLM",
                  copyText:
                    "Testing mock that simulates LLM responses without external API calls. Perfect for development, CI/CD pipelines, and offline testing.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "Covenant Metrics",
                  copyText:
                    "Privacy-first metrics collection for CIRISLens observability. Requires explicit user consent. Reports WBD (Wisdom-Based Deferral) and PDMA decision events.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "Hosted Tools",
                  copyText:
                    "Access to CIRIS-hosted tool integrations. Extensible registry for cloud-based capabilities.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Building New Adapters */}
          <div className="mt-16">
            <div className="rounded-lg border-4 border-brand-primary bg-gradient-to-br from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Building New Adapters
              </h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                CIRIS adapters are self-contained Python packages. Start from the sample_adapter template and implement your integration.
              </p>

              {/* Required Files */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Required Files
                </h3>
                <div className="rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <pre>{`your_adapter/
├── manifest.json      # Service declaration & metadata
├── adapter.py         # Main adapter class
├── service.py         # Service implementations
├── protocol.py        # Protocol definitions
├── schemas.py         # Pydantic data models
├── configurable.py    # Configuration wizard
└── __init__.py        # Package init with Adapter export`}</pre>
                </div>
              </div>

              {/* Service Types */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Service Types
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">TOOL</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Provides capabilities. Implement execute_tool() and get_available_tools().
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">COMMUNICATION</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Handles messaging. Implement send_message() and fetch_messages().
                    </p>
                  </div>
                </div>
              </div>

              {/* Manifest Example */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  manifest.json Structure
                </h3>
                <div className="rounded-md bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
                  <pre>{`{
  "name": "your_adapter",
  "version": "1.0.0",
  "description": "Your adapter description",
  "services": [
    {
      "type": "TOOL",
      "capabilities": ["tool:your_adapter:action"]
    }
  ],
  "configuration": {
    "steps": [
      {"step_id": "discover", "type": "discovery"},
      {"step_id": "auth", "type": "oauth"},
      {"step_id": "settings", "type": "input"},
      {"step_id": "confirm", "type": "confirm"}
    ]
  }
}`}</pre>
                </div>
              </div>

              {/* Adapter Class */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Adapter Implementation
                </h3>
                <div className="rounded-md bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
                  <pre>{`from ciris_engine.logic.adapters.base import Service
from ciris_engine.schemas.adapter import AdapterServiceRegistration

class YourAdapter(Service):
    def __init__(self, runtime, context=None):
        self.runtime = runtime
        self.tool_service = YourToolService(runtime)

    def get_services_to_register(self):
        return [
            AdapterServiceRegistration(
                service_type=ServiceType.TOOL,
                provider=self.tool_service,
                priority=Priority.NORMAL,
                capabilities=["tool:your_adapter:action"]
            )
        ]

    async def start(self):
        await self.tool_service.start()

    async def stop(self):
        await self.tool_service.stop()

# Required export
Adapter = YourAdapter`}</pre>
                </div>
              </div>

              {/* Configuration Steps */}
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Configuration Step Types
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">discovery</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Auto-detect services on network</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">oauth</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">OAuth2 with PKCE flow</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">select</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Multiple-choice selection</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white">input</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Manual text/config entry</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800 sm:col-span-2">
                    <p className="font-semibold text-gray-900 dark:text-white">confirm</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Review and approve final configuration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Adapter Design Principles
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">Type-Safe Everything</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use Pydantic schemas for all data structures. No untyped dicts, no exceptions.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">No Bypass Patterns</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Strict protocol adherence. All communication flows through the message bus.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">Self-Contained</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All code, schemas, and protocols live in one directory. No external dependencies on other adapters.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-4 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">Graceful Lifecycle</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Proper async start/stop methods. Clean up resources, close connections, cancel tasks.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Ready to build your own adapter?
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_adapters/sample_adapter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
              >
                View Sample Adapter
              </a>
              <a
                href="https://deepwiki.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Read the Docs
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
