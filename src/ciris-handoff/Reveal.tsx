"use client";

// Reveal — small client wrapper for the deck's .rise/.in scroll pattern.
//
// Wrap a server-rendered section with <Reveal>. On client mount it adds the
// `anim` class so the keyframes in deck-motion.css are eligible to play, then
// it watches an IntersectionObserver and adds `in` to every descendant
// `.rise` element when the section enters the viewport. Children stay
// server-rendered; only the observer is client-side, so the cost is one tiny
// effect per section.

import { useEffect, useRef } from "react";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** IntersectionObserver threshold; default 0.2 */
  threshold?: number;
  /** Stay in the "in" state after the first crossing (no toggle on exit). */
  once?: boolean;
  /** Optional element tag; default "section". */
  as?: "section" | "div" | "header" | "footer" | "article";
  id?: string;
}

export default function Reveal({
  children,
  className,
  threshold = 0.2,
  once = true,
  as: As = "section",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.classList.add("anim");
    const targets = root.querySelectorAll<HTMLElement>(".rise");
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove("in");
          }
        }
      },
      { threshold },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <As ref={ref as React.RefObject<HTMLElement> & React.RefObject<HTMLDivElement>} id={id} className={className}>
      {children}
    </As>
  );
}
