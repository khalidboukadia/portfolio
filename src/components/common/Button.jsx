import React from "react"
import { motion } from "framer-motion"
import { spring } from "../../lib/motion"

/**
 * Buttons follow the reference site: a solid black pill, an outlined pill,
 * or a bare text link with a moving arrow.
 */
const Button = ({
  variant = "dark",
  href,
  onClick,
  children,
  className = "",
  arrow = false,
  icon,
  ...props
}) => {
  const classes = {
    dark: "btn-dark",
    outline: "btn-outline",
    ghost: "btn-ghost",
  }[variant]

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrow && <span className="arrow">→</span>}
    </>
  )

  const Component = href ? "a" : "button"

  const linkProps = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : { type: "button" }

  return (
    <motion.span
      className={`group inline-flex ${className}`}
      whileHover={variant === "ghost" ? {} : { y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
    >
      <Component className={classes} onClick={onClick} {...linkProps} {...props}>
        {content}
      </Component>
    </motion.span>
  )
}

export default Button
