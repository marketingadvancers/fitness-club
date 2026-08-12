# FitnessClub

Marketing site for FitnessClub, a multi-location gym brand. Custom Next.js
build — no page builder, no third-party runtime, no CDN calls at runtime.
Everything renders from this codebase.

Prices are written in ₹. They live in `src/lib/content.ts` only, so switching
currency is a find-and-replace in one file.

## Run

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # static prerender
```

## Stack

| | |
| --- | --- |
| Next.js 16 (App Router, Turbopack) | React 19, TypeScript |
| Tailwind v4 | tokens in `src/app/globals.css` under `@theme` |
| `next/font/google` — Manrope | self-hosted at build time, no runtime font request |
| `next/image` | local files in `public/media`, resized on demand |

## Structure

```
src/
  app/
    layout.tsx     font + metadata
    page.tsx       section order
    globals.css    design tokens, reveal + marquee keyframes
  components/      one file per section, plus ui.tsx and Reveal.tsx
  lib/content.ts   every string and image path on the page
public/media/      39 photos
```

Copy changes go in `src/lib/content.ts` — the components only lay it out.

## Design

| token | value | used for |
| --- | --- | --- |
| `--color-accent` | `#fd6934` | primary buttons, hover accents |
| `--color-lime` | `#dbff02` | hero badge, highlight card, "easy" level |
| `--color-ink` | `#000000` | dark sections, footer |
| `--color-shell` | `#f4f4f2` | page ground, alternating sections |

Type is Manrope throughout: 800 for display and headings, 400–500 for body.
`.display` is uppercase with tight tracking; `.headline` keeps sentence case.
Cards are 20px rounded, buttons are pills.

Layout: full-bleed dark parallax hero with a white quote card floated bottom
right, a three-up stat row, a 2×2 bento of image cards where two tiles are
solid lime and orange, a three-column club grid, alternating white and shell
bands with one black band, a testimonial marquee, a three-column blog grid,
and a dark rounded CTA panel above the footer.

## Motion

No animation library — five mechanisms, all hand-rolled:

- **Reveal** (`Reveal.tsx`) — adds `.is-in` when an element reaches the
  viewport; the transitions live in CSS. Three modes: `shift` (fade + lift),
  `clip` (a wipe that keeps the element opaque), and `none` (flips the class
  only, for the masked headline).

  Scroll-driven on purpose, not IntersectionObserver-driven. An instant jump
  past a section — anchor link, refresh part-way down, back navigation —
  produces no intersection *change*, so an observer never fires and the element
  stays hidden forever. That is worse than no animation, and it is fatal for
  the `clip` mode, which hides photos outright. One rAF-throttled listener
  serves every pending element and detaches once they have all revealed.
- **Scroll progress** (`ScrollProgress.tsx`) — accent bar across the top.
- **Magnetic** (`Magnetic.tsx`) — primary CTAs drift toward the cursor. Mouse
  and fine pointers only; a button that shifts under a finger is just harder
  to hit.
- **Tilt** (`Tilt.tsx`) — club cards take a slight 3D tilt tracking the cursor.
- **Ticker** (`Ticker.tsx`) — full-bleed lime band of scrolling claims between
  the perks and clubs sections.
- **Cursor** (`Cursor.tsx`) — the pointer becomes a dot that eases toward the
  cursor and swells into a labelled disc over anything with `data-cursor="…"`.
  `mix-blend-mode: difference` inverts it against light bands and black
  sections alike, so no per-section theming is needed. The class that hides the
  native pointer is added by the component itself — a script that never runs
  leaves the normal cursor alone rather than hiding it with no replacement.
- **PinnedTrack** (`PinnedTrack.tsx`) — the classes section pins and its cards
  travel sideways as you scroll past. The wrapper's height is set to viewport +
  horizontal distance so the sideways travel and the scroll it consumes stay in
  step at any width, re-measured on resize. Only from lg up; on a phone it
  stays an ordinary swipeable rail, because pinning there fights the browser's
  own scrolling and makes the section hard to leave.
- **VelocityMarquee** (`VelocityMarquee.tsx`) — the stories track drifts at a
  base rate, accelerates with the scroll, and reverses when you scroll back up.
  JS transform rather than a keyframe animation: a CSS animation can't change
  direction without restarting, which reads as a stutter.
- **DriftImage** (`DriftImage.tsx`) — card photos float inside their frames as
  they cross the viewport. The image is scaled up in CSS so the drift never
  exposes an edge, and one shared rAF loop serves every registered photo.
- **Masked line reveal** — hero headline lines sit in overflow-hidden boxes and
  slide up from below, staggered. Uses `Reveal mode="none"` so the block itself
  isn't faded, only its lines move.
- **Parallax** (`Parallax.tsx`) — the hero photo drifts against scroll at 0.28×.
  Reads scroll inside a rAF so a fast wheel can't outrun the frame budget, and
  clamps at one viewport so it stops once the hero is gone.
- **CountUp** (`CountUp.tsx`) — stat numbers count from zero on entry,
  ease-out-cubic. Parses the leading integer, so `24/7` would animate 24 and
  keep `/7`. Scroll-driven on purpose: an instant jump from below the fold to
  past the section produces no intersection *change*, so an observer never
  fires and the stat sits at 0 forever. A position check on scroll can't miss
  it.
- **Marquee** — the stories track renders its children twice and translates
  `-50%`, which makes the wrap seamless. Pauses on hover.

All of them no-op under `prefers-reduced-motion`.

## Images

All 39 photos come from the Freepik/Magnific stock library via the Magnific MCP
(`stock_search` → `stock_download`) — none are generated. Originals arrived at
full resolution (394 MB total) and were downscaled to max 2000 px wide at JPEG
q82, which brought the set to 12 MB with no visible loss at the sizes used.

Every image the site loads lives in `public/media`, and every path to one is
written in `src/lib/content.ts`. There is no other asset directory.
