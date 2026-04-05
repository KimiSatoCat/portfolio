"use client";

export default function SumiBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="sumi-turbulence">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
            />
            <feDisplacementMap in="SourceGraphic" scale="80" />
          </filter>
        </defs>
        <g filter="url(#sumi-turbulence)">
          <circle cx="300" cy="400" r="200" fill="#f0ede8" />
          <circle cx="700" cy="300" r="150" fill="#b89a6a" />
          <circle cx="500" cy="700" r="250" fill="#f0ede8" />
          <ellipse cx="200" cy="800" rx="180" ry="100" fill="#b89a6a" />
        </g>
      </svg>
    </div>
  );
}
