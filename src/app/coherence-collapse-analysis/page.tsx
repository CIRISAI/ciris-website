// English coherence-collapse-analysis page (site root). Thin entry point over
// the shared CoherenceCollapseAnalysisContent, fed the English dictionary.
// Localized variants live at src/app/[locale]/coherence-collapse-analysis/.

import type { Metadata } from "next";
import CoherenceCollapseAnalysisContent from "@/app/components/CoherenceCollapseAnalysisContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/coherence-collapse-analysis",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [
          l.code,
          localizedPath("/coherence-collapse-analysis", l.code),
        ]),
      ),
      "x-default": "/coherence-collapse-analysis",
    },
  },
};

export default function CoherenceCollapseAnalysisPage() {
  return <CoherenceCollapseAnalysisContent t={getDictionary("en")} />;
}
