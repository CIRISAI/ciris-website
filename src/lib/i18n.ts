import type { I18nConfig } from "fumadocs-core/i18n";
import { ALL_LOCALE_CODES, DEFAULT_LOCALE } from "@/i18n/config";

// Fumadocs i18n for the /sections Accord reader. English (default) stays at
// /sections; every other locale renders at /{lang}/sections. Content lives in
// content/docs/**.{lang}.mdx; sidebar/titles in meta.{lang}.json + frontmatter.
export const i18n: I18nConfig = {
  defaultLanguage: DEFAULT_LOCALE,
  languages: ALL_LOCALE_CODES as string[],
  hideLocale: "default-locale",
};
