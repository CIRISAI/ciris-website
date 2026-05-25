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
      ? "A network of AI agents that thinks together — only in the open."
      : "A decentralized ethical superintelligence: the system claim, the architecture, and the bets being made.";

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-44">
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              The CIRIS Federation
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          <LevelToggle
            level={level}
            simpleHref="/federation"
            advancedHref="/federation/advanced"
          />

          {children}

          <section className="border-t border-gray-200 pt-12 text-center dark:border-gray-700">
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
              You do not have to solve AI safety one agent at a time. You solve
              it for the supervision layer, and let the structure carry the
              rest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/coherence-ratchet"
                className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
              >
                The pressure side
              </a>
              <a
                href="/ciris-scoring"
                className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                See it scored live
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Engage on GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
