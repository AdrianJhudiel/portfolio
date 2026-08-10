"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/experience-data";
import { GOLD, GOLD_BRIGHT } from "@/lib/experience-theme";

const CARD_WIDTH = 280;

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function go(delta: number) {
    setActiveIndex((i) => (i + delta + projects.length) % projects.length);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[420px] w-full overflow-hidden [perspective:1400px]">
        {projects.map((project, i) => {
          const offset = i - activeIndex;
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <motion.div
              key={project.id}
              onClick={() => !isActive && setActiveIndex(i)}
              animate={{
                x: offset * 150,
                z: -abs * 140,
                rotateY: offset * -32,
                scale: Math.max(1 - abs * 0.14, 0.6),
                opacity: abs > 2 ? 0 : 1 - abs * 0.28,
              }}
              transition={{ type: "spring", stiffness: 210, damping: 26 }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                marginLeft: -CARD_WIDTH / 2,
                width: CARD_WIDTH,
                zIndex: 100 - abs,
                pointerEvents: abs > 2 ? "none" : "auto",
                cursor: isActive ? "default" : "pointer",
              }}
              className="rounded-2xl border border-[#c9a227]/40 bg-white/[0.03] p-5 backdrop-blur-md"
            >
              <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[#f0cf6b]">
                {project.title}
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-[#c9a227]">
                {project.stack}
              </p>

              {isActive && (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-[#e8b923]/85">
                    {project.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {project.features.map((f) => (
                      <li
                        key={f.label}
                        className="flex items-start gap-2 text-xs text-[#e8b923]/75"
                      >
                        <span style={{ color: GOLD_BRIGHT }}>✓</span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a227]/50 text-[#f0cf6b] transition-colors hover:border-[#f0cf6b]"
        >
          &larr;
        </button>
        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to ${project.title}`}
              className="h-1.5 w-1.5 rounded-full transition-all"
              style={{
                backgroundColor: i === activeIndex ? GOLD_BRIGHT : "rgba(201,162,39,0.35)",
                width: i === activeIndex ? "1.1rem" : "0.375rem",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next project"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a227]/50 text-[#f0cf6b] transition-colors hover:border-[#f0cf6b]"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
