"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { molNodes, WORLD_WIDTH, WORLD_HEIGHT, type MolNode as MolNodeData } from "@/lib/molecular-graph";
import { cameraForNode, cameraForCluster, overviewCamera, type Camera } from "@/lib/camera";
import { siteConfig } from "@/lib/site";
import { BG_FROM, BG_TO, TEXT_DARK, TEXT_MUTED, ACCENT } from "@/lib/pearl-theme";
import MolNode from "@/components/graph/MolNode";
import BondLines from "@/components/graph/BondLines";
import PearlAmbient from "@/components/graph/PearlAmbient";

function getViewport() {
  if (typeof window === "undefined") return { vw: 1280, vh: 800 };
  return { vw: window.innerWidth, vh: window.innerHeight };
}

export default function MolecularCanvas() {
  const prefersReducedMotion = useReducedMotion();
  const [camera, setCamera] = useState<Camera>(() => {
    const { vw, vh } = getViewport();
    return overviewCamera(vw, vh);
  });
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const reset = useCallback(() => {
    const { vw, vh } = getViewport();
    setFocusedId(null);
    setCamera(overviewCamera(vw, vh));
  }, []);

  const focusNode = useCallback((node: MolNodeData) => {
    const { vw, vh } = getViewport();
    const children = molNodes.filter((n) => n.parentId === node.id);
    const next = children.length > 0 ? cameraForCluster(node, children, vw, vh) : cameraForNode(node, vw, vh);
    setFocusedId(node.id);
    setCamera(next);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") reset();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reset]);

  useEffect(() => {
    function onResize() {
      const { vw, vh } = getViewport();
      const focused = molNodes.find((n) => n.id === focusedId);
      if (focused) {
        const children = molNodes.filter((n) => n.parentId === focused.id);
        setCamera(children.length > 0 ? cameraForCluster(focused, children, vw, vh) : cameraForNode(focused, vw, vh));
      } else {
        setCamera(overviewCamera(vw, vh));
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [focusedId]);

  const focusedNode = molNodes.find((n) => n.id === focusedId) ?? null;

  // When a hub is focused, the camera zooms out to frame the hub *and* its
  // satellite children together (see cameraForCluster) — so those children
  // are the thing the user is now looking at and about to click. They must
  // not be dimmed/blurred/bobbing like the rest of the graph, or the exact
  // targets the camera just brought into view become hard to see and their
  // hit-boxes drift under the cursor.
  const activeIds = new Set<string>();
  if (focusedNode) {
    activeIds.add(focusedNode.id);
    for (const n of molNodes) {
      if (n.parentId === focusedNode.id) activeIds.add(n.id);
    }
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${BG_FROM}, ${BG_TO})` }}
      onClick={reset}
    >
      <PearlAmbient />

      <motion.div
        animate={{ x: camera.x, y: camera.y, scale: camera.scale }}
        transition={
          prefersReducedMotion
            ? { duration: 0.15, ease: "easeOut" }
            : { type: "spring", stiffness: 95, damping: 22 }
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transformOrigin: "0 0",
        }}
      >
        <BondLines hoveredId={hoveredId} />

        {molNodes.map((node, i) => (
          <MolNode
            key={node.id}
            node={node}
            index={i}
            isFocused={focusedId === node.id}
            isDimmed={focusedId !== null && !activeIds.has(node.id)}
            isBobbing={focusedId === null}
            isHovered={hoveredId === node.id}
            onHover={setHoveredId}
            onClick={() => focusNode(node)}
          />
        ))}
      </motion.div>

      {/* Fixed header */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between p-5">
        <div
          className="pointer-events-auto rounded-full border px-4 py-2 backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.9)" }}
        >
          <p
            className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-wide"
            style={{ color: TEXT_DARK }}
          >
            {siteConfig.name}
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: TEXT_MUTED }}>
            {siteConfig.role}
          </p>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.9)", color: TEXT_MUTED }}
          >
            Contact
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.9)", color: TEXT_MUTED }}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Breadcrumb + reset */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center justify-between p-5">
        <div
          className="pointer-events-auto flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase"
          style={{ color: TEXT_MUTED }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="transition-colors"
            style={{ color: focusedNode ? TEXT_MUTED : ACCENT }}
          >
            Root
          </button>
          {focusedNode && (
            <>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: ACCENT }}>{focusedNode.label}</span>
            </>
          )}
        </div>

        {focusedNode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="pointer-events-auto rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.9)", color: ACCENT }}
          >
            Zoom out (Esc)
          </button>
        )}
      </div>
    </div>
  );
}
