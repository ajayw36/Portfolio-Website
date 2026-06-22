import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

const HERO_LINKS = [
  { label: "About Me", href: "/about" },
  { label: "My Work", href: "/work" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="social" />

      {/* Hero — vertically centered on desktop, top-aligned on mobile */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 items-start px-6 pt-10 sm:px-10 md:items-center md:pt-0">
        <div>
          <h1 className="font-display text-cream text-6xl leading-[1.05] sm:text-7xl md:text-8xl">
            Hi, I&rsquo;m Ajay!
          </h1>
          <p className="mt-5 font-display text-3xl text-gold sm:text-4xl">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 font-display text-2xl text-cream sm:flex-row sm:gap-12 sm:text-3xl">
            {HERO_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="transition-opacity hover:opacity-70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
