import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import { getRegistrySource } from "../lib/source";
import ExploreWorkshop from "./ExploreWorkshop";

export default async function ExplorePage() {
  const source = await getRegistrySource();
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 md:px-6">
          <header className="mb-6 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Coherence · Phase 2 · workshop
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Explore the grammar
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Build a small attestation chain. Pin a few voices you trust,
              make some claims on a topic, run a composition policy, and
              watch how well-rounded the conversation gets. Or flip to
              Encyclopedia or Mystery Game to see what 100+ voices look
              like when they're all talking at once.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              FSD acceptance bar for Phase 2 per{" "}
              <a
                href="https://github.com/CIRISAI/CIRISAgent/issues/835"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAgent#835
              </a>{" "}
              §4.2. Phase 3 wires this into a real federation surface; Phase
              5 unlocks Coherence mode of the game proper.
            </p>
          </header>

          <ExploreWorkshop source={source} />
        </div>
      </main>
      <Footer />
    </>
  );
}
