// English services page (site root). Thin entry point over the shared
// ServicesContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/services/.

import { localizedSeo } from "@/lib/seo";
import ServicesV2 from "@/app/components/ServicesV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/services", "en");

export default function ServicesPage() {
  return <ServicesV2 t={getDictionary("en")} locale="en" />;
}
