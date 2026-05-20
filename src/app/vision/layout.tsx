import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Vision: A Hopeful Alternative to the Gloomy Stories About AI",
  description:
    "The gloomy stories about AI all rest on one old idea that turns out to be wrong: that a self is a separate, walled-off thing. Philosophers call it Cartesian individualism. CIRIS bets the other way. A person is a person through other persons, working together has a shape we can measure, and CIRIS is the software that holds it.",
  alternates: { canonical: "/vision" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/vision",
    title: "Vision: A Hopeful Alternative to the Gloomy Stories About AI",
    description:
      "Gloomy AI stories rest on the walled-off self, the old idea called Cartesian individualism. CIRIS bets on the opposite: a person is a person through other persons, and working together has a shape.",
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
