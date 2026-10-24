import Button from 'src/components/Button/Button'
import FooterLine from 'src/components/FooterLine/FooterLine'
import { GET_STARTED_URL } from 'src/lib/links'

import SceneEyebrow from './SceneEyebrow'

// 15 · Final call to action. Pinned for 210vh on a dark ground; each line
// rises in as the scene arrives. Carries the site's footer line, which opens
// with the real lockup where the design draws its mark and wordmark.

const FinalScene = () => (
  <section
    data-scene="final"
    data-pin="1"
    data-dark="1"
    data-idx="15"
    data-label="Get started"
    className="relative h-[210vh]"
  >
    <div
      data-stage="1"
      className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[5vw] pt-20"
    >
      <div data-fin="1">
        <SceneEyebrow idx="15" label="Your turn" dark />
      </div>
      <h2
        data-fin="1"
        className="mt-7 max-w-[1500px] font-display text-[length:clamp(40px,8.8vw,164px)] leading-[0.92] font-bold tracking-[-0.045em] text-balance text-white"
      >
        Have something you need to{' '}
        <span className="text-[var(--accent)]">get done?</span>
      </h2>
      <p
        data-fin="1"
        className="mt-9 font-display text-[length:clamp(22px,2.2vw,36px)] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--violet-200)]"
      >
        You bring the problem.
        <br />
        We bring the expertise.
      </p>
      <div data-fin="1" className="mt-10 flex flex-wrap items-center gap-6">
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" size="lg" href={GET_STARTED_URL}>
            Get started →
          </Button>
          <Button variant="inverse" size="lg" href="#notes">
            Read field notes
          </Button>
        </div>
        <span className="max-w-[360px] text-[length:var(--text-sm)] text-[var(--violet-300)]">
          Tell us what you’re working toward. We’ll show you what to do next.
        </span>
      </div>

      <FooterLine className="mt-10 sm:absolute sm:right-[5vw] sm:bottom-6 sm:left-[5vw] sm:mt-0" />
    </div>
  </section>
)

export default FinalScene
