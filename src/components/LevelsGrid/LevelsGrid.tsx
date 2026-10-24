import type { LEVELS } from 'src/components/Story/story.data'

// The three levels of help as ruled columns, as the story's "What you get"
// scene draws them. `reveal` adds the entrance animation hook the engine
// binds; the pages leave it off.

type Props = { levels: typeof LEVELS; reveal?: boolean }

const LevelsGrid = ({ levels, reveal = false }: Props) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
    {levels.map((l) => (
      <div
        key={l.n}
        data-reveal={reveal ? '1' : undefined}
        className={`border-t border-[var(--c-ink)] pt-7 pr-7 pb-10 transition-[background-color,padding] duration-[400ms] hover:bg-[var(--c-surface)] hover:pl-5 ${l.offset}`}
      >
        <div className="flex justify-between font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase">
          <span>{l.tag}</span>
          <span>{l.level}</span>
        </div>
        <div
          aria-hidden="true"
          className="mt-5 font-display text-[length:clamp(90px,10vw,160px)] leading-[0.9] font-bold tracking-[-0.05em] text-[var(--c-line)]"
        >
          {l.n}
        </div>
        <h3 className="mt-2 mb-[10px] font-display text-[length:var(--text-3xl)] leading-[var(--lh-3xl)] font-semibold text-[var(--c-ink)]">
          {l.title}
        </h3>
        <p className="mb-[18px] max-w-[340px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]">
          {l.body}
        </p>
        <div className="font-mono text-xs text-[var(--c-vio)]">
          {l.examples}
        </div>
      </div>
    ))}
  </div>
)

export default LevelsGrid
