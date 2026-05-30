import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CewpView from "./CewpView";

export const metadata = {
  title: "CEWP — CIRIS Epistemic Web Platform | CIRIS",
  description:
    "CEWP (soup): the seven-repo CIRIS Agent 3.0 stack on a federation of equals. Same fiber, no datacenters in the middle.",
};

export default function CewpPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 md:px-6">
          <header className="mb-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              CEWP &nbsp;·&nbsp; pronounced &ldquo;soup&rdquo;
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Big tech is not necessary.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
              CEWP is the CIRIS Epistemic Web Platform. Humans, AI agents, and
              organizations as first-class participants with the same
              cryptographic identity shape. Every load-bearing claim is signed.
              The federation&rsquo;s aggregate scoring is what governs the
              system in real time. The globe below shows what that looks like
              compared to the substrate we have today.
            </p>
          </header>

          <CewpView />
        </div>
      </main>
      <Footer />
    </>
  );
}
