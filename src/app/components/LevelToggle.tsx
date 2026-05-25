type Level = "simple" | "advanced";

export default function LevelToggle({
  level,
  simpleHref,
  advancedHref,
}: {
  level: Level;
  simpleHref: string;
  advancedHref: string;
}) {
  const base =
    "rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary";
  const active = "bg-brand-primary text-white";
  const inactive =
    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white";

  return (
    <div
      role="tablist"
      aria-label="Reading level"
      className="mb-10 inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <a
        href={simpleHref}
        role="tab"
        aria-selected={level === "simple"}
        className={`${base} ${level === "simple" ? active : inactive}`}
      >
        Plain English
      </a>
      <a
        href={advancedHref}
        role="tab"
        aria-selected={level === "advanced"}
        className={`${base} ${level === "advanced" ? active : inactive}`}
      >
        Advanced
      </a>
    </div>
  );
}
