import SceneEyebrow from './SceneEyebrow'

// 05 · Why Coresity. A light panel for you, a dark one for Coresity;
// each widens on hover.

const PANEL =
  'flex flex-[1_1_420px] flex-col px-[5vw] py-[14vh] transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:grow-[1.5]'

const WhyScene = () => (
  <section
    data-scene="why"
    data-idx="05"
    data-label="Why Coresity"
    className="relative flex min-h-[92vh] flex-wrap"
  >
    <div className={`${PANEL} justify-between gap-12 bg-[var(--c-bg)]`}>
      <SceneEyebrow idx="05" label="Why Coresity" />
      <div>
        <div className="mb-[18px] font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase">
          You
        </div>
        <p
          data-reveal="clip"
          className="font-display text-[length:clamp(36px,4.6vw,80px)] leading-none font-bold tracking-[-0.035em] text-balance text-[var(--c-ink)]"
        >
          You know what you need to get done.
        </p>
        <p className="mt-6 max-w-[420px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]">
          A real problem, a real deadline, and a result that matters.
        </p>
      </div>
    </div>

    <div
      className={`${PANEL} relative justify-end overflow-hidden bg-[var(--c-deep)]`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(196,181,253,0.16)_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div className="relative">
        <div className="mb-[18px] font-mono text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
          Coresity
        </div>
        <p
          data-reveal="clip"
          className="font-display text-[length:clamp(36px,4.6vw,80px)] leading-none font-bold tracking-[-0.035em] text-balance text-white"
        >
          We bring the expertise to{' '}
          <span className="text-[var(--violet-300)]">get it done.</span>
        </p>
        <p className="mt-6 max-w-[440px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--violet-200)]">
          Proven methods from people who have done it, turned into tools,
          programs, and guidance you can act on.
        </p>
      </div>
    </div>
  </section>
)

export default WhyScene
