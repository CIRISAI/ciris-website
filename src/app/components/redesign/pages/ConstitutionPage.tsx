// The redesigned front door for the CIRIS Constitution (/constitution), built
// from designs/constitution.dc.html on the shared RdShell.
//
// The edition shown and linked is whatever scripts/publish_constitution_edition.py
// published into public/ (src/lib/constitutionEdition.ts); the design's own
// edition number is not used. Everything the previous page (ConstitutionV2)
// carried stays here, from the `constitution` namespace: the M-1 apex, the
// eight parts with their source files, the fold-in note, the foreword line,
// the read/download CTAs and the contextual-integrity cross-link. The new
// design's copy lives in `constitutionPage`.
//
// Left out on purpose (owner questions, handoff section 10): the design's
// "which code enforces which part" matrix, which must come from the
// Constitution repo's consumer map rather than the design's placeholder.
//
// A server component: withEdition reads the published edition at build time.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import { CONSTITUTION_VERSION, withEdition } from "@/lib/constitutionEdition";
import RdShell from "../RdShell";
import { shellCopy } from "../shellCopy";
import s from "../rd.module.css";
import p from "./ConstitutionPage.module.css";

const REPO = "https://github.com/CIRISAI/CIRISConstitution";
const CONST_DIR = `${REPO}/tree/main/constitution`;
// Self-hosted so the read CTA downloads the reader PDF directly.
const PDF = "/ciris_constitution.pdf";
// The wire volume is hosted beside the full edition; the index links the rest
// at the release tag of the published edition.
const WIRE_PDF = "/ciris_constitution-wire.pdf";
const VOLUMES = `${REPO}/blob/v${CONSTITUTION_VERSION}/volumes/README.md`;

// Per-part source files, in the same order as constitution.parts.
const PART_FILES = [
  "part_1_foundation.md",
  "part_2_the_grammar.md",
  "part_3_the_namespace.md",
  "part_4_composition_governance.md",
  "part_5_transport_substrate.md",
  "part_6_the_coherence_mathematics.md",
  "part_7_lifecycle_stewardship.md",
  "part_8_appendices.md",
];

// Index of "The Wire" in constitutionPage.volumes: the one volume hosted here.
const WIRE_VOLUME = 3;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function ConstitutionPage({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.constitution;
  const d = t.constitutionPage;
  const ci = t.contextualIntegrity;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <RdShell t={shellCopy(t)} locale={locale}>
      {/* Hero: the question, and the edition this site publishes. */}
      <section aria-labelledby="const-h1" className={`${s.sec} ${p.hero}`}>
        <div className={p.heroText}>
          <p className={`${s.px} ${p.pxKicker}`}>{withEdition(c.eyebrow)}</p>
          <h1 id="const-h1" className={p.h1}>
            {d.h1}
          </h1>
          <p className={s.lede}>{d.lede}</p>
        </div>
        <div className={p.edition}>
          <p className={`${s.mono} ${p.editionLabel}`}>{d.editionLabel}</p>
          <p className={`${s.mono} ${p.editionNum}`} dir="ltr">
            {CONSTITUTION_VERSION}
          </p>
          <p className={p.editionNote}>{d.editionNote}</p>
          <div className={p.editionCtas}>
            <a href={PDF} download className={`${p.pill} ${p.pillPrimary}`}>
              {c.readCta}
            </a>
            <a href={VOLUMES} {...ext} className={p.pill}>
              {c.volumesCta}
            </a>
          </div>
        </div>
      </section>

      {/* The apex: Meta-Goal M-1, in the site's existing wording. */}
      <section aria-labelledby="const-apex" className={s.sec}>
        <div className={p.apex}>
          <h2 id="const-apex" className={`${s.mono} ${p.monoKicker}`}>
            {c.apexLabel}
          </h2>
          <blockquote className={p.apexQuote}>{c.apexQuote}</blockquote>
          <p className={p.apexNote}>{c.apexNote}</p>
        </div>
      </section>

      {/* How it is organized: the six themes, then the eight parts of the text. */}
      <section aria-labelledby="const-parts" className={s.sec}>
        <p className={`${s.mono} ${p.monoKicker}`}>{d.partsKicker}</p>
        <h2 id="const-parts" className={s.h2s}>
          {d.partsTitle}
        </h2>
        <div className={s.grid3}>
          {Object.values(d.parts).map((part, i) => (
            <div key={part.t} className={p.part}>
              <p className={`${s.mono} ${p.partNum}`} dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className={p.partTitle}>{part.t}</h3>
              <p className={p.partKey}>{part.k}</p>
              <p className={p.partBody}>{part.d}</p>
            </div>
          ))}
        </div>

        <div className={p.eight}>
          <h3 className={`${s.mono} ${p.monoKicker}`}>{c.partsLabel}</h3>
          <ol className={p.eightList}>
            {c.parts.map((part, i) => (
              <li key={part.n}>
                <a href={`${REPO}/blob/main/constitution/${PART_FILES[i]}`} {...ext} className={p.eightItem}>
                  <span className={`${s.mono} ${p.eightNum}`} dir="ltr">
                    {part.n}
                  </span>
                  <span>
                    <span className={p.eightTitle}>{part.title}</span>
                    <span className={p.eightBlurb}>{part.blurb}</span>
                  </span>
                  <span aria-hidden="true" className={p.eightArrow}>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The eleven promises. */}
      <section aria-labelledby="const-promises" className={s.sec}>
        <div className={p.inverse}>
          <p className={`${s.px} ${p.goldKicker}`}>{d.promisesKicker}</p>
          <h2 id="const-promises" className={p.promTitle}>
            {d.promisesTitle}
          </h2>
          <ol className={p.promList}>
            {Object.values(d.promises).map((text, i) => (
              <li key={i} className={p.prom}>
                <span className={`${s.mono} ${p.promNum}`} dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
          <figure className={p.foreword}>
            <blockquote className={p.forewordQuote}>{c.forewordQuote}</blockquote>
            <figcaption className={`${s.mono} ${p.forewordLabel}`}>{c.forewordLabel}</figcaption>
          </figure>
        </div>
      </section>

      {/* One document, one version line: what was folded in. */}
      <section aria-labelledby="const-folded" className={s.sec}>
        <div className={p.folded}>
          <div>
            <h2 id="const-folded" className={s.h2s}>
              {c.headline}
            </h2>
            <p className={`${s.body} ${p.foldedIntro}`}>{c.intro}</p>
          </div>
          <div>
            <h3 className={`${s.mono} ${p.monoKicker}`}>{c.foldedTitle}</h3>
            <p className={`${s.body} ${p.foldedBody}`}>{c.foldedBody}</p>
            <p className={`${s.mono} ${p.versionNote}`}>{withEdition(c.versionNote)}</p>
          </div>
        </div>
      </section>

      {/* Nine volumes. Only the wire volume is hosted; the rest are listed in the index. */}
      <section aria-labelledby="const-vol" className={s.sec}>
        <h2 id="const-vol" className={s.h2s}>
          {d.volumesTitle}
        </h2>
        <div className={p.vols}>
          {Object.values(d.volumes).map((v, i) =>
            i === WIRE_VOLUME ? (
              <a key={v.t} href={WIRE_PDF} download className={p.vol}>
                <span className={p.volTitle}>{v.t}</span>
                <span className={p.volBody}>{v.d}</span>
              </a>
            ) : (
              <a key={v.t} href={VOLUMES} {...ext} className={p.vol}>
                <span className={p.volTitle}>{v.t}</span>
                <span className={p.volBody}>{v.d}</span>
              </a>
            ),
          )}
        </div>
      </section>

      {/* Read it: the downloads and the source, then the concept cross-link. */}
      <section aria-labelledby="const-read" className={s.sec}>
        <h2 id="const-read" className={`${s.mono} ${p.monoKicker}`}>
          {d.readKicker}
        </h2>
        <div className={p.readRow}>
          <a href={PDF} download className={s.btnPrimary}>
            {c.readCta}
          </a>
          <a href={WIRE_PDF} download className={s.btnSecondary}>
            {c.wireCta}
          </a>
          <a href={VOLUMES} {...ext} className={s.btnSecondary}>
            {c.volumesCta}
          </a>
          <a href={CONST_DIR} {...ext} className={s.btnSecondary}>
            {c.sourceCta}
          </a>
          <Link href={lh("/philosophy")} className={s.btnSecondary}>
            {t.philosophy.crossCta}
          </Link>
        </div>

        <div className={`${s.card} ${p.ci}`}>
          <h3 className={s.cardTitle}>{ci.crossTitle}</h3>
          <p className={s.cardBody}>{ci.crossBody}</p>
          <Link href={lh("/contextual-integrity")} className={s.more}>
            {ci.crossCta}
          </Link>
        </div>
      </section>
    </RdShell>
  );
}
