// Shared homepage body, driven by a per-locale dictionary. Both the English
// root (src/app/(home)/page.tsx) and the localized routes
// (src/app/[locale]/page.tsx) render this with their own dictionary — one
// content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>/<b>/<br>) are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe;
// translators are instructed to preserve the tags.

import Link from "next/link";

import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

import Funnel from "@/ciris-handoff/components/Funnel/Funnel";
import MeshFlow from "@/ciris-handoff/components/MeshFlow/MeshFlow";
import MeshHero from "@/app/components/MeshHero";
import MetroRing from "@/ciris-handoff/components/MetroRing/MetroRing";
import PrivacyRadar from "@/ciris-handoff/components/PrivacyRadar/PrivacyRadar";
import AttestationLedger from "@/ciris-handoff/components/AttestationLedger/AttestationLedger";
import CaughtLyingCascade from "@/ciris-handoff/components/CaughtLyingCascade/CaughtLyingCascade";
import Convergence from "@/ciris-handoff/components/Convergence/Convergence";
import Reveal from "@/ciris-handoff/Reveal";

import "@/ciris-handoff/tokens.css";
import "@/ciris-handoff/deck-motion.css";
import "@/app/(home)/home.css";

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function HomeContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const home = t.home;
  const ex = home.explore.links;

  const exploreLinks: Array<{ href: string; label: string; note: string }> = [
    // golden paths first
    { href: "/epistemic-web", label: ex.epistemicWeb, note: ex.epistemicWebNote },
    { href: "/safety", label: ex.safety, note: ex.safetyNote },
    { href: "/install", label: ex.install, note: ex.installNote },
    { href: "/how-it-works", label: ex.howItWorks, note: ex.howItWorksNote },
    // supporting
    { href: "/compare", label: ex.compare, note: ex.compareNote },
    { href: "/research-status", label: ex.research, note: ex.researchNote },
    { href: "/sections/main", label: ex.accord, note: ex.accordNote },
    // deeper
    { href: "/cewp", label: ex.cewp, note: ex.cewpNote },
    { href: "/grammar", label: ex.grammar, note: ex.grammarNote },
    { href: "/game", label: ex.game, note: ex.gameNote },
  ];

  return (
    <>
      <FloatingNav navItems={navItems} locale={locale} />
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <main className="ciris-dark home-narrative">
        {/* === 00 · Cover === */}
        <Reveal as="section" className="hsec hsec-cover" id="cover">
          <div className="hsec-mesh hsec-mesh-globe" aria-hidden>
            <MeshHero className="mesh-hero-canvas" />
          </div>
          <div className="cover-scrim" aria-hidden />
          <div className="hsec-inner cover-inner">
            <div className="eyebrow eyebrow-tagline rise">
              <span className="eb-dot" /> {home.cover.eyebrow}
            </div>
            <h1 className="cover-h1 rise d1" dangerouslySetInnerHTML={h(home.cover.h1)} />
            <p className="cover-sub rise d2" dangerouslySetInnerHTML={h(home.cover.sub)} />
            <div className="cta cta-hero rise d3">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="store store-primary"
                aria-label={home.cover.appStoreAria}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span>{home.cover.appStore}</span>
              </a>
              <a
                href={GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
                className="store store-primary"
                aria-label={home.cover.googlePlayAria}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.193 12l2.505-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302L5.864 2.658z" />
                </svg>
                <span>{home.cover.googlePlay}</span>
              </a>
              <span className="ctahint mono">{home.cover.ctahint}</span>
            </div>
            <div className="cover-foot rise d3">
              <span dangerouslySetInnerHTML={h(home.cover.foot1)} />
              <span>{home.cover.foot2}</span>
            </div>
          </div>
        </Reveal>

        {/* === 01 · The funnel === */}
        <Reveal as="section" className="hsec" id="funnel">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.funnel.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.funnel.title)} />
            </header>
            <div className="split">
              <div className="left">
                <p className="body rise d2">{home.funnel.body1}</p>
                <p className="body body-mute rise d2">{home.funnel.body2}</p>
              </div>
              <div className="right rise d3">
                <Funnel />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>{home.funnel.foot}</span>
            </footer>
          </div>
        </Reveal>

        {/* === 02 · App + fabric === */}
        <Reveal as="section" className="hsec" id="app-and-fabric">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.appFabric.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.appFabric.title)} />
            </header>
            <div className="split split-wide">
              <div className="left">
                <p className="lead rise d2" dangerouslySetInnerHTML={h(home.appFabric.lead1)} />
                <p className="lead rise d2" dangerouslySetInnerHTML={h(home.appFabric.lead2)} />
                <p className="small mono rise d3">{home.appFabric.small}</p>
              </div>
              <div className="right rise d3">
                <div className="stack">
                  <div className="stack-card stack-app">
                    <div className="stack-name">{home.appFabric.appName}</div>
                    <div className="stack-sub mono">{home.appFabric.appSub}</div>
                  </div>
                  <div className="stack-connector">
                    <span className="mono">{home.appFabric.connector}</span>
                  </div>
                  <div className="stack-card stack-fabric">
                    <div className="stack-name">
                      CEWP{" "}
                      <span className="mono stack-pron">{home.appFabric.fabricPron}</span>
                    </div>
                    <div className="stack-sub mono">{home.appFabric.fabricSub}</div>
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
                <span className="eb-dot" /> {home.threePromises.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.threePromises.title)} />
            </header>
            <p className="lead lead-wide rise d1">{home.threePromises.lead}</p>
            <div className="three">
              <div className="col rise d2">
                <div className="cnum">01</div>
                <h3>{home.threePromises.col1Title}</h3>
                <p>{home.threePromises.col1Body}</p>
              </div>
              <div className="col rise d3">
                <div className="cnum">02</div>
                <h3>{home.threePromises.col2Title}</h3>
                <p>{home.threePromises.col2Body}</p>
              </div>
              <div className="col rise d4">
                <div className="cnum">03</div>
                <h3>{home.threePromises.col3Title}</h3>
                <p>{home.threePromises.col3Body}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === 04 · Promise 01 · hardware === */}
        <Reveal as="section" className="hsec" id="hardware">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-num">{home.hardware.eyebrow}</span>
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.hardware.title)} />
            </header>
            <div className="split">
              <div className="left">
                <div className="stat rise d2">
                  65<span className="stat-u">%</span>
                </div>
                <p className="lead rise d2" dangerouslySetInnerHTML={h(home.hardware.lead)} />
                <p className="small mono rise d3">{home.hardware.small}</p>
              </div>
              <div className="right rise d3">
                <MetroRing />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>{home.hardware.foot}</span>
            </footer>
          </div>
        </Reveal>

        {/* === 04.5 · Honest about the two paths === */}
        <Reveal as="section" className="hsec" id="two-paths">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.twoPaths.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.twoPaths.title)} />
            </header>
            <div className="paths rise d2">
              <article className="path-card path-local">
                <header className="path-header">
                  <span className="path-pill mono">{home.twoPaths.localPill}</span>
                  <h3 className="path-title">{home.twoPaths.localTitle}</h3>
                </header>
                <p className="path-body" dangerouslySetInnerHTML={h(home.twoPaths.localBody)} />
              </article>
              <article className="path-card path-hosted">
                <header className="path-header">
                  <span className="path-pill path-pill-mute mono">{home.twoPaths.hostedPill}</span>
                  <h3 className="path-title">{home.twoPaths.hostedTitle}</h3>
                </header>
                <p className="path-body" dangerouslySetInnerHTML={h(home.twoPaths.hostedBody)} />
              </article>
            </div>
            <footer className="hfoot rise d3">
              <span className="pip" />
              <span>{home.twoPaths.foot}</span>
            </footer>
          </div>
        </Reveal>

        {/* === 05 · Promise 02 · privacy === */}
        <Reveal as="section" className="hsec" id="privacy">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-num eb-num-violet">{home.privacy.eyebrow}</span>
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.privacy.title)} />
            </header>
            <div className="split">
              <div className="right right-fixed rise d3">
                <PrivacyRadar />
              </div>
              <div className="left">
                <p className="lead rise d2" dangerouslySetInnerHTML={h(home.privacy.lead)} />
                <p className="body rise d2" dangerouslySetInnerHTML={h(home.privacy.body)} />
                <ul className="tiers rise d3">
                  <li className="tier tier-local">
                    <span className="tdot tdot-violet" />
                    <span className="tname">{home.privacy.tier1Name}</span>
                    <span className="tlab tlab-teal mono">{home.privacy.tier1Lab}</span>
                  </li>
                  <li className="tier tier-local">
                    <span className="tdot tdot-violet-dim" />
                    <span className="tname">{home.privacy.tier2Name}</span>
                    <span className="tlab tlab-teal mono">{home.privacy.tier2Lab}</span>
                  </li>
                  <li className="tier">
                    <span className="tdot tdot-mute" />
                    <span className="tname">{home.privacy.tier3Name}</span>
                    <span className="tlab mono">{home.privacy.tier3Lab}</span>
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
                <span className="eb-num eb-num-cyan">{home.signed.eyebrow}</span>
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.signed.title)} />
            </header>
            <div className="split">
              <div className="left">
                <p className="lead rise d2" dangerouslySetInnerHTML={h(home.signed.lead)} />
                <p className="small body-mute rise d3" dangerouslySetInnerHTML={h(home.signed.small)} />
              </div>
              <div className="right rise d3">
                <AttestationLedger />
              </div>
            </div>
            <footer className="hfoot rise d4">
              <span className="pip" />
              <span>{home.signed.foot}</span>
            </footer>
          </div>
        </Reveal>

        {/* === 07 · Caught lying === */}
        <Reveal as="section" className="hsec deep" id="caught-lying">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.caughtLying.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.caughtLying.title)} />
            </header>
            <div className="rise d2 cascade-wrap">
              <CaughtLyingCascade />
            </div>
            <p className="lead lead-center rise d3" dangerouslySetInnerHTML={h(home.caughtLying.lead)} />
          </div>
        </Reveal>

        {/* === 08 · Unification === */}
        <Reveal as="section" className="hsec deep" id="unification">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.unification.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.unification.title)} />
            </header>
            <div className="rise d2 converge-wrap">
              <Convergence />
            </div>
            <p className="lead lead-center rise d3">{home.unification.lead}</p>
          </div>
        </Reveal>

        {/* === 09 · Safety leadership === */}
        <Reveal as="section" className="hsec deep" id="safety-leadership">
          <div className="hsec-inner">
            <header className="head-row rise">
              <div className="eyebrow">
                <span className="eb-dot" /> {home.safetyLeadership.eyebrow}
              </div>
              <h2 className="title" dangerouslySetInnerHTML={h(home.safetyLeadership.title)} />
            </header>
            <div className="three">
              <div className="col rise d2">
                <h3>{home.safetyLeadership.col1Title}</h3>
                <p>{home.safetyLeadership.col1Body}</p>
              </div>
              <div className="col rise d3">
                <h3>{home.safetyLeadership.col2Title}</h3>
                <p>{home.safetyLeadership.col2Body}</p>
              </div>
              <div className="col rise d4">
                <h3>{home.safetyLeadership.col3Title}</h3>
                <p>{home.safetyLeadership.col3Body}</p>
              </div>
            </div>
            <p className="lead rise d4 safety-tail" dangerouslySetInnerHTML={h(home.safetyLeadership.tail)} />
          </div>
        </Reveal>

        {/* === 10 · Close · CIRIS 3.0 === */}
        <Reveal as="section" className="hsec hsec-cover deep" id="close">
          <div className="hsec-mesh" aria-hidden style={{ opacity: 0.55 }}>
            <MeshFlow />
          </div>
          <div className="hsec-inner cover-inner">
            <div className="eyebrow rise">
              <span className="eb-dot" /> {home.close.eyebrow}
            </div>
            <h1 className="cover-h1 cover-h1-close rise d1" dangerouslySetInnerHTML={h(home.close.h1)} />
            <p className="cover-sub rise d2" dangerouslySetInnerHTML={h(home.close.sub)} />
            <div className="cta rise d3">
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="store">
                {home.close.appStore}
              </a>
              <a href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" className="store">
                {home.close.googlePlay}
              </a>
              <span className="ctahint mono">{home.close.ctahint}</span>
            </div>
            <div className="cover-foot rise d3">
              <span>{home.close.foot1}</span>
              <span>{home.close.foot2}</span>
            </div>
          </div>
        </Reveal>

        {/* === Explore strip === */}
        <section className="hsec hsec-explore">
          <div className="hsec-inner">
            <p className="eyebrow">
              <span className="eb-dot" /> {home.explore.eyebrow}
            </p>
            <h2 className="explore-title">{home.explore.title}</h2>
            <ul className="explore-grid">
              {exploreLinks.map((l) => (
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
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
