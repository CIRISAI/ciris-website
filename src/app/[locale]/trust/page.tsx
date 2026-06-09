// Localized /trust page (/es/trust, /am/trust, /ha/trust, /yo/trust).
// Thin entry point over the shared TrustContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's page so the
// right one surfaces per reader.

import type { Metadata } from "next";
import TrustContent from "@/app/components/TrustContent";
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
    languages[l.code] = localizedPath("/trust", l.code);
  }
  languages["x-default"] = "/trust";
  return {
    alternates: {
      canonical: localizedPath("/trust", locale),
      languages,
    },
  };
}

export default async function LocalizedTrust({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <TrustContent t={dict} />;
}
