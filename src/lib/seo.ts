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
// Next.js resolves og:image against metadataBase but NOT og:video, so video
// URLs must be emitted absolute or crawlers (Telegram/Twitter) reject them.
const SITE = "https://ciris.ai";

export const DEFAULT_OG_IMAGE = "/og/og-default.gif";
export const DEFAULT_OG_VIDEO = `${SITE}/og/og-default.mp4`;

// The brand card, localized: /og/og-default.gif (en) or /og/<locale>/og-default.gif.
export function defaultOgImage(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? DEFAULT_OG_IMAGE
    : `/og/${locale}/og-default.gif`;
}

// The MP4 companion for the brand card (absolute; see SITE note above).
export function defaultOgVideo(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? DEFAULT_OG_VIDEO
    : `${SITE}/og/${locale}/og-default.mp4`;
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
  "/proof",
  "/epistemic-web",
  "/cewp",
  "/grammar",
  "/events",
  "/papers",
  "/paths/consumer-ai",
  "/paths/superalignment",
  "/paths/misinformation",
  "/paths/big-tech",
]);

// A few page paths use a hand-picked card slug that differs from the default
// derivation (the /paths/* heroes render as og-path-* singular).
const OG_SLUG_OVERRIDES: Readonly<Record<string, string>> = {
  "/paths/consumer-ai": "og-path-consumer-ai",
  "/paths/superalignment": "og-path-superalignment",
  "/paths/misinformation": "og-path-misinformation",
  "/paths/big-tech": "og-path-big-tech",
};

// The card slug for a page path: "/" -> og-home, "/trust" -> og-trust.
function ogSlug(basePath: string): string {
  if (basePath in OG_SLUG_OVERRIDES) return OG_SLUG_OVERRIDES[basePath];
  return basePath === "/" ? "og-home" : "og" + basePath.replace(/\//g, "-");
}

// The extensionless card path for a page: /og/<slug> (en) or /og/<locale>/<slug>.
// Returns null when the page has no bespoke card (callers fall back to the brand
// card). Every card is rendered in three forms sharing this base path:
//   .jpg  static poster (universal fallback, also the GIF's first frame)
//   .gif  animated loop, first frame == poster (Discord/Slack/LinkedIn/Telegram
//         play it; Facebook/X/WhatsApp/iMessage show the still first frame)
//   .mp4  og:video (Telegram, Twitter player, Discord inline playback)
function ogCardBase(basePath: string, locale: string): string | null {
  if (!DESIGNED_OG_CARDS.has(basePath)) return null;
  const slug = ogSlug(basePath);
  return locale === DEFAULT_LOCALE ? `/og/${slug}` : `/og/${locale}/${slug}`;
}

// Per-page social-preview card as the ANIMATED gif (its first frame is the
// static poster, so platforms that don't animate still get the designed art).
// Pages without a bespoke card fall back to the localized brand card.
export function ogImage(basePath: string, locale: string = DEFAULT_LOCALE): string {
  const base = ogCardBase(basePath, locale);
  return base ? `${base}.gif` : defaultOgImage(locale);
}

// The MP4 companion (og:video) for a page's card, or null if it has no bespoke
// card. Platforms that support og:video play this inline; the rest use og:image.
export function ogVideo(basePath: string, locale: string = DEFAULT_LOCALE): string | null {
  const base = ogCardBase(basePath, locale);
  return base ? `${SITE}${base}.mp4` : null;
}

// The localized Accord/charter card for the /sections reader (all sections share
// the one "constitutional document" card; the section name is the overlay).
export function ogSectionsImage(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? "/og/og-sections.gif"
    : `/og/${locale}/og-sections.gif`;
}

// The MP4 companion for the /sections card (absolute; see SITE note above).
export function ogSectionsVideo(locale: string = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE
    ? `${SITE}/og/og-sections.mp4`
    : `${SITE}/og/${locale}/og-sections.mp4`;
}

// Full localized metadata for a marketing page: hreflang alternates + a
// localized, per-page social preview (og/twitter title+description, og:locale).
export function localizedSeo(basePath: string, locale: string): Metadata {
  const og =
    MARKETING_OG[basePath]?.[locale] ?? MARKETING_OG[basePath]?.[DEFAULT_LOCALE];
  const title = og?.title;
  const description = og?.description;
  const image = ogImage(basePath, locale);
  const video = ogVideo(basePath, locale);
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
      images: [
        { url: image, type: "image/gif", width: 1200, height: 630, alt: title || "CIRIS" },
      ],
      ...(video
        ? { videos: [{ url: video, type: "video/mp4", width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title || "CIRIS" }],
    },
  };
}
