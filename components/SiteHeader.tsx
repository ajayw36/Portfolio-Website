import Link from "next/link";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

// Single header for every page so the logo sits in an identical spot.
// `variant="social"` (home) shows social icons on the right; the default
// `"nav"` (interior pages) shows the text nav.
export default function SiteHeader({
  variant = "nav",
}: {
  variant?: "nav" | "social";
}) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 sm:px-10">
      <Logo />
      {variant === "social" ? (
        <SocialIcons />
      ) : (
        <nav aria-label="Primary" className="flex items-center gap-8 sm:gap-10">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-lg text-cream transition-opacity hover:opacity-70 sm:text-xl"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
