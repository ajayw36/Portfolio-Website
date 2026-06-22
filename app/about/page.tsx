import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CardSwiper from "@/components/CardSwiper";
import { updates } from "@/lib/site";

const PORTRAITS = [
  { src: "/photos/baby.jpg", alt: "Ajay as a kid" },
  { src: "/photos/headshot.jpg", alt: "Ajay — headshot" },
];

const FAVORITES = [
  { src: "/photos/race.jpg", alt: "Ann Arbor 5k" },
  { src: "/photos/pc.JPG", alt: "My PC" },
  { src: "/photos/kayak.JPG", alt: "Kayaking in Iceland" },
];

export const metadata: Metadata = {
  title: "About — Ajay Wadhwani",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 pb-28 sm:px-10">
        {/* Intro: bio + portrait */}
        <section className="grid grid-cols-1 gap-12 pt-4 md:grid-cols-[1fr_300px] md:items-start md:gap-14">
          <div>
            <h1 className="font-display text-cream text-3xl sm:text-4xl">
              About Me
            </h1>
            <div className="mt-6 max-w-prose space-y-5 leading-relaxed">
              <p>
                Hi, I&rsquo;m Ajay! I&rsquo;m a student at University of Michigan
                studying computer science and math. I enjoy thinking about
                challenging problems and learning the latest technologies.
                Lately, I&rsquo;ve been working at Blitzy, where I&rsquo;m
                helping with benchmarking AI models.
              </p>
              <p>
                Outside of academics, I enjoy staying active and spending time
                outdoors, whether that&rsquo;s skateboarding, going for a run, or
                playing spikeball with my friends. I also love listening to
                music and playing piano. Overall, I&rsquo;m curious, driven, and
                always looking for ways to learn, improve, and challenge myself.
              </p>
            </div>
          </div>

          {/* Portrait — card-deck swiper between headshot and baby photo */}
          <div className="mx-auto w-full max-w-[300px] md:mx-0">
            <CardSwiper slides={PORTRAITS} />
          </div>
        </section>

        {/* Live updates */}
        <section className="mt-16">
          <h2 className="font-display text-cream text-2xl sm:text-3xl">
            Live Updates
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((u) => (
              <article
                key={u.eyebrow}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <p className="eyebrow">{u.eyebrow}</p>
                <h3 className="mt-3 font-display text-cream text-xl">
                  {u.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{u.detail}</p>
                <p className="mt-1 text-sm text-faint">{u.source}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Favorite pics */}
        <section className="mt-16">
          <h2 className="font-display text-cream text-2xl sm:text-3xl">
            Favorite Pics
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FAVORITES.map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-display text-cream text-lg">
                    {photo.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
