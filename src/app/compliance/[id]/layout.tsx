import type { Metadata } from "next";
import { getDimension } from "../lib/seed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const d = await getDimension(id);
  if (!d) {
    return {
      title: "Dimension not found | CIRIS",
    };
  }
  const title = `${d.id} ${d.prefix} | CIRIS Compliance`;
  const description = `${d.gloss}. ${d.tier} dimension; Accord principle ${d.accord_principle}; ${d.attestations.total} attestations across the four governance batches.`;
  return {
    title,
    description,
    alternates: { canonical: `/compliance/${d.id}` },
    openGraph: {
      type: "article",
      url: `https://ciris.ai/compliance/${d.id}`,
      title,
      description,
    },
  };
}

export default function DimensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
