"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const AGENT_BLOB = "https://github.com/CIRISAI/CIRISAgent/blob/main";
const AGENT_RAW =
  "https://raw.githubusercontent.com/CIRISAI/CIRISAgent/raw/main";
const RESPONSE_BLOB =
  "https://github.com/CIRISAI/ciris-response-magnifica-humanitas/blob/main";

const KNOWN_REPOS = new Set([
  "CIRISAgent",
  "CIRISLensCore",
  "CIRISNodeCore",
  "CIRISRegistry",
  "CIRISMedical",
  "CIRISBilling",
  "CIRISBridge",
  "CIRISVerify",
  "CIRISEdge",
  "CIRISPersist",
  "CIRISConformance",
  "CIRISManager",
  "CIRISCore",
  "CIRISGUI",
]);

const RESPONSE_FILES = new Set([
  "SEED_DIMENSIONS.yaml",
  "ANNEX_K.md",
  "WEBSITE_INTEGRATION.md",
  "FOUR_BATCH_OVERLAP_ANALYSIS.md",
  "DIMENSIONS_GUIDE.md",
  "TRANSLATION_QUALITY_AUDIT_SYNTHESIS.md",
  "PRIOR_ART.md",
  "MISSION.md",
  "METHODOLOGY.md",
  "LANGUAGE_PRIMER.md",
  "GOVERNANCE_FABRIC_MAPPING_STANDARD.md",
]);

function linkifyText(text: string): string | null {
  const trimmed = text.trim();

  // 1. Cross-repo issue/PR: CIRISFoo#123 (e.g., CIRISLensCore#26)
  const xRepoIssue = trimmed.match(/^([A-Z][A-Za-z]+?)(#)(\d+)$/);
  if (xRepoIssue && KNOWN_REPOS.has(xRepoIssue[1])) {
    return `https://github.com/CIRISAI/${xRepoIssue[1]}/issues/${xRepoIssue[3]}`;
  }

  // 2. Bare #NNN issue (CIRISAgent default)
  const bareIssue = trimmed.match(/^#(\d+)$/);
  if (bareIssue) {
    return `https://github.com/CIRISAI/CIRISAgent/issues/${bareIssue[1]}`;
  }

  // 3. Code reference with line: path/to/file.ext:LINE or :LINE-LINE
  const codeRef = trimmed.match(
    /^([a-zA-Z0-9_./\-]+\.(?:py|ts|tsx|js|md|yml|yaml|txt|toml|json|sh|sql))(?::(\d+)(?:-(\d+))?)?$/,
  );
  if (codeRef) {
    const filePath = codeRef[1];
    const startLine = codeRef[2];
    const endLine = codeRef[3];
    const hash = startLine
      ? endLine
        ? `#L${startLine}-L${endLine}`
        : `#L${startLine}`
      : "";
    // Response-repo files
    if (RESPONSE_FILES.has(filePath.split("/").pop() ?? "")) {
      return `${RESPONSE_BLOB}/${filePath}${hash}`;
    }
    return `${AGENT_BLOB}/${filePath}${hash}`;
  }

  // 4. Dimension reference: D## (internal link)
  const dimRef = trimmed.match(/^(D\d{2})$/);
  if (dimRef) {
    return `/compliance/${dimRef[1]}`;
  }

  // 5. Conflict / T-3: CONF-NN, T3-NN — no link
  return null;
}

function CodeInline({ children }: { children: React.ReactNode }) {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : String(children);
  const href = linkifyText(text);
  const className =
    "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800 dark:bg-gray-800 dark:text-slate-200";
  if (!href) {
    return <code className={className}>{children}</code>;
  }
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} underline decoration-brand-primary/40 underline-offset-2 hover:bg-brand-primary/10 hover:text-brand-primary`}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`${className} underline decoration-brand-primary/40 underline-offset-2 hover:bg-brand-primary/10 hover:text-brand-primary`}
    >
      {children}
    </a>
  );
}

const COMPONENTS: Components = {
  h1: ({ children }) => (
    <h1 className="mt-6 mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-bold text-slate-900 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-5 mb-2 text-base font-semibold text-slate-900 dark:text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-slate-700 dark:text-slate-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc space-y-1.5 text-slate-700 dark:text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1.5 text-slate-700 dark:text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-4 border-brand-primary/40 bg-brand-primary/5 px-3 py-1 italic text-slate-700 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-6 border-slate-200 dark:border-gray-700" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900 dark:text-white">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http") ?? false;
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:bg-brand-primary/10"
      >
        {children}
      </a>
    );
  },
  code: ({ className, children, ...props }) => {
    // Block code (has language- className) — leave as <pre><code>
    if (className && className.startsWith("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return <CodeInline>{children}</CodeInline>;
  },
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-900 dark:bg-gray-900/40 dark:text-slate-100">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-slate-200 text-left dark:border-gray-700">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="pb-2 pr-3 font-semibold text-slate-900 dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2 pr-3 text-slate-700 dark:text-slate-300">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-slate-100 dark:border-gray-800">
      {children}
    </tr>
  ),
};

export default function MarkdownView({ source }: { source: string }) {
  return (
    <div className="text-[15px]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
