"use client";

import { useEffect } from "react";

/**
 * Stamps the tone of whichever band owns the middle of the viewport onto
 * <html data-tone>, so the fixed furniture can answer to the section beneath
 * it: the nav pill flips, the progress bar swaps accent, the body ground
 * follows.
 *
 * Why not cross-fade the page ground itself: the stacked bands have to be
 * opaque to cover the band beneath them, so nothing of a ground layer would
 * ever be visible. The two effects are mutually exclusive; this keeps the
 * per-section colour change and leaves the stack intact.
 *
 * Reads at mid-viewport rather than at the top edge, so the tone flips when a
 * section actually takes over the screen instead of when it first peeks in.
 */
export default function ThemeMorph() {
  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (bands.length === 0) return;

    const root = document.documentElement;
    let frame = 0;
    let current = "";

    const pick = () => {
      frame = 0;
      const mid = window.innerHeight / 2;

      for (const band of bands) {
        const r = band.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          const tone = band.dataset.tone ?? "paper";
          if (tone !== current) {
            current = tone;
            root.dataset.tone = tone;
          }
          return;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.tone;
    };
  }, []);

  return null;
}
