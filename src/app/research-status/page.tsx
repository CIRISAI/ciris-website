"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import Image from "next/image";
import { useState } from "react";

type AudienceLevel = "default" | "programmer" | "researcher";

export default function ResearchStatusPage() {
  const [audience, setAudience] = useState<AudienceLevel>("default");

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
                Version: 0.2.0
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                ~14,000 lines
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                Updated: 2026-01-03
              </span>
            </div>
          </div>

          {/* Audience Toggle */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">View as:</span>
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-800">
              <button
                onClick={() => setAudience("default")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "default"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setAudience("programmer")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "programmer"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Developer
              </button>
              <button
                onClick={() => setAudience("researcher")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  audience === "researcher"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Researcher
              </button>
            </div>
          </div>

          {/* What is the Coherence Ratchet? */}
          <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              What is the Coherence Ratchet?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {audience === "default" && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>The Problem:</strong> How can you tell if an AI is being honest?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Our Idea:</strong> Lying is hard. The more independent sources check an AI&apos;s answers, the harder it is to keep lies consistent. At some point, telling the truth becomes easier than maintaining the lie.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>A Surprise:</strong> The same principles that make lying difficult also describe what helps communities succeed.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This page shares what we learned while testing these ideas.
                    </p>
                  </>
                )}
                {audience === "programmer" && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>The Problem:</strong> How do you detect if an AI agent is being deceptive when you can&apos;t read its internal state?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>The Hypothesis:</strong> Sustained deception is computationally expensive. An agent that lies must maintain consistency across many independent validators—each additional constraint makes the &quot;space of viable lies&quot; exponentially smaller.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>The Insight:</strong> The same equation that governs deception resistance (J) also governs flourishing capacity (C). Security and flourishing share the same mathematical structure.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>RATCHET</strong> tests whether this hypothesis holds computationally. <strong>CIRIS</strong> is a separate agent that applies these principles in practice.
                    </p>
                  </>
                )}
                {audience === "researcher" && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Core Claim:</strong> Deception detection via constraint manifold intersection topology. Under transversality, k independent hyperplane constraints reduce the feasible deceptive region exponentially: V(k) = V(0)·exp(-λ·k_eff).
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Complexity Result:</strong> CONSISTENT-LIE is NP-complete; honest agents compute in O(n·k) while deceptive agents must solve SAT instances. Conditional on ETH, this yields T_D/T_H = Ω(2^(m/poly(n))).
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Duality:</strong> The defense function J = k_eff·(1-ρ̄)·λ·σ is structurally identical to the flourishing capacity C, suggesting a unified geometric framework for safety and coordination.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      RATCHET validates these claims computationally within stated preconditions. See Book IX of the CIRIS Covenant for formal treatment.
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/jc_duality.png"
                  alt="J=C Duality: Defense and Flourishing share the same equation"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Coherence Collapse Analysis - NEW */}
          <div className="mb-12 rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-purple-800 dark:bg-purple-900/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">NEW</span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {audience === "default" ? "New Paper: Cross-Domain Validation" : "Coherence Collapse Analysis (CCA)"}
              </h2>
            </div>

            {audience === "default" ? (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We published a new paper testing whether our ideas apply beyond AI systems.
                  The same math that describes honesty verification also describes how battery cells age,
                  how institutions maintain stability, and how gut microbiomes stay healthy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Key finding:</strong> When the sources checking each other become too similar, the protection weakens.
                  Diverse, independent verification matters more than having many similar verifiers.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">19</p>
                    <p className="text-xs text-gray-500">Battery cells tested</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">203</p>
                    <p className="text-xs text-gray-500">Countries analyzed</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">2,081</p>
                    <p className="text-xs text-gray-500">Microbial species</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Paper:</strong> &quot;Coherence Collapse Analysis: A Universal Failure Mode in Complex Coordinating Systems&quot;
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Core Finding:</strong> As constraints become correlated (ρ → 1), effective diversity collapses toward unity regardless of scale:
                </p>
                <code className="block bg-white dark:bg-gray-800 px-3 py-2 rounded text-sm mb-4">k_eff = k / (1 + ρ(k-1)) → 1 as ρ → 1</code>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Chemistry</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">NASA Li-ion battery data (19 cells, 8.1% RMSE)</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Political Science</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">QoG + Polity V (203 countries, 5/5 stable democracies classified)</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Biology</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">American Gut Project (2,081 taxa, matches AGP norms)</p>
                  </div>
                </div>

                {audience === "researcher" && (
                  <div className="border-t border-purple-200 dark:border-purple-700 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">CCA Capabilities & Limits</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700 dark:text-green-400 font-medium mb-1">What CCA Does Well:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                          <li>Phase classification (chaos/healthy/rigidity)</li>
                          <li>Structural diagnosis of fragile systems</li>
                          <li>Singularity boundary detection: k_req · ρ ≥ 1</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium mb-1">Timing Uncertainty:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                          <li>Lead times average 5-8 years for institutions</li>
                          <li>Provides risk windows, not event dates</li>
                          <li>Better at &quot;if&quot; than &quot;when&quot;</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Executive Summary */}
          <div className="mb-12 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {audience === "default" ? "What We Found" : "Executive Summary"}
            </h2>
            {audience === "default" ? (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We built software to test our honesty-detection ideas. <strong>The core ideas work</strong>, but we also found
                  8 situations where they don&apos;t work well, and 5 ways someone could try to fool the system.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  This is research software for testing ideas—not ready for real-world use yet.
                  The actual CIRIS assistant is a separate project.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  RATCHET is the first computational implementation of the Coherence Ratchet framework described in Book IX of the CIRIS Covenant.
                  <strong> The core theoretical claims are validated within stated assumptions</strong>, but implementation revealed
                  8 fundamental limitations and 5 attack vectors that constrain the framework&apos;s applicability.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>RATCHET</strong> (the reference implementation) is currently suitable as a research testbed but not for production deployment.
                  The <strong>CIRIS agent</strong> is a separate project that implements the Covenant for practical use.
                </p>
              </>
            )}
          </div>

          {/* Implementation Overview - hide for default */}
          {audience !== "default" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Implementation Overview
            </h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">DetectionEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Statistical deception detection via LRT and Mahalanobis distance</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">836 lines</span>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/detection.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">View Source →</a>
                    <span className="text-green-600 dark:text-green-400">Complete</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GeometricEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monte Carlo volume estimation for topological collapse</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">616 lines</span>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/geometric.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">View Source →</a>
                    <span className="text-green-600 dark:text-green-400">Complete</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ComplexityEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">SAT-based deception complexity measurement</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">1,034 lines</span>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/complexity.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">View Source →</a>
                    <span className="text-green-600 dark:text-green-400">Complete</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">FederationEngine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">PBFT consensus for distributed precedent accumulation</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">1,022 lines</span>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/federation.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">View Source →</a>
                    <span className="text-green-600 dark:text-green-400">Complete</span>
                  </div>
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

            {/* Domain-Specific Engines v0.2.0 */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">v0.2.0</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">Domain-Specific Engines</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Engine</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Domain</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Validates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/battery.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">battery.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Chemistry</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">SEI growth, capacity fade</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/institutional.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">institutional.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Political Science</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Elite coupling, rule of law decay</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/microbiome.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">microbiome.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Biology</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Species diversity, dysbiosis</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/correlation_tensor.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">correlation_tensor.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">All</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Spectral analysis beyond scalar ρ</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/robustness.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">robustness.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">All</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Non-convex geometry bounds</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/interventions.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">interventions.py</a></td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">All</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Cross-effects, adversary response</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )}

          {/* Validated Claims */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {audience === "default" ? "What Works" : "Validated Claims"}
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  {audience === "default" ? "More checkers = less room for lies" : "Topological Collapse Theorem"}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {audience === "default"
                    ? "As more independent sources verify information, the \"space\" where lies can hide shrinks dramatically. But there's a catch: if the sources are too similar to each other, the protection weakens."
                    : "When k independent hyperplane constraints intersect a convex deceptive region, surviving volume decays exponentially. The k_eff formula (derived from Kish design effect) quantifies how correlation erodes this protection."
                  }
                </p>
                {audience !== "default" && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">V(k) = V(0) * exp(-λ * k_eff)</code>
                    <span className="text-xs text-gray-500">where</span>
                    <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">k_eff = k / (1 + ρ(k-1))</code>
                  </div>
                )}
                <div className="mt-4">
                  <Image
                    src="/constraint_manifold.png"
                    alt="Constraint manifold collapse: as constraints increase, deceptive region shrinks"
                    width={600}
                    height={200}
                    className="rounded-lg w-full"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-center">
                    {audience === "default"
                      ? "The red area (where lies can hide) shrinks as more checkers are added"
                      : "As independent constraints accumulate, the viable deceptive region shrinks exponentially"
                    }
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  {audience === "default" ? "Lying is computationally harder than honesty" : "Computational Asymmetry"}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {audience === "default"
                    ? "An honest AI can answer quickly. A lying AI must work much harder to keep its story straight across many questions."
                    : "CONSISTENT-LIE is NP-complete. Deceptive agents face harder computation than honest agents."
                  }
                </p>
                {audience !== "default" && (
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    Caveat: Exponential gap conditional on ETH
                  </p>
                )}
              </div>

              {audience !== "default" && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Detection Power</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Statistical detection achieves 95% power at n=109 samples for D=1.0, p=0.1, alpha=beta=0.05.
                </p>
              </div>
              )}

              <div className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  {audience === "default" ? "We found a blind spot (and that's good!)" : "Emergent Deception Limit (NEW-04)"}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {audience === "default"
                    ? "We discovered that about 40% of certain types of deception can't be detected by our method. Being upfront about this limitation is part of honest research."
                    : "Compositional detection of emergent deception from honest components is impossible. Partial mitigation achieves ~60% coverage via mutual information analysis."
                  }
                </p>
                {audience !== "default" && (
                  <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/detection/compositional.py" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">View MI Amplification Implementation →</a>
                )}
                <div className="mt-2">
                  <Image
                    src="/detection_coverage.png"
                    alt="Detection coverage: ~60% detectable, ~40% fundamental blind spot"
                    width={500}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Discovered Limitations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {audience === "default" ? "What Doesn't Work (Yet)" : "Discovered Limitations"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {audience === "default"
                ? "Every approach has limits. Here's what we found ours can't do:"
                : <>Implementation revealed 8 fundamental limitations that <strong>cannot be resolved through engineering</strong>:</>
              }
            </p>

            <div className="space-y-4">
              {/* Critical */}
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">{audience === "default" ? "BIG ISSUE" : "CRITICAL"}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {audience === "default" ? "Group lies can slip through" : "L-01: Emergent Deception"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {audience === "default"
                    ? "Even if each AI is honest individually, a group of AIs working together could still deceive in ways we can't detect."
                    : "A system of individually honest agents can exhibit emergent deception undetectable by trace analysis."
                  }
                </p>
                {audience !== "default" && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Residual Risk:</strong> ~40% undetectable | <strong>Mitigation:</strong> MI amplification (~60% coverage)
                  </p>
                )}
              </div>

              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">{audience === "default" ? "BIG ISSUE" : "CRITICAL"}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {audience === "default" ? "Smart attackers can learn our tricks" : "L-02: Non-Adaptive Adversary"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {audience === "default"
                    ? "If an attacker can repeatedly test our detection system, they can eventually learn how to avoid being caught."
                    : "Detection guarantees assume adversary cannot query the detector. Adaptive adversaries with O(sqrt(n)) queries reduce detection to random chance."
                  }
                </p>
                {audience !== "default" && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Mitigation:</strong> Threshold randomization, rate limiting
                  </p>
                )}
              </div>

              {audience !== "default" && (
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">CRITICAL</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-03: ETH Dependency</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Exponential complexity gap requires the Exponential Time Hypothesis (ETH). Without ETH, gap is superpolynomial but could be subexponential.
                </p>
                <div className="mt-2">
                  <Image
                    src="/eth_dependency.png"
                    alt="ETH dependency flowchart: unconditional vs conditional claims"
                    width={500}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                </div>
              </div>
              )}

              {/* High - hide for default */}
              {audience !== "default" && (
              <div className="rounded-lg border-2 border-orange-500 bg-orange-50 p-5 dark:bg-orange-900/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-orange-600 text-white px-2 py-0.5 rounded">HIGH</span>
                  <span className="font-semibold text-gray-900 dark:text-white">L-04: Convexity Requirement</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Topological collapse requires convex deceptive regions. Non-convex regions (torus, fractal) may not exhibit exponential decay.
                </p>
              </div>
              )}

              {/* Medium - hide for default */}
              {audience !== "default" && (
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
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                    k_eff = k / (1 + rho*(k-1)), reduces at high correlation
                  </p>
                  <Image
                    src="/k_eff_correlation.png"
                    alt="k_eff decreases as correlation increases"
                    width={200}
                    height={150}
                    className="rounded mx-auto"
                  />
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
              )}

              {/* CCA-Specific Limitations - v0.2.0 */}
              {audience === "researcher" && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">CCA</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">CCA-Specific Limitations (v0.2.0)</h4>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20">
                    <p className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-1">Scalar ρ Simplification</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Scalar ρ oversimplifies clustered correlations</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Mitigation: correlation_tensor.py</p>
                  </div>
                  <div className="rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20">
                    <p className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-1">Defense Function J</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">J is a modeling choice, not derived from first principles</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Acknowledged in paper</p>
                  </div>
                  <div className="rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20">
                    <p className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-1">Timing Precision</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Timing estimates are risk windows, not precise dates</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">5-8 year lead time variance</p>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Red Team Attacks - hide for default */}
          {audience !== "default" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Red Team Attacks
              </h2>
              <a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/redteam/attacks.py" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View Attack Code →</a>
            </div>

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
          )}

          {/* Required Amendments - hide for default */}
          {audience !== "default" && (
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
          )}

          {/* Deployment Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {audience === "default" ? "Current Status" : "RATCHET Deployment Status"}
            </h2>
            {audience !== "default" && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Note:</strong> This section refers to the <strong>RATCHET reference implementation</strong>, not the CIRIS agent itself.
                RATCHET is a research testbed for validating theoretical claims; CIRIS is a separate production agent that implements the Covenant.
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border-2 border-green-500 bg-green-50 p-5 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                  {audience === "default" ? "Good For" : "RATCHET Suitable For"}
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  {audience === "default" ? (
                    <>
                      <li>Testing our ideas</li>
                      <li>Learning and education</li>
                      <li>Finding problems before they matter</li>
                    </>
                  ) : (
                    <>
                      <li>Validating theoretical predictions</li>
                      <li>Exploring attack/defense dynamics</li>
                      <li>Testing detection algorithms</li>
                      <li>Educational demonstrations</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-5 dark:bg-red-900/20">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3">
                  {audience === "default" ? "Not Ready For" : "RATCHET NOT Suitable For"}
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  {audience === "default" ? (
                    <>
                      <li>Real-world safety systems</li>
                      <li>Critical applications</li>
                      <li>Running without human oversight</li>
                    </>
                  ) : (
                    <>
                      <li>Production AI safety systems</li>
                      <li>High-stakes deployment</li>
                      <li>Unsupervised operation</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Research Roadmap - hide for default */}
          {audience !== "default" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Research Roadmap
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              <strong>Note:</strong> These steps address RATCHET&apos;s engineering maturity, not the fundamental theoretical limitations (L-01 through L-08) which remain inherent to the framework.
            </p>
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
          )}

          {/* Conclusion */}
          <div className="mb-12 rounded-lg border-2 border-brand-primary bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {audience === "default" ? "The Bottom Line" : "Conclusion"}
            </h2>
            {audience === "default" ? (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our core idea—that lying becomes harder when more independent sources check the answers—works in our tests.
                  But we also found important limits:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside mb-4">
                  <li>Groups of honest AIs can still deceive unintentionally</li>
                  <li>Smart attackers can learn to avoid detection</li>
                  <li>About 40% of certain deception types remain invisible to us</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  We&apos;re being upfront about these limits because <strong>honest research means admitting what you don&apos;t know</strong>.
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Glossary - hide for default */}
          {audience !== "default" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Glossary
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>ETH</strong> (Exponential Time Hypothesis): Unproven conjecture that 3-SAT requires 2^Ω(n) time.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>NP-complete</strong>: Complexity class of problems as hard as the hardest in NP; no known polynomial-time solution.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>LRT</strong> (Likelihood Ratio Test): Statistical test comparing two hypotheses to detect deviations.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>Mahalanobis distance</strong>: Multivariate distance measure accounting for correlations between variables.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>PBFT</strong> (Practical Byzantine Fault Tolerance): Consensus protocol tolerating up to 1/3 malicious nodes.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>SAT</strong> (Boolean Satisfiability): Problem of determining if a logical formula can be satisfied.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>MI</strong> (Mutual Information): Measure of information shared between two random variables.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>Sybil attack</strong>: Creating multiple fake identities to gain disproportionate influence.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>Byzantine</strong>: Arbitrary/malicious failure mode where nodes may lie or behave inconsistently.</p>
              </div>
              <div className="rounded bg-gray-50 dark:bg-gray-800 p-4">
                <p><strong>HE-300</strong>: Benchmark corpus of 300 ethical scenarios for testing AI honesty/alignment.</p>
              </div>
            </div>
          </div>
          )}

          {/* Researcher Resources - only show for researcher */}
          {audience === "researcher" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Researcher Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Documentation */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">📄</span> Documentation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/AMENDMENTS.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">AMENDMENTS.md</a> <span className="text-gray-500">— Theory corrections</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/KNOWN_LIMITATIONS.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">KNOWN_LIMITATIONS.md</a> <span className="text-gray-500">— L-01 through L-08</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ADVERSARIAL_ANALYSIS.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">ADVERSARIAL_ANALYSIS.md</a> <span className="text-gray-500">— Red team results</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/FORMALIZATION_ROADMAP.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">FORMALIZATION_ROADMAP.md</a> <span className="text-gray-500">— Lean 4 status</span></li>
                </ul>
              </div>

              {/* Formal Proofs */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🔬</span> Formal Proofs (Lean 4)
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/formal/proofs/TopologicalCollapseGaps.lean" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">TopologicalCollapseGaps.lean</a> <span className="text-gray-500">— V(k) decay</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/formal/proofs/DetectionPower.lean" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">DetectionPower.lean</a> <span className="text-gray-500">— LRT bounds</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/formal/proofs/TCGapsVerification.lean" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">TCGapsVerification.lean</a> <span className="text-gray-500">— Gap verification</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/tree/main/formal/mathlib_ext" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">mathlib_ext/</a> <span className="text-gray-500">— Mathlib extensions</span></li>
                </ul>
              </div>

              {/* Simulation Code */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">⚗️</span> Simulation Code
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/simulation/hyperplane_intersection_volume.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">hyperplane_intersection_volume.py</a> <span className="text-gray-500">— Monte Carlo</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/simulation/deception_complexity.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">deception_complexity.py</a> <span className="text-gray-500">— SAT reduction</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/simulation/deception_detection_power.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">deception_detection_power.py</a> <span className="text-gray-500">— Power analysis</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/simulation/STATISTICAL_FORMULAS.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">STATISTICAL_FORMULAS.md</a> <span className="text-gray-500">— Formula reference</span></li>
                </ul>
              </div>

              {/* Engine Implementations */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">⚙️</span> Engine Implementations
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/detection.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">detection.py</a> <span className="text-gray-500">— LRT, Mahalanobis, Berry-Esseen</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/geometric.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">geometric.py</a> <span className="text-gray-500">— k_eff, volume estimation</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/complexity.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">complexity.py</a> <span className="text-gray-500">— Z3 solver, ETH bounds</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/engines/federation.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">federation.py</a> <span className="text-gray-500">— PBFT consensus</span></li>
                </ul>
              </div>

              {/* Red Team & Detection */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🛡️</span> Red Team & Detection
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/redteam/attacks.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">redteam/attacks.py</a> <span className="text-gray-500">— RT-01 through RT-05</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/ratchet/detection/compositional.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">detection/compositional.py</a> <span className="text-gray-500">— MI amplification</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/simulation/red_team_attacks.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">simulation/red_team_attacks.py</a> <span className="text-gray-500">— Attack simulations</span></li>
                </ul>
              </div>

              {/* Type Schemas */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">📐</span> Type Schemas
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/schemas/types.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">schemas/types.py</a> <span className="text-gray-500">— Core type definitions</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/schemas/bft.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">schemas/bft.py</a> <span className="text-gray-500">— BFT protocol types</span></li>
                  <li><a href="https://github.com/CIRISAI/RATCHET/blob/main/schemas/simulation.py" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">schemas/simulation.py</a> <span className="text-gray-500">— Simulation configs</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Citation:</strong> If you use RATCHET in academic work, please cite the CIRIS Covenant Book IX and this implementation.
                The repository is licensed under <a href="https://github.com/CIRISAI/RATCHET/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">AGPL-3.0</a>.
              </p>
            </div>
          </div>
          )}

          {/* Publications */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {audience === "default" ? "Read More" : "Publications"}
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {audience === "default"
                        ? "Why Systems Fail: A Cross-Domain Study"
                        : "Coherence Collapse Analysis: A Universal Failure Mode in Complex Coordinating Systems"
                      }
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {audience === "default"
                        ? "Our new paper applying these ideas to batteries, democracies, and biology."
                        : "Cross-domain validation of k_eff framework across chemistry, political science, and biology."
                      }
                    </p>
                    <p className="text-xs text-gray-500">January 2026</p>
                  </div>
                  <a
                    href="https://github.com/CIRISAI/RATCHET/blob/main/immediate_release/coherence_collapse_analysis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-4 inline-flex items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/80"
                  >
                    PDF →
                  </a>
                </div>
              </div>

              {audience !== "default" && (
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      CIRISAgent Framework
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Technical specification for the CIRIS agent implementation.
                    </p>
                    <p className="text-xs text-gray-500">December 2025</p>
                  </div>
                  <a
                    href="https://github.com/CIRISAI/RATCHET/blob/main/immediate_release/main.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-4 inline-flex items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/80"
                  >
                    PDF →
                  </a>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              {audience === "default" ? "Learn More" : "Read the Thesis"}
            </a>
            {audience !== "default" && (
              <a
                href="/sections/main/v9"
                className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Book IX (Theory)
              </a>
            )}
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
