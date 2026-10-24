import workImages from './work-images.json'
import type { WorkImageName } from './story.data'

// The portfolio pictures, as scripts/images.mjs writes them: AVIF, WebP and
// JPEG at each width in work-images.json under /CORESITY-IMAGE/work.

const BASE = '/CORESITY-IMAGE/work'

/**
 * How wide a portfolio frame is on screen (PortfolioScene's grid: three
 * columns from 1018px, two from 729px, one below), so the browser picks the
 * smallest variant that is still sharp.
 */
export const WORK_IMAGE_SIZES =
  '(min-width: 1018px) 30vw, (min-width: 729px) 45vw, 90vw'

export type WorkImage = {
  /** JPEG fallback for browsers without srcset. */
  src: string
  width: number
  height: number
  avif: string
  webp: string
  jpg: string
}

export const workImage = (name: WorkImageName): WorkImage => {
  const { widths, width, height } = workImages[name]
  const srcset = (ext: string) =>
    widths.map((w) => `${BASE}/${name}-${w}.${ext} ${w}w`).join(', ')
  const fallback = widths[Math.min(1, widths.length - 1)]
  return {
    src: `${BASE}/${name}-${fallback}.jpg`,
    width,
    height,
    avif: srcset('avif'),
    webp: srcset('webp'),
    jpg: srcset('jpg'),
  }
}
