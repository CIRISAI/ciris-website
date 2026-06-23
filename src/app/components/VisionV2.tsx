// /vision — "The Reaching." A quiet, full-length manifesto rendered in the v2
// dark-blueprint shell. All copy comes from t.reaching (localized to 29
// languages); this component only arranges it. Two "turn" lines (honors,
// notBet) get the bright lead treatment; the dedication sits in italic.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import ReachingGraphic from "@/app/components/graphics/ReachingGraphic";

export default function VisionV2({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const r = t.reaching;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="violet"
      kicker={r.kicker}
      title={r.title}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      <div className={s.heroArt} aria-hidden="true">
        <ReachingGraphic className={s.heroGraphic} />
      </div>

      {r.open.map((p, i) => (
        <p key={`o${i}`} className={s.paragraph}>{p}</p>
      ))}

      <p className={`${s.lead} ${s.leadAccent}`}>{r.honors}</p>

      {r.body.map((p, i) => (
        <p key={`b${i}`} className={s.paragraph}>{p}</p>
      ))}

      <p className={s.lead}>{r.notBet}</p>

      <p className={s.dedication}>{r.dedication}</p>

      <div className={s.cta}>
        <p className={s.ctaPara}>
          {r.closeLine} <span style={{ color: "var(--accent)" }}>{r.tagline}</span>
        </p>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnP}`} href={lh("/install")}>{r.cta} &rarr;</Link>
        </div>
      </div>
    </ContentShell>
  );
}
