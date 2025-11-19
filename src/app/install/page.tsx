"use client";
import { useState } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function InstallPage() {
  const [copied, setCopied] = useState(false);
  const [copiedDocker, setCopiedDocker] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyDockerToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDocker(true);
    setTimeout(() => setCopiedDocker(false), 2000);
  };

  const installCommand = "curl -sSL https://ciris.ai/install.sh | bash";
  const dockerCommand = "curl -sSL https://ciris.ai/install.sh | bash -s -- --docker";

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Install CIRIS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Get started with CIRIS in minutes. One command to install
              CIRISAgent and CIRISGUI on Linux, macOS, or WSL2.
            </p>
          </div>

          {/* Quick Install */}
          <div className="mt-12">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Quick Install
              </h2>
              <div className="relative">
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>{installCommand}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(installCommand)}
                  className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                System Requirements
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Python 3.9 or higher</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Node.js 18 or higher</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Git</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>~2GB disk space</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Supported Platforms
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Linux (Ubuntu, Debian, Fedora, Arch)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>macOS (via Homebrew)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Windows (via WSL2)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Docker Installation */}
          <div className="mt-12">
            <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-6 dark:border-blue-400 dark:bg-blue-900/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.81 10.25c-.06-.04-.56-.43-1.64-.43-.28 0-.56.03-.84.08-.21-1.4-1.09-2.62-2.26-3.18a.75.75 0 0 0-1.04.41c-.03.09-.59 1.56.26 3.13-.44.27-.97.44-1.54.51-.33-1.33-1.23-2.26-2.49-2.26h-.08c-1.26 0-2.16.93-2.49 2.26-.57-.07-1.1-.24-1.54-.51.85-1.57.29-3.04.26-3.13a.75.75 0 0 0-1.04-.41c-1.17.56-2.05 1.78-2.26 3.18-.28-.05-.56-.08-.84-.08-1.08 0-1.58.39-1.64.43a.75.75 0 0 0-.25.99c.03.06.81 1.45 3.11 1.72.88 2.36 2.82 4.01 5.23 4.43v3.13c0 .41.34.75.75.75s.75-.34.75-.75v-3.13c2.41-.42 4.35-2.07 5.23-4.43 2.3-.27 3.08-1.66 3.11-1.72a.75.75 0 0 0-.25-.99zM4.11 10.89c.26-.08.65-.14 1.14-.14.13 0 .27 0 .41.02-.61.99-.96 2.14-1.02 3.35-1.19-.25-1.69-.99-1.8-1.23.14-.12.53-.66 1.27-1zm7.89 6.86c-2.71 0-4.91-2.2-4.91-4.91 0-2.01 1.21-3.74 2.94-4.49.31 1.07 1.03 1.74 1.97 1.74s1.66-.67 1.97-1.74c1.73.75 2.94 2.48 2.94 4.49 0 2.71-2.2 4.91-4.91 4.91zm7.8-6.52c-.11.24-.61.98-1.8 1.23-.06-1.21-.41-2.36-1.02-3.35.14-.02.28-.02.41-.02.49 0 .88.06 1.14.14.74.34 1.13.88 1.27 1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    Docker Installation (Recommended)
                  </h2>
                  <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                    Use pre-built Docker images from GitHub Container Registry for a fast, isolated deployment with no dependency management.
                  </p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                      <code>{dockerCommand}</code>
                    </pre>
                    <button
                      onClick={() => copyDockerToClipboard(dockerCommand)}
                      className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                    >
                      {copiedDocker ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Requirements
                      </h3>
                      <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>Docker Engine 20.10+ or Docker Desktop</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>docker compose plugin</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>~1GB disk space</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Benefits
                      </h3>
                      <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>No Python or Node.js installation needed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Isolated environment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Automatic updates with health checks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 rounded-md bg-blue-100 p-3 dark:bg-blue-900/40">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      <strong>After installation:</strong> The installer creates a docker-compose.yml file. Access the Agent API at localhost:8080 and Web UI at localhost:3000. Manage with <code className="rounded bg-blue-200 px-1 dark:bg-blue-800">docker compose up -d</code> and <code className="rounded bg-blue-200 px-1 dark:bg-blue-800">docker compose down</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Advanced Installation
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Custom Installation Directory
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Install to a custom location (default: ~/ciris)
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>
                    curl -sSL https://ciris.ai/install.sh | bash -s --
                    --install-dir /opt/ciris
                  </code>
                </pre>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Dry Run (Preview Actions)
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  See what would be installed without making changes
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --dry-run
                  </code>
                </pre>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Development Mode
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Install development dependencies
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --dev
                  </code>
                </pre>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Skip Service Installation
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Install without systemd/launchd service setup
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>
                    curl -sSL https://ciris.ai/install.sh | bash -s --
                    --skip-service
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* What Gets Installed */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              What Gets Installed
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRISAgent
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The core ethical AI agent with Python backend, decision-making
                  algorithms, and API server.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  CIRISGUI
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Modern web interface built with Next.js for interacting with
                  your CIRIS agent.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  System Services
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatic service installation for systemd (Linux) or launchd
                  (macOS) to run CIRIS on startup.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              After Installation
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <ol className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex">
                  <span className="mr-3 font-semibold text-gray-900 dark:text-white">
                    1.
                  </span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Configure your API keys
                    </strong>
                    <br />
                    Edit <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">
                      ~/ciris/.env
                    </code> to add your OpenAI API key or configure an alternative
                    LLM provider.
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 font-semibold text-gray-900 dark:text-white">
                    2.
                  </span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Start CIRIS
                    </strong>
                    <br />
                    Run <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">
                      systemctl --user start ciris-agent ciris-gui
                    </code> or <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">
                      ~/ciris/scripts/start.sh
                    </code>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 font-semibold text-gray-900 dark:text-white">
                    3.
                  </span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Access the UI
                    </strong>
                    <br />
                    Open{" "}
                    <a
                      href="http://localhost:3000"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      http://localhost:3000
                    </a>{" "}
                    in your browser
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Troubleshooting
            </h2>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Installation fails with "command not found"
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p>
                    The installer will attempt to install missing dependencies
                    automatically. If it fails, manually install:
                  </p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Python 3.9+: <code>sudo apt install python3</code></li>
                    <li>Node.js 18+: Follow instructions at nodejs.org</li>
                    <li>Git: <code>sudo apt install git</code></li>
                  </ul>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Services won't start
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p>Check service status:</p>
                  <pre className="mt-2 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    systemctl --user status ciris-agent ciris-gui
                  </pre>
                  <p className="mt-2">Or start manually:</p>
                  <pre className="mt-2 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    ~/ciris/scripts/start.sh
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Need help?
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <ul className="space-y-2">
                    <li>
                      📖{" "}
                      <a
                        href="https://github.com/CIRISAI/CIRISAgent/blob/main/docs/README.md"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Read the documentation
                      </a>
                    </li>
                    <li>
                      🐛{" "}
                      <a
                        href="https://github.com/CIRISAI/CIRISAgent/issues"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Report an issue
                      </a>
                    </li>
                    <li>
                      💬{" "}
                      <a
                        href="https://discord.gg/SWGM7Gsvrv"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Join our Discord
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
