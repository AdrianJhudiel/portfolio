export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "linear-gradient(180deg, var(--graph-bg-from), var(--graph-bg-to))" }}
    >
      <div
        className="animate-spin-slow h-10 w-10 rounded-full border-2 border-t-transparent"
        style={{ borderColor: "var(--graph-accent)", borderTopColor: "transparent" }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
