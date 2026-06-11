// English compare page (site root). Thin entry point over the shared
// CompareContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/compare/.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import CompareContent from "@/app/components/CompareContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata = localizedSeo("/compare", "en");

export default function ComparePage() {
  return <CompareContent t={getDictionary("en")} />;
}
