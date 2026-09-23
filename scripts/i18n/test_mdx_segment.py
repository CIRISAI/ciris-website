"""Tests for the MDX segmenter.

The first one is the important one: segmenting and reassembling every .mdx file
in `content/` without translating anything must return each file byte for byte.
757 files, 91k lines. If that passes, the segmenter cannot corrupt a document it
merely passes through — which is the failure mode that matters, because a
mangled table or a translated code fence renders wrong in a language nobody on
the team reads, and looks finished while doing it.

Run:  python3 scripts/i18n/test_mdx_segment.py
"""

from __future__ import annotations

import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))

from mdx_segment import (  # noqa: E402
    mask,
    reassemble,
    segment,
    translatable_units,
    unmask,
    verify_placeholders,
)

ROOT = pathlib.Path(__file__).resolve().parents[2]
FAILURES: list[str] = []


def check(cond: bool, label: str) -> None:
    if cond:
        print(f"  ok    {label}")
    else:
        print(f"  FAIL  {label}")
        FAILURES.append(label)


def eq(got, want, label: str) -> None:
    if got == want:
        print(f"  ok    {label}")
    else:
        print(f"  FAIL  {label}\n        want: {want!r}\n        got:  {got!r}")
        FAILURES.append(label)


def roundtrip(doc: str) -> str:
    return reassemble(segment(doc), {})


# ── the corpus-wide guarantee ────────────────────────────────────────────────

def test_corpus_roundtrip() -> None:
    print("\ncorpus round-trip (the guarantee)")
    files = sorted((ROOT / "content").rglob("*.mdx"))
    bad = [p for p in files if roundtrip(p.read_text(encoding="utf-8")) != p.read_text(encoding="utf-8")]
    check(bool(files), f"found {len(files)} .mdx files to check")
    eq(len(bad), 0, f"all {len(files)} files round-trip byte-identically")
    for p in bad[:3]:
        print(f"        mismatch: {p.relative_to(ROOT)}")


# ── what must never be sent to a model ───────────────────────────────────────

def test_code_fence_is_never_translatable() -> None:
    print("\ncode fences")
    doc = "Intro text.\n\n```python\nprint('hello')  # a sentence in a comment\n```\n\nAfter."
    segs = segment(doc)
    fences = [s for s in segs if s.kind == "fence"]
    eq(len(fences), 1, "the whole block is one segment")
    check(not fences[0].translatable, "fence is not translatable")
    check("print('hello')" in fences[0].raw, "fence keeps its body verbatim")
    units = dict(translatable_units(segs))
    check(not any("print" in v for v in units.values()), "no fence content reaches the model")
    eq(roundtrip(doc), doc, "round-trips")


def test_frontmatter_keys_never_translate() -> None:
    print("\nfrontmatter")
    doc = "---\ntitle: Backmatter Index\ndescription: Index page.\nslug: /backmatter\n---\n\nBody."
    segs = segment(doc)
    units = dict(translatable_units(segs))
    vals = list(units.values())
    check("Backmatter Index" in vals, "title VALUE is translatable")
    check("Index page." in vals, "description VALUE is translatable")
    check(not any(v.strip() in ("title", "description", "slug") for v in vals), "no KEY is translatable")
    check(not any("/backmatter" in v for v in vals), "an untranslatable key's value stays put")
    eq(roundtrip(doc), doc, "round-trips")
    # and a translation rebuilds the key intact
    path = next(k for k, v in units.items() if v == "Backmatter Index")
    out = reassemble(segs, {path: "Índice"})
    check("title: Índice" in out, "key preserved, value replaced")


def test_links_keep_their_target() -> None:
    print("\nlinks and urls")
    body = "See [the changelog](../CHANGELOG.md) and https://github.com/CIRISAI/CIRISAccord for more."
    masked, masks = mask(body)
    check("../CHANGELOG.md" not in masked, "link target is masked away")
    check("https://github.com" not in masked, "bare url is masked away")
    eq(unmask(masked, masks), body, "unmask is the exact inverse")


def test_table_structure_survives() -> None:
    print("\ntables")
    doc = "| Requirement | Status |\n|---|---|\n| Annex F | **Pending** |"
    segs = segment(doc)
    eq(len(segs), 3, "one segment per line, including the alignment row")
    sep = segs[1]
    check(not sep.translatable and not sep.parts, "alignment row is untouchable")
    eq(roundtrip(doc), doc, "round-trips")
    # translating every cell must not move a pipe
    units = translatable_units(segs)
    out = reassemble(segs, {p: "X" for p, _ in units})
    eq(out.split("\n")[1], "|---|---|", "alignment row unchanged after translation")
    eq(out.split("\n")[0].count("|"), doc.split("\n")[0].count("|"), "column count unchanged")


def test_adjacent_table_rows_do_not_merge() -> None:
    print("\nadjacent rows (the bug the first version had)")
    doc = "| a | b |\n| c | d |\n| e | f |"
    eq(roundtrip(doc), doc, "three rows stay three lines")
    eq(len(roundtrip(doc).split("\n")), 3, "line count preserved")


def test_headings_and_lists_keep_their_markers() -> None:
    print("\nmarkers")
    for src, marker in [
        ("## Call for Adversarial Review", "## "),
        ("* metric-Goodhart scenarios", "* "),
        ("1. Annex F operationalization", "1. "),
        ("> a quoted claim", "> "),
    ]:
        segs = segment(src)
        s = segs[0]
        check(s.translatable, f"{marker.strip()!r} line is translatable")
        check(s.prefix.strip() == marker.strip(), f"{marker.strip()!r} marker held in prefix")
        out = reassemble(segs, {"0": "TRANSLATED"})
        check(out.startswith(s.prefix), f"{marker.strip()!r} marker survives translation")


# ── the fail-closed check ────────────────────────────────────────────────────

def test_placeholder_verification_catches_a_lying_model() -> None:
    print("\nplaceholder verification (fail closed)")
    masked, _ = mask("See [the changelog](../CHANGELOG.md) now.")
    check(verify_placeholders(masked, masked) is None, "identical is fine")
    check(verify_placeholders(masked, "Ver ahora.") is not None, "a dropped placeholder is caught")
    check(verify_placeholders(masked, masked + " ⟦9⟧") is not None, "an invented placeholder is caught")
    err = verify_placeholders(masked, "Ver ahora.")
    check("dropped" in (err or ""), "the error says what happened")


def test_no_text_means_nothing_to_translate() -> None:
    print("\nnon-prose lines")
    for src in ["---", "|---|---|", "", "   ", "***"]:
        segs = segment(src)
        check(not any(s.translatable for s in segs), f"{src!r} is not translatable")


def main() -> int:
    test_corpus_roundtrip()
    test_code_fence_is_never_translatable()
    test_frontmatter_keys_never_translate()
    test_links_keep_their_target()
    test_table_structure_survives()
    test_adjacent_table_rows_do_not_merge()
    test_headings_and_lists_keep_their_markers()
    test_placeholder_verification_catches_a_lying_model()
    test_no_text_means_nothing_to_translate()

    print()
    if FAILURES:
        print(f"FAILED: {len(FAILURES)} check(s)")
        for f in FAILURES:
            print(f"  - {f}")
        return 1
    print("all checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
