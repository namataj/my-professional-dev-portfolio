import { Link } from 'react-router-dom';

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="James Namata, home">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563FF" />
            <stop offset="1" stopColor="#1FD1E8" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#12213F" />
        <path
          d="M8 36h12l5-12 7 22 6-16 4 6h14"
          fill="none"
          stroke="url(#logo-g)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-white">James Namata</span>
    </Link>
  );
}
