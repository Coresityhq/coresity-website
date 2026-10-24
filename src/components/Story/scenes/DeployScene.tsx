import { CHANNELS, DELIVERY } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 09 · Apply. Pinned for 230vh. YOUR RESULT at the hub, twelve kinds of
// support on a slowly turning ring; hover or focus one to light its spokes.
// Below 860px the engine fits the ring between the heading (data-dphead) and
// the routes caption (data-dproutes) and staggers the labels (STAGE_ROW_MIN).

const DeployScene = () => (
  <section
    id="deploy"
    data-scene="deploy"
    data-pin="1"
    data-idx="09"
    data-label="Apply"
    className="relative h-[230vh]"
  >
    <div data-stage="1" className="sticky top-0 h-screen overflow-hidden">
      <div
        data-dphead="1"
        className="absolute top-[92px] left-[5vw] max-w-[460px]"
      >
        <SceneEyebrow idx="09" label="Apply" />
        <h2 className="mt-[14px] font-display text-[length:clamp(24px,2.6vw,42px)] leading-[1.05] font-bold tracking-[-0.03em] text-balance text-[var(--c-ink)]">
          Put it to work on the real problem.
        </h2>
        <p className="mt-[10px] text-[length:var(--text-sm)] text-[var(--c-body2)]">
          Everything around you points at one thing: your result.
        </p>
      </div>

      <div
        data-dc="1"
        aria-hidden="true"
        className="absolute top-0 left-0 font-display text-[length:clamp(20px,1.8vw,28px)] font-bold tracking-[0.08em] whitespace-nowrap text-[var(--c-ink)]"
      >
        YOUR RESULT
      </div>
      {CHANNELS.map((c, k) => (
        <button
          key={c}
          data-ch={k}
          type="button"
          className="absolute top-0 left-0 cursor-pointer px-[10px] py-[6px] text-left font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-[var(--ink-700)] transition-colors duration-300 sm:text-[11px] sm:tracking-[0.16em]"
        >
          {c}
        </button>
      ))}

      <div
        data-dproutes="1"
        className="absolute right-[5vw] bottom-[26px] left-[5vw] flex flex-wrap gap-x-[14px] gap-y-[6px] font-mono text-[11px] tracking-[0.08em] text-[var(--c-muted)]"
      >
        <span className="text-[var(--c-ink)]">
          Delivered the way you work —
        </span>
        {DELIVERY.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    </div>
  </section>
)

export default DeployScene
