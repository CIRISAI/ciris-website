// English install page (site root). Thin entry point over the shared
// InstallContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/install/.

import { localizedSeo } from "@/lib/seo";
import InstallV2 from "@/app/components/InstallV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/install", "en");

export default function InstallPage() {
  return <InstallV2 t={getDictionary("en")} locale="en" />;
}
