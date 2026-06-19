import sharp from "sharp"

const src = "/tmp/era-light-source.jpg"
const out = "/vercel/share/v0-project/public/images/era-logo-light.png"

const raw = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const px = raw.data
const ch = raw.info.channels
const W = raw.info.width
const H = raw.info.height

let minX = W, minY = H, maxX = 0, maxY = 0

// White glowing logo on a gray checkerboard background.
// Keep bright pixels (the logo + glow), drop the mid-gray checkerboard.
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * ch
    const r = px[i], g = px[i + 1], b = px[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    if (lum < 200) {
      px[i + 3] = 0
    } else if (lum < 240) {
      const a = Math.round(((lum - 200) / 40) * 255)
      px[i + 3] = a
      if (a > 60) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    } else {
      px[i + 3] = 255
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

const pad = 16
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
