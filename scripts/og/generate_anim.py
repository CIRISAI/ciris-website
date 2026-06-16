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
FPS = 12                 # frames per second
N_FRAMES = int(LOOP_SEC * FPS)

# Capture-time animation. The cards' on-page motion runs on slow, decorative
# periods (aurora 10s, spin 26s, ...) that show almost nothing across a short
# loop, so for the SHARE IMAGE we re-time every animation to complete a whole
# number of cycles within LOOP_SEC (= seamless loop, no seam jump) and pump the
# amplitudes up so the motion actually reads at thumbnail size. Every period
# below divides 3s (1.5 or 3.0). SMIL durations are normalized to match in
# __ogNormalizeSmil so the traveling packets/dashes loop seamlessly too.
ANIM_CSS = """
@keyframes ogBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes ogAurora{0%{transform:translate(0,0) rotate(0deg) scale(1)}25%{transform:translate(-78px,44px) rotate(11deg) scale(1.16)}50%{transform:translate(46px,-34px) rotate(-9deg) scale(0.88)}75%{transform:translate(64px,32px) rotate(7deg) scale(1.12)}100%{transform:translate(0,0) rotate(0deg) scale(1)}}
@keyframes ogPulse{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes ogFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
@keyframes ogSheen{0%{transform:translateX(-65%) skewX(-18deg);opacity:0}35%{opacity:.7}50%{opacity:.75}65%{opacity:.7}100%{transform:translateX(150%) skewX(-18deg);opacity:0}}
@keyframes ogSpin{to{transform:rotate(360deg)}}
@keyframes ogTwinkle{0%,100%{opacity:.2}50%{opacity:1}}
body.motion .og-breathe{animation:ogBreathe 1.5s ease-in-out infinite;will-change:transform;transform-box:fill-box;transform-origin:center;}
/* aurora: brighter + more saturated so the drift actually reads (capture only) */
body.motion .og-aurora{animation:ogAurora 3s ease-in-out infinite;transform-origin:60% 40%;will-change:transform;filter:blur(8px) brightness(1.8) saturate(1.35) !important;}
body.motion .og-rim{animation:ogPulse 1.5s ease-in-out infinite;}
body.motion .og-radiate{animation:ogPulse 1.5s ease-in-out infinite;}
/* sheen: the shipped art paints it at ~8% so a full sweep is invisible; for the
   share image repaint it as a bold light bar that clearly crosses every card */
body.motion .og-sheen{animation:ogSheen 3s ease-in-out infinite;mix-blend-mode:screen;
  background:linear-gradient(100deg,transparent 16%,rgba(255,255,255,0.14) 42%,rgba(150,212,255,0.46) 52%,rgba(255,255,255,0.14) 62%,transparent 84%) !important;
  mask-image:radial-gradient(140% 105% at 60% 40%,#000 0%,transparent 84%) !important;}
body.motion .og-spin{animation:ogSpin 3s linear infinite;transform-box:fill-box;transform-origin:center;}
body.motion .og-twinkle{animation:ogTwinkle 1.5s ease-in-out infinite;}
"""

SEEK_JS = r"""
window.__ogReady = false;
// Re-time SMIL (traveling packets, dashed-flow strokes) so each completes a
// whole number of cycles per LOOP_SEC and loops seamlessly with the CSS.
window.__ogNormalizeSmil = function(loop){
  document.querySelectorAll('animateMotion').forEach(function(a){ a.setAttribute('dur', (loop/2)+'s'); });
  document.querySelectorAll('animate').forEach(function(a){
    if(a.getAttribute('attributeName')==='stroke-dashoffset') a.setAttribute('dur', (loop/2)+'s');
  });
  document.querySelectorAll('svg').forEach(function(s){ try{ s.setCurrentTime(0); }catch(e){} });
};
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
        # re-time SMIL to the loop now that the card's SVG is in the DOM
        cdp.evaluate(f"window.__ogNormalizeSmil({LOOP_SEC})")
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
