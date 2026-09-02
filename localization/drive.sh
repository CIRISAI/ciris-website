#!/usr/bin/env bash
# Drive a localization lane to completion, banking work between attempts.
#
# The ladder itself is NEVER bypassed or shortened (per Eric): escalation to
# the top rungs is the design, not a cost bug. What this driver adds is what
# happens AROUND a run:
#   - retries with backoff, because the write path banks accepted values per
#     language, so a 402 (auto-top-up lag) or a killed process loses nothing;
#   - after the final attempt, anything still unresolved or judge-rejected is
#     collected into localization/hard-cases/<timestamp>.json for CLAUDE'S
#     JUDGMENT. The playbook there, in order of preference:
#       1. Change the ENGLISH source to be less ambiguous or less idiomatic,
#          then re-run — most failures are the source's fault.
#       2. Hand-translate with real research (dictionaries, native corpora)
#          only when the source is already unambiguous.
#     Never resolve a hard case by weakening the reviewer or skipping rungs.
#
# Usage:
#   LANE=translate|evaluate [BUNDLE=dictionaries|chrome] [KEYS="pat.* pat2.*"] [LANGS="yo am"]
#   [MAX_KEYS=500] [ATTEMPTS=8] [BACKOFF=180] localization/drive.sh
set -u
cd "$(dirname "$0")/.."
LANE="${LANE:-translate}"
export LOCALIZE_BUNDLE="${BUNDLE:-dictionaries}"
# The ladder (per Eric, 2026-09-02): gpt-5-pro is out. Gemini 3.7 Flash repairs
# first (16/21 held Yoruba strings accepted at $0.05), Opus 5 is the last word;
# the judge stays gpt-5.1, a different family from every repairer.
export LOCALIZE_LADDER="${LOCALIZE_LADDER:-anthropic/claude-sonnet-5,google/gemini-3.7-flash,anthropic/claude-opus-5}"
MAX_KEYS="${MAX_KEYS:-500}"
ATTEMPTS="${ATTEMPTS:-8}"
BACKOFF="${BACKOFF:-180}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="localization/hard-cases"
mkdir -p "$OUT"

if [ -z "${OPENROUTER_API_KEY:-}" ] && [ -f "$HOME/.openrouter_key" ]; then
  export OPENROUTER_API_KEY="$(tr -d '\n\r\t ' < "$HOME/.openrouter_key")"
fi

keyargs=()
for p in ${KEYS:-}; do keyargs+=(--keys "$p"); done
for l in ${LANGS:-}; do keyargs+=(--lang "$l"); done

last_report=""
for attempt in $(seq 1 "$ATTEMPTS"); do
  if [ "$LANE" = "translate" ] && [ -z "${KEYS:-}" ]; then
    if python3 localization/localize.py --check 2>&1 | grep -q 'all languages at parity'; then
      echo "DONE after $((attempt-1)) attempt(s): all languages at parity"
      exit 0
    fi
  fi
  echo "=== attempt $attempt/$ATTEMPTS ($LANE lane, $LOCALIZE_BUNDLE bundle) ==="
  last_report="$OUT/run-$STAMP-a$attempt.json"
  python3 localization/localize.py --lane "$LANE" "${keyargs[@]}" \
    --max-keys "$MAX_KEYS" --report "$last_report" 2>&1 | tail -20
  rc=$?
  if [ "$rc" = "0" ]; then
    echo "DONE after $attempt attempt(s): lane clean"
    exit 0
  fi
  echo "--- lane exit $rc; backing off ${BACKOFF}s (402 lag, transient rungs) ---"
  sleep "$BACKOFF"
done

# The attempts are spent: distill what resisted into a hard-cases file.
python3 - "$last_report" "$OUT/hard-cases-$STAMP.json" <<'PY'
import json, sys
report, out = sys.argv[1], sys.argv[2]
try:
    r = json.load(open(report))
except Exception:
    r = {}
cases = []
for lang, d in sorted(r.items()):
    for k, why in (d.get("unresolved") or {}).items():
        cases.append({"lang": lang, "key": k, "kind": "ladder_exhausted", "why": why})
    for k, why in (d.get("rejected_unrepaired") or {}).items():
        cases.append({"lang": lang, "key": k, "kind": "judge_rejected", "why": why,
                      "findings": (d.get("findings") or {}).get(k, [])})
doc = {
    "instructions": (
        "Hard cases for Claude's judgment. Preferred fix: clarify the ENGLISH "
        "source (less ambiguous, less idiomatic) and re-run the lane. Second: "
        "hand-translate with real research. Never bypass the ladder or soften "
        "the reviewer."
    ),
    "cases": cases,
}
json.dump(doc, open(out, "w"), indent=2, ensure_ascii=False)
print(f"wrote {len(cases)} hard case(s) to {out}")
PY
echo "ATTEMPTS EXHAUSTED — hard cases filed for adjudication"
exit 1
