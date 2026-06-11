import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import SectionsI18nProvider from "@/app/components/SectionsI18nProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SectionsI18nProvider locale={i18n.defaultLanguage}>
      <DocsLayout tree={source.pageTree[i18n.defaultLanguage]} {...baseOptions}>
        {children}
      </DocsLayout>
      <LanguageSwitcher currentLocale={i18n.defaultLanguage} large />
    </SectionsI18nProvider>
  );
}
