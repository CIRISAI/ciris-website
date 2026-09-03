"use client";
// Day/night for the whole site, in one place.
//
// The landing hero shipped with its own local state; interior pages need the
// same choice, so it lives here: one localStorage key, one `?theme=` override,
// and one attribute on <html> (`data-theme`) that the CSS tokens in global.css
// key off. Everything that paints — the sky palettes and the page tokens —
// reads from that single decision, so navigating from the landing into a page
// keeps the mode the visitor picked.
//
// Day is the default, per the redesign.

import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "ciris-hero-theme";

export function useSkyTheme(): { dark: boolean; ready: boolean; toggle: () => void } {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search).get("theme");
      if (q === "dark" || q === "light") {
        setDark(q === "dark");
        return;
      }
      setDark(localStorage.getItem(THEME_KEY) === "dark");
    } catch {
      setDark(false);
    }
  }, []);

  // The attribute the page tokens key off. Written on every change (including
  // the first read) so a page rendered server-side dark does not flash.
  useEffect(() => {
    if (dark === null) return;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !(d === true);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  return { dark: dark === true, ready: dark !== null, toggle };
}
