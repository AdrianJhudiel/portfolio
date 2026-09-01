import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import { singleNodeContent } from "@/lib/graph-data";
import { skillNodes, projects } from "@/lib/experience-data";
import FeatureList from "@/components/content/FeatureList";
import Reveal from "@/components/content/Reveal";
import SectionNav from "@/components/simple/SectionNav";

// The plain, scrollable counterpart to the interactive graph. Same content,
// same source-of-truth modules (lib/site.ts, lib/graph-data.ts,
// lib/experience-data.ts) — no duplicated copy to drift out of sync — just
// rendered as ordinary semantic HTML so it works on any device, with any
// input method, with zero learning curve. This is the view a phone visitor
// or a screen-reader user lands on by default (see ViewSwitcher).
//
// Sections render as full-bleed alternating-tint "bands" (each with its own
// background, an inner max-w content container, and a <Reveal> wrapper for
// a one-shot scroll-in fade) rather than one flat page — everything here is
// a static gradient or a one-time CSS transform/opacity transition, chosen
// specifically to stay cheap on low-end mobile (no continuous animation, no
// parallax/scroll-jacking).
const linkClass =
  "rounded-full border border-card-border px-4 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent";

function Band({
  id,
  labelledBy,
  tint,
  children,
}: {
  id: string;
  labelledBy: string;
  tint: "base" | "alt";
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-28 ${tint === "alt" ? "bg-background-alt" : "bg-background"}`}>
      <Reveal className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-16">{children}</Reveal>
    </section>
  );
}

export default function SimpleView({ viewToggle }: { viewToggle: ReactNode }) {
  return (
    <div id="top" className="min-h-full bg-background text-foreground">
      <header className="relative overflow-hidden border-b border-card-border/60 bg-card/60 px-6 py-8 backdrop-blur-sm sm:px-10">
        {/* Static radial glow behind the name — decorative, no animation. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
          style={{ background: "radial-gradient(480px circle at 20% 10%, var(--accent), transparent 65%)", opacity: 0.14 }}
        />

        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="mt-1.5 font-mono text-xs tracking-widest text-accent uppercase">{siteConfig.role}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              Email
            </a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            {siteConfig.linkedin && (
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            )}
            <a
              href={siteConfig.resumeUrl}
              download
              className="rounded-full bg-accent px-4 py-1.5 font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Download Resume
            </a>
          </div>
        </div>
      </header>

      {/* Sticky, blurred while scrolling. The view toggle lives in this same
          bar (right-aligned) rather than floating as a separate fixed pill
          above it — one cohesive strip instead of two stacked elements. */}
      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-10 border-b border-card-border/60 bg-card/80 px-6 backdrop-blur-md sm:px-10"
      >
        <SectionNav links={siteConfig.navLinks} toggle={viewToggle} />
      </nav>

      <main>
        <Band id="about" labelledBy="about-heading" tint="base">
          <h2 id="about-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            About
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{singleNodeContent.about}</p>
        </Band>

        <Band id="experience" labelledBy="experience-heading" tint="alt">
          <h2 id="experience-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Experience
          </h2>
          <p className="mt-2 text-sm font-medium text-accent">
            {siteConfig.companyTitle} · {siteConfig.company}
          </p>
          <p className="mt-3 leading-relaxed text-muted">{singleNodeContent.experience}</p>
        </Band>

        <Band id="skills" labelledBy="skills-heading" tint="base">
          <h2 id="skills-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Skills
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {skillNodes.map((skill) => (
              <div key={skill.id} className="rounded-xl border border-card-border bg-card p-4">
                <dt className="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                  {skill.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{skill.detail}</dd>
              </div>
            ))}
          </dl>
        </Band>

        <Band id="projects" labelledBy="projects-heading" tint="alt">
          <h2 id="projects-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Projects
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-card-border bg-card p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold">{project.title}</h3>
                <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 font-mono text-xs tracking-wide text-accent uppercase">
                  {project.stack}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <FeatureList
                  features={project.features}
                  className="mt-3 flex flex-col gap-1"
                  itemClassName="text-sm text-muted"
                />
              </article>
            ))}
          </div>
        </Band>

        <Band id="education" labelledBy="education-heading" tint="base">
          <h2 id="education-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Education
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{singleNodeContent.education}</p>
        </Band>

        <Band id="contact" labelledBy="contact-heading" tint="alt">
          <h2 id="contact-heading" className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Contact
          </h2>
          <p className="mt-3 text-muted">The fastest way to reach me:</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              {siteConfig.email}
            </a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            {siteConfig.linkedin && (
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            )}
          </div>
        </Band>
      </main>

      <footer className="border-t border-card-border/60 bg-background px-6 py-6 text-center sm:px-10">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-widest text-muted uppercase transition-colors hover:text-accent"
        >
          Back to top
        </a>
      </footer>
    </div>
  );
}
