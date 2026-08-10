export default function AmbientLight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--background)]"
    >
      {/* Ceiling light: soft white/cyan emission from top-center, corridor-style */}
      <div className="animate-ambient-drift absolute top-[-10rem] left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.9),rgba(0,210,255,0.14)_45%,transparent_72%)] blur-3xl" />
      {/* Directional ambient shadow for architectural depth */}
      <div className="absolute right-[-10rem] bottom-[-10rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(30,41,59,0.05),transparent_70%)] blur-3xl" />
      <div className="absolute top-1/2 left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.08),transparent_70%)] blur-3xl" />
      <div className="bg-grid-arch absolute inset-0" />
    </div>
  );
}
