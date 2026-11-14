import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import Reveal from "../common/Reveal"
import SectionHead from "../common/SectionHead"
import { projects } from "../../data/portfolioData"
import { spring } from "../../lib/motion"

const categories = ["Tous", ...new Set(projects.map((p) => p.category))]

/* ------------------------------------------------------------------ */
/*  Systems built — the reference site's "Systems Built" list           */
/* ------------------------------------------------------------------ */
const SystemsBuilt = () => (
  <div className="space-y-4">
    {projects.map((project, index) => {
      const Icon = project.icon
      return (
        <Reveal key={project.id} delay={Math.min(index, 4) * 0.05}>
          <article className="group grid gap-6 rounded-2xl border border-hair bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-40px_rgba(0,0,0,0.45)] sm:grid-cols-[auto_1fr] sm:p-8">
            {/* Icon tile */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hair bg-paper">
              <Icon className="h-5 w-5 text-ink" />
            </div>

            {/* Body */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-crimson">
                Système {String(index + 1).padStart(2, "0")}
                <span className="mx-2 text-ink-faint">·</span>
                <span className="text-ink-faint">{project.kicker}</span>
              </p>

              <h3 className="mt-3 font-serif text-[1.55rem] leading-tight sm:text-[1.85rem]">
                {project.title}
              </h3>

              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-mute">
                {project.description}
              </p>

              <p className="mt-4 font-mono text-[11px] text-crimson">↳ {project.status}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="chip chip-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-[14px] font-semibold text-ink underline decoration-hair underline-offset-[6px] transition-colors duration-200 hover:text-crimson hover:decoration-crimson"
                >
                  Voir le dépôt
                  <span className="arrow">→</span>
                </a>
                {project.metrics.map((metric) => (
                  <span
                    key={metric.label}
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint"
                  >
                    {metric.label} · <span className="text-ink">{metric.value}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      )
    })}
  </div>
)

/* ------------------------------------------------------------------ */
/*  Project index — the reference site's "Projects Worked On" table      */
/* ------------------------------------------------------------------ */
const ProjectIndex = () => {
  const [filter, setFilter] = useState("Tous")
  const visible = filter === "Tous" ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="mt-24">
      <SectionHead
        kicker="Sélection · Projets livrés"
        title="Projets réalisés."
        lede="Applications, back-offices et plateformes livrées de bout en bout — du maquettage à la mise en production."
        aside={
          <span className="chip chip-mono">{projects.length} systèmes</span>
        }
      />

      {/* Filter */}
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const active = filter === category
            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                whileTap={{ scale: 0.96 }}
                transition={spring.snappy}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  active
                    ? "bg-ink text-white"
                    : "border border-hair bg-white text-ink-mute hover:border-ink/25 hover:text-ink"
                }`}
              >
                {category}
              </motion.button>
            )
          })}
        </div>
      </Reveal>

      {/* Table */}
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-hair bg-white">
          {visible.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              layout
              transition={spring.default}
              className="group flex items-center gap-4 border-b border-hair px-5 py-5 transition-colors duration-200 last:border-b-0 hover:bg-paper sm:gap-6 sm:px-7"
            >
              <span className="w-6 shrink-0 font-mono text-[11px] text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-ink sm:text-base">
                  {project.title.split(" — ")[0]}
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-ink-faint">
                  {project.kicker}
                </span>
              </span>

              <span className="chip chip-mono hidden shrink-0 sm:inline-flex">{project.category}</span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hair text-ink-mute transition-colors duration-200 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                <FiArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

/* ------------------------------------------------------------------ */
const Projects = () => (
  <section id="projects" className="shell scroll-mt-20 py-24 sm:py-28 lg:py-32">
    <SectionHead
      kicker="Livrables · Projets clients & personnels"
      title="Systèmes construits."
      lede="Chaque projet est une réponse à un besoin réel : des fondations solides, une interface soignée, et un code que l'on peut maintenir."
    />

    <SystemsBuilt />
    <ProjectIndex />
  </section>
)

export default Projects
