"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

/**
 * Photo that floats a little inside its own frame as the page scrolls, giving
 * every card some depth. The frame must clip (`overflow-hidden`) — the image
 * is scaled up in CSS so the drift never exposes an edge.
 *
 * One shared rAF loop drives every registered image; with ~20 cards on the
 * page, twenty separate scroll listeners would be wasteful.
 */
const registry = new Set<HTMLElement>();
let frame = 0;
let listening = false;

function tick() {
  frame = 0;
  const h = window.innerHeight;

  for (const el of registry) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > h + 200) continue; // well off-screen
    // -1 when the frame sits at the bottom edge, +1 at the top
    const centre = r.top + r.height / 2;
    const d = (h / 2 - centre) / (h / 2);
    el.style.setProperty("--drift", Math.max(-1, Math.min(1, d)).toFixed(3));
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function add(el: HTMLElement) {
  registry.add(el);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();
}

function remove(el: HTMLElement) {
  registry.delete(el);
  if (registry.size === 0 && listening) {
    listening = false;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  }
}

export default function DriftImage({ className = "", ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    add(el);
    return () => remove(el);
  }, []);

  return <Image ref={ref} className={`drift ${className}`} {...props} />;
}
