import { NOTES } from 'src/components/Story/story.data'

import SceneEyebrow from './SceneEyebrow'

// 14 · Field notes. From 760px up, three tall cards in a horizontal rail
// (data-notes) that the engine drifts sideways on its own, with a progress
// bar (data-nprog) under it; hovering pauses the drift. Below that the cards
// stack and the hint is hidden. The design switches these in script; here the
// breakpoint is CSS and the engine only honours it (NOTES_RAIL_MIN).

const NotesScene = () => (
  <section
    id="notes"
    data-scene="notes"
    data-idx="14"
    data-label="Field notes"
    className="relative py-[14vh]"
  >
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-6 px-[5vw]">
      <div>
        <SceneEyebrow idx="14" label="Field notes" reveal />
        <h2
          data-reveal="clip"
          className="mt-6 font-display text-[length:clamp(40px,6vw,104px)] leading-[0.98] font-bold tracking-[-0.035em] text-[var(--c-ink)]"
        >
          Field notes
        </h2>
      </div>
      <p
        data-reveal="1"
        className="max-w-[520px] font-display text-[length:clamp(20px,1.8vw,28px)] leading-[1.25] text-pretty text-[var(--c-body)]"
      >
        How we think about expertise, operators, and getting things done.
      </p>
    </div>

    <div
      data-notes="1"
      className="mt-16 block [scrollbar-width:none] border-t border-[var(--c-ink)] px-[5vw] pb-3 min-[760px]:flex min-[760px]:overflow-x-auto min-[760px]:border-b"
    >
      {NOTES.map((n) => (
        <a
          key={n.no}
          href="#notes"
          className="flex min-h-0 flex-col justify-between gap-7 border-b border-[var(--c-ink)] pt-7 pb-8 text-[var(--c-ink)] transition-[padding] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:pl-[14px] hover:text-[var(--c-ink)] hover:no-underline min-[760px]:mr-9 min-[760px]:min-h-[520px] min-[760px]:flex-[0_0_min(78vw,440px)] min-[760px]:gap-0 min-[760px]:border-r min-[760px]:border-b-0 min-[760px]:border-[var(--c-line2)] min-[760px]:pt-8 min-[760px]:pr-9 min-[760px]:pb-9"
        >
          <div>
            <div className="flex justify-between font-mono text-[11px] tracking-[0.16em] text-[var(--c-muted)] uppercase">
              <span>Field note</span>
              <span className="text-[var(--c-amber-ink)]">{n.tag}</span>
            </div>
            <div className="mt-5 font-display text-[length:clamp(96px,11vw,172px)] leading-[0.86] font-bold tracking-[-0.05em] text-[var(--c-ink)]">
              {n.no}
            </div>
          </div>
          <div>
            <div className="font-display text-[length:clamp(24px,2.2vw,34px)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-[var(--c-ink)]">
              {n.t}
            </div>
            <p className="mt-4 text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-muted)] italic">
              {n.frag}
            </p>
            <div className="mt-6 font-mono text-[11px] tracking-[0.14em] text-[var(--c-vio)] uppercase">
              Read note →
            </div>
          </div>
        </a>
      ))}
    </div>
    <div data-nhint="1" className="hidden min-[760px]:block">
      <div className="mx-[5vw] mt-[14px] h-[2px] overflow-hidden bg-[var(--c-line)]">
        <div data-nprog="1" className="h-[2px] w-[40%] bg-[var(--accent)]" />
      </div>
      <div className="flex justify-between gap-4 px-[5vw] pt-3 font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase">
        <span>Drifts slowly · hover to pause · swipe or scroll to browse</span>
        <span>{NOTES.length} notes</span>
      </div>
    </div>
  </section>
)

export default NotesScene
