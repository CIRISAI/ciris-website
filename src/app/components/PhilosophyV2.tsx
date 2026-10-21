// The philosophy page (/philosophy), localized. The h1 IS the philosophy:
// "We are owed as much as we offer to the least of us." — Eric's canonical
// one-line articulation (the beginning and end of NHI alignment, regardless
// of source). The page unpacks it: the floor as the measure, no border around
// "us", why one-way alignment defeats itself, relational personhood (Ubuntu,
// anti-Cartesian, Logos), truth by composition, and the eleven commitments
// the wire keeps (drawn from this page, /constitutional-mesh and
// /contextual-integrity; the plain-language rules under each live in
// CIRISConstitution review/pieces/00_guarantees_plain.md). Prose from t.philosophy
// (29 locales); button labels reuse already-translated strings where they
// exist. Hero art: g13 borrowed (the seal motif) until a bespoke graphic
// lands — same interim pattern as /contextual-integrity.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import en from "@/i18n/dictionaries/en.json";
import { localizeHref } from "@/i18n/config";
import PageShell from "@/app/components/PageShell";
import { contentStyles as s } from "@/app/components/v2/ContentShell";
import { CONSTITUTION_VERSION } from "@/lib/constitutionEdition";

type CKey = keyof typeof en.philosophy;
const COMMITMENT_KEYS: [CKey, CKey][] = [
  ["c1t", "c1b"], ["c2t", "c2b"], ["c3t", "c3b"], ["c4t", "c4b"], ["c5t", "c5b"],
  ["c6t", "c6b"], ["c7t", "c7b"], ["c8t", "c8b"], ["c9t", "c9b"], ["c10t", "c10b"],
  ["c11t", "c11b"],
];

// The plain-language rules these cards summarize, pinned to the commit they
// were drawn from so the link cannot rot when the branch moves or merges.
const RULES_PLAIN =
  "https://github.com/CIRISAI/CIRISConstitution/blob/" +
  "7189daca9aa5a73064cd0b6e08a395d513cd5796/review/pieces/00_guarantees_plain.md";
const RULES_EDITION = "CC 1.0-rc9";

export default function PhilosophyV2({ t, locale }: { t: Dictionary; locale: string }) {
  const p = t.philosophy;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <PageShell
      nav={t.homeHero}
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

      {/* 6 · The commitments — eleven, one card each. Keys c1t/c1b … c11t/c11b are
          flat strings so the localization lane can address them; until a
          locale's lane has run, a missing key falls back to the English
          string (the page carries the MT banner either way). */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{p.s6label}</p>
        <h2 className={s.h2}>{p.s6h2}</h2>
        <p className={s.paragraph}>
          {p.s6conscience ?? en.philosophy.s6conscience}
        </p>
        <p className={s.paragraph}>{p.s6intro}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {COMMITMENT_KEYS.map(([tk, bk], i) => (
            <div key={tk} className={`${s.card} ${s.cBrass}`}>
              <h3>{`${i + 1}. ${p[tk] ?? en.philosophy[tk]}`}</h3>
              <p>{p[bk] ?? en.philosophy[bk]}</p>
            </div>
          ))}
        </div>
        <p className={s.paragraph}>{p.s6outro ?? en.philosophy.s6outro}</p>

        {/* Not every promise is the same kind of promise: the ones that rest
            on courts, auditors, upstream providers or device vendors are aims,
            and the page says which before it says N1. */}
        <div className={s.notice}>
          <p className={s.sectionLabel}>{p.s6aspirationHead ?? en.philosophy.s6aspirationHead}</p>
          <p>{p.s6aspiration ?? en.philosophy.s6aspiration}</p>
        </div>

        {/* N1, the constitution's own precedence sentence: where anything on
            the site reads as more than this, this is what holds. */}
        <div className={s.notice}>
          <p className={s.sectionLabel}>{p.s6limitHead ?? en.philosophy.s6limitHead}</p>
          <p>{p.s6limit ?? en.philosophy.s6limit}</p>
        </div>

        <p className={s.footnote}>
          {RULES_EDITION} · review/pieces/00_guarantees_plain.md · released
          edition CC {CONSTITUTION_VERSION}
        </p>

        <div className={s.ctaRow}>
          <a
            href={RULES_PLAIN}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {p.btnRulesFull ?? en.philosophy.btnRulesFull}
          </a>
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
    </PageShell>
  );
}
