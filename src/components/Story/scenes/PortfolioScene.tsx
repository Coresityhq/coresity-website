import { WORK } from 'src/components/Story/story.data'
import { WORK_IMAGE_SIZES, workImage } from 'src/components/Story/workImage'

import SceneEyebrow from './SceneEyebrow'

// 12 · What operators use. Three staggered frames that tilt toward the
// pointer. Each picture is a <picture> with AVIF, WebP and JPEG at three
// widths (scripts/images.mjs), lazy-loaded since the scene is far below the
// fold, with intrinsic sizes so nothing shifts while it loads.

const PortfolioScene = () => (
  <section
    id="work"
    data-scene="work"
    data-idx="12"
    data-label="What operators use"
    className="relative px-[5vw] pt-[14vh] pb-[12vh]"
  >
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <SceneEyebrow idx="12" label="What operators use" reveal />
        <h2
          data-reveal="clip"
          className="mt-6 font-display text-[length:clamp(40px,6vw,104px)] leading-[0.98] font-bold tracking-[-0.035em] text-[var(--c-ink)]"
        >
          Built to be used
        </h2>
      </div>
      <a
        href="#work"
        className="flex gap-[10px] font-mono text-xs tracking-[0.12em] text-[var(--c-ink)] uppercase transition-[gap,color] hover:gap-[18px] hover:text-[var(--c-vio)] hover:no-underline"
      >
        See all work <span>→</span>
      </a>
    </div>

    <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-7">
      {WORK.map((w) => {
        const img = workImage(w.image)
        return (
          <div key={w.id} data-reveal="1" className={w.offsetClass}>
            <div
              data-tilt="1"
              className={`relative overflow-hidden border border-[var(--ink-200)] bg-[var(--ink-100)] ${w.frameClass}`}
            >
              <div className="absolute -inset-[14px] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={img.avif}
                    sizes={WORK_IMAGE_SIZES}
                  />
                  <source
                    type="image/webp"
                    srcSet={img.webp}
                    sizes={WORK_IMAGE_SIZES}
                  />
                  <img
                    src={img.src}
                    srcSet={img.jpg}
                    sizes={WORK_IMAGE_SIZES}
                    width={img.width}
                    height={img.height}
                    alt={w.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
            </div>
            <div className="mt-[18px] flex items-baseline justify-between font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase">
              <span>{w.n}</span>
              <span className="text-[var(--c-vio)]">{w.kind}</span>
            </div>
            <h3 className="mt-[10px] mb-[6px] font-display text-[length:var(--text-2xl)] leading-[var(--lh-2xl)] font-semibold text-[var(--c-ink)]">
              {w.t}
            </h3>
            <p className="text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
              {w.d}
            </p>
          </div>
        )
      })}
    </div>
  </section>
)

export default PortfolioScene
