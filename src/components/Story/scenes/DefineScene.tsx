import SceneEyebrow from './SceneEyebrow'

// 07 · Problem · Expertise. Pinned for 320vh. Five scattered words line up,
// each leading to the next, then collapse into CLARITY.

const WORDS = ['RESULT', 'OBSTACLE', 'EXPERTISE', 'METHOD', 'NEXT STEP']

const DefineScene = () => (
  <section
    id="define"
    data-scene="define"
    data-pin="1"
    data-idx="07"
    data-label="Problem · Expertise"
    className="relative h-[320vh]"
  >
    <div data-stage="1" className="sticky top-0 h-screen overflow-hidden">
      <div className="absolute top-[92px] left-[5vw] max-w-[500px]">
        <SceneEyebrow idx="07" label="Problem · Expertise" />
        <h3 className="mt-[14px] font-display text-[length:clamp(20px,1.9vw,30px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-[var(--c-ink)]">
          We start from the result you need, then narrow it down to exactly what
          to do.
        </h3>
      </div>
      {WORDS.map((w, k) => (
        <div
          key={w}
          data-dw={k}
          aria-hidden="true"
          className="absolute top-0 left-0 font-display text-[length:clamp(34px,8.4vh,96px)] leading-none font-bold tracking-[-0.035em] whitespace-nowrap text-[var(--ink-400)]"
        >
          {w}
        </div>
      ))}
      {[0, 1, 2, 3].map((k) => (
        <div
          key={k}
          data-dcon={k}
          aria-hidden="true"
          className="absolute top-0 left-0 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-[var(--c-amber-ink)] uppercase opacity-0"
        >
          ↓ then
        </div>
      ))}
      <div
        data-dopp="1"
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 font-display text-[length:clamp(46px,10.4vw,180px)] font-bold tracking-[-0.04em] whitespace-nowrap text-[var(--c-vio)] opacity-0"
      >
        CLARITY
      </div>
    </div>
  </section>
)

export default DefineScene
