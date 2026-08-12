import { stats } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { Container } from "./ui";

export default function Stats() {
  return (
    <section data-tone="paper" className="bg-white py-16 sm:py-20">
      <Container>
        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 90}
              className={`sm:px-10 ${i > 0 ? "sm:border-l sm:border-black/10" : ""} ${i === 0 ? "sm:pl-0" : ""}`}
            >
              <dt className="headline text-[clamp(2.25rem,4vw,3rem)] tabular-nums">
                <CountUp value={stat.value} />
              </dt>
              <dd className="lede mt-3 max-w-xs text-[0.95rem]">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
