import { source } from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

export const dynamicParams = false;

export default async function Page(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await props.params;
  const page = source.getPage(slug, locale);
  if (!page) notFound();
  const MDXContent = page.data.body;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((p) => p.lang !== "en")
    .map((p) => ({ locale: p.lang, slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await props.params;
  const page = source.getPage(slug, locale);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
