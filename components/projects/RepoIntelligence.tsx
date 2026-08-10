import { GOLD_BRIGHT } from "@/lib/experience-theme";

const COMMIT_BARS = [3, 5, 2, 7, 6, 9, 4, 8, 5, 10, 6, 7];
const LANGUAGES = [
  { label: "TypeScript", pct: 52 },
  { label: "Python", pct: 28 },
  { label: "Java", pct: 14 },
  { label: "Other", pct: 6 },
];

export default function RepoIntelligence() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-[#c9a227]/40 bg-white/[0.03] p-5 backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[#f0cf6b]">
          Active Repository Intelligence
        </p>
        <span className="rounded-full border border-[#c9a227]/50 px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#c9a227] uppercase">
          Sample data
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-[#e8b923]/70">
        flagship-project &middot; main branch
      </p>

      <div className="mt-4">
        <p className="font-mono text-[10px] tracking-wide text-[#e8b923]/60 uppercase">
          Commit frequency (last 90 days)
        </p>
        <div className="mt-2 flex h-10 items-end gap-1">
          {COMMIT_BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${(h / 10) * 100}%`,
                background: `linear-gradient(180deg, ${GOLD_BRIGHT}, rgba(201,162,39,0.3))`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mono text-[10px] tracking-wide text-[#e8b923]/60 uppercase">
          Languages
        </p>
        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-black/40">
          {LANGUAGES.map((lang, i) => (
            <div
              key={lang.label}
              style={{
                width: `${lang.pct}%`,
                backgroundColor: GOLD_BRIGHT,
                opacity: 1 - i * 0.22,
              }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
          {LANGUAGES.map((lang) => (
            <span key={lang.label} className="font-mono text-[10px] text-[#e8b923]/70">
              {lang.label} {lang.pct}%
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-[#c9a227]/30 bg-black/30 px-3 py-2 font-mono text-[10px] leading-relaxed text-[#e8b923]/60">
        Illustrative preview &mdash; wires up to live GitHub data once flagship
        project repos are public.
      </p>
    </div>
  );
}
