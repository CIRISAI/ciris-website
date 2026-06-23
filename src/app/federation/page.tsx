// English federation page (site root). Thin entry point over Shell + SimpleContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/federation/.

import { localizedSeo } from "@/lib/seo";
import FederationV2 from "./FederationV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/federation", "en");

export default function FederationPage() {
  const t = getDictionary("en");
  return <FederationV2 t={t} locale="en" />;
}
