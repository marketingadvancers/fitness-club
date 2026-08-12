import { site } from "@/lib/content";

const WORDS = [
  "12 clubs, one keycard",
  site.tagline,
  "200+ classes a month",
  "no joining fee",
  "open 5am – 11pm",
  "first week free",
];

/**
 * Full-bleed scrolling band between sections. The list is rendered twice so
 * the track can wrap at -50% without a visible seam.
 */
export default function Ticker() {
  const track = [...WORDS, ...WORDS];

  return (
    <div className="ticker border-y border-black/10 bg-lime py-4">
      <div className="ticker-track" style={{ ["--ticker-duration" as string]: "38s" }}>
        {track.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden={i >= WORDS.length}
            className="flex shrink-0 items-center gap-6 pr-6 text-[0.72rem] font-extrabold tracking-[0.14em] text-black uppercase"
          >
            {word}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/45" />
          </span>
        ))}
      </div>
    </div>
  );
}
