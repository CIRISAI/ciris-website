// "How CIRIS does Y" mapping page (/compliance/eu-ai-act), localized. Maps the EU
// AI Act high-risk articles (adopted Regulation (EU) 2024/1689 numbering) to the
// shipped CIRIS mechanism, re-derived against the canonical CIRISConstitution and
// skeptic-confirmed. Prose from t.euAiAct (29 locales); citation URLs stay in code.
// Carries no compliance grade: the Constitution's Annex C marks these mappings
// "informative, pending legal review", so this is an engineering correspondence.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import table from "@/app/components/compare-v2.module.css";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;

// Order matches t.euAiAct.rows. Primary code/doc citation per article.
const CITES: Array<{ t: string; u: string }> = [
  { t: "CIRISAgent DMA pipeline + Constitution Annex D (CRE)", u: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/dma" },
  { t: "CIRISAgent SignedAuditService (hash chain + signing)", u: "https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/audit" },
  { t: "CIRISAgent reasoning-trace API + Constitution PDMA Step 6", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/adapters/api" },
  { t: "CIRISAgent DeferHandler + Constitution CC 7.5.3.1 autonomy tiers", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/handlers/control" },
  { t: "CIRISVerify PQC signer + CIRISServer measured robustness", u: "https://github.com/CIRISAI/CIRISVerify/blob/main/src/ciris-keyring/src/pqc.rs" },
  { t: "CIRISAgent conscience gate + defer routing", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/handlers/control" },
  { t: "CIRISAgent adapter disclosure + Constitution C2PA profile", u: "https://github.com/CIRISAI/CIRISAgent" },
  { t: "CIRISLens monitoring + Constitution Annex H", u: "https://github.com/CIRISAI/CIRISLens" },
];

export default function EuAiActV2({ t, locale }: { t: Dictionary; locale: string }) {
  const eu = t.euAiAct;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="violet"
      kicker={eu.kicker}
      title={eu.title}
      lede={eu.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      <div className={`${s.callout} ${s.violet}`}>
        <p className={s.paragraph}>
          {eu.bannerA}<strong>{eu.bannerStrong}</strong>{eu.bannerB}
        </p>
      </div>

      <section className={s.section}>
        <div className={table.tableWrap}>
          <table className={`${table.table} ${table.rwTable}`}>
            <thead>
              <tr>
                <th className={table.colText}>{eu.colArticle}</th>
                <th className={table.colText}>{eu.colRequires}</th>
                <th className={table.colText}>{eu.colHow}</th>
              </tr>
            </thead>
            <tbody>
              {eu.rows.map((row) => (
                <tr key={row.art}>
                  <td className={`${table.colText} ${table.colApproach}`}>{row.art}</td>
                  <td className={table.colText}>{row.requires}</td>
                  <td className={table.colText}>{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{eu.footnote}</p>

        <details className={table.sources}>
          <summary>{eu.sourcesLabel}</summary>
          <ol>
            {eu.rows.map((row, i) => (
              <li key={row.art}>
                <span className={table.srcRow}>{row.art}</span>
                <a href={CITES[i].u} {...A}>{CITES[i].t}</a>
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section className={s.cta}>
        <p className={s.ctaPara}>{eu.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnP}`} href={lh("/compliance/owasp-agentic-top-10")}>{eu.btnOwasp}</Link>
          <Link className={`${s.btn} ${s.btnS}`} href={lh("/compare")}>{eu.btnLandscape}</Link>
          <a className={`${s.btn} ${s.btnS}`} href="https://github.com/CIRISAI/CIRISConstitution" {...A}>{eu.btnConstitution}</a>
        </div>
      </section>
    </ContentShell>
  );
}
