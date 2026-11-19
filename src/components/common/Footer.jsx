import React from "react"
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp } from "react-icons/fi"
import { useData, useLang } from "../../i18n/LanguageContext"
import { scrollToElement } from "../../utils/helpers"

const Footer = () => {
  const { personalInfo, navLinks } = useData()
  const { t, n, isRTL } = useLang()
  const year = n(new Date().getFullYear())

  const connect = [
    { icon: FiGithub, label: "GitHub", href: personalInfo.github },
    { icon: FiLinkedin, label: "LinkedIn", href: personalInfo.linkedin },
    { icon: FiMail, label: t("contactEmail"), href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: t("footerPhone"), href: `tel:${personalInfo.phone}`, dir: "ltr" },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Support band */}
      <a
        href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(t("footerSupportSubject"))}`}
        className="group flex items-center justify-center gap-3 bg-amber py-5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-[#FCD34D]/80"
      >
        <span aria-hidden="true">☕</span>
        <span>{t("footerSupport")}</span>
        <span className="arrow" aria-hidden="true">
          {isRTL ? "\u2190" : "\u2192"}
        </span>
      </a>

      <div className="border-t border-hair bg-paper">
        <div className="shell relative py-16">
          {/* Watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none font-serif text-[26vw] italic leading-none text-black/[0.045]"
          >
            {t("footerWatermark")}
          </span>

          <div className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {/* Brand */}
            <div>
              <p className="eyebrow-crimson mb-4">{t("footerTagline")}</p>
              <p className="max-w-xs text-[14px] leading-relaxed text-ink-mute">
                {t("footerDesc")}
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-5 inline-block text-[14px] font-medium text-ink underline decoration-hair underline-offset-[6px] transition-colors duration-200 hover:text-crimson hover:decoration-crimson"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Index */}
            <nav aria-label={t("ariaIndex")}>
              <p className="eyebrow mb-4">{t("footerIndex")}</p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToElement(link.href.slice(1))
                      }}
                      className="text-[14px] text-ink-mute transition-colors duration-200 hover:text-crimson"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-ink-mute transition-colors duration-200 hover:text-crimson"
                  >
                    {t("heroCtaGhost")}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <p className="eyebrow mb-4">{t("footerContact")}</p>
              <ul className="space-y-2.5">
                {connect.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        dir={item.dir}
                        className="group inline-flex items-center gap-2 text-[14px] text-ink-mute transition-colors duration-200 hover:text-crimson"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-14 flex flex-col gap-4 border-t border-hair pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              © {year} {personalInfo.name} — {t("footerCredit")} {personalInfo.location}
            </p>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                {t("footerStack")}
              </span>
              <button
                type="button"
                onClick={() => scrollToElement("hero")}
                className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute transition-colors duration-200 hover:text-crimson"
              >
                <FiArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {t("footerTop")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
