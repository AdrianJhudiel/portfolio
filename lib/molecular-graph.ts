import { skillNodes, projects, type Project } from "./experience-data";
import { singleNodeContent, type RootKind } from "./graph-data";

export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 1500;

export type MolNode = {
  id: string;
  kind: "hub" | "sub";
  parentId?: RootKind;
  label: string;
  x: number;
  y: number;
  size: number;
  detail?: string;
  subtitle?: string;
  project?: Project;
};

function ring(cx: number, cy: number, r: number, count: number, startAngle = -90) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((startAngle + (i * 360) / count) * Math.PI) / 180;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

const HUBS: { id: RootKind; label: string; x: number; y: number; size: number }[] = [
  { id: "about", label: "About Me", x: 480, y: 460, size: 190 },
  { id: "skills", label: "Skills", x: 1220, y: 780, size: 220 },
  { id: "projects", label: "Projects", x: 1900, y: 460, size: 200 },
  { id: "experience", label: "Experience", x: 620, y: 1180, size: 190 },
  { id: "education", label: "Education", x: 1780, y: 1180, size: 190 },
];

const skillsHub = HUBS.find((h) => h.id === "skills")!;
const projectsHub = HUBS.find((h) => h.id === "projects")!;

const skillPositions = ring(skillsHub.x, skillsHub.y, 260, skillNodes.length);
const projectPositions = ring(projectsHub.x, projectsHub.y, 250, projects.length);

export const molNodes: MolNode[] = [
  ...HUBS.map((h) => ({
    id: h.id,
    kind: "hub" as const,
    label: h.label,
    x: h.x,
    y: h.y,
    size: h.size,
    detail:
      h.id === "about" || h.id === "experience" || h.id === "education"
        ? singleNodeContent[h.id]
        : undefined,
    subtitle:
      h.id === "skills"
        ? `${skillNodes.length} core skills`
        : h.id === "projects"
          ? `${projects.length} shipped projects`
          : undefined,
  })),
  ...skillNodes.map((s, i) => ({
    id: s.id,
    kind: "sub" as const,
    parentId: "skills" as RootKind,
    label: s.label,
    x: skillPositions[i].x,
    y: skillPositions[i].y,
    size: 85,
    detail: s.detail,
  })),
  ...projects.map((p, i) => ({
    id: p.id,
    kind: "sub" as const,
    parentId: "projects" as RootKind,
    label: p.title,
    x: projectPositions[i].x,
    y: projectPositions[i].y,
    size: 90,
    project: p,
  })),
];

export const bonds: [string, string][] = [
  ["skills", "about"],
  ["skills", "projects"],
  ["skills", "experience"],
  ["skills", "education"],
  ["about", "experience"],
  ["projects", "education"],
  ...skillNodes.map((s) => ["skills", s.id] as [string, string]),
  ...projects.map((p) => ["projects", p.id] as [string, string]),
];
