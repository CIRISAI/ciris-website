// English front-door for the unified CIRIS Constitution (/constitution). Thin
// entry over the shared ConstitutionV2; localized variants live at
// src/app/[locale]/constitution/.

import { localizedSeo } from "@/lib/seo";
import ConstitutionV2 from "@/app/components/ConstitutionV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/constitution", "en");

export default function ConstitutionPage() {
  return <ConstitutionV2 t={getDictionary("en")} locale="en" />;
}
