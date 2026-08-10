import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import GlassCard from "@/components/GlassCard";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Contact
        </h2>
      </Reveal>
      <Reveal delay={0.08} className="mt-6">
        <GlassCard>
          <p className="max-w-xl text-[var(--muted)]">
            Full contact block coming next. For now, reach me directly.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-block text-lg font-medium text-[var(--accent-cyan-text)] underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
        </GlassCard>
      </Reveal>
    </section>
  );
}
