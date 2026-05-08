import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Models — Open-Model Lineup for Ethical Tool-Centric AI Agents",
  description:
    "Why CIRIS runs on Llama 4 Maverick, Llama 4 Scout, Qwen 3.6, and Gemma 4 — three independent model families for fallback robustness and 29-language polyglot reach. Five non-negotiable criteria: structured outputs, 128K+ context, cost efficiency, multi-provider availability, latency.",
  alternates: { canonical: "/models" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/models",
    title: "Models — Open-Model Lineup for Ethical AI Agents",
    description:
      "Llama 4 Maverick, Llama 4 Scout, Qwen 3.6, Gemma 4. Three independent model families chosen for ethical, tool-centric agents.",
  },
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
