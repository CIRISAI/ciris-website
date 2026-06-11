// English /about page. Thin server entry point over the shared AboutContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/about/.

import { localizedSeo } from "@/lib/seo";
import AboutContent from "@/app/components/AboutContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/about", "en");

export default function AboutPage() {
  return <AboutContent t={getDictionary("en")} />;
}
