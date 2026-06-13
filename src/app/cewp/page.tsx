// English CEWP landing (/cewp). Thin entry point over the shared
// CewpBaseContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/cewp/. The deep-tech simulator stays English at /cewp/details.

import { localizedSeo } from "@/lib/seo";
import CewpBaseContent from "@/app/components/CewpBaseContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/cewp", "en");

export default function CewpPage() {
  return <CewpBaseContent t={getDictionary("en")} />;
}
