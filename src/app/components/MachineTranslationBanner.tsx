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
    <div
      className="relative z-40 px-4 py-2.5 text-center text-sm"
      style={{
        background: "var(--mt-bg)",
        borderBottom: "1px solid var(--mt-border)",
        color: "var(--mt-text)",
      }}
    >
      <span aria-hidden className="mr-1.5">
        🤖
      </span>
      <span className="font-semibold">{lead}</span>{" "}
      <span className="opacity-90">{body}</span>{" "}
      <a
        href={ISSUE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2"
        style={{ color: "var(--mt-link)" }}
      >
        {cta}
      </a>
    </div>
  );
}
