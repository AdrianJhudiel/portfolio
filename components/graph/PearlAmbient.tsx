const PARTICLE_COUNT = 30;

// Deterministic pseudo-random placement (integer modular arithmetic only)
// so server and client render identical output — avoids hydration mismatches.
function particleAt(i: number) {
  const x = ((i * 53) % 97) / 97;
  const y = ((i * 71) % 89) / 89;
  const size = 1.5 + (i % 3);
  const delay = (i % 7) * 0.7;
  const duration = 5 + (i % 5) * 0.9;
  return { x: x * 100, y: y * 100, size, delay, duration };
}

export default function PearlAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(129,140,248,0.06), transparent 70%)",
        }}
      />
      <div
        className="animate-breathe absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const p = particleAt(i);
        return (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "#94a3b8",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow: "0 0 3px 1px rgba(148,163,184,0.4)",
            }}
          />
        );
      })}
    </div>
  );
}
