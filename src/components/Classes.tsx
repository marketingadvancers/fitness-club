import { classes } from "@/lib/content";
import DriftImage from "./DriftImage";
import PinnedTrack from "./PinnedTrack";
import Reveal from "./Reveal";
import { Button, Container, SectionHead } from "./ui";

const LEVEL_TONE: Record<string, string> = {
  Easy: "bg-lime text-black",
  Medium: "bg-black text-white",
  Hard: "bg-accent text-white",
};

export default function Classes() {
  return (
    <section id="classes" data-tone="paper" className="bg-white pt-20 pb-20 sm:pt-28 sm:pb-28">
      {/* pinned from lg up: the page scrolls, the cards travel sideways.
          The heading rides inside the pin so the two stay on one screen. */}
      <PinnedTrack
        ariaLabel="Class timetable"
        header={
          <Container>
            <Reveal>
              <SectionHead eyebrow={classes.eyebrow} title={classes.title} lede={classes.lede} />
            </Reveal>
          </Container>
        }
      >
        {classes.items.map((item, i) => (
          <article
            key={item.name}
            data-cursor="Book"
            className="lift group w-[78vw] shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-shell sm:w-[24rem]"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <DriftImage
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 24rem, 78vw"
                className="object-cover"
                draggable={false}
              />
              <span className="absolute top-4 left-4 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1.5 text-[0.6rem] font-extrabold tracking-[0.14em] uppercase">
                {item.tag}
              </span>
              <span className="absolute top-4 right-4 text-[0.6rem] font-extrabold tracking-[0.14em] text-white/80 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="p-6">
              <h3 className="headline text-xl">{item.name}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-[0.6rem] font-extrabold tracking-[0.14em] uppercase ${
                    LEVEL_TONE[item.level] ?? "bg-black text-white"
                  }`}
                >
                  {item.level}
                </span>
                <span className="rounded-[var(--radius-pill)] border border-black/15 px-3 py-1.5 text-[0.6rem] font-extrabold tracking-[0.14em] uppercase">
                  {item.length}
                </span>
              </div>
            </div>
          </article>
        ))}
      </PinnedTrack>

      <Container className="mt-14">
        <Reveal className="flex justify-center">
          <Button href={classes.cta.href} variant="ink">
            {classes.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
