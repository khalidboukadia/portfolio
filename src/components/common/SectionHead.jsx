import React from "react"
import Reveal from "./Reveal"

/**
 * Editorial section header: a wide-tracked mono kicker, a large sans title
 * and a lede. An optional `aside` slot sits on the right on wide screens.
 */
const SectionHead = ({ kicker, title, lede, aside, className = "" }) => (
  <div className={`mb-14 md:mb-20 ${className}`}>
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-2xl">
        {kicker && (
          <Reveal>
            <p className="eyebrow-crimson mb-4 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-crimson" />
              {kicker}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="display text-[2.1rem] leading-[1.05] font-bold sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-mute sm:text-base">{lede}</p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={0.12} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  </div>
)

export default SectionHead
