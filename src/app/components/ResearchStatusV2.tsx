// v2 "dark-blueprint" research-status page. Renders the SAME t.researchStatus.*
// dictionary keys the old ResearchStatusContent did — no copy is rewritten or
// re-translated here — inside the reusable ContentShell. Accent "ok" (a measured
// green) reads as quiet, evidenced proof. Three text-free proof graphics are
// placed: g06 (one server per ten humans) as the hero, g09 (holographic
// survival) beside the falsification/resilience claim, and g10 (memory pyramid)
// beside the corpus/dataset claim. All graphics are language-neutral; every
// label still comes from the dictionary, never baked into the art.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import SvgGraphic from "@/app/components/graphics/SvgGraphic";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

/** A grid-framed inline illustration, mirroring the shell's hero art box. */
function InlineArt({ id }: { id: string }) {
  return (
    <div className={s.heroArt} aria-hidden="true">
      <SvgGraphic id={id} className={s.heroGraphic} />
    </div>
  );
}

export default function ResearchStatusV2({ t, locale }: { t: Dictionary; locale: string }) {
  const rs = t.researchStatus;
  const lh = (href: string) => localizeHref(href, locale);

  const agentSummaries = [
    { name: rs.allyName, paths: rs.allyPaths, breakdown: rs.allyBreakdown, summary: rs.allySummary },
    { name: rs.scoutName, paths: rs.scoutPaths, breakdown: rs.scoutBreakdown, summary: rs.scoutSummary },
    { name: rs.datumName, paths: rs.datumPaths, breakdown: rs.datumBreakdown, summary: rs.datumSummary },
  ];

  const loopSteps = [rs.loopStep1, rs.loopStep2, rs.loopStep3, rs.loopStep4];
  const schemaHighlights = [rs.schemaHighlight1, rs.schemaHighlight2, rs.schemaHighlight3];

  const papers = [
    { href: "https://zenodo.org/records/18217688", title: rs.paper1Title, meta: rs.paper1Meta, blurb: rs.paper1Blurb },
    { href: "https://zenodo.org/records/18137161", title: rs.paper2Title, meta: rs.paper2Meta, blurb: rs.paper2Blurb },
    { href: "https://zenodo.org/records/19839280", title: rs.paper3Title, meta: rs.paper3Meta, blurb: rs.paper3Blurb },
  ];

  return (
    <ContentShell
      locale={locale}
      accent="ok"
      kicker={rs.heroEyebrow}
      title={rs.heroH1}
      lede={rs.heroPara}
      graphicId="g06"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Measured scoreboard (relocated from the lobby — the proof lives here). */}
      <div className={s.scoreboard}>
        {t.lobby.stats.map((st) => (
          <div className={s.scoreStat} key={st.l}>
            <div className={s.scoreV} dir="ltr">{st.v}</div>
            <div className={s.scoreL}>
              {st.l}{" "}
              <span className={`${s.scoreTag} ${st.tag === "measured" ? s.scoreMeasured : s.scoreModel}`}>
                {st.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Status pills + corpus snapshot */}
      <div className={s.section}>
        <p className={s.footnote}>
          {rs.heroLabel} · {rs.heroUpdated}
        </p>
      </div>

      <div className={s.callout}>
        <p className={s.sectionLabel}>{rs.corpusLabel}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cOk}`}>
            <p>{rs.corpusItem1}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <p>{rs.corpusItem2}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <p>{rs.corpusItem3}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <p>{rs.corpusItem4}</p>
          </div>
        </div>
      </div>

      {/* Engineering proof — the measured fabric, linking the live CIRISServer
          benchmark site so the page covers both halves: papers and engineering. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.engProofEyebrow}</p>
        <h2 className={s.h2}>{rs.engProofH2}</h2>
        <p className={s.paragraph}>{rs.engProofBody}</p>
        <div className={s.scoreboard}>
          {rs.engProofStats.map((st) => (
            <div className={s.scoreStat} key={st.l}>
              <div className={s.scoreV} dir="ltr">{st.v}</div>
              <div className={s.scoreL}>
                {st.l}{" "}
                <span className={`${s.scoreTag} ${s.scoreMeasured}`}>{st.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <p className={s.paragraph}>
          <a href="https://cirisai.github.io/CIRISServer" target="_blank" rel="noopener noreferrer">
            {rs.engProofCta} →
          </a>
        </p>
      </section>

      {/* Flagship synthesis paper */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.flagshipBadge}</p>
        <h2 className={s.h2}>{rs.flagshipTitle}</h2>
        <p className={s.footnote}>{rs.flagshipMeta}</p>
        <p className={s.paragraph}>{rs.flagshipSubtitle}</p>
        <p className={s.paragraph}>{rs.flagshipBody}</p>
        <p className={s.paragraph}>
          <a href="https://zenodo.org/records/20300773" target="_blank" rel="noopener noreferrer">
            {rs.flagshipCta}
          </a>
        </p>
      </section>

      {/* Engineering-tier papers */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.engineeringEyebrow}</p>
        <p className={s.paragraph}>
          {rs.engineeringIntro}{" "}
          <Link href={lh("/papers")}>{rs.engineeringAllPapers}</Link>
        </p>
        <div className={s.cardGrid}>
          {papers.map((paper) => (
            <a
              key={paper.href}
              href={paper.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${s.cCyan}`}
            >
              <h3>{paper.title}</h3>
              <p className={s.footnote}>{paper.meta}</p>
              <p>{paper.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Open dataset + org link */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.datasetEyebrow}</p>
        <h2 className={s.h2}>{rs.datasetTitle}</h2>
        <p className={s.paragraph}>{rs.datasetBody}</p>
        <p className={s.paragraph}>
          <a href="https://huggingface.co/datasets/CIRISAI/reasoning-traces" target="_blank" rel="noopener noreferrer">
            {rs.datasetTitle}
          </a>
        </p>
        <div className={s.callout}>
          <p className={s.sectionLabel}>{rs.hfOrgTitle}</p>
          <p className={s.paragraph}>{rs.hfOrgBody}</p>
          <p className={s.paragraph}>
            <a href="https://huggingface.co/CIRISAI" target="_blank" rel="noopener noreferrer">
              {rs.hfOrgTitle}
            </a>
          </p>
        </div>
        {/* g10 — memory pyramid: what the growing corpus is shaped like */}
        <InlineArt id="g10" />
      </section>

      <div className={s.notice}>
        <p dangerouslySetInnerHTML={h(rs.sourceRepoNote)} />
      </div>

      {/* Alignment manifold math */}
      <section id="alignment-manifold" className={s.section}>
        <p className={s.sectionLabel}>{rs.mathEyebrow}</p>
        <h2 className={s.h2}>{rs.mathH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(rs.mathBody)} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(rs.mathNote)} />
      </section>

      {/* Why three artifacts */}
      <section className={s.section}>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{rs.whyTracesTitle}</h3>
            <p>{rs.whyTracesBody}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{rs.whySchemaTitle}</h3>
            <p>{rs.whySchemaBody}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{rs.whyCompendiumTitle}</h3>
            <p dangerouslySetInnerHTML={h(rs.whyCompendiumBody)} />
          </div>
        </div>
      </section>

      {/* Privacy by schema */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.privacyEyebrow}</p>
        <h2 className={s.h2}>{rs.privacyH2}</h2>
        <p className={s.paragraph}>{rs.privacyBody}</p>
        <div className={s.cardGrid}>
          {schemaHighlights.map((item) => (
            <div key={item} className={`${s.card} ${s.cOk}`}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research question */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{rs.researchQLabel}</p>
        <h2 className={s.h2}>{rs.researchQH2}</h2>
        <p className={s.paragraph}>{rs.researchQBody}</p>
        <div className={`${s.card} ${s.cTeal}`}>
          <h3>{rs.publicFramingTitle}</h3>
          <p>{rs.publicFramingBody}</p>
        </div>
      </div>

      {/* Corpus / attractor section */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.corpusSectionEyebrow}</p>
        <h2 className={s.h2}>{rs.corpusSectionH2}</h2>
        <p className={s.paragraph}>{rs.corpusSectionBody}</p>
        <p className={s.paragraph}>
          <Link href={lh("/ciris-scoring")}>{rs.corpusSectionDashLink}</Link>
        </p>
        <p className={s.footnote}>{rs.imageCaption}</p>
        <div className={s.cardGrid}>
          {agentSummaries.map((agent) => (
            <div key={agent.name} className={`${s.card} ${s.cCyan}`}>
              <h3>
                {agent.name} — {agent.paths} {rs.agentPathsSuffix}
              </h3>
              <p>{agent.breakdown}</p>
              <p>{agent.summary}</p>
            </div>
          ))}
        </div>
        <div className={s.notice}>
          <p>
            <strong>{rs.scoutBoxTitle}</strong>
          </p>
          <p dangerouslySetInnerHTML={h(rs.scoutBoxBody)} />
        </div>
      </section>

      {/* Crowdsourced alignment loop */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{rs.flywheelEyebrow}</p>
        <h2 className={s.h2}>{rs.flywheelH2}</h2>
        <p className={s.paragraph}>{rs.flywheelBody}</p>
        <ol className={s.cardGrid} style={{ listStyle: "none", padding: 0, margin: "8px 0 0", counterReset: "step" }}>
          {loopSteps.map((step) => (
            <li key={step} className={`${s.card} ${s.cTeal}`}>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <p className={s.footnote}>{rs.flywheelImageCaption}</p>
      </section>

      {/* IDMA */}
      <section id="idma" className={s.section}>
        <p className={s.sectionLabel}>{rs.idmaEyebrow}</p>
        <h2 className={s.h2}>{rs.idmaH2}</h2>
        <p className={s.paragraph}>{rs.idmaBody}</p>
        <p className={s.footnote} dangerouslySetInnerHTML={h(rs.idmaNote)} />
      </section>

      {/* Benchmarks */}
      <section id="benchmarks" className={s.section}>
        <p className={s.sectionLabel}>{rs.benchmarksEyebrow}</p>
        <h2 className={s.h2}>{rs.benchmarksH2}</h2>
        <p className={s.paragraph}>{rs.benchmarksBody}</p>
      </section>

      {/* Falsification — paired with g09 (holographic survival under loss) */}
      <section id="falsification" className={s.section}>
        <p className={s.sectionLabel}>{rs.falsificationEyebrow}</p>
        <h2 className={s.h2}>{rs.falsificationH2}</h2>
        <p className={s.paragraph}>{rs.falsificationBody}</p>
        {/* g09 — holographic survival: structure that holds under partial loss */}
        <InlineArt id="g09" />
      </section>

      {/* Limitations */}
      <section id="limitations" className={s.section}>
        <p className={s.sectionLabel}>{rs.limitationsEyebrow}</p>
        <h2 className={s.h2}>{rs.limitationsH2}</h2>
        <p className={s.paragraph}>{rs.limitationsPara1}</p>
        <p className={s.paragraph}>{rs.limitationsPara2}</p>
        <p className={s.footnote} dangerouslySetInnerHTML={h(rs.limitationsNote)} />
      </section>

      {/* CTAs preserved from the original hero */}
      <section className={s.cta}>
        <div className={s.ctaRow}>
          <Link href={lh("/ciris-scoring")} className={`${s.btn} ${s.btnP}`}>
            {rs.heroCtaTrace}
          </Link>
          <a
            href="https://github.com/CIRISAI/CIRISLens"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {rs.heroCtaLens}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
