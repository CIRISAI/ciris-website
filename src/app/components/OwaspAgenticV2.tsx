// "How CIRIS does Y" mapping page (/compliance/owasp-agentic-top-10), localized.
// Maps the published OWASP Top 10 for Agentic Applications (genai.owasp.org, Dec
// 2025) to the CIRIS mechanism addressing each, with an honest coverage level and
// a citation per row. Prose comes from t.owasp (29 locales); the row IDs, coverage
// levels, tones, and citation URLs stay in code. Coverage was set by a
// producer+skeptic pass: ASI02/ASI03 lifted to partial only after the CIRISServer
// delegation evidence survived a separate-context skeptic.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import table from "@/app/components/compare-v2.module.css";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;
const TONE: Record<string, string> = { full: "ok", partial: "warn", roadmap: "bad", none: "bad" };
const OWASP = "https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/";

// Structural data, order matches t.owasp.rows. id + coverage + primary source.
const META: Array<{ id: string; cov: string; cite: { t: string; u: string } }> = [
  { id: "ASI01", cov: "partial", cite: { t: "CIRISAgent skill-import SECURITY.md + conscience pipeline", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/services/skill_import/SECURITY.md" } },
  { id: "ASI02", cov: "partial", cite: { t: "CIRISServer auth/gate.rs + DELEGATION_CONSTRAINTS.md (shipped 0.5.72)", u: "https://github.com/CIRISAI/CIRISServer/blob/main/FSD/DELEGATION_CONSTRAINTS.md" } },
  { id: "ASI03", cov: "partial", cite: { t: "CIRISServer auth/gate.rs (never-list, tighten-only) + adoption plan", u: "https://github.com/CIRISAI/CIRISServer/blob/main/src/auth/gate.rs" } },
  { id: "ASI04", cov: "partial", cite: { t: "CIRISVerify Threat Model, §3.4 Supply Chain", u: "https://github.com/CIRISAI/CIRISVerify/blob/main/docs/THREAT_MODEL.md" } },
  { id: "ASI05", cov: "partial", cite: { t: "CIRISAgent conscience/core.py (semantic action gates)", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/conscience/core.py" } },
  { id: "ASI06", cov: "partial", cite: { t: "CIRISAgent ciris_engine (governed graph memory)", u: "https://github.com/CIRISAI/CIRISAgent" } },
  { id: "ASI07", cov: "partial", cite: { t: "CIRISEdge README (verify-before-dispatch pipeline)", u: "https://github.com/CIRISAI/CIRISEdge/blob/main/README.md" } },
  { id: "ASI08", cov: "full", cite: { t: "CIRISAgent circuit_breaker.py + CIRISServer measured mesh isolation", u: "https://github.com/CIRISAI/CIRISAgent" } },
  { id: "ASI09", cov: "partial", cite: { t: "CIRISAgent epistemic-humility conscience prompt", u: "https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/logic/conscience/prompts/epistemic_humility_conscience.yml" } },
  { id: "ASI10", cov: "partial", cite: { t: "CIRISVerify HUMANITY_ACCORD kill switch + conscience pipeline", u: "https://github.com/CIRISAI/CIRISVerify" } },
];

export default function OwaspAgenticV2({ t, locale }: { t: Dictionary; locale: string }) {
  const o = t.owasp;
  const lh = (href: string) => localizeHref(href, locale);
  const covLabel: Record<string, string> = { full: o.covFull, partial: o.covPartial, roadmap: o.covRoadmap, none: o.covNone };

  return (
    <ContentShell
      locale={locale}
      accent="teal"
      kicker={o.kicker}
      title={o.title}
      lede={o.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      <div className={s.callout}>
        <p className={s.paragraph}>{o.callout}</p>
      </div>

      <section className={s.section}>
        <div className={table.tableWrap}>
          <table className={`${table.table} ${table.rwTable}`}>
            <thead>
              <tr>
                <th className={table.colText}>{o.colRisk}</th>
                <th>{o.colCoverage}</th>
                <th className={table.colText}>{o.colHow}</th>
              </tr>
            </thead>
            <tbody>
              {o.rows.map((row, i) => {
                const m = META[i];
                return (
                  <tr key={m.id}>
                    <td className={`${table.colText} ${table.colApproach}`}>
                      <a href={OWASP} {...A}>{m.id}</a> {row.name}
                    </td>
                    <td data-tone={TONE[m.cov]}>{covLabel[m.cov]}</td>
                    <td className={table.colText}>{row.how}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{o.footnote}</p>

        <details className={table.sources}>
          <summary>{o.sourcesLabel}</summary>
          <ol>
            {o.rows.map((row, i) => (
              <li key={META[i].id}>
                <span className={table.srcRow}>{META[i].id} {row.name}</span>
                <a href={META[i].cite.u} {...A}>{META[i].cite.t}</a>
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section className={s.cta}>
        <p className={s.ctaPara}>{o.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnP}`} href={lh("/compare")}>{o.btnLandscape}</Link>
          <Link className={`${s.btn} ${s.btnS}`} href={lh("/security/post-quantum-kill-switch")}>{o.btnVerify}</Link>
          <a className={`${s.btn} ${s.btnS}`} href={OWASP} {...A}>{o.btnOwasp}</a>
        </div>
      </section>
    </ContentShell>
  );
}
