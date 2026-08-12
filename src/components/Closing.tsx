import Image from "next/image";
import { closing } from "@/lib/content";
import Reveal from "./Reveal";
import { Button, Container } from "./ui";

export default function Closing() {
  return (
    <section id="contact" data-tone="paper" className="bg-white pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-black">
            <Image
              src={closing.image}
              alt=""
              fill
              sizes="(min-width: 1360px) 1280px, 95vw"
              className="object-cover opacity-55"
            />
            <div className="relative px-6 py-24 text-center sm:px-12 sm:py-32">
              <h2 className="display mx-auto max-w-3xl text-[clamp(2.1rem,5.4vw,4rem)] text-white">
                {closing.title}
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base text-white/75 sm:text-lg">
                {closing.lede}
              </p>
              <div className="mt-10 flex justify-center">
                <Button href={closing.cta.href}>{closing.cta.label}</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
