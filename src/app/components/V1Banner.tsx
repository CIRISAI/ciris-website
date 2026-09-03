"use client";

// Migration banner: the day/night hero landing is the new surface, and every
// page not yet revamped is the old look. The banner shows on those, and its
// link is the landing. Locale-aware; hidden on every route in NEW_LOOK_ROUTES.

import { usePathname } from "next/navigation";
import { delocalizePath } from "@/i18n/config";
import { NEW_LOOK_ROUTES } from "./newLookRoutes";

export default function V1Banner() {
  const pathname = usePathname() || "/";
  const { locale, path } = delocalizePath(pathname);
  // Gone once a page carries the new chrome: it already links home from the
  // brand, and the banner announced a change the page itself now shows.
  if (NEW_LOOK_ROUTES.has(path)) return null;

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
      CIRIS has a new home page.{" "}
      <span style={{ color: "#22c0e8", fontWeight: 600 }}>See it &rarr;</span>
    </a>
  );
}
