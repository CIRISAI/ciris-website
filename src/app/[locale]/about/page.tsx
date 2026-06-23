// Localized /about page (/es/about, /am/about, /ha/about, /yo/about). Thin
// server entry point over the shared AboutContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's /about so the
// right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import AboutV2 from "@/app/components/AboutV2";
import { getDictionary } from "@/i18n/dictionaries";
import {
  PREFIXED_LOCALES,
  LOCALES,
  localizedPath,
  isLocale,
} from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedSeo("/about", locale);
}

export default async function LocalizedAbout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <AboutV2 t={dict} locale={resolved} />;
}
