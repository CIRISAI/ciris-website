"""Translate MDX docs, glossary-first, and refuse to write anything doubtful.

    python3 scripts/i18n/translate_mdx.py --check                 # free: what is missing
    python3 scripts/i18n/translate_mdx.py --lang es               # translate the gaps
    python3 scripts/i18n/translate_mdx.py --lang es --file content/docs/foreword/section0.mdx
    python3 scripts/i18n/translate_mdx.py --lang es --dry-run     # show the plan, call nothing

Ported from CIRISClient's `localization/localize.py`, which has run the app's 29
locales for several releases. Three things carry over, and they are the reason
this is worth having over a plain "translate this file" script:

1. GLOSSARY FIRST. `scripts/i18n/glossaries/{code}_glossary.md` fixes the CIRIS
   terms of art per language — OBSERVE, DEFER, Wise Authority, accord holder —
   plus that language's standing prose rules. Only the terms occurring in the
   batch are sent. This is what stops the site and the app drifting apart in 29
   languages at once, and it is the one practice the retrospectives credit
   unreservedly.

2. FAIL CLOSED. A segment whose translation loses a placeholder — a URL, a code
   span, a link target — is REJECTED and the original English is kept. Not
   written with a warning. Not written. A half-translated page a reader can
   navigate beats a fully-translated page with a dead link in it.

3. STRUCTURE IS NOT PROSE. Everything structural goes through `mdx_segment`,
   whose round-trip over all 757 files in `content/` is asserted by
   `test_mdx_segment.py`. Code fences, table alignment rows, frontmatter keys
   and link targets are never sent to a model at all.

Provider: OPENROUTER_API_KEY. Set LOCALIZE_MODEL to override the default.
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request
from typing import Dict, List, Optional, Tuple

sys.path.insert(0, str(pathlib.Path(__file__).parent))

from mdx_segment import (  # noqa: E402
    reassemble,
    segment,
    translatable_units,
    verify_placeholders,
)

ROOT = pathlib.Path(__file__).resolve().parents[2]
CONTENT = ROOT / "content"
GLOSSARIES = pathlib.Path(__file__).parent / "glossaries"

API_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = os.environ.get("LOCALIZE_MODEL", "anthropic/claude-sonnet-4.5")

#: Locale codes the site ships. Mirrors src/i18n/config.ts; en is the source.
LOCALES = [
    "am", "ar", "bn", "de", "es", "fa", "fr", "ha", "hi", "id", "it", "ja",
    "ko", "mr", "my", "pa", "pt", "ru", "sw", "ta", "te", "th", "tr", "uk",
    "ur", "vi", "yo", "zh",
]

#: How many segments go in one request. Small enough that one rejection does
#: not throw away a page's worth of work.
BATCH = 40


def english_sources() -> List[pathlib.Path]:
    """Every .mdx that is NOT already a translation (`index.es.mdx` and friends)."""
    return sorted(
        p for p in CONTENT.rglob("*.mdx")
        if not re.match(r"^[a-z]{2}$", p.stem.rsplit(".", 1)[-1] if "." in p.stem else "")
    )


def target_for(src: pathlib.Path, lang: str) -> pathlib.Path:
    return src.with_name(f"{src.stem}.{lang}.mdx")


def load_glossary(lang: str) -> str:
    p = GLOSSARIES / f"{lang}_glossary.md"
    return p.read_text(encoding="utf-8") if p.exists() else ""


def relevant_glossary(gloss: str, texts: List[str]) -> str:
    """Only the rows whose English term actually occurs in this batch.

    Sending 3,000 term pairs per request wastes budget and buries the handful
    that matter. Standing prose rules (the non-table prose) always go.
    """
    if not gloss:
        return ""
    blob = " ".join(texts).lower()
    kept, prose = [], []
    for line in gloss.split("\n"):
        if line.startswith("|") and line.count("|") >= 3:
            cells = [c.strip() for c in line.strip("|").split("|")]
            if cells and cells[0].lower() in ("english", "---") or set(cells[0]) <= set("- :"):
                continue
            if cells[0] and cells[0].lower() in blob:
                kept.append(line)
        elif line.strip() and not line.startswith("|"):
            prose.append(line)
    out = "\n".join(prose[:40])
    if kept:
        out += "\n\nTerms appearing in this batch (use these renderings exactly):\n" + "\n".join(kept)
    return out


SYSTEM = """You translate documentation for CIRIS, an AI governance project.

You are given numbered English segments from an MDX document. Return a JSON
object mapping each number to its translation into {language}. Nothing else.

Absolute rules:
- Placeholders like ⟦0⟧ ⟦1⟧ are URLs, code spans and link targets. Copy every
  one through UNCHANGED and in a natural position for the target language.
  Never translate, renumber, add or drop one.
- Preserve markdown emphasis (**bold**, *italic*) around the same content.
- Do not add, remove or merge segments. Do not explain. Do not add commentary.
- Proper nouns, product names and citation labels (Book IX, Annex F, §5.2,
  DOI strings) stay as they are.
- Where the glossary gives a rendering for a term, use exactly that rendering.
"""


def call_model(lang_name: str, gloss: str, batch: List[Tuple[str, str]], model: str) -> Dict[str, str]:
    key = os.environ.get("OPENROUTER_API_KEY")
    if not key:
        raise SystemExit(
            "OPENROUTER_API_KEY is not set.\n"
            "  In CI it comes from the repo/org secret of that name.\n"
            "  Locally: export OPENROUTER_API_KEY=sk-or-v1-…"
        )
    numbered = {str(i): text for i, (_path, text) in enumerate(batch)}
    user = ""
    if gloss:
        user += f"GLOSSARY\n{gloss}\n\n"
    user += "SEGMENTS\n" + json.dumps(numbered, ensure_ascii=False, indent=1)

    body = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM.replace("{language}", lang_name)},
            {"role": "user", "content": user},
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2,
    }).encode()

    req = urllib.request.Request(
        API_URL, data=body,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/CIRISAI/ciris-website",
            "X-Title": "ciris-website i18n",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            payload = json.load(resp)
    except urllib.error.HTTPError as e:
        raise SystemExit(f"provider returned HTTP {e.code}: {e.read()[:400].decode(errors='replace')}")

    content = payload["choices"][0]["message"]["content"]
    try:
        got = json.loads(content)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", content, re.S)
        if not m:
            return {}
        got = json.loads(m.group(0))
    return {batch[int(k)][0]: v for k, v in got.items() if k.isdigit() and int(k) < len(batch)}


def translate_file(src: pathlib.Path, lang: str, lang_name: str, model: str,
                   dry_run: bool) -> Optional[str]:
    doc = src.read_text(encoding="utf-8")
    segs = segment(doc)
    units = translatable_units(segs)
    if not units:
        return None

    if dry_run:
        print(f"    {src.relative_to(ROOT)}: {len(units)} segment(s) would be sent")
        return None

    gloss = load_glossary(lang)
    accepted: Dict[str, str] = {}
    rejected = 0

    for start in range(0, len(units), BATCH):
        batch = units[start:start + BATCH]
        got = call_model(lang_name, relevant_glossary(gloss, [t for _, t in batch]), batch, model)
        for path, source_text in batch:
            candidate = got.get(path)
            if candidate is None:
                rejected += 1
                continue
            # FAIL CLOSED. A lost placeholder is a deleted URL.
            err = verify_placeholders(source_text, candidate)
            if err:
                print(f"      reject {path}: {err}")
                rejected += 1
                continue
            accepted[path] = candidate

    if not accepted:
        print(f"    {src.relative_to(ROOT)}: nothing accepted ({rejected} rejected) — not writing")
        return None

    out = reassemble(segs, accepted)
    note = f"{len(accepted)}/{len(units)} segments"
    if rejected:
        note += f", {rejected} kept in English (rejected)"
    print(f"    {src.relative_to(ROOT)} -> {target_for(src, lang).name}: {note}")
    return out


def cmd_check() -> int:
    """What exists and what is missing. Calls no model, costs nothing."""
    sources = english_sources()
    print(f"{len(sources)} English source document(s) under content/\n")
    print(f"{'locale':>8}  {'translated':>10}  {'missing':>8}")
    print(f"{'-'*8}  {'-'*10}  {'-'*8}")
    total_missing = 0
    for lang in LOCALES:
        have = sum(1 for s in sources if target_for(s, lang).exists())
        missing = len(sources) - have
        total_missing += missing
        flag = "" if missing == 0 else "  <-"
        print(f"{lang:>8}  {have:>10}  {missing:>8}{flag}")
    print(f"\n{total_missing} document-locale pair(s) missing.")
    print("Glossaries present:",
          f"{sum(1 for l in LOCALES if (GLOSSARIES / f'{l}_glossary.md').exists())}/{len(LOCALES)}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="report coverage; call no model")
    ap.add_argument("--lang", action="append", default=[], metavar="CODE")
    ap.add_argument("--file", action="append", default=[], metavar="PATH")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="stop after N documents (budget guard)")
    ap.add_argument("--overwrite", action="store_true",
                    help="retranslate documents that already have a translation")
    args = ap.parse_args()

    if args.check:
        return cmd_check()

    langs = args.lang or LOCALES
    unknown = [l for l in langs if l not in LOCALES]
    if unknown:
        raise SystemExit(f"unknown locale(s): {unknown}. Known: {LOCALES}")

    sources = [ROOT / f for f in args.file] if args.file else english_sources()
    names = {"es": "Spanish", "am": "Amharic", "ha": "Hausa", "yo": "Yoruba", "sw": "Swahili",
             "ar": "Arabic", "bn": "Bengali", "de": "German", "fa": "Persian", "fr": "French",
             "hi": "Hindi", "id": "Indonesian", "it": "Italian", "ja": "Japanese", "ko": "Korean",
             "mr": "Marathi", "my": "Burmese", "pa": "Punjabi", "pt": "Portuguese", "ru": "Russian",
             "ta": "Tamil", "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian",
             "ur": "Urdu", "vi": "Vietnamese", "zh": "Chinese"}

    written = 0
    for lang in langs:
        print(f"\n[{lang}] {names.get(lang, lang)}")
        if not (GLOSSARIES / f"{lang}_glossary.md").exists():
            print(f"    no glossary for {lang} — terminology cannot be enforced; skipping")
            continue
        for src in sources:
            dest = target_for(src, lang)
            if dest.exists() and not args.overwrite:
                continue
            if args.limit and written >= args.limit:
                print(f"    --limit {args.limit} reached; stopping")
                return 0
            out = translate_file(src, lang, names.get(lang, lang), args.model, args.dry_run)
            if out is not None:
                dest.write_text(out, encoding="utf-8")
                written += 1

    print(f"\n{written} file(s) written.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
