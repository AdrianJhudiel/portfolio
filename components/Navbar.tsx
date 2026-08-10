"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="sticky top-0 z-50 px-4 pt-4"
    >
      <header
        className={`led-strip arch-panel mx-auto max-w-4xl rounded-full transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-15px_rgba(30,41,59,0.25)]" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-3.5">
          <a
            href="#home"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--foreground)] [text-shadow:0_0_18px_rgba(0,210,255,0.35)]"
          >
            JAA
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] sm:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-1 transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground)] sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {open && (
        <ul className="arch-panel mx-auto mt-2 flex max-w-4xl flex-col gap-1 rounded-3xl px-6 py-3 text-sm font-medium text-[var(--muted)] sm:hidden">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
