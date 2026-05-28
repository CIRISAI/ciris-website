import { Suspense } from "react";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import {
  getSeed,
  getDimension,
  RESPONSE_BLOB,
  AGENT_BLOB,
} from "../lib/seed";
import Workspace from "../components/Workspace";
import SeoBrowseAll, {
  SeoDimensionDetail,
} from "../components/SeoBrowseAll";

export const dynamicParams = false;

export async function generateStaticParams() {
  const seed = await getSeed();
  return seed.dimensions.map((d) => ({ id: d.id }));
}

export default async function DimensionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seed = await getSeed();
  const d = await getDimension(id);
  if (!d) notFound();

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-32 md:px-6">
          <header className="mb-6">
            <p className="mb-2 text-xs">
              <a
                href="/compliance"
                className="text-slate-500 hover:text-brand-primary dark:text-slate-400"
              >
                ← All compliance dimensions
              </a>
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              <span className="font-mono text-brand-primary">{d.id}</span>{" "}
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {d.prefix}
              </span>
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {d.gloss}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Sources:{" "}
              <a
                href={`${RESPONSE_BLOB}/SEED_DIMENSIONS.yaml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                seed
              </a>{" "}
              ·{" "}
              <a
                href={`${AGENT_BLOB}/compliance`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                controls
              </a>
            </p>
          </header>

          <Suspense fallback={<div className="h-[60vh]" />}>
            <Workspace seed={seed} initialDimensionId={d.id} />
          </Suspense>

          <SeoDimensionDetail seed={seed} dimension={d} />
          <SeoBrowseAll seed={seed} />
        </div>
      </main>
      <Footer />
    </>
  );
}
