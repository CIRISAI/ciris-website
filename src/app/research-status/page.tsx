// English research-status page (site root). Thin entry point over the shared
// ResearchStatusContent, fed the English dictionary. Localized variants live
// at src/app/[locale]/research-status/.

import { localizedSeo } from "@/lib/seo";
import ResearchStatusContent from "@/app/components/ResearchStatusContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/research-status", "en");

export default function ResearchStatusPage() {
  return <ResearchStatusContent t={getDictionary("en")} />;
}
