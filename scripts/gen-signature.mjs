#!/usr/bin/env node
/**
 * One-shot script: converts "Bareera" and "Gulraiz" into SVG <path> d strings
 * using opentype.js + the Great Vibes font.
 *
 * Usage:  node scripts/gen-signature.mjs
 */

import opentype from 'opentype.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FONT_PATH = join(__dirname, 'fonts', 'GreatVibes-Regular.ttf')

const TARGET_VIEWBOX_W = 600
const TARGET_VIEWBOX_H = 200
const WORD_GAP = 18 // horizontal space between the two words
const PADDING_X = 20
const PADDING_Y = 20

const font = opentype.loadSync(FONT_PATH)

// Render each word at a large font size for precision, then we'll scale.
const fontSize = 72

const firstPath = font.getPath('Bareera', 0, 0, fontSize)
const lastPath = font.getPath('Gulraiz', 0, 0, fontSize)

const firstBB = firstPath.getBoundingBox()
const lastBB = lastPath.getBoundingBox()

const firstW = firstBB.x2 - firstBB.x1
const lastW = lastBB.x2 - lastBB.x1
const totalW = firstW + WORD_GAP + lastW

const maxTop = Math.min(firstBB.y1, lastBB.y1)
const maxBottom = Math.max(firstBB.y2, lastBB.y2)
const totalH = maxBottom - maxTop

// Compute a uniform scale to fit inside the viewBox with padding
const availW = TARGET_VIEWBOX_W - 2 * PADDING_X
const availH = TARGET_VIEWBOX_H - 2 * PADDING_Y
const scale = Math.min(availW / totalW, availH / totalH)

// Compute offsets so the full signature is centered in the viewBox
const scaledTotalW = totalW * scale
const scaledTotalH = totalH * scale
const offsetX = (TARGET_VIEWBOX_W - scaledTotalW) / 2
const offsetY = (TARGET_VIEWBOX_H - scaledTotalH) / 2

// First word: shift so its bounding-box top-left aligns with origin, then apply offset
const firstTx = offsetX - firstBB.x1 * scale
const firstTy = offsetY - maxTop * scale

// Last word: same vertical offset, shifted right after first word + gap
const lastTx = offsetX + (firstW + WORD_GAP - lastBB.x1) * scale
const lastTy = firstTy // same baseline

/**
 * Transform every command in an opentype Path by applying scale + translate.
 * Returns a new SVG path `d` string.
 */
function transformPath(path, tx, ty, s) {
  return path.commands
    .map((cmd) => {
      switch (cmd.type) {
        case 'M':
          return `M ${r(cmd.x * s + tx)},${r(cmd.y * s + ty)}`
        case 'L':
          return `L ${r(cmd.x * s + tx)},${r(cmd.y * s + ty)}`
        case 'Q':
          return `Q ${r(cmd.x1 * s + tx)},${r(cmd.y1 * s + ty)} ${r(cmd.x * s + tx)},${r(cmd.y * s + ty)}`
        case 'C':
          return `C ${r(cmd.x1 * s + tx)},${r(cmd.y1 * s + ty)} ${r(cmd.x2 * s + tx)},${r(cmd.y2 * s + ty)} ${r(cmd.x * s + tx)},${r(cmd.y * s + ty)}`
        case 'Z':
          return 'Z'
        default:
          return ''
      }
    })
    .join(' ')
}

function r(n) {
  return Math.round(n * 100) / 100
}

const firstD = transformPath(firstPath, firstTx, firstTy, scale)
const lastD = transformPath(lastPath, lastTx, lastTy, scale)

// Compute the bounding box of the rendered paths for the flourish
const allMinY = offsetY
const allMaxY = offsetY + scaledTotalH
const flourishY = r(allMaxY + 8)
const flourishStartX = r(offsetX - 5)
const flourishEndX = r(offsetX + scaledTotalW + 5)
const flourishMidX = r((flourishStartX + flourishEndX) / 2)
const flourishDipY = r(flourishY + 10)

const flourishD = `M ${flourishStartX},${flourishY} Q ${flourishMidX},${flourishDipY} ${flourishEndX},${r(flourishY - 4)}`

console.log('=== viewBox ===')
console.log(`0 0 ${TARGET_VIEWBOX_W} ${TARGET_VIEWBOX_H}`)
console.log()
console.log('=== first (Bareera) ===')
console.log(firstD)
console.log()
console.log('=== last (Gulraiz) ===')
console.log(lastD)
console.log()
console.log('=== flourish ===')
console.log(flourishD)
console.log()

// Quick debug SVG you can paste into a browser to preview
console.log('=== preview SVG ===')
console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TARGET_VIEWBOX_W} ${TARGET_VIEWBOX_H}" width="${TARGET_VIEWBOX_W}" height="${TARGET_VIEWBOX_H}" style="background:#F4EFE6">`)
console.log(`  <path d="${firstD}" fill="none" stroke="#1e1e1e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`)
console.log(`  <path d="${lastD}" fill="none" stroke="#1e1e1e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`)
console.log(`  <path d="${flourishD}" fill="none" stroke="#1e1e1e" stroke-width="0.7" stroke-linecap="round" opacity="0.3"/>`)
console.log(`</svg>`)
