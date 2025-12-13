"use client";
import { useState } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function InstallPage() {
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedDocker, setCopiedDocker] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const pipCommand = "pip install ciris-agent";
  const dockerCommand = "curl -sSL https://ciris.ai/install.sh | bash -s -- --docker";
  const curlCommand = "curl -sSL https://ciris.ai/install.sh | bash";
  const gitCommand = "git clone https://github.com/CIRISAI/CIRISAgent.git";

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Install CIRIS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Choose your preferred installation method. Works on Windows, macOS, and Linux.
            </p>
          </div>

          {/* Android App NOW AVAILABLE */}
          <div className="mt-8 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-400 dark:bg-green-900/20">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                📱 Android App Now Available
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your personal AI agent on mobile — private, local-first, open source
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/releases/download/android-v1.7.33/ciris-mobile-1.7.33.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Direct APK
              </a>
            </div>
          </div>

          {/* Method 1: pip (Preferred) */}
          <div className="mt-12">
            <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 shadow-lg dark:border-green-400 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                  RECOMMENDED
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  1. pip install (Preferred)
                </h2>
              </div>
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                Fastest and easiest method. Includes first-run setup wizard. Works on Windows, macOS, and Linux.
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>{pipCommand}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(pipCommand, setCopiedPip)}
                  className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                >
                  {copiedPip ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="mt-4 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Then run:</strong> <code className="rounded bg-green-200 px-1 dark:bg-green-800">ciris-agent</code> to start the first-run wizard
                </p>
              </div>
              <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                <strong>Requirements:</strong> Python 3.10+
              </div>
            </div>
          </div>

          {/* Other Methods */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Other Installation Methods
            </h2>

            <div className="space-y-6">
              {/* Method 2: Docker */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  2. Docker Compose
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Pre-built containers from GitHub Container Registry. Isolated environment with no dependency management.
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{dockerCommand}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(dockerCommand, setCopiedDocker)}
                    className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                  >
                    {copiedDocker ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <strong>Requirements:</strong> Docker Engine 20.10+, docker compose plugin
                </div>
              </div>

              {/* Method 3: curl | bash */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  3. Automated Installer Script
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  One-line installer that handles dependencies, setup, and services. Best for servers and production deployments.
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{curlCommand}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(curlCommand, setCopiedCurl)}
                    className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                  >
                    {copiedCurl ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <strong>Requirements:</strong> Linux/macOS/WSL2, Python 3.10+, Node.js 18+
                </div>
              </div>

              {/* Method 4: GitHub Clone */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  4. GitHub Clone (Development)
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Clone the repository for development, customization, or contributing. Full source code access.
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{gitCommand}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(gitCommand, setCopiedGit)}
                    className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                  >
                    {copiedGit ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="mt-3 rounded-md bg-gray-100 p-3 dark:bg-gray-700">
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>Then:</strong> Follow the{" "}
                    <a
                      href="https://github.com/CIRISAI/CIRISAgent/blob/main/README.md"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      README.md
                    </a>{" "}
                    for manual setup instructions
                  </p>
                </div>
              </div>

              {/* Method 5: CIRISManager */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  5. CIRISManager (Enterprise/Canary)
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Managed canary deployments with gradual rollouts, automated testing, and rollback capabilities. For production fleets.
                </p>
                <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    CIRISManager provides automated blue-green deployments with health monitoring. Contact the team for deployment configurations.
                  </p>
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <strong>Best for:</strong> Enterprise deployments, production fleets, managed infrastructure
                </div>
              </div>
            </div>
          </div>

          {/* Installer Script Options */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Installer Script Options
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Advanced options for the curl installer script (method #3)
            </p>

            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Custom Installation Directory
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    Install to a custom location (default: ~/ciris)
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --install-dir /opt/ciris
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Dry Run (Preview Actions)
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    See what would be installed without making changes
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --dry-run
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Development Mode
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    Install development dependencies
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --dev
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Skip Service Installation
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    Install without systemd/launchd service setup
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    curl -sSL https://ciris.ai/install.sh | bash -s -- --skip-service
                  </pre>
                </div>
              </details>
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
                  pip install fails
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">Ensure you have Python 3.10 or higher:</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    python --version
                  </pre>
                  <p className="mt-2">Try upgrading pip:</p>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    pip install --upgrade pip
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Docker containers won't start
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">Check container logs:</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    docker logs ciris-agent
                  </pre>
                  <p className="mt-2">Verify Docker Compose file:</p>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    docker compose -f ~/ciris/docker-compose.yml ps
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
