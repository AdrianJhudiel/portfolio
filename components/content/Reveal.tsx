"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Lightweight scroll-in reveal for Simple View sections. Deliberately cheap:
// a one-shot opacity+transform transition triggered by whileInView (no
// continuous animation loop, `viewport={{ once: true }}` so it never
// re-triggers), and SimpleView.tsx itself stays a Server Component — this
// is the only client boundary, wrapped around otherwise-static content.
//
// The initial state is never fully invisible (opacity 1, only a small y
// offset) — if JS fails to hydrate, content sits a few pixels off its final
// position rather than staying hidden. The animation is progressive
// enhancement, not a gate on visibility.
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.6, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
