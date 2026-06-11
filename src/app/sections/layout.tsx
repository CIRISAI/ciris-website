import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree[i18n.defaultLanguage]} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
