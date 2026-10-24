import type { Metadata } from 'next'

import Button from 'src/components/Button/Button'
import PageIntro from 'src/components/PageIntro/PageIntro'
import { GET_STARTED_URL } from 'src/lib/links'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Coresity exists for people who need more than information: they need to know what to do, how to do it, and how to get the result they are working toward.',
}

const ROW =
  'grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-16 gap-y-8 border-t border-[var(--c-ink)] pt-10'
const ROW_TITLE =
  'font-display text-[length:clamp(26px,2.6vw,40px)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-[var(--c-ink)]'
const ROW_BODY =
  'flex max-w-[560px] flex-col gap-5 text-[length:var(--text-lg)] leading-[var(--lh-lg)] text-pretty text-[var(--c-body2)]'

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Coresity"
        title={
          <>
            Practical expertise for{' '}
            <span className="text-[var(--c-vio)]">operators.</span>
          </>
        }
        lede="Coresity gives operators the practical expertise they need to get things done."
      />

      <div className="flex flex-col gap-16 px-[5vw] pb-[14vh]">
        <div className={ROW}>
          <h2 className={ROW_TITLE}>
            More than information
            <span className="text-[var(--accent)]">.</span>
          </h2>
          <div className={ROW_BODY}>
            <p>
              We turn proven expertise into practical tools, focused programs,
              and actionable guidance that help people and teams solve problems,
              implement ideas, and achieve specific outcomes.
            </p>
            <p>
              Coresity exists for people who need more than information. They
              need to know what to do, how to do it, and how to get the result
              they are working toward.
            </p>
            <p>
              Our goal is to make valuable expertise more accessible,
              actionable, and useful in the real world.
            </p>
          </div>
        </div>

        <div className={ROW}>
          <h2 className={ROW_TITLE}>
            Who we mean by{' '}
            <span className="text-[var(--c-vio)]">operators</span>
          </h2>
          <div className={ROW_BODY}>
            <p>
              People or teams who need practical help to get something done,
              pass something, implement something, or solve a real problem.
            </p>
            <p>
              We are not a content library, a course company, or a consultancy.
              We combine the useful parts of all three around one job: giving
              you the specific expertise you need to get results.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-6">
              <Button variant="primary" size="lg" href={GET_STARTED_URL}>
                Get started →
              </Button>
              <span className="font-mono text-xs text-[var(--c-muted)]">
                Tools · Programs · Guidance
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
