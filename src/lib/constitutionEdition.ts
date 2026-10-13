// Which edition of the constitution this site actually serves.
//
// ciris-website#35: the hosted text and PDF were the rc5 edition while the
// repository was two releases ahead, and the version in the page copy was a
// hard-coded string in 29 dictionaries, so the label could say one thing while
// the download said another. The label now comes from the published file
// itself: whatever `scripts/publish_constitution_edition.py` wrote into
// public/, the page reports. The two cannot disagree.
//
// Read at build time (these pages are server components and the site is a
// static export), and loud on failure: a missing or malformed header means the
// published edition is not what this code thinks it is, and shipping a guess
// would recreate the drift this exists to end.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const EDITION_FILE = "public/ciris_constitution.txt";

function readVersion(): string {
  const head = readFileSync(join(process.cwd(), EDITION_FILE), "utf8").slice(0, 512);
  const m = head.match(/^Version\s+(\S+)/m);
  if (!m) {
    throw new Error(
      `${EDITION_FILE} carries no "Version <x>" line; publish it with ` +
        "scripts/publish_constitution_edition.py <tag>",
    );
  }
  return m[1];
}

/** e.g. "1.0-rc7" — the edition hosted at /ciris_constitution.txt and .pdf. */
export const CONSTITUTION_VERSION = readVersion();

/** Fill the {version} slot the dictionaries leave for it. */
export function withEdition(text: string): string {
  return text.replace(/\{version\}/g, CONSTITUTION_VERSION);
}
