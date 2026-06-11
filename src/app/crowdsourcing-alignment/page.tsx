// English /crowdsourcing-alignment page. Thin entry point over the shared
// CrowdsourcingAlignmentContent, fed the English dictionary. Localized variants
// live at src/app/[locale]/crowdsourcing-alignment/.

import { localizedSeo } from "@/lib/seo";
import CrowdsourcingAlignmentContent from "@/app/components/CrowdsourcingAlignmentContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/crowdsourcing-alignment", "en");

export default function CrowdsourcingAlignmentPage() {
  return <CrowdsourcingAlignmentContent t={getDictionary("en")} />;
}
