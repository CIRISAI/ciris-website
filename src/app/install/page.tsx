// English install page (site root). Thin entry point over the shared
// InstallContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/install/.

import { localizedSeo } from "@/lib/seo";
import InstallContent from "@/app/components/InstallContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/install", "en");

export default function InstallPage() {
  return <InstallContent t={getDictionary("en")} />;
}
