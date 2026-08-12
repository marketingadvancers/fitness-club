import Image from "next/image";
import { training } from "@/lib/content";
import Reveal from "./Reveal";
import { Button, Container, Eyebrow } from "./ui";

export default function Training() {
  return (
    <section id="training" data-tone="paper" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{training.eyebrow}</Eyebrow>
            <h2 className="headline mt-5 text-[clamp(2rem,4.2vw,3.1rem)]">{training.title}</h2>
            <p className="lede mt-6 text-base sm:text-lg">{training.lede}</p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-black/10 sm:grid-cols-2">
              {training.points.map((point) => (
                <li key={point.title} className="bg-white p-6">
                  <h3 className="text-base font-extrabold">{point.title}</h3>
                  <p className="lede mt-2 text-sm">{point.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={training.cta.href} variant="ink">
                {training.cta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-5 self-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={training.images[0]}
                alt="Coach guiding a member through a lift"
                fill
                sizes="(min-width: 1024px) 320px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={training.images[1]}
                alt="Personal training session in progress"
                fill
                sizes="(min-width: 1024px) 320px, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
