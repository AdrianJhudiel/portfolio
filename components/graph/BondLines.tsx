import { molNodes, bonds, WORLD_WIDTH, WORLD_HEIGHT } from "@/lib/molecular-graph";
import { BOND_COLOR, ACCENT } from "@/lib/pearl-theme";

export default function BondLines({ hoveredId }: { hoveredId: string | null }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 overflow-visible"
      width={WORLD_WIDTH}
      height={WORLD_HEIGHT}
      viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
    >
      {bonds.map(([a, b]) => {
        const na = molNodes.find((n) => n.id === a);
        const nb = molNodes.find((n) => n.id === b);
        if (!na || !nb) return null;
        const isLinked = hoveredId === a || hoveredId === b;
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={isLinked ? ACCENT : BOND_COLOR}
            strokeWidth={isLinked ? 4.5 : 2.6}
            strokeOpacity={isLinked ? 0.9 : 0.55}
            style={{
              filter: isLinked ? `drop-shadow(0 0 6px ${ACCENT})` : "none",
              transition: "stroke 0.25s ease, stroke-width 0.25s ease, stroke-opacity 0.25s ease",
            }}
          />
        );
      })}
    </svg>
  );
}
