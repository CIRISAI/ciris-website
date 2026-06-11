// English how-it-works page (site root). Thin entry point over the shared
// HowItWorksContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/how-it-works/.

import { localizedSeo } from "@/lib/seo";
import HowItWorksContent from "@/app/components/HowItWorksContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/how-it-works", "en");

export default function HowItWorksPage() {
  return <HowItWorksContent t={getDictionary("en")} />;
}
