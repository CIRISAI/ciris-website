// English first-contact page (site root). Thin entry point over the shared
// FirstContactContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/first-contact/.

import { localizedSeo } from "@/lib/seo";
import FirstContactContent from "@/app/components/FirstContactContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/first-contact", "en");

export default function FirstContactPage() {
  return <FirstContactContent t={getDictionary("en")} />;
}
