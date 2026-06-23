// v2 "dark-blueprint" first-contact page. Renders the same t.firstContact.*
// dictionary keys the old FirstContactContent did — no copy is rewritten or
// re-translated here — inside the reusable ContentShell (cyan accent, matching
// the page's brand-primary hero). The body (two paths, the idea, six protocols,
// quickstart for phone + desktop, the Accord, and the closing CTA) is mapped
// onto the shared content.module vocabulary: sectionLabel/h2 headers,
// paragraphs, accent cards, callout, notice, and the CTA row. All links and
// CTAs are preserved verbatim.
//
// Strings that carry inline links or typographic emphasis are stored as HTML in
// the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function FirstContactV2({ t, locale }: { t: Dictionary; locale: string }) {
  const fc = t.firstContact;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={fc.heroSubheadline}
      title={fc.heroHeadline}
      lede={fc.heroDescription}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Two paths */}
      <section className={s.section}>
        <h2 className={s.h2}>{fc.twoPathsHeading}</h2>
        <p className={s.paragraph}>{fc.twoPathsBody}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.card1Heading}</h3>
            <p>{fc.card1Body}</p>
            <p>
              <a href="#quickstart">{fc.card1Cta}</a>
            </p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{fc.card2Heading}</h3>
            <p>{fc.card2Body}</p>
            <p>
              <Link href={lh("/vision")}>{fc.card2Cta}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* The idea, in short */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{fc.ideaEyebrow}</p>
        <h2 className={s.h2}>{fc.ideaHeading}</h2>
        <p className={s.paragraph}>{fc.ideaP1}</p>
        <p className={s.paragraph}>{fc.ideaP2}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(fc.ideaP3Html)} />
      </section>

      {/* First-contact protocols */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{fc.protocolsSepHeadline}</p>
        <h2 className={s.h2}>{fc.protocolsSepSub}</h2>
        <p className={s.paragraph}>{fc.protocolsIntroPara}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol1Headline}</h3>
            <p>{fc.protocol1Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol2Headline}</h3>
            <p>{fc.protocol2Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol3Headline}</h3>
            <p>{fc.protocol3Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol4Headline}</h3>
            <p>{fc.protocol4Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol5Headline}</h3>
            <p>{fc.protocol5Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{fc.protocol6Headline}</h3>
            <p>{fc.protocol6Copy}</p>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className={s.section}>
        <p className={s.sectionLabel}>{fc.quickstartSepHeadline}</p>
        <h2 className={s.h2}>{fc.quickstartSepSub}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{fc.phoneHeading}</h3>
            <p>{fc.phoneBody}</p>
            <p className={s.footnote}>
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fc.googlePlayLink}
              </a>
              {"  ·  "}
              <a
                href="https://apps.apple.com/us/app/cirisagent/id6758524415"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fc.appStoreLink}
              </a>
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{fc.desktopHeading}</h3>
            <p>{fc.desktopBody}</p>
            <p>
              <code>pip install ciris-agent</code>
            </p>
            <p>
              <code># Configure and run</code>
              <br />
              <code>ciris-agent start --template sage --verbose</code>
            </p>
            <p className={s.footnote}>
              <Link href={lh("/install")}>{fc.fullGuideLink}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* The Accord */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{fc.accordSepHeadline}</p>
        <h2 className={s.h2}>{fc.accordSepSub}</h2>
        <p className={s.paragraph}>{fc.accordBody}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/sections/main")} className={`${s.btn} ${s.btnP}`}>
            {fc.accordCtaRead}
          </Link>
          <Link href={lh("/how-it-works")} className={`${s.btn} ${s.btnS}`}>
            {fc.accordCtaHow}
          </Link>
          <Link href={lh("/trust")} className={`${s.btn} ${s.btnS}`}>
            {fc.accordCtaTrust}
          </Link>
        </div>
      </div>

      {/* CTA */}
      <section className={s.cta}>
        <h2 className={s.h2}>{fc.ctaHeadline}</h2>
        <p className={s.ctaPara}>{fc.ctaSubheadline}</p>
        <p className={s.ctaPara}>{fc.ctaCopy}</p>
        <div className={s.ctaRow}>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {fc.ctaButtonText}
          </a>
          <a
            href="https://discord.gg/SWGM7Gsvrv"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {fc.ctaLinkText}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
