// English coherence-collapse-analysis page (site root). Thin entry point over
// the shared CoherenceCollapseAnalysisContent, fed the English dictionary.
// Localized variants live at src/app/[locale]/coherence-collapse-analysis/.

import { localizedSeo } from "@/lib/seo";
import CoherenceCollapseAnalysisV2 from "@/app/components/CoherenceCollapseAnalysisV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/coherence-collapse-analysis", "en");

export default function CoherenceCollapseAnalysisPage() {
  return <CoherenceCollapseAnalysisV2 t={getDictionary("en")} locale="en" />;
}
