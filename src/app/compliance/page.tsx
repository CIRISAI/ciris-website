import { Suspense } from "react";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import { getSeed, RESPONSE_BLOB, AGENT_BLOB } from "./lib/seed";
import Workspace from "./components/Workspace";
import SeoBrowseAll from "./components/SeoBrowseAll";

export default async function CompliancePage() {
  const seed = await getSeed();

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-32 md:px-6">
          {/* Hero */}
          <header className="mb-6">
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Seed v{seed.metadata.seed_version} · {seed.metadata.seed_date}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {seed.metadata.totals.dimensions} dimensions
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {seed.metadata.totals.total_attestations} attestations ·{" "}
                {seed.metadata.totals.batches_in_corpus} batches
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Compliance
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Browse the three layers — compliance standards, CIRIS
              translation, controls — by dimension, by regulatory work, or
              through the CIRIS semantics graph. All content is fetched
              from{" "}
              <a
                href={RESPONSE_BLOB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                ciris-response-magnifica-humanitas
              </a>{" "}
              and{" "}
              <a
                href={`${AGENT_BLOB}/compliance`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAgent/compliance
              </a>
              .
            </p>
          </header>

          <Suspense fallback={<div className="h-[60vh]" />}>
            <Workspace seed={seed} initialDimensionId={null} />
          </Suspense>

          <SeoBrowseAll seed={seed} />
        </div>
      </main>
      <Footer />
    </>
  );
}
