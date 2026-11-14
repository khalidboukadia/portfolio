import React from "react"
import Reveal from "../common/Reveal"
import SectionHead from "../common/SectionHead"
import { approach } from "../../data/portfolioData"

/**
 * "Approche d'ingénierie" — four principles, mirroring the reference site's
 * Engineering Approach block.
 */
const Approach = () => (
  <section className="shell py-24 sm:py-28 lg:py-32">
    <SectionHead
      kicker="Méthode de travail"
      title="Approche d'ingénierie."
      lede="Peu importe la technologie, le raisonnement reste le même : comprendre le problème, choisir la bonne abstraction, livrer proprement."
    />

    <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
      {approach.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.06}>
          <div className="group">
            <div className="mb-4 flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-label text-crimson">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[19px] font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-crimson sm:text-[21px]">
                {item.title}
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-mute">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
)

export default Approach
