// English models page (site root). Thin entry point over the shared
// ModelsContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/models/.

import { localizedSeo } from "@/lib/seo";
import ModelsV2 from "@/app/components/ModelsV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/models", "en");

export default function ModelsPage() {
  return <ModelsV2 t={getDictionary("en")} locale="en" />;
}
