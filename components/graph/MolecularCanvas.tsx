"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { molNodes, WORLD_WIDTH, WORLD_HEIGHT, type MolNode as MolNodeData } from "@/lib/molecular-graph";
import { cameraForNode, cameraForCluster, overviewCamera, type Camera } from "@/lib/camera";
import { siteConfig } from "@/lib/site";
import { BG_FROM, BG_TO, TEXT_DARK, TEXT_MUTED, ACCENT_TEXT } from "@/lib/pearl-theme";
import MolNode from "@/components/graph/MolNode";
import BondLines from "@/components/graph/BondLines";
import PearlAmbient from "@/components/graph/PearlAmbient";

function getViewport() {
  if (typeof window === "undefined") return { vw: 1280, vh: 800 };
  return { vw: window.innerWidth, vh: window.innerHeight };
}

// Derives the right camera for wherever `path` currently points: empty path
// is the full overview, a path ending on a node with children frames that
// node's cluster, and a path ending on a childless node (a sub-node, or a
// hub with no children like About/Experience/Education) zooms tight on it.
function cameraForPath(path: string[], vw: number, vh: number): Camera {
  if (path.length === 0) return overviewCamera(vw, vh);
  const node = molNodes.find((n) => n.id === path[path.length - 1]);
  if (!node) return overviewCamera(vw, vh);
  const children = molNodes.filter((n) => n.parentId === node.id);
  return children.length > 0 ? cameraForCluster(node, children, vw, vh) : cameraForNode(node, vw, vh);
}

export default function MolecularCanvas({ viewToggle }: { viewToggle: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [camera, setCamera] = useState<Camera>(() => {
    const { vw, vh } = getViewport();
    return overviewCamera(vw, vh);
  });
  // path is a stack of node ids from root down to wherever the camera is
  // currently focused — e.g. [] at the overview, ["skills"] when a hub's
  // cluster view is open, ["skills", "nestjs"] when a sub-node is zoomed
  // in. The current node is always path[path.length - 1].
  const [path, setPath] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const focusedId = path[path.length - 1] ?? null;

  // Full exit to the root overview — wired to the "Root" breadcrumb segment.
  const reset = useCallback(() => {
    const { vw, vh } = getViewport();
    setPath([]);
    setCamera(overviewCamera(vw, vh));
  }, []);

  // One level back — from a sub-node to its parent hub's cluster view, or
  // from a hub's cluster/single-node view straight to root (hubs with no
  // children, like About/Experience/Education, have nothing to pop to in
  // between). Wired to Escape, the footer's "Zoom out" button, and clicking
  // the background.
  const goBack = useCallback(() => {
    const next = path.slice(0, -1);
    const { vw, vh } = getViewport();
    setPath(next);
    setCamera(cameraForPath(next, vw, vh));
  }, [path]);

  // Jump directly to a specific breadcrumb depth (clicking an earlier
  // segment in the trail).
  const jumpToDepth = useCallback(
    (depth: number) => {
      const next = path.slice(0, depth + 1);
      const { vw, vh } = getViewport();
      setPath(next);
      setCamera(cameraForPath(next, vw, vh));
    },
    [path]
  );

  const focusNode = useCallback((node: MolNodeData) => {
    const { vw, vh } = getViewport();
    // Rebuilt from the clicked node's own identity rather than appended to
    // whatever path was open before — self-correcting regardless of where
    // the click came from: a hub always becomes the whole path, a sub-node
    // always becomes [its parent, itself].
    const next = node.kind === "hub" || !node.parentId ? [node.id] : [node.parentId, node.id];
    setPath(next);
    setCamera(cameraForPath(next, vw, vh));
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") goBack();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack]);

  useEffect(() => {
    function onResize() {
      const { vw, vh } = getViewport();
      setCamera(cameraForPath(path, vw, vh));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [path]);

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
      onClick={goBack}
    >
      {/* Fixed header — 3-column grid (name / view toggle / links) so the
          toggle sits inline as part of one cohesive bar instead of floating
          as a separate element on top of it. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-start gap-3 p-5">
        <div
          className="pointer-events-auto justify-self-start rounded-full border px-4 py-2 backdrop-blur-xl"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        >
          <h1
            className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-wide"
            style={{ color: TEXT_DARK, margin: 0 }}
          >
            {siteConfig.name}
          </h1>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: TEXT_MUTED }}>
            {siteConfig.role}
          </p>
        </div>

        <div className="pointer-events-auto justify-self-center">{viewToggle}</div>

        <div className="pointer-events-auto flex items-center justify-self-end gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: TEXT_MUTED }}
          >
            Contact
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: TEXT_MUTED }}
          >
            GitHub
          </a>
          {siteConfig.linkedin && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
              style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: TEXT_MUTED }}
            >
              LinkedIn
            </a>
          )}
          <a
            href={siteConfig.resumeUrl}
            download
            className="rounded-full border px-3 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: ACCENT_TEXT }}
          >
            Resume
          </a>
        </div>
      </header>

      <main aria-label="Interactive skill and project graph" className="contents">
        {/* Visually hidden but screen-reader-audible usage hint — the graph
            has no visible instructions, so this is the only way non-sighted
            users learn the Escape/Root shortcut before they start tabbing
            through nodes. */}
        <p className="sr-only">
          Use Tab to move between nodes and Enter or Space to open one. Press Escape, or the Root
          button, to return to the full view at any time. Prefer a plain scrollable layout instead?
          Use the &quot;Simple View&quot; button in the view switcher at the top of the page.
        </p>

        <PearlAmbient />

        <motion.div
          animate={{ x: camera.x, y: camera.y, scale: camera.scale }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15, ease: "easeOut" }
              : // cameraForNode/overviewCamera differ in x, y, *and* scale, so any
                // transition between them is inherently diagonal — that part's
                // fine. But a spring this close to critically damped (ratio
                // ~1.13) never overshoots, it just crawls the last stretch of
                // the distance slower and slower, so the pan is still visibly
                // creeping over a second after a click. A fixed-duration tween
                // finishes decisively instead of trailing off. An ease-out-heavy
                // curve (previously [0.22, 1, 0.36, 1]) launches at near-full
                // speed instantly, which reads as a snap rather than a glide —
                // a symmetric ease-in-out cubic ramps up and back down instead,
                // and the slightly longer duration gives it room to feel fluid
                // rather than rushed.
                { type: "tween", duration: 0.7, ease: [0.65, 0, 0.35, 1] }
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

          {/* Bobbing nodes drift a few px on the y-axis. onHover is bound to
              that same drifting box, so if a node (or one nearby) keeps
              bobbing while the cursor sits near its edge, the hit-box slides
              in and out from under the cursor and hover flickers on/off.
              Freezing the drift for everyone while anything is hovered keeps
              hit-boxes still for the whole interaction. */}
          {molNodes.map((node, i) => (
            <MolNode
              key={node.id}
              node={node}
              index={i}
              isFocused={focusedId === node.id}
              isDimmed={focusedId !== null && !activeIds.has(node.id)}
              isBobbing={focusedId === null && hoveredId === null}
              isHovered={hoveredId === node.id}
              onHover={setHoveredId}
              onClick={() => focusNode(node)}
            />
          ))}
        </motion.div>
      </main>

      {/* Breadcrumb + back */}
      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center justify-between p-5">
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
            style={{ color: path.length === 0 ? ACCENT_TEXT : TEXT_MUTED }}
          >
            Root
          </button>
          {path.map((id, i) => {
            const node = molNodes.find((n) => n.id === id);
            if (!node) return null;
            const isCurrent = i === path.length - 1;
            return (
              <span key={id} className="flex items-center gap-1.5">
                <span style={{ opacity: 0.4 }}>/</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToDepth(i);
                  }}
                  className="transition-colors"
                  style={{ color: isCurrent ? ACCENT_TEXT : TEXT_MUTED }}
                  aria-current={isCurrent ? "location" : undefined}
                >
                  {node.label}
                </button>
              </span>
            );
          })}
        </div>

        {focusedNode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goBack();
            }}
            className="pointer-events-auto rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl transition-colors"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", color: ACCENT_TEXT }}
          >
            Zoom out (Esc)
          </button>
        )}
      </footer>
    </div>
  );
}
