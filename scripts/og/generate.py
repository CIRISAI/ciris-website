#!/usr/bin/env python3
"""Render per-page social-preview (og:image) cards to public/og/[<locale>/]*.jpg.

Model A: text-free 1200x630 brand art with a composited, localized title zone.
Each card is a small React/Babel component under cards/; this script inlines
them into one self-contained page per locale (with that locale's translations,
script direction, and webfont baked in), renders each card at 2x via headless
Chrome, then crops + downscales to an exact 1200x630 JPEG.

English -> public/og/<slug>.jpg        (the default the site links by default)
locale  -> public/og/<locale>/<slug>.jpg

Usage:
    python3 scripts/og/generate.py                  # every locale x every job
    python3 scripts/og/generate.py --locales es,am  # only these locales
    python3 scripts/og/generate.py --slugs og-home  # only these slugs
    python3 scripts/og/generate.py --locales en --slugs og-trust,og-home

Requires google-chrome (headless), Pillow, and network access (React/Babel UMD
and the Geist/Noto webfonts load from CDNs at render time). Translations come
from scripts/og/i18n/<locale>.json ({english source -> localized}); a locale
with no json file renders English text.
"""
import argparse, json, pathlib, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = pathlib.Path(__file__).resolve().parent
CARDS = HERE / "cards"
I18N = HERE / "i18n"
OUT = ROOT / "public" / "og"

SCALE = 2
RENDER_H = 680  # > 630: Chrome clips a few px at exactly 630; crop the top later

# Per-locale rendering hints. latin=True keeps the mono/uppercase/tracked
# eyebrow treatment (Geist); others use the Noto sans stack with normal tracking.
# `noto` is the Google Fonts family to also load so the script has glyphs.
LOCALES = {
    "en": {"latin": True,  "rtl": False, "noto": None},
    "es": {"latin": True,  "rtl": False, "noto": None},
    "ha": {"latin": True,  "rtl": False, "noto": None},
    "yo": {"latin": True,  "rtl": False, "noto": "Noto Sans"},
    "sw": {"latin": True,  "rtl": False, "noto": None},
    "vi": {"latin": True,  "rtl": False, "noto": "Noto Sans"},
    "id": {"latin": True,  "rtl": False, "noto": None},
    "tr": {"latin": True,  "rtl": False, "noto": None},
    "de": {"latin": True,  "rtl": False, "noto": None},
    "fr": {"latin": True,  "rtl": False, "noto": None},
    "it": {"latin": True,  "rtl": False, "noto": None},
    "pt": {"latin": True,  "rtl": False, "noto": None},
    "uk": {"latin": False, "rtl": False, "noto": "Noto Sans"},
    "ru": {"latin": False, "rtl": False, "noto": "Noto Sans"},
    "am": {"latin": False, "rtl": False, "noto": "Noto Sans Ethiopic"},
    "ta": {"latin": False, "rtl": False, "noto": "Noto Sans Tamil"},
    "te": {"latin": False, "rtl": False, "noto": "Noto Sans Telugu"},
    "mr": {"latin": False, "rtl": False, "noto": "Noto Sans Devanagari"},
    "hi": {"latin": False, "rtl": False, "noto": "Noto Sans Devanagari"},
    "pa": {"latin": False, "rtl": False, "noto": "Noto Sans Gurmukhi"},
    "bn": {"latin": False, "rtl": False, "noto": "Noto Sans Bengali"},
    "my": {"latin": False, "rtl": False, "noto": "Noto Sans Myanmar"},
    "th": {"latin": False, "rtl": False, "noto": "Noto Sans Thai"},
    "ko": {"latin": False, "rtl": False, "noto": "Noto Sans KR"},
    "ja": {"latin": False, "rtl": False, "noto": "Noto Sans JP"},
    "zh": {"latin": False, "rtl": False, "noto": "Noto Sans SC"},
    "ar": {"latin": False, "rtl": True,  "noto": "Noto Sans Arabic"},
    "fa": {"latin": False, "rtl": True,  "noto": "Noto Sans Arabic"},
    "ur": {"latin": False, "rtl": True,  "noto": "Noto Sans Arabic"},
}


def font_links(noto):
    links = [
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">',
    ]
    if noto:
        fam = noto.replace(" ", "+")
        links.append(
            f'<link href="https://fonts.googleapis.com/css2?family={fam}:wght@400;500;600;700&display=swap" rel="stylesheet">'
        )
    return "\n".join(links)


def build_page(locale, tr):
    meta = LOCALES[locale]
    rd = lambda n: (CARDS / n).read_text()
    inject = (
        "window.OG_TR=" + json.dumps(tr, ensure_ascii=False) + ";"
        "window.OG_DIR=" + json.dumps("rtl" if meta["rtl"] else "ltr") + ";"
        "window.OG_LATIN=" + ("true" if meta["latin"] else "false") + ";"
    )
    return f"""<!DOCTYPE html><html lang="{locale}"><head><meta charset="UTF-8">
{font_links(meta["noto"])}
<style>html,body{{margin:0;padding:0;background:#090C10;}}#root{{width:1200px;height:630px;}}</style></head>
<body><div id="root"></div>
<script>{inject}</script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<script>{rd('mark.js')}</script>
<script type="text/babel" data-presets="react">{rd('shell.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-a.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-b.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-c.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-d.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-accord.jsx')}</script>
<script type="text/babel" data-presets="react">{rd('cards-default.jsx')}</script>
<script type="text/babel" data-presets="react">
  (function(){{
    var p = new URLSearchParams(location.search);
    var name = p.get('card') || 'OGHome';
    var book = p.get('book'); var accent = p.get('accent');
    function go(){{
      var Comp = window[name];
      if (!Comp) {{ document.title='ERR-NOCOMP'; return; }}
      var props = {{}};
      if (name === 'OGAccord') {{ if (book) props.book = book; if (accent) props.accent = window.CIRIS[accent] || accent; }}
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Comp, props));
      // The card is the og:image poster: keep CSS motion OFF (no body.motion)
      // and freeze SMIL to a fixed frame so the still is deterministic and
      // not mid-clump. Then signal ready for the screenshot.
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(function(){{ setTimeout(function(){{
        document.querySelectorAll('svg').forEach(function(s){{ try {{ s.setCurrentTime(1.2); s.pauseAnimations(); }} catch(e){{}} }});
        document.title='READY';
      }}, 500); }});
    }}
    var t=setInterval(function(){{ if(window.Card && window[name]){{ clearInterval(t); go(); }} }}, 40);
    setTimeout(function(){{ clearInterval(t); go(); }}, 6000);
  }})();
</script>
</body></html>"""


def jobs():
    for line in (HERE / "jobs.txt").read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        slug, card, book, accent = (line.split("|") + ["", "", ""])[:4]
        yield slug, card, book, accent


def render_locale(locale, slugs, Image):
    tr = {}
    f = I18N / f"{locale}.json"
    if f.exists():
        tr = json.loads(f.read_text())
    elif locale != "en":
        print(f"  ! no i18n/{locale}.json — rendering English text")
    dest_dir = OUT if locale == "en" else OUT / locale
    dest_dir.mkdir(parents=True, exist_ok=True)

    work = tempfile.mkdtemp(prefix=f"og_{locale}_")
    page = pathlib.Path(work) / "render.html"
    page.write_text(build_page(locale, tr))
    n = 0
    for slug, card, book, accent in jobs():
        if slugs and slug not in slugs:
            continue
        url = f"file://{page}?card={card}"
        if book:
            url += "&book=" + book.replace(" ", "%20")
        if accent:
            url += "&accent=" + accent
        raw = pathlib.Path(work) / f"{slug}.png"
        subprocess.run([
            "google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
            "--hide-scrollbars", f"--force-device-scale-factor={SCALE}",
            f"--window-size=1200,{RENDER_H}", "--virtual-time-budget=9000",
            f"--screenshot={raw}", url,
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        im = Image.open(raw).convert("RGB")
        im = im.crop((0, 0, 1200 * SCALE, 630 * SCALE)).resize((1200, 630), Image.LANCZOS)
        # JPEG q90: ~4x smaller than PNG with no visible loss on these dark flat
        # cards, and supported by every social scraper.
        im.save(dest_dir / f"{slug}.jpg", "JPEG", quality=90, optimize=True, progressive=True)
        n += 1
    shutil.rmtree(work, ignore_errors=True)
    print(f"  {locale}: {n} cards -> {dest_dir.relative_to(ROOT)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--locales", help="comma list (default: all)")
    ap.add_argument("--slugs", help="comma list (default: all)")
    args = ap.parse_args()
    try:
        from PIL import Image
    except ImportError:
        sys.exit("Pillow is required: pip install Pillow")
    if not shutil.which("google-chrome"):
        sys.exit("google-chrome (headless) is required on PATH")

    locales = args.locales.split(",") if args.locales else list(LOCALES)
    slugs = set(args.slugs.split(",")) if args.slugs else None
    for loc in locales:
        if loc not in LOCALES:
            sys.exit(f"unknown locale: {loc}")
        render_locale(loc, slugs, Image)
    print("done ->", OUT)


if __name__ == "__main__":
    main()
