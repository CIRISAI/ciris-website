// v2 "dark-blueprint" safety-vs-censorship page. Renders the same
// t.safetyVsCensorship.* dictionary keys the old SafetyVsCensorshipContent did
// — no copy is rewritten or re-translated here — inside the reusable
// ContentShell. The maxim is mapped onto a callout, the "where this can still
// fail" passage onto the warning-toned notice, and the closing CTAs onto the
// shared button row. Existing links/CTAs are preserved verbatim.
//
// Strings that carry typographic emphasis (<em>/<strong>/entities) are stored as
// HTML in the dictionary and injected with dangerouslySetInnerHTML. The content
// is authored and machine-translated by us (never user input), so this is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function SafetyVsCensorshipV2({ t, locale }: { t: Dictionary; locale: string }) {
  const sc = t.safetyVsCensorship;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="rose"
      kicker={sc.heroEyebrow}
      title={sc.h1}
      lede={sc.heroPara}
      backHref="/"
      backLabel="back to the lobby"
      mtBanner={t.common.mtBanner}
    >
      {/* The failure mode */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.failureModeHeading}</h2>
        <p className={s.paragraph}>{sc.failureModeP1}</p>
        <p className={s.paragraph}>{sc.failureModeP2}</p>
      </section>

      {/* The maxim */}
      <div className={s.callout}>
        <h2 className={s.h2}>{sc.maximHeading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(sc.maximParaHtml)} />
      </div>

      {/* What this means in practice */}
      <section className={s.section}>
        <h2 className={s.h2}>{sc.practiceHeading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(sc.practiceP1Html)} />
        <p className={s.paragraph} dangerouslySetInnerHTML={h(sc.practiceP2Html)} />
      </section>

      {/* Where this can still fail */}
      <div className={s.notice}>
        <h2 className={s.h2}>{sc.stillWrongHeading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(sc.stillWrongParaHtml)} />
      </div>

      {/* Closing */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{sc.closingPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/safety")} className={`${s.btn} ${s.btnP}`}>
            {sc.ctaSafety}
          </Link>
          <Link href={lh("/federation")} className={`${s.btn} ${s.btnS}`}>
            {sc.ctaFederation}
          </Link>
          <a
            href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {sc.ctaFsd}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
