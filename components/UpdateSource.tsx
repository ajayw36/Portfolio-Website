"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Text shown before JS hydrates or when there's no timestamp. */
  fallback: string;
  /** ISO timestamp to format in the visitor's local timezone. */
  at?: string;
  /** e.g. "Updated" -> "{prefix} {local date} {suffix}". */
  prefix?: string;
  /** e.g. "on GitHub". */
  suffix?: string;
};

// Midnight (local time) of the given date — strips the time-of-day so we can
// compare whole calendar days rather than rolling 24-hour windows.
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function relative(at: string): string | null {
  const d = new Date(at);
  if (Number.isNaN(d.getTime())) return null;

  // Calendar-day difference in the visitor's own timezone.
  const days = Math.round(
    (startOfDay(new Date()).getTime() - startOfDay(d).getTime()) / 86_400_000
  );

  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

// Renders the "Updated today on GitHub" line. The relative date is computed on
// the client so "today"/"yesterday" reflect the visitor's own calendar day and
// operating-system timezone, rather than the server's at cache-build time.
export default function UpdateSource({ fallback, at, prefix, suffix }: Props) {
  const [text, setText] = useState(fallback);

  useEffect(() => {
    if (!at) return;
    const when = relative(at);
    if (!when) return;

    setText([prefix, when, suffix].filter(Boolean).join(" "));
  }, [at, prefix, suffix]);

  return (
    <p className="mt-3 text-sm text-faint" suppressHydrationWarning>
      {text}
    </p>
  );
}
