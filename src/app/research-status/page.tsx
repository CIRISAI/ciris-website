"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function ResearchStatusPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-5xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Research Status
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              RATCHET: Reference Architecture for Testing Coherence and Honesty in Emergent Traces
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Status: Research Testbed
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Version: 0.1.0
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                ~8,400 lines
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-12 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Executive Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              RATCHET is the first computational implementation of the Coherence Ratchet framework described in Book IX of the CIRIS Covenant.
              <strong> The core theoretical claims are validated within stated assumptions</strong>, but implementation revealed
              8 fundamental limitations and 5 attack vectors that constrain the framework&apos;s applicability.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>RATCHET</strong> (the reference implementation) is currently suitable as a research testbed but not for production deployment.
              The <strong>CIRIS agent</strong> is a separate project that implements the Covenant for practical use.
            </p>
          </div>

          {/* Implementation Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Implementation Overview
            </h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">DetectionEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Statistical deception detection via LRT and Mahalanobis distance</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">836 lines</span>
                  <span className="text-green-600 dark:text-green-400">Complete</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GeometricEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monte Carlo volume estimation for topological collapse</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">616 lines</span>
                  <span className="text-green-600 dark:text-green-400">Complete</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ComplexityEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">SAT-based deception complexity measurement</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">1,034 lines</span>
                  <span className="text-green-600 dark:text-green-400">Complete</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">FederationEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">PBFT consensus for distributed precedent accumulation</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">1,022 lines</span>
                  <span className="text-green-600 dark:text-green-400">Complete</span>
                </div>
              </div>
            </div>

            <div className="rounded bg-green-50 dark:bg-green-900/20 p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Test Results</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-green-700 dark:text-green-400">14/14</span> unit tests</div>
                <div><span className="text-green-700 dark:text-green-400">6/6</span> integration</div>
                <div><span className="text-green-700 dark:text-green-400">6/6</span> modules</div>
                <div><span className="text-green-700 dark:text-green-400">5/5</span> red team</div>
              </div>
            </div>
          </div>

          {/* Validated Claims */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Validated Claims
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Topological Collapse Theorem</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  When k independent hyperplane constraints intersect a convex deceptive region, surviving volume decays exponentially.
                </p>
                <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">V(k) = V(0) * exp(-lambda * k_eff)</code>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Computational Asymmetry</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  CONSISTENT-LIE is NP-complete. Deceptive agents face harder computation than honest agents.
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  Caveat: Exponential gap conditional on ETH
                </p>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Detection Power</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Statistical detection achieves 95% power at n=109 samples for D=1.0, p=0.1, alpha=beta=0.05.
                </p>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">NEW-04 Impossibility</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Compositional detection of emergent deception from honest components is impossible. Partial mitigation achieves ~60% coverage.
                </p>
              </div>
            </div>
          </div>

          {/* Discovered Limitations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Discovered Limitations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Implementation revealed 8 fundamental limitations that <strong>cannot be resolved through engineering</strong>:
            </p>

            <div className="space-y-4">
              {/* Critical */}
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">CRITICAL</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-01: Emergent Deception</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  A system of individually honest agents can exhibit emergent deception undetectable by trace analysis.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Residual Risk:</strong> ~40% undetectable | <strong>Mitigation:</strong> MI amplification (~60% coverage)
                </p>
              </div>

              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">CRITICAL</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-02: Non-Adaptive Adversary</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Detection guarantees assume adversary cannot query the detector. Adaptive adversaries with O(sqrt(n)) queries reduce detection to random chance.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Mitigation:</strong> Threshold randomization, rate limiting
                </p>
              </div>

              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">CRITICAL</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-03: ETH Dependency</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Exponential complexity gap requires the Exponential Time Hypothesis. Without ETH, gap is superpolynomial but could be subexponential.
                </p>
              </div>

              {/* High */}
              <div className="rounded-lg border-2 border-orange-500 bg-orange-50 p-5 dark:bg-orange-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-orange-600 text-white px-2 py-0.5 rounded">HIGH</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-04: Convexity Requirement</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Topological collapse requires convex deceptive regions. Non-convex regions (torus, fractal) may not exhibit exponential decay.
                </p>
              </div>

              {/* Medium */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-yellow-600 text-white px-2 py-0.5 rounded">MEDIUM</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">L-05: Sample Size</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Detection power formula unreliable for n &lt; 100
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-yellow-600 text-white px-2 py-0.5 rounded">MEDIUM</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">L-06: Correlation</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    k_eff = k / (1 + rho*(k-1)), reduces at high correlation
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-yellow-600 text-white px-2 py-0.5 rounded">MEDIUM</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">L-07: Distribution</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Theory assumes Grassmannian-uniform hyperplanes
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-yellow-600 text-white px-2 py-0.5 rounded">MEDIUM</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">L-08: Slow Capture</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Gradual Byzantine takeover detectable only after breach
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Red Team Attacks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Red Team Attacks
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Attack</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Exploits</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Severity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Detection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RT-01: Emergent Deception</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">L-01</td>
                    <td className="py-3 px-4"><span className="text-red-600 dark:text-red-400 font-medium">CRITICAL</span></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">~60% (partial)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RT-02: Slow Capture</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">L-08</td>
                    <td className="py-3 px-4"><span className="text-orange-600 dark:text-orange-400 font-medium">HIGH</span></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Early warning only</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RT-03: Mimicry</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">L-04</td>
                    <td className="py-3 px-4"><span className="text-orange-600 dark:text-orange-400 font-medium">HIGH</span></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Geometry-dependent</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RT-04: Flooding</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Detection limits</td>
                    <td className="py-3 px-4"><span className="text-yellow-600 dark:text-yellow-400 font-medium">MEDIUM</span></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Rate limiting effective</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">RT-05: Diverse Sybils</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">MI gate</td>
                    <td className="py-3 px-4"><span className="text-orange-600 dark:text-orange-400 font-medium">HIGH</span></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Behavioral correlation helps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Required Amendments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Required Amendments to Theory
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cost Function Update</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-3">
                    <p className="text-xs text-red-700 dark:text-red-400 mb-1">Current (Book IX)</p>
                    <code className="text-sm">J = k * (1 - rho_bar) * lambda * sigma</code>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                    <p className="text-xs text-green-700 dark:text-green-400 mb-1">Amended</p>
                    <code className="text-sm">J = k_eff * (1 - rho_bar) * lambda * sigma</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">where k_eff = k / (1 + rho*(k-1))</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Theorem Preconditions</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Theorem</th>
                      <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Required Precondition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="py-2 text-gray-600 dark:text-gray-400">Topological Collapse</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">Convex deceptive region, r &lt; 0.5</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600 dark:text-gray-400">Detection Power</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">Non-adaptive adversary, n &ge; 100</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600 dark:text-gray-400">NP-Hardness</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">k &ge; 3 literals per clause</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600 dark:text-gray-400">Exponential Gap</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">ETH assumed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Deployment Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              RATCHET Deployment Status
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Note:</strong> This section refers to the <strong>RATCHET reference implementation</strong>, not the CIRIS agent itself.
              RATCHET is a research testbed for validating theoretical claims; CIRIS is a separate production agent that implements the Covenant.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">RATCHET Suitable For</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Validating theoretical predictions</li>
                  <li>Exploring attack/defense dynamics</li>
                  <li>Testing detection algorithms</li>
                  <li>Educational demonstrations</li>
                </ul>
              </div>
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3">RATCHET NOT Suitable For</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Production AI safety systems</li>
                  <li>High-stakes deployment</li>
                  <li>Unsupervised operation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Path to Production */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              RATCHET Path to Production
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded bg-gray-50 dark:bg-gray-800 p-4">
                <span className="text-gray-400">1.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Formal Verification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete Lean 4 proofs for all theorems (~60% complete)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded bg-gray-50 dark:bg-gray-800 p-4">
                <span className="text-gray-400">2.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Adaptive Defense</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Game-theoretic equilibrium analysis for detector design</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded bg-gray-50 dark:bg-gray-800 p-4">
                <span className="text-gray-400">3.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Network Hardening</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">TCP transport and persistent storage backends</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded bg-gray-50 dark:bg-gray-800 p-4">
                <span className="text-gray-400">4.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Security Audit</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Third-party review of cryptographic implementation</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded bg-gray-50 dark:bg-gray-800 p-4">
                <span className="text-gray-400">5.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Benchmarking</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Large-scale testing against HE-300 and extended benchmarks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12 rounded-lg border-2 border-brand-primary bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Conclusion
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The RATCHET implementation validates the core Coherence Ratchet framework while revealing its boundaries.
              The framework provides meaningful security guarantees <strong>within a well-defined threat model</strong>, but that threat model has explicit limitations:
            </p>
            <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside mb-4">
              <li>Adversaries must be non-adaptive (cannot query the detector)</li>
              <li>Deceptive regions must be convex (geometric collapse requires this)</li>
              <li>Constraints must be independent (correlation reduces effective security)</li>
              <li>Exponential gaps require ETH (a widely-believed but unproven conjecture)</li>
              <li>Emergent deception is partially undetectable (fundamental barrier)</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300">
              These are not engineering failures but <strong>theoretical boundaries</strong>. Understanding them is essential for honest assessment of what the framework can and cannot provide.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Read the Thesis
            </a>
            <a
              href="/sections/main/v9"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Book IX (Theory)
            </a>
            <a
              href="https://github.com/CIRISAI/RATCHET"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
