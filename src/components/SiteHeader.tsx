"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Container, Wordmark } from "./ui";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // an open sheet shouldn't scroll the page behind it
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-5">
        <div
          className={`nav-pill flex items-center justify-between gap-4 rounded-[var(--radius-pill)] px-5 py-3 transition-all duration-500 ${
            lifted ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <Link href="#top" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.7rem] font-extrabold tracking-[0.14em] text-white/75 uppercase transition-colors hover:text-lime"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="#contact"
              className="hidden rounded-[var(--radius-pill)] bg-white px-5 py-3 text-[0.7rem] font-extrabold tracking-[0.14em] text-black uppercase transition-colors hover:bg-lime sm:inline-block"
            >
              Free week
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-white px-5 py-3 text-[0.7rem] font-extrabold tracking-[0.14em] text-black uppercase lg:hidden"
            >
              Menu
              <span className="grid gap-[3px]">
                <span
                  className={`block h-[2px] w-4 bg-black transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span className={`block h-[2px] w-4 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`block h-[2px] w-4 bg-black transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 top-0 -z-10 bg-black/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display text-4xl text-white transition-colors hover:text-lime"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-[var(--radius-pill)] bg-accent px-7 py-4 text-[0.7rem] font-extrabold tracking-[0.14em] text-white uppercase"
          >
            Free week
          </Link>
        </nav>
      </div>
    </header>
  );
}
