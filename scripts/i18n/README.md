# MDX translation

Ported from [CIRISClient](https://github.com/CIRISAI/CIRISClient)'s
`localization/localize.py`, which has run the app's 29 locales for several
releases. This is the MDX-aware half: the client translates key-value bundles,
and `content/**/*.mdx` is prose with structure in it, which is a different
problem.

## Start here — it costs nothing

```bash
python3 scripts/i18n/test_mdx_segment.py     # the safety guarantee, on the real corpus
python3 scripts/i18n/translate_mdx.py --check  # what exists, what is missing
```

Neither calls a model. `--check` currently reports **29 English sources, 26
translated per locale, the same 3 missing in all 28**:

- `content/docs/annexes/addenda/index.mdx`
- `content/docs/how-to-help/index.mdx`
- `content/docs/resources-credits/index.mdx`

## What is guaranteed, and what is not

**Guaranteed: structure survives.** `mdx_segment.py` splits a document into
prose and everything-else, and `reassemble(segment(doc), {})` returns `doc` byte
for byte. That is asserted over all 757 files in `content/` by
`test_mdx_segment.py`, which runs in CI on every push that touches these
scripts. These never reach a model at all:

| never sent | why |
|---|---|
| fenced code blocks | code translated into Yoruba is not code |
| frontmatter KEYS | a translated key is a broken build, not a broken sentence |
| table alignment rows | the colons carry column alignment |
| link and image targets | the visible text is translated; the URL is not |
| inline code spans | same reason as fences |
| heading hashes, list bullets, blockquote markers | structure, not prose |

**Guaranteed: terminology.** `glossaries/{code}_glossary.md` — 29 files, ~3,045
canonical term pairs — fixes the CIRIS terms of art per language, plus that
language's standing prose rules (use the formal እርስዎ; never omit Yoruba's
dot-below). Only the terms occurring in a batch are sent. This is what keeps the
site and the app from drifting apart in 29 languages at once, and it is directly
relevant to `ACCORD_TERMINOLOGY_NOTES.md`: "Section" versus "Book" is exactly the
kind of drift a glossary row settles once instead of a table maintained by hand.

**Guaranteed: fail closed.** A segment whose translation loses a placeholder
(a URL, a code span, a link target) is rejected and the English is kept. Not
written with a warning — not written. A half-translated page a reader can
navigate beats a fully-translated page with a dead link in it.

**NOT guaranteed: meaning.** This is machine translation. The glossaries make
terminology objective and enforceable; nothing here makes a mistranslated
sentence detectable. Every run opens a PR rather than pushing, and the
Constitution deserves a human read before it goes live in a language the team
does not speak.

**NOT ported: the MQM review lane.** CIRISClient's pipeline also has
`--lane evaluate` (reference-free span-level MQM review over
`{accuracy, fluency, terminology, style, locale} × {critical, major, minor}`)
and `--lane repair`. Those are worth having here too — they are what turns
"translated" into "reviewed" — but they are a second step, and this PR is
deliberately the smaller one.

## Running a translation

Manual only, via **Actions → i18n mdx → Run workflow**. It spends money, so it
is never automatic. Inputs:

- `langs` — comma-separated codes, blank for all 28
- `limit` — max documents this run (budget guard, default 5)
- `overwrite` — retranslate documents that already have a translation

Locally:

```bash
export OPENROUTER_API_KEY=sk-or-v1-…
python3 scripts/i18n/translate_mdx.py --lang es --limit 1 --dry-run   # plan only
python3 scripts/i18n/translate_mdx.py --lang es --limit 1
```

`--dry-run` prints how many segments each document would send and calls nothing.

## Cost shape

The three missing documents are small — 4, 24 and 12 translatable segments for
one locale. A full 28-locale fan-out over all 29 documents is a much larger
number, which is why `--limit` defaults to 5 and the workflow is dispatch-only.
Consider a separate, budget-capped OpenRouter key for this repo rather than
sharing the client's: a runaway lane here should not be able to exhaust a
release budget elsewhere.

## Files

| file | what it is |
|---|---|
| `mdx_segment.py` | the segmenter, and the round-trip guarantee |
| `test_mdx_segment.py` | that guarantee, asserted on all 757 real documents |
| `translate_mdx.py` | the driver: glossary, batching, fail-closed writes |
| `glossaries/` | 29 glossaries, copied from CIRISClient |
| `../../.github/workflows/i18n-mdx.yml` | free guard on every push; translation on dispatch |
