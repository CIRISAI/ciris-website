import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CewpView from "../CewpView";
import WhyCewp from "../components/WhyCewp";

export const metadata = {
  title: "CEWP details — how it actually works | CIRIS",
  description:
    "The deep tech: globe simulator, adjustable sliders, honest device-class energy math, per-cohort abuse weighting, comparisons against IPFS / Bluesky / Solid / others, the seven CIRIS repos.",
};

export default function CewpDetailsPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-40 md:px-6 md:pt-44">
          {/* Back to the lean landing */}
          <p className="mb-4">
            <Link
              href="/cewp"
              className="text-sm text-brand-primary underline-offset-2 hover:underline"
            >
              ← Back to CEWP
            </Link>
          </p>

          <header className="mb-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              CEWP details
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              How it actually works
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
              Drag the sliders. Watch the assumptions move. Everything
              below is honest math you can disagree with input by input.
              Two costs the model does not yet carry — persistence and
              always-on reliability — are named explicitly so you know
              what is and isn&rsquo;t in the numbers.
            </p>
          </header>

          <CewpView />

          {/* Why CEWP vs the prior art. Lifted from CIRISConformance's
              SOTA comparison set. */}
          <div className="mt-12">
            <WhyCewp />
          </div>

          {/* The seven (now eight) repos. CIRISConformance lives next to the
              substrate sisters per the recent split-out. */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <header className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                The open repos
              </p>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Everything CEWP runs on is open source
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                AGPL-3.0. Read the code. Fork the substrate. Run your own
                federation.
              </p>
            </header>
            <div className="grid gap-2 md:grid-cols-2">
              <RepoLink
                slug="CIRISAgent"
                label="Agent runtime + unified client"
                note="The shipping mobile + desktop app"
              />
              <RepoLink
                slug="CEWP"
                label="Platform identity"
                note="What you're reading about"
              />
              <RepoLink
                slug="CIRISVerify"
                label="Substrate · crypto"
                note="Hybrid sign + verify; X25519 + ML-KEM-768 KEX"
              />
              <RepoLink
                slug="CIRISPersist"
                label="Substrate · storage"
                note="Signed storage; H3ERE trace replication"
              />
              <RepoLink
                slug="CIRISEdge"
                label="Substrate · transport"
                note="Reticulum + HTTPS mesh; Phase 1 multi-medium next"
              />
              <RepoLink
                slug="CIRISConformance"
                label="Substrate · conformance"
                note="Cross-substrate test battery; the gate every implementation passes"
              />
              <RepoLink
                slug="CIRISNodeCore"
                label="Fabric · consensus + scaling"
                note="The toy this page renders runs here"
              />
              <RepoLink
                slug="CIRISLensCore"
                label="Fabric · detection"
                note="Multi-medium aggregate detectors"
              />
              <RepoLink
                slug="CIRISRegistry"
                label="Fabric · spec"
                note="The CEG wire-format spec lives here"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function RepoLink({
  slug,
  label,
  note,
}: {
  slug: string;
  label: string;
  note: string;
}) {
  return (
    <a
      href={`https://github.com/CIRISAI/${slug}`}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-md border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-primary hover:bg-white dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-mono text-[13px] font-semibold text-slate-900 dark:text-slate-100">
          {slug}
        </p>
        <span aria-hidden className="text-slate-400 transition group-hover:text-brand-primary">
          ↗
        </span>
      </div>
      <p className="mt-0.5 text-[12px] font-medium text-brand-primary">
        {label}
      </p>
      <p className="mt-0.5 text-[12px] text-slate-600 dark:text-slate-400">
        {note}
      </p>
    </a>
  );
}
