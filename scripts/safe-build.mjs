// Memory-safe local build wrapper.
//
// The site build peaks ~4.4 GB RSS. The dev machine is often already saturated
// by stray rust-analyzer / java / docker processes, with swap full — and when a
// build starts into that, the kernel OOM-killer fires and takes down whatever it
// picks ("killed the system"). This wrapper refuses to start a build when memory
// headroom is too low, prints the current hogs, and logs a memory timeline so a
// crash is diagnosable. CI/Cloudflare builds skip the gate (they have headroom).
//
//   npm run build:safe          # local: preflight + logged build
//   MIN_BUILD_MEM_MB=10000 npm run build:safe   # raise the bar

import { spawn, execSync } from "node:child_process";
import { readFileSync, mkdirSync, createWriteStream } from "node:fs";

const MIN_AVAIL_MB = Number(process.env.MIN_BUILD_MEM_MB || 8000);
const IS_CI = !!(process.env.CI || process.env.CF_PAGES);

function memAvailableMB() {
  try {
    const m = readFileSync("/proc/meminfo", "utf8");
    const a = /MemAvailable:\s+(\d+) kB/.exec(m);
    return a ? Math.round(Number(a[1]) / 1024) : null;
  } catch {
    return null;
  }
}
function topConsumers() {
  try {
    return execSync("ps -eo rss,comm --sort=-rss | head -7", { encoding: "utf8" })
      .trim()
      .split("\n")
      .map((l) => {
        const m = l.trim().match(/^(\d+)\s+(.*)$/);
        return m ? `   ${(Number(m[1]) / 1024).toFixed(0).padStart(6)} MB  ${m[2]}` : "   " + l;
      })
      .join("\n");
  } catch {
    return "   (ps unavailable)";
  }
}

if (!IS_CI) {
  const avail = memAvailableMB();
  if (avail !== null && avail < MIN_AVAIL_MB) {
    console.error(`\n[safe-build] ✗ ABORT — only ${avail} MB available, need ~${MIN_AVAIL_MB} MB.`);
    console.error(`[safe-build] The build peaks ~4.4 GB; starting now risks an OOM-kill that takes`);
    console.error(`[safe-build] down the machine (past "killed the system" was the OOM-killer — see`);
    console.error(`[safe-build] dmesg | grep -i oom). Free RAM first. Biggest consumers right now:`);
    console.error(topConsumers());
    console.error(`[safe-build] e.g. close extra editors, or: pkill -f rust-analyzer\n`);
    process.exit(2);
  }
  console.log(`[safe-build] preflight ok — ${avail ?? "?"} MB available (need ${MIN_AVAIL_MB}).`);
}

mkdirSync(".build-logs", { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const logPath = `.build-logs/build-${stamp}.log`;
const log = createWriteStream(logPath);
console.log(`[safe-build] building, memory timeline -> ${logPath}`);

let lowWater = Infinity;
const sampler = setInterval(() => {
  const a = memAvailableMB();
  if (a !== null) {
    lowWater = Math.min(lowWater, a);
    log.write(`[mem] ${new Date().toISOString()} available=${a}MB\n`);
    if (a < 1500) console.warn(`[safe-build] ⚠ available memory low: ${a} MB`);
  }
}, 5000);

const t0 = Date.now();
// run the real build (incl. its NODE_OPTIONS heap + postbuild) via npm
const child = spawn("npm", ["run", "build"], { stdio: ["inherit", "pipe", "pipe"], env: process.env });
child.stdout.on("data", (d) => { process.stdout.write(d); log.write(d); });
child.stderr.on("data", (d) => { process.stderr.write(d); log.write(d); });
child.on("exit", (code) => {
  clearInterval(sampler);
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const lw = Number.isFinite(lowWater) ? `${lowWater} MB` : "n/a";
  const line = `[safe-build] exit=${code} duration=${secs}s mem-low-water=${lw}`;
  log.write("\n" + line + "\n");
  log.end();
  console.log(line);
  if (code !== 0) {
    console.error(`[safe-build] if the process was killed with no error, it was almost certainly`);
    console.error(`[safe-build] OOM — confirm with:  npm run build:diag`);
  }
  process.exit(code ?? 1);
});
