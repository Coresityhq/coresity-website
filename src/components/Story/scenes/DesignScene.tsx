import { BRANCHES } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 08 · Shape. Pinned for 300vh. Seven branches grow out of YOUR NEED on the
// canvas; hovering or focusing one shows the form of help it becomes. Below 860px the
// result panel sits at the bottom of the stage and the engine fits the
// branches above it (STAGE_ROW_MIN).

const DesignScene = () => (
  <section
    id="design"
    data-scene="design"
    data-pin="1"
    data-idx="08"
    data-label="Shape"
    className="relative h-[300vh]"
  >
    <div data-stage="1" className="sticky top-0 h-screen overflow-hidden">
      <div
        data-dhead="1"
        className="absolute top-[88px] left-[5vw] max-w-[88vw] min-[860px]:max-w-[min(520px,60vw)]"
      >
        <SceneEyebrow idx="08" label="Shape · What form does it take?" />
        <h3 className="mt-[14px] font-display text-[length:clamp(22px,2.2vw,36px)] leading-[1.1] font-bold tracking-[-0.025em] text-balance text-[var(--c-ink)]">
          Your need → a tool, a program, or guidance.
        </h3>
        <p className="mt-3 text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
          The shape of your problem decides the shape of the help.
        </p>
      </div>

      <div
        data-bo="1"
        aria-hidden="true"
        className="absolute top-0 left-0 font-display text-base font-bold tracking-[0.12em] whitespace-nowrap text-[var(--c-ink)] min-[860px]:text-xl"
      >
        YOUR NEED
      </div>
      {BRANCHES.map((b, k) => (
        <button
          key={b.need}
          data-br={k}
          type="button"
          className="absolute top-0 left-0 cursor-pointer border border-transparent px-[10px] py-2 text-left font-display text-[14px] font-medium whitespace-nowrap text-[var(--ink-500)] opacity-0 transition-[color,border-color] duration-300 min-[860px]:px-[14px] min-[860px]:text-[17px]"
        >
          {b.need}
        </button>
      ))}

      <div className="absolute right-[5vw] bottom-[7vh] left-[5vw] min-[860px]:top-1/2 min-[860px]:right-auto min-[860px]:bottom-auto min-[860px]:left-[69%] min-[860px]:w-[27vw] min-[860px]:-translate-y-1/2">
        <div className="relative h-[150px] min-[860px]:h-[260px]">
          {BRANCHES.map((b, k) => (
            <div
              key={b.need}
              data-bf={k}
              className="absolute inset-0 opacity-0 transition-[opacity,transform] duration-[500ms,700ms] ease-[ease,cubic-bezier(.2,.7,.2,1)]"
            >
              <div className="font-mono text-[11px] tracking-[0.16em] text-[var(--c-amber-ink)] uppercase">
                You need {b.need.toLowerCase()} → you get
              </div>
              <div className="mt-[14px] font-display text-[length:clamp(34px,3.8vw,64px)] leading-[0.98] font-bold tracking-[-0.035em] text-[var(--c-ink)]">
                {b.get}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-7 left-[5vw] font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase">
        Hover a need — see what you get
      </div>
    </div>
  </section>
)

export default DesignScene
