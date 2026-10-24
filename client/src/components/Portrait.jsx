import { site } from '../config/site.js';
import photo from '../assets/james-namata.jpg';

// To change the photo, replace client/src/assets/james-namata.jpg
// (a landscape 4:3 image around 1200 x 900 pixels works best, so the
// desk and workspace stay visible).
// Setting site.portraitSrc in config/site.js overrides it.
// If no photo is set, a neutral placeholder is shown instead.

export default function Portrait({ className = '', tone = 'dark' }) {
  const src = site.portraitSrc || photo;
  if (src) {
    return (
      <img
        src={src}
        alt={`Portrait of ${site.name}`}
        className={`h-full w-full object-cover object-center ${className}`}
        decoding="async"
        fetchPriority="high"
      />
    );
  }
  const dark = tone === 'dark';
  return (
    <div
      role="img"
      aria-label="Portrait placeholder"
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden ${
        dark ? 'bg-navy-800' : 'bg-cloud'
      } ${className}`}
    >
      {/* Simple silhouette so the layout reads correctly before a photo is added */}
      <svg viewBox="0 0 200 220" className={`absolute bottom-0 w-[78%] ${dark ? 'text-navy-700' : 'text-[#D3D9E3]'}`} aria-hidden="true">
        <circle cx="100" cy="78" r="44" fill="currentColor" />
        <path d="M18 220c4-52 40-86 82-86s78 34 82 86Z" fill="currentColor" />
        <text x="100" y="92" textAnchor="middle" fontSize="38" fontWeight="700" fontFamily="Schibsted Grotesk, sans-serif" fill={dark ? 'rgba(255,255,255,0.75)' : 'rgba(10,22,48,0.6)'}>
          JN
        </text>
      </svg>
    </div>
  );
}
