// CIRIS homepage — the 7-minute pitch as a scroll-narrative.
//
// Eleven sections matching the deck arc: cover · funnel · app+fabric · three
// promises · hardware · privacy · signed · caught lying · unification · safety
// leadership · close. The diagrams ship as React components from the
// design-team handoff at /src/ciris-handoff/. The dark surface and accent
// palette opt in via the .ciris-dark wrapper on <main>, so the rest of the
// site keeps its existing light theme untouched.

import Link from "next/link";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

import Funnel from "@/ciris-handoff/components/Funnel/Funnel";
import MeshFlow from "@/ciris-handoff/components/MeshFlow/MeshFlow";
import MetroRing from "@/ciris-handoff/components/MetroRing/MetroRing";
import PrivacyRadar from "@/ciris-handoff/components/PrivacyRadar/PrivacyRadar";
import AttestationLedger from "@/ciris-handoff/components/AttestationLedger/AttestationLedger";
import CaughtLyingCascade from "@/ciris-handoff/components/CaughtLyingCascade/CaughtLyingCascade";
import Convergence from "@/ciris-handoff/components/Convergence/Convergence";
import Reveal from "@/ciris-handoff/Reveal";

import "@/ciris-handoff/tokens.css";
import "@/ciris-handoff/deck-motion.css";
import "./home.css";

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

const EXPLORE_LINKS: Array<{ href: string; label: string; note: string }> = [
  { href: "/install", label: "Install the agent", note: "iPhone · Android · pip · desktop" },
  { href: "/cewp", label: "CEWP", note: "The fabric, in plain English" },
  { href: "/cewp/details", label: "CEWP simulator", note: "The math, with sliders" },
  { href: "/grammar", label: "Grammar (CEG)", note: "The wire format the federation speaks" },
  { href: "/game", label: "Mystery game", note: "Play with the trust graph" },
  { href: "/compare", label: "Compare", note: "Against alternatives, with receipts" },
  { href: "/sections/main", label: "The Accord", note: "The public ethical framework" },
  { href: "/research-status", label: "Research status", note: "What the trace corpus supports" },
];

export default function Homepage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="ciris-dark home-narrative">
        {/* === 00 · Cover === */}
        <Reveal as="section" className="hsec hsec-cover" id="cover">
          <div className="hsec-mesh" aria-hidden>
            <MeshFlow />
          </div>
          <div className="hsec-inner cover-inner">
            <div className="eyebrow rise">
              <span className="eb-dot" /> CIRIS · Open Coherence Infrastructure
            </div>
            <h1 className="cover-h1 rise d1">
              An AI you can <em>actually own</em>.
            </h1>
            <p className="cover-sub rise d2">
              One app. <b>No data centers.</b> Every claim it makes, <b>signed.</b>
            </p>
            <div className="cta cta-hero rise d3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="store store-primary"
                aria-label="Install CIRIS on the App Store"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>App Store</span>
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
                className="store store-primary"
                aria-label="Install CIRIS on Google Play"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.193 12l2.505-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302L5.864 2.658z"/>
                </svg>
                <span>Google Play</span>
              </a>
              <span className="ctahint mono">free · open source · on your phone today</span>
            </div>
            <div className="cover-foot rise d3">
              <span>CIRISAgent &nbsp;·&nbsp; CEWP — &ldquo;soup&rdquo;</span>
              <span>CIRIS 2.9.4 shipping &nbsp;·&nbsp; 3.0 rolling out June–July 2026</span>
            </div>
          </div>
        </Reveal>

        {/* === 01 · The funnel === */}
        <Reveal as="section" className="hsec" id="funnel">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> Where we are
              </div>
              <h2 className="title">
                The internet runs through a few <em>giant buildings</em>.
              </h2>
            </header>
            <div className="split">
              <div className="left">
                <p className="body rise d2">
                  Ask an AI anything and your words travel to someone
                  else&rsquo;s building, run on someone else&rsquo;s model,
                  and land in someone else&rsquo;s logs — with the carbon
                  as a side effect.
                </p>
                <p className="body body-mute rise d2">
                  You don&rsquo;t own the answer, the data, or the
                  footprint.
                </p>
              </div>
              <div className="right rise d3">
                <Funnel />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>
                ≈ 10,000 data centers &nbsp;·&nbsp; 5 billion people
                &nbsp;·&nbsp; one funnel
              </span>
            </footer>
          </div>
        </Reveal>

        {/* === 02 · App + fabric === */}
        <Reveal as="section" className="hsec" id="app-and-fabric">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> The shape of the alternative
              </div>
              <h2 className="title">
                One app.<br />
                One <em>fabric</em> underneath.
              </h2>
            </header>
            <div className="split split-wide">
              <div className="left">
                <p className="lead rise d2">
                  <b>CIRISAgent</b> is what you hold and talk to — it
                  carries the reasoning.
                </p>
                <p className="lead rise d2">
                  <b>CEWP</b> is the fabric it runs on: a web of devices
                  that trust each other, all hardware you already own.
                </p>
                <p className="small mono rise d3">
                  People and AI both live on it as equals — side by side.
                </p>
              </div>
              <div className="right rise d3">
                <div className="stack">
                  <div className="stack-card stack-app">
                    <div className="stack-name">CIRISAgent</div>
                    <div className="stack-sub mono">the app · reasoning + UI</div>
                  </div>
                  <div className="stack-connector">
                    <span className="mono">~14 KB trace / decision</span>
                  </div>
                  <div className="stack-card stack-fabric">
                    <div className="stack-name">
                      CEWP <span className="mono stack-pron">— &ldquo;soup&rdquo;</span>
                    </div>
                    <div className="stack-sub mono">the fabric · your hardware</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === 03 · Three promises === */}
        <Reveal as="section" className="hsec deep" id="three-promises">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> The big idea
              </div>
              <h2 className="title">
                Three promises, held as <em>one system</em>.
              </h2>
            </header>
            <p className="lead lead-wide rise d1">
              Usually these come from three different companies. Here
              they fall out of one design.
            </p>
            <div className="three">
              <div className="col rise d2">
                <div className="cnum">01</div>
                <h3>No data centers</h3>
                <p>It runs on the phone in your pocket and a small box at home.</p>
              </div>
              <div className="col rise d3">
                <div className="cnum">02</div>
                <h3>Privacy that can&rsquo;t leak</h3>
                <p>Your private life literally can&rsquo;t leave your circle.</p>
              </div>
              <div className="col rise d4">
                <div className="cnum">03</div>
                <h3>AI you can check</h3>
                <p>Every claim it makes is signed — so you can see it and undo it.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === 04 · Promise 01 · hardware === */}
        <Reveal as="section" className="hsec" id="hardware">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-num">PROMISE 01</span>
              </div>
              <h2 className="title">
                It runs on hardware<br />
                you <em>already own</em>.
              </h2>
            </header>
            <div className="split">
              <div className="left">
                <div className="stat rise d2">
                  65<span className="stat-u">%</span>
                </div>
                <p className="lead rise d2">
                  of everyday web activity <b>never leaves your city</b>.
                  We call it the <b>locality bonus</b>.
                </p>
                <p className="small mono rise d3">
                  phones &nbsp;·&nbsp; home boxes &nbsp;·&nbsp; no giant data centers
                </p>
              </div>
              <div className="right rise d3">
                <MetroRing />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>
                two-thirds stays home &nbsp;→&nbsp; no giant data center
                &nbsp;→&nbsp; far less energy &amp; CO₂
              </span>
            </footer>
          </div>
        </Reveal>

        {/* === 04.5 · Honest about the two paths === */}
        <Reveal as="section" className="hsec" id="two-paths">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> Two paths · same signed agent
              </div>
              <h2 className="title">
                On your device, or hosted — <em>your call</em>.
              </h2>
            </header>
            <p className="lead rise d1 lead-wide">
              &ldquo;No data centers&rdquo; is the on-device path. We&rsquo;ll be
              honest about the other one too.
            </p>
            <div className="paths rise d2">
              <article className="path-card path-local">
                <header className="path-header">
                  <span className="path-pill mono">no data centers</span>
                  <h3 className="path-title">Local · on your phone</h3>
                </header>
                <p className="path-body">
                  Pair CIRISAgent with a small open model that runs on your
                  phone — <b>Gemma 4 (E2B or E4B)</b>, Phi, or any compatible
                  open model. Around <b>1.5 GB of RAM</b>, completely offline,
                  zero hyperscale facilities. This is the path the rest of
                  this page is talking about.
                </p>
              </article>
              <article className="path-card path-hosted">
                <header className="path-header">
                  <span className="path-pill path-pill-mute mono">uses a data center</span>
                  <h3 className="path-title">Hosted · free for everyone</h3>
                </header>
                <p className="path-body">
                  For people who can&rsquo;t run a local model — older phones,
                  low-resource languages, no storage to spare — CIRIS offers
                  <b> free hosted inference</b> through providers like{" "}
                  <b>DeepInfra</b>, in <b>29 languages</b>. That path uses
                  someone else&rsquo;s data center. The signed traces, the
                  accountability, and the ethical framework are identical.
                </p>
              </article>
            </div>
            <footer className="hfoot rise d3">
              <span className="pip" />
              <span>
                both paths are signed &nbsp;·&nbsp; both can be checked
                &nbsp;·&nbsp; we&rsquo;re upfront about which one you&rsquo;re on
              </span>
            </footer>
          </div>
        </Reveal>

        {/* === 05 · Promise 02 · privacy === */}
        <Reveal as="section" className="hsec" id="privacy">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-num eb-num-violet">PROMISE 02</span>
              </div>
              <h2 className="title">
                Your private life<br />
                can&rsquo;t <em className="em-violet">leave the room</em>.
              </h2>
            </header>
            <div className="split">
              <div className="right right-fixed rise d3">
                <PrivacyRadar />
              </div>
              <div className="left">
                <p className="lead rise d2">
                  The agent sorts everything into <b>seven circles</b> —
                  from <b>self</b> out to the whole <b>Global Commons</b>.
                </p>
                <p className="body rise d2">
                  For the closest circles, the system <b className="emph-text">never sends the little message</b>{" "}
                  that tells the network your data is even there. No message,
                  no way to ask for it. The privacy comes from what&rsquo;s{" "}
                  <b className="emph-violet">missing</b> — not from a promise.
                </p>
                <ul className="tiers rise d3">
                  <li className="tier tier-local">
                    <span className="tdot tdot-violet" />
                    <span className="tname">self · family</span>
                    <span className="tlab tlab-teal mono">never shared</span>
                  </li>
                  <li className="tier tier-local">
                    <span className="tdot tdot-violet-dim" />
                    <span className="tname">friends · circle</span>
                    <span className="tlab tlab-teal mono">stays local</span>
                  </li>
                  <li className="tier">
                    <span className="tdot tdot-mute" />
                    <span className="tname">community → Global Commons</span>
                    <span className="tlab mono">can be shared</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === 06 · Promise 03 · signed === */}
        <Reveal as="section" className="hsec" id="signed">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-num eb-num-cyan">PROMISE 03</span>
              </div>
              <h2 className="title">
                Every claim it makes<br />
                is <em className="em-cyan">signed</em>.
              </h2>
            </header>
            <div className="split">
              <div className="left">
                <p className="lead rise d2">
                  Big tech checks its AI once, while building it — then
                  hopes. CIRIS keeps checking it{" "}
                  <b>while it runs, out in the open.</b>
                </p>
                <p className="small body-mute rise d3">
                  When the AI gets something wrong, you don&rsquo;t just
                  see it — you can undo it, and it{" "}
                  <span className="emph-rose">loses trust</span>.
                </p>
              </div>
              <div className="right rise d3">
                <AttestationLedger />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>
                who said it &nbsp;·&nbsp; who agreed &nbsp;·&nbsp; who
                pushed back — for every important claim on the network
              </span>
            </footer>
          </div>
        </Reveal>

        {/* === 07 · Caught lying === */}
        <Reveal as="section" className="hsec deep" id="caught-lying">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> And here&rsquo;s the safety net
              </div>
              <h2 className="title">
                Catch a liar, and it all <em>comes undone</em>.
              </h2>
            </header>
            <div className="rise d2 cascade-wrap">
              <CaughtLyingCascade />
            </div>
            <p className="lead lead-center rise d3">
              If a person — or an AI — is ever caught misleading people,
              every claim they ever signed becomes{" "}
              <b className="emph-text">moot</b>, and every conclusion
              built on them can be{" "}
              <b className="emph-text">re-opened</b>.
            </p>
          </div>
        </Reveal>

        {/* === 08 · Unification === */}
        <Reveal as="section" className="hsec deep" id="unification">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> Why it&rsquo;s one system, not three
              </div>
              <h2 className="title">
                The three can&rsquo;t be <em>pulled apart</em>.
              </h2>
            </header>
            <div className="rise d2 converge-wrap">
              <Convergence />
            </div>
            <p className="lead lead-center rise d3">
              The same signature that proves who said something also
              decides what stays home. One simple idea — and privacy,
              less waste, and safe AI all come from it.
            </p>
          </div>
        </Reveal>

        {/* === 09 · Safety leadership === */}
        <Reveal as="section" className="hsec deep" id="safety-leadership">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> And we&rsquo;ll say it out loud
              </div>
              <h2 className="title">
                The safest, most ethical AI you can actually use.{" "}
                <em>By a lot.</em>
              </h2>
            </header>
            <div className="three">
              <div className="col rise d2">
                <h3>An emergency stop it can&rsquo;t argue with</h3>
                <p>
                  It works before the AI can even think — and only a
                  trusted, signed key can set it off.
                </p>
              </div>
              <div className="col rise d3">
                <h3>A record it can&rsquo;t quietly change</h3>
                <p>
                  Every choice is signed and linked to the one before. A
                  lie can&rsquo;t keep its story straight.
                </p>
              </div>
              <div className="col rise d4">
                <h3>Mental-health safety in 29 languages</h3>
                <p>
                  Checked by computer on every update — built first for
                  the people who need it most.
                </p>
              </div>
            </div>
            <p className="lead rise d4 safety-tail">
              And every word of it is{" "}
              <b className="emph-accent">open code you can read</b>.
            </p>
          </div>
        </Reveal>

        {/* === 10 · Close · CIRIS 3.0 === */}
        <Reveal as="section" className="hsec hsec-cover deep" id="close">
          <div className="hsec-mesh" aria-hidden style={{ opacity: 0.55 }}>
            <MeshFlow />
          </div>
          <div className="hsec-inner cover-inner">
            <div className="eyebrow rise">
              <span className="eb-dot" /> Not just talk
            </div>
            <h1 className="cover-h1 cover-h1-close rise d1">
              CIRIS is <em>open</em>,<br />
              and it&rsquo;s <em>here</em>.
            </h1>
            <p className="cover-sub rise d2">
              Open source, all the way through. <b>2.9.4 is shipping
              now</b> on iPhone and Android, and <b>3.0 rolls out
              through June and July 2026</b>.
            </p>
            <div className="cta rise d3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="store"
              >
                App Store
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
                className="store"
              >
                Google Play
              </a>
              <span className="ctahint mono">free · open source</span>
            </div>
            <div className="cover-foot rise d3">
              <span>github.com/CIRISAI &nbsp;·&nbsp; AGPL-3.0 · mission-locked</span>
              <span>An AI you can own</span>
            </div>
          </div>
        </Reveal>

        {/* === Explore strip · so returning visitors still find the deep
                routes the old hub page exposed. === */}
        <section className="hsec hsec-explore">
          <div className="hsec-inner">
            <p className="eyebrow">
              <span className="eb-dot" /> Explore further
            </p>
            <h2 className="explore-title">If you want the proof.</h2>
            <ul className="explore-grid">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="explore-link">
                    <span className="explore-link-label">{l.label}</span>
                    <span className="explore-link-note mono">{l.note}</span>
                    <span className="explore-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
