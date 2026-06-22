import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`font-display text-cream text-2xl tracking-wide transition-opacity hover:opacity-70 ${className}`}
    >
      {site.initials}
    </Link>
  );
}
