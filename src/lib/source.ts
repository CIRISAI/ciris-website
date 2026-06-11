import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { i18n } from "./i18n";

// Assigns /sections URLs to the Accord pages; i18n adds /{lang}/sections/* for
// non-default locales (translated content lives in content/docs/**.{lang}.mdx).
export const source = loader({
  i18n,
  baseUrl: "/sections",
  source: docs.toFumadocsSource(),
});
