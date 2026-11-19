import React, { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import { useLang } from "../../i18n/LanguageContext"

/**
 * A number that settles onto its value the first time it scrolls into view.
 */
const CountUp = ({ value, suffix = "", className = "" }) => {
  const ref = useRef(null)
  const { n } = useLang()
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const count = useMotionValue(reduceMotion ? value : 0)
  const text = useTransform(count, (v) => `${n(Math.round(v))}${suffix}`)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(count, value, { type: "spring", duration: 1.1, bounce: 0 })
    return () => controls.stop()
  }, [inView, reduceMotion, value, count])

  return (
    <motion.span ref={ref} className={`num ${className}`}>
      {text}
    </motion.span>
  )
}

export default CountUp
