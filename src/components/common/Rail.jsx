import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { Mail, Menu, X } from "lucide-react"
import Monogram from "./Monogram"
import { navLinks, personalInfo } from "../../data/portfolioData"
import { scrollToElement } from "../../utils/helpers"
import { spring } from "../../lib/motion"

/**
 * Left rail — the navigation lives on the left edge as a slim vertical
 * strip of icons, the way the reference site does it. Below `lg` the rail
 * is replaced by a compact top bar and a bottom sheet.
 */
const Rail = () => {
  const [active, setActive] = useState("hero")
  const [open, setOpen] = useState(false)

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
    { icon: <Mail className="h-[17px] w-[17px]" />, href: `mailto:${personalInfo.email}`, label: "Email" },
  ]

  return (
    <>
      {/* ---------- Desktop rail ---------- */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[68px] flex-col items-center border-r border-hair bg-paper/90 backdrop-blur-md lg:flex">
        {/* Monogram */}
        <button
          type="button"
          onClick={() => go("#hero")}
          aria-label="Retour en haut"
          className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-hair bg-white text-ink transition-colors duration-300 hover:border-crimson hover:text-crimson"
        >
          <Monogram size={19} />
        </button>

        {/* Section anchors */}
        <nav className="mt-10 flex flex-1 flex-col items-center gap-2" aria-label="Navigation principale">
          {navLinks.map((link) => {
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
                className="rail-btn group"
              >
                <Icon className="h-[18px] w-[18px]" />
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {link.name}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Socials */}
        <div className="mb-6 flex flex-col items-center gap-2 border-t border-hair pt-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="rail-btn"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </aside>

      {/* ---------- Mobile top bar ---------- */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-hair bg-paper/90 px-5 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => go("#hero")}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-hair bg-white text-ink"
        >
          <Monogram size={18} />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white text-ink"
        >
          <Menu className="h-5 w-5" />
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
              aria-label="Navigation"
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
                aria-label="Fermer le menu"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-hair bg-white"
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
