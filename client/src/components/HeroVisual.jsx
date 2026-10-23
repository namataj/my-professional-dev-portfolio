import { motion, useReducedMotion } from 'motion/react';
import { HeartPulse } from 'lucide-react';
import Portrait from './Portrait.jsx';

// The hero's signature: a heartbeat trace that turns into circuit lines,
// connecting the portrait to the core stack. It draws once on page load.

const VB_W = 500;
const VB_H = 540;
const pct = (v, total) => `${(v / total) * 100}%`;

// Each chip sits at the end of a trace. x/y are viewBox coordinates.
const chips = [
  { label: 'React', x: 90, y: 30, color: '#61DAFB' },
  { label: 'JavaScript', x: 420, y: 30, color: '#F7DF1E' },
  { label: 'Node.js', x: 476, y: 250, color: '#5FA04E' },
  { label: 'MySQL', x: 408, y: 500, color: '#4479A1' },
  { label: 'Selenium', x: 64, y: 434, color: '#43B02A' },
];

// Photo frame (4:3, matching the photo so nothing is cropped away).
const PHOTO = { x: 24, y: 64, w: 452, h: 339 };

// Main line: flat → heartbeat → flat, running under the portrait.
const pulsePath = 'M0 466 H112 L128 438 L146 506 L166 400 L184 466 H330 V500 H360';
// Branches from the main line / portrait out to each chip.
const branches = [
  'M64 466 V450',               // to Selenium
  'M270 466 V430 H476 V272',    // to Node.js
  'M134 64 V30 H128',           // photo → React
  'M372 64 V30 H376',           // photo → JavaScript
];
const solderPoints = [[64, 466], [270, 466], [134, 64], [372, 64]];

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const draw = (delay) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.4, delay, ease: 'easeInOut' },
        };

  return (
    <div className="relative mx-auto aspect-[500/540] w-full max-w-[700px]">
      {/* Portrait frame */}
      <div
        className="absolute overflow-hidden rounded-[22px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(37,99,255,0.55)]"
        style={{ left: pct(PHOTO.x, VB_W), top: pct(PHOTO.y, VB_H), width: pct(PHOTO.w, VB_W), height: pct(PHOTO.h, VB_H) }}
      >
        <Portrait />
      </div>

      {/* Traces */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trace-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2563FF" />
            <stop offset="1" stopColor="#1FD1E8" />
          </linearGradient>
        </defs>
        {branches.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#1FD1E8"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...draw(0.9 + i * 0.12)}
          />
        ))}
        <motion.path
          d={pulsePath}
          fill="none"
          stroke="url(#trace-g)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw(0.15)}
        />
        {/* solder points */}
        {solderPoints.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#1FD1E8" />
        ))}
      </svg>

      {/* Tech chips */}
      {chips.map((c, i) => (
        <span
          key={c.label}
          className="hero-chip absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/15 bg-navy-800/95 px-2.5 py-1.5 font-display text-[0.78rem] font-semibold text-white shadow-lg sm:text-sm"
          style={{ left: pct(c.x, VB_W), top: pct(c.y, VB_H), animationDelay: `${i * 0.7}s` }}
        >
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ background: c.color }} />
          {c.label}
        </span>
      ))}

      {/* Healthcare marker */}
      <span
        className="absolute flex -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-3 py-2 font-display text-[0.8rem] font-semibold text-navy-900 shadow-xl sm:text-sm"
        style={{ left: pct(170, VB_W), top: pct(PHOTO.y + PHOTO.h, VB_H) }}
      >
        <HeartPulse size={16} className="text-electric" aria-hidden="true" />
        Health informatics
      </span>

      <style>{`
        @keyframes chip-float { 0%,100% { margin-top: 0 } 50% { margin-top: -6px } }
        .hero-chip { animation: chip-float 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-chip { animation: none; } }
      `}</style>
    </div>
  );
}
