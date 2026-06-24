// v2 "dark-blueprint" /compare page. Renders the same t.compare.* dictionary
// keys the old CompareContent did — no copy is rewritten or re-translated here —
// inside the reusable ContentShell (cyan accent, no hero graphic). The page's
// structure (three AI types, seven requirements, the landscape comparison
// matrix, architecture layers, research status, the try-it CTA) is mapped onto
// the shared content.module vocabulary: sectionLabel/h2 headers, paragraphs,
// callouts, and the accent card variants. The wide comparison matrix gets its
// own co-located dark table styles (compare-v2.module.css). Existing links,
// rows, and CTAs are preserved verbatim.
//
// Strings that carry typographic emphasis (<strong>/<em>/inline <a>) are stored
// as HTML in the dictionary and injected with dangerouslySetInnerHTML. The
// content is authored and machine-translated by us (never user input), so this
// is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import table from "@/app/components/compare-v2.module.css";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function CompareV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.compare;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={c.heroSubheadline}
      title={c.h1}
      lede={c.heroDescription}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Three Types of AI */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.threeTypesTagline}</p>
        <h2 className={s.h2}>{c.threeTypesHeading}</h2>
        <p className={s.paragraph}>{c.threeTypesPara}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>
              {c.type1Number}. {c.type1Heading}
            </h3>
            <p>
              {c.type1Para}
              <br />
              <em>{c.type1Note}</em>
              <br />
              <b>{c.type1Warning}</b>
            </p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>
              {c.type2Number}. {c.type2Heading}
            </h3>
            <p>
              {c.type2Para}
              <br />
              <b>{c.type2Warning}</b>
            </p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>
              {c.type3Number}. {c.type3Heading}
            </h3>
            <p>
              {c.type3Para}
              <br />
              <b>{c.type3Badge}</b>
            </p>
          </div>
        </div>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(c.threeTypesClosingHtml)} />
      </section>

      {/* Seven Things — intro */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.sevenThingsSubheadline}</p>
        <h2 className={s.h2}>{c.sevenThingsHeadline}</h2>
        <p className={s.paragraph}>{c.sevenThingsCopy}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              <Link href={lh("/sections/main/v1")}>{c.card1Headline}</Link>
            </h3>
            <p>{c.card1Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{c.card2Headline}</h3>
            <p>{c.card2Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{c.card3Headline}</h3>
            <p>{c.card3Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{c.card4Headline}</h3>
            <p>{c.card4Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{c.card5Headline}</h3>
            <p>{c.card5Copy}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.card6Headline}
              </a>
            </h3>
            <p>{c.card6Copy}</p>
          </div>
        </div>
      </section>

      {/* The Seventh Requirement — Echo Chamber Detection */}
      <div className={`${s.callout} ${s.violet}`}>
        <p className={s.sectionLabel}>
          {c.req7Number} · {c.req7Subheading}
        </p>
        <h2 className={s.h2}>{c.req7Heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(c.req7Para)} />
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{c.req7NoisyLabel}</h3>
            <p>{c.req7NoisyDesc}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{c.req7HealthyLabel}</h3>
            <p>{c.req7HealthyDesc}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{c.req7EchoLabel}</h3>
            <p>{c.req7EchoDesc}</p>
          </div>
        </div>
        <p className={s.footnote}>
          {c.req7FooterText}
          {"  ·  "}
          <Link href={lh("/coherence-ratchet")}>{c.req7MathLink}</Link>
        </p>
      </div>

      {/* Landscape Comparison Matrix */}
      <section className={s.section} id="landscape">
        <p className={s.sectionLabel}>{c.landscapeSeparatorSubheadline}</p>
        <h2 className={s.h2}>{c.landscapeSeparatorHeadline}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(c.landscapeDisclaimer)} />

        <div className={table.tableWrap}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.colProject}>{c.tableHeaderProject}</th>
                <th>{c.tableHeaderChecksEvery}</th>
                <th>{c.tableHeaderPublishedRules}</th>
                <th>{c.tableHeaderConscience}</th>
                <th>{c.tableHeaderProof}</th>
                <th>{c.tableHeaderOpenSource}</th>
                <th className={table.colEcho}>{c.tableHeaderEcho}</th>
              </tr>
            </thead>
            <tbody>
              <tr className={table.rowHero}>
                <td className={table.colProject}>
                  <a href="https://github.com/CIRISAI/CIRISAgent">{c.rowCiris}</a>
                </td>
                <td>{c.rowCirisChecks}</td>
                <td>{c.rowCirisRules}</td>
                <td>{c.rowCirisConscience}</td>
                <td>{c.rowCirisProof}</td>
                <td>{c.rowCirisOpenSource}</td>
                <td className={table.colEcho}>{c.rowCirisEcho}</td>
              </tr>
              <tr>
                <td className={table.colProject}>{c.rowConstitutional}</td>
                <td data-tone="warn">{c.rowConstitutionalChecks}</td>
                <td data-tone="warn">{c.rowConstitutionalRules}</td>
                <td data-tone="bad">{c.rowConstitutionalConscience}</td>
                <td data-tone="bad">{c.rowConstitutionalProof}</td>
                <td data-tone="bad">{c.rowConstitutionalOpenSource}</td>
                <td data-tone="bad">{c.rowConstitutionalEcho}</td>
              </tr>
              <tr>
                <td className={table.colProject}>{c.rowLlama}</td>
                <td data-tone="ok">{c.rowLlamaChecks}</td>
                <td data-tone="bad">{c.rowLlamaRules}</td>
                <td data-tone="bad">{c.rowLlamaConscience}</td>
                <td data-tone="warn">{c.rowLlamaProof}</td>
                <td data-tone="ok">{c.rowLlamaOpenSource}</td>
                <td data-tone="bad">{c.rowLlamaEcho}</td>
              </tr>
              <tr>
                <td className={table.colProject}>
                  <a href="https://github.com/p0ss/HatCat">{c.rowHatcat}</a>
                </td>
                <td data-tone="ok">{c.rowHatcatChecks}</td>
                <td data-tone="warn">{c.rowHatcatRules}</td>
                <td data-tone="warn">{c.rowHatcatConscience}</td>
                <td data-tone="warn">{c.rowHatcatProof}</td>
                <td data-tone="ok">{c.rowHatcatOpenSource}</td>
                <td data-tone="bad">{c.rowHatcatEcho}</td>
              </tr>
              <tr>
                <td className={table.colProject}>{c.rowEthicsBoards}</td>
                <td data-tone="bad">{c.rowEthicsBoardsChecks}</td>
                <td data-tone="ok">{c.rowEthicsBoardsRules}</td>
                <td data-tone="bad">{c.rowEthicsBoardsConscience}</td>
                <td data-tone="warn">{c.rowEthicsBoardsProof}</td>
                <td data-tone="neutral">{c.rowEthicsBoardsOpenSource}</td>
                <td data-tone="bad">{c.rowEthicsBoardsEcho}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{c.tableFootnote}</p>
      </section>

      {/* Architecture Layers */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.layersSeparatorSubheadline}</p>
        <h2 className={s.h2}>{c.layersSeparatorHeadline}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{c.layersCard1Headline}</h3>
            <p>{c.layersCard1Copy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{c.layersCard2Headline}</h3>
            <p>{c.layersCard2Copy}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{c.layersCard3Headline}</h3>
            <p>{c.layersCard3Copy}</p>
          </div>
        </div>
      </section>

      {/* Many Agents, No Single Point of Failure */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.manyAgentsSeparatorSubheadline}</p>
        <h2 className={s.h2}>{c.manyAgentsSeparatorHeadline}</h2>
        <p className={s.paragraph}>{c.noSPOFCopy}</p>
        <p className={s.footnote}>
          <Link href={lh("/coherence-ratchet")}>{c.noSPOFLinkText}</Link>
        </p>
      </section>

      {/* Research Status */}
      <div className={`${s.callout} ${s.brass}`}>
        <h2 className={s.h2}>{c.researchHeading}</h2>
        <p className={s.paragraph}>{c.researchPara}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{c.researchEstablishedLabel}</h3>
            <p>
              {c.researchEstablishedItem1}
              <br />
              {c.researchEstablishedItem2}
              <br />
              {c.researchEstablishedItem3}
              <br />
              {c.researchEstablishedItem4}
            </p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{c.researchTestingLabel}</h3>
            <p>
              {c.researchTestingItem1}
              <br />
              {c.researchTestingItem2}
              <br />
              {c.researchTestingItem3}
              <br />
              {c.researchTestingItem4}
            </p>
          </div>
        </div>
        <p className={s.footnote}>
          <Link href={lh("/proof")}>{c.researchLink}</Link>
        </p>
      </div>

      {/* Try It Yourself */}
      <section className={s.cta}>
        <h2 className={s.h2}>{c.tryHeading}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <Link href={lh("/explore-a-trace")} className={`${s.card} ${s.cCyan}`}>
            <h3>{c.tryWatchHeading}</h3>
            <p>
              {c.tryWatchDesc} <span>{c.tryWatchCta}</span>
            </p>
          </Link>
          <Link href={lh("/trust")} className={`${s.card} ${s.cCyan}`}>
            <h3>{c.tryVerifyHeading}</h3>
            <p>
              {c.tryVerifyDesc} <span>{c.tryVerifyCta}</span>
            </p>
          </Link>
          <Link href={lh("/first-contact")} className={`${s.card} ${s.cCyan}`}>
            <h3>{c.tryStartHeading}</h3>
            <p>
              {c.tryStartDesc} <span>{c.tryStartCta}</span>
            </p>
          </Link>
        </div>
        <div className={s.ctaRow}>
          <a
            href="https://apps.apple.com/us/app/cirisagent/id6758524415"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {c.tryIOSLabel}
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {c.tryAndroidLabel}
          </a>
          <Link href={lh("/install")} className={`${s.btn} ${s.btnS}`}>
            {c.tryDesktopLabel}
          </Link>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {c.trySourceLabel}
          </a>
        </div>
      </section>

      {/* Closing CTA (former image hero) */}
      <section className={s.cta}>
        <p className={s.sectionLabel}>{c.imageHeroSubheadline}</p>
        <p className={s.ctaPara}>{c.imageHeroHeadline}</p>
        <p className={s.paragraph}>{c.imageHeroCopy}</p>
        <div className={s.ctaRow}>
          <a
            href="https://github.com/CIRISAI/CIRISAgent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnP}`}
          >
            {c.imageHeroButtonText}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
