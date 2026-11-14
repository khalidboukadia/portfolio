import React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Reveal from "../common/Reveal"
import OrbitRing from "../common/OrbitRing"
import Interactive3D from "../common/Interactive3D"
import orbImg from "../../assets/glow-orb-3d.webp"

/**
 * A dark band that carries the site's 3D signature: a glowing particle orb
 * drifting behind a rotating tech orbit, the way the reference site anchors
 * its "3D & Motion" identity.
 */
const Motion = () => (
  <section id="motion" className="shell scroll-mt-20 py-20 sm:py-24">
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-[#0E0F12] sm:rounded-[36px]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-crimson/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#D97706]/20 blur-[110px]" />

      <div className="relative grid items-center gap-12 px-7 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-16">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-label text-crimson">
              <Sparkles className="h-3.5 w-3.5" />
              Craft &amp; motion
            </p>
            <h2 className="display max-w-xl text-[2rem] font-bold leading-[1.08] text-white sm:text-[2.6rem]">
              L&apos;interface fait partie
              <br />
              du produit.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/55 sm:text-base">
              Chaque écran esttrait comme une pièce d&apos;atelier : hiérarchie claire,
              mouvement mesuré, aucune animation gratuite. Le soin visuel n&apos;est pas
              une couche à la fin — c&apos;est une exigence de conception.
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Hiérarchie", "Typographie", "Mouvement", "Performance", "Accessibilité"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>

        {/* Orb — drifts with the pointer, spins in place when clicked */}
        <Interactive3D
          depth={16}
          spin={-360}
          className="relative mx-auto h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]"
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={orbImg}
              alt=""
              className="h-full w-full scale-110 object-contain drop-shadow-[0_0_60px_rgba(176,0,32,0.35)]"
              draggable="false"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-[-18%] text-white/45">
            <OrbitRing
              size={340}
              duration={34}
              items={["React", "Node.js", "Laravel", "MongoDB", "TypeScript", "Tailwind"]}
            />
          </div>
        </Interactive3D>
      </div>
    </div>
  </section>
)

export default Motion
