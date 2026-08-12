import Image from "next/image";
import { perks } from "@/lib/content";
import Reveal from "./Reveal";
import { Button, Container, Eyebrow } from "./ui";

const TONE = {
  plain: "bg-shell text-black",
  lime: "bg-lime text-black",
  accent: "bg-accent text-white",
} as const;

export default function Perks() {
  return (
    <section id="perks" data-tone="paper" className="bg-white pb-20 sm:pb-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{perks.eyebrow}</Eyebrow>
            <h2 className="headline mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">{perks.title}</h2>
            <div className="mt-8">
              <Button href={perks.cta.href} variant="ink">
                {perks.cta.label}
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {perks.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} mode="clip">
                <article
                  className={`lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] ${
                    TONE[item.tone]
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                    />
                  </div>
                  <h3 className="headline p-6 text-xl sm:text-2xl">{item.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
