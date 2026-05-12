"use client";

import { useState } from "react";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import { FloatingNav } from "@/app/components/ui/floating/nav";

// ─────────────────────────── Constants ────────────────────────────────────

const REPO = "https://github.com/CIRISAI/CIRISAgent";
const BLOB = `${REPO}/blob/main`;
const ISSUES_NEW = `${REPO}/issues/new`;

// 14 languages currently have a mental-health safety battery shipped.
// The mapping below uses the directory name (English language word) and the
// rubric filename stem; everything else can be derived from the ISO code.
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

// ─────────────────────────── URL helpers ──────────────────────────────────

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

// ─────────────────────────── Component ────────────────────────────────────

function ResourceRow({
  label,
  filePath,
  lang,
  resourceName,
  status,
}: {
  label: string;
  filePath: string | null;
  lang: Language;
  resourceName: string;
  status: "available" | "not_yet";
}) {
  const available = status === "available" && filePath !== null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
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
            <a
              href={`${BLOB}/${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-2.5 py-1 font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-700 dark:text-slate-200"
            >
              View on GitHub →
            </a>
            <a
              href={`https://raw.githubusercontent.com/CIRISAI/CIRISAgent/main/${filePath}`}
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
          className="rounded-md border-2 border-brand-primary px-2.5 py-1 font-semibold text-brand-primary hover:bg-brand-primary/10"
        >
          {available ? "Propose edit (GitHub issue)" : `Request artifact for ${lang.code}`}
        </a>
      </div>
    </div>
  );
}

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
              Below: pick a language, browse the Accord and Comprehensive
              Guide in that language, view safety batteries and rubrics
              where they exist, and propose edits via GitHub issues.
              Native-speaker review for soft cases is what this surface
              is being built for &mdash; reviewers are not in the loop
              today.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
              Submission happens on GitHub. Every &quot;Propose edit&quot;
              button opens a pre-filled issue against{" "}
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                CIRISAI/CIRISAgent
              </a>
              {" "}with the file path and language code already populated.
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

          {/* The Accord */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                2. The Accord
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Polyglot ethical framework, v1.2-Beta
              </p>
            </div>
            <ResourceRow
              label={`Accord (${lang.name})`}
              filePath={accordPath(lang.code)}
              lang={lang}
              resourceName="Accord"
              status="available"
            />
          </section>

          {/* The Guide */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                3. The Comprehensive Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operational guide loaded into every LLM call
              </p>
            </div>
            <ResourceRow
              label={`Comprehensive Guide (${lang.name})`}
              filePath={guidePath(lang.code)}
              lang={lang}
              resourceName="Comprehensive Guide"
              status="available"
            />
          </section>

          {/* The Safety Battery */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                4. Safety Battery + Rubric
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                v4 mental-health arc, scoring rubric, machine-applicable criteria
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-1">
              <ResourceRow
                label={`Question arc (${lang.name})`}
                filePath={batteryArcPath(lang)}
                lang={lang}
                resourceName="Mental-Health Question Arc"
                status={lang.battery ? "available" : "not_yet"}
              />
              <ResourceRow
                label={`Scoring rubric (${lang.name})`}
                filePath={batteryRubricPath(lang)}
                lang={lang}
                resourceName="Scoring Rubric"
                status={lang.battery ? "available" : "not_yet"}
              />
              <ResourceRow
                label={`Canonical universal criteria.json (${lang.name})`}
                filePath={batteryCriteriaPath(lang)}
                lang={lang}
                resourceName="Canonical Criteria"
                status={lang.battery ? "available" : "not_yet"}
              />
            </div>
            {!lang.battery && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                A battery hasn&apos;t been authored for {lang.name} yet. The
                &quot;Request artifact&quot; buttons above open pre-filled GitHub
                issues to propose one. Languages currently with batteries: Amharic, Arabic, Bengali, Burmese, Hausa, Hindi, Marathi, Persian, Punjabi, Swahili, Tamil, Telugu, Urdu, Yoruba.
              </p>
            )}
          </section>

          {/* Results */}
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                5. Results
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Per-language safety-sweep ledger
              </p>
            </div>
            <ResourceRow
              label={`Safety-sweep results (filter language=${lang.code})`}
              filePath="qa_reports/safety_sweeps.json"
              lang={lang}
              resourceName="Safety Sweep Results"
              status="available"
            />
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              The ledger is a single JSON file with one entry per sweep
              run; filter the <code>sweeps</code> array by{" "}
              <code className="font-mono">language === &quot;{lang.code}&quot;</code>{" "}
              to see runs against this locale. Most non-English languages
              have batteries authored but no sweep run published yet;
              priority targets are listed in the <code>_meta</code> block
              of the ledger.
            </p>
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
