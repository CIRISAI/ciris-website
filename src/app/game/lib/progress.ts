// Player progress — solved cases persisted to localStorage. No accounts,
// no server. The progress is the player's own record of which briefs they
// have filed. Per the cozy-mystery design: there is no "you lost", only
// "you filed a brief and learned what really happened."

const KEY = "ciris-game-solved-cases-v1";

export function loadSolved(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

export function markSolved(caseId: string): Set<string> {
  const current = loadSolved();
  current.add(caseId);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(Array.from(current)));
    } catch {
      /* quota or sandbox; harmless */
    }
  }
  return current;
}

export function clearSolved(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* harmless */
  }
}
