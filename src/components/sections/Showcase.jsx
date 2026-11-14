import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Award } from "lucide-react"
import Reveal from "../common/Reveal"
import { showcase } from "../../data/portfolioData"
import { spring } from "../../lib/motion"

const Showcase = () => (
  <section id="showcase" className="shell py-24 sm:py-28 lg:py-32">
    {showcase.map((item, index) => {
      const Icon = item.icon
      return (
        <div
          key={item.id}
          className={`flex flex-col items-center text-center ${
            index < showcase.length - 1 ? "mb-24 border-b border-hair pb-24 sm:mb-28 sm:pb-28" : ""
          }`}
        >
          {/* Icon tile */}
          <Reveal>
            <motion.div
              whileHover={{ y: -5, rotate: -3 }}
              transition={spring.snappy}
              className="relative mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-white"
              style={{
                border: `2px solid ${item.color}`,
                boxShadow: `0 22px 44px -26px ${item.color}`,
              }}
            >
              <Icon className="h-9 w-9" style={{ color: item.color }} />
              <span
                className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper"
                style={{ background: item.color }}
              />
            </motion.div>
          </Reveal>

          {/* Badges */}
          <Reveal delay={0.05}>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              <span className="chip chip-mono border-amber/60 bg-amber/25 text-[#8a5a00]">
                <Award className="h-3 w-3" />
                {item.badge}
              </span>
              <span className="chip chip-mono">{item.category}</span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h3 className="font-serif text-[2rem] leading-tight sm:text-[2.6rem]">{item.title}</h3>
            <p className="mt-2 font-serif text-lg italic text-ink-mute sm:text-xl">{item.subtitle}</p>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-mute">{item.description}</p>
          </Reveal>

          {/* Actions */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
                className="btn-dark"
              >
                Voir le dépôt
                <span className="arrow">→</span>
              </motion.a>
              <a
                href={item.liveUrl !== "#" ? item.liveUrl : undefined}
                target={item.liveUrl !== "#" ? "_blank" : undefined}
                rel={item.liveUrl !== "#" ? "noopener noreferrer" : undefined}
                className="btn-ghost text-ink-mute hover:text-crimson"
              >
                <ArrowUpRight className="h-4 w-4" />
                Démo en ligne
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.22}>
            <div className="mt-11 flex items-stretch divide-x divide-hair border-t border-hair pt-6">
              {item.stats.map((stat) => (
                <div key={stat.label} className="px-10 text-center">
                  <p className="display num text-[1.8rem] leading-none">{stat.value}</p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech chips */}
          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {item.techStack.map((tech) => (
                <span key={tech} className="chip chip-mono">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      )
    })}
  </section>
)

export default Showcase
