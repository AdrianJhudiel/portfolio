// Modern minimalist white/glass palette for the molecular network view.
//
// These resolve through CSS custom properties (defined in app/globals.css)
// rather than raw hex, so the whole graph responds to the visitor's OS
// light/dark preference automatically — the dark values live entirely in
// the CSS, nothing here or in the components that consume these constants
// needs to know which mode is active.
export const BG_FROM = "var(--graph-bg-from)";
export const BG_TO = "var(--graph-bg-to)";

export const NODE_FILL = "var(--graph-node-fill)";
export const NODE_FILL_ACTIVE = "var(--graph-node-fill-active)";
export const NODE_BORDER = "var(--graph-node-border)";

export const BOND_COLOR = "var(--graph-bond-color)";

// Subtle cool accent for hover/active glow — pure white-on-white doesn't
// read as a highlight, so a soft indigo carries the "glow" role instead.
export const ACCENT = "var(--graph-accent)";
export const ACCENT_SOFT = "var(--graph-accent-soft)";

// ACCENT is ~3:1 against the light-mode background — fine for
// borders/glows/large UI components, but fails WCAG AA (4.5:1) as *text*.
// Use this deeper indigo anywhere ACCENT was standing in for text color
// (breadcrumbs, links, small labels). Its dark-mode value is a much lighter
// indigo instead (deeper indigo would fail contrast against a dark background).
export const ACCENT_TEXT = "var(--graph-accent-text)";

export const TEXT_DARK = "var(--graph-text-dark)";
export const TEXT_MUTED = "var(--graph-text-muted)";

// next/og's Satori renderer (app/icon.tsx, app/opengraph-image.tsx) draws
// outside a DOM/CSSOM — it cannot resolve CSS custom properties, so those
// files need literal values, not the var(--x) tokens above. These
// intentionally stay fixed to the light palette regardless of the viewer's
// OS theme: OG/share-preview images are static and shouldn't change
// depending on who's looking at the link preview.
export const OG_BG_FROM = "#f8fafc";
export const OG_BG_TO = "#eef2f7";
export const OG_ACCENT = "#818cf8";
export const OG_TEXT_DARK = "#0f172a";
export const OG_TEXT_MUTED = "#475569";
