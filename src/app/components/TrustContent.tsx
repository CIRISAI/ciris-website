"use client";
// Shared /trust body, driven by a per-locale dictionary. Both the English
// root (src/app/trust/page.tsx) and the localized routes
// (src/app/[locale]/trust/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<em>/<b>) are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe.

import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function TrustContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  const tr = t.trust;

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
      <HomeHeader
        headline={tr.headerHeadline}
        subheadline={tr.headerSubheadline}
        description={tr.headerDescription}
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/andrew-roberts-euBRXcx57T4-unsplash.jpg"
        buttonText={tr.headerButtonText}
        buttonHref="https://portal.ciris.ai"
        linkText={tr.headerLinkText}
        linkHref="https://github.com/CIRISAI/CIRISVerify"
      />

      {/* DMV Analogy - Three Pillars */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-2">
            {tr.pillarsEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {tr.pillarsH2}
          </h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            {tr.pillarsLead}
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {tr.pillarsBody}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">{tr.pillar1Label}</span>
                <h3 className="text-xl font-bold text-brand-primary" dangerouslySetInnerHTML={h(tr.pillar1Title)} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm" dangerouslySetInnerHTML={h(tr.pillar1Sub)} />
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4" dangerouslySetInnerHTML={h(tr.pillar1Body)} />
              <p className="text-xs text-brand-primary font-medium">
                {tr.pillar1Note}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">{tr.pillar2Label}</span>
                <h3 className="text-xl font-bold text-brand-primary" dangerouslySetInnerHTML={h(tr.pillar2Title)} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm" dangerouslySetInnerHTML={h(tr.pillar2Sub)} />
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {tr.pillar2Body}
              </p>
              <p className="text-xs text-brand-primary font-medium">
                {tr.pillar2Note}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">{tr.pillar3Label}</span>
                <h3 className="text-xl font-bold text-brand-primary" dangerouslySetInnerHTML={h(tr.pillar3Title)} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm" dangerouslySetInnerHTML={h(tr.pillar3Sub)} />
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {tr.pillar3Body}
              </p>
              <p className="text-xs text-brand-primary font-medium">
                {tr.pillar3Note}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        {/* Multi-Source Validation */}
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.multiSourceHeadline}
          subheadline={tr.multiSourceSubheadline}
          copyText={tr.multiSourceCopy}
        />

        {/* Unified Attestation */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.unifiedAttestationHeadline}
          subheadline={tr.unifiedAttestationSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: tr.card1Headline,
              copyText: tr.card1Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card2Headline,
              copyText: tr.card2Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card3Headline,
              copyText: tr.card3Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Attestation Levels Table */}
        <div className="my-12 px-4 md:px-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {tr.attestationLevelsH3}
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {tr.attestationLevelsSub}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm max-w-2xl mx-auto">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-3 text-left font-bold text-brand-primary">{tr.tableColLevel}</th>
                  <th className="p-3 text-left font-bold text-brand-primary">{tr.tableColMeaning}</th>
                  <th className="p-3 text-left font-bold text-brand-primary">{tr.tableColDesc}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-3 font-bold text-green-600">5</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level5Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level5Desc}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-green-600">4</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level4Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level4Desc}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-yellow-500">3</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level3Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level3Desc}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-yellow-500">2</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level2Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level2Desc}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-red-500">1</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level1Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level1Desc}</td>
                </tr>
                <tr className="bg-red-50 dark:bg-red-900/20">
                  <td className="p-3 font-bold text-red-600">0</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{tr.level0Meaning}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{tr.level0Desc}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CIRISPortal Section */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.portalHeadline}
          subheadline={tr.portalSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.agentAdminHeadline}
          subheadline={tr.agentAdminSubheadline}
          copyText={tr.agentAdminCopy}
          buttonText={tr.agentAdminButtonText}
          buttonHref="https://portal.ciris.ai"
        />

        <CardsSection
          cardsData={[
            {
              headline: tr.card4Headline,
              copyText: tr.card4Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card5Headline,
              copyText: tr.card5Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card6Headline,
              copyText: tr.card6Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: tr.card7Headline,
              copyText: tr.card7Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card8Headline,
              copyText: tr.card8Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: tr.card9Headline,
              copyText: tr.card9Copy,
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Identity Activation Pricing */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.identityActivationHeadline}
          subheadline={tr.identityActivationSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="my-12 px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Community */}
            <div className="rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-6 ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-gray-900">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-1">{tr.tierCommunityName}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{tr.tierCommunityPrice}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierCommunityPriceSub}</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{tr.tierCommunityIssuance}</span>
                  <span>{tr.tierCommunityIssuanceVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{tr.tierCommunityBond}</span>
                  <span>{tr.tierCommunityBondVal}</span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 dark:border-emerald-800 pt-1">
                  <span>{tr.tierCommunityMonthly}</span>
                  <span className="font-semibold text-emerald-600">{tr.tierCommunityMonthlyVal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierCommunityAgentLimit}</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>{tr.tierCommunityFeature1}</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>{tr.tierCommunityFeature2}</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>{tr.tierCommunityFeature3}</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>{tr.tierCommunityFeature4}</li>
              </ul>

              <a
                href="https://portal.ciris.ai"
                className="mt-6 block w-full rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                {tr.tierCommunityBtn}
              </a>
            </div>

            {/* Professional */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">{tr.tierProfessionalName}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{tr.tierProfessionalPrice}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierProfessionalPriceSub}</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{tr.tierProfessionalIssuance}</span>
                  <span>{tr.tierProfessionalIssuanceVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{tr.tierProfessionalBond}</span>
                  <span>{tr.tierProfessionalBondVal}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>{tr.tierProfessionalMonthly}</span>
                  <span className="font-semibold">{tr.tierProfessionalMonthlyVal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierProfessionalAgentLimit}</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierProfessionalFeature1}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierProfessionalFeature2}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierProfessionalFeature3}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierProfessionalFeature4}</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Professional%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {tr.tierProfessionalBtn}
              </a>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">{tr.tierEnterpriseName}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{tr.tierEnterprisePrice}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierEnterprisePriceSub}</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{tr.tierEnterpriseIssuance}</span>
                  <span>{tr.tierEnterpriseIssuanceVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{tr.tierEnterpriseBond}</span>
                  <span>{tr.tierEnterpriseBondVal}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>{tr.tierEnterpriseMonthly}</span>
                  <span className="font-semibold">{tr.tierEnterpriseMonthlyVal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierEnterpriseAgentLimit}</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierEnterpriseFeature1}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierEnterpriseFeature2}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierEnterpriseFeature3}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierEnterpriseFeature4}</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Enterprise%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {tr.tierEnterpriseBtn}
              </a>
            </div>

            {/* Safety-Critical */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">{tr.tierSafetyCriticalName}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{tr.tierSafetyCriticalPrice}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierSafetyCriticalPriceSub}</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{tr.tierSafetyCriticalIssuance}</span>
                  <span>{tr.tierSafetyCriticalIssuanceVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{tr.tierSafetyCriticalBond}</span>
                  <span>{tr.tierSafetyCriticalBondVal}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>{tr.tierSafetyCriticalMonthly}</span>
                  <span className="font-semibold">{tr.tierSafetyCriticalMonthlyVal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tr.tierSafetyCriticalAgentLimit}</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierSafetyCriticalFeature1}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierSafetyCriticalFeature2}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierSafetyCriticalFeature3}</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>{tr.tierSafetyCriticalFeature4}</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Safety-Critical%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {tr.tierSafetyCriticalBtn}
              </a>
            </div>
          </div>

          {/* Pricing Explainer */}
          <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {tr.pricingExplainerH3}
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">{tr.pricingIssuanceFeeH4}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tr.pricingIssuanceFeeCopy}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">{tr.pricingIdentityBondH4}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tr.pricingIdentityBondCopy}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">{tr.pricingMonthlyAssuranceH4}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tr.pricingMonthlyAssuranceCopy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Quantum Cryptography */}
        <div className="my-12 rounded-lg border-4 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {tr.pqReadyH2}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {tr.pqReadyBody}
          </p>
          <div className="grid gap-4 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <strong className="text-gray-900 dark:text-white">{tr.pqClassicalLabel}</strong>
              <p>{tr.pqClassicalVal}</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{tr.pqPostQuantumLabel}</strong>
              <p>{tr.pqPostQuantumVal}</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{tr.pqTransparencyLabel}</strong>
              <p>{tr.pqTransparencyVal}</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{tr.pqAntiRollbackLabel}</strong>
              <p>{tr.pqAntiRollbackVal}</p>
            </div>
          </div>
        </div>

        {/* Platform Support */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline={tr.platformHeadline}
          subheadline={tr.platformSubheadline}
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="my-12 px-4 md:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3" dangerouslySetInnerHTML={h(tr.platformDesktopH4)} />
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>{tr.platformDesktopItem1}</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>{tr.platformDesktopItem2}</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>{tr.platformDesktopItem3}</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">{tr.platformMobileH4}</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>{tr.platformMobileItem1}</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>{tr.platformMobileItem2}</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3" dangerouslySetInnerHTML={h(tr.platformPythonH4)} />
              <div className="mb-3 rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-green-400">
                pip install ciris-verify
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tr.platformPythonNote}
              </p>
            </div>
          </div>
        </div>

        {/* Closing Philosophy */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            {tr.closingBody}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://portal.ciris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              {tr.closingBtnPortal}
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISVerify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              {tr.closingBtnSource}
            </a>
            <a
              href="mailto:sales@ciris.ai"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {tr.closingBtnContact}
            </a>
          </div>
        </div>
      </div>

      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
