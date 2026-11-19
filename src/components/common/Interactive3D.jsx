import React, { useRef, useState } from "react"
import { motion, useAnimationControls, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useLang } from "../../i18n/LanguageContext"

/**
 * Interaction layer for the 3D objects.
 *
 * - The object drifts toward the pointer (a spring-smoothed translation,
 *   depth = how many px it may travel), so it feels attached to the cursor.
 * - Clicking makes it spin **in place**: a full rotation in the plane of the
 *   screen (Z axis) that accumulates, so several clicks keep adding turns.
 *   The Z axis is deliberate: rotating on Y would show the back of the
 *   artwork and read as a glitch rather than a spin.
 *
 * The idle animation of the object itself lives on an inner element, so the
 * two never fight over the same transform channel.
 */
const Interactive3D = ({
  children,
  className = "",
  depth = 28,
  spin = 360,
  duration = 1.15,
  hint,
  ...rest
}) => {
  const ref = useRef(null)
  const { t } = useLang()
  const reduceMotion = useReducedMotion()
  const controls = useAnimationControls()
  const turns = useRef(0)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 })

  const handlePointerMove = (e) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // -1..1 from the centre of the element
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)) * depth)
    y.set(Math.max(-1, Math.min(1, dy)) * depth)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const handleClick = () => {
    if (reduceMotion) return
    turns.current += spin
    controls.start({
      rotateZ: turns.current,
      scale: [1, 1.06, 1],
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    })
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      animate={controls}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      whileHover={reduceMotion ? {} : { scale: 1.03 }}
      whileTap={reduceMotion ? {} : { scale: 0.96 }}
      className={`cursor-pointer ${className}`}
      {...rest}
    >
      {children}

      {/* Hint — appears on hover, tells the visitor the object is draggable */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-hair bg-paper/90 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-mute backdrop-blur"
      >
        {hint ?? t("spinHint")}
      </motion.span>
    </motion.div>
  )
}

export default Interactive3D
