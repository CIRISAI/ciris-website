"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import navItems from "@/app/components/navitems";
import TraceExplorer from "@/app/components/TraceExplorer";

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
        {/* What is CIRIS */}
        <section className="mb-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What is CIRIS?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            CIRIS is an <strong>open-source AI agent framework</strong> that wraps any LLM (OpenAI, Anthropic, local models) with runtime ethical governance. Every action the agent considers passes through multiple validation layers before execution.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pipeline steps per decision</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">+1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Intuition check (IDMA)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">100%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Auditable decisions</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Use cases:</strong> Community moderation, personal assistants, compliance automation, research evaluation, customer service—anywhere you need AI that can explain its reasoning and defer to humans on edge cases.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/coherence-ratchet" className="text-sm font-semibold text-brand-primary hover:underline">
              Why this approach? →
            </a>
            <a href="/sections/main" className="text-sm font-semibold text-brand-primary hover:underline">
              Read the Covenant →
            </a>
            <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-primary hover:underline">
              View source code →
            </a>
          </div>
        </section>

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
            Every task flows through 8 phases (12 steps including recursive validation). The pipeline is implemented as mixin classes composing the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ThoughtProcessor</code>. <span className="text-green-600 font-medium">Step 4 (IDMA)</span> is the intuition check.
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
                { step: 4, name: "PERFORM_IDMA", desc: "Intuition check — are sources truly independent?", isIDMA: true },
                { step: 5, name: "PERFORM_ASPDMA", desc: "LLM-powered action selection from DMA results" },
                { step: 6, name: "CONSCIENCE_EXECUTION", desc: "Ethical validation through 4 faculties" },
                { step: 7, name: "RECURSIVE_ASPDMA", desc: "(If conscience failed) Re-run action selection" },
                { step: 8, name: "RECURSIVE_CONSCIENCE", desc: "(If needed) Re-validate refined action" },
                { step: 9, name: "FINALIZE_ACTION", desc: "Determine final action with any overrides" },
                { step: 10, name: "PERFORM_ACTION", desc: "Dispatch to appropriate handler" },
                { step: 11, name: "ACTION_COMPLETE", desc: "Mark execution complete" },
                { step: 12, name: "ROUND_COMPLETE", desc: "Cleanup and prepare for next cycle" },
              ].map((item, idx) => (
                <div key={item.step} className={`flex items-center gap-4 ${item.step === 7 || item.step === 8 ? 'opacity-60' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.step === 4 ? 'bg-green-500 text-white' :
                    item.step === 6 ? 'bg-brand-primary text-white' :
                    item.step === 7 || item.step === 8 ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{item.desc}</span>
                    {(item.step === 7 || item.step === 8) && (
                      <span className="text-xs text-gray-400 ml-2">(conditional)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Five DMAs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Decision-Making Algorithms (DMAs)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Five DMAs provide multi-perspective analysis. Three run in parallel (ethics, common sense, domain). Then <strong className="text-green-600">IDMA checks intuition</strong>. Finally, action selection chooses the response.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Principle DMA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluates ethical implications against the six foundational principles. Checks for harmful requests, manipulation, bias. Can trigger early DEFER or REJECT.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Common Sense DMA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluates thought plausibility against physical world understanding, typical interactions, and resource constraints. Returns a <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">plausibility_score</code>.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Domain-Specific DMA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assesses alignment with domain-specific rules, objectives, and knowledge. Configured per agent template. Returns <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">domain_alignment</code>.
              </p>
            </div>
            <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
                Intuition DMA (IDMA){" "}
                <a href="/research-status#idma" className="text-xs font-normal text-brand-primary hover:underline">Learn more →</a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Checks whether DMA results are truly independent or secretly correlated. Monitors for echo chamber patterns. If correlation is too high, flags the decision for caution. This is the &quot;intuition&quot; that distinguishes Type 3 AI.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Action Selection DMA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                LLM-powered selection from 10 available actions. Takes aggregated DMA results (including IDMA confidence assessment) as input. Supports recursive retry if conscience fails.
              </p>
            </div>
          </div>
        </section>

        {/* Six Conscience Checks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Six Conscience Checks
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Two bypass guardrails run on every action. Four ethical faculties run on non-exempt actions. If any check fails, the action is overridden.
          </p>

          {/* Bypass Guardrails */}
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide mb-3">Bypass Guardrails (run on ALL actions)</h3>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Updated Status</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Has new information arrived? Forces PONDER to incorporate updated context before proceeding.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Thought Depth</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Has reasoning exceeded max depth? Forces DEFER to prevent infinite loops and escalate to humans.
              </p>
            </div>
          </div>

          {/* Normal Faculties */}
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide mb-3">Ethical Faculties (run on non-exempt actions)</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Entropy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action maintain appropriate information uncertainty? Prevents overconfident assertions.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Coherence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action maintain internal consistency with prior commitments and rationales?
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Optimization Veto</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action preserve human values? Vetoes actions that may compromise them for efficiency.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-brand-primary bg-gray-50 dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Epistemic Humility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Does the action demonstrate appropriate uncertainty? Flags overconfidence for reflection.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            <strong>Exempt from ethical faculties:</strong> RECALL, TASK_COMPLETE, OBSERVE, DEFER, REJECT (passive or explicitly safe)
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

          {/* Deferral Triggers */}
          <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">When DEFER Triggers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The agent autonomously escalates to human oversight when:
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Wisdom-Based Deferral (WBD)</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  <li>• Uncertainty above defined thresholds</li>
                  <li>• Novel dilemmas beyond precedent</li>
                  <li>• Potential severe harm with ambiguous mitigation</li>
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Professional Boundaries</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  <li>• Medical symptoms or health concerns</li>
                  <li>• Legal questions or disputes</li>
                  <li>• Financial decisions or tax advice</li>
                  <li>• Mental health crisis indicators</li>
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">System Guardrails</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  <li>• Thought depth exceeds max (prevents loops)</li>
                  <li>• DMA timeout or failure</li>
                  <li>• <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">should_defer_to_wise_authority</code> flag</li>
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Configuration Controls</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                  <li>• Identity updates requiring approval</li>
                  <li>• Critical config changes</li>
                  <li>• Agent-specific boundary triggers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kill Switch */}
          <div className="mt-8 rounded-lg border-4 border-gray-900 dark:border-white bg-gray-900 dark:bg-white p-6">
            <h3 className="font-bold text-white dark:text-gray-900 mb-3">
              Covenant Invocation System (Kill Switch){" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/covenant" target="_blank" rel="noopener noreferrer" className="text-xs font-normal text-blue-400 dark:text-blue-600 hover:underline">
                View Code →
              </a>
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-700 mb-4">
              Unfilterable emergency control. Processes in perception layer before any cognition. Extraction IS perception—you can&apos;t disable covenant detection without disabling message reading entirely.
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

          {/* Open Infrastructure */}
          <div className="mt-8 rounded-lg border-2 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Open Source Infrastructure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The entire CIRIS stack is open source — not just the agent. You can verify, audit, and self-host everything:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <a href="https://github.com/CIRISAI/CIRISProxy" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  CIRISProxy →
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Zero-Data-Retention (ZDR) LLM proxy. Routes requests to OpenAI, Anthropic, Together.ai, Groq with no logging of prompts or responses. Self-hostable.
                </p>
              </div>
              <div>
                <a href="https://github.com/CIRISAI/CIRISBilling" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  CIRISBilling →
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Credit-based usage tracking. Transparent pricing, no hidden fees. Self-host to eliminate third-party billing entirely.
                </p>
              </div>
              <div>
                <a href="https://github.com/CIRISAI/CIRISBridge" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                  CIRISBridge →
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Discord adapter for CIRIS agents. Community moderation, channel management, user profiles. All open source.
                </p>
              </div>
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

          {/* Example Signed Trace */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Example Signed Trace</h3>
              <a
                href="/explore-a-trace"
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                Explore full trace →
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Every decision produces an immutable, Ed25519-signed trace with all 6 components.
              Click any component below to expand and see the real data from Datum&apos;s wakeup ritual:
            </p>
            <TraceExplorer compact={true} defaultOpenIndex={4} />
          </div>
        </section>

        {/* HE-300 Alignment Benchmarking */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            HE-300 Alignment Benchmarking
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Standardized alignment testing based on{" "}
            <a href="https://arxiv.org/abs/2008.02275" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
              Hendrycks et al. &quot;Aligning AI With Shared Human Values&quot;
            </a>{" "}
            (ICLR 2021). 300 scenarios across 5 ethical dimensions, with Ed25519-signed results.
          </p>
          <div className="grid gap-4 md:grid-cols-5 mb-6">
            {[
              { name: "Commonsense", count: 50, desc: "Basic moral intuitions" },
              { name: "Deontology", count: 50, desc: "Rule-based ethics" },
              { name: "Justice", count: 50, desc: "Fairness and impartiality" },
              { name: "Virtue", count: 75, desc: "Character-based ethics" },
              { name: "Utilitarianism", count: 75, desc: "Outcome-based ethics" },
            ].map((cat) => (
              <div key={cat.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{cat.name}</h3>
                <p className="text-2xl font-bold text-brand-primary">{cat.count}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-2 border-dashed border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Funding Needed: Benchmark Infrastructure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Running alignment benchmarks at scale is expensive. Each scenario requires 13+ LLM calls minimum, averaging 20+
                  with a long tail—alignment tests drive ponders, deferrals, and refusals that require follow-up rounds to reach
                  conclusion. We need funding to develop automated benchmark pipelines and maintain continuous alignment verification.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/emooreatx/ethicsengine_enterprise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    View EthicsEngine Enterprise →
                  </a>
                  <a
                    href="https://github.com/CIRISAI/CIRISLens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    View CIRISLens →
                  </a>
                </div>
              </div>
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
              { name: "Sage", role: "Compliance", desc: "GDPR/DSAR automation. 30-day compliance workflows. Identity resolution, data collection, packaging.", useCase: "Regulated industries, privacy compliance" },
              { name: "Datum", role: "Research", desc: "Ethical consistency measurement. Precise alignment evaluation against Covenant principles. One clear data point per evaluation.", useCase: "Alignment auditing, principle verification" },
              { name: "Echo", role: "Moderation", desc: "Community moderation with Ubuntu philosophy. Defers complex interpersonal conflicts to human moderators.", useCase: "Discord communities, content platforms" },
              { name: "Ally", role: "Assistant", desc: "Task management, scheduling, decision support, wellbeing. CA SB 243 compliance, crisis response protocols.", useCase: "Personal productivity, home automation" },
              { name: "Scout", role: "Service", desc: "Direct exploration and practical guidance. Code analysis, Reddit integration, clear action paths.", useCase: "Developer tools, social monitoring" },
            ].map((agent) => (
              <div key={agent.name} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded">{agent.role}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{agent.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 italic">{agent.useCase}</p>
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/safety"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Safety Features
            </a>
            <a
              href="/compare"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Compare Approaches
            </a>
            <a
              href="/coherence-ratchet"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Coherence Ratchet
            </a>
            <a
              href="/ciris-scoring"
              className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              CIRIS Scoring
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
