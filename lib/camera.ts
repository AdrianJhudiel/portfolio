import { WORLD_WIDTH, WORLD_HEIGHT, type MolNode } from "./molecular-graph";

export type Camera = { x: number; y: number; scale: number };

function fitPoint(cx: number, cy: number, targetSize: number, vw: number, vh: number, fillRatio: number): Camera {
  const scale = (Math.min(vw, vh) * fillRatio) / targetSize;
  return { scale, x: vw / 2 - cx * scale, y: vh / 2 - cy * scale };
}

function fitBounds(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  vw: number,
  vh: number,
  padding: number
): Camera {
  const bw = Math.max(maxX - minX, 1);
  const bh = Math.max(maxY - minY, 1);
  const scale = Math.min(vw / bw, vh / bh) * padding;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return { scale, x: vw / 2 - cx * scale, y: vh / 2 - cy * scale };
}

/** Zoom tightly into a single node, filling most of the viewport. */
export function cameraForNode(node: MolNode, vw: number, vh: number): Camera {
  return fitPoint(node.x, node.y, node.size, vw, vh, 0.72);
}

/** Zoom to frame a hub together with its satellite sub-nodes. */
export function cameraForCluster(hub: MolNode, children: MolNode[], vw: number, vh: number): Camera {
  if (children.length === 0) return cameraForNode(hub, vw, vh);

  const all = [hub, ...children];
  const minX = Math.min(...all.map((n) => n.x - n.size / 2));
  const maxX = Math.max(...all.map((n) => n.x + n.size / 2));
  const minY = Math.min(...all.map((n) => n.y - n.size / 2));
  const maxY = Math.max(...all.map((n) => n.y + n.size / 2));

  return fitBounds(minX, minY, maxX, maxY, vw, vh, 0.85);
}

/** The full molecular web, fit to viewport. */
export function overviewCamera(vw: number, vh: number): Camera {
  return fitBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT, vw, vh, 0.92);
}
