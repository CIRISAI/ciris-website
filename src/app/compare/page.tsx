// English compare page (site root). Thin entry point over the shared
// CompareContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/compare/.

import { localizedSeo } from "@/lib/seo";
import CompareV2 from "@/app/components/CompareV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/compare", "en");

export default function ComparePage() {
  return <CompareV2 t={getDictionary("en")} locale="en" />;
}
