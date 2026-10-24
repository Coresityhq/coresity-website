import type { PARTNER } from 'src/components/Story/story.data'

// The four steps on one rule, as the story's "How it works" scene draws them.
// `reveal` adds the entrance animation hook the story engine binds.

type Props = { steps: typeof PARTNER; reveal?: boolean }

const StepsRule = ({ steps, reveal = false }: Props) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] border-t border-[var(--c-ink)]">
    {steps.map((p) => (
      <div
        key={p.n}
        data-reveal={reveal ? '1' : undefined}
        className="relative pt-9 pr-7 pb-3 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5"
      >
        <div
          aria-hidden="true"
          className={`absolute -top-[6px] left-0 h-[11px] w-[11px] rounded-full ${p.dotClass}`}
        />
        <div className="font-mono text-[11px] tracking-[0.14em] text-[var(--c-vio)]">
          {p.n}
        </div>
        <div className="mt-[10px] font-display text-[length:var(--text-2xl)] leading-[var(--lh-2xl)] font-semibold text-[var(--c-ink)]">
          {p.t}
        </div>
        <p className="mt-2 text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
          {p.d}
        </p>
      </div>
    ))}
  </div>
)

export default StepsRule
