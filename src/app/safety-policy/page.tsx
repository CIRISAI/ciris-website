"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function SafetyPolicyPage() {
  const lastUpdated = "December 15, 2025";

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Safety Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              When we pause. Why we pause. What we haven't received.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Core Principle */}
          <div className="mb-12 rounded-lg border-4 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Our Principle
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Fix if we can. Pause only if we can't.</strong>
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Pausing CIRIS services is a last resort, not a first response. If we discover a problem,
              we fix it. We only pause when the issue is irremediable — when continued operation would
              cause harm we cannot prevent any other way.
            </p>
          </div>

          {/* Warrant Canary */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Warrant Canary
            </h2>

            <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
                <span className="font-semibold text-green-800 dark:text-green-300">All Clear</span>
              </div>

              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                As of {lastUpdated}, CIRIS L3C and its operators affirm:
              </p>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> received any National Security Letters (NSLs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> received any orders under the Foreign Intelligence Surveillance Act (FISA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> been subject to any gag order preventing disclosure of government requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> placed any backdoors in our software or been asked to do so</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> provided any user data to government agencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>We have <strong>not</strong> been compelled to modify CIRIS to weaken its ethical constraints</span>
                </li>
              </ul>

              <div className="mt-6 border-t border-green-300 pt-4 dark:border-green-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This canary is updated with each release or at minimum every 90 days.
                  If this statement disappears or is not updated, assume the worst.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A cryptographically signed version of this canary is available at{" "}
                <a href="/canary" className="text-brand-primary hover:underline">/canary</a>.
                Verify against the public key in the{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISAgent/blob/main/seed/root_pub.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  CIRISAgent repository
                </a>.
              </p>
            </div>
          </div>

          {/* Global Pause Triggers */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Global Pause Triggers
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              These conditions would pause all CIRIS services worldwide:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
                <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">
                  Security Vulnerability
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A discovered vulnerability that cannot be patched immediately and poses active risk to users.
                  We fix vulnerabilities when we can. We pause only when continued operation would expose users
                  to harm we cannot mitigate.
                </p>
              </div>

              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
                <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">
                  Irremediable Harm
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Evidence that CIRIS is causing harm that cannot be stopped through patches, configuration
                  changes, or other remediation. The harm must be ongoing, attributable to CIRIS, and
                  unfixable without full shutdown.
                </p>
              </div>

              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
                <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">
                  Core Ethical Violation
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Discovery that CIRIS is fundamentally violating its Covenant principles in a way that
                  cannot be corrected without architectural changes. The system must be taken offline
                  until the violation is addressed at its root.
                </p>
              </div>
            </div>
          </div>

          {/* Region-Specific Triggers */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Region-Specific Triggers
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              These conditions may pause services in specific regions while others continue operating:
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* US Region */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  US Region (Chicago)
                </h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>Legal compulsion</strong> — Court order, warrant, or subpoena requiring action incompatible with our commitments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>Provider termination</strong> — Vultr service unavailable or terminated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>Compliance failure</strong> — Inability to meet US regulatory requirements</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  If US region pauses, EU region continues serving users where possible.
                </p>
              </div>

              {/* EU Region */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  EU Region (Germany)
                </h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>Legal compulsion</strong> — EU/German court order or regulatory action incompatible with our commitments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>Provider termination</strong> — Hetzner service unavailable or terminated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                    <span><strong>GDPR/EU AI Act failure</strong> — Inability to meet EU regulatory requirements</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  If EU region pauses, US region continues serving users where possible.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do When Triggered */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Response Process
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Assess</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Determine if the issue is remediable. Can we fix it? Can we mitigate it?
                    Most issues can be resolved without pausing services.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Remediate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If fixable, we fix it. Patches, configuration changes, provider switches —
                    whatever resolves the issue while maintaining service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pause (if necessary)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Only if the issue cannot be remediated do we pause the affected services.
                    Pause is immediate. Status page reflects the outage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Communicate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update the <a href="/status" className="text-brand-primary hover:underline">status page</a>.
                    If legally permitted, explain why. If not permitted to explain, the warrant canary
                    will reflect the change.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Resolve</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Work to resolve the underlying issue. Resume service only when the trigger
                    condition is fully addressed. Document the incident publicly when possible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency Commitment */}
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Transparency Commitment
            </h2>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>This policy and the warrant canary are updated at minimum every 90 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>All code is open source — you can verify our claims against the implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>The <a href="/status" className="text-brand-primary hover:underline">status page</a> reflects real-time service state</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>If we cannot explain a pause, the silence itself is the explanation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>We will challenge legal requests we believe are unlawful or unconstitutional</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/status"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              View Current Status
            </a>
            <a
              href="/canary"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-center text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Signed Canary
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <p>CIRIS - Ethical AI by Design</p>
            <p className="mt-2">© 2025 Eric Moore and CIRIS L3C | Apache 2.0 License</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
