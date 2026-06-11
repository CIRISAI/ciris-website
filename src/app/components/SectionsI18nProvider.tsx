"use client";

// Wraps the /sections reader in fumadocs' i18n context so the built-in
// language switcher appears and navigates correctly under our routing
// (English at /sections, locales at /{lang}/sections; hideLocale: default).

import { I18nProvider } from "fumadocs-ui/i18n";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { LOCALES, DEFAULT_LOCALE, ALL_LOCALE_CODES } from "@/i18n/config";
import { SECTIONS_UI } from "@/lib/sections-ui-i18n";

const CODES = new Set(ALL_LOCALE_CODES);
const LOCALE_ITEMS = LOCALES.map((l) => ({ locale: l.code, name: l.nativeName }));

export default function SectionsI18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const onLocaleChange = (value: string) => {
    const segs = pathname.split("/").filter(Boolean);
    // strip an existing (non-default) locale prefix
    if (segs.length && CODES.has(segs[0]) && segs[0] !== DEFAULT_LOCALE) {
      segs.shift();
    }
    const rest = segs.join("/");
    const target =
      value === DEFAULT_LOCALE ? `/${rest}` : `/${value}/${rest}`;
    router.push(target.replace(/\/+/g, "/") || "/");
  };
  return (
    <I18nProvider
      locale={locale}
      locales={LOCALE_ITEMS}
      translations={SECTIONS_UI[locale]}
      onLocaleChange={onLocaleChange}
    >
      {children}
    </I18nProvider>
  );
}
