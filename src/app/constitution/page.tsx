// English front-door for the unified CIRIS Constitution (/constitution). Thin
// entry over the redesigned ConstitutionPage; localized variants live at
// src/app/[locale]/constitution/.

import { localizedSeo } from "@/lib/seo";
import ConstitutionPage from "@/app/components/redesign/pages/ConstitutionPage";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/constitution", "en");

export default function ConstitutionRoute() {
  return <ConstitutionPage t={getDictionary("en")} locale="en" />;
}
