// Interlude. Pinned for 230vh: one line gives way to the next.

const QUOTE =
  'm-0 max-w-[1300px] px-[6vw] text-center text-balance font-display text-[length:clamp(36px,5.8vw,100px)] font-bold leading-none tracking-[-0.035em] text-[var(--c-ink)] [grid-area:1/1]'

const InterludeScene = () => (
  <section
    data-scene="pause"
    data-pin="1"
    data-idx="—"
    data-label="Interlude"
    className="relative h-[230vh]"
  >
    <div
      data-stage="1"
      className="sticky top-0 grid h-screen place-items-center overflow-hidden"
    >
      <p data-q1="1" className={QUOTE}>
        You don’t need more{' '}
        <span className="text-[var(--c-vio)]">information.</span>
      </p>
      <p data-q2="1" className={`${QUOTE} opacity-0`}>
        You need to know what to{' '}
        <span className="text-[var(--c-vio)]">do.</span>
      </p>
      <div className="absolute bottom-7 left-[5vw] font-mono text-[11px] tracking-[0.14em] text-[var(--c-faint)] uppercase">
        Interlude
      </div>
    </div>
  </section>
)

export default InterludeScene
