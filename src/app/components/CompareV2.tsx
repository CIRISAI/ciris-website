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
                <th className={`${table.colText}`}>{lz.rwColMechanism}</th>
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
                    <td className={`${table.colText}`}>{row.mechanism}</td>
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
          <Link href={lh("/research-status")}>{c.researchLink}</Link>
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
    </ContentShell>
  );
}
