/**
 * Shared motion vocabulary — Apple-style springs.
 *
 * Springs are used instead of fixed-duration easing because they are
 * interruptible and velocity-aware: new input only changes the target,
 * so motion stays continuous.
 *
 * `duration` here is Apple's "response" (how quickly the value reaches its
 * target), `bounce` is derived from damping ratio: 0 = critically damped.
 */
export const spring = {
  // Default for almost everything: smooth settle, no overshoot.
  default: { type: "spring", duration: 0.4, bounce: 0 },
  // Fast UI feedback (presses, segmented pills, small controls).
  snappy: { type: "spring", duration: 0.3, bounce: 0 },
  // Only for motion that carried momentum (a flick, a throw, a drag release).
  momentum: { type: "spring", duration: 0.4, bounce: 0.2 },
}

/**
 * Project where a gesture will come to rest, using the same exponential
 * deceleration model as scroll views (Apple's "Designing Fluid Interfaces").
 *
 * @param {number} velocity  release velocity in px/s
 * @param {number} rate      deceleration rate (0.998 = normal scroll feel)
 * @returns {number} distance in px the gesture would still travel
 */
export const project = (velocity, rate = 0.998) =>
  ((velocity / 1000) * rate) / (1 - rate)

/**
 * Entrance for content that scrolls into view: a short rise on a critically
 * damped spring. The stagger delay lives on the entry transition only (and is
 * capped), so it never delays hover/press responses or late items on long
 * lists. Spread the result onto a `motion.*` element.
 */
export const rise = (index = 0, { max = 5, step = 0.06, distance = 24 } = {}) => ({
  initial: { opacity: 0, y: distance },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { ...spring.default, delay: Math.min(index, max) * step },
  },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
})
