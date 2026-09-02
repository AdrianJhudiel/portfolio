"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MolNode as MolNodeData } from "@/lib/molecular-graph";
import {
  NODE_FILL,
  NODE_FILL_ACTIVE,
  NODE_BORDER,
  NODE_GLINT,
  NODE_GLINT_HOT,
  NODE_SHADOW,
  NODE_RIM_LIGHT,
  NODE_RIM_DARK,
  ACCENT,
  ACCENT_SOFT,
  ACCENT_TEXT,
  TEXT_DARK,
  TEXT_BODY,
  TEXT_MUTED,
  CHECK,
} from "@/lib/pearl-theme";
import FeatureList from "@/components/content/FeatureList";

export default function MolNode({
  node,
  index,
  isFocused,
  isDimmed,
  isBobbing,
  isHovered,
  onHover,
  onClick,
}: {
  node: MolNodeData;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  isBobbing: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (e: React.MouseEvent) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isHub = node.kind === "hub";
  const labelSize = isHub ? 16 : 6;
  const subtitleSize = 6;
  // detailSize/stackSize are scaled inversely to each node type's camera.scale
  // (see lib/camera.ts fitPoint) — hubs and subs land at roughly the same
  // final rendered size regardless of their different world-space node.size.
  // These were tuned low enough that body text rendered around 10-14px on
  // screen; ~1.5-1.6x gets zoomed-in body text to a comfortably readable
  // ~18-22px.
  const detailSize = isHub ? 7 : 3;
  const stackSize = 2.7;

  // Skill/project bodies and long hub paragraphs only make sense once the
  // node has been zoomed into — at overview scale they're too small to read
  // and, since they aren't clipped, would otherwise spill text well outside
  // the node's circle. Keep them in the DOM but only *visually* reveal them
  // on focus (isFocused = the node has been clicked/activated, not merely
  // tab-focused).
  const showExpandedContent = isFocused;

  // The visual reveal above is gated behind activation, but a screen-reader
  // user who lands on this button via Tab (without activating it yet) still
  // needs the full content — otherwise they only hear the bare label and
  // have no way to preview a node before deciding to open it. So the
  // button's accessible name carries everything unconditionally; the
  // aria-hidden spans below stay hidden until showExpandedContent purely to
  // avoid a sighted-but-assistive-tech-driven double read of the same text.
  const accessibleLabel = [
    node.label,
    node.subtitle,
    node.detail,
    node.project?.stack,
    node.project?.description,
    node.project?.features?.length
      ? `Features: ${node.project.features.map((f) => f.label).join(", ")}`
      : undefined,
  ]
    .filter(Boolean)
    .join(". ");

  // Layered background: a subtle glint tucked into the upper-left corner
  // (a small "hot spot" plus a softer surrounding sheen) fading toward a
  // dark falloff at the lower-right, over the base translucent tint. This
  // is what reads as "curved glass" rather than a flat tinted disc — a
  // single solid fill can't carry that cue no matter how transparent it is.
  // Node label/detail text is centered in the circle, so the glint is kept
  // small and hugging the corner (rather than spreading toward center) and
  // low-opacity (see NODE_GLINT/_HOT in pearl-theme.ts) — a larger, brighter
  // version of this previously sat on top of the text as a glare instead of
  // reading as lighting. All gradient layers sit on the same element as CSS
  // background layers (no extra DOM nodes), so this doesn't add render cost
  // beyond the backdrop-filter blur that was already there.
  const isLit = isHovered || isFocused;
  const nodeBackground = [
    `radial-gradient(circle at 22% 18%, ${NODE_GLINT_HOT} 0%, transparent 9%)`,
    `radial-gradient(ellipse 42% 32% at 22% 18%, ${NODE_GLINT}, transparent 62%)`,
    `radial-gradient(ellipse 75% 65% at 76% 82%, ${NODE_SHADOW}, transparent 62%)`,
    isLit ? NODE_FILL_ACTIVE : NODE_FILL,
  ].join(", ");
  // A thin lit edge along the top + a soft dark edge along the bottom,
  // layered inside the outer glow shadow — sells the rim of a curved
  // surface instead of a flat circle's plain border.
  const rimShadow = `inset 0 1.5px 2px ${NODE_RIM_LIGHT}, inset 0 -10px 18px ${NODE_RIM_DARK}`;
  const restShadow = `${rimShadow}, 0 10px 25px -5px rgba(15,23,42,0.08)`;
  const litShadow = `${rimShadow}, 0 10px 40px -8px ${ACCENT_SOFT}, 0 2px 12px rgba(15,23,42,0.08)`;
  const litShadowBright = `${rimShadow}, 0 10px 56px -4px ${ACCENT_SOFT}, 0 2px 16px rgba(15,23,42,0.12)`;

  return (
    // Static positioning wrapper: this owns `left`/`top` and the -50%/-50%
    // centering transform via plain Tailwind classes, and Framer Motion
    // never touches it. The motion.button below owns its own `animate`
    // transform (bob/scale) starting clean from (0, 0) — if the same
    // element tried to do both, Framer's animate would take over the
    // whole inline `transform` property (inline style beats the Tailwind
    // class) and silently drop the -50%/-50% centering the instant it
    // attached on hydration, jumping every node down-right by half its
    // own size.
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: node.x, top: node.y, width: node.size, height: node.size }}
    >
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        animate={{
          y: isBobbing && !prefersReducedMotion ? [0, -5, 0] : 0,
          opacity: isDimmed ? 0.25 : 1,
          scale: isHovered && !isFocused ? 1.08 : 1,
          filter: isDimmed ? "blur(4px)" : "blur(0px)",
          // A static glow reads as inert once you've been looking at it for
          // more than a second — the focused node is the one thing on
          // screen guaranteed to hold attention, so it gets a slow glow
          // "breathe" (opacity-only, via a matching pair of box-shadow
          // strings) instead of the plain snap-to-value the other states
          // use. Position/scale never move here, so this can't drift the
          // hit-box or retrigger the hover-flicker the bobbing freeze below
          // exists to avoid.
          boxShadow:
            isFocused && !prefersReducedMotion
              ? [litShadow, litShadowBright]
              : isLit
                ? litShadow
                : restShadow,
        }}
        transition={{
          y: {
            duration: 4.5 + (index % 3),
            repeat: isBobbing && !prefersReducedMotion ? Infinity : 0,
            ease: "easeInOut",
            delay: index * 0.3,
          },
          // Roughly matches the camera pan's duration (MolecularCanvas.tsx)
          // so the dim/undim settles together with the pan instead of
          // finishing noticeably earlier.
          opacity: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
          filter: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
          // A bouncy spring here overshoots past the target scale and rings
          // back before settling. Since this element is also the hover
          // target, an overshoot that swings back past the cursor re-fires
          // mouseenter, which snaps the target back to hovered, which
          // overshoots again — a feedback loop that reads as flicker. A
          // plain non-oscillating tween can't cross back over the cursor
          // once it starts leaving, so the loop has nothing to latch onto.
          scale: { type: "tween", duration: 0.18, ease: "easeOut" },
          boxShadow: {
            duration: 2.4,
            repeat: isFocused && !prefersReducedMotion ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        aria-label={isHub ? `${accessibleLabel} — open` : accessibleLabel}
        className="mol-node block h-full w-full cursor-pointer rounded-full"
        style={{
          background: nodeBackground,
          // Bumped from 12px, plus a touch of saturate() — a common glass
          // trick where whatever's blurred behind (ambient particles/bond
          // lines) reads as richer through the glass rather than just
          // hazy/washed out.
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: `1px solid ${isLit ? ACCENT : NODE_BORDER}`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
          {/* Safety net: at the enlarged text sizes, a project with a long
              description + several features can outgrow the circle's fixed
              height. Rather than silently clip, let this inner box scroll —
              only kicks in when content actually overflows. */}
          <div
            className="flex w-[78%] flex-col items-center gap-[2px] overflow-y-auto text-center"
            style={{ maxHeight: "92%" }}
          >
            <span
              style={{
                fontSize: labelSize,
                color: TEXT_DARK,
                fontWeight: 600,
                lineHeight: 1.15,
                fontFamily: "var(--font-display)",
              }}
            >
              {node.label}
            </span>

            {node.subtitle && (
              <span style={{ fontSize: subtitleSize, color: TEXT_MUTED, fontFamily: "var(--font-mono)" }}>
                {node.subtitle}
              </span>
            )}

            {node.detail && (
              <span
                aria-hidden={!showExpandedContent}
                style={{
                  fontSize: detailSize,
                  color: TEXT_BODY,
                  lineHeight: 1.4,
                  marginTop: isHub ? 6 : 3,
                  opacity: showExpandedContent ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {node.detail}
              </span>
            )}

            {node.project && (
              <div
                aria-hidden={!showExpandedContent}
                style={{ opacity: showExpandedContent ? 1 : 0, transition: "opacity 0.3s ease" }}
              >
                <span
                  style={{
                    fontSize: stackSize + 0.3,
                    color: ACCENT_TEXT,
                    fontFamily: "var(--font-mono)",
                    marginTop: 2,
                    display: "block",
                  }}
                >
                  {node.project.stack}
                </span>
                <span style={{ fontSize: detailSize, color: TEXT_BODY, lineHeight: 1.4, marginTop: 3, display: "block" }}>
                  {node.project.description}
                </span>
                <FeatureList
                  features={node.project.features}
                  style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-start" }}
                  itemStyle={{ fontSize: stackSize, color: TEXT_MUTED, textAlign: "left" }}
                  checkStyle={{ color: CHECK }}
                />
              </div>
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
}
