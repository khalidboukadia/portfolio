import React, { useEffect, useRef, useState } from "react"
import PixelLogo from "./PixelLogo"

/**
 * Ouverture du site — **copie à l'identique** de makousb.com.
 *
 * Chronologie relevée dans le CSS du site d'origine :
 *
 *   0.20s → 0.95s  le logo pixel se révèle par tranches (clip-path,
 *                   `steps(22)`) et un curseur cramoisi balaie de gauche
 *                   à droite au même rythme.
 *   0.98s → 1.38s  deux copies fantômes (cramoisi / menthe) jouent un
 *                   glitch en 4 bandes pendant 0.40s.
 *   1.30s → 1.50s  le bloc logo s'efface (`pwOut`, 0.20s).
 *   1.40s → 2.03s  **8 colonnes noires** se replient vers le haut
 *                   (`scaleY` 1→0, 0.45s, cubic-bezier(.7,0,.2,1)).
 *                   Les délais sont symétriques : 1.40 / 1.46 / 1.52 /
 *                   1.58 / 1.58 / 1.52 / 1.46 / 1.40 — les colonnes
 *                   extérieures partent **des deux côtés à la fois** et la
 *                   vague se referme sur le **centre**.
 *   2.20s          l'écran d'amorçage est retiré (`pwBootGone`).
 *
 * Le contenu de la page est ensuite animé par le CSS `.pw-anim` avec le
 * même décalage `--d: 1.65s` que sur le site d'origine.
 */
const Preloader = ({ onDone }) => {
  const [visible, setVisible] = useState(true)
  // Sur mobile, le mot-symbole pixel se réduit au monogramme « M » seul ;
  // sur écran large, le nom complet s'affiche.
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches
  )

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setVisible(false)
    document.body.style.overflow = ""
    onDone?.()
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const t = setTimeout(finish, 2200)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div className="pw-boot" aria-hidden="true" onClick={finish}>
      {/* --- Les 8 colonnes noires qui se replient vers le haut --- */}
      <div className="pw-bars">
        {Array.from({ length: 8 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>

      {/* --- Le logo pixel --- */}
      <div className="pw-boot-in">
        <div className={compact ? "pw-boot-logo pw-boot-logo--mono" : "pw-boot-logo"}>
          <div className="m">
            <PixelLogo compact={compact} />
          </div>
          <i className="cur" />
          <div className="g1">
            <PixelLogo compact={compact} />
          </div>
          <div className="g2">
            <PixelLogo compact={compact} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
