"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Drifts its children against the page scroll. Used behind the hero so the
 * photo moves slower than the copy on top of it.
 *
 * Reads scroll in a rAF so a fast wheel can't queue more work than a frame
 * can drain. Disabled outright under prefers-reduced-motion.
 */
export default function Parallax({
  children,
  speed = 0.25,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      // only drifts while the hero is still on screen
      const offset = Math.min(window.scrollY, window.innerHeight) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
