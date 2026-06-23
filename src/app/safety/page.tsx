// English safety page (site root). Thin server entry point over the shared
// SafetyContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/safety/.

import { localizedSeo } from "@/lib/seo";
import SafetyV2 from "@/app/components/SafetyV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/safety", "en");

export default function SafetyPage() {
  return <SafetyV2 t={getDictionary("en")} locale="en" />;
}
