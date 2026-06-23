"use client";

// Migration banner for the not-yet-rebuilt (v1) pages. The home lobby and the
// four path staircases are the new v2 surface; everywhere else still shows the
// old design, so we nudge visitors to the new site while preserving the page's
// URL + SEO. Hides itself on the v2 routes. Locale-aware link target.

import { usePathname } from "next/navigation";
import { delocalizePath } from "@/i18n/config";

// Routes already rebuilt in the v2 dark-blueprint style — the banner hides on
// these. Grows as more kept pages are rebuilt.
const V2_ROUTES = new Set([
  "/",
  "/paths/consumer-ai",
  "/paths/superalignment",
  "/paths/misinformation",
  "/paths/big-tech",
  "/federation",
]);

export default function V1Banner() {
  const pathname = usePathname() || "/";
  const { locale, path } = delocalizePath(pathname);
  if (V2_ROUTES.has(path)) return null;

  const home = locale === "en" ? "/" : `/${locale}`;

  return (
    <a
      href={home}
      style={{
        display: "block",
        textAlign: "center",
        padding: "9px 16px",
        fontSize: "13px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        letterSpacing: "0.02em",
        color: "#e8eaed",
        textDecoration: "none",
        background: "rgba(34, 192, 232, 0.08)",
        borderBottom: "1px solid rgba(34, 192, 232, 0.25)",
      }}
    >
      CIRIS has a new look.{" "}
      <span style={{ color: "#22c0e8", fontWeight: 600 }}>Visit the new site &rarr;</span>
    </a>
  );
}
