import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import { ogLocale } from "@/i18n/config";
import { ogSectionsImage } from "@/lib/seo";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

const EN = i18n.defaultLanguage;

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, EN);
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
    .filter((p) => p.lang === EN)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, EN);
  if (!page) notFound();
  const title = page.data.title;
  const description = page.data.description;
  const url = "/sections" + (params.slug?.length ? "/" + params.slug.join("/") : "");
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "CIRIS",
      locale: ogLocale(EN),
      images: [ogSectionsImage(EN)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogSectionsImage(EN)],
    },
  };
}
