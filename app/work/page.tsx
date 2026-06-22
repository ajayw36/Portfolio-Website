import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { education, experience, projects, site } from "@/lib/site";
import { ResumeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Work — Ajay Wadhwani",
};

type Entry = {
  title: string;
  org: string;
  detail: string;
  period: string;
  logo?: string;
  href?: string;
};

function Timeline({
  heading,
  entries,
}: {
  heading: string;
  entries: readonly Entry[];
}) {
  return (
    <section className="mt-16">
      <h2 className="font-display text-cream text-xl sm:text-2xl">{heading}</h2>
      <ol className="mt-6 ml-1.5 border-l border-gold/30">
        {entries.map((e) => (
          <li key={e.title} className="relative pb-9 pl-7 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-ink" />
            <div className="flex items-start gap-3">
              {e.logo && (
                <img
                  src={e.logo}
                  alt=""
                  className="mt-0.5 h-10 w-10 shrink-0 rounded-md bg-white object-contain p-1"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="font-display text-cream text-xl">{e.title}</h3>
                  <span className="shrink-0 text-sm text-faint">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
                {e.detail && <p className="mt-2 leading-relaxed">{e.detail}</p>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectCards({ entries }: { entries: readonly Entry[] }) {
  return (
    <section className="mt-16">
      <h2 className="font-display text-cream text-xl sm:text-2xl">Projects</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => {
          const cardClass =
            "group block rounded-2xl border border-line bg-surface p-5 transition-transform duration-300 hover:scale-105";
          const inner = (
            <>
              <p className="eyebrow">{e.period}</p>
              <h3 className="mt-3 font-display text-cream text-xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted">{e.detail}</p>
              <p className="mt-1 text-sm text-faint">{e.org}</p>
            </>
          );

          return e.href ? (
            <a
              key={e.title}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {inner}
            </a>
          ) : (
            <article key={e.title} className={cardClass}>
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 pb-28 sm:px-10">
        <section className="flex items-center gap-4 pt-4">
          <h1 className="font-display text-cream text-3xl sm:text-4xl">
            My Work
          </h1>
          <a
            href={site.socials.resume}
            aria-label="Résumé"
            className="inline-flex h-9 w-9 text-cream transition-opacity hover:opacity-60"
          >
            <ResumeIcon />
          </a>
        </section>

        <Timeline heading="Education" entries={education} />
        <Timeline heading="Experience" entries={experience} />
        <ProjectCards entries={projects} />
      </main>

      <SiteFooter />
    </div>
  );
}
