"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MolNode as MolNodeData } from "@/lib/molecular-graph";
import { NODE_FILL, NODE_FILL_ACTIVE, NODE_BORDER, ACCENT, TEXT_DARK, TEXT_MUTED } from "@/lib/pearl-theme";

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
  const subtitleSize = 5;
  const detailSize = isHub ? 4.5 : 1.9;
  const stackSize = 1.7;

  // Skill/project bodies and long hub paragraphs only make sense once the
  // node has been zoomed into — at overview scale they're too small to read
  // and, since they aren't clipped, would otherwise spill text well outside
  // the node's circle. Keep them in the DOM (so SEO/screen readers still see
  // the content) but only reveal them on focus.
  const showExpandedContent = isFocused;

  return (
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
      }}
      transition={{
        y: {
          duration: 4.5 + (index % 3),
          repeat: isBobbing && !prefersReducedMotion ? Infinity : 0,
          ease: "easeInOut",
          delay: index * 0.3,
        },
        opacity: { duration: 0.5 },
        filter: { duration: 0.5 },
        scale: { type: "spring", stiffness: 240, damping: 20 },
      }}
      aria-label={isHub ? `${node.label} — open` : node.label}
      className="mol-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      style={{
        left: node.x,
        top: node.y,
        width: node.size,
        height: node.size,
        background: isHovered || isFocused ? NODE_FILL_ACTIVE : NODE_FILL,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${isHovered || isFocused ? ACCENT : NODE_BORDER}`,
        boxShadow:
          isHovered || isFocused
            ? `0 10px 40px -8px ${ACCENT}55, 0 2px 12px rgba(15,23,42,0.08)`
            : "0 10px 25px -5px rgba(15,23,42,0.08)",
      }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        <div className="flex w-[78%] flex-col items-center gap-[2px] text-center">
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
                color: TEXT_MUTED,
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
                  color: ACCENT,
                  fontFamily: "var(--font-mono)",
                  marginTop: 2,
                  display: "block",
                }}
              >
                {node.project.stack}
              </span>
              <span style={{ fontSize: detailSize, color: TEXT_MUTED, lineHeight: 1.4, marginTop: 3, display: "block" }}>
                {node.project.description}
              </span>
              <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-start" }}>
                {node.project.features.map((f) => (
                  <span key={f.label} style={{ fontSize: stackSize, color: TEXT_MUTED, textAlign: "left" }}>
                    ✓ {f.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
