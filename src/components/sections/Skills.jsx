import React from "react"
import { FiCode } from "react-icons/fi"
import Reveal from "../common/Reveal"
import { useData, useLang } from "../../i18n/LanguageContext"

/**
 * "Parcours & Stack" — the reference site's Journey & Toolkit block:
 * a narrative column on the left, a capability grid on the right.
 */
const Skills = () => {
  const { capabilityGroups, personalInfo } = useData()
  const { t } = useLang()

  return (
  <section id="skills" className="scroll-mt-20 border-y border-hair bg-white/40 py-24 sm:py-28 lg:py-32">
    <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
      {/* Left — narrative */}
      <div>
        <Reveal>
          <p className="serif-label">{t("skillsSerif")}</p>
          <h2 className="display mt-3 text-[2rem] font-bold leading-[1.08] sm:text-[2.6rem]">
            {t("skillsTitleLine1")}
            <br />
            {t("skillsTitleLine2")}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-mute sm:text-base">
            {t("skillsText")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 max-w-md rounded-2xl border border-hair bg-white p-6 shadow-[0_18px_48px_-32px_rgba(0,0,0,0.3)]">
            <p className="eyebrow-crimson mb-3">{t("skillsCardKicker")}</p>
            <p className="text-[15px] leading-relaxed text-ink-mute">
              {t("skillsCardText")}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Right — capabilities */}
      <div>
        <Reveal delay={0.06}>
          <h3 className="text-[19px] font-semibold tracking-tight sm:text-[21px]">
            {t("skillsCapsTitle")}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-mute">
            {t("skillsCapsText")}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.label} delay={0.08 + index * 0.05}>
              <div className="h-full rounded-2xl border border-hair bg-white p-5 transition-shadow duration-300 hover:shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)]">
                <p className="mb-4 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                  <FiCode className="h-3 w-3" />
                  {group.label}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[13.5px] font-medium text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-[13px] text-ink-faint">
            {t("skillsSignature")} {" "}
            <span className="font-semibold text-ink">{personalInfo.name}</span>{" "}
            {t("skillsSignatureEnd")} {personalInfo.location}
          </p>
        </Reveal>
      </div>
    </div>
  </section>
  )
}

export default Skills
