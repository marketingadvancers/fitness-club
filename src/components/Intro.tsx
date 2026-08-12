"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const KEY = "intro-played";
const LIFT_AT = 900;
const DONE_AT = 2000;

/**
 * First-load curtain: the wordmark sits on a full-screen panel that wipes
 * upward to reveal the hero. Shown once per tab.
 *
 * The "played" flag is written when the curtain *finishes*, not when it
 * starts. React runs effects twice in development: writing the flag up front
 * meant the second run saw it, returned early, and left the curtain on screen
 * with no timers to lift it — a permanent black panel over the site.
 *
 * Rendered client-side only, so a script that never runs simply means no
 * curtain rather than a page hidden behind one forever.
 */
export default function Intro() {
  const [phase, setPhase] = useState<"idle" | "showing" | "lifting">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(KEY)) return;

    setPhase("showing");
    document.body.style.overflow = "hidden";

    const lift = window.setTimeout(() => setPhase("lifting"), LIFT_AT);
    const done = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setPhase("idle");
      document.body.style.overflow = "";
    }, DONE_AT);

    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(done);
      // never leave the page unscrollable if this unmounts mid-flight
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div aria-hidden="true" className={`intro-curtain ${phase === "lifting" ? "is-lifting" : ""}`}>
      <span className="display text-[clamp(2rem,7vw,5rem)] text-white">{site.name}</span>
    </div>
  );
}
