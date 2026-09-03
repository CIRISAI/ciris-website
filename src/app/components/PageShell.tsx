// The revamped content page: SkyChrome plus the centred prose column that
// ContentShell used to draw. The prop surface is ContentShell's, with `nav`
// (the eight bottom-nav labels) added, so a page converts by changing one
// import and passing nav={t.homeHero}.

import Link from "next/link";
import { localizeHref, DEFAULT_LOCALE, localeMeta } from "@/i18n/config";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import SvgGraphic from "@/app/components/graphics/SvgGraphic";
import SkyChrome, { type ShellNav } from "./SkyChrome";
import content from "@/app/components/v2/content.module.css";
import styles from "./pageShell.module.css";

export type ContentAccent = "cyan" | "teal" | "violet" | "rose" | "ok" | "brass";

const ACCENT: Record<ContentAccent, string> = {
  cyan: content.cyan,
  teal: content.teal,
  violet: content.violet,
  rose: content.rose,
  ok: content.ok,
  brass: content.brass,
};

export default function PageShell({
  nav,
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
  nav: ShellNav;
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
  const backArrow = localeMeta(locale).dir === "rtl" ? "\u2192" : "\u2190";

  return (
    <SkyChrome nav={nav} locale={locale}>
      {isLocalized && mtBanner && (
        <MachineTranslationBanner lead={mtBanner.lead} body={mtBanner.body} cta={mtBanner.cta} />
      )}

      <main className={`${content.wrap} ${ACCENT[accent]} ${styles.main}`}>
        {backHref && (
          <p className={content.back}>
            <Link href={lh(backHref)}>
              {backArrow} {backLabel ?? "back"}
            </Link>
          </p>
        )}

        <header className={content.head}>
          <p className={content.kicker}>{kicker}</p>
          <h1 className={content.h1}>{title}</h1>
          {lede && <p className={content.lede}>{lede}</p>}
          {graphicId && (
            <div className={content.heroArt} aria-hidden="true">
              <SvgGraphic id={graphicId} className={content.heroGraphic} />
            </div>
          )}
        </header>

        <article className={content.article}>{children}</article>
      </main>
    </SkyChrome>
  );
}
