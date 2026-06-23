// English how-it-works page (site root). Thin entry point over the shared
// HowItWorksContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/how-it-works/.

import { localizedSeo } from "@/lib/seo";
import HowItWorksV2 from "@/app/components/HowItWorksV2";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

export const metadata = localizedSeo("/how-it-works", "en");

export default function HowItWorksPage() {
  return <HowItWorksV2 t={getDictionary("en")} locale={DEFAULT_LOCALE} />;
}
