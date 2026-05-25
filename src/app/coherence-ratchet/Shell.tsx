import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import LevelToggle from "@/app/components/LevelToggle";

type Level = "simple" | "advanced";

export default function Shell({
  level,
  children,
}: {
  level: Level;
  children: React.ReactNode;
}) {
  const subtitle =
    level === "simple"
      ? "Why a powerful mind has to show its work."
      : "A structural account of why hidden state in scaling cognitive systems becomes a civilizational risk.";

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The Coherence Ratchet
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Research testbed
              </span>
              <a
                href="https://doi.org/10.5281/zenodo.18217688"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://zenodo.org/badge/DOI/10.5281/zenodo.18217688.svg"
                  alt="DOI"
                  className="h-5"
                />
              </a>
            </div>
          </div>

          <LevelToggle
            level={level}
            simpleHref="/coherence-ratchet"
            advancedHref="/coherence-ratchet/advanced"
          />

          {children}

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/coherence-collapse-analysis"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              The math behind it
            </a>
            <a
              href="/explore-a-trace"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Explore a trace
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              See the code
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
