import React, { useId } from "react"

/**
 * Rotating badge — text laid on a circular path, slowly turning like the
 * reference site's tech orbit. Pauses on hover.
 */
const OrbitRing = ({ items = [], size = 200, className = "", duration = 26 }) => {
  const id = useId().replace(/:/g, "")
  const label = items.join("  ·  ")
  // A closed path so the text loops seamlessly.
  const path = `M ${size / 2} ${size / 2} m ${-(size / 2 - 14)} 0 a ${size / 2 - 14} ${
    size / 2 - 14
  } 0 1 1 ${size - 28} 0 a ${size / 2 - 14} ${size / 2 - 14} 0 1 1 ${-(size - 28)} 0`

  return (
    // The wrapper stretches to the parent and keeps a square ratio, so the
    // circular path stays perfectly centred on whatever sits behind it.
    <div className={`group relative aspect-square w-full ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full animate-[spin_var(--orbit-dur)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--orbit-dur": `${duration}s` }}
        aria-hidden="true"
      >
        <defs>
          <path id={`orbit-${id}`} d={path} />
        </defs>
        <text
          fill="currentColor"
          className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
        >
          <textPath href={`#orbit-${id}`} startOffset="0%">
            {label}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default OrbitRing
