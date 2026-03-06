\"use client\";

import { useEffect, useState } from \"react\";

type RiskZone = {
  id: string;
  label: string;
  level: \"low\" | \"medium\" | \"high\";
  x: number;
  y: number;
};

const MOCK_ZONES: RiskZone[] = [
  { id: \"1\", label: \"Transit Hub\", level: \"medium\", x: 18, y: 36 },
  { id: \"2\", label: \"Nightlife District\", level: \"high\", x: 58, y: 48 },
  { id: \"3\", label: \"Quiet Residential\", level: \"low\", x: 72, y: 26 }
];

export function ThreatMap() {
  const [zones, setZones] = useState<RiskZone[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setZones(MOCK_ZONES), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=\"relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/70\">
      <div className=\"absolute inset-0 opacity-40\">
        <div className=\"grid h-full w-full grid-cols-8 grid-rows-4\">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className=\"border-[0.5px] border-slate-800/60 bg-slate-950/60\"
            />
          ))}
        </div>
      </div>

      <div className=\"absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(248,113,113,0.25),transparent_55%)]\" />

      <div className=\"relative z-10 flex h-full flex-col justify-between p-3.5\">
        <div className=\"flex items-center justify-between text-xs text-slate-300\">
          <span className=\"font-semibold tracking-wide uppercase text-[0.65rem]\">
            Global Threat Intelligence
          </span>
          <span className=\"inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-0.5 text-[0.65rem] text-slate-400 border border-slate-800\">
            <span className=\"h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow-primary\" />
            Live Mesh
          </span>
        </div>

        <div className=\"relative flex-1\">
          {zones.map((zone) => (
            <button
              key={zone.id}
              type=\"button\"
              className=\"absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-[0.6rem]\"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              <span
                className={`mb-1 h-3 w-3 rounded-full ${
                  zone.level === \"high\"
                    ? \"bg-red-500 shadow-[0_0_20px_rgba(248,113,113,0.8)]\"
                    : zone.level === \"medium\"
                    ? \"bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.7)]\"
                    : \"bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]\"
                }`}
              />
              <span className=\"rounded-full bg-slate-950/80 px-2 py-0.5 text-slate-200 border border-slate-800/80\">
                {zone.label}
              </span>
            </button>
          ))}
        </div>

        <div className=\"flex items-center justify-between text-[0.65rem] text-slate-400\">
          <span>Signals are anonymous and aggregated.</span>
          <div className=\"flex items-center gap-2\">
            <div className=\"flex items-center gap-1\">
              <span className=\"h-1.5 w-1.5 rounded-full bg-emerald-400\" />
              <span>Low</span>
            </div>
            <div className=\"flex items-center gap-1\">
              <span className=\"h-1.5 w-1.5 rounded-full bg-amber-400\" />
              <span>Med</span>
            </div>
            <div className=\"flex items-center gap-1\">
              <span className=\"h-1.5 w-1.5 rounded-full bg-red-500\" />
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

