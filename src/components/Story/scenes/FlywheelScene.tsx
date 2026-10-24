import { FLYWHEEL } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 11 · The flywheel. Five stages turn on a ring the engine spins; hovering or
// focusing a stage slows it and shows its line. The section clips
// horizontally: on a phone the rotating labels can swing past the edge.

const FlywheelScene = () => (
  <section
    data-scene="flywheel"
    data-idx="11"
    data-label="The flywheel"
    className="relative overflow-x-clip px-[5vw] pt-[12vh] pb-[14vh]"
  >
    <div className="flex flex-wrap items-center gap-x-16 gap-y-12">
      <div className="flex-[1_1_320px]">
        <SceneEyebrow idx="11" label="The flywheel" reveal />
        <h2
          data-reveal="clip"
          className="mt-6 font-display text-[length:clamp(36px,4.4vw,76px)] leading-none font-bold tracking-[-0.035em] text-balance text-[var(--c-ink)]"
        >
          Every turn makes the next one stronger.
        </h2>
        <p
          data-reveal="1"
          className="mt-6 max-w-[440px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]"
        >
          Proven expertise becomes a practical tool. The tool gets you a result.
          Your result teaches us what to build next, so the next operator starts
          further ahead.
        </p>
        <div
          data-reveal="1"
          className="mt-7 font-mono text-[11px] tracking-[0.12em] text-[var(--c-muted)] uppercase"
        >
          Hover a stage to slow the wheel
        </div>
      </div>

      <div
        data-fly="1"
        className="relative aspect-square max-w-[720px] flex-[1.6_1_480px]"
      >
        <div
          data-fcd="1"
          className="absolute top-1/2 left-1/2 mt-11 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-[var(--c-muted)] uppercase transition-opacity duration-[400ms]"
        >
          Always learning
        </div>
        {FLYWHEEL.map((f, k) => (
          <div
            key={f.label}
            data-fc={k}
            className="absolute top-1/2 left-1/2 mt-14 w-[46%] -translate-x-1/2 -translate-y-1/2 text-center text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-ink)] opacity-0 transition-opacity duration-[400ms]"
          >
            {f.desc}
          </div>
        ))}
        {FLYWHEEL.map((f, k) => (
          <button
            key={f.label}
            data-fl={k}
            type="button"
            className="absolute top-0 left-0 cursor-pointer px-2 py-2 text-left font-display text-[13px] font-semibold whitespace-nowrap text-[var(--c-ink)] sm:px-3 sm:text-[length:clamp(15px,1.4vw,21px)]"
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  </section>
)

export default FlywheelScene
