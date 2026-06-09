// Locale config for the CIRIS website.
//
// English is the DEFAULT and lives at the site root (/trust, /install, …) so
// existing URLs and their SEO are never disturbed. Every other locale lives
// under a /[locale]/ prefix (/es/trust, /am/trust, …) and is fully prerendered
// (static export, no middleware — see src/app/[locale]/).
//
// Language set + native names mirror CIRISAgent's localization manifest so the
// site and the app agree. First pass is Tier-0-first (am, ha, yo) plus es as an
// easy control; the full 28 fan out by language-family cluster once proven.

export type LocaleDir = "ltr" | "rtl";

export interface LocaleMeta {
  /** ISO 639-1 code, also the URL segment. */
  code: string;
  /** English name. */
  name: string;
  /** Endonym, shown in the language switcher. */
  nativeName: string;
  /** Text direction. */
  dir: LocaleDir;
}

export const DEFAULT_LOCALE = "en";

// The default (en) first; the rest are the localized prefixes.
export const LOCALES: LocaleMeta[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", dir: "ltr" },
  { code: "ha", name: "Hausa", nativeName: "Hausa", dir: "ltr" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá", dir: "ltr" },
];

/** Locale codes that get a /[locale]/ prefix (everything except the default). */
export const PREFIXED_LOCALES = LOCALES.filter(
  (l) => l.code !== DEFAULT_LOCALE,
).map((l) => l.code);

export const ALL_LOCALE_CODES = LOCALES.map((l) => l.code);

export function isLocale(code: string): boolean {
  return ALL_LOCALE_CODES.includes(code);
}

// Base (English) paths that have localized /[locale]/ variants. Nav/footer/
// switcher links are only locale-prefixed for paths in this set; everything
// else stays on its English URL so we never link to a route that 404s.
export const LOCALIZED_ROUTES: ReadonlySet<string> = new Set([
  "/",
  "/install",
  "/about",
  "/how-it-works",
  "/trust",
  "/vision",
  "/safety",
  "/crowdsourcing-alignment",
]);

/**
 * Prefix an internal href with the locale IF that route is localized.
 * External (http) and non-localized routes are returned unchanged.
 */
export function localizeHref(href: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) return href;
  if (!href.startsWith("/")) return href; // external / anchor
  const base = href === "/" ? "/" : href.replace(/\/$/, "");
  if (!LOCALIZED_ROUTES.has(base)) return href;
  return base === "/" ? `/${locale}` : `/${locale}${base}`;
}

export function localeMeta(code: string): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/**
 * Build the path for `targetLocale` given an un-prefixed (English) `path`.
 * en -> "/trust"; es -> "/es/trust"; "/" -> "/es".
 */
export function localizedPath(path: string, targetLocale: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (targetLocale === DEFAULT_LOCALE) return clean === "" ? "/" : clean;
  return `/${targetLocale}${clean}` || `/${targetLocale}`;
}

/**
 * Strip a known locale prefix off a pathname, returning the canonical English
 * path. "/es/trust" -> "/trust"; "/am" -> "/"; "/trust" -> "/trust".
 */
export function delocalizePath(pathname: string): { locale: string; path: string } {
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length > 0 && PREFIXED_LOCALES.includes(segs[0])) {
    const rest = "/" + segs.slice(1).join("/");
    return { locale: segs[0], path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname === "/" ? "/" : pathname.replace(/\/$/, "") };
}
