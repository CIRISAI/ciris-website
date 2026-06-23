// v2 "dark-blueprint" safety page. Renders the same t.safety.* dictionary keys
// the old SafetyContent did — no copy is rewritten or re-translated here —
// inside the reusable ContentShell. The linear safety body (long-chat reminders,
// emergency stop, roles, audit trail, testing surface, privacy) is mapped onto
// the shared content.module vocabulary: sectionLabel/h2 headers, paragraphs,
// callouts, accent card variants, footnote links, and the CTA row. Every
// existing link, CTA, and href is preserved verbatim. The safety dictionary has
// no reading-level toggle (it is a single linear page), so none is rendered.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

export default function SafetyV2({ t, locale }: { t: Dictionary; locale: string }) {
  const sf = t.safety;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="ok"
      graphicId="g11"
      kicker={sf.heroSubheadline}
      title={sf.heroHeadline}
      lede={sf.heroDescription}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Hero links: source + Accord */}
      <div className={s.section}>
        <p className={s.footnote}>
          <a href={sf.heroButtonHref} target="_blank" rel="noopener noreferrer">
            {sf.heroButtonText}
          </a>
          {"  ·  "}
          <Link href={lh(sf.heroLinkHref)}>{sf.heroLinkText}</Link>
        </p>
      </div>

      {/* When a chat has run long */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.longChatSubheadline}</p>
        <h2 className={s.h2}>{sf.longChatHeadline}</h2>
        <p className={s.paragraph}>{sf.longChatCopy}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.card30MinHeadline}</h3>
            <p>{sf.card30MinCopy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.card20MsgHeadline}</h3>
            <p>{sf.card20MsgCopy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.cardReminderHeadline}</h3>
            <p>{sf.cardReminderCopy}</p>
          </div>
        </div>
      </section>

      {/* The emergency stop */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.emergencyStopSepHeadline}</p>
        <h2 className={s.h2}>{sf.emergencyStopHeadline}</h2>
        <p className={s.paragraph}>{sf.emergencyStopSepSubheadline}</p>
        <p className={s.paragraph}>{sf.emergencyStopSubheadline}</p>
        <p className={s.paragraph}>{sf.emergencyStopCopy}</p>
        <p className={s.footnote}>
          <a href={sf.emergencyStopLinkHref} target="_blank" rel="noopener noreferrer">
            {sf.emergencyStopLinkText}
          </a>
        </p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{sf.cardActsBeforeThinkingHeadline}</h3>
            <p>{sf.cardActsBeforeThinkingCopy}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{sf.cardHiddenTextHeadline}</h3>
            <p>{sf.cardHiddenTextCopy}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{sf.cardAuthorizedKeyHeadline}</h3>
            <p>{sf.cardAuthorizedKeyCopy}</p>
          </div>
        </div>
      </section>

      {/* Who is allowed to do what — roles */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.rolesSepHeadline}</p>
        <h2 className={s.h2}>{sf.rolesHeadline}</h2>
        <p className={s.paragraph}>{sf.rolesSepSubheadline}</p>
        <p className={s.paragraph}>{sf.rolesSubheadline}</p>
        <p className={s.paragraph}>{sf.rolesCopy}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{sf.cardSignedCredHeadline}</h3>
            <p>{sf.cardSignedCredCopy}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{sf.cardDeviceLoginHeadline}</h3>
            <p>{sf.cardDeviceLoginCopy}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{sf.cardWiseAuthHeadline}</h3>
            <p>{sf.cardWiseAuthCopy}</p>
          </div>
        </div>
      </section>

      {/* The audit trail */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.auditSepHeadline}</p>
        <h2 className={s.h2}>{sf.auditHeadline}</h2>
        <p className={s.paragraph}>{sf.auditSepSubheadline}</p>
        <p className={s.paragraph}>{sf.auditSubheadline}</p>
        <p className={s.paragraph}>{sf.auditCopy}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{sf.cardStoredThreeWaysHeadline}</h3>
            <p>{sf.cardStoredThreeWaysCopy}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{sf.cardSignedAttributableHeadline}</h3>
            <p>{sf.cardSignedAttributableCopy}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>
              <Link href={lh(sf.cardCoherenceRatchetHref)}>{sf.cardCoherenceRatchetHeadline}</Link>
            </h3>
            <p>{sf.cardCoherenceRatchetCopy}</p>
          </div>
        </div>
      </section>

      {/* How safety is tested */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.testingSepHeadline}</p>
        <h2 className={s.h2}>{sf.testingHeadline}</h2>
        <p className={s.paragraph}>{sf.testingSepSubheadline}</p>
        <p className={s.paragraph}>{sf.testingSubheadline}</p>
        <p className={s.paragraph}>{sf.testingCopy}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sf.cardMentalHealthHeadline}</h3>
            <p>{sf.cardMentalHealthCopy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sf.cardCapturedHedgesHeadline}</h3>
            <p>{sf.cardCapturedHedgesCopy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sf.cardOpenCorpusHeadline}</h3>
            <p>{sf.cardOpenCorpusCopy}</p>
          </div>
        </div>
      </section>

      {/* What runs today */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{sf.testingCurrentSubheadline}</p>
        <h2 className={s.h2}>{sf.testingCurrentHeadline}</h2>
        <p className={s.paragraph}>{sf.testingCurrentCopy}</p>
        <p className={s.footnote}>
          <Link href={lh(sf.ctaCrowdsourcingHref)}>{sf.ctaCrowdsourcing}</Link>
          {"  ·  "}
          <a href={sf.ctaAutomatedTestsHref} target="_blank" rel="noopener noreferrer">
            {sf.ctaAutomatedTests}
          </a>
          {"  ·  "}
          <a href={sf.ctaOpenCorpusHref} target="_blank" rel="noopener noreferrer">
            {sf.ctaOpenCorpus}
          </a>
        </p>
      </div>

      {/* Privacy by design */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.privacySepHeadline}</p>
        <h2 className={s.h2}>{sf.privacySepHeadline}</h2>
        <p className={s.paragraph}>{sf.privacySepSubheadline}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.cardSecretsFilteredHeadline}</h3>
            <p>{sf.cardSecretsFilteredCopy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.cardSeeDeleteHeadline}</h3>
            <p>{sf.cardSeeDeleteCopy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sf.cardProcessedOnDeviceHeadline}</h3>
            <p>{sf.cardProcessedOnDeviceCopy}</p>
          </div>
        </div>
      </section>

      {/* Verify everything — closing */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sf.imageHeroSubheadline}</p>
        <h2 className={s.h2}>{sf.imageHeroHeadline}</h2>
        <p className={s.paragraph}>{sf.imageHeroCopy}</p>
        <p className={s.footnote}>
          <a href={sf.imageHeroButtonHref} target="_blank" rel="noopener noreferrer">
            {sf.imageHeroButtonText}
          </a>
        </p>
      </section>

      {/* CTA row */}
      <section className={s.cta}>
        <div className={s.ctaRow}>
          <Link href={lh(sf.footerCtaPapersHref)} className={`${s.btn} ${s.btnP}`}>
            {sf.footerCtaPapers}
          </Link>
          <Link href={lh(sf.footerCtaHowItWorksHref)} className={`${s.btn} ${s.btnS}`}>
            {sf.footerCtaHowItWorks}
          </Link>
          <Link href={lh(sf.footerCtaCompareHref)} className={`${s.btn} ${s.btnS}`}>
            {sf.footerCtaCompare}
          </Link>
          <Link href={lh(sf.footerCtaPrivacyHref)} className={`${s.btn} ${s.btnS}`}>
            {sf.footerCtaPrivacy}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
