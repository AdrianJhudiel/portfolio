"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type NavLink = { label: string; href: string };

// A fixed offset near the very top (just clearing the sticky nav) sits right
// on the seam between two adjacent sections for a while — a section's last
// sliver of bottom padding can still technically contain that y-coordinate
// even once the next section already fills almost the whole screen, which
// reads as "wrong" no matter how correct it is geometrically. Scaling with
// viewport height instead keeps the line where a reader's eye actually
// lands (upper-middle of the screen), clamped so it never sits above the
// sticky nav on very short viewports.
function readingLine() {
  return Math.max(140, window.innerHeight * 0.3);
}

// Highlights whichever section the reader has actually scrolled to. Bug fix
// vs. the previous version: that used IntersectionObserver with a thin
// trigger band near the top of the viewport, which is brittle against tall
// sections — a section could stay flagged "active" after being scrolled
// well past if the next section's heading hadn't yet reached that exact
// band. This instead walks every section on scroll and picks the last one
// whose top has crossed the reading line — correct regardless of how tall
// any individual section is.
export default function SectionNav({ links, toggle }: { links: readonly NavLink[]; toggle: ReactNode }) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? "");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let ticking = false;
    function recompute() {
      // Sections are stacked contiguously with no gaps between them, so for
      // any point on the page exactly one section's vertical span contains
      // the reading line — find it by walking down until a section's
      // *bottom* edge hasn't passed the line yet. (An earlier version
      // checked each section's *top* edge instead, which left a dead zone
      // between "previous section's bottom has scrolled past" and "next
      // section's padded top reaches the line" — during that gap the stale
      // previous section stayed highlighted even once fully scrolled out of
      // view, which was the reported bug.)
      const line = readingLine();
      let current = links[links.length - 1]?.href ?? "";
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().bottom > line) {
          current = links[i].href;
          break;
        }
      }
      setActiveHref(current);
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(recompute);
    }

    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [links]);

  return (
    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 py-3">
      <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-widest uppercase">
        {links.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <li key={link.href} className="relative pb-1.5">
              <a
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={isActive ? "text-accent" : "text-muted transition-colors hover:text-accent"}
              >
                {link.label}
              </a>
              {isActive && (
                <motion.div
                  layoutId="section-nav-underline"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                  transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          );
        })}
      </ul>
      {toggle}
    </div>
  );
}
