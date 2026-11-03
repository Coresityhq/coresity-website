import Button from 'src/components/Button/Button'
import FooterLine from 'src/components/FooterLine/FooterLine'
import { GET_STARTED_URL } from 'src/lib/links'

import SceneEyebrow from './SceneEyebrow'

// 15 · Final call to action. Pinned for 210vh on a dark ground; each line
// rises in as the scene arrives. Closes on the site's footer line, in flow so
// it can't overlap the call to action: on a short viewport the stage grows past
// the screen and the end of the page's scroll brings the footer into view.

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
      className="sticky top-0 flex min-h-screen flex-col overflow-hidden px-[5vw] pt-20 pb-6"
    >
      <div className="flex flex-1 flex-col justify-center py-[clamp(12px,3vh,32px)]">
        <div data-fin="1">
          <SceneEyebrow idx="15" label="Your turn" dark />
        </div>
        <h2
          data-fin="1"
          className="mt-[clamp(12px,3vh,28px)] max-w-[1500px] font-display text-[length:clamp(40px,min(8.8vw,15vh),164px)] leading-[0.92] font-bold tracking-[-0.045em] text-balance text-white"
        >
          Have something you need to{' '}
          <span className="text-[var(--accent)]">get done?</span>
        </h2>
        <p
          data-fin="1"
          className="mt-[clamp(16px,4vh,36px)] font-display text-[length:clamp(22px,min(2.2vw,4vh),36px)] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--violet-200)]"
        >
          You bring the problem.
          <br />
          We bring the expertise.
        </p>
        <div
          data-fin="1"
          className="mt-[clamp(16px,4.5vh,40px)] flex flex-wrap items-center gap-6"
        >
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
      </div>

      <FooterLine className="border-t border-[var(--ink-600)] pt-5" />
    </div>
  </section>
)

export default FinalScene
