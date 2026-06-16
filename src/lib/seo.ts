import type { Metadata } from "next";
import {
  LOCALES,
  localizedPath,
  ogLocale,
  DEFAULT_LOCALE,
} from "@/i18n/config";
import { MARKETING_OG } from "./marketing-og";

// The generic 1200x630 CIRIS brand card. Shared social-preview fallback for any
// page without a bespoke designed card (and the site-wide default in the root
// layout). Pages that set their own openGraph must spread this in for an image,
// since Next.js overwrites (does not deep-merge) openGraph across segments.
export const DEFAULT_OG_IMAGE = "/og/og-default.jpg";

// The brand card, localized: /og/og-default.jpg (en) or /og/<locale>/og-default.jpg.
export function defaultOgImage(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? DEFAULT_OG_IMAGE
    : `/og/${locale}/og-default.jpg`;
}

// Pages that have bespoke designed cards in scripts/og/ (everything else falls
// back to the localized brand card). The /sections reader uses ogSectionsImage.
const DESIGNED_OG_CARDS: ReadonlySet<string> = new Set([
  "/",
  "/install",
  "/about",
  "/how-it-works",
  "/trust",
  "/vision",
  "/safety",
  "/crowdsourcing-alignment",
  "/first-contact",
  "/federation",
  "/compare",
  "/safety-vs-censorship",
  "/services",
  "/models",
  "/mdd",
  "/coherence-ratchet",
  "/coherence-collapse-analysis",
  "/research-status",
  "/epistemic-web",
  "/cewp",
  "/grammar",
  "/events",
  "/papers",
]);

// Per-page social-preview card (designed 1200x630 art with a localized title
// zone). Slug mirrors the page path: "/" -> og-home, "/trust" -> og-trust.
// English cards live at /og/<slug>.jpg; each locale gets its own composited
// card at /og/<locale>/<slug>.jpg (same art, in-language title). Regenerate via
// scripts/og/generate.py. Pages without a bespoke card (e.g. /grammar, /cewp)
// fall back to the localized brand card.
export function ogImage(basePath: string, locale: string = DEFAULT_LOCALE): string {
  if (!DESIGNED_OG_CARDS.has(basePath)) return defaultOgImage(locale);
  const slug =
    basePath === "/" ? "og-home" : "og" + basePath.replace(/\//g, "-");
  return locale === DEFAULT_LOCALE
    ? `/og/${slug}.jpg`
    : `/og/${locale}/${slug}.jpg`;
}

// The localized Accord/charter card for the /sections reader (all sections share
// the one "constitutional document" card; the section name is the overlay).
export function ogSectionsImage(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? "/og/og-sections.jpg"
    : `/og/${locale}/og-sections.jpg`;
}

// Full localized metadata for a marketing page: hreflang alternates + a
// localized, per-page social preview (og/twitter title+description, og:locale).
export function localizedSeo(basePath: string, locale: string): Metadata {
  const og =
    MARKETING_OG[basePath]?.[locale] ?? MARKETING_OG[basePath]?.[DEFAULT_LOCALE];
  const title = og?.title;
  const description = og?.description;
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
      images: [{ url: image, alt: title || "CIRIS" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title || "CIRIS" }],
    },
  };
}
