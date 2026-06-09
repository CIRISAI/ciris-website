"use client";

// Attention-drawing language switcher. A softly pulsing, glowing pill that
// auto-cycles through the supported native language names so a speaker of any
// of them spots their own language without reading English first. Click to
// expand the full picker. Fixed bottom-right so it persists through scroll.
//
// POC scope: only the home page is localized, so this is mounted on home only.
// As more pages get localized it moves to the root layout and links per-page.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  delocalizePath,
  localizedPath,
  localeMeta,
} from "@/i18n/config";
import styles from "./language-switcher.module.css";

const CYCLE_MS = 2100;

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const pathname = usePathname() || "/";
  const { path: basePath } = delocalizePath(pathname);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle the advertised native name. Paused while the panel is open or
  // hovered so a user reading the list isn't distracted.
  useEffect(() => {
    if (open || paused) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % LOCALES.length),
      CYCLE_MS,
    );
    return () => clearInterval(t);
  }, [open, paused]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cycling = LOCALES[idx];
  const here = localeMeta(currentLocale);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {open && (
        <div className={styles.panel} role="menu">
          <div className={styles.panelHead}>Read this in your language</div>
          {LOCALES.map((l) => {
            const isActive = l.code === currentLocale;
            return (
              <a
                key={l.code}
                href={localizedPath(basePath, l.code)}
                hrefLang={l.code}
                role="menuitem"
                aria-current={isActive ? "true" : undefined}
                className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.native} lang={l.code}>
                  {l.nativeName}
                </span>
                <span className={styles.english}>{l.name}</span>
              </a>
            );
          })}
        </div>
      )}

      <button
        type="button"
        className={styles.pill}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change language — currently ${here.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          className={styles.globe}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
        </svg>
        <span className={styles.label} aria-hidden="true">
          <span key={idx} className={styles.labelText} lang={cycling.code}>
            {cycling.nativeName}
          </span>
        </span>
        <svg
          className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
