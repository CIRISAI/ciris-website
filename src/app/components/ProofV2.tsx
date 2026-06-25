// v2 "dark-blueprint" Proof page (/proof). The high-level synthesis: the five
// proof classes, with Safety, Engineering, and Compliance shown in full here,
// and Theory + Transparency pointing down into the deep research page
// (/research-status). Reuses the already-localized researchStatus.* dictionary
// keys (no new copy beyond the proof hero), so it localizes for free. Accent
// "ok" (a measured green) reads as quiet, evidenced proof.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import ProofClassIcon from "@/app/components/graphics/ProofClassIcon";

export default function ProofV2({ t, locale }: { t: Dictionary; locale: string }) {
  const rs = t.researchStatus;
  const lh = (href: string) => localizeHref(href, locale);

  const proofClasses = [
    { anchor: "#proof-safety", icon: "safety", title: rs.classSafetyTitle, blurb: rs.classSafetyBlurb, cls: s.cOk },
    { anchor: "#proof-engineering", icon: "engineering", title: rs.classEngineeringTitle, blurb: rs.classEngineeringBlurb, cls: s.cTeal },
    { anchor: "#proof-theory", icon: "theory", title: rs.classTheoryTitle, blurb: rs.classTheoryBlurb, cls: s.cCyan },
    { anchor: "#proof-compliance", icon: "compliance", title: rs.classComplianceTitle, blurb: rs.classComplianceBlurb, cls: s.cViolet },
    { anchor: "#proof-transparency", icon: "transparency", title: rs.classTransparencyTitle, blurb: rs.classTransparencyBlurb, cls: s.cBrass },
  ];

  // Safety-evidence links (source of truth: CIRISAI/CIRISAgent). Verified live.
  const safetyLinks = [
    { href: "https://github.com/CIRISAI/CIRISAgent/tree/main/tests/safety", label: rs.safetyBatteryCta, cls: s.cOk },
    { href: "https://github.com/CIRISAI/CIRISAgent/blob/main/tests/safety/english_mental_health/v4_english_scoring_rubric.md", label: rs.safetyRubricCta, cls: s.cOk },
    { href: "https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/CONSCIENCE_V3.md", label: rs.safetyConscienceCta, cls: s.cTeal },
    { href: "https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/DMA_BOUNCE.md", label: rs.safetyDmaCta, cls: s.cTeal },
  ];

  return (
    <ContentShell
      locale={locale}
      accent="ok"
      kicker={rs.proofHeroKicker}
      title={rs.proofHeroTitle}
      lede={rs.proofHeroLede}
      graphicId="g17"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The five classes lead the page; each anchors into the evidence below. */}
      <nav className={s.section} aria-label={rs.proofClassesLabel}>
        <p className={s.sectionLabel}>{rs.proofClassesLabel}</p>
        <div className={s.cardGrid}>
          {proofClasses.map((c) => (
            <a key={c.anchor} href={c.anchor} className={`${s.card} ${c.cls}`}>
              <h3 style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <ProofClassIcon name={c.icon} className={s.cardIcon} />
                {c.title}
              </h3>
              <p>{c.blurb}</p>
            </a>
          ))}
        </div>
      </nav>

      {/* Headline measured numbers. */}
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

      {/* Safety — the per-language test batteries + in-agent guards, with source. */}
      <section id="proof-safety" className={s.section}>
        <p className={s.sectionLabel}>{rs.safetyEyebrow}</p>
        <h2 className={s.h2}>{rs.safetyH2}</h2>
        <p className={s.paragraph}>{rs.safetyBody}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {safetyLinks.map((lnk) => (
            <a key={lnk.href} href={lnk.href} target="_blank" rel="noopener noreferrer" className={`${s.card} ${lnk.cls}`}>
              <h3>{lnk.label} →</h3>
            </a>
          ))}
        </div>
        <p className={s.paragraph}>
          <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer">
            {rs.safetySourceCta} →
          </a>
        </p>
      </section>

      {/* Engineering — the measured fabric (live CIRISServer benchmark site). */}
      <section id="proof-engineering" className={s.section}>
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
        <p className={s.paragraph}>
          <Link href="/verification">{rs.engVerificationCta} →</Link>
        </p>
      </section>

      {/* Theory — points down into the deep research, papers, and constitution. */}
      <section id="proof-theory" className={s.section}>
        <p className={s.sectionLabel}>{rs.classTheoryTitle}</p>
        <h2 className={s.h2}>{rs.classTheoryBlurb}</h2>
        <p className={s.paragraph}>
          <Link href={lh("/constitution")}>{rs.theoryConstitutionCta} →</Link>
        </p>
        <p className={s.paragraph}>
          <Link href={lh("/papers")}>{rs.engineeringAllPapers}</Link>
        </p>
        <p className={s.paragraph}>
          <Link href={lh("/research-status")}>{rs.proofResearchCta} →</Link>
        </p>
      </section>

      {/* Compliance — the live regulatory mapping (/compliance graph). */}
      <section id="proof-compliance" className={s.section}>
        <p className={s.sectionLabel}>{rs.complianceEyebrow}</p>
        <h2 className={s.h2}>{rs.complianceH2}</h2>
        <p className={s.paragraph}>{rs.complianceBody}</p>
        <div className={s.notice}>
          <p>{rs.complianceFrameworks}</p>
        </div>
        <p className={s.paragraph}>
          <Link href={lh("/compliance")}>{rs.complianceCta} →</Link>
        </p>
      </section>

      {/* Transparency — signed, open records; links to traces, Lens, dataset, research. */}
      <section id="proof-transparency" className={s.section}>
        <p className={s.sectionLabel}>{rs.classTransparencyTitle}</p>
        <h2 className={s.h2}>{rs.classTransparencyBlurb}</h2>
        <p className={s.paragraph}>
          <Link href={lh("/ciris-scoring")}>{rs.heroCtaTrace} →</Link>
        </p>
        <p className={s.paragraph}>
          <a href="https://huggingface.co/datasets/CIRISAI/reasoning-traces" target="_blank" rel="noopener noreferrer">
            {rs.datasetTitle} →
          </a>
        </p>
        <p className={s.paragraph}>
          <a href="https://github.com/CIRISAI/CIRISLens" target="_blank" rel="noopener noreferrer">
            {rs.heroCtaLens} →
          </a>
        </p>
        <p className={s.paragraph}>
          <Link href={lh("/research-status")}>{rs.proofResearchCta} →</Link>
        </p>
      </section>
    </ContentShell>
  );
}
