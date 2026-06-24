// Central place to edit content + links across the site.

export const site = {
  initials: "A/W",
  name: "Ajay Wadhwani",
  tagline: "Honors Math & CS @ UMich",
  email: "ajaywa@umich.edu",
  socials: {
    github: "https://github.com/ajayw36",
    linkedin: "https://www.linkedin.com/in/ajay-wadhwani2006",
    hevy: "https://hevy.com/user/ajaywa",
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
    detail: "",
    period: "Graduating May 2028",
    logo: "/photos/logo-umich.png",
  },
] as const;

export const experience = [
  {
    title: "AI Engineering Intern",
    org: "Blitzy · Boston, MA",
    detail: "Benchmarked Blitzy's AI coding agent on SWE-bench Pro and developed internal evaluation frameworks.",
    period: "May 2026 – Aug. 2026",
    logo: "/photos/logo-blitzy.png",
  },
  {
    title: "Research Assistant",
    org: "Thurber Lab, U-M Chemical Engineering · Ann Arbor, MI",
    detail:
      "ADC cancer-therapeutics research with C++ simulations and Python data pipelines.",
    period: "May 2026 – Aug. 2026",
    logo: "/photos/logo-umich.png",
  },
  {
    title: "Investment Analyst Intern",
    org: "Silver Arc Capital · Boston, MA",
    detail:
      "Biotech-focused hedge fund research on cystic fibrosis treatments, translating biomedical findings into quantitative models.",
    period: "Jul. 2025 – Aug. 2025",
    logo: "/photos/logo-silverarc.png",
  },
  {
    title: "Director of Computer Science",
    org: "Greater Boston STEM Program (gbSTEM) · Boston, MA",
    detail: "Led 15 instructors building a project-based CS curriculum.",
    period: "Sep. 2023 – May 2025",
    logo: "/photos/logo-gbstem.png",
  },
  {
    title: "Machine Learning Intern",
    org: "Chu Lab, Mass General Hospital · Boston, MA",
    detail:
      "Built ML models to detect sharp-wave ripples in high-density EEG data for epilepsy research.",
    period: "July 2024 – Sep. 2024",
    logo: "/photos/logo-mgh.png",
  },
] as const;

export const projects = [
  {
    title: "KTP Life App",
    org: "Flutter SDK, Dart, Firebase, Figma",
    detail:
      "Member-tracking feature (20+ pages) for 700+ users across iOS, Android, and Web.",
    period: "Sep. 2025 – May 2026",
    href: "https://www.ktpmichigan.com/life",
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
    href: "https://github.com/ajayw36/order-book",
  },
] as const;

export type Update = {
  eyebrow: string;
  title: string;
  detail?: string;
  source: string;
  href?: string;
  lines?: string[]; // optional multi-line body (e.g. Hevy exercise/set list)
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
      source: `Updated ${timeAgo(repo.pushed_at)} on GitHub`,
      href: repo.html_url,
    };
  }
  catch {
    return fallback;
  }
}

export async function getSpotifyUpdate(): Promise<Update> {
  const fallback: Update = {
    eyebrow: "Listening",
    title: "Recently played",
    detail: "Spotify track + artist",
    source: "from Spotify",
  };

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return fallback;

  try {
    // Exchange the long-lived refresh token for a short-lived access token.
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store", // never cache the token exchange
    });
    if (!tokenRes.ok) return fallback;
    const { access_token } = await tokenRes.json();
    if (!access_token) return fallback;

    // Most recently played track.
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 600 }, // cache 10 min
      }
    );
    if (!res.ok) return fallback;

    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return fallback;

    const track = item.track;
    const artists = track.artists.map((a: { name: string }) => a.name).join(", ");

    return {
      eyebrow: "Listening",
      title: track.name,
      detail: artists,
      source: `Played ${timeAgo(item.played_at)} on Spotify`,
      href: track.external_urls?.spotify,
    };
  } catch {
    return fallback;
  }
}

type HevySet = {
  weight_kg: number | null;
  reps: number | null;
  duration_seconds: number | null;
  distance_meters: number | null;
};
type HevyExercise = { title: string; sets: HevySet[] };

// Format one exercise as "name — N sets", dropping the equipment
// parenthetical, e.g. "Bench Press (Barbell)" -> "Bench Press — 3 sets".
function formatExercise(ex: HevyExercise): string {
  const name = ex.title.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const count = ex.sets?.length ?? 0;
  return `${name} — ${count} ${count === 1 ? "set" : "sets"}`;
}

export async function getHevyUpdate(): Promise<Update> {
  const fallback: Update = {
    eyebrow: "Lifting",
    title: "Latest workout",
    detail: "Hevy session summary",
    source: "from Hevy",
  };

  const apiKey = process.env.HEVY_API_KEY?.trim();
  if (!apiKey) return fallback;

  try {
    const res = await fetch(
      "https://api.hevyapp.com/v1/workouts?page=1&pageSize=1",
      {
        headers: { "api-key": apiKey },
        next: { revalidate: 600 }, // cache 10 min
      }
    );
    if (!res.ok) return fallback;

    const data = await res.json();
    const workout = data.workouts?.[0];
    if (!workout) return fallback;

    const exercises: HevyExercise[] = workout.exercises ?? [];
    // Cap at 3 lines: show all when there are ≤3 exercises, otherwise
    // show 2 exercises plus a "+N more" line.
    const shown = exercises.length > 3 ? 2 : exercises.length;
    const lines = exercises.slice(0, shown).map(formatExercise);
    const extra = exercises.length - shown;
    if (extra > 0) lines.push(`+${extra} more`);

    const when = workout.end_time ?? workout.start_time;

    return {
      eyebrow: "Lifting",
      title: workout.title || "Workout",
      source: when ? `Trained ${timeAgo(when)} on Hevy` : "Trained with Hevy",
      href: site.socials.hevy,
      lines,
    };
  } catch {
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
