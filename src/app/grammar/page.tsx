import Link from "next/link";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import {
  getRegistrySource,
  CEG_READER_PDF,
  CEG_FULL_PDF,
  ANCHORS,
} from "./lib/source";

export default async function GrammarPage() {
  const source = await getRegistrySource();

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 md:px-6">
          {/* Hero */}
          <header id={ANCHORS.hero} className="space-y-5">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {source.specVersion} · released {source.fsdLastUpdated}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {source.totalPrefixes} prefix families
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              CEG · CIRIS Epistemic Grammar
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              See who said it. See who agrees. Decide for yourself.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              The world is moving faster than most of us can fact-check it.
              Sources contradict. Agents speak unsigned. Corrections rarely
              catch the original. CEG is a small shared format that puts a
              signature on every claim, with a trail you can follow, so
              you can read who&rsquo;s saying what, who&rsquo;s pushed
              back, and what changed, and make your own call without
              giving up or giving in to any one source.
            </p>

            {/* PDF editions, the human-readable reader edition is the
                friendliest entry point for the full spec. */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CEG_READER_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                <span aria-hidden>📖</span>
                Read the human edition (PDF)
              </a>
              <a
                href={CEG_FULL_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                Full spec (PDF)
              </a>
              <span className="text-xs text-slate-500">
                {source.specVersion}, de-editorialized for human reading
              </span>
            </div>
          </header>

          {/* What this is, why we made it, what's comparable */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
                  around it, agreeing, disagreeing, correcting,
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
                    <strong>PGP web of trust</strong>, same instinct,
                    much narrower scope
                  </li>
                  <li>
                    <strong>W3C Verifiable Credentials</strong>, heavier
                    ceremony, no composition story
                  </li>
                  <li>
                    <strong>Community Notes</strong>, readable trails,
                    single platform
                  </li>
                  <li>
                    <strong>Sigstore / SLSA</strong>, code-supply-chain
                    cousins; CEG generalises the shape
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Three things a reader can actually do here */}
          <section className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
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
                Other signers add their own envelopes around the claim,
                agreeing, disagreeing, correcting, superseding. You
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
          </section>

          {/* Deep tech CTA — the full spec reader + the workshop */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Want the deep tech?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              The full spec reader, rendered live from the registry: the
              1+4 primitives, the families and envelope fields, the
              composition policies, the open namespace, the version
              lineage, and an interactive attestation explorer.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/grammar/details"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-secondary"
              >
                Open the spec reader →
              </Link>
              <Link
                href="/grammar/explore"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-slate-200"
              >
                Build a chain in the browser →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
