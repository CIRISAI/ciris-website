// English federation page (site root). Thin entry point over Shell + SimpleContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/federation/.

import { localizedSeo } from "@/lib/seo";
import Shell from "./Shell";
import SimpleContent from "./SimpleContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/federation", "en");

export default function FederationPage() {
  const t = getDictionary("en");
  return (
    <Shell level="simple" locale="en">
      <SimpleContent t={t} />
    </Shell>
  );
}
