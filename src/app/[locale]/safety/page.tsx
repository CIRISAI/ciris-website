// Localized safety page (/es/safety, /am/safety, /ha/safety, /yo/safety).
// Thin entry point over the shared SafetyContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's safety page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import SafetyContent from "@/app/components/SafetyContent";
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
    languages[l.code] = localizedPath("/safety", l.code);
  }
  languages["x-default"] = "/safety";
  return {
    alternates: {
      canonical: localizedPath("/safety", locale),
      languages,
    },
  };
}

export default async function LocalizedSafety({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <SafetyContent t={dict} />;
}
