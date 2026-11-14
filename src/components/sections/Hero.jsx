import React, { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { FileText, MapPin } from "lucide-react"
import Button from "../common/Button"
import CountUp from "../common/CountUp"
import Butterfly3D from "../common/Butterfly3D"
import Interactive3D from "../common/Interactive3D"
import OrbitRing from "../common/OrbitRing"
import ConsoleWidget from "../common/ConsoleWidget"
import { heroEyebrow, heroStats, personalInfo } from "../../data/portfolioData"
import { scrollToElement } from "../../utils/helpers"
import { spring } from "../../lib/motion"

/** Hand-drawn brush stroke used as the hero's oversized backdrop mark. */
const BrushStroke = () => (
  <svg
    viewBox="0 0 420 720"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none h-full w-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M232 22c-46 128 34 226 6 340-18 74-62 140-118 190-24 22-44 42-58 62"
      stroke="#E9E9E4"
      strokeWidth="26"
      strokeLinecap="round"
    />
    <path
      d="M150 190c-34 96 6 176 44 236"
      stroke="#E9E9E4"
      strokeWidth="14"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M286 300c-30 82-24 168 10 246"
      stroke="#F0F0EC"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
)

/** Polaroid-style card — the reference site floats these at the foot of the hero. */
const FloatingCard = ({ className, rotate, delay, caption, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: rotate - 6 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{ ...spring.default, delay }}
    className={`pointer-events-none absolute z-10 w-[128px] rounded-[18px] border border-hair bg-white p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] sm:w-[150px] ${className}`}
  >
    <div className="overflow-hidden rounded-[12px]">{children}</div>
    <p className="px-1 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
      {caption}
    </p>
  </motion.div>
)

const CONSOLE_LINES = [
  ["$ npm run dev", "✓ vite ready on localhost:3000", "hot module replacement active"],
  ["$ npm run build", "✓ build complete", "dist/ ready to deploy"],
  ["$ php artisan migrate", "✓ migrations applied", "schema up to date"],
  ["$ git push origin main", "✓ github pages workflow queued", "khalidboukadia.github.io/port"],
]

const Hero = () => {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)

  // Pointer position, normalised to -0.5..0.5 and smoothed by a spring so
  // the scene follows continuously instead of snapping to each event.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 })

  const cardX = useTransform(sx, (v) => v * 16)
  const cardY = useTransform(sy, (v) => v * 10)

  const handlePointerMove = (e) => {
    if (reduceMotion) return
    px.set(e.clientX / window.innerWidth - 0.5)
    py.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <>
      {/* ---------- Activity strip ---------- */}
      <div className="border-b border-hair">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-soft-pulse rounded-full bg-crimson" />
              Activité &amp; Livraisons
            </p>
            <p className="mt-1.5 text-[13px] text-ink-mute">Commits publics et rythme de livraison.</p>
          </div>
          <div className="flex items-start gap-8 sm:gap-12">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="display text-[1.6rem] leading-none sm:text-[1.9rem]">
                  <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
                </p>
                <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section
        id="hero"
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        className="relative scroll-mt-20 overflow-hidden"
      >
        {/* Backdrop mark */}
        <div className="pointer-events-none absolute -right-16 top-0 h-[560px] w-[380px] opacity-90 sm:right-4 sm:h-[720px] sm:w-[460px]">
          <BrushStroke />
        </div>

        <div className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-10 lg:pb-36 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <div className="relative z-10">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring.default}
                className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-ink"
              >
                {heroEyebrow.map((item, i) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {i < heroEyebrow.length - 1 && <span className="text-ink-faint">/</span>}
                  </React.Fragment>
                ))}
              </motion.p>

              {/* Display title */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.default, delay: 0.06 }}
                className="display text-[2.4rem] leading-[0.98] whitespace-nowrap sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[5.4rem]"
              >
                <span className="block whitespace-nowrap text-ink-faint">D&apos;idée</span>
                <span className="block whitespace-nowrap font-bold text-ink">à produit live.</span>
              </motion.h1>

              {/* Lede */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.default, delay: 0.12 }}
                className="mt-8 max-w-[34rem] text-[17px] leading-[1.55] text-ink-mute sm:text-[19px]"
              >
                Conception et développement d&apos;applications web rapides, scalables et
                performantes — de l&apos;idée au déploiement, sans jamais sacrifier la
                qualité.
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.default, delay: 0.18 }}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <Button onClick={() => scrollToElement("contact")} arrow>
                  Me contacter
                </Button>
                <Button
                  variant="ghost"
                  href={personalInfo.resumeUrl}
                  icon={<FileText className="h-[17px] w-[17px] text-ink-mute" />}
                >
                  CV
                </Button>
              </motion.div>

              {/* Location line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring.default, delay: 0.26 }}
                className="mt-12 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint"
              >
                <MapPin className="h-3.5 w-3.5" />
                {personalInfo.location} — Disponible pour de nouvelles opportunités
              </motion.p>
            </div>

            {/* ---------- Artwork ---------- */}
            <div className="relative hidden min-h-[660px] lg:block">
              {/* The 3D butterfly + its orbit: drifts with the pointer,
                  spins in place when clicked */}
              <Interactive3D
                depth={30}
                className="absolute right-[4px] top-[-58px] z-20"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-7 text-ink-faint/70">
                    <OrbitRing
                      size={300}
                      duration={38}
                      items={["React", "Node.js", "Laravel", "MongoDB", "TypeScript", "Tailwind"]}
                    />
                  </div>
                  <Butterfly3D size={248} />
                </div>
              </Interactive3D>

              {/* Signature card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ ...spring.default, delay: 0.2 }}
                style={{ x: cardX, y: cardY }}
                className="absolute right-[4px] top-[186px] z-10 w-[252px] rounded-3xl border border-hair bg-white p-3 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)]"
              >
                <div className="relative flex h-[212px] items-center justify-center overflow-hidden rounded-2xl bg-[#F1F1EC]">
                  <span className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-crimson/10 blur-2xl" />
                  <span className="font-serif text-[92px] italic leading-none text-ink">M</span>
                  <span className="absolute bottom-6 right-6 h-3 w-3 rounded-full bg-crimson" />
                  <span className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                    {personalInfo.title}
                  </span>
                </div>
                <div className="flex items-center justify-between px-2 pb-1 pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {personalInfo.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-crimson">
                    Agadir · 2026
                  </span>
                </div>
              </motion.div>

              {/* Floating mini cards */}
              <FloatingCard
                className="-left-[10px] top-[236px]"
                rotate={-9}
                delay={0.4}
                caption="Stack · MERN"
              >
                <div className="flex h-[96px] items-center justify-center gap-1.5 bg-[#14151A]">
                  {["M", "E", "R", "N"].map((l, i) => (
                    <span
                      key={l}
                      className="font-mono text-[13px] font-bold"
                      style={{ color: ["#F7DF1E", "#61DAFB", "#47A248", "#FF2D20"][i] }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </FloatingCard>

              <FloatingCard
                className="right-[-16px] top-[366px]"
                rotate={7}
                delay={0.52}
                caption="Laravel · PHP"
              >
                <div className="flex h-[96px] items-center justify-center bg-[#FFF1F2]">
                  <span className="font-serif text-4xl italic text-[#FF2D20]">L</span>
                </div>
              </FloatingCard>

              {/* Live console */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.default, delay: 0.44 }}
                className="absolute bottom-0 left-[-18px] z-20 w-[272px]"
              >
                <ConsoleWidget lines={CONSOLE_LINES} />
              </motion.div>
            </div>
          </div>

          {/* Mobile artwork strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.default, delay: 0.3 }}
            className="mt-14 lg:hidden"
          >
            <div className="relative h-[220px] overflow-hidden rounded-3xl border border-hair bg-white">
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,#F3F3EE_0%,#F8F8F6_55%,#F1F1EC_100%)]" />
              <span className="absolute left-6 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                {personalInfo.title}
              </span>
              <span className="absolute bottom-0 left-8 font-serif text-[120px] italic leading-[0.8] text-ink">
                M
              </span>
              <span className="absolute bottom-8 right-8 h-3.5 w-3.5 rounded-full bg-crimson" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero
