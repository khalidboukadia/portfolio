import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useLang } from "../../i18n/LanguageContext"

/*
  "The drip page transition" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/

  Adapté aux bascules du portfolio (langue et thème) : la peinture qui
  coule prend la couleur opposée au thème courant (noire sur thème clair,
  beige chaud sur thème sombre) au lieu du bleu cobalt de la démo.
*/

/* ---- valeurs réglables ---- */
const FILL = 1.2 /* secondes pour que la peinture couvre la page */
const RELEASE = 1 /* secondes pour qu'elle glisse vers le bas et libère la page */
const DRIPS = 11 /* combien de coulures sur un écran de 1000 px */
const SPREAD = 0.32 /* retard des coulures lointaines (0 = toutes ensemble) */
const BULB = 1.25 /* gonflement de la goutte en bout de coulure */
const STRANDS = 3 /* fils qui retiennent le bord supérieur pendant la descente */
const DROPS = 2 /* gouttes qui se détachent et tombent devant */
const SPEED = 1 /* 2 = deux fois plus vite, 0.5 = la moitié */

/* La peinture s'adapte au thème courant : ses couleurs sont les jetons
   --paint / --glint du système de couleurs (index.css) — encre noire sur le
   thème clair, beige chaud sur le thème sombre — c'est-à-dire la couleur du
   thème vers lequel on bascule, pour que la révélation soit sans couture. */
const readPaintColors = () => {
  try {
    const cs = getComputedStyle(document.documentElement)
    return {
      paint: cs.getPropertyValue("--paint").trim() || "#43413e",
      glint: cs.getPropertyValue("--glint").trim() || "#7a766f",
    }
  } catch {
    return { paint: "#43413e", glint: "#7a766f" }
  }
}

/* Les deux extrémités du dégradé de la coulée (jetons fixes --paint-ink /
   --paint-cream) : la peinture part de la couleur du thème courant et se
   transforme progressivement vers celle de l'autre thème pendant sa descente. */
const readPaintEndpoints = () => {
  try {
    const cs = getComputedStyle(document.documentElement)
    return {
      ink: {
        paint: cs.getPropertyValue("--paint-ink").trim() || "#43413e",
        glint: cs.getPropertyValue("--glint-ink").trim() || "#7a766f",
      },
      cream: {
        paint: cs.getPropertyValue("--paint-cream").trim() || "#e9e7e2",
        glint: cs.getPropertyValue("--glint-cream").trim() || "#ffffff",
      },
    }
  } catch {
    return {
      ink: { paint: "#43413e", glint: "#7a766f" },
      cream: { paint: "#e9e7e2", glint: "#ffffff" },
    }
  }
}

const hexToRgb = (hex) => {
  const h = hex.replace("#", "")
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}
const mixHex = (a, b, t) => {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}
const BAND = 3 /* la bande de peinture qui attend en haut, en px */
const STEP = 3 /* pas de mesure du bord, en px */

const clamp = (a, b, v) => Math.min(b, Math.max(a, v))
const smooth = (a, b, v) => {
  const x = clamp(0, 1, (v - a) / (b - a))
  return x * x * (3 - 2 * x)
}

/* Un petit générateur pseudo-aléatoire avec graine : chaque coulure est unique. */
function random(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * La transition « peinture qui coule » des bascules langue et thème.
 *
 * Le composant est toujours monté : il dessine la bande de peinture qui
 * attend en haut de l'écran et, quand une bascule est demandée, il fait
 * couler la peinture, applique le changement sous la peinture, puis la
 * laisse glisser vers le bas pour révéler la nouvelle page.
 */
const DripTransition = ({ pendingTheme, applyTheme, clearPendingTheme }) => {
  const { pendingLang, applyLang, clearPending } = useLang()
  const canvasRef = useRef(null)
  const apiRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext("2d")
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let W = 0
    let H = 0
    let dpr = 1
    let clock = 0
    let band = 0 /* la bande se remplit à l'ouverture */
    let pour = null
    let busy = false
    let queuedPour = null /* une bascule demandée pendant une coulée attend son tour */
    /* Couleurs verrouillées au départ d'une coulée : le thème bascule sous la
       peinture, la coulée doit donc garder sa couleur jusqu'à la fin. */
    /* Pendant une coulée : { from, to } — la couleur active interpole de
       `from` vers `to` au rythme de la progression verticale (pour.t). */
    let lockedColors = null
    /* Les couleurs du thème courant, relues à chaque bascule de la classe
       `dark` sur <html> (la bande du haut suit le thème même au repos). */
    let themeColors = readPaintColors()
    const themeObserver = new MutationObserver(() => {
      themeColors = readPaintColors()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    const colorsForTheme = () => themeColors
    const activeColors = () => {
      if (!lockedColors) return colorsForTheme()
      /* pour.t : 0→1 pendant le remplissage, 1→2 pendant le relâchement —
         la transformation suit donc toute la descente de la couche. */
      const progress = pour ? Math.min(1, Math.max(0, pour.t / 2)) : 0
      return {
        paint: mixHex(lockedColors.from.paint, lockedColors.to.paint, progress),
        glint: mixHex(lockedColors.from.glint, lockedColors.to.glint, progress),
      }
    }
    const sag = { x: 0.5, h: 0, v: 0, target: 0 } /* le ventre de la bande au survol */

    /* ---------------------------------------------------------------- les coulures d'une coulée, en fractions de l'écran */
    function makePour(cx) {
      const rnd = random(Math.floor(Math.random() * 1e9))
      const n = clamp(5, 26, Math.round(DRIPS * (0.35 + (0.65 * W) / 1000)))
      const drips = []
      const far = Math.max(cx, 1 - cx, 0.001)
      for (let i = 0; i < n; i += 1) {
        const c = (i + 0.5 + (rnd() - 0.5) * 0.55) / n
        const d = SPREAD * (Math.abs(c - cx) / far) * (0.8 + 0.4 * rnd()) + rnd() * 0.04
        drips.push({
          c,
          hw: (0.16 + rnd() * 0.26) / n,
          d,
          e: Math.max(d + 0.4, 0.6 + rnd() * 0.24),
          reach: 1.15 + rnd() * 0.4,
          wob: rnd() * 6.28,
          drop: null,
        })
      }
      /* la coulure juste au-dessus du bouton laisse toujours tomber une goutte */
      const order = drips.map((p, i) => i).sort((i, j) => Math.abs(drips[i].c - cx) - Math.abs(drips[j].c - cx))
      const pick = [order[0], ...order.slice(1).sort(() => rnd() - 0.5)].slice(0, clamp(0, n, DROPS))
      for (const i of pick) drips[i].drop = { at: 0.42 + rnd() * 0.16 }
      /* les fils qui retiennent le bord de l'écran pendant la descente */
      const strands = []
      let tries = 0
      const want = clamp(0, 8, STRANDS)
      while (strands.length < want && tries < 200) {
        tries += 1
        const x = strands.length === 0 ? clamp(0.14, 0.86, cx + (rnd() - 0.5) * 0.16) : 0.1 + rnd() * 0.8
        if (strands.some((s) => Math.abs(s.x - x) < 0.6 / (want + 1))) continue
        strands.push({ x, w: 9 + rnd() * 6, snap: 0.24 + rnd() * 0.34, wob: 14 + rnd() * 8 })
      }
      return { t: 0, cx, drips, strands }
    }

    /* ---------------------------------------------------------------- mesures */
    function measure() {
      const r = canvas.getBoundingClientRect()
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
    }

    /* ---------------------------------------------------------------- le dessin */
    /* où est la pointe d'une coulure : lente d'abord (la goutte gonfle), puis la gravité */
    function tipOf(p, f) {
      const q = clamp(0, 1, (f - p.d) / (p.e - p.d))
      return { q, y: BAND + p.reach * H * (q * q * (0.25 + 0.75 * q)) }
    }

    /* le front de la nappe derrière les coulures : il part tard et rattrape, un peu irrégulier */
    function frontOf(f, x) {
      const q = clamp(0, 1, (f - 0.12) / 0.88)
      const y = BAND + (H + 60) * Math.pow(q, 1.8)
      return y + Math.sin(x * 0.013 + 1.7) * 7 * q * (1 - q) * 4 + Math.sin(x * 0.031) * 3 * (1 - q)
    }

    function drawGlint(x, y, r) {
      if (r < 4) return
      ctx.strokeStyle = activeColors().glint
      ctx.globalAlpha = 0.55
      ctx.lineWidth = Math.min(1.6, r * 0.12)
      ctx.beginPath()
      ctx.arc(x, y, r * 0.64, Math.PI * 1.08, Math.PI * 1.36)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    /* la bande qui attend en haut, avec le ventre au survol et une lente respiration */
    function drawBand() {
      const h0 = BAND * band
      if (h0 <= 0.01) return
      const sx = sag.x * W
      ctx.fillStyle = activeColors().paint
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(W, 0)
      for (let x = W; x >= -STEP; x -= STEP) {
        const u = (x - sx) / 22
        const y = h0 + Math.sin(x * 0.02 + clock * 1.3) * 0.35 + Math.max(0, sag.h) * Math.exp(-u * u)
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      if (sag.h > 3) {
        const r = Math.min(6, sag.h * 0.42)
        ctx.beginPath()
        ctx.arc(sx, h0 + sag.h - r, r, 0, Math.PI * 2)
        ctx.fill()
        drawGlint(sx, h0 + sag.h - r, r)
      }
    }

    function drawFill(g, f) {
      const drips = g.drips.map((p) => {
        const tip = tipOf(p, f)
        const cx = p.c * W
        const hw = Math.max(3, p.hw * W)
        const front = frontOf(f, cx)
        let L = Math.max(0, tip.y - front)
        let r = hw * 0.62 * BULB * (0.78 + 0.22 * smooth(0, 0.6, tip.q))
        let drop = null
        if (p.drop && tip.q > p.drop.at) {
          const born = tipOf(p, p.d + p.drop.at * (p.e - p.d))
          const dt = (f - (p.d + p.drop.at * (p.e - p.d))) * (FILL / SPEED)
          const fall = born.y + H * 1.6 * dt + 0.5 * H * 7 * dt * dt
          const back = Math.exp(-dt * 9)
          r *= 1 - 0.32 * back
          L -= hw * 0.9 * back * smooth(0, 0.04, dt)
          drop = { y: fall, r: hw * 0.62 * BULB * 0.9, v: 1.6 + 7 * dt, dt }
        }
        L = Math.max(0, L)
        const rr = Math.min(r, L * 0.55)
        return { cx, hw, front, L, r: rr, drop, wob: p.wob }
      })

      ctx.fillStyle = activeColors().paint
      ctx.beginPath()
      ctx.moveTo(-2, -2)
      ctx.lineTo(W + 2, -2)
      for (let x = W + STEP; x >= -STEP; x -= STEP) {
        let y = frontOf(f, x)
        for (const d of drips) {
          const u = Math.abs(x - d.cx) / d.hw
          if (u > 1.7 || d.L <= 0) continue
          const neck = Math.max(0, d.L - d.r)
          y = Math.max(y, d.front + neck * (1 - smooth(0.5, 1.65, u)))
        }
        ctx.lineTo(x, Math.max(BAND, y))
      }
      ctx.closePath()
      ctx.fill()

      for (const d of drips) {
        if (d.r < 0.8) continue
        const by = d.front + d.L - d.r
        const rx = d.r * (1 + 0.025 * Math.sin(clock * 9 + d.wob))
        ctx.fillStyle = activeColors().paint
        ctx.beginPath()
        ctx.ellipse(d.cx, by, rx, d.r, 0, 0, Math.PI * 2)
        ctx.fill()
        if (by + d.r < H) drawGlint(d.cx, by, d.r)
      }

      /* les gouttes détachées : étirées par la vitesse, encore liées par un fil un instant */
      for (const d of drips) {
        if (!d.drop || d.drop.y - d.drop.r > H) continue
        const s = Math.min(0.55, d.drop.v * 0.05)
        const tipY = d.front + d.L
        ctx.fillStyle = activeColors().paint
        if (d.drop.dt < 0.09) {
          const k = 1 - d.drop.dt / 0.09
          ctx.beginPath()
          ctx.moveTo(d.cx - d.hw * 0.4 * k, tipY - 2)
          ctx.lineTo(d.cx + d.hw * 0.4 * k, tipY - 2)
          ctx.lineTo(d.cx + 0.6 * k, d.drop.y - d.drop.r * 0.6)
          ctx.lineTo(d.cx - 0.6 * k, d.drop.y - d.drop.r * 0.6)
          ctx.closePath()
          ctx.fill()
        }
        ctx.beginPath()
        ctx.ellipse(d.cx, d.drop.y, d.drop.r * (1 - s * 0.35), d.drop.r * (1 + s), 0, 0, Math.PI * 2)
        ctx.fill()
        drawGlint(d.cx, d.drop.y, d.drop.r)
      }
    }

    /* la descente : le bord supérieur de la peinture descend, les fils la retiennent, s'amincissent, cassent */
    function drawRelease(g, k) {
      const fall = H + 90
      const S = BAND + fall * Math.pow(k, 1.7)
      const peaks = []
      ctx.fillStyle = activeColors().paint
      for (const s of g.strands) {
        const x = s.x * W
        const snapAt = s.snap * H
        if (S < snapAt) {
          const w = s.w * (1 - 0.68 * Math.pow(S / snapAt, 0.8))
          const flare = Math.min(14, S * 0.25)
          ctx.beginPath()
          ctx.moveTo(x - w / 2 - flare * 0.9, 0)
          ctx.quadraticCurveTo(x - w / 2, 0, x - w / 2, flare)
          ctx.quadraticCurveTo(x - w * 0.16, S * 0.55, x - w / 2, S - flare)
          ctx.quadraticCurveTo(x - w / 2, S, x - w / 2 - flare * 1.4, S + 4)
          ctx.lineTo(x + w / 2 + flare * 1.4, S + 4)
          ctx.quadraticCurveTo(x + w / 2, S, x + w / 2, S - flare)
          ctx.quadraticCurveTo(x + w * 0.16, S * 0.55, x + w / 2, flare)
          ctx.quadraticCurveTo(x + w / 2, 0, x + w / 2 + flare * 0.9, 0)
          ctx.closePath()
          ctx.fill()
          peaks.push({ x, h: Math.min(28, S * 0.12), w: 26 })
        } else {
          const kSnap = Math.pow(Math.max(0, snapAt - BAND) / fall, 1 / 1.7)
          const tau = Math.max(0, (k - kSnap) * (RELEASE / SPEED))
          /* le morceau du haut remonte dans la bande, avec une perle au bout */
          const up =
            snapAt * 0.16 * Math.pow(Math.max(0, 1 - tau / 0.42), 2) *
            (1 + 0.18 * Math.sin(tau * 34) * Math.exp(-tau * 8))
          if (up > 0.5) {
            const w = s.w * 0.24
            const r = Math.min(w * 1.3, up * 0.5)
            ctx.beginPath()
            ctx.moveTo(x - w - 6, 0)
            ctx.quadraticCurveTo(x - w * 0.5, 0, x - w * 0.5, Math.min(6, up))
            ctx.lineTo(x - w * 0.5, up - r)
            ctx.lineTo(x + w * 0.5, up - r)
            ctx.lineTo(x + w * 0.5, Math.min(6, up))
            ctx.quadraticCurveTo(x + w * 0.5, 0, x + w + 6, 0)
            ctx.closePath()
            ctx.fill()
            ctx.beginPath()
            ctx.arc(x, up - r, r, 0, Math.PI * 2)
            ctx.fill()
          }
          /* le morceau du bas retombe dans la masse, qui oscille là où elle a lâché */
          const low = snapAt * 0.22 * Math.pow(Math.max(0, 1 - tau / 0.16), 2)
          const ring = 28 * Math.exp(-tau * 6.5) * Math.cos(tau * s.wob)
          peaks.push({ x, h: low + (Math.min(28, snapAt * 0.12) * ring) / 28, w: 26 + low * 0.2, thin: low })
        }
      }

      const edge = (x) => {
        let y = S + Math.sin(x * 0.017 + clock * 2) * 2.5 * (1 - k)
        for (const p of peaks) {
          const u = (x - p.x) / (p.thin ? 5 + p.w * 0.25 : p.w)
          y -= p.h * Math.exp(-u * u)
        }
        return y
      }
      ctx.beginPath()
      ctx.moveTo(-2, H + 2)
      for (let x = -STEP; x <= W + STEP; x += STEP) ctx.lineTo(x, edge(x))
      ctx.lineTo(W + 2, H + 2)
      ctx.closePath()
      ctx.fill()
      /* un liseré de lumière sous le bord qui descend */
      if (S < H + 10) {
        ctx.strokeStyle = activeColors().glint
        ctx.globalAlpha = 0.4 * (1 - smooth(0.7, 1, S / H))
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = -STEP; x <= W + STEP; x += STEP) {
          const y = edge(x) + 3
          if (x === -STEP) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      if (pour) {
        if (pour.t <= 1) drawFill(pour, pour.t)
        else drawRelease(pour, pour.t - 1)
      }
      drawBand()
    }

    /* ---------------------------------------------------------------- la coulée */
    function startPour(applyFn, clearFn, originSelector) {
      if (busy) {
        queuedPour = { applyFn, clearFn, originSelector }
        return
      }
      busy = true
      /* Départ : la peinture du thème courant. Arrivée : celle de l'autre
         thème (pour une bascule de thème, c'est le thème de destination). */
      const endpoints = readPaintEndpoints()
      lockedColors = document.documentElement.classList.contains("dark")
        ? { from: endpoints.cream, to: endpoints.ink }
        : { from: endpoints.ink, to: endpoints.cream }
      sag.target = 0
      sag.h = 0
      sag.v = 0
      /* la peinture part de la position du bouton qui a déclenché la bascule
         (celui qui est visible : sur téléphone c'est celui de la barre du haut) */
      let x = W * 0.5
      const link = Array.from(document.querySelectorAll(originSelector)).find(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0
      )
      if (link) {
        const l = link.getBoundingClientRect()
        x = l.left + l.width / 2
      }
      pour = makePour(clamp(0.04, 0.96, x / W))
      const tl = gsap.timeline({
        onComplete: () => {
          pour = null
          busy = false
          lockedColors = null
          if (queuedPour) {
            const q = queuedPour
            queuedPour = null
            startPour(q.applyFn, q.clearFn, q.originSelector)
          }
        },
      })
      tl.to(pour, { t: 1, duration: FILL / SPEED, ease: "none" })
      /* la bascule (langue ou thème) s'applique quand l'écran est entièrement couvert */
      tl.call(() => applyFn())
      tl.to({}, { duration: 0.12 / SPEED })
      tl.to(pour, { t: 2, duration: RELEASE / SPEED, ease: "none" })
      tl.call(() => clearFn())
    }

    /* ---------------------------------------------------------------- montage */
    measure()
    const onResize = () => measure()
    window.addEventListener("resize", onResize)

    const links = []
    const bindLinks = () => {
      links.forEach((l) => l.el.removeEventListener("pointerenter", l.enter))
      links.forEach((l) => l.el.removeEventListener("pointerleave", l.leave))
      links.length = 0
      document.querySelectorAll("[data-drip-link], [data-drip-theme]").forEach((el) => {
        const enter = (ev) => {
          if (REDUCED || ev.pointerType !== "mouse" || busy) return
          const r = canvas.getBoundingClientRect()
          const l = el.getBoundingClientRect()
          sag.x = (l.left + l.width / 2 - r.left) / W
          sag.target = 11
        }
        const leave = () => {
          sag.target = 0
        }
        el.addEventListener("pointerenter", enter)
        el.addEventListener("pointerleave", leave)
        links.push({ el, enter, leave })
      })
    }
    bindLinks()

    /* la bande de peinture se remplit après l'intro */
    if (REDUCED) band = 1
    else gsap.to({ v: 0 }, { v: 1, duration: 0.9, delay: 2.4, ease: "power2.out", onUpdate() { band = this.targets()[0].v } })

    const ticker = (time, delta) => {
      const dt = Math.min(0.05, delta / 1000)
      clock += dt
      /* le ventre de la bande est un ressort : il dépasse d'un pixel puis se pose */
      sag.v += ((sag.target - sag.h) * 120 - sag.v * 11) * dt
      sag.h += sag.v * dt
      draw()
    }
    gsap.ticker.add(ticker)

    apiRef.current = {
      startPour,
      rebind: bindLinks,
      reduced: REDUCED,
    }

    return () => {
      themeObserver.disconnect()
      window.removeEventListener("resize", onResize)
      gsap.ticker.remove(ticker)
      links.forEach((l) => {
        l.el.removeEventListener("pointerenter", l.enter)
        l.el.removeEventListener("pointerleave", l.leave)
      })
      apiRef.current = null
    }
  }, [])

  /* la langue demandée déclenche la coulée */
  useEffect(() => {
    if (!pendingLang) return
    const api = apiRef.current
    if (!api) return
    if (api.reduced) {
      applyLang(pendingLang)
      clearPending()
      return
    }
    api.startPour(() => applyLang(pendingLang), clearPending, "[data-drip-link]")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingLang])

  /* le thème demandé déclenche la même coulée, depuis le bouton de thème */
  useEffect(() => {
    if (!pendingTheme) return
    const api = apiRef.current
    if (!api) return
    if (api.reduced) {
      applyTheme(pendingTheme)
      clearPendingTheme()
      return
    }
    api.startPour(() => applyTheme(pendingTheme), clearPendingTheme, "[data-drip-theme]")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] h-full w-full"
    />
  )
}

export default DripTransition
