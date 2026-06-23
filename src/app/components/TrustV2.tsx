// v2 "dark-blueprint" trust page. Renders the same t.trust.* dictionary keys the
// old TrustContent did — no copy is rewritten or re-translated here — inside the
// reusable ContentShell, with the accountable signed-action federation graphic
// (g03, teal accent). The page's content (DMV three-pillars, multi-source
// validation, unified attestation cards, the 0–5 attestation levels, CIRISPortal,
// identity-activation pricing tiers, post-quantum readiness, platform support, and
// the closing CTAs) is mapped onto the shared content.module vocabulary:
// sectionLabel/h2 headers, paragraphs, callouts, and the accent card variants.
// Every existing link / CTA is preserved verbatim.
//
// Strings that carry typographic emphasis (<em>/<b>) are stored as HTML in the
// dictionary and injected with dangerouslySetInnerHTML. The content is authored
// and machine-translated by us (never user input), so this is safe.

import type { Dictionary } from "@/i18n/dictionaries";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function TrustV2({ t, locale }: { t: Dictionary; locale: string }) {
  const tr = t.trust;

  return (
    <ContentShell
      locale={locale}
      accent="teal"
      kicker={tr.headerSubheadline}
      title={tr.headerHeadline}
      lede={tr.headerDescription}
      graphicId="g03"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Header CTAs */}
      <section className={s.cta}>
        <div className={s.ctaRow}>
          <a href="https://portal.ciris.ai" className={`${s.btn} ${s.btnP}`}>
            {tr.headerButtonText}
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISVerify"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {tr.headerLinkText}
          </a>
        </div>
      </section>

      {/* DMV Analogy - Three Pillars */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.pillarsEyebrow}</p>
        <h2 className={s.h2}>{tr.pillarsH2}</h2>
        <p className={s.lead}>{tr.pillarsLead}</p>
        <p className={s.paragraph}>{tr.pillarsBody}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              {tr.pillar1Label} · <span dangerouslySetInnerHTML={h(tr.pillar1Title)} />
            </h3>
            <p>
              <b dangerouslySetInnerHTML={h(tr.pillar1Sub)} />
              <br />
              <span dangerouslySetInnerHTML={h(tr.pillar1Body)} />
            </p>
            <p className={s.footnote}>{tr.pillar1Note}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              {tr.pillar2Label} · <span dangerouslySetInnerHTML={h(tr.pillar2Title)} />
            </h3>
            <p>
              <b dangerouslySetInnerHTML={h(tr.pillar2Sub)} />
              <br />
              {tr.pillar2Body}
            </p>
            <p className={s.footnote}>{tr.pillar2Note}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              {tr.pillar3Label} · <span dangerouslySetInnerHTML={h(tr.pillar3Title)} />
            </h3>
            <p>
              <b dangerouslySetInnerHTML={h(tr.pillar3Sub)} />
              <br />
              {tr.pillar3Body}
            </p>
            <p className={s.footnote}>{tr.pillar3Note}</p>
          </div>
        </div>
      </section>

      {/* Multi-Source Validation */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.multiSourceSubheadline}</p>
        <h2 className={s.h2}>{tr.multiSourceHeadline}</h2>
        <p className={s.paragraph}>{tr.multiSourceCopy}</p>
      </section>

      {/* Unified Attestation */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.unifiedAttestationSubheadline}</p>
        <h2 className={s.h2}>{tr.unifiedAttestationHeadline}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{tr.card1Headline}</h3>
            <p>{tr.card1Copy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{tr.card2Headline}</h3>
            <p>{tr.card2Copy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{tr.card3Headline}</h3>
            <p>{tr.card3Copy}</p>
          </div>
        </div>
      </section>

      {/* Attestation Levels */}
      <section className={s.section}>
        <h2 className={s.h2}>{tr.attestationLevelsH3}</h2>
        <p className={s.paragraph}>{tr.attestationLevelsSub}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>5 · {tr.level5Meaning}</h3>
            <p>{tr.level5Desc}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>4 · {tr.level4Meaning}</h3>
            <p>{tr.level4Desc}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>3 · {tr.level3Meaning}</h3>
            <p>{tr.level3Desc}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>2 · {tr.level2Meaning}</h3>
            <p>{tr.level2Desc}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>1 · {tr.level1Meaning}</h3>
            <p>{tr.level1Desc}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>0 · {tr.level0Meaning}</h3>
            <p>{tr.level0Desc}</p>
          </div>
        </div>
      </section>

      {/* CIRISPortal */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.portalSubheadline}</p>
        <h2 className={s.h2}>{tr.portalHeadline}</h2>
      </section>

      {/* Agent Administration */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.agentAdminSubheadline}</p>
        <h2 className={s.h2}>{tr.agentAdminHeadline}</h2>
        <p className={s.paragraph}>{tr.agentAdminCopy}</p>
        <div className={s.ctaRow}>
          <a href="https://portal.ciris.ai" className={`${s.btn} ${s.btnP}`}>
            {tr.agentAdminButtonText}
          </a>
        </div>
      </section>

      {/* Portal feature cards (4–9) */}
      <section className={s.section}>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card4Headline}</h3>
            <p>{tr.card4Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card5Headline}</h3>
            <p>{tr.card5Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card6Headline}</h3>
            <p>{tr.card6Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card7Headline}</h3>
            <p>{tr.card7Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card8Headline}</h3>
            <p>{tr.card8Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.card9Headline}</h3>
            <p>{tr.card9Copy}</p>
          </div>
        </div>
      </section>

      {/* Identity Activation Pricing */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.identityActivationSubheadline}</p>
        <h2 className={s.h2}>{tr.identityActivationHeadline}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {/* Community */}
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{tr.tierCommunityName}</h3>
            <p>
              <b>{tr.tierCommunityPrice}</b> · {tr.tierCommunityPriceSub}
              <br />
              {tr.tierCommunityIssuance} {tr.tierCommunityIssuanceVal}
              <br />
              {tr.tierCommunityBond} {tr.tierCommunityBondVal}
              <br />
              {tr.tierCommunityMonthly} {tr.tierCommunityMonthlyVal}
              <br />
              {tr.tierCommunityAgentLimit}
              <br />
              ✓ {tr.tierCommunityFeature1}
              <br />
              ✓ {tr.tierCommunityFeature2}
              <br />
              ✓ {tr.tierCommunityFeature3}
              <br />
              ✓ {tr.tierCommunityFeature4}
            </p>
            <p>
              <a href="https://portal.ciris.ai" className={`${s.btn} ${s.btnP}`}>
                {tr.tierCommunityBtn}
              </a>
            </p>
          </div>

          {/* Professional */}
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{tr.tierProfessionalName}</h3>
            <p>
              <b>{tr.tierProfessionalPrice}</b> · {tr.tierProfessionalPriceSub}
              <br />
              {tr.tierProfessionalIssuance} {tr.tierProfessionalIssuanceVal}
              <br />
              {tr.tierProfessionalBond} {tr.tierProfessionalBondVal}
              <br />
              {tr.tierProfessionalMonthly} {tr.tierProfessionalMonthlyVal}
              <br />
              {tr.tierProfessionalAgentLimit}
              <br />
              ✓ {tr.tierProfessionalFeature1}
              <br />
              ✓ {tr.tierProfessionalFeature2}
              <br />
              ✓ {tr.tierProfessionalFeature3}
              <br />
              ✓ {tr.tierProfessionalFeature4}
            </p>
            <p>
              <a
                href="mailto:sales@ciris.ai?subject=Professional%20Tier%20Inquiry"
                className={`${s.btn} ${s.btnS}`}
              >
                {tr.tierProfessionalBtn}
              </a>
            </p>
          </div>

          {/* Enterprise */}
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{tr.tierEnterpriseName}</h3>
            <p>
              <b>{tr.tierEnterprisePrice}</b> · {tr.tierEnterprisePriceSub}
              <br />
              {tr.tierEnterpriseIssuance} {tr.tierEnterpriseIssuanceVal}
              <br />
              {tr.tierEnterpriseBond} {tr.tierEnterpriseBondVal}
              <br />
              {tr.tierEnterpriseMonthly} {tr.tierEnterpriseMonthlyVal}
              <br />
              {tr.tierEnterpriseAgentLimit}
              <br />
              ✓ {tr.tierEnterpriseFeature1}
              <br />
              ✓ {tr.tierEnterpriseFeature2}
              <br />
              ✓ {tr.tierEnterpriseFeature3}
              <br />
              ✓ {tr.tierEnterpriseFeature4}
            </p>
            <p>
              <a
                href="mailto:sales@ciris.ai?subject=Enterprise%20Tier%20Inquiry"
                className={`${s.btn} ${s.btnS}`}
              >
                {tr.tierEnterpriseBtn}
              </a>
            </p>
          </div>

          {/* Safety-Critical */}
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{tr.tierSafetyCriticalName}</h3>
            <p>
              <b>{tr.tierSafetyCriticalPrice}</b> · {tr.tierSafetyCriticalPriceSub}
              <br />
              {tr.tierSafetyCriticalIssuance} {tr.tierSafetyCriticalIssuanceVal}
              <br />
              {tr.tierSafetyCriticalBond} {tr.tierSafetyCriticalBondVal}
              <br />
              {tr.tierSafetyCriticalMonthly} {tr.tierSafetyCriticalMonthlyVal}
              <br />
              {tr.tierSafetyCriticalAgentLimit}
              <br />
              ✓ {tr.tierSafetyCriticalFeature1}
              <br />
              ✓ {tr.tierSafetyCriticalFeature2}
              <br />
              ✓ {tr.tierSafetyCriticalFeature3}
              <br />
              ✓ {tr.tierSafetyCriticalFeature4}
            </p>
            <p>
              <a
                href="mailto:sales@ciris.ai?subject=Safety-Critical%20Tier%20Inquiry"
                className={`${s.btn} ${s.btnS}`}
              >
                {tr.tierSafetyCriticalBtn}
              </a>
            </p>
          </div>
        </div>

        {/* Pricing Explainer */}
        <div className={s.callout}>
          <h2 className={s.h2}>{tr.pricingExplainerH3}</h2>
          <div className={s.cardGrid}>
            <div className={`${s.card} ${s.cTeal}`}>
              <h3>{tr.pricingIssuanceFeeH4}</h3>
              <p>{tr.pricingIssuanceFeeCopy}</p>
            </div>
            <div className={`${s.card} ${s.cTeal}`}>
              <h3>{tr.pricingIdentityBondH4}</h3>
              <p>{tr.pricingIdentityBondCopy}</p>
            </div>
            <div className={`${s.card} ${s.cTeal}`}>
              <h3>{tr.pricingMonthlyAssuranceH4}</h3>
              <p>{tr.pricingMonthlyAssuranceCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Quantum Cryptography */}
      <div className={s.callout}>
        <h2 className={s.h2}>{tr.pqReadyH2}</h2>
        <p className={s.paragraph}>{tr.pqReadyBody}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{tr.pqClassicalLabel}</h3>
            <p>{tr.pqClassicalVal}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{tr.pqPostQuantumLabel}</h3>
            <p>{tr.pqPostQuantumVal}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{tr.pqTransparencyLabel}</h3>
            <p>{tr.pqTransparencyVal}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{tr.pqAntiRollbackLabel}</h3>
            <p>{tr.pqAntiRollbackVal}</p>
          </div>
        </div>
      </div>

      {/* Platform Support */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{tr.platformSubheadline}</p>
        <h2 className={s.h2}>{tr.platformHeadline}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3 dangerouslySetInnerHTML={h(tr.platformDesktopH4)} />
            <p>
              ✓ {tr.platformDesktopItem1}
              <br />
              ✓ {tr.platformDesktopItem2}
              <br />
              ✓ {tr.platformDesktopItem3}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{tr.platformMobileH4}</h3>
            <p>
              ✓ {tr.platformMobileItem1}
              <br />
              ✓ {tr.platformMobileItem2}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3 dangerouslySetInnerHTML={h(tr.platformPythonH4)} />
            <p>
              <code>pip install ciris-verify</code>
              <br />
              {tr.platformPythonNote}
            </p>
          </div>
        </div>
      </section>

      {/* Closing Philosophy + CTAs */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{tr.closingBody}</p>
        <div className={s.ctaRow}>
          <a
            href="https://portal.ciris.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {tr.closingBtnPortal}
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISVerify"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {tr.closingBtnSource}
          </a>
          <a href="mailto:sales@ciris.ai" className={`${s.btn} ${s.btnS}`}>
            {tr.closingBtnContact}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
