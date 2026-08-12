"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marquee whose speed and direction answer to the page scroll: it drifts at a
 * base rate when the page is still, accelerates as you scroll, and reverses
 * when you scroll back up.
 *
 * Driven by JS transform rather than a CSS animation — a keyframe animation
 * can't change direction without restarting, which reads as a stutter.
 *
 * Children are rendered twice by the caller; this wraps the offset at half the
 * track width so the loop is seamless.
 */
export default function VelocityMarquee({
  children,
  baseSpeed = 0.6,
  className = "",
}: {
  children: ReactNode;
  /** px per frame when the page is not moving */
  baseSpeed?: number;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let direction = 1;
    let frame = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta !== 0) direction = delta > 0 ? 1 : -1;
      // cap so a flick can't launch the track across the screen
      velocity = Math.min(Math.abs(delta) * 0.35, 14);
    };

    const loop = () => {
      velocity *= 0.92; // settle back to the base drift
      offset -= (baseSpeed + velocity) * direction;

      const half = el.scrollWidth / 2;
      if (half > 0) {
        // keep the offset inside one loop in both directions
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
      }

      el.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [baseSpeed]);

  return (
    <div ref={track} className={`flex w-max ${className}`}>
      {children}
    </div>
  );
}
