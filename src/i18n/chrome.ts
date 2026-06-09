// Slim per-locale chrome dictionary (nav + footer labels only). Kept separate
// from the page dictionaries so the locale-aware FloatingNav/Footer (client
// components) don't pull every page's full translations into the client bundle.

import en from "./chrome/en.json";
import es from "./chrome/es.json";
import am from "./chrome/am.json";
import ha from "./chrome/ha.json";
import yo from "./chrome/yo.json";
import { DEFAULT_LOCALE } from "./config";

export type Chrome = typeof en;

const CHROME: Record<string, Chrome> = {
  en,
  es: es as Chrome,
  am: am as Chrome,
  ha: ha as Chrome,
  yo: yo as Chrome,
};

export function getChrome(locale: string): Chrome {
  return CHROME[locale] ?? CHROME[DEFAULT_LOCALE];
}
