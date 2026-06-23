// v2 "dark-blueprint" Epistemic Web concept hub. Renders the SAME t.epistemicWeb.*
// dictionary keys the old EpistemicWebContent did — no copy is rewritten here —
// inside the reusable ContentShell. The signature MeshReel animation ("The Mesh,
// In Motion") is preserved as a featured full-width hero at the very top of the
// body, with the same `t={e.reel}` props it received before. Below it: the two
// doors to CEG (/grammar, the language) and CEWP (/cewp, the network), the reframe
// callout, and the live app-store CTA via the shared StoreBadges component.

"use client";

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import MeshReel from "@/app/components/mesh/MeshReel";
import StoreBadges from "@/app/components/graphics/StoreBadges";

export default function EpistemicWebV2({ t, locale }: { t: Dictionary; locale: string }) {
  const e = t.epistemicWeb;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={e.eyebrow}
      title={e.headline}
      lede={e.intro}
      backHref="/"
      backLabel="back to the lobby"
      mtBanner={t.common.mtBanner}
    >
      {/* The signature ALM explainer reel — featured full-width hero visual. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{e.reel.watchLabel}</p>
        <MeshReel t={e.reel} />
        <p className={s.footnote}>{e.reel.caption}</p>
      </section>

      <div className={s.section}>
        <p className={s.paragraph}>{e.p2}</p>
      </div>

      {/* The reframe: a complete internet replacement, not just AI. */}
      <div className={s.callout}>
        <h2 className={s.h2}>{e.biggerTitle}</h2>
        <p className={s.paragraph}>{e.biggerBody}</p>
      </div>

      {/* How CIRIS makes it real — the two realizations / two doors. */}
      <section className={s.section}>
        <h2 className={s.h2}>{e.howTitle}</h2>
        <p className={s.paragraph}>{e.howLede}</p>

        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {/* The language → /grammar (CEG) */}
          <div className={`${s.card} ${s.cCyan}`}>
            <p className={s.sectionLabel}>{e.grammarCardEyebrow}</p>
            <h3>{e.grammarCardTitle}</h3>
            <p>{e.grammarCardBody}</p>
            <Link href={lh("/grammar")} className={`${s.btn} ${s.btnP}`}>
              {e.grammarCardCta}
            </Link>
          </div>

          {/* The network → /cewp (CEWP) */}
          <div className={`${s.card} ${s.cViolet}`}>
            <p className={s.sectionLabel}>{e.cewpCardEyebrow}</p>
            <h3>{e.cewpCardTitle}</h3>
            <p>{e.cewpCardBody}</p>
            <Link href={lh("/cewp")} className={`${s.btn} ${s.btnP}`}>
              {e.cewpCardCta}
            </Link>
          </div>
        </div>
      </section>

      {/* It's shipping — live app CTA via the shared store badges. */}
      <section className={s.cta}>
        <h2 className={s.h2}>{e.appTitle}</h2>
        <p className={s.ctaPara}>{e.appBody}</p>
        <div className={s.ctaRow}>
          <StoreBadges labels={t.lobby.store} />
        </div>
      </section>
    </ContentShell>
  );
}
