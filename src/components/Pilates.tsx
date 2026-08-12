import Image from "next/image";
import { pilates } from "@/lib/content";
import Reveal from "./Reveal";
import { Button, Container, Eyebrow } from "./ui";

export default function Pilates() {
  return (
    <section data-tone="ink" className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="order-2 grid grid-cols-2 gap-5 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={pilates.images[0]}
                alt="Pilates reformer class"
                fill
                sizes="(min-width: 1024px) 300px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative -mt-8 aspect-square overflow-hidden rounded-[var(--radius-card)] sm:-mt-14">
              <Image
                src={pilates.images[1]}
                alt="Member training on a reformer"
                fill
                sizes="(min-width: 1024px) 300px, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <Eyebrow tone="paper">{pilates.eyebrow}</Eyebrow>
            <h2 className="headline mt-5 text-[clamp(2rem,4.2vw,3.1rem)] text-white">
              {pilates.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">{pilates.lede}</p>

            <ul className="mt-9 space-y-3.5">
              {pilates.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/85">
                  <span className="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-lime">
                    <svg viewBox="0 0 10 10" className="h-2 w-2 text-black" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M1.5 5.2 3.9 7.6 8.5 2.6" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={pilates.cta.href} variant="paper">
                {pilates.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
