import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Terminal } from "lucide-react"

/**
 * A small "live" console. Lines cycle on their own, the way a build log
 * would, so the hero feels alive without any interaction.
 *
 * Le terminal est volontairement indépendant de l'i18n du site : son
 * contenu est toujours en français, quelle que soit la langue affichée.
 */
const ConsoleWidget = ({ lines, className = "" }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % lines.length),
      2600
    )
    return () => clearInterval(id)
  }, [lines.length])

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-hairstrong bg-terminal text-white shadow-lift ring-1 ring-white/10 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <Terminal className="h-3.5 w-3.5 text-white/60" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/60">
          terminal
        </span>
        <span className="ms-auto flex gap-1">
          {lines.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === index ? "bg-crimson" : "bg-white/30"
              }`}
            />
          ))}
        </span>
      </div>

      <div className="relative h-[92px] px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 text-start"
          >
            {lines[index].map((line, i) => {
              /* Un terminal se lit toujours en LTR, commandes comme sortie. */
              return (
                <p
                  key={i}
                  dir="ltr"
                  className="text-start font-mono text-[11px] leading-relaxed text-white/85"
                >
                  <span className="text-crimson">{"\u25b8 "}</span>
                  {line}
                </p>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ConsoleWidget
