import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import Rail from "./components/common/Rail"
import Footer from "./components/common/Footer"
import Preloader from "./components/common/Preloader"
import DripTransition from "./components/common/DripTransition"
import Hero from "./components/sections/Hero"
import Beliefs from "./components/sections/Beliefs"
import Approach from "./components/sections/Approach"
import Skills from "./components/sections/Skills"
import Projects from "./components/sections/Projects"
import Journey from "./components/sections/Journey"
import Motion from "./components/sections/Motion"
import Contact from "./components/sections/Contact"

/* Comme sur makousb.com : l'ouverture ne se joue qu'une fois par session.
   À la visite suivante, la page s'affiche directement. */
const INTRO_KEY = "mb-intro-seen"

const firstVisit = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1"
  } catch {
    return true
  }
}

const markSeen = () => {
  try {
    sessionStorage.setItem(INTRO_KEY, "1")
  } catch {
    /* no-op */
  }
}

const THEME_KEY = "mb-theme"

const initialTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light"
  } catch {
    return "light"
  }
}

const App = () => {
  const [theme, setTheme] = useState(initialTheme)

  // The `dark` class on <html> drives every theme token (see index.css).
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    // L'icône du site suit le thème (variante claire / variante sombre).
    const favicon = document.getElementById("mb-favicon")
    if (favicon) {
      favicon.setAttribute(
        "href",
        theme === "dark" ? "/favicon-dark.png?v=2" : "/favicon-light.png?v=2"
      )
    }
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* no-op */
    }
  }, [theme])

  // La bascule de thème passe par la transition « peinture qui coule »,
  // comme la langue : on demande, la transition applique sous la peinture.
  const [pendingTheme, setPendingTheme] = useState(null)
  const toggleTheme = () => {
    if (pendingTheme) return
    setPendingTheme(theme === "dark" ? "light" : "dark")
  }
  const applyTheme = (next) => {
    if (next) setTheme(next)
  }
  const [withIntro] = useState(firstVisit)
  // La mise en scène ne tourne que pendant l'ouverture : ensuite les
  // éléments restent dans leur état final, et changer de langue ne
  // relance rien.
  const [introLive, setIntroLive] = useState(withIntro)

  useEffect(() => {
    if (!withIntro) return undefined
    const id = setTimeout(() => setIntroLive(false), 3900)
    return () => clearTimeout(id)
  }, [withIntro])

  return (
    <>
      <Helmet>
        <title>Mustapha Boukadia | Développeur Full Stack MERN</title>
        <meta
          name="description"
          content="Portfolio de Mustapha Boukadia - Développeur Full Stack MERN spécialisé en React, Node.js, Laravel."
        />
      </Helmet>

      {/* Écran d'amorçage — makousb.com : logo pixel révélé par tranches,
          glitch, puis les huit colonnes noires qui se replient vers le haut
          en convergeant vers le centre. */}
      {withIntro && <Preloader onDone={markSeen} />}

      {/* `.pw-anim` fixe le décalage de mise en scène de la page
          (--d: 1.65s), exactement comme sur le site d'origine. */}
      <div
        className={`pw lg:ps-[68px] ${withIntro ? "pw-anim" : ""} ${
          introLive ? "intro-live" : ""
        }`}
      >
        <Rail theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Beliefs />
          <Approach />
          <Skills />
          <Projects />
          <Journey />
          <Motion />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Conversation flottante — scénario écrit, sans IA. */}

      {/* Changement de langue : la peinture noire coule du haut de l'écran,
          la langue bascule sous la peinture, puis elle glisse vers le bas et
          découvre la nouvelle page. */}
      <DripTransition
        pendingTheme={pendingTheme}
        applyTheme={applyTheme}
        clearPendingTheme={() => setPendingTheme(null)}
      />
    </>
  )
}

export default App
