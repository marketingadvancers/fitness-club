import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/lib/content";
import { Container, Wordmark } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="bg-ink pt-20 pb-10 text-white">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-white/60">{site.tagline}</p>

            <p className="eyebrow mt-10 text-white/40">Our main office</p>
            <p className="mt-2 text-white/80">{site.office}</p>

            <p className="eyebrow mt-8 text-white/40">Contact</p>
            <ul className="mt-2 space-y-1.5">
              {site.emails.map((mail) => (
                <li key={mail.address}>
                  <a
                    href={`mailto:${mail.address}`}
                    className="text-white/80 transition-colors hover:text-lime"
                  >
                    {mail.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footer.columns.map((col) => (
              <nav key={col.title}>
                <p className="eyebrow text-white/40">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/75 transition-colors hover:text-lime"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:max-w-md">
          {footer.gallery.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={src} alt="" fill sizes="180px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.handle}</p>
        </div>
      </Container>
    </footer>
  );
}
