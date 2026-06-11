// English MDD page (site root). Thin entry point over the shared
// MddContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/mdd/.

import { localizedSeo } from "@/lib/seo";
import MddContent from "@/app/components/MddContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/mdd", "en");

export default function MddPage() {
  return <MddContent t={getDictionary("en")} />;
}
