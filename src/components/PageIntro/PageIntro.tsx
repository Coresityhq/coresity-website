import type { ReactNode } from 'react'

// How every page but the story opens, in the story's language: a mono
// eyebrow with the amber dot (as the hero's), a display headline, and a lede.

type Props = {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
}

const PageIntro = ({ eyebrow, title, lede }: Props) => (
  <header className="px-[5vw] pt-[10vh] pb-12 md:pt-[14vh] md:pb-16">
    <div className="flex items-center gap-[14px] font-mono text-[11px] tracking-[0.16em] text-[var(--c-muted)] uppercase">
      <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      {eyebrow}
    </div>
    <h1 className="mt-6 max-w-[1200px] font-display text-[length:clamp(40px,6vw,96px)] leading-[0.98] font-bold tracking-[-0.035em] text-balance text-[var(--c-ink)]">
      {title}
    </h1>
    {lede && (
      <p className="mt-8 max-w-[640px] text-[length:var(--text-lg)] leading-[var(--lh-lg)] text-pretty text-[var(--c-body2)]">
        {lede}
      </p>
    )}
  </header>
)

export default PageIntro
