import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import SectionsI18nProvider from "@/app/components/SectionsI18nProvider";

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
      <DocsLayout tree={tree} i18n {...baseOptions}>
        {children}
      </DocsLayout>
    </SectionsI18nProvider>
  );
}
