import Image from "next/image";
import { stories } from "@/lib/content";
import Reveal from "./Reveal";
import VelocityMarquee from "./VelocityMarquee";
import { Container, SectionHead } from "./ui";

export default function Stories() {
  // rendered twice so the marquee can wrap at half its width without a seam
  const track = [...stories.items, ...stories.items];

  return (
    <section id="stories" data-tone="shell" className="bg-shell py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHead eyebrow={stories.eyebrow} title={stories.title} lede={stories.lede} />
        </Reveal>
      </Container>

      <Reveal className="marquee mt-14" delay={120}>
        <VelocityMarquee className="gap-5 px-3">
          {track.map((story, i) => (
            <figure
              key={`${story.headline}-${i}`}
              className="w-[300px] shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-white sm:w-[360px]"
              aria-hidden={i >= stories.items.length}
            >
              <div className="relative aspect-[4/3]">
                <Image src={story.image} alt="" fill sizes="360px" className="object-cover" />
              </div>
              <figcaption className="p-6">
                <h3 className="headline text-lg">{story.headline}</h3>
                <blockquote className="lede mt-3 text-sm">“{story.body}”</blockquote>
              </figcaption>
            </figure>
          ))}
        </VelocityMarquee>
      </Reveal>
    </section>
  );
}
