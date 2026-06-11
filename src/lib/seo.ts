import type { Metadata } from "next";
import {
  LOCALES,
  localizedPath,
  ogLocale,
  DEFAULT_LOCALE,
} from "@/i18n/config";
import { MARKETING_OG } from "./marketing-og";

// Full localized metadata for a marketing page: hreflang alternates + a
// localized, per-page social preview (og/twitter title+description, og:locale).
export function localizedSeo(basePath: string, locale: string): Metadata {
  const og =
    MARKETING_OG[basePath]?.[locale] ?? MARKETING_OG[basePath]?.[DEFAULT_LOCALE];
  const title = og?.title;
  const description = og?.description;
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
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
