"use client";

// v2 "dark-blueprint" /crowdsourcing-alignment body. Renders the SAME
// t.crowdsourcingAlignment.* dictionary keys the old CrowdsourcingAlignmentContent
// did — no copy is rewritten or re-translated here — inside the reusable
// ContentShell. Accent "ok" (a measured green) reads as quiet, evidenced proof,
// matching the open-trace-commons / research feel. Graphic g09 (holographic
// survival / resilience) is placed inline beside the "what runs today" status.
//
// The language selector (useState) and the interactive ResourceRow (fetch +
// view/hide) are preserved verbatim from the original; only their chrome is
// restyled to the dark-blueprint palette via CSS variables.

import { useEffect, useState } from "react";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import SvgGraphic from "@/app/components/graphics/SvgGraphic";
import type { Dictionary } from "@/i18n/dictionaries";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
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
  if (value === null) return <span style={{ color: "var(--color-mute)" }}>null</span>;
  if (typeof value === "boolean") return <span style={{ color: "var(--color-violet)" }}>{String(value)}</span>;
  if (typeof value === "number") return <span style={{ color: "var(--color-cyan)" }}>{value}</span>;
  if (typeof value === "string") {
    return (
      <span style={{ whiteSpace: "pre-wrap", color: "var(--color-ok)" }}>
        {JSON.stringify(value)}
      </span>
    );
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: "var(--color-mute)" }}>[]</span>;
    return (
      <ul style={{ marginLeft: 16, listStyle: "none", borderLeft: "1px solid var(--color-line)", paddingLeft: 12 }}>
        {value.map((v, i) => (
          <li key={i}>
            <span style={{ color: "var(--color-mute)", marginRight: 4 }}>{i}:</span>
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span style={{ color: "var(--color-mute)" }}>{"{}"}</span>;
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
        <div style={{ display: "grid", gap: 8 }}>
          {substantive.map(([k, v]) => (
            <details key={k} style={{ borderRadius: 8, border: "1px solid var(--color-line)", background: "var(--color-panel)" }}>
              <summary style={{ cursor: "pointer", padding: "8px 12px", fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>
                {k}{" "}
                <span style={{ fontSize: 11, fontWeight: 400, color: "var(--color-mute)" }}>
                  ({Object.keys(v as Record<string, unknown>).length} keys)
                </span>
              </summary>
              <div style={{ padding: "0 12px 12px", fontSize: 13 }}>
                {renderJsonTree(v, depth + 1)}
              </div>
            </details>
          ))}
          {sparse.length > 0 && (
            <details style={{ borderRadius: 8, border: "1px solid var(--color-line)", background: "var(--color-panel)" }}>
              <summary style={{ cursor: "pointer", padding: "8px 12px", fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>
                Miscellaneous{" "}
                <span style={{ fontSize: 11, fontWeight: 400, color: "var(--color-mute)" }}>
                  ({sparse.length} keys: single values and small objects)
                </span>
              </summary>
              <div style={{ padding: "0 12px 12px", fontSize: 13 }}>
                <ul style={{ marginLeft: 8, listStyle: "none" }}>
                  {sparse.map(([k, v]) => (
                    <li key={k}>
                      <span style={{ fontWeight: 600, color: "var(--color-dim)" }}>{k}:</span>{" "}
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
      <ul style={{ marginLeft: 16, listStyle: "none", borderLeft: "1px solid var(--color-line)", paddingLeft: 12 }}>
        {entries.map(([k, v]) => (
          <li key={k}>
            <span style={{ fontWeight: 600, color: "var(--color-dim)" }}>{k}:</span>{" "}
            {renderJsonTree(v, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  return <span>{String(value)}</span>;
}

function ContentBody({ kind, text }: { kind: RenderKind; text: string }) {
  const preStyle: React.CSSProperties = {
    overflow: "auto",
    borderRadius: 8,
    background: "var(--color-bg)",
    padding: 12,
    fontSize: 11,
    color: "var(--color-text)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "60vh",
    border: "1px solid var(--color-line)",
  };
  if (kind === "json") {
    try {
      const parsed = JSON.parse(text);
      return (
        <div style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}>{renderJsonTree(parsed)}</div>
      );
    } catch {
      return <pre style={preStyle}>{text}</pre>;
    }
  }
  return <pre style={preStyle}>{text}</pre>;
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

  const linkBtn: React.CSSProperties = {
    borderRadius: 6,
    border: "1px solid var(--color-line)",
    padding: "5px 10px",
    fontWeight: 500,
    color: "var(--color-dim)",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--color-line)",
        background: "var(--color-panel)",
        padding: 16,
      }}
    >
      <div style={{ marginBottom: 8, display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", margin: 0 }}>{label}</h3>
          {filePath && (
            <p style={{ marginTop: 4, fontSize: 11, fontFamily: "ui-monospace, monospace", color: "var(--color-mute)", wordBreak: "break-all" }}>
              {filePath}
            </p>
          )}
        </div>
        {available ? (
          <span style={{ flexShrink: 0, borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500, color: "var(--color-ok)", border: "1px solid color-mix(in srgb, var(--color-ok) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-ok) 10%, transparent)" }}>
            {t.resourceStatusInRepo}
          </span>
        ) : (
          <span style={{ flexShrink: 0, borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500, color: "var(--color-brass)", border: "1px solid color-mix(in srgb, var(--color-brass) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-brass) 10%, transparent)" }}>
            {t.resourceStatusNotYet.replace("{langCode}", lang.code)}
          </span>
        )}
      </div>
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12 }}>
        {available && filePath && (
          <>
            <button
              onClick={handleToggle}
              style={{
                borderRadius: 6,
                border: "1px solid var(--accent)",
                background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                padding: "5px 10px",
                fontWeight: 600,
                color: "var(--accent)",
                cursor: "pointer",
              }}
            >
              {open ? t.resourceBtnHide : t.resourceBtnView}
            </button>
            <a href={`${BLOB}/${filePath}`} target="_blank" rel="noopener noreferrer" style={linkBtn}>
              {t.resourceBtnGitHub}
            </a>
            <a href={`${RAW}/${filePath}`} target="_blank" rel="noopener noreferrer" style={linkBtn}>
              {t.resourceBtnRaw}
            </a>
          </>
        )}
        <a href={issueUrl(lang.code, resourceName, filePath)} target="_blank" rel="noopener noreferrer" style={linkBtn}>
          {available
            ? t.resourceBtnProposeEdit
            : t.resourceBtnRequest.replace("{langCode}", lang.code)}
        </a>
      </div>
      {open && available && filePath && (
        <div style={{ marginTop: 16 }}>
          {loading && (
            <p style={{ fontSize: 11, color: "var(--color-mute)" }}>{t.resourceLoadingMsg}</p>
          )}
          {error && (
            <p style={{ fontSize: 11, color: "var(--color-rose)" }}>
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

export default function CrowdsourcingAlignmentV2({ t, locale }: { t: Dictionary; locale: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ca = (t as any).crowdsourcingAlignment as Record<string, string>;

  const [code, setCode] = useState<string>("am");
  const lang = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

  // A localized section heading + aside, rendered in the v2 label vocabulary.
  const SectionHead = ({ label, aside }: { label: string; aside?: string }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
      <h2 className={s.sectionLabel} style={{ margin: 0 }}>{label}</h2>
      {aside && <p className={s.footnote} style={{ margin: 0 }}>{aside}</p>}
    </div>
  );

  const pill: React.CSSProperties = {
    borderRadius: 999,
    padding: "4px 12px",
    fontSize: 13,
    fontWeight: 500,
  };

  return (
    <ContentShell
      locale={locale}
      accent="ok"
      kicker={ca.heroBadgeLanguages.replace("{count}", String(LANGUAGES.length))}
      title={ca.heroH1}
      lede={ca.heroBody1}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Hero status pills + remaining hero prose */}
      <div className={s.section}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <span style={{ ...pill, color: "var(--color-brass)", border: "1px solid color-mix(in srgb, var(--color-brass) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-brass) 10%, transparent)" }}>
            {ca.heroBadgeProto}
          </span>
          <span style={{ ...pill, color: "var(--color-cyan)", border: "1px solid color-mix(in srgb, var(--color-cyan) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-cyan) 10%, transparent)" }}>
            {ca.heroBadgeLanguages.replace("{count}", String(LANGUAGES.length))}
          </span>
        </div>
        <p className={s.paragraph}>{ca.heroBody2}</p>
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.heroBody3Html)} />
      </div>

      {/* Language selector */}
      <div className={s.callout}>
        <label htmlFor="lang-select" className={s.sectionLabel} style={{ display: "block", marginBottom: 12 }}>
          {ca.langSelectorLabel}
        </label>
        <div style={{ display: "grid", gap: 12 }}>
          <select
            id="lang-select"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid var(--color-line)",
              background: "var(--color-bg)",
              padding: "12px 16px",
              fontSize: 16,
              color: "var(--color-text)",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name} ({l.native}) [{l.code}]
                {l.battery ? ca.langOptionBattery : ""}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 14, color: "var(--color-dim)" }}>
            <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{lang.name}</span>{" "}
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>[{lang.code}]</span>{" "}
            <span style={{ fontSize: 16 }}>{lang.native}</span>
          </div>
        </div>
      </div>

      {/* Optional deep dive */}
      <details className={s.section} style={{ borderRadius: 14, border: "1px solid var(--color-line)", background: "var(--color-panel)", padding: 0 }}>
        <summary style={{ cursor: "pointer", listStyle: "none", padding: "16px 20px", fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>
          {ca.deepDiveSummary}
        </summary>
        <div style={{ padding: "0 20px 20px" }}>
          {/* Runtime */}
          <section style={{ marginTop: 8 }}>
            <p className={s.sectionLabel}>{ca.runtimeSectionLabel}</p>
            <p className={s.paragraph}>{ca.runtimeBody1}</p>

            <div style={{ borderRadius: 8, background: "var(--color-bg)", padding: 16, margin: "16px 0", overflowX: "auto", border: "1px solid var(--color-line)" }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-mute)", marginBottom: 8 }}>
                {ca.pipelineDiagramLabel}
              </p>
              <pre style={{ fontSize: 11, lineHeight: 1.5, color: "var(--color-dim)", fontFamily: "ui-monospace, monospace", whiteSpace: "pre", margin: 0 }}>{`START_ROUND
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

            <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.runtimeBody2Html)} />
            <ul style={{ marginTop: 16, display: "grid", gap: 8, fontSize: 14, lineHeight: 1.5, color: "var(--color-dim)", paddingLeft: 18 }}>
              <li><strong>{ca.runtimeList1Label}</strong> {ca.runtimeList1}</li>
              <li><strong>{ca.runtimeList2Label}</strong> {ca.runtimeList2}</li>
              <li><strong>{ca.runtimeList3Label}</strong> {ca.runtimeList3}</li>
              <li><strong>{ca.runtimeList4Label}</strong> {ca.runtimeList4}</li>
              <li><strong>{ca.runtimeList5Label}</strong> {ca.runtimeList5}</li>
            </ul>
            <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.runtimeLensHtml)} />
            <p className={s.footnote}>
              {ca.runtimeRefs}{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/MISSION.md#42-the-h3ere-pipeline-hyper-ethical-recursive-engine" target="_blank" rel="noopener noreferrer">{ca.runtimeRefMission}</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/DMA_BOUNCE.md" target="_blank" rel="noopener noreferrer">{ca.runtimeRefDmaBounce}</a>,{" "}
              <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/FSD/CONSCIENCE_V3.md" target="_blank" rel="noopener noreferrer">{ca.runtimeRefConscience}</a>.
            </p>
          </section>

          {/* Polyglot canon */}
          <section style={{ marginTop: 24 }}>
            <p className={s.sectionLabel}>{ca.polyglotSectionLabel}</p>
            <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.polyglotBody1Html)} />
            <ol style={{ fontSize: 14, lineHeight: 1.5, color: "var(--color-dim)", margin: "0 0 16px", paddingLeft: 20, display: "grid", gap: 4 }}>
              <li dangerouslySetInnerHTML={h(ca.polyglotItem1Html)} />
              <li dangerouslySetInnerHTML={h(ca.polyglotItem2Html)} />
              <li dangerouslySetInnerHTML={h(ca.polyglotItem3Html)} />
            </ol>
            <p className={s.paragraph}>{ca.polyglotBody2}</p>
            <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.polyglotBraidedHtml)} />
            <div style={{ display: "grid", gap: 12 }}>
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
      <section className={s.section}>
        <SectionHead label={ca.sec2Label} aside={ca.sec2Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec2Note)} />
        <ResourceRow
          label={ca.sec2RowLabel.replace("{langName}", lang.name)}
          filePath={stringsPath(lang.code)}
          lang={lang}
          resourceName="Localization Strings"
          kind="json"
          available={true}
          t={ca}
        />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec2FootHtml)} />
      </section>

      {/* The Accord */}
      <section className={s.section}>
        <SectionHead label={ca.sec3Label} aside={ca.sec3Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec3Note)} />
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
      <section className={s.section}>
        <SectionHead label={ca.sec4Label} aside={ca.sec4Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec4Note)} />
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
      <section className={s.section}>
        <SectionHead label={ca.sec5Label} aside={ca.sec5Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec5NoteHtml)} />
        <div style={{ display: "grid", gap: 12 }}>
          {DMA_PROMPTS.map((p) => (
            <div key={p.file}>
              <p style={{ marginBottom: 4, fontSize: 12, color: "var(--color-mute)" }}>
                {p.polyglot && (
                  <span style={{ marginRight: 4, borderRadius: 999, padding: "1px 6px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-violet)", border: "1px solid color-mix(in srgb, var(--color-violet) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-violet) 12%, transparent)" }}>
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
      <section className={s.section}>
        <SectionHead label={ca.sec6Label} aside={ca.sec6Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec6NoteHtml)} />
        <div style={{ display: "grid", gap: 12 }}>
          {CONSCIENCE_PROMPTS.map((p) => (
            <div key={p.file}>
              <p style={{ marginBottom: 4, fontSize: 12, color: "var(--color-mute)" }}>
                {p.polyglot && (
                  <span style={{ marginRight: 4, borderRadius: 999, padding: "1px 6px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-violet)", border: "1px solid color-mix(in srgb, var(--color-violet) 40%, var(--color-line))", background: "color-mix(in srgb, var(--color-violet) 12%, transparent)" }}>
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
      <section className={s.callout}>
        <p className={s.sectionLabel}>{ca.placeholdersSectionLabel}</p>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.placeholderBody)} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse", color: "var(--color-dim)" }}>
            <thead style={{ textAlign: "left" }}>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <th style={{ padding: "0 12px 8px 0", fontWeight: 600, color: "var(--color-text)" }}>{ca.placeholderColHeader1}</th>
                <th style={{ padding: "0 12px 8px 0", fontWeight: 600, color: "var(--color-text)" }}>{ca.placeholderColHeader2}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{full_context_str}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow1Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{original_thought_content}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow2Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{aspdma_reasoning}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow3Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{dma_guidance}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }} dangerouslySetInnerHTML={h(ca.placeholderRow4Source)} />
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{available_tools_list}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow5Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{domain_name}"} / {"{domain_hint_options}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow6Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{current_thought_depth_plus_1}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow7Source}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-line)" }}>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{max_rounds}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }}>{ca.placeholderRow8Source}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 12px 8px 0", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{"{{POLYGLOT_PDMA_FRAMING}}"}</td>
                <td style={{ padding: "8px 12px 8px 0" }} dangerouslySetInnerHTML={h(ca.placeholderRow9Source)} />
              </tr>
            </tbody>
          </table>
        </div>
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.placeholderFoot)} />
      </section>

      {/* Glossary */}
      <section className={s.section}>
        <SectionHead label={ca.sec7Label} aside={ca.sec7Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec7NoteHtml)} />
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
      <section className={s.section}>
        <SectionHead label={ca.sec8Label} aside={ca.sec8Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec8Note)} />
        <div style={{ display: "grid", gap: 12 }}>
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
          <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec8NoBatteryHtml.replace("{langName}", lang.name))} />
        )}
      </section>

      {/* Results */}
      <section className={s.section}>
        <SectionHead label={ca.sec9Label} aside={ca.sec9Aside} />
        <p className={s.footnote} dangerouslySetInnerHTML={h(ca.sec9NoteHtml)} />
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

      {/* What runs today vs in flight — paired with g09 (holographic survival under loss) */}
      <div className={s.notice}>
        <h2 className={s.h2}>{ca.statusH2}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.statusTodayHtml)} />
        <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.statusInFlightHtml)} />
        <p className={s.paragraph} dangerouslySetInnerHTML={h(ca.statusHonestHtml)} />
        <div className={s.heroArt} aria-hidden="true">
          <SvgGraphic id="g09" className={s.heroGraphic} />
        </div>
      </div>

      {/* Reference links */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{ca.refSectionLabel}</p>
        <div className={s.ctaRow}>
          <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/RUBRIC_CROWDSOURCING.md" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {ca.refRubricCrowdsourcing}
          </a>
          <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/JUDGE_MODEL.md" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {ca.refJudgeModel}
          </a>
          <a href="https://github.com/CIRISAI/CIRISAgent/blob/main/cirisnodecore/FSD/SAFETY_BATTERY_CI_LOOP.md" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {ca.refSafetyCILoop}
          </a>
          <a href="https://github.com/CIRISAI/CIRISLensCore" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            {ca.refCIRISLensCore}
          </a>
          <a href="/safety-vs-censorship" className={`${s.btn} ${s.btnP}`}>
            {ca.refSafetyCensorship}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
