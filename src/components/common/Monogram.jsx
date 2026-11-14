import React from "react"

/**
 * The rail mark: a hand-drawn "M" whose stroke redraws itself in a loop.
 * A faint base copy stays underneath so the mark never disappears
 * mid-animation — the moving stroke reads as a highlight sweeping the letter.
 */
const Monogram = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 32"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M3 29 L3 4 L14 21 L25 4 L25 29"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.28"
    />
    <path
      d="M3 29 L3 4 L14 21 L25 4 L25 29"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="100"
      className="monogram-path"
    />
  </svg>
)

export default Monogram
