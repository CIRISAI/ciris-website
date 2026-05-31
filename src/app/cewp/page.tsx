import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import CewpView from "./CewpView";
import WhyCewp from "./components/WhyCewp";

export const metadata = {
  title: "CEWP — A better internet, without big tech | CIRIS",
  description:
    "CEWP (the CIRIS Epistemic Web Platform, pronounced 'soup'): a federation of equals. Same fiber as today's internet, no datacenters in the middle.",
};

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

const BENEFITS: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: "🛡️",
    title: "Your stuff stays yours",
    body:
      "Local content never gets advertised to the rest of the network. The wire format will not carry it. No policy promise, no trust-us moment.",
  },
  {
    icon: "🧠",
    title: "Every claim is signed",
    body:
      "Posts, AI answers, fact checks. You can see who said what, who agreed, who pushed back, and what changed. No anonymous algorithm picking what you see.",
  },
  {
    icon: "🏠",
    title: "Runs on hardware you have",
    body:
      "Your phone is most of it. A small set of always-on home boxes carry the rest. No giant datacenters required, anywhere.",
  },
  {
    icon: "🌍",
    title: "Same internet, different middle",
    body:
      "The cables under the ocean are the same. What changes is who owns the stuff while it's in motion. Five companies today; the people on the ends tomorrow.",
  },
];

export default function CewpPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-40 md:px-6 md:pt-44">
          {/* Tier 1 — friendly hero. Plain English, install CTAs, no math. */}
          <header className="mb-10 space-y-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span aria-hidden className="text-4xl md:text-5xl">
                🍲
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                CEWP &nbsp;·&nbsp; CIRIS Epistemic Web Platform &nbsp;·&nbsp; pronounced &ldquo;soup&rdquo;
              </p>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              A better internet, without big tech and massive datacenters.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              CEWP is what the internet looks like if nobody big owns the
              middle. People, AI agents, and organizations all sign their
              own posts. The network weighs those signatures against each
              other to work out what to trust. No five companies in the
              way. No giant warehouses full of servers.
            </p>

            {/* Install CTAs */}
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
              <a
                href="https://github.com/CIRISAI/CEWP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-400"
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
                CEWP repo
              </a>
            </div>

            {/* Shipping note */}
            <p className="max-w-3xl rounded-md border-l-4 border-brand-primary bg-brand-primary/5 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-brand-primary/10 dark:text-slate-200">
              <b>CIRIS 2.9 is shipping today.</b> The app installs on iPhone
              and Android right now and uses the parts of CEWP that are
              ready: signed posts, trust-graph identity, the first federation
              endpoints. The full platform comes online through{" "}
              <b>June and July 2026</b> as the remaining substrate pieces
              land.
            </p>

            {/* Substrate maturity note — per issue #17 */}
            <div className="max-w-3xl rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
              <p className="font-semibold">
                Substrate maturity update — May 2026
              </p>
              <p className="mt-1">
                The CIRIS Federation Threat Model v1.1 closed three of the
                four structural gaps identified at v1.0:
              </p>
              <ul className="mt-2 space-y-0.5 text-[13px]">
                <li>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300">
                    ✓
                  </span>{" "}
                  <b>Gap A</b> — revocation propagation timeliness, contract
                  specified
                </li>
                <li>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300">
                    ✓
                  </span>{" "}
                  <b>Gap B</b> — quorum and bounded-staleness reads,
                  contract specified
                </li>
                <li>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300">
                    ✓
                  </span>{" "}
                  <b>Gap C</b> — hybrid post-quantum key exchange{" "}
                  <b>shipped</b> in CIRISVerify 4.6.0 (X25519 + ML-KEM-768)
                </li>
                <li>
                  <span className="font-mono text-amber-700 dark:text-amber-300">
                    ◐
                  </span>{" "}
                  <b>Gap D</b> — multi-medium transport, pending CIRISEdge
                  Phase 1
                </li>
              </ul>
              <p className="mt-2 text-[12px] italic">
                All 17 scaling scenarios remain feasible at the v1
                per-server gates (1 TB / 1 Gbps / 1 core). The headline
                numbers below haven&rsquo;t moved; the substrate
                underneath them got more honest.
              </p>
            </div>
          </header>

          {/* Tier 2 — plain-English benefit cards. Between hero and math. */}
          <section className="mb-10 grid gap-4 md:grid-cols-2">
            {BENEFITS.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="text-2xl">
                    {b.icon}
                  </span>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {b.title}
                  </h2>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {b.body}
                </p>
              </article>
            ))}
          </section>

          {/* Mullet divider — party in the front, deep tech in the back. */}
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] text-slate-500 dark:border-gray-800 dark:bg-gray-900">
            <span aria-hidden className="text-base">
              💇
            </span>
            <span>
              Someone called this page a mullet. Party in the front,
              deep tech in the back. Sliders, math, and globe below.
            </span>
          </div>

          {/* Tier 3 — the simulator: globe, sliders, math. */}
          <header className="mb-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              See it work
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              What CEWP actually looks like at scale
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Drag the sliders. Watch the assumptions move. Everything below
              is honest math you can disagree with input by input.
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
