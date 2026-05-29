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
          <header className="mb-4 space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Explore the grammar
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              The graph below is the page. Tap a sphere to read it. Drag to
              rotate, pinch to zoom. Everything else is in the boxes
              underneath.
            </p>
          </header>

          <ExploreWorkshop source={source} />
        </div>
      </main>
      <Footer />
    </>
  );
}
