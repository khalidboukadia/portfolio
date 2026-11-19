import React, { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { FileText, MapPin } from "lucide-react"
import Button from "../common/Button"
import CountUp from "../common/CountUp"
import Butterfly3D from "../common/Butterfly3D"
import Interactive3D from "../common/Interactive3D"
import OrbitRing from "../common/OrbitRing"
import ConsoleWidget from "../common/ConsoleWidget"
import butterflyImg from "../../assets/butterfly-3d.webp"
import orbImg from "../../assets/glow-orb-3d.webp"
import { useData, useLang } from "../../i18n/LanguageContext"
import { scrollToElement } from "../../utils/helpers"

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
const FloatingCard = ({ className, rotate, caption, children }) => (
  <div
    className={`pointer-events-none absolute z-10 w-[128px] rounded-[18px] border border-hair bg-white p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] sm:w-[150px] ${className}`}
    style={{ rotate: `${rotate}deg` }}
  >
    <div className="overflow-hidden rounded-[12px]">{children}</div>
    <p className="px-1 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
      {caption}
    </p>
  </div>
)

const Hero = () => {
  const { heroEyebrow, heroStats, personalInfo } = useData()
  const { t } = useLang()
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
      <div className="pw-strip relative overflow-hidden border-b border-hair">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-soft-pulse rounded-full bg-crimson" />
              {t("heroActivityTitle")}
            </p>
            <p className="mt-1.5 text-[13px] text-ink-mute">{t("heroActivity")}</p>
          </div>
          <div className="flex items-start gap-8 pe-16 sm:gap-12 lg:pe-28">
            {heroStats.map((stat) => (
              <div key={stat.label} className="pw-stat">
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

        {/* Papillon en apesanteur, comme sur le site de référence */}
        <img
          src={butterflyImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute end-0 top-3 z-10 w-24 rotate-[-8deg] drop-shadow-[0_18px_24px_rgba(0,0,0,0.12)] sm:w-32 lg:end-6 lg:top-1 lg:w-36"
        />
      </div>

      {/* ---------- Hero ---------- */}
      <section
        id="hero"
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        className="relative scroll-mt-20 overflow-hidden"
      >
        {/* Backdrop mark */}
        <div className="pointer-events-none absolute -end-16 top-0 h-[560px] w-[380px] opacity-90 sm:end-4 sm:h-[720px] sm:w-[460px]">
          <BrushStroke />
        </div>

        <div className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-10 lg:pb-36 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <div className="relative z-10">
              {/* Eyebrow */}
              <p className="pw-eye eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-ink">
                {heroEyebrow.map((item, i) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {i < heroEyebrow.length - 1 && <span className="text-ink-faint">/</span>}
                  </React.Fragment>
                ))}
              </p>

              {/* Display title — each line rises from behind its own mask */}
              <h1 className="display text-[2.4rem] leading-[0.98] whitespace-nowrap sm:text-[3.8rem] lg:font-mono lg:text-[3.9rem] lg:font-bold lg:tracking-[-0.03em] xl:text-[5rem]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="pw-l1 block whitespace-nowrap text-ink-faint">
                    {t("heroTitleLine1")}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="pw-l2 block whitespace-nowrap font-bold text-ink">
                    {t("heroTitleLine2")}
                  </span>
                </span>
              </h1>

              {/* Lede */}
              <p className="pw-lede mt-8 max-w-[34rem] text-[17px] leading-[1.55] text-ink-mute sm:text-[19px]">
                {t("heroLede")}
              </p>

              {/* Actions */}
              <div className="pw-actions mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button onClick={() => scrollToElement("contact")} arrow>
                  {t("heroCta")}
                </Button>
                <Button
                  variant="ghost"
                  href={personalInfo.resumeUrl}
                  icon={<FileText className="h-[17px] w-[17px] text-ink-mute" />}
                >
                  {t("heroCtaGhost")}
                </Button>
              </div>

              {/* Location line */}
              <p className="pw-loc mt-12 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
                <MapPin className="h-3.5 w-3.5" />
                {personalInfo.location} — Disponible pour de nouvelles opportunités
              </p>
            </div>

            {/* ---------- Artwork ---------- */}
            <div className="relative hidden min-h-[660px] lg:block">
              {/* Marques de recadrage + ligne de scan (comme sur makousb.com) */}
              <div className="pw-fig-marks pointer-events-none absolute inset-0 z-30">
                {[
                  "start-0 top-0 border-s border-t",
                  "end-0 top-0 border-e border-t",
                  "start-0 bottom-0 border-s border-b",
                  "end-0 bottom-0 border-e border-b",
                ].map((pos) => (
                  <span key={pos} className={`absolute h-6 w-6 border-crimson/45 ${pos}`} />
                ))}

                {/* Ligne de scan : verticale, de gauche à droite */}
                <span className="pw-fig-scan absolute inset-y-0 start-0 w-[2px] opacity-0 bg-crimson/70 shadow-[0_0_16px_3px_rgba(176,0,32,0.35)]" />
              </div>

              {/* The 3D butterfly + its orbit: drifts with the pointer,
                  spins in place when clicked */}
              <div className="pw-fig absolute end-[4px] top-[-58px] z-20">
                <div className="pw-fig-wipe">
                  <Interactive3D depth={30} className="h-full w-full">
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
                </div>
              </div>

              {/* Signature card */}
              <div className="pw-card absolute end-[4px] top-[186px] z-10 w-[252px]">
                <motion.div
                  style={{ x: cardX, y: cardY }}
                  className="rounded-3xl border border-hair bg-white p-3 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)]"
                >
                  <div className="relative flex h-[212px] items-center justify-center overflow-hidden rounded-2xl bg-[#F1F1EC]">
                    <span className="absolute -end-8 -top-10 h-40 w-40 rounded-full bg-crimson/10 blur-2xl" />
                    <span className="font-serif text-[92px] italic leading-none text-ink">M</span>
                    <span className="absolute bottom-6 end-6 h-3 w-3 rounded-full bg-crimson" />
                    <span className="absolute start-6 top-6 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                      {personalInfo.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-1 pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                      {personalInfo.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-crimson">
                      {t("heroCityYear")}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Floating mini cards */}
              <div className="pw-card absolute -start-[10px] top-[236px] z-10">
                <FloatingCard className="relative" rotate={-9} caption="Stack · MERN">
                  <div dir="ltr" className="flex h-[96px] items-center justify-center gap-1.5 bg-[#14151A]">
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
              </div>

              <div className="pw-card-2 absolute end-[-16px] top-[366px] z-10">
                <FloatingCard className="relative" rotate={7} caption="Laravel · PHP">
                  <div className="flex h-[96px] items-center justify-center bg-[#FFF1F2]">
                    <span className="font-serif text-4xl italic text-[#FF2D20]">L</span>
                  </div>
                </FloatingCard>
              </div>

              {/* Live console */}
              <div className="pw-term absolute bottom-0 start-[-18px] z-20 w-[272px]">
                <ConsoleWidget lines={t("heroConsole")} />
              </div>
            </div>
          </div>

          {/* Galerie mobile : cartes légèrement inclinées, comme sur la référence */}
          <div className="pw-card mt-12 flex items-center justify-center lg:hidden">
            <div className="relative h-[190px] w-full">
              <div className="absolute start-0 top-6 w-[42%] -rotate-[7deg] overflow-hidden rounded-2xl border border-hair bg-white p-2 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]">
                <img src={butterflyImg} alt="" className="h-[120px] w-full object-contain" />
                <p className="pt-1 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint">
                  3D
                </p>
              </div>
              <div className="absolute end-0 top-2 w-[42%] rotate-[5deg] overflow-hidden rounded-2xl border border-hair bg-white p-2 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]">
                <img src={orbImg} alt="" className="h-[120px] w-full object-contain" />
                <p className="pt-1 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint">
                  Motion
                </p>
              </div>
              <div className="absolute start-1/2 top-14 -translate-x-1/2 -rotate-[2deg] overflow-hidden rounded-2xl border border-hair bg-white p-2 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]">
                <div className="flex h-[120px] items-center justify-center gap-1 bg-[#14151A]">
                  {["M", "E", "R", "N"].map((l, i) => (
                    <span
                      key={l}
                      dir="ltr"
                      className="font-mono text-[13px] font-bold"
                      style={{ color: ["#F7DF1E", "#61DAFB", "#47A248", "#FF2D20"][i] }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="pt-1 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint">
                  Stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
