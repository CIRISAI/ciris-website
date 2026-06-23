// v2 "dark-blueprint" services page. Renders the SAME t.services.* dictionary
// keys the old ServicesContent did — no copy is rewritten or re-translated here —
// inside the reusable ContentShell. Accent is "ok" (green), matching the page's
// headline "mobile app now available" / privacy-first beats; the pricing block is
// tinted violet and the Scout/privacy/billing cards are mapped onto the v2 accent
// card variants. All links/CTAs (Scout, App Store, Google Play, GitHub, /install)
// are preserved.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function ServicesV2({ t, locale }: { t: Dictionary; locale: string }) {
  const sv = t.services;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="ok"
      kicker="CIRIS Services"
      title={sv.heroHeading}
      lede={sv.heroSub}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Try CIRIS now — Scout preview */}
      <div className={s.callout}>
        <h2 className={s.h2}>{sv.tryCirisHeading}</h2>
        <p className={s.paragraph}>{sv.tryCirisPara}</p>
        <div className={s.ctaRow}>
          <a
            href="https://scout.ciris.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {sv.tryCirisCta}
          </a>
        </div>
      </div>

      {/* Mobile app — now available */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sv.mobileAvailableBadge}</p>
        <h2 className={s.h2}>{sv.mobileHeading}</h2>
        <p className={s.paragraph}>{sv.mobilePara}</p>
        <div className={s.ctaRow}>
          <a
            href="https://apps.apple.com/us/app/cirisagent/id6758524415"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {sv.appStoreLabel}
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {sv.googlePlayLabel}
          </a>
        </div>
        <p className={s.footnote}>
          {sv.mobileSourcePre}{" "}
          <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer">
            {sv.mobileSourceLink}
          </a>
        </p>
      </section>

      {/* Hero note */}
      <div className={s.notice}>
        <p>{sv.heroNote}</p>
      </div>

      {/* Privacy-first */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sv.privacyHeading}</p>
        <h2 className={s.h2}>{sv.privacyHeading}</h2>
        <p className={s.paragraph}>{sv.privacyPara}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{sv.privacyLogLabel}</h3>
            <p>
              {sv.privacyLog1}
              <br />
              {sv.privacyLog2}
              <br />
              {sv.privacyLog3}
              <br />
              {sv.privacyLog4}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sv.privacyNoLogLabel}</h3>
            <p>
              {sv.privacyNoLog1}
              <br />
              {sv.privacyNoLog2}
              <br />
              {sv.privacyNoLog3}
              <br />
              {sv.privacyNoLog4}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div className={`${s.callout} ${s.violet}`}>
        <p className={s.sectionLabel}>{sv.pricingHeading}</p>
        <h2 className={s.h2}>$0.10</h2>
        <p className={s.paragraph}>{sv.pricingUnit}</p>
        <p className={s.paragraph}>{sv.pricingNote}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(sv.pricingStripeHtml)} />
      </div>

      {/* Billing model */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sv.billingHeadline}</p>
        <h2 className={s.h2}>{sv.billingHeadline}</h2>
        <p className={s.paragraph}>{sv.billingSubheadline}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sv.billingCard1Headline}</h3>
            <p>{sv.billingCard1Copy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{sv.billingCard2Headline}</h3>
            <p>{sv.billingCard2Copy}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{sv.billingCard3Headline}</h3>
            <p>{sv.billingCard3Copy}</p>
          </div>
        </div>
      </section>

      {/* Priority order */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{sv.priorityHeading}</p>
        <h2 className={s.h2}>{sv.priorityHeading}</h2>
        <p className={s.paragraph}>{sv.priorityPara}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{sv.priority1Label}</h3>
            <p>{sv.priority1Sub}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{sv.priority2Label}</h3>
            <p>{sv.priority2Sub}</p>
          </div>
          <div className={`${s.card} ${s.cViolet}`}>
            <h3>{sv.priority3Label}</h3>
            <p>{sv.priority3Sub}</p>
          </div>
        </div>
      </section>

      {/* Technical details */}
      <section className={s.section}>
        <p className={s.sectionLabel}>API</p>
        <h2 className={s.h2}>{sv.techHeading}</h2>
        <div className={s.cardGrid}>
          <div className={s.card}>
            <h3>{sv.techDetail1Summary}</h3>
            <p>{sv.techDetail1Para}</p>
            <p className={s.footnote}>https://proxy.ciris.ai/v1/chat/completions</p>
          </div>
          <div className={s.card}>
            <h3>{sv.techDetail2Summary}</h3>
            <p>{sv.techDetail2Para}</p>
            <p className={s.footnote}>Authorization: Bearer YOUR_API_KEY</p>
          </div>
          <div className={s.card}>
            <h3>{sv.techDetail3Summary}</h3>
            <p>
              {sv.techDetail3Para}
              <br />
              {sv.techDetail3Item1}
              <br />
              {sv.techDetail3Item2}
              <br />
              {sv.techDetail3Item3}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{sv.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/install")} className={`${s.btn} ${s.btnP}`}>
            {sv.ctaBtn}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
