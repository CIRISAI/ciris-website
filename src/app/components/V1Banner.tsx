"use client";

// Migration banner: the day/night hero landing is the new surface, and every
// other page is the old look until the revamp reaches it. So the banner shows
// everywhere EXCEPT the landing, and its link is the landing. Locale-aware.

import { usePathname } from "next/navigation";
import { delocalizePath } from "@/i18n/config";

export default function V1Banner() {
  const pathname = usePathname() || "/";
  const { locale, path } = delocalizePath(pathname);
  if (path === "/") return null;

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
