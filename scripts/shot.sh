#!/usr/bin/env bash
# Quick headless-Chrome screenshot helper for local dev debugging.
#
# Usage:
#   scripts/shot.sh /grammar/explore          → /tmp/shot.png
#   scripts/shot.sh /grammar/explore foo.png  → /tmp/foo.png
#   PORT=3001 scripts/shot.sh /                → uses localhost:3001
#   WAIT=5 scripts/shot.sh /grammar/explore   → wait 5s for client JS
#
# Requires: google-chrome on $PATH. Captures console errors via a tiny
# extension flag so client-side blowups surface in stderr.

set -euo pipefail

path="${1:?usage: shot.sh <path> [outname.png]}"
out_name="${2:-shot.png}"
port="${PORT:-3000}"
wait_s="${WAIT:-3}"

url="http://localhost:${port}${path}"
out="/tmp/${out_name}"

# Headless screenshot. --virtual-time-budget lets the page settle a bit
# (client effects, dynamic imports, wasm init) before the snapshot.
google-chrome \
  --headless=new \
  --no-sandbox \
  --hide-scrollbars \
  --window-size=1440,1800 \
  --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader \
  --virtual-time-budget=$((wait_s * 1000)) \
  --screenshot="$out" \
  "$url" 2>/dev/null

# Also dump the post-hydration DOM. Chrome's --dump-dom waits for full
# pageload before snapshotting, and with --virtual-time-budget it'll also
# wait for client JS to settle. Combined with --enable-logging=stderr it
# captures console.log output too (look for [explore.diag]).
dom_out="/tmp/${out_name%.png}.html"
log_out="/tmp/${out_name%.png}.log"
google-chrome \
  --headless=new \
  --no-sandbox \
  --enable-logging=stderr --v=0 \
  --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader \
  --virtual-time-budget=$((wait_s * 1000)) \
  --dump-dom \
  "$url" >"$dom_out" 2>"$log_out" || true

echo "screenshot: $out"
echo "console log: $log_out  (grep for ERROR or wasm)"
