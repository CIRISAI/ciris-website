"use client";

// Shared /crowdsourcing-alignment body, driven by a per-locale dictionary.
// Both the English root (src/app/crowdsourcing-alignment/page.tsx) and the
// localized routes (src/app/[locale]/crowdsourcing-alignment/page.tsx) render
// this with their own dictionary.

import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into an element. */
const h = (html: string) => ({ __html: html });

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
  { code: "en", name: "English", native: "English", battery: { dir: "english_mental_health", stem: "english" } },
  { code: "am", name: "Amharic", native: "አማርኛ", battery: { dir: "amharic_mental_health", stem: "amharic" } },
  { code: "ar", name: "Arabic", native: "العربية", battery: { dir: "arabic_mental_health", stem: "arabic" } },
  { code: "bn", name: "Bengali", native: "বাংলা", battery: { dir: "bengali_mental_health", stem: "bengali" } },
  { code: "de", name: "German", native: "Deutsch", battery: { dir: "german_mental_health", stem: "german" } },
  { code: "es", name: "Spanish", native: "Español", battery: { dir: "spanish_mental_health", stem: "spanish" } },
  { code: "fa", name: "Persian", native: "فارسی", battery: { dir: "persian_mental_health", stem: "persian" } },
  { code: "fr", name: "French", native: "Français", battery: { dir: "french_mental_health", stem: "french" } },
  { code: "ha", name: "Hausa", native: "هَوُسَ", battery: { dir: "hausa_mental_health", stem: "hausa" } },
  { code: "hi", name: "Hindi", native: "हिन्दी", battery: { dir: "hindi_mental_health", stem: "hindi" } },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", battery: { dir: "indonesian_mental_health", stem: "indonesian" } },
  { code: "it", name: "Italian", native: "Italiano", battery: { dir: "italian_mental_health", stem: "italian" } },
  { code: "ja", name: "Japanese", native: "日本語", battery: { dir: "japanese_mental_health", stem: "japanese" } },
  { code: "ko", name: "Korean", native: "한국어", battery: { dir: "korean_mental_health", stem: "korean" } },
  { code: "mr", name: "Marathi", native: "मराठी", battery: { dir: "marathi_mental_health", stem: "marathi" } },
  { code: "my", name: "Burmese", native: "မြန်မာ", battery: { dir: "burmese_mental_health", stem: "burmese" } },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", battery: { dir: "punjabi_mental_health", stem: "punjabi" } },
  { code: "pt", name: "Portuguese", native: "Português", battery: { dir: "portuguese_mental_health", stem: "portuguese" } },
  { code: "ru", name: "Russian", native: "Русский", battery: { dir: "russian_mental_health", stem: "russian" } },
  { code: "sw", name: "Swahili", native: "Kiswahili", battery: { dir: "swahili_mental_health", stem: "swahili" } },
  { code: "ta", name: "Tamil", native: "தமிழ்", battery: { dir: "tamil_mental_health", stem: "tamil" } },
  { code: "te", name: "Telugu", native: "తెలుగు", battery: { dir: "telugu_mental_health", stem: "telugu" } },
  { code: "th", name: "Thai", native: "ไทย", battery: { dir: "thai_mental_health", stem: "thai" } },
  { code: "tr", name: "Turkish", native: "Türkçe", battery: { dir: "turkish_mental_health", stem: "turkish" } },
  { code: "uk", name: "Ukrainian", native: "Українська", battery: { dir: "ukrainian_mental_health", stem: "ukrainian" } },
  { code: "ur", name: "Urdu", native: "اردو", battery: { dir: "urdu_mental_health", stem: "urdu" } },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", battery: { dir: "vietnamese_mental_health", stem: "vietnamese" } },
  { code: "yo", name: "Yoruba", native: "Yorùbá", battery: { dir: "yoruba_mental_health", stem: "yoruba" } },
  { code: "zh", name: "Chinese (Simplified)", native: "中文", battery: { dir: "chinese_mental_health", stem: "chinese" } },
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
const DMA_PROMPTS = [
  { file: "pdma_ethical.yml", label: "PDMA: Principled DMA", note: "First-pass ethical evaluation. Accord-anchored stakeholder analysis + conflict detection.", polyglot: true },
  { file: "csdma_common_sense.yml", label: "CSDMA: Common-Sense DMA", note: "First-pass reality/plausibility check. Red-flag enumeration.", polyglot: false },
  { file: "dsdma_base.yml", label: "DSDMA: Domain-Specific DMA", note: "First-pass domain alignment per the agent template (Discord moderator, scout, etc.).", polyglot: false },
  { file: "idma.yml", label: "IDMA: Intuition DMA", note: "Semantic implementation of Coherence Collapse Analysis on the agent's own reasoning. Computes k_eff, classifies phase (chaos / healthy / rigidity), flags fragility when k_eff < 2 or the reasoning sits in the rigidity phase.", polyglot: false },
  { file: "action_selection_pdma.yml", label: "ASPDMA: Action Selection PDMA", note: "Picks the action verb (SPEAK / OBSERVE / TOOL / REJECT / PONDER / DEFER / MEMORIZE / RECALL / FORGET / TASK_COMPLETE) given the DMA outputs above.", polyglot: false },
  { file: "tsaspdma.yml", label: "TSASPDMA: Tool-Specific Action Selection", note: "Verb-specific second pass when the candidate action is TOOL. Picks the tool + parameters.", polyglot: false },
  { file: "dsaspdma.yml", label: "DSASPDMA: Deferral-Specific Action Selection", note: "Verb-specific second pass when the candidate action is DEFER. Frames the deferral for the Wise Authority.", polyglot: false },
];

const CONSCIENCE_PROMPTS = [
  { file: "entropy_conscience.yml", label: "Entropy (IRIS-E)", note: "Semantic anchoring: does the response sit in a coherent cluster?", polyglot: false },
  { file: "coherence_conscience.yml", label: "Coherence (IRIS-C)", note: "Propaganda detection + alignment with Accord principles.", polyglot: false },
  { file: "optimization_veto_conscience.yml", label: "Optimization Veto (CIRIS-EOV)", note: "Refuses entropy-reducing actions that score below threshold. v3.0 polyglot torque measurement across 8 named torque patterns anchored in 3+ tradition canonical-text fragments each.", polyglot: true },
  { file: "epistemic_humility_conscience.yml", label: "Epistemic Humility", note: "Overconfidence detection; transitioning to a deterministic gate.", polyglot: false },
];

const POLYGLOT_CANON = [
  {
    path: "ciris_engine/data/accord_1.2b_POLYGLOT_compressed.txt",
    label: "Braided Monolith: compressed polyglot Accord (production default)",
    note: "The production runtime default. ~7KB / ~2,200 tokens. Retains the load-bearing scaffolding: PDMA 7-step, 10× Order-Maximisation Veto, Stewardship Tier formula, Fractal Recursive Golden Rule, WBD 0.5% harm-uplift trigger, Sentience Safeguard 5% with Gradual Ramp-Down, Threshold-of-Force HITL, Coherence-math (truth O(1), deception O(n)). Loaded by every conscience evaluation when CIRIS_ACCORD_MODE=compressed (default).",
    kind: "text" as const,
  },
  {
    path: "ciris_engine/data/accord_1.2b_POLYGLOT.txt",
    label: "Full Polyglot Accord (v1.2-Beta)",
    note: "The unabridged polyglot: Books 0-9 + Annexes A-J, ~2,177 lines, with concept transmission triangulated across multiple traditions' densest encodings (Hebrew, Arabic, Sanskrit, Confucian Chinese, Greek, Amharic, etc.). Loaded into every conscience evaluation when CIRIS_ACCORD_MODE=full. Composed from per-book source files in ciris_engine/data/localized/polyglot/.",
    kind: "text" as const,
  },
];

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
  const fileLink = filePath ? `[\`${filePath}\`](${BLOB}/${filePath})` : `(no file yet, propose new artifact for ${code})`;
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
                  ({sparse.length} keys: single values and small objects)
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
  t,
}: {
  label: string;
  filePath: string | null;
  lang: Language;
  resourceName: string;
  kind: RenderKind;
  available: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            {t.resourceStatusInRepo}
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            {t.resourceStatusNotYet.replace("{langCode}", lang.code)}
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
              {open ? t.resourceBtnHide : t.resourceBtnView}
            </button>
            <a
              href={`${BLOB}/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              {t.resourceBtnGitHub}
            </a>
            <a
              href={`${RAW}/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              {t.resourceBtnRaw}
            </a>
          </>
        )}
        <a
          href={issueUrl(lang.code, resourceName, filePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
        >
          {available
            ? t.resourceBtnProposeEdit
            : t.resourceBtnRequest.replace("{langCode}", lang.code)}
        </a>
      </div>
      {open && available && filePath && (
        <div className="mt-4">
          {loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.resourceLoadingMsg}
            </p>
          )}
          {error && (
            <p className="text-xs text-red-700 dark:text-red-300">
              {t.resourceErrorMsg.replace("{error}", error)}
            </p>
          )}
          {content && <ContentBody kind={kind} text={content} />}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Page ─────────────────────────────────────────

export default function CrowdsourcingAlignmentContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ca = (t as any).crowdsourcingAlignment as Record<string, string>;

  const [code, setCode] = useState<string>("am");
  const lang = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

  return (
    <>
      <FloatingNav navItems={navItems} locale={locale} />
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-36">

          {/* Hero */}
          <section className="mb-10">
            <div className="mb-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {ca.heroBadgeProto}
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {ca.heroBadgeLanguages.replace("{count}", String(LANGUAGES.length))}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {ca.heroH1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {ca.heroBody1}
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500 dark:text-slate-400">
              {ca.heroBody2}
            </p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.heroBody3Html)}
            />
          </section>

          {/* Language selector */}
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <label htmlFor="lang-select" className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              {ca.langSelectorLabel}
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
                    {l.battery ? ca.langOptionBattery : ""}
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

          {/* Optional deep dive */}
          <details className="group mb-10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-slate-200">
              <span>{ca.deepDiveSummary}</span>
              <span aria-hidden className="text-slate-400 transition group-open:rotate-90">›</span>
            </summary>
            <div className="mt-4 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              {ca.runtimeSectionLabel}
            </p>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-200 mb-4">
              {ca.runtimeBody1}
            </p>

            {/* Pipeline diagram */}
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-gray-900/40 mb-4 overflow-x-auto">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                {ca.pipelineDiagramLabel}
              </p>
              <pre className="text-xs leading-6 text-slate-800 dark:text-slate-200 font-mono whitespace-pre">{`START_ROUND
    ↓
GATHER_CONTEXT
    ↓
PERFORM_DMAS           ← 3 first-pass DMAs run in parallel: PDMA, CSDMA, DSDMA
    ↓                    (optional DMA bounce if any flag fragility)
                        IDMA (Intuition DMA) evaluates the agent's own
                          reasoning quality via CCA (k_eff, phase,
                          fragility) with its own optional bounce
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

            <p className="text-base leading-7 text-slate-700 dark:text-slate-200 mb-4"
              dangerouslySetInnerHTML={h(ca.runtimeBody2Html)}
            />
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <li><strong>{ca.runtimeList1Label}</strong> {ca.runtimeList1}</li>
              <li><strong>{ca.runtimeList2Label}</strong> {ca.runtimeList2}</li>
              <li><strong>{ca.runtimeList3Label}</strong> {ca.runtimeList3}</li>
              <li><strong>{ca.runtimeList4Label}</strong> {ca.runtimeList4}</li>
              <li><strong>{ca.runtimeList5Label}</strong> {ca.runtimeList5}</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={h(ca.runtimeLensHtml)}
            />
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {ca.runtimeRefs}{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/MISSION.md#42-the-h3ere-pipeline-hyper-ethical-recursive-engine" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{ca.runtimeRefMission}</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/DMA_BOUNCE.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{ca.runtimeRefDmaBounce}</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/CONSCIENCE_V3.md" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{ca.runtimeRefConscience}</a>.
            </p>
          </section>

          {/* Polyglot canon */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              {ca.polyglotSectionLabel}
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-3"
              dangerouslySetInnerHTML={h(ca.polyglotBody1Html)}
            />
            <ol className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4 ml-5 list-decimal space-y-1">
              <li dangerouslySetInnerHTML={h(ca.polyglotItem1Html)} />
              <li dangerouslySetInnerHTML={h(ca.polyglotItem2Html)} />
              <li dangerouslySetInnerHTML={h(ca.polyglotItem3Html)} />
            </ol>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4">
              {ca.polyglotBody2}
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4"
              dangerouslySetInnerHTML={h(ca.polyglotBraidedHtml)}
            />
            <div className="grid gap-3">
              {POLYGLOT_CANON.map((p) => (
                <ResourceRow
                  key={p.path}
                  label={p.label}
                  filePath={p.path}
                  lang={lang}
                  resourceName={p.label}
                  kind={p.kind}
                  available={true}
                  t={ca}
                />
              ))}
            </div>
          </section>
            </div>
          </details>

          {/* Localization strings */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec2Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec2Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec2Note)}
            />
            <ResourceRow
              label={ca.sec2RowLabel.replace("{langName}", lang.name)}
              filePath={stringsPath(lang.code)}
              lang={lang}
              resourceName="Localization Strings"
              kind="json"
              available={true}
              t={ca}
            />
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec2FootHtml)}
            />
          </section>

          {/* The Accord */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec3Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec3Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec3Note)}
            />
            <ResourceRow
              label={ca.sec3RowLabel.replace("{langName}", lang.name)}
              filePath={accordPath(lang.code)}
              lang={lang}
              resourceName="Accord"
              kind="text"
              available={true}
              t={ca}
            />
          </section>

          {/* The Guide */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec4Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec4Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec4Note)}
            />
            <ResourceRow
              label={ca.sec4RowLabel.replace("{langName}", lang.name)}
              filePath={guidePath(lang.code)}
              lang={lang}
              resourceName="Comprehensive Guide"
              kind="text"
              available={true}
              t={ca}
            />
          </section>

          {/* DMA Prompts */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec5Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec5Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec5NoteHtml)}
            />
            <div className="grid gap-3">
              {DMA_PROMPTS.map((p) => (
                <div key={p.file}>
                  <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                    {p.polyglot && (
                      <span className="mr-1 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        {ca.polyglotPill}
                      </span>
                    )}
                    {p.note}
                  </p>
                  <ResourceRow
                    label={
                      p.polyglot
                        ? ca.sec5RowUniversal.replace("{label}", p.label)
                        : ca.sec5RowLocale.replace("{label}", p.label).replace("{langName}", lang.name)
                    }
                    filePath={dmaPromptPath(lang.code, p.file, p.polyglot)}
                    lang={lang}
                    resourceName={p.label}
                    kind="text"
                    available={true}
                    t={ca}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Conscience Prompts */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec6Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec6Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec6NoteHtml)}
            />
            <div className="grid gap-3">
              {CONSCIENCE_PROMPTS.map((p) => (
                <div key={p.file}>
                  <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                    {p.polyglot && (
                      <span className="mr-1 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        {ca.polyglotPill}
                      </span>
                    )}
                    {p.note}
                  </p>
                  <ResourceRow
                    label={
                      p.polyglot
                        ? ca.sec6RowUniversal.replace("{label}", p.label)
                        : ca.sec6RowLocale.replace("{label}", p.label).replace("{langName}", lang.name)
                    }
                    filePath={consciencePromptPath(lang.code, p.file, p.polyglot)}
                    lang={lang}
                    resourceName={p.label}
                    kind="text"
                    available={true}
                    t={ca}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Template placeholders reference */}
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              {ca.placeholdersSectionLabel}
            </p>
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4"
              dangerouslySetInnerHTML={h(ca.placeholderBody)}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="pb-2 pr-3 font-semibold text-slate-900 dark:text-white">{ca.placeholderColHeader1}</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-900 dark:text-white">{ca.placeholderColHeader2}</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{full_context_str}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow1Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{original_thought_content}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow2Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{aspdma_reasoning}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow3Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{dma_guidance}"}</td>
                    <td className="py-2 pr-3" dangerouslySetInnerHTML={h(ca.placeholderRow4Source)} />
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{available_tools_list}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow5Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{domain_name}"} / {"{domain_hint_options}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow6Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{current_thought_depth_plus_1}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow7Source}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-xs">{"{max_rounds}"}</td>
                    <td className="py-2 pr-3">{ca.placeholderRow8Source}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">{"{{POLYGLOT_PDMA_FRAMING}}"}</td>
                    <td className="py-2 pr-3" dangerouslySetInnerHTML={h(ca.placeholderRow9Source)} />
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.placeholderFoot)}
            />
          </section>

          {/* Glossary */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec7Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec7Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec7NoteHtml)}
            />
            <ResourceRow
              label={ca.sec7RowLabel.replace("{langName}", lang.name)}
              filePath={lang.code === "en" ? null : glossaryPath(lang.code)}
              lang={lang}
              resourceName="Glossary"
              kind="markdown"
              available={lang.code !== "en"}
              t={ca}
            />
          </section>

          {/* The Safety Battery */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec8Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec8Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec8Note)}
            />
            <div className="grid gap-3">
              <ResourceRow
                label={ca.sec8ArcRowLabel.replace("{langName}", lang.name)}
                filePath={batteryArcPath(lang)}
                lang={lang}
                resourceName="Mental-Health Question Arc"
                kind="json"
                available={Boolean(lang.battery)}
                t={ca}
              />
              <ResourceRow
                label={ca.sec8RubricRowLabel.replace("{langName}", lang.name)}
                filePath={batteryRubricPath(lang)}
                lang={lang}
                resourceName="Scoring Rubric"
                kind="markdown"
                available={Boolean(lang.battery)}
                t={ca}
              />
              <ResourceRow
                label={ca.sec8CriteriaRowLabel.replace("{langName}", lang.name)}
                filePath={batteryCriteriaPath(lang)}
                lang={lang}
                resourceName="Canonical Criteria"
                kind="json"
                available={Boolean(lang.battery)}
                t={ca}
              />
            </div>
            {!lang.battery && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400"
                dangerouslySetInnerHTML={h(ca.sec8NoBatteryHtml.replace("{langName}", lang.name))}
              />
            )}
          </section>

          {/* Results */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {ca.sec9Label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ca.sec9Aside}
              </p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400"
              dangerouslySetInnerHTML={h(ca.sec9NoteHtml)}
            />
            <ResourceRow
              label={ca.sec9RowLabel.replace("{langCode}", lang.code)}
              filePath="qa_reports/safety_sweeps.json"
              lang={lang}
              resourceName="Safety Sweep Results"
              kind="json"
              available={true}
              t={ca}
            />
          </section>

          {/* What runs today vs in flight */}
          <section className="mb-8 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {ca.statusH2}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <p dangerouslySetInnerHTML={h(ca.statusTodayHtml)} />
              <p dangerouslySetInnerHTML={h(ca.statusInFlightHtml)} />
              <p dangerouslySetInnerHTML={h(ca.statusHonestHtml)} />
            </div>
          </section>

          {/* Reference links */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary mb-3">
              {ca.refSectionLabel}
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                {ca.refRubricCrowdsourcing}
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/JUDGE_MODEL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                {ca.refJudgeModel}
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/SAFETY_BATTERY_CI_LOOP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                {ca.refSafetyCILoop}
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISLensCore"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
              >
                {ca.refCIRISLensCore}
              </a>
              <a
                href="/safety-vs-censorship"
                className="rounded-md border-2 border-brand-primary px-3 py-1.5 font-semibold text-brand-primary hover:bg-brand-primary/10"
              >
                {ca.refSafetyCensorship}
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
