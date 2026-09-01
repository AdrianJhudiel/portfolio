"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: "linear-gradient(180deg, var(--graph-bg-from), var(--graph-bg-to))" }}
    >
      <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold" style={{ color: "var(--graph-text-dark)" }}>
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm" style={{ color: "var(--graph-text-muted)" }}>
        Sorry about that — the page hit an unexpected error. You can try again, or reach out directly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-full px-4 py-2 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
          style={{ background: "var(--graph-accent-text)" }}
        >
          Try again
        </button>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors"
          style={{ borderColor: "var(--graph-node-border)", color: "var(--graph-text-muted)" }}
        >
          Contact
        </a>
      </div>
    </div>
  );
}
