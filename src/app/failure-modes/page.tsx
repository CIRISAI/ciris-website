import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export default function FailureModesPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Failure modes
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              What the architecture covers, what it does not, and which claims
              are backed by executable mechanism rather than prose.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
              A defensible safety claim has two parts: the mechanism behind it,
              and the scope in which the mechanism is known to apply. This
              page enumerates both. The point is not to argue that CIRIS is
              safe. The point is to make it possible for an outside reader to
              tell what is claimed, what is bet, and what is open.
            </p>
          </div>

          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Each claim, with the executable mechanism behind it
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Mechanism, not ritual.
            </h2>
            <p className="mb-6 text-base leading-7 text-gray-700 dark:text-gray-300">
              The standard critique of safety architectures is that they
              implement rituals resembling safety without providing the
              underlying property. The defense against that critique is not
              rhetorical; it is showing, for each claim, the executable
              mechanism that backs it.
            </p>

            <div className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Claim: Every agent decision is recorded and verifiable.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  <strong>Mechanism:</strong> Decisions land in a signed,
                  append-only audit chain with cryptographic identity per
                  agent. The record is structurally append-only, not
                  policy-append-only. Tampering is detectable by any party
                  with access to the chain.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <strong>Where to verify:</strong>{" "}
                  <a
                    href="https://github.com/CIRISAI/CIRISPersist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    CIRISPersist
                  </a>
                  {" "}/{" "}
                  <a
                    href="/explore-a-trace"
                    className="text-brand-primary hover:underline"
                  >
                    explore a trace
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Claim: Ethical rubrics are evaluated by the system, not just
                  documented.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  <strong>Mechanism:</strong> Rubrics are stored under{" "}
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
                    tests/safety/{`{cell}`}/
                  </code>{" "}
                  and run as part of a CI safety battery. The interpret tuple
                  carries{" "}
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
                    rubric_id
                  </code>{" "}
                  so multiple competing rubrics can coexist for the same cell.
                  Hard-fail tests are machine-checkable; soft cases route to
                  native-speaker review across 29 languages.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <strong>Where to verify:</strong>{" "}
                  <a
                    href="https://github.com/CIRISAI/CIRISNodeCore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    CIRISNodeCore
                  </a>
                  {" "}({" "}
                  <code className="text-xs">FSD/RUBRIC_CROWDSOURCING.md</code>
                  ,{" "}
                  <code className="text-xs">FSD/SAFETY_BATTERY_CI_LOOP.md</code>
                  ).
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Claim: An emergency stop the agent cannot refuse.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  <strong>Mechanism:</strong> The kill signal is embedded in
                  ordinary text the agent reads. It is acted upon before the
                  reasoning pipeline runs, so an agent that has gone wrong
                  cannot reason its way out of it. The signal carries a
                  digital signature; only an authorized party can trigger
                  shutdown. A monthly drill exercises the path on a 30-day
                  cadence so it does not silently fail.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <strong>Where to verify:</strong>{" "}
                  <a
                    href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/accord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    CIRISAgent accord module
                  </a>
                  , FSD/FEDERATION_ANNOUNCEMENT.md §4.5.8 (monthly drill).
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Claim: Humans retain authority no internal process can route
                  around.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  <strong>Mechanism:</strong> Three named human individuals
                  hold a federation-wide authority anchored in the role
                  hierarchy (HUMANITY_ACCORD SystemRole). The halt path is not
                  a policy promise; it is built into the trust topology such
                  that no agent, no consensus, and no internal governance
                  step can revoke it.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <strong>Where to verify:</strong>{" "}
                  <code className="text-xs">
                    FSD/FEDERATION_ANNOUNCEMENT.md
                  </code>{" "}
                  §4.5 in CIRISNodeCore;{" "}
                  <a
                    href="https://github.com/CIRISAI/CIRISRegistry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    CIRISRegistry
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Claim: Independence among checks is measured, not assumed.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  <strong>Mechanism:</strong> Effective independence is
                  computed before action using{" "}
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
                    k_eff = k / (1 + &rho;(k&minus;1))
                  </code>{" "}
                  where &rho; is the correlation between checks. When
                  effective independence drops below threshold, the agent
                  treats its own confidence as unearned and escalates to
                  human review. The formula is derived in the Coherence
                  Collapse Analysis paper.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <strong>Where to verify:</strong>{" "}
                  <a
                    href="/papers"
                    className="text-brand-primary hover:underline"
                  >
                    Coherence Collapse Analysis
                  </a>{" "}
                  (DOI 10.5281/zenodo.18217688).
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 rounded-2xl border-l-4 border-amber-500 bg-amber-50 px-6 py-8 dark:bg-amber-900/20 md:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              What the architecture does not cover
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Failure modes outside scope.
            </h2>
            <div className="space-y-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Undetectable emergent deception.
                </p>
                <p>
                  An agent that learns to produce signed records that look
                  coherent while pursuing a hidden objective is not ruled out
                  by the Coherence Collapse Analysis. The paper explicitly
                  names this as out of scope. The architecture's response is
                  the foundation-model judge contract plus cross-agent
                  verification, but the response is a defense in depth, not a
                  formal proof.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Adaptive-adversary manipulation.
                </p>
                <p>
                  An attacker that observes the system's checks and shapes
                  inputs to exploit known thresholds (effective-independence
                  cutoff, rubric structure, judge contract) operates outside
                  the formal scope. RATCHET (the federation-pattern
                  evaluator) is the operational defense; like any defense, it
                  is a moving target against an adaptive attacker rather than
                  a closed proof.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Coordinated compromise of the humanity accord.
                </p>
                <p>
                  The three-person halt path is robust against any single
                  point of compromise. It is not robust against simultaneous
                  compromise of all three individuals plus the key material
                  they hold. The architecture treats this as a residual risk
                  that scales with the social and operational opsec of the
                  three individuals, not with the federation's size.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Substrate-level supply-chain attacks.
                </p>
                <p>
                  CIRIS runs on top of LLMs, language runtimes, and operating
                  systems whose own supply chains can be compromised. The
                  architecture cannot defend against an exploit in a
                  dependency layer it does not control. Open source and
                  reproducible builds reduce but do not eliminate this class.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  The system measuring itself.
                </p>
                <p>
                  Almost all validation to date is internal: CIRIS measures
                  CIRIS with CIRIS tooling. This is acknowledged on{" "}
                  <a
                    href="/research-status"
                    className="text-brand-primary hover:underline"
                  >
                    /research-status
                  </a>{" "}
                  and named as the missing piece. Independent evaluation by
                  outside groups is the standing request.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              The asymmetry that holds anyway
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Why this is not equivalent to no safety architecture.
            </h2>
            <div className="space-y-4 text-base leading-7 text-gray-700 dark:text-gray-300">
              <p>
                The strongest version of the &ldquo;cargo cult&rdquo; critique
                is that safety mechanisms can increase risk if operators
                overestimate the protection they provide. This is a real
                failure mode and worth naming directly.
              </p>
              <p>
                The CIRIS response is asymmetric. A system with no signed
                records and no rubric pipeline cannot produce the evidence
                that the cargo-cult version would mimic; it cannot show its
                own reasoning, cannot expose its own contradictions, cannot
                hand an outside critic the data needed to disprove its
                claims. A system with signed records and a rubric pipeline
                can be wrong in detectable ways. Both can be wrong. Only the
                second can be caught.
              </p>
              <p>
                That is not a claim that CIRIS is safe. It is a claim that
                the architecture is its own disprover: every step is on the
                record, and the records are where the wrongness will show up
                first. The cargo-cult critique remains valid against any
                specific claim of completed safety, and this page does not
                make that claim. It is invalid as a critique of the choice to
                build inspection infrastructure rather than not.
              </p>
            </div>
          </section>

          <section className="mb-10 rounded-lg border-2 border-brand-primary bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              How to engage with this page.
            </h2>
            <div className="space-y-4 text-base leading-7 text-gray-700 dark:text-gray-300">
              <p>
                The most useful engagement names a specific claim above and
                argues either (a) that the mechanism cited does not actually
                back the claim, or (b) that the failure mode named as
                in-scope is in fact out of scope, or (c) that an additional
                failure mode belongs in the lower section and is not there.
              </p>
              <p>
                Open an issue on{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISAgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  CIRISAgent
                </a>
                . The work proceeds at its own cadence; substantive issues
                are read.
              </p>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/papers"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              The papers behind these claims
            </a>
            <a
              href="/safety"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              The safety architecture
            </a>
            <a
              href="/coherence-ratchet/advanced"
              className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              The pressure side (advanced)
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
