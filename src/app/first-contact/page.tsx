// English first-contact page (site root). Thin entry point over the shared
// FirstContactContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/first-contact/.

import { localizedSeo } from "@/lib/seo";
import FirstContactV2 from "@/app/components/FirstContactV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/first-contact", "en");

export default function FirstContactPage() {
  return <FirstContactV2 t={getDictionary("en")} locale="en" />;
}
