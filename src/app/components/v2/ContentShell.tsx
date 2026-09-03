// The old "dark-blueprint" shell is retired: every page now wears the new look
// through PageShell (which draws the same prose column inside SkyChrome). This
// file survives only as the home of the shared content styles, which ~30 pages
// import as `contentStyles as s`.

import styles from "./content.module.css";

export type ContentAccent = "cyan" | "teal" | "violet" | "rose" | "ok" | "brass";

export { styles as contentStyles };
