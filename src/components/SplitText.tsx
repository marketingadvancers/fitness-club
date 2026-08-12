"use client";

import { useEffect, useRef } from "react";

/**
 * Splits a heading into per-character spans that rise into place in sequence.
 *
 * Words are kept whole in their own inline-block so the line still wraps at
 * word boundaries — splitting into bare characters would let a line break
 * mid-word.
 *
 * The characters start shifted but the element is never faded as a block, and
 * a missed reveal leaves them visible rather than blank: see `.split-char` in
 * globals.css.
 */
export default function SplitText({
  text,
  className = "",
  step = 26,
}: {
  text: string;
  className?: string;
  /** ms between characters */
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nextFrames = () => requestAnimationFrame(() => el.classList.add("is-in"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    let frame = 0;
    const check = () => {
      frame = 0;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        window.removeEventListener("scroll", onScroll);
        nextFrames();
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
  }, []);

  const words = text.split(" ");
  let index = 0;

  return (
    <span ref={ref} className={`split ${className}`}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, c) => {
            const delay = index++ * step;
            return (
              <span key={`${ch}-${c}`} className="split-char">
                <span style={{ "--char-delay": `${delay}ms` } as React.CSSProperties}>{ch}</span>
              </span>
            );
          })}
          {w < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
