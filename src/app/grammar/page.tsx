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
  CEG_CHAPTER,
  WITNESS_KIND_REGISTRY_PATH,
  LANG_PRIMER_PATH,
  CEG_PRIMER_PATH,
  ANCHORS,
} from "./lib/source";
import PrimitivesPanel from "./components/PrimitivesPanel";
import FamiliesPanel from "./components/FamiliesPanel";
import EnvelopeAndAxesPanel from "./components/EnvelopeAndAxesPanel";
import CompositionPoliciesPanel from "./components/CompositionPoliciesPanel";
import NamespacePanel from "./components/NamespacePanel";
import StoriesLibrary from "./components/StoriesLibrary";
import NonGoalsPanel from "./components/NonGoalsPanel";
import CompositionGraph from "./components/CompositionGraph";
import TranslationPlayground from "./components/TranslationPlayground";
import FractalSelfCallout from "./components/FractalSelfCallout";
import AlephView from "./components/AlephView";

export default async function GrammarPage() {
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
          {/* Hero */}
          <header id={ANCHORS.hero} className="mb-10 space-y-5">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {source.specVersion} · released {source.fsdLastUpdated}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {source.totalPrefixes} prefix families
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              See who said it. See who agrees. Decide for yourself.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              The world is moving faster than most of us can fact-check it.
              Sources contradict. Agents speak unsigned. Corrections rarely
              catch the original. CEG is a small shared format that puts a
              signature on every claim, with a trail you can follow — so
              you can read who&rsquo;s saying what, who&rsquo;s pushed
              back, and what changed, and make your own call without
              giving up or giving in to any one source.
            </p>

            {/* What this is, why we made it, what's comparable */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                    What this is
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Every claim travels in a small signed envelope: who
                    made it, what it&rsquo;s about, how confident they are,
                    what evidence they cite, when it was made. Other
                    people, organisations, and AI agents add envelopes
                    around it — agreeing, disagreeing, correcting,
                    superseding. The trail is readable end-to-end.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                    Why we made it
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Trust in &ldquo;what&rsquo;s true&rdquo; is breaking down
                    because the substrate underneath is missing. Without a
                    shared claim format, every voice invents its own, the
                    trails don&rsquo;t stitch together, and the only way to
                    cope is to pick a side. CEG is the small, austere
                    middle that lets many voices read each other and lets
                    a reader build their own verdict.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                    What&rsquo;s comparable
                  </p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <li>
                      <strong>PGP web of trust</strong> — same instinct,
                      much narrower scope
                    </li>
                    <li>
                      <strong>W3C Verifiable Credentials</strong> — heavier
                      ceremony, no composition story
                    </li>
                    <li>
                      <strong>Community Notes</strong> — readable trails,
                      single platform
                    </li>
                    <li>
                      <strong>Sigstore / SLSA</strong> — code-supply-chain
                      cousins; CEG generalises the shape
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Three things a reader can actually do here */}
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  See who said it
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Every claim carries a signature, a date, what
                  it&rsquo;s about, and what it&rsquo;s based on. No
                  anonymous assertions getting lost in the feed; no
                  attribution lost to a screenshot.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  See who else weighed in
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Other signers add their own envelopes around the claim
                  — agreeing, disagreeing, correcting, superseding. You
                  see the full chorus and the receipts behind each
                  voice, not just whoever shouted loudest.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  Decide for yourself
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Trust isn&rsquo;t something the system hands you. You
                  pick the voices you weigh, how heavily, and on what.
                  The format is the same for everyone; the verdict is
                  yours.
                </p>
              </div>
            </div>

            {/* On-page nav */}
            <nav className="flex flex-wrap gap-2 text-xs">
              <a
                href={`#${ANCHORS.primitives}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                1+4 primitives
              </a>
              <a
                href={`#${ANCHORS.families}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                5 families
              </a>
              <a
                href={`#${ANCHORS.envelope}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Envelope + axes
              </a>
              <a
                href={`#${ANCHORS.composition}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Composition policies
              </a>
              <a
                href={`#${ANCHORS.namespace}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                The {source.totalPrefixes} prefixes
              </a>
              <a
                href={`#${ANCHORS.graph}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Composition graph
              </a>
              <a
                href={`#${ANCHORS.playground}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Playground
              </a>
              <a
                href={`#${ANCHORS.stories}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Worked stories
              </a>
              <a
                href={`#${ANCHORS.nonGoals}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Non-goals
              </a>
              <a
                href={`#${ANCHORS.references}`}
                className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                References
              </a>
            </nav>
          </header>

          <div className="space-y-14">
            <PrimitivesPanel />
            <FamiliesPanel source={source} />
            <EnvelopeAndAxesPanel />
            <CompositionPoliciesPanel />
            <NamespacePanel source={source} />
            <AlephView source={source} />
            <CompositionGraph source={source} />
            <TranslationPlayground />
            <StoriesLibrary />
            <NonGoalsPanel />
            <FractalSelfCallout />

            {/* References */}
            <section id={ANCHORS.references} className="space-y-4">
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
                  CEG 0.1 — the wire-format spec (18-file directory) →
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
