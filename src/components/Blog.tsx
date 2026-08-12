import Image from "next/image";
import { blog } from "@/lib/content";
import Reveal from "./Reveal";
import { Button, Container, Eyebrow } from "./ui";

export default function Blog() {
  return (
    <section data-tone="paper" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow>{blog.eyebrow}</Eyebrow>
            <h2 className="headline mt-5 text-[clamp(2rem,4.2vw,3.1rem)]">{blog.title}</h2>
            <p className="lede mt-5 text-base sm:text-lg">{blog.lede}</p>
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <Button href={blog.cta.href} variant="ink">
              {blog.cta.label}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 90}>
              <article className="group">
                <Reveal
                  mode="clip"
                  delay={(i % 3) * 90 + 120}
                  className="relative block aspect-[16/11] overflow-hidden rounded-[var(--radius-card)]"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                </Reveal>
                <div className="mt-5 flex items-center gap-3 text-[0.62rem] font-extrabold tracking-[0.14em] uppercase">
                  <span className="rounded-[var(--radius-pill)] bg-shell px-3 py-1.5">{post.category}</span>
                  <time className="text-black/40">{post.date}</time>
                </div>
                <h3 className="headline mt-4 text-lg transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="lede mt-2 text-sm">{post.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
