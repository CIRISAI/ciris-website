# Website notes on the localization pipeline

`localize.py`, `glossary.py` and `TRANSLATION_GUIDE.md` are verbatim from
CIRISAI/CIRISClient — keep them unmodified so upstream fixes port cleanly.
ONE local patch, marked `LOCAL PATCH` in localize.py: `parse_json_reply(None)`
raises ValueError (handled as an unparseable reply) instead of AttributeError
(which killed a whole run when a rung returned no text). Propose it upstream.
The site-owned pieces are `check_localization_sync.py` (the shim: two
single-copy bundles, lists excluded from the address space) and `drive.sh`
(retry/backoff/banked-work driver).

## The failure doctrine (Eric, 2026-09-01)

The model ladder is never bypassed or shortened. Escalating to the top rungs
quickly is the design working, not a cost bug to optimize away.

When a lane FAILS — the ladder is exhausted or the reviewer rejects a string
every rung — the failure leaves the pipeline and becomes a judgment call.
`drive.sh` collects these into `localization/hard-cases/*.json`. Resolution,
in order of preference:

1. **Fix the English.** Most hard cases are the source's fault: ambiguous,
   idiomatic, or doing two jobs in one sentence. Rewrite it to be plainer,
   then re-run the lane. The English gets better too.
2. **Hand-translate with research** (dictionaries, native corpora, parallel
   texts) only when the source is already unambiguous and the languages
   genuinely lack the machinery.
3. Never resolve a hard case by weakening the reviewer, skipping rungs, or
   shipping English to a non-English locale.

## The corpus is the translation memory

`anchors_for` reads each language's live dictionary as its exemplar pool:
same-family strings fix register, lexical-overlap strings fix terminology.
Every approved translation that ships makes the next run better, at zero
extra cost — the compounding is automatic, so new pages should be translated
by the lane (not by hand) to stay inside that loop. New coined terms get
glossary rows BEFORE their first lane run (see the Website Terms sections in
`glossaries/*_glossary.md`).

## Operational reminders

- `--lane` is only the entry point: every run flows draft → cross-family MQM
  review → repair → fail-closed write. The evaluate lane also writes accepted
  repairs.
- The translate lane never overwrites non-empty values. Do not stub English
  into locales you intend to machine-translate; leave the keys missing and
  let the diff-driven selector find them.
- Writes bank per language; kills and 402s lose nothing. The OpenRouter key
  auto-tops-up, so a 402 is transient lag — `drive.sh` backs off and retries.
- The site-wide re-translation runs as bounded evaluate sweeps: strings that
  pass MQM cost one cached review and are kept; only failures pay for repair.

## The sweep (site-wide re-translation)

`sweep.py` runs the corpus through the evaluate lane as importance-ordered
batches (chrome and install first, SEO tail last), one commit per batch, a
spend ledger in `hard-cases/sweep-*-ledger.json`, and a self-imposed budget
pause (Eric: "track the cost and pause if you exceed $50 to check progress").
Provider outages (reviewer unreachable, a rung dying on 402 lag) are retried
per language; genuine judge rejections are never retried — they go to the
hard-cases file for judgment. A post-write guard reverts any single value
that breaks keyset, leaf type, or runtime placeholders, keeping the rest of
that language's accepted repairs. Dead copy is not paid for: `home.*` has no
source references and `lobby.*` is retired except `lobby.store.*`.

## Context hygiene (2026-09-02)

After the first two sweep batches: 77% of spend was gpt-5-pro and two-thirds
of its attempts failed, on disputes that were not translation problems.
Fixes live in the data the judge and repairer already read:

- Glossaries: the Version History table is bullets (the parser read its
  header as the term "Version -> Date"); ACCORD's deprecation note allows a
  historical Accord in the English; Constitution / CIRIS Scoring / safety
  case / Meta-Goal M-1 rows harvested from reviewed labels; a standing
  "UI labels and review conduct" rule under Cultural Considerations.
- The judge's own signal for English-first fixes: any key flagged in four
  or more languages in a batch report. Fix the English before the next run.
- Store badge labels (`lobby.store.*`) are two-line badge halves; the rule
  tells the judge so. Do not translate them as sentences.
- Queued for the pause (locale files cannot be edited while the lane
  writes): translate the new keys (homeHero.ogTitle/ogDescription,
  paths.consumer-ai.ogCardTitle), re-run the changed-English keys in both
  bundles, splice the three seeAlso labels, harvest a "decision trace" row
  once its label has been re-run.
