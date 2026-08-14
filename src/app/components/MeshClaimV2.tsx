// The Mesh Claim anchor page (/mesh-claim): the site's strong-form statement
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

// Lineage rows: neighbor positions and primary links, same order as l1..l5.
const LINEAGE_URLS = [
  "https://vitalik.eth.limo/general/2025/01/05/dacc2.html",
  "https://www.primeintellect.ai/blog/intellect-2",
  "https://intelligence-curse.ai/",
  "https://bittensor.com/",
  "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
];

export default function MeshClaimV2({ t, locale }: { t: Dictionary; locale: string }) {
  const m = t.meshClaim;
  const lh = (href: string) => localizeHref(href, locale);
  const premises = [
    { title: m.p1t, body: m.p1b },
    { title: m.p2t, body: m.p2b },
    { title: m.p3t, body: m.p3b },
    { title: m.p4t, body: m.p4b },
    { title: m.p5t, body: m.p5b },
  ];
  const lineage = [
    { name: m.l1n, body: m.l1b },
    { name: m.l2n, body: m.l2b },
    { name: m.l3n, body: m.l3b },
    { name: m.l4n, body: m.l4b },
    { name: m.l5n, body: m.l5b },
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
            </div>
          ))}
        </div>
        <div className={s.notice}>
          <p>{m.premisesNote}</p>
        </div>
      </section>

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
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a1t}</h3>
            <p>{m.a1b}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{m.a2t}</h3>
            <p>{m.a2b}</p>
          </div>
        </div>
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
