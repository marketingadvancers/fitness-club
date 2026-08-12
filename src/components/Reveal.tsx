"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Shared reveal scheduler.
 *
 * Deliberately scroll-driven rather than IntersectionObserver-driven. An
 * instant jump past a section — anchor link, refresh part-way down, back
 * navigation, `scrollTo(bottom)` — produces no intersection *change*, so an
 * observer never fires and the element stays hidden forever. That is worse
 * than no animation at all, and it bit the clip variant, which hides photos
 * outright.
 *
 * One rAF-throttled listener serves every pending element on the page, so the
 * cost is a single handler regardless of how many sections are registered.
 * Elements drop out of the set as they reveal; the listener detaches when the
 * set empties.
 */
const pending = new Set<HTMLElement>();
let frame = 0;
let listening = false;

function flush() {
  frame = 0;
  const limit = window.innerHeight * 0.94;

  for (const el of pending) {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add("is-in");
      pending.delete(el);
    }
  }

  if (pending.size === 0) detach();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

function attach() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

function detach() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

function register(el: HTMLElement) {
  pending.add(el);
  attach();
  schedule();
}

function unregister(el: HTMLElement) {
  pending.delete(el);
  if (pending.size === 0) detach();
}

type Props = {
  children: ReactNode;
  /** ms of stagger, handy when mapping over a list */
  delay?: number;
  as?: ElementType;
  className?: string;
  /**
   * "shift" fades and lifts the element itself.
   * "clip" wipes it open from the bottom, leaving it opaque throughout.
   * "none" only flips `.is-in`, leaving the animation to descendants —
   * used by the masked headline, which must not be faded as a block.
   */
  mode?: "shift" | "clip" | "none";
};

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  mode = "shift",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // no rAF available (or a very old engine): show it and move on
    if (typeof requestAnimationFrame === "undefined") {
      el.classList.add("is-in");
      return;
    }

    register(el);
    return () => unregister(el);
  }, []);

  const revealAttr =
    mode === "shift" ? { "data-reveal": "" } : mode === "clip" ? { "data-reveal": "clip" } : {};

  return (
    <Tag
      ref={ref}
      {...revealAttr}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
