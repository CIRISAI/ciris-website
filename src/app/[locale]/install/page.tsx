// Localized install page (/es/install, /am/install, /ha/install, /yo/install).
// Thin entry point over the shared InstallContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's install page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import InstallContent from "@/app/components/InstallContent";
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
    languages[l.code] = localizedPath("/install", l.code);
  }
  languages["x-default"] = "/install";
  return {
    alternates: {
      canonical: localizedPath("/install", locale),
      languages,
    },
  };
}

export default async function LocalizedInstall({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <InstallContent t={dict} />;
}
