// Localized services page (/es/services, /am/services, /ha/services, /yo/services, …).
// Thin entry point over the shared ServicesContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's services page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import ServicesContent from "@/app/components/ServicesContent";
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
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l.code] = localizedPath("/services", l.code);
  }
  languages["x-default"] = "/services";
  return {
    alternates: {
      canonical: localizedPath("/services", locale),
      languages,
    },
  };
}

export default async function LocalizedServices({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <ServicesContent t={dict} />;
}
