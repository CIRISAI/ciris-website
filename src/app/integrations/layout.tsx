import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations | CIRIS Adapters",
  description: "CIRIS adapters for Home Assistant, Discord, Reddit, MCP, and more. Build custom integrations with the self-contained adapter architecture.",
  keywords: [
    "CIRIS integrations",
    "Home Assistant AI",
    "Discord bot",
    "Reddit integration",
    "MCP protocol",
    "AI adapters",
    "smart home AI",
  ],
};

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
