// Shared top nav for the v2 site (lobby + path staircases + content pages).
// Brand on the left, primary links + the language switcher on the right, so both
// the nav and the locale picker are present on every page. Server component: it
// pulls the locale's dictionary for localized nav labels + switcher strings.

import Link from "next/link";
import { localizeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import styles from "./lobby.module.css";

export default function SiteHeader({ locale }: { locale: string }) {
  const lh = (href: string) => localizeHref(href, locale);
  const t = getDictionary(locale);
  const nav = t.common.nav;

  return (
    <nav className={styles.nav}>
      <Link className={styles.brand} href={lh("/")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.logo} src="/logo.svg" alt="CIRIS" width={26} height={20} />
        CIRIS
        <span className={styles.brandTag}> · safe by structure, open by principle, kind by design</span>
      </Link>
      <div className={styles.navlinks}>
        <a className="g" href={lh("/install")}>{nav.install}</a>
        <a href={lh("/research-status")}>{nav.proof}</a>
        <a href={lh("/grammar")}>{nav.constitution}</a>
        <a href="https://github.com/CIRISAI/CIRISAgent">GitHub</a>
        <LanguageSwitcher currentLocale={locale} inline labels={t.common.langSwitcher} />
      </div>
    </nav>
  );
}
