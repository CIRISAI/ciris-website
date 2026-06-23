// Reusable v2 "dark-blueprint" content-page shell. Renders the shared SiteHeader,
// the machine-translation banner on non-English locales, a grid-framed hero
// (kicker + h1 + optional lede + optional text-free SvgGraphic square), then the
// page's prose as <article>, and a footer line. Pages compose their localized
// body via children using the helpers exported from content.module.css; this
// shell owns chrome + hero only, so the dictionary copy is never duplicated here.
//
// Set `accent` to tint the kicker, labels, callouts and primary CTA to match the
// page's hero graphic. Defaults to cyan.

import Link from "next/link";
import { localizeHref, DEFAULT_LOCALE } from "@/i18n/config";
import SiteHeader from "@/app/components/SiteHeader";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import SvgGraphic from "@/app/components/graphics/SvgGraphic";
import styles from "./content.module.css";

export type ContentAccent = "cyan" | "teal" | "violet" | "rose" | "ok" | "brass";

const ACCENT: Record<ContentAccent, string> = {
  cyan: styles.cyan,
  teal: styles.teal,
  violet: styles.violet,
  rose: styles.rose,
  ok: styles.ok,
  brass: styles.brass,
};

export default function ContentShell({
  locale,
  accent = "cyan",
  kicker,
  title,
  lede,
  graphicId,
  backHref,
  backLabel,
  mtBanner,
  children,
}: {
  locale: string;
  accent?: ContentAccent;
  kicker: string;
  title: string;
  lede?: string;
  graphicId?: string;
  backHref?: string;
  backLabel?: string;
  mtBanner?: { lead: string; body: string; cta: string };
  children: React.ReactNode;
}) {
  const isLocalized = locale !== DEFAULT_LOCALE;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <>
      {isLocalized && mtBanner && (
        <MachineTranslationBanner lead={mtBanner.lead} body={mtBanner.body} cta={mtBanner.cta} />
      )}
      <SiteHeader locale={locale} />
      <main className={`${styles.wrap} ${ACCENT[accent]}`}>
        {backHref && (
          <p className={styles.back}>
            <Link href={lh(backHref)}>&larr; {backLabel ?? "back"}</Link>
          </p>
        )}

        <header className={styles.head}>
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={styles.h1}>{title}</h1>
          {lede && <p className={styles.lede}>{lede}</p>}
          {graphicId && (
            <div className={styles.heroArt} aria-hidden="true">
              <SvgGraphic id={graphicId} className={styles.heroGraphic} />
            </div>
          )}
        </header>

        <article className={styles.article}>{children}</article>

        <p className={styles.foot}>
          <span>CIRIS</span>
          <span>safe by structure · open by principle · kind by design</span>
        </p>
      </main>
    </>
  );
}

// Re-export the prose styles so pages can build their <article> body with the
// same class vocabulary the shell uses (section, h2, paragraph, callout, cards…).
export { styles as contentStyles };
