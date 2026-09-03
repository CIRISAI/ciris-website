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

/**
 * @param force pass "dark" for pages whose content is a hard-coded dark scene
 *              (the safety arch, the stack, the path staircase): the chrome
 *              matches the scene instead of clashing with it, and the visitor's
 *              preference is left untouched for every other page.
 */
export function useSkyTheme(force?: "dark"): { dark: boolean; ready: boolean; toggle: () => void } {
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
    if (!force && dark === null) return;
    const el = document.documentElement;
    el.setAttribute("data-theme", force === "dark" || dark ? "dark" : "light");
    // Client-side navigation to a page still on the old look must not inherit
    // day tokens: that page is dark by design, so drop the attribute with the
    // shell that set it.
    return () => el.removeAttribute("data-theme");
  }, [dark, force]);

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !(d === true);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  return { dark: force === "dark" || dark === true, ready: force === "dark" || dark !== null, toggle };
}
