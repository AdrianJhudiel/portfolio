import type { CSSProperties } from "react";
import type { ProjectFeature } from "@/lib/experience-data";

// Shared between the graph's zoomed-in project nodes (MolNode.tsx) and the
// Simple View project cards — both render the same "✓ feature" checklist,
// just with different sizing/layout, so only the structure lives here and
// callers control presentation via className/style. The checkmark itself
// takes its own optional color so it can pop against the (deliberately more
// muted) feature label text instead of blurring into one flat-gray block.
export default function FeatureList({
  features,
  className,
  style,
  itemClassName,
  itemStyle,
  checkClassName,
  checkStyle,
}: {
  features: ProjectFeature[];
  className?: string;
  style?: CSSProperties;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  checkClassName?: string;
  checkStyle?: CSSProperties;
}) {
  return (
    <ul className={className} style={{ listStyle: "none", margin: 0, padding: 0, ...style }}>
      {features.map((f) => (
        <li key={f.label} className={itemClassName} style={itemStyle}>
          <span aria-hidden="true" className={checkClassName} style={{ fontWeight: 700, ...checkStyle }}>
            ✓{" "}
          </span>
          {f.label}
        </li>
      ))}
    </ul>
  );
}
