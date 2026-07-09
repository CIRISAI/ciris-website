// Interim stub landing (/stewardship) so the Safety umbrella scene's "Explore" button
// resolves. Shared thin content in @/app/components/SafetyStub; localized
// variant lives at src/app/[locale]/stewardship/. To be expanded when /safety becomes
// the umbrella hub.

import { localizedSeo } from "@/lib/seo";
import SafetyStub from "@/app/components/SafetyStub";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/stewardship", "en");

export default function Page() {
  return <SafetyStub variant="stewardship" t={getDictionary("en")} locale="en" />;
}
