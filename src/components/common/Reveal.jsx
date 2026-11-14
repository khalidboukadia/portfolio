import React from "react"
import { motion } from "framer-motion"
import { spring } from "../../lib/motion"

/**
 * Scroll-reveal wrapper. Content rises once into place and stays there.
 */
const Reveal = ({ children, delay = 0, distance = 26, className = "", as = "div" }) => {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ ...spring.default, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

export default Reveal
