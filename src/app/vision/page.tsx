// English vision page (site root). Thin entry point over the shared
// VisionContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/vision/.

import { localizedSeo } from "@/lib/seo";
import VisionV2 from "@/app/components/VisionV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/vision", "en");

export default function VisionPage() {
  return <VisionV2 t={getDictionary("en")} />;
}
