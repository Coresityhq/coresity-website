import LevelsGrid from 'src/components/LevelsGrid/LevelsGrid'
import { LEVELS } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 03 · What you get. Three levels of help, from self-serve to expert-led.

const OpportunityScene = () => (
  <section
    data-scene="opportunity"
    data-idx="03"
    data-label="What you get"
    className="relative px-[5vw] pt-[18vh] pb-[16vh]"
  >
    <SceneEyebrow idx="03" label="What you get" reveal />
    <h2
      data-reveal="clip"
      className="mt-6 max-w-[1300px] font-display text-[length:clamp(40px,6.4vw,112px)] leading-[0.98] font-bold tracking-[-0.035em] text-balance text-[var(--c-ink)]"
    >
      Expertise you can put to work today.
    </h2>
    <p
      data-reveal="1"
      className="mt-8 ml-auto max-w-[440px] text-[length:var(--text-lg)] leading-[var(--lh-lg)] text-pretty text-[var(--c-body2)]"
    >
      Proven expertise, shaped into the form that gets you to your result, at
      three levels of help.
    </p>
    <div className="mt-[72px]">
      <LevelsGrid levels={LEVELS} reveal />
    </div>
  </section>
)

export default OpportunityScene
