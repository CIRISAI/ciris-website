"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function WhyCirisPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              What Is Ethical Agentic AI?
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              Everyone says they're building "ethical AI." Almost nobody can point to where, exactly, the ethics live in the stack.
            </p>
          </div>

          {/* The Challenge */}
          <div className="mt-12 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-900/20 dark:to-purple-900/20">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              For CIRIS, "ethical agentic AI" isn't branding. It's a strict technical definition.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              An AI system only qualifies if it meets ALL six requirements below. Not five. Six.
            </p>
          </div>

          {/* The 6 Requirements */}
          <div className="mt-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              The Six Requirements
            </h2>

            <div className="space-y-6">
              {/* Requirement 1 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  1. Published Covenant
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  The agent must be explicitly bound to a publicly available ethical charter with a meta-goal and foundational principles. Not "guidelines." Not "values we care about." A formal covenant the agent is obligated to follow, available for anyone to read and critique.
                </p>
              </div>

              {/* Requirement 2 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  2. Runtime Conscience
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Every meaningful action the agent takes must pass through an internal conscience pipeline before execution. Speaking, invoking tools, changing memory. This is not a post-hoc filter or safety wrapper bolted on top. It's part of the agent's operational loop. Every. Single. Action.
                </p>
              </div>

              {/* Requirement 3 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  3. Human Deferral (Wise Authority)
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  When the agent encounters uncertainty, conflicting values, or potential harm, it must defer to human oversight with full context. Built-in workflow, not a design-time suggestion. The agent knows when it's out of its depth and asks for help instead of guessing.
                </p>
              </div>

              {/* Requirement 4 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  4. Cryptographic Audit Trail
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Every action, every rationale, every decision must be recorded in an immutable, signed ledger. Not "we log some things." Everything. Verifiable at any time by anyone with access. You should be able to trace exactly why the agent did what it did.
                </p>
              </div>

              {/* Requirement 5 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  5. Bilateral Consent
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Consent is symmetric. Humans can refuse data access. But the agent can also refuse partnerships or data collection if it would violate its ethical constraints. The agent isn't just a tool that does whatever you want. It has principles it won't compromise.
                </p>
              </div>

              {/* Requirement 6 */}
              <div className="rounded-lg border-l-4 border-brand-primary bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  6. Fully Open Source
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Ethical AI cannot be closed source. It cannot be patented. You cannot audit compliance when the implementation is hidden. "Trust us, it's ethical" is not ethical. Show the code or it doesn't count.
                </p>
                <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  If your "ethical AI" company won't show you the code, they're not building ethical AI. They're building a product and calling it ethical.
                </p>
              </div>
            </div>
          </div>

          {/* The Line */}
          <div className="mt-12 rounded-lg border-4 border-yellow-500 bg-yellow-50 p-8 dark:bg-yellow-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              This Is a Hard Line
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              These aren't suggestions. This is the bar. If you want to claim "ethical agentic AI," you need to put all six on the table, in code, not just in a paper or a pitch deck.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Governance frameworks are useful. Security scanners are useful. Policy constraint languages are useful. But they are not ethical agents. They're layers around agents, not agents themselves.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              How CIRIS Compares
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              There's good work happening in the space. But none of it delivers all six requirements in a single, running system.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="p-3 text-left font-bold text-gray-900 dark:text-white">Requirement</th>
                    <th className="p-3 text-center font-bold text-brand-primary">CIRIS</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Governance Frameworks</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Policy Constraints</th>
                    <th className="p-3 text-center font-bold text-gray-600 dark:text-gray-400">Scanners/Auditors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Published Covenant</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Runtime Conscience</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Human Deferral</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Concept</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Cryptographic Audit</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Partial</td>
                    <td className="p-3 text-center text-yellow-500">If built</td>
                    <td className="p-3 text-center text-yellow-500">Reports</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Bilateral Consent</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                    <td className="p-3 text-center text-red-500">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Open Source</td>
                    <td className="p-3 text-center text-green-600 font-bold">Yes</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                    <td className="p-3 text-center text-yellow-500">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">What these other things actually are:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li><strong>Governance frameworks</strong> (AGENTSAFE, etc.) provide checklists and controls, but don't ship an agent that runs a conscience on every verb.</li>
                <li><strong>Policy artifacts</strong> (Policy Cards, etc.) define constraints, but don't enforce them inside the agent's action loop.</li>
                <li><strong>Scanners</strong> (MCPSafetyScanner, etc.) assess behavior after the fact, but don't embed ethical decisioning into the agent.</li>
              </ul>
              <p className="mt-3">
                These are useful components. They are not ethical agents.
              </p>
            </div>
          </div>

          {/* Research Background */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              The Research Says the Same Thing
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              This isn't opinion. Peer-reviewed research, regulatory bodies, and transparency indices all document the same gaps CIRIS was built to address.
            </p>

            {/* Gap 1: Runtime vs Design-Time */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                1. The Runtime Gap Is Real
              </h3>
              <blockquote className="mb-4 border-l-4 border-brand-primary bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Inviolable constraints can be embedded within the AI's decision-making architecture... Runtime verification and enforcement mechanisms ensure that the principles remain strictly adhered to during operation."
              </blockquote>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://link.springer.com/article/10.1007/s43681-025-00759-9" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Springer, AI and Ethics (2025)</a>
              </p>
              <blockquote className="mb-4 border-l-4 border-brand-primary bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "The question is no longer whether AI ethics matters; it is whether we can translate broad values into effective, enforceable practice before harms scale faster than governance."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://medium.com/@aaih/the-state-of-ai-ethics-at-end-of-2025-from-beautiful-principles-to-messy-implementation-d10a83acf5c6" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Alliance for AI & Humanity (2025)</a>
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Most ethical AI work stops at governance frameworks and design-time principles. CIRIS enforces at runtime.
              </p>
            </div>

            {/* Gap 2: Transparency Crisis */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                2. The Transparency Crisis Is Documented
              </h3>
              <blockquote className="mb-4 border-l-4 border-red-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "No foundation model developer gets a passing score on transparency. None of the 10 companies score more than 60%."
              </blockquote>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://crfm.stanford.edu/fmti/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Stanford Foundation Model Transparency Index</a>
              </p>
              <blockquote className="mb-4 border-l-4 border-red-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Regions of sustained and systemic opacity persist across most or all developers such as on copyright status, data access, data labor, and downstream impact."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://www.techpolicy.press/the-foundation-model-transparency-index-what-changed-in-6-months/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">TechPolicy.Press (2024)</a>
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Open developers consistently score higher. Closed source means structural opacity. You cannot verify what you cannot see.
              </p>
            </div>

            {/* Gap 3: Ethics Washing */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                3. "Ethics Washing" Is a Peer-Reviewed Term
              </h3>
              <blockquote className="mb-4 border-l-4 border-yellow-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Ethics washing refers to the practice of signaling a commitment to ethics without genuinely having such a commitment or sufficiently putting it into practice."
              </blockquote>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://www.carnegiecouncil.org/explore-engage/key-terms/ethics-washing" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Carnegie Council for Ethics in International Affairs</a>
              </p>
              <blockquote className="mb-4 border-l-4 border-yellow-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Companies are learning to speak and perform ethics rather than make the structural changes necessary to achieve the social values underpinning the ethical fault lines that exist."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://www.researchgate.net/publication/394290126_Press_Release_Ethics_in_AI_Performative_Ethics_in_for-Profit_AI_Companies" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">ResearchGate, "Press Release Ethics in AI" (2024)</a>
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                If your "ethical AI" is a press release and not a runtime constraint, researchers have a name for that: ethics washing.
              </p>
            </div>

            {/* Gap 4: Guardrails vs Conscience */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                4. Safety Guardrails Are Not Ethical Conscience
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                There are good open-source runtime safety tools. They solve a different problem.
              </p>
              <ul className="mb-4 list-inside list-disc space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="https://arxiv.org/abs/2505.03574" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">LlamaFirewall (Meta)</a> — "security focused guardrail framework... mitigates prompt injection, agent misalignment, insecure code"</li>
                <li><a href="https://developer.nvidia.com/blog/safeguard-agentic-ai-systems-with-the-nvidia-safety-recipe/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">NVIDIA NeMo Guardrails</a> — "address risks at inference time, such as adversarial prompting, prompt injection attacks"</li>
                <li><a href="https://invariantlabs.ai/blog/guardrails" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Invariant Guardrails</a> — "contextual rules... data flow requirements, if-this-then-that patterns"</li>
              </ul>
              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                <p className="font-semibold text-gray-900 dark:text-white">The distinction:</p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  These are <strong>safety guardrails</strong> — they prevent specific bad outputs. CIRIS has an <strong>ethical conscience</strong> — it reasons about values on every action. Safety prevents harm. Ethics reasons about right and wrong. Different problems. Both matter.
                </p>
              </div>
            </div>

            {/* Gap 5: EU AI Act */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                5. CIRIS Implements EU AI Act Article 14
              </h3>
              <blockquote className="mb-4 border-l-4 border-blue-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "High-risk AI systems must be designed... that they can be effectively overseen by natural persons during the period in which they are in use."
              </blockquote>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://artificialintelligenceact.eu/article/14/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">EU AI Act, Article 14</a>
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The EU AI Act mandates human oversight through four models:
              </p>
              <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>Human-in-Command (HIC)</strong> — absolute control and veto power</li>
                <li><strong>Human-in-the-Loop (HITL)</strong> — direct operational involvement</li>
                <li><strong>Human-on-the-Loop (HOTL)</strong> — supervisory oversight with intervention</li>
                <li><strong>Human-over-the-Loop</strong> — system-level monitoring</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                CIRIS's Wise Authority deferral mechanism directly implements these requirements. Most AI systems don't have a deferral mechanism at all.
              </p>
            </div>

            {/* Gap 6: Autonomy Risks */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                6. Unconstrained Autonomy Is a Documented Risk
              </h3>
              <blockquote className="mb-4 border-l-4 border-red-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Researchers find no clear benefit of fully autonomous AI agents that can operate outside of human-defined constraints, but many foreseeable harms from ceding full human control."
              </blockquote>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://arxiv.org/html/2502.02649v3" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">arXiv, "Fully Autonomous AI Agents Should Not Be Developed" (2025)</a>
              </p>
              <blockquote className="mb-4 border-l-4 border-red-500 bg-gray-50 p-4 italic text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                "Risks to people increase with the autonomy of a system: the more control a user cedes to an AI agent, the more risks arise."
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                — <a href="https://www.ibm.com/think/insights/ai-agent-ethics" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">IBM Research (2024)</a>
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Agents need constraints. CIRIS has them embedded in every action. Most agentic AI systems don't.
              </p>
            </div>

            {/* Common Objections */}
            <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Common Objections (And Why They're Wrong)
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">"Constitutional AI is ethical AI"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Constitutional AI is a training technique (an RLHF variant). It shapes model behavior during training. It does not enforce ethical constraints at runtime. Training ≠ architecture.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">"We have an ethics board"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    That's governance, not architecture. Ethics boards don't gate every action the agent takes. They review policies. CIRIS enforces on every verb.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">"Our model is safe"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Safety ≠ Ethics. Safety prevents harmful outputs. Ethics reasons about values and tradeoffs. You can have a "safe" model that makes unethical decisions. Different problems.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">"We follow ethical guidelines"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Guidelines are design-time documents. They don't execute. CIRIS enforces at runtime. As research notes: "the principle remains a fixed ethical safeguard... embedded in AI governance structures."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mt-12 rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Why This Matters
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              If an AI system can act autonomously without an enforceable ethical grounding, human deferral when uncertain, and verifiable records of what it did, then we have no reliable way to audit, challenge, correct, or constrain its behavior.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              That's not alignment. That's not accountability. That's risk without recourse.
            </p>
            <p className="mt-4 font-semibold text-gray-900 dark:text-white">
              CIRIS was built to close that gap.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border-4 border-green-500 bg-green-50 p-8 text-center dark:bg-green-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Prove Me Wrong
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              If there's another stack that does all six end-to-end, in code, running in production, I want to see it.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Until then:
            </p>
            <div className="mt-6 rounded-md bg-gray-900 p-4">
              <code className="text-green-400">pip install ciris-agent</code>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Try it. Read the code. Tell me it's wrong. That's how this works.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
              >
                View Source on GitHub
              </a>
              <a
                href="/sections/main"
                className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-800"
              >
                Read the Covenant
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
