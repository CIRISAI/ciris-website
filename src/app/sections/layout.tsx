import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import SectionsI18nProvider from "@/app/components/SectionsI18nProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SectionsI18nProvider locale={i18n.defaultLanguage}>
      <DocsLayout tree={source.pageTree[i18n.defaultLanguage]} i18n {...baseOptions}>
        {children}
      </DocsLayout>
    </SectionsI18nProvider>
  );
}
