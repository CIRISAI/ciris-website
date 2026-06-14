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

          {/* How a network with no owner governs itself — grounded in
              CIRISNodeCore, the federation-consensus layer. */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <header className="mb-4 max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                The part everyone forgets
              </p>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
                How a network with no owner governs itself
              </h2>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Deleting the data centers is the easy half. The hard half
                is the thing the data center also did: decide who is
                trusted, what is allowed, and what you get to see. On
                today&rsquo;s internet that is a company. CEWP has no
                company, so the network has to do it itself. That is{" "}
                <a
                  href="https://github.com/CIRISAI/CIRISNodeCore"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand-primary hover:underline"
                >
                  CIRISNodeCore
                </a>
                , the consensus layer: eleven signed primitives, no central
                scorer, authority living in the agreement across nodes
                rather than in any one of them.
              </p>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              <GovPoint title="Decisions are weighted votes, not headcounts">
                Every decision is a signed vote, weighted by{" "}
                <strong>Credits</strong> (your track record of
                participation) and <strong>Expertise</strong> (validated
                competence in a specific domain and language). Not
                one-dollar-one-vote, and not one-account-one-vote, so
                buying or flooding accounts buys nothing.
              </GovPoint>
              <GovPoint title="Hard calls route to people who actually know">
                When a judgment needs human expertise, the network defers
                it to the people with a validated track record in that
                exact (domain, language) cell, rather than to whoever is
                loudest or most senior.
              </GovPoint>
              <GovPoint title="Moderation with no moderator">
                Abuse is handled by a signed accusation backed by stake,
                independent witnesses that must be diverse, adjudication by
                a Wise-Authority quorum, and <strong>slashing</strong> of
                actors proven rogue. No central trust-and-safety team, and
                the cost of a false accusation falls on the accuser.
              </GovPoint>
              <GovPoint title="Nothing is locked in forever">
                Any verdict can be reopened through{" "}
                <strong>Reconsideration</strong> on new evidence, a
                procedural error, or a compromised quorum. It is the
                universal exit from lock-in, applied to stewards and
                founders by the same rule as anyone else.
              </GovPoint>
              <GovPoint title="Rules crowdsourced, verdicts machined">
                People propose the rules (rubrics) and the questions; a
                foundation-model judge applies them the same way every
                time, against machine-checkable criteria. Both the rules
                and the judge are themselves open to calibration.
              </GovPoint>
              <GovPoint title="Sock puppets don’t scale">
                Every action is on a signed audit chain, which the Coherence
                Ratchet reads for the patterns Sybil swarms and
                coordinated-inauthentic behaviour leave behind. Reputation
                is earned over time and cannot be minted.
              </GovPoint>
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-5 text-slate-500 dark:text-slate-400">
              Spec + primitives:{" "}
              <a
                href="https://github.com/CIRISAI/CIRISNodeCore/blob/main/MISSION.md"
                target="_blank"
                rel="noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISNodeCore MISSION
              </a>
              . The same self-governance powers the per-language safety
              batteries on the{" "}
              <Link href="/crowdsourcing-alignment" className="text-brand-primary hover:underline">
                crowdsourcing-alignment
              </Link>{" "}
              page.
            </p>
          </section>

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

function GovPoint({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-950">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-6 text-slate-600 dark:text-slate-300">
        {children}
      </p>
    </div>
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
