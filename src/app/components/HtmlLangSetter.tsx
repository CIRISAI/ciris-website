"use client";

// Static export keeps a single root <html lang="en">. For localized routes we
// correct documentElement.lang/dir on the client so assistive tech and the
// browser treat the page as its real language. SEO locale signal is carried by
// the URL prefix + hreflang alternates, independent of this.

import { useEffect } from "react";
import { localeMeta } from "@/i18n/config";

export default function HtmlLangSetter({ locale }: { locale: string }) {
  useEffect(() => {
    const meta = localeMeta(locale);
    const el = document.documentElement;
    const prevLang = el.lang;
    const prevDir = el.dir;
    el.lang = meta.code;
    el.dir = meta.dir;
    return () => {
      el.lang = prevLang || "en";
      el.dir = prevDir || "ltr";
    };
  }, [locale]);
  return null;
}
