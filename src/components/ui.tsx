import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/content";
import SplitText from "./SplitText";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "paper" }) {
  return (
    <p className={`eyebrow ${tone === "paper" ? "text-white/70" : "text-black/50"}`}>{children}</p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "ink" | "paper" | "ghost";
  className?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  accent: "bg-accent text-white hover:bg-black",
  ink: "bg-ink text-white hover:bg-accent",
  paper: "bg-white text-black hover:bg-lime",
  ghost: "bg-transparent text-current border border-current/25 hover:border-current/60",
};

export function Button({ href, children, variant = "accent", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] px-6 py-3.5 text-[0.7rem] font-extrabold tracking-[0.14em] uppercase transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b-2 border-current pb-1 text-[0.7rem] font-extrabold tracking-[0.14em] uppercase"
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/** Section heading block used by most sections. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "ink",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "center" | "left";
  tone?: "ink" | "paper";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`headline mt-4 text-[clamp(2rem,4.4vw,3.25rem)] ${
          tone === "paper" ? "text-white" : "text-black"
        }`}
      >
        <SplitText text={title} />
      </h2>
      {lede ? (
        <p className={`lede mt-5 text-base sm:text-lg ${tone === "paper" ? "text-white/70" : ""}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function Wordmark({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const color = tone === "paper" ? "text-white" : "text-black";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color}`}>
      <svg viewBox="0 0 34 26" aria-hidden="true" className="h-5 w-auto text-accent" fill="currentColor">
        <path d="M8.6 0h7.2L7.2 26H0L8.6 0Z" />
        <path d="M19 0h7.2l-8.6 26h-7.2L19 0Z" />
        <path d="M29.4 0h4.6l-8.6 26h-4.6L29.4 0Z" />
      </svg>
      <span className="text-[1.35rem] font-extrabold tracking-[-0.01em]">{site.name}</span>
    </span>
  );
}
