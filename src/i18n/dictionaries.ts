// AUTO-GENERATED locale map (merge_all.py). en.json is the source of truth and
// its shape defines the Dictionary type; every other locale must match it.

import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import am from "./dictionaries/am.json";
import ha from "./dictionaries/ha.json";
import yo from "./dictionaries/yo.json";
import sw from "./dictionaries/sw.json";
import ta from "./dictionaries/ta.json";
import te from "./dictionaries/te.json";
import mr from "./dictionaries/mr.json";
import pa from "./dictionaries/pa.json";
import my from "./dictionaries/my.json";
import bn from "./dictionaries/bn.json";
import hi from "./dictionaries/hi.json";
import vi from "./dictionaries/vi.json";
import id from "./dictionaries/id.json";
import th from "./dictionaries/th.json";
import tr from "./dictionaries/tr.json";
import uk from "./dictionaries/uk.json";
import ru from "./dictionaries/ru.json";
import ko from "./dictionaries/ko.json";
import ja from "./dictionaries/ja.json";
import zh from "./dictionaries/zh.json";
import de from "./dictionaries/de.json";
import fr from "./dictionaries/fr.json";
import it from "./dictionaries/it.json";
import pt from "./dictionaries/pt.json";
import ar from "./dictionaries/ar.json";
import fa from "./dictionaries/fa.json";
import ur from "./dictionaries/ur.json";
import { DEFAULT_LOCALE } from "./config";

export type Dictionary = typeof en;

const DICTIONARIES: Record<string, Dictionary> = {
  en,
  es: es as Dictionary,
  am: am as Dictionary,
  ha: ha as Dictionary,
  yo: yo as Dictionary,
  sw: sw as Dictionary,
  ta: ta as Dictionary,
  te: te as Dictionary,
  mr: mr as Dictionary,
  pa: pa as Dictionary,
  my: my as Dictionary,
  bn: bn as Dictionary,
  hi: hi as Dictionary,
  vi: vi as Dictionary,
  id: id as Dictionary,
  th: th as Dictionary,
  tr: tr as Dictionary,
  uk: uk as Dictionary,
  ru: ru as Dictionary,
  ko: ko as Dictionary,
  ja: ja as Dictionary,
  zh: zh as Dictionary,
  de: de as Dictionary,
  fr: fr as Dictionary,
  it: it as Dictionary,
  pt: pt as Dictionary,
  ar: ar as Dictionary,
  fa: fa as Dictionary,
  ur: ur as Dictionary,
};

export function getDictionary(locale: string): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
