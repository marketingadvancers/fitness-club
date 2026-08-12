"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Makes a band read as a card in a stack: it overlaps the band above it with a
 * rounded top edge and shrinks slightly as it leaves the top of the screen, so
 * the next one appears to slide over it.
 *
 * No darkening pass — an overlay that dims a section while it is still on
 * screen reads as a rendering fault rather than depth.
 *
 * A true pinned stack needs every section to be exactly one viewport tall.
 * These sections are content-driven heights, so this does the same thing with
 * an exit transform instead of pinning — it survives any height, and it does
 * not fight the pinned classes section further down the page.
 *
 * One shared rAF loop drives every frame on the page.
 */
const registry = new Set<HTMLElement>();
let frame = 0;
let listening = false;

function tick() {
  frame = 0;

  for (const el of registry) {
    const r = el.getBoundingClientRect();
    // how far the band has pushed past the top, as a fraction of its height
    const exited = Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1);
    // ease off early: all the movement happens in the first third of the exit
    const t = Math.min(exited * 3, 1);
    el.style.setProperty("--stack-scale", (1 - t * 0.04).toFixed(4));
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

export default function StackFrame({
  children,
  z,
  className = "",
}: {
  children: ReactNode;
  /** stacking order — later bands must sit above earlier ones */
  z: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    add(el);
    return () => remove(el);
  }, []);

  return (
    <div ref={ref} className={`stack-frame ${className}`} style={{ zIndex: z }}>
      {children}
    </div>
  );
}
