// "CIRIS vs X" comparison page (/compare/microsoft-agent-governance), localized.
// Concession-forward, fixed-criteria: the same eight criteria score both subjects
// from public sources, every cell cited. Prose from t.msCompare (29 locales); the
// cell values, tones, and citation URLs stay in code. CIRIS stays honest at
// "partial" on independent verification.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import table from "@/app/components/compare-v2.module.css";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;
const TONE: Record<string, string> = { yes: "ok", partial: "warn", no: "bad" };

// Order matches t.msCompare.criteria. Per-criterion cell values + citations.
const META: Array<{ ciris: string; ms: string; cirisU: string; cirisT: string; msU: string; msT: string }> = [
  { ciris: "yes", ms: "yes", cirisT: "CIRISAgent conscience_execution.py (H3ERE runtime gate)", cirisU: "https://github.com/CIRISAI/CIRISAgent", msT: "Agent Control Specification (8 intervention points)", msU: "https://microsoft.github.io/agent-governance-toolkit/packages/agent-control-specification/" },
  { ciris: "yes", ms: "partial", cirisT: "CIRISAgent audit (hash-chained + PQC-signed), CIRISConformance test_320", cirisU: "https://github.com/CIRISAI/CIRISConformance", msT: "ADR-0017 Merkle Audit Chain (spec; signing not confirmed in public docs)", msU: "https://microsoft.github.io/agent-governance-toolkit/packages/agent-control-specification/" },
  { ciris: "yes", ms: "yes", cirisT: "CIRISVerify hybrid Ed25519 + ML-DSA-65, 2-of-3 multi-source", cirisU: "https://github.com/CIRISAI/CIRISVerify", msT: "Agent Mesh DID identity (Ed25519) + Entra Agent ID", msU: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-for-ai-agents/" },
  { ciris: "yes", ms: "partial", cirisT: "CIRISVerify HUMANITY_ACCORD (fail-secure 2-of-3 named-human quorum)", cirisU: "https://github.com/CIRISAI/CIRISVerify", msT: "Agent SRE emergency termination + Entra identity disable (reversible)", msU: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-for-ai-agents/" },
  { ciris: "yes", ms: "partial", cirisT: "CIRISConstitution (CC 0.4) binds every action; enforced via the conformance suite", cirisU: "https://github.com/CIRISAI/CIRISConstitution", msT: "Operator-authored YAML/Rego/Cedar policy; documented default_action: allow (ADR-0006)", msU: "https://microsoft.github.io/agent-governance-toolkit/packages/agent-control-specification/" },
  { ciris: "partial", ms: "partial", cirisT: "Verifiable by design (walk the signed log) + conformance suite; external audits as needed", cirisU: "https://github.com/CIRISAI/CIRISConformance", msT: "OpenSSF Scorecard / Best Practices badges (supply-chain hygiene, not decision verification)", msU: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-for-ai-agents/" },
  { ciris: "yes", ms: "yes", cirisT: "AGPL-3.0 (network copyleft): CIRISAgent, CIRISVerify, CIRISConformance", cirisU: "https://github.com/CIRISAI/CIRISAgent/blob/main/LICENSE", msT: "MIT: microsoft/agent-governance-toolkit", msU: "https://github.com/microsoft/agent-governance-toolkit" },
  { ciris: "yes", ms: "partial", cirisT: "CIRIS app on Apple App Store + Google Play today", cirisU: "https://ciris.ai/install", msT: 'Toolkit README: "Public Preview" (not yet GA)', msU: "https://github.com/microsoft/agent-governance-toolkit" },
];

export default function CompareMicrosoftV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.msCompare;
  const lh = (href: string) => localizeHref(href, locale);
  const val: Record<string, string> = { yes: c.valYes, partial: c.valPartial, no: c.valNo };

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={c.kicker}
      title={c.title}
      lede={c.lede}
      backHref="/compare"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.sectionLabel}</p>
        <div className={table.tableWrap}>
          <table className={`${table.table} ${table.cuTable}`}>
            <thead>
              <tr>
                <th className={table.colProject}>{c.colCriterion}</th>
                <th>{c.colCiris}</th>
                <th>{c.colMs}</th>
              </tr>
            </thead>
            <tbody>
              {c.criteria.map((crit, i) => (
                <tr key={crit}>
                  <td className={table.colProject}>{crit}</td>
                  <td data-tone={TONE[META[i].ciris]}>{val[META[i].ciris]}</td>
                  <td data-tone={TONE[META[i].ms]}>{val[META[i].ms]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{c.footnote}</p>

        <details className={table.sources}>
          <summary>{c.sourcesLabel}</summary>
          <ol>
            {c.criteria.map((crit, i) => (
              <li key={crit}>
                <span className={table.srcRow}>{crit}</span>
                <a href={META[i].cirisU} {...A}>CIRIS: {META[i].cirisT}</a>
                {"  ·  "}
                <a href={META[i].msU} {...A}>Microsoft: {META[i].msT}</a>
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{c.concLabel}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{c.msTitle}</h3>
            <p>{c.msBody}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{c.cirisTitle}</h3>
            <p>{c.cirisBody}</p>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <p className={s.ctaPara}>{c.ctaPara}</p>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnP}`} href={lh("/compare")}>{c.btnLandscape}</Link>
          <a className={`${s.btn} ${s.btnS}`} href="https://github.com/CIRISAI/CIRISAgent" {...A}>{c.btnCirisGh}</a>
          <a className={`${s.btn} ${s.btnS}`} href="https://github.com/microsoft/agent-governance-toolkit" {...A}>{c.btnMsGh}</a>
        </div>
      </section>
    </ContentShell>
  );
}
