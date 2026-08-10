import Reveal from "@/components/Reveal";
import SkillGraph from "@/components/skills/SkillGraph";

export default function Skills() {
  return (
    <section id="skills" className="bg-[#07070b] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-[#c9a227] uppercase">
            Neural Skill Tree
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0cf6b]">
            Skills
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <SkillGraph />
        </Reveal>
      </div>
    </section>
  );
}
