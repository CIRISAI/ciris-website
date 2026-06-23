// English safety-vs-censorship page (site root). Thin entry point over the
// shared SafetyVsCensorshipContent, fed the English dictionary. Localized
// variants live at src/app/[locale]/safety-vs-censorship/.

import { localizedSeo } from "@/lib/seo";
import SafetyVsCensorshipV2 from "@/app/components/SafetyVsCensorshipV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/safety-vs-censorship", "en");

export default function SafetyVsCensorshipPage() {
  return <SafetyVsCensorshipV2 t={getDictionary("en")} locale="en" />;
}
