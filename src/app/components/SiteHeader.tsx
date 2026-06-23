// Shared top nav for the v2 site (lobby + path staircases). Brand on the left,
// primary links + the language switcher on the right, so both the nav and the
// locale picker are present on every page. Links are locale-prefixed.

import Link from "next/link";
import { localizeHref } from "@/i18n/config";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import styles from "./lobby.module.css";

export default function SiteHeader({ locale }: { locale: string }) {
  const lh = (href: string) => localizeHref(href, locale);
  return (
    <nav className={styles.nav}>
      <Link className={styles.brand} href={lh("/")}>
        <span className={styles.dot} /> CIRIS
        <span className={styles.brandTag}> · safe by structure, open by principle, kind by design</span>
      </Link>
      <div className={styles.navlinks}>
        <a className="g" href={lh("/install")}>Install</a>
        <a href={lh("/research-status")}>Proof</a>
        <a href={lh("/grammar")}>Constitution</a>
        <a href="https://github.com/CIRISAI/CIRISAgent">GitHub</a>
        <LanguageSwitcher currentLocale={locale} inline />
      </div>
    </nav>
  );
}
