import React from "react"
import ReactDOM from "react-dom/client"
import { MotionConfig } from "framer-motion"
import App from "./App.jsx"
import { LanguageProvider } from "./i18n/LanguageContext.jsx"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Honour prefers-reduced-motion everywhere: transform/layout
          animations are dropped, opacity/colour changes remain. */}
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MotionConfig>
    </HelmetProvider>
  </React.StrictMode>
)
