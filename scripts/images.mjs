// Builds the responsive variants of the portfolio images.
//
//   npm run images
//
// Reads every image in assets/work (the committed originals), writes
// AVIF, WebP and JPEG versions at the widths the portfolio frames can be
// shown at into public/CORESITY-IMAGE/work, and records each image's
// sizes in src/components/Story/work-images.json, which the Story reads
// to build its srcset and width/height attributes.
//
// The outputs are committed, so neither `next build` nor the Docker image
// needs this script; run it again after adding or replacing a source image.

import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

import sharp from 'sharp'

const SRC = 'assets/work'
const OUT = 'public/CORESITY-IMAGE/work'
const MANIFEST = 'src/components/Story/work-images.json'

/** Candidate widths: a phone, a tablet or a desktop column at 2x, 3x. */
const WIDTHS = [480, 800, 1200]

const FORMATS = {
  avif: (img) => img.avif({ quality: 55, effort: 6 }),
  webp: (img) => img.webp({ quality: 78, effort: 6 }),
  jpg: (img) => img.jpeg({ quality: 78, mozjpeg: true, progressive: true }),
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

const sources = (await readdir(SRC))
  .filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f))
  .sort()
if (sources.length === 0) {
  console.error(`No source images in ${SRC}`)
  process.exit(1)
}

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const manifest = {}
for (const file of sources) {
  const name = basename(file, extname(file))
  const image = sharp(join(SRC, file)).rotate() // honour EXIF orientation
  const meta = await image.metadata()
  const srcWidth = meta.width ?? 0
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, srcWidth)))]
  const sizes = {}
  for (const width of widths) {
    for (const [ext, encode] of Object.entries(FORMATS)) {
      const target = join(OUT, `${name}-${width}.${ext}`)
      const info = await encode(
        image.clone().resize({ width, withoutEnlargement: true })
      ).toFile(target)
      sizes[`${width}.${ext}`] = info.size
      if (width === widths.at(-1) && ext === 'jpg') {
        manifest[name] = { widths, width: info.width, height: info.height }
      }
    }
  }
  const { size } = await stat(join(SRC, file))
  console.log(
    `${file} (${srcWidth}×${meta.height}, ${kb(size)}) → ` +
      Object.entries(sizes)
        .map(([k, v]) => `${k} ${kb(v)}`)
        .join(', ')
  )
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nWrote ${Object.keys(manifest).length} entries to ${MANIFEST}`)
