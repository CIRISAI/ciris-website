import type { Metadata } from "next";
import {
  LOCALES,
  localizedPath,
  ogLocale,
  DEFAULT_LOCALE,
} from "@/i18n/config";
import { MARKETING_OG } from "./marketing-og";
import { getDictionary } from "@/i18n/dictionaries";
import CARDS from "../../scripts/og/cards.json";

// Social cards are still JPEGs rendered by scripts/og (the homepage's ocean with
// the page's title over it). scripts/og/cards.json is the list; a page with
// "en": true there has an English card only, and every other page has one per
// locale. A page that sets its own openGraph must set an image from here too,
// since Next.js overwrites (does not deep-merge) openGraph across segments.
type Card = { slug?: string; en?: boolean };
const cards = CARDS as Record<string, Card>;

const card = (slug: string, locale: string) =>
  locale === DEFAULT_LOCALE ? `/og/${slug}.jpg` : `/og/${locale}/${slug}.jpg`;

/** The title-less brand card: the fallback for pages without one of their own. */
export const DEFAULT_OG_IMAGE = card("og-default", DEFAULT_LOCALE);

/** A page's card, or the brand card where it has none in this locale. */
export function ogImage(basePath: string, locale: string = DEFAULT_LOCALE): string {
  const c = cards[basePath];
  if (!c || (c.en && locale !== DEFAULT_LOCALE)) return card("og-default", locale);
  return card(c.slug ?? "og" + basePath.replace(/\//g, "-"), locale);
}

/** The openGraph `images` entry for a page. */
export const ogImages = (basePath: string, locale: string, alt: string) => [
  { url: ogImage(basePath, locale), type: "image/jpeg", width: 1200, height: 630, alt },
];

// Full localized metadata for a marketing page: hreflang alternates + a
// localized, per-page social preview (og/twitter title+description, og:locale).
// Pages whose social title and description live in the dictionary, so the
// localization lane owns them like any other string. MARKETING_OG stays the
// fallback until a locale is filled.
const DICT_OG: Record<string, "homeHero" | "safety" | "scoring" | "values" | "web4Page" | "cewposPage" | "architecturePage" | "plainPage" | "aiWelfarePage"> = {
  "/": "homeHero",
  "/safety": "safety",
  "/ciris-scoring": "scoring",
  "/values": "values",
  "/web4": "web4Page",
  "/plain-answers": "plainPage",
  "/ai-welfare": "aiWelfarePage",
  "/cewpos": "cewposPage",
  "/architecture": "architecturePage",
};

function dictOg(basePath: string, locale: string): { title: string; description: string } | undefined {
  const section = DICT_OG[basePath];
  if (!section) return undefined;
  const d = getDictionary(locale)[section] as { ogTitle?: string; ogDescription?: string };
  const title = d.ogTitle?.trim();
  const description = d.ogDescription?.trim();
  return title && description ? { title, description } : undefined;
}

export function localizedSeo(basePath: string, locale: string): Metadata {
  const og =
    MARKETING_OG[basePath]?.[locale] ?? MARKETING_OG[basePath]?.[DEFAULT_LOCALE];
  // The landing's social title lives in the dictionary so the localization
  // lane translates it like any other string; MARKETING_OG is the fallback
  // until a locale has been filled.
  const heroOg = dictOg(basePath, locale);
  const title = heroOg?.title ?? og?.title;
  const description = heroOg?.description ?? og?.description;
  const image = ogImage(basePath, locale);
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l.code] = localizedPath(basePath, l.code);
  languages["x-default"] = basePath;
  const url = localizedPath(basePath, locale);
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "CIRIS",
      locale: ogLocale(locale),
      images: ogImages(basePath, locale, title || "CIRIS"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title || "CIRIS" }],
    },
  };
}
