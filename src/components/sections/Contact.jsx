import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiSend, FiCheckCircle, FiAlertCircle, FiMail, FiPhone, FiMapPin } from "react-icons/fi"
import emailjs from "@emailjs/browser"
import Reveal from "../common/Reveal"
import Button from "../common/Button"
import { personalInfo } from "../../data/portfolioData"
import { scrollToElement } from "../../utils/helpers"
import { spring } from "../../lib/motion"

// ✅ lecture directe depuis les variables d'environnement
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error")
      setErrorMsg("Veuillez remplir tous les champs")
      return
    }

    setStatus("sending")
    setErrorMsg("")

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Mustapha",
          reply_to: formData.email,
        },
        PUBLIC_KEY
      )

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      setStatus("error")
      setErrorMsg(error.text || "Erreur d'envoi")
    }
  }

  const contactInfo = [
    { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: "Téléphone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FiMapPin, label: "Localisation", value: personalInfo.location },
  ]

  return (
    <section id="contact" className="shell scroll-mt-20 py-24 sm:py-28 lg:py-32">
      {/* CTA band */}
      <Reveal>
        <div className="flex flex-col gap-8 border-b border-hair pb-14 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[1.35rem] leading-snug text-ink sm:text-[1.7rem]">
            Une idée qui mérite d&apos;exister ? Discutons du périmètre, du budget et
            des échéances.
          </p>
          <Button onClick={() => scrollToElement("contact-form")} arrow>
            Me contacter
          </Button>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* ---------- Left ---------- */}
        <div>
          <Reveal>
            <p className="serif-label">Parlons-en</p>
            <h2 className="display mt-3 text-[2.1rem] font-bold leading-[1.06] sm:text-[2.8rem]">
              Un projet en tête&nbsp;?
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-mute">
              Je réponds généralement sous 24&nbsp;heures. Une idée claire suffit
              pour démarrer — on affine le reste ensemble.
            </p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              const body = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hair bg-white text-ink-mute">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                      {info.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[15px] font-medium text-ink">
                      {info.value}
                    </span>
                  </span>
                </>
              )

              return (
                <Reveal key={info.label} delay={index * 0.06}>
                  {info.href ? (
                    <a href={info.href} className="group flex items-center gap-4">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{body}</div>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-hair bg-white px-4 py-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#059669]" />
              <span className="text-[13px] text-ink-mute">Disponible pour de nouvelles opportunités</span>
            </div>
          </Reveal>
        </div>

        {/* ---------- Form ---------- */}
        <Reveal delay={0.08}>
          <div id="contact-form" className="card-paper scroll-mt-28 p-6 sm:p-9">
            {status === "success" && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring.default}
                className="mb-6 flex items-center gap-3 rounded-xl border border-[#059669]/25 bg-[#059669]/10 p-4"
              >
                <FiCheckCircle className="h-5 w-5 shrink-0 text-[#047857]" />
                <p className="text-[14px] font-medium text-[#065F46]">
                  Message envoyé — je vous réponds très vite.
                </p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring.default}
                className="mb-6 flex items-center gap-3 rounded-xl border border-crimson/25 bg-crimson/10 p-4"
              >
                <FiAlertCircle className="h-5 w-5 shrink-0 text-crimson" />
                <p className="text-[14px] font-medium text-crimson">{errorMsg}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vous@email.com"
                    required
                    className="field"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet du message"
                  required
                  className="field"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                  className="field resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status === "sending" ? {} : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={spring.snappy}
                className={`btn-dark mt-7 w-full justify-center ${status === "sending" ? "opacity-70" : ""}`}
              >
                {status === "sending" ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi...
                  </>
                ) : (
                  <>
                    <FiSend className="h-4 w-4" />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              <p className="mt-4 text-center text-[12px] text-ink-faint">
                Vos informations restent confidentielles.
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
