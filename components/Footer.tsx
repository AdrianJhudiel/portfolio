import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="led-strip relative">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-[var(--foreground)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
