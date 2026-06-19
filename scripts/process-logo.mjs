import sharp from "sharp"

const src = "/tmp/era-source.jpg"
const out = "/vercel/share/v0-project/public/images/era-logo.png"

const raw = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const px = raw.data
const ch = raw.info.channels
const W = raw.info.width
const H = raw.info.height

let minX = W, minY = H, maxX = 0, maxY = 0

// track opaque-pixel count per column to find the gap before the helix
const colCount = new Array(W).fill(0)

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * ch
    const r = px[i], g = px[i + 1], b = px[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    if (lum > 180) {
      px[i + 3] = 0
    } else if (lum > 110) {
      const a = Math.round(((180 - lum) / 70) * 255)
      px[i + 3] = a
      if (a > 60) {
        colCount[x]++
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    } else {
      px[i + 3] = 255
      colCount[x]++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

// Find the gap between the "era" wordmark and the helix.
// The helix is separated from the text by the LARGEST run of empty columns,
// so scan for the widest empty-column run and cut at its start.
let bestGapStart = -1
let bestGapLen = 0
let runStart = -1
let runLen = 0
for (let x = minX; x <= maxX; x++) {
  if (colCount[x] === 0) {
    if (runStart === -1) runStart = x
    runLen++
  } else {
    if (runLen > bestGapLen) {
      bestGapLen = runLen
      bestGapStart = runStart
    }
    runStart = -1
    runLen = 0
  }
}
// require a meaningful gap so we don't cut on normal letter spacing
if (bestGapStart !== -1 && bestGapLen >= 40) {
  maxX = bestGapStart
}

const pad = 12
minX = Math.max(0, minX - pad)
minY = Math.max(0, minY - pad)
maxX = Math.min(W - 1, maxX + pad)
maxY = Math.min(H - 1, maxY + pad)
const cw = maxX - minX + 1
const chgt = maxY - minY + 1

console.log("[v0] source", W, H, "bbox", minX, minY, cw, chgt)

await sharp(px, { raw: { width: W, height: H, channels: ch } })
  .extract({ left: minX, top: minY, width: cw, height: chgt })
  .png()
  .toFile(out)

console.log("[v0] wrote", out)
