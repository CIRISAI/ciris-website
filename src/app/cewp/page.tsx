// English CEWP landing (/cewp). Thin entry point over the shared
// CewpBaseContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/cewp/. The deep-tech simulator stays English at /cewp/details.

import { localizedSeo } from "@/lib/seo";
import CewpV2 from "@/app/components/CewpV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/cewp", "en");

export default function CewpPage() {
  return <CewpV2 t={getDictionary("en")} locale="en" />;
}
