// Localized first-contact page (/es/first-contact, /am/first-contact, etc.).
// Thin entry point over the shared FirstContactContent, fed the locale's
// dictionary. hreflang alternates point search engines at every locale's
// first-contact page so the right one surfaces per reader.

import type { Metadata } from "next";
import FirstContactContent from "@/app/components/FirstContactContent";
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
    languages[l.code] = localizedPath("/first-contact", l.code);
  }
  languages["x-default"] = "/first-contact";
  return {
    alternates: {
      canonical: localizedPath("/first-contact", locale),
      languages,
    },
  };
}

export default async function LocalizedFirstContact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <FirstContactContent t={dict} />;
}
