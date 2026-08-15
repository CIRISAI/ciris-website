// The Mesh Claim anchor page (/constitutional-mesh): the site's strong-form statement
// that capture-resistant coordination, not open weights or harnesses, is the
// load-bearing layer of open-source AI safety, stated so it can be attacked.
// Plain-language register on-page; the adversarial long form lives off-site
// (LessWrong, once posted) and in the repos. External URLs and artifact links
// are language-neutral and stay in code; every label comes from t.meshClaim.
// The lineage rows summarize outside positions in good faith; the page invites
// corrections as attacks too.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

const SEED_URL =
  "https://github.com/CIRISAI/CIRISPersist/blob/main/src/federation/genesis/canonical_seed.json";
const GITHUB_ORG = "https://github.com/CIRISAI";
const DISCORD = "https://discord.gg/SWGM7Gsvrv";

// Lineage rows: neighbor positions and primary links, same order as l1..l9.
// Adjacent work is linked as validation (per Eric): the diagnosis is shared;
// the composition plus the shipped artifact is what differs.
const LINEAGE_URLS = [
  "https://vitalik.eth.limo/general/2025/01/05/dacc2.html",
  "https://www.primeintellect.ai/blog/intellect-2",
  "https://intelligence-curse.ai/",
  "https://bittensor.com/",
  "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
  "https://aliceprotocol.org/",
  "https://clea.research.vub.be/aic",
  "https://anda.ai/",
  "https://arxiv.org/abs/2607.22957",
  "https://arxiv.org/abs/2605.24538",
];

export default function MeshClaimV2({ t, locale }: { t: Dictionary; locale: string }) {
  const m = t.meshClaim;
  const lh = (href: string) => localizeHref(href, locale);
  // Each premise carries its epistemic status (measured / testable-in-principle
  // / wager / definitional), per the reviewer's grading: a set presented as
  // uniformly breakable implies each has a kill, and only P3 truly does.
  const premises = [
    { title: m.p1t, body: m.p1b, status: m.p1s },
    { title: m.p2t, body: m.p2b, status: m.p2s },
    { title: m.p3t, body: m.p3b, status: m.p3s },
    { title: m.p4t, body: m.p4b, status: m.p4s },
    { title: m.p5t, body: m.p5b, status: m.p5s },
  ];
  const lineage = [
    { name: m.l1n, body: m.l1b },
    { name: m.l2n, body: m.l2b },
    { name: m.l3n, body: m.l3b },
    { name: m.l4n, body: m.l4b },
    { name: m.l5n, body: m.l5b },
    { name: m.l6n, body: m.l6b },
    { name: m.l7n, body: m.l7b },
    { name: m.l8n, body: m.l8b },
    { name: m.l9n, body: m.l9b },
    { name: m.l10n, body: m.l10b },
  ];

  return (
    <ContentShell
      locale={locale}
      accent="violet"
      kicker={m.eyebrow}
      title={m.headline}
      lede={m.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The claim, strong form. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.claimLabel}</p>
        <p className={s.lead}>{m.claimP1}</p>
        <p className={s.paragraph}>{m.claimP2}</p>
      </section>

      {/* The five premises. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.premisesLabel}</p>
        <h2 className={s.h2}>{m.premisesH2}</h2>
        <div className={s.cardGrid}>
          {premises.map((p, i) => (
            <div key={i} className={`${s.card} ${s.cViolet}`}>
              <h3>
                <span dir="ltr">P{i + 1}</span> · {p.title}
              </h3>
              <p>{p.body}</p>
              <p className={s.footnote}>{p.status}</p>
            </div>
          ))}
        </div>
        <div className={s.notice}>
          <p>{m.premisesNote}</p>
        </div>
      </section>

      {/* The false dichotomy: the conscience is what the mesh carries. This is
          the point of CIRIS, not a side note: guardrails-vs-openness is refused
          by combining a machine conscience with a capture-resistant mesh. */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{m.dichotLabel}</p>
        <h2 className={s.h2}>{m.dichotH2}</h2>
        <p className={s.paragraph}>{m.dichotP1}</p>
        <p className={s.paragraph}>{m.dichotP2}</p>
        <p className={s.paragraph}>{m.dichotP3}</p>
        <div className={s.ctaRow}>
          {/* The full-context version of this argument is the Safety Arch:
              seven structural guarantees with the halt as keystone. */}
          <Link href={lh("/safety")} className={`${s.btn} ${s.btnP}`}>
            {m.dichotCtaSafety}
          </Link>
          <Link href={lh("/constitution")} className={`${s.btn} ${s.btnS}`}>
            {t.contextualIntegrity.btnConstitution}
          </Link>
        </div>
      </div>

      {/* Running today: the baked root, the proven keys. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.runLabel}</p>
        <h2 className={s.h2}>{m.runH2}</h2>
        <p className={s.paragraph}>{m.runP1}</p>
        <p className={s.paragraph}>{m.runP2}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.r1t}</h3>
            <p>{m.r1b}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.r2t}</h3>
            <p>{m.r2b}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{m.r3t}</h3>
            <p>{m.r3b}</p>
          </div>
        </div>
        <div className={s.ctaRow}>
          <a href={SEED_URL} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {m.runCtaSeed}
          </a>
          <Link href={lh("/security/post-quantum-kill-switch")} className={`${s.btn} ${s.btnS}`}>
            {m.runCtaKeys}
          </Link>
          <Link href={lh("/cewp")} className={`${s.btn} ${s.btnS}`}>
            {m.runCtaFabric}
          </Link>
        </div>
      </section>

      {/* The two soft points, named before the reviewer finds them. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.softLabel}</p>
        <h2 className={s.h2}>{m.softH2}</h2>
        <p className={s.paragraph}>{m.softP0}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a1t}</h3>
            <p>{m.a1b}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a2t}</h3>
            <p>{m.a2b}</p>
          </div>
          {/* The threshold bet: good-enough-is-good-enough named as the
              assumption, and the capability × participation × coordination
              question stated as open. */}
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a3t}</h3>
            <p>{m.a3b}</p>
          </div>
          {/* The instrument's own blind spot: N_eff is pairwise, and
              parity-structured agreement reads as independent (RATCHET#9/#10,
              model-scope, unmeasured on the mesh). Named because omitting the
              attack our own diagnostic cannot see would be the page's genre
              violated. */}
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a4t}</h3>
            <p>{m.a4b}</p>
          </div>
        </div>
      </section>

      {/* Proof of Benefit: the answer to protocol capture and to A2's
          manufactured-humans worry. Mechanism per CIRISNodeCore MISSION
          (P2 Commons Credits, P6 truth-grounding, P10 witness diversity,
          P11 reconsideration, WA decay) and rc3 R1's admitted bet; the
          primitives are spec-stage, hence "by design". */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.pobLabel}</p>
        <h2 className={s.h2}>{m.pobH2}</h2>
        <p className={s.paragraph}>{m.pobP1}</p>
        <p className={s.paragraph}>{m.pobP2}</p>
        <p className={s.paragraph}>{m.pobP3}</p>
        {/* Citation stays English verbatim in all locales, house style for
            source lines. Same paper as lineage row l10 (opposite threat
            model); this section answers its protocol-capture warning. */}
        <p className={s.footnote}>
          <a
            href="https://arxiv.org/abs/2605.24538"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hu &amp; Rong, &ldquo;Is Decentralized AI Governable? From Regulative Policy to
            Constitutive Protocol&rdquo; (arXiv 2605.24538)
          </a>
        </p>
      </section>

      {/* The futures: hope led, the two-mesh stalemate stated plainly, the
          mesh-dyad vs singleton-dyad comparison marked OPEN, all framed as
          action under irreducible uncertainty. Flows directly into the
          invitation below: the uncertainty is the thing to attack. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.futLabel}</p>
        <h2 className={s.h2}>{m.futH2}</h2>
        <p className={s.paragraph}>{m.futP1}</p>
        <p className={s.paragraph}>{m.futP2}</p>
        <p className={s.paragraph}>{m.futP3}</p>
        <p className={s.paragraph}>{m.futP4}</p>
        {/* Scenario-model citations stay English verbatim, house source-line
            style. AI 2027 = branch-point scenario form; Superintelligence
            Strategy/MAIM = the singleton-dyad deterrence model (the
            comparator futP3 leaves open); TASRA = the risk taxonomy. */}
        <p className={s.footnote}>
          <a href="https://ai-2027.com/" target="_blank" rel="noopener noreferrer">
            AI 2027 (Kokotajlo et al.)
          </a>
          {"  ·  "}
          {/* The follow-up: delay superintelligence to 2040 via a US-China
              treaty by 2029 + verification. The treaty-delay comparator: its
              mechanism is verification (the mesh's home turf), its
              prerequisite is great-power agreement (the mesh needs none). */}
          <a href="https://ai-2040.com/" target="_blank" rel="noopener noreferrer">
            AI 2040: Plan A
          </a>
          {"  ·  "}
          <a href="https://arxiv.org/abs/2503.05628" target="_blank" rel="noopener noreferrer">
            Superintelligence Strategy / MAIM (Hendrycks, Schmidt &amp; Wang)
          </a>
          {"  ·  "}
          <a href="https://arxiv.org/abs/2306.06924" target="_blank" rel="noopener noreferrer">
            TASRA (Critch &amp; Russell)
          </a>
        </p>
      </section>

      {/* The invitation. */}
      <div className={s.callout}>
        <p className={s.sectionLabel}>{m.breakLabel}</p>
        <h2 className={s.h2}>{m.breakH2}</h2>
        <p className={s.paragraph}>{m.breakP1}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.breakArgT}</h3>
            <p>{m.breakArgB}</p>
          </div>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{m.breakArtT}</h3>
            <p>{m.breakArtB}</p>
          </div>
        </div>
        <div className={s.ctaRow}>
          <a href={DISCORD} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnP}`}>
            {m.breakCtaDiscord}
          </a>
          <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {m.breakCtaGithub}
          </a>
        </div>
      </div>

      {/* The intellectual ancestors: the premises anchored in fifty years of
          scholarship (Hirschman, OSS forkability, Benkler, Ostrom, Lessig,
          Zittrain, cypherpunk); the composition is what is claimed as ours. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.ancestorsLabel}</p>
        <p className={s.paragraph}>{m.ancestorsP1}</p>
        <p className={s.paragraph}>{m.ancestorsP2}</p>
      </section>

      {/* Lineage: the neighbors, named in good faith. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{m.lineageLabel}</p>
        <h2 className={s.h2}>{m.lineageH2}</h2>
        <p className={s.paragraph}>{m.lineageIntro}</p>
        <div className={s.cardGrid}>
          {lineage.map((row, i) => (
            <a
              key={i}
              href={LINEAGE_URLS[i]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${s.cCyan}`}
            >
              <h3>{row.name}</h3>
              <p>{row.body}</p>
            </a>
          ))}
        </div>
        <p className={s.footnote}>{m.lineageNote}</p>
      </section>
    </ContentShell>
  );
}
