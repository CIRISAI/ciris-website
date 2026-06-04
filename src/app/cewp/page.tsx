import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

export const metadata = {
  title: "CEWP — A better internet, without big tech | CIRIS",
  description:
    "CEWP (the CIRIS Epistemic Web Platform, pronounced 'soup'): a federation of equals. Same fiber as today's internet, no datacenters in the middle.",
};

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

export default function CewpPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-40 md:px-6 md:pt-44">
          {/* Hero — soup bowl + acronym + headline */}
          <header className="space-y-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span aria-hidden className="text-4xl md:text-5xl">
                🍲
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                CEWP &nbsp;·&nbsp; CIRIS Epistemic Web Platform &nbsp;·&nbsp; pronounced &ldquo;soup&rdquo;
              </p>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              A better internet, without big tech and massive datacenters.
            </h1>

            {/* What it is — two sentences */}
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              CEWP is the internet routed directly between the devices
              you already own, instead of through about ten thousand
              giant warehouses run by five companies. People, AI agents,
              and organizations sign their own posts, and the network
              weighs those signatures to work out what to trust.
            </p>

            {/* Why it needs to exist — two sentences */}
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              Today&rsquo;s middle costs about 175 megatons of CO2 a year
              and concentrates everyone&rsquo;s data in five companies.
              CEWP runs on hardware you already have, never advertises
              your local content to the rest of the network, and makes
              every load-bearing claim a signed wire artifact you can
              read.
            </p>
          </header>

          {/* The video explainer */}
          <section className="mt-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Watch the 7-minute explainer
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm dark:border-gray-800">
              <iframe
                src="https://www.youtube-nocookie.com/embed/sScyz82zfpY?rel=0"
                title="Dismantling the Hyperscaler — The Systems Architecture of CEWP"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-2 text-[12px] text-slate-500">
              &ldquo;Dismantling the Hyperscaler&rdquo; · YouTube
            </p>
          </section>

          {/* CTAs */}
          <section className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span aria-hidden>📱</span>
                Get CIRIS on the App Store
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-primary hover:bg-brand-primary hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200 dark:hover:bg-brand-primary"
              >
                <span aria-hidden>🤖</span>
                Get CIRIS on Google Play
              </a>
            </div>
            <p className="rounded-md border-l-4 border-brand-primary bg-brand-primary/5 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-brand-primary/10 dark:text-slate-200">
              <b>CIRIS 2.9.x is shipping now.</b> Install today on
              iPhone or Android. The full CEWP feature set rolls out
              through <b>June and July 2026</b>.
            </p>
          </section>

          {/* The "click here for more" — the whole rest of the manifesto */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Want the deep tech?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              The interactive simulator, the honest device-class energy
              math, the per-cohort abuse model, comparisons against
              IPFS / Bluesky / Solid / Nostr / Filecoin, the seven open
              repos.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/cewp/details"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                See the simulator and the math →
              </Link>
              <a
                href="https://github.com/CIRISAI/CEWP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
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
                CEWP repo on GitHub
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
