"use client";

// GrammarNav — a sticky, horizontally-scrollable jump bar that tames
// the page's long scroll. Each item anchors to a section wrapper id in
// page.tsx (the wrappers carry scroll-margin-top so the heading clears
// this bar + the floating nav). An IntersectionObserver highlights the
// section currently in view.

import { useEffect, useState } from "react";

const ITEMS: Array<{ id: string; label: string }> = [
  { id: "primitives", label: "Primitives" },
  { id: "families", label: "Families" },
  { id: "envelope", label: "Envelope" },
  { id: "composition", label: "Composition" },
  { id: "namespace", label: "Namespace" },
  { id: "media", label: "Media" },
  { id: "consent", label: "Consent" },
  { id: "whats-new", label: "What's new" },
  { id: "explore", label: "Explore" },
  { id: "graph", label: "Graph" },
  { id: "translate", label: "Translate" },
  { id: "stories", label: "Stories" },
  { id: "references", label: "References" },
];

export default function GrammarNav() {
  const [active, setActive] = useState<string>(ITEMS[0].id);

  useEffect(() => {
    const targets = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el != null,
    );
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        // The topmost section intersecting the upper third wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[88px] z-30 -mx-4 mb-8 border-y border-slate-200 bg-white/85 backdrop-blur md:top-[96px] md:mx-0 md:rounded-full md:border dark:border-gray-800 dark:bg-gray-950/80"
    >
      <div className="flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
              active === item.id
                ? "bg-brand-primary text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
