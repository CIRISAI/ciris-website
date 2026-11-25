// The slice of the dictionary the shell needs. RdShell is a client component,
// so whatever it is handed is serialized into every page; the full dictionary
// is 300 to 760 KB per locale.

import type { Dictionary } from "@/i18n/dictionaries";

export function shellCopy(t: Dictionary) {
  const { skip, menu, closeMenu, tryScout, languageLabel, themeLabel, groups, footer } = t.rd;
  return {
    rd: { skip, menu, closeMenu, tryScout, languageLabel, themeLabel, groups, footer, inDev: t.rd.chips.inDev },
    mtBanner: t.common.mtBanner,
  };
}

export type ShellCopy = ReturnType<typeof shellCopy>;
