/**
 * Audit de fidélité — compare les champs factuels du portfolio actuel
 * (src/data/portfolioData.js) avec la version d'origine (commit 4cf7586).
 *
 * Règle : tout ce qui existe dans l'original doit être identique.
 * Les clés AJOUTÉES (nouvelles sections rédactionnelles) sont listées à part
 * et ne sont pas considérées comme des divergences.
 *
 * Usage : node audit.mjs
 */
import { execSync } from "node:child_process"
import fs from "node:fs"

const ORIG_COMMIT = "4cf7586"
const tmp = "src/data/__orig.js"
fs.writeFileSync(tmp, execSync(`git show ${ORIG_COMMIT}:src/data/portfolioData.js`).toString())

const cur = await import("./src/data/portfolioData.js")
const orig = await import(`./src/data/__orig.js?${Date.now()}`)
fs.unlinkSync(tmp)

const diffs = []
const added = []

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const compareRecord = (label, a, b) => {
  if (!a || !b || typeof a !== "object") return
  for (const k of Object.keys(b)) {
    if (k === "icon" || k === "image") continue
    if (Array.isArray(b[k]) && b[k].every((x) => typeof x !== "object")) {
      if (!same(a[k], b[k])) diffs.push({ label: `${label}.${k}`, cur: a[k], orig: b[k] })
    } else if (!same(a[k], b[k])) {
      diffs.push({ label: `${label}.${k}`, cur: a[k], orig: b[k] })
    }
  }
  for (const k of Object.keys(a)) {
    if (!(k in b)) added.push(`${label}.${k} = ${JSON.stringify(a[k])}`)
  }
}

for (const key of Object.keys(orig)) {
  const a = cur[key]
  const b = orig[key]
  if (a === undefined) {
    diffs.push({ label: key, cur: "ABSENT", orig: "présent" })
    continue
  }
  if (Array.isArray(b)) {
    if (!Array.isArray(a) || a.length !== b.length) {
      diffs.push({ label: `${key}.length`, cur: a?.length, orig: b.length })
      continue
    }
    b.forEach((item, i) => {
      if (item && typeof item === "object") compareRecord(`${key}[${i}]`, a[i], item)
      else if (!same(a[i], item)) diffs.push({ label: `${key}[${i}]`, cur: a[i], orig: item })
    })
    for (let i = b.length; i < a.length; i += 1) {
      added.push(`${key}[${i}] = ${JSON.stringify(a[i])}`)
    }
  } else if (b && typeof b === "object") {
    compareRecord(key, a, b)
  } else if (!same(a, b)) {
    diffs.push({ label: key, cur: a, orig: b })
  }
}

for (const key of Object.keys(cur)) {
  if (!(key in orig)) added.push(`${key} (nouvelle section)`)
}

if (diffs.length === 0) {
  console.log(`🎉 AUCUNE divergence sur les champs factuels (vs ${ORIG_COMMIT})`)
} else {
  console.log(`❌ ${diffs.length} divergence(s) :`)
  diffs.forEach((d) => console.log(` - ${d.label}\n     actuel : ${JSON.stringify(d.cur)}\n     orig. : ${JSON.stringify(d.orig)}`))
  process.exitCode = 1
}
console.log(`\n(${added.length} champ(s) ajouté(s) — sections nouvelles, à valider à l'œil) :`)
added.forEach((a) => console.log("  + " + a))
