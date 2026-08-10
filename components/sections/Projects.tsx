import Reveal from "@/components/Reveal";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import RepoIntelligence from "@/components/projects/RepoIntelligence";

export default function Projects() {
  return (
    <section id="projects" className="bg-[#07070b] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-[#c9a227] uppercase">
            Past Projects
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0cf6b]">
            Projects
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ProjectCarousel />
        </Reveal>

        <Reveal delay={0.16} className="mt-14 flex justify-center">
          <RepoIntelligence />
        </Reveal>
      </div>
    </section>
  );
}
