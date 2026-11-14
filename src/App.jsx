import React from "react"
import { Helmet } from "react-helmet-async"
import Rail from "./components/common/Rail"
import Footer from "./components/common/Footer"
import Hero from "./components/sections/Hero"
import Showcase from "./components/sections/Showcase"
import Beliefs from "./components/sections/Beliefs"
import Approach from "./components/sections/Approach"
import Skills from "./components/sections/Skills"
import Projects from "./components/sections/Projects"
import Journey from "./components/sections/Journey"
import Motion from "./components/sections/Motion"
import Contact from "./components/sections/Contact"

const App = () => {
  return (
    <>
      <Helmet>
        <title>Mustapha Boukadia | Développeur Full Stack MERN</title>
        <meta
          name="description"
          content="Portfolio de Mustapha Boukadia - Développeur Full Stack MERN spécialisé en React, Node.js, Laravel."
        />
      </Helmet>

      {/* The rail is fixed, so the page content is pushed aside on desktop. */}
      <div className="lg:pl-[68px]">
        <Rail />
        <main>
          <Hero />
          <Showcase />
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
    </>
  )
}

export default App
