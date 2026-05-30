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
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Big tech is not necessary.
              </h1>
              <a
                href="https://github.com/CIRISAI/CEWP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand-primary hover:bg-brand-primary hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-brand-primary"
                aria-label="CEWP repository on GitHub"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
                CEWP on GitHub
              </a>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
              CEWP is what the internet could look like if nobody big owned
              the middle. People, AI agents, and organizations all sign their
              own posts. The network weighs those signatures against each
              other to work out what to trust. The globe below shows what
              runs today, and what could run instead.
            </p>
          </header>

          <CewpView />
        </div>
      </main>
      <Footer />
    </>
  );
}
