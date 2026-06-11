// English services page (site root). Thin entry point over the shared
// ServicesContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/services/.

import { localizedSeo } from "@/lib/seo";
import ServicesContent from "@/app/components/ServicesContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/services", "en");

export default function ServicesPage() {
  return <ServicesContent t={getDictionary("en")} />;
}
