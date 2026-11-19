import { createContext, useContext, useEffect, useMemo, useState } from "react"
import fr from "../data/portfolioData"
import ar from "../data/portfolioData.ar"
import { UI } from "./ui"

/**
 * Bilingue (français / arabe) avec bascule complète du sens d'écriture.
 *
 * - `lang` pilote le `dir` du document : "rtl" en arabe, "ltr" en français.
 * - `data` renvoie le jeu de données correspondant à la langue active
 *   (mêmes valeurs factuelles, textes traduits).
 * - `t` lit les textes d'interface (boutons, titres de section…).
 * - `n` convertit les chiffres en écriture arabo-indienne (٠١٢٣٤٥٦٧٨٩).
 */

const STORAGE_KEY = "mb-lang"
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩"

const LanguageContext = createContext(null)

/** Chiffres arabes-indo : 2026 → ٢٠٢٦ */
export const formatNumber = (value, lang) => {
  if (lang !== "ar") return value
  return String(value).replace(/\d/g, (d) => AR_DIGITS[Number(d)])
}

/* Le choix de langue vit dans `sessionStorage` : il survit aux
   rechargements de l'onglet courant, mais toute nouvelle fenêtre, tout
   nouvel onglet ou nouveau navigateur repart du français — la langue
   par défaut. L'ancien stockage localStorage est nettoyé au passage. */
const detect = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved === "ar" || saved === "fr") return saved
  } catch {
    /* no-op */
  }
  return "fr"
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(detect)
  // Langue cible pendant la transition : l'écran est noir à ce moment-là,
  // donc le basculement reste invisible.
  const [pendingLang, setPendingLang] = useState(null)
  const dir = lang === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      sessionStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* no-op */
    }
  }, [lang, dir])

  /** Demande un changement de langue : le composant de transition s'en charge. */
  const requestLang = (next) => {
    if (!next || next === lang || pendingLang) return
    setPendingLang(next)
  }

  /** Appliqué par la transition, à l'instant où l'écran est noir. */
  const applyLang = (next) => {
    if (next) setLang(next)
  }

  const value = useMemo(
    () => ({
      lang,
      dir,
      isRTL: dir === "rtl",
      setLang,
      pendingLang,
      requestLang,
      applyLang,
      clearPending: () => setPendingLang(null),
      toggle: () => requestLang(lang === "ar" ? "fr" : "ar"),
      t: (key) => UI[lang][key] ?? UI.fr[key] ?? key,
      n: (v) => formatNumber(v, lang),
      data: lang === "ar" ? ar : fr,
    }),
    [lang, dir, pendingLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang doit être utilisé à l'intérieur de <LanguageProvider>")
  return ctx
}

/** Contenu (projets, parcours, compétences…) dans la langue active. */
export const useData = () => useLang().data

export default LanguageContext
