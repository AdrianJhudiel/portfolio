// Fixed "classy dark navy" palette for the molecular network view.
//
// These resolve through CSS custom properties (defined in app/globals.css)
// rather than raw hex, so every value lives in one place — but unlike the
// Simple View tokens (--background, --foreground, etc.), the graph's
// palette is intentionally NOT tied to the visitor's OS light/dark
// preference. The graph always renders dark, regardless of OS setting.
export const BG_FROM = "var(--graph-bg-from)";
export const BG_TO = "var(--graph-bg-to)";

export const NODE_FILL = "var(--graph-node-fill)";
export const NODE_FILL_ACTIVE = "var(--graph-node-fill-active)";
export const NODE_BORDER = "var(--graph-node-border)";

// Glass-sphere lighting cues layered on top of NODE_FILL (see MolNode.tsx) —
// a bright glint anchored near one edge plus a soft dark falloff toward the
// opposite edge is what reads as "curved glass" rather than a flat tinted
// disc. A fixed, shared light source (not randomized per node) so every
// node in the graph reads as lit from the same direction.
export const NODE_GLINT = "var(--graph-node-glint)";
export const NODE_GLINT_HOT = "var(--graph-node-glint-hot)";
export const NODE_SHADOW = "var(--graph-node-shadow)";
export const NODE_RIM_LIGHT = "var(--graph-node-rim-light)";
export const NODE_RIM_DARK = "var(--graph-node-rim-dark)";

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
// Description/detail paragraphs (the actual copy someone reads) — richer
// and higher-contrast than TEXT_MUTED, which stays reserved for secondary
// metadata (subtitles, feature-list labels) so the two don't blur into one
// flat gray block.
export const TEXT_BODY = "var(--graph-text-body)";
export const TEXT_MUTED = "var(--graph-text-muted)";

// A dedicated success-green for feature-list checkmarks — reusing the
// indigo accent everywhere it fits (border glow, hover, stack tags) started
// reading as one monotone palette; a second hue for "this shipped" is a
// deliberate, small point of color variety rather than more indigo.
export const CHECK = "var(--graph-check)";

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
