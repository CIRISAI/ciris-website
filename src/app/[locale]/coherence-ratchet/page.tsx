// Localized coherence-ratchet page (/es/coherence-ratchet, /am/coherence-ratchet, etc.). Thin entry
// point over Shell + SimpleContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's /coherence-ratchet so
// the right one surfaces per reader.

import type { Metadata } from "next";
import Shell from "@/app/coherence-ratchet/Shell";
import SimpleContent from "@/app/coherence-ratchet/SimpleContent";
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
    languages[l.code] = localizedPath("/coherence-ratchet", l.code);
  }
  languages["x-default"] = "/coherence-ratchet";
  return {
    alternates: {
      canonical: localizedPath("/coherence-ratchet", locale),
      languages,
    },
  };
}

export default async function LocalizedCoherenceRatchet({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  return (
    <Shell level="simple" locale={locale} mtBanner={t.common.mtBanner}>
      <SimpleContent t={t} />
    </Shell>
  );
}
