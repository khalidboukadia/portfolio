import React from "react"
import Reveal from "../common/Reveal"
import { beliefs } from "../../data/portfolioData"

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi"]

/**
 * "Convictions" — the reference site's Core Belief block. A serif italic
 * label on the left, a numbered list on the right, separated by hairlines.
 */
const Beliefs = () => (
  <section id="about" className="scroll-mt-20 border-y border-hair bg-white/40 py-24 sm:py-28 lg:py-32">
    <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      {/* Left — sticky label */}
      <div className="lg:sticky lg:top-16 lg:self-start">
        <Reveal>
          <p className="eyebrow-crimson mb-4">Principes</p>
          <p className="font-serif text-3xl italic leading-tight sm:text-4xl">Convictions</p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-mute">
            Les règles simples qui guident chaque projet, du premier croquis
            d&apos;architecture jusqu&apos;à la mise en production.
          </p>
        </Reveal>
      </div>

      {/* Right — numbered list */}
      <div>
        {beliefs.map((belief, index) => (
          <Reveal key={belief} delay={index * 0.05}>
            <div className="group flex items-start gap-5 border-b border-hair py-6 transition-colors duration-300 first:border-t hover:bg-black/[0.015] sm:gap-7 sm:py-7">
              <span className="mt-0.5 w-6 shrink-0 font-serif text-base italic text-crimson">
                {ROMAN[index]}
              </span>
              <p className="text-[17px] leading-snug text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-[19px]">
                {belief}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default Beliefs
