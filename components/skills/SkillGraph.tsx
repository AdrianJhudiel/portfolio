"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { skillNodes } from "@/lib/experience-data";
import { GOLD, GOLD_BRIGHT } from "@/lib/experience-theme";

const RADIUS_PCT = 36;

function nodePercentPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + RADIUS_PCT * Math.cos(angle),
    y: 50 + RADIUS_PCT * Math.sin(angle),
  };
}

export default function SkillGraph() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeSkill = skillNodes.find((s) => s.id === selected) ?? null;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const positions = skillNodes.map((_, i) => nodePercentPosition(i, skillNodes.length));

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="[perspective:1200px]">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
          className="relative aspect-square w-[280px] sm:w-[360px] md:w-[420px]"
        >
          {/* Connector lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{ transform: "translateZ(0px)" }}
          >
            {positions.map((pos, i) => (
              <line
                key={skillNodes[i].id}
                x1={50}
                y1={50}
                x2={pos.x}
                y2={pos.y}
                stroke={GOLD}
                strokeWidth={0.35}
                strokeOpacity={0.55}
                style={{ filter: `drop-shadow(0 0 2px ${GOLD})` }}
              />
            ))}
          </svg>

          {/* Hub */}
          <div
            className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f0cf6b]/60 text-center font-[family-name:var(--font-display)] text-[10px] font-semibold tracking-[0.15em]"
            style={{
              transform: "translateZ(36px)",
              background: `radial-gradient(circle at 35% 30%, ${GOLD_BRIGHT}, ${GOLD})`,
              color: "#1a1405",
              boxShadow: `0 0 24px 4px rgba(240,207,107,0.35)`,
            }}
          >
            SKILLS
          </div>

          {/* Nodes */}
          {skillNodes.map((skill, i) => {
            const pos = positions[i];
            const isSelected = selected === skill.id;
            return (
              <button
                key={skill.id}
                onClick={() => setSelected(isSelected ? null : skill.id)}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 focus:outline-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translateZ(14px)",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-200 group-hover:scale-125"
                  style={{
                    borderColor: isSelected ? GOLD_BRIGHT : "rgba(201,162,39,0.6)",
                    background: isSelected
                      ? `radial-gradient(circle at 35% 30%, ${GOLD_BRIGHT}, ${GOLD})`
                      : "rgba(201,162,39,0.15)",
                    boxShadow: isSelected
                      ? `0 0 18px 3px rgba(240,207,107,0.5)`
                      : "none",
                  }}
                />
                <span className="max-w-[80px] whitespace-normal text-center font-mono text-[10px] leading-tight text-[#e8b923]">
                  {skill.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeSkill && (
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-2xl border border-[#c9a227]/40 bg-white/[0.03] p-5 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[#f0cf6b]">
                {activeSkill.label}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="text-[#e8b923]/60 transition-colors hover:text-[#f0cf6b]"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#e8b923]/80">
              {activeSkill.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
