import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Terminal } from "lucide-react"

/**
 * A small "live" console. Lines cycle on their own, the way a build log
 * would, so the hero feels alive without any interaction.
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
      className={`overflow-hidden rounded-2xl border border-black/10 bg-[#0E0F12] text-white shadow-[0_28px_60px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <Terminal className="h-3.5 w-3.5 text-white/40" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
          runtime.pipeline
        </span>
        <span className="ml-auto flex gap-1">
          {lines.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === index ? "bg-crimson" : "bg-white/20"
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
            className="space-y-1.5"
          >
            {lines[index].map((line, i) => (
              <p key={i} className="font-mono text-[11px] leading-relaxed text-white/70">
                <span className="text-crimson">▸ </span>
                {line}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ConsoleWidget
