// Localized models page (/es/models, /am/models, /ha/models, /yo/models, …).
// Thin entry point over the shared ModelsContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's models page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import ModelsContent from "@/app/components/ModelsContent";
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
    languages[l.code] = localizedPath("/models", l.code);
  }
  languages["x-default"] = "/models";
  return {
    alternates: {
      canonical: localizedPath("/models", locale),
      languages,
    },
  };
}

export default async function LocalizedModels({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <ModelsContent t={dict} />;
}
