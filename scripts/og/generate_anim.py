#!/usr/bin/env python3
"""Render the OG cards as animated share images (GIF + MP4) per locale.

The static poster (generate.py) stays the universal fallback; this adds motion
for the platforms that play it: an animated GIF whose FIRST FRAME is the poster
(Discord/Slack/LinkedIn/Telegram animate it; Facebook/X/WhatsApp show the still),
plus an MP4 for og:video (Telegram, Twitter player, Discord).

Method: one headless-Chrome-per-card driven over CDP (fast, in-process). The
cards' CSS + SMIL timelines are seeked deterministically frame by frame, so the
loop is reproducible. Frames -> ffmpeg -> GIF (palette-optimized) + MP4 (h264).

    python3 scripts/og/generate_anim.py --locales en --slugs og-cewp   # prototype
    python3 scripts/og/generate_anim.py                                # everything

Output: public/og/[<locale>/]<slug>.gif and .mp4 alongside the .jpg posters.
"""
import argparse, base64, json, pathlib, random, shutil, subprocess, sys, tempfile, time, http.client

import websocket  # websocket-client

# reuse the page builder + locale config from the static generator
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import generate as G  # noqa: E402

ROOT = G.ROOT
OUT = G.OUT
SCALE = 1                # deviceScaleFactor for crisp capture
LOOP_SEC = 3.0           # loop length
FPS = 10                 # frames per second
N_FRAMES = int(LOOP_SEC * FPS)

# Animation CSS from the design (body.motion gates the CSS-class loops; SMIL runs
# on its own). Injected so the motion exists to be seeked.
ANIM_CSS = """
@keyframes ogBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes ogAurora{0%{transform:translate(0,0) rotate(0deg) scale(1)}33%{transform:translate(-46px,26px) rotate(8deg) scale(1.08)}66%{transform:translate(28px,-18px) rotate(-5deg) scale(0.96)}100%{transform:translate(0,0) rotate(0deg) scale(1)}}
@keyframes ogPulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes ogFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes ogSheen{0%{transform:translateX(-40%) skewX(-18deg);opacity:0}40%{opacity:.5}60%{opacity:.5}100%{transform:translateX(120%) skewX(-18deg);opacity:0}}
@keyframes ogSpin{to{transform:rotate(360deg)}}
@keyframes ogTwinkle{0%,100%{opacity:.45}50%{opacity:1}}
body.motion .og-breathe{animation:ogBreathe 4.6s ease-in-out infinite;will-change:transform;transform-box:fill-box;transform-origin:center;}
body.motion .og-aurora{animation:ogAurora 10s ease-in-out infinite;transform-origin:60% 40%;will-change:transform;}
body.motion .og-rim{animation:ogPulse 4.2s ease-in-out infinite;}
body.motion .og-radiate{animation:ogPulse 3.4s ease-in-out infinite;}
body.motion .og-sheen{animation:ogSheen 7s ease-in-out infinite;}
body.motion .og-spin{animation:ogSpin 26s linear infinite;transform-box:fill-box;transform-origin:center;}
body.motion .og-twinkle{animation:ogTwinkle 3s ease-in-out infinite;}
"""

SEEK_JS = r"""
window.__ogReady = false;
window.__ogSeek = function(t){
  document.querySelectorAll('svg').forEach(function(s){ try{ s.setCurrentTime(t); s.pauseAnimations(); }catch(e){} });
  (document.getAnimations ? document.getAnimations() : []).forEach(function(a){ try{ a.pause(); a.currentTime = t*1000; }catch(e){} });
};
"""


def build_anim_page(locale, tr):
    """The static page builder, with motion CSS + body.motion + a seek hook."""
    page = G.build_page(locale, tr)
    page = page.replace("<style>", "<style>" + ANIM_CSS, 1)
    page = page.replace("<body>", '<body class="motion">', 1)
    # signal readiness for CDP and expose the seek hook
    page = page.replace("document.title='READY';",
                        "window.__ogReady = true; document.title='READY';")
    page = page.replace("</body></html>", "<script>" + SEEK_JS + "</script></body></html>")
    return page


class CDP:
    def __init__(self, port):
        self.port = port
        self.id = 0
        self.ws = None

    def connect(self):
        for _ in range(50):
            try:
                c = http.client.HTTPConnection("127.0.0.1", self.port, timeout=2)
                c.request("GET", "/json")
                tabs = json.loads(c.getresponse().read())
                page = next(t for t in tabs if t.get("type") == "page")
                self.ws = websocket.create_connection(page["webSocketDebuggerUrl"], max_size=None)
                return
            except Exception:
                time.sleep(0.2)
        raise RuntimeError("could not connect to chrome CDP")

    def cmd(self, method, params=None):
        self.id += 1
        self.ws.send(json.dumps({"id": self.id, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == self.id:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})

    def evaluate(self, expr):
        return self.cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True}).get("result", {}).get("value")

    def close(self):
        try:
            self.ws.close()
        except Exception:
            pass


def render_card_frames(page_path, slug, card, book, accent, frames_dir):
    url = f"file://{page_path}?card={card}"
    if book:
        url += "&book=" + book.replace(" ", "%20")
    if accent:
        url += "&accent=" + accent
    port = random.randint(10000, 60000)
    profile = frames_dir / "_profile"
    proc = subprocess.Popen([
        "google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
        "--hide-scrollbars", f"--remote-debugging-port={port}",
        "--remote-allow-origins=*", f"--user-data-dir={profile}",
        f"--force-device-scale-factor={SCALE}", f"--window-size=1200,640", url,
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    cdp = CDP(port)
    try:
        cdp.connect()
        cdp.cmd("Page.enable")
        # wait until the card mounted + fonts settled
        for _ in range(150):
            if cdp.evaluate("!!(window.__ogReady && window.Card)"):
                break
            time.sleep(0.1)
        clip = {"x": 0, "y": 0, "width": 1200, "height": 630, "scale": 1}
        for i in range(N_FRAMES):
            t = (i / N_FRAMES) * LOOP_SEC
            cdp.evaluate(f"window.__ogSeek({t})")
            res = cdp.cmd("Page.captureScreenshot", {"format": "jpeg", "quality": 90, "clip": clip, "captureBeyondViewport": True})
            (frames_dir / f"f{i:03d}.jpg").write_bytes(base64.b64decode(res["data"]))
    finally:
        cdp.close()
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()


def encode(frames_dir, gif_path, mp4_path):
    fr = str(FPS)
    pat = str(frames_dir / "f%03d.jpg")
    palette = str(frames_dir / "palette.png")
    # GIF: 1200x630 is heavy; downscale to 760w (still 1.91:1) + optimized palette.
    vf_gif = "fps={f},scale=600:-1:flags=lanczos".format(f=fr)
    subprocess.run(["ffmpeg", "-y", "-i", pat, "-vf", vf_gif + ",palettegen=stats_mode=diff",
                    palette], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["ffmpeg", "-y", "-framerate", fr, "-i", pat, "-i", palette,
                    "-lavfi", vf_gif + "[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3",
                    "-loop", "0", str(gif_path)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # MP4: h264, even dims, faststart, loop-friendly.
    subprocess.run(["ffmpeg", "-y", "-framerate", fr, "-i", pat,
                    "-vf", "scale=1200:630:flags=lanczos,format=yuv420p",
                    "-c:v", "libx264", "-profile:v", "high", "-crf", "23", "-pix_fmt", "yuv420p",
                    "-movflags", "+faststart", str(mp4_path)],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--locales")
    ap.add_argument("--slugs")
    args = ap.parse_args()
    if not shutil.which("google-chrome"):
        sys.exit("google-chrome required")
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg required")
    locales = args.locales.split(",") if args.locales else list(G.LOCALES)
    slugs = set(args.slugs.split(",")) if args.slugs else None

    for loc in locales:
        tr = {}
        f = G.I18N / f"{loc}.json"
        if f.exists():
            tr = json.loads(f.read_text())
        dest = OUT if loc == "en" else OUT / loc
        dest.mkdir(parents=True, exist_ok=True)
        work = pathlib.Path(tempfile.mkdtemp(prefix=f"anim_{loc}_"))
        page = work / "render.html"
        page.write_text(build_anim_page(loc, tr))
        n = 0
        for slug, card, book, accent in G.jobs():
            if slugs and slug not in slugs:
                continue
            fdir = work / slug
            fdir.mkdir(exist_ok=True)
            t0 = time.time()
            render_card_frames(page, slug, card, book, accent, fdir)
            encode(fdir, dest / f"{slug}.gif", dest / f"{slug}.mp4")
            gif_kb = (dest / f"{slug}.gif").stat().st_size // 1024
            mp4_kb = (dest / f"{slug}.mp4").stat().st_size // 1024
            print(f"  {loc}/{slug}: gif {gif_kb}KB · mp4 {mp4_kb}KB · {time.time()-t0:.1f}s")
            shutil.rmtree(fdir, ignore_errors=True)
            n += 1
        shutil.rmtree(work, ignore_errors=True)
    print("done")


if __name__ == "__main__":
    main()
