import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import {
  getRegistrySource,
  specCommitUrl,
  REGISTRY_BLOB,
  REGISTRY_REPO,
  CEG_README_PATH,
  WITNESS_KIND_REGISTRY_PATH,
  LANG_PRIMER_PATH,
  CEG_PRIMER_PATH,
  ANCHORS,
} from "../lib/source";
import GrammarNav from "../components/GrammarNav";
import PrimitivesPanel from "../components/PrimitivesPanel";
import FamiliesPanel from "../components/FamiliesPanel";
import EnvelopeAndAxesPanel from "../components/EnvelopeAndAxesPanel";
import CompositionPoliciesPanel from "../components/CompositionPoliciesPanel";
import NamespacePanel from "../components/NamespacePanel";
import StoriesLibrary from "../components/StoriesLibrary";
import NonGoalsPanel from "../components/NonGoalsPanel";
import CompositionGraph from "../components/CompositionGraph";
import TranslationPlayground from "../components/TranslationPlayground";
import FractalSelfCallout from "../components/FractalSelfCallout";
import AlephView from "../components/AlephView";
import MediaTierPanel from "../components/MediaTierPanel";
import ConsentTierPanel from "../components/ConsentTierPanel";
import LineagePanel from "../components/LineagePanel";

export const metadata = {
  title: "CEG spec reader — primitives, namespace, composition | CIRIS",
  description:
    "The full CIRIS Epistemic Grammar, rendered from the live spec: the 1+4 primitives, five families, envelope fields, reasoning axes, composition policies, the open namespace, the version lineage, and an interactive attestation explorer.",
  alternates: { canonical: "/grammar/details" },
};

export default async function GrammarDetailsPage() {
  const source = await getRegistrySource();
  const fsdLink = `${REGISTRY_BLOB}/${CEG_README_PATH}`;
  const witnessRegistryLink = `${REGISTRY_BLOB}/${WITNESS_KIND_REGISTRY_PATH}`;
  const commitLink = source.commitShaFull
    ? specCommitUrl(source.commitShaFull)
    : fsdLink;

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 md:px-6">
          {/* Back to the lean landing */}
          <p className="mb-4">
            <Link
              href="/grammar"
              className="text-sm text-brand-primary underline-offset-2 hover:underline"
            >
              ← Back to CEG
            </Link>
          </p>

          {/* Header */}
          <header id={ANCHORS.hero} className="mb-8 space-y-3">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {source.specVersion} · released {source.fsdLastUpdated}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {source.totalPrefixes} prefix families
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              CEG spec reader
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              The wire format, rendered from the live spec
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
              Everything below is a build-time render of the CEG spec: the
              1+4 primitives, the families and envelope fields, the
              composition policies, the open namespace, the version
              lineage, and an interactive explorer. The watermark at the
              bottom names the commit this page was built from.
            </p>
          </header>

          <GrammarNav />

          <div className="space-y-14">
            <section id="primitives" className="scroll-mt-40">
              <PrimitivesPanel />
            </section>
            <section id="families" className="scroll-mt-40">
              <FamiliesPanel source={source} />
            </section>
            <section id="envelope" className="scroll-mt-40">
              <EnvelopeAndAxesPanel />
            </section>
            <section id="composition" className="scroll-mt-40">
              <CompositionPoliciesPanel />
            </section>
            <section id="namespace" className="scroll-mt-40">
              <NamespacePanel source={source} />
            </section>
            <section id="media" className="scroll-mt-40">
              <MediaTierPanel />
            </section>
            <section id="consent" className="scroll-mt-40">
              <ConsentTierPanel />
            </section>
            <section id="whats-new" className="scroll-mt-40">
              <LineagePanel />
            </section>
            <section id="explore" className="scroll-mt-40">
              <AlephView source={source} />
            </section>
            <ExploreCTA />
            <section id="graph" className="scroll-mt-40">
              <CompositionGraph source={source} />
            </section>
            <section id="translate" className="scroll-mt-40">
              <TranslationPlayground />
            </section>
            <section id="stories" className="scroll-mt-40">
              <StoriesLibrary />
            </section>
            <NonGoalsPanel />
            <FractalSelfCallout />

            {/* References */}
            <section id={ANCHORS.references} className="scroll-mt-40 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                References
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                This page is a build-time render of the spec. Authoritative
                sources move; the watermark below tells you which commit was
                in effect when the page was built. The page auto-updates on
                redeploy.
              </p>
              <div className="grid gap-2 text-sm md:grid-cols-2">
                <a
                  href={fsdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  {source.specVersion}, the wire-format spec (18-file directory) →
                </a>
                <a
                  href={witnessRegistryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  WITNESS_KIND_REGISTRY (open vocabulary for testimonial_witness) →
                </a>
                <a
                  href={`${REGISTRY_BLOB}/${LANG_PRIMER_PATH}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  LANGUAGE_PRIMER (translation grammar) →
                </a>
                <a
                  href={`${REGISTRY_BLOB}/${CEG_PRIMER_PATH}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  Exploration page builder primer →
                </a>
                <a
                  href={`${REGISTRY_BLOB}/FSD/PRIOR_ART_SCAN.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  PRIOR_ART_SCAN (what CEG inherits + what&rsquo;s novel) →
                </a>
                <a
                  href={`${REGISTRY_BLOB}/FSD/SOTA_SCAN.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  SOTA_SCAN (comparative landscape) →
                </a>
                <a
                  href={`${REGISTRY_REPO}/blob/main/MISSION.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  CIRISRegistry MISSION →
                </a>
                <Link
                  href="/safety-vs-censorship"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  Safety vs censorship (operational-language gate) →
                </Link>
                <Link
                  href="/compliance"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
                >
                  /compliance (CIRIS dimensions ↔ 4 governance frameworks) →
                </Link>
              </div>

              {/* Spec watermark */}
              <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-gray-700 dark:bg-gray-900/40 dark:text-slate-400">
                <p>
                  Reflecting{" "}
                  <a
                    href={commitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    {source.specVersion} at commit{" "}
                    <code className="font-mono">{source.commitShaShort}</code>
                  </a>
                  . Spec released {source.fsdLastUpdated}. The wire format
                  moves through CEG §11 amendments; this page rebuilds
                  on every deploy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ExploreCTA() {
  return (
    <section className="rounded-2xl border-l-4 border-brand-primary bg-gradient-to-br from-brand-primary/5 to-transparent p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Try it yourself
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Build a small attestation chain in the browser.
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Pin a few attesters, post claims, run a composition policy, and
            watch the corridor metric move. Same Rust kernel as the Aleph
            view, no server round-trip.
          </p>
        </div>
        <Link
          href="/grammar/explore"
          className="rounded-md border-2 border-brand-primary bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90"
        >
          Open the workshop &rarr;
        </Link>
      </div>
    </section>
  );
}
