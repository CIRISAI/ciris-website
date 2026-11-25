#!/usr/bin/env python3
"""Render the social-preview cards (public/og): the homepage's ocean with each
page's title over it, one still JPEG per page and locale.

  python3 scripts/og/generate.py [--locales en,ar] [--pages /,/web4]

Needs Chrome, node_modules (tsc) and `pip install playwright pillow`. Titles and
kickers come from the dictionaries and src/lib/marketing-og.ts, so a card never
carries words the page does not. cards.json maps a page to its art; a page with
"en": true has no localized twin. Fonts load from Google Fonts.
"""
from __future__ import annotations

import argparse
import functools
import http.server
import io
import json
import re
import subprocess
import tempfile
import threading
import zlib
from pathlib import Path
from urllib.parse import urlencode

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
SITE = HERE.parent.parent
OUT = SITE / "public" / "og"
DICTS = SITE / "src" / "i18n" / "dictionaries"
CARDS = json.loads((HERE / "cards.json").read_text())
RTL = {"ar", "fa", "ur"}
# Locales whose script, or whose accents, Instrument Sans does not carry.
FAMILY = {
    "am": "Noto Sans Ethiopic", "ar": "Noto Sans Arabic", "fa": "Noto Sans Arabic", "ur": "Noto Sans Arabic",
    "bn": "Noto Sans Bengali", "hi": "Noto Sans Devanagari", "mr": "Noto Sans Devanagari", "ja": "Noto Sans JP",
    "ko": "Noto Sans KR", "my": "Noto Sans Myanmar", "pa": "Noto Sans Gurmukhi", "ta": "Noto Sans Tamil",
    "te": "Noto Sans Telugu", "th": "Noto Sans Thai", "zh": "Noto Sans SC", "ru": "Noto Sans", "uk": "Noto Sans",
    "vi": "Noto Sans", "yo": "Noto Sans", "ha": "Noto Sans",
}
LATIN_LIKE = {"ru", "uk", "vi", "yo", "ha"}


def compile_ts(tmp: Path) -> dict:
    src = SITE / "src"
    ocean = [str(p) for p in (src / "app/components/ocean").glob("*.ts")]
    subprocess.run(["npx", "tsc", *ocean, "--outDir", str(tmp / "ocean"), "--target", "es2022", "--module", "esnext",
                    "--moduleResolution", "bundler", "--lib", "es2022,dom", "--skipLibCheck"], cwd=SITE, check=True)
    for f in (tmp / "ocean").glob("*.js"):
        f.write_text(re.sub(r'from "(\./\w+)"', r'from "\1.js"', f.read_text()))
    subprocess.run(["npx", "tsc", str(src / "lib/marketing-og.ts"), "--outDir", str(tmp / "lib"), "--target", "es2022",
                    "--module", "esnext", "--moduleResolution", "bundler", "--skipLibCheck"], cwd=SITE, check=True)
    (tmp / "package.json").write_text('{"type":"module"}')
    mog = next((tmp / "lib").rglob("marketing-og.js"))
    out = subprocess.run(["node", "-e", f"import({json.dumps(str(mog))}).then(m=>console.log(JSON.stringify(m.MARKETING_OG)))"],
                         capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def at(d: dict, path: str):
    for p in path.split("."):
        d = d.get(p) if isinstance(d, dict) else None
    return d if isinstance(d, str) and d.strip() else None


def trim(title: str) -> str:
    title = re.split(r"\s+\|\s+", title)[0]
    return re.sub(r"[.。।။።؟]?\s*$", lambda m: m.group(0).strip(), title).strip()


def slug(page: str, card: dict) -> str:
    return card.get("slug") or "og" + page.replace("/", "-")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--locales")
    ap.add_argument("--pages")
    a = ap.parse_args()
    locales = a.locales.split(",") if a.locales else ["en"] + sorted(p.stem for p in DICTS.glob("*.json") if p.stem != "en")
    pages = a.pages.split(",") if a.pages else list(CARDS)
    geo = (SITE / "src/app/components/ocean/signetGeometry.ts").read_text()
    mark = " ".join(re.findall(r'"([Mm][^"]+)"', geo))  # outline, then its openings

    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        mog = compile_ts(tmp)
        for f in ("art.html", "card.html"):
            (tmp / f).write_text((HERE / f).read_text())
        handler = functools.partial(type("H", (http.server.SimpleHTTPRequestHandler,), {"log_message": lambda *_: None}), directory=str(tmp))
        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{server.server_port}"
        made = skipped = 0
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="chrome")
            artist = browser.new_page(viewport={"width": 1200, "height": 630})
            known: set[str] = set()

            def art(**k) -> str:
                name = "art-" + "-".join(str(v) for v in k.values()) + ".jpg"
                if name not in known:
                    artist.goto(f"{base}/art.html?{urlencode(k)}")
                    artist.wait_for_function("document.title === 'done'", timeout=60000)
                    artist.screenshot(path=str(tmp / name), type="jpeg", quality=96)
                    known.add(name)
                return name

            for loc in locales:
                d = json.loads((DICTS / f"{loc}.json").read_text())
                page = browser.new_page(viewport={"width": 1200, "height": 630})
                page.goto(f"{base}/card.html")
                family = FAMILY.get(loc, "")
                for pg in pages:
                    c = CARDS[pg]
                    if c.get("en") and loc != "en":
                        continue
                    title = c.get("text")
                    if title is None:
                        title = at(d, c["title"]) if c.get("title") else (mog.get(pg, {}).get(loc) or {}).get("title")
                    if title is None:
                        skipped += 1
                        print(f"no title: {loc} {pg}")
                        continue
                    group = c.get("group")
                    kicker = at(d, c["kicker"]) if c.get("kicker") else (at(d, f"rd.groups.{group}.label") if group else "")
                    h = zlib.crc32(pg.encode())
                    mode = c.get("mode") or ("signet", "whale", "both")[h % 3]
                    night, rtl = int(bool(c.get("night"))), int(loc in RTL)
                    brand = bool(c.get("brand"))
                    frame = art(mode=mode, seed=c.get("seed", h // 3 % 4), night=night, rtl=rtl, center=int(brand))
                    r = page.evaluate("c => set(c)", {
                        "lang": loc, "rtl": bool(rtl), "script": bool(family) and loc not in LATIN_LIKE, "night": bool(night),
                        "center": brand, "art": frame, "mark": mark, "kicker": kicker or "", "title": trim(title), "family": family,
                        "css": f"https://fonts.googleapis.com/css2?family={family.replace(' ', '+')}:wght@500;600&display=block",
                    })
                    if r["over"]:
                        print(f"title does not fit: {loc} {pg}")
                    dest = (OUT if loc == "en" else OUT / loc) / f"{slug(pg, c)}.jpg"
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    Image.open(io.BytesIO(page.screenshot(type="png"))).convert("RGB").save(dest, quality=84, optimize=True, progressive=True)
                    made += 1
                page.close()
                print(f"{loc}: done", flush=True)
            browser.close()
        print(f"{made} cards, {skipped} without a title")


if __name__ == "__main__":
    main()
