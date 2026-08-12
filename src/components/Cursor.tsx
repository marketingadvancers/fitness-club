"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replaces the pointer with a dot that eases toward the cursor and swells into
 * a labelled disc over anything carrying `data-cursor="…"`.
 *
 * Two safeguards worth keeping:
 *  - the `has-custom-cursor` class that hides the native pointer is added by
 *    this component, so a script that never runs leaves the normal cursor
 *    alone instead of hiding it with no replacement
 *  - it only engages for fine pointers with hover, so touch is untouched
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setActive(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const loop = () => {
      // ease toward the pointer so the dot trails slightly
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const el = dot.current;
      if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const hit = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(hit ? hit.getAttribute("data-cursor") : null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={dot} className="cursor-dot" aria-hidden="true" data-label={label ?? undefined}>
      <span>{label}</span>
    </div>
  );
}
