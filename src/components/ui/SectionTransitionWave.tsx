export interface SectionTransitionWaveProps {
  className?: string;
}

/**
 * SectionTransitionWave
 * 
 * Reusable organic wave transition retrieved from Stitch project Amartya.
 * Seamlessly merges the hero section's ambient radial background and campus photo
 * into the pure white (#ffffff) About section, eliminating any blank gaps.
 * 
 * Features:
 * - Two-tier smooth white fluid wave curves
 * - Multi-color brand gradient contour line (#2ec4b6 -> #ffbf69 -> #ff9f1c)
 * - Scalable responsive viewBox (1440x220) with zero horizontal overflow
 */
export function SectionTransitionWave({ className = '' }: SectionTransitionWaveProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 220"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Secondary soft-fill wave for layered organic depth */}
        <path
          d="M0,120 C360,210 680,80 1020,150 C1240,195 1380,140 1440,160 L1440,220 L0,220 Z"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Primary solid white fill wave dividing Hero & About section */}
        <path
          d="M0,80 C320,180 520,20 840,110 C1120,190 1320,80 1440,120 L1440,220 L0,220 Z"
          fill="#ffffff"
        />

        {/* Subtle multi-colour brand gradient contour arc precisely riding the crest */}
        <path
          d="M0,80 C320,180 520,20 840,110 C1120,190 1320,80 1440,120"
          stroke="url(#stitch-mint-fade)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="stitch-mint-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ec4b6" stopOpacity="0" />
            <stop offset="35%" stopColor="#2ec4b6" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#ffbf69" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
