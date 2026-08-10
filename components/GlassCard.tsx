import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`arch-panel rounded-[32px] p-8 ${className}`}>
      {children}
    </div>
  );
}
