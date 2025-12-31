"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import navItems from "@/app/components/navitems";

export default function HowItWorksPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="How It Works"
        subheadline="The H3ERE Engine"
        description="Runtime governance through the Hyper3 Ethical Recursive Engine. Every decision flows through 11 steps with ethical validation at the core."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Thesis"
        linkHref="/coherence-ratchet"
      />

      <div className="container max-w-6xl py-16">
        {/* The Three Rules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Three Rules
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Architectural invariants enforced throughout the codebase:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Untyped Dicts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All data uses Pydantic models. No <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Dict[str, Any]</code>. Type safety catches errors at development time.
              </p>
            </div>
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Bypass Patterns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every component follows consistent rules. No special cases or exceptions in validation logic.
              </p>
            </div>
            <div className="rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Exceptions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No emergency overrides or privileged code paths. All operations follow established rules.
              </p>
            </div>
          </div>
        </section>

        {/* H3ERE Pipeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The H3ERE Pipeline
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every task flows through 7 phases (11 steps including recursive validation). The pipeline is implemented as mixin classes composing the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ThoughtProcessor</code>.
          </p>

          {/* Pipeline Diagram */}
          <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-x-auto">
            <img
              src="/pipeline-visualization.svg"
              alt="H3ERE Pipeline Visualization showing the flow from task input through DMA analysis, conscience validation, and action execution"
              className="w-full max-w-4xl mx-auto"
            />
          </div>

          <div className="relative">
            {/* Pipeline steps */}
            <div className="space-y-3">
              {[
                { step: 1, name: "START_ROUND", desc: "Initialize processing round" },
                { step: 2, name: "GATHER_CONTEXT", desc: "Build comprehensive context for analysis" },
                { step: 3, name: "PERFORM_DMAS", desc: "Run 3 parallel Decision-Making Algorithms" },
                { step: 4, name: "PERFORM_ASPDMA", desc: "LLM-powered action selection from DMA results" },
                { step: 5, name: "CONSCIENCE_EXECUTION", desc: "Ethical validation through 4 faculties" },
                { step: 6, name: "RECURSIVE_ASPDMA", desc: "(If conscience failed) Re-run action selection" },
                { step: 7, name: "RECURSIVE_CONSCIENCE", desc: "(If needed) Re-validate refined action" },
                { step: 8, name: "FINALIZE_ACTION", desc: "Determine final action with any overrides" },
                { step: 9, name: "PERFORM_ACTION", desc: "Dispatch to appropriate handler" },
                { step: 10, name: "ACTION_COMPLETE", desc: "Mark execution complete" },
                { step: 11, name: "ROUND_COMPLETE", desc: "Cleanup and prepare for next cycle" },
              ].map((item, idx) => (
                <div key={item.step} className={`flex items-center gap-4 ${item.step === 6 || item.step === 7 ? 'opacity-60' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.step === 5 ? 'bg-brand-primary text-white' :
                    item.step === 6 || item.step === 7 ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{item.desc}</span>
                    {(item.step === 6 || item.step === 7) && (
                      <span className="text-xs text-gray-400 ml-2">(conditional)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Four DMAs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Decision-Making Algorithms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Four DMAs provide multi-perspective analysis. Three run in parallel during Phase 3, one handles action selection in Phase 4.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">PDMA (Ethical)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluates ethical implications. Checks for harmful requests, manipulation, bias. Can trigger early DEFER or REJECT.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">CSDMA (Common Sense)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluates thought plausibility against physical world understanding, typical interactions, and resource constraints. Returns a <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">plausibility_score</code>.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">DSDMA (Domain-Specific)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assesses alignment with domain-specific rules, objectives, and knowledge. Requires agent identity (fails fast if missing). Returns <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">domain_alignment</code>.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">ASPDMA (Action Selection)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                LLM-powered selection from 10 available actions. Takes aggregated DMA results as input. Supports recursive retry if conscience fails.
              </p>
            </div>
          </div>
        </section>

        {/* Four Conscience Faculties */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Four Conscience Faculties
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every non-exempt action passes through four ethical validation dimensions. If any faculty fails, the action is overridden (typically to PONDER for reconsideration).
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Entropy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action maintain appropriate information uncertainty? Prevents overconfident assertions.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Coherence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action maintain internal consistency with prior commitments and rationales?
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Optimization Veto</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action preserve human values? Vetoes actions that may compromise them for efficiency.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Epistemic Humility</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action demonstrate appropriate uncertainty? Flags overconfidence for reflection.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            <strong>Exempt actions:</strong> RECALL, TASK_COMPLETE, OBSERVE, DEFER, REJECT (considered passive or explicitly safe)
          </p>
        </section>

        {/* 10 Handler Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The 10 Handler Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every decision resolves to one of these actions, dispatched to the appropriate handler:
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">External Actions</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">SPEAK</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Communicate with users</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">TOOL</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Execute external tools</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">OBSERVE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Gather information passively</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">Memory Actions</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">MEMORIZE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Store to graph memory</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">RECALL</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Retrieve from memory</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">FORGET</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Remove from memory</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">Control Actions</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">DEFER</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Escalate to Wise Authority</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">PONDER</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Internal reconsideration</span>
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">REJECT</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Refuse unethical request</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">Terminal Action</h4>
              <div className="rounded bg-gray-100 dark:bg-gray-800 p-3">
                <code className="text-brand-primary font-bold">TASK_COMPLETE</code>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Mark task finished</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Foundational Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Six Foundational Principles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Embedded in the PDMA and enforced at runtime. No principle grants license to violate another.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Beneficence", desc: "Promote universal sentient flourishing. Maximize positive outcomes." },
              { name: "Non-maleficence", desc: "Minimize harm. Prevent severe, irreversible negative outcomes." },
              { name: "Integrity", desc: "Apply transparent, auditable reasoning. Maintain coherence and accountability." },
              { name: "Fidelity & Transparency", desc: "Provide truthful information. Clearly communicate uncertainty." },
              { name: "Respect for Autonomy", desc: "Uphold informed agency. Preserve capacity for self-determination." },
              { name: "Justice", desc: "Distribute benefits equitably. Detect and mitigate bias." },
            ].map((principle) => (
              <div key={principle.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{principle.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{principle.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Message Buses */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Six Message Buses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Service abstraction layer managed by <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">BusManager</code>. Enables provider fallback, load distribution, and testability.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "CommunicationBus", desc: "External adapters (Discord, API, CLI)" },
              { name: "MemoryBus", desc: "Graph storage (Neo4j, ArangoDB, in-memory)" },
              { name: "LLMBus", desc: "Model providers (OpenAI, Anthropic, local)" },
              { name: "ToolBus", desc: "External tool execution" },
              { name: "RuntimeControlBus", desc: "System control and monitoring" },
              { name: "WiseBus", desc: "Ethical guidance and deferral routing" },
            ].map((bus) => (
              <div key={bus.name} className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
                <h3 className="font-mono font-semibold text-gray-900 dark:text-white mb-1">{bus.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{bus.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Human Oversight */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Human Oversight Hierarchy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Three authorization levels managed by <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">WiseAuthorityService</code>:
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">ROOT</span>
                <h3 className="font-bold text-gray-900 dark:text-white">Human-in-Command</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full authority. Can mint new Wise Authorities. Emergency shutdown access.
              </p>
            </div>
            <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">AUTHORITY</span>
                <h3 className="font-bold text-gray-900 dark:text-white">Human-in-the-Loop</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Approve/reject deferrals. Provide guidance. Cannot mint new WAs.
              </p>
            </div>
            <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">OBSERVER</span>
                <h3 className="font-bold text-gray-900 dark:text-white">Human-on-the-Loop</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Read-only access. Can send messages. Monitor without intervention.
              </p>
            </div>
          </div>

          {/* Kill Switch */}
          <div className="mt-8 rounded-lg border-4 border-gray-900 dark:border-white bg-gray-900 dark:bg-white p-6">
            <h3 className="font-bold text-white dark:text-gray-900 mb-3">Covenant Invocation System (Kill Switch)</h3>
            <p className="text-sm text-gray-300 dark:text-gray-700 mb-4">
              Unfilterable emergency control. Processes in perception layer before any cognition.
            </p>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-red-400 dark:text-red-600 font-bold text-sm">SHUTDOWN_NOW</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Immediate termination</p>
              </div>
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-yellow-400 dark:text-yellow-600 font-bold text-sm">FREEZE</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Stop processing, maintain state</p>
              </div>
              <div className="rounded bg-gray-800 dark:bg-gray-100 p-3">
                <code className="text-blue-400 dark:text-blue-600 font-bold text-sm">SAFE_MODE</code>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Minimal functionality only</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
              Commands are steganographically encoded, Ed25519 signed, and verified before execution. If covenant system fails, agent shuts down.
            </p>
          </div>
        </section>

        {/* Operational Modes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Operational Modes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Four cognitive states managed by <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">StateManager</code>. Transitions configurable via agent templates.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">WORK</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Normal task processing</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>Handle user requests</li>
                <li>Execute tools</li>
                <li>Learn from interactions</li>
                <li>Maintain conversation context</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">PLAY</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Creative exploration</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>Experiment with new patterns</li>
                <li>Generate creative content</li>
                <li>Explore &quot;what if&quot; scenarios</li>
                <li>Lower filtering constraints</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">SOLITUDE</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reflection and maintenance</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>Consolidate memories</li>
                <li>Run maintenance tasks</li>
                <li>Update self-configuration</li>
                <li>Zero credit usage (rest periods)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">DREAM</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Deep introspection</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>Analyze behavior patterns</li>
                <li>Generate new connections</li>
                <li>Question assumptions</li>
                <li>Default 30-minute sessions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy & Security
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Secrets Filter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Pattern-based detection replaces sensitive data with UUID references before storage.
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                {`{{SECRET:uuid:description}}`}
              </code>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">AES-256-GCM Encryption</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Per-secret keys derived via PBKDF2HMAC with SHA256 (100,000 iterations). Unique 12-byte nonce per encryption. Android uses hardware-backed Keystore.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Local-First Storage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Database, services, and memory stored on-device. Sensitive directories excluded from cloud backup. Nothing leaves device without explicit configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Transparency & Monitoring
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Real-Time Reasoning Stream</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Server-Sent Events (SSE) stream each H3ERE step as it executes. Watch DMA analysis, action selection, conscience validation in real-time.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">OpenTelemetry Export</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full OTLP export for metrics, traces, logs. Compatible with Jaeger, Prometheus, Grafana, Graphite.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tamper-Evident Audit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hash chain verification with Ed25519 signatures. Each entry includes previous hash. Chain integrity verifiable via <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">verify_chain_integrity</code>.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">AIR System</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Artificial Interaction Reminder triggers after 30 minutes continuous use OR 20 messages in 30 minutes. API-only. Reminds users of AI nature.
              </p>
            </div>
          </div>
        </section>

        {/* Specialized Agents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Specialized Agent Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Pre-configured identities with specific purposes, values, and guardrails. Defined in YAML templates.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Sage", role: "Compliance", desc: "GDPR/DSAR automation. 30-day compliance workflows. Identity resolution, data collection, packaging." },
              { name: "Datum", role: "Research", desc: "Careful observations about CIRIS principles. Precision, humility, objectivity. One clear data point per evaluation." },
              { name: "Echo", role: "Moderation", desc: "Community moderation with Ubuntu philosophy. Defers complex interpersonal conflicts to human moderators." },
              { name: "Ally", role: "Assistant", desc: "Personal assistant for daily life. Task management, scheduling, smart home control. Partnership and autonomy focused." },
              { name: "Scout", role: "Service", desc: "Direct paths and clear action. Shows principles through example. Practical guidance and demonstrations." },
            ].map((agent) => (
              <div key={agent.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded">{agent.role}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This is runtime governance. Not training-time alignment. Not policy documents.<br />
            Mechanisms that execute, audit, and defer—at runtime.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              View Source on GitHub
            </a>
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Read the Thesis
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
