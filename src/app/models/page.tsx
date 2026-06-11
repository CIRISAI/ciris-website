// English models page (site root). Thin entry point over the shared
// ModelsContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/models/.

import { localizedSeo } from "@/lib/seo";
import ModelsContent from "@/app/components/ModelsContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/models", "en");

export default function ModelsPage() {
  return <ModelsContent t={getDictionary("en")} />;
}
