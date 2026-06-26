// v2 "dark-blueprint" /compare page, organized around two clean dimensions:
//   01 Alignment   — where CIRIS sits in the superalignment landscape: the
//                    institutional/control branch, the anti-singleton stance,
//                    and a cited 14-row related-work matrix.
//   02 Consumer AI — how CIRIS compares to the assistants people actually use
//                    (ChatGPT, Gemini, Claude) on the accountability test.
// Copy comes from t.compare.landscape.* (localized to 29 locales); cell tones
// and citation URLs live in code (never localized). Built on ContentShell with
// co-located dark table styles (compare-v2.module.css).

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import table from "@/app/components/compare-v2.module.css";

// Related-work matrix: per-row status keys (tone-mapped in code, never
// localized). Order matches compare.landscape.rwRows in the dictionary. The
// CIRIS row (last) is the only one that fills every column.
// Columns measure accountability OF AI DECISIONS, not generic capability: a
// social/compute federation that signs posts (not decisions) and federates data
// (not accountability) must NOT read as a near-peer. Order matches the rendered
// columns and compare.landscape.rwRows.
const RW_STATUS: Array<{ runtime: string; crypto: string; constitution: string; federated: string; conformance: string; shipping: string }> = [
  // hadfield — the thesis, not a build
  { runtime: "theory", crypto: "no", constitution: "theory", federated: "theory", conformance: "no", shipping: "no" },
  // institutional-ai (Pierucci et al.) — governance graphs, research prototype
  { runtime: "research", crypto: "no", constitution: "research", federated: "no", conformance: "no", shipping: "no" },
  // agentcity — constitutional governance on-chain, pre-registered testnet
  { runtime: "research", crypto: "partial", constitution: "research", federated: "no", conformance: "no", shipping: "no" },
  // redwood (AI control)
  { runtime: "yes", crypto: "no", constitution: "no", federated: "no", conformance: "research", shipping: "research" },
  // gsai (davidad / Bengio / GS-AI)
  { runtime: "partial", crypto: "no", constitution: "theory", federated: "theory", conformance: "research", shipping: "no" },
  // cai (Anthropic Constitutional AI) — constitution=no, it is training-time
  { runtime: "no", crypto: "no", constitution: "no", federated: "no", conformance: "no", shipping: "yes" },
  // provenance (C2PA / zkML)
  { runtime: "yes", crypto: "partial", constitution: "no", federated: "partial", conformance: "partial", shipping: "yes" },
  // proof-of-insight (Arclio) — signed reasoning DAG, draft spec
  { runtime: "no", crypto: "partial", constitution: "no", federated: "theory", conformance: "theory", shipping: "no" },
  // tee-attested inference (Phala / Marlin / Attestable Audits)
  { runtime: "yes", crypto: "partial", constitution: "no", federated: "partial", conformance: "no", shipping: "partial" },
  // decentralized (atproto / Bittensor)
  { runtime: "partial", crypto: "no", constitution: "no", federated: "partial", conformance: "partial", shipping: "yes" },
  // protocols (MCP / A2A)
  { runtime: "yes", crypto: "no", constitution: "no", federated: "no", conformance: "partial", shipping: "yes" },
  // eval-suites (MLCommons / METR / HarmBench)
  { runtime: "no", crypto: "no", constitution: "no", federated: "no", conformance: "partial", shipping: "yes" },
  // audit-bodies (AISI Network / GovAI) — earns yes on federated verification
  { runtime: "partial", crypto: "no", constitution: "no", federated: "yes", conformance: "no", shipping: "partial" },
  // ciris — the only all-yes row; federated kept "yes" per founder, cited
  { runtime: "yes", crypto: "yes", constitution: "yes", federated: "yes", conformance: "yes", shipping: "yes" },
];

const RW_CITE: Array<{ primary: string; sources: Array<{ title: string; url: string }> }> = [
  // hadfield
  { primary: "https://arxiv.org/abs/2405.19328", sources: [
    { title: "Normative Modules: A Generative Agent Architecture for Learning Norms that Supports Mult", url: "https://arxiv.org/abs/2405.19328" },
    { title: "Regulatory Markets: The Future of AI Governance (arXiv 2304.04914)", url: "https://arxiv.org/abs/2304.04914" },
    { title: "Interview: Normative infrastructure for AI alignment - AIhub (2025)", url: "https://aihub.org/2025/05/22/interview-with-gillian-hadfield-normative-infrastructure-for-ai-alignment/" },
  ] },
  // institutional-ai
  { primary: "https://arxiv.org/abs/2601.11369", sources: [
    { title: "Institutional AI: Governing LLM Collusion in Multi-Agent Cournot Markets via Public Gove", url: "https://arxiv.org/abs/2601.11369" },
    { title: "Institutional AI: A Governance Framework for Distributional AGI Safety (arXiv:2601.10599", url: "https://arxiv.org/abs/2601.10599" },
  ] },
  // agentcity
  { primary: "https://arxiv.org/abs/2604.07007", sources: [
    { title: "AgentCity: Constitutional Governance for Autonomous Agent Economies via Separation of Po", url: "https://arxiv.org/abs/2604.07007" },
    { title: "AgentCity HTML full paper (arXiv 2604.07007v1)", url: "https://arxiv.org/html/2604.07007v1" },
  ] },
  // redwood
  { primary: "https://arxiv.org/abs/2312.06942", sources: [
    { title: "AI Control: Improving Safety Despite Intentional Subversion (Greenblatt et al., ICML 202", url: "https://arxiv.org/abs/2312.06942" },
    { title: "AXRP Episode 27 - AI Control with Buck Shlegeris and Ryan Greenblatt", url: "https://axrp.net/episode/2024/04/11/episode-27-ai-control-buck-shlegeris-ryan-greenblatt.html" },
    { title: "Redwood Research AI Control research page", url: "https://www.redwoodresearch.org/research/ai-control" },
  ] },
  // gsai
  { primary: "https://arxiv.org/abs/2405.06624", sources: [
    { title: "Towards Guaranteed Safe AI: A Framework for Ensuring Robust and Reliable AI Systems (arX", url: "https://arxiv.org/abs/2405.06624" },
    { title: "ARIA Safeguarded AI Programme", url: "https://aria.org.uk/opportunity-spaces/mathematics-for-safe-ai/safeguarded-ai" },
    { title: "LawZero - Yoshua Bengio's safe-by-design AI nonprofit (launched June 2025)", url: "https://lawzero.org/en" },
  ] },
  // cai
  { primary: "https://arxiv.org/abs/2212.08073", sources: [
    { title: "Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)", url: "https://arxiv.org/abs/2212.08073" },
    { title: "Collective Constitutional AI: Aligning a Language Model with Public Input (Anthropic / C", url: "https://arxiv.org/abs/2406.07814" },
    { title: "Claude's Constitution \u2014 Anthropic", url: "https://www.anthropic.com/constitution" },
  ] },
  // provenance
  { primary: "https://spec.c2pa.org/specifications/specifications/2.4/explainer/Explainer.html", sources: [
    { title: "C2PA and Content Credentials Explainer", url: "https://spec.c2pa.org/specifications/specifications/2.4/explainer/Explainer.html" },
    { title: "EZKL Documentation \u2014 The EZKL System", url: "https://docs.ezkl.xyz/" },
    { title: "C2PA Conformance Program \u2014 Trust Over IP", url: "https://trustoverip.org/blog/2025/05/20/egwg-2025-05-15-the-c2pa-conformance-program-scott-perry/" },
  ] },
  // proof-of-insight
  { primary: "https://proofofinsight.org/", sources: [
    { title: "Proof of Insight \u2014 working draft v0.7.0 (proofofinsight.org)", url: "https://proofofinsight.org/" },
    { title: "Arclio \u2014 Talk To Your Data. Built for Regulated Industries.", url: "https://www.arclio.ai/" },
  ] },
  // tee-attested
  { primary: "https://arxiv.org/abs/2603.05786", sources: [
    { title: "Proof-of-Guardrail in AI Agents and What (Not) to Trust from It (arXiv 2603.05786)", url: "https://arxiv.org/abs/2603.05786" },
    { title: "Attestable Audits: Verifiable AI Safety Benchmarks Using Trusted Execution Environments ", url: "https://arxiv.org/abs/2506.23706" },
    { title: "Phala 2025 Year in Review", url: "https://phala.com/posts/phala-2025-report" },
  ] },
  // decentralized
  { primary: "https://atproto.com/guides/identity", sources: [
    { title: "AT Protocol Identity Guide", url: "https://atproto.com/guides/identity" },
    { title: "AT Protocol Spring 2026 Roadmap", url: "https://atproto.com/blog/2026-spring-roadmap" },
    { title: "ActivityPub W3C Recommendation", url: "https://www.w3.org/TR/activitypub/" },
  ] },
  // protocols
  { primary: "https://a2a-protocol.org/latest/announcing-1.0/", sources: [
    { title: "A2A Protocol v1.0 Announcement", url: "https://a2a-protocol.org/latest/announcing-1.0/" },
    { title: "Agent2Agent (A2A) Protocol Specification", url: "https://a2a-protocol.org/latest/specification/" },
    { title: "MCP Specification 2025-11-25 (official)", url: "https://modelcontextprotocol.io/specification/2025-11-25" },
  ] },
  // eval-suites
  { primary: "https://arxiv.org/abs/2503.05731", sources: [
    { title: "AILuminate: Introducing v1.0 of the AI Risk and Reliability Benchmark from MLCommons (ar", url: "https://arxiv.org/abs/2503.05731" },
    { title: "MLCommons AILuminate GitHub Repository", url: "https://github.com/mlcommons/ailuminate" },
    { title: "METR Task Standard (blog post, 2024-02-29)", url: "https://metr.org/blog/2024-02-29-metr-task-standard/" },
  ] },
  // audit-bodies
  { primary: "https://www.aisi.gov.uk/blog/international-joint-testing-exercise-agentic-testing", sources: [
    { title: "International Joint Testing Exercise: Agentic Testing (AISI, 2025)", url: "https://www.aisi.gov.uk/blog/international-joint-testing-exercise-agentic-testing" },
    { title: "Frontier AI Auditing: Toward Rigorous Third-Party Assessment of Safety and Security Prac", url: "https://arxiv.org/html/2601.11699v1" },
    { title: "INESIA - Results of an AI agent evaluation exercise by the International Network of AI S", url: "https://www.peren.gouv.fr/en/actualites/2025-07-30_jointtesting_agentia/" },
  ] },
  // ciris
  { primary: "https://ciris.ai/trust/", sources: [
    { title: "CIRIS \u2014 Accountability Infrastructure for Autonomous AI", url: "https://ciris.ai/trust/" },
    { title: "CIRIS How It Works \u2014 Runtime Conscience Pipeline", url: "https://ciris.ai/how-it-works/" },
    { title: "CIRIS Federation Page \u2014 Shipping Status", url: "https://ciris.ai/federation/" },
  ] },
];

// "theory" and "research" are yellow, not red: a serious, argued, or actively
// researched lineage is a real partial position, distinct from "no" (absent).
const RW_TONE: Record<string, string> = {
  yes: "ok",
  no: "bad",
  partial: "warn",
  research: "warn",
  components: "warn",
  theory: "warn",
};

// Consumer-AI dimension: how CIRIS compares to the assistants people actually
// use. Everyone publishes principles (table stakes); only CIRIS fills the rest.
// Status keys tone-map via RW_TONE; the principles cell links to each company's
// own published spec (URLs in code, never localized).
const CU_PRINCIPLES = [
  "https://openai.com/index/introducing-the-model-spec/",
  "https://ai.google/responsibility/principles/",
  "https://www.anthropic.com/constitution",
  "/constitution",
];
const CU_STATUS: Array<{ principles: string; proof: string; asks: string; open: string; echo: string }> = [
  { principles: "yes", proof: "no", asks: "no", open: "no", echo: "no" }, // ChatGPT
  { principles: "yes", proof: "no", asks: "no", open: "no", echo: "no" }, // Gemini
  { principles: "yes", proof: "no", asks: "no", open: "no", echo: "no" }, // Claude
  { principles: "yes", proof: "yes", asks: "yes", open: "yes", echo: "yes" }, // CIRIS
];

export default function CompareV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.compare;
  const lz = c.landscape;
  const lh = (href: string) => localizeHref(href, locale);
  const status = (key: string) =>
    lz.rwStatus[key as keyof typeof lz.rwStatus] ?? key;

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={lz.kicker}
      title={lz.title}
      lede={lz.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Dimension 01 — Alignment (where CIRIS sits in the field). */}
      <div className={table.dim}>
        <span className={table.dimNum}>01</span>
        <span className={table.dimLabel}>{lz.dimAlign}</span>
      </div>

      {/* Two roads — the institutional/control branch vs value-internalization. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{lz.branchLabel}</p>
        <h2 className={s.h2}>{lz.branchH2}</h2>
        <p className={s.paragraph}>{lz.branchPlain}</p>
        <div className={s.callout}>
          <p className={s.paragraph}>{lz.branchRigor}</p>
        </div>
      </section>

      {/* The anti-singleton stance — federation as the mechanism, ρ→1 collapse. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{lz.singletonLabel}</p>
        <h2 className={s.h2}>{lz.singletonH2}</h2>
        <p className={s.paragraph}>{lz.singletonPlain}</p>
        <div className={`${s.callout} ${s.violet}`}>
          <p className={s.paragraph}>{lz.singletonRigor}</p>
        </div>
      </section>

      {/* Related-work matrix — every near-neighbor fills some boxes; CIRIS all. */}
      <section className={s.section} id="related-work">
        <p className={s.sectionLabel}>{lz.rwLabel}</p>
        <h2 className={s.h2}>{lz.rwH2}</h2>
        <p className={s.paragraph}>{lz.rwIntro}</p>
        <div className={table.tableWrap}>
          <table className={`${table.table} ${table.rwTable}`}>
            <thead>
              <tr>
                <th className={`${table.colText}`}>{lz.rwColApproach}</th>
                <th className={`${table.colText}`}>{lz.rwColWho}</th>
                <th className={`${table.colText} ${table.colMech}`}>{lz.rwColMechanism}</th>
                <th>{lz.rwColRuntime}</th>
                <th>{lz.rwColCrypto}</th>
                <th>{lz.rwColConstitution}</th>
                <th>{lz.rwColFederated}</th>
                <th>{lz.rwColConformance}</th>
                <th>{lz.rwColShipping}</th>
              </tr>
            </thead>
            <tbody>
              {lz.rwRows.map((row, i) => {
                const st = RW_STATUS[i];
                const isCiris = i === lz.rwRows.length - 1;
                return (
                  <tr key={row.approach} className={isCiris ? table.rowHero : undefined}>
                    <td className={`${table.colText} ${table.colApproach}`}>{row.approach}</td>
                    <td className={`${table.colText} ${table.colWho}`}>
                      <a href={RW_CITE[i].primary} target="_blank" rel="noopener noreferrer">{row.who}</a>
                    </td>
                    <td className={`${table.colText} ${table.colMech}`}>{row.mechanism}</td>
                    {(["runtime", "crypto", "constitution", "federated", "conformance", "shipping"] as const).map((col) => {
                      const key = st[col];
                      return (
                        <td key={col} data-tone={isCiris ? undefined : RW_TONE[key]}>
                          {status(key)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{lz.rwFootnote}</p>

        {/* Per-row citations — every line is backed by a public source. */}
        <details className={table.sources}>
          <summary>{lz.rwSourcesLabel}</summary>
          <ol>
            {lz.rwRows.map((row, i) => (
              <li key={row.approach}>
                <span className={table.srcRow}>{row.who}</span>
                {RW_CITE[i].sources.map((src, j) => (
                  <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.title}
                    {j < RW_CITE[i].sources.length - 1 ? " · " : ""}
                  </a>
                ))}
              </li>
            ))}
          </ol>
        </details>
      </section>

      {/* Dimension 02 — Consumer AI (vs the assistants people actually use). */}
      <div className={table.dim}>
        <span className={table.dimNum}>02</span>
        <span className={table.dimLabel}>{lz.dimConsumer}</span>
      </div>

      <section className={s.section}>
        <h2 className={s.h2}>{lz.consumerH2}</h2>
        <p className={s.paragraph}>{lz.consumerLead}</p>
        <div className={table.tableWrap}>
          <table className={`${table.table} ${table.cuTable}`}>
            <thead>
              <tr>
                <th className={table.colProject}>{lz.cuColAssistant}</th>
                <th>{lz.cuColPrinciples}</th>
                <th>{lz.cuColProof}</th>
                <th>{lz.cuColAsks}</th>
                <th>{lz.cuColOpen}</th>
                <th>{lz.cuColEcho}</th>
              </tr>
            </thead>
            <tbody>
              {lz.cuRows.map((name, i) => {
                const st = CU_STATUS[i];
                const isCiris = i === lz.cuRows.length - 1;
                const href = CU_PRINCIPLES[i];
                const internal = href.startsWith("/");
                return (
                  <tr key={name} className={isCiris ? table.rowHero : undefined}>
                    <td className={table.colProject}>{name}</td>
                    <td data-tone={isCiris ? undefined : RW_TONE[st.principles]}>
                      {internal ? (
                        <Link href={lh(href)}>{status(st.principles)}</Link>
                      ) : (
                        <a href={href} target="_blank" rel="noopener noreferrer">{status(st.principles)}</a>
                      )}
                    </td>
                    {(["proof", "asks", "open", "echo"] as const).map((col) => (
                      <td key={col} data-tone={isCiris ? undefined : RW_TONE[st[col]]}>
                        {status(st[col])}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className={table.tableFootnote}>{lz.cuFootnote}</p>
      </section>

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
    </ContentShell>
  );
}
