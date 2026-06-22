import { site } from "@/lib/site";

// Footer for interior pages — email + LinkedIn.
export default function SiteFooter() {
  const links = [
    { label: "Email", href: `mailto:${site.email}`, external: false },
    { label: "LinkedIn", href: site.socials.linkedin, external: true },
  ];

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="text-faint">© {site.name}</p>
        <nav aria-label="Footer links" className="flex items-center gap-6">
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-cream transition-opacity hover:opacity-60"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
