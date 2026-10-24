'use client'

import Button from 'src/components/Button/Button'
import { GET_STARTED_URL } from 'src/lib/links'
import { useStoryTheme } from 'src/lib/story/useStoryTheme'

// 01 · Hero. Three word pairs play through (data-hp), then the headline words
// stagger in (data-hw) and the calls to action follow (data-hcta). The engine
// drives all of it; with reduced motion the headline is simply there. The
// second button is outline on light and inverse on dark, as designed.

const PAIRS = [
  ['REAL', 'PROBLEMS'],
  ['PRACTICAL', 'EXPERTISE'],
  ['SPECIFIC', 'RESULTS'],
]

const HEADLINE: { word: string; brand?: boolean }[] = [
  { word: 'Coresity' },
  { word: 'gives' },
  { word: 'operators', brand: true },
  { word: 'the' },
  { word: 'practical', brand: true },
  { word: 'expertise', brand: true },
  { word: 'they' },
  { word: 'need' },
  { word: 'to' },
  { word: 'get' },
  { word: 'things' },
]

const scrollToProblem = () => {
  const el = document.getElementById('problem')
  if (!el) return
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY,
    behavior: 'smooth',
  })
}

const PAIR_WORD =
  'font-display text-[length:clamp(52px,12vw,220px)] font-bold leading-[0.86]'

const HeroScene = () => {
  const { dark } = useStoryTheme()

  return (
    <section
      data-scene="hero"
      data-idx="01"
      data-label="Coresity"
      className="relative h-screen min-h-[620px] overflow-hidden"
    >
      {PAIRS.map(([a, b], k) => (
        <div
          key={a}
          data-hp={k}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col justify-center pr-[8vw] pl-[5vw] tracking-[-0.03em] opacity-0"
        >
          <div className={`${PAIR_WORD} text-[var(--c-ink)]`}>{a}</div>
          <div className={`${PAIR_WORD} text-[var(--c-vio)]`}>{b}</div>
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center px-[5vw] pt-20">
        <div className="mb-7 flex items-center gap-[14px] font-mono text-[11px] tracking-[0.16em] text-[var(--c-muted)] uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Practical expertise for operators
        </div>
        <h1 className="m-0 flex max-w-[1480px] flex-wrap gap-x-[0.24em] font-display text-[length:clamp(38px,6.1vw,104px)] leading-none font-bold tracking-[-0.035em] text-[var(--c-ink)]">
          {HEADLINE.map(({ word, brand }) => (
            <span
              key={word}
              data-hw="1"
              className={`inline-block ${brand ? 'text-[var(--c-vio)]' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
          <span data-hw="1" className="inline-block text-[var(--c-vio)]">
            done<span className="text-[var(--accent)]">.</span>
          </span>
        </h1>
        <div data-hcta="1" className="mt-11 flex flex-wrap items-center gap-7">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={scrollToProblem}>
              See how it works →
            </Button>
            <Button
              variant={dark ? 'inverse' : 'outline'}
              size="lg"
              href={GET_STARTED_URL}
            >
              Get started →
            </Button>
          </div>
          <span className="font-mono text-xs text-[var(--c-muted)]">
            Tools · Programs · Guidance
          </span>
        </div>
      </div>

      <div className="absolute right-[5vw] bottom-7 left-[5vw] flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-[var(--c-muted)] uppercase">
        <span>Fig. 01 — What to do, how to do it, how to get the result</span>
        <span>Scroll to discover ↓</span>
      </div>
      <div
        data-rail="1"
        className="absolute top-1/2 right-[18px] -translate-y-1/2 rotate-180 font-mono text-[10px] tracking-[0.22em] text-[var(--c-faint)] uppercase [writing-mode:vertical-rl]"
      >
        Problem — Expertise — Distill — Shape — Apply — Result
      </div>
    </section>
  )
}

export default HeroScene
