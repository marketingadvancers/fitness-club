import { clubs } from "@/lib/content";
import DriftImage from "./DriftImage";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { Button, Container, SectionHead } from "./ui";

export default function Clubs() {
  return (
    <section id="clubs" data-tone="shell" className="bg-shell py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHead eyebrow={clubs.eyebrow} title={clubs.title} lede={clubs.lede} />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.items.map((club, i) => (
            <Reveal key={club.name} delay={(i % 3) * 90}>
              <Tilt>
              <article
                data-cursor="View"
                className="group relative overflow-hidden rounded-[var(--radius-card)] bg-black"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <DriftImage
                    src={club.image}
                    alt={`${club.name} in ${club.area}`}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.7rem] font-extrabold tracking-[0.14em] text-white/70 uppercase">
                    {club.name} · {club.area}
                  </p>
                  <h3 className="headline mt-2 text-2xl text-white">{club.name}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-extrabold tracking-[0.14em] text-lime uppercase">
                    See details
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
                  </span>
                </div>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href={clubs.cta.href} variant="ink">
            {clubs.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
