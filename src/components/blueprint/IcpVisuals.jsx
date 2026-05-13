// Inline SVG visuals for the ICP cards. Replaces stock Unsplash photos with
// theme-aligned geometric graphics. Each visual fills its container via
// preserveAspectRatio="xMidYMid slice", so they crop tastefully across widths.

const COMMON_SVG = {
  viewBox: '0 0 400 130',
  className: 'w-full h-full',
  preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg',
};

// Primary Verticals — stacked column chart, representing different verticals.
export function VerticalsVisual() {
  return (
    <svg {...COMMON_SVG}>
      <defs>
        <linearGradient id="vis-vert" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(215 55% 16%)" />
          <stop offset="100%" stopColor="hsl(215 50% 32%)" />
        </linearGradient>
      </defs>
      <rect width="400" height="130" fill="url(#vis-vert)" />
      <circle cx="370" cy="18" r="60" fill="hsl(174 55% 40%)" opacity="0.22" />
      <g opacity="0.22" fill="#ffffff">
        <rect x="30" y="48" width="32" height="82" rx="4" />
        <rect x="78" y="22" width="32" height="108" rx="4" />
        <rect x="126" y="60" width="32" height="70" rx="4" />
        <rect x="174" y="10" width="32" height="120" rx="4" />
        <rect x="222" y="38" width="32" height="92" rx="4" />
        <rect x="270" y="64" width="32" height="66" rx="4" />
        <rect x="318" y="28" width="32" height="102" rx="4" />
      </g>
      <g stroke="#ffffff" strokeWidth="1" opacity="0.18">
        <line x1="0" y1="100" x2="400" y2="100" />
      </g>
    </svg>
  );
}

// Company Size — connected nodes / team cluster.
export function CompanySizeVisual() {
  return (
    <svg {...COMMON_SVG}>
      <defs>
        <linearGradient id="vis-size" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(174 55% 22%)" />
          <stop offset="100%" stopColor="hsl(174 50% 42%)" />
        </linearGradient>
      </defs>
      <rect width="400" height="130" fill="url(#vis-size)" />
      <circle cx="20" cy="115" r="80" fill="hsl(215 50% 25%)" opacity="0.35" />
      {/* Network lines */}
      <g stroke="#ffffff" strokeWidth="1" opacity="0.32">
        <line x1="80" y1="40" x2="160" y2="70" />
        <line x1="160" y1="70" x2="240" y2="38" />
        <line x1="240" y1="38" x2="320" y2="80" />
        <line x1="160" y1="70" x2="220" y2="100" />
        <line x1="80" y1="40" x2="120" y2="90" />
        <line x1="120" y1="90" x2="220" y2="100" />
      </g>
      {/* Nodes */}
      <g fill="#ffffff">
        <circle cx="80" cy="40" r="9" opacity="0.95" />
        <circle cx="160" cy="70" r="13" opacity="1" />
        <circle cx="240" cy="38" r="8" opacity="0.9" />
        <circle cx="320" cy="80" r="10" opacity="0.95" />
        <circle cx="120" cy="90" r="7" opacity="0.85" />
        <circle cx="220" cy="100" r="9" opacity="0.95" />
      </g>
    </svg>
  );
}

// Geography — abstract topographic / map lines.
export function GeographyVisual() {
  return (
    <svg {...COMMON_SVG}>
      <defs>
        <linearGradient id="vis-geo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(215 60% 20%)" />
          <stop offset="100%" stopColor="hsl(195 55% 40%)" />
        </linearGradient>
      </defs>
      <rect width="400" height="130" fill="url(#vis-geo)" />
      {/* Concentric rings (representing region/HQ + reach) */}
      <g stroke="#ffffff" fill="none" strokeWidth="1.4" opacity="0.4">
        <circle cx="305" cy="55" r="22" />
        <circle cx="305" cy="55" r="42" opacity="0.28" />
        <circle cx="305" cy="55" r="62" opacity="0.16" />
      </g>
      <circle cx="305" cy="55" r="6" fill="hsl(38 92% 60%)" />
      {/* Topographic / road lines */}
      <g stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.32">
        <path d="M0,70 Q90,30 180,70 T380,70" />
        <path d="M0,100 Q100,60 200,95 T400,90" opacity="0.7" />
        <path d="M0,40 Q120,10 220,38 T400,30" opacity="0.55" />
      </g>
      {/* Grid dots */}
      <g fill="#ffffff" opacity="0.18">
        {Array.from({ length: 9 }).map((_, x) =>
          Array.from({ length: 4 }).map((_, y) => (
            <circle key={`${x}-${y}`} cx={20 + x * 45} cy={20 + y * 32} r="1.2" />
          ))
        )}
      </g>
    </svg>
  );
}

// Qualification Signals — shield with verification rings.
export function SignalsVisual() {
  return (
    <svg {...COMMON_SVG}>
      <defs>
        <linearGradient id="vis-sig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(222 47% 12%)" />
          <stop offset="100%" stopColor="hsl(215 50% 30%)" />
        </linearGradient>
      </defs>
      <rect width="400" height="130" fill="url(#vis-sig)" />
      {/* Concentric radar arcs */}
      <g stroke="#ffffff" fill="none" strokeWidth="1.3" opacity="0.32">
        <path d="M 40,130 A 70,70 0 0 1 180,130" />
        <path d="M 0,130 A 110,110 0 0 1 220,130" opacity="0.75" />
        <path d="M -40,130 A 150,150 0 0 1 260,130" opacity="0.55" />
      </g>
      {/* Shield outline */}
      <g transform="translate(280, 25)">
        <path
          d="M40 0 L80 12 V40 C80 64 60 78 40 86 C20 78 0 64 0 40 V12 Z"
          fill="hsl(174 55% 42%)"
          opacity="0.85"
        />
        <path
          d="M40 0 L80 12 V40 C80 64 60 78 40 86 C20 78 0 64 0 40 V12 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <path
          d="M22 42 L36 56 L60 30"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      {/* Signal pings */}
      <g fill="#ffffff" opacity="0.5">
        <circle cx="80" cy="40" r="2" />
        <circle cx="130" cy="70" r="2.5" />
        <circle cx="180" cy="50" r="2" />
        <circle cx="220" cy="90" r="2" />
      </g>
    </svg>
  );
}

export const ICP_VISUALS = [VerticalsVisual, CompanySizeVisual, GeographyVisual, SignalsVisual];
