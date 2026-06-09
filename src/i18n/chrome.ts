// AUTO-GENERATED slim chrome map (merge_all.py). Nav + footer labels only.

import en from "./chrome/en.json";
import es from "./chrome/es.json";
import am from "./chrome/am.json";
import ha from "./chrome/ha.json";
import yo from "./chrome/yo.json";
import sw from "./chrome/sw.json";
import ta from "./chrome/ta.json";
import te from "./chrome/te.json";
import mr from "./chrome/mr.json";
import pa from "./chrome/pa.json";
import my from "./chrome/my.json";
import bn from "./chrome/bn.json";
import hi from "./chrome/hi.json";
import vi from "./chrome/vi.json";
import id from "./chrome/id.json";
import th from "./chrome/th.json";
import tr from "./chrome/tr.json";
import uk from "./chrome/uk.json";
import ru from "./chrome/ru.json";
import ko from "./chrome/ko.json";
import ja from "./chrome/ja.json";
import zh from "./chrome/zh.json";
import de from "./chrome/de.json";
import fr from "./chrome/fr.json";
import it from "./chrome/it.json";
import pt from "./chrome/pt.json";
import ar from "./chrome/ar.json";
import fa from "./chrome/fa.json";
import ur from "./chrome/ur.json";
import { DEFAULT_LOCALE } from "./config";

export type Chrome = typeof en;

const CHROME: Record<string, Chrome> = {
  en,
  es: es as Chrome,
  am: am as Chrome,
  ha: ha as Chrome,
  yo: yo as Chrome,
  sw: sw as Chrome,
  ta: ta as Chrome,
  te: te as Chrome,
  mr: mr as Chrome,
  pa: pa as Chrome,
  my: my as Chrome,
  bn: bn as Chrome,
  hi: hi as Chrome,
  vi: vi as Chrome,
  id: id as Chrome,
  th: th as Chrome,
  tr: tr as Chrome,
  uk: uk as Chrome,
  ru: ru as Chrome,
  ko: ko as Chrome,
  ja: ja as Chrome,
  zh: zh as Chrome,
  de: de as Chrome,
  fr: fr as Chrome,
  it: it as Chrome,
  pt: pt as Chrome,
  ar: ar as Chrome,
  fa: fa as Chrome,
  ur: ur as Chrome,
};

export function getChrome(locale: string): Chrome {
  return CHROME[locale] ?? CHROME[DEFAULT_LOCALE];
}
