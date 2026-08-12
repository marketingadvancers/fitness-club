"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the first number in a label up from zero once it reaches the viewport.
 * "94%" -> 94 animates, "%" stays. "24/7" -> 24 animates, "/7" stays.
 * Anything without digits renders untouched.
 *
 * Deliberately scroll-driven rather than IntersectionObserver-driven: an
 * instant jump from below the fold to past the section (anchor link, refresh
 * part-way down, back-navigation) produces no intersection *change*, so an
 * observer never fires and the stat would sit at 0 forever. A position check
 * on scroll cannot miss that case.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)([\s\S]*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : null;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  // renders the final value on the server and until the client arms it
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // already on screen or above it at mount: nothing to animate into
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setShown(0);

    let frame = 0;
    let running = false;

    const start = () => {
      running = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
        setShown(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      frame = 0;
      if (running) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        window.removeEventListener("scroll", onScroll);
        start();
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (target === null) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {shown ?? target}
      {suffix}
    </span>
  );
}
