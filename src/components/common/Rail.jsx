import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { Mail, Menu, X } from "lucide-react"
import Monogram from "./Monogram"
import { useData, useLang } from "../../i18n/LanguageContext"
import { scrollToElement } from "../../utils/helpers"
import { spring } from "../../lib/motion"

/**
 * Left rail — the navigation lives on the left edge as a slim vertical
 * strip of icons, the way the reference site does it. Below `lg` the rail
 * is replaced by a compact top bar and a bottom sheet.
 */
const Rail = () => {
  const { navLinks, personalInfo } = useData()
  const { t, toggle, lang } = useLang()
  const [active, setActive] = useState("hero")
  const [open, setOpen] = useState(false)
  // Le bandeau mobile se condense dès qu'on descend : au sommet il flotte
  // comme sur le site de référence, en dessous il devient une bande pleine
  // (fond papier + filet) pour que le contenu passe dessous sans jamais
  // être coupé par la pastille.
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const go = (href) => {
    setOpen(false)
    scrollToElement(href.slice(1))
  }

  const socials = [
    { icon: <FiGithub className="h-[17px] w-[17px]" />, href: personalInfo.github, label: "GitHub" },
    { icon: <FiLinkedin className="h-[17px] w-[17px]" />, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: <Mail className="h-[17px] w-[17px]" />, href: `mailto:${personalInfo.email}`, label: t("contactEmail") },
  ]

  return (
    <>
      {/* ---------- Desktop rail ---------- */}
      <aside className="fixed inset-y-0 start-0 z-50 hidden w-[68px] flex-col items-center border-e border-hair bg-paper/90 backdrop-blur-md lg:flex">
        {/* Monogram */}
        <button
          type="button"
          onClick={() => go("#hero")}
          aria-label={t("ariaBackTop")}
          className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-hair bg-white text-ink transition-colors duration-300 hover:border-crimson hover:text-crimson"
        >
          <span className="relative inline-flex">
            <span className="pw-logo inline-flex">
              <Monogram size={19} />
            </span>
            <i className="pw-logo-cur" />
          </span>
        </button>

        {/* Section anchors */}
        <nav className="mt-10 flex flex-1 flex-col items-center gap-2" aria-label="Navigation principale">
          {navLinks.map((link, index) => {
            const Icon = link.icon
            const id = link.href.slice(1)
            return (
              <button
                key={link.name}
                type="button"
                data-active={active === id}
                onClick={() => go(link.href)}
                aria-label={link.name}
                aria-current={active === id ? "true" : undefined}
                className="rail-btn group pw-nav"
                style={{ animationDelay: `calc(var(--d) + ${(0.35 + index * 0.05).toFixed(2)}s)` }}
              >
                <Icon className="h-[18px] w-[18px]" />
                {/* Tooltip */}
                <span className="pointer-events-none absolute start-full z-50 ms-3 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {link.name}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bascule de langue */}
        <button
          type="button"
          data-drip-link
          onClick={toggle}
          aria-label={t("langSwitchLabel")}
          title={t("langSwitchLabel")}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-hair bg-white font-mono text-[11px] font-semibold text-ink transition-colors duration-300 hover:border-crimson hover:text-crimson"
        >
          {t("langSwitch")}
        </button>

        {/* Socials — carrés pleins, comme les boutons de la barre makousb */}
        <div className="pw-social mb-6 flex flex-col items-center gap-2 border-t border-hair pt-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition-colors duration-200 hover:bg-crimson"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </aside>

      {/* ---------- Mobile top bar ----------
          Comme sur le site de référence : une pastille flottante (monogramme
          + Menu) posée en haut de l'écran, pas une barre pleine largeur. */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between gap-3 px-4 transition-[padding,background-color,box-shadow] duration-300 lg:hidden ${
          condensed
            ? "border-b border-hair bg-paper/95 py-2 shadow-[0_14px_30px_-26px_rgba(0,0,0,0.55)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent pt-3"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("ariaOpenMenu")}
          aria-expanded={open}
          className="group flex items-center gap-2.5 rounded-full border border-hair bg-white/95 py-1.5 ps-1.5 pe-4 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-hair bg-paper text-ink">
            <span className="pw-logo inline-flex">
              <Monogram size={14} />
            </span>
            <i className="pw-logo-cur" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            {t("menuLabel")}
          </span>
          <Menu className="h-3.5 w-3.5 text-ink-mute" />
        </button>

        <button
          type="button"
          data-drip-link
          onClick={toggle}
          aria-label={t("langSwitchLabel")}
          title={t("langSwitchLabel")}
          className="flex h-9 items-center justify-center rounded-full border border-hair bg-white/95 px-3 font-mono text-[10px] font-semibold text-ink shadow-[0_12px_30px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          {t("langSwitch")}
        </button>
      </header>

      {/* ---------- Mobile sheet ---------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/30 lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t("ariaNav")}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={spring.momentum}
              className="fixed inset-x-0 bottom-0 z-[60] rounded-t-3xl border-t border-hair bg-paper p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
            >
              <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-black/10" />
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => go(link.href)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-lg font-medium text-ink transition-colors hover:bg-black/5"
                  >
                    <link.icon className="h-[18px] w-[18px] text-ink-mute" />
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex gap-3 border-t border-hair pt-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white text-ink-mute"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("ariaCloseMenu")}
                className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-hair bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Rail
