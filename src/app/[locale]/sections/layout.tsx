import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { I18nProvider } from "fumadocs-ui/i18n";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { SECTIONS_UI } from "@/lib/sections-ui-i18n";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tree = source.pageTree[locale] ?? source.pageTree["en"];
  return (
    <I18nProvider locale={locale} translations={SECTIONS_UI[locale]}>
      <DocsLayout tree={tree} {...baseOptions}>
        {children}
      </DocsLayout>
    </I18nProvider>
  );
}
