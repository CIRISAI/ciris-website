// English "Epistemic Web" concept hub (/epistemic-web). Thin entry point over
// the shared EpistemicWebContent, fed the English dictionary. Localized variants
// live at src/app/[locale]/epistemic-web/. The front door to CEG (/grammar, the
// language) and CEWP (/cewp, the network).

import { localizedSeo } from "@/lib/seo";
import EpistemicWebV2 from "@/app/components/EpistemicWebV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/epistemic-web", "en");

export default function EpistemicWebPage() {
  return <EpistemicWebV2 t={getDictionary("en")} locale="en" />;
}
