#!/usr/bin/env python3
"""Website shim for the client's localization gate surface.

localize.py (copied verbatim from CIRISAI/CIRISClient) imports
`check_localization_sync as guard` and uses exactly five symbols:
CANONICAL_BUNDLE, MIRROR_BUNDLES, flat_values, manifest_languages,
_PLACEHOLDER. The client resolves those against its four byte-identical
app bundles + a manifest.json; the website has two independent single-copy
trees instead, so this shim supplies the same surface with website
semantics (issue #29's "lift the mirror list into config"):

  LOCALIZE_BUNDLE=dictionaries (default) -> src/i18n/dictionaries
  LOCALIZE_BUNDLE=chrome                 -> src/i18n/chrome

One bundle per run, no mirrors; run the lane twice to cover both trees.
Languages are derived from the {code}.json files on disk rather than a
manifest. `flat_values` matches the client's semantics, including treating
lists as single leaf values — array contents (lobby.doors, stats, parts)
are therefore OUTSIDE the pipeline's addressable surface for now, same as
the client's own limitation, and stay with the manual pass.
"""
import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List

_BUNDLES = {
    "dictionaries": "src/i18n/dictionaries",
    "chrome": "src/i18n/chrome",
}

_choice = os.environ.get("LOCALIZE_BUNDLE", "dictionaries")
if _choice not in _BUNDLES:
    raise SystemExit(
        f"LOCALIZE_BUNDLE must be one of {sorted(_BUNDLES)} (got {_choice!r})"
    )

CANONICAL_BUNDLE = _BUNDLES[_choice]
#: The website has no mirrors: each bundle is the single copy of itself.
MIRROR_BUNDLES = (CANONICAL_BUNDLE,)

#: Same convention as the client: the _meta root is machine state, not copy.
_IGNORED_ROOTS = ("_meta",)

#: Runtime interpolation tokens that must survive translation verbatim
#: (named braces like {langName}, template ${...}, printf %s/%d).
_PLACEHOLDER = re.compile(r"\$\{[^}]*\}|\{[A-Za-z0-9_]+\}|%[0-9]*\$?[sd]")


def flat_values(obj: dict, prefix: str = "", top: bool = True) -> Dict[str, Any]:
    """Map every leaf of a localization dict to its dotted address -> value.

    Faithful to the client's semantics: dicts recurse, everything else
    (strings AND lists) is a leaf, and ignored roots are skipped at the top.
    """
    out: Dict[str, Any] = {}
    for k, v in obj.items():
        if top and k in _IGNORED_ROOTS:
            continue
        key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out.update(flat_values(v, key, False))
        else:
            out[key] = v
    return out


def manifest_languages(bundle: Path) -> List[str]:
    """The client reads manifest.json; the website's language set is the set
    of {code}.json files actually present in the bundle."""
    bundle = Path(bundle)
    return sorted(p.stem for p in bundle.glob("*.json") if p.stem != "manifest")


def load_json(path: Path) -> Any:
    return json.loads(Path(path).read_text(encoding="utf-8"))
