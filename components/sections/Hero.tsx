import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col justify-center px-6 py-24"
    >
      <Reveal>
        <p className="font-mono text-sm font-medium text-[var(--accent-cyan-text)]">
          Hi, I&apos;m
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--foreground)] [text-shadow:0_0_40px_rgba(0,210,255,0.12)] sm:text-6xl">
          {siteConfig.name}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
          {siteConfig.companyTitle} at{" "}
          <span className="font-medium text-[var(--foreground)]">
            {siteConfig.company}
          </span>
          , building full-stack and backend-leaning software.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
          IT graduate focused on NestJS, Spring Boot, and Python across
          PostgreSQL, MySQL, and Supabase, with hands-on experience wiring up
          CRM and business automation using GoHighLevel, Zapier, and
          Make.com.
        </p>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="shimmer glow-ring relative overflow-hidden rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-white"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="arch-panel glow-ring rounded-full px-6 py-3 text-sm font-medium text-[var(--foreground)]"
          >
            Get in Touch
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:underline"
          >
            @adrianjhudiel on GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
