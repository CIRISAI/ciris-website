// Which routes already wear the new look (day/night sky banner, no top nav).
//
// One list, two readers: the migration banner hides on them (they are not the
// old look any more), and it is the checklist for the revamp as it moves page
// by page. Paths are locale-free, exactly as delocalizePath returns them.

export const NEW_LOOK_ROUTES: ReadonlySet<string> = new Set([
  "/",
  "/install",
]);
