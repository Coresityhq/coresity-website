import StepsRule from 'src/components/StepsRule/StepsRule'
import { PARTNER } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 13 · How it works. Four steps on one rule (PARTNER, shared with the How It
// Works page).

const PartnerScene = () => (
  <section
    id="partner"
    data-scene="partner"
    data-idx="13"
    data-label="How it works"
    className="relative px-[5vw] pt-[14vh] pb-[12vh]"
  >
    <SceneEyebrow idx="13" label="How it works" reveal />
    <h2
      data-reveal="clip"
      className="mt-6 max-w-[1200px] font-display text-[length:clamp(40px,6vw,104px)] leading-[0.98] font-bold tracking-[-0.035em] text-balance text-[var(--c-ink)]"
    >
      You bring the problem.{' '}
      <span className="text-[var(--c-vio)]">We bring the expertise.</span>
    </h2>
    <div className="mt-[72px]">
      <StepsRule steps={PARTNER} reveal />
    </div>
  </section>
)

export default PartnerScene
