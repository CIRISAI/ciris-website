"use client";
// The redesign's shell: the audience header (four panels on desktop, a menu
// sheet on phones), the language chip, the day/night toggle and Try Scout;
// whatever the page puts between; and the footer by audience.
//
// The shell owns the day/night choice and shares it through context, so a page
// that paints its own scene (the homepage's ocean) follows the same toggle.

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Geist_Mono, Instrument_Sans, Silkscreen } from "next/font/google";
import type { ShellCopy } from "./shellCopy";
import { LOCALES, delocalizePath, localizeHref, localizedPath } from "@/i18n/config";
import { setLocalePref } from "@/i18n/pref";
import { useSkyTheme } from "@/app/components/sky/useSkyTheme";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import { ABOUT_LINKS, AUDIENCES, type AudienceKey, SUPPORT_HREF, label } from "./siteMap";
import { StatusChip } from "./StatusChip";
import { getCopyrightNotice } from "@/lib/copyright";
import s from "./rd.module.css";

const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--rd-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--rd-mono" });
const pixel = Silkscreen({ subsets: ["latin"], weight: ["400"], variable: "--rd-pixel" });

interface Theme {
  dark: boolean;
  ready: boolean;
}
const ThemeContext = createContext<Theme>({ dark: false, ready: false });
/** The visitor's day/night choice, for pages that paint their own scenes. */
export const useRdTheme = () => useContext(ThemeContext);

const isExternal = (href: string) => /^https?:/.test(href);

export default function RdShell({
  t,
  locale,
  overlayHeader = false,
  children,
}: {
  t: ShellCopy;
  locale: string;
  /** Float the header over the page's first block (the homepage hero). */
  overlayHeader?: boolean;
  children: React.ReactNode;
}) {
  const { dark, ready, toggle } = useSkyTheme();
  const rd = t.rd;
  const lh = (href: string) => (isExternal(href) ? href : localizeHref(href, locale));
  const here = delocalizePath(usePathname() || "/").path;
  const [open, setOpen] = useState<AudienceKey | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const closeAll = useCallback(() => {
    setOpen(null);
    setLangOpen(false);
  }, []);

  // Escape and clicks outside the header close any open panel.
  useEffect(() => {
    if (!open && !langOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, langOpen, closeAll]);

  // The phone sheet: focus into it, Escape out, no scrolling behind it.
  useEffect(() => {
    if (!sheet) return;
    closeRef.current?.focus();
    const menu = menuRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      menu?.focus();
    };
  }, [sheet]);

  // Navigating closes everything.
  useEffect(() => {
    closeAll();
    setSheet(false);
  }, [here, closeAll]);

  const audience = AUDIENCES.find((a) => a.key === open);
  const g = rd.groups;
  const lang = LOCALES.find((l) => l.code === locale);
  const isLocalized = locale !== "en";

  return (
    <ThemeContext.Provider value={{ dark, ready }}>
      <div className={`${sans.variable} ${mono.variable} ${pixel.variable} ${s.root}`}>
        <a href="#content" className={s.skip}>
          {rd.skip}
        </a>
        <header ref={headerRef} className={`${s.header} ${overlayHeader ? s.overlay : ""}`}>
          <Link href={lh("/")} className={s.brand} aria-label="CIRIS">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={30} height={23} />
            <span className={s.wordmark}>CIRIS</span>
          </Link>

          <nav aria-label="Primary" className={s.nav}>
            {AUDIENCES.map((a) => (
              <button
                key={a.key}
                type="button"
                className={s.navButton}
                aria-expanded={open === a.key}
                aria-controls={open === a.key ? panelId : undefined}
                onClick={() => {
                  setLangOpen(false);
                  setOpen((o) => (o === a.key ? null : a.key));
                }}
              >
                {g[a.key].label}
              </button>
            ))}
          </nav>

          <div className={s.tools}>
            <div className={s.langWrap}>
              <button
                type="button"
                className={`${s.chip} ${s.mono}`}
                aria-label={`${rd.languageLabel}: ${lang?.nativeName ?? "English"}`}
                aria-expanded={langOpen}
                onClick={() => {
                  setOpen(null);
                  setLangOpen((o) => !o);
                }}
              >
                {locale.toUpperCase()}
              </button>
              {langOpen && (
                <div className={s.langPanel}>
                  {LOCALES.map((l) => (
                    <a
                      key={l.code}
                      href={localizedPath(here, l.code)}
                      lang={l.code}
                      aria-current={l.code === locale}
                      onClick={() => setLocalePref(l.code)}
                    >
                      {l.nativeName}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className={s.toggle} aria-label={rd.themeLabel} aria-pressed={dark} onClick={toggle}>
              <span className={s.pipDay} />
              <span className={s.pipNight} />
            </button>
            <a href="https://scout.ciris.ai" className={s.scout}>
              {rd.tryScout}
            </a>
            <button
              ref={menuRef}
              type="button"
              className={`${s.chip} ${s.menuButton}`}
              aria-haspopup="dialog"
              aria-expanded={sheet}
              onClick={() => setSheet(true)}
            >
              {rd.menu}
            </button>
          </div>

          {audience && (
            <div id={panelId} className={s.panel} role="region" aria-label={g[audience.key].label}>
              <div className={s.feature}>
                <p className={`${s.featureKicker} ${s.mono}`}>{g[audience.key].featureKicker}</p>
                <p className={s.featureTitle}>{g[audience.key].featureTitle}</p>
                <p className={s.featureBody}>{g[audience.key].featureBody}</p>
                <Link href={lh(audience.feature)} className={s.featureCta}>
                  {g[audience.key].featureCta}
                </Link>
              </div>
              {[audience.links.slice(0, Math.ceil(audience.links.length / 2)), audience.links.slice(Math.ceil(audience.links.length / 2))].map(
                (col, i) => (
                  <ul key={i} className={s.links}>
                    {col.map((l) => (
                      <li key={l.key}>
                        <a href={lh(l.href)} className={s.link}>
                          <span className={s.linkName}>
                            {label(g, audience.key, l.key)}
                            {l.chip && (
                              <>
                                {" "}
                                <StatusChip kind="inDev" label={rd.inDev} pill />
                              </>
                            )}
                          </span>
                          <span className={s.linkSub}>{label(g, audience.key, `${l.key}Sub`)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          )}
        </header>

        {sheet && (
          <div className={s.sheet} role="dialog" aria-modal="true" aria-label={rd.menu}>
            <div className={s.sheetHead}>
              <span className={s.wordmark}>CIRIS</span>
              <button ref={closeRef} type="button" className={s.chip} onClick={() => setSheet(false)}>
                {rd.closeMenu}
              </button>
            </div>
            {AUDIENCES.map((a) => (
              <nav key={a.key} className={s.sheetGroup} aria-label={g[a.key].label}>
                <h2 className={s.mono}>{g[a.key].label}</h2>
                {a.links.map((l) => (
                  <a key={l.key} href={lh(l.href)}>
                    {label(g, a.key, l.key)}
                  </a>
                ))}
              </nav>
            ))}
            <div className={s.sheetGroup}>
              <a href="https://scout.ciris.ai" className={s.scout} style={{ display: "inline-flex" }}>
                {rd.tryScout}
              </a>
            </div>
          </div>
        )}

        {isLocalized && (
          <MachineTranslationBanner
            lead={t.mtBanner.lead}
            body={t.mtBanner.body}
            cta={t.mtBanner.cta}
          />
        )}

        <div id="content" className={s.main}>
          {children}
        </div>

        <footer className={s.footer}>
          <div className={s.footGrid}>
            <div>
              <div className={s.footBrand}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="" width={26} height={20} />
                <span className={s.wordmark}>CIRIS</span>
              </div>
              <p className={s.footBlurb}>{rd.footer.blurb}</p>
              {/* CIRIS is not a 501(c)(3), so this says support, never donate. */}
              <a href={SUPPORT_HREF} className={s.footSupport} target="_blank" rel="noopener noreferrer">
                {rd.footer.support}
              </a>
            </div>
            {AUDIENCES.map((a) => (
              <nav key={a.key} className={s.footNav} aria-label={g[a.key].label}>
                <h2 className={s.mono}>{g[a.key].label}</h2>
                {a.footer.map((k) => {
                  const l = a.links.find((x) => x.key === k)!;
                  return (
                    <a key={k} href={lh(l.href)}>
                      {label(g, a.key, k)}
                    </a>
                  );
                })}
              </nav>
            ))}
            <nav className={s.footNav} aria-label={g.about.label}>
              <h2 className={s.mono}>{g.about.label}</h2>
              {ABOUT_LINKS.map((l) => (
                <a key={l.key} href={lh(l.href)}>
                  {g.about[l.key]}
                </a>
              ))}
            </nav>
          </div>
          <div className={`${s.footBar} ${s.mono}`}>
            <span>
              {getCopyrightNotice()} · {rd.footer.license}
            </span>
            <a href="https://github.com/CIRISAI">github.com/CIRISAI</a>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}
