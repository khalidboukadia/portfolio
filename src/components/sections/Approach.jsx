import React from "react"
import Reveal from "../common/Reveal"
import SectionHead from "../common/SectionHead"
import { useData, useLang } from "../../i18n/LanguageContext"

/**
 * "Approche d'ingénierie" — four principles, mirroring the reference site's
 * Engineering Approach block.
 */
const Approach = () => {
  const { approach } = useData()
  const { t, n } = useLang()

  return (
  <section className="shell py-24 sm:py-28 lg:py-32">
    <SectionHead kicker={t("approachKicker")} title={t("approachTitle")} lede={t("approachLede")} />

    {/* Bandeau à colonnes séparées par un filet vertical — disposition
        empruntée à makousb.com. */}
    <div className="grid gap-y-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:gap-x-4">
      {approach.map((item, index) => (
        <Reveal
          key={item.title}
          delay={index * 0.06}
          className="lg:border-s lg:border-hair lg:ps-6 lg:first:border-s-0 lg:first:ps-0"
        >
          <div className="group">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink font-mono text-[10px] font-semibold text-white">
                {n(String(index + 1).padStart(2, "0"))}
              </span>
              <h3 className="text-[17px] font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-crimson sm:text-[19px]">
                {item.title}
              </h3>
            </div>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-ink-mute">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
  )
}

export default Approach
