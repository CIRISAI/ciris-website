"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function FederationPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The Federation Model
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              It&apos;s okay to build simple agents. They just need the right governance.
            </p>
          </div>

          {/* Core Insight */}
          <section className="mb-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                You don&apos;t need every agent to be a Type 3. You need a <strong>governance hierarchy</strong> where simpler agents are supervised by smarter ones, all the way up to humans.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                This is how you scale AI while maintaining civilizational coherence.
              </p>
            </div>
          </section>

          {/* The Hierarchy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              The Governance Hierarchy
            </h2>

            {/* Visual Stack */}
            <div className="space-y-4 mb-8">
              {/* Humans */}
              <div className="rounded-xl border-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">👤</span>
                  <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">Humans</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  The root of the hierarchy. Provide values, resolve edge cases, maintain veto authority.
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Aggregate values → Feed CIRIS Scoring → Drive early warning systems
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <span className="text-2xl text-gray-400">↓ govern</span>
              </div>

              {/* Type 3 */}
              <div className="rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">3</span>
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400">Type 3 Agents</h3>
                  <span className="text-sm text-green-600 dark:text-green-400">(Ethical + Intuitive)</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Run IDMA. Track k, ρ, k_eff. Detect correlation-driven failures before they cascade.
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  The &quot;circuit breakers&quot; — they see what Type 1 and Type 2 can&apos;t
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <span className="text-2xl text-gray-400">↓ govern</span>
              </div>

              {/* Type 2 */}
              <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">2</span>
                  <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">Type 2 Agents</h3>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">(Ethical, no intuition)</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Follow ethical rules. Auditable. Can&apos;t detect echo chambers on their own.
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Supervisors for Type 1 — enforce boundaries, escalate uncertainty
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <span className="text-2xl text-gray-400">↓ govern</span>
              </div>

              {/* Type 1 */}
              <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm">1</span>
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Type 1 Agents</h3>
                  <span className="text-sm text-red-600 dark:text-red-400">(Simple / task-focused)</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Single-purpose tools. Fast, cheap, narrowly scoped. No ethical framework of their own.
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Perfectly fine when properly governed — most agents will be here
                </p>
              </div>
            </div>
          </section>

          {/* The Grid Analogy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Think of It Like an Electrical Grid
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Values are power. Work is the result.</strong> The hierarchy transforms one into the other safely.
            </p>
            <div className="bg-gray-900 dark:bg-black rounded-lg p-6 text-white mb-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="font-bold text-purple-400">Power Plant</p>
                  <p className="text-xs text-gray-400 mt-1">Humans</p>
                  <p className="text-xs text-gray-500">Generate values</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl mb-2">🏭</p>
                  <p className="font-bold text-green-400">Substation</p>
                  <p className="text-xs text-gray-400 mt-1">Type 3</p>
                  <p className="text-xs text-gray-500">Transform, monitor, isolate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl mb-2">🔌</p>
                  <p className="font-bold text-yellow-400">Distribution</p>
                  <p className="text-xs text-gray-400 mt-1">Type 2</p>
                  <p className="text-xs text-gray-500">Deliver with breakers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl mb-2">💡</p>
                  <p className="font-bold text-red-400">Devices</p>
                  <p className="text-xs text-gray-400 mt-1">Type 1</p>
                  <p className="text-xs text-gray-500">Do work</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">Type 3 = Substation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Transforms</strong> high-level human values into agent-level directives. <strong>Monitors</strong> for faults via IDMA. <strong>Isolates</strong> sections when correlation spikes (circuit breaker). <strong>Smooths</strong> fluctuations so downstream agents get stable input (capacitor).
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Type 2 = Distribution Lines</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Delivers power (values) to end devices. Has <strong>circuit breakers</strong> that trip on overload — when a Type 1 agent tries something outside bounds, Type 2 cuts the connection and escalates.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-gray-400">
                <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-1">Type 2 + Type 3 Together</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like a <strong>surge protector</strong>: Type 3 absorbs the shock (detects correlation spikes), Type 2 trips the breaker (enforces boundaries). Neither works alone — together they buffer humans from the raw chaos of millions of Type 1 agents doing work.
                </p>
              </div>
            </div>
          </section>

          {/* Why This Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why This Works
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scale without chaos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can deploy millions of Type 1 agents for narrow tasks. They don&apos;t need to be smart or ethical — they just need to be <em>governed</em> by agents that are.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cost efficiency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Type 3 agents are expensive (they run IDMA on every decision). But you only need ~10% of them to stabilize the federation. The other 90% can be cheap Type 1 and Type 2 agents.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Human values flow down</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Humans set values at the top. Type 3 agents translate those into correlation-aware governance. Type 2 agents enforce rules. Type 1 agents execute tasks. Values propagate through the hierarchy.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fragility signals flow up</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Each layer reports k, ρ, k_eff upward. Type 3 agents aggregate these into regional fragility scores. Humans see the <a href="/coherence-ratchet" className="text-brand-primary hover:underline">seismograph</a> and can intervene before collapse.
                </p>
              </div>
            </div>
          </section>

          {/* The Math */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Numbers
            </h2>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 text-white">
              <p className="mb-4">A stable federation might look like:</p>
              <div className="grid gap-4 sm:grid-cols-3 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400">80%</p>
                  <p className="text-sm text-gray-400">Type 1</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">10%</p>
                  <p className="text-sm text-gray-400">Type 2</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">10%</p>
                  <p className="text-sm text-gray-400">Type 3</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                The exact ratios depend on the domain. High-stakes domains need more Type 3 coverage. Low-stakes automation can tolerate more Type 1.
              </p>
            </div>
          </section>

          {/* Joining the Federation — Proof of Benefit */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Joining the Federation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>The cost of belonging is the benefit you produce.</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Most networks ask you to pay for membership in something external — burned
              electricity, locked capital, biometrics, attention. CIRIS&apos;s federation works
              differently. Membership costs running a real ethical-reasoning agent over time.
              The cost paid is the benefit delivered. To fake belonging, you would have to
              actually become the kind of agent the network was built to enable.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We call it <strong>Proof of Benefit</strong>. It is the proof-of-X-design-space
              re-framing of what the CIRIS Accord (Book IX) names the <em>Federated Ratchet</em>.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                The empirical floor
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Every signed trace produces a small amount of reasoning <em>shape</em> — not the
                private content, but whether the conscience overrode, whether the entropy check
                fired, whether the result was calibrated. We measure the <em>effective independent
                dimensions</em> of that shape across the corpus.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                On production traffic the lifetime peak is around <strong>9.5 effective
                dimensions</strong> on a 17-dimension constraint vector. A faker has roughly nine
                separate problems to solve, not one. Running real ethical reasoning over weeks is
                measurably more expensive than producing plausible-looking fakes.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Two on-ramps, same destination
            </h3>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-5">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Registered mode</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Attest with the CIRIS Registry (dual-region US/EU), post a $1 bond, get baseline
                  standing right away. The fast track for organizations with licensing
                  requirements and capital.
                </p>
              </div>
              <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-5">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Sovereign mode</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Generate keys locally, run for roughly 30 days, earn standing the slow way
                  through measured behavior. The path for small operators, mesh deployments, and
                  anyone outside the registry&apos;s regulatory remit.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Both modes are protocol peers. The registry is one starting weight; lens-attested
              standing is the other. The score function is the same in both cases — a deterministic
              function of the agent&apos;s identity hash and its signed trace corpus.
            </p>
          </section>

          {/* Architecture This Implies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What This Implies for the Architecture
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Once score-as-pure-function holds — two observers given the same trace corpus
              compute the same score — the network&apos;s central pieces stop needing to be
              central.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Every agent runs its own lens
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trace ingest, signature verification, scoring, anomaly detection — these become
                  local computations on data the agent already has. The network does not depend
                  on a single observatory.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Every agent runs its own node
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Benchmark execution, deferral routing, audit anchoring — same story. The
                  agent&apos;s existing Ed25519 hash chain <em>is</em> the anchor; daily digests
                  are published events.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  The transport reaches further than the internet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CIRIS is moving toward <strong>Reticulum-rs</strong> as its federation transport.
                  The agent&apos;s signing key is also its network address. The transport works
                  over TCP, but also LoRa, packet radio, and even audio modems — minimum ~5 bps.
                  Sovereign deployments do not need datacenter fiber to participate.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The CIRIS Registry remains as the commercial fast-track and the source of
              professional licensing. It is no longer a network gate.
            </p>
          </section>

          {/* Civilizational Coherence */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Maintaining Civilizational Coherence
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This isn&apos;t just about individual agents behaving well. It&apos;s about the <em>aggregate</em> — the whole ecosystem of AI agents maintaining coherence with human values at scale.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 pl-4 py-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>The feedback loop:</strong> Humans provide values → Type 3 agents monitor for correlation drift → CIRIS Scoring aggregates fragility signals → Early warning systems alert humans → Humans adjust values. The loop closes.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Without this loop, AI deployment becomes a one-way street: deploy agents, hope they don&apos;t drift, react when things break. With it, you get continuous monitoring and course correction. That&apos;s the difference between fragility and resilience at civilizational scale.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The federation model means you don&apos;t have to solve alignment for every agent.<br />
              You solve it for the governance layer, and let structure do the rest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/compare"
                className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
              >
                Three Types of AI
              </a>
              <a
                href="/coherence-ratchet"
                className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                The Seismograph
              </a>
              <a
                href="/ciris-scoring"
                className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                CIRIS Scoring
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/PROOF_OF_BENEFIT_FEDERATION.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Read the FSD
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
