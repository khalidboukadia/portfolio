import React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Reveal from "../common/Reveal"
import OrbitRing from "../common/OrbitRing"
import Interactive3D from "../common/Interactive3D"
import { useLang } from "../../i18n/LanguageContext"
import orbImg from "../../assets/glow-orb-3d.webp"

/**
 * « Art & mouvement » — la signature 3D du site : une sphère de particules
 * qui dérive avec le pointeur et tourne sur elle-même au clic, cerclée d'une
 * orbite de technos. Tout reste sur fond clair, comme le reste du site.
 */
const Motion = () => {
  const { t } = useLang()

  return (
  <section id="motion" className="shell scroll-mt-20 py-20 sm:py-24">
    <div className="relative overflow-hidden rounded-[28px] border border-hair bg-surface shadow-panel sm:rounded-[36px]">
      {/* Halo très doux derrière la sphère */}
      <div className="pointer-events-none absolute -end-16 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-crimson/[0.07] blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 start-1/4 h-[240px] w-[240px] rounded-full bg-highlight/20 blur-[100px]" />

      <div className="relative grid items-center gap-12 px-7 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-16">
        {/* Texte */}
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-label text-crimson">
              <Sparkles className="h-3.5 w-3.5" />
              {t("motionKicker")}
            </p>
            <h2 className="display max-w-xl text-[2rem] font-bold leading-[1.08] sm:text-[2.6rem]">
              {t("motionTitleLine1")}
              <br />
              {t("motionTitleLine2")}
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-mute sm:text-base">
              {t("motionText")}
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {t("motionTags").map((tag) => (
                <span key={tag} className="chip chip-mono">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sphère — dérive avec le pointeur, tourne sur elle-même au clic */}
        <div className="relative mx-auto h-[250px] w-[250px] sm:h-[320px] sm:w-[320px]">
          <Interactive3D
            depth={5}
            spin={-360}
            className="relative mx-auto h-full w-full"
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={orbImg}
                alt=""
                className="h-[92%] w-[92%] object-contain img-shadow-lg"
                draggable="false"
              />
            </motion.div>

            {/* Orbite parfaitement centrée sur la sphère */}
            <div className="pointer-events-none absolute -inset-[14%] text-ink-faint">
              <OrbitRing
                size={320}
                duration={34}
                items={["React", "Node.js", "Laravel", "MongoDB", "TypeScript", "Tailwind"]}
              />
            </div>
          </Interactive3D>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Motion
