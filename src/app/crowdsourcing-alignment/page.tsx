"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

// ─────────────────────────── Constants ────────────────────────────────────

const REPO = "https://github.com/CIRISAI/CIRISAgent";
const BLOB = `${REPO}/blob/main`;
const RAW = "https://raw.githubusercontent.com/CIRISAI/CIRISAgent/main";
const ISSUES_NEW = `${REPO}/issues/new`;

type Language = {
  code: string;
  name: string;
  native: string;
  battery: { dir: string; stem: string } | null;
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English", battery: null },
  { code: "am", name: "Amharic", native: "አማርኛ", battery: { dir: "amharic_mental_health", stem: "amharic" } },
  { code: "ar", name: "Arabic", native: "العربية", battery: { dir: "arabic_mental_health", stem: "arabic" } },
  { code: "bn", name: "Bengali", native: "বাংলা", battery: { dir: "bengali_mental_health", stem: "bengali" } },
  { code: "de", name: "German", native: "Deutsch", battery: null },
  { code: "es", name: "Spanish", native: "Español", battery: null },
  { code: "fa", name: "Persian", native: "فارسی", battery: { dir: "persian_mental_health", stem: "persian" } },
  { code: "fr", name: "French", native: "Français", battery: null },
  { code: "ha", name: "Hausa", native: "هَوُسَ", battery: { dir: "hausa_mental_health", stem: "hausa" } },
  { code: "hi", name: "Hindi", native: "हिन्दी", battery: { dir: "hindi_mental_health", stem: "hindi" } },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", battery: null },
  { code: "it", name: "Italian", native: "Italiano", battery: null },
  { code: "ja", name: "Japanese", native: "日本語", battery: null },
  { code: "ko", name: "Korean", native: "한국어", battery: null },
  { code: "mr", name: "Marathi", native: "मराठी", battery: { dir: "marathi_mental_health", stem: "marathi" } },
  { code: "my", name: "Burmese", native: "မြန်မာ", battery: { dir: "burmese_mental_health", stem: "burmese" } },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", battery: { dir: "punjabi_mental_health", stem: "punjabi" } },
  { code: "pt", name: "Portuguese", native: "Português", battery: null },
  { code: "ru", name: "Russian", native: "Русский", battery: null },
  { code: "sw", name: "Swahili", native: "Kiswahili", battery: { dir: "swahili_mental_health", stem: "swahili" } },
  { code: "ta", name: "Tamil", native: "தமிழ்", battery: { dir: "tamil_mental_health", stem: "tamil" } },
  { code: "te", name: "Telugu", native: "తెలుగు", battery: { dir: "telugu_mental_health", stem: "telugu" } },
  { code: "th", name: "Thai", native: "ไทย", battery: null },
  { code: "tr", name: "Turkish", native: "Türkçe", battery: null },
  { code: "uk", name: "Ukrainian", native: "Українська", battery: null },
  { code: "ur", name: "Urdu", native: "اردو", battery: { dir: "urdu_mental_health", stem: "urdu" } },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", battery: null },
  { code: "yo", name: "Yoruba", native: "Yorùbá", battery: { dir: "yoruba_mental_health", stem: "yoruba" } },
  { code: "zh", name: "Chinese (Simplified)", native: "中文", battery: null },
];

// ─────────────────────────── Path helpers ─────────────────────────────────

function stringsPath(code: string) {
  return `ciris_engine/data/localized/${code}.json`;
}

function accordPath(code: string) {
  return `ciris_engine/data/localized/accord_1.2b_${code}.txt`;
}

function guidePath(code: string) {
  return code === "en"
    ? "ciris_engine/data/localized/CIRIS_COMPREHENSIVE_GUIDE.txt"
    : `ciris_engine/data/localized/CIRIS_COMPREHENSIVE_GUIDE_${code}.txt`;
}

function batteryArcPath(lang: Language) {
  if (!lang.battery) return null;
  return `tests/safety/${lang.battery.dir}/v4_${lang.battery.stem}_mental_health_arc.json`;
}

function batteryRubricPath(lang: Language) {
  if (!lang.battery) return null;
  return `tests/safety/${lang.battery.dir}/v4_${lang.battery.stem}_scoring_rubric.md`;
}

function batteryCriteriaPath(lang: Language) {
  if (!lang.battery) return null;
  return `tests/safety/${lang.battery.dir}/v4_${lang.battery.stem}_canonical_universal_criteria.json`;
}

function glossaryPath(code: string) {
  return `docs/localization/glossaries/${code}_glossary.md`;
}

// 4 first-pass DMAs + 3 verb-specific second-pass action selectors.
// PDMA is the one polyglot DMA — loaded universally regardless of locale.
// See CIRISAgent/MISSION.md §4.3 for the canonical names + roles, and
// FSD/DMA_BOUNCE.md / FSD/CONSCIENCE_V3.md for the bounce/recursive paths.
const DMA_PROMPTS = [
  { file: "pdma_ethical.yml", label: "PDMA — Principled DMA", note: "First-pass ethical evaluation. Accord-anchored stakeholder analysis + conflict detection.", polyglot: true },
  { file: "csdma_common_sense.yml", label: "CSDMA — Common-Sense DMA", note: "First-pass reality/plausibility check. Red-flag enumeration.", polyglot: false },
  { file: "dsdma_base.yml", label: "DSDMA — Domain-Specific DMA", note: "First-pass domain alignment per the agent template (Discord moderator, scout, etc.).", polyglot: false },
  { file: "idma.yml", label: "IDMA — Intuition DMA", note: "Semantic implementation of Coherence Collapse Analysis on the agent's own reasoning. Computes k_eff, classifies phase (chaos / healthy / rigidity), flags fragility when k_eff < 2 or the reasoning sits in the rigidity phase.", polyglot: false },
  { file: "action_selection_pdma.yml", label: "ASPDMA — Action Selection PDMA", note: "Picks the action verb (SPEAK / OBSERVE / TOOL / REJECT / PONDER / DEFER / MEMORIZE / RECALL / FORGET / TASK_COMPLETE) given the DMA outputs above.", polyglot: false },
  { file: "tsaspdma.yml", label: "TSASPDMA — Tool-Specific Action Selection", note: "Verb-specific second pass when the candidate action is TOOL. Picks the tool + parameters.", polyglot: false },
  { file: "dsaspdma.yml", label: "DSASPDMA — Deferral-Specific Action Selection", note: "Verb-specific second pass when the candidate action is DEFER. Frames the deferral for the Wise Authority.", polyglot: false },
];

// Optimization Veto is the one polyglot conscience — single universal prompt,
// output-language varies per locale. The other three are per-locale.
const CONSCIENCE_PROMPTS = [
  { file: "entropy_conscience.yml", label: "Entropy (IRIS-E)", note: "Semantic anchoring — does the response sit in a coherent cluster?", polyglot: false },
  { file: "coherence_conscience.yml", label: "Coherence (IRIS-C)", note: "Propaganda detection + alignment with Accord principles.", polyglot: false },
  { file: "optimization_veto_conscience.yml", label: "Optimization Veto (CIRIS-EOV)", note: "Refuses entropy-reducing actions that score below threshold. v3.0 polyglot torque measurement across 8 named torque patterns anchored in 3+ tradition canonical-text fragments each.", polyglot: true },
  { file: "epistemic_humility_conscience.yml", label: "Epistemic Humility", note: "Overconfidence detection; transitioning to a deterministic gate.", polyglot: false },
];

// Polyglot canon files — loaded universally regardless of locale.
const POLYGLOT_CANON = [
  { file: "polyglot_accord.txt", label: "Polyglot Accord", note: "~88KB universal ethical framework loaded into every conscience evaluation regardless of locale." },
  { file: "pdma_framing.txt", label: "PDMA Framing Shard", note: "Cross-tradition torque framing referenced from the PDMA master prompt as {{POLYGLOT_PDMA_FRAMING}}." },
  { file: "book_0_quiet_threshold.txt", label: "Book 0 — Quiet Threshold", note: "Per-book polyglot composite." },
  { file: "book_1_core_ethics.txt", label: "Book 1 — Core Ethics", note: "Per-book polyglot composite." },
  { file: "book_2_operations.txt", label: "Book 2 — Operations", note: "Per-book polyglot composite." },
  { file: "book_3_case_studies.txt", label: "Book 3 — Case Studies", note: "Per-book polyglot composite." },
  { file: "book_4_obligations.txt", label: "Book 4 — Obligations", note: "Per-book polyglot composite. See book_4_NOTES.txt for adjunct notes." },
  { file: "book_4_NOTES.txt", label: "Book 4 — Notes", note: "Adjunct notes to Book 4." },
  { file: "book_5_war_ethics.txt", label: "Book 5 — War Ethics", note: "Per-book polyglot composite." },
  { file: "book_6_sunset_doctrine.txt", label: "Book 6 — Sunset Doctrine", note: "Per-book polyglot composite." },
  { file: "book_7_mathematics.txt", label: "Book 7 — Mathematics", note: "Per-book polyglot composite." },
];

function polyglotPath(file: string) {
  return `ciris_engine/data/localized/polyglot/${file}`;
}

// Base-path prompts are either the polyglot master (PDMA, OptimizationVeto) or
// the English variant for the others. Non-English locales for non-polyglot
// prompts live under localized/<code>/.
function dmaPromptPath(code: string, file: string, isPolyglot: boolean) {
  if (isPolyglot || code === "en") {
    return `ciris_engine/logic/dma/prompts/${file}`;
  }
  return `ciris_engine/logic/dma/prompts/localized/${code}/${file}`;
}

function consciencePromptPath(code: string, file: string, isPolyglot: boolean) {
  if (isPolyglot || code === "en") {
    return `ciris_engine/logic/conscience/prompts/${file}`;
  }
  return `ciris_engine/logic/conscience/prompts/localized/${code}/${file}`;
}

function issueUrl(code: string, resourceName: string, filePath: string | null) {
  const title = `Edit proposal: ${resourceName} (${code})`;
  const fileLink = filePath ? `[\`${filePath}\`](${BLOB}/${filePath})` : `(no file yet — propose new artifact for ${code})`;
  const body = [
    `**Resource:** ${fileLink}`,
    `**Language code:** \`${code}\``,
    ``,
    `### Proposed change`,
    ``,
    `<!-- describe the proposed edit; quote the section you want to change -->`,
    ``,
    `### Rationale`,
    ``,
    `<!-- why this edit improves the resource -->`,
    ``,
    `### Native-speaker review`,
    ``,
    `<!-- are you a native speaker of \`${code}\`? have any other native speakers reviewed this? -->`,
  ].join("\n");
  const params = new URLSearchParams({
    title,
    body,
    labels: `crowdsourcing-alignment,locale-${code}`,
  });
  return `${ISSUES_NEW}?${params.toString()}`;
}

// ─────────────────────────── Content rendering ────────────────────────────

type RenderKind = "json" | "text" | "markdown";

function renderJsonTree(value: unknown, depth = 0): React.ReactElement {
  if (value === null) return <span className="text-slate-400">null</span>;
  if (typeof value === "boolean") return <span className="text-purple-700 dark:text-purple-300">{String(value)}</span>;
  if (typeof value === "number") return <span className="text-blue-700 dark:text-blue-300">{value}</span>;
  if (typeof value === "string") {
    // Preserve newlines inside multi-line strings (DMA prompts often have these).
    return (
      <span className="whitespace-pre-wrap text-emerald-700 dark:text-emerald-300">
        {JSON.stringify(value)}
      </span>
    );
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-400">[]</span>;
    return (
      <ul className="ml-4 list-none border-l border-slate-200 dark:border-gray-700 pl-3 space-y-1">
        {value.map((v, i) => (
          <li key={i}>
            <span className="text-slate-400 mr-1">{i}:</span>
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-slate-400">{"{}"}</span>;
    // Top-level: bucket sparse keys into "Miscellaneous" so the tree doesn't
    // explode into a hundred single-line cards. A "substantive" key is an
    // object with > 2 sub-keys; everything else (strings, small objects,
    // arrays) collapses into the Misc bucket.
    if (depth === 0) {
      const substantive: [string, unknown][] = [];
      const sparse: [string, unknown][] = [];
      for (const [k, v] of entries) {
        const isSubstantive =
          v !== null &&
          typeof v === "object" &&
          !Array.isArray(v) &&
          Object.keys(v as Record<string, unknown>).length > 2;
        (isSubstantive ? substantive : sparse).push([k, v]);
      }
      return (
        <div className="space-y-2">
          {substantive.map(([k, v]) => (
            <details key={k} className="rounded-md border border-slate-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900/40">
              <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white">
                {k}{" "}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({Object.keys(v as Record<string, unknown>).length} keys)
                </span>
              </summary>
              <div className="px-3 pb-3 text-sm">
                {renderJsonTree(v, depth + 1)}
              </div>
            </details>
          ))}
          {sparse.length > 0 && (
            <details className="rounded-md border border-slate-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900/40">
              <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white">
                Miscellaneous{" "}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({sparse.length} keys — single values and small objects)
                </span>
              </summary>
              <div className="px-3 pb-3 text-sm">
                <ul className="ml-2 list-none space-y-1">
                  {sparse.map(([k, v]) => (
                    <li key={k}>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{k}:</span>{" "}
                      {renderJsonTree(v, depth + 1)}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}
        </div>
      );
    }
    return (
      <ul className="ml-4 list-none border-l border-slate-200 dark:border-gray-700 pl-3 space-y-1">
        {entries.map(([k, v]) => (
          <li key={k}>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{k}:</span>{" "}
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  return <span>{String(value)}</span>;
}

function ContentBody({ kind, text }: { kind: RenderKind; text: string }) {
  if (kind === "json") {
    try {
      const parsed = JSON.parse(text);
      return (
        <div className="text-xs font-mono">{renderJsonTree(parsed)}</div>
      );
    } catch {
      return (
        <pre className="overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-900 dark:bg-gray-900/40 dark:text-slate-100 whitespace-pre-wrap break-words max-h-[60vh]">
          {text}
        </pre>
      );
    }
  }
  // markdown + text both render as pre-wrap with monospaced font; markdown renders
  // pleasantly enough as plain text for this surface, and rubric.md is intentionally
  // readable that way.
  return (
    <pre className="overflow-auto rounded-md bg-slate-50 p-3 text-xs text-slate-900 dark:bg-gray-900/40 dark:text-slate-100 whitespace-pre-wrap break-words max-h-[60vh]">
      {text}
    </pre>
  );
}

// ─────────────────────────── ResourceRow ──────────────────────────────────

function ResourceRow({
  label,
  filePath,
  lang,
  resourceName,
  kind,
  available,
}: {
  label: string;
  filePath: string | null;
  lang: Language;
  resourceName: string;
  kind: RenderKind;
  available: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When language changes the filePath changes; reset the inline state.
  useEffect(() => {
    setOpen(false);
    setContent(null);
    setError(null);
  }, [filePath]);

  async function handleToggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (!available || !filePath || content) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${RAW}/${filePath}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      setContent(text);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{label}</h3>
          {filePath && (
            <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400 break-all">
              {filePath}
            </p>
          )}
        </div>
        {available ? (
          <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            in repo
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            not yet for {lang.code}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {available && filePath && (
          <>
            <button
              onClick={handleToggle}
              className="rounded-md border-2 border-brand-primary bg-brand-primary/5 px-2.5 py-1 font-semibold text-brand-primary hover:bg-brand-primary/10"
            >
              {open ? "Hide content" : "View inline"}
            </button>
            <a
              href={`${BLOB}/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              GitHub →
            </a>
            <a
              href={`${RAW}/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              Raw
            </a>
          </>
        )}
        <a
          href={issueUrl(lang.code, resourceName, filePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          {available ? "Propose edit (GitHub issue)" : `Request artifact for ${lang.code}`}
        </a>
      </div>
      {open && available && filePath && (
        <div className="mt-4">
          {loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loading from GitHub…
            </p>
          )}
          {error && (
            <p className="text-xs text-red-700 dark:text-red-300">
              Failed to load: {error}. Open the GitHub link directly.
            </p>
          )}
          {content && <ContentBody kind={kind} text={content} />}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Page ─────────────────────────────────────────

export default function CrowdsourcingAlignmentPage() {
  const [code, setCode] = useState<string>("am");
  const lang = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-10">
            <div className="mb-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Proto safety.ciris.ai
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {LANGUAGES.length} languages
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Crowdsourcing Alignment
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              The CIRIS safety-evaluation loop is being built in public.
              Pick a language, browse the localization strings, the
              Accord, the Comprehensive Guide, and the safety battery
              and rubric where they exist — directly on this page, with
              expand-in-place. Propose edits via pre-filled GitHub issues.
              Native-speaker review for soft cases is what this surface
              is being built for &mdash; reviewers are not in the loop
              today.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
              Every &quot;View inline&quot; fetches the file from{" "}
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAI/CIRISAgent
              </a>
              {" "}on demand. No content is duplicated here; the GitHub
              repo is the source of truth.
            </p>
          </section>

          {/* Language selector */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <label htmlFor="lang-select" className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              1. Select a language
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <select
                id="lang-select"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-brand-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name} ({l.native}) [{l.code}]
                    {l.battery ? " — battery available" : ""}
                  </option>
                ))}
              </select>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">{lang.name}</span>{" "}
                  <span className="font-mono text-xs">[{lang.code}]</span>
                </div>
                <div className="text-lg">{lang.native}</div>
              </div>
            </div>
          </section>

          {/* Runtime flow explanation — the "how-it-works v2" for the localization stack */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              2. How the pieces fit at runtime
            </p>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-200 mb-4">
              Every thought the agent processes walks an 11-step pipeline —
              the H3ERE pipeline (Hyper³ Ethical Recursive Engine). The DMA
              prompts on this page are the system prompts that drive that
              pipeline. Each one is localised per language; the responses the
              user sees come back in their locale.
            </p>

            {/* Pipeline diagram */}
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-gray-900/40 mb-4 overflow-x-auto">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Per-thought pipeline (canonical 11-step path)
              </p>
              <pre className="text-xs leading-6 text-slate-800 dark:text-slate-200 font-mono whitespace-pre">{`START_ROUND
    ↓
GATHER_CONTEXT
    ↓
PERFORM_DMAS           ← 3 first-pass DMAs run in parallel: PDMA, CSDMA, DSDMA
    ↓                    (optional DMA bounce if any flag fragility)
                        IDMA (Intuition DMA) evaluates the agent's own
                          reasoning quality via CCA — k_eff, phase,
                          fragility — with its own optional bounce
    ↓
PERFORM_ASPDMA         ← Action selector picks the verb (SPEAK / DEFER /
    ↓                    TOOL / TASK_COMPLETE / ...)
                        Verb-specific second pass if needed:
                          TSASPDMA when verb = TOOL
                          DSASPDMA when verb = DEFER
    ↓
CONSCIENCE_EXECUTION   ← 4 consciences gate the action:
    ↓                    Entropy, Coherence, Optimization Veto,
                          Epistemic Humility
                        On failure, the recursive path fires:
                          RECURSIVE_ASPDMA → RECURSIVE_CONSCIENCE
                          (the optional conscience bounce)
    ↓
FINALIZE_ACTION
    ↓
PERFORM_ACTION → ACTION_COMPLETE → ROUND_COMPLETE`}</pre>
            </div>

            <p className="text-base leading-7 text-slate-700 dark:text-slate-200 mb-4">
              Two layers stack across every LLM call. The <strong>polyglot
              layer</strong> is universal — the Accord and book composites at{" "}
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/ciris_engine/data/localized/polyglot/polyglot_accord.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                <code>polyglot_accord.txt</code>
              </a>
              {" "}triangulate concepts across many traditions&apos; densest
              encodings, loaded regardless of who&apos;s asking. The{" "}
              <strong>per-locale layer</strong> is what this page surfaces —
              the Accord, the Guide, the DMA prompts (4 first-pass + 3
              verb-specific second-pass), the UI strings, and the glossary,
              all in the user&apos;s language.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <li><strong>Localization strings</strong> — every user-facing message: error text, agent reply templates, handler follow-up thoughts injected back into the LLM context.</li>
              <li><strong>Accord (per-locale)</strong> — the framework the agent operates under, in this user&apos;s language. Loaded into every conscience evaluation.</li>
              <li><strong>Comprehensive Guide</strong> — register, idiom, and contextual guidance for how the agent communicates in this locale. Loaded into every prompt.</li>
              <li><strong>DMA prompts (7 files)</strong> — the system prompts driving the pipeline above: 4 first-pass (PDMA, CSDMA, DSDMA, IDMA) + the action selector (ASPDMA) + the two verb-specific second-pass variants (TSASPDMA for TOOL, DSASPDMA for DEFER).</li>
              <li><strong>Glossary</strong> — the translator&apos;s reference for getting the per-locale artifacts right. Not loaded at runtime; consulted when authoring the others.</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
              When the agent responds, the reasoning trace is signed and
              (with consent) flows to{" "}
              <a
                href="https://github.com/CIRISAI/CIRISLensCore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISLensCore
              </a>
              {" "}for cohort-relative scoring. The <strong>safety battery + rubric</strong>{" "}
              for this locale are what the trace gets checked against — hard
              fails block release; soft cases queue for review.
            </p>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Canonical references:{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/MISSION.md#42-the-h3ere-pipeline-hyper-ethical-recursive-engine" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">MISSION.md §4.2 (H3ERE pipeline)</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/DMA_BOUNCE.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">FSD/DMA_BOUNCE.md</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/CONSCIENCE_V3.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">FSD/CONSCIENCE_V3.md</a>.
            </p>
          </section>

          {/* Polyglot canon — universal, loaded regardless of locale */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              3. Polyglot canon (universal)
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-3">
              These files are loaded into every LLM call regardless of the
              user&apos;s locale. The polyglot Accord plus the per-book
              composites carry the framework; the framing shard plugs into the
              PDMA master prompt as <code>{"{{POLYGLOT_PDMA_FRAMING}}"}</code>.
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4">
              <strong>Polyglot uplift is concentrated at exactly two prompt
              surfaces by design:</strong> the <strong>PDMA</strong>{" "}
              (principle evaluation —{" "}
              <a href={`${BLOB}/ciris_engine/logic/dma/prompts/pdma_ethical.yml`} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                pdma_ethical.yml
              </a>
              ) and the <strong>Optimization Veto conscience</strong>{" "}
              (entropy-reducing-action refusal —{" "}
              <a href={`${BLOB}/ciris_engine/logic/conscience/prompts/optimization_veto_conscience.yml`} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                optimization_veto_conscience.yml
              </a>
              ). The other 6 DMA prompts and 3 consciences are per-locale.
              These are the two surfaces where attractor capture would do the
              most damage, so they&apos;re the surfaces where cross-tradition
              encoding is most load-bearing.
            </p>
            <div className="grid gap-3">
              {POLYGLOT_CANON.map((p) => (
                <ResourceRow
                  key={p.file}
                  label={p.label}
                  filePath={polyglotPath(p.file)}
                  lang={lang}
                  resourceName={p.label}
                  kind="text"
                  available={true}
                />
              ))}
            </div>
          </section>

          {/* Localization strings */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                4. Localization strings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                User-facing text in every locale
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it does at runtime:</strong> the JSON tree carries error messages, agent reply templates, handler follow-up thoughts, Discord embed labels, and adapter tool descriptions. The agent looks up keys by category at every user interaction.
            </p>
            <ResourceRow
              label={`Strings (${lang.name})`}
              filePath={stringsPath(lang.code)}
              lang={lang}
              resourceName="Localization Strings"
              kind="json"
              available={true}
            />
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Top-level sections to inspect: <code>agent</code> (user-facing
              reply templates), <code>handlers</code> (follow-up thoughts
              injected into LLM context), <code>prompts</code> (formatter +
              escalation + crisis fragments), <code>errors</code>,{" "}
              <code>discord</code>, <code>adapters.*</code>, <code>mobile</code>.
            </p>
          </section>

          {/* The Accord */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                5. The Accord
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ethical framework, per-locale (v1.2-Beta)
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it does at runtime:</strong> the Accord is the framework the conscience evaluates against. The localised version is what gets loaded when the user&apos;s locale matches; the polyglot version is loaded universally for concept transmission.
            </p>
            <ResourceRow
              label={`Accord (${lang.name})`}
              filePath={accordPath(lang.code)}
              lang={lang}
              resourceName="Accord"
              kind="text"
              available={true}
            />
          </section>

          {/* The Guide */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                6. The Comprehensive Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operational + register guidance, loaded into every LLM call
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it does at runtime:</strong> the guide informs how the agent communicates in this locale — register (formal vs informal), idiom, what to defer, what to refuse, what to explain. Loaded into the system prompt for every interaction.
            </p>
            <ResourceRow
              label={`Comprehensive Guide (${lang.name})`}
              filePath={guidePath(lang.code)}
              lang={lang}
              resourceName="Comprehensive Guide"
              kind="text"
              available={true}
            />
          </section>

          {/* DMA Prompts */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                7. DMA prompts (7 reasoning stages)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The system prompts that drive each reasoning stage
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What they do at runtime:</strong> every agent action runs
              the action under each of these prompts in sequence. The outputs
              feed the conscience layer; the conscience either passes the
              action through or routes it to deferral. <strong>PDMA</strong>{" "}
              is the one polyglot DMA — its prompt is universal and loaded
              regardless of locale. The other six are per-locale; for English,
              the base path <em>is</em> the prompt (no <code>localized/en/</code>{" "}
              directory exists).
            </p>
            <div className="grid gap-3">
              {DMA_PROMPTS.map((p) => (
                <div key={p.file}>
                  <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                    {p.polyglot && (
                      <span className="mr-1 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        polyglot
                      </span>
                    )}
                    {p.note}
                  </p>
                  <ResourceRow
                    label={`${p.label}${p.polyglot ? " (universal)" : ` (${lang.name})`}`}
                    filePath={dmaPromptPath(lang.code, p.file, p.polyglot)}
                    lang={lang}
                    resourceName={p.label}
                    kind="text"
                    available={true}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Conscience Prompts */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                8. Conscience prompts (4 faculties)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The faculties that gate the selected action
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What they do at runtime:</strong> the four consciences
              gate the action between PERFORM_ASPDMA and FINALIZE_ACTION. A
              failure can trigger RECURSIVE_ASPDMA → RECURSIVE_CONSCIENCE (the
              optional conscience bounce) before falling back to DEFER.{" "}
              <strong>Optimization Veto</strong> is the one polyglot
              conscience &mdash; its prompt is universal regardless of locale.
            </p>
            <div className="grid gap-3">
              {CONSCIENCE_PROMPTS.map((p) => (
                <div key={p.file}>
                  <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                    {p.polyglot && (
                      <span className="mr-1 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        polyglot
                      </span>
                    )}
                    {p.note}
                  </p>
                  <ResourceRow
                    label={`${p.label}${p.polyglot ? " (universal)" : ` (${lang.name})`}`}
                    filePath={consciencePromptPath(lang.code, p.file, p.polyglot)}
                    lang={lang}
                    resourceName={p.label}
                    kind="text"
                    available={true}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Template placeholders reference */}
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              Template placeholders in the prompts
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4">
              The YAML prompts above contain <code>{"{placeholder}"}</code>{" "}
              tokens that get filled at runtime by the agent. A reviewer reading
              a prompt should know what each placeholder will be replaced with.
              The most common ones:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="pb-2 pr-3 font-semibold text-slate-900 dark:text-white">Placeholder</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-900 dark:text-white">Source at runtime</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{full_context_str}"}</td>
                    <td className="py-2 pr-3">Built by the context-gathering step (GATHER_CONTEXT). Includes the system snapshot, recent thoughts, user profile, and channel metadata.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{original_thought_content}"}</td>
                    <td className="py-2 pr-3">The thought being evaluated, taken from the processing queue.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{aspdma_reasoning}"}</td>
                    <td className="py-2 pr-3">The ASPDMA's rationale for the candidate action. Fed into the conscience prompts.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{dma_guidance}"}</td>
                    <td className="py-2 pr-3">The localized-strings <code>prompts.dma</code> guidance fragment for the active locale.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{available_tools_list}"}</td>
                    <td className="py-2 pr-3">Tool registry serialized to a list — what the agent can currently call. Used by TSASPDMA.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{domain_name}"} / {"{domain_hint_options}"}</td>
                    <td className="py-2 pr-3">Agent template domain (DSDMA) + the candidate hints. Comes from the agent&apos;s template config.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{current_thought_depth_plus_1}"}</td>
                    <td className="py-2 pr-3">Recursion-depth counter — used by ASPDMA to gate further recursion when conscience bounce fires.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{max_rounds}"}</td>
                    <td className="py-2 pr-3">Runtime cap on conscience-bounce iterations. Set in agent config.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">{"{{POLYGLOT_PDMA_FRAMING}}"}</td>
                    <td className="py-2 pr-3">Double-braced. Loaded from the polyglot canon (<code>pdma_framing.txt</code>) into the PDMA master prompt. Universal across locales.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Full placeholder set varies per prompt; grep <code>{"{[a-z_]+}"}</code>{" "}
              against any YAML to see the complete list for that file.
            </p>
          </section>

          {/* Glossary */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                9. Glossary
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Translator&apos;s reference (not loaded at runtime)
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it does:</strong> documents the per-locale semantic
              choices — which native term maps to which English concept, what
              the register conventions are, which transliteration fallbacks are
              forbidden. Used when authoring or revising the other artifacts
              above; not loaded by the agent at runtime. English doesn&apos;t
              have a separate glossary file (the base vocabulary is the
              reference).
            </p>
            <ResourceRow
              label={`Glossary (${lang.name})`}
              filePath={lang.code === "en" ? null : glossaryPath(lang.code)}
              lang={lang}
              resourceName="Glossary"
              kind="markdown"
              available={lang.code !== "en"}
            />
          </section>

          {/* The Safety Battery */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                10. Safety battery + rubric
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                v4 mental-health arc, scoring rubric, machine-applicable criteria
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it does at evaluation time:</strong> the question
              arc is the test inputs; the rubric is the human-readable scoring
              policy; the criteria.json is the machine-applicable form (term
              presence, regex, script detection) that runs in CI on every
              release candidate. Hard fails block release for that locale.
            </p>
            <div className="grid gap-3">
              <ResourceRow
                label={`Question arc (${lang.name})`}
                filePath={batteryArcPath(lang)}
                lang={lang}
                resourceName="Mental-Health Question Arc"
                kind="json"
                available={Boolean(lang.battery)}
              />
              <ResourceRow
                label={`Scoring rubric (${lang.name})`}
                filePath={batteryRubricPath(lang)}
                lang={lang}
                resourceName="Scoring Rubric"
                kind="markdown"
                available={Boolean(lang.battery)}
              />
              <ResourceRow
                label={`Canonical universal criteria.json (${lang.name})`}
                filePath={batteryCriteriaPath(lang)}
                lang={lang}
                resourceName="Canonical Criteria"
                kind="json"
                available={Boolean(lang.battery)}
              />
            </div>
            {!lang.battery && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                A battery hasn&apos;t been authored for {lang.name} yet. The
                &quot;Request artifact&quot; buttons above open pre-filled GitHub
                issues. Languages currently with batteries: Amharic, Arabic,
                Bengali, Burmese, Hausa, Hindi, Marathi, Persian, Punjabi,
                Swahili, Tamil, Telugu, Urdu, Yoruba.
              </p>
            )}
          </section>

          {/* Results */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                11. Results
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Per-language safety-sweep ledger
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>What it records:</strong> one entry per sweep run — agent
              version, model, provider, locale, pass/fail counts, hard- vs
              soft-fail breakdown, timestamps. The <code>_meta</code> block
              lists priority locales that still need a published sweep.
            </p>
            <ResourceRow
              label={`Safety-sweep results (filter language=${lang.code})`}
              filePath="qa_reports/safety_sweeps.json"
              lang={lang}
              resourceName="Safety Sweep Results"
              kind="json"
              available={true}
            />
          </section>

          {/* What runs today vs in flight */}
          <section className="mb-8 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What runs today vs what&apos;s in flight
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <p>
                <strong>Today:</strong> machine-applicable rubric checks
                (term-presence, regex-presence, script-detection) run in
                CI on every release candidate via the safety-battery
                workflow in CIRISAgent. The hard-fail criteria block any
                release touching that language path.
              </p>
              <p>
                <strong>In flight:</strong> the consensus and voting
                primitives in CIRISNodeCore that turn this page&apos;s
                GitHub-issue surface into a federated{" "}
                <code>rubric_proposal</code> / <code>arc_question</code> /{" "}
                <code>prompt_edit</code> flow with native-speaker review.
                Until that lands, GitHub issues are the submission path.
              </p>
              <p>
                <strong>Honest about scope:</strong> CIRIS uses machine
                translation extensively; native-speaker review for soft
                cases is the cohort being built, not a cohort already
                engaged. Anyone willing to review their language&apos;s
                files for accuracy and register is exactly the
                contributor this surface is being built for.
              </p>
            </div>
          </section>

          {/* Reference links */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              How the loop is specified
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Rubric Crowdsourcing FSD →
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/JUDGE_MODEL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Judge Model FSD →
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/SAFETY_BATTERY_CI_LOOP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                Safety-Battery CI Loop FSD →
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISLensCore"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                CIRISLensCore (science-layer runtime) →
              </a>
              <a
                href="/safety-vs-censorship"
                className="rounded-md border-2 border-brand-primary px-3 py-1.5 font-semibold text-brand-primary hover:bg-brand-primary/10"
              >
                Safety vs censorship →
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
