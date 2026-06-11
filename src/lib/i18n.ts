import type { I18nConfig } from "fumadocs-core/i18n";

// Fumadocs i18n for the /sections Accord reader. Default (en) unprefixed
// (English at /sections); other locales at /{lang}/sections.
// PROOF: en + es/am/ar. Expand `languages` to all 29 in the fan-out.
export const SECTIONS_LOCALES = ["en", "es", "am", "ar"];
export const i18n: I18nConfig = {
  defaultLanguage: "en",
  languages: SECTIONS_LOCALES,
  hideLocale: "default-locale",
};
