// Localized /how-it-works page (/es/how-it-works, /am/how-it-works, etc.).
// Thin entry point over the shared HowItWorksContent, fed the locale's
// dictionary. hreflang alternates point search engines at every locale's page
// so the right one surfaces per reader.

import type { Metadata } from "next";
import HowItWorksContent from "@/app/components/HowItWorksContent";
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
    languages[l.code] = localizedPath("/how-it-works", l.code);
  }
  languages["x-default"] = "/how-it-works";
  return {
    alternates: {
      canonical: localizedPath("/how-it-works", locale),
      languages,
    },
  };
}

export default async function LocalizedHowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <HowItWorksContent t={dict} />;
}
