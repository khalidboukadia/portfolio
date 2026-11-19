import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useLang } from "../../i18n/LanguageContext"
import { CHAT } from "../../i18n/chat"
import { useData } from "../../i18n/LanguageContext"
import { spring } from "../../lib/motion"

/**
 * Fenêtre de conversation flottante — **scriptée**, sans IA ni API.
 *
 * Le parcours est un arbre de questions écrit à l'avance (src/i18n/chat.js) :
 *
 *   accueil → nom → objet → budget → délai → contact → résumé
 *
 * Le nom est demandé dès le départ : il finit dans le résumé et dans
 * l'e-mail pré-rempli envoyé au propriétaire du site, qui sait ainsi qui
 * l'a contacté. Les questions libres qui ne suivent pas le scénario sont
 * reconnues par mots-clés et reçoivent une réponse préparée.
 */
const STORAGE_KEY = "mb-chat-intake"

const STEP_INTENT = "intent"
const STEP_BUDGET = "budget"
const STEP_TIMELINE = "timeline"
const STEP_CONTACT = "contact"

const ChatWidget = () => {
  const { lang, isRTL } = useLang()
  const { personalInfo } = useData()
  const t = CHAT[lang] ?? CHAT.fr
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState("menu")
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [quick, setQuick] = useState([])
  const [data, setData] = useState({ name: "", intent: "", budget: "", timeline: "", contact: "" })
  const [unread, setUnread] = useState(true)
  // Sur mobile, la pastille de conversation s'efface pendant qu'on descend
  // (elle couvrait le texte derrière elle) et revient quand on remonte ou
  // qu'on s'arrête.
  const [hidden, setHidden] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (open) return undefined
    let last = window.scrollY
    let timer = null
    const onScroll = () => {
      const y = window.scrollY
      const down = y > last + 6
      const up = y < last - 6
      last = y
      if (window.innerWidth >= 640) return
      if (down) setHidden(true)
      else if (up) setHidden(false)
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => setHidden(false), 900)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timer) clearTimeout(timer)
    }
  }, [open])

  const push = (text, from = "bot") => {
    setMessages((m) => [...m, { from, text }])
  }

  /* ---------------- démarrage ---------------- */
  const start = () => {
    setMessages([{ from: "bot", text: t.bot.hello }])
    setQuick([
      { label: t.quick.stack, action: "topic:stack" },
      { label: t.quick.experience, action: "topic:experience" },
      { label: t.quick.location, action: "topic:location" },
      { label: t.quick.project, action: "next:name" },
    ])
    setStep("menu")
  }

  useEffect(() => {
    if (!open) return
    if (messages.length === 0) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open) {
      setUnread(false)
      const t2 = setTimeout(() => inputRef.current?.focus(), 260)
      return () => clearTimeout(t2)
    }
    return undefined
  }, [open, step])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, quick])

  /* ---------------- étapes du scénario ---------------- */
  const askName = () => {
    push(t.bot.askName)
    setQuick([])
    setStep("name")
  }

  const askIntent = () => {
    push(t.bot.askIntent)
    setQuick([
      { label: t.bot.intents.project, action: `intent:${t.bot.intents.project}` },
      { label: t.bot.intents.job, action: `intent:${t.bot.intents.job}` },
      { label: t.bot.intents.freelance, action: `intent:${t.bot.intents.freelance}` },
      { label: t.bot.intents.collab, action: `intent:${t.bot.intents.collab}` },
      { label: t.bot.intents.other, action: `intent:${t.bot.intents.other}` },
    ])
    setStep(STEP_INTENT)
  }

  const askBudget = () => {
    push(t.bot.askBudget)
    setQuick([
      { label: t.bot.budgets.small, action: `budget:${t.bot.budgets.small}` },
      { label: t.bot.budgets.medium, action: `budget:${t.bot.budgets.medium}` },
      { label: t.bot.budgets.large, action: `budget:${t.bot.budgets.large}` },
      { label: t.bot.budgets.unknown, action: `budget:${t.bot.budgets.unknown}` },
    ])
    setStep(STEP_BUDGET)
  }

  const askTimeline = () => {
    push(t.bot.askTimeline)
    setQuick([
      { label: t.bot.timelines.urgent, action: `timeline:${t.bot.timelines.urgent}` },
      { label: t.bot.timelines.month, action: `timeline:${t.bot.timelines.month}` },
      { label: t.bot.timelines.quarter, action: `timeline:${t.bot.timelines.quarter}` },
      { label: t.bot.timelines.later, action: `timeline:${t.bot.timelines.later}` },
    ])
    setStep(STEP_TIMELINE)
  }

  const askContact = () => {
    push(t.bot.askContact)
    setQuick([])
    setStep(STEP_CONTACT)
  }

  const summarise = (override) => {
    const final = { ...data, ...(override ?? {}) }
    push(t.bot.summary(final))
    setQuick([
      { label: t.bot.sendMail, action: "send" },
      { label: t.bot.startOver, action: "restart" },
    ])
    setStep("summary")
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...final, at: new Date().toISOString() }))
    } catch {
      /* no-op */
    }
  }

  /* ---------------- réponses préparées ---------------- */
  const topics = [
    { keys: ["stack", "technolog", "تقني", "لغة", "أداة"], topic: "stack" },
    { keys: ["expéri", "experience", "خبر", "سنوات", "parcours", "مسار"], topic: "experience" },
    { keys: ["lieu", "where", "محل", "أين", "ville", "موقع"], topic: "location" },
    { keys: ["dispo", "avail", "متاح", "توفر", "tfjob", "recrut"], topic: "availability" },
    { keys: ["contact", "mail", "email", "بريد", "تواصل", "اتصال"], topic: "contact" },
    { keys: ["méthod", "method", "approch", "منهج", "أسلوب", "خطوات"], topic: "approach" },
  ]

  const matchTopic = (text) => {
    const low = text.toLowerCase()
    const found = topics.find((entry) => entry.keys.some((k) => low.includes(k)))
    return found ? found.topic : null
  }

  /* ---------------- actions ---------------- */
  const handleQuick = (action) => {
    if (action.startsWith("topic:")) {
      const key = action.split(":")[1]
      push(t.bot.topics[key] ?? t.fallback)
      return
    }
    if (action === "next:name") {
      askName()
      return
    }
    if (action.startsWith("intent:")) {
      const value = action.slice("intent:".length)
      setData((d) => ({ ...d, intent: value }))
      push(value, "user")
      askBudget()
      return
    }
    if (action.startsWith("budget:")) {
      const value = action.slice("budget:".length)
      setData((d) => ({ ...d, budget: value }))
      push(value, "user")
      askTimeline()
      return
    }
    if (action.startsWith("timeline:")) {
      const value = action.slice("timeline:".length)
      setData((d) => ({ ...d, timeline: value }))
      push(value, "user")
      askContact()
      return
    }
    if (action === "send") {
      const body = `${t.bot.summary(data)}\n\n—`
      const href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `${isRTL ? "طلب جديد عبر الموقع" : "Nouvelle demande via le site"} — ${data.name}`
      )}&body=${encodeURIComponent(body)}`
      window.location.href = href
      push(t.bot.sent)
      return
    }
    if (action === "restart") {
      setData({ name: "", intent: "", budget: "", timeline: "", contact: "" })
      setMessages([])
      setQuick([])
      start()
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    if (step === "name") {
      push(text, "user")
      setData((d) => ({ ...d, name: text }))
      push(t.bot.nameOk(text))
      setInput("")
      askIntent()
      return
    }

    if (step === STEP_CONTACT) {
      push(text, "user")
      setData((d) => ({ ...d, contact: text }))
      setInput("")
      push(t.bot.contactOk)
      window.setTimeout(() => summarise({ ...data, contact: text }), 450)
      return
    }

    // Question libre : on tente d'y répondre, sinon on renvoie vers le scénario.
    push(text, "user")
    setInput("")
    const topic = matchTopic(text)
    if (topic) {
      push(t.bot.topics[topic] ?? t.fallback)
      return
    }
    if (step === "menu") {
      push(t.fallback)
      askName()
      return
    }
    push(t.fallback)
  }

  const close = () => {
    setOpen(false)
    openerRef.current?.focus?.()
  }

  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <>
      {/* ---------------- bouton flottant ----------------
          Sur mobile il s'efface quand on descend (il masquait le texte
          derrière lui) et revient dès qu'on remonte ou qu'on s'arrête. */}
      <button
        ref={openerRef}
        type="button"
        data-chat-toggle="true"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        className={`group fixed bottom-5 end-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-[transform,opacity] duration-300 hover:scale-105 sm:bottom-7 sm:end-7 sm:h-14 sm:w-14 ${
          hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      >
        {unread && !open && (
          <span className="absolute -top-0.5 end-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-crimson" />
        )}
        {open ? (
          <X className="h-5 w-5" strokeWidth={1.8} />
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8Z" strokeLinejoin="round" />
            <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* ---------------- fenêtre ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={spring.snappy}
            role="dialog"
            aria-modal="false"
            aria-label={t.title}
            className="fixed bottom-24 end-5 z-[91] flex w-[calc(100vw-2.5rem)] max-w-[360px] flex-col overflow-hidden rounded-3xl border border-hair bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] sm:bottom-28 sm:end-7"
            style={{ maxHeight: "min(72vh, 560px)" }}
          >
            {/* en-tête */}
            <div className="flex items-center gap-3 border-b border-hair bg-paper px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink font-serif text-[15px] italic text-white">
                M
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold text-ink">{t.title}</span>
                <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                  {t.subtitle}
                </span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={t.close}
                className="ms-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-mute transition-colors hover:bg-black/5 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ minHeight: "220px" }}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    dir="auto"
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "user"
                        ? "rounded-ee-md bg-ink text-white"
                        : "rounded-es-md bg-paper text-ink-soft"
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* réponses rapides */}
            {quick.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-hair px-4 py-3">
                {quick.map((q) => (
                  <button
                    key={q.action}
                    type="button"
                    onClick={() => handleQuick(q.action)}
                    className="rounded-full border border-hair bg-white px-3 py-1.5 text-[12px] font-medium text-ink-mute transition-colors hover:border-crimson hover:text-crimson"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* saisie */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-hair bg-paper px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                className="min-w-0 flex-1 rounded-xl border border-hair bg-white px-3 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-crimson"
              />
              <button
                type="submit"
                aria-label={t.send}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-transform hover:scale-105"
              >
                <Arrow className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
