import React from "react"

/**
 * Logo pixel du site — même principe que celui de makousb.com : un mot-symbole
 * large (rapport ~9.8:1) dessiné en pixels, rendu avec `shape-rendering:
 * crispEdges` pour que les bords restent nets quand il est révélé par
 * tranches (clip-path) pendant l'ouverture.
 *
 * Le monogramme « M » est en pixels 7×9, le nom en police bitmap 5×7.
 */

const GLYPHS = {
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
}

const MONOGRAM = [
  "1000001",
  "1100011",
  "1010101",
  "1010101",
  "1001001",
  "1000001",
  "1000001",
  "1000001",
  "1000001",
]

const PX = 1
const GAP = 1

/** Convertit une bitmap en rectangles, en fusionnant les pixels contigus. */
const bitmapRects = (rows, ox, oy) => {
  const rects = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      if (row[x] !== "1") {
        x += 1
        continue
      }
      let run = 1
      while (x + run < row.length && row[x + run] === "1") run += 1
      rects.push({ x: ox + x * PX, y: oy + y * PX, w: run * PX, h: PX })
      x += run
    }
  })
  return rects
}

const textRows = (word) => {
  const chars = word.split("")
  const height = 7
  const rows = Array.from({ length: height }, () => "")
  chars.forEach((ch, ci) => {
    const glyph = GLYPHS[ch]
    const ox = ci * (5 + GAP)
    for (let y = 0; y < height; y += 1) {
      const line = glyph?.[y] ?? "00000"
      rows[y] += line + (ci < chars.length - 1 ? "0" : "")
    }
    void ox
  })
  return rows
}

const buildLogo = () => {
  const rects = []
  // Monogramme « M » — 7×9 px, aligné en bas sur la ligne de texte.
  rects.push(...bitmapRects(MONOGRAM, 0, 1))
  // « MUSTAPHA »
  const w1 = textRows("MUSTAPHA")
  rects.push(...bitmapRects(w1, 11, 2))
  // Séparateur : un tiret vertical de 3 px
  rects.push({ x: 58, y: 4, w: 1, h: 3 })
  // « BOUKADIA »
  const w2 = textRows("BOUKADIA")
  rects.push(...bitmapRects(w2, 62, 2))

  const width = rects.reduce((max, r) => Math.max(max, r.x + r.w), 0)
  const height = rects.reduce((max, r) => Math.max(max, r.y + r.h), 0)
  return { rects, width, height }
}

/** Version « monogramme seul » — utilisée en mode arabe, où le mot-symbole
    latin ne veut rien dire : seul le M en pixels reste. */
const buildMonogram = () => {
  const rects = bitmapRects(MONOGRAM, 0, 0)
  const width = rects.reduce((max, r) => Math.max(max, r.x + r.w), 0)
  const height = rects.reduce((max, r) => Math.max(max, r.y + r.h), 0)
  return { rects, width, height }
}

const LOGO = buildLogo()
const MONO = buildMonogram()

const PixelLogo = ({ className = "", compact = false }) => {
  const logo = compact ? MONO : LOGO
  return (
    <svg
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {logo.rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} />
      ))}
    </svg>
  )
}

export default PixelLogo
