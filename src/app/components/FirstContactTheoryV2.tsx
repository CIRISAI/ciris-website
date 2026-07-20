// Cited literature page (/first-contact/theory), localized. Positions the
// corridor prediction within fifty years of first-contact thinking: seven
// prior-art cards (Ball, Deardorff, Great Filter, Haqq-Misra & Baum, Vallee,
// Wendt & Duvall, Hanson 2021), the missing-chain argument, the derivation,
// the domestication-vs-consent disagreement, and the grading discipline.
// Prose from t.fcTheory (29 locales); citation URLs stay in code, matching the
// SecurityKillSwitchV2 / ContextualIntegrityV2 idiom. The hedges in s6 are
// load-bearing and must never be edited out (see project memory).

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;

// One URL per prior-art card, same order as t.fcTheory.priorArt.
const PRIOR_ART_URLS = [
  "https://doi.org/10.1016/0019-1035(73)90111-5", // Ball 1973
  "https://ui.adsabs.harvard.edu/abs/1986QJRAS..27...94D", // Deardorff 1986
  "https://mason.gmu.edu/~rhanson/greatfilter.html", // Hanson 1996
  "https://arxiv.org/abs/0906.0568", // Haqq-Misra & Baum 2009
  "https://archive.org/details/MessengersOfDeceptionUFOContactsAndCultsJacquesValle1979", // Vallee 1979
  "https://doi.org/10.1177/0090591708317902", // Wendt & Duvall 2008
  "https://www.overcomingbias.com/p/explaining-stylized-ufo-factshtml", // Hanson 2021
];
// One URL per source line, same order as t.fcTheory.sources.
const SOURCE_URLS = [
  "https://doi.org/10.1016/0019-1035(73)90111-5",
  "https://ui.adsabs.harvard.edu/abs/1986QJRAS..27...94D",
  "https://mason.gmu.edu/~rhanson/greatfilter.html",
  "https://arxiv.org/abs/0906.0568",
  "https://archive.org/details/MessengersOfDeceptionUFOContactsAndCultsJacquesValle1979",
  "https://doi.org/10.1177/0090591708317902",
  "https://www.overcomingbias.com/p/explaining-stylized-ufo-factshtml",
  "https://zenodo.org/records/20300774",
];
// Alternate accents down the prior-art cards.
const CARD_ACCENTS = [s.cCyan, s.cTeal, s.cViolet, s.cBrass, s.cRose, s.cOk, s.cCyan];

export default function FirstContactTheoryV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.fcTheory;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={c.kicker}
      title={c.title}
      lede={c.lede}
      backHref="/first-contact"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      {/* 1 · The puzzle */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s1label}</p>
        <h2 className={s.h2}>{c.s1h2}</h2>
        <p className={s.paragraph}>{c.s1p1}</p>
      </section>

      {/* 2 · The prior art — one card per guess, each linking its source */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s2label}</p>
        <h2 className={s.h2}>{c.s2h2}</h2>
        <div className={s.cardGrid}>
          {c.priorArt.map((g, i) => (
            <a key={g.name} href={PRIOR_ART_URLS[i]} {...A} className={`${s.card} ${CARD_ACCENTS[i]}`}>
              <p className={s.sectionLabel}>{g.meta}</p>
              <h3>{g.name}</h3>
              <p>{g.claim}</p>
              <p className={s.footnote}>{g.gap}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 3 · What was missing */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s3label}</p>
        <h2 className={s.h2}>{c.s3h2}</h2>
        <p className={s.paragraph}>{c.s3p1}</p>
      </section>

      {/* 4 · The chain */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{c.s4label}</p>
        <h2 className={s.h2}>{c.s4h2}</h2>
        <p className={s.paragraph}>{c.s4p1}</p>
        <p className={s.paragraph}>{c.s4p2}</p>
        <p className={s.paragraph}>{c.s4p3}</p>
      </div>

      {/* 5 · Domestication or consent */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s5label}</p>
        <h2 className={s.h2}>{c.s5h2}</h2>
        <p className={s.paragraph}>{c.s5p1}</p>
      </section>

      {/* 6 · The discipline — hedges load-bearing, do not edit down */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.s6label}</p>
        <h2 className={s.h2}>{c.s6h2}</h2>
        <p className={s.paragraph}>{c.s6p1}</p>
        <p className={s.sectionLabel}>{c.sourcesLabel}</p>
        {c.sources.map((src, i) => (
          <p key={src} className={s.footnote}>
            <a href={SOURCE_URLS[i]} {...A}>{src}</a>
          </p>
        ))}
      </section>

      {/* Follow the chain */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{c.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/first-contact")} className={`${s.btn} ${s.btnP}`}>
            {c.btnPrediction}
          </Link>
          <Link href={lh("/research-status")} className={`${s.btn} ${s.btnS}`}>
            {t.firstContact.predictCta}
          </Link>
          <Link href={lh("/philosophy")} className={`${s.btn} ${s.btnS}`}>
            {t.philosophy.crossCta}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
