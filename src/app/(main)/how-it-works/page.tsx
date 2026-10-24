import type { Metadata } from 'next'

import Button from 'src/components/Button/Button'
import LevelsGrid from 'src/components/LevelsGrid/LevelsGrid'
import PageIntro from 'src/components/PageIntro/PageIntro'
import StepsRule from 'src/components/StepsRule/StepsRule'
import { LEVELS, PARTNER } from 'src/components/Story/story.data'
import { GET_STARTED_URL } from 'src/lib/links'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Tell us what you need to get done. We match you with proven expertise in the form that gets you there: a tool, a short program, or hands-on guidance.',
}

const SECTION_TITLE =
  'mb-10 font-display text-[length:clamp(26px,2.6vw,40px)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-[var(--c-ink)]'

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title={
          <>
            You bring the problem.{' '}
            <span className="text-[var(--c-vio)]">We bring the expertise.</span>
          </>
        }
        lede="Four steps from the problem you have to the result you need."
      />

      <div className="flex flex-col gap-[14vh] px-[5vw] pb-[14vh]">
        <section>
          <h2 className={SECTION_TITLE}>
            Four steps<span className="text-[var(--accent)]">.</span>
          </h2>
          <StepsRule steps={PARTNER} />
        </section>

        <section>
          <h2 className={SECTION_TITLE}>
            What you get<span className="text-[var(--accent)]">.</span>
          </h2>
          <LevelsGrid levels={LEVELS} />
        </section>

        <div className="flex flex-wrap items-center gap-6 border-t border-[var(--c-ink)] pt-10">
          <Button variant="primary" size="lg" href={GET_STARTED_URL}>
            Get started →
          </Button>
          <span className="max-w-[420px] text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
            Tell us what you’re working toward. We’ll show you what to do next.
          </span>
        </div>
      </div>
    </>
  )
}
