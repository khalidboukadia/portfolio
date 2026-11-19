import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Award } from "lucide-react"
import Reveal from "../common/Reveal"
import SectionHead from "../common/SectionHead"
import { useData, useLang } from "../../i18n/LanguageContext"
import { FiGithub } from "react-icons/fi"
import { spring } from "../../lib/motion"

const ALL = "__all__"

/* ------------------------------------------------------------------ */
/*  Projets en vedette — les deux projets qui portent l'identité          */
/* ------------------------------------------------------------------ */
const Featured = () => {
  const { showcase } = useData()
  const { t, n, isRTL } = useLang()

  return (
  <div className="mb-24 grid gap-8 lg:grid-cols-2 lg:gap-10">
    {showcase.map((item, index) => {
      const Icon = item.icon
      return (
        <Reveal key={item.id} delay={index * 0.08}>
          <article className="group flex h-full flex-col rounded-3xl border border-hair bg-surface p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-9">
            {/* Icon + badges */}
            <div className="flex items-start justify-between gap-4">
              <motion.div
                whileHover={{ y: -4, rotate: -4 }}
                transition={spring.snappy}
                className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[22px] bg-surface"
                style={{
                  border: `2px solid ${item.color}`,
                  boxShadow: `0 20px 40px -24px ${item.color}`,
                }}
              >
                <Icon className="h-8 w-8" style={{ color: item.color }} />
                <span
                  className="absolute -end-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper"
                  style={{ background: item.color }}
                />
              </motion.div>

              <div className="flex flex-wrap justify-end gap-2">
                <span className="chip chip-mono border-highlight/60 bg-highlight/25 text-warning">
                  <Award className="h-3 w-3" />
                  {item.badge}
                </span>
                <span className="chip chip-mono">{item.category}</span>
              </div>
            </div>

            {/* Titre */}
            <h3 className="mt-7 font-serif text-[1.9rem] leading-tight sm:text-[2.15rem]">
              {item.title}
            </h3>
            <p className="mt-1.5 font-serif text-lg italic text-ink-mute">{item.subtitle}</p>

            <p className="mt-5 text-[14.5px] leading-relaxed text-ink-mute">{item.description}</p>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-[14px] font-semibold text-ink underline decoration-hair underline-offset-[6px] transition-colors duration-200 hover:text-crimson hover:decoration-crimson"
              >
                {t("projectRepo")}
                <span className="arrow" aria-hidden="true">
                  {isRTL ? "\u2190" : "\u2192"}
                </span>
              </a>
              {item.liveUrl !== "#" && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-mute transition-colors duration-200 hover:text-crimson"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  {t("projectDemo")}
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="mt-9 flex items-stretch divide-x divide-hair border-t border-hair pt-6">
              {item.stats.map((stat) => (
                <div key={stat.label} className="px-8 first:ps-0">
                  <p className="display num text-[1.7rem] leading-none">{n(stat.value)}</p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span key={tech} className="chip chip-mono">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      )
    })}
  </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Systèmes construits — le reste des projets, en fiches numérotées     */
/* ------------------------------------------------------------------ */
const SystemsBuilt = () => {
  const { projects, showcase } = useData()
  const { t, n, isRTL } = useLang()
  const featuredIds = showcase.map((s) => s.projectId)
  const systems = projects.filter((p) => !featuredIds.includes(p.id))

  return (
    <div className="space-y-4">
      {systems.map((project, index) => {
        const Icon = project.icon
        return (
          <Reveal key={project.id} delay={Math.min(index, 4) * 0.05}>
            <article className="group grid gap-6 rounded-2xl border border-hair bg-surface p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[auto_1fr] sm:p-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hair bg-paper">
                <Icon className="h-5 w-5 text-ink" />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-crimson">
                  {t("projectSystem")} {n(String(index + 1).padStart(2, "0"))}
                  <span className="mx-2 text-ink-faint">·</span>
                  <span className="text-ink-faint">{project.kicker}</span>
                </p>

                <h3 className="mt-3 font-serif text-[1.5rem] leading-tight sm:text-[1.75rem]">
                  {project.title}
                </h3>

                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-mute">
                  {project.description}
                </p>

                <p className="mt-4 font-mono text-[11px] text-crimson">
                  <span aria-hidden="true">{isRTL ? "\u21b2" : "\u21b3"}</span> {project.status}
                </p>

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
                    {t("projectRepo")}
                    <span className="arrow" aria-hidden="true">
                      {isRTL ? "\u2190" : "\u2192"}
                    </span>
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
}

/* ------------------------------------------------------------------ */
/*  Index des projets — vue compacte filtrable                           */
/* ------------------------------------------------------------------ */
const ProjectIndex = () => {
  const { projects } = useData()
  const { t, n } = useLang()
  const categories = [ALL, ...new Set(projects.map((p) => p.category))]
  const [filter, setFilter] = useState(ALL)
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="mt-24">
      <SectionHead
        kicker={t("indexKicker")}
        title={t("indexTitle")}
        lede={t("indexLede")}
        aside={
          <span className="chip chip-mono">
            {n(projects.length)} {t("indexCount")}
          </span>
        }
      />

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
                    ? "bg-ink text-paper"
                    : "border border-hair bg-surface text-ink-mute hover:border-ink/25 hover:text-ink"
                }`}
              >
                {category === ALL ? t("projectAll") : category}
              </motion.button>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-hair bg-surface">
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
                {n(String(index + 1).padStart(2, "0"))}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-ink sm:text-base">
                  {project.title.split(" – ")[0]}
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-ink-faint">
                  {project.kicker}
                </span>
              </span>

              <span className="chip chip-mono hidden shrink-0 sm:inline-flex">{project.category}</span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hair text-ink-mute transition-colors duration-200 group-hover:border-crimson group-hover:bg-crimson group-hover:text-paper">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

/* ------------------------------------------------------------------ */
const Projects = () => {
  const { t } = useLang()
  const { personalInfo } = useData()

  return (
  <section id="projects" className="shell scroll-mt-20 py-24 sm:py-28 lg:py-32">
    <SectionHead
      kicker={t("projectsKicker")}
      title={t("projectsTitle")}
      lede={t("projectsLede")}
    />

    <Featured />
    <SystemsBuilt />
    <ProjectIndex />

    {/* Sélection, pas l'inventaire complet : la suite vit sur GitHub. */}
    <div className="mt-20 flex flex-col items-center gap-4 border-t border-hair pt-10 text-center">
      <p className="max-w-xl text-[14px] leading-relaxed text-ink-mute">
        {t("projectsMoreNote")}
      </p>
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 rounded-full border border-hair bg-surface px-5 py-2.5 text-[13.5px] font-semibold text-ink shadow-pill transition-colors duration-300 hover:border-crimson hover:text-crimson"
      >
        <FiGithub className="h-4 w-4" />
        {t("projectsGithubCta")}
      </a>
    </div>
  </section>
  )
}

export default Projects
