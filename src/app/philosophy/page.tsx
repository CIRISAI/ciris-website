// English philosophy page (/philosophy). The canonical one-sentence philosophy
// and its unpacking. Thin entry over the shared PhilosophyV2; localized
// variants live at src/app/[locale]/philosophy/.

import { localizedSeo } from "@/lib/seo";
import PhilosophyV2 from "@/app/components/PhilosophyV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/philosophy", "en");

export default function Page() {
  return <PhilosophyV2 t={getDictionary("en")} locale="en" />;
}
