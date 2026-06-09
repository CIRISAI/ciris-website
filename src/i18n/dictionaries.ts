// Per-locale dictionary loader. Static map (not dynamic import) so the static
// export bundles every locale at build time. en.json is the source of truth and
// its shape defines the Dictionary type — every other locale must match it.

import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import am from "./dictionaries/am.json";
import ha from "./dictionaries/ha.json";
import yo from "./dictionaries/yo.json";
import { DEFAULT_LOCALE } from "./config";

export type Dictionary = typeof en;

const DICTIONARIES: Record<string, Dictionary> = {
  en,
  es: es as Dictionary,
  am: am as Dictionary,
  ha: ha as Dictionary,
  yo: yo as Dictionary,
};

export function getDictionary(locale: string): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
