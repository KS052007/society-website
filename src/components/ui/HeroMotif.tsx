export interface HeroMotifProps {
  className?: string;
}

export function HeroMotif({ className = '' }: HeroMotifProps) {
  return (
    <div
      className={`relative w-full h-full select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG ClipPath Definition — smooth, continuous organic concave curve */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="gardenEditorialMask" clipPathUnits="objectBoundingBox">
            {/*
              Smooth C1 continuous concave curve:
              - Enters top at (0.22, 0)
              - Sweeps left to apex at (0.04, 0.48)
              - Sweeps down-right to (0.16, 1.0)
              - Fills to (1.0, 1.0) and (1.0, 0.0)
            */}
            <path d="M 0.22,0 C 0.10,0.15 0.04,0.30 0.04,0.48 C 0.04,0.66 0.08,0.84 0.16,1.0 L 1.0,1.0 L 1.0,0.0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle decorative orbital arcs — thin, barely visible */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        fill="none"
        style={{ zIndex: 1 }}
      >
        {/* Brand orange fine orbital arc */}
        <path
          d="M 15 780 C 65 620 120 460 210 340 C 300 200 420 90 600 10"
          stroke="var(--c-orange)"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Brand orange accent dot */}
        <circle cx="210" cy="340" r="4" fill="var(--c-orange)" fillOpacity="0.85" />
        <circle cx="210" cy="340" r="9" stroke="var(--c-orange)" strokeWidth="1" strokeOpacity="0.22" fill="none" />

        {/* Deep teal secondary fine orbital arc */}
        <path
          d="M 75 800 C 140 650 200 510 300 380 C 400 240 530 120 710 25"
          stroke="var(--c-teal-dark)"
          strokeWidth="1"
          strokeOpacity="0.18"
          fill="none"
        />
      </svg>

      {/* Main Photograph — clipped by organic concave mask */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: 'url(#gardenEditorialMask)', zIndex: 2 }}
      >
        <img
          src="/assets/images/image.png"
          alt="IIT Madras BS Academic Building Courtyard Garden"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            objectPosition: '50% 38%',
            filter: 'contrast(1.02) saturate(1.03)',
          }}
          loading="eager"
          decoding="async"
        />

        {/* Subtle left-edge fade so photo blends into white bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 18%),' +
              'linear-gradient(135deg, rgba(255, 191, 105, 0.05) 0%, transparent 55%)',
          }}
        />
      </div>
    </div>
  );
}
