import Link from "next/link";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

// DOI -> on-site paper page (with Highwire citation_* tags for Scholar).
const SLUG_BY_DOI: Record<string, string> = {
  "10.5281/zenodo.20300773": "corridor-dynamics",
  "10.5281/zenodo.18217688": "coherence-collapse",
  "10.5281/zenodo.19839280": "constrained-reasoning-chains",
  "10.5281/zenodo.18137161": "cirisagent-framework",
};

type Paper = {
  title: string;
  subtitle: string;
  meta: string;
  doi: string;
  href: string;
  role: string;
  summary: string;
  keyFindings: string[];
};

const papers: Paper[] = [
  {
    title: "Corridor Dynamics in Coordinated Systems",
    subtitle:
      "An Integration of Operator Formalism, Relational Ontology, and Five-Substrate Empirical Validation",
    meta: "v2 · May 22, 2026",
    doi: "10.5281/zenodo.20300773",
    href: "https://zenodo.org/records/20300773",
    role: "Flagship synthesis paper",
    summary:
      "The integration statement. Coordinated systems sit in a bounded corridor between rigidity (ρ → 1, single-voice collapse) and chaos (ρ → 0, vacuous dispersal); the corridor is the regime where coordination is possible at all. Grounds in Ubuntu's relational ontology; formalizes in Lean 4 (1,942 modules, 0 declaration-level gaps, 63 documented axioms); reads two-state vector formalism as the structural form of agency.",
    keyFindings: [
      "Paired in-corridor / out-of-corridor record across five substrates: C. elegans whole-brain calcium imaging, Drosophila central-complex imaging, four LLM architectures, four open-source projects (Kubernetes, Rust, Django, Redis), tumor-vs-normal tissue across five cancers, three centuries-persisting religious societies.",
      "The dynamical reading's strongest would-be falsifier (long unmaintained non-corridor persistence) is absent at all five substrates.",
    ],
  },
  {
    title: "Coherence Collapse Analysis",
    subtitle:
      "The engineering risk framework under the corridor idea",
    meta: "v3 · Jan 11, 2026",
    doi: "10.5281/zenodo.18217688",
    href: "https://zenodo.org/records/18217688",
    role: "Formal foundation",
    summary:
      "When the constraints governing a system become correlated, effective diversity collapses. Derives three collapse timelines, a singularity boundary, and a phase classification (chaos / healthy / rigidity). Verified with Monte Carlo simulation and Lean 4 proofs.",
    keyFindings: [
      "Effective constraint count: k_eff = k / (1 + ρ(k − 1)) → 1 as ρ → 1.",
      "The k_eff identity formalizes coherence collapse under correlated constraint and is the mathematical content the Coherence Ratchet operationalizes.",
    ],
  },
  {
    title: "Constrained Reasoning Chains",
    subtitle:
      "An empirical telemetry study of LLM alignment under standardized ethical tracing",
    meta: "v1 · Apr 28, 2026",
    doi: "10.5281/zenodo.19839280",
    href: "https://zenodo.org/records/19839280",
    role: "Empirical validation",
    summary:
      "Turns consented reasoning traces into maps of completion corridors, hesitation zones, and refusal boundaries. Released alongside the open reasoning-traces dataset.",
    keyFindings: [
      "6,465 traces analyzed for effective-dimensionality structure.",
      "An effective-dimensionality threshold around N_eff ≈ 7.1 correlates with successful conflict resolution; higher-dimensional reasoning runs show different qualitative behavior than lower-dimensional ones.",
    ],
  },
  {
    title: "CIRISAgent Framework",
    subtitle:
      "An open-source ethical AI framework for accountable autonomy",
    meta: "v2 · Jan 2, 2026",
    doi: "10.5281/zenodo.18137161",
    href: "https://zenodo.org/records/18137161",
    role: "Framework paper",
    summary:
      "The framework paper. A 22-service architecture organized around explicit action verbs and ethical reasoning, with transparency built into the structure rather than bolted on afterward.",
    keyFindings: [
      "Service catalog: identity, events, federation, verification, safety, lens, persistence, conscience, judge, accord, scoring, and the rest.",
      "Each service is independently inspectable; the architecture's defense is the structure, not a model-level guardrail.",
    ],
  },
];

export default function PapersPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-44">
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The papers
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              The empirical and formal backing under the CIRIS architecture.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
              Four papers document the framework, the formal model, the
              empirical measurements, and the cross-substrate validation. Each
              is on Zenodo with a permanent DOI.
            </p>
          </div>

          <div className="space-y-8">
            {papers.map((paper) => (
              <article
                key={paper.doi}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                    {paper.role}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {paper.meta} · DOI {paper.doi}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <Link
                    href={`/papers/${SLUG_BY_DOI[paper.doi]}`}
                    className="hover:text-brand-primary"
                  >
                    {paper.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {paper.subtitle}
                </p>
                <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                  {paper.summary}
                </p>
                <ul className="mt-4 ml-6 list-disc space-y-1 text-base leading-7 text-gray-700 dark:text-gray-300">
                  {paper.keyFindings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap gap-x-4 text-sm">
                  <Link
                    href={`/papers/${SLUG_BY_DOI[paper.doi]}`}
                    className="font-medium text-brand-primary hover:underline"
                  >
                    Read the paper →
                  </Link>
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-500 hover:text-brand-primary hover:underline dark:text-gray-400"
                  >
                    On Zenodo ↗
                  </a>
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/research-status"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              Research status
            </a>
            <a
              href="/coherence-ratchet/advanced"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              The Coherence Ratchet (advanced)
            </a>
            <a
              href="/federation/advanced"
              className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              The Federation (advanced)
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
