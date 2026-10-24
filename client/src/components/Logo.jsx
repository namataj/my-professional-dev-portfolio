import { Link } from 'react-router-dom';

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="James Namata, home">
      {/* JN monogram with code brackets, redrawn from the brand logo as a vector so it stays crisp at any size. */}
      <svg
        viewBox="0 0 100 60"
        className="h-9 w-auto shrink-0 drop-shadow-[0_0_6px_rgba(31,209,232,0.35)] transition-[filter] duration-200 group-hover:drop-shadow-[0_0_10px_rgba(31,209,232,0.6)] sm:h-10"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="jn-j" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#C9D6EA" />
          </linearGradient>
          <linearGradient id="jn-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563FF" />
            <stop offset="1" stopColor="#1FD1E8" />
          </linearGradient>
          <linearGradient id="jn-arc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#1FD1E8" />
            <stop offset="1" stopColor="#2563FF" />
          </linearGradient>
        </defs>

        {/* Swooshes */}
        <path d="M10 13C22 4 42 3 50 13" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M46 31C26 29 4 37 4 47C4 54 13 56 22 53" fill="none" stroke="url(#jn-arc)" strokeWidth="3.5" strokeLinecap="round" />

        {/* J */}
        <path d="M21 14V37Q21 47 11 47H8" fill="none" stroke="url(#jn-j)" strokeWidth="8.5" />

        {/* N */}
        <path d="M30 50V14H39L52 35V14H61V50H52L39 29V50Z" fill="url(#jn-blue)" />

        {/* Pixels */}
        <rect x="63" y="10" width="4" height="4" fill="#2563FF" />
        <rect x="69" y="5" width="4" height="4" fill="#1FD1E8" opacity="0.8" />
        <rect x="75" y="0" width="5" height="5" fill="#1FD1E8" />
        <rect x="76" y="8" width="3" height="3" fill="#1FD1E8" opacity="0.6" />

        {/* </> */}
        <path
          d="M74 31L67 39L74 47M84 28L78 50M88 31L95 39L88 47"
          fill="none"
          stroke="url(#jn-blue)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
          James <span className="text-cyan">Namata</span>
        </span>
        <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-steel sm:text-[0.6rem] sm:tracking-[0.22em]">
          Software Engineer
        </span>
      </span>
    </Link>
  );
}
