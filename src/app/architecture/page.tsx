// English /architecture/ ("How it fits together"). Thin entry point over the
// redesign's ArchitecturePage, fed the English dictionary. Localized variants
// live at src/app/[locale]/architecture/. The hosted-infrastructure content
// that used to be this page is now its #infrastructure section.

import { localizedSeo } from "@/lib/seo";
import ArchitecturePage from "@/app/components/redesign/pages/ArchitecturePage";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/architecture", "en");

export default function Architecture() {
  return <ArchitecturePage t={getDictionary("en")} locale="en" />;
}
