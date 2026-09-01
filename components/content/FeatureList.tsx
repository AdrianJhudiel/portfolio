import type { CSSProperties } from "react";
import type { ProjectFeature } from "@/lib/experience-data";

// Shared between the graph's zoomed-in project nodes (MolNode.tsx) and the
// Simple View project cards — both render the same "✓ feature" checklist,
// just with different sizing/layout, so only the structure lives here and
// callers control presentation via className/style.
export default function FeatureList({
  features,
  className,
  style,
  itemClassName,
  itemStyle,
}: {
  features: ProjectFeature[];
  className?: string;
  style?: CSSProperties;
  itemClassName?: string;
  itemStyle?: CSSProperties;
}) {
  return (
    <ul className={className} style={{ listStyle: "none", margin: 0, padding: 0, ...style }}>
      {features.map((f) => (
        <li key={f.label} className={itemClassName} style={itemStyle}>
          <span aria-hidden="true">✓ </span>
          {f.label}
        </li>
      ))}
    </ul>
  );
}
