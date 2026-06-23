// v2 "dark-blueprint" CEWP landing (CIRIS Epistemic Web Protocol). Renders the
// same t.cewp.* dictionary keys the old CewpBaseContent did — no copy is
// rewritten or re-translated here — inside the reusable ContentShell, with the
// server-mesh graphic (g06, cyan accent) since CEWP is the network/protocol.
//
// The YouTube explainer, the App Store / Google Play install CTAs (via the
// shared StoreBadges, labels from t.lobby.store) and the "deep tech" details
// + repo links are all preserved.
//
// Strings that carry typographic emphasis (<b>) are stored as HTML in the
// dictionary and injected with dangerouslySetInnerHTML. The content is authored
// and machine-translated by us (never user input), so this is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import StoreBadges from "@/app/components/graphics/StoreBadges";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function CewpV2({ t, locale }: { t: Dictionary; locale: string }) {
  const c = t.cewp;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={c.eyebrow}
      title={c.headline}
      lede={c.intro1}
      graphicId="g06"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      <section className={s.section}>
        <p className={s.paragraph}>{c.intro2}</p>
      </section>

      {/* The video explainer */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{c.watchLabel}</p>
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: "14px",
            border: "1px solid var(--color-line)",
            background: "#000",
          }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/sScyz82zfpY?rel=0"
            title="Dismantling the Hyperscaler — The Systems Architecture of CEWP"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
        <p className={s.footnote}>{c.videoCaption}</p>
      </section>

      {/* Install CTAs — CIRIS ships today */}
      <section className={s.section}>
        <StoreBadges labels={t.lobby.store} />
        <div className={s.notice}>
          <p dangerouslySetInnerHTML={h(c.shippingNote)} />
        </div>
      </section>

      {/* The deep tech — details simulator + repo */}
      <div className={s.callout}>
        <h2 className={s.h2}>{c.deepTechTitle}</h2>
        <p className={s.paragraph}>{c.deepTechBody}</p>
        <div className={s.ctaRow}>
          {/* /cewp/details is English-only; link there directly. */}
          <Link href="/cewp/details" className={`${s.btn} ${s.btnP}`}>
            {c.ctaDetails}
          </Link>
          <a
            href="https://github.com/CIRISAI/CEWP"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            {c.ctaRepo}
          </a>
        </div>
      </div>
    </ContentShell>
  );
}
