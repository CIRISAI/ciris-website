// English scoring page (site root). Thin entry point over the shared
// CirisScoringV2, fed the English dictionary. Localized variants live at
// src/app/[locale]/ciris-scoring/.

import { localizedSeo } from "@/lib/seo";
import CirisScoringV2 from "@/app/components/CirisScoringV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/ciris-scoring", "en");

export default function CirisScoringPage() {
  return <CirisScoringV2 t={getDictionary("en")} locale="en" />;
}
