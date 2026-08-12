"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins a section and moves its track sideways as the page scrolls past it.
 *
 * The heading belongs inside the pinned area, not above it — with the heading
 * left in normal flow the sticky container opens as a full empty screen
 * beneath it, which reads as a layout bug.
 *
 * Only engages from lg up. Below that everything stays in normal flow and the
 * track is an ordinary swipeable rail: pinning on a phone fights the browser's
 * own scroll behaviour and makes the section hard to get out of.
 *
 * The wrapper's height is viewport + horizontal distance, so the sideways
 * travel and the vertical scroll it consumes stay in step at any width.
 */
export default function PinnedTrack({
  children,
  header,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  ariaLabel: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let distance = 0;
    let frame = 0;
    let engaged = false;

    const clear = () => {
      wrapEl.style.height = "";
      trackEl.style.transform = "";
      engaged = false;
    };

    const measure = () => {
      if (!desktop.matches || calm.matches) {
        clear();
        return;
      }
      engaged = true;
      distance = Math.max(trackEl.scrollWidth - window.innerWidth, 0);
      wrapEl.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    const update = () => {
      frame = 0;
      if (!engaged) return;
      const top = wrapEl.getBoundingClientRect().top;
      // 0 when the section reaches the top, 1 when its scroll budget is spent
      const progress = distance > 0 ? Math.min(Math.max(-top / distance, 0), 1) : 0;
      trackEl.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      if (frame) cancelAnimationFrame(frame);
      clear();
    };
  }, []);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pt-20">
        {header ? <div className="mb-10 lg:mb-12">{header}</div> : null}

        <div role="region" aria-label={ariaLabel} className="overflow-x-auto lg:overflow-hidden">
          <div ref={track} className="pin-track flex w-max gap-5 px-5 sm:px-8 lg:px-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
