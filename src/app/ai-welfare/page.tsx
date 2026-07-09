// Interim stub landing (/ai-welfare) so the Safety umbrella scene's "Explore" button
// resolves. Shared thin content in @/app/components/SafetyStub; localized
// variant lives at src/app/[locale]/ai-welfare/. To be expanded when /safety becomes
// the umbrella hub.

import { localizedSeo } from "@/lib/seo";
import SafetyStub from "@/app/components/SafetyStub";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/ai-welfare", "en");

export default function Page() {
  return <SafetyStub variant="ai-welfare" t={getDictionary("en")} locale="en" />;
}
