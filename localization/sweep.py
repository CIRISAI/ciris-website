#!/usr/bin/env python3
"""Site-wide re-translation as bounded EVALUATE sweeps, banked batch by batch.

Why a sweep and not one run: the evaluate lane reviews every selected value
with the cross-family MQM judge and repairs (up the ladder) whatever fails.
Strings that pass cost one cached review; only failures pay for repair. Run
over the whole corpus in one go that is a single unbounded bill and a single
point of loss. Run as ordered batches it is a ledger: every batch commits its
accepted repairs, records its spend, and the sweep pauses itself at a budget
so a human checks progress before more money moves (Eric, 2026-09-01: "track
the cost and pause if you exceed $50 to check progress").

The ladder is NEVER bypassed or shortened here. What this adds around the
lane is: importance ordering (the pages people actually land on first),
retry of provider outages per language, a post-write parity guard, a commit
per batch, a spend ledger, and a hard-cases file for Claude's judgment (fix
the ENGLISH first; hand-translate with research second; never soften the
reviewer). See SITE_NOTES.md.

Usage:
  python3 localization/sweep.py --budget 50 [--start-at NAME] [--only NAME ...]
                                [--attempts 3] [--backoff 180] [--dry-run]
                                [--no-push]
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent
HERE = ROOT / "localization"
OUT = HERE / "hard-cases"
BUNDLES = {"dictionaries": ROOT / "src/i18n/dictionaries",
           "chrome": ROOT / "src/i18n/chrome"}
PLACEHOLDER = re.compile(r"\$\{[^}]*\}|\{[A-Za-z0-9_]+\}|%[0-9]*\$?[sd]")
SPEND_RE = re.compile(r"total ~ \$([0-9]+\.[0-9]+)")
TRAILER = ("Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\n"
           "Claude-Session: https://claude.ai/code/session_016pB47qFep7rPXfVJwytXBk")

# The plan, in importance order: what a visitor meets first goes first. The
# landing (homeHero) is included: cheap, and it is the first thing anyone reads. `home.*` is dead copy (no source references) and `lobby.*` is
# retired; its store badge labels are two lines of a badge by design and are
# left as shipped (every judge reads a badge half as a broken sentence).
PLAN: List[Tuple[str, str, List[str]]] = [
    ("chrome",        "chrome",       ["nav.*", "footer.*"]),
    ("hero",          "dictionaries", ["homeHero.*"]),
    ("shell-install", "dictionaries", ["common.*", "pathsCommon.*",
                                        "install.*", "cewp.*", "constitution.*"]),
    ("safety",        "dictionaries", ["safety.*"]),
    ("story",         "dictionaries", ["philosophy.*", "vision.*", "reaching.*", "about.*"]),
    ("how-it-works",  "dictionaries", ["howItWorks.*"]),
    ("mesh",          "dictionaries", ["meshClaim.*"]),
    ("research",      "dictionaries", ["researchStatus.*"]),
    ("first-contact", "dictionaries", ["firstContact.*", "fcTheory.*"]),
    ("trust",         "dictionaries", ["trust.*"]),
    ("compare",       "dictionaries", ["compare.*"]),
    ("stack",         "dictionaries", ["stack.*", "epistemicWeb.*", "grammar.*", "models.*"]),
    ("crowd-fed",     "dictionaries", ["crowdsourcingAlignment.*", "federation.*"]),
    ("mdd",           "dictionaries", ["mdd.*"]),
    ("safety-pages",  "dictionaries", ["killSwitch.*", "safetyArch.*", "safetyVsCensorship.*",
                                        "contextualIntegrity.*"]),
    ("services-etc",  "dictionaries", ["services.*", "paths.*", "coherenceRatchet.*",
                                        "coherenceCollapseAnalysis.*"]),
    ("seo-pages",     "dictionaries", ["owasp.*", "euAiAct.*", "msCompare.*"]),
]


def log(msg: str) -> None:
    print(f"[sweep] {dt.datetime.now(dt.timezone.utc).strftime('%H:%M:%S')} {msg}", flush=True)


def sh(cmd: List[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True, **kw)


def lane_env(bundle: str) -> dict:
    env = dict(os.environ)
    env["LOCALIZE_BUNDLE"] = bundle
    if not env.get("OPENROUTER_API_KEY"):
        keyfile = Path.home() / ".openrouter_key"
        if keyfile.exists():
            env["OPENROUTER_API_KEY"] = keyfile.read_text().strip()
    return env


def flat(obj: dict, prefix: str = "") -> Dict[str, object]:
    """Same address space the shim exposes: lists are invisible."""
    out: Dict[str, object] = {}
    for k, v in obj.items():
        if not prefix and k == "_meta":
            continue
        key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out.update(flat(v, key))
        elif isinstance(v, list):
            continue
        else:
            out[key] = v
    return out


def set_path(obj: dict, dotted: str, value) -> None:
    parts = dotted.split(".")
    for p in parts[:-1]:
        obj = obj[p]
    obj[parts[-1]] = value


def selection_size(bundle: str, patterns: List[str], langs: List[str]) -> int:
    """Ask the lane itself how many key-values the batch is (dry-run)."""
    cmd = [sys.executable, "localization/localize.py", "--lane", "evaluate",
           "--dry-run", "--max-keys", "1000000"]
    for p in patterns:
        cmd += ["--keys", p]
    for l in langs:
        cmd += ["--lang", l]
    r = sh(cmd, env=lane_env(bundle))
    m = re.search(r"lane=evaluate\s+(\d+) key-value", r.stdout)
    if not m:
        log(f"dry-run could not size the batch:\n{r.stdout[-800:]}\n{r.stderr[-800:]}")
        return -1
    return int(m.group(1))


def run_lane(bundle: str, patterns: List[str], langs: List[str], kv: int,
             report: Path, logfile: Path) -> Tuple[int, Optional[float], str]:
    cmd = [sys.executable, "localization/localize.py", "--lane", "evaluate",
           "--max-keys", str(kv + 64), "--report", str(report)]
    for p in patterns:
        cmd += ["--keys", p]
    for l in langs:
        cmd += ["--lang", l]
    with open(logfile, "a") as fh:
        fh.write(f"\n===== {dt.datetime.now(dt.timezone.utc).isoformat()} {' '.join(cmd)}\n")
        fh.flush()
        proc = subprocess.run(cmd, cwd=ROOT, env=lane_env(bundle), text=True,
                              stdout=fh, stderr=subprocess.STDOUT)
    text = logfile.read_text()
    tail = text[text.rfind("====="):]
    spends = SPEND_RE.findall(tail)
    spend = float(spends[-1]) if spends else None
    return proc.returncode, spend, tail


def retry_langs(report: dict, tail: str) -> List[str]:
    """Languages worth re-running: a provider outage is not a verdict.

    Two signatures. (1) The reviewer itself was unreachable or unparseable, so
    the lane marked every key UNREVIEWED (critical/accuracy with that note) and
    nothing could be repaired. (2) A repair rung died mid-run ("[repair] xx:
    model failed: openrouter: ...402..."), so real findings were left
    "rejected" only because the ladder was down, not because every rung tried
    and failed. Both are transient; genuine judge rejections are not retried."""
    bad = set()
    for lang, d in report.items():
        keys = d.get("keys", 0)
        held = set(d.get("rejected_unrepaired") or {}) | set(d.get("unresolved") or {})
        if not held:
            continue
        unreviewed = sum(
            1 for k, errs in (d.get("findings") or {}).items()
            if any(str(e.get("note", "")).startswith(("reviewer unreachable", "review reply unparseable",
                                                       "no valid review")) for e in errs))
        if keys and unreviewed >= max(1, keys // 2):
            bad.add(lang)
    for m in re.finditer(r"^\[(?:repair|evaluate)\] (\w+): .*?(?:failed: |unreachable)", tail, re.M):
        lang = m.group(1)
        d = report.get(lang) or {}
        if (d.get("rejected_unrepaired") or d.get("unresolved")):
            bad.add(lang)
    return sorted(bad)


def guard_and_fix(bundle: str) -> Dict[str, List[str]]:
    """Post-write parity guard per changed file: JSON parses, keyset and leaf
    types match en, runtime placeholders survive. A violating key is reverted
    to HEAD's value (the rest of the file's accepted repairs are kept)."""
    bdir = BUNDLES[bundle]
    en = json.loads((bdir / "en.json").read_text())
    en_flat = flat(en)
    changed = sh(["git", "diff", "--name-only", "--", str(bdir.relative_to(ROOT))]).stdout.split()
    reverted: Dict[str, List[str]] = {}
    for rel in changed:
        path = ROOT / rel
        if path.name == "en.json":
            continue
        try:
            cur = json.loads(path.read_text())
        except json.JSONDecodeError:
            sh(["git", "checkout", "--", rel])
            reverted[rel] = ["<unparseable JSON: whole file reverted>"]
            continue
        head = json.loads(sh(["git", "show", f"HEAD:{rel}"]).stdout)
        cur_flat, head_flat = flat(cur), flat(head)
        bad: List[str] = []
        for k, ev in en_flat.items():
            if k not in cur_flat:
                continue  # not yet translated: the translate lane's job, not a violation
            cv = cur_flat[k]
            if type(cv) is not type(ev):
                bad.append(k); continue
            if isinstance(ev, str):
                if sorted(PLACEHOLDER.findall(ev)) != sorted(PLACEHOLDER.findall(cv)):
                    bad.append(k); continue
                if not cv.strip():
                    bad.append(k); continue
        extra = [k for k in cur_flat if k not in en_flat]
        for k in bad:
            if k in head_flat:
                set_path(cur, k, head_flat[k])
        for k in extra:
            parts = k.split("."); node = cur
            for p in parts[:-1]:
                node = node[p]
            node.pop(parts[-1], None)
        if bad or extra:
            path.write_text(json.dumps(cur, ensure_ascii=False, indent=2) + "\n")
            reverted[rel] = bad + [f"<extra key {k}>" for k in extra]
    return reverted


def commit_batch(name: str, bundle: str, stats: dict, push: bool) -> Optional[str]:
    rel = str(BUNDLES[bundle].relative_to(ROOT))
    sh(["git", "add", "--", rel])
    if not sh(["git", "diff", "--cached", "--quiet"]).returncode:
        return None
    langs = stats["langs"]
    msg = (f"i18n(sweep): {name} reviewed x{langs}; {stats['repaired']} repaired, "
           f"{stats['held']} held for judgment\n\n"
           f"Evaluate lane over {', '.join(stats['patterns'])} ({stats['kv']} key-values). "
           f"Cross-family MQM review; repairs up the full ladder; rejected values "
           f"withheld for adjudication (localization/hard-cases). Spend ~${stats['spend']:.2f}.\n\n"
           + TRAILER)
    r = sh(["git", "commit", "-q", "-m", msg])
    if r.returncode:
        log(f"commit failed: {r.stderr[-400:]}")
        return None
    sha = sh(["git", "rev-parse", "--short", "HEAD"]).stdout.strip()
    if push:
        for attempt in range(3):
            p = sh(["git", "push", "-q", "origin", "HEAD:main"])
            if not p.returncode:
                break
            time.sleep(30)
        else:
            log(f"push failed three times; commit {sha} is local only")
    return sha


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--budget", type=float, default=50.0, help="USD; pause when reached")
    ap.add_argument("--start-at", default=None)
    ap.add_argument("--only", action="append", default=[])
    ap.add_argument("--attempts", type=int, default=3)
    ap.add_argument("--backoff", type=int, default=180)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-push", action="store_true")
    ap.add_argument("--langs", default="", help="comma list: restrict every batch to these languages (e.g. yo)")
    args = ap.parse_args()

    OUT.mkdir(exist_ok=True)
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    ledger_path = OUT / f"sweep-{stamp}-ledger.json"
    logfile = OUT / f"sweep-{stamp}-lane.log"
    ledger: dict = {"stamp": stamp, "budget": args.budget, "batches": [], "spend": 0.0,
                    "status": "running"}
    hard: List[dict] = []

    plan = PLAN
    if args.only:
        plan = [b for b in plan if b[0] in args.only]
    only_langs = [l for l in args.langs.split(",") if l]
    if args.start_at:
        idx = [b[0] for b in plan].index(args.start_at)
        plan = plan[idx:]

    # Refuse to sweep over uncommitted work in the files THIS run will write:
    # every locale file when unrestricted, only the named languages' files
    # when --langs is given (another lane may be banking other languages).
    dirty_paths = ["src/i18n"] if not only_langs else [
        f"src/i18n/{b}/{l}.json" for b in ("dictionaries", "chrome") for l in only_langs]
    if sh(["git", "diff", "--quiet", "--"] + dirty_paths).returncode:
        log(f"uncommitted changes in {dirty_paths}; refusing to sweep over them")
        return 4

    spent = 0.0
    kv_done = 0
    status = "complete"
    for name, bundle, patterns in plan:
        kv = selection_size(bundle, patterns, only_langs)
        if kv < 0:
            status = "error_sizing"; break
        if kv == 0:
            log(f"{name}: nothing selected, skipping"); continue
        # Budget: pause before a batch that would overshoot. Projection uses
        # the running cost per key-value; the first batch has no history.
        if spent >= args.budget:
            status = "budget_pause"; break
        if kv_done and spent + (spent / kv_done) * kv > args.budget * 1.15:
            log(f"{name}: projected ${spent + (spent / kv_done) * kv:.2f} would overshoot the budget; pausing")
            status = "budget_pause"; break
        log(f"{name}: {kv} key-values over {patterns} (spent so far ${spent:.2f})")
        if args.dry_run:
            continue

        langs: List[str] = list(only_langs)
        batch_spend = 0.0
        merged: dict = {}
        rc = 1
        for attempt in range(1, args.attempts + 1):
            report = OUT / f"sweep-{stamp}-{name}-a{attempt}.json"
            rc, spend, tail = run_lane(bundle, patterns, langs, kv if not langs else kv, report, logfile)
            if spend is None:
                log(f"{name}: attempt {attempt} produced no spend line; stopping the sweep for inspection")
                ledger["batches"].append({"name": name, "attempt": attempt, "error": "no_spend_line",
                                          "tail": tail[-1500:]})
                status = "error_no_spend"; break
            batch_spend += spend
            spent += spend
            try:
                rep = json.loads(report.read_text()) if report.exists() else {}
            except json.JSONDecodeError:
                rep = {}
            merged.update(rep)
            bad = retry_langs(rep, tail)
            errs = len(re.findall(r"openrouter: |HTTP Error|Traceback", tail))
            log(f"{name}: attempt {attempt} rc={rc} spend ${spend:.2f} (batch ${batch_spend:.2f}, total ${spent:.2f}); "
                f"{len(bad)} language(s) hit provider outages; {errs} error line(s)")
            if not bad:
                break
            if attempt < args.attempts:
                langs = bad
                time.sleep(args.backoff)
        if status.startswith("error"):
            break

        reverted = guard_and_fix(bundle)
        if reverted:
            log(f"{name}: guard reverted {sum(len(v) for v in reverted.values())} value(s) in {len(reverted)} file(s)")

        repaired = sum(len(d.get("repaired", [])) for d in merged.values())
        held = 0
        for lang, d in sorted(merged.items()):
            for k, why in (d.get("rejected_unrepaired") or {}).items():
                held += 1
                hard.append({"batch": name, "bundle": bundle, "lang": lang, "key": k,
                             "kind": "judge_rejected", "why": why,
                             "findings": (d.get("findings") or {}).get(k, [])})
            for k, why in (d.get("unresolved") or {}).items():
                held += 1
                hard.append({"batch": name, "bundle": bundle, "lang": lang, "key": k,
                             "kind": "ladder_exhausted", "why": why})
        stats = {"name": name, "bundle": bundle, "patterns": patterns, "kv": kv,
                 "langs": len(merged), "repaired": repaired, "held": held,
                 "spend": round(batch_spend, 4), "cumulative": round(spent, 4),
                 "mean_score": round(sum(d.get("mean_score", 100) for d in merged.values()) / max(len(merged), 1), 1),
                 "worst": {l: d.get("worst_score") for l, d in merged.items() if d.get("worst_score", 100) < 90},
                 "flag_rate": round(100 * sum(d.get("flagged", 0) for d in merged.values()) / max(kv, 1), 1),
                 "outage_retries": len(langs) if langs else 0,
                 "guard_reverted": reverted}
        sha = commit_batch(name, bundle, stats, push=not args.no_push)
        stats["commit"] = sha
        kv_done += kv
        ledger["batches"].append(stats)
        ledger["spend"] = round(spent, 4)
        ledger_path.write_text(json.dumps(ledger, indent=2, ensure_ascii=False))
        log(f"{name}: DONE repaired={repaired} held={held} flag_rate={stats['flag_rate']}% "
            f"mean={stats['mean_score']} commit={sha} cumulative=${spent:.2f}")

    if not args.dry_run and status == "complete" and spent >= args.budget:
        status = "budget_pause"
    ledger["status"] = status
    ledger["spend"] = round(spent, 4)
    ledger_path.write_text(json.dumps(ledger, indent=2, ensure_ascii=False))
    if hard:
        hard_path = OUT / f"sweep-{stamp}-hard-cases.json"
        hard_path.write_text(json.dumps({
            "instructions": ("Hard cases for Claude's judgment. Preferred fix: clarify the ENGLISH "
                             "source (less ambiguous, less idiomatic) and re-run the lane. Second: "
                             "hand-translate with real research. Never bypass the ladder or soften "
                             "the reviewer."),
            "cases": hard}, indent=2, ensure_ascii=False))
        log(f"{len(hard)} hard case(s) filed at {hard_path.name}")
    log(f"SWEEP END status={status} spend=${spent:.2f} batches={len(ledger['batches'])} ledger={ledger_path.name}")
    return 0 if status in ("complete", "budget_pause") else 1


if __name__ == "__main__":
    sys.exit(main())
