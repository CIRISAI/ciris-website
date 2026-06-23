// v2 "dark-blueprint" coherence-ratchet page (Plain English level). Renders the
// same t.coherenceRatchet.* dictionary keys the old SimpleContent did — no copy
// is rewritten here — inside the reusable ContentShell, with a violet accent.
// The Research-testbed badge, DOI link, simple↔advanced level pill, and the three
// closing CTAs (the math, explore a trace, see the code) are all preserved.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

function LevelPill({
  locale,
  levels,
}: {
  locale: string;
  levels: { simple: string; advanced: string; srLabel: string };
}) {
  const lh = (href: string) => localizeHref(href, locale);
  return (
    <div role="tablist" aria-label={levels.srLabel} className={s.levelPill}>
      <span className={`${s.levelTab} ${s.levelTabActive}`} role="tab" aria-selected="true">
        {levels.simple}
      </span>
      <Link
        className={s.levelTab}
        href={lh("/coherence-ratchet/advanced")}
        role="tab"
        aria-selected="false"
      >
        {levels.advanced}
      </Link>
    </div>
  );
}

export default function CoherenceRatchetV2({ t, locale }: { t: Dictionary; locale: string }) {
  const cr = t.coherenceRatchet;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="violet"
      kicker="The Coherence Ratchet"
      title="The Coherence Ratchet"
      lede="Why a powerful mind has to show its work."
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      <div className={s.section}>
        <LevelPill locale={locale} levels={t.common.levels} />
      </div>

      <div className={s.notice}>
        <p>
          Research testbed ·{" "}
          <a
            href="https://doi.org/10.5281/zenodo.18217688"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOI 10.5281/zenodo.18217688
          </a>
        </p>
      </div>

      <div className={s.section}>
        <p className={s.paragraph}>{cr.intro}</p>
      </div>

      <section className={s.section}>
        <p className={s.sectionLabel}>{cr.coherentLabel}</p>
        <h2 className={s.h2}>{cr.coherentH2}</h2>
        <p className={s.paragraph}>{cr.coherentListIntro}</p>
        <ul className={s.paragraph} style={{ marginLeft: "1.5rem", listStyle: "disc" }}>
          <li>{cr.coherentLi1}</li>
          <li>{cr.coherentLi2}</li>
          <li>{cr.coherentLi3}</li>
          <li>{cr.coherentLi4}</li>
          <li>{cr.coherentLi5}</li>
        </ul>
        <p className={s.paragraph}>{cr.coherentP2}</p>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{cr.hiddenLabel}</p>
        <h2 className={s.h2}>{cr.hiddenH2}</h2>
        <p className={s.paragraph}>{cr.hiddenP1}</p>
        <p className={s.paragraph}>{cr.hiddenP2}</p>
        <p className={s.paragraph}>{cr.hiddenP3}</p>
      </section>

      <div className={s.callout}>
        <p className={s.sectionLabel}>{cr.ratchetLabel}</p>
        <h2 className={s.h2}>{cr.ratchetH2}</h2>
        <p className={s.paragraph}>{cr.ratchetP1}</p>
        <p className={s.paragraph}>{cr.ratchetP2}</p>
        <p className={s.paragraph}>{cr.ratchetP3}</p>
        <p className={s.footnote}>{cr.ratchetP4Italic}</p>
      </div>

      <section className={s.section}>
        <p className={s.sectionLabel}>{cr.cirisLabel}</p>
        <h2 className={s.h2}>{cr.cirisH2}</h2>
        <p className={s.paragraph}>{cr.cirisP1}</p>
        <p className={s.paragraph}>{cr.cirisP2}</p>
        <p className={s.paragraph}>{cr.cirisP3}</p>
      </section>

      <div className={s.callout}>
        <h2 className={s.h2}>{cr.claimH2}</h2>
        <p className={s.paragraph}>{cr.claimP1}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(cr.claimP2Html)} />
      </div>

      <section className={s.cta}>
        <div className={s.ctaRow}>
          <Link href={lh("/coherence-collapse-analysis")} className={`${s.btn} ${s.btnP}`}>
            The math behind it
          </Link>
          <Link href={lh("/explore-a-trace")} className={`${s.btn} ${s.btnS}`}>
            Explore a trace
          </Link>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            See the code
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
