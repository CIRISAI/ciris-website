#!/usr/bin/env python3
"""Publish the hosted constitution editions from a release tag.

ciris-website#35: the hosted text and PDF had drifted two releases behind the
repository because they were copied by hand. This takes them from a tag
instead, records what it published, and refuses anything it cannot verify.

  python3 scripts/publish_constitution_edition.py v1.0-rc7
  python3 scripts/publish_constitution_edition.py v1.0-rc7 --repo ~/CIRISConstitution

The text edition is the constitution/ markdown concatenated in the PDF's
reading order (minus the generated Evidence Register, which has no markdown
source). That procedure was checked against the committed rc3 edition and
reproduces it byte for byte.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ORDER = ["EXECUTIVE_SUMMARY", "FOREWORD", "SCOPE_AND_DISCLAIMERS",
         "part_1_foundation", "part_2_the_grammar", "part_3_the_namespace",
         "part_4_composition_governance", "part_5_transport_substrate",
         "part_6_the_coherence_mathematics", "part_7_lifecycle_stewardship",
         "part_8_appendices", "STEWARDSHIP"]
RULE = "=" * 70


def at(repo: Path, ref: str, path: str) -> bytes:
    out = subprocess.run(["git", "show", f"{ref}:{path}"], cwd=repo,
                         capture_output=True)
    if out.returncode != 0:
        raise SystemExit(f"{ref}:{path} is not in {repo}: {out.stderr.decode().strip()}")
    return out.stdout


def text_edition(repo: Path, ref: str, version: str) -> str:
    head = (
        "THE CIRIS CONSTITUTION (CC)\n"
        f"Version {version} - AGPL-3.0-or-later\n"
        "Canonical source: https://github.com/CIRISAI/CIRISConstitution\n"
        "One document joining the CIRIS Accord (ethics) and the CIRIS Epistemic\n"
        "Grammar (wire format) under a single version line.\n"
        "\n"
        "This plain-text edition concatenates the canonical constitution/ markdown\n"
        "sources in reading order. The PDF edition is at https://ciris.ai/ciris_constitution.pdf\n"
    )
    parts = [head]
    for name in ORDER:
        body = at(repo, ref, f"constitution/{name}.md").decode("utf-8").strip("\n")
        parts.append(f"\n{RULE}\n\n{body}\n")
    parts.append(f"\n{RULE}\n")
    return "".join(parts)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("ref", help="release tag, e.g. v1.0-rc7")
    ap.add_argument("--repo", default=str(Path.home() / "CIRISConstitution"))
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    repo = Path(args.repo).expanduser()

    version = at(repo, args.ref, "VERSION").decode().strip()
    if args.ref.lstrip("v") != version:
        raise SystemExit(f"{args.ref} carries VERSION {version}; refusing a mismatched publish")

    pdf = at(repo, args.ref, "ciris_constitution.pdf")
    versioned = at(repo, args.ref, f"ciris_constitution-{version}.pdf")
    if pdf != versioned:
        raise SystemExit("the fixed-name PDF and the versioned PDF differ at this tag")
    text = text_edition(repo, args.ref, version)
    # rc10 split the edition into volumes (CIRISConstitution#123); the site
    # hosts the wire volume beside the full edition and links the rest.
    wire = at(repo, args.ref, f"volumes/ciris_constitution-{version}-wire.pdf")

    manifest = {
        "version": version,
        "ref": args.ref,
        "commit": subprocess.run(["git", "rev-parse", f"{args.ref}^{{}}"], cwd=repo,
                                 capture_output=True, text=True).stdout.strip(),
        "pdf_sha256": hashlib.sha256(pdf).hexdigest(),
        "pdf_bytes": len(pdf),
        "text_sha256": hashlib.sha256(text.encode("utf-8")).hexdigest(),
        "text_bytes": len(text.encode("utf-8")),
        "wire_sha256": hashlib.sha256(wire).hexdigest(),
        "wire_bytes": len(wire),
    }
    if args.dry_run:
        print(json.dumps(manifest, indent=2))
        return 0

    (SITE / "public/ciris_constitution.pdf").write_bytes(pdf)
    (SITE / "public/ciris_constitution.txt").write_text(text, encoding="utf-8")
    (SITE / "public/ciris_constitution-wire.pdf").write_bytes(wire)
    for name, key in [("ciris_constitution.pdf", "pdf_sha256"),
                      ("ciris_constitution.txt", "text_sha256"),
                      ("ciris_constitution-wire.pdf", "wire_sha256")]:
        if hashlib.sha256((SITE / "public" / name).read_bytes()).hexdigest() != manifest[key]:
            raise SystemExit(f"public/{name} does not match the bytes at {args.ref}")
    (SITE / "public/constitution-edition.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, indent=2))
    print(f"published {version} from {args.ref}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
