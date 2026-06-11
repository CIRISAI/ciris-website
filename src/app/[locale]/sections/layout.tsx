import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import SectionsI18nProvider from "@/app/components/SectionsI18nProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

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
    <SectionsI18nProvider locale={locale}>
      <DocsLayout tree={tree} {...baseOptions}>
        {children}
      </DocsLayout>
      <LanguageSwitcher currentLocale={locale} large />
    </SectionsI18nProvider>
  );
}
