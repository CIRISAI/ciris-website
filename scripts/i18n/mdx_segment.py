"""Split an MDX document into what may be translated and what must not be.

THE GUARANTEE THIS FILE EXISTS TO MAKE
--------------------------------------
`reassemble(segment(doc), {})` returns `doc`, byte for byte, for every document
in the corpus. Segmenting and putting back together without translating
anything is the identity function.

That property is the whole safety argument. A machine translator that mangles a
code fence, drops a table's alignment row, or rewrites a link target produces a
document that renders wrong in a language nobody on the team reads — which is
worse than no translation at all, because it looks finished. The round-trip
test (`test_mdx_segment.py`) runs this over every .mdx file in `content/` and
fails if a single byte moves.

WHAT IS NEVER SENT TO A MODEL
-----------------------------
  - frontmatter KEYS (only the `title:` and `description:` VALUES go out)
  - fenced code blocks, fence markers and their language tags
  - inline code spans
  - link and image TARGETS (the visible text is translated; the URL is not)
  - bare URLs and autolinks
  - table alignment rows (`|---|:--:|`)
  - HTML/JSX tags, should any appear later — this corpus has none today, and
    the masker is written so that adding them does not become a rewrite
  - markdown structural punctuation: heading hashes, list bullets, blockquote
    markers, thematic breaks

Everything else is prose, and prose is what gets translated.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional

# ── Inline constructs that must survive translation untouched ────────────────
#
# Order matters: code spans first, so a URL inside backticks is masked as code
# and never re-examined. Each pattern is replaced by a placeholder the model is
# told to copy verbatim.
_INLINE = [
    ("code", re.compile(r"`[^`\n]+`")),
    ("image", re.compile(r"!\[[^\]]*\]\([^)]*\)")),
    ("link", re.compile(r"\[[^\]]*\]\([^)]*\)")),
    ("autolink", re.compile(r"<https?://[^>\s]+>")),
    ("url", re.compile(r"https?://[^\s)\]<>]+")),
    ("tag", re.compile(r"</?[A-Za-z][A-Za-z0-9._-]*(?:\s[^<>]*?)?/?>")),
]

# U+27E6/27E7 mathematical white square brackets: absent from this corpus and
# from natural prose, so they cannot collide with content being masked.
_PH_OPEN, _PH_CLOSE = "⟦", "⟧"
_PH_RE = re.compile(rf"{_PH_OPEN}(\d+){_PH_CLOSE}")

_FENCE_RE = re.compile(r"^(\s*)(`{3,}|~{3,})(.*)$")
_TABLE_SEP_RE = re.compile(r"^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$")
_FM_KV_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_-]*)(\s*:\s*)(.*)$")


@dataclass
class Segment:
    """One piece of the document.

    `raw` is always the exact original text. When `translatable` is False the
    reassembler emits `raw` and nothing else can happen to it.
    """

    raw: str
    translatable: bool = False
    kind: str = "verbatim"
    #: Prose with inline constructs replaced by placeholders — what a model sees.
    masked: Optional[str] = None
    #: Placeholder index -> the original text it stands for.
    masks: Dict[int, str] = field(default_factory=dict)
    #: Rebuilt around a translated body (heading hashes, list bullet, table cell).
    prefix: str = ""
    suffix: str = ""
    #: For a table row: the cells and pipes it is built from. A row is still ONE
    #: segment — one segment per line, always — so reassembly stays a plain join
    #: and cannot merge two rows into one.
    parts: List["Segment"] = field(default_factory=list)

    def render(self, translations: Dict[str, str], path: str) -> str:
        if self.parts:
            return "".join(
                part.render(translations, f"{path}.{j}") for j, part in enumerate(self.parts)
            )
        translation = translations.get(path)
        if not self.translatable or translation is None:
            return self.raw
        return self.prefix + unmask(translation, self.masks) + self.suffix


def mask(text: str) -> tuple[str, Dict[int, str]]:
    """Replace inline constructs with placeholders. Inverse of [unmask]."""
    masks: Dict[int, str] = {}
    out = text
    for _kind, pattern in _INLINE:
        def repl(m: re.Match) -> str:
            idx = len(masks)
            masks[idx] = m.group(0)
            return f"{_PH_OPEN}{idx}{_PH_CLOSE}"

        out = pattern.sub(repl, out)
    return out, masks


def unmask(text: str, masks: Dict[int, str]) -> str:
    """Restore masked constructs.

    A placeholder the model dropped or invented is a failure we want LOUD, not
    silently papered over — see `verify_placeholders`. Here we simply restore
    what we can; an unknown index is left as-is so the check can see it.
    """
    return _PH_RE.sub(lambda m: masks.get(int(m.group(1)), m.group(0)), text)


def verify_placeholders(masked: str, translated: str) -> Optional[str]:
    """Return an error string if the translation did not preserve placeholders.

    A model that drops one has deleted a URL or a code span from the document.
    Callers must reject the translation rather than write it.
    """
    want = sorted(int(m) for m in _PH_RE.findall(masked))
    got = sorted(int(m) for m in _PH_RE.findall(translated))
    if want != got:
        missing = sorted(set(want) - set(got))
        extra = sorted(set(got) - set(want))
        bits = []
        if missing:
            bits.append(f"dropped {missing}")
        if extra:
            bits.append(f"invented {extra}")
        return "placeholders " + ", ".join(bits)
    return None


def _prose_segment(body: str, prefix: str = "", suffix: str = "", kind: str = "prose") -> Segment:
    masked, masks = mask(body)
    return Segment(
        raw=prefix + body + suffix,
        translatable=bool(masked.strip()) and bool(re.search(r"[A-Za-z]", masked)),
        kind=kind,
        masked=masked,
        masks=masks,
        prefix=prefix,
        suffix=suffix,
    )


def segment(doc: str) -> List[Segment]:
    """Split `doc` into segments. See module docstring for the guarantee."""
    lines = doc.split("\n")
    segs: List[Segment] = []
    i = 0
    n = len(lines)

    # ── frontmatter ──────────────────────────────────────────────────────────
    # Only title and description values are translated. Keys never are: a
    # translated key is a broken build, not a broken sentence.
    if n and lines[0].strip() == "---":
        segs.append(Segment(raw=lines[0], kind="fm-open"))
        i = 1
        while i < n and lines[i].strip() != "---":
            m = _FM_KV_RE.match(lines[i])
            if m and m.group(1) in ("title", "description"):
                key, sep, value = m.groups()
                quote = ""
                inner = value
                if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                    quote, inner = value[0], value[1:-1]
                segs.append(
                    _prose_segment(inner, prefix=key + sep + quote, suffix=quote, kind="frontmatter")
                )
            else:
                segs.append(Segment(raw=lines[i], kind="fm-other"))
            i += 1
        if i < n:
            segs.append(Segment(raw=lines[i], kind="fm-close"))
            i += 1

    # ── body ─────────────────────────────────────────────────────────────────
    while i < n:
        line = lines[i]

        fence = _FENCE_RE.match(line)
        if fence:
            # The whole block, markers included, is verbatim. Code translated
            # into Yoruba is not code.
            marker = fence.group(2)
            block = [line]
            i += 1
            while i < n:
                block.append(lines[i])
                closing = _FENCE_RE.match(lines[i])
                i += 1
                if closing and closing.group(2)[0] == marker[0] and len(closing.group(2)) >= len(marker):
                    break
            segs.append(Segment(raw="\n".join(block), kind="fence"))
            continue

        stripped = line.strip()

        # Structural lines with no prose: thematic breaks, blank lines, and the
        # table alignment row, whose colons carry column alignment.
        if not stripped or _TABLE_SEP_RE.match(line) or re.fullmatch(r"(\*\s*){3,}|(-\s*){3,}|(_\s*){3,}", stripped):
            segs.append(Segment(raw=line, kind="structural"))
            i += 1
            continue

        # Table row: each cell is translated on its own so the pipes, and the
        # column count, cannot move.
        if stripped.startswith("|") and stripped.count("|") >= 2:
            segs.append(Segment(raw=line, kind="table-row", parts=_table_row(line)))
            i += 1
            continue

        # Heading, list item, blockquote: keep the marker, translate the text.
        m = re.match(r"^(\s*#{1,6}\s+)(.*)$", line) or \
            re.match(r"^(\s*(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?)(.*)$", line) or \
            re.match(r"^(\s*>+\s*)(.*)$", line)
        if m:
            segs.append(_prose_segment(m.group(2), prefix=m.group(1), kind="prose"))
            i += 1
            continue

        segs.append(_prose_segment(line, kind="prose"))
        i += 1

    return segs


def _table_row(line: str) -> List[Segment]:
    """Split `| a | b |` into per-cell segments, pipes preserved verbatim."""
    out: List[Segment] = []
    parts = re.split(r"(\|)", line)
    for part in parts:
        if part == "|":
            out.append(Segment(raw="|", kind="table-pipe"))
        elif part.strip():
            lead = part[: len(part) - len(part.lstrip())]
            trail = part[len(part.rstrip()):]
            out.append(_prose_segment(part.strip(), prefix=lead, suffix=trail, kind="table-cell"))
        else:
            out.append(Segment(raw=part, kind="structural"))
    return out


def reassemble(segs: List[Segment], translations: Dict[str, str]) -> str:
    """Rebuild the document. With an empty `translations`, returns the original.

    One segment per line, joined by newline. There is deliberately no logic here
    deciding which pieces share a line — an earlier version had exactly that and
    merged adjacent table rows into one, silently, in 203 of the 757 files. The
    structure carries that information instead.
    """
    return "\n".join(seg.render(translations, str(i)) for i, seg in enumerate(segs))


def translatable_units(segs: List[Segment]) -> List[tuple[str, str]]:
    """(path, masked text) for everything a model should see.

    `path` is "12" for a whole line, "12.3" for the fourth part of a table row.
    """
    out: List[tuple[str, str]] = []

    def walk(seg: Segment, path: str) -> None:
        if seg.parts:
            for j, part in enumerate(seg.parts):
                walk(part, f"{path}.{j}")
        elif seg.translatable:
            out.append((path, seg.masked or ""))

    for i, seg in enumerate(segs):
        walk(seg, str(i))
    return out
