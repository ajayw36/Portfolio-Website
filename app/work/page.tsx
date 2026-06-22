import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { education, experience, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Ajay Wadhwani",
};

type Entry = {
  title: string;
  org: string;
  detail: string;
  period: string;
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
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="font-display text-cream text-xl">{e.title}</h3>
              <span className="shrink-0 text-sm text-faint">{e.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{e.org}</p>
            <p className="mt-2 leading-relaxed">{e.detail}</p>
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
        {entries.map((e) => (
          <article
            key={e.title}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <p className="eyebrow">{e.period}</p>
            <h3 className="mt-3 font-display text-cream text-xl">{e.title}</h3>
            <p className="mt-2 text-sm text-muted">{e.detail}</p>
            <p className="mt-1 text-sm text-faint">{e.org}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 pb-28 sm:px-10">
        <section className="pt-4">
          <h1 className="font-display text-cream text-3xl sm:text-4xl">
            My Work
          </h1>
        </section>

        <Timeline heading="Education" entries={education} />
        <Timeline heading="Experience" entries={experience} />
        <ProjectCards entries={projects} />
      </main>

      <SiteFooter />
    </div>
  );
}
