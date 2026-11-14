import React from "react"
import { FiMapPin, FiBriefcase, FiBookOpen } from "react-icons/fi"
import Reveal from "../common/Reveal"
import SectionHead from "../common/SectionHead"
import { education, experiences, languages, softSkills } from "../../data/portfolioData"

const Journey = () => (
  <section id="experience" className="scroll-mt-20 border-y border-hair bg-white/40 py-24 sm:py-28 lg:py-32">
    <div className="shell">
      <SectionHead
        kicker="Parcours · Expérience & formation"
        title="Le chemin parcouru."
        lede="Un stage en production, une formation continue et beaucoup de projets livrés — c'est ce qui forge un développeur."
      />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ---------- Experience ---------- */}
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-2">
              <FiBriefcase className="h-3.5 w-3.5" />
              Expérience professionnelle
            </p>
          </Reveal>

          {experiences.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 0.06}>
              <article className="rounded-2xl border border-hair bg-white p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-crimson">
                  {exp.period}
                </p>
                <h3 className="mt-3 font-serif text-[1.5rem] leading-tight sm:text-[1.75rem]">
                  {exp.role}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-ink-mute">
                  <span className="font-semibold text-ink">{exp.company}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </p>

                <ul className="mt-6 space-y-3 border-t border-hair pt-6">
                  {exp.description.map((line) => (
                    <li key={line} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-mute">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-crimson" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="chip chip-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------- Education & soft skills ---------- */}
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-2">
              <FiBookOpen className="h-3.5 w-3.5" />
              Formation académique
            </p>
          </Reveal>

          <div className="border-t border-hair">
            {education.map((edu, index) => (
              <Reveal key={edu.id} delay={index * 0.06}>
                <div className="group flex items-start justify-between gap-6 border-b border-hair py-5 transition-colors duration-300 hover:bg-black/[0.015]">
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{edu.degree}</p>
                    <p className="mt-1 text-[13.5px] text-ink-mute">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                      {edu.period}
                    </span>
                    {edu.current && (
                      <span className="chip chip-mono border-[#059669]/30 bg-[#059669]/10 text-[#047857]">
                        En cours
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Soft skills */}
          <Reveal delay={0.12}>
            <p className="eyebrow mb-4 mt-12">Soft skills</p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.16}>
            <p className="eyebrow mb-4 mt-12">Langues</p>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-[14px] font-medium text-ink">{lang.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      {lang.level}
                    </span>
                  </div>
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-ink/70"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)

export default Journey
