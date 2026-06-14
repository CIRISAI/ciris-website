// English "Epistemic Web" concept hub (/epistemic-web). Thin entry point over
// the shared EpistemicWebContent, fed the English dictionary. Localized variants
// live at src/app/[locale]/epistemic-web/. The front door to CEG (/grammar, the
// language) and CEWP (/cewp, the network).

import { localizedSeo } from "@/lib/seo";
import EpistemicWebContent from "@/app/components/EpistemicWebContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/epistemic-web", "en");

export default function EpistemicWebPage() {
  return <EpistemicWebContent t={getDictionary("en")} />;
}
