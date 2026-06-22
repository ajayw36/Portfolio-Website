// Central place to edit content + links across the site.

export const site = {
  initials: "A/W",
  name: "Ajay Wadhwani",
  tagline: "Honors Math & CS @ UMich",
  email: "ajaywa@umich.edu",
  socials: {
    github: "https://github.com/ajayw36",
    linkedin: "https://www.linkedin.com/in/ajay-wadhwani2006",
    resume: "/resume.pdf",
  },
};

// The "live updates" cards on the About page.
export const updates = [
  {
    eyebrow: "Listening",
    title: "Recently played",
    detail: "Spotify track + artist",
    source: "from Spotify",
  },
  {
    eyebrow: "Building",
    title: "Latest repo",
    detail: "Updated on GitHub",
    source: "from GitHub",
  },
  {
    eyebrow: "Lifting",
    title: "Latest workout",
    detail: "Hevy session summary",
    source: "from Hevy",
  },
] as const;

// Work page content — sourced from resume. Kept intentionally concise.
export const education = [
  {
    title: "University of Michigan",
    org: "B.S. Honors Mathematics & Computer Science · Ann Arbor, MI",
    detail: "GPA 3.97",
    period: "Graduating May 2028",
  },
] as const;

export const experience = [
  {
    title: "AI Engineering Intern",
    org: "Blitzy · Boston, MA",
    detail: "Engineering Research Team.",
    period: "May 2026 – Aug. 2026",
  },
  {
    title: "Research Assistant",
    org: "Thurber Lab, U-M Chemical Engineering · Ann Arbor, MI",
    detail:
      "ADC cancer-therapeutics research with C++ simulations and Python data pipelines.",
    period: "May 2026 – Aug. 2026",
  },
  {
    title: "Investment Analyst Intern",
    org: "Silver Arc Capital · Boston, MA",
    detail:
      "Biotech-focused hedge fund research on cystic fibrosis treatments, translating biomedical findings into quantitative models.",
    period: "Jul. 2025 – Aug. 2025",
  },
  {
    title: "Director of Computer Science",
    org: "Greater Boston STEM Program (gbSTEM) · Boston, MA",
    detail: "Led 15 instructors building a project-based CS curriculum.",
    period: "Sep. 2023 – May 2025",
  },
  {
    title: "Machine Learning Intern",
    org: "Mass General Hospital · Boston, MA",
    detail:
      "Built ML models to detect sharp-wave ripples in high-density EEG data for epilepsy research.",
    period: "July 2024 – Sep. 2024",
  },
] as const;

export const projects = [
  {
    title: "KTP App Development Lead",
    org: "Flutter SDK, Dart, Firebase, Figma",
    detail:
      "Member-tracking app (20+ pages) for 700+ users across iOS, Android, and Web.",
    period: "Sep. 2025 – May 2026",
  },
  {
    title: "Healthcare Analytics Dashboard",
    org: "React, Spring Boot, Java, SQL, Tableau",
    detail:
      "Full-stack dashboard with embedded Tableau views for hospital billing and operations.",
    period: "Sep. 2025 – Dec. 2025",
  },
  {
    title: "Limit Order Book Simulator",
    org: "C++",
    detail:
      "Discrete-event simulator with price-time priority matching over 1M+ events.",
    period: "Jan. 2026 – Feb. 2026",
  },
] as const;

export type Update = {
  eyebrow: string;
  title: string;
  detail: string;
  source: string;
  href?: string;
}

export async function getGitHubUpdate(): Promise<Update> {
  const fallback: Update = {
    eyebrow: "Building",
    title: "Latest repo",
    detail: "Updated on GitHub",
    source: "from GitHub",
  }
  try {
    const res = await fetch(
      "https://api.github.com/users/ajayw36/repos?sort=pushed&per_page=1", 
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 600 }
      } // cache 10 min
    );

    if (!res.ok) return fallback;

    const [repo] = await res.json();
    if (!repo) return fallback;

    return {
      eyebrow: "Building",
      title: repo.name,
      detail: repo.description ?? "No description yet",
      source: `Updated ${timeAgo(repo.pushed_at)}`,
      href: repo.html_url,
    };
  }
  catch {
    return fallback;
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
