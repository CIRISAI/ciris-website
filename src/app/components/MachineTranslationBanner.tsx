// Honest machine-translation disclaimer, shown on every non-English page.
// No native-review pipeline exists by design — instead we tell readers plainly
// that this is machine output and route corrections to the public repo. Text is
// localized via the common.mtBanner dictionary block.

const ISSUE_URL = "https://github.com/CIRISAI/ciris-website/issues/new";

export default function MachineTranslationBanner({
  lead,
  body,
  cta,
}: {
  lead: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="relative z-40 border-b border-amber-300/60 bg-amber-50 px-4 py-2.5 text-center text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-200">
      <span aria-hidden className="mr-1.5">
        🤖
      </span>
      <span className="font-semibold">{lead}</span>{" "}
      <span className="opacity-90">{body}</span>{" "}
      <a
        href={ISSUE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline decoration-amber-500/60 underline-offset-2 hover:decoration-amber-700"
      >
        {cta}
      </a>
    </div>
  );
}
