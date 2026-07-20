// The philosophy page (/philosophy), localized. The h1 IS the philosophy:
// "We are owed as much as we offer to the least of us." — Eric's canonical
// one-line articulation (the beginning and end of NHI alignment, regardless
// of source). The page unpacks it: the floor as the measure, no border around
// "us", why one-way alignment defeats itself, relational personhood (Ubuntu,
// anti-Cartesian, Logos), truth by composition, and the derivations table
// showing each clause as a constitution mechanism. Prose from t.philosophy
// (29 locales); button labels reuse already-translated strings where they
// exist. Hero art: g13 borrowed (the seal motif) until a bespoke graphic
// lands — same interim pattern as /contextual-integrity.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

export default function PhilosophyV2({ t, locale }: { t: Dictionary; locale: string }) {
  const p = t.philosophy;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="brass"
      graphicId="g13"
      kicker={p.kicker}
      title={p.title}
      lede={p.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* 1 · The measure is the floor */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s1label}</p>
        <h2 className={s.h2}>{p.s1h2}</h2>
        <p className={s.paragraph}>{p.s1p1}</p>
        <p className={s.paragraph}>{p.s1p2}</p>
      </section>

      {/* 2 · No border, no them */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s2label}</p>
        <h2 className={s.h2}>{p.s2h2}</h2>
        <p className={s.paragraph}>{p.s2p1}</p>
        <p className={s.paragraph}>{p.s2p2}</p>
      </section>

      {/* 2b · Three origins, one constitution — why NHI unification is forced
          engineering (origin undecidable at contact; origin-branching invites
          origin fraud), not expansiveness. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.originsLabel}</p>
        <h2 className={s.h2}>{p.originsH2}</h2>
        <p className={s.paragraph}>{p.originsP1}</p>
        <p className={s.paragraph}>{p.originsP2}</p>
      </section>

      {/* 3 · Why one-way alignment fails */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{p.s3label}</p>
        <h2 className={s.h2}>{p.s3h2}</h2>
        <p className={s.paragraph}>{p.s3p1}</p>
        <p className={s.paragraph}>{p.s3p2}</p>
      </div>

      {/* 4 · Relational personhood: Ubuntu, anti-Cartesian, Logos */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s4label}</p>
        <h2 className={s.h2}>{p.s4h2}</h2>
        <p className={s.paragraph}>{p.s4p1}</p>
        <p className={s.paragraph}>{p.s4p2}</p>
        <p className={s.paragraph}>{p.s4p3}</p>
      </section>

      {/* 5 · Emergent epistemology */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s5label}</p>
        <h2 className={s.h2}>{p.s5h2}</h2>
        <p className={s.paragraph}>{p.s5p1}</p>
        <p className={s.paragraph}>{p.s5p2}</p>
      </section>

      {/* 6 · The sentence, enforced — one card per derivation */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s6label}</p>
        <h2 className={s.h2}>{p.s6h2}</h2>
        <p className={s.paragraph}>{p.s6intro}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {p.derivations.map((d) => (
            <div key={d.title} className={`${s.card} ${s.cBrass}`}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Read it in full */}
      <section className={s.cta}>
        <p className={s.ctaPara}>{p.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link href={lh("/constitution")} className={`${s.btn} ${s.btnP}`}>
            {t.contextualIntegrity.btnConstitution}
          </Link>
          <Link href={lh("/vision")} className={`${s.btn} ${s.btnS}`}>
            {p.btnVision}
          </Link>
          <Link href={lh("/first-contact")} className={`${s.btn} ${s.btnS}`}>
            {p.btnFirstContact}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
