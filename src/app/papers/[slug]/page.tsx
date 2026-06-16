// Per-paper landing pages with Highwire `citation_*` meta tags so Google
// Scholar (and Semantic Scholar) can index the CIRIS-hosted copies. Each page
// is one paper (Scholar parses one paper per page), links the PDF directly on
// ciris.ai where we host it (citation_pdf_url, same-domain = best for Scholar),
// and falls back to the Zenodo record otherwise. PDFs live in public/papers/.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

const SITE = "https://ciris.ai";
const AUTHOR = "Eric Moore";

type Paper = {
  slug: string;
  citationTitle: string; // full academic title (what Scholar matches on)
  displayTitle: string;
  subtitle: string;
  date: string; // YYYY/MM/DD for citation_publication_date
  doi: string;
  zenodo: string;
  role: string;
  summary: string;
  keyFindings: string[];
  hasPdf: boolean; // PDF hosted at /papers/<slug>.pdf
};

const PAPERS: Paper[] = [
  {
    slug: "corridor-dynamics",
    citationTitle:
      "Corridor Dynamics in Coordinated Systems: An Integration of Operator Formalism, Relational Ontology, and Five-Substrate Empirical Validation",
    displayTitle: "Corridor Dynamics in Coordinated Systems",
    subtitle:
      "An Integration of Operator Formalism, Relational Ontology, and Five-Substrate Empirical Validation",
    date: "2026/05/22",
    doi: "10.5281/zenodo.20300773",
    zenodo: "https://zenodo.org/records/20300773",
    role: "Flagship synthesis paper",
    summary:
      "The integration statement. Coordinated systems sit in a bounded corridor between rigidity (ρ → 1, single-voice collapse) and chaos (ρ → 0, vacuous dispersal); the corridor is the regime where coordination is possible at all. Grounds in Ubuntu's relational ontology; formalizes in Lean 4 (1,942 modules, 0 declaration-level gaps, 63 documented axioms); reads two-state vector formalism as the structural form of agency.",
    keyFindings: [
      "Paired in-corridor / out-of-corridor record across five substrates: C. elegans whole-brain calcium imaging, Drosophila central-complex imaging, four LLM architectures, four open-source projects (Kubernetes, Rust, Django, Redis), tumor-vs-normal tissue across five cancers, three centuries-persisting religious societies.",
      "The dynamical reading's strongest would-be falsifier (long unmaintained non-corridor persistence) is absent at all five substrates.",
    ],
    hasPdf: false,
  },
  {
    slug: "coherence-collapse",
    citationTitle:
      "Coherence Collapse Analysis: A Universal Failure Mode in Complex Coordinating Systems",
    displayTitle: "Coherence Collapse Analysis",
    subtitle: "The engineering risk framework under the corridor idea",
    date: "2026/01/11",
    doi: "10.5281/zenodo.18217688",
    zenodo: "https://zenodo.org/records/18217688",
    role: "Formal foundation",
    summary:
      "When the constraints governing a system become correlated, effective diversity collapses. Derives three collapse timelines, a singularity boundary, and a phase classification (chaos / healthy / rigidity). Verified with Monte Carlo simulation and Lean 4 proofs.",
    keyFindings: [
      "Effective constraint count: k_eff = k / (1 + ρ(k − 1)) → 1 as ρ → 1.",
      "The k_eff identity formalizes coherence collapse under correlated constraint and is the mathematical content the Coherence Ratchet operationalizes.",
    ],
    hasPdf: true,
  },
  {
    slug: "constrained-reasoning-chains",
    citationTitle:
      "Constrained Reasoning Chains: An Empirical Telemetry Study of LLM Alignment",
    displayTitle: "Constrained Reasoning Chains",
    subtitle:
      "An empirical telemetry study of LLM alignment under standardized ethical tracing",
    date: "2026/04/28",
    doi: "10.5281/zenodo.19839280",
    zenodo: "https://zenodo.org/records/19839280",
    role: "Empirical validation",
    summary:
      "Turns consented reasoning traces into maps of completion corridors, hesitation zones, and refusal boundaries. Released alongside the open reasoning-traces dataset.",
    keyFindings: [
      "6,465 traces analyzed for effective-dimensionality structure.",
      "An effective-dimensionality threshold around N_eff ≈ 7.1 correlates with successful conflict resolution; higher-dimensional reasoning runs show different qualitative behavior than lower-dimensional ones.",
    ],
    hasPdf: true,
  },
  {
    slug: "cirisagent-framework",
    citationTitle:
      "CIRISAgent: open source ethical AI framework for accountable autonomy",
    displayTitle: "CIRISAgent Framework",
    subtitle: "An open-source ethical AI framework for accountable autonomy",
    date: "2026/01/02",
    doi: "10.5281/zenodo.18137161",
    zenodo: "https://zenodo.org/records/18137161",
    role: "Framework paper",
    summary:
      "The framework paper. A 22-service architecture organized around explicit action verbs and ethical reasoning, with transparency built into the structure rather than bolted on afterward.",
    keyFindings: [
      "Service catalog: identity, events, federation, verification, safety, lens, persistence, conscience, judge, accord, scoring, and the rest.",
      "Each service is independently inspectable; the architecture's defense is the structure, not a model-level guardrail.",
    ],
    hasPdf: true,
  },
];

const bySlug = (slug: string) => PAPERS.find((p) => p.slug === slug);

export function generateStaticParams() {
  return PAPERS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  const pageUrl = `${SITE}/papers/${p.slug}`;
  const pdfUrl = `${SITE}/papers/${p.slug}.pdf`;

  // Highwire Press citation_* tags — the metadata Google Scholar parses.
  const citation: Record<string, string | string[]> = {
    citation_title: p.citationTitle,
    citation_author: AUTHOR,
    citation_publication_date: p.date,
    citation_online_date: p.date,
    citation_doi: p.doi,
    citation_abstract_html_url: pageUrl,
    citation_publisher: "Zenodo",
    citation_technical_report_institution: "CIRIS L3C",
  };
  if (p.hasPdf) citation.citation_pdf_url = pdfUrl;

  return {
    title: `${p.displayTitle} | CIRIS papers`,
    description: p.summary.slice(0, 180),
    alternates: { canonical: `/papers/${p.slug}` },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: p.citationTitle,
      description: p.summary.slice(0, 200),
      images: ["/og/og-papers.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: p.displayTitle,
      description: p.summary.slice(0, 200),
      images: ["/og/og-papers.jpg"],
    },
    other: citation,
  };
}

function paperJsonLd(p: Paper) {
  const pageUrl = `${SITE}/papers/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.citationTitle,
    name: p.citationTitle,
    author: { "@type": "Person", name: AUTHOR },
    datePublished: p.date.replace(/\//g, "-"),
    publisher: { "@type": "Organization", name: "CIRIS L3C", url: SITE },
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
    sameAs: p.zenodo,
    url: pageUrl,
    abstract: p.summary,
    ...(p.hasPdf ? { encoding: { "@type": "MediaObject", encodingFormat: "application/pdf", contentUrl: `${pageUrl}.pdf` } } : {}),
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paperJsonLd(p)) }}
      />
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-44">
          <p className="mb-4">
            <Link
              href="/papers"
              className="text-sm text-brand-primary underline-offset-2 hover:underline"
            >
              ← All papers
            </Link>
          </p>

          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              {p.role}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {p.displayTitle}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {p.subtitle}
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {AUTHOR} · {p.date.replace(/\//g, "-")} ·{" "}
              <a
                href={`https://doi.org/${p.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                DOI: {p.doi}
              </a>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {p.hasPdf ? (
                <a
                  href={`/papers/${p.slug}.pdf`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
                >
                  <span aria-hidden>📄</span> Read the PDF
                </a>
              ) : null}
              <a
                href={p.zenodo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                On Zenodo ↗
              </a>
            </div>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Abstract
            </h2>
            <p className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
              {p.summary}
            </p>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Key findings
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7 text-gray-700 dark:text-gray-300">
              {p.keyFindings.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
