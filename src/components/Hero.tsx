import Image from "next/image";
import { hero } from "@/lib/content";
import Magnetic from "./Magnetic";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import { Button, Container, TextLink } from "./ui";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* over-tall so the parallax drift never exposes an edge */}
      <Parallax speed={0.28} className="absolute inset-x-0 top-0 h-[130%]">
        <div className="relative h-full w-full">
          <Image
            src="/media/hero.jpg"
            alt="Member training on a pull-up bar in a low-lit club floor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90"
          />
        </div>
      </Parallax>
      {/* keeps the headline legible over a busy photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pt-36 pb-14">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block rounded-[var(--radius-pill)] bg-lime px-4 py-2 text-[0.65rem] font-extrabold tracking-[0.14em] text-black uppercase">
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal mode="none">
              <h1 className="display photo-fill mt-7 text-[clamp(2.75rem,7.4vw,5.5rem)]">
                {hero.title.map((line, i) => (
                  <span key={line} className="mask-line">
                    <span style={{ "--line-delay": `${120 + i * 110}ms` } as React.CSSProperties}>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">{hero.lede}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 text-white">
                <Magnetic>
                  <Button href={hero.primary.href}>{hero.primary.label}</Button>
                </Magnetic>
                <TextLink href={hero.secondary.href}>{hero.secondary.label}</TextLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="w-full lg:w-[340px]">
            <figure className="rounded-[var(--radius-card)] bg-white p-6">
              <blockquote className="text-[0.95rem] leading-relaxed text-black/80">
                {hero.quote.body}
              </blockquote>
              <figcaption className="mt-4 text-sm text-black/45">— {hero.quote.author}</figcaption>
            </figure>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-3">
                {hero.avatars.map((src, i) => (
                  <span
                    key={src}
                    className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/80"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                      style={{ zIndex: hero.avatars.length - i }}
                    />
                  </span>
                ))}
              </div>
              <p className="max-w-[10rem] text-sm leading-snug text-white/85">{hero.members}</p>
            </div>
          </Reveal>
        </div>

        {/* scroll cue — a line that keeps drawing itself downward */}
        <div aria-hidden="true" className="mt-14 flex flex-col items-center gap-3">
          <span className="eyebrow text-white/40">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-cue_2s_ease-in-out_infinite] bg-lime" />
          </span>
        </div>
      </Container>
    </section>
  );
}
