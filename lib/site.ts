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
    detail: "GPA 3.97",
    period: "Graduating May 2028",
  },
] as const;

export const experience = [
  {
    title: "AI Engineering Intern",
    org: "Blitzy · Boston, MA",
    detail: "Benchmarked Blitzy's AI coding agent on SWE-bench Pro and developed internal evaluation frameworks.",
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
      source: `Updated ${timeAgo(repo.pushed_at)}`,
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
      source: `Played ${timeAgo(item.played_at)}`,
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

const KG_TO_LB = 2.20462;

// Format one exercise into a single line, e.g.
// "Hack Squat (Machine) — 3 × 10 @ 184 lb" (collapsed when sets are identical)
// or "Bench Press — 135×8, 135×6" when they differ.
function formatExercise(ex: HevyExercise): string {
  const sets = ex.sets ?? [];
  if (sets.length === 0) return ex.title;

  const fmtSet = (s: HevySet): string => {
    const lb = s.weight_kg ? `${Math.round(s.weight_kg * KG_TO_LB)} lb` : null;
    if (s.reps != null && lb) return `${lb} × ${s.reps}`;
    if (s.reps != null) return `${s.reps} reps`;
    if (s.duration_seconds != null) return `${Math.round(s.duration_seconds / 60)} min`;
    if (s.distance_meters != null) return `${s.distance_meters} m`;
    return lb ?? "—";
  };

  const formatted = sets.map(fmtSet);
  if (formatted.length === 1) {
    return `${ex.title} — ${formatted[0]}`;
  }
  const allSame = formatted.every((f) => f === formatted[0]);
  if (allSame) {
    return `${ex.title} — ${sets.length} sets · ${formatted[0]}`;
  }
  return `${ex.title} — ${formatted.join(", ")}`;
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
    const lines = exercises.slice(0, 3).map(formatExercise);
    const extra = exercises.length - 3;
    if (extra > 0) lines.push(`+${extra} more`);

    return {
      eyebrow: "Lifting",
      title: workout.title || "Workout",
      source: `Trained ${timeAgo(workout.start_time)}`,
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
