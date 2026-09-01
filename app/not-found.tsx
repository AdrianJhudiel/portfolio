import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: "linear-gradient(180deg, var(--graph-bg-from), var(--graph-bg-to))" }}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-xl font-semibold"
        style={{ color: "var(--graph-text-dark)" }}
      >
        Page not found
      </h1>
      <p className="max-w-sm text-sm" style={{ color: "var(--graph-text-muted)" }}>
        Whatever you were looking for isn&apos;t here.
      </p>
      <Link
        href="/"
        className="rounded-full px-4 py-2 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
        style={{ background: "var(--graph-accent-text)" }}
      >
        Back to home
      </Link>
    </div>
  );
}
