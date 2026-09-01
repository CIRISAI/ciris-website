// English homepage (site root). Thin entry point over the shared HomeHero,
// fed the English dictionary. Localized variants live at src/app/[locale]/.

import { localizedSeo } from "@/lib/seo";
import HomeHero from "@/app/components/HomeHero";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/", "en");

export default function Homepage() {
  return <HomeHero t={getDictionary("en")} locale="en" />;
}
